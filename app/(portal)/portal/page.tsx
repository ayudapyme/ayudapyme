'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

/* ─── Tipos ─────────────────────────────────────────────────────────────────── */
interface Perfil { rol: string; nif: string | null; }

interface ClienteData {
  nif: string;
  nombre_normalizado: string | null;
  actividad: string | null;
  tamano_empresa: string | null;
  ciudad: string | null;
}

interface Expediente {
  id: string;
  estado: string;
  created_at: string;
  numero_bdns: number | null;
}

interface Match {
  id: string;
  score: number;
  motivos: string[] | null;
  estado: string;
  subvencion: {
    id: string;
    titulo: string;
    organismo: string | null;
    importe_maximo: number | null;
    plazo_fin: string | null;
    resumen_ia: string | null;
    ambito_geografico: string | null;
  };
}

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
function fmtImporte(n: number | null) {
  if (!n) return null;
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}
function fmtFecha(d: string | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}
function diasRestantes(d: string | null): number | null {
  if (!d) return null;
  return Math.ceil((new Date(d).getTime() - Date.now()) / 86_400_000);
}
function initials(name: string | null) {
  if (!name) return 'AP';
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

const ESTADO_MAP: Record<string, { label: string; color: string; bg: string }> = {
  lead_caliente: { label: 'Interesado',     color: '#d97706', bg: '#fffbeb' },
  en_proceso:    { label: 'En tramitación', color: '#1d4ed8', bg: '#eff4ff' },
  presentado:    { label: 'Presentado',     color: '#7c3aed', bg: '#f5f3ff' },
  resuelto:      { label: 'Resuelto ✓',    color: '#059669', bg: '#ecfdf5' },
  descartado:    { label: 'Descartado',     color: '#94a3b8', bg: '#f1f5f9' },
};

/* ─── Componente principal ───────────────────────────────────────────────────── */
export default function PortalClientePage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading]           = useState(true);
  const [cliente, setCliente]           = useState<ClienteData | null>(null);
  const [expedientes, setExpedientes]   = useState<Expediente[]>([]);
  const [matches, setMatches]           = useState<Match[]>([]);
  const [sidebarTab, setSidebarTab]     = useState<'dashboard' | 'expedientes' | 'ayudas'>('dashboard');
  const [expanded, setExpanded]         = useState<Record<string, boolean>>({});
  const [modalOpen, setModalOpen]       = useState(false);
  const [modalMatch, setModalMatch]     = useState<Match | null>(null);
  const [qaAnswers, setQaAnswers]       = useState<Record<number, 'yes' | 'no'>>({});
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    async function cargar() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/'); return; }

      const { data: p } = await supabase
        .from('perfiles').select('rol, nif').eq('id', user.id).maybeSingle();
      const rol = (p as Perfil | null)?.rol ?? (user.user_metadata?.rol as string) ?? 'cliente';
      const nif = (p as Perfil | null)?.nif ?? (user.user_metadata?.nif as string) ?? null;

      if (rol === 'admin') { router.push('/clientes'); return; }

      if (nif) {
        const { data: c } = await supabase
          .from('cliente').select('nif, nombre_normalizado, actividad, tamano_empresa, ciudad')
          .eq('nif', nif).maybeSingle();
        setCliente(c as ClienteData | null);

        const { data: exps } = await supabase
          .from('expediente').select('id, estado, created_at, numero_bdns')
          .eq('nif', nif).order('created_at', { ascending: false });
        setExpedientes((exps as Expediente[]) ?? []);

        const { data: ms } = await supabase
          .from('cliente_subvencion_match')
          .select(`id, score, motivos, estado,
            subvencion:subvencion_id(id, titulo, organismo, importe_maximo, plazo_fin, resumen_ia, ambito_geografico)`)
          .eq('nif', nif).neq('estado', 'descartado')
          .order('score', { ascending: false }).limit(20);
        setMatches((ms as unknown as Match[]) ?? []);
      }
      setLoading(false);
    }
    cargar();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  function openModal(m: Match) {
    setModalMatch(m);
    setQaAnswers({});
    setModalOpen(true);
  }

  function confirmTramitar() {
    setModalOpen(false);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4500);
  }

  function toggleExpanded(id: string) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f6fb' }}>
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: '#0d7377' }} />
      </div>
    );
  }

  const matchesAltos  = matches.filter(m => m.score >= 0.7);
  const matchesMedios = matches.filter(m => m.score >= 0.4 && m.score < 0.7);
  const expActivos    = expedientes.filter(e => !['resuelto', 'descartado'].includes(e.estado));
  const importePot    = matches.reduce((acc, m) => acc + (m.subvencion.importe_maximo ?? 0), 0);
  const proximoVence  = matches
    .map(m => m.subvencion.plazo_fin ? diasRestantes(m.subvencion.plazo_fin) : null)
    .filter((d): d is number => d !== null && d > 0)
    .sort((a, b) => a - b)[0] ?? null;
  const proximoVenceNombre = proximoVence !== null
    ? matches.find(m => m.subvencion.plazo_fin && diasRestantes(m.subvencion.plazo_fin) === proximoVence)
        ?.subvencion.titulo?.substring(0, 28) + '…'
    : '';

  return (
    <>
      <style>{`
        @keyframes portalUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes portalPulse { 0%,100%{opacity:1} 50%{opacity:.3} }
        .p-card-anim { animation:portalUp .4s ease both; }
        .p-card-anim:nth-child(1){animation-delay:.04s}
        .p-card-anim:nth-child(2){animation-delay:.08s}
        .p-card-anim:nth-child(3){animation-delay:.12s}
        .p-card-anim:nth-child(4){animation-delay:.16s}
        .p-card-anim:nth-child(5){animation-delay:.20s}
        .p-sb-item:hover:not(.p-sb-active){background:#f4f6fb!important;color:#0d1f3c!important;}
        .p-subv-card{transition:box-shadow .25s,transform .25s;}
        .p-subv-card:hover{box-shadow:0 4px 16px rgba(13,31,60,.1)!important;transform:translateY(-2px);border-color:#d0d5e8!important;}
        .p-btn-enc:hover{background:#162d52!important;transform:translateY(-1px);}
        .p-btn-close:hover{border-color:#4a5568!important;color:#0d1f3c!important;}
        .p-qa-btn{transition:all .15s;}
        .p-nav-logout:hover{background:#f4f6fb!important;}
      `}</style>

      <div style={{ minHeight:'100vh', background:'#f4f6fb', fontFamily:"'Plus Jakarta Sans',sans-serif", color:'#0d1f3c' }}>

        {/* ── NAV ─────────────────────────────────────────────────────────────── */}
        <nav style={{
          background:'#fff', borderBottom:'1px solid #e8ecf4',
          height:60, display:'flex', alignItems:'center',
          padding:'0 32px', justifyContent:'space-between',
          position:'sticky', top:0, zIndex:50,
          boxShadow:'0 1px 3px rgba(13,31,60,.06)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:9 }}>
            <div style={{
              width:32, height:32, background:'#0d1f3c', borderRadius:8,
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#fff', fontWeight:800, fontSize:'.8rem',
            }}>AP</div>
            <span style={{ fontWeight:700, fontSize:'.9rem' }}>AyudaPyme</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{
              display:'flex', alignItems:'center', gap:8,
              padding:'5px 12px', background:'#f4f6fb',
              border:'1px solid #e8ecf4', borderRadius:8,
            }}>
              <div style={{
                width:26, height:26, background:'#0d7377', borderRadius:'50%',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#fff', fontWeight:700, fontSize:'.7rem',
              }}>
                {initials(cliente?.nombre_normalizado ?? null)}
              </div>
              <span style={{ fontSize:'.82rem', fontWeight:600, color:'#4a5568' }}>
                {cliente?.nombre_normalizado ?? 'Mi empresa'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-nav-logout"
              style={{
                padding:'7px 14px', background:'transparent',
                border:'1px solid #e8ecf4', borderRadius:8,
                color:'#4a5568', cursor:'pointer', fontSize:'.8rem',
                fontWeight:600, fontFamily:'inherit',
              }}
            >
              Salir
            </button>
          </div>
        </nav>

        <div style={{ display:'flex', minHeight:'calc(100vh - 60px)' }}>

          {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
          <aside style={{
            width:220, flexShrink:0,
            background:'#fff', borderRight:'1px solid #e8ecf4',
            padding:'24px 0', position:'sticky', top:60,
            height:'calc(100vh - 60px)', overflowY:'auto',
          }}>
            <SidebarSection label="Principal">
              <SidebarItem icon="🏠" label="Dashboard"
                active={sidebarTab==='dashboard'}
                onClick={()=>setSidebarTab('dashboard')} />
              <SidebarItem icon="📋" label="Mis expedientes"
                badge={expActivos.length>0 ? expActivos.length : undefined}
                active={sidebarTab==='expedientes'}
                onClick={()=>setSidebarTab('expedientes')} />
              <SidebarItem icon="🔍" label="Todas las ayudas"
                active={sidebarTab==='ayudas'}
                onClick={()=>setSidebarTab('ayudas')} />
            </SidebarSection>

            <div style={{ height:1, background:'#e8ecf4', margin:'12px 16px' }} />

            <SidebarSection label="Gestión">
              <SidebarItem icon="📁" label="Documentación" onClick={()=>{}} />
              <SidebarItem icon="📅" label="Calendario" onClick={()=>{}} />
              <SidebarItem icon="💬" label="Mi gestor" onClick={()=>{}} />
            </SidebarSection>

            <div style={{ height:1, background:'#e8ecf4', margin:'12px 16px' }} />

            <SidebarSection label="Cuenta">
              <SidebarItem icon="⚙️" label="Perfil empresa" onClick={()=>{}} />
            </SidebarSection>

            {!cliente?.actividad && (
              <div style={{
                margin:'16px 16px 0', padding:14,
                background:'#fffbeb', border:'1px solid #fcd34d', borderRadius:10,
              }}>
                <div style={{ fontSize:'.75rem', fontWeight:700, color:'#d97706', marginBottom:8 }}>
                  ⏳ Perfil incompleto
                </div>
                <div style={{ height:5, background:'#fde68a', borderRadius:100, overflow:'hidden' }}>
                  <div style={{ height:'100%', background:'#d97706', borderRadius:100, width:'60%' }} />
                </div>
                <div style={{ fontSize:'.7rem', color:'#92400e', marginTop:6, fontWeight:500 }}>
                  Completa tu perfil para mejorar el análisis de encaje
                </div>
              </div>
            )}
          </aside>

          {/* ── MAIN ────────────────────────────────────────────────────────── */}
          <main style={{ flex:1, padding:'32px 36px 60px', overflowY:'auto', maxWidth:960 }}>

            {/* DASHBOARD */}
            {sidebarTab === 'dashboard' && (
              <>
                {/* Saludo */}
                <div style={{ marginBottom:28 }}>
                  <div style={{ fontSize:'.68rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em', color:'#94a3b8', marginBottom:6 }}>
                    Dashboard personalizado
                  </div>
                  <h1 style={{ fontSize:'1.65rem', fontWeight:800, letterSpacing:'-.03em', lineHeight:1.15, marginBottom:6 }}>
                    Hola, <span style={{ color:'#0d7377' }}>{cliente?.nombre_normalizado?.split(' ')[0] ?? 'bienvenido'}</span> 👋
                  </h1>
                  <p style={{ fontSize:'.88rem', color:'#4a5568' }}>
                    {matchesAltos.length > 0 ? (
                      <>Hemos encontrado <strong>{matchesAltos.length} subvenciones que encajan contigo</strong>
                      {importePot > 0 && <> — importe potencial estimado: <strong style={{ color:'#0d7377' }}>~{fmtImporte(importePot)}</strong></>}</>
                    ) : 'Estamos analizando las subvenciones disponibles para tu perfil.'}
                  </p>
                </div>

                {/* Summary cards */}
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:28 }}>
                  <SummaryCard label="Subvenciones recomendadas" value={String(matchesAltos.length)} sub="Analizadas para tu perfil" valColor="#0d1f3c" />
                  <SummaryCard label="Importe potencial" value={importePot > 0 ? `~${fmtImporte(importePot)}` : '—'} sub="Estimación con tu perfil actual" valColor="#059669" />
                  <SummaryCard label="Próximo cierre" value={proximoVence !== null ? `${proximoVence} días` : '—'} sub={proximoVenceNombre ?? 'Sin fechas próximas'} valColor="#d97706" />
                </div>

                {/* Banner acción */}
                {!cliente?.actividad && (
                  <div style={{
                    background:'linear-gradient(135deg,#0d1f3c,#0d4a6e)',
                    borderRadius:14, padding:'20px 24px',
                    display:'flex', alignItems:'center', justifyContent:'space-between', gap:16,
                    marginBottom:32, boxShadow:'0 4px 16px rgba(13,31,60,.1)', flexWrap:'wrap',
                  }}>
                    <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                      <span style={{ fontSize:'1.6rem' }}>⚡</span>
                      <div>
                        <div style={{ fontSize:'.95rem', fontWeight:700, color:'#fff', letterSpacing:'-.01em' }}>
                          Acción recomendada: completa tu perfil ahora
                        </div>
                        <div style={{ fontSize:'.8rem', color:'rgba(255,255,255,.6)', marginTop:2 }}>
                          Sin actividad y datos completos no podemos calcular tu elegibilidad real
                        </div>
                      </div>
                    </div>
                    <button style={{
                      padding:'9px 20px', background:'#fff', color:'#0d1f3c',
                      fontFamily:'inherit', fontWeight:700, fontSize:'.82rem',
                      border:'none', borderRadius:8, cursor:'pointer', whiteSpace:'nowrap',
                    }}>Completar perfil →</button>
                  </div>
                )}

                {/* Recomendadas */}
                {matchesAltos.length > 0 && (
                  <>
                    <SectionHeader title="🔥 Muy recomendables para ti" badge="Alta probabilidad" badgeStyle={{ background:'#fff7ed', color:'#f97316', border:'1px solid #fed7aa' }} />
                    <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:32 }}>
                      {matchesAltos.map((m,i) => (
                        <SubvCard key={m.id} match={m} idx={i} expanded={!!expanded[m.id]} onToggle={()=>toggleExpanded(m.id)} onEncaje={()=>openModal(m)} strip="fire" />
                      ))}
                    </div>
                  </>
                )}

                {/* Parciales */}
                {matchesMedios.length > 0 && (
                  <>
                    <SectionHeader title="👍 Posibles para tu perfil" badge="Encaje parcial" badgeStyle={{ background:'#eff4ff', color:'#1d4ed8', border:'1px solid #bfdbfe' }} />
                    <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:32 }}>
                      {matchesMedios.map((m,i) => (
                        <SubvCard key={m.id} match={m} idx={i} expanded={!!expanded[m.id]} onToggle={()=>toggleExpanded(m.id)} onEncaje={()=>openModal(m)} strip="good" />
                      ))}
                    </div>
                  </>
                )}

                {matches.length === 0 && (
                  <EmptyBox icon="🔍" text="Todavía estamos analizando qué subvenciones encajan con tu empresa. Vuelve pronto." />
                )}
              </>
            )}

            {/* EXPEDIENTES */}
            {sidebarTab === 'expedientes' && (
              <>
                <PageTitle title="Mis expedientes" sub="Seguimiento de todas las tramitaciones en curso." />
                {expedientes.length === 0
                  ? <EmptyBox icon="📭" text="No tienes expedientes todavía. Cuando empecemos a tramitar una subvención contigo, aparecerá aquí." />
                  : <div style={{ display:'flex', flexDirection:'column', gap:10 }}>{expedientes.map(exp => <ExpRow key={exp.id} exp={exp} />)}</div>
                }
              </>
            )}

            {/* TODAS LAS AYUDAS */}
            {sidebarTab === 'ayudas' && (
              <>
                <PageTitle title="Subvenciones para ti" sub="Todas las ayudas analizadas para el perfil de tu empresa." />
                {matches.length === 0
                  ? <EmptyBox icon="🔍" text="Todavía estamos analizando qué subvenciones encajan con tu empresa." />
                  : (
                    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                      {matches.map((m,i) => (
                        <SubvCard key={m.id} match={m} idx={i} expanded={!!expanded[m.id]} onToggle={()=>toggleExpanded(m.id)} onEncaje={()=>openModal(m)} strip={m.score>=0.7?'fire':'good'} />
                      ))}
                    </div>
                  )
                }
              </>
            )}

          </main>
        </div>
      </div>

      {/* ── MODAL ENCAJE ─────────────────────────────────────────────────────── */}
      {modalOpen && modalMatch && (
        <div
          onClick={e=>{ if (e.target===e.currentTarget) setModalOpen(false); }}
          style={{
            position:'fixed', inset:0,
            background:'rgba(13,31,60,.45)', backdropFilter:'blur(8px)',
            zIndex:100, display:'flex', alignItems:'center', justifyContent:'center',
          }}
        >
          <div style={{
            background:'#fff', border:'1px solid #e8ecf4', borderRadius:18,
            padding:36, maxWidth:500, width:'92%',
            boxShadow:'0 16px 48px rgba(13,31,60,.14)',
            maxHeight:'90vh', overflowY:'auto',
          }}>
            {/* Head */}
            <div style={{ display:'flex', alignItems:'flex-start', gap:12, marginBottom:20 }}>
              <div style={{ width:44, height:44, background:'#eff4ff', borderRadius:11, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0 }}>🎯</div>
              <div>
                <h2 style={{ fontSize:'1.15rem', fontWeight:800, letterSpacing:'-.02em', lineHeight:1.2 }}>Análisis de encaje</h2>
                <p style={{ fontSize:'.78rem', color:'#94a3b8', marginTop:2 }}>5 preguntas rápidas — menos de 1 minuto</p>
              </div>
            </div>

            {/* Nombre subvención */}
            <div style={{ background:'#f4f6fb', border:'1px solid #e8ecf4', borderRadius:9, padding:'11px 14px', fontSize:'.85rem', fontWeight:600, marginBottom:18, lineHeight:1.4 }}>
              {modalMatch.subvencion.titulo}
            </div>

            {/* Q&A */}
            <div style={{ marginBottom:18 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:'.78rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'#94a3b8', marginBottom:10 }}>
                <span style={{ width:18, height:18, background:'#0d1f3c', borderRadius:'50%', color:'#fff', fontSize:'.6rem', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, flexShrink:0 }}>1</span>
                Comprobación rápida
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[
                  '¿Llevas más de 2 años operando?',
                  '¿Estás al corriente con AEAT y SS?',
                  '¿Tienes o planeas un proyecto de mejora?',
                  '¿Tienes al menos 3 empleados?',
                  '¿Puedes dedicar 2–3h para documentación?',
                ].map((q,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'10px 13px', background:'#f4f6fb', border:'1px solid #e8ecf4', borderRadius:9 }}>
                    <span style={{ fontSize:'.82rem', fontWeight:500, color:'#4a5568' }}>{q}</span>
                    <div style={{ display:'flex', gap:5, flexShrink:0 }}>
                      {(['yes','no'] as const).map(val => (
                        <button key={val} className="p-qa-btn" onClick={()=>setQaAnswers(prev=>({...prev,[i]:val}))}
                          style={{
                            padding:'4px 13px', fontSize:'.75rem', fontWeight:600, borderRadius:6,
                            cursor:'pointer', fontFamily:'inherit',
                            background: qaAnswers[i]===val ? (val==='yes'?'#ecfdf5':'#fef2f2') : '#fff',
                            border: `1px solid ${qaAnswers[i]===val ? (val==='yes'?'#a7f3d0':'#fecaca') : '#e8ecf4'}`,
                            color: qaAnswers[i]===val ? (val==='yes'?'#059669':'#dc2626') : '#4a5568',
                          }}>
                          {val==='yes'?'Sí':'No'}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Score */}
            <div style={{ background:'#ecfdf5', border:'1px solid #a7f3d0', borderRadius:11, padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
              <span style={{ fontSize:'1.6rem' }}>🎯</span>
              <div>
                <div style={{ fontSize:'1.4rem', fontWeight:800, color:'#059669', letterSpacing:'-.03em', lineHeight:1 }}>{Math.round(modalMatch.score*100)}%</div>
                <div style={{ fontSize:'.75rem', color:'#4a5568', fontWeight:500, marginTop:2 }}>Probabilidad estimada de concesión</div>
                <div style={{ fontSize:'.72rem', color:'#94a3b8' }}>Basado en tu perfil de empresa + respuestas</div>
              </div>
            </div>

            <div style={{ height:1, background:'#e8ecf4', margin:'16px 0' }} />

            <div style={{ display:'flex', gap:9 }}>
              <button className="p-btn-enc" onClick={confirmTramitar} style={{ flex:1, padding:12, background:'#0d1f3c', color:'#fff', fontFamily:'inherit', fontWeight:700, fontSize:'.88rem', border:'none', borderRadius:9, cursor:'pointer', boxShadow:'0 2px 10px rgba(13,31,60,.2)' }}>
                ✅ Quiero que lo tramitéis
              </button>
              <button className="p-btn-close" onClick={()=>setModalOpen(false)} style={{ padding:'12px 20px', background:'transparent', color:'#94a3b8', fontFamily:'inherit', fontSize:'.85rem', fontWeight:500, border:'1px solid #e8ecf4', borderRadius:9, cursor:'pointer' }}>
                Ahora no
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ─────────────────────────────────────────────────────────────── */}
      <div style={{
        position:'fixed', bottom:24, left:'50%',
        transform:`translateX(-50%) translateY(${toastVisible?'0':'60px'})`,
        opacity: toastVisible ? 1 : 0,
        background:'#0d1f3c', color:'#fff',
        fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600,
        padding:'11px 22px', borderRadius:100, fontSize:'.84rem',
        zIndex:200, transition:'all .35s cubic-bezier(.4,0,.2,1)',
        display:'flex', alignItems:'center', gap:8,
        boxShadow:'0 8px 28px rgba(13,31,60,.25)', whiteSpace:'nowrap',
        pointerEvents:'none',
      }}>
        <span style={{ width:18, height:18, background:'#059669', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.6rem', fontWeight:800 }}>✓</span>
        Expediente iniciado — tu gestor te contactará en 24h
      </div>
    </>
  );
}

/* ─── Sub-componentes ────────────────────────────────────────────────────────── */

function SidebarSection({ label, children }: { label:string; children:React.ReactNode }) {
  return (
    <div style={{ padding:'0 16px', marginBottom:6 }}>
      <div style={{ fontSize:'.62rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em', color:'#94a3b8', padding:'0 8px', marginBottom:6 }}>{label}</div>
      {children}
    </div>
  );
}

function SidebarItem({ icon, label, active, badge, onClick }: { icon:string; label:string; active?:boolean; badge?:number; onClick:()=>void }) {
  return (
    <button onClick={onClick} className={`p-sb-item${active?' p-sb-active':''}`} style={{
      display:'flex', alignItems:'center', gap:9, padding:'8px 10px', borderRadius:8,
      fontSize:'.83rem', fontWeight: active?600:500,
      color: active?'#1d4ed8':'#4a5568',
      background: active?'#eff4ff':'transparent',
      cursor:'pointer', border:'none', width:'100%', textAlign:'left',
      fontFamily:'inherit', marginBottom:2,
    }}>
      <span style={{ fontSize:'.95rem', width:20, textAlign:'center', flexShrink:0 }}>{icon}</span>
      <span style={{ flex:1 }}>{label}</span>
      {badge !== undefined && badge > 0 && (
        <span style={{ background:'#dc2626', color:'#fff', fontSize:'.6rem', fontWeight:700, padding:'1px 6px', borderRadius:100 }}>{badge}</span>
      )}
    </button>
  );
}

function SummaryCard({ label, value, sub, valColor }: { label:string; value:string; sub:string; valColor:string }) {
  return (
    <div style={{ background:'#fff', border:'1px solid #e8ecf4', borderRadius:12, padding:'16px 18px', boxShadow:'0 1px 3px rgba(13,31,60,.06)' }}>
      <div style={{ fontSize:'.68rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.09em', color:'#94a3b8', marginBottom:6 }}>{label}</div>
      <div style={{ fontSize:'1.55rem', fontWeight:800, letterSpacing:'-.03em', lineHeight:1, color:valColor }}>{value}</div>
      <div style={{ fontSize:'.72rem', color:'#94a3b8', marginTop:4 }}>{sub}</div>
    </div>
  );
}

function SectionHeader({ title, badge, badgeStyle }: { title:string; badge:string; badgeStyle:React.CSSProperties }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
      <h2 style={{ fontSize:'1rem', fontWeight:700, letterSpacing:'-.01em' }}>{title}</h2>
      <span style={{ fontSize:'.68rem', fontWeight:700, padding:'3px 10px', borderRadius:100, ...badgeStyle }}>{badge}</span>
    </div>
  );
}

function PageTitle({ title, sub }: { title:string; sub:string }) {
  return (
    <div style={{ marginBottom:24 }}>
      <h1 style={{ fontSize:'1.4rem', fontWeight:800, letterSpacing:'-.02em' }}>{title}</h1>
      <p style={{ fontSize:'.85rem', color:'#4a5568', marginTop:4 }}>{sub}</p>
    </div>
  );
}

function SubvCard({ match:m, idx, expanded, onToggle, onEncaje, strip }: {
  match:Match; idx:number; expanded:boolean;
  onToggle:()=>void; onEncaje:()=>void; strip:'fire'|'good'|'hard';
}) {
  const pct  = Math.round((m.score??0)*100);
  const dias = diasRestantes(m.subvencion.plazo_fin);
  const isUrgent = dias!==null && dias<=10 && dias>0;

  const stripGrad = strip==='fire'
    ? 'linear-gradient(90deg,#f97316,#fbbf24)'
    : strip==='good'
    ? 'linear-gradient(90deg,#059669,#34d399)'
    : 'linear-gradient(90deg,#94a3b8,#cbd5e1)';

  const badge = pct>=80
    ? { bg:'#fff7ed', color:'#f97316', border:'#fed7aa', icon:'🔥' }
    : pct>=60
    ? { bg:'#ecfdf5', color:'#059669', border:'#a7f3d0', icon:'✅' }
    : { bg:'#f8fafc', color:'#94a3b8', border:'#e8ecf4', icon:'⚠️' };

  return (
    <div className="p-subv-card p-card-anim" style={{ background:'#fff', border:'1px solid #e8ecf4', borderRadius:14, overflow:'hidden', boxShadow:'0 1px 3px rgba(13,31,60,.06)', animationDelay:`${idx*.04}s` }}>
      <div style={{ height:3, background:stripGrad }} />

      <div style={{ padding:'18px 22px' }}>
        {/* Badges */}
        <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:10 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:'.72rem', fontWeight:700, padding:'3px 10px', borderRadius:100, background:badge.bg, color:badge.color, border:`1px solid ${badge.border}` }}>
            {badge.icon} {pct}% de encaje
          </span>
          {m.subvencion.plazo_fin && (
            <span style={{
              display:'inline-flex', alignItems:'center', gap:4,
              fontSize:'.68rem', fontWeight:600, padding:'3px 9px', borderRadius:100,
              background: dias!==null&&dias<=0?'#f1f5f9' : dias!==null&&dias<=10?'#fffbeb':'#ecfdf5',
              color: dias!==null&&dias<=0?'#94a3b8' : dias!==null&&dias<=10?'#d97706':'#059669',
            }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'currentColor', display:'inline-block', animation:isUrgent?'portalPulse 1.2s infinite':'none' }} />
              {dias!==null&&dias<=0?'Cerrada':dias!==null?`Cierra en ${dias}d`:fmtFecha(m.subvencion.plazo_fin)}
            </span>
          )}
          {isUrgent && <span style={{ fontSize:'.68rem', fontWeight:700, padding:'3px 9px', borderRadius:100, background:'#fef2f2', color:'#dc2626' }}>⚠️ Urgente</span>}
        </div>

        <div style={{ fontSize:'.65rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em', color:'#94a3b8', marginBottom:4 }}>
          {m.subvencion.organismo ?? 'Organismo'}
        </div>
        <div style={{ fontSize:'.97rem', fontWeight:700, letterSpacing:'-.01em', lineHeight:1.3, marginBottom:6 }}>
          {m.subvencion.titulo}
        </div>

        {m.motivos && m.motivos.length>0 && (
          <div style={{ background:'#f0f7ff', border:'1px solid #dbeafe', borderRadius:9, padding:'10px 13px', margin:'10px 0' }}>
            <div style={{ fontSize:'.6rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em', color:'#3b82f6', marginBottom:3 }}>Por qué encaja contigo</div>
            <div style={{ fontSize:'.8rem', color:'#4a5568', lineHeight:1.55 }}>{m.motivos[0]}</div>
          </div>
        )}

        {m.subvencion.importe_maximo && (
          <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:8 }}>
            <span style={{ fontSize:'1.1rem', fontWeight:800, color:'#0d7377', letterSpacing:'-.02em' }}>{fmtImporte(m.subvencion.importe_maximo)}</span>
            <span style={{ fontSize:'.72rem', color:'#94a3b8', fontWeight:500 }}>importe máximo</span>
          </div>
        )}
      </div>

      {/* Toggle */}
      <button onClick={onToggle} style={{
        display:'flex', alignItems:'center', gap:5,
        background:'none', border:'none', borderTop:'1px solid #e8ecf4',
        width:'100%', padding:'11px 22px',
        fontFamily:'inherit', fontSize:'.76rem', fontWeight:600,
        color: expanded?'#4a5568':'#94a3b8', cursor:'pointer', textAlign:'left',
      }}>
        <span style={{
          width:16, height:16, borderRadius:'50%',
          background: expanded?'#0d1f3c':'#f4f6fb',
          border:`1px solid ${expanded?'#0d1f3c':'#e8ecf4'}`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'.6rem', color: expanded?'#fff':'#94a3b8',
          transform: expanded?'rotate(180deg)':'none',
          transition:'transform .25s, background .2s',
          flexShrink:0,
        }}>↓</span>
        {expanded ? 'Ocultar detalles' : 'Ver detalles y análisis'}
      </button>

      {/* Detalles */}
      <div style={{ maxHeight:expanded?600:0, overflow:'hidden', opacity:expanded?1:0, transition:'max-height .38s cubic-bezier(.4,0,.2,1), opacity .3s' }}>
        <div style={{ padding:'4px 22px 16px', borderTop:'1px solid #e8ecf4', display:'flex', flexDirection:'column', gap:10 }}>
          {m.subvencion.resumen_ia && (
            <p style={{ fontSize:'.81rem', color:'#4a5568', lineHeight:1.65, paddingTop:12 }}>{m.subvencion.resumen_ia}</p>
          )}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7 }}>
            {m.subvencion.importe_maximo && (
              <div style={{ background:'#f4f6fb', border:'1px solid #e8ecf4', borderRadius:9, padding:'9px 12px' }}>
                <div style={{ fontSize:'.6rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'#94a3b8', marginBottom:2 }}>Importe</div>
                <div style={{ fontSize:'.83rem', fontWeight:600, color:'#0d7377' }}>{fmtImporte(m.subvencion.importe_maximo)}</div>
              </div>
            )}
            {m.subvencion.plazo_fin && (
              <div style={{ background:'#f4f6fb', border:'1px solid #e8ecf4', borderRadius:9, padding:'9px 12px' }}>
                <div style={{ fontSize:'.6rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'#94a3b8', marginBottom:2 }}>Fin de plazo</div>
                <div style={{ fontSize:'.83rem', fontWeight:600 }}>{fmtFecha(m.subvencion.plazo_fin)}</div>
              </div>
            )}
            {m.subvencion.ambito_geografico && (
              <div style={{ background:'#f4f6fb', border:'1px solid #e8ecf4', borderRadius:9, padding:'9px 12px' }}>
                <div style={{ fontSize:'.6rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'#94a3b8', marginBottom:2 }}>Ámbito</div>
                <div style={{ fontSize:'.83rem', fontWeight:600 }}>{m.subvencion.ambito_geografico}</div>
              </div>
            )}
          </div>
          {m.motivos && m.motivos.length>1 && (
            <div>
              <div style={{ fontSize:'.68rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'#94a3b8', marginBottom:6 }}>Requisitos que cumples</div>
              {m.motivos.map((mot,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:'.8rem', color:'#4a5568', fontWeight:500, marginBottom:4 }}>
                  ✅ {mot}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'12px 22px 16px', borderTop:'1px solid #e8ecf4', background:'#fafbfd', flexWrap:'wrap' }}>
        <span style={{ fontSize:'.67rem', color:'#94a3b8', fontWeight:500 }}>
          {m.subvencion.id ? `ID ${m.subvencion.id.substring(0,8)}…` : ''}
        </span>
        <button className="p-btn-enc" onClick={onEncaje} style={{
          display:'inline-flex', alignItems:'center', gap:5, padding:'8px 18px',
          background:'#0d1f3c', color:'#fff', fontFamily:'inherit', fontWeight:700,
          fontSize:'.8rem', border:'none', borderRadius:8, cursor:'pointer',
          boxShadow:'0 2px 8px rgba(13,31,60,.15)',
        }}>
          Ver encaje completo →
        </button>
      </div>
    </div>
  );
}

function ExpRow({ exp }: { exp:Expediente }) {
  const est = ESTADO_MAP[exp.estado] ?? { label:exp.estado, color:'#64748b', bg:'#f1f5f9' };
  return (
    <div style={{ background:'#fff', border:'1px solid #e8ecf4', borderRadius:10, padding:'14px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, minWidth:0 }}>
        <span style={{ fontSize:'1.1rem', flexShrink:0 }}>📋</span>
        <div style={{ minWidth:0 }}>
          <div style={{ fontWeight:700, fontSize:'.85rem', color:'#0d1f3c', marginBottom:2 }}>
            {exp.numero_bdns ? `Subvención BDNS #${exp.numero_bdns}` : 'Expediente en estudio'}
          </div>
          <div style={{ fontSize:'.75rem', color:'#4a5568' }}>
            Abierto el {new Date(exp.created_at).toLocaleDateString('es-ES')}
          </div>
        </div>
      </div>
      <span style={{ background:est.bg, color:est.color, borderRadius:6, padding:'3px 10px', fontSize:'.73rem', fontWeight:700, flexShrink:0 }}>
        {est.label}
      </span>
    </div>
  );
}

function EmptyBox({ icon, text }: { icon:string; text:string }) {
  return (
    <div style={{ background:'#fff', border:'1px dashed #e8ecf4', borderRadius:14, padding:'48px 24px', textAlign:'center' }}>
      <div style={{ fontSize:'2rem', marginBottom:12 }}>{icon}</div>
      <p style={{ color:'#4a5568', fontSize:'.85rem', maxWidth:360, margin:'0 auto' }}>{text}</p>
    </div>
  );
}
