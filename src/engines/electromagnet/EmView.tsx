// Cảm ứng điện từ, máy phát điện xoay chiều, tác dụng của dòng điện xoay chiều (KHTN 9 Bài 14, 15).
import { useEffect, useRef, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, Toggle, clamp, useSvgDrag } from '../../ui/controls';
import { fmtShort } from '../../core/format';
import { useRaf } from '../mechanics/LeverViews';

export interface InductionDoc {
  mode: 'induction';
  /** cực của nam châm quay về phía cuộn dây */
  facing: 'N' | 'S';
  /** số vòng dây */
  turns: 200 | 400 | 800;
}

export interface GeneratorDoc {
  mode: 'generator';
  /** vòng/giây */
  speed: number;
  rotor: 'magnet' | 'coil';
}

export interface AcDoc {
  mode: 'ac';
  source: 'dc' | 'ac';
  /** tần số hiển thị (Hz) – dùng tần số thấp để quan sát chậm */
  f: number;
}

export type EmDoc = InductionDoc | GeneratorDoc | AcDoc;
export type EmOptions = Record<string, never>;

const VW = 1200;
const VH = 680;

/** Đồ thị cuộn theo thời gian (giá trị trong khoảng −1..1). */
function ScrollGraph({ data, x, y, w, h, label }: { data: number[]; x: number; y: number; w: number; h: number; label: string }) {
  const pts = data.map((v, i) => `${x + (i / Math.max(1, data.length - 1)) * w},${y + h / 2 - clamp(v, -1.1, 1.1) * (h / 2 - 6)}`).join(' ');
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill="var(--surface)" stroke="var(--line)" />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke="var(--ink-2)" strokeDasharray="5 4" />
      <polyline points={pts} fill="none" stroke="#e63946" strokeWidth={3} />
      <text x={x + 8} y={y + 20} className="lab-small">
        {label}
      </text>
      <text x={x + w - 8} y={y + h - 8} textAnchor="end" className="lab-small">
        thời gian →
      </text>
    </g>
  );
}

function Galvanometer({ x, y, value }: { x: number; y: number; value: number }) {
  const a = clamp(value, -1, 1) * 55;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-80} y={-80} width={160} height={110} rx={12} fill="#f3f0e6" stroke="#8a7f62" strokeWidth={2} />
      <path d="M -60 -10 A 70 70 0 0 1 60 -10" fill="none" stroke="#333" strokeWidth={2} />
      {[-1, -0.5, 0, 0.5, 1].map((k) => {
        const t = ((k * 55 - 90) * Math.PI) / 180;
        return <line key={k} x1={70 * Math.cos(t)} y1={20 + 70 * Math.sin(t)} x2={58 * Math.cos(t)} y2={20 + 58 * Math.sin(t)} stroke="#333" strokeWidth={2} />;
      })}
      <line x1={0} y1={20} x2={64 * Math.sin((a * Math.PI) / 180)} y2={20 - 64 * Math.cos((a * Math.PI) / 180)} stroke="#d62828" strokeWidth={3} />
      <circle cx={0} cy={20} r={5} fill="#333" />
      <text x={0} y={52} textAnchor="middle" className="lab-small">
        Điện kế
      </text>
    </g>
  );
}

function LedPair({ x, y, value }: { x: number; y: number; value: number }) {
  const on1 = value > 0.08;
  const on2 = value < -0.08;
  const led = (cx: number, color: string, on: boolean) => (
    <g>
      {on && <circle cx={cx} cy={y} r={34} fill={color} opacity={0.4} filter="url(#emBlur)" />}
      <path d={`M ${cx - 14} ${y + 12} V ${y - 6} A 14 14 0 0 1 ${cx + 14} ${y - 6} V ${y + 12} Z`} fill={color} opacity={on ? 1 : 0.35} stroke="#333" strokeWidth={1.5} />
    </g>
  );
  return (
    <g>
      {led(x - 30, '#ff3b30', on1)}
      {led(x + 30, '#2ecc40', on2)}
      <text x={x} y={y + 44} textAnchor="middle" className="lab-small">
        Hai LED mắc ngược chiều
      </text>
    </g>
  );
}

