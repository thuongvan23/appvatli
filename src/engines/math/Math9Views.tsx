// Toán 9 (Kết nối tri thức): hệ hai phương trình bậc nhất hai ẩn, bất đẳng thức – bất phương trình,
// căn bậc hai – căn bậc ba, tỉ số lượng giác, đường tròn (cung, dây, tiếp tuyến, góc nội tiếp,
// đường tròn ngoại tiếp – nội tiếp, tứ giác nội tiếp, đa giác đều), hàm số y = ax², phương trình bậc hai,
// hình trụ – hình nón – hình cầu.
import { useRef } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, Toggle, useSvgDrag } from '../../ui/controls';
import { Arc, C, Curve, Grid, Line, MiniTable, P, Poly, Pt, SegLabel, UNIT, VH, VW, add, angleAt, dist, f2, fcm, fdeg, labelOff, mid, mkAxes, mul, project, rot, sub, unit } from './mcommon';
import { dec, fmtNum } from './poly';
import { IsoBoxes } from './AlgebraViews';

const clampP = (p: P): P => ({ x: Math.max(30, Math.min(VW - 330, p.x)), y: Math.max(30, Math.min(VH - 30, p.y)) });

// =====================================================================
// Hệ hai phương trình bậc nhất hai ẩn
// =====================================================================

export type Eq3 = [number, number, number];

export interface SystemDoc {
  mode: 'system';
  e1: Eq3;
  e2?: Eq3;
  /** điểm thử (x0; y0) */
  pt?: { x: number; y: number };
}

export function eqStr([a, b, c]: Eq3): string {
  let s = '';
  if (a) s = a === 1 ? 'x' : a === -1 ? '−x' : `${fmtNum(a)}x`;
  if (b) {
    const bb = Math.abs(b);
    const tt = bb === 1 ? 'y' : `${fmtNum(bb)}y`;
    s += s ? (b < 0 ? ` − ${tt}` : ` + ${tt}`) : b < 0 ? `−${tt}` : tt;
  }
  if (!s) s = '0x + 0y';
  return `${s} = ${fmtNum(c)}`;
}

/** Nghiệm của hệ: 'one' (kèm x, y), 'none' hoặc 'many' */
export function solveSystem(e1: Eq3, e2: Eq3): { kind: 'one'; x: number; y: number } | { kind: 'none' | 'many' } {
  const [a1, b1, c1] = e1;
  const [a2, b2, c2] = e2;
  const D = a1 * b2 - a2 * b1;
  const Dx = c1 * b2 - c2 * b1;
  const Dy = a1 * c2 - a2 * c1;
  if (Math.abs(D) > 1e-12) return { kind: 'one', x: Dx / D, y: Dy / D };
  return Math.abs(Dx) < 1e-12 && Math.abs(Dy) < 1e-12 ? { kind: 'many' } : { kind: 'none' };
}

function LineEq({ ax, e, color }: { ax: ReturnType<typeof mkAxes>; e: Eq3; color: string }) {
  const [a, b, c] = e;
  if (b !== 0) return <Curve ax={ax} f={(x) => (c - a * x) / b} color={color} w={4} />;
  if (a !== 0) return <line x1={ax.X(c / a)} x2={ax.X(c / a)} y1={ax.box.y} y2={ax.box.y + ax.box.h} stroke={color} strokeWidth={4} />;
  return null;
}

export function SystemView({ doc, onDoc, showValues }: EngineProps<SystemDoc, unknown>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const ax = mkAxes(-6, 6, -6, 6, { x: 40, y: 30, w: 620, h: 620 });
  const sol = doc.e2 ? solveSystem(doc.e1, doc.e2) : null;
  const pt = doc.pt;
  const sat = (e: Eq3) => (pt ? Math.abs(e[0] * pt.x + e[1] * pt.y - e[2]) < 1e-9 : false);
  const setE = (k: 'e1' | 'e2', i: number, v: number) => {
    const e = [...(doc[k] as Eq3)] as Eq3;
    e[i] = v;
    onDoc({ ...doc, [k]: e });
  };
  const coefRows = (k: 'e1' | 'e2') =>
    (['a', 'b', 'c'] as const).map((n, i) => (
      <Row key={n} label={`${n}${k === 'e2' ? '′' : ''}`}>
        <Slider value={(doc[k] as Eq3)[i]} min={-6} max={6} step={1} digits={0} onChange={(v) => setE(k, i, v)} />
      </Row>
    ));
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <Grid ax={ax} />
          <LineEq ax={ax} e={doc.e1} color={C.a} />
          {doc.e2 && <LineEq ax={ax} e={doc.e2} color={C.b} />}
          {showValues && sol?.kind === 'one' && Math.abs(sol.x) <= 6 && Math.abs(sol.y) <= 6 && (
            <g>
              <circle cx={ax.X(sol.x)} cy={ax.Y(sol.y)} r={11} fill={C.e} stroke="#fff" strokeWidth={3} />
              <text x={ax.X(sol.x) + 14} y={ax.Y(sol.y) - 14} fontSize={20} fontWeight={800} fill={C.e} stroke="var(--board)" strokeWidth={4} paintOrder="stroke">
                ({dec(sol.x, 2)}; {dec(sol.y, 2)})
              </text>
            </g>
          )}
          {pt && (
            <g
              className="draggable"
              onPointerDown={(e) =>
                start(e, (q) => {
                  const x = Math.max(-6, Math.min(6, Math.round(ax.ix(q.x) * 2) / 2));
                  const y = Math.max(-6, Math.min(6, Math.round(ax.iy(q.y) * 2) / 2));
                  onDoc({ ...doc, pt: { x, y } });
                })
              }
            >
              <circle cx={ax.X(pt.x)} cy={ax.Y(pt.y)} r={24} fill="transparent" />
              <circle cx={ax.X(pt.x)} cy={ax.Y(pt.y)} r={10} fill={C.d} stroke="#fff" strokeWidth={3} />
              <text x={ax.X(pt.x) + 14} y={ax.Y(pt.y) + 28} fontSize={20} fontWeight={800} fill={C.d} stroke="var(--board)" strokeWidth={4} paintOrder="stroke">
                M({fmtNum(pt.x)}; {fmtNum(pt.y)})
              </text>
            </g>
          )}
          <g transform="translate(700 40)">
            <rect width={470} height={600} rx={20} fill="var(--surface)" stroke="var(--line)" />
            {doc.e2 && (
              <path d="M 40 40 q -18 0 -18 18 l 0 30 q 0 10 -10 12 q 10 2 10 12 l 0 30 q 0 18 18 18" fill="none" stroke="var(--ink)" strokeWidth={3} />
            )}
            <text x={50} y={78} fontSize={32} fontWeight={800} fill={C.a} className="math-text">
              {eqStr(doc.e1)}
            </text>
            {doc.e2 && (
              <text x={50} y={140} fontSize={32} fontWeight={800} fill={C.b} className="math-text">
                {eqStr(doc.e2)}
              </text>
            )}
            <foreignObject x={24} y={doc.e2 ? 180 : 110} width={420} height={400}>
              <div className="fmap-box">
                {pt && (
                  <p>
                    Thay M({fmtNum(pt.x)}; {fmtNum(pt.y)}):{' '}
                    <span style={{ color: C.a }}>
                      {showValues ? `${fmtNum(doc.e1[0] * pt.x + doc.e1[1] * pt.y)} ${sat(doc.e1) ? '=' : '≠'} ${fmtNum(doc.e1[2])}` : '?'}
                    </span>
                    {doc.e2 && (
                      <>
                        {'; '}
                        <span style={{ color: C.b }}>{showValues ? `${fmtNum(doc.e2[0] * pt.x + doc.e2[1] * pt.y)} ${sat(doc.e2) ? '=' : '≠'} ${fmtNum(doc.e2[2])}` : '?'}</span>
                      </>
                    )}
                    <br />
                    <b style={{ color: showValues ? ((doc.e2 ? sat(doc.e1) && sat(doc.e2) : sat(doc.e1)) ? C.c : C.b) : 'var(--muted)' }}>
                      {!showValues ? '' : doc.e2 ? (sat(doc.e1) && sat(doc.e2) ? '→ (x₀; y₀) là nghiệm của hệ' : '→ không phải nghiệm của hệ') : sat(doc.e1) ? '→ là một nghiệm của phương trình' : '→ không phải nghiệm'}
                    </b>
                  </p>
                )}
                {sol && (
                  <p style={{ fontWeight: 800, color: C.e }}>
                    {!showValues
                      ? 'Hệ có bao nhiêu nghiệm?'
                      : sol.kind === 'one'
                        ? `Hai đường thẳng cắt nhau → hệ có nghiệm duy nhất (${dec(sol.x, 2)}; ${dec(sol.y, 2)})`
                        : sol.kind === 'none'
                          ? 'Hai đường thẳng song song → hệ vô nghiệm'
                          : 'Hai đường thẳng trùng nhau → hệ có vô số nghiệm'}
                  </p>
                )}
                {!doc.e2 && <p className="small">Mỗi nghiệm (x₀; y₀) của phương trình ax + by = c được biểu diễn bởi một điểm; tập nghiệm là một đường thẳng.</p>}
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{doc.e2 ? 'Hệ hai phương trình' : 'Phương trình ax + by = c'}</h3>
        <h4 style={{ color: C.a }}>Phương trình thứ nhất</h4>
        {coefRows('e1')}
        {doc.e2 && (
          <>
            <h4 style={{ color: C.b }}>Phương trình thứ hai</h4>
            {coefRows('e2')}
          </>
        )}
        <Toggle value={!!pt} onChange={(v) => onDoc({ ...doc, pt: v ? { x: 0, y: 0 } : undefined })} label="Điểm thử M (kéo trên hình)" />
      </aside>
    </div>
  );
}

// =====================================================================
// Bất đẳng thức, bất phương trình bậc nhất một ẩn – trục số
// =====================================================================

export type Rel = '<' | '>' | '≤' | '≥';
export interface IneqDoc {
  mode: 'ineq';
  sub: 'prop' | 'solve';
  /** prop: hai số a < b, phép biến đổi, số k */
  a: number;
  b: number;
  op?: 'add' | 'mul';
  k?: number;
  /** solve: ax + b rel c */
  c?: number;
  rel?: Rel;
  t?: number;
}

const flip: Record<Rel, Rel> = { '<': '>', '>': '<', '≤': '≥', '≥': '≤' };
export function solveIneq(a: number, b: number, c: number, rel: Rel): { rel: Rel; v: number } {
  const v = (c - b) / a;
  return { rel: a > 0 ? rel : flip[rel], v };
}
const holds = (l: number, r: number, rel: Rel) => (rel === '<' ? l < r - 1e-12 : rel === '>' ? l > r + 1e-12 : rel === '≤' ? l <= r + 1e-12 : l >= r - 1e-12);

