// Bộ giải mạch điện một chiều bằng phương pháp điện thế nút.
// Mỗi phần tử 2 cực được mô hình hoá: I(a→b) = g·(Va − Vb) + c
//  - điện trở/dây/đồng hồ: c = 0
//  - nguồn (cực b là cực dương, suất điện động E, điện trở trong r): g = 1/r, c = g·E
//  - LED khi dẫn: g = 1/Ron, c = −g·Vf
// Dây nối cũng có điện trở rất nhỏ để tính được dòng điện chạy trong từng đoạn dây.

import { CircuitDoc, MATERIALS, Part, lampR, ptKey, terminals, wireSampleR } from './model';

const R_WIRE = 1e-4;
const R_AMMETER = 1e-3;
const R_VOLTMETER = 1e7;
const G_OPEN = 1e-12;
const G_MIN = 1e-9;
const R_CELL = 0.002; // điện trở trong của một pin (rất nhỏ để số đo khớp lí thuyết SGK)
const R_SUPPLY = 0.001;
const LED_VF: Record<string, number> = { red: 1.8, yellow: 2.0, green: 2.1, blue: 2.9 };
const LED_RON = 15;
const LED_MAX_I = 0.12;
const LAMP_BURN_FACTOR = 3; // đèn cháy khi công suất vượt 3 lần định mức

export interface PartResult {
  /** Cường độ dòng điện chạy từ cực a sang cực b (A) */
  I: number;
  /** Hiệu điện thế Va − Vb (V) */
  U: number;
  /** Công suất tiêu thụ (W); với nguồn là công suất cung cấp */
  P: number;
  /** LED đang dẫn điện */
  on?: boolean;
}

export interface SolveResult {
  parts: Record<string, PartResult>;
  /** Dòng điện trong dây, chiều từ (x1,y1) sang (x2,y2) */
  wires: Record<string, number>;
  /** Linh kiện vừa bị hỏng trong lần giải này (cần ghi lại vào tài liệu) */
  newlyBroken: string[];
  /** Nguồn bị đoản mạch */
  shorted: string[];
}

function sourceEmf(p: Part): number {
  if (p.type === 'battery') return 1.5 * (p.props.cells ?? 1);
  if (p.type === 'supply') return p.props.voltage ?? 0;
  return 0;
}

function sourceR(p: Part): number {
  if (p.type === 'battery') return R_CELL * (p.props.cells ?? 1);
  return R_SUPPLY;
}

/** Điện trở của các phần tử tuyến tính (không tính nguồn và LED). */
export function partResistance(p: Part): number {
  const pr = p.props;
  if (pr.broken) return Infinity;
  switch (p.type) {
    case 'switch':
      return pr.closed ? R_WIRE : Infinity;
    case 'lamp':
      return lampR(pr);
    case 'resistor':
      return pr.R ?? 10;
    case 'rheostat':
      return Math.max(0.1, (pr.Rmax ?? 20) * (pr.pos ?? 0.5));
    case 'ammeter':
      return R_AMMETER;
    case 'voltmeter':
      return R_VOLTMETER;
    case 'fuse':
      return 0.01;
    case 'bell':
      return 10;
    case 'heater':
      return pr.R ?? 2;
    case 'coil':
      return pr.R ?? 3;
    case 'electrolysis':
      return pr.R ?? 15;
    case 'sample':
      return MATERIALS[pr.material ?? 'dong'].R;
    case 'wireSample':
      return wireSampleR(pr);
    default:
      return Infinity;
  }
}

/** Giải hệ A·x = b bằng khử Gauss có chọn phần tử trội. */
function gaussSolve(A: Float64Array[], b: Float64Array): Float64Array {
  const n = b.length;
  for (let col = 0; col < n; col++) {
    let piv = col;
    let best = Math.abs(A[col][col]);
    for (let r = col + 1; r < n; r++) {
      const v = Math.abs(A[r][col]);
      if (v > best) {
        best = v;
        piv = r;
      }
    }
    if (piv !== col) {
      [A[col], A[piv]] = [A[piv], A[col]];
      [b[col], b[piv]] = [b[piv], b[col]];
    }
    const d = A[col][col];
    if (d === 0) continue;
    for (let r = col + 1; r < n; r++) {
      const f = A[r][col] / d;
      if (f === 0) continue;
      const rowR = A[r];
      const rowC = A[col];
      for (let c = col; c < n; c++) rowR[c] -= f * rowC[c];
      b[r] -= f * b[col];
    }
  }
  const x = new Float64Array(n);
  for (let r = n - 1; r >= 0; r--) {
    let s = b[r];
    for (let c = r + 1; c < n; c++) s -= A[r][c] * x[c];
    x[r] = A[r][r] === 0 ? 0 : s / A[r][r];
  }
  return x;
}

interface Elem {
  a: number;
  b: number;
  g: number;
  c: number;
}

