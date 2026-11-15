// Moment lực (cánh cửa, cờ lê) và đòn bẩy (KHTN 8 Bài 18, 19).
import { useEffect, useRef, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, clamp, useSvgDrag } from '../../ui/controls';
import { fmt, fmtShort } from '../../core/format';
import type { LeverDoc, MechOptions, MomentDoc } from './model';

const VW = 1200;
const VH = 680;

export function useRaf(cb: (dt: number) => void, running: boolean) {
  const ref = useRef(cb);
  ref.current = cb;
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ref.current(dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running]);
}

function Arrow({ x1, y1, x2, y2, color, width = 6 }: { x1: number; y1: number; x2: number; y2: number; color: string; width?: number }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const L = Math.hypot(x2 - x1, y2 - y1);
  if (L < 2) return null;
  const hl = Math.min(22, L * 0.4);
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - Math.cos(a) * hl * 0.8} y2={y2 - Math.sin(a) * hl * 0.8} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <path d={`M ${x2} ${y2} L ${x2 - hl * Math.cos(a - 0.4)} ${y2 - hl * Math.sin(a - 0.4)} L ${x2 - hl * Math.cos(a + 0.4)} ${y2 - hl * Math.sin(a + 0.4)} Z`} fill={color} />
    </g>
  );
}
export { Arrow };

