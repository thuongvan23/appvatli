// Nội dung phần Hoá học KHTN 8: Bài 1 – Bài 12.
import type { LessonContent, ReportDef } from '../core/types';

const tubes = (shelf: string[], tubes: { init: string[]; label?: string; vessel?: 'tube' | 'dish' | 'beaker'; mystery?: boolean }[]) => ({
  mode: 'tubes',
  shelf,
  tubes: tubes.map((t) => ({ ...t, events: [] })),
});

const h8_1: LessonContent = {
  scenes: [
    { title: 'Dụng cụ thí nghiệm', prompt: 'Bấm vào từng dụng cụ để xem công dụng và cách sử dụng.', question: 'Khi đun nóng hoá chất trong ống nghiệm cần kẹp ống ở vị trí nào? Hướng miệng ống về phía nào?', doc: { mode: 'cards', set: 'tools8', sel: 0 } },
    { title: 'Quy tắc sử dụng hoá chất', prompt: 'Lần lượt đi qua các quy tắc lấy và sử dụng hoá chất an toàn.', question: 'Trình bày cách lấy hoá chất rắn và hoá chất lỏng.', doc: { mode: 'steps', set: 'takeChem', step: 0 } },
    { title: 'Nhãn và kí hiệu cảnh báo', prompt: 'Bấm vào từng kí hiệu cảnh báo, cho biết ý nghĩa và cách phòng tránh.', question: 'Đọc tên, công thức của một số hoá chất trong phòng thí nghiệm và cho biết ý nghĩa các kí hiệu cảnh báo trên nhãn.', doc: { mode: 'cards', set: 'hazards', sel: 0 } },
    { title: 'Thiết bị đo và thiết bị điện', prompt: 'Bấm vào từng thiết bị để xem công dụng và lưu ý khi sử dụng.', question: 'Chỉ ra điểm đặc trưng và sự khác nhau giữa ampe kế và vôn kế.', doc: { mode: 'cards', set: 'devices8', sel: 0 } },
    { title: 'Sử dụng điện an toàn', prompt: 'Đi qua từng bước sử dụng điện an toàn trong phòng thí nghiệm.', question: 'Khi sử dụng biến áp nguồn cần lưu ý điều gì?', doc: { mode: 'steps', set: 'safeElectric', step: 0 } },
    { title: 'Đo pH bằng thiết bị đo pH', prompt: 'Bấm vào từng mẫu để đo pH (có hiển thị máy đo pH).', question: 'Mẫu nào có tính acid, mẫu nào có tính base?', doc: { mode: 'ph', samples: ['nuocmay', 'nuocmua', 'hoao', 'chanh', 'cam', 'voitrong'], tested: [], meter: true }, startHidden: true },
  ],
};

