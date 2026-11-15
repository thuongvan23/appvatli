// Áp suất chất rắn, chất lỏng, khí quyển (Bài 15, 16).
import { useEffect, useRef, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, Toggle, clamp, useSvgDrag } from '../../ui/controls';
import { fmtShort } from '../../core/format';
import { AtmDoc, DepthDoc, FluidOptions, JetsDoc, LIQUIDS, Liquid, PressDoc, PressureDoc, VesselsDoc } from './model';

const VW = 1200;
const VH = 680;
const g = 10;
const P0 = 101300;

const pa = (p: number) => `${Math.round(p).toLocaleString('vi-VN')} Pa`;

// ====================== Áp suất trên một bề mặt ======================
const FACES = [
  { name: 'Đặt nằm', w: 20, h: 5, S: 20 * 10 },
  { name: 'Đặt nghiêng (cạnh)', w: 20, h: 10, S: 20 * 5 },
  { name: 'Đặt đứng', w: 10, h: 20, S: 10 * 5 },
];
const BRICK_KG = 2;

export function PressureView({ doc, onDoc, showValues, onMeasure }: EngineProps<PressureDoc, FluidOptions>) {
  const face = FACES[doc.face];
  const F = (BRICK_KG + doc.weights) * g;
  const S = face.S / 10000; // m²
  const p = F / S;
  const k = doc.surface === 'xop' ? 0.0065 : 0.0042;
  const dent = Math.min(70, p * k);
  const SC = 14;
  const surf = 430;
  const cx = 600;
  const bw = face.w * SC;
  const bh = face.h * SC;
  useEffect(() => onMeasure?.({ F, S, p }), [F, S, p, onMeasure]);
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {/* khay cát/ xốp */}
          <rect x={250} y={surf} width={700} height={180} rx={8} fill={doc.surface === 'xop' ? '#f3efe2' : '#e7cf96'} stroke="#a88a4e" strokeWidth={3} />
          {doc.surface === 'cat' &&
            Array.from({ length: 180 }, (_, i) => <circle key={i} cx={262 + ((i * 7919) % 677)} cy={surf + 8 + ((i * i * 31 + i * 17) % 163)} r={1.8} fill="#b8975a" />)}
          {/* vết lún */}
          <rect x={cx - bw / 2} y={surf} width={bw} height={dent} fill={doc.surface === 'xop' ? '#d9d2bb' : '#c9ab6b'} />
          <g style={{ transition: 'transform 0.3s' }} transform={`translate(0 ${dent})`}>
            <rect x={cx - bw / 2} y={surf - bh} width={bw} height={bh} rx={3} fill="#b5523b" stroke="#6d2c1e" strokeWidth={3} />
            {Array.from({ length: doc.weights }, (_, i) => (
              <g key={i} transform={`translate(${cx} ${surf - bh - 40 - i * 42})`}>
                <rect x={-34} y={0} width={68} height={40} rx={6} fill="#555b63" stroke="#2c3036" strokeWidth={2} />
                <text y={26} textAnchor="middle" fill="#fff" fontWeight={800} fontSize={18}>
                  1 kg
                </text>
              </g>
            ))}
            {/* mũi tên áp lực */}
            {Array.from({ length: 5 }, (_, i) => {
              const x = cx - bw / 2 + ((i + 0.5) * bw) / 5;
              return <line key={i} x1={x} y1={surf - 6} x2={x} y2={surf + 22} stroke="#d62828" strokeWidth={3} markerEnd="url(#pArrow)" />;
            })}
          </g>
          <defs>
            <marker id="pArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="#d62828" />
            </marker>
          </defs>
          <text x={cx} y={surf + 210} textAnchor="middle" className="lab-label">
            {doc.surface === 'xop' ? 'Tấm xốp mềm' : 'Khay cát'} – độ lún: {showValues ? `${fmtShort(dent / SC * 10, 0)} mm` : '?'}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Cách đặt viên gạch (20 cm × 10 cm × 5 cm, 2 kg)">
          <Seg value={doc.face} options={[0, 1, 2] as const} onChange={(f) => onDoc({ ...doc, face: f })} fmtOpt={(f) => FACES[f].name} />
        </Row>
        <Row label="Quả nặng đặt thêm (1 kg)">
          <Seg value={doc.weights} options={[0, 1, 2, 3]} onChange={(w) => onDoc({ ...doc, weights: w })} fmtOpt={(w) => `${w} quả`} />
        </Row>
        <Row label="Bề mặt bị ép">
          <Seg value={doc.surface} options={['cat', 'xop'] as const} onChange={(s) => onDoc({ ...doc, surface: s })} fmtOpt={(s) => (s === 'cat' ? 'Cát' : 'Xốp')} />
        </Row>
        <div className="insp-values two">
          <div>
            <span>Áp lực F</span>
            <b>{fmtShort(F, 0)} N</b>
          </div>
          <div>
            <span>Diện tích bị ép S</span>
            <b>{fmtShort(face.S, 0)} cm²</b>
          </div>
          <div>
            <span>Áp suất p = F / S</span>
            <b>{showValues ? pa(p) : '?'}</b>
          </div>
        </div>
        <p className="small muted">Áp suất càng lớn thì vật bị lún càng sâu. 1 Pa = 1 N/m².</p>
      </aside>
    </div>
  );
}

