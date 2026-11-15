// Dữ liệu 36 nguyên tố đầu (chu kì 1–4) và một số nguyên tố thông dụng – dùng cho KHTN 7 (Hoá học).
// Tên nguyên tố theo danh pháp IUPAC như SGK hiện hành; khối lượng nguyên tử làm tròn.

export type ElCat = 'metal' | 'nonmetal' | 'metalloid' | 'noble';

export interface Element {
  Z: number;
  sym: string;
  name: string;
  /** khối lượng nguyên tử (amu) */
  mass: number;
  cat: ElCat;
  /** số electron trên từng lớp */
  shells: number[];
  /** chu kì, cột (1–18) trong bảng tuần hoàn dạng dài */
  period: number;
  col: number;
  /** tên gốc Latin (nếu kí hiệu lấy từ tên Latin) */
  latin?: string;
}

const ROWS: [number, string, string, number, ElCat, number[], string?][] = [
  [1, 'H', 'Hydrogen', 1, 'nonmetal', [1]],
  [2, 'He', 'Helium', 4, 'noble', [2]],
  [3, 'Li', 'Lithium', 7, 'metal', [2, 1]],
  [4, 'Be', 'Beryllium', 9, 'metal', [2, 2]],
  [5, 'B', 'Boron', 11, 'metalloid', [2, 3]],
  [6, 'C', 'Carbon', 12, 'nonmetal', [2, 4]],
  [7, 'N', 'Nitrogen', 14, 'nonmetal', [2, 5]],
  [8, 'O', 'Oxygen', 16, 'nonmetal', [2, 6]],
  [9, 'F', 'Fluorine', 19, 'nonmetal', [2, 7]],
  [10, 'Ne', 'Neon', 20, 'noble', [2, 8]],
  [11, 'Na', 'Sodium', 23, 'metal', [2, 8, 1], 'Natrium'],
  [12, 'Mg', 'Magnesium', 24, 'metal', [2, 8, 2]],
  [13, 'Al', 'Aluminium', 27, 'metal', [2, 8, 3]],
  [14, 'Si', 'Silicon', 28, 'metalloid', [2, 8, 4]],
  [15, 'P', 'Phosphorus', 31, 'nonmetal', [2, 8, 5]],
  [16, 'S', 'Sulfur', 32, 'nonmetal', [2, 8, 6]],
  [17, 'Cl', 'Chlorine', 35.5, 'nonmetal', [2, 8, 7]],
  [18, 'Ar', 'Argon', 40, 'noble', [2, 8, 8]],
  [19, 'K', 'Potassium', 39, 'metal', [2, 8, 8, 1], 'Kalium'],
  [20, 'Ca', 'Calcium', 40, 'metal', [2, 8, 8, 2]],
  [21, 'Sc', 'Scandium', 45, 'metal', [2, 8, 9, 2]],
  [22, 'Ti', 'Titanium', 48, 'metal', [2, 8, 10, 2]],
  [23, 'V', 'Vanadium', 51, 'metal', [2, 8, 11, 2]],
  [24, 'Cr', 'Chromium', 52, 'metal', [2, 8, 13, 1]],
  [25, 'Mn', 'Manganese', 55, 'metal', [2, 8, 13, 2]],
  [26, 'Fe', 'Iron', 56, 'metal', [2, 8, 14, 2], 'Ferrum'],
  [27, 'Co', 'Cobalt', 59, 'metal', [2, 8, 15, 2]],
  [28, 'Ni', 'Nickel', 59, 'metal', [2, 8, 16, 2]],
  [29, 'Cu', 'Copper', 64, 'metal', [2, 8, 18, 1], 'Cuprum'],
  [30, 'Zn', 'Zinc', 65, 'metal', [2, 8, 18, 2]],
  [31, 'Ga', 'Gallium', 70, 'metal', [2, 8, 18, 3]],
  [32, 'Ge', 'Germanium', 73, 'metalloid', [2, 8, 18, 4]],
  [33, 'As', 'Arsenic', 75, 'metalloid', [2, 8, 18, 5]],
  [34, 'Se', 'Selenium', 79, 'nonmetal', [2, 8, 18, 6]],
  [35, 'Br', 'Bromine', 80, 'nonmetal', [2, 8, 18, 7]],
  [36, 'Kr', 'Krypton', 84, 'noble', [2, 8, 18, 8]],
];