const h8_2: LessonContent = {
  scenes: [
    { title: 'Biến đổi vật lí – hoá học', prompt: 'Học sinh trả lời từng dòng, bấm vào ô để mở đáp án.', question: 'Khi đốt nến, phần nến nào bị biến đổi thành chất mới?', doc: { mode: 'table', set: 'physChem', open: [] }, startHidden: true },
    {
      title: 'Sắt tác dụng với lưu huỳnh',
      prompt: 'Thử nam châm với ống (1). Đun nóng mạnh ống (2), rồi thử nam châm. So sánh hai ống.',
      question: 'Sau khi đun nóng hỗn hợp bột sắt và bột lưu huỳnh, có chất mới được tạo thành không? Giải thích.',
      doc: tubes(['@magnet', '@heat'], [
        { init: ['fesmix'], label: 'không đun' },
        { init: ['fesmix'], label: 'đun nóng' },
      ]),
    },
    { title: 'Diễn biến phản ứng hoá học', prompt: 'Kéo thanh tiến trình: liên kết cũ bị phá vỡ, các nguyên tử sắp xếp lại tạo phân tử mới.', question: 'Trước và sau phản ứng, những nguyên tử nào liên kết với nhau? Số nguyên tử H và O có thay đổi không?', doc: { mode: 'rearrange', rx: 'h2o', p: 0 } },
    {
      title: 'Dấu hiệu có chất mới tạo thành',
      prompt: 'Cho HCl vào ống (1), (2); cho NaOH vào ống (3). Quan sát.',
      question: 'Ống nghiệm nào xảy ra phản ứng hoá học? Dấu hiệu nào cho biết?',
      doc: tubes(['hcl', 'naoh'], [
        { init: ['zn'], label: 'kẽm viên' },
        { init: ['bacl2'], label: 'BaCl₂' },
        { init: ['cuso4'], label: 'CuSO₄' },
      ]),
      startHidden: true,
    },
    {
      title: 'Phản ứng toả nhiệt, thu nhiệt',
      prompt: 'Châm lửa đốt cồn trong bát sứ (1). Đun nóng ống (2) chứa kết tủa Cu(OH)₂. Nhỏ giấm vào đá vôi ở ống (3).',
      question: 'Phản ứng nào toả nhiệt, phản ứng nào thu nhiệt? Khi ngừng đun, phản ứng ở ống (2) có tiếp tục không?',
      doc: tubes(['@fire', '@heat', 'ch3cooh'], [
        { init: ['c2h5oh'], label: 'cồn', vessel: 'dish' },
        { init: ['cuso4', 'naoh'], label: 'Cu(OH)₂' },
        { init: ['caco3'], label: 'đá vôi' },
      ]),
    },
    { title: 'Toả nhiệt hay thu nhiệt?', prompt: 'Học sinh phân loại từng quá trình, bấm vào ô để mở đáp án.', question: 'Kể tên ứng dụng của các phản ứng toả nhiệt trong đời sống.', doc: { mode: 'table', set: 'exoEndo', open: [] }, startHidden: true },
  ],
};

const h8_3: LessonContent = {
  scenes: [
    { title: '1 mol chất', prompt: 'So sánh khối lượng của 1 mol carbon, 1 mol iodine và 1 mol nước. Thay đổi số mol để xem số hạt.', question: 'Tính số nguyên tử, phân tử có trong 0,25 mol C; 0,002 mol I₂; 2 mol H₂O.', doc: { mode: 'mole', subs: ['C', 'I2', 'H2O'], n: 1 } },
    { title: 'Khối lượng mol', prompt: 'Chọn chất và số mol, đọc khối lượng trên cân.', question: 'Tính khối lượng của 0,2 mol calcium carbonate CaCO₃.', doc: { mode: 'mole', subs: ['Fe', 'NaCl', 'CaCO3'], n: 0.5 }, startHidden: true },
    { title: 'Thể tích mol chất khí', prompt: 'Ở 25 °C, 1 bar: cùng số mol thì các khí chiếm cùng thể tích.', question: 'Ở 25 °C và 1 bar, 1,5 mol khí chiếm thể tích bao nhiêu?', doc: { mode: 'mole', subs: ['H2', 'O2', 'CO2'], n: 1 }, startHidden: true },
    { title: 'Tỉ khối – thả bóng bay', prompt: 'Bấm "Thả bóng": bóng chứa khí nhẹ hơn không khí bay lên, khí nặng hơn thì chìm xuống.', question: 'Khí carbon dioxide nặng hơn hay nhẹ hơn không khí bao nhiêu lần?', doc: { mode: 'gasdens', gases: ['H2', 'He', 'CH4', 'N2', 'O2', 'CO2', 'Cl2'], scene: 'balloon' }, startHidden: true },
    { title: 'Khí CO₂ trong hang sâu', prompt: 'Bấm "Theo dõi khí" để xem khí CO₂ di chuyển trong hang.', question: 'Vì sao thám hiểm hang sâu, nạo vét giếng cần cẩn thận?', doc: { mode: 'gasdens', gases: ['CO2'], scene: 'cave' } },
    { title: 'Khí CH₄ dưới đáy giếng', prompt: 'Bấm "Theo dõi khí": khí methane sinh ra dưới đáy giếng đi đâu?', doc: { mode: 'gasdens', gases: ['CH4'], scene: 'well' } },
  ],
};

