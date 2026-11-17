// Dữ liệu và biểu đồ (Toán 8 Chương V): chuyển đổi bảng ↔ biểu đồ cột, cột kép, hình quạt tròn,
// đoạn thẳng, biểu đồ tranh; biểu đồ gây hiểu lầm (trục không bắt đầu từ 0); phát hiện dữ liệu không hợp lí.
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider } from '../../ui/controls';
import { C, VH, VW } from './mcommon';
import { dec } from './poly';
import { CHARTS, DATAFIX } from './mathData';

export type ChartKind = 'table' | 'bar' | 'bar2' | 'pie' | 'line' | 'picto';
const KIND_NAME: Record<ChartKind, string> = { table: 'Bảng', bar: 'Cột', bar2: 'Cột kép', pie: 'Quạt tròn', line: 'Đoạn thẳng', picto: 'Tranh' };

export interface ChartDoc {
  mode: 'chart';
  set: string;
  kind: ChartKind;
  kinds?: ChartKind[];
  /** Giá trị đã chỉnh (series × cats) */
  vals?: number[][];
  edit?: boolean;
  /** Trục đứng bắt đầu từ giá trị này (minh hoạ biểu đồ gây hiểu lầm) */
  axisFrom?: number;
}

function niceMax(v: number) {
  const p = Math.pow(10, Math.floor(Math.log10(Math.max(v, 1e-9))));
  for (const m of [1, 2, 2.5, 5, 10]) if (m * p >= v) return m * p;
  return 10 * p;
}

