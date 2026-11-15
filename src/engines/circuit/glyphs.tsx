// Hình vẽ các linh kiện. Toạ độ cục bộ: cực a ở (0,0), cực b ở (80,0).
// Nhóm cha sẽ xoay hình theo hướng linh kiện; chữ bên trong được xoay ngược lại để luôn đứng thẳng.

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { MATERIALS, Part, WIRE_MATERIALS } from './model';

export type View = 'real' | 'schematic';

export interface GlyphState {
  /** Độ sáng đèn/LED 0..1.5 */
  glow: number;
  /** Mức nóng 0..1 (dây đốt, nguồn bị đoản mạch) */
  heat: number;
  /** Chuông đang reo / nam châm đang hút */
  active: boolean;
  /** Lượng đồng bám vào điện cực 0..1; dấu cho biết điện cực nào (+: cực b, −: cực a) */
  copper: number;
  /** Số chỉ đồng hồ (A hoặc V) */
  reading: number;
  /** Có hiển thị số đo (kim đồng hồ) không */
  showValues: boolean;
}

/** true khi linh kiện hướng sang trái: hình được lật gương (thay vì xoay 180°) để không bị lộn ngược. */
export const MirrorCtx = createContext(false);

/** Phép biến đổi giữ cho chữ/mặt đồng hồ luôn đứng thẳng và đọc được. */
function upright(mirror: boolean, rot: number, x: number, y: number) {
  if (mirror) return `translate(${2 * x} 0) scale(-1 1)`;
  return rot ? `rotate(${-rot} ${x} ${y})` : undefined;
}

const INK = 'var(--ink)';
const LEAD = 'var(--lead)';
/** Mặt đồng hồ luôn sáng màu nên vạch chia luôn dùng màu tối (kể cả ở nền tối). */
const DIAL_INK = '#1b2430';

function Txt({ x, y, rot, size = 14, children, weight = 700, fill = INK, anchor = 'middle' }: { x: number; y: number; rot: number; size?: number; children: ReactNode; weight?: number; fill?: string; anchor?: 'middle' | 'start' | 'end' }) {
  const mirror = useContext(MirrorCtx);
  return (
    <text x={x} y={y} transform={upright(mirror, rot, x, y)} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} dominantBaseline="central" style={{ pointerEvents: 'none' }}>
      {children}
    </text>
  );
}

function Leads({ x1, x2, schematic }: { x1: number; x2: number; schematic: boolean }) {
  const s = schematic ? INK : LEAD;
  const w = schematic ? 3 : 5;
  return (
    <g stroke={s} strokeWidth={w} strokeLinecap="round">
      <line x1={0} y1={0} x2={x1} y2={0} />
      <line x1={x2} y1={0} x2={80} y2={0} />
    </g>
  );
}

const BAND = ['#111', '#7b3f00', '#d40000', '#ff7f00', '#ffd700', '#139a43', '#1f4fd8', '#7d3cb5', '#888', '#fff'];
function resistorBands(R: number): string[] {
  if (!(R > 0) || !Number.isFinite(R)) return ['#111', '#111', '#111', '#c9a227'];
  let e = Math.floor(Math.log10(R)) - 1;
  let v = Math.round(R / 10 ** e);
  if (v >= 100) {
    v = 10;
    e += 1;
  }
  const d1 = Math.floor(v / 10);
  const d2 = v % 10;
  const mult = e >= 0 ? BAND[Math.min(e, 9)] : e === -1 ? '#c9a227' : '#c0c0c0';
  return [BAND[d1], BAND[d2], mult, '#c9a227'];
}

const LED_COLOR: Record<string, string> = { red: '#ff3b30', green: '#2ecc40', blue: '#2f80ff', yellow: '#ffd60a' };

const MAT_COLOR: Record<string, string> = {
  dong: '#c87533',
  nhom: '#c4cad0',
  sat: '#6e6e6e',
  than: '#2b2b2b',
  nhua: '#e8505b',
  go: '#b07a4a',
  thuyTinh: '#bfe9f2',
  caoSu: '#3a3a3a',
  nuocMuoi: '#9fd3f5',
  nuocCat: '#d8f0ff',
};

