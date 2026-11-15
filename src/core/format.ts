/** Định dạng số kiểu Việt Nam: dấu phẩy thập phân, dấu chấm phân cách hàng nghìn. */
export function fmt(n: number | undefined, digits = 2): string {
  if (n === undefined || !Number.isFinite(n)) return '–';
  const s = Math.abs(n) < 0.5 * 10 ** -digits ? 0 : n;
  return s.toLocaleString('vi-VN', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

/** Số gọn: bỏ số 0 thừa ở cuối (1,50 → 1,5). */
export function fmtShort(n: number | undefined, maxDigits = 2): string {
  if (n === undefined || !Number.isFinite(n)) return '–';
  return n.toLocaleString('vi-VN', { maximumFractionDigits: maxDigits });
}

/** Điện trở: 1 200 Ω → "1,2 kΩ" */
export function fmtOhm(R: number): string {
  if (!Number.isFinite(R) || R >= 1e9) return 'rất lớn';
  if (R >= 1e6) return `${fmtShort(R / 1e6, 2)} MΩ`;
  if (R >= 1e3) return `${fmtShort(R / 1e3, 2)} kΩ`;
  return `${fmtShort(R, R < 10 ? 2 : 1)} Ω`;
}

/** Cường độ dòng điện có chọn đơn vị A / mA phù hợp. */
export function fmtAmp(I: number): string {
  const a = Math.abs(I);
  if (a < 1e-6) return '0 A';
  if (a < 0.1) return `${fmt(I * 1000, a < 0.01 ? 1 : 0)} mA`;
  return `${fmt(I, 2)} A`;
}

/** Số đọc trên đồng hồ đo hiện số */
export function fmtMeter(v: number, unit: 'A' | 'V'): string {
  const a = Math.abs(v);
  if (unit === 'A') return `${fmt(v, a < 1 ? 3 : 2)} A`;
  return `${fmt(v, a < 10 ? 2 : 1)} V`;
}