const prepReport: ReportDef = {
  title: 'Pha 100 gam dung dịch muối ăn nồng độ 0,9%',
  practical: true,
  purpose: 'Pha chế được một dung dịch có nồng độ phần trăm cho trước.',
  equipment: ['Muối ăn khan, nước cất', 'Cốc thuỷ tinh, cân, ống đong, đũa khuấy'],
  steps: ['Tính khối lượng muối (m₁) và nước (m₂) cần dùng theo C% = mct/mdd × 100%.', 'Cân m₁ gam muối ăn cho vào cốc.', 'Đong m₂ mL nước cất, rót vào cốc, khuấy đến khi muối tan hết.', 'Ghi số đo và tính lại nồng độ thu được.'],
  columns: [
    { key: 'm1', label: 'Khối lượng muối', unit: 'g', source: 'm1', digits: 2 },
    { key: 'm2', label: 'Khối lượng nước', unit: 'g', source: 'm2', digits: 1 },
    { key: 'C', label: 'Nồng độ thu được', unit: '%', source: 'C', digits: 2 },
  ],
  questions: ['Tại sao phải dùng muối ăn khan để pha dung dịch?', 'Dung dịch muối ăn 0,9% có thể được dùng để làm gì?'],
};

const solReport: ReportDef = {
  title: 'Độ tan và nồng độ phần trăm',
  columns: [
    { key: 'mct', label: 'Chất tan đã tan', unit: 'g', source: 'mct', digits: 1 },
    { key: 'mdd', label: 'Dung dịch', unit: 'g', source: 'mdd', digits: 1 },
    { key: 'S', label: 'Độ tan', unit: 'g/100 g nước', source: 'S', digits: 1 },
    { key: 'C', label: 'C%', unit: '%', source: 'C', digits: 1 },
  ],
};

const h8_4: LessonContent = {
  scenes: [
    { title: 'Dung dịch – chất tan – dung môi', prompt: 'Đổi chất cho vào nước: muối ăn, CuSO₄, đường, bột gạo. Hỗn hợp nào là dung dịch?', question: 'Chỉ ra chất tan, dung môi trong dung dịch thu được. Dựa vào dấu hiệu nào để nhận biết dung dịch?', doc: { mode: 'solution', solute: 'nacl', m: 3, water: 20, T: 25 } },
    { title: 'Dung dịch bão hoà', prompt: 'Tăng dần lượng muối cho vào 20 g nước. Khi nào muối không tan thêm được nữa?', question: 'Dung dịch ở cốc có 4 thìa muối (khoảng 12 g) trong 20 g nước có phải là dung dịch bão hoà không?', doc: { mode: 'solution', solute: 'nacl', m: 12, water: 20, T: 25 }, startHidden: true, report: solReport },
    { title: 'Độ tan phụ thuộc nhiệt độ', prompt: 'Giữ nguyên lượng CuSO₄, tăng nhiệt độ. Quan sát phần chất rắn không tan.', question: 'Ở 18 °C, hoà tan hết 53 g Na₂CO₃ trong 250 g nước thì được dung dịch bão hoà. Tính độ tan của Na₂CO₃.', doc: { mode: 'solution', solute: 'cuso4', m: 30, water: 100, T: 20 }, report: solReport },
    { title: 'Nồng độ mol – trộn dung dịch', prompt: 'Thay đổi thể tích, nồng độ hai dung dịch urea rồi trộn lại.', question: 'Trộn 2 L dung dịch urea 0,02 M với 3 L dung dịch urea 0,1 M. Tính nồng độ mol dung dịch thu được.', doc: { mode: 'mix', V1: 2, C1: 0.02, V2: 3, C2: 0.1, mixed: false }, startHidden: true },
    { title: 'Thực hành: pha dung dịch NaCl 0,9%', prompt: 'Tính toán – cân muối, đong nước – pha. Bấm "Báo cáo" để ghi số liệu.', question: 'Dung dịch muối ăn 0,9% có thể được dùng để làm gì?', doc: { mode: 'prepare', target: 0.9, total: 100, salt: 0, water: 0, mixed: false }, report: prepReport },
  ],
};

