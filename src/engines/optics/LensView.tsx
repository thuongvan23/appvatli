// Băng quang học với thấu kính mỏng: vật, ảnh, ba tia đặc biệt, chùm song song,
// màn chắn (phương pháp Silbermann), kính lúp, dựng ảnh từng bước.
import { useEffect, useMemo, useRef } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, clamp, useSvgDrag } from '../../ui/controls';
import { fmtShort } from '../../core/format';
import type { LensDoc, OpticsOptions } from './model';

const VW = 1200;
const VH = 640;
const S = 13; // px mỗi cm
const AX = 330; // toạ độ y của trục chính
const X0 = 600; // toạ độ x của vị trí 0 cm trên băng

const px = (cm: number) => X0 + cm * S;
const py = (cm: number) => AX - cm * S;

export interface LensImage {
  /** khoảng cách ảnh (cm, dương: ảnh thật phía sau thấu kính) */
  dp: number;
  /** chiều cao ảnh có dấu (âm: ngược chiều) */
  hp: number;
  infinite: boolean;
  real: boolean;
}

export function lensImage(d: number, fSigned: number, h: number): LensImage {
  if (Math.abs(d - fSigned) < 1e-6) return { dp: Infinity, hp: Infinity, infinite: true, real: false };
  const dp = (d * fSigned) / (d - fSigned);
  return { dp, hp: (-h * dp) / d, infinite: false, real: dp > 0 };
}

export function describeImage(img: LensImage, h: number): string {
  if (img.infinite) return 'Không có ảnh (ảnh ở rất xa)';
  const nature = img.real ? 'Ảnh thật' : 'Ảnh ảo';
  const dir = img.hp < 0 ? 'ngược chiều' : 'cùng chiều';
  const r = Math.abs(img.hp) / h;
  const size = Math.abs(r - 1) < 0.02 ? 'bằng vật' : r > 1 ? 'lớn hơn vật' : 'nhỏ hơn vật';
  return `${nature}, ${dir}, ${size}`;
}

/** Tia sau thấu kính mỏng: độ dốc mới = độ dốc cũ − y/f (đơn vị cm). */
function outSlope(sIn: number, y: number, f: number) {
  return sIn - y / f;
}

