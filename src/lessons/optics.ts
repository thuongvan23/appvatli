// Nội dung bàn quang học: KHTN 9 Bài 5–10.
import type { LessonContent } from '../core/types';
import type { LensDoc, OpticsOptions, RaysDoc } from '../engines/optics/model';
import type { Source } from '../engines/optics/trace';

const C = { x: 600, y: 350 };

const rays = (p: Partial<RaysDoc>): RaysDoc => ({ mode: 'rays', sources: [], bodies: [], filters: [], screens: [], ...p });

const orbitLaser = (side: 'top' | 'bottom', i: number, color: Source['color'] = 'red'): Source => ({
  id: 'laser',
  x: 0,
  y: 0,
  angle: 0,
  color,
  orbit: { cx: C.x, cy: C.y, r: 300, side, i },
});

const semi = (medium: 'glass' | 'water' = 'glass') => ({ id: 'semi', shape: 'semicircle' as const, x: C.x, y: C.y, angle: 0, size: 220, medium, label: medium === 'glass' ? 'Bán trụ thuỷ tinh' : 'Bán trụ nước' });

const protractor = { x: C.x, y: C.y, r: 290 };

const lens = (p: Partial<LensDoc>): LensDoc => ({ mode: 'lens', kind: 'converging', f: 12, lensX: 0, objX: -30, h: 5, showObject: true, screenX: null, ...p });

const O = (o: OpticsOptions) => o;

const refractionReport = {
  title: 'Góc tới và góc khúc xạ',
  columns: [
    { key: 'i', label: 'Góc tới i', unit: '°', source: 'i', digits: 0 },
    { key: 'r', label: 'Góc khúc xạ r', unit: '°', source: 'r', digits: 1 },
    { key: 'k', label: 'sin i / sin r', formula: (r: Record<string, number | undefined>) => (r.i && r.r ? Math.sin((r.i * Math.PI) / 180) / Math.sin((r.r * Math.PI) / 180) : undefined), digits: 2, average: true },
  ],
  chart: { x: 'i', y: 'r', title: 'Góc khúc xạ r theo góc tới i' },
};

const l9_5: LessonContent = {
  scenes: [
    {
      title: 'Hiện tượng khúc xạ',
      prompt: 'Kéo đèn laze để thay đổi góc tới. Quan sát tia sáng bị gãy khúc tại mặt phân cách giữa không khí và nước.',
      question: 'Hiện tượng khúc xạ ánh sáng là gì? Tia khúc xạ lệch gần hay xa pháp tuyến hơn tia tới?',
      doc: rays({ sources: [orbitLaser('top', 45)], bodies: [{ id: 'water', shape: 'rect', x: 600, y: 600, angle: 0, size: 1400, h: 500, medium: 'water', label: 'Nước' }] }),
      options: O({}),
    },
    {
      title: 'Đo góc tới và góc khúc xạ',
      prompt: 'Kéo laze (hoặc dùng thanh trượt) để có i = 0°, 15°, 30°, 45°, 60°, 75°. Mỗi lần mở "Báo cáo" và bấm "Ghi số đo".',
      question: 'Khi góc tới tăng thì góc khúc xạ thay đổi thế nào? Tỉ số sin i / sin r có thay đổi không?',
      doc: rays({ sources: [orbitLaser('top', 30)], bodies: [semi()], protractor }),
      options: O({}),
      report: refractionReport,
    },
    {
      title: 'Chiết suất của môi trường',
      prompt: 'Giữ nguyên góc tới. Bấm vào bán trụ để đổi chất: nước, dầu, thuỷ tinh, kim cương. So sánh góc khúc xạ.',
      question: 'Chiết suất càng lớn thì tia sáng bị lệch càng nhiều hay càng ít? Chiết suất tỉ đối n = sin i / sin r.',
      doc: rays({ sources: [orbitLaser('top', 50)], bodies: [semi('glass')], protractor }),
      options: O({}),
      report: { ...refractionReport, title: 'So sánh các môi trường' },
    },
    {
      title: 'Ánh sáng đi từ thuỷ tinh ra không khí',
      prompt: 'Tia sáng đi vào bán trụ theo đường bán kính nên không đổi hướng; tại mặt phẳng nó đi từ thuỷ tinh ra không khí.',
      question: 'Khi ánh sáng đi từ thuỷ tinh ra không khí, góc khúc xạ lớn hơn hay nhỏ hơn góc tới?',
      doc: rays({ sources: [orbitLaser('bottom', 20)], bodies: [semi()], protractor }),
      options: O({}),
    },
  ],
};