function NumberLine({ y, lo = -10, hi = 10, children }: { y: number; lo?: number; hi?: number; children?: (X: (v: number) => number) => React.ReactNode }) {
  const X = (v: number) => 80 + ((v - lo) / (hi - lo)) * 1040;
  return (
    <g>
      <line x1={60} x2={1150} y1={y} y2={y} stroke="var(--ink)" strokeWidth={3} />
      <path d={`M 1160 ${y} l -14 -7 l 0 14 Z`} fill="var(--ink)" />
      {Array.from({ length: hi - lo + 1 }, (_, i) => lo + i).map((v) => (
        <g key={v}>
          <line x1={X(v)} x2={X(v)} y1={y - 8} y2={y + 8} stroke="var(--ink)" strokeWidth={2} />
          <text x={X(v)} y={y + 30} textAnchor="middle" className="tick-small">
            {String(v).replace('-', '−')}
          </text>
        </g>
      ))}
      {children?.(X)}
    </g>
  );
}

export function IneqView({ doc, onDoc, showValues }: EngineProps<IneqDoc, unknown>) {
  if (doc.sub === 'prop') {
    const k = doc.k ?? 2;
    const op = doc.op ?? 'add';
    const f = (v: number) => (op === 'add' ? v + k : v * k);
    const a2 = f(doc.a);
    const b2 = f(doc.b);
    const r1 = doc.a < doc.b ? '<' : doc.a > doc.b ? '>' : '=';
    const r2 = a2 < b2 ? '<' : a2 > b2 ? '>' : '=';
    const show = (X: (v: number) => number, v: number, name: string, col: string, up: boolean) => {
      const vv = Math.max(-10, Math.min(10, v));
      return (
        <g>
          <circle cx={X(vv)} cy={0} r={11} fill={col} stroke="#fff" strokeWidth={3} />
          <text x={X(vv)} y={up ? -22 : 52} textAnchor="middle" fontSize={22} fontWeight={800} fill={col} className="math-text">
            {name} = {fmtNum(v)}
            {Math.abs(v) > 10 ? ' (ngoài trục)' : ''}
          </text>
        </g>
      );
    };
    return (
      <div className="eng">
        <div className="eng-stage lab-bg">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
            <text x={600} y={50} textAnchor="middle" className="lab-label">
              Tính chất của bất đẳng thức
            </text>
            <g transform="translate(0 200)">
              <NumberLine y={0}>{(X) => <g>{show(X, doc.a, 'a', C.a, true)}{show(X, doc.b, 'b', C.b, true)}</g>}</NumberLine>
            </g>
            <text x={600} y={140} textAnchor="middle" fontSize={34} fontWeight={800} fill="var(--ink)" className="math-text">
              a {r1} b
            </text>
            <text x={600} y={330} textAnchor="middle" fontSize={26} fontWeight={800} fill={C.e}>
              {op === 'add' ? `Cộng ${fmtNum(k)} vào hai vế` : `Nhân hai vế với ${fmtNum(k)}`} ↓
            </text>
            <g transform="translate(0 460)">
              <NumberLine y={0}>{(X) => <g>{show(X, a2, op === 'add' ? 'a + k' : 'a·k', C.a, true)}{show(X, b2, op === 'add' ? 'b + k' : 'b·k', C.b, false)}</g>}</NumberLine>
            </g>
            <text x={600} y={400} textAnchor="middle" fontSize={34} fontWeight={800} fill="var(--ink)" className="math-text">
              {op === 'add' ? 'a + k' : 'a·k'} {showValues ? r2 : '?'} {op === 'add' ? 'b + k' : 'b·k'}
            </text>
            {showValues && (
              <text x={600} y={620} textAnchor="middle" fontSize={24} fontWeight={900} fill={r1 === r2 ? C.c : C.b}>
                {r1 === r2 ? 'Bất đẳng thức giữ nguyên chiều' : r2 === '=' ? 'Nhân với 0: hai vế bằng nhau' : 'Bất đẳng thức đổi chiều'}
              </text>
            )}
          </svg>
        </div>
        <aside className="eng-side">
          <h3>Tính chất bất đẳng thức</h3>
          <Row label="a">
            <Slider value={doc.a} min={-8} max={8} step={1} digits={0} onChange={(v) => onDoc({ ...doc, a: v })} />
          </Row>
          <Row label="b">
            <Slider value={doc.b} min={-8} max={8} step={1} digits={0} onChange={(v) => onDoc({ ...doc, b: v })} />
          </Row>
          <Row label="Phép biến đổi">
            <Seg value={op} options={['add', 'mul'] as const} onChange={(v) => onDoc({ ...doc, op: v })} fmtOpt={(v) => (v === 'add' ? 'Cộng k' : 'Nhân với k')} />
          </Row>
          <Row label="k">
            <Slider value={k} min={-3} max={3} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, k: v })} />
          </Row>
          <p className="small">Cộng cùng một số vào hai vế: giữ nguyên chiều. Nhân hai vế với cùng một số dương: giữ nguyên chiều; với cùng một số âm: đổi chiều.</p>
        </aside>
      </div>
    );
  }
  const a = doc.a;
  const b = doc.b;
  const c = doc.c ?? 0;
  const rel = doc.rel ?? '<';
  const s = a !== 0 ? solveIneq(a, b, c, rel) : null;
  const t = doc.t ?? 0;
  const lhs = a * t + b;
  const ok = holds(lhs, c, rel);
  const lhsStr = `${a === 1 ? '' : a === -1 ? '−' : fmtNum(a)}x${b ? (b > 0 ? ` + ${fmtNum(b)}` : ` − ${fmtNum(-b)}`) : ''}`;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <text x={600} y={80} textAnchor="middle" fontSize={44} fontWeight={800} fill="var(--accent)" className="math-text">
            {lhsStr} {rel} {fmtNum(c)}
          </text>
          {s && showValues && (
            <g>
              <text x={600} y={150} textAnchor="middle" fontSize={26} fontWeight={700} fill="var(--ink-2)" className="math-text">
                {fmtNum(a)}x {rel} {fmtNum(c)} − ({fmtNum(b)}) = {fmtNum(c - b)}
                {a < 0 ? '   (chia cho số âm: đổi chiều)' : ''}
              </text>
              <text x={600} y={210} textAnchor="middle" fontSize={36} fontWeight={900} fill={C.c} className="math-text">
                x {s.rel} {fmtNum(s.v)}
              </text>
            </g>
          )}
          <g transform="translate(0 380)">
            <NumberLine y={0}>
              {(X) => {
                if (!s || !showValues) return null;
                const v = Math.max(-10, Math.min(10, s.v));
                const right = s.rel === '>' || s.rel === '≥';
                const closed = s.rel === '≤' || s.rel === '≥';
                return (
                  <g>
                    <rect x={right ? X(v) : 60} y={-16} width={right ? 1150 - X(v) : X(v) - 60} height={32} fill={C.c} opacity={0.3} />
                    <circle cx={X(v)} cy={0} r={11} fill={closed ? C.c : 'var(--surface)'} stroke={C.c} strokeWidth={4} />
                    <text x={X(v)} y={-30} textAnchor="middle" fontSize={20} fontWeight={800} fill={C.c}>
                      {closed ? 'lấy điểm này' : 'không lấy điểm này'}
                    </text>
                  </g>
                );
              }}
            </NumberLine>
          </g>
          <g transform="translate(0 520)">
            <NumberLine y={0}>
              {(X) => (
                <g>
                  <circle cx={X(Math.max(-10, Math.min(10, t)))} cy={0} r={11} fill={ok ? C.c : C.b} stroke="#fff" strokeWidth={3} />
                  <text x={X(Math.max(-10, Math.min(10, t)))} y={-24} textAnchor="middle" fontSize={20} fontWeight={800} fill={ok ? C.c : C.b} className="math-text">
                    thử x = {fmtNum(t)}: {fmtNum(lhs)} {rel} {fmtNum(c)} {ok ? 'đúng' : 'sai'}
                  </text>
                </g>
              )}
            </NumberLine>
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Bất phương trình bậc nhất</h3>
        <Row label="a">
          <Slider value={a} min={-5} max={5} step={1} digits={0} onChange={(v) => onDoc({ ...doc, a: v === 0 ? (a > 0 ? -1 : 1) : v })} />
        </Row>
        <Row label="b">
          <Slider value={b} min={-9} max={9} step={1} digits={0} onChange={(v) => onDoc({ ...doc, b: v })} />
        </Row>
        <Row label="Dấu">
          <Seg value={rel} options={['<', '>', '≤', '≥'] as const} onChange={(v) => onDoc({ ...doc, rel: v })} />
        </Row>
        <Row label="c">
          <Slider value={c} min={-9} max={9} step={1} digits={0} onChange={(v) => onDoc({ ...doc, c: v })} />
        </Row>
        <Row label="Thử x =">
          <Slider value={t} min={-10} max={10} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, t: v })} />
        </Row>
        <p className="small muted">Phần tô xanh trên trục số là tập nghiệm (hiện khi bấm “Hiện số đo”).</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Căn bậc hai, căn bậc ba
// =====================================================================

export interface SqrtDoc {
  mode: 'sqrt';
  sub: 'square' | 'cube';
  A: number;
}