export function LensView({ doc, onDoc, options, showValues, onMeasure }: EngineProps<LensDoc, OpticsOptions>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const fS = doc.kind === 'converging' ? doc.f : -doc.f;
  const d = doc.lensX - doc.objX;
  const img = useMemo(() => lensImage(d, fS, doc.h), [d, fS, doc.h]);
  const controls = options.controls ?? ['kind', 'f', 'd', 'h'];
  const set = (p: Partial<LensDoc>) => onDoc({ ...doc, ...p });
  const step = options.construction ? doc.step ?? 0 : 99;

  const imgX = doc.lensX + img.dp;
  const screenDist = doc.screenX !== null ? doc.screenX - doc.lensX : null;
  // độ mờ của ảnh trên màn: bán kính vệt sáng ≈ nửa chiều cao thấu kính × |d' − khoảng cách màn| / d'
  const blur = screenDist !== null && img.real && !img.infinite ? (6 * Math.abs(img.dp - screenDist)) / img.dp : Infinity;
  const sharp = blur < 0.2;

  useEffect(() => {
    if (!onMeasure) return;
    const m: Record<string, number> = { d, f: doc.f, h: doc.h };
    if (!img.infinite) {
      m.dp = img.dp;
      m.hp = Math.abs(img.hp);
    }
    if (screenDist !== null) {
      m.ds = screenDist;
      m.L = doc.screenX! - doc.objX;
    }
    onMeasure(m);
  }, [d, doc.f, doc.h, img, screenDist, doc.screenX, doc.objX, onMeasure]);

  // ---------- Tia sáng ----------
  const rays: { pts: [number, number][]; virt?: [number, number][]; color: string; label?: string }[] = [];
  const xEnd = 47;
  const xStartBeam = -47;
  const yTop = doc.h;
  const traceFrom = (x0: number, y0: number, sIn: number, color: string, label?: string) => {
    const yL = y0 + sIn * (doc.lensX - x0);
    const sOut = outSlope(sIn, yL, fS);
    const end: [number, number] = [xEnd, yL + sOut * (xEnd - doc.lensX)];
    const ray = { pts: [[x0, y0], [doc.lensX, yL], end] as [number, number][], color, label, virt: undefined as [number, number][] | undefined };
    // ảnh ảo: kéo dài tia ló ngược về phía trước thấu kính
    if (!img.infinite && !img.real && options.rays !== 'beam') ray.virt = [[doc.lensX, yL], [imgX, yL + sOut * (imgX - doc.lensX)]];
    if (options.rays === 'beam' && fS < 0) ray.virt = [[doc.lensX, yL], [doc.lensX + fS, 0]];
    rays.push(ray);
  };

  if (options.rays === 'beam') {
    const n = 7;
    for (let k = 0; k < n; k++) {
      const y = -4.5 + (9 * k) / (n - 1);
      traceFrom(xStartBeam, y, 0, '#ffcc33');
    }
  } else if (options.rays !== 'none' && doc.showObject) {
    const x0 = doc.objX;
    // (1) tia song song trục chính
    if (step >= 1) traceFrom(x0, yTop, 0, '#ff5c5c', '1');
    // (2) tia qua quang tâm
    if (step >= 2) traceFrom(x0, yTop, (0 - yTop) / (doc.lensX - x0), '#4dabff', '2');
    // (3) tia qua tiêu điểm vật F (hoặc hướng tới F' với thấu kính phân kì)
    if (step >= 3 && !options.construction) {
      const xF = doc.lensX - fS;
      if (Math.abs(xF - x0) > 0.3) traceFrom(x0, yTop, (0 - yTop) / (xF - x0), '#3ddc84', '3');
    }
  }

  const onObjDown = (e: React.PointerEvent) => {
    if (!controls.includes('d') && !controls.includes('h')) return;
    const o = { objX: doc.objX, h: doc.h };
    start(e, (p, st) => {
      const nx = controls.includes('d') ? clamp(Math.round((o.objX + (p.x - st.x) / S) * 2) / 2, -44, doc.lensX - 1) : o.objX;
      const nh = controls.includes('h') ? clamp(Math.round((o.h - (p.y - st.y) / S) * 2) / 2, 1, 12) : o.h;
      set({ objX: nx, h: nh });
    });
  };
  const onFDown = (e: React.PointerEvent) => {
    if (!controls.includes('f')) return;
    start(e, (p) => set({ f: clamp(Math.round(Math.abs((p.x - px(doc.lensX)) / S)), 3, 40) }));
  };
  const onLensDown = (e: React.PointerEvent) => {
    if (!controls.includes('lens')) return;
    const o = doc.lensX;
    start(e, (p, st) => set({ lensX: clamp(Math.round((o + (p.x - st.x) / S) * 2) / 2, doc.objX + 2, (doc.screenX ?? 45) - 2) }));
  };
  const onScreenDown = (e: React.PointerEvent) => {
    if (!controls.includes('screen') || doc.screenX === null) return;
    const o = doc.screenX;
    start(e, (p, st) => set({ screenX: clamp(Math.round((o + (p.x - st.x) / S) * 2) / 2, doc.lensX + 1, 44) }));
  };

  const lensH = 9;
  const ticks = [];
  for (let c = -45; c <= 45; c += 5) ticks.push(c);

  const G = 25 / doc.f;

  return (
    <div className="eng">
      <div className="eng-stage bench">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <defs>
            <marker id="arrowHead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="context-stroke" />
            </marker>
            <filter id="screenBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={Math.min(9, blur * S * 0.35)} />
            </filter>
          </defs>
          {/* thước đo trên băng */}
          <line x1={0} y1={AX} x2={VW} y2={AX} className="axis-line" />
          <g className="ruler">
            <rect x={0} y={VH - 60} width={VW} height={36} />
            {ticks.map((c) => (
              <g key={c}>
                <line x1={px(c)} y1={VH - 60} x2={px(c)} y2={VH - 60 + ((c + 45) % 10 === 0 ? 16 : 9)} />
                {(c + 45) % 10 === 0 && (
                  <text x={px(c)} y={VH - 32} textAnchor="middle">
                    {c + 45}
                  </text>
                )}
              </g>
            ))}
            <text x={VW - 8} y={VH - 8} textAnchor="end" className="unit">
              cm
            </text>
          </g>

          {/* tia sáng */}
          {rays.map((r, k) => (
            <g key={k}>
              <polyline points={r.pts.map(([x, y]) => `${px(x)},${py(y)}`).join(' ')} fill="none" stroke={r.color} strokeWidth={2.6} markerMid="url(#arrowHead)" />
              {r.virt && <polyline points={r.virt.map(([x, y]) => `${px(x)},${py(y)}`).join(' ')} fill="none" stroke={r.color} strokeWidth={2} strokeDasharray="7 6" opacity={0.85} />}
            </g>
          ))}

          {/* thấu kính */}
          <g onPointerDown={onLensDown} className={controls.includes('lens') ? 'draggable' : ''}>
            <LensShape x={px(doc.lensX)} kind={doc.kind} h={lensH * S} />
            <text x={px(doc.lensX) + 10} y={AX + 22} className="bench-label">
              O
            </text>
          </g>
          {/* tiêu điểm */}
          {!options.hideFocus && [1, -1].map((sgn) => {
            const xF = doc.lensX + sgn * doc.f;
            const isPrime = doc.kind === 'converging' ? sgn > 0 : sgn < 0;
            return (
              <g key={sgn} onPointerDown={onFDown} className={controls.includes('f') ? 'draggable' : ''}>
                <circle cx={px(xF)} cy={AX} r={14} fill="transparent" />
                <circle cx={px(xF)} cy={AX} r={5} className="focal" />
                <text x={px(xF)} y={AX + 24} className="bench-label" textAnchor="middle">
                  {isPrime ? "F'" : 'F'}
                </text>
              </g>
            );
          })}

          {/* vật AB */}
          {doc.showObject && options.rays !== 'beam' && (
            <g onPointerDown={onObjDown} className={controls.includes('d') || controls.includes('h') ? 'draggable' : ''}>
              <line x1={px(doc.objX)} y1={AX} x2={px(doc.objX)} y2={py(doc.h)} className="object-arrow" markerEnd="url(#arrowHead)" />
              <rect x={px(doc.objX) - 14} y={py(doc.h) - 6} width={28} height={doc.h * S + 6} fill="transparent" />
              <text x={px(doc.objX) - 12} y={py(doc.h) - 6} className="bench-label" textAnchor="end">
                A
              </text>
              <text x={px(doc.objX) - 12} y={AX + 22} className="bench-label" textAnchor="end">
                B
              </text>
            </g>
          )}

          {/* ảnh A'B' */}
          {doc.showObject && options.rays !== 'beam' && !options.hideImage && !img.infinite && step >= 3 && Math.abs(imgX) < 52 && (
            <g>
              <line x1={px(imgX)} y1={AX} x2={px(imgX)} y2={py(img.hp)} className={`image-arrow ${img.real ? '' : 'virtual'}`} markerEnd="url(#arrowHead)" />
              <text x={px(imgX) + 10} y={py(img.hp) + (img.hp < 0 ? 18 : -6)} className="bench-label">
                A'
              </text>
              <text x={px(imgX) + 10} y={AX - 8} className="bench-label">
                B'
              </text>
            </g>
          )}

          {/* màn chắn */}
          {doc.screenX !== null && (
            <g onPointerDown={onScreenDown} className={controls.includes('screen') ? 'draggable' : ''}>
              <rect x={px(doc.screenX) - 5} y={AX - 160} width={10} height={320} className="screen-bar" />
              {img.real && !img.infinite && screenDist !== null && screenDist > 0 && (
                <g filter={sharp ? undefined : 'url(#screenBlur)'} opacity={sharp ? 1 : Math.max(0.5, 1 - blur / 4)}>
                  <line x1={px(doc.screenX) - 12} y1={AX} x2={px(doc.screenX) - 12} y2={py((img.hp * screenDist) / img.dp)} stroke="#ffb703" strokeWidth={6} />
                </g>
              )}
              <text x={px(doc.screenX)} y={AX - 172} className="bench-label" textAnchor="middle">
                Màn
              </text>
            </g>
          )}

          {/* kính lúp: mắt người quan sát */}
          {options.magnifier && (
            <g transform={`translate(${px(doc.lensX + 8)} ${AX})`}>
              <path d="M0 -16 Q 22 0 0 16 Q -10 0 0 -16 Z" fill="#fff" stroke="#333" strokeWidth={2} />
              <circle cx={4} cy={0} r={6} fill="#3a6ea5" />
              <text x={0} y={36} className="bench-label" textAnchor="middle">
                Mắt
              </text>
            </g>
          )}
        </svg>

        {doc.screenX !== null && img.real && (
          <div className={`bench-badge ${sharp ? 'ok' : ''}`}>{showValues ? (sharp ? (Math.abs(Math.abs(img.hp) - doc.h) < 0.15 ? 'Ảnh rõ nét và cao bằng vật!' : 'Ảnh rõ nét trên màn') : 'Ảnh trên màn bị mờ – dịch chuyển màn hoặc thấu kính') : 'Quan sát ảnh trên màn'}</div>
        )}
      </div>

      <aside className="eng-side">
        <div className="insp-part">
          <h3>Thấu kính</h3>
          {controls.includes('kind') && (
            <Row label="Loại thấu kính">
              <Seg value={doc.kind} options={['converging', 'diverging'] as const} onChange={(k) => set({ kind: k })} fmtOpt={(k) => (k === 'converging' ? 'Hội tụ' : 'Phân kì')} />
            </Row>
          )}
          {controls.includes('f') && (
            <Row label="Tiêu cự f">
              <Slider value={doc.f} min={3} max={30} step={1} onChange={(v) => set({ f: v })} suffix="cm" />
            </Row>
          )}
          {doc.showObject && options.rays !== 'beam' && controls.includes('d') && (
            <Row label="Khoảng cách từ vật đến thấu kính d">
              <Slider value={d} min={1} max={44} step={0.5} onChange={(v) => set({ objX: doc.lensX - v })} suffix="cm" />
            </Row>
          )}
          {doc.showObject && options.rays !== 'beam' && controls.includes('h') && (
            <Row label="Chiều cao vật h">
              <Slider value={doc.h} min={1} max={10} step={0.5} onChange={(v) => set({ h: v })} suffix="cm" />
            </Row>
          )}
          {options.construction && (
            <Row label="Dựng ảnh từng bước">
              <div className="seg wrap">
                {['Vật AB', 'Tia 1', 'Tia 2', 'Ảnh', 'Tính toán'].map((t, k) => (
                  <button key={k} className={step === k ? 'on' : ''} onClick={() => set({ step: k })}>
                    {k}. {t}
                  </button>
                ))}
              </div>
            </Row>
          )}
        </div>

        {doc.showObject && options.rays !== 'beam' && !options.hideImage && (
          <div className="insp-part">
            <h4>Kết quả</h4>
            <div className="insp-values two">
              <div>
                <span>d</span>
                <b>{fmtShort(d, 1)} cm</b>
              </div>
              <div>
                <span>f</span>
                <b>{fmtShort(doc.f, 1)} cm</b>
              </div>
              <div>
                <span>d'</span>
                <b>{!showValues || step < 3 ? '?' : img.infinite ? '∞' : `${fmtShort(Math.abs(img.dp), 1)} cm`}</b>
              </div>
              <div>
                <span>h'</span>
                <b>{!showValues || step < 3 ? '?' : img.infinite ? '∞' : `${fmtShort(Math.abs(img.hp), 1)} cm`}</b>
              </div>
            </div>
            {showValues && step >= 3 && <p className="nature">{describeImage(img, doc.h)}</p>}
            {options.magnifier && showValues && (
              <p className="nature">
                Số bội giác G = 25 / f = {fmtShort(G, 1)}× {d < doc.f ? '' : '– đặt vật trong khoảng tiêu cự để quan sát!'}
              </p>
            )}
            {((options.construction && step >= 4) || options.showCalc) && !img.infinite && showValues && <Calc d={d} f={doc.f} h={doc.h} img={img} kind={doc.kind} />}
          </div>
        )}
        {screenDist !== null && (
          <div className="insp-part">
            <h4>Vị trí trên băng</h4>
            <div className="insp-values two">
              <div>
                <span>Vật → thấu kính</span>
                <b>{fmtShort(d, 1)} cm</b>
              </div>
              <div>
                <span>Thấu kính → màn</span>
                <b>{fmtShort(screenDist, 1)} cm</b>
              </div>
              <div>
                <span>Vật → màn L</span>
                <b>{fmtShort(doc.screenX! - doc.objX, 1)} cm</b>
              </div>
            </div>
          </div>
        )}
        <p className="small muted">
          {options.hideFocus ? 'Kéo thấu kính và màn chắn dọc theo giá quang học.' : `Kéo vật AB (sang ngang: đổi d, lên xuống: đổi h), kéo tiêu điểm F để đổi tiêu cự${controls.includes('lens') ? ', kéo thấu kính và màn chắn' : ''}.`}
        </p>
      </aside>
    </div>
  );
}

