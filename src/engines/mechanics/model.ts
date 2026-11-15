// Mô hình thí nghiệm cơ học: moment lực, đòn bẩy (KHTN 8) và năng lượng, công, công suất (KHTN 9).

export interface MomentDoc {
  mode: 'moment';
  object: 'door' | 'wrench';
  /** khoảng cách từ trục quay đến điểm đặt lực (0..1 chiều dài vật) */
  r: number;
  /** góc giữa lực và vật (độ, 0 = dọc theo vật hướng ra ngoài) */
  angle: number;
  /** độ lớn lực (N) */
  F: number;
}

export interface LeverLoad {
  /** vị trí theo số vạch tính từ điểm tựa (âm: bên trái) */
  pos: number;
  /** số quả nặng (mỗi quả 50 g = 0,5 N) */
  n: number;
}

export interface LeverDoc {
  mode: 'lever';
  /** mid: điểm tựa ở giữa (đòn bẩy loại 1); end: điểm tựa ở đầu thanh (loại 2) */
  fulcrum: 'mid' | 'end';
  loads: LeverLoad[];
  /** loại 2: vị trí lực kế kéo lên (số vạch từ điểm tựa) */
  effortPos: number;
}

export interface RampDoc {
  mode: 'ramp';
  /** khối lượng viên bi (g) */
  m: number;
  /** độ cao thả bi (cm) */
  h: number;
}

export interface DropDoc {
  mode: 'drop';
  m: number;
  h: number;
}

export interface TrackDoc {
  mode: 'track';
  kind: 'pendulum' | 'bowl';
  /** góc thả ban đầu (độ) */
  theta0: number;
  friction: boolean;
  m: number;
}

export interface WorkDoc {
  mode: 'work';
  F: number;
  s: number;
}

export interface PowerDoc {
  mode: 'power';
  /** khối lượng vật nâng (kg) */
  m: number;
  /** độ cao (m) */
  h: number;
  tA: number;
  tB: number;
}

export type MechDoc = MomentDoc | LeverDoc | RampDoc | DropDoc | TrackDoc | WorkDoc | PowerDoc;

export interface MechOptions {
  showCalc?: boolean;
}