export function SqrtView({ doc, onDoc, showValues }: EngineProps<SqrtDoc, unknown>) {
  const A = doc.A;
  if (doc.sub === 'cube') {
    const e = Math.cbrt(A);
    const s = Math.min(60, 260 / Math.max(e, 1));
    return (
      <div className="eng">
        <div className="eng-stage lab-bg">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
            <text x={400} y={50} textAnchor="middle" className="lab-label">
              Khối lập phương có thể tích {fmtNum(A)}
            </text>
            <IsoBoxes boxes={Array.from({ length: Number.isInteger(e) && e <= 5 ? e * e * e : 1 }, (_, i) => {
              const n = Number.isInteger(e) && e <= 5 ? e : 0;
              if (!n) return { x: 0, y: 0, z: 0, dx: e, dy: e, dz: e, color: C.a, label: '' };
              return { x: i % n, y: Math.floor(i / n) % n, z: Math.floor(i / n / n), dx: 1, dy: 1, dz: 1, color: C.a, label: '' };
            })} ox={400} oy={400 - (e * s) / 4} s={s} />
            <g transform="translate(780 120)">
              <rect width={390} height={440} rx={20} fill="var(--surface)" stroke="var(--line)" />
              <text x={30} y={70} fontSize={28} fontWeight={800} fill="var(--ink)" className="math-text">
                V = a³ = {fmtNum(A)}
              </text>
              <text x={30} y={140} fontSize={34} fontWeight={900} fill={C.b} className="math-text">
                a = ∛{fmtNum(A)} {showValues ? `${Number.isInteger(Math.round(e * 1e9) / 1e9) ? '=' : '≈'} ${dec(e, 3)}` : '= ?'}
              </text>
              <foreignObject x={24} y={180} width={350} height={240}>
                <div className="fmap-box small">
                  <p>Căn bậc ba của một số a là số x sao cho x³ = a. Mỗi số thực có đúng một căn bậc ba.</p>
                  <p>Ví dụ: ∛8 = 2; ∛(−27) = −3; ∛0 = 0.</p>
                </div>
              </foreignObject>
            </g>
          </svg>
        </div>
        <aside className="eng-side">
          <h3>Căn bậc ba</h3>
          <Row label="Thể tích V">
            <Slider value={A} min={1} max={125} step={1} digits={0} onChange={(v) => onDoc({ ...doc, A: v })} />
          </Row>
          <p className="small muted">Thử V = 8, 27, 64, 125 (lập phương của số tự nhiên) và các giá trị khác.</p>
        </aside>
      </div>
    );
  }
  const sA = Math.sqrt(A);
  const px = Math.min(44, 380 / Math.max(sA, 1));
  const x0 = 80;
  const y0 = 600;
  const n = Math.floor(sA);
  const lo = n;
  const X = (v: number) => 760 + ((v - 0) / 11) * 400;
  const Z = (v: number) => 760 + ((v - lo) / 1) * 400;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <text x={300} y={50} textAnchor="middle" className="lab-label">
            Hình vuông có diện tích {fmtNum(A)}
          </text>
          <rect x={x0} y={y0 - sA * px} width={sA * px} height={sA * px} fill={C.soft[0]} stroke={C.a} strokeWidth={4} />
          {A <= 100 &&
            Array.from({ length: Math.floor(sA) }, (_, i) => i + 1).map((i) => (
              <g key={i}>
                <line x1={x0 + i * px} x2={x0 + i * px} y1={y0} y2={y0 - sA * px} stroke={C.a} strokeOpacity={0.35} />
                <line x1={x0} x2={x0 + sA * px} y1={y0 - i * px} y2={y0 - i * px} stroke={C.a} strokeOpacity={0.35} />
              </g>
            ))}
          <text x={x0 + (sA * px) / 2} y={y0 + 34} textAnchor="middle" fontSize={24} fontWeight={800} fill={C.b} className="math-text">
            cạnh = √{fmtNum(A)} {showValues ? `≈ ${dec(sA, 3)}` : ''}
          </text>
          <text x={x0 + (sA * px) / 2} y={y0 - (sA * px) / 2 + 10} textAnchor="middle" fontSize={30} fontWeight={900} fill={C.a}>
            S = {fmtNum(A)}
          </text>
          <text x={960} y={120} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--muted)">
            Vị trí của √{fmtNum(A)} trên trục số
          </text>
          <line x1={740} x2={1180} y1={200} y2={200} stroke="var(--ink)" strokeWidth={3} />
          {Array.from({ length: 12 }, (_, i) => i).map((v) => (
            <g key={v}>
              <line x1={X(v)} x2={X(v)} y1={192} y2={208} stroke="var(--ink)" strokeWidth={2} />
              <text x={X(v)} y={232} textAnchor="middle" className="tick-small">
                {v}
              </text>
            </g>
          ))}
          {showValues && sA <= 11 && <circle cx={X(sA)} cy={200} r={9} fill={C.b} />}
          <rect x={X(lo)} y={186} width={X(lo + 1) - X(lo)} height={28} fill="none" stroke={C.e} strokeWidth={2} strokeDasharray="5 4" />
          <line x1={X(lo)} y1={214} x2={760} y2={330} stroke={C.e} strokeDasharray="5 4" />
          <line x1={X(lo + 1)} y1={214} x2={1160} y2={330} stroke={C.e} strokeDasharray="5 4" />
          <line x1={760} x2={1160} y1={360} y2={360} stroke="var(--ink)" strokeWidth={3} />
          {Array.from({ length: 11 }, (_, i) => lo + i / 10).map((v, i) => (
            <g key={i}>
              <line x1={Z(v)} x2={Z(v)} y1={i % 5 === 0 ? 346 : 352} y2={i % 5 === 0 ? 374 : 368} stroke="var(--ink)" strokeWidth={2} />
              {i % 2 === 0 && (
                <text x={Z(v)} y={398} textAnchor="middle" className="tick-small">
                  {dec(v, 1)}
                </text>
              )}
            </g>
          ))}
          {showValues && <circle cx={Z(sA)} cy={360} r={10} fill={C.b} />}
          <foreignObject x={740} y={430} width={430} height={220}>
            <div className="fmap-box">
              <p>
                {n}² = {n * n} ≤ {fmtNum(A)} {A < (n + 1) ** 2 ? '<' : '='} {(n + 1) ** 2} = {n + 1}² ⇒ {n} ≤ √{fmtNum(A)} {A < (n + 1) ** 2 ? '<' : '='} {n + 1}
              </p>
              <p>
                Số {fmtNum(A)} có hai căn bậc hai: <b>{showValues ? `±${dec(sA, 3)}` : '±?'}</b>. Căn bậc hai số học là √{fmtNum(A)} {showValues ? `≈ ${dec(sA, 3)}` : ''}.
              </p>
            </div>
          </foreignObject>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Căn bậc hai</h3>
        <Row label="Diện tích S">
          <Slider value={A} min={1} max={100} step={1} digits={0} onChange={(v) => onDoc({ ...doc, A: v })} />
        </Row>
        <p className="small">Căn bậc hai của số thực không âm a là số x sao cho x² = a. Số dương a có đúng hai căn bậc hai là √a và −√a; số 0 có một căn bậc hai là 0; số âm không có căn bậc hai.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Tỉ số lượng giác của góc nhọn
// =====================================================================

export interface TrigDoc {
  mode: 'trig';
  sub: 'ratio' | 'height';
  alpha: number;
  size: number;
  compare?: boolean;
  /** height: khoảng cách tới chân tháp (m), độ cao mắt (m) */
  d?: number;
  h0?: number;
}

export function TrigView({ doc, onDoc, showValues }: EngineProps<TrigDoc, unknown>) {
  const al = doc.alpha;
  const r = (al * Math.PI) / 180;
  const sin = Math.sin(r);
  const cos = Math.cos(r);
  const tan = Math.tan(r);
  const v = (x: number) => (showValues ? dec(x, 4) : '?');
  if (doc.sub === 'height') {
    const d = doc.d ?? 20;
    const h0 = doc.h0 ?? 1.5;
    const H = h0 + d * tan;
    const s = Math.min(26, 560 / (d + 4), 440 / (H + 1));
    const g = 600;
    const ex = 140;
    const tx = ex + d * s;
    return (
      <div className="eng">
        <div className="eng-stage lab-bg">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
            <rect x={0} y={g} width={VW} height={VH - g} fill="#b7d99a" />
            <rect x={tx - 20} y={g - H * s} width={40} height={H * s} fill="#94a3b8" stroke="#475569" strokeWidth={2} />
            <line x1={ex} y1={g} x2={ex} y2={g - h0 * s} stroke={C.e} strokeWidth={6} />
            <circle cx={ex} cy={g - h0 * s - 10} r={10} fill={C.e} />
            <line x1={ex} y1={g - h0 * s} x2={tx} y2={g - h0 * s} stroke="var(--ink-2)" strokeWidth={2} strokeDasharray="8 6" />
            <line x1={ex} y1={g - h0 * s} x2={tx} y2={g - H * s} stroke={C.b} strokeWidth={3} />
            <Arc a={{ x: tx, y: g - h0 * s }} o={{ x: ex, y: g - h0 * s }} b={{ x: tx, y: g - H * s }} r={60} color={C.d} label={`${al}°`} right={false} />
            <text x={(ex + tx) / 2} y={g + 36} textAnchor="middle" className="lab-label">
              {f2(d, 1)} m
            </text>
            <text x={tx + 30} y={g - (H * s) / 2} fontSize={26} fontWeight={900} fill={C.b}>
              {showValues ? `${f2(H, 2)} m` : '? m'}
            </text>
            <text x={ex - 16} y={g - (h0 * s) / 2} textAnchor="end" className="lab-small">
              {f2(h0, 1)} m
            </text>
            <foreignObject x={760} y={60} width={420} height={260}>
              <div className="fmap-box">
                <b>Đo chiều cao bằng giác kế</b>
                <p>Chiều cao = độ cao mắt + d · tan α</p>
                <p style={{ color: C.b, fontWeight: 800 }}>{showValues ? `${f2(h0, 1)} + ${f2(d, 1)} · tan ${al}° ≈ ${f2(H, 2)} (m)` : '?'}</p>
              </div>
            </foreignObject>
          </svg>
        </div>
        <aside className="eng-side">
          <h3>Ứng dụng</h3>
          <Row label="Góc nâng α">
            <Slider value={al} min={10} max={75} step={1} digits={0} suffix="°" onChange={(x) => onDoc({ ...doc, alpha: x })} />
          </Row>
          <Row label="Khoảng cách d (m)">
            <Slider value={d} min={5} max={50} step={1} digits={0} onChange={(x) => onDoc({ ...doc, d: x })} />
          </Row>
          <Row label="Độ cao mắt (m)">
            <Slider value={h0} min={1} max={2} step={0.1} digits={1} onChange={(x) => onDoc({ ...doc, h0: x })} />
          </Row>
        </aside>
      </div>
    );
  }
  const L = Math.min(doc.size, 380 / Math.max(tan, 0.3));
  const A: P = { x: 520, y: 560 };
  const B: P = { x: A.x - L, y: A.y };
  const Cc: P = { x: A.x, y: A.y - L * tan };
  const tri2 = doc.compare ? [A, B, Cc].map((p) => ({ x: 640 + (p.x - A.x) * 0.5 + 60, y: A.y + (p.y - A.y) * 0.5 })) : null;
  const ratioRow = (name: string, num: string, den: string, val: number, col: string) => (
    <div key={name} className="trig-row">
      <b style={{ color: col }}>{name} α</b> = {num}/{den} = <b>{v(val)}</b>
    </div>
  );
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <Poly pts={[A, B, Cc]} fill={C.soft[0]} stroke="none" />
          <Line a={A} b={Cc} color={C.b} w={6} />
          <Line a={A} b={B} color={C.a} w={6} />
          <Line a={B} b={Cc} color={C.c} w={6} />
          <Arc a={Cc} o={A} b={B} r={24} color="var(--ink)" />
          <Arc a={A} o={B} b={Cc} r={50} color={C.d} label="α" right={false} fill />
          <SegLabel a={A} b={Cc} away={B} text={`đối ${showValues ? fcm(dist(A, Cc)) : ''}`} color={C.b} />
          <SegLabel a={B} b={A} away={Cc} text={`kề ${showValues ? fcm(dist(A, B)) : ''}`} color={C.a} />
          <SegLabel a={B} b={Cc} away={A} text={`huyền ${showValues ? fcm(dist(B, Cc)) : ''}`} color={C.c} />
          <Pt p={A} label="A" dx={18} dy={26} />
          <Pt p={B} label="B" dx={-18} dy={26} />
          <Pt p={Cc} label="C" dx={18} dy={-8} />
          {tri2 && (
            <g>
              <Poly pts={tri2} fill={C.soft[1]} stroke={C.b} w={3} />
              <Arc a={tri2[0]} o={tri2[1]} b={tri2[2]} r={30} color={C.d} label="α" right={false} />
              <text x={tri2[1].x} y={A.y + 40} fontSize={16} fontWeight={700} fill="var(--muted)">
                tam giác nhỏ hơn: tỉ số không đổi
              </text>
            </g>
          )}
          <foreignObject x={760} y={60} width={420} height={560}>
            <div className="fmap-box trig-box">
              <p>Với góc nhọn α = {al}° (góc B):</p>
              {ratioRow('sin', 'đối', 'huyền', sin, C.b)}
              {ratioRow('cos', 'kề', 'huyền', cos, C.a)}
              {ratioRow('tan', 'đối', 'kề', tan, C.d)}
              {ratioRow('cot', 'kề', 'đối', 1 / tan, C.e)}
              <p className="small">
                Góc C = 90° − α = {90 - al}°: sin C = cos α, cos C = sin α, tan C = cot α.
              </p>
            </div>
          </foreignObject>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Tỉ số lượng giác</h3>
        <Row label="Góc nhọn α">
          <Slider value={al} min={5} max={85} step={1} digits={0} suffix="°" onChange={(x) => onDoc({ ...doc, alpha: x })} />
        </Row>
        <Row label="Kích thước tam giác">
          <Slider value={doc.size} min={120} max={460} step={10} digits={0} onChange={(x) => onDoc({ ...doc, size: x })} />
        </Row>
        <Toggle value={!!doc.compare} onChange={(x) => onDoc({ ...doc, compare: x })} label="Thêm tam giác vuông nhỏ có cùng góc α" />
        <MiniTable
          head={['', '30°', '45°', '60°']}
          rows={[
            ['sin', '1/2', '√2/2', '√3/2'],
            ['cos', '√3/2', '√2/2', '1/2'],
            ['tan', '√3/3', '1', '√3'],
            ['cot', '√3', '1', '√3/3'],
          ]}
        />
      </aside>
    </div>
  );
}

