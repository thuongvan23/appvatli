import { useEffect, useMemo, useRef, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, Toggle, clamp, useSvgDrag } from '../../ui/controls';
import { fmtShort } from '../../core/format';
import { Body, COLOR_HEX, COLOR_NAME, LightColor, MEDIA, Medium, SPECTRUM, Source, SourceColor, bodyPolygon, placeOrbit, trace } from './trace';
import type { OpticsOptions, RaysDoc } from './model';

const VW = 1200;
const VH = 700;

type Sel = { kind: 'source' | 'body' | 'filter' | 'screen'; id: string } | null;

export function RaysView({ doc, onDoc, options, showValues, onMeasure }: EngineProps<RaysDoc, OpticsOptions>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const [sel, setSel] = useState<Sel>(null);
  const [showNormal, setShowNormal] = useState(options.showNormal ?? true);
  const [showAngles, setShowAngles] = useState(options.showAngles ?? true);
  useEffect(() => {
    setShowNormal(options.showNormal ?? true);
    setShowAngles(options.showAngles ?? true);
  }, [options.showNormal, options.showAngles]);

  const sources = useMemo(() => doc.sources.map(placeOrbit), [doc.sources]);
  const result = useMemo(
    () => trace({ sources, bodies: doc.bodies, filters: doc.filters, screens: doc.screens, ambient: doc.ambient, bounds: { x0: 0, y0: 0, x1: VW, y1: VH } }),
    [sources, doc.bodies, doc.filters, doc.screens, doc.ambient],
  );

  // Sự kiện chính: tại tâm bảng chia độ (nếu laze quay quanh tâm), nếu không thì mặt phân cách đầu tiên có góc tới đáng kể
  const orbitSrc = doc.sources.find((s) => s.orbit);
  const firstEvent = orbitSrc?.orbit
    ? [...result.events].sort((a, b) => Math.hypot(a.x - orbitSrc.orbit!.cx, a.y - orbitSrc.orbit!.cy) - Math.hypot(b.x - orbitSrc.orbit!.cx, b.y - orbitSrc.orbit!.cy))[0]
    : result.events.find((e) => e.i > 0.5) ?? result.events[0];
  useEffect(() => {
    if (!onMeasure) return;
    const m: Record<string, number> = {};
    if (firstEvent) {
      m.i = firstEvent.i;
      if (firstEvent.r !== null) m.r = firstEvent.r;
      m.n1 = firstEvent.n1;
      m.n2 = firstEvent.n2;
    }
    const s0 = doc.sources[0];
    if (s0?.orbit) m.iSet = s0.orbit.i;
    onMeasure(m);
  }, [firstEvent, onMeasure, doc.sources]);

  const editable = !!options.editable;
  const patchSource = (id: string, p: Partial<Source>) => onDoc({ ...doc, sources: doc.sources.map((s) => (s.id === id ? { ...s, ...p } : s)) });
  const patchBody = (id: string, p: Partial<Body>) => onDoc({ ...doc, bodies: doc.bodies.map((b) => (b.id === id ? { ...b, ...p } : b)) });

  const onSourceDown = (e: React.PointerEvent, s: Source) => {
    setSel({ kind: 'source', id: s.id });
    if (s.orbit) {
      const o = s.orbit;
      start(e, (p) => {
        // góc tới = góc giữa đường nối tâm–con trỏ và pháp tuyến (đường thẳng đứng)
        const dx = p.x - o.cx;
        const dy = p.y - o.cy;
        const up = o.side === 'top' ? -dy : dy;
        let i = (Math.atan2(Math.abs(dx), up) * 180) / Math.PI;
        i = clamp(Math.round(i), 0, 89);
        patchSource(s.id, { orbit: { ...o, i, mirror: dx > 0 } });
      });
      return;
    }
    if (!editable) return;
    const ox = s.x;
    const oy = s.y;
    start(e, (p, st) => patchSource(s.id, { x: ox + p.x - st.x, y: oy + p.y - st.y }));
  };

  const onRotateDown = (e: React.PointerEvent, s: Source) => {
    setSel({ kind: 'source', id: s.id });
    start(e, (p) => {
      const a = (Math.atan2(s.y - p.y, s.x - p.x) * 180) / Math.PI;
      patchSource(s.id, { angle: Math.round(a) });
    });
  };

  const onBodyDown = (e: React.PointerEvent, b: Body) => {
    setSel({ kind: 'body', id: b.id });
    if (!editable) return;
    const ox = b.x;
    const oy = b.y;
    start(e, (p, st) => patchBody(b.id, { x: ox + p.x - st.x, y: oy + p.y - st.y }));
  };

  const selSource = sel?.kind === 'source' ? doc.sources.find((s) => s.id === sel.id) : undefined;
  const selBody = sel?.kind === 'body' ? doc.bodies.find((b) => b.id === sel.id) : undefined;
  const selFilter = sel?.kind === 'filter' ? doc.filters.find((f) => f.id === sel.id) : undefined;

  // Hiển thị pháp tuyến và góc cho các sự kiện của tia chính
  const shownEvents = result.events
    .filter((ev) => ev === firstEvent || ev.i > 0.5)
    .filter((ev, k, arr) => arr.findIndex((o) => Math.abs(o.x - ev.x) < 0.5 && Math.abs(o.y - ev.y) < 0.5) === k)
    .slice(0, orbitSrc ? 1 : 4);

  return (
    <div className="eng">
      <div className="eng-stage optics-dark">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg" onPointerDown={() => setSel(null)}>
          <defs>
            <filter id="rayGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="spot" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {doc.ambient && doc.ambient !== 'air' && <rect x={0} y={0} width={VW} height={VH} fill={MEDIA[doc.ambient].tint} />}
          {doc.protractor && <Protractor {...doc.protractor} />}

          {doc.bodies.map((b) => (
            <g key={b.id} onPointerDown={(e) => onBodyDown(e, b)} className={editable ? 'draggable' : ''}>
              <polygon points={bodyPolygon(b).map((p) => p.join(',')).join(' ')} fill={MEDIA[b.medium].tint} stroke={sel?.id === b.id ? '#7cc4ff' : 'rgba(200,230,255,0.85)'} strokeWidth={sel?.id === b.id ? 3 : 2} />
              {b.label && (
                <text x={b.x} y={b.y + (b.shape === 'semicircle' ? b.size * 0.55 : 0)} className="optics-label" textAnchor="middle">
                  {b.label}
                </text>
              )}
            </g>
          ))}

          {doc.filters.map((f) => {
            const a = (f.angle * Math.PI) / 180;
            const hx = (Math.cos(a) * f.len) / 2;
            const hy = (Math.sin(a) * f.len) / 2;
            return (
              <g key={f.id} onPointerDown={(e) => { e.stopPropagation(); setSel({ kind: 'filter', id: f.id }); }}>
                <line x1={f.x - hx} y1={f.y - hy} x2={f.x + hx} y2={f.y + hy} stroke={f.color === 'none' ? '#ccc' : COLOR_HEX[f.color]} strokeWidth={14} opacity={0.55} />
                <text x={f.x} y={f.y - f.len / 2 - 14} className="optics-label" textAnchor="middle">Kính lọc</text>
              </g>
            );
          })}

          {/* Tia sáng */}
          <g style={{ mixBlendMode: 'screen' }} filter="url(#rayGlow)">
            {result.rays.map((r, k) => (
              <line key={k} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={COLOR_HEX[r.color]} strokeWidth={r.white ? 2.2 : 3} opacity={Math.min(1, 0.15 + r.intensity)} strokeLinecap="round" />
            ))}
          </g>

          {doc.screens.map((sc) => {
            const a = (sc.angle * Math.PI) / 180;
            const ux = Math.cos(a);
            const uy = Math.sin(a);
            const hits = result.hits.filter((h) => h.screen === sc.id);
            return (
              <g key={sc.id}>
                <line x1={sc.x - (ux * sc.len) / 2} y1={sc.y - (uy * sc.len) / 2} x2={sc.x + (ux * sc.len) / 2} y2={sc.y + (uy * sc.len) / 2} stroke="#f2f2f2" strokeWidth={10} />
                <g style={{ mixBlendMode: 'screen' }} filter="url(#spot)">
                  {hits.map((h, k) => {
                    const px = sc.x + ux * (h.t - 0.5) * sc.len;
                    const py = sc.y + uy * (h.t - 0.5) * sc.len;
                    return <circle key={k} cx={px} cy={py} r={7} fill={COLOR_HEX[h.color]} opacity={Math.min(1, 0.3 + h.intensity)} />;
                  })}
                </g>
                <text x={sc.x + 18} y={sc.y - sc.len / 2 - 10} className="optics-label">Màn chắn</text>
              </g>
            );
          })}

          {/* Pháp tuyến và góc */}
          {shownEvents.map((ev, k) => (
            <AngleMarks key={k} ev={ev} showNormal={showNormal} showAngles={showAngles} showValues={showValues} />
          ))}

          {sources.map((s) => (
            <Laser key={s.id} s={s} selected={sel?.id === s.id} onDown={(e) => onSourceDown(e, s)} onRotate={editable && !s.orbit ? (e) => onRotateDown(e, s) : undefined} />
          ))}
        </svg>
        <div className="optics-legend">Phòng tối – ánh sáng {COLOR_NAME[doc.sources[0]?.color ?? 'red'].toLowerCase()}</div>
      </div>

      <aside className="eng-side">
        {selSource && (
          <div className="insp-part">
            <h3>Nguồn sáng</h3>
            <Row label="Màu ánh sáng">
              <Seg<SourceColor> value={selSource.color} options={['red', 'green', 'blue', 'violet', 'white']} onChange={(c) => patchSource(selSource.id, { color: c })} fmtOpt={(c) => COLOR_NAME[c]} />
            </Row>
            {selSource.orbit ? (
              <Row label="Góc tới i">
                <Slider value={selSource.orbit.i} min={0} max={89} step={1} onChange={(i) => patchSource(selSource.id, { orbit: { ...selSource.orbit!, i } })} suffix="°" digits={0} />
              </Row>
            ) : (
              <Row label="Hướng chiếu">
                <Slider value={selSource.angle} min={-180} max={180} step={1} onChange={(a) => patchSource(selSource.id, { angle: a })} suffix="°" digits={0} />
              </Row>
            )}
          </div>
        )}
        {selBody && (
          <div className="insp-part">
            <h3>{selBody.label ?? 'Khối trong suốt'}</h3>
            <Row label="Chất">
              <Seg<Medium> value={selBody.medium} options={['water', 'oil', 'glass', 'flint', 'diamond']} onChange={(m) => patchBody(selBody.id, { medium: m })} fmtOpt={(m) => `${MEDIA[m].name} (n = ${fmtShort(MEDIA[m].n, 2)})`} />
            </Row>
            {editable && (
              <Row label="Góc xoay">
                <Slider value={selBody.angle} min={-180} max={180} step={1} onChange={(a) => patchBody(selBody.id, { angle: a })} suffix="°" digits={0} />
              </Row>
            )}
          </div>
        )}
        {selFilter && (
          <div className="insp-part">
            <h3>Kính lọc màu</h3>
            <Row label="Màu kính lọc">
              <Seg<LightColor | 'none'>
                value={selFilter.color}
                options={['none', 'red', 'green', 'blue']}
                onChange={(c) => onDoc({ ...doc, filters: doc.filters.map((f) => (f.id === selFilter.id ? { ...f, color: c } : f)) })}
                fmtOpt={(c) => (c === 'none' ? 'Bỏ kính lọc' : COLOR_NAME[c])}
              />
            </Row>
          </div>
        )}
        {!sel && <p className="muted">Bấm vào nguồn sáng, khối thuỷ tinh hoặc kính lọc để chỉnh. Kéo nguồn laze để đổi góc tới.</p>}

        <div className="insp-part">
          <h4>Hiển thị</h4>
          <Toggle value={showNormal} onChange={setShowNormal} label="Pháp tuyến" />
          <Toggle value={showAngles} onChange={setShowAngles} label="Số đo góc" />
        </div>

        {firstEvent && (
          <div className="insp-part">
            <h4>Tại mặt phân cách đầu tiên</h4>
            <div className="insp-values two">
              <div>
                <span>Góc tới i</span>
                <b>{showValues ? `${fmtShort(firstEvent.i, 1)}°` : '?'}</b>
              </div>
              <div>
                <span>{firstEvent.r === null ? 'Phản xạ toàn phần' : 'Góc khúc xạ r'}</span>
                <b>{firstEvent.r === null ? '—' : showValues ? `${fmtShort(firstEvent.r, 1)}°` : '?'}</b>
              </div>
              <div>
                <span>n₁ → n₂</span>
                <b>
                  {fmtShort(firstEvent.n1, 2)} → {fmtShort(firstEvent.n2, 2)}
                </b>
              </div>
              <div>
                <span>Góc giới hạn</span>
                <b>{firstEvent.critical === null ? 'không có' : showValues ? `${fmtShort(firstEvent.critical, 1)}°` : '?'}</b>
              </div>
            </div>
            {firstEvent.r !== null && firstEvent.i > 0.5 && showValues && (
              <p className="small muted">
                sin i / sin r = {fmtShort(Math.sin((firstEvent.i * Math.PI) / 180) / Math.sin((firstEvent.r * Math.PI) / 180), 3)}
              </p>
            )}
          </div>
        )}
        <SpectrumHint doc={doc} />
      </aside>
    </div>
  );
}

