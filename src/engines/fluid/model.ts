// Mô hình cho các thí nghiệm khối lượng riêng, áp suất, lực đẩy Archimedes (KHTN 8 Chương III).

export type Solid = 'nhom' | 'sat' | 'dong' | 'chi' | 'da' | 'thuyTinh' | 'go' | 'nhuaXop' | 'nen' | 'trung' | 'nhua';
export type Liquid = 'nuoc' | 'dau' | 'nuocMuoi' | 'ruou' | 'thuyNgan';

export const SOLIDS: Record<Solid, { name: string; D: number; color: string }> = {
  nhom: { name: 'Nhôm', D: 2.7, color: '#c4cad0' },
  sat: { name: 'Sắt', D: 7.8, color: '#6e7378' },
  dong: { name: 'Đồng', D: 8.9, color: '#c87533' },
  chi: { name: 'Chì', D: 11.3, color: '#5b5f6a' },
  da: { name: 'Đá', D: 2.6, color: '#9a8f86' },
  thuyTinh: { name: 'Thuỷ tinh', D: 2.5, color: '#bfe9f2' },
  go: { name: 'Gỗ', D: 0.6, color: '#c49a6c' },
  nhuaXop: { name: 'Nhựa xốp', D: 0.05, color: '#f5f5f0' },
  nen: { name: 'Sáp nến', D: 0.9, color: '#fff3c4' },
  trung: { name: 'Quả trứng', D: 1.08, color: '#f3e3c3' },
  nhua: { name: 'Nhựa', D: 1.2, color: '#e8505b' },
};

export const LIQUIDS: Record<Liquid, { name: string; D: number; color: string }> = {
  nuoc: { name: 'Nước', D: 1.0, color: 'rgba(70,150,235,0.45)' },
  dau: { name: 'Dầu ăn', D: 0.8, color: 'rgba(235,190,40,0.55)' },
  nuocMuoi: { name: 'Nước muối đặc', D: 1.2, color: 'rgba(120,200,220,0.5)' },
  ruou: { name: 'Rượu', D: 0.79, color: 'rgba(210,225,240,0.45)' },
  thuyNgan: { name: 'Thuỷ ngân', D: 13.6, color: 'rgba(170,175,185,0.95)' },
};

export interface LabObject {
  id: string;
  name?: string;
  material: Solid;
  shape: 'cube' | 'box' | 'stone' | 'cylinder';
  /** kích thước (cm) với hình hộp; V (cm³) với hòn đá */
  a?: number;
  b?: number;
  c?: number;
  V?: number;
}

export function volumeOf(o: LabObject): number {
  if (o.shape === 'stone') return o.V ?? 20;
  if (o.shape === 'cylinder') return Math.PI * ((o.a ?? 2) / 2) ** 2 * (o.c ?? 4);
  return (o.a ?? 2) * (o.b ?? o.a ?? 2) * (o.c ?? o.a ?? 2);
}

export const massOf = (o: LabObject) => volumeOf(o) * SOLIDS[o.material].D;

export interface DensityDoc {
  mode: 'density';
  objects: LabObject[];
  onScale: string | null;
  inCylinder: string | null;
  /** thể tích nước ban đầu trong bình chia độ (ml) */
  water: number;
  /** giới hạn đo của bình chia độ (ml) */
  capacity: number;
}

export interface LiquidDensityDoc {
  mode: 'liquidDensity';
  liquid: Liquid;
  /** thể tích chất lỏng đong bằng bình chia độ (ml) */
  V: number;
  cupOnScale: boolean;
  poured: boolean;
}

export interface PressureDoc {
  mode: 'pressure';
  face: 0 | 1 | 2;
  weights: number;
  surface: 'cat' | 'xop';
}

export interface DepthDoc {
  mode: 'depth';
  liquid: Liquid;
  /** độ sâu đầu dò (cm) */
  depth: number;
  /** vị trí ngang (0..1) */
  px: number;
  /** hướng màng cao su: 0 lên, 1 ngang, 2 xuống */
  facing: 0 | 1 | 2;
  atm: boolean;
}

export interface JetsDoc {
  mode: 'jets';
  liquid: Liquid;
  open: boolean;
  level: number;
}

export interface VesselsDoc {
  mode: 'vessels';
  /** thể tích nước (đơn vị tuỳ ý) */
  water: number;
  /** cột mà nước đang được đổ vào */
  pourInto: number;
}

export interface PressDoc {
  mode: 'press';
  /** diện tích pít-tông nhỏ, lớn (cm²) */
  s: number;
  S: number;
  /** lực tác dụng lên pít-tông nhỏ (N) */
  f: number;
}

export interface AtmDoc {
  mode: 'atm';
  /** phần không khí đã rút ra 0..1 */
  removed: number;
  scene: 'box' | 'glass';
}

export interface BuoyancyDoc {
  mode: 'buoyancy';
  object: LabObject;
  liquid: Liquid;
  /** độ sâu nhúng: 0 (ở ngoài) .. 1 (chìm hoàn toàn) .. >1 (chìm sâu hơn) */
  dip: number;
}

export interface FloatDoc {
  mode: 'float';
  liquid: Liquid;
  objects: Solid[];
  showForces: boolean;
}

export type FluidDoc = DensityDoc | LiquidDensityDoc | PressureDoc | DepthDoc | JetsDoc | VesselsDoc | PressDoc | AtmDoc | BuoyancyDoc | FloatDoc;

export interface FluidOptions {
  /** bảng khối lượng riêng tham khảo */
  table?: boolean;
  /** hiện công thức, kết quả tính */
  showCalc?: boolean;
  /** hiện thước đo kích thước vật */
  ruler?: boolean;
  /** cho phép đổi vật/chất lỏng */
  choose?: boolean;
}
