// Nội dung các bài dùng bàn lắp mạch điện: KHTN 8 Bài 21–25, KHTN 9 Bài 11–13.
// Lời dẫn, câu hỏi do nhóm phát triển tự biên soạn theo yêu cầu cần đạt của chương trình.

import type { LessonContent, Scene } from '../core/types';
import type { CircuitDoc } from '../engines/circuit/model';
import type { CircuitOptions } from '../engines/circuit/CircuitBoard';
import { EMPTY, P, W, across, it, merge, path, ring } from './circuitKit';

type CS = Scene<CircuitDoc, CircuitOptions>;
const L8 = (o: CircuitOptions = {}): CircuitOptions => ({ level: 8, ...o });
const L9 = (o: CircuitOptions = {}): CircuitOptions => ({ level: 9, ...o });

// ============================== KHTN 8 ==============================

const basic8 = (closed = false) =>
  ring(6, 3, 22, 11, {
    bottom: [it('battery', { cells: 2 }, { id: 'nguon' })],
    right: [it('switch', { closed, label: 'K' })],
    top: [it('lamp', { label: 'Đ' })],
  });

const l8_21: LessonContent = {
  scenes: [
    {
      title: 'Dòng điện trong kim loại',
      prompt: 'Bấm vào công tắc K để đóng mạch. Quan sát các electron tự do (chấm xanh) trong dây dẫn.',
      question: 'Trước và sau khi đóng công tắc, các electron chuyển động như thế nào? Dòng điện là gì?',
      doc: basic8(false),
      options: L8({ locked: true, flow: 'electron' }),
    },
    {
      title: 'Chiều dòng điện quy ước',
      prompt: 'Quy ước: chiều dòng điện đi từ cực dương (+), qua dây dẫn và các thiết bị, tới cực âm (−) của nguồn.',
      question: 'So sánh chiều dòng điện quy ước với chiều chuyển động của các electron (bấm "Electron" / "Chiều dòng điện").',
      doc: basic8(true),
      options: L8({ locked: true, flow: 'current' }),
    },
    {
      title: 'Vật dẫn điện – vật cách điện',
      prompt: 'Bấm vào vật cần thử (giữa hai kẹp), chọn vật liệu ở bảng bên phải. Đèn sáng thì vật dẫn điện.',
      question: 'Xếp các vật liệu vào hai nhóm: vật dẫn điện và vật cách điện.',
      doc: ring(6, 3, 22, 11, {
        bottom: [it('battery', { cells: 2 }, { id: 'nguon' })],
        right: [it('lamp', { label: 'Đ' })],
        top: [it('sample', { material: 'dong' }, { id: 'X' })],
      }),
      options: L8({ locked: true }),
      startHidden: true,
    },
    {
      title: 'Nguồn điện',
      prompt: 'Mỗi nguồn điện có hai cực: cực dương (+) và cực âm (−). Bấm vào nguồn pin để thay đổi số pin.',
      question: 'Số pin tăng thì đèn sáng hơn hay tối hơn? Kể tên một số nguồn điện thường dùng.',
      doc: ring(6, 3, 22, 11, {
        bottom: [it('battery', { cells: 1 }, { id: 'nguon' })],
        right: [it('switch', { closed: true, label: 'K' })],
        top: [it('lamp', { label: 'Đ', ratedV: 6, ratedP: 3 })],
      }),
      options: L8({ locked: true }),
    },
    {
      title: 'Tự lắp mạch điện',
      prompt: 'Kéo pin, công tắc, bóng đèn vào bàn. Kéo từ chấm tròn ở đầu linh kiện để nối dây. Đóng công tắc cho đèn sáng.',
      doc: EMPTY,
      options: L8({ palette: ['battery', 'switch', 'lamp', 'led', 'sample'] }),
    },
  ],
};