// ====================== Moment lực ======================
export function MomentView({ doc, onDoc, showValues, onMeasure }: EngineProps<MomentDoc, MechOptions>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const [phi, setPhi] = useState(0); // góc quay của vật (độ)
  const [running, setRunning] = useState(false);
  const omega = useRef(0);
  const isDoor = doc.object === 'door';
  const Lm = isDoor ? 0.8 : 0.25; // chiều dài thật (m)
  const Lpx = isDoor ? 470 : 520;
  const pivot = { x: isDoor ? 300 : 340, y: isDoor ? 590 : 400 };
  const d = doc.r * Lm * Math.abs(Math.sin((doc.angle * Math.PI) / 180));
  const M = doc.F * d;
  useEffect(() => onMeasure?.({ F: doc.F, d, M, r: doc.r * Lm }), [doc.F, d, M, doc.r, Lm, onMeasure]);
  useEffect(() => {
    setPhi(0);
    omega.current = 0;
    setRunning(false);
  }, [doc.r, doc.angle, doc.F, doc.object]);

  useRaf((dt) => {
    // vật quay về phía âm (ngược chiều kim đồng hồ trên màn hình) khi lực có thành phần vuông góc dương
    const sign = Math.sin((doc.angle * Math.PI) / 180) >= 0 ? -1 : 1;
    const I = isDoor ? 3 : 0.05;
    omega.current += ((sign * M) / I) * dt * 60 - omega.current * 1.5 * dt;
    setPhi((p) => {
      const n = p + omega.current * dt;
      if (Math.abs(n) > 90) {
        omega.current = 0;
        return Math.sign(n) * 90;
      }
      return n;
    });
  }, running);

  const ph = (phi * Math.PI) / 180;
  const ux = Math.cos(ph);
  const uy = Math.sin(ph);
  const Px = pivot.x + ux * doc.r * Lpx;
  const Py = pivot.y + uy * doc.r * Lpx;
  const fa = ph + (-doc.angle * Math.PI) / 180;
  const flen = 40 + doc.F * 5;
  const Fx = Px + Math.cos(fa) * flen;
  const Fy = Py + Math.sin(fa) * flen;
  // chân đường vuông góc từ trục quay xuống giá của lực
  const lx = Math.cos(fa);
  const ly = Math.sin(fa);
  const t = (pivot.x - Px) * lx + (pivot.y - Py) * ly;
  const Hx = Px + lx * t;
  const Hy = Py + ly * t;

  const onPointDown = (e: React.PointerEvent) =>
    start(e, (p) => {
      const r = ((p.x - pivot.x) * ux + (p.y - pivot.y) * uy) / Lpx;
      onDoc({ ...doc, r: clamp(Math.round(r * 20) / 20, 0, 1) });
    });
  const onHeadDown = (e: React.PointerEvent) =>
    start(e, (p) => {
      const a = Math.atan2(p.y - Py, p.x - Px) - ph;
      let deg = Math.round((-a * 180) / Math.PI / 5) * 5;
      while (deg > 180) deg -= 360;
      while (deg < -180) deg += 360;
      const F = clamp(Math.round((Math.hypot(p.x - Px, p.y - Py) - 40) / 5), 1, 40);
      onDoc({ ...doc, angle: deg, F });
    });

  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {isDoor ? (
            <g>
              <rect x={pivot.x - 60} y={pivot.y - 18} width={40} height={36} fill="#9aa3ad" />
              <text x={pivot.x - 40} y={pivot.y + 50} textAnchor="middle" className="lab-small">
                Tường
              </text>
              <g transform={`rotate(${phi} ${pivot.x} ${pivot.y})`}>
                <rect x={pivot.x} y={pivot.y - 14} width={Lpx} height={28} rx={4} fill="#c49a6c" stroke="#7a5a37" strokeWidth={3} />
                <circle cx={pivot.x + Lpx - 40} cy={pivot.y} r={9} fill="#d4af37" />
              </g>
              <text x={pivot.x + 280} y={pivot.y + 70} textAnchor="middle" className="lab-small">
                Cánh cửa (nhìn từ trên xuống)
              </text>
            </g>
          ) : (
            <g>
              <polygon points={`${pivot.x - 30},${pivot.y} ${pivot.x - 15},${pivot.y - 26} ${pivot.x + 15},${pivot.y - 26} ${pivot.x + 30},${pivot.y} ${pivot.x + 15},${pivot.y + 26} ${pivot.x - 15},${pivot.y + 26}`} fill="#8a8f99" stroke="#444" strokeWidth={2} />
              <g transform={`rotate(${phi} ${pivot.x} ${pivot.y})`}>
                <path d={`M ${pivot.x - 46} ${pivot.y - 34} a 46 46 0 1 0 0.1 0 Z`} fill="none" stroke="#b0b7c0" strokeWidth={18} />
                <rect x={pivot.x + 30} y={pivot.y - 16} width={Lpx - 30} height={32} rx={14} fill="#b0b7c0" stroke="#666" strokeWidth={2} />
              </g>
              <text x={pivot.x} y={pivot.y + 80} textAnchor="middle" className="lab-small">
                Đai ốc
              </text>
            </g>
          )}
          <circle cx={pivot.x} cy={pivot.y} r={8} fill="#d62828" />
          <text x={pivot.x - 14} y={pivot.y - 22} textAnchor="end" className="lab-label">
            O
          </text>
          {/* giá của lực và cánh tay đòn */}
          <line x1={Px - lx * 900} y1={Py - ly * 900} x2={Px + lx * 900} y2={Py + ly * 900} stroke="#e85d04" strokeDasharray="8 7" strokeWidth={2} opacity={0.6} />
          {d > 0.005 && (
            <g>
              <line x1={pivot.x} y1={pivot.y} x2={Hx} y2={Hy} stroke="#11a05a" strokeWidth={4} />
              <text x={(pivot.x + Hx) / 2 + 10} y={(pivot.y + Hy) / 2 - 10} className="lab-value" fill="#11a05a">
                d
              </text>
            </g>
          )}
          <Arrow x1={Px} y1={Py} x2={Fx} y2={Fy} color="#d62828" />
          <circle cx={Px} cy={Py} r={14} fill="#fff" stroke="#d62828" strokeWidth={3} onPointerDown={onPointDown} className="draggable" />
          <circle cx={Fx} cy={Fy} r={16} fill="rgba(214,40,40,0.15)" stroke="#d62828" strokeDasharray="4 3" onPointerDown={onHeadDown} className="draggable" />
          <text x={Fx + 14} y={Fy - 14} className="lab-value" fill="#d62828">
            F = {fmtShort(doc.F, 0)} N
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <p className="small muted">Kéo chấm tròn trắng để đổi điểm đặt lực; kéo đầu mũi tên để đổi hướng và độ lớn của lực.</p>
        <Row label="Vật">
          <Seg value={doc.object} options={['door', 'wrench'] as const} onChange={(o) => onDoc({ ...doc, object: o })} fmtOpt={(o) => (o === 'door' ? 'Cánh cửa' : 'Cờ lê')} />
        </Row>
        <Row label="Độ lớn lực F">
          <Slider value={doc.F} min={1} max={40} step={1} onChange={(v) => onDoc({ ...doc, F: v })} suffix="N" digits={0} />
        </Row>
        <Row label="Góc giữa lực và vật">
          <Slider value={doc.angle} min={-180} max={180} step={5} onChange={(v) => onDoc({ ...doc, angle: v })} suffix="°" digits={0} />
        </Row>
        <div className="insp-values two">
          <div>
            <span>Cánh tay đòn d</span>
            <b>{showValues ? `${fmt(d, 2)} m` : '?'}</b>
          </div>
          <div>
            <span>Moment M = F·d</span>
            <b>{showValues ? `${fmt(M, 2)} N·m` : '?'}</b>
          </div>
        </div>
        <div className="insp-actions">
          <button className="btn primary big" onClick={() => setRunning((r) => !r)}>
            {running ? 'Dừng' : 'Tác dụng lực'}
          </button>
          <button
            className="btn"
            onClick={() => {
              setRunning(false);
              setPhi(0);
              omega.current = 0;
            }}
          >
            Đóng lại
          </button>
        </div>
        <p className="small">Lực có giá đi qua trục quay hoặc song song với trục quay thì không làm vật quay (M = 0).</p>
      </aside>
    </div>
  );
}

