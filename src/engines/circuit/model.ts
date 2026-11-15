// Mô hình dữ liệu của bàn lắp mạch điện.
// Bàn là một lưới ô vuông; mọi linh kiện là phần tử 2 cực, dài đúng 2 ô.
// Cực "a" nằm tại (x, y); cực "b" nằm cách a 2 ô theo hướng `dir`.

export const CELL = 40; // kích thước 1 ô lưới (đơn vị SVG)
export const PART_LEN = 2; // số ô giữa hai cực của một linh kiện

/** 0: a→b sang phải · 1: xuống · 2: sang trái · 3: lên */
export type Dir = 0 | 1 | 2 | 3;

export type PartType =
  | 'battery'
  | 'supply'
  | 'switch'
  | 'lamp'
  | 'led'
  | 'resistor'
  | 'rheostat'
  | 'ammeter'
  | 'voltmeter'
  | 'fuse'
  | 'bell'
  | 'heater'
  | 'coil'
  | 'electrolysis'
  | 'sample'
  | 'wireSample';

export type Material =
  | 'dong'
  | 'nhom'
  | 'sat'
  | 'nhua'
  | 'go'
  | 'thuyTinh'
  | 'caoSu'
  | 'nuocMuoi'
  | 'nuocCat'
  | 'than';

export type WireMaterial = 'dong' | 'nhom' | 'sat' | 'nikelin' | 'constantan' | 'nicrom';

export interface PartProps {
  /** Nhãn hiển thị cạnh linh kiện, ví dụ "Đ1", "R2" */
  label?: string;
  /** Pin: số pin 1,5 V mắc nối tiếp */
  cells?: number;
  /** Nguồn điện: hiệu điện thế (V) */
  voltage?: number;
  /** Công tắc: đóng/ngắt */
  closed?: boolean;
  /** Bóng đèn: hiệu điện thế định mức (V) */
  ratedV?: number;
  /** Bóng đèn: công suất định mức (W) */
  ratedP?: number;
  /** Điện trở (Ω) */
  R?: number;
  /** Biến trở: điện trở lớn nhất (Ω) */
  Rmax?: number;
  /** Biến trở: vị trí con chạy 0..1 */
  pos?: number;
  /** Đồng hồ đo: giới hạn đo */
  range?: number;
  /** Đồng hồ đo: kiểu hiển thị */
  display?: 'digital' | 'analog';
  /** Cầu chì: cường độ dòng điện tối đa (A) */
  maxI?: number;
  /** LED: màu */
  color?: 'red' | 'green' | 'blue' | 'yellow';
  /** Vật cần thử tính dẫn điện */
  material?: Material;
  /** Dây dẫn khảo sát: vật liệu, chiều dài (m), tiết diện (mm²) */
  wireMaterial?: WireMaterial;
  length?: number;
  area?: number;
  /** Linh kiện đã hỏng (đèn cháy, cầu chì đứt, LED hỏng) */
  broken?: boolean;
  /** Không cho học sinh/giáo viên kéo đi (dùng trong cảnh dựng sẵn) */
  fixed?: boolean;
}

export interface Part {
  id: string;
  type: PartType;
  x: number;
  y: number;
  dir: Dir;
  props: PartProps;
}

