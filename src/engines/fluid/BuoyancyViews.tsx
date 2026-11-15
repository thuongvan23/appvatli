// Lực đẩy Archimedes và điều kiện vật nổi, chìm (Bài 17).
import { useEffect, useRef } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, Toggle, clamp, useSvgDrag } from '../../ui/controls';
import { fmt, fmtShort } from '../../core/format';
import { BuoyancyDoc, FloatDoc, FluidOptions, LIQUIDS, Liquid, SOLIDS, Solid, massOf, volumeOf } from './model';

const VW = 1200;
const VH = 680;

export function BuoyancyView({ doc, onDoc, options, showValues, onMeasure }: EngineProps<BuoyancyDoc, FluidOptions>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const L = LIQUIDS[doc.liquid];
  const V = volumeOf(doc.object);
  const P = massOf(doc.object) * 0.01; // N (1 g ↔ 0,01 N)
  const frac = clamp(doc.dip, 0, 1);
  const Vimm = frac * V;
  const FA = L.D * Vimm * 0.01;
  const F = Math.max(0, P - FA);
  useEffect(() => onMeasure?.({ P, F, FA, V, Vimm, d: L.D * 10000 }), [P, F, FA, V, Vimm, L.D, onMeasure]);

  const beaker = { x: 450, top: 420, bottom: 600, w: 230 };
  const objH = 100;
  const objW = Math.max(50, (V / objH) * 9);
  const surface = beaker.top + 20;
  const objBottom = surface + Math.min(1.25, doc.dip) * objH;
  const springTop = 40;
  // cốc hứng nước tràn
  const cup = { x: 760, top: 500, bottom: 600, w: 110 };
  const collected = Vimm;
  const cupLevel = cup.bottom - Math.min(cup.bottom - cup.top - 5, collected * 0.9);

  const onDrag = (e: React.PointerEvent) => {
    const o = doc.dip;
    start(e, (p, st) => onDoc({ ...doc, dip: clamp(Math.round((o + (p.y - st.y) / objH) * 20) / 20, 0, 1.25) }));
  };

  // vạch chia lực kế 0..5 N
  const ticks = [];
  for (let n = 0; n <= 5; n += 0.5) ticks.push(n);

  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={0} y={600} width={VW} height={80} className="lab-table" />
          {/* giá treo */}
          <rect x={220} y={40} width={12} height={560} fill="#777" />
          <rect x={220} y={40} width={250} height={12} fill="#777" />
          {/* lực kế */}
          <g>
            <line x1={beaker.x} y1={52} x2={beaker.x} y2={springTop} stroke="#555" strokeWidth={3} />
            <rect x={beaker.x - 44} y={springTop} width={88} height={175} rx={10} fill="#f3f0e6" stroke="#8a7f62" strokeWidth={2} />
            <path d={`M ${beaker.x - 16} ${springTop + 20} ${Array.from({ length: 14 }, (_, i) => `L ${beaker.x - 16 + (i % 2 ? 9 : -9)} ${springTop + 20 + ((i + 1) * (F * 26 + 10)) / 14}`).join(' ')}`} fill="none" stroke="#666" strokeWidth={2} />
            {ticks.map((n) => {
              const y = springTop + 30 + n * 26;
              return (
                <g key={n}>
                  <line x1={beaker.x + 6} y1={y} x2={beaker.x + (n % 1 === 0 ? 22 : 14)} y2={y} stroke="#333" strokeWidth={1.5} />
                  {n % 1 === 0 && (
                    <text x={beaker.x + 26} y={y} dominantBaseline="central" className="tick-small">
                      {n}
                    </text>
                  )}
                </g>
              );
            })}
            <rect x={beaker.x - 34} y={springTop + 28 + F * 26} width={42} height={5} fill="#d62828" />
            <text x={beaker.x + 54} y={springTop + 30 + F * 26} dominantBaseline="central" className="lab-value">
              {showValues ? `${fmt(F, 2)} N` : '?'}
            </text>
            <line x1={beaker.x - 16} y1={springTop + 30 + F * 26} x2={beaker.x - 16} y2={springTop + 175} stroke="#555" strokeWidth={2.5} />
            <line x1={beaker.x - 16} y1={springTop + 175} x2={beaker.x} y2={objBottom - objH} stroke="#555" strokeWidth={2.5} />
          </g>
          {/* bình tràn */}
          <rect x={beaker.x - beaker.w / 2} y={surface} width={beaker.w} height={beaker.bottom - surface} fill={L.color} />
          <path d={`M ${beaker.x - beaker.w / 2} ${beaker.top - 10} V ${beaker.bottom} H ${beaker.x + beaker.w / 2} V ${surface - 4} L ${beaker.x + beaker.w / 2 + 70} ${surface + 20}`} fill="none" stroke="#6a7a8c" strokeWidth={4} />
          {frac > 0.01 && <path d={`M ${beaker.x + beaker.w / 2 + 70} ${surface + 20} Q ${cup.x - 10} ${surface + 40} ${cup.x} ${cupLevel}`} fill="none" stroke="#3a8de0" strokeWidth={3} className="jet" />}
          {/* vật */}
          <g onPointerDown={onDrag} className="draggable">
            <rect x={beaker.x - objW / 2} y={objBottom - objH} width={objW} height={objH} rx={6} fill={SOLIDS[doc.object.material].color} stroke="#444" strokeWidth={2} />
            <text x={beaker.x} y={objBottom - objH / 2} textAnchor="middle" dominantBaseline="central" fontWeight={800} fill="#222">
              {SOLIDS[doc.object.material].name}
            </text>
          </g>
          {options.showCalc !== false && frac > 0.02 && (
            <g>
              <line x1={beaker.x + objW / 2 + 22} y1={objBottom} x2={beaker.x + objW / 2 + 22} y2={objBottom - 20 - FA * 40} stroke="#1d6fe0" strokeWidth={6} markerEnd="url(#faArrow)" />
              <text x={beaker.x + objW / 2 + 34} y={objBottom - 30} className="lab-value" fill="#1d6fe0">
                F_A
              </text>
            </g>
          )}
          <defs>
            <marker id="faArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="#1d6fe0" />
            </marker>
          </defs>
          {/* cốc hứng */}
          <rect x={cup.x - cup.w / 2} y={cupLevel} width={cup.w} height={cup.bottom - cupLevel} fill={L.color} />
          <path d={`M ${cup.x - cup.w / 2} ${cup.top} V ${cup.bottom} H ${cup.x + cup.w / 2} V ${cup.top}`} fill="none" stroke="#6a7a8c" strokeWidth={4} />
          <text x={cup.x} y={cup.bottom + 40} textAnchor="middle" className="lab-label">
            Cốc hứng: {showValues ? `${fmtShort(collected, 0)} cm³` : '?'}
          </text>
          <text x={beaker.x} y={beaker.bottom + 40} textAnchor="middle" className="lab-label">
            Bình tràn
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <p className="small muted">Kéo vật lên xuống (hoặc dùng thanh trượt) để nhúng vật vào chất lỏng. Phần chất lỏng bị vật chiếm chỗ tràn sang cốc hứng.</p>
        <Row label="Phần vật chìm trong chất lỏng">
          <Slider value={Math.round(frac * 100)} min={0} max={100} step={5} onChange={(v) => onDoc({ ...doc, dip: v / 100 })} suffix="%" digits={0} />
        </Row>
        {options.choose && (
          <>
            <Row label="Chất lỏng">
              <Seg<Liquid> value={doc.liquid} options={['nuoc', 'dau', 'nuocMuoi', 'ruou']} onChange={(l) => onDoc({ ...doc, liquid: l })} fmtOpt={(l) => LIQUIDS[l].name} />
            </Row>
            <Row label="Vật (thể tích)">
              <Seg
                value={`${doc.object.material}-${V}`}
                options={['nhom-100', 'nhom-50', 'sat-50', 'dong-50']}
                onChange={(k) => {
                  const [m, v] = k.split('-');
                  onDoc({ ...doc, object: { id: 'obj', material: m as Solid, shape: 'stone', V: Number(v) } });
                }}
                fmtOpt={(k) => {
                  const [m, v] = k.split('-');
                  return `${SOLIDS[m as Solid].name} ${v} cm³`;
                }}
              />
            </Row>
          </>
        )}
        <div className="insp-values two">
          <div>
            <span>Trọng lượng P (ngoài không khí)</span>
            <b>{showValues ? `${fmt(P, 2)} N` : '?'}</b>
          </div>
          <div>
            <span>Số chỉ lực kế F</span>
            <b>{showValues ? `${fmt(F, 2)} N` : '?'}</b>
          </div>
          <div>
            <span>F_A = P − F</span>
            <b>{showValues ? `${fmt(FA, 2)} N` : '?'}</b>
          </div>
          <div>
            <span>Trọng lượng nước tràn</span>
            <b>{showValues ? `${fmt(L.D * collected * 0.01, 2)} N` : '?'}</b>
          </div>
        </div>
        <p className="small">Độ lớn lực đẩy Archimedes bằng trọng lượng phần chất lỏng bị vật chiếm chỗ: F_A = d·V.</p>
      </aside>
    </div>
  );
}

