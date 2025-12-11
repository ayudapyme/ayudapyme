// server.js
require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const { randomUUID } = require('crypto');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  console.warn('[stripe] STRIPE_SECRET_KEY is not set in .env');
}
const stripe = Stripe(stripeSecret || '');

app.use(cors());
app.use(express.json());

// --- Helpers para validar NIF/NIE/CIF e IBAN ---

const NIF_MAP = 'TRWAGMYFPDXBNJZSQVHLCKE';

function normalizeId(value) {
  if (!value) return '';
  return String(value).toUpperCase().replace(/[\s-]+/g, '');
}

function isValidNIF(v) {
  v = normalizeId(v);
  if (!/^[0-9]{8}[A-Z]$/.test(v)) return false;
  const num = parseInt(v.slice(0, 8), 10);
  const letter = v[8];
  const expected = NIF_MAP[num % 23];
  return letter === expected;
}

function isValidNIE(v) {
  v = normalizeId(v);
  if (!/^[XYZ][0-9]{7}[A-Z]$/.test(v)) return false;
  const map = { X: '0', Y: '1', Z: '2' };
  const numPart = map[v[0]] + v.slice(1, 8);
  const letter = v[8];
  const expected = NIF_MAP[parseInt(numPart, 10) % 23];
  return letter === expected;
}

function sumDigits(n) {
  n = parseInt(n, 10);
  if (n < 10) return n;
  return Math.floor(n / 10) + (n % 10);
}

function isValidCIF(v) {
  v = normalizeId(v);
  if (!/^[A-HJUVNPQRSWKLa-hjuvnpqrswkl][0-9]{7}[0-9A-Z]$/.test(v)) return false;
  const first = v[0].toUpperCase();
  const body = v.slice(1, 8);
  const control = v[8].toUpperCase();
  let sumEven = 0;
  let sumOdd = 0;

  for (let i = 0; i < 7; i++) {
    const d = parseInt(body[i], 10);
    const pos = i + 1;
    if (pos % 2 === 0) {
      sumEven += d;
    } else {
      sumOdd += sumDigits(d * 2);
    }
  }
  const total = sumEven + sumOdd;
  const digit = (10 - (total % 10)) % 10;
  const letter = 'JABCDEFGHI'[digit];
  const mustBeDigit = 'ABEH'.includes(first);
  const mustBeLetter = 'KPQSW'.includes(first);

  if (mustBeDigit) return control === String(digit);
  if (mustBeLetter) return control === letter;
  return control === String(digit) || control === letter;
}

function isValidSpanishId(v) {
  v = normalizeId(v);
  if (!v) return false;
  return isValidNIF(v) || isValidNIE(v) || isValidCIF(v);
}

// IBAN
function normalizeIban(iban) {
  if (!iban) return '';
  return iban.replace(/\s+/g, '').toUpperCase();
}

function isValidIban(iban) {
  const v = normalizeIban(iban);
  if (!/^([A-Z]{2}[0-9]{2}[A-Z0-9]{11,30})$/.test(v)) return false;
  return v.length >= 15 && v.length <= 34;
}

// --- Endpoint /api/iban -> Stripe SEPA ---

app.post('/api/iban', async (req, res) => {
  const { name, email, iban } = req.body || {};

  if (!name || !email || !iban) {
    return res.status(400).json({ error: 'Name, email and IBAN are required' });
  }

  if (!isValidIban(iban)) {
    return res.status(400).json({ error: 'IBAN inválido' });
  }

  if (!stripeSecret) {
    return res.status(500).json({ error: 'Stripe no está configurado en el servidor' });
  }

  try {
    // 1) Cliente en Stripe
    const customer = await stripe.customers.create({
      name,
      email,
      metadata: {
        source: 'gestoria-express-form',
      },
    });

    // 2) Método de pago SEPA
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'sepa_debit',
      sepa_debit: { iban: normalizeIban(iban) },
      billing_details: { name, email },
    });

    // 3) Asociar al cliente
    await stripe.paymentMethods.attach(paymentMethod.id, { customer: customer.id });

    // 4) Dejarlo como predeterminado
    await stripe.customers.update(customer.id, {
      invoice_settings: { default_payment_method: paymentMethod.id },
    });

    res.json({
      success: true,
      customerId: customer.id,
      paymentMethodId: paymentMethod.id,
    });
  } catch (error) {
    console.error('[stripe] error', error);
    res.status(500).json({ error: error.message || 'Stripe error' });
  }
});