const l9_6: LessonContent = {
  scenes: [
    {
      title: 'Tăng dần góc tới',
      prompt: 'Tăng dần góc tới i. Quan sát tia khúc xạ mờ dần và tia phản xạ sáng dần, đến khi không còn tia khúc xạ.',
      question: 'Phản xạ toàn phần xảy ra khi nào? Góc giới hạn của thuỷ tinh khoảng bao nhiêu độ?',
      doc: rays({ sources: [orbitLaser('bottom', 25)], bodies: [semi()], protractor }),
      options: O({}),
      report: {
        title: 'Tìm góc giới hạn phản xạ toàn phần',
        columns: [
          { key: 'i', label: 'Góc tới i', unit: '°', source: 'i', digits: 0 },
          { key: 'r', label: 'Góc khúc xạ r', unit: '°', source: 'r', digits: 1 },
        ],
      },
    },
    {
      title: 'Góc giới hạn của các chất',
      prompt: 'Bấm vào bán trụ để đổi chất. Tìm góc giới hạn của nước, thuỷ tinh, kim cương (xem bảng bên phải).',
      question: 'Chất có chiết suất càng lớn thì góc giới hạn càng lớn hay càng nhỏ? Vì sao kim cương lấp lánh?',
      doc: rays({ sources: [orbitLaser('bottom', 45)], bodies: [semi('water')], protractor }),
      options: O({}),
    },
    {
      title: 'Cáp quang',
      prompt: 'Ánh sáng vào sợi quang bị phản xạ toàn phần liên tiếp ở thành sợi nên truyền đi rất xa. Xoay đầu laze (chấm tròn phía sau) để đổi hướng.',
      question: 'Nêu ứng dụng của cáp quang (truyền internet, nội soi trong y học…).',
      doc: rays({
        sources: [{ id: 'laser', x: 70, y: 330, angle: 22, color: 'green' }],
        bodies: [{ id: 'fiber', shape: 'rect', x: 640, y: 350, angle: 0, size: 1040, h: 70, medium: 'glass', label: '' }],
      }),
      options: O({ editable: true, showAngles: false, showNormal: false }),
    },
    {
      title: 'Lăng kính phản xạ toàn phần',
      prompt: 'Chùm sáng gặp mặt huyền với góc tới 45°, lớn hơn góc giới hạn nên bị phản xạ toàn phần và đổi hướng 90°.',
      question: 'Lăng kính phản xạ toàn phần được dùng trong dụng cụ nào (ống nhòm, kính tiềm vọng)?',
      doc: rays({
        sources: [{ id: 'laser', x: 260, y: 330, angle: 0, color: 'red', count: 3, width: 60 }],
        bodies: [{ id: 'p', shape: 'rightPrism', x: 600, y: 330, angle: 0, size: 240, medium: 'glass', label: '' }],
      }),
      options: O({ editable: true, showAngles: true }),
    },
  ],
};

const prism = (medium: 'glass' | 'flint') => ({ id: 'prism', shape: 'prism' as const, x: 600, y: 380, angle: 0, size: 280, medium, label: 'Lăng kính' });

