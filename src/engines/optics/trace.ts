// Bộ dò tia sáng 2D cho bàn quang học: khúc xạ (định luật Snell), phản xạ một phần,
// phản xạ toàn phần, tán sắc theo màu, kính lọc màu và màn chắn.
// Đơn vị: toạ độ SVG (px). Góc: độ, đo theo chiều kim đồng hồ từ trục x (vì trục y hướng xuống).

export type LightColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';
export type SourceColor = LightColor | 'white';

export const SPECTRUM: LightColor[] = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

export const COLOR_HEX: Record<LightColor, string> = {
  red: '#ff2a2a',
  orange: '#ff8c1a',
  yellow: '#ffe11a',
  green: '#2bdc4a',
  blue: '#2a9dff',
  indigo: '#5b5bff',
  violet: '#b44cff',
};

export const COLOR_NAME: Record<SourceColor, string> = {
  red: 'Đỏ',
  orange: 'Da cam',
  yellow: 'Vàng',
  green: 'Lục',
  blue: 'Lam',
  indigo: 'Chàm',
  violet: 'Tím',
  white: 'Trắng',
};

/** Độ lệch chiết suất theo màu (đỏ nhỏ nhất, tím lớn nhất). */
const DISPERSION: Record<LightColor, number> = { red: -1, orange: -0.66, yellow: -0.33, green: 0, blue: 0.33, indigo: 0.66, violet: 1 };

export type Medium = 'air' | 'water' | 'glass' | 'flint' | 'diamond' | 'oil';

export const MEDIA: Record<Medium, { name: string; n: number; tint: string; disp: number }> = {
  air: { name: 'Không khí', n: 1.0, tint: 'transparent', disp: 0 },
  water: { name: 'Nước', n: 1.33, tint: 'rgba(80,160,255,0.22)', disp: 0.006 },
  oil: { name: 'Dầu ăn', n: 1.47, tint: 'rgba(240,200,60,0.22)', disp: 0.008 },
  glass: { name: 'Thuỷ tinh', n: 1.5, tint: 'rgba(170,230,255,0.25)', disp: 0.014 },
  flint: { name: 'Thuỷ tinh flin', n: 1.62, tint: 'rgba(190,220,255,0.3)', disp: 0.045 },
  diamond: { name: 'Kim cương', n: 2.42, tint: 'rgba(230,240,255,0.35)', disp: 0.03 },
};

export function nOf(m: Medium, c: LightColor): number {
  const md = MEDIA[m];
  return md.n + md.disp * DISPERSION[c];
}

export interface Source {
  id: string;
  x: number;
  y: number;
  /** hướng chiếu (độ) */
  angle: number;
  color: SourceColor;
  /** số tia song song (chùm sáng); 1 = tia laze */
  count?: number;
  /** độ rộng chùm (px) */
  width?: number;
  /** Laze quay quanh một điểm (bảng chia độ): đặt theo góc tới */
  orbit?: { cx: number; cy: number; r: number; side: 'top' | 'bottom'; i: number; mirror?: boolean };
}

export type BodyShape = 'semicircle' | 'rect' | 'prism' | 'rightPrism';

export interface Body {
  id: string;
  shape: BodyShape;
  x: number;
  y: number;
  /** góc xoay (độ) */
  angle: number;
  /** semicircle: bán kính; prism: cạnh; rect: rộng */
  size: number;
  /** rect: chiều cao */
  h?: number;
  medium: Medium;
  label?: string;
}

export interface Filter {
  id: string;
  x: number;
  y: number;
  len: number;
  /** góc của tấm lọc (độ) */
  angle: number;
  color: LightColor | 'none';
}

export interface Screen {
  id: string;
  x: number;
  y: number;
  len: number;
  angle: number;
}

export interface Segment {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  /** pháp tuyến hướng ra ngoài vật */
  nx: number;
  ny: number;
  body: number;
  /** mặt cong: tâm đường tròn để tính pháp tuyến chính xác tại điểm tới */
  cx?: number;
  cy?: number;
}

export interface RaySeg {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: LightColor;
  white: boolean;
  intensity: number;
  /** tia đầu tiên của nguồn (để vẽ pháp tuyến, góc) */
  primary: boolean;
}

