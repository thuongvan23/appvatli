// Đa thức nhiều biến (x, y, z) với hệ số thực – dùng cho Toán 8 Chương I, II, VI.
// Mọi phép tính đều làm trên mảng hạng tử; hiển thị theo cách viết của SGK (dấu trừ "−", số mũ viết trên).

export interface Term {
  c: number;
  /** số mũ của x, y, z */
  e: number[];
}
export type Poly = Term[];

export const VARS = ['x', 'y', 'z'];
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
export const sup = (n: number) => (n <= 1 ? '' : String(n).replace(/\d/g, (d) => SUP[Number(d)]));

/** Tạo hạng tử: t(3, 2, 1) = 3x²y */
export const t = (c: number, x = 0, y = 0, z = 0): Term => ({ c, e: [x, y, z] });

export const termKey = (m: Term) => [0, 1, 2].map((i) => m.e[i] ?? 0).join(',');
export const termDeg = (m: Term) => (m.c === 0 ? -Infinity : m.e.reduce((s, k) => s + k, 0));
export const varPart = (m: Term) => VARS.map((v, i) => ((m.e[i] ?? 0) > 0 ? v + sup(m.e[i]) : '')).join('');

/** Số kiểu Việt Nam (dấu phẩy thập phân, phân số đơn giản viết a/b). */
export function fmtNum(x: number): string {
  if (!Number.isFinite(x)) return '–';
  const a = Math.abs(x);
  const s = x < 0 ? '−' : '';
  if (Math.abs(a - Math.round(a)) < 1e-9) return s + String(Math.round(a));
  for (let q = 2; q <= 12; q++) {
    const p = a * q;
    if (Math.abs(p - Math.round(p)) < 1e-9) return `${s}${Math.round(p)}/${q}`;
  }
  return s + a.toLocaleString('vi-VN', { maximumFractionDigits: 3 });
}

/** Số thập phân kiểu Việt Nam. */
export function dec(x: number, digits = 2): string {
  if (!Number.isFinite(x)) return '–';
  const r = x.toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: digits });
  return r.replace('-', '−');
}

function absBody(m: Term): string {
  const vp = varPart(m);
  const a = Math.abs(m.c);
  if (!vp) return fmtNum(a);
  if (Math.abs(a - 1) < 1e-12) return vp;
  const n = fmtNum(a);
  return n.includes('/') ? `(${n})${vp}` : n + vp;
}

/** Viết một hạng tử; lead = false thì có dấu " + " hoặc " − " ở trước. */
export function fmtTerm(m: Term, lead = true): string {
  const b = absBody(m);
  if (lead) return (m.c < 0 ? '−' : '') + b;
  return (m.c < 0 ? ' − ' : ' + ') + b;
}

export function fmtPoly(p: Poly): string {
  const q = p.filter((m) => m.c !== 0);
  if (!q.length) return '0';
  return q.map((m, i) => fmtTerm(m, i === 0)).join('');
}

/** Đa thức trong ngoặc khi cần (dùng khi viết tích). */
export const paren = (p: Poly) => (p.filter((m) => m.c !== 0).length > 1 ? `(${fmtPoly(p)})` : fmtPoly(p));

export const mulTerm = (a: Term, b: Term): Term => ({ c: a.c * b.c, e: [0, 1, 2].map((i) => (a.e[i] ?? 0) + (b.e[i] ?? 0)) });

/** Nhân hai đa thức – chưa thu gọn (giữ đủ các tích riêng). */
export const polyMulRaw = (a: Poly, b: Poly): Poly => a.flatMap((x) => b.map((y) => mulTerm(x, y)));

/** Thu gọn: cộng các hạng tử đồng dạng, bỏ hạng tử 0, sắp theo bậc giảm dần (rồi theo số mũ x). */
export function collect(p: Poly, sort = true): Poly {
  const map = new Map<string, Term>();
  for (const m of p) {
    const k = termKey(m);
    const cur = map.get(k);
    if (cur) cur.c = round(cur.c + m.c);
    else map.set(k, { c: m.c, e: [0, 1, 2].map((i) => m.e[i] ?? 0) });
  }
  const out = [...map.values()].filter((m) => Math.abs(m.c) > 1e-12);
  if (sort) out.sort((a, b) => termDeg(b) - termDeg(a) || b.e[0] - a.e[0] || b.e[1] - a.e[1]);
  return out;
}

const round = (x: number) => Math.round(x * 1e9) / 1e9;

export const polyMul = (a: Poly, b: Poly) => collect(polyMulRaw(a, b));
export const polyAdd = (a: Poly, b: Poly) => collect([...a, ...b]);
export const neg = (p: Poly): Poly => p.map((m) => ({ ...m, c: -m.c }));
export const polySub = (a: Poly, b: Poly) => collect([...a, ...neg(b)]);
export const polyPow = (a: Poly, n: number): Poly => (n <= 0 ? [t(1)] : polyMul(a, polyPow(a, n - 1)));

export const polyDeg = (p: Poly) => {
  const q = collect(p);
  return q.length ? Math.max(...q.map(termDeg)) : -Infinity;
};

export const evalTerm = (m: Term, v: number[]) => m.c * [0, 1, 2].reduce((s, i) => s * Math.pow(v[i] ?? 0, m.e[i] ?? 0), 1);
export const evalPoly = (p: Poly, v: number[]) => p.reduce((s, m) => s + evalTerm(m, v), 0);

export const polyEq = (a: Poly, b: Poly) => fmtPoly(collect(a)) === fmtPoly(collect(b));

/** Chia đa thức cho đơn thức (khi chia hết): trả về null nếu có hạng tử không chia hết. */
export function divByTerm(p: Poly, d: Term): Poly | null {
  const out: Poly = [];
  for (const m of p) {
    const e = [0, 1, 2].map((i) => (m.e[i] ?? 0) - (d.e[i] ?? 0));
    if (e.some((k) => k < 0)) return null;
    out.push({ c: round(m.c / d.c), e });
  }
  return out;
}