const symbolsDoc: CircuitDoc = {
  parts: [
    P('battery', 2, 3, 0, { cells: 1 }),
    P('lamp', 9, 3, 0),
    P('switch', 16, 3, 0, { closed: false }),
    P('switch', 23, 3, 0, { closed: true }, 'k2'),
    P('resistor', 2, 7, 0),
    P('rheostat', 9, 7, 0),
    P('bell', 16, 7, 0),
    P('led', 23, 7, 0),
    P('ammeter', 2, 11, 0),
    P('voltmeter', 9, 11, 0),
    P('fuse', 16, 11, 0),
    P('battery', 23, 11, 0, { cells: 2 }, 'b2'),
  ],
  wires: [],
};

const l8_22: LessonContent = {
  scenes: [
    {
      title: 'Các bộ phận và kí hiệu',
      prompt: 'Bấm "Sơ đồ mạch" trên thanh công cụ để xem kí hiệu của từng bộ phận, bấm "Hình vẽ thật" để xem lại.',
      question: 'Vẽ kí hiệu của: nguồn điện, bóng đèn, công tắc đóng, công tắc mở, ampe kế, vôn kế.',
      doc: symbolsDoc,
      options: L8({ locked: true, showNames: true, flow: 'none' }),
    },
    {
      title: 'Mạch điện thật và sơ đồ',
      prompt: 'Chuyển qua lại giữa "Hình vẽ thật" và "Sơ đồ mạch điện" để đối chiếu từng bộ phận.',
      question: 'Sơ đồ mạch điện có ưu điểm gì so với hình vẽ thật?',
      doc: basic8(true),
      options: L8({ locked: true, flow: 'none' }),
    },
    {
      title: 'Lắp mạch theo sơ đồ',
      prompt: 'Lắp mạch điện đúng như sơ đồ ở góc màn hình, rồi đóng công tắc để kiểm tra.',
      doc: EMPTY,
      options: L8({
        palette: ['battery', 'switch', 'lamp', 'led', 'bell', 'fuse'],
        view: 'schematic',
        reference: ring(0, 0, 8, 4, {
          bottom: [it('battery', { cells: 2 })],
          right: [it('switch', { closed: true })],
          top: [it('lamp'), it('lamp', {}, { id: 'l2' })],
        }),
      }),
    },
    {
      title: 'Cầu chì bảo vệ mạch điện',
      prompt: 'Đóng K. Sau đó đóng K2: hai đầu bóng đèn bị nối tắt (đoản mạch). Quan sát cầu chì.',
      question: 'Khi xảy ra đoản mạch, cầu chì có tác dụng gì?',
      doc: across(
        ring(5, 5, 23, 12, {
          bottom: [it('battery', { cells: 2 }, { id: 'nguon' })],
          right: [it('fuse', { maxI: 0.5 }, { id: 'cauchi' })],
          top: [it('lamp', { label: 'Đ' }), it('switch', { label: 'K', closed: false })],
        }),
        'Đ',
        0,
        -3,
        it('switch', { label: 'K2', closed: false }),
      ),
      options: L8({ locked: true }),
    },
  ],
};

