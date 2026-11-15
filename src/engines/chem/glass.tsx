// Hình vẽ dụng cụ thuỷ tinh và hoá chất dùng chung cho các thí nghiệm hoá học.
import { ReactNode, useId } from 'react';
import { LITMUS, SUBS, TubeState, liquidColor, mediumOf } from './data';

export type VesselKind = 'tube' | 'dish' | 'beaker';

export interface VesselGeom {
  kind: VesselKind;
  x: number;
  /** đỉnh miệng */
  top: number;
  w: number;
  h: number;
}

export function geomOf(kind: VesselKind, x: number, top: number): VesselGeom {
  if (kind === 'beaker') return { kind, x, top: top + 180, w: 190, h: 200 };
  if (kind === 'dish') return { kind, x, top: top + 160, w: 180, h: 70 };
  return { kind, x, top, w: 62, h: 290 };
}

export function vesselPath(g: VesselGeom): string {
  const { x, top, w, h } = g;
  const l = x - w / 2;
  const r = x + w / 2;
  if (g.kind === 'tube') return `M ${l} ${top} L ${l} ${top + h - w / 2} A ${w / 2} ${w / 2} 0 0 0 ${r} ${top + h - w / 2} L ${r} ${top}`;
  if (g.kind === 'dish') return `M ${l} ${top} Q ${l + 6} ${top + h} ${x} ${top + h} Q ${r - 6} ${top + h} ${r} ${top}`;
  return `M ${l} ${top} L ${l + 4} ${top + h - 12} Q ${l + 6} ${top + h} ${l + 18} ${top + h} L ${r - 18} ${top + h} Q ${r - 6} ${top + h} ${r - 4} ${top + h - 12} L ${r} ${top}`;
}

/** Mực chất lỏng (toạ độ y) */
export function levelY(g: VesselGeom, pours: number): number | null {
  if (pours <= 0) return null;
  const f = g.kind === 'dish' ? Math.min(0.75, 0.45 + 0.1 * pours) : Math.min(0.72, 0.3 + 0.13 * (pours - 1));
  return g.top + g.h * (1 - f);
}

const rnd = (i: number, k = 1) => {
  const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return v - Math.floor(v);
};

function Solid({ id, g, ly, idx }: { id: string; g: VesselGeom; ly: number | null; idx: number }) {
  const d = SUBS[id];
  if (!d) return null;
  const bottom = g.top + g.h - (g.kind === 'tube' ? 10 : 8);
  const x = g.x + (idx % 2 ? 10 : -6);
  const coat = d.coat;
  switch (d.shape) {
    case 'nail': {
      const y1 = g.top - 40;
      return (
        <g>
          <line x1={g.x - 8} y1={y1} x2={g.x + 6} y2={bottom - 6} stroke={d.color} strokeWidth={7} strokeLinecap="round" />
          <line x1={g.x - 18} y1={y1 - 2} x2={g.x + 2} y2={y1 + 2} stroke={d.color} strokeWidth={8} strokeLinecap="round" />
          {coat && ly !== null && <line x1={g.x - 8 + (14 * (ly - y1)) / (bottom - 6 - y1)} y1={ly} x2={g.x + 6} y2={bottom - 6} stroke={coat} strokeWidth={9} strokeLinecap="round" strokeDasharray="5 2" />}
        </g>
      );
    }
    case 'wire': {
      const pts: string[] = [];
      for (let i = 0; i <= 14; i++) pts.push(`${g.x + (i % 2 ? 12 : -12)},${bottom - 8 - i * 14}`);
      const y1 = bottom - 8 - 14 * 14;
      return (
        <g>
          <line x1={g.x} y1={g.top - 50} x2={g.x} y2={y1} stroke={d.color} strokeWidth={4} />
          <polyline points={pts.join(' ')} fill="none" stroke={d.color} strokeWidth={4.5} strokeLinejoin="round" />
          {coat && <polyline points={pts.filter((p) => ly === null || Number(p.split(',')[1]) > ly).join(' ')} fill="none" stroke={coat} strokeWidth={7} strokeDasharray="3 3" strokeLinejoin="round" />}
        </g>
      );
    }
    case 'ribbon':
      return <path d={`M ${x - 10} ${bottom - 4} q 8 -18 0 -36 q -8 -18 0 -36`} fill="none" stroke={d.color} strokeWidth={8} strokeLinecap="round" />;
    case 'granule':
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx={g.x - 12 + i * 12} cy={bottom - 8 - (i === 1 ? 8 : 0)} rx={9} ry={7} fill={d.color} stroke="#666" strokeWidth={1} />
          ))}
          {coat && [0, 1, 2, 3, 4].map((i) => <circle key={i} cx={g.x - 16 + i * 8} cy={bottom - 12 + (i % 2) * 4} r={3.4} fill={coat} />)}
        </g>
      );
    case 'lump':
      if ((id === 'na' || id === 'ca') && ly !== null) {
        // nổi và chạy trên mặt chất lỏng
        return <ellipse className="na-run" cx={g.x} cy={ly - 2} rx={9} ry={7} fill={d.color} stroke="#888" />;
      }
      return <rect x={x - 12} y={bottom - 16} width={24} height={14} rx={5} fill={d.color} stroke="#555" />;
    case 'chip':
      return <path d={`M ${x - 16} ${bottom} l 4 -16 l 14 -6 l 14 8 l 2 14 Z`} fill={d.color} stroke="#9a907a" strokeWidth={1.5} />;
    case 'powder':
    case 'mixture': {
      const n = 26;
      return (
        <g>
          {Array.from({ length: n }, (_, i) => (
            <circle key={i} cx={g.x + (rnd(i) - 0.5) * (g.w - 18)} cy={bottom - rnd(i, 2) * 12} r={2.6} fill={d.shape === 'mixture' ? (i % 2 ? '#e4cc3a' : '#5c6168') : d.color} />
          ))}
        </g>
      );
    }
    default:
      return null;
  }
}

