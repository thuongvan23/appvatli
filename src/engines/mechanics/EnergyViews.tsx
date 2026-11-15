// Động năng, thế năng, cơ năng, công, công suất (KHTN 9 Bài 2–4).
import { useEffect, useRef, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, Toggle, clamp, useSvgDrag } from '../../ui/controls';
import { fmt, fmtShort } from '../../core/format';
import type { DropDoc, MechOptions, PowerDoc, RampDoc, TrackDoc, WorkDoc } from './model';
import { Arrow, useRaf } from './LeverViews';

const VW = 1200;
const VH = 680;
const g = 10;

function Bars({ items, max, x, y, h = 260 }: { items: { label: string; value: number; color: string }[]; max: number; x: number; y: number; h?: number }) {
  return (
    <g>
      <line x1={x - 10} y1={y} x2={x + items.length * 80} y2={y} stroke="var(--ink)" strokeWidth={2} />
      {items.map((it, i) => {
        const bh = max > 0 ? (clamp(it.value, 0, max * 1.05) / max) * h : 0;
        return (
          <g key={it.label}>
            <rect x={x + i * 80} y={y - bh} width={56} height={bh} rx={4} fill={it.color} />
            <text x={x + i * 80 + 28} y={y + 24} textAnchor="middle" className="lab-label">
              {it.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

// ====================== Động năng: bi lăn va vào khúc gỗ ======================
const FF = 0.6; // lực cản tác dụng lên khúc gỗ (N)

export function RampView({ doc, onDoc, showValues, onMeasure }: EngineProps<RampDoc, MechOptions>) {
  const [phase, setPhase] = useState<'idle' | 'roll' | 'push' | 'done'>('idle');
  const [t, setT] = useState(0);
  const m = doc.m / 1000;
  const h = doc.h / 100;
  const v = Math.sqrt(2 * g * h);
  const Wd = m * g * h;
  const s = Wd / FF; // m
  useEffect(() => onMeasure?.({ m: doc.m, h: doc.h, v, Wd, s: s * 100 }), [doc.m, doc.h, v, Wd, s, onMeasure]);
  useEffect(() => {
    setPhase('idle');
    setT(0);
  }, [doc.m, doc.h]);

  const floorY = 540;
  const rampX0 = 230;
  const rampX1 = 520;
  const PXH = 10; // px mỗi cm chiều cao
  const topY = floorY - doc.h * PXH;
  const blockX0 = 680;
  const PXS = 4; // px mỗi cm quãng đường
  const r = 10 + doc.m / 20;

  useRaf((dt) => {
    setT((tt) => {
      const n = tt + dt;
      if (phase === 'roll' && n > 1.6) {
        setPhase('push');
        return 0;
      }
      if (phase === 'push' && n > 1.2) {
        setPhase('done');
        return 1.2;
      }
      return n;
    });
  }, phase === 'roll' || phase === 'push');

  let bx = rampX0;
  let by = topY;
  let blockOff = 0;
  if (phase === 'roll') {
    const k = Math.min(1, t / 1.6);
    if (k < 0.7) {
      const q = (k / 0.7) ** 2;
      bx = rampX0 + (rampX1 - rampX0) * q;
      by = topY + (floorY - topY) * q;
    } else {
      const q = (k - 0.7) / 0.3;
      bx = rampX1 + (blockX0 - r - rampX1) * q;
      by = floorY;
    }
  } else if (phase === 'push' || phase === 'done') {
    const k = Math.min(1, t / 1.2);
    blockOff = s * 100 * PXS * (1 - (1 - k) ** 2);
    bx = blockX0 - r + blockOff * 0.15;
    by = floorY;
  }

  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={0} y={floorY} width={VW} height={VH - floorY} className="lab-table" />
          <path d={`M ${rampX0 - 30} ${topY} L ${rampX1} ${floorY} L ${rampX0 - 30} ${floorY} Z`} fill="#b8c3d2" stroke="#6a7a8c" strokeWidth={2} />
          <line x1={rampX0 - 50} y1={topY} x2={rampX0 - 50} y2={floorY} stroke="#d62828" strokeWidth={3} />
          <text x={rampX0 - 58} y={(topY + floorY) / 2} textAnchor="end" className="lab-value">
            h = {doc.h} cm
          </text>
          <circle cx={bx} cy={by - r} r={r} fill="#4a5568" stroke="#1a202c" strokeWidth={2} />
          <rect x={blockX0 + blockOff} y={floorY - 50} width={70} height={50} fill="#c49a6c" stroke="#7a5a37" strokeWidth={2} />
          <line x1={blockX0} y1={floorY + 20} x2={blockX0 + Math.max(blockOff, 0.1)} y2={floorY + 20} stroke="#11a05a" strokeWidth={4} />
          {phase === 'done' && (
            <text x={blockX0 + blockOff / 2} y={floorY + 50} textAnchor="middle" className="lab-value" fill="#11a05a">
              s = {showValues ? `${fmtShort(s * 100, 0)} cm` : '?'}
            </text>
          )}
          <text x={blockX0 + 35} y={floorY - 60} textAnchor="middle" className="lab-small">
            Khúc gỗ
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Khối lượng viên bi">
          <Seg value={doc.m} options={[50, 100, 200]} onChange={(x) => onDoc({ ...doc, m: x })} fmtOpt={(x) => `${x} g`} />
        </Row>
        <Row label="Độ cao thả bi">
          <Seg value={doc.h} options={[10, 20, 30]} onChange={(x) => onDoc({ ...doc, h: x })} fmtOpt={(x) => `${x} cm`} />
        </Row>
        <button
          className="btn primary big"
          onClick={() => {
            setT(0);
            setPhase('roll');
          }}
        >
          Thả viên bi
        </button>
        <div className="insp-values two">
          <div>
            <span>Tốc độ chân dốc v</span>
            <b>{showValues ? `${fmt(v, 2)} m/s` : '?'}</b>
          </div>
          <div>
            <span>Động năng Wđ = ½mv²</span>
            <b>{showValues ? `${fmt(Wd, 2)} J` : '?'}</b>
          </div>
          <div>
            <span>Khúc gỗ dịch chuyển</span>
            <b>{showValues && phase === 'done' ? `${fmtShort(s * 100, 0)} cm` : '?'}</b>
          </div>
        </div>
        <p className="small">Viên bi càng nặng, tốc độ càng lớn thì động năng càng lớn, đẩy khúc gỗ đi càng xa.</p>
      </aside>
    </div>
  );
}

// ====================== Thế năng: vật rơi đóng cọc ======================
const RESIST = 40; // lực cản của cát lên cọc (N)

export function DropView({ doc, onDoc, showValues, onMeasure }: EngineProps<DropDoc, MechOptions>) {
  const [phase, setPhase] = useState<'idle' | 'fall' | 'done'>('idle');
  const [t, setT] = useState(0);
  const m = doc.m / 1000;
  const Wt = m * g * (doc.h / 100);
  const depth = (Wt / RESIST) * 100; // cm
  useEffect(() => onMeasure?.({ m: doc.m, h: doc.h, Wt, depth }), [doc.m, doc.h, Wt, depth, onMeasure]);
  useEffect(() => {
    setPhase('idle');
    setT(0);
  }, [doc.m, doc.h]);
  const T = Math.sqrt((2 * doc.h) / 100 / g) * 2.2;
  useRaf((dt) => {
    setT((tt) => {
      const n = tt + dt;
      if (n >= T) {
        setPhase('done');
        return T;
      }
      return n;
    });
  }, phase === 'fall');
  const sand = 520;
  const PX = 4; // px/cm độ cao
  const stakeTop0 = sand - 70;
  const sink = phase === 'done' ? depth * 6 : 0;
  const stakeTop = stakeTop0 + sink;
  const y0 = stakeTop0 - doc.h * PX;
  const k = phase === 'fall' ? (t / T) ** 2 : phase === 'done' ? 1 : 0;
  const wy = y0 + (stakeTop0 - y0) * k + (phase === 'done' ? sink : 0);
  const size = 30 + doc.m / 25;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={300} y={sand} width={600} height={VH - sand} fill="#e7cf96" />
          <rect x={585} y={stakeTop} width={30} height={160} fill="#8b5a2b" stroke="#5b3a1b" strokeWidth={2} />
          <rect x={600 - size / 2} y={wy - size} width={size} height={size} rx={6} fill="#555b63" stroke="#222" strokeWidth={2} />
          <text x={600 + size / 2 + 10} y={wy - size / 2} className="lab-small" dominantBaseline="central">
            {doc.m} g
          </text>
          <line x1={480} y1={y0} x2={480} y2={stakeTop0} stroke="#d62828" strokeWidth={3} />
          <text x={470} y={(y0 + stakeTop0) / 2} textAnchor="end" className="lab-value">
            h = {doc.h} cm
          </text>
          {phase === 'done' && (
            <text x={640} y={sand + 30} className="lab-value" fill="#11a05a">
              Cọc lún: {showValues ? `${fmtShort(depth, 1)} cm` : '?'}
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Khối lượng vật nặng">
          <Seg value={doc.m} options={[200, 500, 1000]} onChange={(x) => onDoc({ ...doc, m: x })} fmtOpt={(x) => (x >= 1000 ? `${x / 1000} kg` : `${x} g`)} />
        </Row>
        <Row label="Độ cao so với đầu cọc">
          <Slider value={doc.h} min={10} max={100} step={10} onChange={(x) => onDoc({ ...doc, h: x })} suffix="cm" digits={0} />
        </Row>
        <button
          className="btn primary big"
          onClick={() => {
            setT(0);
            setPhase('fall');
          }}
        >
          Thả vật
        </button>
        <div className="insp-values two">
          <div>
            <span>Trọng lượng P</span>
            <b>{fmt(m * g, 1)} N</b>
          </div>
          <div>
            <span>Thế năng Wt = P·h</span>
            <b>{showValues ? `${fmt(Wt, 2)} J` : '?'}</b>
          </div>
        </div>
        <p className="small">Vật ở càng cao, khối lượng càng lớn thì thế năng hấp dẫn càng lớn, khả năng sinh công (đóng cọc lún sâu) càng lớn.</p>
      </aside>
    </div>
  );
}

// ====================== Cơ năng: con lắc / máng cong ======================
export function TrackView({ doc, onDoc, showValues, onMeasure }: EngineProps<TrackDoc, MechOptions>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const L = 1; // m
  const R = 380; // px
  const pivot = { x: 520, y: 120 };
  const [state, setState] = useState({ th: (doc.theta0 * Math.PI) / 180, w: 0 });
  const [running, setRunning] = useState(false);
  const E0 = useRef(0);
  const m = doc.m / 1000;
  const Wt = m * g * L * (1 - Math.cos(state.th));
  const Wd = 0.5 * m * (L * state.w) ** 2;
  if (!running) E0.current = m * g * L * (1 - Math.cos((doc.theta0 * Math.PI) / 180));
  useEffect(() => {
    setState({ th: (doc.theta0 * Math.PI) / 180, w: 0 });
    setRunning(false);
  }, [doc.theta0, doc.kind, doc.friction, doc.m]);
  useEffect(() => onMeasure?.({ Wt, Wd, W: Wt + Wd }), [Wt, Wd, onMeasure]);
  useRaf((dt) => {
    setState((s) => {
      let { th, w } = s;
      const n = 8;
      const h = dt / n;
      for (let i = 0; i < n; i++) {
        const a = -(g / L) * Math.sin(th) - (doc.friction ? 0.35 * w : 0);
        w += a * h;
        th += w * h;
      }
      return { th, w };
    });
  }, running);
  const bx = pivot.x + R * Math.sin(state.th);
  const by = pivot.y + R * Math.cos(state.th);
  const onBob = (e: React.PointerEvent) => {
    setRunning(false);
    start(e, (p) => {
      const th = Math.atan2(p.x - pivot.x, p.y - pivot.y);
      const deg = clamp(Math.round((th * 180) / Math.PI), -80, 80);
      onDoc({ ...doc, theta0: deg });
    });
  };
  const lowest = pivot.y + R;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {doc.kind === 'pendulum' ? (
            <>
              <rect x={pivot.x - 120} y={pivot.y - 20} width={240} height={14} fill="#777" />
              <line x1={pivot.x} y1={pivot.y} x2={bx} y2={by} stroke="#333" strokeWidth={2.5} />
            </>
          ) : (
            <path d={`M ${pivot.x - R * Math.sin(1.4)} ${pivot.y + R * Math.cos(1.4)} A ${R} ${R} 0 0 0 ${pivot.x + R * Math.sin(1.4)} ${pivot.y + R * Math.cos(1.4)}`} fill="none" stroke="#6a7a8c" strokeWidth={12} transform={`translate(0 ${24})`} />
          )}
          <line x1={pivot.x - 450} y1={lowest} x2={pivot.x + 450} y2={lowest} stroke="var(--ink-2)" strokeDasharray="8 6" />
          <text x={pivot.x - 455} y={lowest - 8} className="lab-small">
            Mốc thế năng
          </text>
          <line x1={bx + 40} y1={by} x2={bx + 40} y2={lowest} stroke="#e85d04" strokeWidth={2} />
          <circle cx={bx} cy={by} r={22} fill="#e63946" stroke="#7a1d25" strokeWidth={2} onPointerDown={onBob} className="draggable" />
          <Bars
            x={900}
            y={560}
            max={E0.current || 1}
            items={[
              { label: 'Wđ', value: Wd, color: '#1d6fe0' },
              { label: 'Wt', value: Wt, color: '#e85d04' },
              { label: 'W', value: Wt + Wd, color: '#11a05a' },
            ]}
          />
        </svg>
      </div>
      <aside className="eng-side">
        <p className="small muted">Kéo quả nặng sang một bên rồi bấm "Thả". Theo dõi các cột động năng, thế năng và cơ năng.</p>
        <Row label="Dụng cụ">
          <Seg value={doc.kind} options={['pendulum', 'bowl'] as const} onChange={(k) => onDoc({ ...doc, kind: k })} fmtOpt={(k) => (k === 'pendulum' ? 'Con lắc đơn' : 'Viên bi trong máng cong')} />
        </Row>
        <Toggle value={doc.friction} onChange={(v) => onDoc({ ...doc, friction: v })} label="Có ma sát, lực cản không khí" />
        <div className="insp-actions">
          <button className="btn primary big" onClick={() => setRunning((r) => !r)}>
            {running ? 'Dừng' : 'Thả'}
          </button>
          <button
            className="btn"
            onClick={() => {
              setRunning(false);
              setState({ th: (doc.theta0 * Math.PI) / 180, w: 0 });
            }}
          >
            Đặt lại
          </button>
        </div>
        <div className="insp-values two">
          <div>
            <span>Động năng Wđ</span>
            <b>{showValues ? `${fmt(Wd, 3)} J` : '?'}</b>
          </div>
          <div>
            <span>Thế năng Wt</span>
            <b>{showValues ? `${fmt(Wt, 3)} J` : '?'}</b>
          </div>
          <div>
            <span>Cơ năng W = Wđ + Wt</span>
            <b>{showValues ? `${fmt(Wt + Wd, 3)} J` : '?'}</b>
          </div>
        </div>
        <p className="small">Khi không có ma sát, động năng và thế năng chuyển hoá qua lại, cơ năng được bảo toàn. Khi có ma sát, cơ năng giảm dần.</p>
      </aside>
    </div>
  );
}

// ====================== Công cơ học ======================
export function WorkView({ doc, onDoc, showValues, onMeasure }: EngineProps<WorkDoc, MechOptions>) {
  const [k, setK] = useState(0);
  const [running, setRunning] = useState(false);
  const A = doc.F * doc.s;
  useEffect(() => onMeasure?.({ F: doc.F, s: doc.s, A }), [doc.F, doc.s, A, onMeasure]);
  useEffect(() => {
    setK(0);
    setRunning(false);
  }, [doc.F, doc.s]);
  useRaf((dt) => {
    setK((x) => {
      const n = x + dt / 2.5;
      if (n >= 1) {
        setRunning(false);
        return 1;
      }
      return n;
    });
  }, running);
  const PX = 70;
  const floor = 500;
  const x0 = 120;
  const cx = x0 + doc.s * PX * k;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={0} y={floor} width={VW} height={VH - floor} className="lab-table" />
          {Array.from({ length: 15 }, (_, i) => (
            <g key={i}>
              <line x1={x0 + 50 + i * PX} y1={floor} x2={x0 + 50 + i * PX} y2={floor + 14} stroke="#5b4a2a" strokeWidth={2} />
              <text x={x0 + 50 + i * PX} y={floor + 34} textAnchor="middle" className="tick-small">
                {i} m
              </text>
            </g>
          ))}
          <rect x={cx} y={floor - 100} width={100} height={100} fill="#c49a6c" stroke="#7a5a37" strokeWidth={3} />
          <path d={`M ${cx} ${floor - 100} L ${cx + 100} ${floor} M ${cx + 100} ${floor - 100} L ${cx} ${floor}`} stroke="#7a5a37" strokeWidth={2} />
          <Arrow x1={cx + 100} y1={floor - 50} x2={cx + 120 + doc.F / 4} y2={floor - 50} color="#d62828" />
          <text x={cx + 110} y={floor - 70} className="lab-value" fill="#d62828">
            F = {doc.F} N
          </text>
          <line x1={x0 + 50} y1={floor + 60} x2={x0 + 50 + doc.s * PX} y2={floor + 60} stroke="#11a05a" strokeWidth={4} />
          <text x={x0 + 50 + (doc.s * PX) / 2} y={floor + 90} textAnchor="middle" className="lab-value" fill="#11a05a">
            s = {doc.s} m
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Lực kéo F (cùng hướng chuyển động)">
          <Slider value={doc.F} min={50} max={500} step={50} onChange={(v) => onDoc({ ...doc, F: v })} suffix="N" digits={0} />
        </Row>
        <Row label="Quãng đường s">
          <Slider value={doc.s} min={1} max={12} step={1} onChange={(v) => onDoc({ ...doc, s: v })} suffix="m" digits={0} />
        </Row>
        <button
          className="btn primary big"
          onClick={() => {
            setK(0);
            setRunning(true);
          }}
        >
          Kéo thùng hàng
        </button>
        <div className="insp-values two">
          <div>
            <span>Công A = F·s</span>
            <b>{showValues ? `${A.toLocaleString('vi-VN')} J` : '?'}</b>
          </div>
        </div>
        <p className="small">1 J = 1 N·m. Ngoài ra: 1 kJ = 1 000 J; 1 cal ≈ 4,186 J.</p>
      </aside>
    </div>
  );
}

// ====================== Công suất ======================
export function PowerView({ doc, onDoc, showValues, onMeasure }: EngineProps<PowerDoc, MechOptions>) {
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  const A = doc.m * g * doc.h;
  const PA = A / doc.tA;
  const PB = A / doc.tB;
  useEffect(() => onMeasure?.({ A, PA, PB }), [A, PA, PB, onMeasure]);
  useEffect(() => {
    setT(0);
    setRunning(false);
  }, [doc]);
  const speed = 4; // tua nhanh
  useRaf((dt) => {
    setT((x) => {
      const n = x + dt * speed;
      if (n >= Math.max(doc.tA, doc.tB)) {
        setRunning(false);
        return Math.max(doc.tA, doc.tB);
      }
      return n;
    });
  }, running);
  const ground = 560;
  const top = 160;
  const lift = (tt: number) => (ground - 60) - (ground - 60 - top) * Math.min(1, t / tt);
  const machine = (x: number, tt: number, name: string, P: number) => (
    <g>
      <rect x={x - 6} y={top - 60} width={12} height={ground - top + 60} fill="#f4a300" />
      <rect x={x - 6} y={top - 60} width={150} height={12} fill="#f4a300" />
      <line x1={x + 130} y1={top - 48} x2={x + 130} y2={lift(tt)} stroke="#333" strokeWidth={2} />
      <rect x={x + 100} y={lift(tt)} width={60} height={60} fill="#7d838a" stroke="#333" strokeWidth={2} />
      <text x={x + 130} y={lift(tt) + 36} textAnchor="middle" fill="#fff" fontWeight={800}>
        {doc.m} kg
      </text>
      <text x={x + 70} y={ground + 40} textAnchor="middle" className="lab-label">
        {name}
      </text>
      <text x={x + 70} y={ground + 68} textAnchor="middle" className="lab-value">
        t = {fmtShort(Math.min(t, tt), 1)} s{t >= tt && showValues ? ` · P = ${fmtShort(P, 0)} W` : ''}
      </text>
    </g>
  );
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={0} y={ground} width={VW} height={VH - ground} className="lab-table" />
          <line x1={180} y1={top} x2={1000} y2={top} stroke="#11a05a" strokeDasharray="10 8" strokeWidth={2} />
          <text x={1010} y={top} dominantBaseline="central" className="lab-small">
            h = {doc.h} m
          </text>
          {machine(250, doc.tA, 'Máy A', PA)}
          {machine(650, doc.tB, 'Máy B', PB)}
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Khối lượng vật">
          <Slider value={doc.m} min={50} max={500} step={50} onChange={(v) => onDoc({ ...doc, m: v })} suffix="kg" digits={0} />
        </Row>
        <Row label="Thời gian máy A nâng vật">
          <Slider value={doc.tA} min={5} max={40} step={5} onChange={(v) => onDoc({ ...doc, tA: v })} suffix="s" digits={0} />
        </Row>
        <Row label="Thời gian máy B nâng vật">
          <Slider value={doc.tB} min={5} max={40} step={5} onChange={(v) => onDoc({ ...doc, tB: v })} suffix="s" digits={0} />
        </Row>
        <button
          className="btn primary big"
          onClick={() => {
            setT(0);
            setRunning(true);
          }}
        >
          Bắt đầu nâng (tua nhanh ×4)
        </button>
        <div className="insp-values two">
          <div>
            <span>Công mỗi máy A = P·h</span>
            <b>{showValues ? `${A.toLocaleString('vi-VN')} J` : '?'}</b>
          </div>
          <div>
            <span>Công suất A / B</span>
            <b>{showValues ? `${fmtShort(PA, 0)} W / ${fmtShort(PB, 0)} W` : '?'}</b>
          </div>
        </div>
        <p className="small">Công suất P = A / t cho biết công thực hiện được trong một đơn vị thời gian. 1 kW = 1 000 W; 1 HP ≈ 746 W.</p>
      </aside>
    </div>
  );
}