const l8_23: LessonContent = {
  scenes: [
    {
      title: 'Tác dụng nhiệt',
      prompt: 'Đóng công tắc. Dây đốt nóng lên và đỏ dần: dòng điện có tác dụng nhiệt.',
      question: 'Kể tên các đồ dùng trong gia đình hoạt động dựa vào tác dụng nhiệt của dòng điện.',
      doc: ring(6, 3, 22, 11, {
        bottom: [it('battery', { cells: 3 }, { id: 'nguon' })],
        right: [it('switch', { label: 'K', closed: false })],
        top: [it('heater', { R: 2 }, { id: 'day' })],
      }),
      options: L8({ locked: true }),
    },
    {
      title: 'Tác dụng phát sáng',
      prompt: 'Đóng hai công tắc. Bấm vào LED rồi bấm "Đảo chiều": LED chỉ sáng khi mắc đúng chiều.',
      question: 'Đèn sợi đốt và đèn LED khác nhau thế nào khi phát sáng?',
      doc: merge(
        ring(1, 3, 12, 11, {
          bottom: [it('battery', { cells: 2 }, { id: 'n1' })],
          right: [it('switch', { label: 'K1' })],
          top: [it('lamp', { label: 'Đ' })],
        }),
        ring(15, 3, 26, 11, {
          bottom: [it('battery', { cells: 2 }, { id: 'n2' })],
          right: [it('switch', { label: 'K2' })],
          top: [it('led', { label: 'LED' })],
        }),
      ),
      options: L8({ locked: true }),
    },
    {
      title: 'Tác dụng hoá học',
      prompt: 'Đóng công tắc và chờ một lúc: lớp đồng màu đỏ bám dần vào điện cực nối với cực âm của nguồn.',
      question: 'Ứng dụng của tác dụng hoá học: mạ điện (mạ đồng, mạ vàng, mạ kẽm…).',
      doc: ring(6, 4, 22, 11, {
        bottom: [it('battery', { cells: 3 }, { id: 'nguon' })],
        right: [it('switch', { label: 'K' })],
        top: [it('electrolysis', {}, { id: 'binh' })],
      }),
      options: L8({ locked: true }),
    },
    {
      title: 'Tác dụng từ',
      prompt: 'Đóng công tắc: nam châm điện hút các đinh sắt, chuông điện reo. Ngắt công tắc thì sao?',
      question: 'Kể tên ứng dụng tác dụng từ của dòng điện. Lưu ý: dòng điện qua cơ thể người gây tác dụng sinh lí rất nguy hiểm.',
      doc: merge(
        ring(1, 3, 12, 11, {
          bottom: [it('battery', { cells: 3 }, { id: 'n1' })],
          right: [it('switch', { label: 'K1' })],
          top: [it('coil', {}, { id: 'namcham' })],
        }),
        ring(15, 3, 26, 11, {
          bottom: [it('battery', { cells: 2 }, { id: 'n2' })],
          right: [it('switch', { label: 'K2' })],
          top: [it('bell', {}, { id: 'chuong' })],
        }),
      ),
      options: L8({ locked: true }),
    },
  ],
};

const ammeterLoop = (opts: { display: 'digital' | 'analog'; flip?: boolean; cells?: number; range?: number }) =>
  ring(6, 4, 22, 11, {
    bottom: [it('battery', { cells: opts.cells ?? 1 }, { id: 'nguon' })],
    right: [it('switch', { label: 'K', closed: true })],
    top: [it('ammeter', { label: 'A', display: opts.display, range: opts.range ?? 0.6 }, { flip: opts.flip }), it('lamp', { label: 'Đ', ratedV: 6, ratedP: 3 })],
  });

const voltLoop = () =>
  across(
    across(
      ring(6, 5, 22, 11, {
        bottom: [it('battery', { cells: 2 }, { id: 'nguon' })],
        right: [it('switch', { label: 'K', closed: false })],
        top: [it('lamp', { label: 'Đ', ratedV: 6, ratedP: 3 })],
      }),
      'nguon',
      0,
      3,
      it('voltmeter', { label: 'V1', range: 6 }, { flip: true }),
    ),
    'Đ',
    0,
    -3,
    it('voltmeter', { label: 'V2', range: 6 }),
  );

