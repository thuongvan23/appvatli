// Nội dung cơ học: KHTN 8 Bài 18, 19 và KHTN 9 Bài 2, 3, 4.
import type { LessonContent } from '../core/types';

const l8_18: LessonContent = {
  scenes: [
    {
      title: 'Lực làm quay cánh cửa',
      prompt: 'Kéo điểm đặt lực ra xa hoặc lại gần bản lề, đổi hướng lực. Bấm "Tác dụng lực" để xem cửa quay nhanh hay chậm.',
      question: 'Đặt lực ở đâu và theo hướng nào thì dễ làm cánh cửa quay nhất?',
      doc: { mode: 'moment', object: 'door', r: 0.9, angle: 90, F: 10 },
      report: {
        title: 'Moment lực',
        columns: [
          { key: 'F', label: 'F', unit: 'N', source: 'F', digits: 0 },
          { key: 'd', label: 'd', unit: 'm', source: 'd', digits: 2 },
          { key: 'M', label: 'M = F·d', unit: 'N·m', formula: (r) => (r.F ?? 0) * (r.d ?? 0), digits: 2 },
        ],
      },
    },
    {
      title: 'Cờ lê vặn đai ốc',
      prompt: 'Cầm cờ lê ở đầu xa và tác dụng lực vuông góc với cán cờ lê để có moment lớn nhất.',
      question: 'Vì sao cờ lê có cán dài giúp vặn đai ốc dễ hơn?',
      doc: { mode: 'moment', object: 'wrench', r: 0.5, angle: 90, F: 20 },
    },
    {
      title: 'Khi nào lực không làm vật quay?',
      prompt: 'Lực đang có giá đi qua trục quay (đẩy dọc theo cánh cửa). Bấm "Tác dụng lực" rồi thay đổi góc để so sánh.',
      question: 'Lực có giá đi qua trục quay hoặc song song với trục quay có làm vật quay không?',
      doc: { mode: 'moment', object: 'door', r: 0.9, angle: 180, F: 20 },
    },
  ],
};

const l8_19: LessonContent = {
  scenes: [
    {
      title: 'Đòn bẩy cân bằng (loại 1)',
      prompt: 'Treo quả nặng ở hai bên điểm tựa O. Thay đổi số quả nặng và vị trí treo cho đến khi đòn bẩy cân bằng.',
      question: 'Điều kiện cân bằng của đòn bẩy là gì? Kể tên dụng cụ là đòn bẩy loại 1 (cái kéo, bập bênh…).',
      doc: { mode: 'lever', fulcrum: 'mid', loads: [{ pos: -4, n: 3 }, { pos: 3, n: 2 }], effortPos: 0 },
      report: {
        title: 'Điều kiện cân bằng của đòn bẩy',
        columns: [
          { key: 'F1', label: 'F₁', unit: 'N', source: 'F1', digits: 1 },
          { key: 'd1', label: 'd₁', unit: 'cm', source: 'd1', digits: 0 },
          { key: 'F2', label: 'F₂', unit: 'N', source: 'F2', digits: 1 },
          { key: 'd2', label: 'd₂', unit: 'cm', source: 'd2', digits: 0 },
          { key: 'M1', label: 'F₁·d₁', formula: (r) => (r.F1 ?? 0) * (r.d1 ?? 0), digits: 1 },
          { key: 'M2', label: 'F₂·d₂', formula: (r) => (r.F2 ?? 0) * (r.d2 ?? 0), digits: 1 },
        ],
      },
    },
    {
      title: 'Đòn bẩy loại 2 – được lợi về lực',
      prompt: 'Điểm tựa O ở đầu thanh, vật treo ở giữa, lực kế kéo lên ở xa O hơn (như xe cút kít). Đọc số chỉ lực kế.',
      question: 'Khi nào dùng đòn bẩy được lợi về lực? Kể tên ví dụ.',
      doc: { mode: 'lever', fulcrum: 'end', loads: [{ pos: 4, n: 4 }], effortPos: 14 },
    },
    {
      title: 'Đòn bẩy loại 2 – được lợi về đường đi',
      prompt: 'Lực kế kéo ở gần O hơn vật (như cái gắp, cánh tay người). Số chỉ lực kế lớn hơn trọng lượng vật.',
      question: 'Vì sao dùng cái gắp thì tốn lực nhưng lại thuận tiện? Cẳng tay người là đòn bẩy loại nào?',
      doc: { mode: 'lever', fulcrum: 'end', loads: [{ pos: 14, n: 2 }], effortPos: 4 },
    },
  ],
};

