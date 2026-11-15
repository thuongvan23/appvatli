// Năng lượng nhiệt, nội năng, joulemeter, sự truyền nhiệt (KHTN 8 Bài 26–28).
import { useEffect, useRef, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider } from '../../ui/controls';
import { fmt, fmtShort } from '../../core/format';
import type { ConductionDoc, ConvectionDoc, DiffusionDoc, JouleDoc, ParticlesDoc, RadiationDoc, ThermalOptions } from './model';
import { useRaf } from '../mechanics/LeverViews';

/** Canvas tự co giãn theo khung, vẽ lại mỗi khung hình. Toạ độ vẽ theo hệ 1200 × 680. */
function useCanvas(draw: (ctx: CanvasRenderingContext2D, dt: number) => void) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const c = ref.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (c) {
        const r = c.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        if (c.width !== Math.round(r.width * dpr) || c.height !== Math.round(r.height * dpr)) {
          c.width = Math.round(r.width * dpr);
          c.height = Math.round(r.height * dpr);
        }
        const ctx = c.getContext('2d');
        if (ctx) {
          const s = Math.min(c.width / 1200, c.height / 680);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, c.width, c.height);
          ctx.setTransform(s, 0, 0, s, (c.width - 1200 * s) / 2, (c.height - 680 * s) / 2);
          drawRef.current(ctx, dt);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return ref;
}

const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#000';

function heatColor(t: number) {
  // 0 → xanh lạnh, 1 → đỏ nóng
  const c = Math.max(0, Math.min(1, t));
  const r = Math.round(60 + 195 * c);
  const g = Math.round(120 + 60 * (1 - Math.abs(c - 0.5) * 2) - 60 * c);
  const b = Math.round(230 * (1 - c));
  return `rgb(${r},${g},${b})`;
}

// ====================== Mô hình hạt ======================
interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hx: number;
  hy: number;
}

