// Cân điện tử + bình chia độ: đo khối lượng, thể tích, khối lượng riêng (Bài 13, 14).
import { useEffect, useRef, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, useSvgDrag } from '../../ui/controls';
import { fmt, fmtShort } from '../../core/format';
import { DensityDoc, FluidOptions, LIQUIDS, LabObject, Liquid, LiquidDensityDoc, SOLIDS, massOf, volumeOf } from './model';

const VW = 1200;
const VH = 680;
const TABLE_Y = 560;
const SCALE = { x: 430, y: TABLE_Y };
const CYL = { x: 800, bottom: TABLE_Y - 12, w: 90, h: 380 };
const CM = 15; // px mỗi cm khi vẽ vật

export function Lcd({ x, y, text, w = 170 }: { x: number; y: number; text: string; w?: number }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - 22} width={w} height={44} rx={6} fill="#11231a" stroke="#3b5a48" strokeWidth={2} />
      <text x={x} y={y + 2} textAnchor="middle" dominantBaseline="central" className="lcd-text">
        {text}
      </text>
    </g>
  );
}

function Balance({ mass, showValues }: { mass: number; showValues: boolean }) {
  return (
    <g>
      <rect x={SCALE.x - 130} y={SCALE.y - 70} width={260} height={70} rx={12} fill="#e9edf2" stroke="#8792a2" strokeWidth={2} />
      <rect x={SCALE.x - 110} y={SCALE.y - 86} width={220} height={16} rx={4} fill="#c8cfd8" stroke="#8792a2" />
      <Lcd x={SCALE.x} y={SCALE.y - 34} text={showValues ? `${fmt(mass, 1)} g` : '? g'} />
      <text x={SCALE.x} y={SCALE.y + 26} textAnchor="middle" className="lab-label">
        Cân điện tử
      </text>
    </g>
  );
}

function Cylinder({ level, capacity, liquidColor, children, showValues }: { level: number; capacity: number; liquidColor: string; children?: React.ReactNode; showValues: boolean }) {
  const { x, bottom, w, h } = CYL;
  const y = (v: number) => bottom - (v / capacity) * h;
  const ticks = [];
  const minor = capacity <= 100 ? 2 : 5;
  for (let v = 0; v <= capacity; v += minor) {
    const big = v % (minor * 5) === 0;
    ticks.push(<line key={v} x1={x - w / 2} y1={y(v)} x2={x - w / 2 + (big ? 22 : 12)} y2={y(v)} stroke="#334" strokeWidth={big ? 2 : 1} />);
    if (big)
      ticks.push(
        <text key={`t${v}`} x={x - w / 2 + 26} y={y(v)} dominantBaseline="central" className="tick-small">
          {v}
        </text>,
      );
  }
  return (
    <g>
      <rect x={x - w / 2} y={y(level)} width={w} height={bottom - y(level)} fill={liquidColor} />
      <path d={`M ${x - w / 2} ${y(level)} q ${w / 2} 8 ${w} 0`} fill="none" stroke="rgba(30,80,160,0.6)" strokeWidth={2} />
      {children}
      <path d={`M ${x - w / 2} ${bottom - h - 20} V ${bottom} H ${x + w / 2} V ${bottom - h - 20}`} fill="rgba(220,240,255,0.25)" stroke="#6a7a8c" strokeWidth={3} />
      <rect x={x - w / 2 - 25} y={bottom} width={w + 50} height={12} rx={3} fill="#6a7a8c" />
      {ticks}
      <text x={x} y={bottom + 40} textAnchor="middle" className="lab-label">
        Bình chia độ (ml)
      </text>
      {showValues && (
        <text x={x + w / 2 + 12} y={y(level)} dominantBaseline="central" className="lab-value">
          {fmtShort(level, 1)} ml
        </text>
      )}
    </g>
  );
}