export function FloatView({ doc, onDoc, showValues }: EngineProps<FloatDoc, FluidOptions>) {
  const L = LIQUIDS[doc.liquid];
  const tank = { x0: 120, x1: 1080, surface: 260, bottom: 600 };
  const n = doc.objects.length;
  const size = 80;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <defs>
            <marker id="pDown" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="#d62828" />
            </marker>
            <marker id="fUp" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="#1d6fe0" />
            </marker>
          </defs>
          <rect x={tank.x0} y={tank.surface} width={tank.x1 - tank.x0} height={tank.bottom - tank.surface} fill={L.color} />
          <path d={`M ${tank.x0} ${tank.surface - 120} V ${tank.bottom} H ${tank.x1} V ${tank.surface - 120}`} fill="none" stroke="#6a7a8c" strokeWidth={5} />
          {doc.objects.map((m, i) => {
            const D = SOLIDS[m].D;
            const x = tank.x0 + ((i + 0.5) * (tank.x1 - tank.x0)) / n;
            const ratio = D / L.D;
            const state = Math.abs(ratio - 1) < 0.03 ? 'lơ lửng' : ratio < 1 ? 'nổi' : 'chìm';
            const imm = Math.min(1, ratio);
            const top = state === 'chìm' ? tank.bottom - size : state === 'lơ lửng' ? (tank.surface + tank.bottom) / 2 - size / 2 : tank.surface - size * (1 - imm);
            const Pl = 26 + Math.min(D, 2.2) * 22;
            const Fl = 26 + L.D * imm * 22;
            return (
              <g key={m}>
                <g style={{ transition: 'transform 0.8s cubic-bezier(.3,1.4,.6,1)' }} transform={`translate(0 ${top})`}>
                  {m === 'trung' ? (
                    <ellipse cx={x} cy={size / 2} rx={size * 0.38} ry={size / 2} fill={SOLIDS[m].color} stroke="#555" strokeWidth={2} />
                  ) : (
                    <rect x={x - size / 2} y={0} width={size} height={size} rx={8} fill={SOLIDS[m].color} stroke="#555" strokeWidth={2} />
                  )}
                  {doc.showForces && (
                    <>
                      <line x1={x - 14} y1={size / 2} x2={x - 14} y2={size / 2 + Pl} stroke="#d62828" strokeWidth={5} markerEnd="url(#pDown)" />
                      <line x1={x + 14} y1={size / 2} x2={x + 14} y2={size / 2 - Fl} stroke="#1d6fe0" strokeWidth={5} markerEnd="url(#fUp)" />
                    </>
                  )}
                </g>
                <text x={x} y={tank.surface - 150} textAnchor="middle" className="lab-label">
                  {SOLIDS[m].name}
                </text>
                <text x={x} y={tank.surface - 126} textAnchor="middle" className="lab-small">
                  D = {showValues ? `${fmtShort(D * 1000, 0)} kg/m³` : '?'}
                </text>
                <text x={x} y={tank.bottom + 34} textAnchor="middle" className="lab-value">
                  {showValues ? state : '?'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Chất lỏng trong bình">
          <Seg<Liquid> value={doc.liquid} options={['nuoc', 'nuocMuoi', 'dau', 'ruou']} onChange={(l) => onDoc({ ...doc, liquid: l })} fmtOpt={(l) => `${LIQUIDS[l].name}`} />
        </Row>
        <p className="small">
          Khối lượng riêng chất lỏng: <b>{fmtShort(L.D * 1000, 0)} kg/m³</b>
        </p>
        <Toggle value={doc.showForces} onChange={(v) => onDoc({ ...doc, showForces: v })} label="Hiện lực: P (đỏ), F_A (xanh)" />
        <div className="calc">
          <b>Điều kiện:</b>
          <p>P &gt; F_A (D vật &gt; D chất lỏng): vật chìm</p>
          <p>P = F_A (D vật = D chất lỏng): vật lơ lửng</p>
          <p>P &lt; F_A (D vật &lt; D chất lỏng): vật nổi lên, khi nổi trên mặt thoáng thì F_A = P</p>
        </div>
      </aside>
    </div>
  );
}
