// Diễn biến phản ứng ở mức phân tử, lập phương trình hoá học, tính theo phương trình (KHTN 8 Bài 2, 5, 6).
import { useEffect, useMemo } from 'react';
import type { EngineProps } from '../../core/types';
import { fmt, fmtShort } from '../../core/format';
import { Row, Seg, Slider } from '../../ui/controls';
import { ATOM_COLOR, VM, molarMass, parseFormula, pretty } from './formula';

export function Atom({ x, y, el, r = 22, label = true }: { x: number; y: number; el: string; r?: number; label?: boolean }) {
  const c = ATOM_COLOR[el] ?? '#999';
  const dark = ['C', 'N', 'Na', 'Ba', 'K', 'I', 'Br', 'Fe', 'Cu', 'Mg', 'Zn', 'Mn'].includes(el);
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={c} stroke="rgba(0,0,0,0.35)" strokeWidth={1.5} />
      <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.32} fill="rgba(255,255,255,0.45)" />
      {label && (
        <text x={x} y={y + r * 0.36} textAnchor="middle" fontSize={r * 0.95} fontWeight={800} fill={dark ? '#fff' : '#222'}>
          {el}
        </text>
      )}
    </g>
  );
}

// ---------------- Mô hình phân tử đơn giản (2D) ----------------

interface MolShape {
  atoms: { el: string; x: number; y: number }[];
  bonds: [number, number, number][];
}

const SHAPES: Record<string, MolShape> = {
  H2: { atoms: [{ el: 'H', x: -17, y: 0 }, { el: 'H', x: 17, y: 0 }], bonds: [[0, 1, 1]] },
  O2: { atoms: [{ el: 'O', x: -22, y: 0 }, { el: 'O', x: 22, y: 0 }], bonds: [[0, 1, 2]] },
  Cl2: { atoms: [{ el: 'Cl', x: -22, y: 0 }, { el: 'Cl', x: 22, y: 0 }], bonds: [[0, 1, 1]] },
  N2: { atoms: [{ el: 'N', x: -22, y: 0 }, { el: 'N', x: 22, y: 0 }], bonds: [[0, 1, 3]] },
  H2O: { atoms: [{ el: 'O', x: 0, y: 0 }, { el: 'H', x: -32, y: 22 }, { el: 'H', x: 32, y: 22 }], bonds: [[0, 1, 1], [0, 2, 1]] },
  CO2: { atoms: [{ el: 'O', x: -44, y: 0 }, { el: 'C', x: 0, y: 0 }, { el: 'O', x: 44, y: 0 }], bonds: [[0, 1, 2], [1, 2, 2]] },
  C: { atoms: [{ el: 'C', x: 0, y: 0 }], bonds: [] },
  CH4: { atoms: [{ el: 'C', x: 0, y: 0 }, { el: 'H', x: -36, y: 0 }, { el: 'H', x: 36, y: 0 }, { el: 'H', x: 0, y: -36 }, { el: 'H', x: 0, y: 36 }], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]] },
  HCl: { atoms: [{ el: 'H', x: -20, y: 0 }, { el: 'Cl', x: 20, y: 0 }], bonds: [[0, 1, 1]] },
  NH3: { atoms: [{ el: 'N', x: 0, y: 0 }, { el: 'H', x: -34, y: 18 }, { el: 'H', x: 34, y: 18 }, { el: 'H', x: 0, y: -36 }], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]] },
};

interface RxModel {
  label: string;
  left: [string, number][];
  right: [string, number][];
}

export const RX_MODELS: Record<string, RxModel> = {
  h2o: { label: 'Hydrogen + oxygen → nước', left: [['H2', 2], ['O2', 1]], right: [['H2O', 2]] },
  co2: { label: 'Carbon + oxygen → carbon dioxide', left: [['C', 1], ['O2', 1]], right: [['CO2', 1]] },
  ch4: { label: 'Methane cháy trong oxygen', left: [['CH4', 1], ['O2', 2]], right: [['CO2', 1], ['H2O', 2]] },
  hcl: { label: 'Hydrogen + chlorine → hydrogen chloride', left: [['H2', 1], ['Cl2', 1]], right: [['HCl', 2]] },
  nh3: { label: 'Nitrogen + hydrogen → ammonia', left: [['N2', 1], ['H2', 3]], right: [['NH3', 2]] },
};

