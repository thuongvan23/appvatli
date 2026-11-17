// Hàm số Toán 8 (Chương VII): khái niệm hàm số (sơ đồ mũi tên, bảng), mặt phẳng toạ độ,
// đồ thị hàm số, hàm số bậc nhất y = ax + b, hệ số góc, vị trí tương đối của hai đường thẳng.
import { useRef } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, Toggle, useSvgDrag } from '../../ui/controls';
import { Arc, C, Curve, Grid, MiniTable, VH, VW, mkAxes } from './mcommon';
import { dec, fmtNum } from './poly';
import { FMAPS, FUNCS, LIN_CTX } from './mathData';

// =====================================================================
// Khái niệm hàm số: sơ đồ mũi tên / bảng giá trị
// =====================================================================

export interface FmapDoc {
  mode: 'fmap';
  list: string[];
  sel: string;
}

export function FmapView({ doc, onDoc, showValues }: EngineProps<FmapDoc, unknown>) {
  const m = FMAPS[doc.sel];
  const n1 = m.xs.length;
  const n2 = m.ys.length;
  const yA = (i: number, n: number) => 340 - ((n - 1) * 70) / 2 + i * 70;
  const xA = 260;
  const xB = 700;
  const counts = m.xs.map((_, i) => m.pairs.filter(([a]) => a === i).length);
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <text x={600} y={40} textAnchor="middle" className="lab-label">
            {m.title}
          </text>
          {m.table ? (
            <g>
              {[m.xName, m.yName].map((nm, r) => (
                <g key={r}>
                  <rect x={80} y={220 + r * 90} width={200} height={90} fill="var(--surface-2)" stroke="var(--ink)" strokeWidth={2} />
                  <text x={180} y={275 + r * 90} textAnchor="middle" fontSize={26} fontWeight={800} fill="var(--ink)" className="math-text">
                    {nm}
                  </text>
                </g>
              ))}
              {m.xs.map((x, i) => {
                const w = 820 / n1;
                const ys = m.pairs.filter(([a]) => a === i).map(([, b]) => m.ys[b]);
                return (
                  <g key={i}>
                    <rect x={280 + i * w} y={220} width={w} height={90} fill="var(--surface)" stroke="var(--ink)" strokeWidth={2} />
                    <text x={280 + i * w + w / 2} y={275} textAnchor="middle" fontSize={28} fontWeight={800} fill={C.a} className="math-text">
                      {x}
                    </text>
                    <rect x={280 + i * w} y={310} width={w} height={90} fill="var(--surface)" stroke="var(--ink)" strokeWidth={2} />
                    <text x={280 + i * w + w / 2} y={365} textAnchor="middle" fontSize={ys.length > 1 ? 22 : 28} fontWeight={800} fill={C.b} className="math-text">
                      {ys.join('; ')}
                    </text>
                  </g>
                );
              })}
            </g>
          ) : (
            <g>
              <ellipse cx={xA} cy={340} rx={130} ry={Math.max(140, n1 * 42)} fill={C.soft[0]} stroke={C.a} strokeWidth={3} />
              <ellipse cx={xB} cy={340} rx={130} ry={Math.max(140, n2 * 42)} fill={C.soft[1]} stroke={C.b} strokeWidth={3} />
              <text x={xA} y={340 - Math.max(140, n1 * 42) - 16} textAnchor="middle" fontSize={22} fontWeight={800} fill={C.a}>
                {m.xName}
              </text>
              <text x={xB} y={340 - Math.max(140, n2 * 42) - 16} textAnchor="middle" fontSize={22} fontWeight={800} fill={C.b}>
                {m.yName}
              </text>
              {m.pairs.map(([a, b], k) => {
                const y1 = yA(a, n1);
                const y2 = yA(b, n2);
                const bad = showValues && counts[a] !== 1;
                const x1 = xA + 50;
                const x2 = xB - 56;
                const ang = Math.atan2(y2 - y1, x2 - x1);
                return (
                  <g key={k}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={bad ? C.b : 'var(--ink)'} strokeWidth={bad ? 4 : 2.5} />
                    <path d={`M ${x2} ${y2} l ${-16 * Math.cos(ang) + 7 * Math.sin(ang)} ${-16 * Math.sin(ang) - 7 * Math.cos(ang)} l ${-14 * Math.sin(ang)} ${14 * Math.cos(ang)} Z`} fill={bad ? C.b : 'var(--ink)'} />
                  </g>
                );
              })}
              {m.xs.map((x, i) => (
                <g key={i}>
                  <circle cx={xA} cy={yA(i, n1)} r={26} fill="var(--surface)" stroke={showValues && counts[i] !== 1 ? C.b : C.a} strokeWidth={3} />
                  <text x={xA} y={yA(i, n1) + 8} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--ink)" className="math-text">
                    {x}
                  </text>
                </g>
              ))}
              {m.ys.map((y, i) => (
                <g key={i}>
                  <circle cx={xB} cy={yA(i, n2)} r={26} fill="var(--surface)" stroke={C.b} strokeWidth={3} />
                  <text x={xB} y={yA(i, n2) + 8} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--ink)" className="math-text">
                    {y}
                  </text>
                </g>
              ))}
            </g>
          )}
          <rect x={m.table ? 80 : 880} y={m.table ? 460 : 150} width={m.table ? 1020 : 290} height={m.table ? 160 : 380} rx={18} fill="var(--surface)" stroke="var(--line)" />
          <foreignObject x={m.table ? 100 : 896} y={m.table ? 474 : 166} width={m.table ? 980 : 258} height={m.table ? 140 : 350}>
            <div className="fmap-box">
              <b>{m.yName} có phải là hàm số của {m.xName} không?</b>
              <p style={{ color: showValues ? (m.isFunc ? C.c : C.b) : 'var(--muted)', fontWeight: 800, fontSize: 22 }}>{showValues ? (m.isFunc ? 'Có – là hàm số' : 'Không – không phải hàm số') : '?'}</p>
              {showValues && <p>{m.why}</p>}
            </div>
          </foreignObject>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Khái niệm hàm số</h3>
        <Row label="Chọn ví dụ">
          <Seg value={doc.sel} options={doc.list} onChange={(v) => onDoc({ ...doc, sel: v })} fmtOpt={(k) => FMAPS[k].label} />
        </Row>
        <p className="small">
          Đại lượng y là <b>hàm số</b> của đại lượng x nếu mỗi giá trị của x xác định được <b>chỉ một</b> giá trị tương ứng của y.
        </p>
        <p className="small muted">Khi hiện số đo, giá trị x có nhiều hơn một (hoặc không có) giá trị y tương ứng sẽ được tô đỏ.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Mặt phẳng toạ độ: đọc / biểu diễn điểm, đồ thị hàm số là tập hợp điểm