const l8_24: LessonContent = {
  scenes: [
    {
      title: 'Đo cường độ dòng điện',
      prompt: 'Bấm vào nguồn pin để tăng số pin. Quan sát số chỉ ampe kế và độ sáng của đèn. Bấm vào ampe kế để phóng to mặt số.',
      question: 'Đèn càng sáng thì cường độ dòng điện chạy qua đèn càng lớn hay càng nhỏ?',
      doc: ammeterLoop({ display: 'analog' }),
      options: L8({ locked: true }),
    },
    {
      title: 'Mắc ampe kế đúng cách',
      prompt: 'Ampe kế đang mắc ngược cực. Bấm vào ampe kế → "Đảo chiều" để sửa.',
      question: 'Chốt (+) của ampe kế phải nối về phía cực nào của nguồn? Ampe kế mắc nối tiếp hay song song với đèn?',
      doc: ammeterLoop({ display: 'analog', flip: true, cells: 2 }),
      options: L8({ locked: true }),
    },
    {
      title: 'Đo hiệu điện thế',
      prompt: 'Khi K ngắt: vôn kế V1 chỉ hiệu điện thế giữa hai cực nguồn, V2 chỉ 0. Đóng K rồi so sánh.',
      question: 'Vôn kế được mắc như thế nào với dụng cụ cần đo hiệu điện thế?',
      doc: voltLoop(),
      options: L8({ locked: true }),
    },
    {
      title: 'Đọc số chỉ đồng hồ đo',
      prompt: 'Số đo đang ẩn. Bấm vào từng đồng hồ để phóng to, xác định GHĐ, ĐCNN rồi đọc số chỉ. Bấm "Hiện số đo" để kiểm tra.',
      doc: across(ammeterLoop({ display: 'analog', cells: 3, range: 1 }), 'Đ', 0, -3, it('voltmeter', { label: 'V', range: 6, display: 'analog' })),
      options: L8({ locked: true }),
      startHidden: true,
    },
  ],
};

const practiceDoc = across(
  ring(6, 5, 22, 11, {
    bottom: [it('battery', { cells: 1, label: 'Nguồn' })],
    right: [it('switch', { label: 'K', closed: true })],
    top: [it('ammeter', { label: 'A', range: 1 }), it('lamp', { label: 'Đ', ratedV: 6, ratedP: 3 })],
  }),
  'Đ',
  0,
  -3,
  it('voltmeter', { label: 'V', range: 6 }),
);

const l8_25: LessonContent = {
  scenes: [
    {
      title: 'Đo I và U của bóng đèn',
      prompt: 'Mở "Báo cáo" để ghi kết quả. Lần lượt dùng 1, 2, 3, 4 pin; mỗi lần bấm "Ghi số đo".',
      question: 'Khi hiệu điện thế giữa hai đầu đèn tăng thì cường độ dòng điện qua đèn thay đổi thế nào?',
      doc: practiceDoc,
      options: L8({ locked: true }),
      report: {
        title: 'Đo cường độ dòng điện và hiệu điện thế',
        practical: true,
        purpose: 'Đo được cường độ dòng điện chạy qua bóng đèn và hiệu điện thế giữa hai đầu bóng đèn bằng ampe kế và vôn kế.',
        equipment: ['Nguồn điện gồm 1 đến 4 pin 1,5 V', 'Bóng đèn 6 V – 3 W', 'Ampe kế (GHĐ 1 A), vôn kế (GHĐ 6 V)', 'Công tắc, dây nối'],
        steps: [
          'Mắc mạch điện như hình: ampe kế nối tiếp với đèn, vôn kế song song với đèn; chốt (+) của đồng hồ nối về phía cực dương của nguồn.',
          'Đóng công tắc, đọc số chỉ của ampe kế và vôn kế, ghi vào bảng.',
          'Lần lượt thay nguồn 2 pin, 3 pin, 4 pin và lặp lại.',
        ],
        columns: [
          { key: 'E', label: 'Nguồn', unit: 'V', source: 'Nguồn.E', digits: 1 },
          { key: 'I', label: 'I', unit: 'A', source: 'A.I', digits: 2 },
          { key: 'U', label: 'U', unit: 'V', source: 'V.U', digits: 2 },
        ],
        chart: { x: 'U', y: 'I', title: 'Cường độ dòng điện I theo hiệu điện thế U' },
        questions: ['Khi tăng số pin, số chỉ của ampe kế và vôn kế thay đổi như thế nào?', 'Độ sáng của bóng đèn thay đổi như thế nào? Giải thích.'],
      },
    },
    {
      title: 'Dòng điện trước và sau bóng đèn',
      prompt: 'Ampe kế A1 đặt trước bóng đèn, A2 đặt sau bóng đèn. Thay đổi số pin và so sánh số chỉ của hai ampe kế.',
      question: '"Bóng đèn tiêu thụ dòng điện nên dòng điện sau đèn nhỏ hơn" – ý kiến này đúng hay sai?',
      doc: ring(5, 4, 23, 11, {
        bottom: [it('battery', { cells: 2, label: 'Nguồn' })],
        right: [it('switch', { label: 'K', closed: true })],
        top: [it('ammeter', { label: 'A1', range: 1 }), it('lamp', { label: 'Đ', ratedV: 6, ratedP: 3 }), it('ammeter', { label: 'A2', range: 1 })],
      }),
      options: L8({ locked: true }),
      startHidden: true,
    },
    {
      title: 'Tự lắp mạch đo',
      prompt: 'Lắp mạch theo sơ đồ ở góc màn hình. Chú ý mắc đúng cực (+), (−) của ampe kế và vôn kế.',
      doc: EMPTY,
      options: L8({ palette: ['battery', 'switch', 'lamp', 'ammeter', 'voltmeter'], reference: practiceDoc }),
    },
  ],
};