// ====================== Đòn bẩy ======================
const SLOT = 44; // px mỗi vạch (5 cm)
const W1 = 0.5; // N mỗi quả nặng

export function LeverView({ doc, onDoc, showValues, onMeasure }: EngineProps<LeverDoc, MechOptions>) {
  const isMid = doc.fulcrum === 'mid';
  const piv = { x: isMid ? 600 : 230, y: 300 };
  const M = doc.loads.reduce((s, l) => s + l.n * W1 * l.pos * 0.05, 0);
  const tilt = isMid ? clamp(M * 22, -14, 14) : 0;
  const load = doc.loads[0];
  const Feff = !isMid && doc.effortPos ? (load.n * W1 * load.pos) / doc.effortPos : 0;
  useEffect(() => {
    const m: Record<string, number> = { M };
    doc.loads.forEach((l, i) => {
      m[`F${i + 1}`] = l.n * W1;
      m[`d${i + 1}`] = Math.abs(l.pos) * 5;
    });
    if (!isMid) {
      m.F2 = Feff;
      m.d2 = doc.effortPos * 5;
    }
    onMeasure?.(m);
  }, [doc, M, Feff, isMid, onMeasure]);
  const nSlots = isMid ? 10 : 18;
  const xs = isMid ? Array.from({ length: 21 }, (_, i) => i - 10) : Array.from({ length: nSlots + 1 }, (_, i) => i);
  const setLoad = (i: number, p: Partial<(typeof doc.loads)[number]>) => onDoc({ ...doc, loads: doc.loads.map((l, j) => (j === i ? { ...l, ...p } : l)) });
  const balanced = isMid && Math.abs(M) < 1e-9;

  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {/* giá đỡ */}
          <path d={`M ${piv.x} ${piv.y + 8} L ${piv.x - 60} ${piv.y + 300} H ${piv.x + 60} Z`} fill="#8792a2" />
          <rect x={0} y={piv.y + 300} width={VW} height={VH - piv.y - 300} className="lab-table" />
          <g transform={`rotate(${tilt} ${piv.x} ${piv.y})`} style={{ transition: 'transform 0.6s cubic-bezier(.3,1.3,.6,1)' }}>
            <rect x={isMid ? piv.x - (10.5 * SLOT) : piv.x - 20} y={piv.y - 10} width={isMid ? 21 * SLOT : (nSlots + 1) * SLOT} height={20} rx={4} fill="#c49a6c" stroke="#7a5a37" strokeWidth={2} />
            {xs.map((k) => (
              <g key={k}>
                <line x1={piv.x + k * SLOT} y1={piv.y - 10} x2={piv.x + k * SLOT} y2={piv.y + 10} stroke="#5a4127" strokeWidth={k === 0 ? 3 : 1.5} />
                {k !== 0 && (
                  <text x={piv.x + k * SLOT} y={piv.y - 18} textAnchor="middle" className="tick-small">
                    {Math.abs(k)}
                  </text>
                )}
              </g>
            ))}
            {doc.loads.map((l, i) => (
              <g key={i} transform={`rotate(${-tilt} ${piv.x + l.pos * SLOT} ${piv.y})`}>
                <line x1={piv.x + l.pos * SLOT} y1={piv.y + 10} x2={piv.x + l.pos * SLOT} y2={piv.y + 40} stroke="#333" strokeWidth={2} />
                {Array.from({ length: l.n }, (_, k) => (
                  <rect key={k} x={piv.x + l.pos * SLOT - 20} y={piv.y + 40 + k * 22} width={40} height={20} rx={4} fill={i === 0 ? '#e85d04' : '#1d6fe0'} stroke="#222" />
                ))}
                {l.n > 0 && (
                  <text x={piv.x + l.pos * SLOT} y={piv.y + 60 + l.n * 22} textAnchor="middle" className="lab-small">
                    {showValues ? `${fmtShort(l.n * W1, 1)} N` : '?'}
                  </text>
                )}
              </g>
            ))}
            {!isMid && (
              <g>
                <line x1={piv.x + doc.effortPos * SLOT} y1={piv.y - 10} x2={piv.x + doc.effortPos * SLOT} y2={piv.y - 70} stroke="#333" strokeWidth={2} />
                <rect x={piv.x + doc.effortPos * SLOT - 22} y={piv.y - 220} width={44} height={150} rx={10} fill="#f3f0e6" stroke="#8a7f62" strokeWidth={2} />
                <rect x={piv.x + doc.effortPos * SLOT - 16} y={piv.y - 200 + Math.min(110, Feff * 30)} width={32} height={5} fill="#d62828" />
                <line x1={piv.x + doc.effortPos * SLOT} y1={piv.y - 220} x2={piv.x + doc.effortPos * SLOT} y2={piv.y - 300} stroke="#333" strokeWidth={3} />
                <text x={piv.x + doc.effortPos * SLOT + 32} y={piv.y - 150} className="lab-value">
                  {showValues ? `${fmt(Feff, 2)} N` : '?'}
                </text>
                <text x={piv.x + doc.effortPos * SLOT} y={piv.y - 310} textAnchor="middle" className="lab-small">
                  Lực kế (kéo lên)
                </text>
              </g>
            )}
          </g>
          <circle cx={piv.x} cy={piv.y} r={9} fill="#d62828" />
          <text x={piv.x} y={piv.y + 50} textAnchor="middle" className="lab-label">
            O
          </text>
          {isMid && (
            <text x={600} y={170} textAnchor="middle" className="lab-value">
              {showValues ? (balanced ? 'Đòn bẩy cân bằng' : M > 0 ? 'Đòn bẩy nghiêng về bên phải' : 'Đòn bẩy nghiêng về bên trái') : ''}
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        {doc.loads.map((l, i) => (
          <div key={i} className="insp-part">
            <h4 style={{ color: i === 0 ? '#e85d04' : '#1d6fe0' }}>{isMid ? `Quả nặng nhóm ${i + 1}` : 'Vật nặng (F₁)'}</h4>
            <Row label="Số quả nặng (mỗi quả 0,5 N)">
              <Seg value={l.n} options={[0, 1, 2, 3, 4, 5, 6]} onChange={(n) => setLoad(i, { n })} />
            </Row>
            <Row label="Vị trí (vạch, mỗi vạch 5 cm)">
              <Slider value={l.pos} min={isMid ? -10 : 1} max={isMid ? 10 : nSlots} step={1} onChange={(v) => setLoad(i, { pos: v === 0 ? (l.pos > 0 ? 1 : -1) : v })} digits={0} />
            </Row>
          </div>
        ))}
        {!isMid && (
          <Row label="Vị trí lực kế (vạch)">
            <Slider value={doc.effortPos} min={1} max={nSlots} step={1} onChange={(v) => onDoc({ ...doc, effortPos: v })} digits={0} />
          </Row>
        )}
        <div className="calc">
          {isMid ? (
            <>
              <b>Điều kiện cân bằng:</b> F₁·d₁ = F₂·d₂
              {showValues && doc.loads.length >= 2 && (
                <p>
                  {fmtShort(doc.loads[0].n * W1, 1)}·{Math.abs(doc.loads[0].pos) * 5} {balanced ? '=' : '≠'} {fmtShort(doc.loads[1].n * W1, 1)}·{Math.abs(doc.loads[1].pos) * 5} (N·cm)
                </p>
              )}
            </>
          ) : (
            <>
              <b>F₂ = F₁·d₁ / d₂</b>
              {showValues && (
                <p>
                  = {fmtShort(load.n * W1, 1)}·{load.pos * 5} / {doc.effortPos * 5} = {fmt(Feff, 2)} N
                </p>
              )}
              <p className="small">{doc.effortPos > load.pos ? 'd₂ > d₁: dùng lực nhỏ hơn trọng lượng vật (lợi về lực).' : doc.effortPos < load.pos ? 'd₂ < d₁: phải dùng lực lớn hơn trọng lượng vật (thiệt về lực, lợi về đường đi).' : ''}</p>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
