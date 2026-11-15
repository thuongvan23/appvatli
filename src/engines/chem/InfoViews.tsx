// Thẻ thông tin và quy trình từng bước (dữ liệu trong infoData.ts).
import type { EngineProps } from '../../core/types';
import { CARD_SETS, STEP_SETS } from './infoData';
import { Glyph } from './glyphs';

export interface CardsDoc {
  mode: 'cards';
  set: string;
  sel: number;
}

export function CardsView({ doc, onDoc }: EngineProps<CardsDoc, unknown>) {
  const set = CARD_SETS[doc.set];
  const n = set.cards.length;
  const cols = n <= 4 ? n : n <= 6 ? 3 : n <= 8 ? 4 : n <= 9 ? 3 : 4;
  const rows = Math.ceil(n / cols);
  const cw = 1140 / cols;
  const ch = Math.min(220, 600 / rows);
  const c = set.cards[Math.min(doc.sel, n - 1)];
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <text x={600} y={44} textAnchor="middle" className="lab-label">
            {set.title}
          </text>
          {set.cards.map((card, i) => {
            const x = 30 + (i % cols) * cw + cw / 2;
            const y = 70 + Math.floor(i / cols) * ch;
            const on = i === doc.sel;
            const s = Math.min(1, (ch - 70) / 100);
            return (
              <g key={i} className="draggable" onPointerDown={() => onDoc({ ...doc, sel: i })}>
                <rect x={x - cw / 2 + 8} y={y} width={cw - 16} height={ch - 12} rx={16} fill={on ? 'var(--accent-soft)' : 'var(--surface)'} stroke={on ? 'var(--accent)' : 'var(--line)'} strokeWidth={on ? 3 : 1.5} />
                <g transform={`translate(${x} ${y + (ch - 12) / 2 - 16}) scale(${s})`}>
                  <Glyph name={card.icon} />
                </g>
                <foreignObject x={x - cw / 2 + 12} y={y + ch - 62} width={cw - 24} height={48}>
                  <div className="svg-cap">{card.name}</div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{c.name}</h3>
        {c.f && <div className="tag big-f">{c.f}</div>}
        <div className="insp-row">
          <div className="insp-label">Đặc điểm, công dụng</div>
          <p>{c.use}</p>
        </div>
        {c.note && (
          <div className="insp-row">
            <div className="insp-label">{set.noteLabel ?? 'Lưu ý'}</div>
            <p>{c.note}</p>
          </div>
        )}
        <div className="insp-actions">
          <button className="btn" disabled={doc.sel <= 0} onClick={() => onDoc({ ...doc, sel: doc.sel - 1 })}>
            ← Trước
          </button>
          <button className="btn primary" disabled={doc.sel >= n - 1} onClick={() => onDoc({ ...doc, sel: doc.sel + 1 })}>
            Tiếp →
          </button>
        </div>
        <p className="small muted">Bấm vào từng thẻ để xem chi tiết.</p>
      </aside>
    </div>
  );
}

export interface StepsDoc {
  mode: 'steps';
  set: string;
  step: number;
}

export function StepsView({ doc, onDoc, showValues }: EngineProps<StepsDoc, unknown>) {
  const set = STEP_SETS[doc.set];
  const n = set.steps.length;
  const s = set.steps[Math.min(doc.step, n - 1)];
  const w = 1120 / n;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <text x={600} y={44} textAnchor="middle" className="lab-label">
            {set.title}
          </text>
          {set.steps.map((st, i) => {
            const x = 40 + i * w + w / 2;
            const on = i === doc.step;
            const done = i < doc.step;
            return (
              <g key={i} className="draggable" onPointerDown={() => onDoc({ ...doc, step: i })}>
                {i < n - 1 && <line x1={x + 40} y1={110} x2={x + w - 40} y2={110} stroke={done ? 'var(--accent)' : 'var(--line)'} strokeWidth={4} />}
                <circle cx={x} cy={110} r={34} fill={on ? 'var(--accent)' : done ? 'var(--accent-soft)' : 'var(--surface)'} stroke="var(--accent)" strokeWidth={3} />
                <text x={x} y={120} textAnchor="middle" fontSize={26} fontWeight={900} fill={on ? '#fff' : 'var(--accent)'}>
                  {i + 1}
                </text>
                <foreignObject x={x - w / 2 + 4} y={150} width={w - 8} height={60}>
                  <div className={`svg-cap ${on ? 'on' : ''}`}>{st.t}</div>
                </foreignObject>
              </g>
            );
          })}
          <rect x={60} y={230} width={1080} height={420} rx={20} fill="var(--surface)" stroke="var(--line)" />
          <g transform="translate(250 420) scale(2.4)">
            <Glyph name={s.icon} />
          </g>
          <foreignObject x={440} y={260} width={680} height={370}>
            <div className="step-card">
              <h2>
                {doc.step + 1}. {s.t}
              </h2>
              <p>{s.d}</p>
              {s.eq && <p className="obs-eq">{showValues ? s.eq : 'Phương trình hoá học: ?'}</p>}
            </div>
          </foreignObject>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{set.title}</h3>
        <div className="insp-actions">
          <button className="btn" disabled={doc.step <= 0} onClick={() => onDoc({ ...doc, step: doc.step - 1 })}>
            ← Bước trước
          </button>
          <button className="btn primary" disabled={doc.step >= n - 1} onClick={() => onDoc({ ...doc, step: doc.step + 1 })}>
            Bước tiếp →
          </button>
        </div>
        <ol className="small step-list">
          {set.steps.map((st, i) => (
            <li key={i} className={i === doc.step ? 'on' : ''} onClick={() => onDoc({ ...doc, step: i })}>
              {st.t}
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