export function ParticlesView({ doc, onDoc, showValues }: EngineProps<ParticlesDoc, ThermalOptions>) {
  const parts = useRef<P[]>([]);
  const box = { x0: 330, y0: 110, x1: 870, y1: 590 };
  useEffect(() => {
    const n = 64;
    const cols = 8;
    parts.current = Array.from({ length: n }, (_, i) => {
      const hx = box.x0 + 70 + (i % cols) * 57;
      const hy = box.y1 - 40 - Math.floor(i / cols) * 46;
      return { x: hx, y: hy, vx: Math.random() - 0.5, vy: Math.random() - 0.5, hx, hy };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc.state]);
  const speed = Math.sqrt((doc.T + 273) / 293);
  const ref = useCanvas((ctx, dt) => {
    ctx.strokeStyle = css('--ink-2');
    ctx.lineWidth = 4;
    ctx.strokeRect(box.x0, box.y0, box.x1 - box.x0, box.y1 - box.y0);
    const v0 = doc.state === 'gas' ? 260 : doc.state === 'liquid' ? 90 : 0;
    for (const p of parts.current) {
      if (doc.state === 'solid') {
        // dao động quanh vị trí cân bằng
        const amp = 3 + speed * 6;
        p.vx += (Math.random() - 0.5) * 2000 * dt * speed - (p.x - p.hx) * 40 * dt;
        p.vy += (Math.random() - 0.5) * 2000 * dt * speed - (p.y - p.hy) * 40 * dt;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x = Math.max(p.hx - amp * 2, Math.min(p.hx + amp * 2, p.x + p.vx * dt));
        p.y = Math.max(p.hy - amp * 2, Math.min(p.hy + amp * 2, p.y + p.vy * dt));
      } else {
        const len = Math.hypot(p.vx, p.vy) || 1;
        const target = v0 * speed;
        p.vx = (p.vx / len) * target + (Math.random() - 0.5) * 30;
        p.vy = (p.vy / len) * target + (Math.random() - 0.5) * 30 + (doc.state === 'liquid' ? 40 : 0);
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const top = doc.state === 'liquid' ? box.y0 + 240 : box.y0;
        if (p.x < box.x0 + 18) (p.x = box.x0 + 18), (p.vx = Math.abs(p.vx));
        if (p.x > box.x1 - 18) (p.x = box.x1 - 18), (p.vx = -Math.abs(p.vx));
        if (p.y < top + 18) (p.y = top + 18), (p.vy = Math.abs(p.vy));
        if (p.y > box.y1 - 18) (p.y = box.y1 - 18), (p.vy = -Math.abs(p.vy));
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, 16, 0, Math.PI * 2);
      ctx.fillStyle = heatColor((doc.T + 20) / 140);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.fillStyle = css('--ink');
    ctx.font = 'bold 22px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Nhiệt độ: ${Math.round(doc.T)} °C`, 600, 640);
  });
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <canvas ref={ref} className="eng-svg" />
      </div>
      <aside className="eng-side">
        <Row label="Thể của chất">
          <Seg value={doc.state} options={['solid', 'liquid', 'gas'] as const} onChange={(s) => onDoc({ ...doc, state: s })} fmtOpt={(s) => ({ solid: 'Rắn', liquid: 'Lỏng', gas: 'Khí' })[s]} />
        </Row>
        <Row label="Nhiệt độ">
          <Slider value={doc.T} min={-20} max={120} step={5} onChange={(v) => onDoc({ ...doc, T: v })} suffix="°C" digits={0} />
        </Row>
        <div className="insp-values two">
          <div>
            <span>Tốc độ trung bình của phân tử</span>
            <b>{showValues ? `× ${fmtShort(speed, 2)}` : '?'}</b>
          </div>
        </div>
        <p className="small">Các phân tử luôn chuyển động hỗn loạn không ngừng. Nhiệt độ càng cao thì các phân tử chuyển động càng nhanh, động năng của chúng càng lớn, nội năng của vật càng lớn.</p>
      </aside>
    </div>
  );
}

// ====================== Khuếch tán ======================
export function DiffusionView({ doc, onDoc }: EngineProps<DiffusionDoc, ThermalOptions>) {
  const dye = useRef<{ x: number; y: number; side: number }[]>([]);
  const reset = () => {
    dye.current = [];
    for (let s = 0; s < 2; s++) for (let i = 0; i < 260; i++) dye.current.push({ x: (s === 0 ? 330 : 870) + (Math.random() - 0.5) * 30, y: 230 + Math.random() * 30, side: s });
  };
  useEffect(reset, []);
  const ref = useCanvas((ctx, dt) => {
    const beakers = [
      { cx: 330, T: doc.Tcold, label: 'Nước lạnh' },
      { cx: 870, T: doc.Thot, label: 'Nước nóng' },
    ];
    for (const b of beakers) {
      ctx.fillStyle = b.T > 50 ? 'rgba(255,140,120,0.25)' : 'rgba(110,170,255,0.25)';
      ctx.fillRect(b.cx - 180, 200, 360, 390);
      ctx.strokeStyle = css('--ink-2');
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(b.cx - 180, 160);
      ctx.lineTo(b.cx - 180, 590);
      ctx.lineTo(b.cx + 180, 590);
      ctx.lineTo(b.cx + 180, 160);
      ctx.stroke();
      ctx.fillStyle = css('--ink');
      ctx.font = 'bold 22px Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${b.label} (${b.T} °C)`, b.cx, 640);
    }
    for (const p of dye.current) {
      const T = p.side === 0 ? doc.Tcold : doc.Thot;
      const D = 8 + T * 1.6;
      p.x += (Math.random() - 0.5) * D * dt * 6;
      p.y += (Math.random() - 0.5) * D * dt * 6 + 2 * dt;
      const cx = p.side === 0 ? 330 : 870;
      p.x = Math.max(cx - 172, Math.min(cx + 172, p.x));
      p.y = Math.max(206, Math.min(584, p.y));
      ctx.fillStyle = 'rgba(128,0,128,0.55)';
      ctx.fillRect(p.x - 3, p.y - 3, 6, 6);
    }
  });
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <canvas ref={ref} className="eng-svg" />
      </div>
      <aside className="eng-side">
        <Row label="Nhiệt độ cốc nước lạnh">
          <Slider value={doc.Tcold} min={5} max={40} step={5} onChange={(v) => onDoc({ ...doc, Tcold: v })} suffix="°C" digits={0} />
        </Row>
        <Row label="Nhiệt độ cốc nước nóng">
          <Slider value={doc.Thot} min={40} max={95} step={5} onChange={(v) => onDoc({ ...doc, Thot: v })} suffix="°C" digits={0} />
        </Row>
        <button className="btn primary big" onClick={reset}>
          Nhỏ lại thuốc tím
        </button>
        <p className="small">Thuốc tím lan ra nhanh hơn trong nước nóng: nhiệt độ càng cao, các phân tử chuyển động càng nhanh, hiện tượng khuếch tán xảy ra càng nhanh.</p>
      </aside>
    </div>
  );
}

// ====================== Joulemeter ======================
const C_WATER = 4200;

export function JouleView({ doc, onDoc, showValues, onMeasure }: EngineProps<JouleDoc, ThermalOptions>) {
  const [on, setOn] = useState(false);
  const [t, setT] = useState(0);
  const [speed, setSpeed] = useState(10);
  const E = doc.P * t;
  const T0 = 25;
  const dT = (E * 0.92) / ((doc.m / 1000) * C_WATER);
  const T = Math.min(100, T0 + dT);
  useEffect(() => onMeasure?.({ t, E, T, dT: T - T0, m: doc.m }), [t, E, T, doc.m, onMeasure]);
  useEffect(() => {
    setT(0);
    setOn(false);
  }, [doc.m, doc.P]);
  useRaf((dt) => setT((x) => (T >= 100 ? x : x + dt * speed)), on);
  const level = 240 + (300 - doc.m) * 0.4;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <rect x={0} y={600} width={1200} height={80} className="lab-table" />
          {/* bình nhiệt lượng kế */}
          <rect x={380} y={200} width={300} height={400} rx={20} fill="#d9dee5" stroke="#6a7a8c" strokeWidth={4} />
          <rect x={400} y={level} width={260} height={580 - level} fill={heatColor((T - 20) / 80)} opacity={0.45} />
          <path d={`M 470 160 V 520 ${Array.from({ length: 8 }, (_, i) => `L ${470 + (i % 2 ? 30 : -30)} ${528 + i * 6}`).join(' ')} M 590 160 V 560`} stroke={on ? '#ff6a00' : '#555'} strokeWidth={5} fill="none" />
          {/* nhiệt kế */}
          <rect x={620} y={120} width={22} height={420} rx={11} fill="#fff" stroke="#555" strokeWidth={2} />
          <circle cx={631} cy={550} r={20} fill="#e63946" />
          <rect x={625} y={540 - (T / 110) * 400} width={12} height={(T / 110) * 400 + 10} fill="#e63946" />
          <text x={660} y={540 - (T / 110) * 400} className="lab-value" dominantBaseline="central">
            {showValues ? `${fmtShort(T, 1)} °C` : '? °C'}
          </text>
          {/* joulemeter */}
          <g transform="translate(860 300)">
            <rect x={-140} y={-110} width={280} height={220} rx={16} fill="#2b3a55" />
            <rect x={-118} y={-80} width={236} height={60} rx={6} fill="#11231a" />
            <text x={0} y={-50} textAnchor="middle" dominantBaseline="central" className="lcd-text">
              {showValues ? `${Math.round(E).toLocaleString('vi-VN')} J` : '? J'}
            </text>
            <rect x={-118} y={0} width={236} height={46} rx={6} fill="#11231a" />
            <text x={0} y={23} textAnchor="middle" dominantBaseline="central" className="lcd-text" style={{ fontSize: 20 }}>
              {`${fmtShort(t, 0)} s · ${doc.P} W`}
            </text>
            <text x={0} y={88} textAnchor="middle" fill="#fff" fontWeight={800} fontSize={18}>
              JOULEMETER
            </text>
          </g>
          <path d="M 470 160 Q 470 100 720 120 L 720 300" stroke="#d62828" strokeWidth={4} fill="none" />
          <path d="M 590 160 Q 590 130 740 140 L 740 300" stroke="#222" strokeWidth={4} fill="none" />
          <text x={530} y={640} textAnchor="middle" className="lab-label">
            Bình nhiệt lượng kế ({doc.m} g nước)
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Khối lượng nước">
          <Seg value={doc.m} options={[100, 200, 300]} onChange={(v) => onDoc({ ...doc, m: v })} fmtOpt={(v) => `${v} g`} />
        </Row>
        <Row label="Công suất dây đốt">
          <Seg value={doc.P} options={[20, 40, 60]} onChange={(v) => onDoc({ ...doc, P: v })} fmtOpt={(v) => `${v} W`} />
        </Row>
        <Row label="Tua nhanh thời gian">
          <Seg value={speed} options={[1, 10, 30]} onChange={setSpeed} fmtOpt={(v) => `×${v}`} />
        </Row>
        <div className="insp-actions">
          <button className={`btn big-toggle ${on ? 'on' : ''}`} onClick={() => setOn((o) => !o)}>
            {on ? 'Đang đun – bấm để tắt' : 'Bật nguồn đun nước'}
          </button>
          <button
            className="btn"
            onClick={() => {
              setOn(false);
              setT(0);
            }}
          >
            Thay nước, đặt lại
          </button>
        </div>
        <div className="insp-values two">
          <div>
            <span>Năng lượng cung cấp</span>
            <b>{showValues ? `${Math.round(E).toLocaleString('vi-VN')} J` : '?'}</b>
          </div>
          <div>
            <span>Độ tăng nhiệt độ</span>
            <b>{showValues ? `${fmt(T - T0, 1)} °C` : '?'}</b>
          </div>
        </div>
        <p className="small">Năng lượng cần cung cấp để làm nóng nước tỉ lệ với khối lượng nước và độ tăng nhiệt độ.</p>
      </aside>
    </div>
  );
}