// ============================== KHTN 9 ==============================

const ohmDoc = (load: 'resistor' | 'wireSample') =>
  across(
    ring(5, 5, 22, 11, {
      bottom: [it('supply', { voltage: 3, label: 'Nguồn' })],
      right: [it('switch', { label: 'K', closed: true })],
      top: [it('ammeter', { label: 'A', range: 3 }), load === 'resistor' ? it('resistor', { label: 'R1', R: 10 }) : it('wireSample', { label: 'X' })],
    }),
    load === 'resistor' ? 'R1' : 'X',
    0,
    -3,
    it('voltmeter', { label: 'V', range: 15 }),
  );

const l9_11: LessonContent = {
  scenes: [
    {
      title: 'I phụ thuộc vào U',
      prompt: 'Bấm vào nguồn, thay đổi hiệu điện thế (ví dụ 0, 2, 4, 6, 8 V). Mỗi lần thay đổi, mở "Báo cáo" và bấm "Ghi số đo".',
      question: 'Đồ thị biểu diễn I theo U có dạng gì? Thương số U/I có thay đổi không?',
      doc: ohmDoc('resistor'),
      options: L9({ locked: true }),
      report: {
        title: 'Sự phụ thuộc của I vào U',
        columns: [
          { key: 'U', label: 'U', unit: 'V', source: 'V.U', digits: 2 },
          { key: 'I', label: 'I', unit: 'A', source: 'A.I', digits: 3 },
          { key: 'k', label: 'U / I', unit: 'Ω', formula: (r) => (r.I ? (r.U ?? 0) / r.I : undefined), digits: 1, average: true },
        ],
        chart: { x: 'U', y: 'I', title: 'Đồ thị I – U' },
      },
    },
    {
      title: 'Điện trở – Định luật Ohm',
      prompt: 'Giữ nguyên U, bấm vào điện trở R1 để đổi giá trị. Ghi số đo và so sánh.',
      question: 'Với cùng một hiệu điện thế, điện trở càng lớn thì cường độ dòng điện càng thế nào? Phát biểu định luật Ohm.',
      doc: ohmDoc('resistor'),
      options: L9({ locked: true, table: true }),
      report: {
        title: 'So sánh các điện trở',
        columns: [
          { key: 'R', label: 'R', unit: 'Ω', source: 'R1.R', digits: 0 },
          { key: 'U', label: 'U', unit: 'V', source: 'V.U', digits: 2 },
          { key: 'I', label: 'I', unit: 'A', source: 'A.I', digits: 3 },
          { key: 'UI', label: 'U / I', unit: 'Ω', formula: (r) => (r.I ? (r.U ?? 0) / r.I : undefined), digits: 1 },
        ],
      },
    },
    {
      title: 'Điện trở của dây dẫn',
      prompt: 'Bấm vào dây dẫn khảo sát X: thay đổi chiều dài l, tiết diện S, vật liệu. Ghi số đo để so sánh R.',
      question: 'R phụ thuộc thế nào vào chiều dài, tiết diện và vật liệu làm dây? (R = ρ·l / S)',
      doc: ohmDoc('wireSample'),
      options: L9({ locked: true }),
      report: {
        title: 'Điện trở của dây dẫn',
        columns: [
          { key: 'l', label: 'l', unit: 'm', source: 'X.l', digits: 1 },
          { key: 'S', label: 'S', unit: 'mm²', source: 'X.S', digits: 2 },
          { key: 'U', label: 'U', unit: 'V', source: 'V.U', digits: 2 },
          { key: 'I', label: 'I', unit: 'A', source: 'A.I', digits: 3 },
          { key: 'R', label: 'R = U/I', unit: 'Ω', formula: (r) => (r.I ? (r.U ?? 0) / r.I : undefined), digits: 1 },
        ],
      },
    },
    {
      title: 'Biến trở',
      prompt: 'Bấm vào biến trở và kéo con chạy: điện trở của mạch thay đổi nên cường độ dòng điện và độ sáng đèn thay đổi.',
      question: 'Biến trở được dùng để làm gì? Kể tên ứng dụng.',
      doc: ring(5, 4, 23, 11, {
        bottom: [it('supply', { voltage: 6, label: 'Nguồn' })],
        right: [it('switch', { label: 'K', closed: true })],
        top: [it('ammeter', { label: 'A', range: 1 }), it('lamp', { label: 'Đ', ratedV: 6, ratedP: 3 }), it('rheostat', { label: 'Rb', Rmax: 20, pos: 0.5 })],
      }),
      options: L9({ locked: true, table: true }),
    },
  ],
};