const l9_7: LessonContent = {
  scenes: [
    {
      title: 'Đường truyền qua lăng kính',
      prompt: 'Tia sáng đơn sắc qua lăng kính bị khúc xạ hai lần và lệch về phía đáy. Kéo/xoay laze để thay đổi góc tới.',
      question: 'Tia ló ra khỏi lăng kính lệch về phía nào so với tia tới?',
      doc: rays({ sources: [{ id: 'laser', x: 200, y: 470, angle: -19, color: 'red' }], bodies: [prism('glass')] }),
      options: O({ editable: true }),
    },
    {
      title: 'Tán sắc ánh sáng trắng',
      prompt: 'Chiếu ánh sáng trắng qua lăng kính: trên màn thu được dải màu từ đỏ đến tím.',
      question: 'Ánh sáng trắng gồm những ánh sáng màu nào? Màu nào lệch nhiều nhất?',
      doc: rays({ sources: [{ id: 'laser', x: 200, y: 470, angle: -19, color: 'white' }], bodies: [prism('flint')], screens: [{ id: 'sc', x: 1060, y: 560, len: 300, angle: 90 }] }),
      options: O({ editable: true, showAngles: false }),
    },
    {
      title: 'Kính lọc màu',
      prompt: 'Chiếu ánh sáng trắng qua kính lọc. Bấm vào kính lọc để đổi màu và quan sát vệt sáng trên màn.',
      question: 'Kính lọc màu đỏ cho ánh sáng màu nào đi qua? Có tạo được ánh sáng đỏ từ kính lọc lam không?',
      doc: rays({
        sources: [{ id: 'laser', x: 150, y: 350, angle: 0, color: 'white', count: 5, width: 50 }],
        filters: [{ id: 'f', x: 550, y: 350, len: 160, angle: 90, color: 'red' }],
        screens: [{ id: 'sc', x: 1000, y: 350, len: 300, angle: 90 }],
      }),
      options: O({ showAngles: false, showNormal: false }),
    },
    {
      title: 'Màu sắc các vật',
      prompt: 'Chọn màu ánh sáng chiếu vào các vật và quan sát màu ta nhìn thấy.',
      question: 'Vì sao dưới ánh sáng đỏ, chiếc lá xanh trông gần như màu đen?',
      doc: { mode: 'color', light: 'white' },
      startHidden: true,
    },
  ],
};

const lensImageReport = {
  title: 'Ảnh tạo bởi thấu kính',
  columns: [
    { key: 'd', label: 'd', unit: 'cm', source: 'd', digits: 1 },
    { key: 'dp', label: "d'", unit: 'cm', source: 'dp', digits: 1 },
    { key: 'hp', label: "h'", unit: 'cm', source: 'hp', digits: 1 },
  ],
};

const l9_8: LessonContent = {
  scenes: [
    {
      title: 'Chùm sáng qua thấu kính hội tụ',
      prompt: 'Chùm tia sáng song song với trục chính, sau khi qua thấu kính hội tụ thì hội tụ tại tiêu điểm F\'. Kéo F để đổi tiêu cự.',
      question: 'Nhận biết thấu kính hội tụ: phần rìa mỏng hơn phần giữa. Tiêu cự là gì?',
      doc: lens({ showObject: false }),
      options: O({ rays: 'beam', controls: ['kind', 'f'] }),
    },
    {
      title: 'Chùm sáng qua thấu kính phân kì',
      prompt: 'Chùm tia song song qua thấu kính phân kì bị loe rộng ra; đường kéo dài của các tia ló đi qua tiêu điểm F\'.',
      question: 'So sánh hình dạng và tác dụng của thấu kính hội tụ và thấu kính phân kì.',
      doc: lens({ kind: 'diverging', showObject: false }),
      options: O({ rays: 'beam', controls: ['kind', 'f'] }),
    },
    {
      title: 'Ba tia sáng đặc biệt',
      prompt: '(1) Tia song song trục chính → qua F\'. (2) Tia qua quang tâm O → truyền thẳng. (3) Tia qua F → song song trục chính.',
      question: 'Dùng hai trong ba tia đặc biệt để dựng ảnh của điểm A.',
      doc: lens({ objX: -26 }),
      options: O({ rays: 'special', controls: ['kind', 'f', 'd', 'h'] }),
    },
    {
      title: 'Ảnh qua thấu kính hội tụ',
      prompt: 'Kéo vật AB lại gần thấu kính: d > 2f, d = 2f, f < d < 2f, d < f. Ghi số đo và nhận xét tính chất ảnh.',
      question: 'Khi nào thấu kính hội tụ cho ảnh thật? Khi nào cho ảnh ảo, cùng chiều, lớn hơn vật?',
      doc: lens({ objX: -36 }),
      options: O({ rays: 'special', controls: ['f', 'd', 'h'] }),
      report: lensImageReport,
    },
    {
      title: 'Ảnh qua thấu kính phân kì',
      prompt: 'Di chuyển vật AB ở mọi vị trí trước thấu kính phân kì và quan sát ảnh.',
      question: 'Ảnh của vật tạo bởi thấu kính phân kì có đặc điểm gì?',
      doc: lens({ kind: 'diverging', objX: -30 }),
      options: O({ rays: 'special', controls: ['f', 'd', 'h'] }),
      report: lensImageReport,
    },
  ],
};

