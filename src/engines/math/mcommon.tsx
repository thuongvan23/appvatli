// Tiện ích hình học và hệ trục toạ độ dùng chung cho các engine Toán 8.
import type { ReactNode } from 'react';

export const VW = 1200;
export const VH = 680;
/** 1 đơn vị độ dài (cm) trên hình vẽ = 40 px */
export const UNIT = 40;

export interface P {
  x: number;
  y: number;
}

export const add = (a: P, b: P): P => ({ x: a.x + b.x, y: a.y + b.y });
export const sub = (a: P, b: P): P => ({ x: a.x - b.x, y: a.y - b.y });
export const mul = (a: P, k: number): P => ({ x: a.x * k, y: a.y * k });
export const lerp = (a: P, b: P, k: number): P => ({ x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k });
export const mid = (a: P, b: P) => lerp(a, b, 0.5);
export const dist = (a: P, b: P) => Math.hypot(a.x - b.x, a.y - b.y);
export const dot = (a: P, b: P) => a.x * b.x + a.y * b.y;
export const cross = (a: P, b: P) => a.x * b.y - a.y * b.x;
/** Quay 90° (ngược chiều kim đồng hồ trên màn hình) */
export const rot90 = (a: P): P => ({ x: a.y, y: -a.x });
export const rot = (a: P, deg: number): P => {
  const r = (deg * Math.PI) / 180;
  return { x: a.x * Math.cos(r) - a.y * Math.sin(r), y: a.x * Math.sin(r) + a.y * Math.cos(r) };
};
export const unit = (a: P): P => {
  const l = Math.hypot(a.x, a.y) || 1;
  return { x: a.x / l, y: a.y / l };
};
/** Hình chiếu của p lên đường thẳng qua a, b */
export const project = (p: P, a: P, b: P): P => {
  const d = sub(b, a);
  const k = dot(sub(p, a), d) / (dot(d, d) || 1);
  return add(a, mul(d, k));
};
/** Tham số k của hình chiếu (0 tại a, 1 tại b) */
export const projK = (p: P, a: P, b: P) => {
  const d = sub(b, a);
  return dot(sub(p, a), d) / (dot(d, d) || 1);
};
/** Đối xứng của p qua đường thẳng ab */
export const reflect = (p: P, a: P, b: P): P => sub(mul(project(p, a, b), 2), p);
/** Giao điểm hai đường thẳng (a1a2) và (b1b2) */
export function intersect(a1: P, a2: P, b1: P, b2: P): P | null {
  const d1 = sub(a2, a1);
  const d2 = sub(b2, b1);
  const den = cross(d1, d2);
  if (Math.abs(den) < 1e-9) return null;
  const k = cross(sub(b1, a1), d2) / den;
  return add(a1, mul(d1, k));
}
/** Số đo góc ABC (độ, 0..180) */
export function angleAt(a: P, b: P, c: P): number {
  const u = sub(a, b);
  const v = sub(c, b);
  const cs = dot(u, v) / ((Math.hypot(u.x, u.y) || 1) * (Math.hypot(v.x, v.y) || 1));
  return (Math.acos(Math.max(-1, Math.min(1, cs))) * 180) / Math.PI;
}
/** Diện tích đa giác (px²) */
export const polyArea = (pts: P[]) => Math.abs(pts.reduce((s, p, i) => s + cross(p, pts[(i + 1) % pts.length]), 0)) / 2;
/** Hai đường thẳng song song (sai số góc, độ) */
export const isParallel = (a1: P, a2: P, b1: P, b2: P, tol = 1.2) => {
  const d1 = unit(sub(a2, a1));
  const d2 = unit(sub(b2, b1));
  return (Math.asin(Math.min(1, Math.abs(cross(d1, d2)))) * 180) / Math.PI < tol;
};
export const cm = (px: number) => px / UNIT;

/** Số đo đoạn thẳng (cm, 1 chữ số thập phân, dấu phẩy) */
export const fcm = (px: number, d = 1) => (px / UNIT).toFixed(d).replace('.', ',');
export const fdeg = (x: number) => `${Math.round(x)}°`;
export const f2 = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',').replace('-', '−') : '–');

// ---------------- Thành phần vẽ ----------------