function SpectrumHint({ doc }: { doc: RaysDoc }) {
  if (!doc.sources.some((s) => s.color === 'white') || !doc.bodies.some((b) => b.shape === 'prism')) return null;
  return (
    <div className="insp-part">
      <h4>Dải màu</h4>
      <div className="spectrum-bar">
        {SPECTRUM.map((c) => (
          <span key={c} style={{ background: COLOR_HEX[c] }} title={COLOR_NAME[c]} />
        ))}
      </div>
      <p className="small muted">Đỏ – da cam – vàng – lục – lam – chàm – tím. Ánh sáng tím bị lệch nhiều nhất, đỏ lệch ít nhất.</p>
    </div>
  );
}

function Laser({ s, selected, onDown, onRotate }: { s: Source; selected: boolean; onDown: (e: React.PointerEvent) => void; onRotate?: (e: React.PointerEvent) => void }) {
  const col = s.color === 'white' ? '#ffffff' : COLOR_HEX[s.color];
  const w = Math.max(30, (s.width ?? 0) + 24);
  return (
    <g transform={`translate(${s.x} ${s.y}) rotate(${s.angle})`} className="draggable">
      <rect x={-78} y={-w / 2} width={78} height={w} rx={8} fill="#2c3440" stroke={selected ? '#7cc4ff' : '#9aa8b8'} strokeWidth={selected ? 3 : 1.5} onPointerDown={onDown} />
      <rect x={-6} y={-6} width={8} height={12} fill={col} />
      <circle cx={-60} cy={0} r={5} fill={col} />
      {onRotate && <circle cx={-92} cy={0} r={11} className="rot-handle" onPointerDown={onRotate} />}
    </g>
  );
}