// =====================================================================
// Đường tròn
// =====================================================================

export type CircleSub = 'basic' | 'chord' | 'arc' | 'line' | 'tangents' | 'two' | 'inscribed' | 'tri' | 'cyclic' | 'polygon';

export interface CircleDoc {
  mode: 'circle';
  sub: CircleSub;
  /** điểm M (basic), điểm A ngoài đường tròn (tangents) */
  M?: P;
  /** góc (độ) của các điểm trên đường tròn */
  angs?: number[];
  /** arc: số đo cung; R, r (cm) */
  n?: number;
  R?: number;
  r?: number;
  ring?: boolean;
  /** line: khoảng cách (cm); two: khoảng cách hai tâm (cm) */
  d?: number;
  tri?: P[];
  outer?: boolean;
  inner?: boolean;
  free?: boolean;
  Dp?: P;
  sides?: number;
  diam?: boolean;
}

const O: P = { x: 380, y: 340 };
const onC = (deg: number, R: number): P => ({ x: O.x + R * Math.cos((deg * Math.PI) / 180), y: O.y - R * Math.sin((deg * Math.PI) / 180) });
const angOf = (p: P) => (Math.atan2(-(p.y - O.y), p.x - O.x) * 180) / Math.PI;
/** Đường tròn qua ba điểm */
export function circumcircle(A: P, B: P, Cc: P): { c: P; r: number } {
  const d = 2 * (A.x * (B.y - Cc.y) + B.x * (Cc.y - A.y) + Cc.x * (A.y - B.y));
  const ux = ((A.x ** 2 + A.y ** 2) * (B.y - Cc.y) + (B.x ** 2 + B.y ** 2) * (Cc.y - A.y) + (Cc.x ** 2 + Cc.y ** 2) * (A.y - B.y)) / d;
  const uy = ((A.x ** 2 + A.y ** 2) * (Cc.x - B.x) + (B.x ** 2 + B.y ** 2) * (A.x - Cc.x) + (Cc.x ** 2 + Cc.y ** 2) * (B.x - A.x)) / d;
  const c = { x: ux, y: uy };
  return { c, r: dist(c, A) };
}
export function incircle(A: P, B: P, Cc: P): { c: P; r: number } {
  const a = dist(B, Cc);
  const b = dist(A, Cc);
  const c = dist(A, B);
  const p = a + b + c;
  const I = { x: (a * A.x + b * B.x + c * Cc.x) / p, y: (a * A.y + b * B.y + c * Cc.y) / p };
  const area = Math.abs((B.x - A.x) * (Cc.y - A.y) - (Cc.x - A.x) * (B.y - A.y)) / 2;
  return { c: I, r: (2 * area) / p };
}

function arcPath(R: number, d1: number, d2: number, c: P = O) {
  const p1 = { x: c.x + R * Math.cos((d1 * Math.PI) / 180), y: c.y - R * Math.sin((d1 * Math.PI) / 180) };
  const p2 = { x: c.x + R * Math.cos((d2 * Math.PI) / 180), y: c.y - R * Math.sin((d2 * Math.PI) / 180) };
  const sweep = (((d2 - d1) % 360) + 360) % 360;
  return `M ${p1.x} ${p1.y} A ${R} ${R} 0 ${sweep > 180 ? 1 : 0} 0 ${p2.x} ${p2.y}`;
}

const CIRCLE_TITLE: Record<CircleSub, string> = {
  basic: 'Đường tròn',
  chord: 'Cung và dây',
  arc: 'Độ dài cung, diện tích hình quạt, hình vành khuyên',
  line: 'Vị trí tương đối của đường thẳng và đường tròn',
  tangents: 'Hai tiếp tuyến cắt nhau',
  two: 'Vị trí tương đối của hai đường tròn',
  inscribed: 'Góc nội tiếp',
  tri: 'Đường tròn ngoại tiếp, nội tiếp tam giác',
  cyclic: 'Tứ giác nội tiếp',
  polygon: 'Đa giác đều',
};