const h8_5: LessonContent = {
  scenes: [
    { title: 'Bảo toàn khối lượng', prompt: 'Đặt hai cốc BaCl₂ và Na₂SO₄ trên cân, đổ cốc (1) vào cốc (2). So sánh số chỉ của cân.', question: 'So sánh tổng khối lượng các chất trước và sau phản ứng.', doc: { mode: 'mass', reaction: 'baso4', closed: false, p: 0 }, startHidden: true },
    { title: 'Phản ứng có chất khí', prompt: 'Cho đá vôi phản ứng với HCl khi để cốc hở và khi bịt kín. Số chỉ của cân thay đổi thế nào?', question: 'Sau khi đốt cháy than tổ ong thu được xỉ than. Xỉ than nặng hơn hay nhẹ hơn than tổ ong? Giải thích.', doc: { mode: 'mass', reaction: 'caco3', closed: false, p: 0 }, startHidden: true },
    { title: 'Giải thích bằng mô hình', prompt: 'Kéo thanh tiến trình: số nguyên tử mỗi nguyên tố không thay đổi.', question: 'Giải thích tại sao khối lượng carbon dioxide bằng tổng khối lượng carbon và oxygen.', doc: { mode: 'rearrange', rx: 'co2', p: 0 } },
    { title: 'Lập phương trình hoá học', prompt: 'Bấm + / − để đặt hệ số cho đến khi số nguyên tử mỗi nguyên tố ở hai vế bằng nhau.', question: 'Phương trình hoá học khác sơ đồ phản ứng ở điểm nào?', doc: { mode: 'balance', idx: 1, coefs: [] } },
    { title: 'Luyện tập lập phương trình', prompt: 'Cân bằng lần lượt các phương trình; bấm "Phương trình khác" để chuyển bài.', question: 'Lập phương trình hoá học và xác định tỉ lệ số phân tử: Na₂CO₃ + Ba(OH)₂ → BaCO₃ + NaOH.', doc: { mode: 'balance', idx: 2, coefs: [] }, startHidden: true },
  ],
};

const h8_6: LessonContent = {
  scenes: [
    { title: 'Tính lượng chất sản phẩm', prompt: 'Hoà tan 0,65 g Zn trong dung dịch HCl. Thay đổi khối lượng kẽm và xem lượng sản phẩm.', question: 'Tính khối lượng ZnCl₂ và thể tích khí H₂ (25 °C, 1 bar) thu được.', doc: { mode: 'stoich', rx: 'zn', m: 0.65, H: 100 }, startHidden: true },
    { title: 'Tính thể tích chất khí', prompt: 'Mg tác dụng với H₂SO₄ loãng.', question: 'Sau phản ứng thu được 0,02 mol MgSO₄. Tính thể tích H₂ (25 °C, 1 bar).', doc: { mode: 'stoich', rx: 'mg', m: 0.48, H: 100 }, startHidden: true },
    { title: 'Hiệu suất phản ứng', prompt: 'Cho 8 g Fe₂O₃ tác dụng với H₂ dư, thực tế thu được 4,2 g Fe. Điều chỉnh hiệu suất cho phù hợp.', question: 'Tính hiệu suất phản ứng.', doc: { mode: 'stoich', rx: 'fe2o3', m: 8, H: 75 }, startHidden: true },
    { title: 'Nung đá vôi', prompt: 'Nung 10 g CaCO₃ với hiệu suất 80%.', question: 'Xác định khối lượng vôi sống thu được.', doc: { mode: 'stoich', rx: 'caco3', m: 10, H: 80 }, startHidden: true },
    { title: 'Nhiệt phân KClO₃', prompt: 'Hiệu suất nhỏ hơn 100%: lượng sản phẩm thực tế nhỏ hơn lí thuyết.', question: 'Nhiệt phân 1 mol KClO₃ thu được số mol O₂ lớn hơn, nhỏ hơn hay bằng 1,5 mol?', doc: { mode: 'stoich', rx: 'kclo3', m: 12.25, H: 90 } },
  ],
};