function layout(side: [string, number][], cx: number, cy: number) {
  const mols: { f: string; x: number; y: number }[] = [];
  side.forEach(([f, n]) => {
    for (let k = 0; k < n; k++) mols.push({ f, x: 0, y: 0 });
  });
  const cols = mols.length > 3 ? 2 : 1;
  const rows = Math.ceil(mols.length / cols);
  mols.forEach((m, i) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    m.x = cx + (c - (cols - 1) / 2) * 150;
    m.y = cy + (r - (rows - 1) / 2) * 120;
  });
  return mols;
}

export interface RearrangeDoc {
  mode: 'rearrange';
  rx: keyof typeof RX_MODELS;
  p: number;
}

export function RearrangeView({ doc, onDoc, showValues }: EngineProps<RearrangeDoc, unknown>) {
  const m = RX_MODELS[doc.rx];
  const geo = useMemo(() => {
    const L = layout(m.left, 280, 360);
    const R = layout(m.right, 920, 360);
    const src = L.flatMap((mol, mi) => SHAPES[mol.f].atoms.map((a, ai) => ({ el: a.el, x: mol.x + a.x, y: mol.y + a.y, mi, ai })));
    const dst = R.flatMap((mol, mi) => SHAPES[mol.f].atoms.map((a, ai) => ({ el: a.el, x: mol.x + a.x, y: mol.y + a.y, mi, ai, used: false })));
    // ghép mỗi nguyên tử bên trái với một vị trí cùng nguyên tố bên phải (gần nhất theo thứ tự)
    const pair = src.map((s) => {
      const cand = dst.filter((d) => d.el === s.el && !d.used).sort((a, b) => Math.hypot(a.x - s.x - 640, a.y - s.y) - Math.hypot(b.x - s.x - 640, b.y - s.y))[0];
      if (cand) cand.used = true;
      return cand ?? { ...s, x: s.x + 640 };
    });
    return { L, R, src, dst, pair };
  }, [m]);
  const ease = (t: number) => t * t * (3 - 2 * t);
  const move = ease(Math.max(0, Math.min(1, (doc.p - 0.25) / 0.5)));
  const pos = geo.src.map((s, i) => ({ el: s.el, x: s.x + (geo.pair[i].x - s.x) * move, y: s.y + (geo.pair[i].y - s.y) * move + Math.sin(move * Math.PI) * (i % 2 ? -40 : 40) }));
  const oldBonds = doc.p < 0.25 ? 1 : Math.max(0, 1 - (doc.p - 0.25) / 0.1);
  const newBonds = doc.p > 0.75 ? Math.min(1, (doc.p - 0.75) / 0.1) : 0;
  const count = (side: [string, number][]) => {
    const c: Record<string, number> = {};
    side.forEach(([f, n]) => Object.entries(parseFormula(f)).forEach(([el, k]) => (c[el] = (c[el] ?? 0) + k * n)));
    return c;
  };
  const cl = count(m.left);
  const leftMols = m.left.reduce((s, [, n]) => s + n, 0);
  const rightMols = m.right.reduce((s, [, n]) => s + n, 0);
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <text x={280} y={130} textAnchor="middle" className="lab-label">
            Chất tham gia
          </text>
          <text x={920} y={130} textAnchor="middle" className="lab-label">
            Sản phẩm
          </text>
          <path d="M 520 360 L 680 360" stroke="var(--ink-2)" strokeWidth={5} markerEnd="url(#arrowH)" />
          <defs>
            <marker id="arrowH" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--ink-2)" />
            </marker>
          </defs>
          {oldBonds > 0 &&
            geo.L.map((mol, mi) =>
              SHAPES[mol.f].bonds.map(([a, b, o], k) => {
                const ia = geo.src.findIndex((s) => s.mi === mi && s.ai === a);
                const ib = geo.src.findIndex((s) => s.mi === mi && s.ai === b);
                return <Bond key={`${mi}-${k}`} x1={pos[ia].x} y1={pos[ia].y} x2={pos[ib].x} y2={pos[ib].y} order={o} opacity={oldBonds} />;
              }),
            )}
          {newBonds > 0 &&
            geo.R.map((mol, mi) =>
              SHAPES[mol.f].bonds.map(([a, b, o], k) => {
                const da = geo.dst.find((d) => d.mi === mi && d.ai === a)!;
                const db = geo.dst.find((d) => d.mi === mi && d.ai === b)!;
                return <Bond key={`r${mi}-${k}`} x1={da.x} y1={da.y} x2={db.x} y2={db.y} order={o} opacity={newBonds} />;
              }),
            )}
          {pos.map((a, i) => (
            <Atom key={i} x={a.x} y={a.y} el={a.el} r={a.el === 'H' ? 17 : 23} />
          ))}
          <text x={600} y={600} textAnchor="middle" className="lab-label">
            {doc.p < 0.25 ? 'Các phân tử chất tham gia' : doc.p < 0.75 ? 'Liên kết cũ bị phá vỡ, các nguyên tử sắp xếp lại' : 'Hình thành liên kết mới – phân tử sản phẩm'}
          </text>
          {showValues && (
            <text x={600} y={60} textAnchor="middle" fontSize={30} fontWeight={800} fill="var(--ink)">
              {m.left.map(([f, n]) => `${n > 1 ? n : ''}${pretty(f)}`).join(' + ')} → {m.right.map(([f, n]) => `${n > 1 ? n : ''}${pretty(f)}`).join(' + ')}
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Diễn biến phản ứng</h3>
        <Row label="Phản ứng">
          <Seg value={doc.rx} options={Object.keys(RX_MODELS) as (keyof typeof RX_MODELS)[]} onChange={(rx) => onDoc({ ...doc, rx, p: 0 })} fmtOpt={(k) => RX_MODELS[k].label} />
        </Row>
        <Row label="Tiến trình phản ứng">
          <Slider value={doc.p} min={0} max={1} step={0.01} digits={2} onChange={(v) => onDoc({ ...doc, p: v })} />
        </Row>
        <div className="insp-actions">
          <button className="btn primary" onClick={() => onDoc({ ...doc, p: doc.p >= 1 ? 0 : 1 })}>
            {doc.p >= 1 ? 'Về lúc đầu' : 'Cho phản ứng xảy ra'}
          </button>
        </div>
        <div className="insp-table">
          <table>
            <thead>
              <tr>
                <th>Nguyên tử</th>
                <th>Trước</th>
                <th>Sau</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(cl).map(([el, n]) => (
                <tr key={el}>
                  <td>{el}</td>
                  <td>{n}</td>
                  <td>{showValues ? n : '?'}</td>
                </tr>
              ))}
              <tr>
                <td>Số phân tử</td>
                <td>{leftMols}</td>
                <td>{showValues ? rightMols : '?'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="small muted">Trong phản ứng hoá học chỉ có liên kết giữa các nguyên tử thay đổi; số nguyên tử của mỗi nguyên tố được giữ nguyên.</p>
      </aside>
    </div>
  );
}