function Protractor({ x, y, r }: { x: number; y: number; r: number }) {
  const ticks = [];
  for (let a = 0; a < 360; a += 5) {
    const t = (a * Math.PI) / 180;
    const big = a % 10 === 0;
    const r1 = r - (big ? 16 : 9);
    ticks.push(<line key={a} x1={x + r * Math.sin(t)} y1={y - r * Math.cos(t)} x2={x + r1 * Math.sin(t)} y2={y - r1 * Math.cos(t)} stroke="rgba(255,255,255,0.55)" strokeWidth={big ? 2 : 1} />);
    if (a % 30 === 0) {
      const lab = a <= 90 ? a : a <= 180 ? 180 - a : a <= 270 ? a - 180 : 360 - a;
      const rl = r - 32;
      ticks.push(
        <text key={`l${a}`} x={x + rl * Math.sin(t)} y={y - rl * Math.cos(t)} className="prot-label" textAnchor="middle" dominantBaseline="central">
          {lab}°
        </text>,
      );
    }
  }
  return (
    <g pointerEvents="none">
      <circle cx={x} cy={y} r={r} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.6)" strokeWidth={2} />
      {ticks}
      <line x1={x} y1={y - r} x2={x} y2={y + r} stroke="rgba(255,255,255,0.18)" strokeDasharray="6 6" />
      <line x1={x - r} y1={y} x2={x + r} y2={y} stroke="rgba(255,255,255,0.18)" strokeDasharray="6 6" />
    </g>
  );
}