export function Pt({ p, label, color = 'var(--accent)', r = 9, dx = 0, dy = -16, onDown, big }: { p: P; label?: string; color?: string; r?: number; dx?: number; dy?: number; onDown?: (e: React.PointerEvent) => void; big?: boolean }) {
  return (
    <g className={onDown ? 'draggable' : ''} onPointerDown={onDown}>
      {onDown && <circle cx={p.x} cy={p.y} r={24} fill="transparent" />}
      <circle cx={p.x} cy={p.y} r={onDown ? r + 2 : r - 3} fill={onDown ? color : 'var(--ink)'} stroke="var(--surface)" strokeWidth={2.5} />
      {label && (
        <text x={p.x + dx} y={p.y + dy} textAnchor="middle" fontSize={big ? 30 : 24} fontWeight={800} fontStyle="italic" fill="var(--ink)" stroke="var(--board, #fff)" strokeWidth={5} paintOrder="stroke">
          {label}
        </text>
      )}
    </g>
  );
}

/** Nhãn đặt lệch ra ngoài so với tâm hình (để không đè lên cạnh) */
export function labelOff(p: P, center: P, d = 26): { dx: number; dy: number } {
  const u = unit(sub(p, center));
  return { dx: u.x * d, dy: u.y * d + 8 };
}

export function Line({ a, b, color = 'var(--ink)', w = 3, dash, op }: { a: P; b: P; color?: string; w?: number; dash?: string; op?: number }) {
  return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={color} strokeWidth={w} strokeDasharray={dash} strokeLinecap="round" opacity={op} />;
}

/** Đường thẳng kéo dài qua a, b (cắt theo khung hình) */
export function InfLine({ a, b, color = 'var(--ink-2)', w = 2, dash }: { a: P; b: P; color?: string; w?: number; dash?: string }) {
  const d = unit(sub(b, a));
  const L = 2000;
  return <Line a={add(a, mul(d, -L))} b={add(a, mul(d, L))} color={color} w={w} dash={dash} />;
}

export function Poly({ pts, fill = 'none', stroke = 'var(--ink)', w = 3, op }: { pts: P[]; fill?: string; stroke?: string; w?: number; op?: number }) {
  return <polygon points={pts.map((p) => `${p.x},${p.y}`).join(' ')} fill={fill} stroke={stroke} strokeWidth={w} strokeLinejoin="round" opacity={op} />;
}