export function CircleView({ doc, onDoc, showValues }: EngineProps<CircleDoc, unknown>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const R = (doc.R ?? 5) * UNIT;
  const angs = doc.angs ?? [];
  const dragAng = (i: number) => (e: React.PointerEvent) => start(e, (q) => onDoc({ ...doc, angs: angs.map((a, j) => (j === i ? Math.round(angOf(q)) : a)) }));
  const circle = <circle cx={O.x} cy={O.y} r={R} fill={C.soft[0]} stroke={C.a} strokeWidth={4} />;
  const center = <Pt p={O} label="O" dx={-20} dy={24} />;
  let pic: React.ReactNode = null;
  const info: [string, string][] = [];
  let note = '';
  const sv = (s: string) => (showValues ? s : '?');
  switch (doc.sub) {
    case 'basic': {
      const M = doc.M ?? { x: 600, y: 200 };
      const d = dist(O, M);
      const pos = Math.abs(d - R) < 4 ? 'nằm trên đường tròn' : d < R ? 'nằm bên trong đường tròn' : 'nằm bên ngoài đường tròn';
      const M2 = sub(mul(O, 2), M);
      pic = (
        <g>
          {circle}
          <Line a={O} b={M} color={C.b} w={3} />
          {doc.diam && <Line a={M} b={M2} color={C.e} w={2} />}
          {doc.diam && <Pt p={M2} label="M′" dx={-24} dy={-10} />}
          {center}
          <Pt p={M} label="M" color={C.b} onDown={(e) => start(e, (q) => onDoc({ ...doc, M: clampP(q) }))} />
        </g>
      );
      info.push(['OM', sv(`${fcm(d)} cm`)], ['R', `${fcm(R)} cm`], ['Vị trí của M', sv(pos)]);
      note = 'OM < R: M nằm trong; OM = R: M nằm trên; OM > R: M nằm ngoài đường tròn. Đường tròn có tâm đối xứng là tâm O và có vô số trục đối xứng (mọi đường kính).';
      break;
    }
    case 'chord': {
      const [a1, a2] = angs;
      const A = onC(a1, R);
      const B = onC(a2, R);
      const H = mid(A, B);
      const cen = (((a2 - a1) % 360) + 360) % 360;
      const minor = Math.min(cen, 360 - cen);
      pic = (
        <g>
          {circle}
          <path d={cen <= 180 ? arcPath(R, a1, a2) : arcPath(R, a2, a1)} fill="none" stroke={C.b} strokeWidth={9} strokeLinecap="round" opacity={0.7} />
          <Line a={O} b={A} color={C.d} w={2} dash="6 4" />
          <Line a={O} b={B} color={C.d} w={2} dash="6 4" />
          <Arc a={A} o={O} b={B} r={36} color={C.d} label={sv(fdeg(minor))} />
          <Line a={A} b={B} color={C.e} w={5} />
          <Line a={O} b={H} color={C.c} w={3} />
          {Math.abs(minor - 180) > 1 && <Arc a={O} o={H} b={B} r={16} color={C.c} />}
          {doc.diam && <Line a={onC(0, R)} b={onC(180, R)} color="var(--ink-2)" w={2} dash="10 6" />}
          {center}
          <Pt p={H} label="H" {...labelOff(H, O, 26)} />
          <Pt p={A} label="A" {...labelOff(A, O, 28)} color={C.e} onDown={dragAng(0)} />
          <Pt p={B} label="B" {...labelOff(B, O, 28)} color={C.e} onDown={dragAng(1)} />
        </g>
      );
      info.push(['Dây AB', sv(`${fcm(dist(A, B))} cm`)], ['Đường kính', `${fcm(2 * R)} cm`], ['Khoảng cách OH', sv(`${fcm(dist(O, H))} cm`)], ['Góc ở tâm AOB', sv(fdeg(minor))], ['Cung nhỏ AB', sv(fdeg(minor))], ['Cung lớn AB', sv(fdeg(360 - minor))]);
      note = 'Trong một đường tròn, đường kính là dây lớn nhất. Số đo cung nhỏ bằng số đo góc ở tâm chắn cung đó; số đo cung lớn bằng 360° trừ số đo cung nhỏ.';
      break;
    }
    case 'arc': {
      const n = doc.n ?? 90;
      const Rc = doc.R ?? 5;
      const rc = doc.r ?? 3;
      const s = Math.min(UNIT, 250 / Rc);
      const Rp = Rc * s;
      const rp = rc * s;
      const a1 = 90 - n / 2;
      const a2 = 90 + n / 2;
      pic = doc.ring ? (
        <g>
          <circle cx={O.x} cy={O.y} r={Rp} fill={C.soft[2]} stroke={C.c} strokeWidth={3} />
          <circle cx={O.x} cy={O.y} r={rp} fill="var(--board)" stroke={C.c} strokeWidth={3} />
          <Line a={O} b={{ x: O.x + Rp, y: O.y }} color={C.b} w={3} />
          <Line a={O} b={{ x: O.x - rp * 0.7, y: O.y - rp * 0.7 }} color={C.d} w={3} />
          <text x={O.x + Rp / 2} y={O.y - 8} textAnchor="middle" fontSize={22} fontWeight={800} fill={C.b}>
            R
          </text>
          <text x={O.x - rp * 0.45} y={O.y - rp * 0.2} textAnchor="middle" fontSize={22} fontWeight={800} fill={C.d}>
            r
          </text>
          {center}
        </g>
      ) : (
        <g>
          <circle cx={O.x} cy={O.y} r={Rp} fill="none" stroke={C.a} strokeWidth={2} strokeDasharray="6 6" />
          <path d={`M ${O.x} ${O.y} L ${onC(a1, Rp).x} ${onC(a1, Rp).y} A ${Rp} ${Rp} 0 ${n > 180 ? 1 : 0} 0 ${onC(a2, Rp).x} ${onC(a2, Rp).y} Z`} fill={C.soft[3]} stroke={C.d} strokeWidth={3} />
          <path d={arcPath(Rp, a1, a2)} fill="none" stroke={C.b} strokeWidth={8} strokeLinecap="round" />
          <Arc a={onC(a1, Rp)} o={O} b={onC(a2, Rp)} r={34} color="var(--ink)" label={`${n}°`} right={false} />
          {center}
        </g>
      );
      if (doc.ring) info.push(['R', `${f2(Rc, 1)} cm`], ['r', `${f2(rc, 1)} cm`], ['S vành khuyên = π(R² − r²)', sv(`${f2(Math.PI * (Rc * Rc - rc * rc), 2)} cm²`)]);
      else info.push(['R', `${f2(Rc, 1)} cm`], ['Số đo cung n', `${n}°`], ['Độ dài cung l = πRn/180', sv(`${f2((Math.PI * Rc * n) / 180, 2)} cm`)], ['S quạt = πR²n/360', sv(`${f2((Math.PI * Rc * Rc * n) / 360, 2)} cm²`)], ['Chu vi đường tròn', sv(`${f2(2 * Math.PI * Rc, 2)} cm`)]);
      note = doc.ring ? 'Hình vành khuyên là phần nằm giữa hai đường tròn đồng tâm.' : 'Độ dài cung n° tỉ lệ với n: bằng n/360 chu vi; diện tích hình quạt bằng n/360 diện tích hình tròn (= l·R/2).';
      break;
    }
    case 'line': {
      const d = (doc.d ?? 3) * UNIT;
      const y = O.y + d;
      const pts: P[] = [];
      if (d < R - 0.5) {
        const h = Math.sqrt(R * R - d * d);
        pts.push({ x: O.x - h, y }, { x: O.x + h, y });
      } else if (Math.abs(d - R) <= 0.5) pts.push({ x: O.x, y });
      const kind = pts.length === 2 ? 'cắt nhau (2 điểm chung)' : pts.length === 1 ? 'tiếp xúc (1 điểm chung)' : 'không giao nhau';
      pic = (
        <g>
          {circle}
          <line x1={40} x2={740} y1={y} y2={y} stroke={C.b} strokeWidth={4} />
          <text x={720} y={y - 10} textAnchor="end" fontSize={22} fontWeight={800} fontStyle="italic" fill={C.b}>
            a
          </text>
          <Line a={O} b={{ x: O.x, y }} color={C.c} w={3} dash="8 5" />
          <Arc a={O} o={{ x: O.x, y }} b={{ x: O.x + 40, y }} r={18} color={C.c} />
          <text x={O.x + 12} y={(O.y + y) / 2} fontSize={22} fontWeight={800} fill={C.c}>
            d
          </text>
          {center}
          {pts.map((p, i) => (
            <Pt key={i} p={p} label={pts.length === 1 ? 'H' : i ? 'B' : 'A'} dy={34} />
          ))}
        </g>
      );
      info.push(['d (khoảng cách từ O đến a)', `${fcm(d)} cm`], ['R', `${fcm(R)} cm`], ['Vị trí', sv(kind)]);
      note = 'd < R: cắt nhau; d = R: tiếp xúc (a là tiếp tuyến, vuông góc với bán kính tại tiếp điểm); d > R: không giao nhau.';
      break;
    }
    case 'tangents': {
      const A = doc.M ?? { x: 720, y: 340 };
      const dA = dist(O, A);
      const inside = dA <= R + 1;
      let B: P | null = null;
      let Cc: P | null = null;
      if (!inside) {
        const phi = (Math.acos(R / dA) * 180) / Math.PI;
        const u = unit(sub(A, O));
        B = add(O, mul(rot(u, -phi), R));
        Cc = add(O, mul(rot(u, phi), R));
      }
      pic = (
        <g>
          {circle}
          {B && Cc && (
            <g>
              <Line a={A} b={B} color={C.b} w={4} />
              <Line a={A} b={Cc} color={C.b} w={4} />
              <Line a={O} b={B} color={C.c} w={3} />
              <Line a={O} b={Cc} color={C.c} w={3} />
              <Line a={O} b={A} color="var(--ink-2)" w={2} dash="8 6" />
              <Arc a={O} o={B} b={A} r={16} color={C.c} />
              <Arc a={O} o={Cc} b={A} r={16} color={C.c} />
              <Arc a={B} o={A} b={O} r={46} color={C.d} />
              <Arc a={O} o={A} b={Cc} r={52} color={C.d} />
              <Pt p={B} label="B" {...labelOff(B, O, 26)} />
              <Pt p={Cc} label="C" {...labelOff(Cc, O, 26)} />
            </g>
          )}
          {center}
          <Pt p={A} label="A" color={C.b} dx={20} onDown={(e) => start(e, (q) => onDoc({ ...doc, M: clampP(q) }))} />
        </g>
      );
      if (B && Cc) info.push(['AB', sv(`${fcm(dist(A, B))} cm`)], ['AC', sv(`${fcm(dist(A, Cc))} cm`)], ['Góc BAO', sv(fdeg(angleAt(B, A, O)))], ['Góc OAC', sv(fdeg(angleAt(O, A, Cc)))], ['Góc OBA', sv(fdeg(angleAt(O, B, A)))]);
      else info.push(['Vị trí của A', 'nằm trong (hoặc trên) đường tròn: kéo A ra ngoài']);
      note = 'Nếu hai tiếp tuyến của đường tròn cắt nhau tại A thì A cách đều hai tiếp điểm và AO là tia phân giác của góc tạo bởi hai tiếp tuyến.';
      break;
    }
    case 'two': {
      const Rc = doc.R ?? 4;
      const rc = doc.r ?? 2.5;
      const dc = doc.d ?? 5;
      const s = Math.min(UNIT, 640 / (Rc + rc + dc + 1));
      const O1 = { x: 360 - (dc * s) / 2 + 40, y: O.y };
      const O2 = { x: O1.x + dc * s, y: O.y };
      const e = 0.05;
      const kind =
        dc < e ? (Math.abs(Rc - rc) < e ? 'trùng nhau' : 'đồng tâm (đựng nhau)') : dc > Rc + rc + e ? 'ở ngoài nhau (không giao nhau)' : Math.abs(dc - (Rc + rc)) <= e ? 'tiếp xúc ngoài' : dc > Math.abs(Rc - rc) + e ? 'cắt nhau' : Math.abs(dc - Math.abs(Rc - rc)) <= e ? 'tiếp xúc trong' : 'đựng nhau (không giao nhau)';
      pic = (
        <g>
          <circle cx={O1.x} cy={O1.y} r={Rc * s} fill={C.soft[0]} stroke={C.a} strokeWidth={4} />
          <circle cx={O2.x} cy={O2.y} r={rc * s} fill={C.soft[1]} stroke={C.b} strokeWidth={4} />
          <Line a={O1} b={O2} color="var(--ink-2)" w={2} dash="6 5" />
          <Pt p={O1} label="O" dy={28} />
          <Pt p={O2} label="O′" dy={28} />
        </g>
      );
      info.push(['R', `${f2(Rc, 1)} cm`], ['r', `${f2(rc, 1)} cm`], ['OO′ = d', `${f2(dc, 1)} cm`], ['R + r', sv(`${f2(Rc + rc, 1)} cm`)], ['|R − r|', sv(`${f2(Math.abs(Rc - rc), 1)} cm`)], ['Vị trí', sv(kind)]);
      note = 'So sánh d với R + r và |R − r|: d > R + r ở ngoài nhau; d = R + r tiếp xúc ngoài; |R − r| < d < R + r cắt nhau; d = |R − r| tiếp xúc trong; d < |R − r| đựng nhau.';
      break;
    }
    case 'inscribed': {
      const [a1, a2, am] = angs;
      const A = onC(a1, R);
      const B = onC(a2, R);
      const M = onC(am, R);
      const ins = angleAt(A, M, B);
      // cung AB không chứa M
      const inArc = (x: number, s: number, e: number) => ((((x - s) % 360) + 360) % 360) <= ((((e - s) % 360) + 360) % 360);
      const [s1, e1] = inArc(am, a1, a2) ? [a2, a1] : [a1, a2];
      pic = (
        <g>
          {circle}
          <path d={arcPath(R, s1, e1)} fill="none" stroke={C.b} strokeWidth={9} strokeLinecap="round" opacity={0.7} />
          <Line a={M} b={A} color={C.e} w={4} />
          <Line a={M} b={B} color={C.e} w={4} />
          <Line a={O} b={A} color={C.d} w={2} dash="6 4" />
          <Line a={O} b={B} color={C.d} w={2} dash="6 4" />
          <Arc a={A} o={M} b={B} r={34} color={C.e} label={sv(fdeg(ins))} />
          {center}
          <Pt p={A} label="A" {...labelOff(A, O, 28)} onDown={dragAng(0)} />
          <Pt p={B} label="B" {...labelOff(B, O, 28)} onDown={dragAng(1)} />
          <Pt p={M} label="M" {...labelOff(M, O, 28)} color={C.e} onDown={dragAng(2)} />
        </g>
      );
      info.push(['Góc nội tiếp AMB', sv(fdeg(ins))], ['Số đo cung AB bị chắn', sv(fdeg(2 * ins))], ['Góc ở tâm chắn cung đó', sv(fdeg(Math.min(2 * ins, 360)))]);
      note = 'Số đo của góc nội tiếp bằng nửa số đo của cung bị chắn. Các góc nội tiếp cùng chắn một cung thì bằng nhau; góc nội tiếp chắn nửa đường tròn là góc vuông.';
      break;
    }
    case 'tri': {
      const tri = doc.tri ?? [{ x: 300, y: 140 }, { x: 160, y: 520 }, { x: 640, y: 500 }];
      const [A, B, Cc] = tri;
      const cc = circumcircle(A, B, Cc);
      const ic = incircle(A, B, Cc);
      const dragV = (i: number) => (e: React.PointerEvent) => start(e, (q) => onDoc({ ...doc, tri: tri.map((p, j) => (j === i ? clampP(q) : p)) }));
      const g = { x: (A.x + B.x + Cc.x) / 3, y: (A.y + B.y + Cc.y) / 3 };
      pic = (
        <g>
          {doc.outer && <circle cx={cc.c.x} cy={cc.c.y} r={cc.r} fill="none" stroke={C.b} strokeWidth={3} />}
          <Poly pts={tri} fill={C.soft[0]} stroke={C.a} w={4} />
          {doc.outer &&
            [
              [A, B],
              [B, Cc],
              [Cc, A],
            ].map(([p, q], i) => {
              const m = mid(p, q);
              return <Line key={i} a={m} b={cc.c} color={C.b} w={2} dash="6 5" />;
            })}
          {doc.inner && (
            <g>
              <circle cx={ic.c.x} cy={ic.c.y} r={ic.r} fill="none" stroke={C.c} strokeWidth={3} />
              {tri.map((p, i) => (
                <Line key={i} a={p} b={ic.c} color={C.c} w={2} dash="6 5" />
              ))}
              {[
                [A, B],
                [B, Cc],
                [Cc, A],
              ].map(([p, q], i) => (
                <Line key={`r${i}`} a={ic.c} b={project(ic.c, p, q)} color={C.c} w={2} />
              ))}
              <Pt p={ic.c} label="I" dx={18} dy={-10} />
            </g>
          )}
          {doc.outer && <Pt p={cc.c} label="O" dx={18} dy={-10} />}
          {tri.map((p, i) => (
            <Pt key={i} p={p} label={'ABC'[i]} {...labelOff(p, g, 28)} onDown={dragV(i)} />
          ))}
        </g>
      );
      const ang = [angleAt(B, A, Cc), angleAt(A, B, Cc), angleAt(A, Cc, B)];
      const kind = ang.some((x) => Math.abs(x - 90) < 0.7) ? 'vuông: tâm O là trung điểm cạnh huyền' : ang.some((x) => x > 90) ? 'tù: tâm O nằm ngoài tam giác' : 'nhọn: tâm O nằm trong tam giác';
      info.push(['Bán kính đường tròn ngoại tiếp R', sv(`${fcm(cc.r)} cm`)], ['Bán kính đường tròn nội tiếp r', sv(`${fcm(ic.r)} cm`)], ['Tam giác', sv(kind)]);
      note = 'Tâm đường tròn ngoại tiếp là giao điểm ba đường trung trực; tâm đường tròn nội tiếp là giao điểm ba đường phân giác của tam giác. Tam giác đều cạnh a: R = a√3/3, r = a√3/6.';
      break;
    }
    case 'cyclic': {
      const pts = angs.map((a) => onC(a, R));
      if (doc.free && doc.Dp) pts[3] = doc.Dp;
      const [A, B, Cc, D] = pts;
      const angA = angleAt(D, A, B);
      const angB = angleAt(A, B, Cc);
      const angC = angleAt(B, Cc, D);
      const angD = angleAt(Cc, D, A);
      pic = (
        <g>
          {circle}
          <Poly pts={pts} fill={C.soft[1]} stroke={C.b} w={4} />
          <Arc a={D} o={A} b={B} r={30} color={C.d} label={sv(fdeg(angA))} />
          <Arc a={B} o={Cc} b={D} r={30} color={C.d} label={sv(fdeg(angC))} />
          <Arc a={A} o={B} b={Cc} r={30} color={C.e} n={2} label={sv(fdeg(angB))} />
          <Arc a={Cc} o={D} b={A} r={30} color={C.e} n={2} label={sv(fdeg(angD))} />
          {center}
          {pts.map((p, i) => (
            <Pt
              key={i}
              p={p}
              label={'ABCD'[i]}
              {...labelOff(p, O, 30)}
              onDown={i === 3 && doc.free ? (e) => start(e, (q) => onDoc({ ...doc, Dp: clampP(q) })) : dragAng(i)}
            />
          ))}
        </g>
      );
      info.push(['Â + Ĉ', sv(fdeg(angA + angC))], ['B̂ + D̂', sv(fdeg(angB + angD))], ['D trên đường tròn?', sv(Math.abs(dist(O, D) - R) < 3 ? 'có' : 'không')]);
      note = 'Tứ giác nội tiếp đường tròn có tổng hai góc đối bằng 180°. Ngược lại, tứ giác có tổng hai góc đối bằng 180° thì nội tiếp được một đường tròn.';
      break;
    }
    case 'polygon': {
      const n = doc.sides ?? 6;
      const pts = Array.from({ length: n }, (_, i) => onC(90 + (360 * i) / n, R));
      const rIn = R * Math.cos(Math.PI / n);
      pic = (
        <g>
          {circle}
          {doc.inner && <circle cx={O.x} cy={O.y} r={rIn} fill="none" stroke={C.c} strokeWidth={3} strokeDasharray="8 5" />}
          <Poly pts={pts} fill={C.soft[2]} stroke={C.c} w={4} />
          <Line a={O} b={pts[0]} color={C.d} w={2} dash="6 4" />
          <Line a={O} b={pts[1]} color={C.d} w={2} dash="6 4" />
          <Arc a={pts[0]} o={O} b={pts[1]} r={36} color={C.d} label={sv(fdeg(360 / n))} right={false} />
          <Arc a={pts[n - 1]} o={pts[0]} b={pts[1]} r={30} color={C.e} label={sv(fdeg(((n - 2) * 180) / n))} right={n !== 4} />
          {center}
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={6} fill="var(--ink)" />
          ))}
        </g>
      );
      info.push(['Số cạnh n', String(n)], ['Mỗi góc trong = (n − 2)·180°/n', sv(fdeg(((n - 2) * 180) / n))], ['Góc ở tâm = 360°/n', sv(fdeg(360 / n))], ['Cạnh', sv(`${fcm(dist(pts[0], pts[1]))} cm`)], ['Phép quay giữ nguyên đa giác', sv(Array.from({ length: n }, (_, i) => `${Math.round((360 * (i + 1)) / n)}°`).join(', '))]);
      note = 'Đa giác đều là đa giác có tất cả các cạnh bằng nhau và tất cả các góc bằng nhau. Đa giác đều n cạnh nội tiếp một đường tròn; phép quay tâm O góc k·360°/n biến đa giác thành chính nó.';
      break;
    }
  }
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {pic}
          <foreignObject x={790} y={40} width={390} height={600}>
            <div className="fmap-box">
              <b>{CIRCLE_TITLE[doc.sub]}</b>
              <table className="cmp-table mini" style={{ marginTop: 10 }}>
                <tbody>
                  {info.map(([k, v]) => (
                    <tr key={k}>
                      <th style={{ textAlign: 'left', width: '58%' }}>{k}</th>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="small">{note}</p>
            </div>
          </foreignObject>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{CIRCLE_TITLE[doc.sub]}</h3>
        <p className="small">{CIRCLE_HINT[doc.sub]}</p>
        {(doc.sub === 'basic' || doc.sub === 'chord') && <Toggle value={!!doc.diam} onChange={(v) => onDoc({ ...doc, diam: v })} label={doc.sub === 'basic' ? 'Điểm M′ đối xứng với M qua O' : 'Vẽ một đường kính để so sánh'} />}
        {doc.sub === 'arc' && (
          <>
            <Toggle value={!!doc.ring} onChange={(v) => onDoc({ ...doc, ring: v })} label="Hình vành khuyên" />
            <Row label="R (cm)">
              <Slider value={doc.R ?? 5} min={1} max={8} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, R: v, r: Math.min(doc.r ?? 3, v - 0.5) })} />
            </Row>
            {doc.ring ? (
              <Row label="r (cm)">
                <Slider value={doc.r ?? 3} min={0.5} max={(doc.R ?? 5) - 0.5} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, r: v })} />
              </Row>
            ) : (
              <Row label="Số đo cung n">
                <Slider value={doc.n ?? 90} min={10} max={350} step={5} digits={0} suffix="°" onChange={(v) => onDoc({ ...doc, n: v })} />
              </Row>
            )}
          </>
        )}
        {doc.sub === 'line' && (
          <Row label="Khoảng cách d (cm)">
            <Slider value={doc.d ?? 3} min={0} max={8} step={0.25} digits={2} onChange={(v) => onDoc({ ...doc, d: v })} />
          </Row>
        )}
        {doc.sub === 'two' && (
          <>
            <Row label="R (cm)">
              <Slider value={doc.R ?? 4} min={1} max={6} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, R: v })} />
            </Row>
            <Row label="r (cm)">
              <Slider value={doc.r ?? 2.5} min={0.5} max={6} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, r: v })} />
            </Row>
            <Row label="Khoảng cách OO′ (cm)">
              <Slider value={doc.d ?? 5} min={0} max={12} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, d: v })} />
            </Row>
          </>
        )}
        {doc.sub === 'tri' && (
          <>
            <Toggle value={!!doc.outer} onChange={(v) => onDoc({ ...doc, outer: v })} label="Đường tròn ngoại tiếp (đường trung trực)" />
            <Toggle value={!!doc.inner} onChange={(v) => onDoc({ ...doc, inner: v })} label="Đường tròn nội tiếp (đường phân giác)" />
          </>
        )}
        {doc.sub === 'cyclic' && <Toggle value={!!doc.free} onChange={(v) => onDoc({ ...doc, free: v, Dp: onC(angs[3] ?? 250, R) })} label="Cho D di chuyển tự do (ra ngoài đường tròn)" />}
        {doc.sub === 'polygon' && (
          <>
            <Row label="Số cạnh n">
              <Slider value={doc.sides ?? 6} min={3} max={12} step={1} digits={0} onChange={(v) => onDoc({ ...doc, sides: v })} />
            </Row>
            <Toggle value={!!doc.inner} onChange={(v) => onDoc({ ...doc, inner: v })} label="Đường tròn nội tiếp đa giác" />
          </>
        )}
      </aside>
    </div>
  );
}