const h8_7: LessonContent = {
  scenes: [
    { title: 'Ảnh hưởng của nồng độ', prompt: 'Bấm "Bắt đầu": thả đinh sắt vào HCl 0,1 M và HCl 1 M. So sánh lượng khí thu được.', question: 'Phản ứng ở ống nghiệm nào xảy ra nhanh hơn? Nồng độ ảnh hưởng đến tốc độ phản ứng như thế nào?', doc: { mode: 'rate', factor: 'conc' }, startHidden: true },
    { title: 'Ảnh hưởng của nhiệt độ', prompt: 'Thả viên C sủi vào cốc nước lạnh và cốc nước nóng.', question: 'Vì sao bảo quản thực phẩm trong tủ lạnh giúp giữ thực phẩm tươi lâu hơn?', doc: { mode: 'rate', factor: 'temp' }, startHidden: true },
    { title: 'Ảnh hưởng của diện tích bề mặt', prompt: 'Cho cùng lượng HCl vào đá vôi dạng viên và dạng bột.', question: 'Vì sao khi nung vôi người ta đập nhỏ đá vôi?', doc: { mode: 'rate', factor: 'area' }, startHidden: true },
    { title: 'Ảnh hưởng của chất xúc tác', prompt: 'So sánh H₂O₂ khi có và không có MnO₂.', question: 'Chất xúc tác là gì? Sau phản ứng, khối lượng chất xúc tác có thay đổi không?', doc: { mode: 'rate', factor: 'cat' }, startHidden: true },
    {
      title: 'Thí nghiệm với MnO₂',
      prompt: 'Cho một ít bột MnO₂ vào ống (2), so sánh với ống (1).',
      question: 'Phản ứng ở ống nghiệm nào xảy ra nhanh hơn?',
      doc: tubes(['mno2'], [
        { init: ['h2o2'], label: 'H₂O₂ 3%' },
        { init: ['h2o2'], label: 'H₂O₂ 3%' },
      ]),
    },
  ],
};

const h8_8: LessonContent = {
  scenes: [
    { title: 'Khái niệm acid', prompt: 'Quan sát công thức và dạng tồn tại của các acid trong dung dịch.', question: 'Công thức hoá học của các acid có điểm gì giống nhau? Đề xuất khái niệm acid.', doc: { mode: 'table', set: 'acidIons', open: [] }, startHidden: true },
    {
      title: 'Tính chất của dung dịch HCl',
      prompt: 'Nhỏ HCl vào giấy quỳ ở ống (1). Cho HCl vào các ống chứa sắt, kẽm, magnesium.',
      question: 'Mô tả hiện tượng và viết phương trình hoá học.',
      doc: tubes(['hcl', 'quy'], [
        { init: ['quy'], label: 'quỳ tím' },
        { init: ['fe'], label: 'Fe' },
        { init: ['zn'], label: 'Zn' },
        { init: ['mg'], label: 'Mg' },
      ]),
      startHidden: true,
    },
    {
      title: 'Kim loại với sulfuric acid loãng',
      prompt: 'Cho H₂SO₄ loãng vào từng ống. Kim loại nào phản ứng?',
      question: 'Viết phương trình hoá học của phản ứng giữa Mg và H₂SO₄ loãng.',
      doc: tubes(['h2so4'], [
        { init: ['mg'], label: 'Mg' },
        { init: ['zn'], label: 'Zn' },
        { init: ['fe'], label: 'Fe' },
        { init: ['cu'], label: 'Cu' },
      ]),
      startHidden: true,
    },
    { title: 'Ứng dụng của acid', prompt: 'Bấm vào từng acid để xem ứng dụng.', question: 'Việc sử dụng acid không đúng cách gây ô nhiễm môi trường như thế nào?', doc: { mode: 'cards', set: 'acidUses', sel: 0 } },
  ],
};

const titrReport: ReportDef = {
  title: 'Phản ứng trung hoà NaOH bằng HCl',
  columns: [
    { key: 'd', label: 'Số giọt HCl', source: 'drops', digits: 0 },
    { key: 'pH', label: 'pH', source: 'pH', digits: 1 },
  ],
  chart: { x: 'd', y: 'pH', title: 'pH theo số giọt acid' },
};