function Calc({ d, f, h, img, kind }: { d: number; f: number; h: number; img: ReturnType<typeof lensImage>; kind: LensDoc['kind'] }) {
  const dp = Math.abs(img.dp);
  const hp = Math.abs(img.hp);
  return (
    <div className="calc">
      <b>Tính bằng hình học (tam giác đồng dạng):</b>
      {kind === 'converging' && img.real && (
        <p>
          d' = d·f / (d − f) = {fmtShort(d, 1)}·{fmtShort(f, 1)} / ({fmtShort(d, 1)} − {fmtShort(f, 1)}) = <b>{fmtShort(dp, 2)} cm</b>
        </p>
      )}
      {kind === 'converging' && !img.real && (
        <p>
          d' = d·f / (f − d) = {fmtShort(d, 1)}·{fmtShort(f, 1)} / ({fmtShort(f, 1)} − {fmtShort(d, 1)}) = <b>{fmtShort(dp, 2)} cm</b>
        </p>
      )}
      {kind === 'diverging' && (
        <p>
          d' = d·f / (d + f) = {fmtShort(d, 1)}·{fmtShort(f, 1)} / ({fmtShort(d, 1)} + {fmtShort(f, 1)}) = <b>{fmtShort(dp, 2)} cm</b>
        </p>
      )}
      <p>
        h' = h·d' / d = {fmtShort(h, 1)}·{fmtShort(dp, 2)} / {fmtShort(d, 1)} = <b>{fmtShort(hp, 2)} cm</b>
      </p>
    </div>
  );
}