const seriesDoc = across(
  across(
    ring(3, 6, 23, 12, {
      bottom: [it('supply', { voltage: 6, label: 'Nguồn' })],
      right: [it('switch', { label: 'K', closed: true })],
      top: [it('ammeter', { label: 'A', range: 1 }), it('resistor', { label: 'R1', R: 10 }), it('resistor', { label: 'R2', R: 20 })],
    }),
    'R1',
    0,
    -3,
    it('voltmeter', { label: 'V1', range: 15 }),
  ),
  'R2',
  0,
  -3,
  it('voltmeter', { label: 'V2', range: 15 }),
);

const parallelDoc: CircuitDoc = {
  parts: [
    P('supply', 10, 12, 0, { voltage: 6, label: 'Nguồn' }),
    P('ammeter', 6, 12, 0, { label: 'A', range: 3 }),
    P('switch', 22, 12, 3, { label: 'K', closed: true }),
    P('ammeter', 12, 3, 1, { label: 'A1', range: 3 }),
    P('resistor', 12, 6, 1, { label: 'R1', R: 6 }),
    P('ammeter', 18, 3, 1, { label: 'A2', range: 3 }),
    P('resistor', 18, 6, 1, { label: 'R2', R: 12 }),
    P('voltmeter', 3, 5, 1, { label: 'V', range: 15 }),
  ],
  wires: [
    ...path([12, 12], [22, 12]),
    ...path([22, 10], [22, 3], [18, 3], [12, 3], [3, 3], [3, 5]),
    W(12, 5, 12, 6),
    W(18, 5, 18, 6),
    W(12, 8, 12, 9),
    W(18, 8, 18, 9),
    ...path([18, 9], [12, 9], [6, 9], [6, 12]),
    ...path([3, 7], [3, 9], [6, 9]),
    W(8, 12, 10, 12),
  ],
};

