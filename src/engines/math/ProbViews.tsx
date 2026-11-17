// Xác suất Toán 8 (Chương VIII): kết quả có thể, kết quả thuận lợi, xác suất bằng tỉ số;
// xác suất thực nghiệm – làm lại phép thử nhiều lần và quan sát tần số tương đối dần ổn định.
import type { EngineProps } from '../../core/types';
import { Row, Seg } from '../../ui/controls';
import { C, VH, VW } from './mcommon';
import { dec } from './poly';
import { EXPS, Exp } from './mathData';

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}
export const fracStr = (p: number, q: number) => {
  const g = gcd(p, q) || 1;
  return `${p / g}/${q / g}`;
};

/** Hình minh hoạ phép thử */
function Apparatus({ e, x, y, pick }: { e: Exp; x: number; y: number; pick?: number }) {
  if (e.pic === 'coin' || e.pic === 'coin2') {
    const n = e.pic === 'coin2' ? 2 : 1;
    return (
      <g>
        {Array.from({ length: n }, (_, i) => (
          <g key={i} transform={`translate(${x + i * 120} ${y})`}>
            <circle r={48} fill="#facc15" stroke="#a16207" strokeWidth={4} />
            <circle r={36} fill="none" stroke="#a16207" strokeWidth={2} />
            <text y={12} textAnchor="middle" fontSize={34} fontWeight={900} fill="#713f12">
              {pick !== undefined ? (e.outcomes[pick][i] ?? 'S') : i ? 'N' : 'S'}
            </text>
          </g>
        ))}
      </g>
    );
  }
  if (e.pic === 'die' || e.pic === 'die2') {
    const n = e.pic === 'die2' ? 2 : 1;
    const pips: Record<number, [number, number][]> = {
      1: [[0, 0]],
      2: [[-1, -1], [1, 1]],
      3: [[-1, -1], [0, 0], [1, 1]],
      4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
      5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
      6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
    };
    const faces = pick !== undefined ? (n === 1 ? [pick + 1] : [Math.floor(pick / 6) + 1, (pick % 6) + 1]) : n === 1 ? [5] : [3, 6];
    return (
      <g>
        {faces.map((f, i) => (
          <g key={i} transform={`translate(${x + i * 120} ${y})`}>
            <rect x={-46} y={-46} width={92} height={92} rx={16} fill={i ? '#fee2e2' : '#fff'} stroke="#334155" strokeWidth={4} />
            {pips[f].map(([a, b], k) => (
              <circle key={k} cx={a * 24} cy={b * 24} r={8} fill={f === 1 ? '#dc2626' : '#111827'} />
            ))}
          </g>
        ))}
      </g>
    );
  }
  if (e.pic === 'spinner') {
    const n = e.outcomes.length;
    const R = 80;
    const cols = e.colors ?? C.solid;
    const ang = pick !== undefined ? -90 + (360 * (pick + 0.5)) / n : 20;
    return (
      <g transform={`translate(${x + 40} ${y})`}>
        {e.outcomes.map((o, i) => {
          const a0 = (-90 + (360 * i) / n) * (Math.PI / 180);
          const a1 = (-90 + (360 * (i + 1)) / n) * (Math.PI / 180);
          const m = (a0 + a1) / 2;
          return (
            <g key={i}>
              <path d={`M 0 0 L ${R * Math.cos(a0)} ${R * Math.sin(a0)} A ${R} ${R} 0 0 1 ${R * Math.cos(a1)} ${R * Math.sin(a1)} Z`} fill={cols[i % cols.length]} stroke="#fff" strokeWidth={2} />
              <text x={R * 0.62 * Math.cos(m)} y={R * 0.62 * Math.sin(m) + 6} textAnchor="middle" fontSize={16} fontWeight={900} fill="#fff">
                {o.length <= 3 ? o : i + 1}
              </text>
            </g>
          );
        })}
        <line x1={0} y1={0} x2={(R - 10) * Math.cos((ang * Math.PI) / 180)} y2={(R - 10) * Math.sin((ang * Math.PI) / 180)} stroke="#111827" strokeWidth={5} strokeLinecap="round" />
        <circle r={8} fill="#111827" />
      </g>
    );
  }
  if (e.pic === 'bag') {
    const n = e.outcomes.length;
    const cols = e.colors ?? C.solid;
    return (
      <g transform={`translate(${x + 40} ${y})`}>
        <path d="M -90 -40 Q -110 90 0 95 Q 110 90 90 -40 Z" fill="#d6b88a" stroke="#7c5a2a" strokeWidth={4} />
        <path d="M -70 -40 Q 0 -70 70 -40" fill="none" stroke="#7c5a2a" strokeWidth={4} />
        {e.hidden ? (
          <text y={40} textAnchor="middle" fontSize={44} fontWeight={900} fill="#7c5a2a">
            ?
          </text>
        ) : (
          e.outcomes.map((_, i) => <circle key={i} cx={-60 + (i % 6) * 24} cy={-10 + Math.floor(i / 6) * 26} r={11} fill={cols[i % cols.length]} stroke={pick === i ? '#111' : '#fff'} strokeWidth={pick === i ? 4 : 2} />)
        )}
        {n > 18 && !e.hidden && (
          <text y={120} textAnchor="middle" fontSize={16} fill="var(--muted)">
            ({n} quả)
          </text>
        )}
      </g>
    );
  }
  // cards
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${x - 40 + i * 30} ${y - 10}) rotate(${(i - 1) * 10})`}>
          <rect x={-40} y={-56} width={80} height={112} rx={10} fill="#fff" stroke="#334155" strokeWidth={3} />
          <text y={12} textAnchor="middle" fontSize={34} fontWeight={900} fill={C.a}>
            {pick !== undefined && i === 2 ? e.outcomes[pick] : '?'}
          </text>
        </g>
      ))}
    </g>
  );
}

// =====================================================================
// Kết quả có thể, kết quả thuận lợi, xác suất
// =====================================================================

export interface ProbDoc {
  mode: 'prob';
  exp: string;
  exps?: string[];
  ev: number;
  /** false: chỉ liệt kê kết quả có thể, chưa tô kết quả thuận lợi */
  fav?: boolean;
}

export function ProbView({ doc, onDoc, showValues }: EngineProps<ProbDoc, unknown>) {
  const e = EXPS[doc.exp];
  const ev = e.events[Math.min(doc.ev, e.events.length - 1)];
  const n = e.outcomes.length;
  const fav = e.outcomes.map((o, i) => ev.test(o, i));
  const k = fav.filter(Boolean).length;
  const cols = n > 24 ? 9 : n > 12 ? 6 : Math.min(n, 6);
  const cw = 760 / cols;
  const rows = Math.ceil(n / cols);
  const ch = Math.min(60, 440 / rows);
  const showFav = doc.fav !== false;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <text x={600} y={40} textAnchor="middle" className="lab-label">
            {e.name}
          </text>
          <Apparatus e={e} x={130} y={170} />
          <foreignObject x={40} y={290} width={300} height={200}>
            <div className="small" style={{ fontWeight: 600, color: 'var(--ink-2)' }}>
              {e.desc}
            </div>
          </foreignObject>
          <text x={380} y={90} fontSize={20} fontWeight={800} fill="var(--muted)">
            Tập hợp các kết quả có thể ({showValues ? n : '?'} kết quả)
          </text>
          {e.outcomes.map((o, i) => {
            const x = 380 + (i % cols) * cw;
            const y = 110 + Math.floor(i / cols) * ch;
            const on = showFav && showValues && fav[i];
            return (
              <g key={i}>
                <rect x={x + 3} y={y} width={cw - 6} height={ch - 8} rx={10} fill={on ? (e.colors && e.pic !== 'die2' ? e.colors[i % e.colors.length] : C.c) : 'var(--surface)'} fillOpacity={on ? 0.85 : 1} stroke={on ? C.c : 'var(--line)'} strokeWidth={on ? 3 : 1.5} />
                <text x={x + cw / 2} y={y + (ch - 8) / 2 + 7} textAnchor="middle" fontSize={ch > 50 ? 20 : 15} fontWeight={800} fill={on ? '#fff' : 'var(--ink)'}>
                  {o}
                </text>
              </g>
            );
          })}
          {showFav && (
            <g transform="translate(40 520)">
              <rect width={1120} height={130} rx={18} fill="var(--surface)" stroke="var(--line)" />
              <text x={24} y={44} fontSize={22} fontWeight={800} fill="var(--ink)">
                Biến cố: {ev.name}
              </text>
              <text x={24} y={96} fontSize={26} fontWeight={900} fill={C.c} className="math-text">
                {showValues ? `Số kết quả thuận lợi: ${k}   →   P = ${k}/${n}${gcd(k, n) > 1 && k > 0 ? ` = ${fracStr(k, n)}` : ''} ≈ ${dec(k / n, 3)}` : 'Số kết quả thuận lợi: ?   →   P = ?'}
              </text>
            </g>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Xác suất của biến cố</h3>
        {doc.exps && doc.exps.length > 1 && (
          <Row label="Phép thử">
            <Seg value={doc.exp} options={doc.exps} onChange={(v) => onDoc({ ...doc, exp: v, ev: 0 })} fmtOpt={(k) => EXPS[k].short} />
          </Row>
        )}
        {showFav && (
          <Row label="Biến cố">
            <Seg value={doc.ev} options={e.events.map((_, i) => i)} onChange={(v) => onDoc({ ...doc, ev: v })} fmtOpt={(i) => e.events[i].name} />
          </Row>
        )}
        <p className="small">
          Khi các kết quả có thể là <b>đồng khả năng</b>, xác suất của biến cố A bằng tỉ số giữa số kết quả thuận lợi cho A và tổng số kết quả có thể.
        </p>
        <p className="small muted">Ẩn số đo để học sinh tự liệt kê và đếm trước.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Xác suất thực nghiệm
// =====================================================================

export interface ExperimentDoc {
  mode: 'experiment';
  exp: string;
  ev: number;
  trials: number;
  hits: number;
  /** điểm (số lần thử, tần số tương đối) để vẽ đồ thị */
  pts: [number, number][];
  last?: number;
}

export function ExperimentView({ doc, onDoc, showValues }: EngineProps<ExperimentDoc, unknown>) {
  const e = EXPS[doc.exp];
  const ev = e.events[Math.min(doc.ev, e.events.length - 1)];
  const n = e.outcomes.length;
  const theo = e.outcomes.filter((o, i) => ev.test(o, i)).length / n;
  const run = (m: number) => {
    let { trials, hits } = doc;
    const pts = [...doc.pts];
    let last = doc.last;
    for (let i = 0; i < m; i++) {
      const r = Math.floor(Math.random() * n);
      last = r;
      trials++;
      if (ev.test(e.outcomes[r], r)) hits++;
      if (trials <= 20 || trials % Math.max(1, Math.floor(trials / 60)) === 0) pts.push([trials, hits / trials]);
    }
    onDoc({ ...doc, trials, hits, pts: pts.slice(-400), last });
  };
  const box = { x: 420, y: 90, w: 720, h: 420 };
  const maxN = Math.max(10, doc.trials);
  const logX = (t: number) => box.x + (Math.log10(t) / Math.log10(maxN)) * box.w;
  const Y = (f: number) => box.y + box.h - f * box.h;
  const rel = doc.trials ? doc.hits / doc.trials : 0;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <text x={600} y={40} textAnchor="middle" className="lab-label">
            {e.name} – biến cố: {ev.name}
          </text>
          <Apparatus e={e} x={150} y={180} pick={doc.last} />
          <g transform="translate(40 320)">
            <rect width={340} height={300} rx={18} fill="var(--surface)" stroke="var(--line)" />
            <text x={20} y={46} fontSize={20} fontWeight={800} fill="var(--muted)">
              Số lần thực hiện
            </text>
            <text x={320} y={46} textAnchor="end" fontSize={28} fontWeight={900} fill="var(--ink)">
              {doc.trials}
            </text>
            <text x={20} y={100} fontSize={20} fontWeight={800} fill="var(--muted)">
              Số lần biến cố xảy ra
            </text>
            <text x={320} y={100} textAnchor="end" fontSize={28} fontWeight={900} fill={C.a}>
              {doc.hits}
            </text>
            <text x={20} y={160} fontSize={20} fontWeight={800} fill="var(--muted)">
              Xác suất thực nghiệm
            </text>
            <text x={320} y={200} textAnchor="end" fontSize={30} fontWeight={900} fill={C.b} className="math-text">
              {doc.trials ? `${doc.hits}/${doc.trials} ≈ ${dec(rel, 3)}` : '–'}
            </text>
            <text x={20} y={262} fontSize={20} fontWeight={800} fill="var(--muted)">
              Xác suất (lí thuyết)
            </text>
            <text x={320} y={262} textAnchor="end" fontSize={28} fontWeight={900} fill={C.c}>
              {showValues && !e.hidden ? dec(theo, 3) : '?'}
            </text>
          </g>
          <rect x={box.x} y={box.y} width={box.w} height={box.h} fill="var(--surface)" stroke="var(--line)" />
          {[0, 0.25, 0.5, 0.75, 1].map((f) => (
            <g key={f}>
              <line x1={box.x} x2={box.x + box.w} y1={Y(f)} y2={Y(f)} stroke="var(--line)" />
              <text x={box.x - 8} y={Y(f) + 5} textAnchor="end" className="tick-small">
                {dec(f, 2)}
              </text>
            </g>
          ))}
          {[1, 10, 100, 1000, 10000].filter((t) => t <= maxN).map((t) => (
            <g key={t}>
              <line x1={logX(t)} x2={logX(t)} y1={box.y} y2={box.y + box.h} stroke="var(--line)" />
              <text x={logX(t)} y={box.y + box.h + 22} textAnchor="middle" className="tick-small">
                {t}
              </text>
            </g>
          ))}
          <text x={box.x + box.w} y={box.y + box.h + 46} textAnchor="end" fontSize={16} fontWeight={700} fill="var(--muted)">
            Số lần thực hiện (thang logarit)
          </text>
          {showValues && !e.hidden && <line x1={box.x} x2={box.x + box.w} y1={Y(theo)} y2={Y(theo)} stroke={C.c} strokeWidth={3} strokeDasharray="10 6" />}
          {doc.pts.length > 1 && <polyline points={doc.pts.map(([t, f]) => `${logX(t)},${Y(f)}`).join(' ')} fill="none" stroke={C.b} strokeWidth={3} />}
          {doc.trials > 0 && <circle cx={logX(doc.trials)} cy={Y(rel)} r={7} fill={C.b} />}
          <text x={box.x + 10} y={box.y - 14} fontSize={17} fontWeight={800} fill={C.b}>
            — tần số tương đối (xác suất thực nghiệm)
          </text>
          {showValues && !e.hidden && (
            <text x={box.x + 400} y={box.y - 14} fontSize={17} fontWeight={800} fill={C.c}>
              - - xác suất lí thuyết
            </text>
          )}
          {e.hidden && showValues && (
            <text x={box.x + box.w / 2} y={box.y + box.h + 80} textAnchor="middle" fontSize={20} fontWeight={800} fill={C.e}>
              {e.hidden}
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Làm thí nghiệm</h3>
        <div className="insp-actions">
          {[1, 10, 100, 1000].map((m) => (
            <button key={m} className={`btn ${m === 1 ? 'primary' : ''}`} onClick={() => run(m)}>
              {m === 1 ? 'Thử 1 lần' : `+${m} lần`}
            </button>
          ))}
        </div>
        <div className="insp-actions">
          <button className="btn" onClick={() => onDoc({ ...doc, trials: 0, hits: 0, pts: [], last: undefined })}>
            Làm lại từ đầu
          </button>
        </div>
        {e.events.length > 1 && (
          <Row label="Biến cố">
            <Seg value={doc.ev} options={e.events.map((_, i) => i)} onChange={(v) => onDoc({ ...doc, ev: v, trials: 0, hits: 0, pts: [], last: undefined })} fmtOpt={(i) => e.events[i].name} />
          </Row>
        )}
        <p className="small">Xác suất thực nghiệm = số lần biến cố xảy ra : tổng số lần thực hiện. Khi số lần thực hiện càng lớn, xác suất thực nghiệm càng gần xác suất của biến cố.</p>
      </aside>
    </div>
  );
}
