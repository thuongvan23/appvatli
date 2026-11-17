// Đại số Toán 8: đơn thức, đa thức, phép toán trên đa thức (mô hình diện tích), hằng đẳng thức
// (chứng minh bằng hình), cân phương trình, phân thức đại số (đồ thị có "lỗ"), suy luận từng bước.
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, Toggle } from '../../ui/controls';
import { C, Curve, Grid, MiniTable, VH, VW, mkAxes } from './mcommon';
import { Poly, Term, collect, divByTerm, evalPoly, fmtNum, fmtPoly, fmtTerm, mulTerm, neg, paren, polyDeg, polyMulRaw, termDeg, termKey, varPart, dec } from './poly';
import { DERIVE, FRACS, MONO_SETS, POLY_TASKS, SORTS } from './mathData';

// ---------------- Viết đa thức có tô màu hạng tử đồng dạng ----------------

function colorMap(p: Poly): Map<string, string> {
  const m = new Map<string, string>();
  for (const x of p) if (!m.has(termKey(x))) m.set(termKey(x), C.solid[m.size % C.solid.length]);
  return m;
}

/** Các hạng tử thành <tspan>, tô màu theo nhóm đồng dạng (nếu có colors) */
function Terms({ p, colors, lead = true }: { p: Poly; colors?: Map<string, string>; lead?: boolean }) {
  if (!p.length) return <tspan>0</tspan>;
  return (
    <>
      {p.map((m, i) => (
        <tspan key={i} fill={colors?.get(termKey(m)) ?? 'var(--ink)'}>
          {fmtTerm(m, lead && i === 0)}
        </tspan>
      ))}
    </>
  );
}

function MathLine({ x, y, children, size = 34, anchor = 'start', color = 'var(--ink)', op }: { x: number; y: number; children: React.ReactNode; size?: number; anchor?: 'start' | 'middle' | 'end'; color?: string; op?: number }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} className="math-text" opacity={op}>
      {children}
    </text>
  );
}

function StepButtons({ step, max, onStep, labels = ['← Bước trước', 'Bước tiếp →'] }: { step: number; max: number; onStep: (s: number) => void; labels?: [string, string] }) {
  return (
    <div className="insp-actions">
      <button className="btn" disabled={step <= 0} onClick={() => onStep(step - 1)}>
        {labels[0]}
      </button>
      <button className="btn primary" disabled={step >= max} onClick={() => onStep(step + 1)}>
        {labels[1]}
      </button>
    </div>
  );
}

// =====================================================================
// Đơn thức: dạng ban đầu → thu gọn → hệ số, phần biến, bậc, giá trị
// =====================================================================

export interface MonoDoc {
  mode: 'mono';
  set: string;
  sel: number;
  x: number;
  y: number;
}

export function MonoView({ doc, onDoc, showValues }: EngineProps<MonoDoc, unknown>) {
  const set = MONO_SETS[doc.set];
  const it = set.items[Math.min(doc.sel, set.items.length - 1)];
  const prod: Term | null = it.f ? it.f.reduce((a, b) => mulTerm(a, b), { c: 1, e: [0, 0, 0] }) : null;
  const n = set.items.length;
  const cols = Math.min(n, 6);
  const cw = 1120 / cols;
  const reduced = it.f && it.f.length > 1;
  const val = prod ? prod.c * Math.pow(doc.x, prod.e[0]) * Math.pow(doc.y, prod.e[1]) * Math.pow(1, prod.e[2]) : NaN;
  const hasZ = prod ? prod.e[2] > 0 : false;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <text x={600} y={40} textAnchor="middle" className="lab-label">
            {set.title}
          </text>
          {set.items.map((m, i) => {
            const x = 40 + (i % cols) * cw;
            const y = 62 + Math.floor(i / cols) * 64;
            const on = i === doc.sel;
            return (
              <g key={i} className="draggable" onPointerDown={() => onDoc({ ...doc, sel: i })}>
                <rect x={x + 6} y={y} width={cw - 12} height={54} rx={12} fill={on ? 'var(--accent-soft)' : 'var(--surface)'} stroke={on ? 'var(--accent)' : 'var(--line)'} strokeWidth={on ? 3 : 1.5} />
                <MathLine x={x + cw / 2} y={y + 37} size={24} anchor="middle">
                  {m.text}
                </MathLine>
              </g>
            );
          })}
          {(() => {
            const top = 62 + Math.ceil(n / cols) * 64 + 40;
            return (
              <g>
                <rect x={60} y={top} width={1080} height={VH - top - 30} rx={22} fill="var(--surface)" stroke="var(--line)" />
                <MathLine x={600} y={top + 80} size={58} anchor="middle" color="var(--accent)">
                  {it.text}
                </MathLine>
                {!prod ? (
                  <g>
                    <text x={600} y={top + 160} textAnchor="middle" fontSize={28} fontWeight={800} fill={showValues ? C.b : 'var(--muted)'}>
                      {showValues ? 'Không phải là đơn thức' : 'Có phải là đơn thức không?'}
                    </text>
                    {showValues && it.why && (
                      <text x={600} y={top + 205} textAnchor="middle" fontSize={22} fill="var(--ink-2)">
                        {it.why}
                      </text>
                    )}
                  </g>
                ) : (
                  <g>
                    {reduced && (
                      <MathLine x={600} y={top + 150} size={36} anchor="middle">
                        <tspan fill="var(--ink-2)">Thu gọn: </tspan>
                        {showValues ? `${it.text} = ${fmtTerm(prod)}` : `${it.text} = ?`}
                      </MathLine>
                    )}
                    {[
                      ['Hệ số', fmtNum(prod.c)],
                      ['Phần biến', varPart(prod) || '(không có)'],
                      ['Bậc', String(termDeg(prod))],
                    ].map(([k, v], i) => (
                      <g key={k} transform={`translate(${170 + i * 300} ${top + (reduced ? 190 : 140)})`}>
                        <rect x={-130} y={0} width={260} height={96} rx={16} fill="var(--surface-2)" />
                        <text x={0} y={32} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--muted)">
                          {k}
                        </text>
                        <MathLine x={0} y={78} size={34} anchor="middle" color={C.solid[i]}>
                          {showValues ? v : '?'}
                        </MathLine>
                      </g>
                    ))}
                  </g>
                )}
              </g>
            );
          })()}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Đơn thức</h3>
        <p className="small">Bấm vào từng biểu thức ở trên. Ẩn số đo để học sinh tự tìm hệ số, phần biến, bậc trước.</p>
        <div className="insp-actions">
          <button className="btn" disabled={doc.sel <= 0} onClick={() => onDoc({ ...doc, sel: doc.sel - 1 })}>
            ← Trước
          </button>
          <button className="btn primary" disabled={doc.sel >= n - 1} onClick={() => onDoc({ ...doc, sel: doc.sel + 1 })}>
            Tiếp →
          </button>
        </div>
        {prod && (
          <>
            <h4>Giá trị của đơn thức</h4>
            <Row label="x =">
              <Slider value={doc.x} min={-5} max={5} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, x: v })} />
            </Row>
            <Row label="y =">
              <Slider value={doc.y} min={-5} max={5} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, y: v })} />
            </Row>
            {hasZ && <p className="small muted">Lấy z = 1.</p>}
            <div className="insp-values">
              <div style={{ gridColumn: 'span 3' }}>
                <span>Giá trị</span>
                <b>{showValues ? dec(val, 3) : '?'}</b>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

// =====================================================================
// Xếp nhóm (đơn thức đồng dạng, loại dữ liệu, biến cố…) – dùng chung
// =====================================================================

export interface SortDoc {
  mode: 'sort';
  set: string;
  placed: Record<string, number>;
  sel?: number;
  checked?: boolean;
}