function LensShape({ x, kind, h }: { x: number; kind: LensDoc['kind']; h: number }) {
  const t = 16;
  const shape =
    kind === 'converging'
      ? `M ${x} ${AX - h} Q ${x + t * 2} ${AX} ${x} ${AX + h} Q ${x - t * 2} ${AX} ${x} ${AX - h} Z`
      : `M ${x - t} ${AX - h} L ${x + t} ${AX - h} Q ${x + 2} ${AX} ${x + t} ${AX + h} L ${x - t} ${AX + h} Q ${x - 2} ${AX} ${x - t} ${AX - h} Z`;
  const tip = kind === 'converging' ? 1 : -1;
  return (
    <g>
      <path d={shape} className="lens-body" />
      <line x1={x} y1={AX - h} x2={x} y2={AX + h} className="lens-line" />
      <path d={`M ${x - 10} ${AX - h + tip * 12} L ${x} ${AX - h} L ${x + 10} ${AX - h + tip * 12}`} className="lens-line" fill="none" />
      <path d={`M ${x - 10} ${AX + h - tip * 12} L ${x} ${AX + h} L ${x + 10} ${AX + h - tip * 12}`} className="lens-line" fill="none" />
      <rect x={x - 24} y={AX - h - 6} width={48} height={2 * h + 12} fill="transparent" />
    </g>
  );
}
