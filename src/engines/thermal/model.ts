// Mô hình thí nghiệm nhiễm điện và nhiệt (KHTN 8 Bài 20, 26–29).

export interface ChargeDoc {
  mode: 'charge';
  pair: 'nhuaVai' | 'thuyTinhLua';
  /** số lần cọ xát đã thực hiện */
  rubs: number;
  /** đưa thước lại gần giấy vụn */
  near: boolean;
}

export interface InteractDoc {
  mode: 'interact';
  /** điện tích quả cầu A */
  hanging: 'neg' | 'pos' | 'none';
  /** điện tích quả cầu B */
  hand: 'neg' | 'pos' | 'none';
  /** khoảng cách đưa lại gần 0..1 */
  close: number;
}

export interface ParticlesDoc {
  mode: 'particles';
  /** nhiệt độ (°C) */
  T: number;
  state: 'solid' | 'liquid' | 'gas';
}

export interface DiffusionDoc {
  mode: 'diffusion';
  Tcold: number;
  Thot: number;
}

export interface JouleDoc {
  mode: 'joule';
  /** khối lượng nước (g) */
  m: number;
  /** công suất dây đốt (W) */
  P: number;
}

export interface ConductionDoc {
  mode: 'conduction';
  rods: ('dong' | 'nhom' | 'thep' | 'thuyTinh')[];
}

export interface ConvectionDoc {
  mode: 'convection';
  medium: 'water' | 'air';
}

export interface RadiationDoc {
  mode: 'radiation';
}

export interface ExpansionDoc {
  mode: 'expansion';
  kind: 'ball' | 'strip' | 'liquid' | 'gas';
  /** nhiệt độ (°C) */
  T: number;
}

export type ThermalDoc = ChargeDoc | InteractDoc | ParticlesDoc | DiffusionDoc | JouleDoc | ConductionDoc | ConvectionDoc | RadiationDoc | ExpansionDoc;

export interface ThermalOptions {
  showCalc?: boolean;
}