// ====================== Dẫn nhiệt ======================
const DIFF: Record<string, { name: string; k: number; color: string }> = {
  dong: { name: 'Đồng', k: 1.0, color: '#c87533' },
  nhom: { name: 'Nhôm', k: 0.62, color: '#c4cad0' },
  thep: { name: 'Thép', k: 0.16, color: '#6e7378' },
  thuyTinh: { name: 'Thuỷ tinh', k: 0.006, color: '#bfe9f2' },
};

export function ConductionView({ doc, onDoc }: EngineProps<ConductionDoc, ThermalOptions>) {
  const N = 40;
  const temps = useRef<number[][]>([]);
  const [heating, setHeating] = useState(false);
  const [, force] = useState(0);
  const reset = () => {
    temps.current = doc.rods.map(() => Array(N).fill(25));
    force((x) => x + 1);
  };
  useEffect(reset, [doc.rods.join()]);
  useRaf((dt) => {
    const steps = 20;
    for (let s = 0; s < steps; s++) {
      doc.rods.forEach((r, i) => {
        const T = temps.current[i];
        if (!T) return;
        const k = DIFF[r].k * 0.45;
        const nT = T.slice();
        for (let j = 0; j < N; j++) {
          const l = j === 0 ? (heating ? 600 : T[0]) : T[j - 1];
          const rr = j === N - 1 ? T[j] : T[j + 1];
          nT[j] = T[j] + k * (l + rr - 2 * T[j]) * (dt * 2.2) - (T[j] - 25) * 0.0008;
        }
        temps.current[i] = nT;
      });
    }
    force((x) => x + 1);
  }, heating || temps.current.some((r) => r.some((t) => t > 26)));
  const x0 = 260;
  const len = 760;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          {doc.rods.map((r, i) => {
            const y = 150 + i * 170;
            const T = temps.current[i] ?? [];
            return (
              <g key={r}>
                <text x={x0 - 30} y={y + 8} textAnchor="end" className="lab-label">
                  {DIFF[r].name}
                </text>
                {T.map((t, j) => (
                  <rect key={j} x={x0 + (j * len) / N} y={y} width={len / N + 0.5} height={16} fill={t > 60 ? heatColor((t - 25) / 300) : DIFF[r].color} />
                ))}
                <rect x={x0} y={y} width={len} height={16} fill="none" stroke="#444" />
                {[0.2, 0.35, 0.5, 0.65, 0.8].map((f) => {
                  const j = Math.floor(f * N);
                  const fallen = (T[j] ?? 25) > 60;
                  const x = x0 + f * len;
                  return (
                    <g key={f} style={{ transition: 'transform 0.6s ease-in' }} transform={`translate(0 ${fallen ? 60 : 0})`} opacity={fallen ? 0.15 : 1}>
                      <circle cx={x} cy={y + 22} r={9} fill="#f6e7a1" stroke="#a88a4e" />
                      <rect x={x - 2} y={y + 28} width={4} height={34} fill="#666" />
                    </g>
                  );
                })}
              </g>
            );
          })}
          {/* đèn cồn */}
          <g transform={`translate(${x0 - 10} ${150 + doc.rods.length * 170 - 60})`}>
            <rect x={-40} y={0} width={80} height={60} rx={12} fill="#bfe9f2" stroke="#555" />
            {heating && <path d="M -14 0 Q 0 -60 0 -80 Q 6 -50 14 0 Z" fill="#ff8c1a" opacity={0.9} />}
          </g>
          <line x1={x0} y1={130} x2={x0} y2={150 + doc.rods.length * 170 - 140} stroke={heating ? '#ff6a00' : '#999'} strokeWidth={6} strokeDasharray="4 6" />
        </svg>
      </div>
      <aside className="eng-side">
        <p className="small muted">Một đầu các thanh được nung nóng. Các đinh gắn bằng sáp sẽ rơi xuống khi nhiệt truyền tới.</p>
        <div className="insp-actions">
          <button className={`btn big-toggle ${heating ? 'on' : ''}`} onClick={() => setHeating((h) => !h)}>
            {heating ? 'Đang đốt nóng – bấm để tắt đèn' : 'Đốt nóng một đầu thanh'}
          </button>
          <button
            className="btn"
            onClick={() => {
              setHeating(false);
              reset();
            }}
          >
            Làm nguội, gắn lại đinh
          </button>
        </div>
        <Row label="Các thanh so sánh">
          <Seg
            value={doc.rods.join(',')}
            options={['dong,nhom,thep', 'dong,thuyTinh']}
            onChange={(v) => onDoc({ ...doc, rods: v.split(',') as ConductionDoc['rods'] })}
            fmtOpt={(v) => v.split(',').map((k) => DIFF[k].name).join(' – ')}
          />
        </Row>
        <p className="small">Nhiệt truyền từ đầu nóng sang đầu lạnh của thanh: sự dẫn nhiệt. Kim loại dẫn nhiệt tốt (đồng tốt nhất), thuỷ tinh dẫn nhiệt kém.</p>
      </aside>
    </div>
  );
}