const WIRE_COLOR: Record<string, string> = {
  dong: '#c87533',
  nhom: '#b8bec4',
  sat: '#777',
  nikelin: '#9aa3a8',
  constantan: '#a89a7a',
  nicrom: '#8a8f99',
};

/** Mặt đồng hồ kim (dùng cả trên bàn và trong bảng phóng to). */
export function Dial({ cx, cy, r, value, range, unit, showValues, rot = 0, detailed = false }: { cx: number; cy: number; r: number; value: number; range: number; unit: 'A' | 'V'; showValues: boolean; rot?: number; detailed?: boolean }) {
  const mirror = useContext(MirrorCtx);
  const a0 = -140;
  const a1 = -40;
  const frac = showValues ? Math.max(-0.06, Math.min(1.06, value / range)) : 0;
  const ang = ((a0 + (a1 - a0) * frac) * Math.PI) / 180;
  const step = majorStep(range);
  const minor = step / 5;
  const ticks: ReactNode[] = [];
  const n = Math.round(range / minor);
  for (let i = 0; i <= n; i++) {
    const v = i * minor;
    const t = ((a0 + ((a1 - a0) * v) / range) * Math.PI) / 180;
    const major = Math.abs(v / step - Math.round(v / step)) < 1e-6;
    const r1 = detailed ? r * (major ? 0.6 : 0.68) : r * (major ? 0.68 : 0.76);
    const r2 = detailed ? r * 0.78 : r * 0.86;
    if (!detailed && !major) continue;
    ticks.push(<line key={i} x1={cx + r1 * Math.cos(t)} y1={cy + r1 * Math.sin(t)} x2={cx + r2 * Math.cos(t)} y2={cy + r2 * Math.sin(t)} stroke={DIAL_INK} strokeWidth={major ? (detailed ? 2.5 : 1.5) : 1.2} />);
    if (major && (detailed || i === 0 || i === n)) {
      const rl = detailed ? r * 0.9 : r * 0.53;
      ticks.push(
        <text key={`t${i}`} x={cx + rl * Math.cos(t)} y={cy + rl * Math.sin(t)} fontSize={detailed ? r * 0.1 : r * 0.28} textAnchor="middle" dominantBaseline="central" fill={DIAL_INK} fontWeight={600}>
          {fmtTick(v)}
        </text>,
      );
    }
  }
  return (
    <g transform={upright(mirror, rot, cx, cy)}>
      <circle cx={cx} cy={cy} r={r} fill="var(--dial)" stroke={DIAL_INK} strokeWidth={detailed ? 4 : 2.5} />
      <path d={arcPath(cx, cy, detailed ? r * 0.78 : r * 0.86, a0, a1)} fill="none" stroke={DIAL_INK} strokeWidth={detailed ? 2 : 1.2} />
      {ticks}
      <text x={cx} y={cy + r * 0.42} fontSize={r * (detailed ? 0.22 : 0.42)} textAnchor="middle" dominantBaseline="central" fontWeight={800} fill={unit === 'A' ? 'var(--ammeter)' : 'var(--voltmeter)'}>
        {unit}
      </text>
      <line x1={cx} y1={cy} x2={cx + r * 0.84 * Math.cos(ang)} y2={cy + r * 0.84 * Math.sin(ang)} stroke="#d62828" strokeWidth={detailed ? 4 : 2.2} strokeLinecap="round" style={{ transition: 'all 0.35s ease-out' }} />
      <circle cx={cx} cy={cy} r={detailed ? 9 : 3.5} fill={DIAL_INK} />
    </g>
  );
}

export function majorStep(range: number): number {
  const target = range / 6;
  const p = 10 ** Math.floor(Math.log10(target));
  for (const m of [1, 2, 5, 10]) if (m * p >= target - 1e-12) return m * p;
  return 10 * p;
}

function fmtTick(v: number): string {
  return (Math.round(v * 1000) / 1000).toLocaleString('vi-VN');
}

