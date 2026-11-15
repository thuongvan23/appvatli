import type { Body, Filter, Medium, Screen, Source } from './trace';

export interface RaysDoc {
  mode: 'rays';
  sources: Source[];
  bodies: Body[];
  filters: Filter[];
  screens: Screen[];
  ambient?: Medium;
  /** Bảng chia độ tròn */
  protractor?: { x: number; y: number; r: number };
}

export interface LensDoc {
  mode: 'lens';
  kind: 'converging' | 'diverging';
  /** tiêu cự (cm, luôn dương; dấu do loại thấu kính) */
  f: number;
  /** vị trí thấu kính trên băng (cm) */
  lensX: number;
  /** vị trí vật (cm) */
  objX: number;
  /** chiều cao vật (cm) */
  h: number;
  showObject: boolean;
  /** vị trí màn chắn (cm) hoặc null */
  screenX: number | null;
  /** bước dựng ảnh (chế độ bài tập) */
  step?: number;
}

export type ColorLight = 'white' | 'red' | 'green' | 'blue' | 'yellow';

export interface ColorDoc {
  mode: 'color';
  light: ColorLight;
}

export type OpticsDoc = RaysDoc | LensDoc | ColorDoc;

export interface OpticsOptions {
  /** cho kéo thả vật, nguồn sáng */
  editable?: boolean;
  showNormal?: boolean;
  showAngles?: boolean;
  /** Thấu kính: kiểu tia hiển thị */
  rays?: 'special' | 'beam' | 'none';
  /** Thấu kính: các thông số được chỉnh */
  controls?: ('kind' | 'f' | 'd' | 'h' | 'screen' | 'lens')[];
  /** Thấu kính: vẽ mắt người quan sát và số bội giác */
  magnifier?: boolean;
  /** Thấu kính: chế độ dựng ảnh từng bước */
  construction?: boolean;
  /** Thấu kính: hiện kết quả tính toán */
  showCalc?: boolean;
  /** Thấu kính: ẩn tiêu điểm (bài thực hành đo tiêu cự) */
  hideFocus?: boolean;
  /** Thấu kính: không vẽ ảnh A'B' (chỉ quan sát trên màn) */
  hideImage?: boolean;
}