// ====================== Đối lưu ======================
export function ConvectionView({ doc, onDoc }: EngineProps<ConvectionDoc, ThermalOptions>) {
  const grains = useRef<{ x: number; y: number }[]>([]);
  const [heating, setHeating] = useState(true);
  useEffect(() => {
    grains.current = Array.from({ length: 220 }, () => ({ x: 380 + Math.random() * 440, y: 180 + Math.random() * 380 }));
  }, [doc.medium]);
  const box = { x0: 360, x1: 840, y0: 160, y1: 580 };
  const hx = 460; // vị trí nguồn nhiệt (lệch trái)
  const ref = useCanvas((ctx, dt) => {
    ctx.fillStyle = doc.medium === 'water' ? 'rgba(90,160,240,0.22)' : 'rgba(220,220,220,0.18)';
    ctx.fillRect(box.x0, box.y0, box.x1 - box.x0, box.y1 - box.y0);
    // dải màu nóng ở cột nước phía trên nguồn nhiệt
    if (heating) {
      const g = ctx.createLinearGradient(hx - 70, 0, hx + 70, 0);
      g.addColorStop(0, 'rgba(255,90,60,0)');
      g.addColorStop(0.5, 'rgba(255,90,60,0.22)');
      g.addColorStop(1, 'rgba(255,90,60,0)');
      ctx.fillStyle = g;
      ctx.fillRect(hx - 70, box.y0, 140, box.y1 - box.y0);
    }
    ctx.strokeStyle = css('--ink-2');
    ctx.lineWidth = 4;
    ctx.strokeRect(box.x0, box.y0, box.x1 - box.x0, box.y1 - box.y0);
    const cx = (box.x0 + box.x1) / 2;
    const cy = (box.y0 + box.y1) / 2;
    for (const p of grains.current) {
      if (heating) {
        // trường vận tốc tuần hoàn: đi lên phía trên nguồn nhiệt, xuống ở phía kia
        const dx = (p.x - cx) / ((box.x1 - box.x0) / 2);
        const dy = (p.y - cy) / ((box.y1 - box.y0) / 2);
        const vx = -dy * 70;
        const vy = dx * 70;
        p.x += (vx + (Math.random() - 0.5) * 30) * dt;
        p.y += (vy + (Math.random() - 0.5) * 30) * dt;
      } else {
        p.y += 6 * dt;
      }
      p.x = Math.max(box.x0 + 6, Math.min(box.x1 - 6, p.x));
      p.y = Math.max(box.y0 + 6, Math.min(box.y1 - 6, p.y));
      ctx.fillStyle = doc.medium === 'water' ? 'rgba(128,0,128,0.65)' : 'rgba(90,90,90,0.6)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    // ngọn lửa
    if (heating) {
      ctx.fillStyle = '#ff8c1a';
      ctx.beginPath();
      ctx.moveTo(hx - 24, box.y1 + 60);
      ctx.quadraticCurveTo(hx, box.y1 - 10, hx, box.y1 + 6);
      ctx.quadraticCurveTo(hx + 6, box.y1 + 20, hx + 24, box.y1 + 60);
      ctx.fill();
    }
    ctx.fillStyle = css('--ink');
    ctx.font = 'bold 20px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(doc.medium === 'water' ? 'Nước có thả vài hạt thuốc tím' : 'Không khí có khói hương', 600, 130);
  });
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <canvas ref={ref} className="eng-svg" />
      </div>
      <aside className="eng-side">
        <Row label="Chất">
          <Seg value={doc.medium} options={['water', 'air'] as const} onChange={(m) => onDoc({ ...doc, medium: m })} fmtOpt={(m) => (m === 'water' ? 'Nước' : 'Không khí')} />
        </Row>
        <button className={`btn big-toggle ${heating ? 'on' : ''}`} onClick={() => setHeating((h) => !h)}>
          {heating ? 'Đang đun – bấm để tắt' : 'Đun nóng đáy bình'}
        </button>
        <p className="small">Lớp chất lỏng (khí) ở dưới nóng lên, nở ra, nhẹ hơn nên đi lên; lớp lạnh ở trên nặng hơn đi xuống, tạo thành dòng đối lưu. Đối lưu xảy ra trong chất lỏng và chất khí.</p>
      </aside>
    </div>
  );
}