function Coil({ x, y, w, turns }: { x: number; y: number; w: number; turns: number }) {
  const n = turns >= 800 ? 16 : turns >= 400 ? 12 : 8;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <ellipse key={i} cx={x - w / 2 + (i + 0.5) * (w / n)} cy={y} rx={w / n / 2 + 2} ry={70} fill="none" stroke="#c87533" strokeWidth={5} />
      ))}
    </g>
  );
}

function Magnet({ x, y, facing, w = 240 }: { x: number; y: number; facing: 'N' | 'S'; w?: number }) {
  // đầu phải quay về phía cuộn dây
  const right = facing;
  const left = facing === 'N' ? 'S' : 'N';
  const col = (p: string) => (p === 'N' ? '#e63946' : '#1d6fe0');
  return (
    <g>
      <rect x={x - w / 2} y={y - 28} width={w / 2} height={56} fill={col(left)} stroke="#333" strokeWidth={2} />
      <rect x={x} y={y - 28} width={w / 2} height={56} fill={col(right)} stroke="#333" strokeWidth={2} />
      <text x={x - w / 4} y={y + 2} textAnchor="middle" dominantBaseline="central" fill="#fff" fontWeight={900} fontSize={26}>
        {left}
      </text>
      <text x={x + w / 4} y={y + 2} textAnchor="middle" dominantBaseline="central" fill="#fff" fontWeight={900} fontSize={26}>
        {right}
      </text>
    </g>
  );
}

// ====================== Cảm ứng điện từ ======================
export function InductionView({ doc, onDoc, showValues }: EngineProps<InductionDoc, EmOptions>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const coil = { x: 780, y: 300, w: 240 };
  const [mx, setMx] = useState(300);
  const st = useRef({ lastPhi: 0, i: 0, hist: Array(160).fill(0) as number[], auto: null as null | { to: number; v: number } });
  const [, tick] = useState(0);
  // từ thông qua cuộn dây: tăng dần khi nam châm lại gần, lớn nhất khi nằm trong cuộn dây
  const gap = coil.x - coil.w / 2 - (mx + 120);
  const phi = gap > 0 ? 1 / (1 + (gap / 120) ** 2) : Math.min(1.6, 1 + -gap / 200);
  const sign = doc.facing === 'N' ? 1 : -1;
  const gain = doc.turns / 400;

  useRaf((dt) => {
    const s = st.current;
    if (s.auto) {
      const next = mx + s.auto.v * dt;
      if ((s.auto.v > 0 && next >= s.auto.to) || (s.auto.v < 0 && next <= s.auto.to)) {
        setMx(s.auto.to);
        s.auto = null;
      } else setMx(next);
    }
    const dphi = (phi - s.lastPhi) / Math.max(dt, 1e-3);
    s.lastPhi = phi;
    const target = -sign * gain * dphi * 0.9;
    s.i = s.i + (target - s.i) * Math.min(1, dt * 12);
    s.hist.push(clamp(s.i, -1.2, 1.2));
    if (s.hist.length > 160) s.hist.shift();
    tick((t) => t + 1);
  }, true);

  const onMag = (e: React.PointerEvent) => {
    st.current.auto = null;
    const o = mx;
    start(e, (p, s0) => setMx(clamp(o + p.x - s0.x, 160, coil.x - 20)));
  };
  const i = st.current.i;
  const lines = Math.round((phi / 1.6) * 12 * gain);
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <defs>
            <filter id="emBlur">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          {/* đường sức từ xuyên qua cuộn dây */}
          {Array.from({ length: Math.min(14, lines) }, (_, k) => {
            const yy = coil.y - 52 + (k * 104) / 13;
            return <line key={k} x1={coil.x - coil.w / 2 - 6} y1={yy} x2={coil.x + coil.w / 2 + 6} y2={yy} stroke="#7b2cbf" strokeWidth={2} opacity={0.5} />;
          })}
          <Coil x={coil.x} y={coil.y} w={coil.w} turns={doc.turns} />
          <g onPointerDown={onMag} className="draggable">
            <Magnet x={mx} y={coil.y} facing={doc.facing} />
          </g>
          {/* dây nối tới điện kế và LED */}
          <path d={`M ${coil.x - coil.w / 2} ${coil.y + 70} V 470 H 560 M ${coil.x + coil.w / 2} ${coil.y + 70} V 470 H 960`} fill="none" stroke="var(--lead)" strokeWidth={4} />
          <Galvanometer x={560} y={520} value={i} />
          <LedPair x={960} y={500} value={i} />
          <ScrollGraph data={st.current.hist} x={40} y={40} w={420} h={140} label="Cường độ dòng điện cảm ứng" />
          <text x={coil.x} y={coil.y - 100} textAnchor="middle" className="lab-label">
            Cuộn dây {doc.turns} vòng · số đường sức từ xuyên qua: {showValues ? lines : '?'}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <p className="small muted">Kéo nam châm lại gần, đưa vào hoặc rút ra khỏi cuộn dây. Quan sát điện kế, hai đèn LED và đồ thị.</p>
        <div className="insp-actions">
          <button className="btn primary" onClick={() => (st.current.auto = { to: coil.x - 40, v: 600 })}>
            Đưa nhanh vào
          </button>
          <button className="btn" onClick={() => (st.current.auto = { to: coil.x - 40, v: 150 })}>
            Đưa chậm vào
          </button>
          <button className="btn primary" onClick={() => (st.current.auto = { to: 220, v: -600 })}>
            Rút nhanh ra
          </button>
        </div>
        <Row label="Cực nam châm quay về cuộn dây">
          <Seg value={doc.facing} options={['N', 'S'] as const} onChange={(v) => onDoc({ ...doc, facing: v })} fmtOpt={(v) => (v === 'N' ? 'Cực Bắc (N)' : 'Cực Nam (S)')} />
        </Row>
        <Row label="Số vòng dây">
          <Seg value={doc.turns} options={[200, 400, 800] as const} onChange={(v) => onDoc({ ...doc, turns: v })} />
        </Row>
        <p className="small">Khi số đường sức từ xuyên qua tiết diện cuộn dây biến thiên, trong cuộn dây xuất hiện dòng điện cảm ứng. Nam châm đứng yên thì không có dòng điện.</p>
      </aside>
    </div>
  );
}