export function SortView({ doc, onDoc, showValues }: EngineProps<SortDoc, unknown>) {
  const s = SORTS[doc.set];
  const nb = s.bins.length;
  const bw = 1120 / nb;
  const pool = s.items.map((_, i) => i).filter((i) => doc.placed[i] === undefined);
  const perRow = 6;
  const iw = 1120 / perRow;
  const ok = (i: number) => doc.placed[i] === s.items[i].bin;
  const allPlaced = pool.length === 0;
  const right = s.items.filter((_, i) => ok(i)).length;
  const binTop = 70 + Math.max(1, Math.ceil(s.items.length / perRow)) * 58 + 30;
  const place = (bin: number) => {
    if (doc.sel === undefined) return;
    onDoc({ ...doc, placed: { ...doc.placed, [doc.sel]: bin }, sel: undefined, checked: false });
  };
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <text x={600} y={40} textAnchor="middle" className="lab-label">
            {s.title}
          </text>
          {pool.map((i, k) => {
            const x = 40 + (k % perRow) * iw;
            const y = 62 + Math.floor(k / perRow) * 58;
            const on = doc.sel === i;
            return (
              <g key={i} className="draggable" onPointerDown={() => onDoc({ ...doc, sel: on ? undefined : i })}>
                <rect x={x + 5} y={y} width={iw - 10} height={48} rx={12} fill={on ? 'var(--accent)' : 'var(--surface)'} stroke={on ? 'var(--accent)' : 'var(--line)'} strokeWidth={2} />
                <foreignObject x={x + 8} y={y + 2} width={iw - 16} height={44}>
                  <div className="sort-chip" style={{ color: on ? 'var(--accent-ink)' : undefined }}>
                    {s.items[i].t}
                  </div>
                </foreignObject>
              </g>
            );
          })}
          {s.bins.map((b, j) => {
            const x = 40 + j * bw;
            const inBin = s.items.map((_, i) => i).filter((i) => doc.placed[i] === j);
            const h = VH - binTop - 20;
            return (
              <g key={j}>
                <g className="draggable" onPointerDown={() => place(j)}>
                  <rect x={x + 6} y={binTop} width={bw - 12} height={h} rx={18} fill={C.soft[j % C.soft.length]} stroke={doc.sel !== undefined ? 'var(--accent)' : C.solid[j % C.solid.length]} strokeWidth={doc.sel !== undefined ? 3 : 2} strokeDasharray={doc.sel !== undefined ? '8 6' : undefined} />
                  <foreignObject x={x + 12} y={binTop + 6} width={bw - 24} height={52}>
                    <div className="sort-bin">{b}</div>
                  </foreignObject>
                </g>
                {inBin.map((i, k) => {
                  const cols = bw > 300 ? 2 : 1;
                  const cw = (bw - 24) / cols;
                  const yy = binTop + 64 + Math.floor(k / cols) * 46;
                  const xx = x + 12 + (k % cols) * cw;
                  const mark = doc.checked || showValues ? (ok(i) ? '✓' : '✗') : '';
                  return (
                    <g key={i} className="draggable" onPointerDown={() => onDoc({ ...doc, placed: Object.fromEntries(Object.entries(doc.placed).filter(([kk]) => Number(kk) !== i)), checked: false })}>
                      <rect x={xx + 2} y={yy} width={cw - 4} height={40} rx={10} fill="var(--surface)" stroke={mark === '✓' ? C.c : mark === '✗' ? C.b : 'var(--line)'} strokeWidth={mark ? 3 : 1.5} />
                      <foreignObject x={xx + 4} y={yy + 1} width={cw - 30} height={38}>
                        <div className="sort-chip small-chip">{s.items[i].t}</div>
                      </foreignObject>
                      {mark && (
                        <text x={xx + cw - 16} y={yy + 28} textAnchor="middle" fontSize={22} fontWeight={900} fill={mark === '✓' ? C.c : C.b}>
                          {mark}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Xếp nhóm</h3>
        <p className="small">Bấm chọn một thẻ ở trên, rồi bấm vào nhóm phù hợp. Bấm vào thẻ đã xếp để lấy ra.</p>
        <div className="insp-actions">
          <button className="btn primary" disabled={!Object.keys(doc.placed).length} onClick={() => onDoc({ ...doc, checked: true })}>
            Kiểm tra
          </button>
          <button className="btn" onClick={() => onDoc({ ...doc, placed: Object.fromEntries(s.items.map((it, i) => [i, it.bin])), checked: true, sel: undefined })}>
            Xếp đúng
          </button>
          <button className="btn" onClick={() => onDoc({ ...doc, placed: {}, checked: false, sel: undefined })}>
            Làm lại
          </button>
        </div>
        {(doc.checked || showValues) && (
          <div className="insp-values">
            <div style={{ gridColumn: 'span 3' }}>
              <span>Kết quả</span>
              <b>
                {right}/{s.items.length} thẻ đúng {allPlaced && right === s.items.length ? '– Tuyệt vời!' : ''}
              </b>
            </div>
          </div>
        )}
        {s.hint && <p className="small muted">{s.hint}</p>}
      </aside>
    </div>
  );
}

// =====================================================================
// Phép toán trên đa thức, trình bày từng bước (thu gọn, cộng, trừ, nhân, chia, tính giá trị)
// =====================================================================

export interface PolyDoc {
  mode: 'poly';
  set: string;
  sel: number;
  step: number;
  x: number;
  y: number;
}

interface PLine {
  label?: string;
  node: React.ReactNode;
}

function polySteps(task: (typeof POLY_TASKS)[string]['tasks'][number]): { head: React.ReactNode; lines: PLine[]; result: Poly; start: Poly } {
  const A = task.A;
  const B = task.B ?? [];
  if (task.kind === 'collect') {
    const res = collect(A);
    const cm = colorMap(A);
    const groups = [...cm.keys()].map((k) => A.filter((m) => termKey(m) === k));
    return {
      head: <Terms p={A} />,
      start: A,
      result: res,
      lines: [
        { label: 'Tô màu các hạng tử đồng dạng', node: <Terms p={A} colors={cm} /> },
        {
          label: 'Nhóm các hạng tử đồng dạng',
          node: (
            <>
              {groups.map((g, i) => (
                <tspan key={i} fill={cm.get(termKey(g[0]))}>
                  {i === 0 ? '' : ' + '}
                  {g.length > 1 ? `(${fmtPoly(g)})` : fmtPoly(g)}
                </tspan>
              ))}
            </>
          ),
        },
        { label: 'Cộng các hệ số', node: <Terms p={collect(A, false)} colors={cm} /> },
        { label: 'Đa thức thu gọn (sắp theo bậc giảm dần)', node: <Terms p={res} /> },
      ],
    };
  }
  if (task.kind === 'add' || task.kind === 'sub') {
    const plus = task.kind === 'add';
    const B2 = plus ? B : neg(B);
    const all = [...A, ...B2];
    const cm = colorMap(all);
    const res = collect(all);
    const groups = [...cm.keys()].map((k) => all.filter((m) => termKey(m) === k));
    return {
      head: (
        <>
          ({fmtPoly(A)}) {plus ? '+' : '−'} ({fmtPoly(B)})
        </>
      ),
      start: all,
      result: res,
      lines: [
        { label: plus ? 'Bỏ dấu ngoặc' : 'Bỏ dấu ngoặc: trước ngoặc có dấu “−” thì đổi dấu mọi hạng tử trong ngoặc', node: <Terms p={all} colors={cm} /> },
        {
          label: 'Nhóm các hạng tử đồng dạng',
          node: (
            <>
              {groups.map((g, i) => (
                <tspan key={i} fill={cm.get(termKey(g[0]))}>
                  {i === 0 ? '' : ' + '}
                  {g.length > 1 ? `(${fmtPoly(g)})` : fmtPoly(g)}
                </tspan>
              ))}
            </>
          ),
        },
        { label: 'Thu gọn', node: <Terms p={res} /> },
      ],
    };
  }
  if (task.kind === 'mul') {
    const raw = polyMulRaw(A, B);
    const cm = colorMap(raw);
    const res = collect(raw);
    const dist = A.map((a, i) => (
      <tspan key={i}>
        {i === 0 ? '' : ' + '}
        {fmtTerm(a).length > 0 && (a.c < 0 ? `(${fmtTerm(a)})` : fmtTerm(a))}·{paren(B)}
      </tspan>
    ));
    return {
      head: (
        <>
          {paren(A)}·{paren(B)}
        </>
      ),
      start: raw,
      result: res,
      lines: [
        ...(A.length > 1 ? [{ label: 'Nhân mỗi hạng tử của đa thức thứ nhất với đa thức thứ hai', node: <>{dist}</> }] : []),
        { label: 'Nhân từng cặp hạng tử rồi cộng các tích', node: <Terms p={raw} colors={cm} /> },
        { label: 'Thu gọn', node: <Terms p={res} /> },
      ],
    };
  }
  // chia đa thức cho đơn thức
  const d = B[0];
  const q = divByTerm(A, d) ?? [];
  return {
    head: (
      <>
        ({fmtPoly(A)}) : {d.c < 0 ? `(${fmtTerm(d)})` : fmtTerm(d)}
      </>
    ),
    start: q,
    result: collect(q),
    lines: [
      {
        label: 'Chia từng hạng tử của đa thức cho đơn thức rồi cộng các kết quả',
        node: (
          <>
            {A.map((m, i) => (
              <tspan key={i} fill={C.solid[i % C.solid.length]}>
                {i === 0 ? '' : ' + '}
                {m.c < 0 ? `(${fmtTerm(m)})` : fmtTerm(m)} : {d.c < 0 ? `(${fmtTerm(d)})` : fmtTerm(d)}
              </tspan>
            ))}
          </>
        ),
      },
      {
        label: 'Chia hệ số cho hệ số, luỹ thừa của từng biến cho luỹ thừa cùng biến',
        node: (
          <>
            {q.map((m, i) => (
              <tspan key={i} fill={C.solid[i % C.solid.length]}>
                {fmtTerm(m, i === 0)}
              </tspan>
            ))}
          </>
        ),
      },
    ],
  };
}

export function PolyView({ doc, onDoc, showValues }: EngineProps<PolyDoc, unknown>) {
  const set = POLY_TASKS[doc.set];
  const task = set.tasks[Math.min(doc.sel, set.tasks.length - 1)];
  const st = polySteps(task);
  const max = st.lines.length;
  const step = Math.min(doc.step, max);
  const res = st.result;
  const deg = polyDeg(res);
  const twoVars = [...task.A, ...(task.B ?? [])].some((m) => m.e[1] > 0);
  const vals = [doc.x, doc.y, 1];
  const exprVal = evalPoly(res, vals);
  const size = 34;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <text x={600} y={40} textAnchor="middle" className="lab-label">
            {set.title}
          </text>
          <rect x={40} y={70} width={1120} height={570} rx={22} fill="var(--surface)" stroke="var(--line)" />
          <MathLine x={80} y={140} size={size + 4} color="var(--accent)">
            {task.name ? `${task.name} = ` : ''}
            {st.head}
          </MathLine>
          {st.lines.slice(0, step).map((l, i) => (
            <g key={i}>
              {l.label && (
                <text x={110} y={190 + i * 112} fontSize={18} fontWeight={700} fill="var(--muted)">
                  {l.label}
                </text>
              )}
              <MathLine x={80} y={232 + i * 112} size={size} op={i === step - 1 ? 1 : 0.75}>
                = {l.node}
              </MathLine>
            </g>
          ))}
          {step >= max && showValues && (
            <text x={1130} y={620} textAnchor="end" fontSize={22} fontWeight={800} fill={C.c}>
              {deg >= 0 ? `Bậc của đa thức: ${deg}` : 'Đa thức 0 (không có bậc)'}
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{task.name ? `Đa thức ${task.name}` : 'Thực hiện phép tính'}</h3>
        {set.tasks.length > 1 && (
          <Row label="Bài">
            <Seg value={doc.sel} options={set.tasks.map((_, i) => i)} onChange={(v) => onDoc({ ...doc, sel: v, step: 0 })} fmtOpt={(i) => `${i + 1}`} />
          </Row>
        )}
        <StepButtons step={step} max={max} onStep={(s) => onDoc({ ...doc, step: s })} />
        <p className="small muted">
          Bước {step}/{max}
        </p>
        <h4>Tính giá trị của kết quả</h4>
        <Row label="x =">
          <Slider value={doc.x} min={-4} max={4} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, x: v })} />
        </Row>
        {twoVars && (
          <Row label="y =">
            <Slider value={doc.y} min={-4} max={4} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, y: v })} />
          </Row>
        )}
        <div className="insp-values">
          <div style={{ gridColumn: 'span 3' }}>
            <span>Giá trị</span>
            <b>{showValues ? dec(exprVal, 3) : '?'}</b>
          </div>
        </div>
        {task.kind !== 'collect' && task.kind !== 'div' && (
          <p className="small muted">
            Kiểm tra: biểu thức ban đầu tại giá trị này cũng bằng {showValues ? dec(task.kind === 'mul' ? evalPoly(task.A, vals) * evalPoly(task.B ?? [], vals) : task.kind === 'add' ? evalPoly(task.A, vals) + evalPoly(task.B ?? [], vals) : evalPoly(task.A, vals) - evalPoly(task.B ?? [], vals), 3) : '?'}.
          </p>
        )}
      </aside>
    </div>
  );
}

// =====================================================================
// Mô hình diện tích: nhân đa thức, chia đa thức cho đơn thức
// =====================================================================

export interface AreaDoc {
  mode: 'area';
  tasks: [Poly, Poly][];
  sel: number;
  step: number;
  /** true: biết các ô (đa thức bị chia) và cạnh trái (đơn thức chia), tìm cạnh trên (thương) */
  divide?: boolean;
}

export function AreaView({ doc, onDoc, showValues }: EngineProps<AreaDoc, unknown>) {
  const [R, Cc] = doc.tasks[Math.min(doc.sel, doc.tasks.length - 1)];
  const cells = R.map((r) => Cc.map((c) => mulTerm(r, c)));
  const flat = cells.flat();
  const cm = colorMap(flat);
  const nR = R.length;
  const nC = Cc.length;
  const max = doc.divide ? nC + 1 : nR * nC + 1;
  const step = Math.min(doc.step, max);
  const W = Math.min(220, 820 / nC);
  const H = Math.min(150, 380 / nR);
  const x0 = 600 - (W * nC) / 2 + 40;
  const y0 = 150;
  const res = collect(flat);
  const dividend = collect(flat);
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <MathLine x={600} y={60} size={34} anchor="middle" color="var(--accent)">
            {doc.divide ? `(${fmtPoly(dividend)}) : ${R.length > 1 ? paren(R) : R[0].c < 0 ? `(${fmtTerm(R[0])})` : fmtTerm(R[0])} = ?` : `${paren(R)}·${paren(Cc)} = ?`}
          </MathLine>
          {Cc.map((c, j) => (
            <g key={`c${j}`}>
              <rect x={x0 + j * W} y={y0 - 54} width={W} height={46} rx={8} fill="var(--surface-2)" />
              <MathLine x={x0 + j * W + W / 2} y={y0 - 20} size={28} anchor="middle" color={C.a}>
                {doc.divide && step <= j ? '?' : fmtTerm(c)}
              </MathLine>
            </g>
          ))}
          {R.map((r, i) => (
            <g key={`r${i}`}>
              <rect x={x0 - 150} y={y0 + i * H} width={140} height={H} rx={8} fill="var(--surface-2)" />
              <MathLine x={x0 - 80} y={y0 + i * H + H / 2 + 10} size={28} anchor="middle" color={C.b}>
                {fmtTerm(r)}
              </MathLine>
            </g>
          ))}
          {cells.map((row, i) =>
            row.map((m, j) => {
              const k = i * nC + j;
              const vis = doc.divide ? true : step > k;
              const col = cm.get(termKey(m))!;
              return (
                <g key={`${i}-${j}`}>
                  <rect x={x0 + j * W} y={y0 + i * H} width={W} height={H} fill={vis ? col : 'var(--surface)'} fillOpacity={vis ? 0.18 : 1} stroke="var(--ink)" strokeWidth={2} />
                  {vis && (
                    <MathLine x={x0 + j * W + W / 2} y={y0 + i * H + H / 2 + 11} size={30} anchor="middle" color={col}>
                      {fmtTerm(m)}
                    </MathLine>
                  )}
                </g>
              );
            }),
          )}
          {!doc.divide && step >= nR * nC && (
            <g>
              <MathLine x={600} y={y0 + nR * H + 70} size={30} anchor="middle">
                = <Terms p={flat} colors={cm} />
              </MathLine>
              {step > nR * nC && (
                <MathLine x={600} y={y0 + nR * H + 130} size={34} anchor="middle" color="var(--accent)">
                  = {fmtPoly(res)}
                </MathLine>
              )}
            </g>
          )}
          {doc.divide && step >= nC && (
            <MathLine x={600} y={y0 + nR * H + 90} size={34} anchor="middle" color="var(--accent)">
              Thương: {fmtPoly(Cc)}
            </MathLine>
          )}
          <text x={600} y={VH - 24} textAnchor="middle" className="lab-small">
            {doc.divide ? 'Diện tích hình chữ nhật = đa thức bị chia; một cạnh = đơn thức chia → cạnh còn lại = thương' : 'Mỗi ô = tích một hạng tử ở hàng với một hạng tử ở cột. Các ô cùng màu là các hạng tử đồng dạng.'}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{doc.divide ? (R.length > 1 ? 'Tìm cạnh còn lại (phân tích thành nhân tử)' : 'Chia đa thức cho đơn thức') : 'Nhân đa thức (mô hình diện tích)'}</h3>
        {doc.tasks.length > 1 && (
          <Row label="Bài">
            <Seg value={doc.sel} options={doc.tasks.map((_, i) => i)} onChange={(v) => onDoc({ ...doc, sel: v, step: 0 })} fmtOpt={(i) => `${i + 1}`} />
          </Row>
        )}
        <StepButtons step={step} max={max} onStep={(s) => onDoc({ ...doc, step: s })} labels={['← Lùi', doc.divide ? 'Tìm hạng tử tiếp →' : 'Điền ô tiếp →']} />
        <div className="insp-actions">
          <button className="btn" onClick={() => onDoc({ ...doc, step: max })}>
            Hiện hết
          </button>
        </div>
        {showValues && (
          <div className="insp-row">
            <div className="insp-label">Kết quả</div>
            <p className="math-side">{doc.divide ? fmtPoly(Cc) : fmtPoly(res)}</p>
          </div>
        )}
      </aside>
    </div>
  );
}

// =====================================================================
// Hằng đẳng thức đáng nhớ – chứng minh bằng hình
// =====================================================================

export type IdentityId = 'sqsum' | 'sqdiff' | 'diff2' | 'cubesum' | 'cubediff' | 'sum3' | 'diff3';

export interface IdentityDoc {
  mode: 'identity';
  id: IdentityId;
  a: number;
  b: number;
  t: number;
  list?: IdentityId[];
}

export const IDENTITIES: Record<IdentityId, { name: string; f: string; L: (a: number, b: number) => number; R: (a: number, b: number) => number }> = {
  sqsum: { name: 'Bình phương của một tổng', f: '(a + b)² = a² + 2ab + b²', L: (a, b) => (a + b) ** 2, R: (a, b) => a * a + 2 * a * b + b * b },
  sqdiff: { name: 'Bình phương của một hiệu', f: '(a − b)² = a² − 2ab + b²', L: (a, b) => (a - b) ** 2, R: (a, b) => a * a - 2 * a * b + b * b },
  diff2: { name: 'Hiệu hai bình phương', f: 'a² − b² = (a + b)(a − b)', L: (a, b) => a * a - b * b, R: (a, b) => (a + b) * (a - b) },
  cubesum: { name: 'Lập phương của một tổng', f: '(a + b)³ = a³ + 3a²b + 3ab² + b³', L: (a, b) => (a + b) ** 3, R: (a, b) => a ** 3 + 3 * a * a * b + 3 * a * b * b + b ** 3 },
  cubediff: { name: 'Lập phương của một hiệu', f: '(a − b)³ = a³ − 3a²b + 3ab² − b³', L: (a, b) => (a - b) ** 3, R: (a, b) => a ** 3 - 3 * a * a * b + 3 * a * b * b - b ** 3 },
  sum3: { name: 'Tổng hai lập phương', f: 'a³ + b³ = (a + b)(a² − ab + b²)', L: (a, b) => a ** 3 + b ** 3, R: (a, b) => (a + b) * (a * a - a * b + b * b) },
  diff3: { name: 'Hiệu hai lập phương', f: 'a³ − b³ = (a − b)(a² + ab + b²)', L: (a, b) => a ** 3 - b ** 3, R: (a, b) => (a - b) * (a * a + a * b + b * b) },
};

export interface Box3 {
  x: number;
  y: number;
  z: number;
  dx: number;
  dy: number;
  dz: number;
  color: string;
  label: string;
  ghost?: boolean;
}

/** Vẽ khối hộp theo phép chiếu trục đo (isometric) */
export function IsoBoxes({ boxes, ox, oy, s }: { boxes: Box3[]; ox: number; oy: number; s: number }) {
  const P = (x: number, y: number, z: number) => ({ X: ox + (x - y) * s * 0.866, Y: oy + (x + y) * s * 0.5 - z * s });
  const sorted = [...boxes].sort((p, q) => p.x + p.y + p.z + (p.dx + p.dy + p.dz) / 3 - (q.x + q.y + q.z + (q.dx + q.dy + q.dz) / 3));
  return (
    <g>
      {sorted.map((b, i) => {
        const { x, y, z, dx, dy, dz } = b;
        const pts = (arr: [number, number, number][]) => arr.map(([a, c, d]) => P(a, c, d)).map((p) => `${p.X},${p.Y}`).join(' ');
        const top = pts([
          [x, y, z + dz],
          [x + dx, y, z + dz],
          [x + dx, y + dy, z + dz],
          [x, y + dy, z + dz],
        ]);
        const right = pts([
          [x + dx, y, z],
          [x + dx, y + dy, z],
          [x + dx, y + dy, z + dz],
          [x + dx, y, z + dz],
        ]);
        const left = pts([
          [x, y + dy, z],
          [x + dx, y + dy, z],
          [x + dx, y + dy, z + dz],
          [x, y + dy, z + dz],
        ]);
        const c = P(x + dx / 2, y + dy / 2, z + dz);
        const op = b.ghost ? 0.25 : 1;
        return (
          <g key={i} opacity={op}>
            <polygon points={top} fill={b.color} stroke="#1f2937" strokeWidth={1.5} />
            <polygon points={right} fill={b.color} stroke="#1f2937" strokeWidth={1.5} style={{ filter: 'brightness(0.78)' }} />
            <polygon points={left} fill={b.color} stroke="#1f2937" strokeWidth={1.5} style={{ filter: 'brightness(0.62)' }} />
            {b.label && !b.ghost && (
              <text x={c.X} y={c.Y + 6} textAnchor="middle" fontSize={20} fontWeight={900} fill="#fff" stroke="#1f2937" strokeWidth={3} paintOrder="stroke" className="math-text">
                {b.label}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

function cubeSplit(a: number, b: number, t: number, labels: [string, string], highlightFirst = false): Box3[] {
  const g = t * 1.4; // khoảng tách
  const parts: Box3[] = [];
  const cols = ['#2563eb', '#16a34a', '#d97706', '#e11d48'];
  for (const i of [0, 1])
    for (const j of [0, 1])
      for (const k of [0, 1]) {
        const dx = i ? b : a;
        const dy = j ? b : a;
        const dz = k ? b : a;
        const nb = i + j + k;
        const label = nb === 0 ? `${labels[0]}³` : nb === 1 ? `${labels[0]}²${labels[1]}` : nb === 2 ? `${labels[0]}${labels[1]}²` : `${labels[1]}³`;
        parts.push({ x: i ? a + g : 0, y: j ? a + g : 0, z: k ? a + g : 0, dx, dy, dz, color: highlightFirst && nb === 0 ? '#7c3aed' : cols[nb], label });
      }
  return parts;
}

export function IdentityView({ doc, onDoc, showValues }: EngineProps<IdentityDoc, unknown>) {
  const { a, b, t } = doc;
  const I = IDENTITIES[doc.id];
  const L = I.L(a, b);
  const R = I.R(a, b);
  const S = 46; // px mỗi đơn vị
  const lab = (x: number, y: number, s: string, col = 'var(--ink)', size = 26) => (
    <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={800} fill={col} className="math-text" stroke="var(--board)" strokeWidth={4} paintOrder="stroke">
      {s}
    </text>
  );
  let pic: React.ReactNode = null;
  if (doc.id === 'sqsum') {
    const x0 = 360 - ((a + b) * S) / 2;
    const y0 = 340 - ((a + b) * S) / 2;
    const g = t * 30;
    const r = (x: number, y: number, w: number, h: number, col: string, s: string) => (
      <g>
        <rect x={x} y={y} width={w} height={h} fill={col} fillOpacity={0.3} stroke={col} strokeWidth={3} />
        {lab(x + w / 2, y + h / 2 + 9, s, col, 30)}
      </g>
    );
    pic = (
      <g>
        {r(x0, y0, a * S, a * S, C.a, 'a²')}
        {r(x0 + a * S + g, y0, b * S, a * S, C.c, 'ab')}
        {r(x0, y0 + a * S + g, a * S, b * S, C.c, 'ab')}
        {r(x0 + a * S + g, y0 + a * S + g, b * S, b * S, C.b, 'b²')}
        {lab(x0 + (a * S) / 2, y0 - 14, 'a')}
        {lab(x0 + a * S + g + (b * S) / 2, y0 - 14, 'b')}
        {lab(x0 - 22, y0 + (a * S) / 2 + 8, 'a')}
        {lab(x0 - 22, y0 + a * S + g + (b * S) / 2 + 8, 'b')}
      </g>
    );
  } else if (doc.id === 'sqdiff') {
    const x0 = 360 - (a * S) / 2;
    const y0 = 340 - (a * S) / 2;
    const c = a - b;
    pic = (
      <g>
        <rect x={x0} y={y0} width={a * S} height={a * S} fill="none" stroke="var(--ink)" strokeWidth={3} />
        <rect x={x0} y={y0} width={c * S} height={c * S} fill={C.a} fillOpacity={0.35} stroke={C.a} strokeWidth={3} />
        {lab(x0 + (c * S) / 2, y0 + (c * S) / 2 + 9, '(a − b)²', C.a, 28)}
        <rect x={x0 + c * S + t * 60} y={y0 - t * 30} width={b * S} height={a * S} fill={C.c} fillOpacity={0.25} stroke={C.c} strokeWidth={3} strokeDasharray="8 5" />
        {lab(x0 + c * S + t * 60 + (b * S) / 2, y0 - t * 30 + (c * S) / 2, 'ab', C.c)}
        <rect x={x0 - t * 30} y={y0 + c * S + t * 60} width={a * S} height={b * S} fill={C.d} fillOpacity={0.25} stroke={C.d} strokeWidth={3} strokeDasharray="8 5" />
        {lab(x0 - t * 30 + (c * S) / 2, y0 + c * S + t * 60 + (b * S) / 2 + 8, 'ab', C.d)}
        <rect x={x0 + c * S} y={y0 + c * S} width={b * S} height={b * S} fill={C.b} fillOpacity={0.35 * (1 - t) + 0.1} stroke={C.b} strokeWidth={2} />
        {t < 0.3 && lab(x0 + c * S + (b * S) / 2, y0 + c * S + (b * S) / 2 + 8, 'b²', C.b, 22)}
        {lab(x0 + (a * S) / 2, y0 + a * S + 34 + t * 60 + b * S * t, `a`)}
        {lab(x0 + a * S + 24 + t * 60 + b * S * t, y0 + (a * S) / 2, 'a')}
      </g>
    );
  } else if (doc.id === 'diff2') {
    const x0 = 330 - ((a + b) * S) / 2;
    const y0 = 330 - (a * S) / 2;
    const c = a - b;
    // Mảnh dưới-trái ((a − b) × b) quay 90° và chuyển sang bên phải mảnh trên (a × (a − b))
    const c0 = { x: x0 + (c * S) / 2, y: y0 + c * S + (b * S) / 2 };
    const c1 = { x: x0 + a * S + (b * S) / 2, y: y0 + (c * S) / 2 };
    const cx = c0.x + (c1.x - c0.x) * t;
    const cy = c0.y + (c1.y - c0.y) * t;
    pic = (
      <g>
        <rect x={x0} y={y0} width={a * S} height={a * S} fill="none" stroke="var(--line)" strokeWidth={2} strokeDasharray="6 6" />
        <rect x={x0 + c * S} y={y0 + c * S} width={b * S} height={b * S} fill="none" stroke={C.b} strokeWidth={2} strokeDasharray="6 4" opacity={1 - t} />
        {t < 0.5 && lab(x0 + c * S + (b * S) / 2, y0 + c * S + (b * S) / 2 + 8, 'b² (bỏ đi)', C.b, 18)}
        <rect x={x0} y={y0} width={a * S} height={c * S} fill={C.a} fillOpacity={0.3} stroke={C.a} strokeWidth={3} />
        {lab(x0 + (a * S) / 2, y0 + (c * S) / 2 + 8, 'a(a − b)', C.a, 24)}
        <g transform={`translate(${cx} ${cy}) rotate(${90 * t})`}>
          <rect x={(-c * S) / 2} y={(-b * S) / 2} width={c * S} height={b * S} fill={C.c} fillOpacity={0.3} stroke={C.c} strokeWidth={3} />
        </g>
        {lab(cx, cy + 8, 'b(a − b)', C.c, 20)}
        {t < 0.05 ? (
          <g>
            {lab(x0 + (a * S) / 2, y0 - 14, 'a')}
            {lab(x0 - 24, y0 + (a * S) / 2 + 8, 'a')}
            {lab(x0 + c * S + (b * S) / 2, y0 + a * S + 30, 'b', C.b)}
          </g>
        ) : t > 0.95 ? (
          <g>
            {lab(x0 + ((a + b) * S) / 2, y0 - 14, 'a + b', C.e)}
            {lab(x0 - 50, y0 + (c * S) / 2 + 8, 'a − b', C.e, 22)}
          </g>
        ) : null}
      </g>
    );
  } else if (doc.id === 'cubesum' || doc.id === 'cubediff') {
    const sum = doc.id === 'cubesum';
    const A = sum ? a : a - b;
    const s = Math.min(46, 330 / (a + b * (sum ? 1 : 0) + 1.4 * t + 0.01));
    pic = <IsoBoxes boxes={cubeSplit(A, b, t, sum ? ['a', 'b'] : ['(a−b)', 'b'], !sum)} ox={360} oy={330 - ((sum ? a + b : a) * s) / 2 + 40} s={s} />;
  } else if (doc.id === 'diff3') {
    const c = a - b;
    const s = Math.min(46, 300 / (a + 1));
    const g = t * 1.6;
    const boxes: Box3[] = [
      { x: 0, y: 0, z: b + g * 1.5, dx: a, dy: a, dz: c, color: C.a, label: 'a²(a−b)' },
      { x: b + g, y: 0, z: 0, dx: c, dy: a, dz: b, color: C.c, label: 'ab(a−b)' },
      { x: 0, y: b + g * 0.6, z: 0, dx: b, dy: c, dz: b, color: C.d, label: 'b²(a−b)' },
      { x: 0, y: 0, z: 0, dx: b, dy: b, dz: b, color: C.b, label: 'b³', ghost: t > 0.5 },
    ];
    pic = <IsoBoxes boxes={boxes} ox={360} oy={330 - (a * s) / 2 + 60} s={s} />;
  } else {
    // sum3: hai khối lập phương cạnh a, b
    const s = Math.min(40, 260 / (a + b));
    pic = (
      <g>
        <IsoBoxes boxes={[{ x: 0, y: 0, z: 0, dx: a, dy: a, dz: a, color: C.a, label: 'a³' }]} ox={220} oy={420 - a * s * 0.5} s={s} />
        <text x={360} y={420} fontSize={50} fontWeight={900} fill="var(--ink)">
          +
        </text>
        <IsoBoxes boxes={[{ x: 0, y: 0, z: 0, dx: b, dy: b, dz: b, color: C.b, label: 'b³' }]} ox={500} oy={420 - b * s * 0.5} s={s} />
      </g>
    );
  }
  const anim = doc.id !== 'sum3';
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <text x={600} y={40} textAnchor="middle" className="lab-label">
            {I.name}
          </text>
          {pic}
          <rect x={760} y={90} width={410} height={520} rx={20} fill="var(--surface)" stroke="var(--line)" />
          <MathLine x={965} y={150} size={showValues ? 24 : 26} anchor="middle" color="var(--accent)">
            {showValues ? I.f : I.f.split('=')[0] + '= ?'}
          </MathLine>
          <text x={965} y={220} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--muted)">
            Kiểm tra với a = {fmtNum(a)}, b = {fmtNum(b)}
          </text>
          <text x={800} y={290} fontSize={22} fontWeight={700} fill="var(--ink-2)">
            Vế trái:
          </text>
          <text x={1130} y={290} textAnchor="end" fontSize={30} fontWeight={900} fill={C.a}>
            {dec(L, 3)}
          </text>
          <text x={800} y={350} fontSize={22} fontWeight={700} fill="var(--ink-2)">
            Vế phải:
          </text>
          <text x={1130} y={350} textAnchor="end" fontSize={30} fontWeight={900} fill={C.b}>
            {showValues ? dec(R, 3) : '?'}
          </text>
          {showValues && Math.abs(L - R) < 1e-6 && (
            <text x={965} y={420} textAnchor="middle" fontSize={26} fontWeight={900} fill={C.c}>
              Hai vế bằng nhau ✓
            </text>
          )}
          <foreignObject x={780} y={450} width={370} height={150}>
            <div className="small" style={{ color: 'var(--ink-2)', fontWeight: 600 }}>
              {HINT[doc.id]}
            </div>
          </foreignObject>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Hằng đẳng thức</h3>
        {doc.list && doc.list.length > 1 && (
          <Row label="Chọn hằng đẳng thức">
            <Seg value={doc.id} options={doc.list} onChange={(v) => onDoc({ ...doc, id: v, t: 0 })} fmtOpt={(v) => IDENTITIES[v].name} />
          </Row>
        )}
        <Row label="a">
          <Slider value={a} min={1} max={6} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, a: Math.max(v, doc.id === 'sqdiff' || doc.id === 'diff2' || doc.id === 'cubediff' || doc.id === 'diff3' ? b + 0.5 : 0) })} />
        </Row>
        <Row label="b">
          <Slider value={b} min={0.5} max={doc.id === 'sqdiff' || doc.id === 'diff2' || doc.id === 'cubediff' || doc.id === 'diff3' ? a - 0.5 : 5} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, b: v })} />
        </Row>
        {anim && (
          <Row label={doc.id === 'diff2' ? 'Cắt – ghép hình' : doc.id.startsWith('cube') || doc.id === 'diff3' ? 'Tách các khối' : 'Tách các phần'}>
            <Slider value={t} min={0} max={1} step={0.05} digits={2} onChange={(v) => onDoc({ ...doc, t: v })} />
          </Row>
        )}
        <p className="small muted">Kéo thanh trượt để tách – ghép các phần của hình; đổi a, b để thấy hai vế luôn bằng nhau.</p>
      </aside>
    </div>
  );
}

const HINT: Record<IdentityId, string> = {
  sqsum: 'Hình vuông cạnh a + b gồm: một hình vuông cạnh a, một hình vuông cạnh b và hai hình chữ nhật a × b.',
  sqdiff: 'Từ hình vuông cạnh a bớt đi hai dải a × b. Phần góc b² bị bớt hai lần nên phải cộng lại một lần.',
  diff2: 'Bỏ góc b² khỏi hình vuông cạnh a, cắt phần còn lại thành hai hình chữ nhật rồi ghép thành hình chữ nhật (a + b) × (a − b).',
  cubesum: 'Khối lập phương cạnh a + b gồm 8 khối: 1 khối a³, 3 khối a²b, 3 khối ab², 1 khối b³.',
  cubediff: 'Khối lập phương cạnh a = khối (a − b)³ và 7 khối còn lại. Áp dụng (x + y)³ với x = a − b, y = b rồi biến đổi.',
  sum3: 'Nhân (a + b)(a² − ab + b²) rồi thu gọn: các hạng tử −a²b, a²b và ab², −ab² triệt tiêu nhau.',
  diff3: 'Bỏ khối b³ khỏi khối a³, phần còn lại tách thành ba khối hộp cùng chiều cao a − b: a²(a − b), ab(a − b), b²(a − b).',
};

// =====================================================================
// Cân phương trình bậc nhất ax + b = cx + d
// =====================================================================

export interface BalanceDoc {
  mode: 'balance';
  /** [hệ số x, số hạng tự do] mỗi vế (số tự nhiên) */
  L: [number, number];
  R: [number, number];
  /** nghiệm (để vẽ cân thăng bằng) */
  sol: number;
  /** đang thử giá trị x */
  trial?: number;
  hist: string[];
}

const eqSide = ([k, c]: [number, number]) => {
  const parts: string[] = [];
  if (k) parts.push(k === 1 ? 'x' : `${k}x`);
  if (c || !k) parts.push(String(c));
  return parts.join(' + ');
};

export function BalanceView({ doc, onDoc, showValues }: EngineProps<BalanceDoc, unknown>) {
  const { L, R } = doc;
  const xv = doc.trial ?? doc.sol;
  const lw = L[0] * xv + L[1];
  const rw = R[0] * xv + R[1];
  const tilt = Math.max(-14, Math.min(14, (rw - lw) * 2.5));
  const solved = (L[0] === 1 && L[1] === 0 && R[0] === 0) || (R[0] === 1 && R[1] === 0 && L[0] === 0);
  const push = (L2: [number, number], R2: [number, number], why: string) => onDoc({ ...doc, L: L2, R: R2, hist: [...doc.hist, `${why}:  ${eqSide(L2)} = ${eqSide(R2)}`] });
  const mx = Math.min(L[0], R[0]);
  const mc = Math.min(L[1], R[1]);
  const onlyX = L[0] > 0 && L[1] === 0 && R[0] === 0;
  const div = onlyX ? L[0] : 0;
  const pan = (side: [number, number], cx: number, cy: number) => {
    const items: React.ReactNode[] = [];
    const n = side[0] + side[1];
    const per = 6;
    for (let i = 0; i < n; i++) {
      const isX = i < side[0];
      const col = i % per;
      const row = Math.floor(i / per);
      const x = cx - (Math.min(n, per) * 40) / 2 + col * 40 + 20;
      const y = cy - 26 - row * 40;
      items.push(
        isX ? (
          <g key={i}>
            <rect x={x - 18} y={y - 18} width={36} height={36} rx={6} fill={C.a} stroke="#1e3a8a" strokeWidth={2} />
            <text x={x} y={y + 8} textAnchor="middle" fontSize={22} fontWeight={900} fontStyle="italic" fill="#fff">
              x
            </text>
          </g>
        ) : (
          <g key={i}>
            <circle cx={x} cy={y} r={16} fill={C.d} stroke="#92400e" strokeWidth={2} />
            <text x={x} y={y + 7} textAnchor="middle" fontSize={18} fontWeight={900} fill="#fff">
              1
            </text>
          </g>
        ),
      );
    }
    return items;
  };
  const beamL = { x: 600 - 300 * Math.cos((tilt * Math.PI) / 180), y: 300 + 300 * Math.sin((tilt * Math.PI) / 180) };
  const beamR = { x: 600 + 300 * Math.cos((tilt * Math.PI) / 180), y: 300 - 300 * Math.sin((tilt * Math.PI) / 180) };
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <MathLine x={600} y={60} size={44} anchor="middle" color="var(--accent)">
            {eqSide(L)} = {eqSide(R)}
          </MathLine>
          <rect x={560} y={600} width={80} height={20} fill="#64748b" />
          <path d="M 600 300 L 570 600 L 630 600 Z" fill="#94a3b8" stroke="#475569" strokeWidth={2} />
          <line x1={beamL.x} y1={beamL.y} x2={beamR.x} y2={beamR.y} stroke="#475569" strokeWidth={10} strokeLinecap="round" />
          <circle cx={600} cy={300} r={10} fill="#334155" />
          {[
            [beamL, L],
            [beamR, R],
          ].map(([p, side], k) => {
            const pp = p as { x: number; y: number };
            const s = side as [number, number];
            return (
              <g key={k}>
                <line x1={pp.x} y1={pp.y} x2={pp.x - 110} y2={pp.y + 150} stroke="#64748b" strokeWidth={2} />
                <line x1={pp.x} y1={pp.y} x2={pp.x + 110} y2={pp.y + 150} stroke="#64748b" strokeWidth={2} />
                <path d={`M ${pp.x - 140} ${pp.y + 150} L ${pp.x + 140} ${pp.y + 150} L ${pp.x + 110} ${pp.y + 172} L ${pp.x - 110} ${pp.y + 172} Z`} fill="#cbd5e1" stroke="#64748b" strokeWidth={2} />
                {pan(s, pp.x, pp.y + 150)}
              </g>
            );
          })}
          {doc.trial !== undefined && (
            <text x={600} y={655} textAnchor="middle" fontSize={24} fontWeight={800} fill={Math.abs(lw - rw) < 1e-9 ? C.c : C.b}>
              Thử x = {fmtNum(doc.trial)}: vế trái = {fmtNum(lw)}, vế phải = {fmtNum(rw)} {Math.abs(lw - rw) < 1e-9 ? '→ cân thăng bằng: x là nghiệm' : '→ cân bị lệch'}
            </text>
          )}
          {solved && showValues && (
            <text x={600} y={130} textAnchor="middle" fontSize={30} fontWeight={900} fill={C.c}>
              Nghiệm của phương trình: x = {fmtNum(doc.sol)}
            </text>
          )}
          {doc.hist.map((h, i) => (
            <text key={i} x={30} y={110 + i * 30} fontSize={18} fontWeight={700} fill="var(--ink-2)" className="math-text">
              {h}
            </text>
          ))}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Cân thăng bằng</h3>
        <p className="small">Mỗi hộp xanh nặng x, mỗi quả cân cam nặng 1. Bỏ bớt cùng một lượng ở hai đĩa (hoặc chia đều) thì cân vẫn thăng bằng.</p>
        <div className="insp-actions wrap-btns" style={{ flexDirection: 'column' }}>
          <button className="btn" disabled={mx === 0} onClick={() => push([L[0] - 1, L[1]], [R[0] - 1, R[1]], 'Bớt 1 hộp x ở hai đĩa')}>
            Bớt 1 hộp x ở mỗi đĩa
          </button>
          <button className="btn" disabled={mc === 0} onClick={() => push([L[0], L[1] - 1], [R[0], R[1] - 1], 'Bớt 1 quả cân ở hai đĩa')}>
            Bớt 1 quả cân ở mỗi đĩa
          </button>
          <button className="btn" disabled={mc === 0} onClick={() => push([L[0], L[1] - mc], [R[0], R[1] - mc], `Bớt ${mc} quả cân ở hai đĩa`)}>
            Bớt {mc || ''} quả cân ở mỗi đĩa
          </button>
          <button className="btn primary" disabled={!onlyX || div <= 1 || R[1] % div !== 0} onClick={() => push([1, 0], [0, R[1] / div], `Chia hai vế cho ${div}`)}>
            Chia mỗi đĩa thành {div > 1 ? div : '…'} phần bằng nhau
          </button>
        </div>
        <h4>Thử giá trị của x</h4>
        <Toggle value={doc.trial !== undefined} onChange={(v) => onDoc({ ...doc, trial: v ? 0 : undefined })} label="Thử thay x bằng một số" />
        {doc.trial !== undefined && (
          <Row label="x =">
            <Slider value={doc.trial} min={0} max={10} step={1} digits={0} onChange={(v) => onDoc({ ...doc, trial: v })} />
          </Row>
        )}
      </aside>
    </div>
  );
}

// =====================================================================
// Phân thức đại số: điều kiện xác định, giá trị, rút gọn (đồ thị có lỗ)
// =====================================================================

export interface FracDoc {
  mode: 'frac';
  list: string[];
  sel: string;
  x: number;
  showSimp?: boolean;
}

/** Nghiệm thực của đa thức một biến (tìm trên [-12, 12] theo bước 1/4) */
export function rootsOf(p: Poly): number[] {
  const out: number[] = [];
  for (let k = -48; k <= 48; k++) {
    const x = k / 4;
    if (Math.abs(evalPoly(p, [x, 0, 0])) < 1e-9) out.push(x);
  }
  return out;
}

export function FracView({ doc, onDoc, showValues }: EngineProps<FracDoc, unknown>) {
  const F = FRACS[doc.sel];
  const N = (x: number) => evalPoly(F.num, [x, 0, 0]);
  const D = (x: number) => evalPoly(F.den, [x, 0, 0]);
  const bad = rootsOf(F.den);
  const ax = mkAxes(-6, 6, -6, 6, { x: 40, y: 30, w: 620, h: 620 });
  const dx = D(doc.x);
  const defined = Math.abs(dx) > 1e-9;
  const val = defined ? N(doc.x) / dx : NaN;
  const simpF = F.simp ? (x: number) => evalPoly(F.simp!.num, [x, 0, 0]) / evalPoly(F.simp!.den, [x, 0, 0]) : null;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <Grid ax={ax} />
          {showValues && bad.map((r) => <line key={r} x1={ax.X(r)} x2={ax.X(r)} y1={ax.box.y} y2={ax.box.y + ax.box.h} stroke={C.b} strokeWidth={2} strokeDasharray="8 6" />)}
          {doc.showSimp && simpF && <Curve ax={ax} f={simpF} color={C.c} w={9} />}
          <Curve ax={ax} f={(x) => (Math.abs(D(x)) < 1e-9 ? NaN : N(x) / D(x))} color={C.a} w={4} />
          {bad.map((r) => {
            const lim = simpF ? simpF(r) : NaN;
            return Number.isFinite(lim) && Math.abs(lim) < 6 ? <circle key={r} cx={ax.X(r)} cy={ax.Y(lim)} r={8} fill="var(--surface)" stroke={C.a} strokeWidth={3} /> : null;
          })}
          {defined && Math.abs(val) < 6 && <circle cx={ax.X(doc.x)} cy={ax.Y(val)} r={10} fill={C.d} stroke="#fff" strokeWidth={3} />}
          <line x1={ax.X(doc.x)} x2={ax.X(doc.x)} y1={ax.box.y} y2={ax.box.y + ax.box.h} stroke={C.d} strokeWidth={1.5} strokeDasharray="4 4" />
          <g transform="translate(700 40)">
            <rect x={0} y={0} width={470} height={600} rx={20} fill="var(--surface)" stroke="var(--line)" />
            <MathLine x={235} y={70} size={30} anchor="middle" color={C.a}>
              {fmtPoly(F.num)}
            </MathLine>
            <line x1={60} x2={410} y1={86} y2={86} stroke={C.a} strokeWidth={3} />
            <MathLine x={235} y={126} size={30} anchor="middle" color={C.a}>
              {fmtPoly(F.den)}
            </MathLine>
            <text x={30} y={190} fontSize={20} fontWeight={800} fill="var(--muted)">
              Điều kiện xác định
            </text>
            <MathLine x={30} y={228} size={26}>
              {showValues ? (bad.length ? bad.map((r) => `x ≠ ${fmtNum(r)}`).join('; ') : 'mọi giá trị của x') : '?'}
            </MathLine>
            <text x={30} y={290} fontSize={20} fontWeight={800} fill="var(--muted)">
              Giá trị tại x = {fmtNum(doc.x)}
            </text>
            <MathLine x={30} y={330} size={26} color={defined ? C.d : C.b}>
              {!showValues ? '?' : defined ? `${fmtNum(N(doc.x))} : ${fmtNum(dx)} = ${dec(val, 3)}` : 'Mẫu bằng 0 → phân thức không xác định'}
            </MathLine>
            {F.simp && (
              <g>
                <text x={30} y={400} fontSize={20} fontWeight={800} fill="var(--muted)">
                  Rút gọn
                </text>
                <MathLine x={30} y={440} size={24} color={C.c}>
                  {showValues ? `= ${F.simp.text}` : '= ?'}
                </MathLine>
                {showValues && F.simp.why && (
                  <foreignObject x={30} y={460} width={420} height={130}>
                    <div className="small" style={{ fontWeight: 600, color: 'var(--ink-2)' }}>
                      {F.simp.why}
                    </div>
                  </foreignObject>
                )}
              </g>
            )}
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Phân thức đại số</h3>
        {doc.list.length > 1 && (
          <Row label="Chọn phân thức">
            <Seg value={doc.sel} options={doc.list} onChange={(v) => onDoc({ ...doc, sel: v })} fmtOpt={(k) => FRACS[k].label} />
          </Row>
        )}
        <Row label="x =">
          <Slider value={doc.x} min={-6} max={6} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, x: v })} />
        </Row>
        {F.simp && <Toggle value={!!doc.showSimp} onChange={(v) => onDoc({ ...doc, showSimp: v })} label="Vẽ thêm đồ thị phân thức đã rút gọn (xanh lá)" />}
        <MiniTable
          head={['x', 'Tử', 'Mẫu', 'Giá trị']}
          rows={[-2, -1, 0, 1, 2, 3].map((x) => {
            const d = D(x);
            return [fmtNum(x), fmtNum(N(x)), fmtNum(d), showValues ? (Math.abs(d) < 1e-9 ? 'không xác định' : dec(N(x) / d, 2)) : '?'];
          })}
        />
        <p className="small muted">Đường đứt nét đỏ: các giá trị làm mẫu bằng 0. Vòng tròn rỗng: điểm bị “khoét” – phân thức ban đầu không xác định tại đó dù phân thức rút gọn vẫn có giá trị.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Trình bày lời giải từng bước (biến đổi, giải phương trình, chứng minh…)
