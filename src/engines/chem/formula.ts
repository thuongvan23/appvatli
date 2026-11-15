// Đọc công thức hoá học, đếm nguyên tử, tính khối lượng mol.

export const ATOMIC_MASS: Record<string, number> = {
  H: 1, He: 4, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, Si: 28, P: 31, S: 32, Cl: 35.5, K: 39, Ca: 40, Mn: 55, Fe: 56, Cu: 64, Zn: 65, Br: 80, Ag: 108, I: 127, Ba: 137,
};

/** Màu nguyên tử dùng trong mô hình phân tử (gần với quy ước CPK) */
export const ATOM_COLOR: Record<string, string> = {
  H: '#f4f4f4', C: '#3a3a3a', O: '#e5383b', N: '#3a6fd8', Cl: '#3fbf5a', Na: '#8e5bd6', Al: '#b9c0c8', Fe: '#c76d2e', S: '#e8c925', Ca: '#7cc46a',
  Ba: '#2aa198', K: '#9b59b6', P: '#f08a24', Cu: '#c8743a', Mg: '#58a55c', Zn: '#8a96a3', Br: '#a33b1e', I: '#6b2c91', Si: '#d9b38c', Ag: '#c7c9cc', Mn: '#9c7bb5', He: '#d9ffff',
};

const SUB = '₀₁₂₃₄₅₆₇₈₉';

/** "Al2(SO4)3" → { Al: 2, S: 3, O: 12 } */
export function parseFormula(f: string): Record<string, number> {
  let i = 0;
  const num = () => {
    let s = '';
    while (i < f.length && /[0-9]/.test(f[i])) s += f[i++];
    return s ? Number(s) : 1;
  };
  const group = (): Record<string, number> => {
    const out: Record<string, number> = {};
    const add = (el: string, n: number) => (out[el] = (out[el] ?? 0) + n);
    while (i < f.length && f[i] !== ')') {
      if (f[i] === '(') {
        i++;
        const g = group();
        i++; // ')'
        const k = num();
        for (const [el, n] of Object.entries(g)) add(el, n * k);
      } else if (/[A-Z]/.test(f[i])) {
        let el = f[i++];
        while (i < f.length && /[a-z]/.test(f[i])) el += f[i++];
        add(el, num());
      } else i++;
    }
    return out;
  };
  return group();
}

export function molarMass(f: string): number {
  return Object.entries(parseFormula(f)).reduce((s, [el, n]) => s + (ATOMIC_MASS[el] ?? 0) * n, 0);
}

/** "Al2(SO4)3" → "Al₂(SO₄)₃" */
export function pretty(f: string): string {
  return f.replace(/[0-9]/g, (d) => SUB[Number(d)]);
}

/** Số mũ: 23 → "²³" */
export function sup(n: number): string {
  const S = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  return String(n)
    .replace('-', '⁻')
    .replace(/[0-9]/g, (d) => S[Number(d)]);
}

/** 1,2044·10²² */
export function sci(x: number, digits = 3): string {
  if (x === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(x)));
  const m = x / 10 ** e;
  return `${m.toLocaleString('vi-VN', { maximumFractionDigits: digits })}·10${sup(e)}`;
}

export const NA = 6.022e23;
export const VM = 24.79;