// ====================== Máy phát điện xoay chiều ======================
export function GeneratorView({ doc, onDoc, showValues }: EngineProps<GeneratorDoc, EmOptions>) {
  const st = useRef({ th: 0, hist: Array(200).fill(0) as number[] });
  const [running, setRunning] = useState(true);
  const [, tick] = useState(0);
  useRaf((dt) => {
    const s = st.current;
    s.th += 2 * Math.PI * doc.speed * dt;
    const i = Math.sin(s.th) * Math.min(1, doc.speed / 2.5);
    s.hist.push(i);
    if (s.hist.length > 200) s.hist.shift();
    tick((t) => t + 1);
  }, running);
  const th = st.current.th;
  const i = running ? Math.sin(th) * Math.min(1, doc.speed / 2.5) : 0;
  const c = { x: 400, y: 330 };
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <defs>
            <filter id="emBlur">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          {doc.rotor === 'magnet' ? (
            <>
              {/* cuộn dây cố định hai bên */}
              <rect x={c.x - 240} y={c.y - 80} width={70} height={160} rx={10} fill="#c87533" opacity={0.85} />
              <rect x={c.x + 170} y={c.y - 80} width={70} height={160} rx={10} fill="#c87533" opacity={0.85} />
              <g transform={`rotate(${(th * 180) / Math.PI} ${c.x} ${c.y})`}>
                <Magnet x={c.x} y={c.y} facing="N" w={300} />
              </g>
              <text x={c.x} y={c.y + 170} textAnchor="middle" className="lab-label">
                Nam châm quay, cuộn dây đứng yên
              </text>
            </>
          ) : (
            <>
              <rect x={c.x - 280} y={c.y - 70} width={70} height={140} fill="#e63946" />
              <text x={c.x - 245} y={c.y + 6} textAnchor="middle" fill="#fff" fontWeight={900} fontSize={30}>
                N
              </text>
              <rect x={c.x + 210} y={c.y - 70} width={70} height={140} fill="#1d6fe0" />
              <text x={c.x + 245} y={c.y + 6} textAnchor="middle" fill="#fff" fontWeight={900} fontSize={30}>
                S
              </text>
              <rect x={c.x - 150 * Math.abs(Math.cos(th))} y={c.y - 110} width={300 * Math.abs(Math.cos(th)) + 4} height={220} fill="none" stroke="#c87533" strokeWidth={10} />
              <text x={c.x} y={c.y + 170} textAnchor="middle" className="lab-label">
                Cuộn dây quay trong từ trường
              </text>
            </>
          )}
          <path d={`M ${c.x} ${c.y + 200} V 560 H 760 M 760 560 H 1000`} fill="none" stroke="var(--lead)" strokeWidth={4} />
          <LedPair x={880} y={470} value={i} />
          <Galvanometer x={1050} y={460} value={i} />
          <ScrollGraph data={st.current.hist} x={700} y={60} w={460} h={200} label="Dòng điện xoay chiều i(t)" />
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Bộ phận quay">
          <Seg value={doc.rotor} options={['magnet', 'coil'] as const} onChange={(v) => onDoc({ ...doc, rotor: v })} fmtOpt={(v) => (v === 'magnet' ? 'Nam châm quay' : 'Cuộn dây quay')} />
        </Row>
        <Row label="Tốc độ quay">
          <Slider value={doc.speed} min={0.2} max={4} step={0.1} onChange={(v) => onDoc({ ...doc, speed: v })} suffix="vòng/s" digits={1} />
        </Row>
        <button className={`btn big-toggle ${running ? 'on' : ''}`} onClick={() => setRunning((r) => !r)}>
          {running ? 'Đang quay – bấm để dừng' : 'Quay'}
        </button>
        <div className="insp-values two">
          <div>
            <span>Tần số dòng điện</span>
            <b>{showValues ? `${fmtShort(doc.speed, 1)} Hz` : '?'}</b>
          </div>
          <div>
            <span>Đổi chiều mỗi giây</span>
            <b>{showValues ? `${fmtShort(doc.speed * 2, 1)} lần` : '?'}</b>
          </div>
        </div>
        <p className="small">Khi nam châm (hoặc cuộn dây) quay, số đường sức từ xuyên qua cuộn dây luân phiên tăng, giảm nên trong cuộn dây xuất hiện dòng điện xoay chiều: hai LED sáng luân phiên. Dòng điện lưới ở Việt Nam có tần số 50 Hz.</p>
      </aside>
    </div>
  );
}