export function ChartView({ doc, onDoc, showValues }: EngineProps<ChartDoc, unknown>) {
  const set = CHARTS[doc.set];
  const vals = doc.vals ?? set.series.map((s) => s.vals);
  const nC = set.cats.length;
  const nS = set.series.length;
  const box = { x: 120, y: 90, w: 960, h: 470 };
  const lo = doc.axisFrom ?? 0;
  const maxV = niceMax(Math.max(...vals.flat()) * 1.05);
  const Y = (v: number) => box.y + box.h - ((v - lo) / (maxV - lo)) * box.h;
  const ticks = Array.from({ length: 6 }, (_, i) => lo + ((maxV - lo) * i) / 5);
  const lab = (v: number) => (showValues ? dec(v, 1) : '?');
  const axes = (
    <g>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={box.x} x2={box.x + box.w} y1={Y(t)} y2={Y(t)} stroke="var(--line)" />
          <text x={box.x - 10} y={Y(t) + 6} textAnchor="end" className="tick-small">
            {dec(t, 1)}
          </text>
        </g>
      ))}
      <line x1={box.x} x2={box.x} y1={box.y - 20} y2={box.y + box.h} stroke="var(--ink)" strokeWidth={2.5} />
      <line x1={box.x} x2={box.x + box.w + 10} y1={box.y + box.h} y2={box.y + box.h} stroke="var(--ink)" strokeWidth={2.5} />
      <text x={box.x} y={box.y - 30} textAnchor="middle" fontSize={17} fontWeight={800} fill="var(--ink-2)">
        {set.unit}
      </text>
      {lo > 0 && (
        <text x={box.x + 10} y={box.y + box.h - 8} fontSize={16} fontWeight={800} fill={C.b}>
          ⚠ trục đứng bắt đầu từ {dec(lo, 1)}
        </text>
      )}
    </g>
  );
  const cw = box.w / nC;
  let body: React.ReactNode = null;
  if (doc.kind === 'table') {
    body = (
      <foreignObject x={60} y={90} width={1080} height={520}>
        <table className="cmp-table">
          <thead>
            <tr>
              <th>{set.catName}</th>
              {set.cats.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {set.series.map((s, i) => (
              <tr key={s.name}>
                <th>{s.name}</th>
                {vals[i].map((v, j) => (
                  <td key={j}>{lab(v)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </foreignObject>
    );
  } else if (doc.kind === 'bar' || doc.kind === 'bar2') {
    const series = doc.kind === 'bar' ? [0] : vals.map((_, i) => i);
    const bw = (cw * 0.7) / series.length;
    body = (
      <g>
        {axes}
        {set.cats.map((c, j) => (
          <g key={c}>
            {series.map((si, k) => {
              const v = vals[si][j];
              const x = box.x + j * cw + cw * 0.15 + k * bw;
              const y = Y(Math.max(v, lo));
              return (
                <g key={si}>
                  <rect x={x} y={y} width={bw - 4} height={box.y + box.h - y} fill={C.solid[(doc.kind === 'bar' ? j % 1 : si) % C.solid.length]} rx={4} />
                  <text x={x + (bw - 4) / 2} y={y - 8} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--ink)">
                    {lab(v)}
                  </text>
                </g>
              );
            })}
            <text x={box.x + j * cw + cw / 2} y={box.y + box.h + 26} textAnchor="middle" fontSize={nC > 8 ? 13 : 16} fontWeight={700} fill="var(--ink)">
              {c}
            </text>
          </g>
        ))}
      </g>
    );
  } else if (doc.kind === 'line') {
    body = (
      <g>
        {axes}
        {set.cats.map((c, j) => (
          <text key={c} x={box.x + j * cw + cw / 2} y={box.y + box.h + 26} textAnchor="middle" fontSize={nC > 8 ? 13 : 16} fontWeight={700} fill="var(--ink)">
            {c}
          </text>
        ))}
        {vals.map((sv, si) => (
          <g key={si}>
            <polyline points={sv.map((v, j) => `${box.x + j * cw + cw / 2},${Y(v)}`).join(' ')} fill="none" stroke={C.solid[si]} strokeWidth={4} />
            {sv.map((v, j) => (
              <g key={j}>
                <circle cx={box.x + j * cw + cw / 2} cy={Y(v)} r={7} fill={C.solid[si]} stroke="#fff" strokeWidth={2} />
                <text x={box.x + j * cw + cw / 2} y={Y(v) - 14} textAnchor="middle" fontSize={15} fontWeight={800} fill={C.solid[si]}>
                  {lab(v)}
                </text>
              </g>
            ))}
          </g>
        ))}
      </g>
    );
  } else if (doc.kind === 'pie') {
    const v = vals[0];
    const tot = v.reduce((s, x) => s + x, 0) || 1;
    let a0 = -90;
    const cx = 380;
    const cy = 350;
    const R = 240;
    body = (
      <g>
        {v.map((x, j) => {
          const a1 = a0 + (360 * x) / tot;
          const p = (a: number, r = R) => ({ x: cx + r * Math.cos((a * Math.PI) / 180), y: cy + r * Math.sin((a * Math.PI) / 180) });
          const s = p(a0);
          const e = p(a1);
          const m = p((a0 + a1) / 2, R * 0.66);
          const d = x >= tot - 1e-9 ? `M ${cx - R} ${cy} A ${R} ${R} 0 1 1 ${cx + R} ${cy} A ${R} ${R} 0 1 1 ${cx - R} ${cy}` : `M ${cx} ${cy} L ${s.x} ${s.y} A ${R} ${R} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${e.x} ${e.y} Z`;
          a0 = a1;
          return (
            <g key={j}>
              <path d={d} fill={C.solid[j % C.solid.length]} stroke="#fff" strokeWidth={3} />
              {x / tot > 0.04 && (
                <text x={m.x} y={m.y + 7} textAnchor="middle" fontSize={20} fontWeight={900} fill="#fff" stroke="rgba(0,0,0,0.35)" strokeWidth={3} paintOrder="stroke">
                  {showValues ? `${dec((100 * x) / tot, 1)}%` : '?'}
                </text>
              )}
            </g>
          );
        })}
        {set.cats.map((c, j) => (
          <g key={c} transform={`translate(720 ${130 + j * 46})`}>
            <rect width={28} height={28} rx={6} fill={C.solid[j % C.solid.length]} />
            <text x={40} y={22} fontSize={20} fontWeight={700} fill="var(--ink)">
              {c}
            </text>
          </g>
        ))}
      </g>
    );
  } else {
    // biểu đồ tranh
    const u = set.picUnit ?? 1;
    body = (
      <g>
        {set.cats.map((c, j) => {
          const n = vals[0][j] / u;
          const full = Math.floor(n + 1e-9);
          const part = n - full;
          return (
            <g key={c} transform={`translate(80 ${110 + j * Math.min(80, 460 / nC)})`}>
              <text x={150} y={34} textAnchor="end" fontSize={20} fontWeight={800} fill="var(--ink)">
                {c}
              </text>
              {Array.from({ length: full }, (_, k) => (
                <text key={k} x={175 + k * 52} y={40} fontSize={40}>
                  {set.icon ?? '●'}
                </text>
              ))}
              {part > 0.01 && (
                <g>
                  <clipPath id={`pc${j}`}>
                    <rect x={175 + full * 52} y={0} width={46 * part} height={60} />
                  </clipPath>
                  <text x={175 + full * 52} y={40} fontSize={40} clipPath={`url(#pc${j})`}>
                    {set.icon ?? '●'}
                  </text>
                </g>
              )}
            </g>
          );
        })}
        <text x={1120} y={640} textAnchor="end" fontSize={20} fontWeight={800} fill="var(--ink-2)">
          {set.icon ?? '●'} = {u} {set.unit}
        </text>
      </g>
    );
  }
  const kinds = doc.kinds ?? [doc.kind];
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <text x={600} y={40} textAnchor="middle" className="lab-label">
            {set.title}
          </text>
          {nS > 1 && doc.kind !== 'table' && doc.kind !== 'bar' && doc.kind !== 'pie' && doc.kind !== 'picto' && (
            <g>
              {set.series.map((s, i) => (
                <g key={s.name} transform={`translate(${760 + i * 200} 56)`}>
                  <rect width={22} height={22} rx={4} fill={C.solid[i]} />
                  <text x={30} y={18} fontSize={17} fontWeight={700} fill="var(--ink)">
                    {s.name}
                  </text>
                </g>
              ))}
            </g>
          )}
          {body}
          {set.source && (
            <text x={1160} y={VH - 10} textAnchor="end" fontSize={14} fill="var(--muted)">
              {set.source}
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Biểu diễn dữ liệu</h3>
        {kinds.length > 1 && (
          <Row label="Dạng biểu diễn">
            <Seg value={doc.kind} options={kinds} onChange={(k) => onDoc({ ...doc, kind: k })} fmtOpt={(k) => KIND_NAME[k]} />
          </Row>
        )}
        {doc.axisFrom !== undefined && (
          <Row label="Trục đứng bắt đầu từ">
            <Slider value={doc.axisFrom} min={0} max={Math.floor(Math.min(...vals[0]) * 0.95)} step={1} digits={0} onChange={(v) => onDoc({ ...doc, axisFrom: v })} />
          </Row>
        )}
        {doc.edit && (
          <div className="insp-row">
            <div className="insp-label">Sửa số liệu ({set.series[0].name})</div>
            {set.cats.map((c, j) => (
              <div key={c} className="num-edit">
                <span>{c}</span>
                <button className="btn small-btn" onClick={() => onDoc({ ...doc, vals: vals.map((s, i) => (i === 0 ? s.map((v, k) => (k === j ? Math.max(0, v - (set.stepEdit ?? 1)) : v)) : s)) })}>
                  −
                </button>
                <b>{dec(vals[0][j], 1)}</b>
                <button className="btn small-btn" onClick={() => onDoc({ ...doc, vals: vals.map((s, i) => (i === 0 ? s.map((v, k) => (k === j ? v + (set.stepEdit ?? 1) : v)) : s)) })}>
                  +
                </button>
              </div>
            ))}
          </div>
        )}
        {set.note && <p className="small muted">{set.note}</p>}
      </aside>
    </div>
  );
}

// =====================================================================
// Phát hiện dữ liệu không hợp lí
// =====================================================================

export interface DataFixDoc {
  mode: 'datafix';
  set: string;
  flagged: number[];
  checked?: boolean;
}

export function DataFixView({ doc, onDoc, showValues }: EngineProps<DataFixDoc, unknown>) {
  const s = DATAFIX[doc.set];
  const reveal = doc.checked || showValues;
  const toggle = (i: number) => onDoc({ ...doc, flagged: doc.flagged.includes(i) ? doc.flagged.filter((x) => x !== i) : [...doc.flagged, i], checked: false });
  const right = s.rows.filter((_, i) => s.bad.includes(i) === doc.flagged.includes(i)).length;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg" style={{ overflow: 'auto' }}>
        <div className="html-table-wrap">
          <h2>{s.title}</h2>
          <p style={{ fontWeight: 600 }}>{s.intro}</p>
          <table className="cmp-table">
            <thead>
              <tr>
                {s.head.map((h) => (
                  <th key={h}>{h}</th>
                ))}
                <th>Hợp lí?</th>
              </tr>
            </thead>
            <tbody>
              {s.rows.map((r, i) => {
                const fl = doc.flagged.includes(i);
                const bad = s.bad.includes(i);
                return (
                  <tr key={i} onClick={() => toggle(i)} style={{ cursor: 'pointer', background: fl ? 'rgba(225,29,72,0.12)' : undefined }}>
                    {r.map((c, j) => (
                      <td key={j}>{c}</td>
                    ))}
                    <td style={{ fontWeight: 800, color: reveal ? (bad ? C.b : C.c) : 'var(--muted)' }}>
                      {fl ? '✗ ' : ''}
                      {reveal ? (bad ? `Không – ${s.why[i] ?? ''}` : 'Có') : fl ? 'Bị đánh dấu' : ''}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <aside className="eng-side">
        <h3>Dữ liệu có hợp lí không?</h3>
        <p className="small">Bấm vào các dòng có dữ liệu không hợp lí để đánh dấu, rồi bấm “Kiểm tra”.</p>
        <div className="insp-actions">
          <button className="btn primary" onClick={() => onDoc({ ...doc, checked: true })}>
            Kiểm tra
          </button>
          <button className="btn" onClick={() => onDoc({ ...doc, flagged: [], checked: false })}>
            Làm lại
          </button>
        </div>
        {reveal && (
          <div className="insp-values">
            <div style={{ gridColumn: 'span 3' }}>
              <span>Kết quả</span>
              <b>
                {right}/{s.rows.length} dòng đánh giá đúng
              </b>
            </div>
          </div>
        )}
        {s.hint && <p className="small muted">{s.hint}</p>}
      </aside>
    </div>
  );
}