function Precip({ id, g, ly, idx }: { id: string; g: VesselGeom; ly: number; idx: number }) {
  const d = SUBS[id];
  const bottom = g.top + g.h - 6;
  const n = id === 'caso4' ? 10 : 34;
  const span = Math.min(110, bottom - ly);
  return (
    <g className="precip">
      {Array.from({ length: n }, (_, i) => {
        const fall = rnd(i + idx * 50, 3);
        return <circle key={i} cx={g.x + (rnd(i + idx * 50) - 0.5) * (g.w - 16)} cy={bottom - 4 - fall * fall * span} r={id === 'proteindt' ? 5 : 3.4} fill={d?.color} stroke="rgba(60,70,80,0.45)" strokeWidth={0.8} />;
      })}
    </g>
  );
}

function Bubbles({ g, ly, rate, gasKey }: { g: VesselGeom; ly: number; rate: number; gasKey: string }) {
  const n = Math.round(4 + rate * 16);
  const bottom = g.top + g.h - 14;
  const rise = bottom - ly;
  return (
    <g key={gasKey}>
      {Array.from({ length: n }, (_, i) => (
        <circle
          key={i}
          className="bubble"
          cx={g.x + (rnd(i, 7) - 0.5) * (g.w - 20)}
          cy={bottom}
          r={2 + rnd(i, 9) * 3}
          style={{ ['--rise' as string]: `${-rise}px`, animationDelay: `${(rnd(i, 4) * 1.6).toFixed(2)}s`, animationDuration: `${(1.8 - rate * 0.9).toFixed(2)}s` }}
        />
      ))}
    </g>
  );
}

export function Burner({ x, y, on }: { x: number; y: number; on: boolean }) {
  return (
    <g>
      {on && (
        <g className="flicker">
          <path d={`M ${x} ${y - 70} Q ${x + 16} ${y - 40} ${x + 8} ${y - 22} L ${x - 8} ${y - 22} Q ${x - 16} ${y - 40} ${x} ${y - 70} Z`} fill="#ffb627" opacity={0.9} />
          <path d={`M ${x} ${y - 52} Q ${x + 8} ${y - 36} ${x + 4} ${y - 24} L ${x - 4} ${y - 24} Q ${x - 8} ${y - 36} ${x} ${y - 52} Z`} fill="#4ea8ff" opacity={0.85} />
        </g>
      )}
      <rect x={x - 4} y={y - 24} width={8} height={10} fill="#e9e1c9" />
      <path d={`M ${x - 30} ${y + 30} Q ${x - 32} ${y - 14} ${x} ${y - 14} Q ${x + 32} ${y - 14} ${x + 30} ${y + 30} Z`} fill="rgba(200,230,250,0.6)" stroke="#7a8a9a" strokeWidth={2} />
      <path d={`M ${x - 28} ${y + 30} Q ${x - 28} ${y + 4} ${x} ${y + 4} Q ${x + 28} ${y + 4} ${x + 28} ${y + 30} Z`} fill="rgba(120,180,240,0.35)" />
    </g>
  );
}

export function Magnet({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M 0 -40 h 40 v 18 h -24 v 44 h 24 v 18 h -40 Z" fill="#d62828" />
      <rect x={0} y={-40} width={16} height={18} fill="#9aa3ab" transform="translate(24 0)" />
      <rect x={24} y={22} width={16} height={18} fill="#9aa3ab" />
      <text x={30} y={-26} fontSize={12} fontWeight={800} textAnchor="middle" fill="#222">
        N
      </text>
      <text x={30} y={36} fontSize={12} fontWeight={800} textAnchor="middle" fill="#222">
        S
      </text>
    </g>
  );
}