// =====================================================================

export interface DeriveDoc {
  mode: 'derive';
  set: string;
  step: number;
}

export function DeriveView({ doc, onDoc, showValues }: EngineProps<DeriveDoc, unknown>) {
  const d = DERIVE[doc.set];
  const n = d.lines.length;
  const step = Math.min(doc.step, n);
  const lh = Math.min(64, 470 / Math.max(1, n));
  const size = lh >= 56 ? 32 : lh >= 46 ? 28 : 24;
  const cur = step > 0 ? d.lines[step - 1] : null;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <text x={600} y={40} textAnchor="middle" className="lab-label">
            {d.title}
          </text>
          <rect x={40} y={60} width={1120} height={590} rx={22} fill="var(--surface)" stroke="var(--line)" />
          {d.given && (
            <foreignObject x={70} y={72} width={1060} height={96}>
              <div className="derive-given">{d.given}</div>
            </foreignObject>
          )}
          {d.lines.map((l, i) => {
            const y = (d.given ? 200 : 120) + i * lh;
            const vis = i < step;
            const on = i === step - 1;
            return (
              <g key={i}>
                {on && <rect x={56} y={y - lh * 0.72} width={1088} height={lh * 0.92} rx={10} fill="var(--accent-soft)" />}
                <MathLine x={80} y={y} size={size} color={vis ? (l.hl ? 'var(--accent)' : 'var(--ink)') : 'var(--line)'}>
                  {vis ? l.e : '…'}
                </MathLine>
                {vis && l.tag && (
                  <text x={1130} y={y} textAnchor="end" fontSize={18} fontWeight={700} fill="var(--muted)">
                    {l.tag}
                  </text>
                )}
              </g>
            );
          })}
          {step >= n && d.answer && showValues && (
            <text x={600} y={630} textAnchor="middle" fontSize={26} fontWeight={900} fill={C.c}>
              {d.answer}
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{d.title}</h3>
        <StepButtons step={step} max={n} onStep={(s) => onDoc({ ...doc, step: s })} />
        <div className="insp-actions">
          <button className="btn" onClick={() => onDoc({ ...doc, step: n })}>
            Hiện toàn bộ lời giải
          </button>
        </div>
        <p className="small muted">
          Bước {step}/{n}
        </p>
        {cur?.why && (
          <div className="insp-row">
            <div className="insp-label">Giải thích bước này</div>
            <p>{cur.why}</p>
          </div>
        )}
        {d.note && <p className="small muted">{d.note}</p>}
      </aside>
    </div>
  );
}