function ObjShape({ o, x, y, scale = 1 }: { o: LabObject; x: number; y: number; scale?: number }) {
  // (x, y) là điểm giữa đáy vật
  const col = SOLIDS[o.material].color;
  const k = CM * scale;
  if (o.shape === 'stone') {
    const r = Math.cbrt(volumeOf(o)) * k * 0.62;
    return <path d={`M ${x - r} ${y} Q ${x - r * 1.2} ${y - r * 1.3} ${x - r * 0.1} ${y - r * 1.6} Q ${x + r * 1.1} ${y - r * 1.7} ${x + r} ${y - r * 0.4} Q ${x + r * 0.8} ${y} ${x - r} ${y} Z`} fill={col} stroke="#555" strokeWidth={2} />;
  }
  if (o.shape === 'cylinder') {
    const w = (o.a ?? 2) * k;
    const h = (o.c ?? 4) * k;
    return (
      <g>
        <rect x={x - w / 2} y={y - h} width={w} height={h} fill={col} stroke="#555" strokeWidth={2} />
        <ellipse cx={x} cy={y - h} rx={w / 2} ry={w / 7} fill={col} stroke="#555" strokeWidth={2} />
      </g>
    );
  }
  const w = (o.a ?? 2) * k;
  const h = (o.c ?? o.a ?? 2) * k;
  const dd = Math.min(14, (o.b ?? o.a ?? 2) * k * 0.35);
  return (
    <g>
      <path d={`M ${x - w / 2} ${y - h} l ${dd} ${-dd} h ${w} l ${-dd} ${dd} Z`} fill={col} stroke="#555" strokeWidth={2} style={{ filter: 'brightness(1.15)' }} />
      <path d={`M ${x + w / 2} ${y} l ${dd} ${-dd} v ${-h} l ${-dd} ${dd} Z`} fill={col} stroke="#555" strokeWidth={2} style={{ filter: 'brightness(0.8)' }} />
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill={col} stroke="#555" strokeWidth={2} />
    </g>
  );
}

function objHeightPx(o: LabObject, scale = 1) {
  if (o.shape === 'stone') return Math.cbrt(volumeOf(o)) * CM * scale;
  return (o.c ?? o.a ?? 2) * CM * scale;
}

