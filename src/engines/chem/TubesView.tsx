// Bàn ống nghiệm: chọn hoá chất/dụng cụ trên giá rồi bấm vào ống nghiệm để thực hiện thí nghiệm.
import { useEffect, useMemo, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { SUBS, TOOLS, isLiquid, liquidColor, runTube } from './data';
import { Burner, Dropper, GlassDefs, Magnet, Vessel, VesselKind, geomOf } from './glass';

export interface TubeSpec {
  label?: string;
  vessel?: VesselKind;
  init: string[];
  events: string[];
  /** Ẩn tên chất ban đầu (bài tập nhận biết) */
  mystery?: boolean;
}

export interface TubesDoc {
  mode: 'tubes';
  tubes: TubeSpec[];
  /** Hoá chất và dụng cụ trên giá */
  shelf: string[];
  /** Phòng lab tự do: được thêm/bớt ống nghiệm */
  free?: boolean;
}

/** Toàn bộ hoá chất trên giá của phòng lab tự do */
export const FULL_SHELF = [
  'h2o', 'hcl', 'h2so4', 'hno3', 'ch3cooh', 'naoh', 'caoh2', 'cuso4', 'bacl2', 'na2so4', 'agno3', 'nacl', 'kcl', 'na2co3', 'cano32', 'feso4', 'h2o2',
  'c2h5oh', 'h2so4dac', 'glucose', 'saccharose', 'tollens', 'tinhbot', 'iot', 'br2', 'longtrang', 'mau',
  'zn', 'fe', 'cu', 'mg', 'al', 'ag', 'na', 'ca', 'caco3', 'cuo', 'mno2', 'fesmix', 'than', 'co2', 'c2h4', 'ch4', 'quy', 'phenol',
  '@heat', '@strong', '@fire', '@magnet',
];

const tubeName = (t: TubeSpec, i: number) => `(${i + 1})${t.label ? ' ' + t.label : ''}`;

function swatch(id: string): string {
  const d = SUBS[id];
  if (!d) return 'transparent';
  if (d.kind === 'ind') return id === 'quy' ? '#8a55b8' : '#f5f5f5';
  if (d.kind === 'gas') return '#e6f2ff';
  if (d.kind === 'solid') return d.color ?? '#999';
  return d.color ?? 'rgba(190,225,250,0.8)';
}

export function TubesView({ doc, onDoc, showValues }: EngineProps<TubesDoc, unknown>) {
  const [sel, setSel] = useState<string>(doc.shelf[0] ?? 'h2o');
  const [cur, setCur] = useState(0);
  const [anim, setAnim] = useState<{ i: number; id: string; k: number } | null>(null);

  useEffect(() => {
    if (!doc.shelf.includes(sel)) setSel(doc.shelf[0]);
    if (cur >= doc.tubes.length) setCur(0);
  }, [doc, sel, cur]);

  useEffect(() => {
    if (!anim) return;
    const t = window.setTimeout(() => setAnim(null), 1100);
    return () => window.clearTimeout(t);
  }, [anim]);

  const states = useMemo(() => doc.tubes.map((t) => runTube(t.init, t.events)), [doc.tubes]);
  const n = doc.tubes.length;
  const spacing = Math.min(200, 1080 / Math.max(1, n));

  const addTo = (i: number) => {
    setCur(i);
    const tubes = doc.tubes.map((t, k) => (k === i ? { ...t, events: [...t.events, sel] } : t));
    onDoc({ ...doc, tubes });
    setAnim({ i, id: sel, k: Date.now() });
  };

  const st = states[cur];
  const tube = doc.tubes[cur];
  const added = tube ? [...(tube.mystery && !showValues ? ['?'] : tube.init), ...tube.events.filter((e) => !e.startsWith('@'))] : [];

  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <GlassDefs />
          <rect x={0} y={600} width={1200} height={80} className="lab-table" />
          {doc.tubes.map((t, i) => {
            const x = 600 + (i - (n - 1) / 2) * spacing;
            const kind = t.vessel ?? 'tube';
            const g = geomOf(kind, x, 150);
            const s = states[i];
            const showBurner = s.heated || s.strong || doc.shelf.includes('@heat') || doc.shelf.includes('@strong');
            const bottom = g.top + g.h;
            return (
              <g key={i}>
                {kind === 'tube' && (
                  <g>
                    <rect x={x - 50} y={g.top + 74} width={8} height={600 - g.top - 74} fill="#a07443" />
                    <rect x={x + 42} y={g.top + 74} width={8} height={600 - g.top - 74} fill="#a07443" />
                    <rect x={x - 56} y={g.top + 66} width={112} height={14} rx={4} fill="#b88b55" />
                    {!showBurner && <rect x={x - 56} y={bottom - 40} width={112} height={10} rx={3} fill="#b88b55" />}
                  </g>
                )}
                {kind === 'beaker' && <rect x={x - 120} y={bottom} width={240} height={10} rx={3} fill="#b88b55" />}
                {kind === 'dish' && <rect x={x - 60} y={bottom - 2} width={120} height={12} rx={3} fill="#cfc6b8" />}
                {showBurner && kind !== 'beaker' && <Burner x={x} y={bottom + (kind === 'dish' ? 100 : 80)} on={s.heated || s.strong} />}
                <Vessel g={g} st={s} label={tubeName(t, i)} onClick={() => addTo(i)} selected={i === cur}>
                  {s.magnet && <Magnet x={x + g.w / 2 + 8} y={g.top + g.h - 50} />}
                </Vessel>
                {anim && anim.i === i && !anim.id.startsWith('@') && <Dropper key={anim.k} x={x} y={g.top - 10} color={isLiquid(anim.id) ? liquidColor([anim.id]) : SUBS[anim.id]?.kind === 'gas' ? 'rgba(200,220,255,0.9)' : swatch(anim.id)} />}
              </g>
            );
          })}
          <text x={600} y={60} textAnchor="middle" className="lab-small">
            Chọn hoá chất hoặc dụng cụ ở bảng bên phải, rồi bấm vào ống nghiệm
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Giá hoá chất</h3>
        <div className="shelf">
          {doc.shelf.map((id) => {
            const tool = TOOLS[id];
            const d = SUBS[id];
            return (
              <button key={id} className={`shelf-item ${sel === id ? 'on' : ''}`} onClick={() => setSel(id)} title={tool ? tool.name : d?.name}>
                <span className="sw" style={{ background: tool ? 'var(--surface-2)' : swatch(id) }}>
                  {tool ? (id === '@heat' || id === '@strong' ? '🔥' : id === '@fire' ? '🕯' : '🧲') : ''}
                </span>
                <span className="sh-f">{tool ? tool.short : d?.f}</span>
              </button>
            );
          })}
        </div>
        <p className="small muted">Đang chọn: {TOOLS[sel]?.name ?? SUBS[sel]?.name}</p>
        {tube && st && (
          <div className="insp-row">
            <div className="insp-label">Ống nghiệm {tubeName(tube, cur)}</div>
            <p className="small">
              <b>Đã cho vào:</b> {added.length ? added.map((a) => SUBS[a]?.f ?? a).join(', ') : 'chưa có gì'}
            </p>
            <div className="obs-log">
              {st.log.length === 0 && <p className="small muted">Bấm vào ống nghiệm để thêm chất đang chọn.</p>}
              {st.log
                .slice()
                .reverse()
                .slice(0, 4)
                .map((l, k) => (
                  <div key={k} className={`obs ${l.reacted ? 'yes' : ''}`}>
                    <div className="obs-add">+ {TOOLS[l.add]?.short ?? SUBS[l.add]?.f ?? l.add}</div>
                    {showValues ? (
                      <>
                        <div>{l.obs}</div>
                        {l.eq && <div className="obs-eq">{l.eq}</div>}
                      </>
                    ) : (
                      <div className="muted">? Quan sát và dự đoán hiện tượng, viết phương trình hoá học.</div>
                    )}
                  </div>
                ))}
            </div>
            <div className="insp-actions">
              <button
                className="btn"
                onClick={() => onDoc({ ...doc, tubes: doc.tubes.map((t, k) => (k === cur ? { ...t, events: [] } : t)) })}
              >
                Làm lại ống này
              </button>
              {doc.free && (
                <>
                  <button className="btn" disabled={n >= 6} onClick={() => onDoc({ ...doc, tubes: [...doc.tubes, { init: [], events: [] }] })}>
                    + Thêm ống
                  </button>
                  <button
                    className="btn"
                    disabled={n <= 1}
                    onClick={() => {
                      onDoc({ ...doc, tubes: doc.tubes.filter((_, k) => k !== cur) });
                      setCur(0);
                    }}
                  >
                    Bỏ ống
                  </button>
                  <button className="btn" onClick={() => onDoc({ ...doc, tubes: doc.tubes.map((t, k) => (k === cur ? { ...t, vessel: t.vessel === 'tube' || !t.vessel ? 'beaker' : t.vessel === 'beaker' ? 'dish' : 'tube' } : t)) })}>
                    Đổi vật chứa
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