/** Vẽ vật chứa và các chất bên trong theo trạng thái tính được. */
export function Vessel({ g, st, label, onClick, selected, children }: { g: VesselGeom; st: TubeState; label?: string; onClick?: () => void; selected?: boolean; children?: ReactNode }) {
  const id = 'vc' + useId().replace(/:/g, '');
  const path = vesselPath(g);
  const ly = levelY(g, st.pours);
  const color = liquidColor(st.S);
  const solids = st.S.filter((s) => SUBS[s]?.kind === 'solid');
  const precips = st.S.filter((s) => SUBS[s]?.kind === 'precip');
  const mirror = st.S.includes('agmirror');
  const layer = st.S.includes('ester');
  const litmus = st.S.includes('quy');
  const flame = st.S.includes('flame');
  const med = mediumOf(st.S);
  const bottom = g.top + g.h;
  return (
    <g onPointerDown={onClick} className={onClick ? 'draggable' : undefined}>
      <defs>
        <clipPath id={id}>
          <path d={path + ' Z'} />
        </clipPath>
      </defs>
      {selected && <rect x={g.x - g.w / 2 - 18} y={g.top - 26} width={g.w + 36} height={g.h + 40} rx={16} fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth={2} strokeDasharray="6 5" />}
      <path d={path + ' Z'} fill="rgba(255,255,255,0.35)" />
      <g clipPath={`url(#${id})`}>
        {ly !== null && (
          <>
            <rect x={g.x - g.w / 2 - 2} y={ly} width={g.w + 4} height={bottom - ly + 2} fill={color} style={{ transition: 'fill 1.4s' }} />
            {layer && <rect x={g.x - g.w / 2 - 2} y={ly - 26} width={g.w + 4} height={28} fill="rgba(255,250,215,0.85)" stroke="rgba(200,180,90,0.6)" />}
            {precips.length > 0 && <rect x={g.x - g.w / 2} y={ly} width={g.w} height={bottom - ly} fill={SUBS[precips[precips.length - 1]].color} opacity={/^#f/i.test(SUBS[precips[precips.length - 1]].color ?? '') ? 0.6 : 0.2} />}
            {precips.map((p, i) => (
              <Precip key={p} id={p} g={g} ly={ly} idx={i} />
            ))}
          </>
        )}
        {solids.map((s, i) => (
          <Solid key={s} id={s} g={g} ly={ly} idx={i} />
        ))}
        {mirror && ly !== null && (
          <g opacity={0.95}>
            <rect x={g.x - g.w / 2} y={ly - 30} width={g.w} height={bottom - ly + 30} fill="url(#silverGrad)" opacity={0.9} />
            <rect x={g.x - g.w / 2} y={ly - 4} width={13} height={bottom - ly} fill="url(#silverGrad)" />
            <rect x={g.x + g.w / 2 - 13} y={ly - 4} width={13} height={bottom - ly} fill="url(#silverGrad)" />
            <path d={`M ${g.x - g.w / 2} ${bottom - g.w / 2} A ${g.w / 2} ${g.w / 2} 0 0 0 ${g.x + g.w / 2} ${bottom - g.w / 2}`} fill="none" stroke="#cfd3d8" strokeWidth={13} />
          </g>
        )}
        {st.gas && ly !== null && <Bubbles g={g} ly={ly} rate={st.gas.rate} gasKey={st.gas.name + st.log.length} />}
      </g>
      {litmus && <rect x={g.x + g.w / 2 - 22} y={g.top - 34} width={12} height={(ly ?? bottom - 40) - g.top + 70} rx={2} fill={LITMUS[med]} stroke="#555" strokeWidth={1} style={{ transition: 'fill 1s' }} />}
      <path d={path} fill="none" stroke="#7f93a8" strokeWidth={3} strokeLinejoin="round" />
      <path d={`M ${g.x - g.w / 2 + 8} ${g.top + 16} L ${g.x - g.w / 2 + 8} ${g.top + g.h * 0.55}`} stroke="rgba(255,255,255,0.8)" strokeWidth={4} strokeLinecap="round" />
      {flame && (
        <g className="flicker">
          {[-50, -25, 0, 25, 50].map((dx, i) => {
            const h = [55, 80, 105, 75, 50][i];
            const x0 = g.x + dx;
            return (
              <g key={i}>
                <path d={`M ${x0 - 20} ${g.top + 6} Q ${x0 - 16} ${g.top - h * 0.5} ${x0} ${g.top - h} Q ${x0 + 16} ${g.top - h * 0.5} ${x0 + 20} ${g.top + 6} Z`} fill="rgba(80,150,255,0.45)" />
                <path d={`M ${x0 - 9} ${g.top + 4} Q ${x0 - 7} ${g.top - h * 0.3} ${x0} ${g.top - h * 0.55} Q ${x0 + 7} ${g.top - h * 0.3} ${x0 + 9} ${g.top + 4} Z`} fill="rgba(190,225,255,0.8)" />
              </g>
            );
          })}
        </g>
      )}
      {st.hot && (
        <g className="heat-wave">
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M ${g.x + g.w / 2 + 14 + i * 10} ${g.top + g.h * 0.7} q 6 -10 0 -20 q -6 -10 0 -20`} fill="none" stroke="#ef4444" strokeWidth={3} strokeLinecap="round" />
          ))}
        </g>
      )}
      {children}
      {label && (
        <text x={g.x} y={bottom + 34} textAnchor="middle" className="lab-label" stroke="var(--board)" strokeWidth={7} paintOrder="stroke" strokeLinejoin="round">
          {label}
        </text>
      )}
    </g>
  );
}

export function GlassDefs() {
  return (
    <defs>
      <linearGradient id="silverGrad" x1="0" x2="1">
        <stop offset="0" stopColor="#9aa1a8" />
        <stop offset="0.5" stopColor="#f4f6f8" />
        <stop offset="1" stopColor="#aab1b8" />
      </linearGradient>
    </defs>
  );
}

/** Ống nhỏ giọt đang nhỏ chất lỏng vào ống */
export function Dropper({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g className="dropper-anim">
      <rect x={x - 5} y={y - 90} width={10} height={70} rx={3} fill="rgba(220,235,250,0.85)" stroke="#7f93a8" strokeWidth={1.5} />
      <path d={`M ${x - 5} ${y - 20} L ${x} ${y - 4} L ${x + 5} ${y - 20} Z`} fill="rgba(220,235,250,0.85)" stroke="#7f93a8" strokeWidth={1.5} />
      <ellipse cx={x} cy={y - 104} rx={11} ry={16} fill="#d62828" />
      {[0, 1, 2].map((i) => (
        <circle key={i} className="drop" cx={x} cy={y} r={4} fill={color} style={{ animationDelay: `${i * 0.22}s` }} />
      ))}
    </g>
  );
}

/** Cốc thuỷ tinh có vạch chia, dùng cho các thí nghiệm định lượng. */
export function Beaker({ x, bottom, w = 200, h = 230, level, color = 'rgba(190,225,250,0.5)', marks = true, label, children }: { x: number; bottom: number; w?: number; h?: number; level: number; color?: string; marks?: boolean; label?: string; children?: ReactNode }) {
  const id = 'bk' + useId().replace(/:/g, '');
  const top = bottom - h;
  const l = x - w / 2;
  const r = x + w / 2;
  const d = `M ${l - 8} ${top - 6} L ${l} ${top} L ${l + 4} ${bottom - 12} Q ${l + 6} ${bottom} ${l + 18} ${bottom} L ${r - 18} ${bottom} Q ${r - 6} ${bottom} ${r - 4} ${bottom - 12} L ${r} ${top}`;
  const ly = bottom - Math.max(0, Math.min(0.95, level)) * h;
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <path d={d + ' Z'} />
        </clipPath>
      </defs>
      <path d={d + ' Z'} fill="rgba(255,255,255,0.35)" />
      <g clipPath={`url(#${id})`}>
        {level > 0 && <rect x={l - 10} y={ly} width={w + 20} height={bottom - ly + 2} fill={color} style={{ transition: 'all 0.8s' }} />}
        {children}
      </g>
      {marks &&
        [0.2, 0.4, 0.6, 0.8].map((f) => (
          <g key={f}>
            <line x1={l + 6} x2={l + 30} y1={bottom - f * h} y2={bottom - f * h} stroke="#7f93a8" strokeWidth={2} />
          </g>
        ))}
      <path d={d} fill="none" stroke="#7f93a8" strokeWidth={3} strokeLinejoin="round" />
      {label && (
        <text x={x} y={bottom + 32} textAnchor="middle" className="lab-label">
          {label}
        </text>
      )}
    </g>
  );
}

/** Cân điện tử hiển thị số */
export function Balance({ x, y, value, show = true, w = 300 }: { x: number; y: number; value: string; show?: boolean; w?: number }) {
  return (
    <g>
      <rect x={x - w / 2} y={y} width={w} height={70} rx={10} fill="#e9edf2" stroke="#555" strokeWidth={2} />
      <rect x={x - w / 2 + 20} y={y - 12} width={w - 40} height={14} rx={4} fill="#c8cfd8" stroke="#555" />
      <rect x={x - 80} y={y + 18} width={160} height={40} rx={6} fill="#11231a" />
      <text x={x} y={y + 47} textAnchor="middle" className="lcd-text">
        {show ? value : '? g'}
      </text>
    </g>
  );
}