function arcPath(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const p = (a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`;
}

export function PartGlyph({ part, view, rot, st }: { part: Part; view: View; rot: number; st: GlyphState }) {
  return view === 'schematic' ? <Schematic part={part} rot={rot} st={st} /> : <Real part={part} rot={rot} st={st} />;
}

// ======================= HÌNH VẼ THẬT =======================

function Real({ part, rot, st }: { part: Part; rot: number; st: GlyphState }) {
  const p = part.props;
  switch (part.type) {
    case 'battery': {
      const n = Math.max(1, Math.min(4, p.cells ?? 1));
      const w = 60 / n;
      return (
        <g>
          <Leads x1={10} x2={70} schematic={false} />
          {st.heat > 0 && <rect x={2} y={-26} width={76} height={52} rx={14} fill="#ff4d00" opacity={0.35 + 0.25 * Math.sin(Date.now() / 120)} />}
          <rect x={8} y={-16} width={64} height={32} rx={6} fill="#3a3f47" />
          {Array.from({ length: n }, (_, i) => (
            <g key={i}>
              <rect x={10 + i * w} y={-12} width={w - 4} height={24} rx={4} fill="#1f8a4c" />
              <rect x={10 + i * w + w - 7} y={-6} width={3} height={12} fill="#d9b44a" />
              <rect x={10 + i * w} y={-12} width={w - 4} height={6} rx={3} fill="#ffffff" opacity={0.18} />
            </g>
          ))}
          <Txt x={76} y={-24} rot={rot} size={18} fill="#d62828">+</Txt>
          <Txt x={4} y={-24} rot={rot} size={18}>−</Txt>
        </g>
      );
    }
    case 'supply':
      return (
        <g>
          <Leads x1={10} x2={70} schematic={false} />
          {st.heat > 0 && <rect x={0} y={-34} width={80} height={68} rx={14} fill="#ff4d00" opacity={0.35} />}
          <rect x={6} y={-28} width={68} height={56} rx={8} fill="var(--device)" stroke={INK} strokeWidth={2} />
          <rect x={18} y={-20} width={44} height={22} rx={3} fill="#1d2b22" />
          <Txt x={40} y={-9} rot={rot} size={13} fill="#5dff9a">{`${(p.voltage ?? 0).toLocaleString('vi-VN')} V`}</Txt>
          <circle cx={14} cy={14} r={6} fill="#222" />
          <circle cx={66} cy={14} r={6} fill="#d62828" />
          <Txt x={66} y={-36} rot={rot} size={18} fill="#d62828">+</Txt>
          <Txt x={14} y={-36} rot={rot} size={18}>−</Txt>
        </g>
      );
    case 'switch': {
      const closed = !!p.closed;
      return (
        <g>
          <Leads x1={18} x2={62} schematic={false} />
          <rect x={10} y={4} width={60} height={12} rx={4} fill="#c49a6c" stroke="#8a6440" />
          <circle cx={20} cy={0} r={5} fill="#777" />
          <circle cx={60} cy={0} r={5} fill="#777" />
          <g transform={`rotate(${closed ? 0 : -35} 20 0)`} style={{ transition: 'transform 0.2s' }}>
            <rect x={18} y={-3} width={46} height={6} rx={3} fill="#b0b5bb" stroke="#555" />
            <rect x={58} y={-12} width={8} height={14} rx={3} fill="#222" />
          </g>
        </g>
      );
    }
    case 'lamp': {
      const g = p.broken ? 0 : Math.min(1.4, st.glow);
      return (
        <g>
          <Leads x1={24} x2={56} schematic={false} />
          {g > 0.02 && <circle cx={40} cy={-14} r={22 + 34 * Math.min(1, g)} fill="url(#glowLamp)" opacity={Math.min(1, 0.25 + g)} />}
          <circle cx={40} cy={-14} r={18} fill={p.broken ? '#9a9a9a' : g > 0.02 ? `rgba(255,${230 - 40 * Math.min(1, g)},120,${0.35 + 0.6 * Math.min(1, g)})` : 'var(--glass)'} stroke={INK} strokeWidth={2} />
          {p.broken ? (
            <path d="M33 -2 L36 -14 L39 -10 M42 -12 L45 -14 L47 -2" fill="none" stroke="#333" strokeWidth={2} />
          ) : (
            <path d="M33 -2 L35 -16 L38 -12 L40 -16 L42 -12 L45 -16 L47 -2" fill="none" stroke={g > 0.02 ? '#fff6b0' : '#555'} strokeWidth={2} />
          )}
          <rect x={30} y={0} width={20} height={10} fill="#8d939a" stroke="#555" />
          <path d="M30 3 H50 M30 7 H50" stroke="#555" />
        </g>
      );
    }
    case 'led': {
      const c = LED_COLOR[p.color ?? 'red'];
      const g = p.broken ? 0 : Math.min(1.4, st.glow);
      return (
        <g>
          <Leads x1={30} x2={50} schematic={false} />
          {g > 0.02 && <circle cx={40} cy={-8} r={16 + 26 * Math.min(1, g)} fill={c} opacity={0.18 + 0.45 * Math.min(1, g)} filter="url(#blur6)" />}
          <path d="M30 6 V-10 A10 10 0 0 1 50 -10 V6 Z" fill={c} opacity={g > 0.02 ? 1 : 0.55} stroke={INK} strokeWidth={1.5} />
          <rect x={28} y={4} width={24} height={4} fill={c} opacity={0.8} />
          {p.broken && <path d="M33 -12 L47 2 M47 -12 L33 2" stroke="#111" strokeWidth={3} />}
          <Txt x={22} y={-14} rot={rot} size={13}>+</Txt>
        </g>
      );
    }
    case 'resistor': {
      const b = resistorBands(p.R ?? 10);
      return (
        <g>
          <Leads x1={18} x2={62} schematic={false} />
          <rect x={18} y={-10} width={44} height={20} rx={9} fill="#e6cf9f" stroke="#a38755" />
          {[26, 33, 40, 52].map((x, i) => (
            <rect key={i} x={x} y={-10} width={4.5} height={20} fill={b[i]} />
          ))}
        </g>
      );
    }
    case 'rheostat': {
      const pos = p.pos ?? 0.5;
      const sx = 10 + 60 * pos;
      return (
        <g>
          <Leads x1={8} x2={72} schematic={false} />
          <rect x={6} y={-12} width={68} height={24} rx={5} fill="#f2f2ec" stroke="#999" />
          {Array.from({ length: 21 }, (_, i) => (
            <line key={i} x1={10 + i * 3} y1={-11} x2={12 + i * 3} y2={11} stroke="#b06c2b" strokeWidth={1.4} />
          ))}
          <rect x={10} y={-22} width={60} height={4} fill="#666" />
          <rect x={sx - 5} y={-26} width={10} height={16} rx={2} fill="#2f80ff" />
          <path d={`M${sx} -10 L${sx - 4} -14 H${sx + 4} Z`} fill="#2f80ff" />
        </g>
      );
    }
    case 'ammeter':
    case 'voltmeter': {
      const unit = part.type === 'ammeter' ? 'A' : 'V';
      const ring = unit === 'A' ? 'var(--ammeter)' : 'var(--voltmeter)';
      return (
        <g>
          <Leads x1={10} x2={70} schematic={false} />
          {p.display === 'analog' ? (
            <Dial cx={40} cy={0} r={32} value={st.reading} range={p.range ?? 1} unit={unit} showValues={st.showValues} rot={rot} />
          ) : (
            <>
              <circle cx={40} cy={0} r={28} fill="var(--dial)" stroke={ring} strokeWidth={5} />
              <Txt x={40} y={0} rot={rot} size={26} fill={ring} weight={800}>{unit}</Txt>
            </>
          )}
          <Txt x={6} y={-16} rot={rot} size={16} fill="#d62828">+</Txt>
          <Txt x={74} y={-16} rot={rot} size={16}>−</Txt>
        </g>
      );
    }
    case 'fuse':
      return (
        <g>
          <Leads x1={16} x2={64} schematic={false} />
          <rect x={16} y={-9} width={48} height={18} rx={4} fill="#dff3fb" stroke="#7aa" opacity={0.9} />
          <rect x={14} y={-10} width={10} height={20} rx={2} fill="#b8bec4" stroke="#777" />
          <rect x={56} y={-10} width={10} height={20} rx={2} fill="#b8bec4" stroke="#777" />
          {p.broken ? (
            <>
              <path d="M24 0 L34 -2 M46 2 L56 0" stroke="#555" strokeWidth={1.6} />
              <circle cx={40} cy={0} r={6} fill="#555" opacity={0.5} />
            </>
          ) : (
            <path d="M24 0 L56 0" stroke="#555" strokeWidth={1.6} />
          )}
        </g>
      );
    case 'bell': {
      const swing = st.active ? Math.sin(Date.now() / 25) * 8 : 0;
      return (
        <g>
          <Leads x1={20} x2={60} schematic={false} />
          <rect x={18} y={6} width={44} height={10} rx={3} fill="#555" />
          <path d="M22 4 A18 18 0 0 1 58 4 Z" fill="#e0b13a" stroke="#9a7413" strokeWidth={2} />
          <g transform={`rotate(${swing} 40 14)`}>
            <line x1={40} y1={14} x2={40} y2={-20} stroke="#333" strokeWidth={2.5} />
            <circle cx={40} cy={-22} r={4} fill="#333" />
          </g>
          {st.active && <path d="M66 -18 q6 6 0 12 M72 -22 q9 10 0 20" fill="none" stroke="#e0b13a" strokeWidth={2.5} />}
        </g>
      );
    }
    case 'heater': {
      const h = st.heat;
      const col = h < 0.05 ? '#8a8f99' : `rgb(${150 + 105 * Math.min(1, h)}, ${80 + 100 * Math.min(1, h * 0.8)}, ${40})`;
      return (
        <g>
          <Leads x1={12} x2={68} schematic={false} />
          {h > 0.05 && <rect x={14} y={-14} width={52} height={28} rx={14} fill="#ff6a00" opacity={0.15 + 0.45 * Math.min(1, h)} filter="url(#blur6)" />}
          <rect x={8} y={-8} width={6} height={16} fill="#eee" stroke="#999" />
          <rect x={66} y={-8} width={6} height={16} fill="#eee" stroke="#999" />
          <path d={`M14 0 ${Array.from({ length: 13 }, (_, i) => `L${16 + i * 4} ${i % 2 ? 8 : -8}`).join(' ')} L66 0`} fill="none" stroke={col} strokeWidth={3} strokeLinejoin="round" />
        </g>
      );
    }
    case 'coil': {
      const pull = st.active ? 1 : 0;
      return (
        <g>
          <Leads x1={16} x2={64} schematic={false} />
          <rect x={14} y={-7} width={52} height={14} rx={2} fill="#7d838a" />
          {Array.from({ length: 9 }, (_, i) => (
            <ellipse key={i} cx={20 + i * 5} cy={0} rx={3} ry={11} fill="none" stroke="#c87533" strokeWidth={2.4} />
          ))}
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${30 + i * 9} ${pull ? 10 : 34}) rotate(${pull ? (i - 1) * 15 : 90 * (i % 2)})`} style={{ transition: 'transform 0.25s' }}>
              <rect x={-1.5} y={0} width={3} height={16} fill="#555" />
              <rect x={-3.5} y={0} width={7} height={2.5} fill="#555" />
            </g>
          ))}
        </g>
      );
    }
    case 'electrolysis': {
      const cu = st.copper;
      const leftCathode = cu < 0;
      const amt = Math.min(1, Math.abs(cu));
      return (
        <g>
          <path d="M0 0 H22 V-30 M80 0 H58 V-30" fill="none" stroke={LEAD} strokeWidth={4} />
          <path d="M8 -26 V22 H72 V-26" fill="var(--glass)" stroke={INK} strokeWidth={2} />
          <rect x={9} y={-12} width={62} height={33} fill="#3d9be9" opacity={0.55} />
          <rect x={19} y={-30} width={6} height={44} fill="#2b2b2b" />
          <rect x={55} y={-30} width={6} height={44} fill="#2b2b2b" />
          {amt > 0.01 && <rect x={(leftCathode ? 19 : 55) - 1.5 - amt * 3} y={-12} width={6 + 3 + amt * 6} height={26} rx={2} fill="#c56b2c" opacity={0.3 + 0.7 * amt} />}
        </g>
      );
    }
    case 'sample': {
      const m = p.material ?? 'dong';
      const liquid = m === 'nuocMuoi' || m === 'nuocCat';
      return (
        <g>
          <Leads x1={14} x2={66} schematic={false} />
          {liquid ? (
            <>
              <path d="M18 -18 V14 H62 V-18" fill="var(--glass)" stroke={INK} strokeWidth={2} />
              <rect x={19} y={-6} width={42} height={19} fill={MAT_COLOR[m]} opacity={0.85} />
              <rect x={24} y={-22} width={4} height={30} fill="#555" />
              <rect x={52} y={-22} width={4} height={30} fill="#555" />
            </>
          ) : (
            <rect x={20} y={-7} width={40} height={14} rx={3} fill={MAT_COLOR[m]} stroke="#555" opacity={m === 'thuyTinh' ? 0.8 : 1} />
          )}
          <path d="M8 -6 L22 -3 L22 3 L8 6 Z M72 -6 L58 -3 L58 3 L72 6 Z" fill="#d62828" />
          <Txt x={40} y={30} rot={rot} size={13} weight={600}>{MATERIALS[m].name}</Txt>
        </g>
      );
    }
    case 'wireSample': {
      const m = p.wireMaterial ?? 'nicrom';
      return (
        <g>
          <Leads x1={6} x2={74} schematic={false} />
          <rect x={4} y={-12} width={72} height={24} rx={3} fill="#d9b88f" stroke="#a07c52" />
          <line x1={8} y1={0} x2={72} y2={0} stroke={WIRE_COLOR[m]} strokeWidth={1.2 + (p.area ?? 0.1) * 6} />
          <Txt x={40} y={24} rot={rot} size={12} weight={600}>{WIRE_MATERIALS[m].name}</Txt>
        </g>
      );
    }
  }
}