// =====================================================================

export interface PlaneDoc {
  mode: 'plane';
  pts: { x: number; y: number; label: string }[];
  /** 'read': đọc toạ độ điểm đã cho; 'plot': kéo điểm tới toạ độ yêu cầu */
  task: 'read' | 'plot' | 'free';
  targets?: [number, number][];
  /** Vẽ các điểm (x; f(x)) của một hàm số trong FUNCS */
  fn?: string;
  xs?: number[];
  curve?: boolean;
  quadrants?: boolean;
  range?: number;
}

export function PlaneView({ doc, onDoc, showValues }: EngineProps<PlaneDoc, unknown>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const R = doc.range ?? 6;
  const ax = mkAxes(-R, R, -R, R, { x: 40, y: 30, w: 620, h: 620 });
  const F = doc.fn ? FUNCS[doc.fn] : null;
  const fxs = doc.xs ?? [];
  const hit = (i: number) => doc.targets && doc.targets[i] && Math.abs(doc.pts[i].x - doc.targets[i][0]) < 1e-9 && Math.abs(doc.pts[i].y - doc.targets[i][1]) < 1e-9;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <Grid ax={ax} />
          {doc.quadrants &&
            [
              ['I', 1, 1],
              ['II', -1, 1],
              ['III', -1, -1],
              ['IV', 1, -1],
            ].map(([n, sx, sy]) => (
              <text key={n as string} x={ax.X((sx as number) * R * 0.6)} y={ax.Y((sy as number) * R * 0.6) + 14} textAnchor="middle" fontSize={44} fontWeight={900} fill={C.e} opacity={0.35}>
                {`Góc ${n}`}
              </text>
            ))}
          {F && doc.curve && <Curve ax={ax} f={F.f} color={C.c} w={4} />}
          {F &&
            fxs.map((x) => {
              const y = F.f(x);
              if (!Number.isFinite(y) || Math.abs(y) > R) return null;
              return (
                <g key={x}>
                  {showValues && <line x1={ax.X(x)} x2={ax.X(x)} y1={ax.Y(0)} y2={ax.Y(y)} stroke={C.c} strokeDasharray="4 4" strokeWidth={1.5} />}
                  {showValues && <line x1={ax.X(0)} x2={ax.X(x)} y1={ax.Y(y)} y2={ax.Y(y)} stroke={C.c} strokeDasharray="4 4" strokeWidth={1.5} />}
                  <circle cx={ax.X(x)} cy={ax.Y(y)} r={8} fill={showValues ? C.c : 'transparent'} stroke={C.c} strokeWidth={2} />
                </g>
              );
            })}
          {doc.pts.map((p, i) => {
            const ok = hit(i);
            return (
              <g key={i}>
                {showValues && (
                  <g>
                    <line x1={ax.X(p.x)} x2={ax.X(p.x)} y1={ax.Y(0)} y2={ax.Y(p.y)} stroke={C.a} strokeDasharray="5 5" strokeWidth={2} />
                    <line x1={ax.X(0)} x2={ax.X(p.x)} y1={ax.Y(p.y)} y2={ax.Y(p.y)} stroke={C.a} strokeDasharray="5 5" strokeWidth={2} />
                  </g>
                )}
                <g
                  className={doc.task !== 'read' ? 'draggable' : ''}
                  onPointerDown={
                    doc.task !== 'read'
                      ? (e) =>
                          start(e, (q) => {
                            const x = Math.round(ax.ix(q.x) * 2) / 2;
                            const y = Math.round(ax.iy(q.y) * 2) / 2;
                            const pts = doc.pts.map((pp, j) => (j === i ? { ...pp, x: Math.max(-R, Math.min(R, x)), y: Math.max(-R, Math.min(R, y)) } : pp));
                            onDoc({ ...doc, pts });
                          })
                      : undefined
                  }
                >
                  <circle cx={ax.X(p.x)} cy={ax.Y(p.y)} r={22} fill="transparent" />
                  <circle cx={ax.X(p.x)} cy={ax.Y(p.y)} r={10} fill={ok ? C.c : C.a} stroke="#fff" strokeWidth={3} />
                </g>
                <text x={ax.X(p.x) + 14} y={ax.Y(p.y) - 14} fontSize={22} fontWeight={800} fill="var(--ink)" stroke="var(--board)" strokeWidth={4} paintOrder="stroke" className="math-text">
                  {p.label}
                  {showValues || doc.task === 'free' ? `(${fmtNum(p.x)}; ${fmtNum(p.y)})` : ''}
                </text>
              </g>
            );
          })}
          <g transform="translate(700 40)">
            <rect x={0} y={0} width={470} height={600} rx={20} fill="var(--surface)" stroke="var(--line)" />
            {F ? (
              <g>
                <text x={235} y={50} textAnchor="middle" fontSize={26} fontWeight={800} fill={C.c} className="math-text">
                  {F.label}
                </text>
                <foreignObject x={20} y={80} width={430} height={500}>
                  <table className="cmp-table mini">
                    <tbody>
                      <tr>
                        <th>x</th>
                        {fxs.map((x) => (
                          <td key={x}>{fmtNum(x)}</td>
                        ))}
                      </tr>
                      <tr>
                        <th>y</th>
                        {fxs.map((x) => (
                          <td key={x}>{showValues ? fmtNum(F.f(x)) : '?'}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                  <p className="small" style={{ marginTop: 16, fontWeight: 600 }}>
                    Đồ thị của hàm số y = f(x) là tập hợp tất cả các điểm (x; f(x)) trên mặt phẳng toạ độ.
                  </p>
                </foreignObject>
              </g>
            ) : (
              <foreignObject x={20} y={20} width={430} height={560}>
                <div className="fmap-box">
                  <b>{doc.task === 'plot' ? 'Kéo các điểm tới đúng toạ độ:' : doc.task === 'read' ? 'Đọc toạ độ các điểm:' : 'Kéo các điểm trên mặt phẳng toạ độ'}</b>
                  <ul className="coord-list">
                    {doc.pts.map((p, i) => (
                      <li key={i} className={hit(i) ? 'ok' : ''}>
                        {p.label}
                        {doc.task === 'plot' && doc.targets ? `(${fmtNum(doc.targets[i][0])}; ${fmtNum(doc.targets[i][1])})` : showValues ? `(${fmtNum(p.x)}; ${fmtNum(p.y)})` : '(?; ?)'}
                        {hit(i) ? ' ✓' : ''}
                      </li>
                    ))}
                  </ul>
                  <p className="small">Điểm M(x₀; y₀): x₀ là hoành độ, y₀ là tung độ. Từ M kẻ vuông góc xuống trục Ox, Oy để đọc toạ độ.</p>
                </div>
              </foreignObject>
            )}
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Mặt phẳng toạ độ</h3>
        <p className="small">{doc.task === 'read' ? 'Học sinh đọc toạ độ; bấm “Hiện số đo” để kiểm tra.' : 'Kéo điểm (tự bắt vào lưới 0,5 đơn vị).'}</p>
        {F && (
          <Toggle value={!!doc.curve} onChange={(v) => onDoc({ ...doc, curve: v })} label="Nối thành đồ thị (khi x lấy mọi giá trị)" />
        )}
        <Toggle value={!!doc.quadrants} onChange={(v) => onDoc({ ...doc, quadrants: v })} label="Hiện các góc phần tư" />
      </aside>
    </div>
  );
}

// =====================================================================
// Hàm số bậc nhất y = ax + b, hệ số góc, hai đường thẳng
// =====================================================================

export interface LinearDoc {
  mode: 'linear';
  a: number;
  b: number;
  /** Đường thẳng thứ hai */
  two?: boolean;
  a2?: number;
  b2?: number;
  intercepts?: boolean;
  angle?: boolean;
  slopeTri?: boolean;
  /** Bài toán thực tế (LIN_CTX) */
  ctx?: string;
  x?: number;
  /** Khoá hệ số a hoặc b (dùng cho cảnh khám phá) */
  lock?: 'a' | 'b';
}

export function LinearView({ doc, onDoc, showValues }: EngineProps<LinearDoc, unknown>) {
  const ctx = doc.ctx ? LIN_CTX[doc.ctx] : null;
  const ax = ctx ? mkAxes(0, ctx.xMax, 0, ctx.yMax, { x: 70, y: 30, w: 600, h: 600 }) : mkAxes(-6, 6, -6, 6, { x: 40, y: 30, w: 620, h: 620 });
  const { a, b } = ctx ? { a: ctx.a, b: ctx.b } : doc;
  const a2 = doc.a2 ?? 1;
  const b2 = doc.b2 ?? 0;
  const f = (x: number) => a * x + b;
  const isFn = a !== 0;
  const xi = isFn ? -b / a : NaN;
  const alpha = a === 0 ? 0 : a > 0 ? (Math.atan(a) * 180) / Math.PI : 180 + (Math.atan(a) * 180) / Math.PI;
  const rel = !doc.two ? '' : a === a2 ? (b === b2 ? 'Hai đường thẳng trùng nhau (a = a′, b = b′)' : 'Hai đường thẳng song song (a = a′, b ≠ b′)') : 'Hai đường thẳng cắt nhau (a ≠ a′)';
  const inter = doc.two && a !== a2 ? { x: (b2 - b) / (a - a2), y: (a * (b2 - b)) / (a - a2) + b } : null;
  const fs = (k: number, c: number) => `y = ${k === 0 ? '' : k === 1 ? 'x' : k === -1 ? '−x' : `${fmtNum(k)}x`}${c === 0 ? (k === 0 ? '0' : '') : k === 0 ? fmtNum(c) : c > 0 ? ` + ${fmtNum(c)}` : ` − ${fmtNum(-c)}`}`;
  const xv = doc.x ?? (ctx ? ctx.xMax / 2 : 1);
  const step = ctx ? ctx.step : 1;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <Grid ax={ax} step={ctx ? ctx.gx : 1} labelStep={ctx ? ctx.lx : 1} stepY={ctx ? ctx.gy : 1} labelStepY={ctx ? ctx.ly : 1} xName={ctx ? ctx.xName : 'x'} yName={ctx ? ctx.yName : 'y'} />
          {doc.two && <Curve ax={ax} f={(x) => a2 * x + b2} color={C.b} w={4} />}
          <Curve ax={ax} f={f} color={C.a} w={5} />
          {doc.angle && isFn && Math.abs(xi) < 6 && (
            <Arc a={{ x: ax.X(xi + 2), y: ax.Y(0) }} o={{ x: ax.X(xi), y: ax.Y(0) }} b={{ x: ax.X(xi + Math.cos((alpha * Math.PI) / 180) * 2), y: ax.Y(Math.sin((alpha * Math.PI) / 180) * 2) }} r={40} color={C.d} label={showValues ? `α ≈ ${Math.round(alpha)}°` : 'α'} fill right={false} />
          )}
          {doc.slopeTri && !ctx && (
            <g>
              <line x1={ax.X(1)} y1={ax.Y(f(1))} x2={ax.X(2)} y2={ax.Y(f(1))} stroke={C.c} strokeWidth={4} />
              <line x1={ax.X(2)} y1={ax.Y(f(1))} x2={ax.X(2)} y2={ax.Y(f(2))} stroke={C.e} strokeWidth={4} />
              <text x={ax.X(1.5)} y={ax.Y(f(1)) + (a >= 0 ? 26 : -12)} textAnchor="middle" fontSize={18} fontWeight={800} fill={C.c}>
                tăng 1
              </text>
              <text x={ax.X(2) + 10} y={ax.Y((f(1) + f(2)) / 2) + 6} fontSize={18} fontWeight={800} fill={C.e}>
                {a >= 0 ? 'tăng' : 'giảm'} {showValues ? fmtNum(Math.abs(a)) : '?'}
              </text>
            </g>
          )}
          {doc.intercepts && !ctx && (
            <g>
              <circle cx={ax.X(0)} cy={ax.Y(b)} r={9} fill={C.d} stroke="#fff" strokeWidth={3} />
              <text x={ax.X(0) + 14} y={ax.Y(b) - 10} fontSize={20} fontWeight={800} fill={C.d} stroke="var(--board)" strokeWidth={4} paintOrder="stroke">
                {showValues ? `(0; ${fmtNum(b)})` : '(0; ?)'}
              </text>
              {isFn && Math.abs(xi) <= 6 && (
                <g>
                  <circle cx={ax.X(xi)} cy={ax.Y(0)} r={9} fill={C.d} stroke="#fff" strokeWidth={3} />
                  <text x={ax.X(xi)} y={ax.Y(0) + 34} textAnchor="middle" fontSize={20} fontWeight={800} fill={C.d} stroke="var(--board)" strokeWidth={4} paintOrder="stroke">
                    {showValues ? `(${dec(xi, 2)}; 0)` : '(?; 0)'}
                  </text>
                </g>
              )}
            </g>
          )}
          {inter && Math.abs(inter.x) <= 6 && Math.abs(inter.y) <= 6 && (
            <g>
              <circle cx={ax.X(inter.x)} cy={ax.Y(inter.y)} r={10} fill={C.e} stroke="#fff" strokeWidth={3} />
              {showValues && (
                <text x={ax.X(inter.x) + 14} y={ax.Y(inter.y) + 30} fontSize={20} fontWeight={800} fill={C.e} stroke="var(--board)" strokeWidth={4} paintOrder="stroke">
                  ({dec(inter.x, 2)}; {dec(inter.y, 2)})
                </text>
              )}
            </g>
          )}
          {ctx && (
            <g>
              <line x1={ax.X(xv)} x2={ax.X(xv)} y1={ax.Y(0)} y2={ax.Y(f(xv))} stroke={C.d} strokeDasharray="6 5" strokeWidth={2} />
              <line x1={ax.X(0)} x2={ax.X(xv)} y1={ax.Y(f(xv))} y2={ax.Y(f(xv))} stroke={C.d} strokeDasharray="6 5" strokeWidth={2} />
              <circle cx={ax.X(xv)} cy={ax.Y(f(xv))} r={10} fill={C.d} stroke="#fff" strokeWidth={3} />
            </g>
          )}
          <g transform="translate(700 40)">
            <rect x={0} y={0} width={470} height={600} rx={20} fill="var(--surface)" stroke="var(--line)" />
            {ctx ? (
              <foreignObject x={20} y={20} width={430} height={560}>
                <div className="fmap-box">
                  <b>{ctx.title}</b>
                  <p>{ctx.text}</p>
                  <p className="math-side" style={{ color: C.a }}>
                    {showValues ? ctx.formula : 'y = ?'}
                  </p>
                  <p>
                    {ctx.xName} = <b>{fmtNum(xv)}</b> → {ctx.yName} = <b style={{ color: C.d }}>{showValues ? dec(f(xv), 2) : '?'}</b> {ctx.yUnit}
                  </p>
                </div>
              </foreignObject>
            ) : (
              <g>
                <text x={235} y={60} textAnchor="middle" fontSize={34} fontWeight={800} fill={C.a} className="math-text">
                  {fs(a, b)}
                </text>
                {doc.two && (
                  <text x={235} y={110} textAnchor="middle" fontSize={34} fontWeight={800} fill={C.b} className="math-text">
                    {fs(a2, b2)}
                  </text>
                )}
                <foreignObject x={20} y={doc.two ? 140 : 90} width={430} height={440}>
                  <div className="fmap-box">
                    {a === 0 ? (
                      <p>
                        a = 0: <b>y = {fmtNum(b)}</b> là hàm hằng, không phải hàm số bậc nhất. Đồ thị là đường thẳng song song (hoặc trùng) với trục Ox.
                      </p>
                    ) : (
                      <>
                        <p>
                          Hệ số góc a = <b>{showValues ? fmtNum(a) : '?'}</b>
                          {showValues && (a > 0 ? ' > 0: góc α nhọn, đường thẳng đi lên từ trái sang phải.' : ' < 0: góc α tù, đường thẳng đi xuống từ trái sang phải.')}
                        </p>
                        <p>
                          Tung độ gốc b = <b>{showValues ? fmtNum(b) : '?'}</b>: đường thẳng cắt trục Oy tại điểm có tung độ b.
                        </p>
                      </>
                    )}
                    {doc.two && <p style={{ color: C.e, fontWeight: 800 }}>{showValues ? rel : 'Hai đường thẳng: ?'}</p>}
                  </div>
                </foreignObject>
              </g>
            )}
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{ctx ? 'Bài toán thực tế' : 'Hàm số y = ax + b'}</h3>
        {ctx ? (
          <Row label={`${ctx.xName} =`}>
            <Slider value={xv} min={0} max={ctx.xMax} step={step} digits={2} onChange={(v) => onDoc({ ...doc, x: v })} />
          </Row>
        ) : (
          <>
            <Row label="a">
              <Slider value={a} min={-4} max={4} step={0.5} digits={1} onChange={(v) => doc.lock !== 'a' && onDoc({ ...doc, a: v })} />
            </Row>
            <Row label="b">
              <Slider value={b} min={-5} max={5} step={0.5} digits={1} onChange={(v) => doc.lock !== 'b' && onDoc({ ...doc, b: v })} />
            </Row>
            <Toggle value={!!doc.intercepts} onChange={(v) => onDoc({ ...doc, intercepts: v })} label="Giao điểm với hai trục" />
            <Toggle value={!!doc.slopeTri} onChange={(v) => onDoc({ ...doc, slopeTri: v })} label="x tăng 1 thì y thay đổi bao nhiêu" />
            <Toggle value={!!doc.angle} onChange={(v) => onDoc({ ...doc, angle: v })} label="Góc α tạo bởi đường thẳng và trục Ox" />
            <Toggle value={!!doc.two} onChange={(v) => onDoc({ ...doc, two: v })} label="Thêm đường thẳng thứ hai" />
            {doc.two && (
              <>
                <Row label="a′">
                  <Slider value={a2} min={-4} max={4} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, a2: v })} />
                </Row>
                <Row label="b′">
                  <Slider value={b2} min={-5} max={5} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, b2: v })} />
                </Row>
              </>
            )}
            <MiniTable head={['x', ...[-2, -1, 0, 1, 2].map(String)]} rows={[['y', ...[-2, -1, 0, 1, 2].map((x) => (showValues ? fmtNum(f(x)) : '?'))]]} />
          </>
        )}
      </aside>
    </div>
  );
}