// ====================== Tác dụng của dòng điện xoay chiều ======================
export function AcEffectsView({ doc, onDoc }: EngineProps<AcDoc, EmOptions>) {
  const st = useRef({ t: 0, hist: Array(200).fill(0) as number[], needle: 0, nv: 0 });
  const [, tick] = useState(0);
  const [slow, setSlow] = useState(true);
  useEffect(() => {
    st.current.hist = Array(200).fill(0);
  }, [doc.source]);
  useRaf((dt) => {
    const s = st.current;
    const f = slow ? doc.f : 50;
    s.t += dt;
    const i = doc.source === 'dc' ? 0.8 : Math.sin(2 * Math.PI * f * s.t);
    s.hist.push(doc.source === 'dc' ? 0.8 : Math.sin(2 * Math.PI * Math.min(f, 3) * s.t));
    if (s.hist.length > 200) s.hist.shift();
    // kim nam châm: chịu tác dụng của từ trường cuộn dây (theo dòng điện tức thời)
    const target = i * 50;
    s.nv += ((target - s.needle) * 60 - s.nv * 8) * dt;
    s.needle += s.nv * dt;
    tick((x) => x + 1);
  }, true);
  const s = st.current;
  const f = slow ? doc.f : 50;
  const iNow = doc.source === 'dc' ? 0.8 : Math.sin(2 * Math.PI * f * s.t);
  const lampGlow = doc.source === 'dc' ? 0.8 : slow && doc.f < 5 ? iNow * iNow : 0.5;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <defs>
            <filter id="emBlur">
              <feGaussianBlur stdDeviation="6" />
            </filter>
            <radialGradient id="acGlow">
              <stop offset="0%" stopColor="#fff7c2" />
              <stop offset="100%" stopColor="#ffd000" stopOpacity={0} />
            </radialGradient>
          </defs>
          {/* nguồn */}
          <rect x={60} y={420} width={170} height={110} rx={12} fill="var(--device)" stroke="var(--ink-2)" strokeWidth={2} />
          <text x={145} y={470} textAnchor="middle" className="lab-label">
            {doc.source === 'dc' ? 'Nguồn 1 chiều' : 'Nguồn xoay chiều'}
          </text>
          <text x={145} y={500} textAnchor="middle" className="lab-small">
            {doc.source === 'dc' ? '' : slow ? `${fmtShort(doc.f, 1)} Hz (quay chậm)` : '50 Hz'}
          </text>
          <path d="M 230 450 H 330 V 250 H 1100 M 230 500 H 1100 V 250" fill="none" stroke="var(--lead)" strokeWidth={4} />
          {/* bóng đèn: tác dụng nhiệt, phát sáng */}
          <g transform="translate(400 250)">
            {lampGlow > 0.05 && <circle r={40 + 50 * lampGlow} fill="url(#acGlow)" opacity={Math.min(1, lampGlow + 0.2)} />}
            <circle r={30} fill={lampGlow > 0.05 ? `rgba(255,230,120,${0.4 + lampGlow * 0.6})` : 'var(--glass)'} stroke="#333" strokeWidth={2} />
            <text y={80} textAnchor="middle" className="lab-small">
              Bóng đèn
            </text>
          </g>
          {/* LED đôi */}
          <LedPair x={620} y={250} value={iNow} />
          {/* nam châm điện + kim nam châm */}
          <g transform="translate(880 250)">
            <rect x={-60} y={-18} width={120} height={36} fill="#7d838a" />
            {Array.from({ length: 10 }, (_, k) => (
              <ellipse key={k} cx={-54 + k * 12} cy={0} rx={6} ry={26} fill="none" stroke="#c87533" strokeWidth={3} />
            ))}
            <g transform={`translate(0 120) rotate(${s.needle})`}>
              <path d="M 0 -50 L 10 0 L 0 50 L -10 0 Z" fill="#ddd" stroke="#333" />
              <path d="M 0 -50 L 10 0 L -10 0 Z" fill="#e63946" />
            </g>
            <circle cx={0} cy={120} r={56} fill="none" stroke="var(--ink-2)" strokeWidth={2} />
            <text y={200} textAnchor="middle" className="lab-small">
              Kim nam châm đặt gần cuộn dây
            </text>
          </g>
          <ScrollGraph data={s.hist} x={40} y={40} w={360} h={140} label={doc.source === 'dc' ? 'Dòng điện một chiều' : 'Dòng điện xoay chiều'} />
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Nguồn điện">
          <Seg value={doc.source} options={['dc', 'ac'] as const} onChange={(v) => onDoc({ ...doc, source: v })} fmtOpt={(v) => (v === 'dc' ? 'Một chiều' : 'Xoay chiều')} />
        </Row>
        {doc.source === 'ac' && (
          <>
            <Toggle value={slow} onChange={setSlow} label="Quay chậm để quan sát" />
            {slow && (
              <Row label="Tần số (quay chậm)">
                <Slider value={doc.f} min={0.5} max={10} step={0.5} onChange={(v) => onDoc({ ...doc, f: v })} suffix="Hz" digits={1} />
              </Row>
            )}
          </>
        )}
        <p className="small">
          Dòng điện xoay chiều có tác dụng nhiệt, phát sáng, từ, sinh lí như dòng một chiều. Với tác dụng từ: khi dòng điện đổi chiều thì lực từ đổi chiều, kim nam châm dao động.
        </p>
        <p className="small muted">Ở 50 Hz, bóng đèn sáng gần như liên tục vì mắt không nhận ra sự thay đổi nhanh. Dòng điện qua cơ thể người rất nguy hiểm: tuyệt đối tuân thủ quy tắc an toàn điện.</p>
      </aside>
    </div>
  );
}

export function EmView(props: EngineProps<EmDoc, EmOptions>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = props as EngineProps<any, EmOptions>;
  if (props.doc.mode === 'induction') return <InductionView {...p} />;
  if (props.doc.mode === 'generator') return <GeneratorView {...p} />;
  return <AcEffectsView {...p} />;
}