function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  // vẽ cung theo đường ngắn nhất giữa hai góc (radian)
  let d = a1 - a0;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a0 + d);
  const y1 = cy + r * Math.sin(a0 + d);
  return `M ${x0} ${y0} A ${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${x1} ${y1}`;
}

function AngleMarks({ ev, showNormal, showAngles, showValues }: { ev: ReturnType<typeof trace>['events'][number]; showNormal: boolean; showAngles: boolean; showValues: boolean }) {
  const L = 150;
  // hướng ngược tia tới (về phía nguồn) và hướng tia ra
  const aIn = Math.atan2(-ev.dy, -ev.dx);
  const aN1 = Math.atan2(ev.ny, ev.nx); // pháp tuyến phía tia tới
  const aOut = Math.atan2(ev.oy, ev.ox);
  const aN2 = ev.r === null ? aN1 : Math.atan2(-ev.ny, -ev.nx);
  const lab = (a0: number, a1: number, r: number) => {
    let d = a1 - a0;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    const m = a0 + d / 2;
    return [ev.x + r * Math.cos(m), ev.y + r * Math.sin(m)];
  };
  const [ix, iy] = lab(aN1, aIn, 92);
  const [rx, ry] = lab(aN2, aOut, 92);
  return (
    <g pointerEvents="none">
      {showNormal && <line x1={ev.x - ev.nx * L} y1={ev.y - ev.ny * L} x2={ev.x + ev.nx * L} y2={ev.y + ev.ny * L} stroke="#ffffff" strokeOpacity={0.75} strokeWidth={2} strokeDasharray="8 6" />}
      {showAngles && ev.i > 0.5 && (
        <>
          <path d={arc(ev.x, ev.y, 60, aN1, aIn)} fill="none" stroke="#ffd166" strokeWidth={2.5} />
          <text x={ix} y={iy} className="angle-label" fill="#ffd166" textAnchor="middle" dominantBaseline="central">
            i{showValues ? ` = ${Math.round(ev.i)}°` : ''}
          </text>
          {ev.r !== null && ev.r > 0.5 && (
            <>
              <path d={arc(ev.x, ev.y, 60, aN2, aOut)} fill="none" stroke="#7ee8a2" strokeWidth={2.5} />
              <text x={rx} y={ry} className="angle-label" fill="#7ee8a2" textAnchor="middle" dominantBaseline="central">
                r{showValues ? ` = ${Math.round(ev.r)}°` : ''}
              </text>
            </>
          )}
          {ev.r === null && (
            <text x={ev.x} y={ev.y + 34} className="angle-label" fill="#ff8fa3" textAnchor="middle">
              Phản xạ toàn phần
            </text>
          )}
        </>
      )}
    </g>
  );
}