export function Bond({ x1, y1, x2, y2, order = 1, opacity = 1, color = '#6b7280' }: { x1: number; y1: number; x2: number; y2: number; order?: number; opacity?: number; color?: string }) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const L = Math.hypot(dx, dy) || 1;
  const nx = (-dy / L) * 6;
  const ny = (dx / L) * 6;
  const offs = order === 1 ? [0] : order === 2 ? [-1, 1] : [-1.6, 0, 1.6];
  return (
    <g opacity={opacity}>
      {offs.map((o, i) => (
        <line key={i} x1={x1 + nx * o} y1={y1 + ny * o} x2={x2 + nx * o} y2={y2 + ny * o} stroke={color} strokeWidth={5} strokeLinecap="round" />
      ))}
    </g>
  );
}

// ---------------- Lập phương trình hoá học ----------------

export const EQUATIONS: { left: string[]; right: string[] }[] = [
  { left: ['H2', 'O2'], right: ['H2O'] },
  { left: ['Al', 'O2'], right: ['Al2O3'] },
  { left: ['Fe', 'O2'], right: ['Fe3O4'] },
  { left: ['Al', 'HCl'], right: ['AlCl3', 'H2'] },
  { left: ['Al2(SO4)3', 'NaOH'], right: ['Al(OH)3', 'Na2SO4'] },
  { left: ['CaCO3', 'HCl'], right: ['CaCl2', 'CO2', 'H2O'] },
  { left: ['Na2CO3', 'Ba(OH)2'], right: ['BaCO3', 'NaOH'] },
  { left: ['P', 'O2'], right: ['P2O5'] },
  { left: ['Fe', 'O2'], right: ['Fe2O3'] },
  { left: ['Fe2O3', 'HCl'], right: ['FeCl3', 'H2O'] },
  { left: ['CH4', 'O2'], right: ['CO2', 'H2O'] },
  { left: ['C2H6O', 'O2'], right: ['CO2', 'H2O'] },
  { left: ['C3H8', 'O2'], right: ['CO2', 'H2O'] },
  { left: ['KClO3'], right: ['KCl', 'O2'] },
  { left: ['Na', 'H2O'], right: ['NaOH', 'H2'] },
];