const l9_2: LessonContent = {
  scenes: [
    {
      title: 'Động năng',
      prompt: 'Chọn khối lượng bi và độ cao thả, bấm "Thả viên bi". So sánh quãng đường khúc gỗ bị đẩy đi.',
      question: 'Động năng phụ thuộc vào những yếu tố nào? Viết công thức Wđ = ½·m·v².',
      doc: { mode: 'ramp', m: 100, h: 20 },
      report: {
        title: 'Động năng của viên bi',
        columns: [
          { key: 'm', label: 'm', unit: 'g', source: 'm', digits: 0 },
          { key: 'v', label: 'v', unit: 'm/s', source: 'v', digits: 2 },
          { key: 'Wd', label: 'Wđ', unit: 'J', source: 'Wd', digits: 2 },
          { key: 's', label: 's khúc gỗ', unit: 'cm', source: 's', digits: 0 },
        ],
      },
    },
    {
      title: 'Thế năng hấp dẫn',
      prompt: 'Chọn khối lượng và độ cao của vật nặng, bấm "Thả vật". So sánh độ lún của cọc.',
      question: 'Thế năng hấp dẫn phụ thuộc vào những yếu tố nào? Wt = P·h.',
      doc: { mode: 'drop', m: 500, h: 50 },
      report: {
        title: 'Thế năng hấp dẫn',
        columns: [
          { key: 'm', label: 'm', unit: 'g', source: 'm', digits: 0 },
          { key: 'h', label: 'h', unit: 'cm', source: 'h', digits: 0 },
          { key: 'Wt', label: 'Wt', unit: 'J', source: 'Wt', digits: 2 },
          { key: 'depth', label: 'Độ lún', unit: 'cm', source: 'depth', digits: 1 },
        ],
      },
    },
  ],
};

const l9_3: LessonContent = {
  scenes: [
    {
      title: 'Con lắc đơn',
      prompt: 'Kéo quả nặng lệch khỏi vị trí cân bằng rồi bấm "Thả". Theo dõi các cột Wđ, Wt, W.',
      question: 'Ở vị trí nào động năng lớn nhất, thế năng lớn nhất? Cơ năng thay đổi thế nào?',
      doc: { mode: 'track', kind: 'pendulum', theta0: 45, friction: false, m: 200 },
    },
    {
      title: 'Có ma sát',
      prompt: 'Bật "Có ma sát, lực cản không khí" và thả viên bi trong máng cong. Quan sát cột cơ năng W.',
      question: 'Vì sao trong thực tế con lắc dao động một lúc rồi dừng lại? Phần cơ năng mất đi chuyển thành dạng năng lượng nào?',
      doc: { mode: 'track', kind: 'bowl', theta0: 50, friction: true, m: 200 },
    },
  ],
};

const l9_4: LessonContent = {
  scenes: [
    {
      title: 'Công cơ học',
      prompt: 'Chọn lực kéo và quãng đường, bấm "Kéo thùng hàng". Công được tính bằng A = F·s.',
      question: 'Khi nào có công cơ học? Đơn vị của công là gì?',
      doc: { mode: 'work', F: 200, s: 5 },
      report: {
        title: 'Công cơ học',
        columns: [
          { key: 'F', label: 'F', unit: 'N', source: 'F', digits: 0 },
          { key: 's', label: 's', unit: 'm', source: 's', digits: 0 },
          { key: 'A', label: 'A = F·s', unit: 'J', formula: (r) => (r.F ?? 0) * (r.s ?? 0), digits: 0 },
        ],
      },
    },
    {
      title: 'Công suất',
      prompt: 'Hai máy cùng nâng một vật lên cùng độ cao nhưng trong thời gian khác nhau. Bấm "Bắt đầu nâng".',
      question: 'Máy nào làm việc khoẻ hơn? Tính công suất P = A/t của mỗi máy.',
      doc: { mode: 'power', m: 200, h: 10, tA: 20, tB: 10 },
    },
  ],
};

export const MECH_LESSONS: Record<string, LessonContent> = {
  'l8-18': l8_18,
  'l8-19': l8_19,
  'l9-2': l9_2,
  'l9-3': l9_3,
  'l9-4': l9_4,
};