export interface Event {
  /** điểm tới */
  x: number;
  y: number;
  /** pháp tuyến (hướng về phía tia tới) */
  nx: number;
  ny: number;
  /** góc tới, góc khúc xạ (độ); r = null khi phản xạ toàn phần */
  i: number;
  r: number | null;
  /** hướng tia tới */
  dx: number;
  dy: number;
  /** hướng tia khúc xạ/phản xạ */
  ox: number;
  oy: number;
  n1: number;
  n2: number;
  critical: number | null;
  sourceId: string;
}

export interface ScreenHit {
  screen: string;
  t: number; // vị trí dọc màn 0..1
  color: LightColor;
  white: boolean;
  intensity: number;
}

const rot = (x: number, y: number, a: number) => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [x * c - y * s, x * s + y * c];
};

/** Đa giác (theo chiều kim đồng hồ trên màn hình) của một vật. */
export function bodyPolygon(b: Body): [number, number][] {
  const a = (b.angle * Math.PI) / 180;
  let local: [number, number][] = [];
  if (b.shape === 'semicircle') {
    const r = b.size;
    // mặt phẳng ở trên (y = 0), phần cong ở dưới
    local.push([-r, 0], [r, 0]);
    const N = 72;
    for (let k = 1; k < N; k++) {
      const t = (k / N) * Math.PI;
      local.push([r * Math.cos(t), r * Math.sin(t)]);
    }
  } else if (b.shape === 'rect') {
    const w = b.size / 2;
    const h = (b.h ?? b.size) / 2;
    local = [
      [-w, -h],
      [w, -h],
      [w, h],
      [-w, h],
    ];
  } else if (b.shape === 'prism') {
    // tam giác đều, đỉnh ở trên, đáy ở dưới
    const s = b.size;
    const hh = (s * Math.sqrt(3)) / 2;
    local = [
      [0, (-2 * hh) / 3],
      [s / 2, hh / 3],
      [-s / 2, hh / 3],
    ];
  } else {
    // lăng kính tam giác vuông cân (phản xạ toàn phần), góc vuông ở dưới-trái
    const s = b.size;
    local = [
      [-s / 3, -(2 * s) / 3],
      [(2 * s) / 3, s / 3],
      [-s / 3, s / 3],
    ];
  }
  return local.map(([x, y]) => {
    const [rx, ry] = rot(x, y, a);
    return [b.x + rx, b.y + ry];
  });
}

function polygonSegments(poly: [number, number][], body: number): Segment[] {
  // Xác định chiều của đa giác để pháp tuyến luôn hướng ra ngoài
  let area = 0;
  for (let k = 0; k < poly.length; k++) {
    const [x1, y1] = poly[k];
    const [x2, y2] = poly[(k + 1) % poly.length];
    area += x1 * y2 - x2 * y1;
  }
  const sign = area > 0 ? 1 : -1;
  const segs: Segment[] = [];
  for (let k = 0; k < poly.length; k++) {
    const [ax, ay] = poly[k];
    const [bx, by] = poly[(k + 1) % poly.length];
    const dx = bx - ax;
    const dy = by - ay;
    const L = Math.hypot(dx, dy) || 1;
    segs.push({ ax, ay, bx, by, nx: (sign * dy) / L, ny: (-sign * dx) / L, body });
  }
  return segs;
}

function hitSeg(px: number, py: number, dx: number, dy: number, ax: number, ay: number, bx: number, by: number): { t: number; u: number } | null {
  const ex = bx - ax;
  const ey = by - ay;
  const den = dx * ey - dy * ex;
  if (Math.abs(den) < 1e-12) return null;
  const t = ((ax - px) * ey - (ay - py) * ex) / den;
  const u = ((ax - px) * dy - (ay - py) * dx) / den;
  if (t <= 1e-6 || u < -1e-9 || u > 1 + 1e-9) return null;
  return { t, u };
}

export interface TraceInput {
  sources: Source[];
  bodies: Body[];
  filters?: Filter[];
  screens?: Screen[];
  ambient?: Medium;
  /** khung giới hạn vẽ tia */
  bounds: { x0: number; y0: number; x1: number; y1: number };
}