export interface Wire {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface CircuitDoc {
  parts: Part[];
  wires: Wire[];
}

export interface Pt {
  x: number;
  y: number;
}

const DV: Pt[] = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

export function dirVec(d: Dir): Pt {
  return DV[d];
}

export function terminals(p: Pick<Part, 'x' | 'y' | 'dir'>): [Pt, Pt] {
  const v = DV[p.dir];
  return [
    { x: p.x, y: p.y },
    { x: p.x + v.x * PART_LEN, y: p.y + v.y * PART_LEN },
  ];
}

export const ptKey = (p: Pt) => `${p.x},${p.y}`;

/** Đường dây hình chữ L: đi ngang trước rồi đi dọc. */
export function wirePoints(w: Wire): Pt[] {
  if (w.x1 === w.x2 || w.y1 === w.y2) {
    return [
      { x: w.x1, y: w.y1 },
      { x: w.x2, y: w.y2 },
    ];
  }
  return [
    { x: w.x1, y: w.y1 },
    { x: w.x2, y: w.y1 },
    { x: w.x2, y: w.y2 },
  ];
}

// ---------- Thông số vật liệu ----------

export const MATERIALS: Record<Material, { name: string; R: number; conductor: boolean }> = {
  dong: { name: 'Đồng', R: 0.01, conductor: true },
  nhom: { name: 'Nhôm', R: 0.01, conductor: true },
  sat: { name: 'Sắt', R: 0.02, conductor: true },
  than: { name: 'Than chì (ruột bút chì)', R: 3, conductor: true },
  nuocMuoi: { name: 'Nước muối', R: 40, conductor: true },
  nuocCat: { name: 'Nước cất', R: 1e6, conductor: false },
  nhua: { name: 'Nhựa', R: 1e12, conductor: false },
  go: { name: 'Gỗ khô', R: 1e12, conductor: false },
  thuyTinh: { name: 'Thủy tinh', R: 1e12, conductor: false },
  caoSu: { name: 'Cao su', R: 1e12, conductor: false },
};

/** Điện trở suất ở 20 °C (Ω·m) */
export const WIRE_MATERIALS: Record<WireMaterial, { name: string; rho: number }> = {
  dong: { name: 'Đồng', rho: 1.7e-8 },
  nhom: { name: 'Nhôm', rho: 2.8e-8 },
  sat: { name: 'Sắt', rho: 1.2e-7 },
  nikelin: { name: 'Nikêlin', rho: 0.4e-6 },
  constantan: { name: 'Constantan', rho: 0.5e-6 },
  nicrom: { name: 'Nicrom', rho: 1.1e-6 },
};

export function wireSampleR(p: PartProps): number {
  const rho = WIRE_MATERIALS[p.wireMaterial ?? 'nicrom'].rho;
  const l = p.length ?? 1;
  const S = (p.area ?? 0.1) * 1e-6;
  return (rho * l) / S;
}

export function lampR(p: PartProps): number {
  const V = p.ratedV ?? 3;
  const P = p.ratedP ?? 0.9;
  return (V * V) / P;
}

// ---------- Mặc định cho từng loại linh kiện ----------

export const PART_INFO: Record<PartType, { name: string; defaults: PartProps; polar?: boolean }> = {
  battery: { name: 'Pin', defaults: { cells: 2 }, polar: true },
  supply: { name: 'Nguồn điện', defaults: { voltage: 6 }, polar: true },
  switch: { name: 'Công tắc', defaults: { closed: false } },
  lamp: { name: 'Bóng đèn', defaults: { ratedV: 3, ratedP: 0.9 } },
  led: { name: 'Đèn LED', defaults: { color: 'red' }, polar: true },
  resistor: { name: 'Điện trở', defaults: { R: 10 } },
  rheostat: { name: 'Biến trở', defaults: { Rmax: 20, pos: 0.5 } },
  ammeter: { name: 'Ampe kế', defaults: { range: 1, display: 'digital' }, polar: true },
  voltmeter: { name: 'Vôn kế', defaults: { range: 6, display: 'digital' }, polar: true },
  fuse: { name: 'Cầu chì', defaults: { maxI: 0.5 } },
  bell: { name: 'Chuông điện', defaults: {} },
  heater: { name: 'Dây đốt nóng', defaults: { R: 2 } },
  coil: { name: 'Nam châm điện', defaults: { R: 3 } },
  electrolysis: { name: 'Bình điện phân', defaults: { R: 15 } },
  sample: { name: 'Vật cần thử', defaults: { material: 'dong' } },
  wireSample: { name: 'Dây dẫn khảo sát', defaults: { wireMaterial: 'nicrom', length: 1, area: 0.1 } },
};

let idCounter = 0;
export function newId(prefix: string): string {
  idCounter += 1;
  return `${prefix}${Date.now().toString(36)}${idCounter}`;
}

export function makePart(type: PartType, x: number, y: number, dir: Dir = 0, props: PartProps = {}, id?: string): Part {
  return { id: id ?? newId('p'), type, x, y, dir, props: { ...PART_INFO[type].defaults, ...props } };
}
