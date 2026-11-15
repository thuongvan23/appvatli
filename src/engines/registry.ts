import type { EngineDef, EngineId } from '../core/types';
import { CircuitBoard, CircuitOptions, PALETTE_ALL } from './circuit/CircuitBoard';
import type { CircuitDoc } from './circuit/model';
import { OpticsView } from './optics/OpticsView';
import type { OpticsDoc, OpticsOptions } from './optics/model';
import { FluidView } from './fluid/FluidView';
import type { FluidDoc, FluidOptions } from './fluid/model';
import { MechanicsView } from './mechanics/MechanicsView';
import type { MechDoc, MechOptions } from './mechanics/model';
import { ThermalView } from './thermal/ThermalView';
import type { ThermalDoc, ThermalOptions } from './thermal/model';
import { EmDoc, EmOptions, EmView } from './electromagnet/EmView';
import { DiagramDoc, DiagramOptions, DiagramView } from './diagram/DiagramView';
import { ChemDoc, ChemOptions, ChemView } from './chem/ChemLabView';
import { FULL_SHELF } from './chem/TubesView';
import { Phys7Doc, Phys7Options, Phys7View } from './phys7/Phys7View';

// ---------- Vật lí 7: bốn engine dùng chung một bộ điều phối ----------
const motion: EngineDef<Phys7Doc, Phys7Options> = {
  id: 'motion',
  name: 'Tốc độ – chuyển động',
  View: Phys7View,
  emptyDoc: () => ({ mode: 'timer', method: 'gate', s: 50, v: 0.5 }),
  freeOptions: {},
};
const sound: EngineDef<Phys7Doc, Phys7Options> = {
  id: 'sound',
  name: 'Âm thanh',
  View: Phys7View,
  emptyDoc: () => ({ mode: 'scope', src: 'tone', A: 0.6, f: 440 }),
  freeOptions: {},
};
const light: EngineDef<Phys7Doc, Phys7Options> = {
  id: 'light',
  name: 'Ánh sáng – gương phẳng',
  View: Phys7View,
  emptyDoc: () => ({ mode: 'reflect', i: 40, surface: 'mirror' }),
  freeOptions: {},
};
const magnet: EngineDef<Phys7Doc, Phys7Options> = {
  id: 'magnet',
  name: 'Nam châm – từ trường',
  View: Phys7View,
  emptyDoc: () => ({ mode: 'field', cfg: 'bar', show: 'filings', compasses: [{ x: 600, y: 160 }] }),
  freeOptions: {},
};

// ---------- Hoá học: ba engine dùng chung một bộ điều phối ----------
const chemlab: EngineDef<ChemDoc, ChemOptions> = {
  id: 'chemlab',
  name: 'Bàn thí nghiệm hoá học',
  View: ChemView,
  emptyDoc: () => ({ mode: 'tubes', free: true, shelf: FULL_SHELF, tubes: [1, 2, 3, 4].map(() => ({ init: [], events: [] })) }),
  freeOptions: {},
};
const molecule: EngineDef<ChemDoc, ChemOptions> = {
  id: 'molecule',
  name: 'Mô hình phân tử',
  View: ChemView,
  emptyDoc: () => ({ mode: 'balance', idx: 0, coefs: [] }),
  freeOptions: {},
};
const process: EngineDef<ChemDoc, ChemOptions> = {
  id: 'process',
  name: 'Sơ đồ – quy trình hoá học',
  View: ChemView,
  emptyDoc: () => ({ mode: 'cards', set: 'tools8', sel: 0 }),
  freeOptions: {},
};

const diagram: EngineDef<DiagramDoc, DiagramOptions> = {
  id: 'diagram',
  name: 'Năng lượng với cuộc sống',
  View: DiagramView,
  emptyDoc: () => ({ mode: 'renew', sel: 0 }),
  freeOptions: {},
};

const electromagnet: EngineDef<EmDoc, EmOptions> = {
  id: 'electromagnet',
  name: 'Điện từ',
  View: EmView,
  emptyDoc: () => ({ mode: 'induction', facing: 'N', turns: 400 }),
  freeOptions: {},
};

const thermal: EngineDef<ThermalDoc, ThermalOptions> = {
  id: 'thermal',
  name: 'Nhiệt – nhiễm điện',
  View: ThermalView,
  emptyDoc: () => ({ mode: 'particles', T: 25, state: 'gas' }),
  freeOptions: {},
};

const mechanics: EngineDef<MechDoc, MechOptions> = {
  id: 'mechanics',
  name: 'Cơ học – năng lượng',
  View: MechanicsView,
  emptyDoc: () => ({ mode: 'track', kind: 'pendulum', theta0: 40, friction: false, m: 200 }),
  freeOptions: {},
};

const fluid: EngineDef<FluidDoc, FluidOptions> = {
  id: 'fluid',
  name: 'Khối lượng riêng – áp suất',
  View: FluidView,
  emptyDoc: () => ({ mode: 'float', liquid: 'nuoc', objects: ['go', 'nen', 'trung', 'nhua', 'nhom', 'sat'], showForces: true }),
  freeOptions: {},
};

const optics: EngineDef<OpticsDoc, OpticsOptions> = {
  id: 'optics',
  name: 'Bàn quang học',
  View: OpticsView,
  emptyDoc: () => ({
    mode: 'rays',
    sources: [{ id: 'laser', x: 200, y: 300, angle: 10, color: 'red' }],
    bodies: [
      { id: 'b1', shape: 'semicircle', x: 600, y: 380, angle: 0, size: 160, medium: 'glass', label: 'Bán trụ' },
      { id: 'b2', shape: 'prism', x: 900, y: 360, angle: 0, size: 200, medium: 'flint', label: 'Lăng kính' },
    ],
    filters: [],
    screens: [],
  }),
  freeOptions: { editable: true },
};

const circuit: EngineDef<CircuitDoc, CircuitOptions> = {
  id: 'circuit',
  name: 'Bàn lắp mạch điện',
  View: CircuitBoard,
  emptyDoc: () => ({ parts: [], wires: [] }),
  freeOptions: { level: 9, palette: PALETTE_ALL, table: true },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ENGINES: Partial<Record<EngineId, EngineDef<any, any>>> = {
  circuit,
  optics,
  fluid,
  mechanics,
  thermal,
  electromagnet,
  diagram,
  chemlab,
  molecule,
  process,
  motion,
  sound,
  light,
  magnet,
};