// ====================== Bức xạ nhiệt ======================
export function RadiationView({ showValues }: EngineProps<RadiationDoc, ThermalOptions>) {
  const [on, setOn] = useState(false);
  const [T, setT] = useState({ black: 25, white: 25 });
  useRaf(
    (dt) =>
      setT((t) => ({
        black: t.black + ((on ? 2.6 : 0) - (t.black - 25) * 0.03) * dt * 4,
        white: t.white + ((on ? 0.7 : 0) - (t.white - 25) * 0.03) * dt * 4,
      })),
    on || T.black > 25.2,
  );
  const flask = (x: number, color: string, label: string, temp: number) => (
    <g>
      <path d={`M ${x - 20} 260 V 330 Q ${x - 110} 380 ${x - 100} 470 Q ${x - 80} 560 ${x} 560 Q ${x + 80} 560 ${x + 100} 470 Q ${x + 110} 380 ${x + 20} 330 V 260 Z`} fill={color} stroke="#444" strokeWidth={3} />
      <rect x={x - 8} y={150} width={16} height={260} rx={8} fill="#fff" stroke="#555" />
      <rect x={x - 4} y={400 - (temp - 20) * 6} width={8} height={(temp - 20) * 6 + 10} fill="#e63946" />
      <text x={x} y={600} textAnchor="middle" className="lab-label">
        {label}
      </text>
      <text x={x + 24} y={400 - (temp - 20) * 6} className="lab-value" dominantBaseline="central">
        {showValues ? `${fmtShort(temp, 1)} °C` : '?'}
      </text>
    </g>
  );
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <g transform="translate(600 120)">
            <rect x={-50} y={-60} width={100} height={50} fill="#555" />
            <circle cx={0} cy={10} r={44} fill={on ? '#ffe066' : '#ddd'} stroke="#888" strokeWidth={3} />
            {on &&
              Array.from({ length: 10 }, (_, i) => {
                const a = Math.PI * (0.15 + (i / 9) * 0.7);
                return <line key={i} x1={Math.cos(a) * 60} y1={10 + Math.sin(a) * 60} x2={Math.cos(a) * 200} y2={10 + Math.sin(a) * 200} stroke="#ffb703" strokeWidth={4} strokeDasharray="10 10" className="jet" />;
              })}
          </g>
          {flask(380, '#1e1e1e', 'Bình phủ muội đen', T.black)}
          {flask(820, '#f4f4f4', 'Bình sơn trắng', T.white)}
        </svg>
      </div>
      <aside className="eng-side">
        <button className={`btn big-toggle ${on ? 'on' : ''}`} onClick={() => setOn((o) => !o)}>
          {on ? 'Đang chiếu đèn – bấm để tắt' : 'Bật đèn chiếu vào hai bình'}
        </button>
        <button className="btn" onClick={() => setT({ black: 25, white: 25 })}>
          Đặt lại nhiệt độ
        </button>
        <p className="small">Năng lượng nhiệt được truyền đi bằng các tia nhiệt đi thẳng: bức xạ nhiệt. Vật có bề mặt sẫm màu, xù xì hấp thụ bức xạ nhiệt tốt hơn vật có bề mặt sáng màu, nhẵn bóng.</p>
        <p className="small muted">Bức xạ nhiệt truyền được cả trong chân không (năng lượng từ Mặt Trời tới Trái Đất).</p>
      </aside>
    </div>
  );
}