const l9_9: LessonContent = {
  scenes: [
    {
      title: 'Đo tiêu cự (phương pháp Silbermann)',
      prompt: 'Kéo thấu kính và màn chắn đến khi ảnh trên màn rõ nét và cao bằng vật. Khi đó d = d\' và f = L / 4.',
      question: 'Vì sao khi ảnh thật bằng vật thì vật và màn cách thấu kính những khoảng bằng nhau và bằng 2f?',
      doc: lens({ f: 15, objX: -42, lensX: -22, screenX: 18, h: 4 }),
      options: O({ rays: 'none', controls: ['lens', 'screen'], hideFocus: true, hideImage: true }),
      report: {
        title: 'Đo tiêu cự của thấu kính hội tụ',
        practical: true,
        purpose: 'Đo được tiêu cự của thấu kính hội tụ bằng phương pháp Silbermann (tạo ảnh thật cao bằng vật).',
        equipment: ['Thấu kính hội tụ cần đo tiêu cự', 'Vật sáng AB (hình chữ F hoặc mũi tên)', 'Màn chắn', 'Giá quang học có thước đo'],
        steps: [
          'Đặt vật, thấu kính, màn trên giá quang học; vật và màn ở hai bên thấu kính.',
          'Dịch chuyển đồng thời thấu kính và màn (giữ d = d\') cho đến khi thu được ảnh rõ nét, cao bằng vật.',
          'Đọc khoảng cách L từ vật đến màn, ghi số đo. Tính f = L / 4.',
          'Lặp lại thí nghiệm 3 lần, tính giá trị trung bình.',
        ],
        columns: [
          { key: 'd', label: 'd', unit: 'cm', source: 'd', digits: 1 },
          { key: 'ds', label: "d'", unit: 'cm', source: 'ds', digits: 1 },
          { key: 'L', label: 'L', unit: 'cm', source: 'L', digits: 1 },
          { key: 'f', label: 'f = L/4', unit: 'cm', formula: (r) => (r.L ? r.L / 4 : undefined), digits: 2, average: true },
        ],
        questions: ['Tại sao phải đo nhiều lần và lấy giá trị trung bình?', 'Nêu một cách khác để xác định nhanh tiêu cự của thấu kính hội tụ.'],
      },
    },
  ],
};

const l9_10: LessonContent = {
  scenes: [
    {
      title: 'Kính lúp',
      prompt: 'Đặt vật trong khoảng tiêu cự của kính lúp: mắt nhìn thấy ảnh ảo, cùng chiều, lớn hơn vật. Kéo F để đổi tiêu cự.',
      question: 'Kính lúp có tiêu cự càng ngắn thì số bội giác G = 25/f càng lớn hay nhỏ?',
      doc: lens({ f: 8, objX: -5, h: 1.5 }),
      options: O({ rays: 'special', controls: ['f', 'd'], magnifier: true }),
    },
    {
      title: 'Bài tập: dựng ảnh qua thấu kính hội tụ',
      prompt: 'Bấm lần lượt các bước 1 → 4 ở bảng bên phải để dựng ảnh và tính d\', h\'. Có thể đổi d, f, h theo đề bài.',
      doc: lens({ f: 10, objX: -25, h: 4, step: 0 }),
      options: O({ rays: 'special', controls: ['f', 'd', 'h'], construction: true }),
    },
    {
      title: 'Bài tập: dựng ảnh qua thấu kính phân kì',
      prompt: 'Bấm lần lượt các bước để dựng ảnh ảo của vật qua thấu kính phân kì và tính d\', h\'.',
      doc: lens({ kind: 'diverging', f: 12, objX: -24, h: 5, step: 0 }),
      options: O({ rays: 'special', controls: ['f', 'd', 'h'], construction: true }),
    },
  ],
};

export const OPTICS_LESSONS: Record<string, LessonContent> = {
  'l9-5': l9_5,
  'l9-6': l9_6,
  'l9-7': l9_7,
  'l9-8': l9_8,
  'l9-9': l9_9,
  'l9-10': l9_10,
};