// --- Endpoint /api/formulario/alta -> reenvío a n8n ---

app.post('/api/formulario/alta', (req, res) => {
  const eventId = randomUUID();
  const body = req.body || {};

  // Respondemos siempre rápido al frontend
  try {
    res.json({ ok: true });
  } catch (_) {}

  const isNonEmpty = (v) => typeof v === 'string' && v.trim().length > 0;
  const emailRegex = /^\S+@\S+\.\S+$/;

  // Adaptado a TU NUEVO formulario
  const nombre = body.nombre_titular || body.nombre || '';
  const email = body.email_facturacion || body.email || '';
  const cif_nif = body.cif_nif || '';

  const validNombre = isNonEmpty(nombre);
  const validEmail = isNonEmpty(email) && emailRegex.test(email.trim());
  const validId = !cif_nif || isValidSpanishId(cif_nif);

  if (!validNombre || !validEmail || !validId) {
    console.warn('[n8n] validation_failed', {
      eventId,
      validNombre,
      validEmail,
      validId,
      body,
    });
    return;
  }

  const {
  iban_titular,         
  ...safeBody               
} = body;

// Construimos EXACTAMENTE lo que n8n recibía antes
const payload = {
  tamano_empresa: safeBody.tamano_empresa,
  actividad: safeBody.actividad,
  cif_nif: safeBody.cif_nif,
  domicilio_fiscal: safeBody.domicilio_fiscal,
  codigo_postal: safeBody.codigo_postal,
  ciudad: safeBody.ciudad,
  acepta_terminos: safeBody.acepta_terminos,
  origen: safeBody.origen,

  // Campos nuevos normalizados
  nombre_normalizado: nombre,
  email_normalizado: email,

  eventId,
  timestamp: new Date().toISOString(),
};

  console.info('[n8n] payload_to_send', { eventId, payload });

  let n8nUrl = process.env.N8N_WEBHOOK_URL;
  const n8nUrlDocker = process.env.N8N_WEBHOOK_URL_DOCKER;
  const secret = process.env.N8N_WEBHOOK_SECRET || '';
  const timeoutMs = Number(process.env.N8N_WEBHOOK_TIMEOUT_MS || 5000);
  const maxRetries = Math.max(0, Number(process.env.N8N_WEBHOOK_RETRIES || 3));

  const isDocker =
    process.env.NODE_ENV === 'docker' ||
    process.env.NODE_ENV === 'production' ||
    require('os').hostname().includes('docker') ||
    require('os').hostname().includes('compose');

  if (isDocker && n8nUrlDocker) {
    n8nUrl = n8nUrlDocker;
  }

  if (!n8nUrl) {
    console.error('[n8n] missing_webhook_url', { eventId });
    return;
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  (async () => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const controller = new AbortController();
      const to = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const resp = await fetch(n8nUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            formulario: secret,
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
        clearTimeout(to);

        if (resp.ok) {
          console.info('[n8n] dispatched', { eventId, status: resp.status });
          return;
        }
        const text = await resp.text().catch(() => '');
        console.warn('[n8n] non_200', {
          eventId,
          status: resp.status,
          body: text?.slice(0, 300),
        });
      } catch (err) {
        console.warn('[n8n] dispatch_error', { eventId, error: String(err) });
      } finally {
        clearTimeout(to);
      }

      const delay = Math.min(
        500 * Math.pow(2, attempt - 1) + Math.floor(Math.random() * 250),
        5000
      );
      await sleep(delay);
    }

    console.error('[n8n] failed_after_retries', { eventId, retries: maxRetries });
  })();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