export function solveCircuit(doc: CircuitDoc): SolveResult {
  // 1. Đánh số nút: mỗi điểm lưới có cực linh kiện hoặc đầu dây là một nút.
  const nodeIndex = new Map<string, number>();
  const node = (k: string) => {
    let i = nodeIndex.get(k);
    if (i === undefined) {
      i = nodeIndex.size;
      nodeIndex.set(k, i);
    }
    return i;
  };
  const partNodes = doc.parts.map((p) => terminals(p).map((t) => node(ptKey(t))) as [number, number]);
  const wireNodes = doc.wires.map((w) => [node(`${w.x1},${w.y1}`), node(`${w.x2},${w.y2}`)] as [number, number]);
  const n = nodeIndex.size;

  const broken = new Set<string>(doc.parts.filter((p) => p.props.broken).map((p) => p.id));
  const ledOn = new Map<string, boolean>();
  const newlyBroken: string[] = [];

  let V = new Float64Array(n);
  let elems: Elem[] = [];

  const build = () => {
    elems = [];
    doc.parts.forEach((p, i) => {
      const [a, b] = partNodes[i];
      if (broken.has(p.id)) {
        elems.push({ a, b, g: G_OPEN, c: 0 });
        return;
      }
      if (p.type === 'battery' || p.type === 'supply') {
        const g = 1 / sourceR(p);
        elems.push({ a, b, g, c: g * sourceEmf(p) });
      } else if (p.type === 'led') {
        if (ledOn.get(p.id)) {
          const g = 1 / LED_RON;
          elems.push({ a, b, g, c: -g * (LED_VF[p.props.color ?? 'red'] ?? 1.8) });
        } else {
          elems.push({ a, b, g: G_OPEN, c: 0 });
        }
      } else {
        const R = partResistance({ ...p, props: { ...p.props, broken: false } });
        elems.push({ a, b, g: R === Infinity ? G_OPEN : 1 / R, c: 0 });
      }
    });
    wireNodes.forEach(([a, b]) => elems.push({ a, b, g: 1 / R_WIRE, c: 0 }));
  };

  const solveOnce = () => {
    const A: Float64Array[] = [];
    for (let i = 0; i < n; i++) {
      const row = new Float64Array(n);
      row[i] = G_MIN;
      A.push(row);
    }
    const rhs = new Float64Array(n);
    for (const e of elems) {
      if (e.a === e.b) continue;
      A[e.a][e.a] += e.g;
      A[e.b][e.b] += e.g;
      A[e.a][e.b] -= e.g;
      A[e.b][e.a] -= e.g;
      rhs[e.a] -= e.c;
      rhs[e.b] += e.c;
    }
    V = n > 0 ? gaussSolve(A, rhs) : new Float64Array(0);
  };

  const currentOf = (i: number) => {
    const e = elems[i];
    return e.g * (V[e.a] - V[e.b]) + e.c;
  };

  // 2. Lặp: cập nhật trạng thái LED (dẫn/không dẫn) và linh kiện bị hỏng.
  for (let iter = 0; iter < 60; iter++) {
    build();
    solveOnce();
    let changed = false;
    doc.parts.forEach((p, i) => {
      if (p.type !== 'led' || broken.has(p.id)) return;
      const [a, b] = partNodes[i];
      const vf = LED_VF[p.props.color ?? 'red'] ?? 1.8;
      const on = ledOn.get(p.id) ?? false;
      const vd = V[a] - V[b];
      if (!on && vd > vf + 1e-6) {
        ledOn.set(p.id, true);
        changed = true;
      } else if (on && currentOf(i) < 0) {
        ledOn.set(p.id, false);
        changed = true;
      }
    });
    if (changed) continue;
    // Kiểm tra quá tải: chỉ làm hỏng linh kiện quá tải nặng nhất mỗi vòng
    let worstId = '';
    let worstRatio = 1;
    for (let i = 0; i < doc.parts.length; i++) {
      const p = doc.parts[i];
      if (broken.has(p.id)) continue;
      const I = Math.abs(currentOf(i));
      let ratio = 0;
      if (p.type === 'fuse') ratio = I / (p.props.maxI ?? 0.5);
      else if (p.type === 'lamp') ratio = (I * I * lampR(p.props)) / ((p.props.ratedP ?? 0.9) * LAMP_BURN_FACTOR);
      else if (p.type === 'led') ratio = I / LED_MAX_I;
      if (ratio > worstRatio) {
        worstRatio = ratio;
        worstId = p.id;
      }
    }
    if (worstId) {
      broken.add(worstId);
      newlyBroken.push(worstId);
      ledOn.delete(worstId);
      continue;
    }
    break;
  }

  // 3. Tổng hợp kết quả.
  const parts: Record<string, PartResult> = {};
  const shorted: string[] = [];
  doc.parts.forEach((p, i) => {
    const [a, b] = partNodes[i];
    const I = currentOf(i);
    const U = V[a] - V[b];
    const isSource = p.type === 'battery' || p.type === 'supply';
    const P = isSource ? -U * I : U * I;
    parts[p.id] = { I, U, P, on: p.type === 'led' ? !!ledOn.get(p.id) && !broken.has(p.id) : undefined };
    if (isSource) {
      const E = sourceEmf(p);
      // Hiệu điện thế hai cực sụt mạnh và dòng điện lớn ⇒ đoản mạch
      if (E > 0 && I > 1 && -U < 0.4 * E) shorted.push(p.id);
    }
  });
  const wires: Record<string, number> = {};
  doc.wires.forEach((w, j) => {
    wires[w.id] = currentOf(doc.parts.length + j);
  });
  return { parts, wires, newlyBroken, shorted };
}
