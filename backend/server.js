// server.js — Backend AyudaPyme
// Responsabilidades: validar, crear cliente en Supabase, disparar emails via n8n

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// CORS: permitir frontend en produccion y local
const allowedOrigins = [
  'https://ayudapyme.es',
  'https://www.ayudapyme.es',
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:8082',
  'http://localhost:8083',
  'http://localhost:8084',
  'http://localhost:8085',
  'http://localhost:5173',
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(null, false);
  },
  credentials: true,
}));
app.use(express.json());

// Supabase client (service role para insertar sin RLS)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

// --- Validacion NIF/NIE/CIF ---

const NIF_MAP = 'TRWAGMYFPDXBNJZSQVHLCKE';

function normalizeId(v) {
  if (!v) return '';
  return String(v).toUpperCase().replace(/[\s-]+/g, '');
}

function isValidNIF(v) {
  v = normalizeId(v);
  if (!/^[0-9]{8}[A-Z]$/.test(v)) return false;
  return v[8] === NIF_MAP[parseInt(v.slice(0, 8), 10) % 23];
}

function isValidNIE(v) {
  v = normalizeId(v);
  if (!/^[XYZ][0-9]{7}[A-Z]$/.test(v)) return false;
  const map = { X: '0', Y: '1', Z: '2' };
  return v[8] === NIF_MAP[parseInt(map[v[0]] + v.slice(1, 8), 10) % 23];
}

function sumDigits(n) {
  return n < 10 ? n : Math.floor(n / 10) + (n % 10);
}

function isValidCIF(v) {
  v = normalizeId(v);
  if (!/^[A-HJUVNPQRSWKLa-hjuvnpqrswkl][0-9]{7}[0-9A-Z]$/.test(v)) return false;
  const first = v[0].toUpperCase();
  const body = v.slice(1, 8);
  const control = v[8].toUpperCase();
  let sumEven = 0, sumOdd = 0;
  for (let i = 0; i < 7; i++) {
    const d = parseInt(body[i], 10);
    if ((i + 1) % 2 === 0) sumEven += d;
    else sumOdd += sumDigits(d * 2);
  }
  const digit = (10 - ((sumEven + sumOdd) % 10)) % 10;
  const letter = 'JABCDEFGHI'[digit];
  if ('ABEH'.includes(first)) return control === String(digit);
  if ('KPQSW'.includes(first)) return control === letter;
  return control === String(digit) || control === letter;
}

function isValidSpanishId(v) {
  v = normalizeId(v);
  return !!v && (isValidNIF(v) || isValidNIE(v) || isValidCIF(v));
}

// --- POST /api/formulario/alta ---

app.post('/api/formulario/alta', async (req, res) => {
  try {
    const body = req.body || {};

    // 1. Validar campos obligatorios
    const nif = normalizeId(body.cif_nif);
    const email = (body.email || '').trim();
    const nombre = (body.nombre_responsable || body.nombre_completo || '').trim();
    const telefono = (body.telefono || '').trim();
    const domicilio = (body.domicilio || '').trim();
    const cp = (body.codigo_postal || '').trim();
    const ciudad = (body.ciudad || '').trim();
    const actividad = (body.actividad || '').trim();

    if (!nif || !isValidSpanishId(nif)) {
      return res.status(400).json({ error: 'NIF/CIF no valido.' });
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: 'Email no valido.' });
    }
    if (!nombre) {
      return res.status(400).json({ error: 'Nombre obligatorio.' });
    }

    // 2. Preparar datos del cliente
    const clienteData = {
      nif,
      nombre_empresa: body.tipo === 'autonomo' ? (body.nombre_negocio || nombre) : nombre,
      nombre_normalizado: nombre,
      email_normalizado: email,
      telefono,
      actividad,
      domicilio_fiscal: domicilio,
      codigo_postal: cp,
      ciudad,
      tamano_empresa: body.tamano_empresa || body.num_empleados || null,
      origen: body.origen || 'web',
    };

    // 3. Upsert en Supabase (si ya existe el NIF, actualiza)
    const { error: dbError } = await supabase
      .from('cliente')
      .upsert(clienteData, { onConflict: 'nif' });

    if (dbError) {
      console.error('[supabase] error creando cliente:', dbError);
      return res.status(500).json({ error: 'Error guardando datos.' });
    }

    console.info('[cliente] creado/actualizado:', nif);

    // 4. Disparar n8n para emails (fire-and-forget, no bloqueamos)
    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nUrl) {
      fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...clienteData,
          tipo: body.tipo,
          nombre_negocio: body.nombre_negocio,
          anos_antiguedad: body.anos_antiguedad,
          facturacion_anual: body.facturacion_anual,
        }),
      }).catch(err => console.warn('[n8n] email dispatch failed:', err.message));
    }

    // 5. Responder OK al frontend
    res.json({ ok: true, nif });

  } catch (err) {
    console.error('[server] error:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend AyudaPyme en http://localhost:${PORT}`);
});