export interface TraceResult {
  rays: RaySeg[];
  events: Event[];
  hits: ScreenHit[];
}

export function trace(input: TraceInput): TraceResult {
  const ambient = input.ambient ?? 'air';
  const segs: Segment[] = [];
  input.bodies.forEach((b, i) => {
    const s = polygonSegments(bodyPolygon(b), i);
    if (b.shape === 'semicircle') {
      // mọi cạnh trừ cạnh đầu tiên (mặt phẳng) thuộc mặt cong
      s.forEach((seg, k) => {
        if (k > 0) {
          seg.cx = b.x;
          seg.cy = b.y;
        }
      });
    }
    segs.push(...s);
  });
  const rays: RaySeg[] = [];
  const events: Event[] = [];
  const hits: ScreenHit[] = [];
  const { x0, y0, x1, y1 } = input.bounds;
  const far = 4 * Math.hypot(x1 - x0, y1 - y0);

  const castOne = (sx: number, sy: number, dx: number, dy: number, color: LightColor, white: boolean, sourceId: string) => {
    type Q = { x: number; y: number; dx: number; dy: number; I: number; depth: number; primary: boolean; inside: number };
    const queue: Q[] = [{ x: sx, y: sy, dx, dy, I: 1, depth: 0, primary: true, inside: -1 }];
    let guard = 0;
    while (queue.length && guard++ < 400) {
      const q = queue.shift()!;
      if (q.I < 0.025 || q.depth > 30) continue;
      // tìm giao điểm gần nhất với mặt vật, kính lọc, màn chắn
      let best = far;
      let kind: 'seg' | 'filter' | 'screen' | null = null;
      let bestSeg: Segment | null = null;
      let bestF: Filter | null = null;
      let bestS: Screen | null = null;
      let bestU = 0;
      for (const s of segs) {
        const h = hitSeg(q.x, q.y, q.dx, q.dy, s.ax, s.ay, s.bx, s.by);
        if (h && h.t < best) {
          best = h.t;
          kind = 'seg';
          bestSeg = s;
        }
      }
      for (const f of input.filters ?? []) {
        const a = (f.angle * Math.PI) / 180;
        const hx = (Math.cos(a) * f.len) / 2;
        const hy = (Math.sin(a) * f.len) / 2;
        const h = hitSeg(q.x, q.y, q.dx, q.dy, f.x - hx, f.y - hy, f.x + hx, f.y + hy);
        if (h && h.t < best) {
          best = h.t;
          kind = 'filter';
          bestF = f;
        }
      }
      for (const sc of input.screens ?? []) {
        const a = (sc.angle * Math.PI) / 180;
        const hx = (Math.cos(a) * sc.len) / 2;
        const hy = (Math.sin(a) * sc.len) / 2;
        const h = hitSeg(q.x, q.y, q.dx, q.dy, sc.x - hx, sc.y - hy, sc.x + hx, sc.y + hy);
        if (h && h.t < best) {
          best = h.t;
          kind = 'screen';
          bestS = sc;
          bestU = h.u;
        }
      }
      const ex = q.x + q.dx * best;
      const ey = q.y + q.dy * best;
      rays.push({ x1: q.x, y1: q.y, x2: ex, y2: ey, color, white, intensity: q.I, primary: q.primary });
      if (!kind) continue;
      if (kind === 'screen' && bestS) {
        hits.push({ screen: bestS.id, t: bestU, color, white, intensity: q.I });
        continue;
      }
      if (kind === 'filter' && bestF) {
        if (bestF.color !== 'none' && bestF.color !== color) continue;
        queue.push({ ...q, x: ex + q.dx * 1e-3, y: ey + q.dy * 1e-3, I: q.I * 0.9, depth: q.depth + 1 });
        continue;
      }
      if (!bestSeg) continue;
      const s0 = bestSeg;
      let s = s0;
      if (s0.cx !== undefined && s0.cy !== undefined) {
        const L = Math.hypot(ex - s0.cx, ey - s0.cy) || 1;
        s = { ...s0, nx: (ex - s0.cx) / L, ny: (ey - s0.cy) / L };
      }
      const entering = q.dx * s.nx + q.dy * s.ny < 0;
      const body = input.bodies[s.body];
      const nIn = nOf(body.medium, color);
      const nOut = nOf(ambient, color);
      const n1 = entering ? nOut : nIn;
      const n2 = entering ? nIn : nOut;
      // pháp tuyến hướng về phía tia tới
      const nx = entering ? s.nx : -s.nx;
      const ny = entering ? s.ny : -s.ny;
      const cosi = -(q.dx * nx + q.dy * ny);
      const eta = n1 / n2;
      const k = 1 - eta * eta * (1 - cosi * cosi);
      const rx = q.dx + 2 * cosi * nx;
      const ry = q.dy + 2 * cosi * ny;
      const iDeg = (Math.acos(Math.min(1, Math.max(-1, cosi))) * 180) / Math.PI;
      const critical = n1 > n2 ? (Math.asin(n2 / n1) * 180) / Math.PI : null;
      const px = ex + nx * 1e-3;
      const py = ey + ny * 1e-3;
      if (k < 0) {
        // phản xạ toàn phần
        if (q.primary) events.push({ x: ex, y: ey, nx, ny, i: iDeg, r: null, dx: q.dx, dy: q.dy, ox: rx, oy: ry, n1, n2, critical, sourceId });
        queue.push({ x: px, y: py, dx: rx, dy: ry, I: q.I, depth: q.depth + 1, primary: q.primary, inside: q.inside });
        continue;
      }
      const cost = Math.sqrt(k);
      const tx = eta * q.dx + (eta * cosi - cost) * nx;
      const ty = eta * q.dy + (eta * cosi - cost) * ny;
      // hệ số phản xạ (xấp xỉ Schlick)
      const R0 = ((n1 - n2) / (n1 + n2)) ** 2;
      const c = n1 <= n2 ? cosi : cost;
      const R = R0 + (1 - R0) * (1 - c) ** 5;
      const rDeg = (Math.acos(Math.min(1, cost)) * 180) / Math.PI;
      if (q.primary) events.push({ x: ex, y: ey, nx, ny, i: iDeg, r: rDeg, dx: q.dx, dy: q.dy, ox: tx, oy: ty, n1, n2, critical, sourceId });
      queue.push({ x: ex - nx * 1e-3, y: ey - ny * 1e-3, dx: tx, dy: ty, I: q.I * (1 - R), depth: q.depth + 1, primary: q.primary, inside: q.inside });
      if (q.I * R > 0.04) queue.push({ x: px, y: py, dx: rx, dy: ry, I: q.I * R, depth: q.depth + 1, primary: false, inside: q.inside });
    }
  };

  for (const src of input.sources) {
    const a = (src.angle * Math.PI) / 180;
    const dx = Math.cos(a);
    const dy = Math.sin(a);
    const n = Math.max(1, src.count ?? 1);
    const w = src.width ?? 0;
    const colors: LightColor[] = src.color === 'white' ? SPECTRUM : [src.color];
    for (let k = 0; k < n; k++) {
      const off = n === 1 ? 0 : -w / 2 + (w * k) / (n - 1);
      const sx = src.x - dy * off;
      const sy = src.y + dx * off;
      for (const c of colors) castOne(sx, sy, dx, dy, c, src.color === 'white', src.id);
    }
  }
  return { rays, events, hits };
}

/** Đặt nguồn laze trên vòng tròn chia độ sao cho tia đi qua tâm với góc tới i. */
export function placeOrbit(src: Source): Source {
  if (!src.orbit) return src;
  const { cx, cy, r, side, i, mirror } = src.orbit;
  const a = (i * Math.PI) / 180;
  const sgn = mirror ? 1 : -1;
  const x = cx + sgn * r * Math.sin(a);
  const y = side === 'top' ? cy - r * Math.cos(a) : cy + r * Math.cos(a);
  const angle = (Math.atan2(cy - y, cx - x) * 180) / Math.PI;
  return { ...src, x, y, angle };
}
