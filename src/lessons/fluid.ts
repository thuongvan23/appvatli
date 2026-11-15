// Nội dung KHTN 8 Chương III: Bài 13–17.
import type { LessonContent } from '../core/types';
import type { DensityDoc, FluidOptions, LabObject } from '../engines/fluid/model';

const O = (o: FluidOptions) => o;
const cube = (id: string, material: LabObject['material'], a: number, name?: string): LabObject => ({ id, material, shape: 'cube', a, b: a, c: a, name });
const box = (id: string, material: LabObject['material'], a: number, b: number, c: number, name?: string): LabObject => ({ id, material, shape: 'box', a, b, c, name });
const stone = (id: string, material: LabObject['material'], V: number, name?: string): LabObject => ({ id, material, shape: 'stone', V, name });

const density = (objects: LabObject[], p: Partial<DensityDoc> = {}): DensityDoc => ({ mode: 'density', objects, onScale: null, inCylinder: null, water: 100, capacity: 250, ...p });

const DReport = {
  title: 'Khối lượng riêng của các vật',
  columns: [
    { key: 'm', label: 'm', unit: 'g', source: 'm', digits: 1 },
    { key: 'V', label: 'V', unit: 'cm³', source: 'V', digits: 1 },
    { key: 'D', label: 'm / V', unit: 'g/cm³', formula: (r: Record<string, number | undefined>) => (r.V ? (r.m ?? 0) / r.V : undefined), digits: 2 },
  ],
};

const l8_13: LessonContent = {
  scenes: [
    {
      title: 'Cùng thể tích, khác khối lượng',
      prompt: 'Ba khối lập phương cạnh 3 cm bằng nhôm, sắt, đồng. Kéo từng khối lên cân để so sánh khối lượng.',
      question: 'Các vật có cùng thể tích nhưng làm bằng chất khác nhau thì khối lượng có bằng nhau không?',
      doc: density([cube('al', 'nhom', 3, 'Khối nhôm'), cube('fe', 'sat', 3, 'Khối sắt'), cube('cu', 'dong', 3, 'Khối đồng')]),
      options: O({}),
      startHidden: true,
    },
    {
      title: 'Tỉ số m / V',
      prompt: 'Với mỗi khối nhôm, đo khối lượng (cân) và thể tích (bình chia độ). Ghi số đo vào "Báo cáo" và so sánh m/V.',
      question: 'Tỉ số m/V của các vật cùng chất có bằng nhau không? Khối lượng riêng là gì?',
      doc: density([cube('a1', 'nhom', 2, 'Nhôm 2 cm'), cube('a2', 'nhom', 3, 'Nhôm 3 cm'), box('a3', 'nhom', 4, 2, 2, 'Nhôm 4×2×2'), cube('f1', 'sat', 3, 'Sắt 3 cm')]),
      options: O({ showCalc: true, table: true }),
      report: DReport,
    },
  ],
};