const h8_9: LessonContent = {
  scenes: [
    { title: 'Khái niệm base', prompt: 'Quan sát công thức, dạng tồn tại trong dung dịch và tính tan của các base.', question: 'Base nào là base kiềm, base nào không tan? Đọc tên base Ca(OH)₂.', doc: { mode: 'table', set: 'bases', open: [] }, startHidden: true },
    {
      title: 'Base đổi màu chất chỉ thị',
      prompt: 'Nhỏ giấy quỳ, phenolphthalein vào dung dịch NaOH; so sánh với nước cất.',
      question: 'Dung dịch kiềm làm đổi màu giấy quỳ tím, dung dịch phenolphthalein như thế nào?',
      doc: tubes(['quy', 'phenol'], [
        { init: ['naoh'], label: 'NaOH' },
        { init: ['naoh'], label: 'NaOH' },
        { init: ['h2o'], label: 'nước cất' },
      ]),
      startHidden: true,
    },
    { title: 'Phản ứng trung hoà', prompt: 'Nhỏ từng giọt HCl vào dung dịch NaOH có phenolphthalein. Khi nào màu hồng biến mất?', question: 'Nêu hiện tượng và rút ra nhận xét về phản ứng giữa acid và base.', doc: { mode: 'titration', acid: 'hcl', drops: 0 }, report: titrReport },
    {
      title: 'Nhận biết NaOH và HCl',
      prompt: 'Hai lọ mất nhãn A và B. Dùng giấy quỳ hoặc phenolphthalein để nhận biết.',
      question: 'Nêu cách nhận biết hai dung dịch NaOH và HCl.',
      doc: tubes(['quy', 'phenol'], [
        { init: ['naoh'], label: 'Lọ A', mystery: true },
        { init: ['hcl'], label: 'Lọ B', mystery: true },
      ]),
      startHidden: true,
    },
    { title: 'Thang pH – đo bằng giấy pH', prompt: 'Bấm vào từng cốc để nhúng giấy pH, so màu với thang màu.', question: 'Dung dịch nào có tính acid, dung dịch nào có tính base?', doc: { mode: 'ph', samples: ['nuocloc', 'chanh', 'soda', 'ruabat', 'giam', 'bakingsoda'], tested: [] }, startHidden: true },
    { title: 'pH trong đời sống', prompt: 'Đo pH của máu, dịch vị dạ dày, nước mưa, đất chua và các dung dịch cùng nồng độ.', question: 'Vì sao HCl 0,1 M có pH nhỏ hơn CH₃COOH 0,1 M? Nêu cách kiểm tra đất trồng có bị chua không.', doc: { mode: 'ph', samples: ['mau', 'dichvi', 'nuocmua', 'datchua', 'hcl01', 'ch3cooh01', 'naoh01'], tested: [], meter: true }, startHidden: true },
    { title: 'Ứng dụng của NaOH', prompt: 'Bấm vào từng ứng dụng của sodium hydroxide.', doc: { mode: 'cards', set: 'naohUses', sel: 0 } },
  ],
};

const h8_10: LessonContent = {
  scenes: [
    { title: 'Phân loại oxide', prompt: 'Học sinh nêu ví dụ, tính chất của từng loại oxide; bấm vào ô để mở đáp án.', question: 'Oxide là gì? Cho các oxide CaO, Fe₂O₃, SO₃, CO₂, CO – oxide nào tác dụng với HCl, với NaOH?', doc: { mode: 'table', set: 'oxideTypes', open: [] }, startHidden: true },
    { title: 'Kim loại, phi kim + oxygen', prompt: 'Lập phương trình tạo oxide; bấm "Phương trình khác" để luyện thêm (P + O₂, Fe + O₂…).', question: 'Hoàn thành: … + O₂ → Al₂O₃; P + … → P₂O₅; S + … → SO₂; Mg + O₂ → …', doc: { mode: 'balance', idx: 1, coefs: [] } },
    {
      title: 'Oxide acid + dung dịch base',
      prompt: 'Sục khí CO₂ vào nước vôi trong. Bấm thêm vài lần để sục tiếp khí.',
      question: 'Nêu hiện tượng khi mới dẫn khí CO₂ vào nước vôi trong và khi dẫn khí CO₂ trong một thời gian.',
      doc: tubes(['co2'], [{ init: ['caoh2'], label: 'nước vôi trong' }]),
      startHidden: true,
    },
    {
      title: 'Oxide base + dung dịch acid',
      prompt: 'Cho dung dịch H₂SO₄ vào ống (1) và HCl vào ống (2) chứa bột CuO.',
      question: 'Nêu hiện tượng và giải thích.',
      doc: tubes(['h2so4', 'hcl'], [
        { init: ['cuo'], label: 'CuO' },
        { init: ['cuo'], label: 'CuO' },
      ]),
      startHidden: true,
    },
  ],
};