// ====================== Áp suất chất lỏng theo độ sâu ======================
const TANK = { x0: 220, x1: 720, top: 150, bottom: 600 };
const PXCM = (TANK.bottom - TANK.top) / 60;

export function DepthView({ doc, onDoc, showValues, onMeasure }: EngineProps<DepthDoc, FluidOptions>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const L = LIQUIDS[doc.liquid];
  const d = L.D * 1000 * g; // trọng lượng riêng N/m³
  const p = d * (doc.depth / 100);
  const px = TANK.x0 + 40 + doc.px * (TANK.x1 - TANK.x0 - 80);
  const py = TANK.top + doc.depth * PXCM;
  const dh = Math.min(230, p * 0.035);
  useEffect(() => onMeasure?.({ h: doc.depth, p, d }), [doc.depth, p, d, onMeasure]);
  const onProbe = (e: React.PointerEvent) =>
    start(e, (q) =>
      onDoc({
        ...doc,
        depth: clamp(Math.round((q.y - TANK.top) / PXCM), 0, 58),
        px: clamp((q.x - TANK.x0 - 40) / (TANK.x1 - TANK.x0 - 80), 0, 1),
      }),
    );
  const mano = { x: 960, base: 560 };
  const rot = doc.facing === 0 ? 180 : doc.facing === 1 ? 90 : 0;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={TANK.x0} y={TANK.top} width={TANK.x1 - TANK.x0} height={TANK.bottom - TANK.top} fill={L.color} />
          <path d={`M ${TANK.x0} ${TANK.top - 40} V ${TANK.bottom} H ${TANK.x1} V ${TANK.top - 40}`} fill="none" stroke="#6a7a8c" strokeWidth={5} />
          {[0, 10, 20, 30, 40, 50, 60].map((c) => (
            <g key={c}>
              <line x1={TANK.x0 - 18} y1={TANK.top + c * PXCM} x2={TANK.x0} y2={TANK.top + c * PXCM} stroke="#334" strokeWidth={2} />
              <text x={TANK.x0 - 24} y={TANK.top + c * PXCM} textAnchor="end" dominantBaseline="central" className="tick-small">
                {c} cm
              </text>
            </g>
          ))}
          {/* ống dẫn tới áp kế */}
          <path d={`M ${px} ${py} V ${TANK.top - 70} H ${mano.x - 50} V ${mano.base - 160 - dh / 2}`} fill="none" stroke="#8a8f99" strokeWidth={5} />
          {/* đầu dò */}
          <g transform={`translate(${px} ${py}) rotate(${rot})`} onPointerDown={onProbe} className="draggable">
            <rect x={-26} y={-18} width={52} height={30} rx={6} fill="#7d838a" stroke="#333" strokeWidth={2} />
            <rect x={-22} y={12} width={44} height={6} fill="#e63946" />
            <circle cx={0} cy={0} r={34} fill="transparent" />
          </g>
          <line x1={TANK.x1 + 12} y1={TANK.top} x2={TANK.x1 + 12} y2={py} stroke="#d62828" strokeWidth={3} markerStart="url(#hArrow)" markerEnd="url(#hArrow)" />
          <text x={TANK.x1 + 22} y={(TANK.top + py) / 2} dominantBaseline="central" className="lab-value">
            h = {doc.depth} cm
          </text>
          <defs>
            <marker id="hArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="#d62828" />
            </marker>
          </defs>
          {/* áp kế chữ U */}
          <g>
            <path d={`M ${mano.x - 50} ${mano.base - 380} V ${mano.base} a 50 50 0 0 0 100 0 V ${mano.base - 380}`} fill="none" stroke="#6a7a8c" strokeWidth={22} strokeLinecap="round" />
            <path d={`M ${mano.x - 50} ${mano.base - 160 + dh / 2} V ${mano.base} a 50 50 0 0 0 100 0 V ${mano.base - 160 - dh / 2}`} fill="none" stroke="#e63946" strokeWidth={14} />
            <line x1={mano.x - 80} y1={mano.base - 160 - dh / 2} x2={mano.x + 80} y2={mano.base - 160 - dh / 2} stroke="#333" strokeDasharray="5 4" />
            <line x1={mano.x - 80} y1={mano.base - 160 + dh / 2} x2={mano.x + 80} y2={mano.base - 160 + dh / 2} stroke="#333" strokeDasharray="5 4" />
            <text x={mano.x} y={mano.base + 90} textAnchor="middle" className="lab-label">
              Áp kế chữ U
            </text>
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <p className="small muted">Kéo đầu dò (có màng cao su đỏ) lên xuống, sang ngang trong bình. Độ chênh lệch mực chất lỏng trong áp kế cho biết áp suất.</p>
        <Row label="Chất lỏng trong bình">
          <Seg<Liquid> value={doc.liquid} options={['nuoc', 'dau', 'nuocMuoi']} onChange={(l) => onDoc({ ...doc, liquid: l })} fmtOpt={(l) => LIQUIDS[l].name} />
        </Row>
        <Row label="Màng cao su quay về phía">
          <Seg value={doc.facing} options={[0, 1, 2] as const} onChange={(f) => onDoc({ ...doc, facing: f })} fmtOpt={(f) => ['Lên trên', 'Sang ngang', 'Xuống dưới'][f]} />
        </Row>
        <Row label="Độ sâu h">
          <Slider value={doc.depth} min={0} max={58} step={1} onChange={(v) => onDoc({ ...doc, depth: v })} suffix="cm" digits={0} />
        </Row>
        <div className="insp-values two">
          <div>
            <span>Trọng lượng riêng d</span>
            <b>{fmtShort(d, 0)} N/m³</b>
          </div>
          <div>
            <span>Áp suất p = d·h</span>
            <b>{showValues ? pa(p) : '?'}</b>
          </div>
        </div>
        <Toggle value={doc.atm} onChange={(v) => onDoc({ ...doc, atm: v })} label="Tính cả áp suất khí quyển" />
        {doc.atm && showValues && <p className="small">Áp suất tại điểm đó: p₀ + d·h = {pa(P0 + p)}</p>}
      </aside>
    </div>
  );
}