export interface BalanceDoc {
  mode: 'balance';
  idx: number;
  coefs: number[];
}

function atomCount(fs: string[], cs: number[]) {
  const out: Record<string, number> = {};
  fs.forEach((f, i) => Object.entries(parseFormula(f)).forEach(([el, n]) => (out[el] = (out[el] ?? 0) + n * (cs[i] ?? 1))));
  return out;
}

function MolCluster({ f, x, y, scale = 1 }: { f: string; x: number; y: number; scale?: number }) {
  const atoms: string[] = [];
  Object.entries(parseFormula(f)).forEach(([el, n]) => {
    for (let k = 0; k < n; k++) atoms.push(el);
  });
  const per = Math.min(5, Math.ceil(Math.sqrt(atoms.length * 1.6)));
  const r = 9 * scale;
  return (
    <g>
      {atoms.map((el, i) => (
        <Atom key={i} x={x + ((i % per) - (per - 1) / 2) * r * 1.7} y={y + Math.floor(i / per) * r * 1.7} el={el} r={r} label={false} />
      ))}
    </g>
  );
}

export function BalanceView({ doc, onDoc, showValues }: EngineProps<BalanceDoc, unknown>) {
  const eq = EQUATIONS[doc.idx % EQUATIONS.length];
  const all = [...eq.left, ...eq.right];
  const cs = all.map((_, i) => doc.coefs[i] ?? 1);
  const L = atomCount(eq.left, cs.slice(0, eq.left.length));
  const R = atomCount(eq.right, cs.slice(eq.left.length));
  const els = Array.from(new Set([...Object.keys(L), ...Object.keys(R)]));
  const ok = els.every((el) => L[el] === R[el]);
  const setC = (i: number, d: number) => {
    const next = [...cs];
    next[i] = Math.max(1, Math.min(12, next[i] + d));
    onDoc({ ...doc, coefs: next });
  };
  const n = all.length;
  const xs = all.map((_, i) => 110 + (i + (i >= eq.left.length ? 0.6 : 0)) * (980 / (n + 0.6 - 1 || 1)));
  const maxN = Math.max(...els.map((el) => Math.max(L[el], R[el])), 1);
  const masses = all.map((f, i) => molarMass(f) * cs[i]);
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          {all.map((f, i) => {
            const x = n === 1 ? 600 : xs[i];
            return (
              <g key={i}>
                <g className="draggable" onPointerDown={() => setC(i, 1)}>
                  <rect x={x - 26} y={52} width={52} height={40} rx={10} fill="var(--accent)" />
                  <text x={x} y={81} textAnchor="middle" fill="#fff" fontSize={28} fontWeight={900}>
                    +
                  </text>
                </g>
                <text x={x} y={146} textAnchor="middle" fontSize={40} fontWeight={800} fill="var(--ink)">
                  <tspan fill="var(--danger)">{cs[i] > 1 ? cs[i] : ''}</tspan>
                  {pretty(f)}
                </text>
                <g className="draggable" onPointerDown={() => setC(i, -1)}>
                  <rect x={x - 26} y={164} width={52} height={40} rx={10} fill="var(--surface-2)" stroke="var(--line)" />
                  <text x={x} y={193} textAnchor="middle" fill="var(--ink)" fontSize={28} fontWeight={900}>
                    −
                  </text>
                </g>
                {Array.from({ length: Math.min(cs[i], 6) }, (_, k) => (
                  <MolCluster key={k} f={f} x={x} y={240 + k * 46} scale={0.9} />
                ))}
                {cs[i] > 6 && (
                  <text x={x} y={530} textAnchor="middle" className="lab-small">
                    … ({cs[i]} phân tử)
                  </text>
                )}
                {i < n - 1 && (
                  <text x={(x + xs[i + 1]) / 2} y={146} textAnchor="middle" fontSize={40} fontWeight={800} fill="var(--ink-2)">
                    {i === eq.left.length - 1 ? '→' : '+'}
                  </text>
                )}
              </g>
            );
          })}
          {/* bảng đếm nguyên tử */}
          {els.map((el, k) => {
            const y = 560 + k * 0;
            const w = 1100 / els.length;
            const x0 = 50 + k * w;
            const bal = L[el] === R[el];
            return (
              <g key={el} transform={`translate(${x0} ${y})`}>
                <text x={w / 2} y={18} textAnchor="middle" fontWeight={800} fontSize={20} fill="var(--ink)">
                  {el}
                </text>
                <rect x={w / 2 - 10 - (40 * (L[el] ?? 0)) / maxN} y={30} width={(40 * (L[el] ?? 0)) / maxN} height={20} fill="var(--accent)" />
                <rect x={w / 2 + 10} y={30} width={(40 * (R[el] ?? 0)) / maxN} height={20} fill="var(--danger)" />
                <text x={w / 2 - 14} y={74} textAnchor="end" className="tick-small">
                  {L[el] ?? 0}
                </text>
                <text x={w / 2 + 14} y={74} className="tick-small">
                  {R[el] ?? 0}
                </text>
                <text x={w / 2} y={74} textAnchor="middle" fontWeight={900} fill={bal ? 'var(--ok)' : 'var(--danger)'}>
                  {bal ? '=' : '≠'}
                </text>
              </g>
            );
          })}
          <text x={50} y={548} className="lab-small">
            Số nguyên tử mỗi nguyên tố: vế trái (xanh) – vế phải (đỏ)
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Lập phương trình hoá học</h3>
        <p className="small">Bấm + / − để đặt hệ số trước mỗi chất, sao cho số nguyên tử mỗi nguyên tố ở hai vế bằng nhau. Không được thay đổi chỉ số trong công thức.</p>
        <div className={`bench-badge ${ok ? 'ok' : ''}`}>{ok ? 'Phương trình đã cân bằng!' : 'Chưa cân bằng'}</div>
        {ok && showValues && (
          <div className="calc">
            <p>
              <b>Tỉ lệ số phân tử:</b> {cs.join(' : ')}
            </p>
            <p>
              <b>Tỉ lệ khối lượng:</b> {masses.map((mm) => fmtShort(mm, 1)).join(' : ')}
            </p>
            <p className="small">
              Tổng khối lượng vế trái = {fmtShort(masses.slice(0, eq.left.length).reduce((a, b) => a + b, 0), 1)} = vế phải = {fmtShort(masses.slice(eq.left.length).reduce((a, b) => a + b, 0), 1)}
            </p>
          </div>
        )}
        <div className="insp-actions">
          <button className="btn" onClick={() => onDoc({ ...doc, coefs: all.map(() => 1) })}>
            Đặt lại hệ số
          </button>
          <button className="btn primary" onClick={() => onDoc({ idx: (doc.idx + 1) % EQUATIONS.length, mode: 'balance', coefs: [] })}>
            Phương trình khác →
          </button>
        </div>
        <p className="small muted">
          Phương trình {(doc.idx % EQUATIONS.length) + 1}/{EQUATIONS.length}
        </p>
      </aside>
    </div>
  );
}