const l8_14: LessonContent = {
  scenes: [
    {
      title: 'Vật hình hộp chữ nhật',
      prompt: 'Chọn vật, đọc kích thước a, b, c trên thước; đặt vật lên cân để đo m. Tính V = a·b·c và D = m/V.',
      doc: density([box('b1', 'nhom', 5, 3, 2, 'Khối hộp A'), box('b2', 'sat', 4, 2, 2, 'Khối hộp B'), box('b3', 'dong', 3, 2, 2, 'Khối hộp C')]),
      options: O({ ruler: true, table: true }),
      report: {
        title: 'Xác định khối lượng riêng của vật hình hộp',
        practical: true,
        purpose: 'Xác định được khối lượng riêng của một khối hộp chữ nhật bằng cân và thước.',
        equipment: ['Cân điện tử', 'Thước có độ chia nhỏ nhất 1 mm', 'Khối hộp chữ nhật cần đo'],
        steps: ['Dùng thước đo các cạnh a, b, c của khối hộp.', 'Dùng cân đo khối lượng m của khối hộp.', 'Tính thể tích V = a·b·c và khối lượng riêng D = m/V.', 'Lặp lại 3 lần, tính giá trị trung bình.'],
        columns: [
          { key: 'a', label: 'a', unit: 'cm', source: 'a', digits: 1 },
          { key: 'b', label: 'b', unit: 'cm', source: 'b', digits: 1 },
          { key: 'c', label: 'c', unit: 'cm', source: 'c', digits: 1 },
          { key: 'm', label: 'm', unit: 'g', source: 'm', digits: 1 },
          { key: 'V', label: 'V = a·b·c', unit: 'cm³', formula: (r) => (r.a ?? 0) * (r.b ?? 0) * (r.c ?? 0), digits: 1 },
          { key: 'D', label: 'D = m/V', unit: 'g/cm³', formula: (r) => ((r.a ?? 0) * (r.b ?? 0) * (r.c ?? 0) ? (r.m ?? 0) / ((r.a ?? 0) * (r.b ?? 0) * (r.c ?? 0)) : undefined), digits: 2, average: true },
        ],
        questions: ['Vật được làm bằng chất gì (so sánh với bảng khối lượng riêng)?'],
      },
    },
    {
      title: 'Khối lượng riêng của chất lỏng',
      prompt: 'Đặt cốc rỗng lên cân (m₁). Đong V ml chất lỏng bằng bình chia độ rồi rót vào cốc, đọc số chỉ của cân (m₂).',
      doc: { mode: 'liquidDensity', liquid: 'nuoc', V: 100, cupOnScale: false, poured: false },
      options: O({}),
      report: {
        title: 'Xác định khối lượng riêng của chất lỏng',
        practical: true,
        purpose: 'Xác định được khối lượng riêng của chất lỏng bằng cân và bình chia độ.',
        equipment: ['Cân điện tử', 'Bình chia độ', 'Cốc thuỷ tinh', 'Chất lỏng cần đo (nước, dầu ăn…)'],
        steps: ['Đặt cốc rỗng lên cân, ghi khối lượng m₁.', 'Đong thể tích V chất lỏng bằng bình chia độ, rót vào cốc.', 'Đặt cốc có chất lỏng lên cân, ghi khối lượng m₂.', 'Tính D = (m₂ − m₁)/V.'],
        columns: [
          { key: 'V', label: 'V', unit: 'ml', source: 'V', digits: 0 },
          { key: 'm1', label: 'm₁', unit: 'g', source: 'm1', digits: 1 },
          { key: 'm2', label: 'm₂', unit: 'g', source: 'm2', digits: 1 },
          { key: 'D', label: 'D = (m₂−m₁)/V', unit: 'g/ml', formula: (r) => (r.V ? ((r.m2 ?? 0) - (r.m1 ?? 0)) / r.V : undefined), digits: 2, average: true },
        ],
      },
    },
    {
      title: 'Vật không thấm nước bất kì',
      prompt: 'Đo khối lượng hòn đá bằng cân; thả hòn đá vào bình chia độ, thể tích nước dâng lên bằng thể tích hòn đá.',
      doc: density([stone('s1', 'da', 24, 'Hòn đá'), stone('s2', 'thuyTinh', 18, 'Viên bi thuỷ tinh'), stone('s3', 'sat', 12, 'Đinh ốc sắt')], { water: 120 }),
      options: O({ showCalc: true, table: true }),
      report: {
        title: 'Xác định khối lượng riêng của vật không thấm nước',
        practical: true,
        purpose: 'Xác định được khối lượng riêng của vật rắn có hình dạng bất kì, không thấm nước.',
        equipment: ['Cân điện tử', 'Bình chia độ có nước', 'Vật cần đo (hòn đá…), dây buộc'],
        steps: ['Đo khối lượng m của vật bằng cân.', 'Đọc thể tích nước V₁ trong bình chia độ.', 'Thả chìm vật vào bình, đọc V₂.', 'Thể tích vật V = V₂ − V₁, tính D = m/V.'],
        columns: [
          { key: 'm', label: 'm', unit: 'g', source: 'm', digits: 1 },
          { key: 'V1', label: 'V₁', unit: 'ml', source: 'V0', digits: 0 },
          { key: 'V2', label: 'V₂', unit: 'ml', source: 'V1', digits: 0 },
          { key: 'D', label: 'D = m/(V₂−V₁)', unit: 'g/cm³', formula: (r) => ((r.V2 ?? 0) - (r.V1 ?? 0) ? (r.m ?? 0) / ((r.V2 ?? 0) - (r.V1 ?? 0)) : undefined), digits: 2, average: true },
        ],
      },
    },
  ],
};

const l8_15: LessonContent = {
  scenes: [
    {
      title: 'Áp lực và áp suất',
      prompt: 'Đổi cách đặt viên gạch và số quả nặng. Quan sát độ lún trên cát và giá trị áp suất.',
      question: 'Áp suất phụ thuộc vào những yếu tố nào? Làm thế nào để tăng, giảm áp suất?',
      doc: { mode: 'pressure', face: 0, weights: 0, surface: 'cat' },
      options: O({}),
      report: {
        title: 'Áp suất trên mặt cát',
        columns: [
          { key: 'F', label: 'F', unit: 'N', source: 'F', digits: 0 },
          { key: 'S', label: 'S', unit: 'm²', source: 'S', digits: 3 },
          { key: 'p', label: 'p = F/S', unit: 'Pa', formula: (r) => (r.S ? (r.F ?? 0) / r.S : undefined), digits: 0 },
        ],
      },
    },
  ],
};