const CIRCLE_HINT: Record<CircleSub, string> = {
  basic: 'Kéo điểm M; so sánh OM với bán kính R.',
  chord: 'Kéo A, B trên đường tròn. Quan sát dây AB, khoảng cách OH và cung bị căng.',
  arc: 'Đổi số đo cung n và bán kính R.',
  line: 'Kéo thanh trượt để đổi khoảng cách d từ tâm O đến đường thẳng a.',
  tangents: 'Kéo điểm A ở ngoài đường tròn; quan sát hai tiếp tuyến AB, AC.',
  two: 'Đổi bán kính và khoảng cách giữa hai tâm.',
  inscribed: 'Kéo M trên đường tròn: góc AMB thay đổi thế nào? Kéo A, B để đổi cung bị chắn.',
  tri: 'Kéo các đỉnh tam giác; bật đường tròn ngoại tiếp, nội tiếp.',
  cyclic: 'Kéo các đỉnh trên đường tròn; so sánh tổng hai góc đối.',
  polygon: 'Đổi số cạnh n của đa giác đều nội tiếp.',
};

// =====================================================================
// Hàm số y = ax², phương trình bậc hai
// =====================================================================

export interface ParabolaDoc {
  mode: 'parabola';
  sub: 'ax2' | 'quad';
  a: number;
  b?: number;
  c?: number;
  a2?: number;
  viete?: boolean;
}