/** Cung đánh dấu góc tại o (giữa hai tia oa, ob); n cung; tự vẽ kí hiệu góc vuông nếu ≈ 90° */
export function Arc({ a, o, b, r = 34, color = 'var(--accent)', n = 1, label, fill, right = true }: { a: P; o: P; b: P; r?: number; color?: string; n?: number; label?: string; fill?: boolean; right?: boolean }) {
  const u = unit(sub(a, o));
  const v = unit(sub(b, o));
  const ang = angleAt(a, o, b);
  if (right && Math.abs(ang - 90) < 0.6) {
    const s = r * 0.55;
    const p1 = add(o, mul(u, s));
    const p2 = add(add(o, mul(u, s)), mul(v, s));
    const p3 = add(o, mul(v, s));
    return <path d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y}`} fill="none" stroke={color} strokeWidth={2.5} />;
  }
  const sweep = cross(u, v) > 0 ? 1 : 0;
  const arcs: ReactNode[] = [];
  for (let k = 0; k < n; k++) {
    const rr = r + k * 6;
    const p1 = add(o, mul(u, rr));
    const p2 = add(o, mul(v, rr));
    arcs.push(<path key={k} d={`M ${p1.x} ${p1.y} A ${rr} ${rr} 0 0 ${sweep} ${p2.x} ${p2.y}`} fill="none" stroke={color} strokeWidth={2.5} />);
  }
  const bis = unit(add(u, v));
  const lp = add(o, mul(bis, r + 26));
  return (
    <g>
      {fill && <path d={`M ${o.x} ${o.y} L ${add(o, mul(u, r)).x} ${add(o, mul(u, r)).y} A ${r} ${r} 0 0 ${sweep} ${add(o, mul(v, r)).x} ${add(o, mul(v, r)).y} Z`} fill={color} opacity={0.18} />}
      {arcs}
      {label && (
        <text x={lp.x} y={lp.y + 7} textAnchor="middle" fontSize={18} fontWeight={800} fill={color} stroke="var(--board, #fff)" strokeWidth={4} paintOrder="stroke">
          {label}
        </text>
      )}
    </g>
  );
}

/** Vạch đánh dấu hai đoạn bằng nhau (n vạch) ở trung điểm đoạn */
export function Ticks({ a, b, n = 1, color = 'var(--ink)' }: { a: P; b: P; n?: number; color?: string }) {
  const m = mid(a, b);
  const d = unit(sub(b, a));
  const nn = rot90(d);
  return (
    <g>
      {Array.from({ length: n }, (_, k) => {
        const c = add(m, mul(d, (k - (n - 1) / 2) * 7));
        return <Line key={k} a={add(c, mul(nn, 9))} b={add(c, mul(nn, -9))} color={color} w={2.5} />;
      })}
    </g>
  );
}

/** Mũi tên nhỏ trên cạnh để đánh dấu hai cạnh song song */
export function ParMark({ a, b, n = 1, color = 'var(--ink)' }: { a: P; b: P; n?: number; color?: string }) {
  const m = mid(a, b);
  const d = unit(sub(b, a));
  const nn = rot90(d);
  return (
    <g>
      {Array.from({ length: n }, (_, k) => {
        const c = add(m, mul(d, (k - (n - 1) / 2) * 10 + 5));
        const t1 = add(add(c, mul(d, -10)), mul(nn, 7));
        const t2 = add(add(c, mul(d, -10)), mul(nn, -7));
        return <path key={k} d={`M ${t1.x} ${t1.y} L ${c.x} ${c.y} L ${t2.x} ${t2.y}`} fill="none" stroke={color} strokeWidth={2.5} />;
      })}
    </g>
  );
}

/** Nhãn độ dài đặt cạnh trung điểm đoạn, lệch ra phía ngoài so với điểm `away` */
export function SegLabel({ a, b, text, away, color = 'var(--ink-2)', off = 22 }: { a: P; b: P; text: string; away?: P; color?: string; off?: number }) {
  const m = mid(a, b);
  let nn = rot90(unit(sub(b, a)));
  if (away && dot(nn, sub(away, m)) > 0) nn = mul(nn, -1);
  const p = add(m, mul(nn, off));
  return (
    <text x={p.x} y={p.y + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={color} stroke="var(--board, #fff)" strokeWidth={4} paintOrder="stroke">
      {text}
    </text>
  );
}

// ---------------- Hệ trục toạ độ ----------------

export interface Axes {
  X: (x: number) => number;
  Y: (y: number) => number;
  ix: (px: number) => number;
  iy: (py: number) => number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  box: { x: number; y: number; w: number; h: number };
}

export function mkAxes(x0: number, x1: number, y0: number, y1: number, box = { x: 40, y: 20, w: 840, h: 640 }): Axes {
  const sx = box.w / (x1 - x0);
  const sy = box.h / (y1 - y0);
  return {
    X: (x) => box.x + (x - x0) * sx,
    Y: (y) => box.y + (y1 - y) * sy,
    ix: (px) => x0 + (px - box.x) / sx,
    iy: (py) => y1 - (py - box.y) / sy,
    x0,
    x1,
    y0,
    y1,
    box,
  };
}

/** Lưới ô vuông + trục Ox, Oy có vạch chia và mũi tên */
export function Grid({ ax, step = 1, labelStep = 1, stepY, labelStepY, xName = 'x', yName = 'y' }: { ax: Axes; step?: number; labelStep?: number; stepY?: number; labelStepY?: number; xName?: string; yName?: string }) {
  const sy = stepY ?? step;
  const lsy = labelStepY ?? labelStep;
  const { X, Y, x0, x1, y0, y1, box } = ax;
  const xs: number[] = [];
  for (let v = Math.ceil(x0 / step) * step; v <= x1 + 1e-9; v += step) xs.push(Math.round(v * 1e6) / 1e6);
  const ys: number[] = [];
  for (let v = Math.ceil(y0 / sy) * sy; v <= y1 + 1e-9; v += sy) ys.push(Math.round(v * 1e6) / 1e6);
  const ox = Math.min(Math.max(X(0), box.x), box.x + box.w);
  const oy = Math.min(Math.max(Y(0), box.y), box.y + box.h);
  const lab = (v: number, ls = labelStep) => Math.abs(v / ls - Math.round(v / ls)) < 1e-6 && Math.abs(v) > 1e-9;
  return (
    <g>
      <rect x={box.x} y={box.y} width={box.w} height={box.h} fill="var(--surface)" opacity={0.75} />
      {xs.map((v) => (
        <line key={`gx${v}`} x1={X(v)} x2={X(v)} y1={box.y} y2={box.y + box.h} stroke="var(--line)" strokeWidth={1} />
      ))}
      {ys.map((v) => (
        <line key={`gy${v}`} y1={Y(v)} y2={Y(v)} x1={box.x} x2={box.x + box.w} stroke="var(--line)" strokeWidth={1} />
      ))}
      <line x1={box.x} x2={box.x + box.w + 18} y1={oy} y2={oy} stroke="var(--ink)" strokeWidth={2.5} />
      <line x1={ox} x2={ox} y1={box.y + box.h} y2={box.y - 14} stroke="var(--ink)" strokeWidth={2.5} />
      <path d={`M ${box.x + box.w + 24} ${oy} l -14 -7 l 0 14 Z`} fill="var(--ink)" />
      <path d={`M ${ox} ${box.y - 20} l -7 14 l 14 0 Z`} fill="var(--ink)" />
      <text x={box.x + box.w + 14} y={oy + 28} fontSize={20} fontStyle="italic" fontWeight={700} fill="var(--ink)">
        {xName}
      </text>
      <text x={ox + 12} y={box.y - 2} fontSize={20} fontStyle="italic" fontWeight={700} fill="var(--ink)">
        {yName}
      </text>
      <text x={ox - 8} y={oy + 20} textAnchor="end" className="tick-small">
        O
      </text>
      {xs.filter((v) => lab(v)).map((v) => (
        <text key={`lx${v}`} x={X(v)} y={oy + 20} textAnchor="middle" className="tick-small">
          {fmtTick(v)}
        </text>
      ))}
      {ys.filter((v) => lab(v, lsy)).map((v) => (
        <text key={`ly${v}`} x={ox - 8} y={Y(v) + 5} textAnchor="end" className="tick-small">
          {fmtTick(v)}
        </text>
      ))}
    </g>
  );
}

const fmtTick = (v: number) => String(Math.round(v * 100) / 100).replace('.', ',').replace('-', '−');

/** Đường cong y = f(x) trên hệ trục (tự ngắt tại điểm không xác định / nhảy vọt) */
export function Curve({ ax, f, color = 'var(--accent)', w = 4, dash }: { ax: Axes; f: (x: number) => number; color?: string; w?: number; dash?: string }) {
  const { X, Y, x0, x1, y0, y1 } = ax;
  const N = 600;
  let d = '';
  let pen = false;
  let prev = NaN;
  for (let i = 0; i <= N; i++) {
    const x = x0 + ((x1 - x0) * i) / N;
    const y = f(x);
    const ok = Number.isFinite(y) && y > y0 - (y1 - y0) && y < y1 + (y1 - y0) && !(Number.isFinite(prev) && Math.abs(y - prev) > (y1 - y0) * 0.8);
    if (!ok) {
      pen = false;
      prev = y;
      continue;
    }
    d += `${pen ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(y).toFixed(1)} `;
    pen = true;
    prev = y;
  }
  return (
    <g>
      <clipPath id="axclip">
        <rect x={ax.box.x} y={ax.box.y} width={ax.box.w} height={ax.box.h} />
      </clipPath>
      <path d={d} fill="none" stroke={color} strokeWidth={w} strokeDasharray={dash} clipPath="url(#axclip)" strokeLinejoin="round" />
    </g>
  );
}

/** Bảng nhỏ trong bảng điều khiển bên phải */
export function MiniTable({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="insp-table">
      <table>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Ô chữ lớn trên sân khấu (ví dụ một dòng biểu thức) */
export function Banner({ x, y, text, size = 30, color = 'var(--ink)', anchor = 'middle', weight = 800 }: { x: number; y: number; text: string; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} className="math-text">
      {text}
    </text>
  );
}

/** Các màu dùng chung cho thẻ đại số, hình học */
export const C = {
  a: '#2563eb',
  b: '#e11d48',
  c: '#16a34a',
  d: '#d97706',
  e: '#7c3aed',
  f: '#0891b2',
  soft: ['rgba(37,99,235,0.18)', 'rgba(225,29,72,0.18)', 'rgba(22,163,74,0.18)', 'rgba(217,119,6,0.2)', 'rgba(124,58,237,0.18)', 'rgba(8,145,178,0.18)'],
  solid: ['#2563eb', '#e11d48', '#16a34a', '#d97706', '#7c3aed', '#0891b2', '#db2777', '#65a30d'],
};