// ---------------- Tính theo phương trình hoá học, hiệu suất ----------------

interface StoichRx {
  label: string;
  sp: { f: string; c: number; side: 'L' | 'R'; gas?: boolean; name: string }[];
  /** chỉ số chất cho biết khối lượng */
  given: number;
  max: number;
}

export const STOICH: Record<string, StoichRx> = {
  zn: { label: 'Zn + HCl', given: 0, max: 13, sp: [{ f: 'Zn', c: 1, side: 'L', name: 'kẽm' }, { f: 'HCl', c: 2, side: 'L', name: 'hydrochloric acid' }, { f: 'ZnCl2', c: 1, side: 'R', name: 'zinc chloride' }, { f: 'H2', c: 1, side: 'R', gas: true, name: 'hydrogen' }] },
  fe: { label: 'Fe + HCl', given: 0, max: 11.2, sp: [{ f: 'Fe', c: 1, side: 'L', name: 'sắt' }, { f: 'HCl', c: 2, side: 'L', name: 'hydrochloric acid' }, { f: 'FeCl2', c: 1, side: 'R', name: 'iron(II) chloride' }, { f: 'H2', c: 1, side: 'R', gas: true, name: 'hydrogen' }] },
  mg: { label: 'Mg + H₂SO₄', given: 0, max: 4.8, sp: [{ f: 'Mg', c: 1, side: 'L', name: 'magnesium' }, { f: 'H2SO4', c: 1, side: 'L', name: 'sulfuric acid' }, { f: 'MgSO4', c: 1, side: 'R', name: 'magnesium sulfate' }, { f: 'H2', c: 1, side: 'R', gas: true, name: 'hydrogen' }] },
  caco3: { label: 'Nung CaCO₃', given: 0, max: 20, sp: [{ f: 'CaCO3', c: 1, side: 'L', name: 'calcium carbonate' }, { f: 'CaO', c: 1, side: 'R', name: 'vôi sống' }, { f: 'CO2', c: 1, side: 'R', gas: true, name: 'carbon dioxide' }] },
  fe2o3: { label: 'Fe₂O₃ + H₂', given: 0, max: 16, sp: [{ f: 'Fe2O3', c: 1, side: 'L', name: 'iron(III) oxide' }, { f: 'H2', c: 3, side: 'L', gas: true, name: 'hydrogen' }, { f: 'Fe', c: 2, side: 'R', name: 'sắt' }, { f: 'H2O', c: 3, side: 'R', name: 'nước' }] },
  kclo3: { label: 'Nhiệt phân KClO₃', given: 0, max: 24.5, sp: [{ f: 'KClO3', c: 2, side: 'L', name: 'potassium chlorate' }, { f: 'KCl', c: 2, side: 'R', name: 'potassium chloride' }, { f: 'O2', c: 3, side: 'R', gas: true, name: 'oxygen' }] },
};