function colOf(Z: number): [number, number] {
  if (Z === 1) return [1, 1];
  if (Z === 2) return [1, 18];
  if (Z <= 10) return [2, Z <= 4 ? Z - 2 : Z + 8];
  if (Z <= 18) return [3, Z <= 12 ? Z - 10 : Z];
  return [4, Z - 18];
}

export const ELEMENTS: Element[] = ROWS.map(([Z, sym, name, mass, cat, shells, latin]) => {
  const [period, col] = colOf(Z);
  return { Z, sym, name, mass, cat, shells, period, col, latin };
});

/** Một số nguyên tố thông dụng ngoài chu kì 1–4 (chỉ dùng cho bài kí hiệu, khối lượng). */
export const EXTRA: Element[] = [
  { Z: 47, sym: 'Ag', name: 'Silver', mass: 108, cat: 'metal', shells: [], period: 5, col: 11, latin: 'Argentum' },
  { Z: 50, sym: 'Sn', name: 'Tin', mass: 119, cat: 'metal', shells: [], period: 5, col: 14, latin: 'Stannum' },
  { Z: 53, sym: 'I', name: 'Iodine', mass: 127, cat: 'nonmetal', shells: [], period: 5, col: 17 },
  { Z: 56, sym: 'Ba', name: 'Barium', mass: 137, cat: 'metal', shells: [], period: 6, col: 2 },
  { Z: 79, sym: 'Au', name: 'Gold', mass: 197, cat: 'metal', shells: [], period: 6, col: 11, latin: 'Aurum' },
  { Z: 80, sym: 'Hg', name: 'Mercury', mass: 201, cat: 'metal', shells: [], period: 6, col: 12, latin: 'Hydrargyrum' },
  { Z: 82, sym: 'Pb', name: 'Lead', mass: 207, cat: 'metal', shells: [], period: 6, col: 14, latin: 'Plumbum' },
];

export const ALL_ELEMENTS = [...ELEMENTS, ...EXTRA];
export const elByZ = (Z: number) => ALL_ELEMENTS.find((e) => e.Z === Z);
export const elBySym = (s: string) => ALL_ELEMENTS.find((e) => e.sym === s);

/** Số khối của nguyên tử thường gặp nhất (p + n) cho 20 nguyên tố đầu. */
export const MASS_NUMBER: Record<number, number> = { 1: 1, 2: 4, 3: 7, 4: 9, 5: 11, 6: 12, 7: 14, 8: 16, 9: 19, 10: 20, 11: 23, 12: 24, 13: 27, 14: 28, 15: 31, 16: 32, 17: 35, 18: 40, 19: 39, 20: 40 };

export const CAT_NAME: Record<ElCat, string> = { metal: 'Kim loại', nonmetal: 'Phi kim', metalloid: 'Á kim', noble: 'Khí hiếm' };
export const CAT_COLOR: Record<ElCat, string> = { metal: '#ffd6a5', nonmetal: '#bde0fe', metalloid: '#d8f3dc', noble: '#e0c3fc' };

/** Tên nhóm theo cách gọi IA…VIIIA, IB…VIIIB */
export function groupName(col: number): string {
  const R = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
  if (col <= 2) return `${R[col]}A`;
  if (col >= 13) return `${R[col - 10]}A`;
  if (col <= 7) return `${R[col]}B`;
  if (col <= 10) return 'VIIIB';
  return `${R[col - 10]}B`;
}

/** Electron theo lớp cho số electron bất kì ≤ 20 (dùng khi lắp ráp nguyên tử). */
export function fillShells(e: number): number[] {
  const cap = [2, 8, 8, 2];
  const out: number[] = [];
  let r = e;
  for (const c of cap) {
    if (r <= 0) break;
    out.push(Math.min(c, r));
    r -= c;
  }
  return out;
}