export function quadRoots(a: number, b: number, c: number): number[] {
  const D = b * b - 4 * a * c;
  if (D < -1e-12) return [];
  if (Math.abs(D) <= 1e-12) return [-b / (2 * a)];
  const s = Math.sqrt(D);
  return [(-b - s) / (2 * a), (-b + s) / (2 * a)].sort((p, q) => p - q);
}

export function ParabolaView({ doc, onDoc, showValues }: EngineProps<ParabolaDoc, unknown>) {
  const a = doc.a;
  if (doc.sub === 'ax2') {
    const ax = mkAxes(-4, 4, -10, 10, { x: 40, y: 30, w: 620, h: 620 });
    const xs = [-3, -2, -1, 0, 1, 2, 3];
    return (
      <div className="eng">
        <div className="eng-stage lab-bg">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
            <Grid ax={ax} step={1} stepY={1} labelStepY={2} />
            {doc.a2 !== undefined && <Curve ax={ax} f={(x) => (doc.a2 ?? 1) * x * x} color={C.b} w={3} dash="10 6" />}
            <Curve ax={ax} f={(x) => a * x * x} color={C.a} w={5} />
            {xs.map((x) => {
              const y = a * x * x;
              if (Math.abs(y) > 10) return null;
              return <circle key={x} cx={ax.X(x)} cy={ax.Y(y)} r={7} fill={showValues ? C.d : 'transparent'} stroke={C.d} strokeWidth={2} />;
            })}
            {showValues && Math.abs(a * 4) <= 10 && <line x1={ax.X(-2)} x2={ax.X(2)} y1={ax.Y(a * 4)} y2={ax.Y(a * 4)} stroke={C.d} strokeDasharray="6 5" strokeWidth={2} />}
            <g transform="translate(700 40)">
              <rect width={470} height={600} rx={20} fill="var(--surface)" stroke="var(--line)" />
              <text x={235} y={60} textAnchor="middle" fontSize={34} fontWeight={800} fill={C.a} className="math-text">
                y = {fmtNum(a)}x²
              </text>
              {doc.a2 !== undefined && (
                <text x={235} y={105} textAnchor="middle" fontSize={28} fontWeight={800} fill={C.b} className="math-text">
                  y = {fmtNum(doc.a2)}x²
                </text>
              )}
              <foreignObject x={20} y={130} width={430} height={450}>
                <div>
                  <table className="cmp-table mini">
                    <tbody>
                      <tr>
                        <th>x</th>
                        {xs.map((x) => (
                          <td key={x}>{fmtNum(x)}</td>
                        ))}
                      </tr>
                      <tr>
                        <th>y</th>
                        {xs.map((x) => (
                          <td key={x}>{showValues ? fmtNum(a * x * x) : '?'}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                  <p className="fmap-box" style={{ marginTop: 14 }}>
                    {showValues
                      ? a > 0
                        ? 'a > 0: parabol nằm phía trên trục hoành, O là điểm thấp nhất.'
                        : 'a < 0: parabol nằm phía dưới trục hoành, O là điểm cao nhất.'
                      : 'Đồ thị nằm phía nào của trục hoành?'}
                  </p>
                  <p className="fmap-box small">Đồ thị của hàm số y = ax² (a ≠ 0) là một parabol đỉnh O, nhận trục Oy làm trục đối xứng.</p>
                </div>
              </foreignObject>
            </g>
          </svg>
        </div>
        <aside className="eng-side">
          <h3>Hàm số y = ax²</h3>
          <Row label="a">
            <Slider value={a} min={-3} max={3} step={0.25} digits={2} onChange={(v) => onDoc({ ...doc, a: v === 0 ? 0.25 : v })} />
          </Row>
          <Toggle value={doc.a2 !== undefined} onChange={(v) => onDoc({ ...doc, a2: v ? -a : undefined })} label="Thêm parabol thứ hai để so sánh" />
          {doc.a2 !== undefined && (
            <Row label="a′">
              <Slider value={doc.a2} min={-3} max={3} step={0.25} digits={2} onChange={(v) => onDoc({ ...doc, a2: v === 0 ? 0.25 : v })} />
            </Row>
          )}
        </aside>
      </div>
    );
  }
  const b = doc.b ?? 0;
  const c = doc.c ?? 0;
  const D = b * b - 4 * a * c;
  const roots = quadRoots(a, b, c);
  const ax = mkAxes(-6, 6, -10, 10, { x: 40, y: 30, w: 620, h: 620 });
  const tStr = (k: number, s: string, first: boolean) => (k === 0 ? '' : `${first ? (k < 0 ? '−' : '') : k < 0 ? ' − ' : ' + '}${Math.abs(k) === 1 && s ? '' : fmtNum(Math.abs(k))}${s}`);
  const eq = `${tStr(a, 'x²', true)}${tStr(b, 'x', false)}${tStr(c, '', false)} = 0`;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <Grid ax={ax} step={1} stepY={1} labelStepY={2} />
          <Curve ax={ax} f={(x) => a * x * x + b * x + c} color={C.a} w={5} />
          {showValues &&
            roots.map((r) =>
              Math.abs(r) <= 6 ? (
                <g key={r}>
                  <circle cx={ax.X(r)} cy={ax.Y(0)} r={10} fill={C.b} stroke="#fff" strokeWidth={3} />
                  <text x={ax.X(r)} y={ax.Y(0) + 34} textAnchor="middle" fontSize={20} fontWeight={800} fill={C.b} stroke="var(--board)" strokeWidth={4} paintOrder="stroke">
                    {dec(r, 2)}
                  </text>
                </g>
              ) : null,
            )}
          <g transform="translate(700 40)">
            <rect width={470} height={600} rx={20} fill="var(--surface)" stroke="var(--line)" />
            <text x={235} y={60} textAnchor="middle" fontSize={32} fontWeight={800} fill={C.a} className="math-text">
              {eq}
            </text>
            <foreignObject x={20} y={90} width={430} height={500}>
              <div className="fmap-box">
                <p>
                  a = {fmtNum(a)}, b = {fmtNum(b)}, c = {fmtNum(c)}
                </p>
                <p className="math-side">
                  Δ = b² − 4ac = {showValues ? `${fmtNum(b * b)} − ${fmtNum(4 * a * c)} = ${fmtNum(D)}` : '?'}
                </p>
                <p style={{ fontWeight: 800, color: C.b }}>
                  {!showValues
                    ? 'Phương trình có bao nhiêu nghiệm?'
                    : D > 0
                      ? `Δ > 0: hai nghiệm phân biệt x₁ = ${dec(roots[0], 3)}; x₂ = ${dec(roots[1], 3)}`
                      : D === 0
                        ? `Δ = 0: nghiệm kép x₁ = x₂ = ${dec(roots[0], 3)}`
                        : 'Δ < 0: phương trình vô nghiệm'}
                </p>
                <p className="small">Nghiệm của phương trình là hoành độ giao điểm của đồ thị y = ax² + bx + c với trục Ox.</p>
                {doc.viete && (
                  <div>
                    <p style={{ fontWeight: 800, color: C.e }}>Định lí Viète</p>
                    <p className="math-side">
                      x₁ + x₂ = −b/a = {showValues ? dec(-b / a, 3) : '?'}
                      {showValues && roots.length ? `  (kiểm tra: ${dec(roots.length === 2 ? roots[0] + roots[1] : 2 * roots[0], 3)})` : ''}
                    </p>
                    <p className="math-side">
                      x₁ · x₂ = c/a = {showValues ? dec(c / a, 3) : '?'}
                      {showValues && roots.length ? `  (kiểm tra: ${dec(roots.length === 2 ? roots[0] * roots[1] : roots[0] * roots[0], 3)})` : ''}
                    </p>
                    {showValues && Math.abs(a + b + c) < 1e-9 && <p className="small">a + b + c = 0 nên x₁ = 1, x₂ = c/a.</p>}
                    {showValues && Math.abs(a - b + c) < 1e-9 && <p className="small">a − b + c = 0 nên x₁ = −1, x₂ = −c/a.</p>}
                  </div>
                )}
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Phương trình bậc hai</h3>
        <Row label="a">
          <Slider value={a} min={-3} max={3} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, a: v === 0 ? 0.5 : v })} />
        </Row>
        <Row label="b">
          <Slider value={b} min={-8} max={8} step={1} digits={0} onChange={(v) => onDoc({ ...doc, b: v })} />
        </Row>
        <Row label="c">
          <Slider value={c} min={-10} max={10} step={1} digits={0} onChange={(v) => onDoc({ ...doc, c: v })} />
        </Row>
        <Toggle value={!!doc.viete} onChange={(v) => onDoc({ ...doc, viete: v })} label="Định lí Viète (tổng và tích hai nghiệm)" />
        <p className="small muted">Δ &gt; 0: parabol cắt trục hoành tại hai điểm; Δ = 0: tiếp xúc; Δ &lt; 0: không cắt.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Hình trụ, hình nón, hình cầu
// =====================================================================

export interface RoundDoc {
  mode: 'round';
  kind: 'cyl' | 'cone' | 'sphere';
  kinds?: ('cyl' | 'cone' | 'sphere')[];
  r: number;
  h: number;
  unfold?: boolean;
  /** hình cầu đặt trong hình trụ (so sánh của Archimedes) */
  arch?: boolean;
}

export function roundMetrics(kind: RoundDoc['kind'], r: number, h: number) {
  const pi = Math.PI;
  if (kind === 'cyl') return { Sxq: 2 * pi * r * h, Stp: 2 * pi * r * h + 2 * pi * r * r, V: pi * r * r * h, l: 0 };
  if (kind === 'cone') {
    const l = Math.hypot(r, h);
    return { Sxq: pi * r * l, Stp: pi * r * l + pi * r * r, V: (pi * r * r * h) / 3, l };
  }
  return { Sxq: 4 * pi * r * r, Stp: 4 * pi * r * r, V: (4 / 3) * pi * r ** 3, l: 0 };
}

export function RoundView({ doc, onDoc, showValues }: EngineProps<RoundDoc, unknown>) {
  const { kind, r, h } = doc;
  const M = roundMetrics(kind, r, h);
  const s = Math.min(46, 240 / Math.max(r, 1), 380 / Math.max(kind === 'sphere' ? 2 * r : h, 1));
  const cx = doc.unfold ? 210 : 330;
  const by = 560;
  const rx = r * s;
  const ry = rx * 0.32;
  const H = (kind === 'sphere' ? 2 * r : h) * s;
  const ellBack = (y: number) => `M ${cx - rx} ${y} A ${rx} ${ry} 0 0 1 ${cx + rx} ${y}`;
  const ellFront = (y: number) => `M ${cx - rx} ${y} A ${rx} ${ry} 0 0 0 ${cx + rx} ${y}`;
  let pic: React.ReactNode;
  if (kind === 'cyl') {
    pic = (
      <g>
        <rect x={cx - rx} y={by - H} width={2 * rx} height={H} fill={C.soft[0]} />
        <ellipse cx={cx} cy={by - H} rx={rx} ry={ry} fill="#bfdbfe" stroke={C.a} strokeWidth={3} />
        <path d={ellBack(by)} fill="none" stroke={C.a} strokeWidth={2} strokeDasharray="7 6" />
        <path d={ellFront(by)} fill="none" stroke={C.a} strokeWidth={3} />
        <line x1={cx - rx} x2={cx - rx} y1={by} y2={by - H} stroke={C.a} strokeWidth={3} />
        <line x1={cx + rx} x2={cx + rx} y1={by} y2={by - H} stroke={C.a} strokeWidth={3} />
        <line x1={cx} x2={cx + rx} y1={by} y2={by} stroke={C.b} strokeWidth={3} />
        <line x1={cx} x2={cx} y1={by} y2={by - H} stroke={C.c} strokeWidth={3} strokeDasharray="8 5" />
        <text x={cx + rx / 2} y={by - 8} textAnchor="middle" fontSize={20} fontWeight={800} fill={C.b}>
          r
        </text>
        <text x={cx + 10} y={by - H / 2} fontSize={20} fontWeight={800} fill={C.c}>
          h
        </text>
      </g>
    );
  } else if (kind === 'cone') {
    pic = (
      <g>
        <path d={`M ${cx - rx} ${by} L ${cx} ${by - H} L ${cx + rx} ${by} A ${rx} ${ry} 0 0 1 ${cx - rx} ${by} Z`} fill={C.soft[3]} />
        <path d={ellBack(by)} fill="none" stroke={C.d} strokeWidth={2} strokeDasharray="7 6" />
        <path d={ellFront(by)} fill="none" stroke={C.d} strokeWidth={3} />
        <line x1={cx - rx} x2={cx} y1={by} y2={by - H} stroke={C.d} strokeWidth={3} />
        <line x1={cx + rx} x2={cx} y1={by} y2={by - H} stroke={C.d} strokeWidth={3} />
        <line x1={cx} x2={cx + rx} y1={by} y2={by} stroke={C.b} strokeWidth={3} />
        <line x1={cx} x2={cx} y1={by} y2={by - H} stroke={C.c} strokeWidth={3} strokeDasharray="8 5" />
        <text x={cx + rx / 2} y={by - 8} textAnchor="middle" fontSize={20} fontWeight={800} fill={C.b}>
          r
        </text>
        <text x={cx + 10} y={by - H / 2} fontSize={20} fontWeight={800} fill={C.c}>
          h
        </text>
        <text x={cx + rx / 2 + 16} y={by - H / 2} fontSize={20} fontWeight={800} fill={C.e}>
          l
        </text>
      </g>
    );
  } else {
    const cy = by - H / 2;
    pic = (
      <g>
        {doc.arch && (
          <g>
            <rect x={cx - rx} y={by - H} width={2 * rx} height={H} fill="none" stroke={C.a} strokeWidth={2.5} />
            <ellipse cx={cx} cy={by - H} rx={rx} ry={ry} fill="none" stroke={C.a} strokeWidth={2.5} />
            <path d={ellFront(by)} fill="none" stroke={C.a} strokeWidth={2.5} />
          </g>
        )}
        <circle cx={cx} cy={cy} r={rx} fill="url(#sph)" stroke={C.e} strokeWidth={3} />
        <defs>
          <radialGradient id="sph" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#ede9fe" />
            <stop offset="100%" stopColor="#a78bfa" />
          </radialGradient>
        </defs>
        <path d={`M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy}`} fill="none" stroke={C.e} strokeWidth={2} />
        <path d={`M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`} fill="none" stroke={C.e} strokeWidth={2} strokeDasharray="6 5" />
        <line x1={cx} x2={cx + rx} y1={cy} y2={cy} stroke={C.b} strokeWidth={3} />
        <circle cx={cx} cy={cy} r={5} fill="var(--ink)" />
        <text x={cx + rx / 2} y={cy - 8} textAnchor="middle" fontSize={20} fontWeight={800} fill={C.b}>
          R
        </text>
      </g>
    );
  }
  // hình khai triển
  let net: React.ReactNode = null;
  if (doc.unfold && kind !== 'sphere') {
    const ns = Math.min(s, kind === 'cyl' ? Math.min(380 / (2 * Math.PI * r), 560 / (h + 4 * r)) : 200 / Math.max(M.l, 1));
    if (kind === 'cyl') {
      const W = 2 * Math.PI * r * ns;
      const HH = h * ns;
      const x0 = 420;
      const y0 = 340 - HH / 2;
      net = (
        <g>
          <rect x={x0} y={y0} width={W} height={HH} fill={C.soft[0]} stroke={C.a} strokeWidth={3} />
          <circle cx={x0 + W / 2} cy={y0 - r * ns} r={r * ns} fill="#bfdbfe" stroke={C.a} strokeWidth={3} />
          <circle cx={x0 + W / 2} cy={y0 + HH + r * ns} r={r * ns} fill="#bfdbfe" stroke={C.a} strokeWidth={3} />
          <text x={x0 + W / 2} y={y0 + HH / 2 + 8} textAnchor="middle" fontSize={18} fontWeight={800} fill={C.a}>
            2πr × h
          </text>
        </g>
      );
    } else {
      const L = M.l * ns;
      const ang = (360 * r) / M.l;
      const c0 = { x: 640, y: 120 };
      const a0 = 90 + ang / 2;
      const a1 = 90 - ang / 2;
      const p0 = { x: c0.x + L * Math.cos((a0 * Math.PI) / 180), y: c0.y + L * Math.sin((a0 * Math.PI) / 180) };
      const p1 = { x: c0.x + L * Math.cos((a1 * Math.PI) / 180), y: c0.y + L * Math.sin((a1 * Math.PI) / 180) };
      net = (
        <g>
          <path d={`M ${c0.x} ${c0.y} L ${p0.x} ${p0.y} A ${L} ${L} 0 ${ang > 180 ? 1 : 0} 0 ${p1.x} ${p1.y} Z`} fill={C.soft[3]} stroke={C.d} strokeWidth={3} />
          <circle cx={c0.x} cy={c0.y + L + r * ns + 6} r={r * ns} fill={C.soft[3]} stroke={C.d} strokeWidth={3} />
          <text x={c0.x} y={c0.y + L * 0.55} textAnchor="middle" fontSize={18} fontWeight={800} fill={C.d}>
            quạt bán kính l, {showValues ? `${Math.round(ang)}°` : '?°'}
          </text>
        </g>
      );
    }
  }
  const name = kind === 'cyl' ? 'Hình trụ' : kind === 'cone' ? 'Hình nón' : 'Hình cầu';
  const val = (x: number, u: string) => (showValues ? `${f2(x, 2)} ${u}` : '?');
  const rows: [string, string, string][] =
    kind === 'sphere'
      ? [
          ['Bán kính R', `${f2(r, 1)} cm`, C.b],
          ['Diện tích mặt cầu S = 4πR²', val(M.Sxq, 'cm²'), C.d],
          ['Thể tích V = 4/3·πR³', val(M.V, 'cm³'), C.c],
          ...(doc.arch ? ([['V hình trụ ngoại tiếp = 2πR³', val(2 * Math.PI * r ** 3, 'cm³'), C.a], ['Tỉ số V cầu / V trụ', showValues ? '2/3' : '?', C.e]] as [string, string, string][]) : []),
        ]
      : [
          ['Bán kính đáy r', `${f2(r, 1)} cm`, C.b],
          ['Chiều cao h', `${f2(h, 1)} cm`, C.c],
          ...(kind === 'cone' ? ([['Đường sinh l = √(r² + h²)', val(M.l, 'cm'), C.e]] as [string, string, string][]) : []),
          [kind === 'cyl' ? 'Sxq = 2πrh' : 'Sxq = πrl', val(M.Sxq, 'cm²'), C.d],
          ['Stp', val(M.Stp, 'cm²'), C.d],
          [kind === 'cyl' ? 'V = πr²h' : 'V = ⅓πr²h', val(M.V, 'cm³'), C.a],
        ];
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <text x={330} y={44} textAnchor="middle" className="lab-label">
            {name}
          </text>
          {pic}
          {net}
          <g transform="translate(830 70)">
            <rect width={340} height={540} rx={20} fill="var(--surface)" stroke="var(--line)" />
            {rows.map(([k, v, col], i) => (
              <g key={k} transform={`translate(20 ${50 + i * 74})`}>
                <text fontSize={17} fontWeight={800} fill="var(--muted)">
                  {k}
                </text>
                <text x={300} y={34} textAnchor="end" fontSize={24} fontWeight={900} fill={col}>
                  {v}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{name}</h3>
        {doc.kinds && doc.kinds.length > 1 && (
          <Row label="Hình">
            <Seg value={kind} options={doc.kinds} onChange={(k) => onDoc({ ...doc, kind: k })} fmtOpt={(k) => (k === 'cyl' ? 'Trụ' : k === 'cone' ? 'Nón' : 'Cầu')} />
          </Row>
        )}
        <Row label={kind === 'sphere' ? 'Bán kính R (cm)' : 'Bán kính đáy r (cm)'}>
          <Slider value={r} min={1} max={6} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, r: v })} />
        </Row>
        {kind !== 'sphere' && (
          <Row label="Chiều cao h (cm)">
            <Slider value={h} min={1} max={10} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, h: v })} />
          </Row>
        )}
        {kind !== 'sphere' ? (
          <Toggle value={!!doc.unfold} onChange={(v) => onDoc({ ...doc, unfold: v })} label="Hình khai triển" />
        ) : (
          <Toggle value={!!doc.arch} onChange={(v) => onDoc({ ...doc, arch: v })} label="Đặt hình cầu vào hình trụ vừa khít" />
        )}
        <p className="small muted">
          {kind === 'cyl'
            ? 'Quay hình chữ nhật một vòng quanh một cạnh cố định ta được hình trụ.'
            : kind === 'cone'
              ? 'Quay tam giác vuông một vòng quanh một cạnh góc vuông cố định ta được hình nón.'
              : 'Quay nửa hình tròn một vòng quanh đường kính cố định ta được hình cầu.'}
        </p>
      </aside>
    </div>
  );
}