export function DensityView({ doc, onDoc, options, showValues, onMeasure }: EngineProps<DensityDoc, FluidOptions>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const [drag, setDrag] = useState<{ id: string; x: number; y: number } | null>(null);
  const [selected, setSelected] = useState<string | null>(doc.objects[0]?.id ?? null);

  const onScaleObj = doc.objects.find((o) => o.id === doc.onScale);
  const inCylObj = doc.objects.find((o) => o.id === doc.inCylinder);
  const mass = onScaleObj ? massOf(onScaleObj) : 0;
  const level = doc.water + (inCylObj ? volumeOf(inCylObj) : 0);
  const sel = doc.objects.find((o) => o.id === selected);

  useEffect(() => {
    const m: Record<string, number> = { m: mass, V0: doc.water, V1: level, V: level - doc.water };
    if (sel) {
      m.a = sel.a ?? 0;
      m.b = sel.b ?? sel.a ?? 0;
      m.c = sel.c ?? sel.a ?? 0;
    }
    onMeasure?.(m);
  }, [mass, level, doc.water, sel, onMeasure]);

  const trayPos = (i: number) => ({ x: 90 + (i % 2) * 120, y: 250 + Math.floor(i / 2) * 150 });

  const dragRef = useRef<{ id: string; x: number; y: number } | null>(null);
  const onObjDown = (e: React.PointerEvent, o: LabObject) => {
    setSelected(o.id);
    dragRef.current = null;
    start(
      e,
      (p) => {
        dragRef.current = { id: o.id, x: p.x, y: p.y };
        setDrag(dragRef.current);
      },
      () => {
        const d = dragRef.current;
        dragRef.current = null;
        setDrag(null);
        {
          if (!d) return;
          const onScale = Math.abs(d.x - SCALE.x) < 140 && d.y > SCALE.y - 260 && d.y < SCALE.y;
          const inCyl = Math.abs(d.x - CYL.x) < 80 && d.y > CYL.bottom - CYL.h - 120 && d.y < CYL.bottom;
          const next = { ...doc, onScale: doc.onScale === o.id ? null : doc.onScale, inCylinder: doc.inCylinder === o.id ? null : doc.inCylinder };
          if (onScale) next.onScale = o.id;
          else if (inCyl) {
            const fits = (o.a ?? 2) * CM < CYL.w - 10 || o.shape === 'stone';
            if (fits) next.inCylinder = o.id;
          }
          onDoc(next);
        }
      },
    );
  };

  const objPos = (o: LabObject, i: number) => {
    if (drag?.id === o.id) return { x: drag.x, y: drag.y + objHeightPx(o) / 2, scale: 1 };
    if (doc.onScale === o.id) return { x: SCALE.x, y: SCALE.y - 86, scale: 1 };
    if (doc.inCylinder === o.id) return { x: CYL.x, y: CYL.bottom - 2, scale: 0.9 };
    const t = trayPos(i);
    return { x: t.x, y: t.y + 50, scale: 1 };
  };

  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={0} y={TABLE_Y} width={VW} height={VH - TABLE_Y} className="lab-table" />
          <rect x={20} y={160} width={250} height={TABLE_Y - 180} rx={14} className="lab-tray" />
          <text x={145} y={190} textAnchor="middle" className="lab-label">
            Các vật cần đo
          </text>
          <Balance mass={mass} showValues={showValues} />
          <Cylinder level={level} capacity={doc.capacity} liquidColor={LIQUIDS.nuoc.color} showValues={showValues} />
          {doc.objects.map((o, i) => {
            const p = objPos(o, i);
            return (
              <g key={o.id} onPointerDown={(e) => onObjDown(e, o)} className="draggable" opacity={doc.inCylinder === o.id && drag?.id !== o.id ? 0.85 : 1}>
                <ObjShape o={o} x={p.x} y={p.y} scale={p.scale} />
                {doc.onScale !== o.id && doc.inCylinder !== o.id && drag?.id !== o.id && (
                  <text x={p.x} y={p.y + 24} textAnchor="middle" className="lab-small">
                    {o.name ?? SOLIDS[o.material].name}
                  </text>
                )}
                {selected === o.id && drag?.id !== o.id && <circle cx={p.x} cy={p.y - objHeightPx(o) / 2} r={objHeightPx(o) * 0.9 + 8} fill="none" stroke="var(--accent)" strokeWidth={2} strokeDasharray="5 4" />}
              </g>
            );
          })}
          {options.ruler && sel && sel.shape !== 'stone' && (
            <text x={1040} y={210} textAnchor="middle" className="lab-label">
              Thước đo: a = {fmtShort(sel.a ?? 0, 1)} cm, b = {fmtShort(sel.b ?? sel.a ?? 0, 1)} cm, c = {fmtShort(sel.c ?? sel.a ?? 0, 1)} cm
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <p className="small muted">Kéo vật đặt lên cân để đo khối lượng; thả vật vào bình chia độ để đo thể tích phần nước dâng lên.</p>
        <Row label="Nước ban đầu trong bình chia độ">
          <Slider value={doc.water} min={20} max={doc.capacity - 60} step={5} onChange={(v) => onDoc({ ...doc, water: v })} suffix="ml" digits={0} />
        </Row>
        <div className="insp-values two">
          <div>
            <span>Khối lượng m</span>
            <b>{showValues ? `${fmt(mass, 1)} g` : '?'}</b>
          </div>
          <div>
            <span>Thể tích vật V</span>
            <b>{showValues ? `${fmtShort(level - doc.water, 1)} cm³` : '?'}</b>
          </div>
        </div>
        {options.showCalc && onScaleObj && inCylObj && onScaleObj.id === inCylObj.id && showValues && (
          <div className="calc">
            D = m / V = {fmt(mass, 1)} / {fmtShort(level - doc.water, 1)} = <b>{fmtShort(mass / (level - doc.water), 2)} g/cm³</b> = {fmtShort((mass / (level - doc.water)) * 1000, 0)} kg/m³
          </div>
        )}
        {options.table && <DensityTable />}
      </aside>
    </div>
  );
}

export function DensityTable() {
  const rows: [string, number][] = [
    ['Chì', 11300],
    ['Đồng', 8900],
    ['Sắt, thép', 7800],
    ['Nhôm', 2700],
    ['Đá', 2600],
    ['Thuỷ tinh', 2500],
    ['Nước', 1000],
    ['Dầu ăn', 800],
    ['Gỗ tốt', 600],
  ];
  return (
    <div className="insp-table">
      <h4>Khối lượng riêng một số chất</h4>
      <table>
        <tbody>
          {rows.map(([n, d]) => (
            <tr key={n}>
              <td>{n}</td>
              <td>{d.toLocaleString('vi-VN')} kg/m³</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const CUP_MASS = 52.4;

export function LiquidDensityView({ doc, onDoc, showValues, onMeasure }: EngineProps<LiquidDensityDoc, FluidOptions>) {
  const L = LIQUIDS[doc.liquid];
  const liquidMass = doc.V * L.D;
  const mass = doc.cupOnScale ? CUP_MASS + (doc.poured ? liquidMass : 0) : 0;
  const cylLevel = doc.poured ? 0 : doc.V;
  useEffect(() => {
    onMeasure?.({ m: mass, V: doc.V, m1: CUP_MASS, m2: CUP_MASS + liquidMass });
  }, [mass, doc.V, liquidMass, onMeasure]);
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={0} y={TABLE_Y} width={VW} height={VH - TABLE_Y} className="lab-table" />
          <Balance mass={mass} showValues={showValues} />
          {doc.cupOnScale && (
            <g>
              <path d={`M ${SCALE.x - 55} ${SCALE.y - 200} L ${SCALE.x - 45} ${SCALE.y - 86} H ${SCALE.x + 45} L ${SCALE.x + 55} ${SCALE.y - 200}`} fill="rgba(220,240,255,0.3)" stroke="#6a7a8c" strokeWidth={3} />
              {doc.poured && <path d={`M ${SCALE.x - 47} ${SCALE.y - 86 - Math.min(100, doc.V * 0.8)} L ${SCALE.x - 45} ${SCALE.y - 88} H ${SCALE.x + 45} L ${SCALE.x + 47} ${SCALE.y - 86 - Math.min(100, doc.V * 0.8)} Z`} fill={L.color} />}
            </g>
          )}
          <Cylinder level={cylLevel} capacity={250} liquidColor={L.color} showValues={showValues} />
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Chất lỏng">
          <Seg<Liquid> value={doc.liquid} options={['nuoc', 'dau', 'nuocMuoi', 'ruou']} onChange={(l) => onDoc({ ...doc, liquid: l, poured: false })} fmtOpt={(l) => LIQUIDS[l].name} />
        </Row>
        <Row label="Thể tích chất lỏng đong được">
          <Slider value={doc.V} min={20} max={200} step={10} onChange={(v) => onDoc({ ...doc, V: v, poured: false })} suffix="ml" digits={0} />
        </Row>
        <div className="insp-actions">
          <button className={`btn ${doc.cupOnScale ? 'on' : ''}`} onClick={() => onDoc({ ...doc, cupOnScale: !doc.cupOnScale, poured: false })}>
            {doc.cupOnScale ? 'Nhấc cốc khỏi cân' : '1. Đặt cốc rỗng lên cân'}
          </button>
          <button className="btn" disabled={!doc.cupOnScale} onClick={() => onDoc({ ...doc, poured: !doc.poured })}>
            {doc.poured ? 'Đổ chất lỏng trở lại bình' : '2. Rót chất lỏng vào cốc'}
          </button>
        </div>
        <div className="insp-values two">
          <div>
            <span>Số chỉ của cân</span>
            <b>{showValues ? `${fmt(mass, 1)} g` : '?'}</b>
          </div>
          <div>
            <span>Thể tích V</span>
            <b>{fmtShort(doc.V, 0)} ml</b>
          </div>
        </div>
        <p className="small muted">Khối lượng chất lỏng = (cốc + chất lỏng) − cốc rỗng. D = m / V.</p>
        <DensityTable />
      </aside>
    </div>
  );
}