export interface StoichDoc {
  mode: 'stoich';
  rx: keyof typeof STOICH;
  m: number;
  H: number;
}

export function StoichView({ doc, onDoc, showValues, onMeasure }: EngineProps<StoichDoc, unknown>) {
  const rx = STOICH[doc.rx];
  const g = rx.sp[rx.given];
  const nG = doc.m / molarMass(g.f);
  const rows = rx.sp.map((s) => {
    const n = (nG * s.c) / g.c;
    const M = molarMass(s.f);
    const real = s.side === 'R' ? (n * doc.H) / 100 : n;
    return { ...s, M, n, m: n * M, nReal: real, mReal: real * M, V: s.gas ? n * VM : undefined, VReal: s.gas ? real * VM : undefined };
  });
  useEffect(() => onMeasure?.({ n: nG, H: doc.H }), [nG, doc.H, onMeasure]);
  const maxN = Math.max(...rows.map((r) => r.n), 1e-9);
  const eqText = rx.sp.filter((s) => s.side === 'L').map((s) => `${s.c > 1 ? s.c : ''}${pretty(s.f)}`).join(' + ') + ' → ' + rx.sp.filter((s) => s.side === 'R').map((s) => `${s.c > 1 ? s.c : ''}${pretty(s.f)}`).join(' + ');
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <text x={600} y={70} textAnchor="middle" fontSize={36} fontWeight={800} fill="var(--ink)">
            {eqText}
          </text>
          <text x={600} y={112} textAnchor="middle" className="lab-small">
            Tỉ lệ số mol: {rx.sp.map((s) => s.c).join(' : ')}
          </text>
          {rows.map((r, i) => {
            const w = 1100 / rows.length;
            const x = 50 + i * w + w / 2;
            const hT = (r.n / maxN) * 300;
            const hR = (r.nReal / maxN) * 300;
            return (
              <g key={i}>
                <rect x={x - 50} y={520 - hT} width={100} height={hT} fill={r.side === 'L' ? 'rgba(29,111,224,0.25)' : 'rgba(214,40,40,0.18)'} stroke={r.side === 'L' ? 'var(--accent)' : 'var(--danger)'} strokeWidth={2} strokeDasharray={r.side === 'R' && doc.H < 100 ? '6 4' : undefined} />
                {r.side === 'R' && <rect x={x - 50} y={520 - hR} width={100} height={hR} fill="rgba(214,40,40,0.55)" />}
                <text x={x} y={556} textAnchor="middle" fontSize={26} fontWeight={800} fill="var(--ink)">
                  {pretty(r.f)}
                </text>
                <text x={x} y={590} textAnchor="middle" className="lab-small">
                  {showValues ? `${fmt(r.side === 'R' ? r.nReal : r.n, 3)} mol` : '? mol'}
                </text>
                <text x={x} y={620} textAnchor="middle" className="lab-small">
                  {showValues ? (r.gas ? `${fmt(r.side === 'R' ? r.VReal : r.V, 3)} L` : `${fmt(r.side === 'R' ? r.mReal : r.m, 2)} g`) : ''}
                </text>
                {i === rx.given && (
                  <text x={x} y={500 - hT} textAnchor="middle" className="lab-value">
                    {fmtShort(doc.m, 2)} g
                  </text>
                )}
              </g>
            );
          })}
          <text x={600} y={658} textAnchor="middle" className="tick-small">
            Cột rỗng: lượng tính theo lí thuyết · Phần tô đậm: lượng sản phẩm thu được thực tế (hiệu suất {fmtShort(doc.H, 0)}%) · Thể tích khí ở 25 °C, 1 bar
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Tính theo phương trình</h3>
        <Row label="Phản ứng">
          <Seg value={doc.rx} options={Object.keys(STOICH) as (keyof typeof STOICH)[]} onChange={(rxk) => onDoc({ ...doc, rx: rxk, m: STOICH[rxk].max / 2 })} fmtOpt={(k) => STOICH[k].label} />
        </Row>
        <Row label={`Khối lượng ${pretty(g.f)} phản ứng (g)`}>
          <Slider value={doc.m} min={0} max={rx.max} step={rx.max / 100} digits={2} onChange={(v) => onDoc({ ...doc, m: v })} suffix="g" />
        </Row>
        <Row label="Hiệu suất phản ứng (H)">
          <Slider value={doc.H} min={10} max={100} step={1} digits={0} onChange={(v) => onDoc({ ...doc, H: v })} suffix="%" />
        </Row>
        <div className="calc">
          <p>
            1) n<sub>{pretty(g.f)}</sub> = m / M = {fmtShort(doc.m, 2)} / {fmtShort(molarMass(g.f), 1)} = {showValues ? `${fmt(nG, 3)} mol` : '?'}
          </p>
          {rows
            .filter((_, i) => i !== rx.given)
            .map((r) => (
              <p key={r.f}>
                n<sub>{pretty(r.f)}</sub> = {fmtShort(nG, 3)} × {r.c}/{g.c} = {showValues ? `${fmt(r.n, 3)} mol` : '?'}
              </p>
            ))}
          <p>2) Sản phẩm thực tế = lí thuyết × H / 100</p>
        </div>
        <p className="small muted">Hiệu suất H = m(thực tế) / m(lí thuyết) × 100% = n(thực tế) / n(lí thuyết) × 100%.</p>
      </aside>
    </div>
  );
}