const twoLampsDoc: CircuitDoc = merge(
  ring(1, 3, 12, 11, {
    bottom: [it('supply', { voltage: 6, label: 'N1' })],
    right: [it('switch', { label: 'K1', closed: true })],
    top: [it('lamp', { label: 'Đ1', ratedV: 6, ratedP: 3 }), it('lamp', { label: 'Đ2', ratedV: 6, ratedP: 3 })],
  }),
  {
    parts: [
      P('supply', 16, 11, 0, { voltage: 6, label: 'N2' }),
      P('lamp', 19, 5, 1, { label: 'Đ3', ratedV: 6, ratedP: 3 }),
      P('lamp', 24, 5, 1, { label: 'Đ4', ratedV: 6, ratedP: 3 }),
    ],
    wires: [...path([18, 11], [27, 11], [27, 3], [24, 3], [19, 3], [19, 5]), W(24, 3, 24, 5), W(19, 7, 19, 9), W(24, 7, 24, 9), ...path([24, 9], [19, 9], [15, 9], [15, 11], [16, 11])],
  },
);

const l9_12: LessonContent = {
  scenes: [
    {
      title: 'Đoạn mạch nối tiếp',
      prompt: 'Đọc số chỉ A, V1, V2 và bảng giá trị. Thay đổi R1, R2 hoặc U nguồn rồi ghi số đo vào "Báo cáo".',
      question: 'So sánh cường độ dòng điện qua R1, R2. Tìm hệ thức giữa U và U1, U2; giữa Rtđ và R1, R2.',
      doc: seriesDoc,
      options: L9({ locked: true, table: true }),
      report: {
        title: 'Đoạn mạch nối tiếp',
        columns: [
          { key: 'I', label: 'I', unit: 'A', source: 'A.I', digits: 3 },
          { key: 'U1', label: 'U1', unit: 'V', source: 'V1.U', digits: 2 },
          { key: 'U2', label: 'U2', unit: 'V', source: 'V2.U', digits: 2 },
          { key: 'U', label: 'U1 + U2', unit: 'V', formula: (r) => (r.U1 ?? 0) + (r.U2 ?? 0), digits: 2 },
          { key: 'Rtd', label: 'Rtđ = U/I', unit: 'Ω', formula: (r) => (r.I ? ((r.U1 ?? 0) + (r.U2 ?? 0)) / r.I : undefined), digits: 1 },
        ],
      },
    },
    {
      title: 'Đoạn mạch song song',
      prompt: 'Đọc số chỉ của A, A1, A2 và V. Thay đổi R1, R2 rồi ghi số đo vào "Báo cáo".',
      question: 'Tìm hệ thức giữa I và I1, I2. Hiệu điện thế giữa hai đầu mỗi nhánh có bằng nhau không?',
      doc: parallelDoc,
      options: L9({ locked: true, table: true }),
      report: {
        title: 'Đoạn mạch song song',
        columns: [
          { key: 'U', label: 'U', unit: 'V', source: 'V.U', digits: 2 },
          { key: 'I1', label: 'I1', unit: 'A', source: 'A1.I', digits: 3 },
          { key: 'I2', label: 'I2', unit: 'A', source: 'A2.I', digits: 3 },
          { key: 'I', label: 'I', unit: 'A', source: 'A.I', digits: 3 },
          { key: 'sum', label: 'I1 + I2', unit: 'A', formula: (r) => (r.I1 ?? 0) + (r.I2 ?? 0), digits: 3 },
          { key: 'Rtd', label: 'Rtđ = U/I', unit: 'Ω', formula: (r) => (r.I ? (r.U ?? 0) / r.I : undefined), digits: 2 },
        ],
      },
    },
    {
      title: 'Hai đèn: nối tiếp và song song',
      prompt: 'So sánh độ sáng của các đèn. Bấm vào một đèn → "Tháo bóng đèn ra" và quan sát các đèn còn lại.',
      question: 'Vì sao các thiết bị điện trong gia đình được mắc song song?',
      doc: twoLampsDoc,
      options: L9({ locked: true }),
    },
    {
      title: 'Tự lắp mạch',
      prompt: 'Lắp mạch có hai điện trở mắc nối tiếp hoặc song song, dùng ampe kế và vôn kế để kiểm tra các hệ thức.',
      doc: EMPTY,
      options: L9({ table: true }),
    },
  ],
};