const l8_16: LessonContent = {
  scenes: [
    {
      title: 'Áp suất tăng theo độ sâu',
      prompt: 'Kéo đầu dò xuống sâu dần, sang ngang, xoay màng cao su. Quan sát độ chênh mực chất lỏng trong áp kế.',
      question: 'Áp suất chất lỏng phụ thuộc vào độ sâu thế nào? Ở cùng độ sâu, áp suất theo các phương có bằng nhau không?',
      doc: { mode: 'depth', liquid: 'nuoc', depth: 15, px: 0.5, facing: 0, atm: false },
      options: O({}),
      report: {
        title: 'Áp suất chất lỏng theo độ sâu',
        columns: [
          { key: 'h', label: 'h', unit: 'cm', source: 'h', digits: 0 },
          { key: 'p', label: 'p', unit: 'Pa', source: 'p', digits: 0 },
        ],
        chart: { x: 'h', y: 'p', title: 'Áp suất p theo độ sâu h' },
      },
    },
    {
      title: 'Chất lỏng gây áp suất lên thành bình',
      prompt: 'Mở các lỗ ở thành bình. So sánh tia nước phun ra ở các độ sâu khác nhau.',
      doc: { mode: 'jets', liquid: 'nuoc', open: false, level: 50 },
      options: O({}),
    },
    {
      title: 'Bình thông nhau',
      prompt: 'Đổ thêm nước vào một nhánh bất kì và quan sát mực nước ở các nhánh khi nước đứng yên.',
      question: 'Vì sao vòi ấm trà phải cao bằng hoặc cao hơn miệng ấm?',
      doc: { mode: 'vessels', water: 14, pourInto: 0 },
      options: O({}),
    },
    {
      title: 'Máy nén thuỷ lực',
      prompt: 'Tăng lực f tác dụng lên pít-tông nhỏ. Lực F ở pít-tông lớn lớn hơn f bao nhiêu lần?',
      question: 'Vì sao chỉ cần lực nhỏ ở pít-tông nhỏ mà nâng được ô tô ở pít-tông lớn?',
      doc: { mode: 'press', s: 4, S: 400, f: 50 },
      options: O({}),
    },
    {
      title: 'Áp suất khí quyển',
      prompt: 'Hút dần không khí trong hộp sữa giấy. Quan sát hình dạng hộp và các mũi tên áp suất.',
      question: 'Giải thích vì sao uống hết sữa rồi tiếp tục hút thì hộp bị bẹp lại.',
      doc: { mode: 'atm', removed: 0, scene: 'box' },
      options: O({}),
    },
  ],
};

const l8_17: LessonContent = {
  scenes: [
    {
      title: 'Lực đẩy của chất lỏng',
      prompt: 'Treo vật vào lực kế, đọc P. Nhúng dần vật vào nước: số chỉ lực kế giảm. Mở "Báo cáo" để ghi số đo.',
      question: 'Vì sao số chỉ của lực kế giảm khi nhúng vật vào nước? Lực đẩy có hướng nào?',
      doc: { mode: 'buoyancy', object: stone('obj', 'nhom', 100), liquid: 'nuoc', dip: 0 },
      options: O({}),
      report: {
        title: 'Lực đẩy Archimedes',
        columns: [
          { key: 'Vimm', label: 'V chìm', unit: 'cm³', source: 'Vimm', digits: 0 },
          { key: 'P', label: 'P', unit: 'N', source: 'P', digits: 2 },
          { key: 'F', label: 'F (lực kế)', unit: 'N', source: 'F', digits: 2 },
          { key: 'FA', label: 'F_A = P − F', unit: 'N', formula: (r) => (r.P ?? 0) - (r.F ?? 0), digits: 2 },
        ],
        chart: { x: 'Vimm', y: 'FA', title: 'F_A theo thể tích phần chìm' },
      },
    },
    {
      title: 'F_A phụ thuộc vào gì?',
      prompt: 'Thay vật (cùng chất khác thể tích, khác chất cùng thể tích) và thay chất lỏng. So sánh lực đẩy khi vật chìm hoàn toàn.',
      question: 'Lực đẩy Archimedes phụ thuộc vào khối lượng riêng của vật hay của chất lỏng? Viết công thức F_A = d·V.',
      doc: { mode: 'buoyancy', object: stone('obj', 'nhom', 100), liquid: 'nuoc', dip: 1 },
      options: O({ choose: true }),
      report: {
        title: 'F_A phụ thuộc vào V và d',
        columns: [
          { key: 'V', label: 'V vật', unit: 'cm³', source: 'Vimm', digits: 0 },
          { key: 'd', label: 'd chất lỏng', unit: 'N/m³', source: 'd', digits: 0 },
          { key: 'FA', label: 'F_A', unit: 'N', source: 'FA', digits: 2 },
        ],
      },
    },
    {
      title: 'Vật nổi, vật chìm',
      prompt: 'Thả các vật vào chất lỏng. Đổi chất lỏng (nước, nước muối, dầu) và quan sát vật nào nổi, vật nào chìm.',
      question: 'Vì sao quả trứng chìm trong nước nhưng nổi trong nước muối đặc? Vì sao tàu thép nặng vẫn nổi?',
      doc: { mode: 'float', liquid: 'nuoc', objects: ['go', 'nen', 'trung', 'nhua', 'nhom', 'sat'], showForces: true },
      options: O({}),
      startHidden: true,
    },
  ],
};

export const FLUID_LESSONS: Record<string, LessonContent> = {
  'l8-13': l8_13,
  'l8-14': l8_14,
  'l8-15': l8_15,
  'l8-16': l8_16,
  'l8-17': l8_17,
};