// ======================= KÍ HIỆU SƠ ĐỒ =======================

function Schematic({ part, rot, st }: { part: Part; rot: number; st: GlyphState }) {
  const p = part.props;
  const S = { stroke: INK, strokeWidth: 3, fill: 'none', strokeLinecap: 'round' as const };
  switch (part.type) {
    case 'battery':
    case 'supply': {
      const n = part.type === 'battery' ? Math.max(1, Math.min(4, p.cells ?? 1)) : 1;
      const span = 12 * n - 8;
      const x0 = 40 - span / 2;
      return (
        <g>
          <Leads x1={x0} x2={x0 + span} schematic />
          {Array.from({ length: n }, (_, i) => (
            <g key={i}>
              <line x1={x0 + i * 12} y1={-9} x2={x0 + i * 12} y2={9} stroke={INK} strokeWidth={6} />
              <line x1={x0 + i * 12 + 4} y1={-18} x2={x0 + i * 12 + 4} y2={18} stroke={INK} strokeWidth={2.5} />
            </g>
          ))}
          {st.heat > 0 && <circle cx={40} cy={0} r={26} fill="#ff4d00" opacity={0.25} />}
          <Txt x={x0 + span + 10} y={-20} rot={rot} size={16} fill="#d62828">+</Txt>
          <Txt x={x0 - 10} y={-20} rot={rot} size={16}>−</Txt>
        </g>
      );
    }
    case 'switch':
      return (
        <g>
          <Leads x1={24} x2={56} schematic />
          <circle cx={24} cy={0} r={3.5} fill={INK} />
          <circle cx={56} cy={0} r={3.5} fill={INK} />
          <line {...S} x1={24} y1={0} x2={p.closed ? 56 : 52} y2={p.closed ? 0 : -18} style={{ transition: 'all 0.2s' }} />
        </g>
      );
    case 'lamp': {
      const g = p.broken ? 0 : Math.min(1, st.glow);
      return (
        <g>
          <Leads x1={26} x2={54} schematic />
          {g > 0.02 && <circle cx={40} cy={0} r={18 + 18 * g} fill="url(#glowLamp)" opacity={0.3 + 0.7 * g} />}
          <circle cx={40} cy={0} r={14} fill="var(--board)" stroke={INK} strokeWidth={3} />
          <path d="M30 -10 L50 10 M50 -10 L30 10" stroke={INK} strokeWidth={2.5} />
          {p.broken && <Txt x={40} y={-26} rot={rot} size={12} fill="#d62828">cháy</Txt>}
        </g>
      );
    }
    case 'led': {
      const c = LED_COLOR[p.color ?? 'red'];
      const g = p.broken ? 0 : Math.min(1, st.glow);
      return (
        <g>
          <Leads x1={30} x2={50} schematic />
          {g > 0.02 && <circle cx={40} cy={0} r={20} fill={c} opacity={0.2 + 0.5 * g} filter="url(#blur6)" />}
          <path d="M30 -12 L30 12 L50 0 Z" fill={g > 0.02 ? c : 'var(--board)'} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
          <line {...S} x1={50} y1={-12} x2={50} y2={12} />
          <path d="M42 -14 L50 -24 M47 -24 H50 V-21 M50 -12 L58 -22 M55 -22 H58 V-19" fill="none" stroke={INK} strokeWidth={1.8} />
        </g>
      );
    }
    case 'resistor':
    case 'heater':
    case 'wireSample':
      return (
        <g>
          <Leads x1={22} x2={58} schematic />
          <rect x={22} y={-9} width={36} height={18} fill="var(--board)" stroke={INK} strokeWidth={3} />
          {part.type === 'heater' && <path d="M28 9 L36 -9 M38 9 L46 -9 M48 9 L56 -9" stroke={INK} strokeWidth={1.5} />}
        </g>
      );
    case 'rheostat':
      return (
        <g>
          <Leads x1={22} x2={58} schematic />
          <rect x={22} y={-9} width={36} height={18} fill="var(--board)" stroke={INK} strokeWidth={3} />
          <line {...S} x1={20} y1={16} x2={58} y2={-16} strokeWidth={2.2} />
          <path d="M58 -16 L49 -15 L55 -8 Z" fill={INK} />
        </g>
      );
    case 'ammeter':
    case 'voltmeter': {
      const unit = part.type === 'ammeter' ? 'A' : 'V';
      return (
        <g>
          <Leads x1={24} x2={56} schematic />
          <circle cx={40} cy={0} r={16} fill="var(--board)" stroke={INK} strokeWidth={3} />
          <Txt x={40} y={0} rot={rot} size={19} weight={800}>{unit}</Txt>
          <Txt x={14} y={-14} rot={rot} size={15} fill="#d62828">+</Txt>
          <Txt x={66} y={-14} rot={rot} size={15}>−</Txt>
        </g>
      );
    }
    case 'fuse':
      return (
        <g>
          <Leads x1={22} x2={58} schematic />
          <rect x={22} y={-8} width={36} height={16} fill="var(--board)" stroke={INK} strokeWidth={3} />
          {p.broken ? <path d="M22 0 H34 M46 0 H58" stroke={INK} strokeWidth={2} /> : <line x1={22} y1={0} x2={58} y2={0} stroke={INK} strokeWidth={2} />}
        </g>
      );
    case 'bell':
      return (
        <g>
          <Leads x1={28} x2={52} schematic />
          <path d="M28 0 V-6 M52 0 V-6" {...S} />
          <path d="M24 -6 H56 A16 16 0 0 0 24 -6 Z" fill="var(--board)" stroke={INK} strokeWidth={3} />
        </g>
      );
    case 'coil':
      return (
        <g>
          <Leads x1={20} x2={60} schematic />
          <path d="M20 0 a5 5 0 0 1 10 0 a5 5 0 0 1 10 0 a5 5 0 0 1 10 0 a5 5 0 0 1 10 0" {...S} />
          <line x1={18} y1={10} x2={62} y2={10} stroke={INK} strokeWidth={2} />
          <line x1={18} y1={14} x2={62} y2={14} stroke={INK} strokeWidth={2} />
        </g>
      );
    case 'electrolysis':
      return (
        <g>
          <path d="M0 0 H28 V-16 M80 0 H52 V-16" {...S} />
          <path d="M18 -20 V14 H62 V-20" {...S} strokeWidth={2.5} />
          <line x1={28} y1={-16} x2={28} y2={8} stroke={INK} strokeWidth={5} />
          <line x1={52} y1={-16} x2={52} y2={8} stroke={INK} strokeWidth={5} />
        </g>
      );
    case 'sample':
      return (
        <g>
          <Leads x1={22} x2={58} schematic />
          <rect x={22} y={-9} width={36} height={18} fill="var(--board)" stroke={INK} strokeWidth={2.5} strokeDasharray="5 3" />
          <Txt x={40} y={24} rot={rot} size={12} weight={600}>{MATERIALS[p.material ?? 'dong'].name}</Txt>
        </g>
      );
  }
}