const homeDoc: CircuitDoc = (() => {
  const xs = [7, 12, 17, 22];
  const devices = [
    P('lamp', 7, 8, 1, { label: 'Đ1', ratedV: 220, ratedP: 40 }),
    P('lamp', 12, 8, 1, { label: 'Đ2', ratedV: 220, ratedP: 60 }),
    P('lamp', 17, 8, 1, { label: 'Đ3', ratedV: 220, ratedP: 100 }),
    P('heater', 22, 8, 1, { label: 'Ấm điện', R: (220 * 220) / 1000 }),
  ];
  const switches = xs.map((x, i) => P('switch', x, 3, 1, { label: `K${i + 1}`, closed: i === 1 }));
  return {
    parts: [P('supply', 2, 9, 3, { voltage: 220, label: 'Lưới điện' }), ...switches, ...devices],
    wires: [
      ...path([2, 7], [2, 3], [7, 3], [12, 3], [17, 3], [22, 3]),
      ...path([2, 9], [2, 12], [7, 12], [12, 12], [17, 12], [22, 12]),
      ...xs.flatMap((x) => [W(x, 5, x, 8), W(x, 10, x, 12)]),
    ],
  };
})();

const l9_13: LessonContent = {
  scenes: [
    {
      title: 'Công suất điện',
      prompt: 'Thay đổi hiệu điện thế nguồn. So sánh công suất của đèn với công suất định mức 3 W.',
      question: 'Đèn sáng bình thường khi nào? Công thức tính công suất điện P = U·I.',
      doc: across(
        ring(5, 5, 22, 11, {
          bottom: [it('supply', { voltage: 3, label: 'Nguồn' })],
          right: [it('switch', { label: 'K', closed: true })],
          top: [it('ammeter', { label: 'A', range: 1 }), it('lamp', { label: 'Đ', ratedV: 6, ratedP: 3 })],
        }),
        'Đ',
        0,
        -3,
        it('voltmeter', { label: 'V', range: 15 }),
      ),
      options: L9({ locked: true, table: true }),
      report: {
        title: 'Công suất của bóng đèn 6 V – 3 W',
        columns: [
          { key: 'U', label: 'U', unit: 'V', source: 'V.U', digits: 2 },
          { key: 'I', label: 'I', unit: 'A', source: 'A.I', digits: 3 },
          { key: 'P', label: 'P = U·I', unit: 'W', formula: (r) => (r.U ?? 0) * (r.I ?? 0), digits: 2 },
        ],
        chart: { x: 'U', y: 'P', title: 'Công suất P theo hiệu điện thế U' },
      },
    },
    {
      title: 'Điện năng – công tơ điện',
      prompt: 'Bật/tắt từng thiết bị (bấm vào công tắc). Chọn tốc độ thời gian ở "Công tơ điện" và theo dõi số đếm.',
      question: 'Điện năng tiêu thụ W = P·t. Tính tiền điện khi dùng đèn 100 W trong 5 giờ mỗi ngày, trong 30 ngày.',
      doc: homeDoc,
      options: L9({ locked: true, table: true, energyMeter: true, flow: 'none' }),
    },
  ],
};

export const CIRCUIT_LESSONS: Record<string, LessonContent> = {
  'l8-21': l8_21,
  'l8-22': l8_22,
  'l8-23': l8_23,
  'l8-24': l8_24,
  'l8-25': l8_25,
  'l9-11': l9_11,
  'l9-12': l9_12,
  'l9-13': l9_13,
};

// Kiểu cụ thể dùng để kiểm tra khi biên soạn
export const _typecheck: CS[] = Object.values(CIRCUIT_LESSONS).flatMap((l) => l.scenes as CS[]);