// ====================== Tia nước từ các lỗ ======================
export function JetsView({ doc, onDoc, showValues }: EngineProps<JetsDoc, FluidOptions>) {
  const tank = { x0: 260, x1: 520, top: 110, bottom: 520 };
  const pxcm = 7;
  const surface = tank.bottom - doc.level * pxcm;
  const holes = [0.25, 0.5, 0.75].map((f) => tank.bottom - f * doc.level * pxcm * 0.95);
  const ground = 640;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={tank.x0} y={tank.bottom} width={tank.x1 - tank.x0} height={ground - tank.bottom} fill="#b9a78a" />
          <rect x={tank.x0} y={surface} width={tank.x1 - tank.x0} height={tank.bottom - surface} fill={LIQUIDS[doc.liquid].color} />
          <path d={`M ${tank.x0} ${tank.top} V ${tank.bottom} H ${tank.x1} V ${tank.top}`} fill="none" stroke="#6a7a8c" strokeWidth={5} />
          <rect x={0} y={ground} width={VW} height={VH - ground} className="lab-table" />
          {holes.map((y, i) => {
            const h = (y - surface) / pxcm / 100; // m
            const v = Math.sqrt(2 * g * Math.max(0, h));
            const H = (ground - y) / pxcm / 100;
            const pts = [];
            for (let t = 0; t <= 1.0001; t += 0.05) {
              const tt = t * Math.sqrt((2 * H) / g);
              pts.push(`${tank.x1 + v * tt * 100 * pxcm},${y + 0.5 * g * tt * tt * 100 * pxcm}`);
            }
            return (
              <g key={i}>
                <circle cx={tank.x1} cy={y} r={6} fill="#333" />
                {doc.open && <polyline points={pts.join(' ')} fill="none" stroke="#3a8de0" strokeWidth={7} strokeLinecap="round" className="jet" />}
                <text x={tank.x0 - 12} y={y} textAnchor="end" dominantBaseline="central" className="lab-small">
                  sâu {showValues ? `${fmtShort(h * 100, 0)} cm` : '?'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="eng-side">
        <button className={`btn big-toggle ${doc.open ? 'on' : ''}`} onClick={() => onDoc({ ...doc, open: !doc.open })}>
          {doc.open ? 'Bịt các lỗ lại' : 'Mở các lỗ ở thành bình'}
        </button>
        <Row label="Mực nước trong bình">
          <Slider value={doc.level} min={20} max={56} step={1} onChange={(v) => onDoc({ ...doc, level: v })} suffix="cm" digits={0} />
        </Row>
        <p className="small">Lỗ càng ở sâu thì tia nước phun ra càng mạnh và xa: áp suất chất lỏng tăng theo độ sâu. Chất lỏng gây áp suất lên cả thành bình.</p>
      </aside>
    </div>
  );
}

// ====================== Bình thông nhau ======================
export function VesselsView({ doc, onDoc }: EngineProps<VesselsDoc, FluidOptions>) {
  const [bump, setBump] = useState<{ col: number; amt: number } | null>(null);
  useEffect(() => {
    if (!bump) return;
    const t = setTimeout(() => setBump(bump.amt <= 0.5 ? null : { ...bump, amt: bump.amt * 0.82 }), 40);
    return () => clearTimeout(t);
  }, [bump]);
  const base = 560;
  const level = base - 60 - doc.water * 6;
  const cols = [
    { x: 330, w: 50, shape: 'narrow' },
    { x: 560, w: 150, shape: 'wide' },
    { x: 820, w: 90, shape: 'cone' },
  ];
  const pour = (i: number) => {
    if (doc.water >= 52) return;
    onDoc({ ...doc, water: doc.water + 4, pourInto: i });
    setBump({ col: i, amt: 40 });
  };
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={300} y={base - 60} width={600} height={60} fill={LIQUIDS.nuoc.color} />
          {cols.map((c, i) => {
            const lv = level - (bump && bump.col === i ? bump.amt : 0) + (bump && bump.col !== i ? bump.amt / 3 : 0);
            const top = 150;
            const path =
              c.shape === 'cone'
                ? `M ${c.x - c.w / 2} ${base - 60} L ${c.x - c.w} ${top} M ${c.x + c.w / 2} ${base - 60} L ${c.x + c.w} ${top}`
                : `M ${c.x - c.w / 2} ${base - 60} V ${top} M ${c.x + c.w / 2} ${base - 60} V ${top}`;
            const fillW = c.shape === 'cone' ? c.w / 2 + ((base - 60 - lv) / (base - 60 - top)) * (c.w / 2) : c.w / 2;
            return (
              <g key={i}>
                {c.shape === 'cone' ? (
                  <path d={`M ${c.x - c.w / 2} ${base - 60} L ${c.x - fillW} ${lv} H ${c.x + fillW} L ${c.x + c.w / 2} ${base - 60} Z`} fill={LIQUIDS.nuoc.color} />
                ) : (
                  <rect x={c.x - c.w / 2} y={lv} width={c.w} height={base - 60 - lv} fill={LIQUIDS.nuoc.color} />
                )}
                <path d={path} stroke="#6a7a8c" strokeWidth={5} fill="none" />
                <line x1={c.x - fillW} y1={lv} x2={c.x + fillW} y2={lv} stroke="#1d4fd8" strokeWidth={3} />
                <g onPointerDown={() => pour(i)} className="draggable">
                  <rect x={c.x - 45} y={60} width={90} height={40} rx={8} fill="var(--accent)" />
                  <text x={c.x} y={86} textAnchor="middle" fill="#fff" fontWeight={800}>
                    Đổ nước
                  </text>
                </g>
              </g>
            );
          })}
          <path d={`M 300 ${base - 60} V ${base} H 900 V ${base - 60}`} fill="none" stroke="#6a7a8c" strokeWidth={5} />
          <line x1={200} y1={level} x2={1000} y2={level} stroke="#d62828" strokeDasharray="10 8" strokeWidth={2} />
          <text x={1010} y={level} dominantBaseline="central" className="lab-small">
            cùng một mực
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <p>Bấm "Đổ nước" vào một nhánh bất kì. Khi nước đứng yên, mực nước ở các nhánh luôn ở cùng một độ cao, dù các nhánh có hình dạng khác nhau.</p>
        <button className="btn" onClick={() => onDoc({ ...doc, water: 14 })}>
          Đặt lại lượng nước
        </button>
        <p className="small muted">Ứng dụng: ấm pha trà (vòi và thân ấm), ống đo mực nước của nồi hơi, hệ thống cấp nước.</p>
      </aside>
    </div>
  );
}

// ====================== Máy nén thuỷ lực ======================
export function PressView({ doc, onDoc, showValues, onMeasure }: EngineProps<PressDoc, FluidOptions>) {
  const F = (doc.f * doc.S) / doc.s;
  const carW = 12000; // N
  const lift = F >= carW ? 1 : 0;
  useEffect(() => onMeasure?.({ f: doc.f, F, s: doc.s, S: doc.S }), [doc.f, F, doc.s, doc.S, onMeasure]);
  const smallW = Math.sqrt(doc.s) * 12;
  const bigW = Math.sqrt(doc.S) * 12;
  const base = 560;
  const bigTop = 330 - lift * 40;
  const smallTop = 330 + lift * 40 * (doc.S / doc.s) * 0.08;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <path d={`M ${300 - smallW / 2} ${smallTop} V ${base} H ${800 + bigW / 2} V ${bigTop} H ${800 - bigW / 2} V ${base - 50} H ${300 + smallW / 2} V ${smallTop} Z`} fill="rgba(235,190,40,0.55)" />
          <path d={`M ${300 - smallW / 2} 220 V ${base} H ${800 + bigW / 2} V 220 M ${800 - bigW / 2} 220 V ${base - 50} H ${300 + smallW / 2} V 220`} fill="none" stroke="#6a7a8c" strokeWidth={5} />
          <rect x={300 - smallW / 2} y={smallTop - 16} width={smallW} height={16} fill="#555" style={{ transition: 'all 0.4s' }} />
          <rect x={800 - bigW / 2} y={bigTop - 16} width={bigW} height={16} fill="#555" style={{ transition: 'all 0.4s' }} />
          <line x1={300} y1={smallTop - 110} x2={300} y2={smallTop - 20} stroke="#d62828" strokeWidth={6} markerEnd="url(#fArrow)" />
          <text x={320} y={smallTop - 80} className="lab-value">
            f = {fmtShort(doc.f, 0)} N
          </text>
          {/* ô tô */}
          <g transform={`translate(${800} ${bigTop - 16})`} style={{ transition: 'all 0.4s' }}>
            <path d="M -110 -20 H 110 V -55 H 60 L 30 -85 H -50 L -80 -55 H -110 Z" fill="#2f80ff" stroke="#1d3f7a" strokeWidth={3} />
            <circle cx={-65} cy={-14} r={16} fill="#222" />
            <circle cx={65} cy={-14} r={16} fill="#222" />
          </g>
          <line x1={800 + bigW / 2 + 30} y1={bigTop - 10} x2={800 + bigW / 2 + 30} y2={bigTop - 110} stroke="#11a05a" strokeWidth={6} markerEnd="url(#fArrow2)" />
          <text x={800 + bigW / 2 + 42} y={bigTop - 70} className="lab-value">
            F = {showValues ? `${fmtShort(F, 0)} N` : '?'}
          </text>
          <defs>
            <marker id="fArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="#d62828" />
            </marker>
            <marker id="fArrow2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="#11a05a" />
            </marker>
          </defs>
          <text x={600} y={base + 60} textAnchor="middle" className="lab-label">
            Chất lỏng truyền nguyên vẹn áp suất đi mọi hướng
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Diện tích pít-tông nhỏ s">
          <Seg value={doc.s} options={[2, 4, 5, 10]} onChange={(v) => onDoc({ ...doc, s: v })} fmtOpt={(v) => `${v} cm²`} />
        </Row>
        <Row label="Diện tích pít-tông lớn S">
          <Seg value={doc.S} options={[100, 200, 400]} onChange={(v) => onDoc({ ...doc, S: v })} fmtOpt={(v) => `${v} cm²`} />
        </Row>
        <Row label="Lực tác dụng lên pít-tông nhỏ f">
          <Slider value={doc.f} min={0} max={600} step={10} onChange={(v) => onDoc({ ...doc, f: v })} suffix="N" digits={0} />
        </Row>
        <div className="insp-values two">
          <div>
            <span>Áp suất truyền đi p = f/s</span>
            <b>{showValues ? pa(doc.f / (doc.s / 10000)) : '?'}</b>
          </div>
          <div>
            <span>Lực nâng F = p·S</span>
            <b>{showValues ? `${fmtShort(F, 0)} N` : '?'}</b>
          </div>
        </div>
        <p className="small">F / f = S / s = {fmtShort(doc.S / doc.s, 1)}. Ô tô nặng 12 000 N được nâng lên khi F ≥ 12 000 N.</p>
      </aside>
    </div>
  );
}

// ====================== Áp suất khí quyển ======================
export function AtmView({ doc, onDoc, showValues }: EngineProps<AtmDoc, FluidOptions>) {
  const pin = P0 * (1 - doc.removed);
  const squeeze = Math.min(0.42, doc.removed * 0.5);
  const cx = 520;
  const w = 220 * (1 - squeeze);
  const top = 200;
  const bottom = 520;
  const arrows = [];
  for (let i = 0; i < 6; i++) {
    const y = top + 30 + i * 50;
    arrows.push(<line key={`l${i}`} x1={cx - w / 2 - 90} y1={y} x2={cx - w / 2 - 8} y2={y} stroke="#1d6fe0" strokeWidth={5} markerEnd="url(#aArrow)" />);
    arrows.push(<line key={`r${i}`} x1={cx + w / 2 + 90} y1={y} x2={cx + w / 2 + 8} y2={y} stroke="#1d6fe0" strokeWidth={5} markerEnd="url(#aArrow)" />);
    const inLen = 70 * (1 - doc.removed);
    if (inLen > 6) {
      arrows.push(<line key={`il${i}`} x1={cx - 10} y1={y} x2={cx - 10 - inLen * 0.9 * (w / 220)} y2={y} stroke="#e85d04" strokeWidth={4} markerEnd="url(#bArrow)" />);
      arrows.push(<line key={`ir${i}`} x1={cx + 10} y1={y} x2={cx + 10 + inLen * 0.9 * (w / 220)} y2={y} stroke="#e85d04" strokeWidth={4} markerEnd="url(#bArrow)" />);
    }
  }
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <defs>
            <marker id="aArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="#1d6fe0" />
            </marker>
            <marker id="bArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="#e85d04" />
            </marker>
          </defs>
          <path
            d={`M ${cx - 110} ${top} Q ${cx - w / 2} ${(top + bottom) / 2} ${cx - 110} ${bottom} H ${cx + 110} Q ${cx + w / 2} ${(top + bottom) / 2} ${cx + 110} ${top} Z`}
            fill="#f1f6fb"
            stroke="#6a7a8c"
            strokeWidth={4}
            style={{ transition: 'd 0.3s' }}
          />
          <rect x={cx - 70} y={top + 80} width={140} height={110} rx={10} fill="#4aa3df" opacity={0.6} />
          <text x={cx} y={top + 145} textAnchor="middle" fontWeight={800} fill="#fff" fontSize={22}>
            SỮA
          </text>
          <path d={`M ${cx + 40} ${top} L ${cx + 70} ${top - 120}`} stroke="#e63946" strokeWidth={10} strokeLinecap="round" />
          {arrows}
          <text x={cx} y={bottom + 50} textAnchor="middle" className="lab-label">
            Mũi tên xanh: áp suất khí quyển · Mũi tên cam: áp suất không khí trong hộp
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Hút bớt không khí trong hộp">
          <Slider value={Math.round(doc.removed * 100)} min={0} max={90} step={5} onChange={(v) => onDoc({ ...doc, removed: v / 100 })} suffix="%" digits={0} />
        </Row>
        <div className="insp-values two">
          <div>
            <span>Áp suất khí quyển</span>
            <b>{showValues ? pa(P0) : '?'}</b>
          </div>
          <div>
            <span>Áp suất trong hộp</span>
            <b>{showValues ? pa(pin) : '?'}</b>
          </div>
        </div>
        <p className="small">Khi hút bớt không khí, áp suất trong hộp giảm, áp suất khí quyển bên ngoài lớn hơn ép hộp bẹp lại theo mọi phía.</p>
        <p className="small muted">Áp suất khí quyển ở mặt biển khoảng 101 300 Pa (bằng áp suất cột thuỷ ngân cao 760 mm).</p>
      </aside>
    </div>
  );
}