const h8_11: LessonContent = {
  scenes: [
    {
      title: 'Tính chất hoá học của muối',
      prompt: '(1) đinh sắt + CuSO₄; (2) BaCl₂ + H₂SO₄; (3) BaCl₂ + Na₂SO₄; (4) CuSO₄ + NaOH.',
      question: 'Viết phương trình hoá học, giải thích hiện tượng. Rút ra kết luận về tính chất hoá học của muối.',
      doc: tubes(['cuso4', 'h2so4', 'na2so4', 'naoh'], [
        { init: ['fe'], label: 'đinh sắt' },
        { init: ['bacl2'], label: 'BaCl₂' },
        { init: ['bacl2'], label: 'BaCl₂' },
        { init: ['cuso4'], label: 'CuSO₄' },
      ]),
      startHidden: true,
    },
    {
      title: 'Cặp chất nào phản ứng?',
      prompt: 'Lần lượt cho Ca(NO₃)₂, BaCl₂, HNO₃ vào các dung dịch. Dùng "Làm lại ống này" giữa các lần thử.',
      question: 'Trong dung dịch, những cặp chất nào xảy ra phản ứng? Điều kiện để phản ứng trao đổi xảy ra là gì?',
      doc: tubes(['cano32', 'bacl2', 'hno3'], [
        { init: ['na2co3'], label: 'Na₂CO₃' },
        { init: ['kcl'], label: 'KCl' },
        { init: ['na2so4'], label: 'Na₂SO₄' },
        { init: ['nano3'], label: 'NaNO₃' },
      ]),
      startHidden: true,
    },
    { title: 'Bảng tính tan', prompt: 'Bấm vào ô để xem công thức, tên gọi và tính tan của muối.', question: 'Gọi tên các muối: AlCl₃, KCl, Al₂(SO₄)₃, MgSO₄, NH₄NO₃, NaHCO₃.', doc: { mode: 'soltable', revealed: [] }, startHidden: true },
    { title: 'Mối quan hệ giữa các hợp chất vô cơ', prompt: 'Bấm vào từng mũi tên để xem phương trình minh hoạ.', question: 'Dựa vào sơ đồ, cho biết tính chất của oxide, acid, base. Viết phương trình minh hoạ.', doc: { mode: 'relations', sel: 0 } },
  ],
};

const h8_12: LessonContent = {
  scenes: [
    { title: 'Vai trò của N, P, K', prompt: 'Điều chỉnh lượng phân đạm, lân, kali; quan sát sự phát triển của cây và môi trường.', question: 'Tại sao cần bổ sung các nguyên tố đa lượng N, P, K dưới dạng phân bón? Bón quá nhiều phân gây hậu quả gì?', doc: { mode: 'fert', N: 0.15, P: 0.15, K: 0.15 }, startHidden: true },
    { title: 'Một số loại phân bón', prompt: 'Bấm vào từng loại phân bón để xem thành phần và tác dụng.', question: 'Tại sao với từng loại đất cần lựa chọn phân lân thích hợp?', doc: { mode: 'cards', set: 'fertilizers', sel: 0 } },
    { title: 'Làm phân bón hữu cơ', prompt: 'Đi qua các bước làm phân bón hữu cơ từ rác thải.', question: 'Lợi ích của việc sử dụng phân hữu cơ so với phân vô cơ?', doc: { mode: 'steps', set: 'organicFert', step: 0 } },
  ],
};

export const CHEM8_LESSONS: Record<string, LessonContent> = {
  'h8-1': h8_1,
  'h8-2': h8_2,
  'h8-3': h8_3,
  'h8-4': h8_4,
  'h8-5': h8_5,
  'h8-6': h8_6,
  'h8-7': h8_7,
  'h8-8': h8_8,
  'h8-9': h8_9,
  'h8-10': h8_10,
  'h8-11': h8_11,
  'h8-12': h8_12,
};
