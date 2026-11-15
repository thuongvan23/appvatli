// Nội dung phần Hoá học KHTN 9: Bài 1 (phần hoá học), Bài 18 – Bài 35.
import type { LessonContent, ReportDef } from '../core/types';

const tubes = (shelf: string[], tubes: { init: string[]; label?: string; vessel?: 'tube' | 'dish' | 'beaker'; mystery?: boolean }[]) => ({
  mode: 'tubes',
  shelf,
  tubes: tubes.map((t) => ({ ...t, events: [] })),
});

const h9_1: LessonContent = {
  scenes: [
    { title: 'Dụng cụ thí nghiệm hoá học', prompt: 'Bấm vào từng dụng cụ, hoá chất để xem chức năng và lưu ý.', question: 'Phễu, phễu chiết, bình cầu thường làm bằng vật liệu gì? Khi đun nóng dung dịch trong cốc thuỷ tinh, vì sao cần dùng lưới tản nhiệt?', doc: { mode: 'cards', set: 'tools9', sel: 0 } },
    { title: 'Sử dụng hoá chất an toàn', prompt: 'Đi qua các quy tắc lấy, sử dụng hoá chất.', question: 'Vì sao không được tự ý nghiền, trộn các hoá chất? Cần lưu ý gì khi dùng hoá chất dễ bay hơi, độc hại, nguy hiểm?', doc: { mode: 'steps', set: 'takeChem', step: 0 } },
    { title: 'Kí hiệu cảnh báo', prompt: 'Bấm vào từng kí hiệu để xem ý nghĩa.', question: 'Tại sao cần đọc cẩn thận nhãn hoá chất trước khi sử dụng?', doc: { mode: 'cards', set: 'hazards', sel: 0 } },
    {
      title: 'Thiết kế thí nghiệm về acid, base',
      prompt: 'Tự chọn hoá chất trên giá để chứng minh tính chất hoá học chung của acid hoặc base.',
      question: 'Đề xuất dụng cụ, hoá chất và thực hiện thí nghiệm chứng minh tính chất hoá học chung của acid.',
      doc: { ...tubes(['hcl', 'naoh', 'quy', 'phenol', 'zn', 'cuo', 'caco3', 'cuso4'], [{ init: [] }, { init: [] }, { init: [] }, { init: [] }]), free: true },
    },
  ],
};

const h9_18: LessonContent = {
  scenes: [
    { title: 'Tính chất vật lí và ứng dụng', prompt: 'Bấm vào từng thẻ: ứng dụng của kim loại dựa trên tính chất vật lí nào?', question: 'Vì sao dây dẫn điện thường làm bằng đồng, nhôm mà không làm bằng sắt?', doc: { mode: 'cards', set: 'metalUses', sel: 0 } },
    { title: 'Kim loại tác dụng với phi kim', prompt: 'Đi qua từng thí nghiệm kim loại tác dụng với oxygen, chlorine, lưu huỳnh.', question: 'Viết phương trình hoá học của phản ứng giữa Mg, Zn với lưu huỳnh.', doc: { mode: 'steps', set: 'metalBurn', step: 0 }, startHidden: true },
    {
      title: 'Kim loại tác dụng với nước',
      prompt: 'Cho mẩu natri vào chậu nước có phenolphthalein; cho đinh sắt, dây đồng vào ống nước.',
      question: 'Kim loại nào tác dụng với nước ở điều kiện thường? Sản phẩm là gì?',
      doc: tubes(['na', 'fe', 'cu'], [
        { init: ['h2o', 'phenol'], label: 'nước', vessel: 'beaker' },
        { init: ['h2o'], label: 'nước' },
        { init: ['h2o'], label: 'nước' },
      ]),
      startHidden: true,
    },
    {
      title: 'Kim loại tác dụng với dung dịch HCl',
      prompt: 'Cho dung dịch HCl vào từng ống.',
      question: 'Viết phương trình hoá học. Kim loại nào không tác dụng với dung dịch HCl?',
      doc: tubes(['hcl'], [
        { init: ['fe'], label: 'Fe' },
        { init: ['al'], label: 'Al' },
        { init: ['zn'], label: 'Zn' },
        { init: ['cu'], label: 'Cu' },
      ]),
      startHidden: true,
    },
    {
      title: 'Kim loại tác dụng với dung dịch muối',
      prompt: 'Cho dung dịch CuSO₄ vào ống (1), (2); dung dịch AgNO₃ vào ống (3).',
      question: 'Kim loại nào đẩy được đồng, bạc ra khỏi dung dịch muối?',
      doc: tubes(['cuso4', 'agno3'], [
        { init: ['fe'], label: 'đinh sắt' },
        { init: ['zn'], label: 'kẽm' },
        { init: ['cu'], label: 'dây đồng' },
      ]),
      startHidden: true,
    },
  ],
};

const h9_19: LessonContent = {
  scenes: [
    {
      title: 'Na, Fe, Cu với nước',
      prompt: 'Cho mẩu natri vào chậu nước, đinh sắt vào ống (2), dây đồng vào ống (3).',
      question: 'Dựa vào khả năng phản ứng với nước, chia các kim loại thành mấy nhóm?',
      doc: tubes(['na', 'fe', 'cu'], [
        { init: ['h2o'], label: 'nước', vessel: 'beaker' },
        { init: ['h2o'], label: 'nước' },
        { init: ['h2o'], label: 'nước' },
      ]),
      startHidden: true,
    },
    {
      title: 'Fe, Cu với dung dịch acid',
      prompt: 'Cho đinh sắt, dây đồng vào hai ống chứa dung dịch HCl.',
      question: 'So sánh mức độ hoạt động hoá học của sắt, đồng với hydrogen.',
      doc: tubes(['fe', 'cu'], [
        { init: ['hcl'], label: 'HCl' },
        { init: ['hcl'], label: 'HCl' },
      ]),
      startHidden: true,
    },
    {
      title: 'Cu với dung dịch AgNO₃',
      prompt: 'Đưa dây đồng vào ống chứa dung dịch AgNO₃ 2%.',
      question: 'So sánh mức độ hoạt động hoá học của đồng và bạc. Sắp xếp Na, Fe, Cu, Ag, H theo chiều giảm dần.',
      doc: tubes(['cu'], [{ init: ['agno3'], label: 'AgNO₃' }]),
      startHidden: true,
    },
    { title: 'Dãy hoạt động hoá học', prompt: 'Bấm vào từng kim loại, dự đoán khả năng phản ứng với nước, acid, dung dịch muối.', question: 'Nêu ý nghĩa của dãy hoạt động hoá học.', doc: { mode: 'activity', metal: 'Fe', salt: 'CuSO₄' }, startHidden: true },
    {
      title: 'Vận dụng: dự đoán và kiểm chứng',
      prompt: 'Dự đoán trước, rồi cho H₂SO₄ loãng vào ống (1) – (3); cho AgNO₃ vào ống (4).',
      question: 'Dự đoán hiện tượng, viết phương trình hoá học (nếu có).',
      doc: tubes(['h2so4', 'agno3'], [
        { init: ['mg'], label: 'Mg' },
        { init: ['ag'], label: 'Ag' },
        { init: ['zn'], label: 'Zn' },
        { init: ['zn'], label: 'Zn' },
      ]),
      startHidden: true,
    },
  ],
};

const h9_20: LessonContent = {
  scenes: [
    { title: 'Phương pháp tách kim loại', prompt: 'Đi qua các bước tách kim loại từ quặng và các phương pháp hoá học.', question: 'Phương pháp nào thường dùng để tách kim loại hoạt động mạnh (K, Na, Al)? Hoạt động trung bình (Zn, Fe)?', doc: { mode: 'steps', set: 'extract', step: 0 } },
    { title: 'Sản xuất gang trong lò cao', prompt: 'Bấm các số 1 – 5 để xem từng giai đoạn.', question: 'Mô tả các giai đoạn chính của quá trình sản xuất gang. Viết phương trình hoá học.', doc: { mode: 'furnace', kind: 'blast', sel: 0 }, startHidden: true },
    { title: 'Sản xuất thép', prompt: 'Khí oxygen được thổi vào gang nóng chảy.', question: 'Tại sao khi loại bỏ một phần carbon và tạp chất trong gang lại thu được thép?', doc: { mode: 'furnace', kind: 'converter', sel: 0 } },
    { title: 'Điện phân sản xuất nhôm', prompt: 'Quan sát sự di chuyển của các ion trong bể điện phân.', question: 'Kim loại natri có thể tách bằng phương pháp nhiệt luyện như tách kẽm được không? Vì sao?', doc: { mode: 'furnace', kind: 'electro', sel: 0 }, startHidden: true },
    { title: 'Hợp kim', prompt: 'Bấm vào từng hợp kim để xem thành phần, tính chất, ứng dụng.', question: 'Vì sao trong thực tiễn kim loại thường được sử dụng dưới dạng hợp kim?', doc: { mode: 'cards', set: 'alloys', sel: 0 } },
  ],
};

const h9_21: LessonContent = {
  scenes: [
    { title: 'Ứng dụng của phi kim', prompt: 'Bấm vào từng thẻ: carbon, lưu huỳnh, chlorine.', question: 'Trình bày một số ứng dụng của carbon, lưu huỳnh, chlorine trong cuộc sống.', doc: { mode: 'cards', set: 'nonmetals', sel: 0 } },
    {
      title: 'Tính hấp phụ của than gỗ',
      prompt: 'Cho bột than gỗ vào nước màu, quan sát màu của dung dịch.',
      question: 'Vì sao khẩu trang than hoạt tính, máy lọc nước dùng than hoạt tính?',
      doc: tubes(['than'], [{ init: ['mau'], label: 'nước màu' }]),
    },
    { title: 'Tính dẫn điện', prompt: 'Lần lượt nối các mẫu vật liệu vào mạch, quan sát bóng đèn.', question: 'So sánh khả năng dẫn điện của kim loại và phi kim.', doc: { mode: 'conduct', mat: 'cu' }, startHidden: true },
    { title: 'Nhường – nhận electron', prompt: 'Kéo thanh tiến trình: nguyên tử Na nhường electron cho nguyên tử Cl.', question: 'Giải thích tại sao trong phản ứng giữa kim loại và phi kim, phi kim thường nhận electron.', doc: { mode: 'ionic', p: 0 } },
    { title: 'So sánh kim loại và phi kim', prompt: 'Học sinh trả lời từng ô, bấm để mở đáp án.', question: 'Lấy ví dụ minh hoạ sự khác nhau giữa kim loại và phi kim về tính chất vật lí và hoá học.', doc: { mode: 'table', set: 'metalNonmetal', open: [] }, startHidden: true },
  ],
};

const h9_22: LessonContent = {
  scenes: [
    { title: 'Hữu cơ hay vô cơ?', prompt: 'Bấm vào từng chất để xếp vào nhóm, rồi bấm "Kiểm tra".', question: 'Hợp chất hữu cơ là gì? Nêu đặc điểm chung về thành phần nguyên tố.', doc: { mode: 'classify', set: 'orgInorg', placed: {} } },
    { title: 'Công thức phân tử, công thức cấu tạo', prompt: 'Chọn chất, chuyển giữa công thức đầy đủ và mô hình rỗng.', question: 'Công thức cấu tạo cho biết điều gì mà công thức phân tử không cho biết?', doc: { mode: 'structure', list: ['c2h6', 'c2h4', 'c4h10', 'ic4h10', 'c2h5oh', 'ch3och3'], mol: 'c2h6', view: 'full' }, startHidden: true },
    { title: 'Mạch carbon', prompt: 'So sánh mạch hở không phân nhánh, mạch nhánh, mạch vòng.', question: 'Vì sao nhiều hợp chất hữu cơ khác nhau lại có cùng công thức phân tử?', doc: { mode: 'structure', list: ['c4h10', 'ic4h10', 'cc4h8'], mol: 'c4h10', view: 'model' } },
    { title: 'Ethylic alcohol và dimethyl ether', prompt: 'Cùng công thức phân tử C₂H₆O nhưng khác cấu tạo.', question: 'So sánh tính chất của ethylic alcohol và dimethyl ether.', doc: { mode: 'structure', list: ['c2h5oh', 'ch3och3', 'ch3cl'], mol: 'c2h5oh', view: 'model' } },
    { title: 'Hydrocarbon hay dẫn xuất?', prompt: 'Xếp các chất vào hai nhóm, rồi bấm "Kiểm tra".', question: 'Hydrocarbon và dẫn xuất của hydrocarbon khác nhau thế nào?', doc: { mode: 'classify', set: 'hcDeriv', placed: {} } },
  ],
};

const h9_23: LessonContent = {
  scenes: [
    { title: 'Một số hydrocarbon thông dụng', prompt: 'So sánh methane, propane và ethylene.', question: 'Nhận xét thành phần nguyên tố và loại liên kết trong phân tử ba chất.', doc: { mode: 'structure', list: ['ch4', 'c3h8', 'c2h4'], mol: 'ch4', view: 'model' }, startHidden: true },
    { title: 'Alkane C1 – C4', prompt: 'Xem công thức cấu tạo của methane, ethane, propane, butane.', question: 'Khi tăng thêm một nguyên tử carbon, số nguyên tử hydrogen tăng thêm bao nhiêu? Rút ra công thức chung.', doc: { mode: 'structure', list: ['ch4', 'c2h6', 'c3h8', 'c4h10', 'ic4h10'], mol: 'c3h8', view: 'full' }, startHidden: true },
    { title: 'Chất nào là alkane?', prompt: 'Xếp các chất vào ba nhóm, rồi bấm "Kiểm tra".', question: 'Giải thích vì sao CH₂=CH–CH₃ không phải alkane.', doc: { mode: 'classify', set: 'alkane', placed: {} } },
    { title: 'Phản ứng cháy (mô hình)', prompt: 'Methane cháy: các nguyên tử sắp xếp lại tạo CO₂ và H₂O.', question: 'Viết phương trình hoá học của phản ứng cháy của ethane, butane.', doc: { mode: 'rearrange', rx: 'ch4', p: 0 }, startHidden: true },
    {
      title: 'Sản phẩm cháy của butane',
      prompt: 'Sau khi đốt butane trong bình tam giác (thành bình mờ đi do hơi nước), đổ nước vôi trong vào và lắc. Sục khí CO₂ để mô phỏng.',
      question: 'Quan sát hiện tượng trong bình, dự đoán sản phẩm tạo thành.',
      doc: tubes(['co2'], [{ init: ['caoh2'], label: 'nước vôi trong' }]),
      startHidden: true,
    },
    { title: 'Ứng dụng làm nhiên liệu', prompt: 'So sánh nhiệt lượng toả ra khi đốt 1 mol và 1 gam các alkane.', question: 'Đốt cháy 1 gam alkane nào toả ra nhiều nhiệt lượng nhất?', doc: { mode: 'fuelheat', set: 'alkane', per: 'mol' }, startHidden: true },
  ],
};

const h9_24: LessonContent = {
  scenes: [
    { title: 'Cấu tạo phân tử ethylene', prompt: 'So sánh ethylene, propylene với ethane.', question: 'Alkene là gì? Viết công thức chung của alkene.', doc: { mode: 'structure', list: ['c2h4', 'c3h6', 'c2h6'], mol: 'c2h4', view: 'model' } },
    {
      title: 'Thí nghiệm với nước bromine',
      prompt: 'Dẫn khí ethylene vào ống (1), khí methane vào ống (2) chứa nước bromine.',
      question: 'Quan sát và rút ra nhận xét về tính chất hoá học của ethylene.',
      doc: tubes(['c2h4', 'ch4'], [
        { init: ['br2'], label: 'nước bromine' },
        { init: ['br2'], label: 'nước bromine' },
      ]),
      startHidden: true,
    },
    { title: 'Phản ứng cộng (mô hình)', prompt: 'Kéo thanh tiến trình: liên kết kém bền trong liên kết đôi bị phá vỡ.', question: 'Propylene có tính chất hoá học tương tự ethylene không? Vì sao?', doc: { mode: 'polymer', kind: 'br2', p: 0 }, startHidden: true },
    { title: 'Phản ứng trùng hợp', prompt: 'Kéo thanh tiến trình: các phân tử ethylene nối với nhau thành polyethylene.', question: 'Kể tên các ứng dụng của ethylene.', doc: { mode: 'polymer', kind: 'pe', p: 0 }, startHidden: true },
  ],
};

const h9_25: LessonContent = {
  scenes: [
    { title: 'Mỏ dầu, khai thác dầu mỏ', prompt: 'Đi qua các bước khai thác và chế biến dầu mỏ.', question: 'Trình bày cấu tạo của mỏ dầu.', doc: { mode: 'steps', set: 'oil', step: 0 } },
    { title: 'Chưng cất dầu mỏ', prompt: 'Bấm vào từng phân đoạn để xem ứng dụng.', question: 'Kể tên một số sản phẩm chế biến từ dầu mỏ và ứng dụng của chúng.', doc: { mode: 'distill', sel: 2 } },
    { title: 'Nhiên liệu', prompt: 'Bấm vào từng loại nhiên liệu.', question: 'Bếp nấu ăn, xe máy, ô tô ở Việt Nam đang dùng nhiên liệu gì? Đề xuất biện pháp sử dụng an toàn, hiệu quả.', doc: { mode: 'cards', set: 'fuels', sel: 0 } },
    { title: 'So sánh nhiệt lượng', prompt: 'So sánh năng suất toả nhiệt của các nhiên liệu.', question: 'Đốt cùng khối lượng gỗ, than đá, dầu hoả – nhiên liệu nào toả nhiều nhiệt nhất?', doc: { mode: 'fuelheat', set: 'fuels', per: 'g' }, startHidden: true },
  ],
};

const h9_26: LessonContent = {
  scenes: [
    { title: 'Công thức và đặc điểm cấu tạo', prompt: 'So sánh ethylic alcohol với ethane và dimethyl ether.', question: 'Viết công thức phân tử, công thức cấu tạo thu gọn của ethylic alcohol. Nhóm nguyên tử nào gây nên tính chất đặc trưng?', doc: { mode: 'structure', list: ['c2h5oh', 'c2h6', 'ch3och3'], mol: 'c2h5oh', view: 'model' }, startHidden: true },
    {
      title: 'Phản ứng cháy',
      prompt: 'Dùng que đóm dài châm lửa đốt khoảng 1 mL cồn trong bát sứ.',
      question: 'Nhận xét màu ngọn lửa. Dựa vào dấu hiệu nào để biết phản ứng toả nhiệt?',
      doc: tubes(['@fire'], [{ init: ['c2h5oh'], label: 'cồn 96°', vessel: 'dish' }]),
      startHidden: true,
    },
    {
      title: 'Phản ứng với natri',
      prompt: 'Dùng panh kẹp mẩu natri cho vào ống ethylic alcohol tuyệt đối; so sánh với natri trong nước.',
      question: 'Trong các chất CH₃–CH₃, CH₂=CH₂, CH₃–OH, CH₃–CH₂–OH, chất nào tác dụng được với Na?',
      doc: tubes(['na'], [
        { init: ['c2h5oh'], label: 'C₂H₅OH' },
        { init: ['h2o'], label: 'nước', vessel: 'beaker' },
      ]),
      startHidden: true,
    },
    { title: 'Điều chế ethylic alcohol', prompt: 'Đi qua các phương pháp điều chế.', question: 'Tại sao ủ quả chín chứa glucose một thời gian thì thu được nước quả có mùi rượu?', doc: { mode: 'steps', set: 'ethanolMake', step: 0 } },
    { title: 'Ứng dụng', prompt: 'Bấm vào từng ứng dụng, cho biết dựa vào tính chất nào.', question: 'Học sinh có được sử dụng rượu, bia không? Tại sao?', doc: { mode: 'cards', set: 'ethanolUses', sel: 0 } },
  ],
};

const titrReport: ReportDef = {
  title: 'Phản ứng trung hoà NaOH bằng acetic acid',
  columns: [
    { key: 'd', label: 'Số giọt CH₃COOH', source: 'drops', digits: 0 },
    { key: 'pH', label: 'pH', source: 'pH', digits: 1 },
  ],
  chart: { x: 'd', y: 'pH', title: 'pH theo số giọt acid' },
};

const h9_27: LessonContent = {
  scenes: [
    { title: 'Công thức và đặc điểm cấu tạo', prompt: 'So sánh acetic acid với ethylic alcohol và ethane.', question: 'Nhóm nguyên tử nào gây nên tính chất đặc trưng của acetic acid?', doc: { mode: 'structure', list: ['ch3cooh', 'c2h5oh', 'c2h6'], mol: 'ch3cooh', view: 'model' }, startHidden: true },
    {
      title: 'Tính acid của acetic acid',
      prompt: '(1) nhỏ CH₃COOH lên quỳ; cho CH₃COOH vào (2) Mg, (3) CuO (rồi đun nhẹ), (4) đá vôi.',
      question: 'Nêu tính chất hoá học của acetic acid, viết phương trình hoá học.',
      doc: tubes(['ch3cooh', '@heat'], [
        { init: ['quy'], label: 'quỳ tím' },
        { init: ['mg'], label: 'Mg' },
        { init: ['cuo'], label: 'CuO' },
        { init: ['caco3'], label: 'đá vôi' },
      ]),
      startHidden: true,
    },
    { title: 'Phản ứng với base', prompt: 'Nhỏ từ từ acetic acid vào NaOH có phenolphthalein cho tới khi mất màu.', question: 'So sánh đồ thị pH với khi dùng HCl.', doc: { mode: 'titration', acid: 'ch3cooh', drops: 0 }, report: titrReport },
    {
      title: 'Phản ứng ester hoá',
      prompt: 'Thêm H₂SO₄ đặc vào hỗn hợp ethylic alcohol và acetic acid, rồi đun nóng (ngâm cốc nước nóng 60 – 70 °C).',
      question: 'Dựa vào dấu hiệu nào khẳng định có phản ứng xảy ra?',
      doc: tubes(['h2so4dac', '@heat'], [{ init: ['c2h5oh', 'ch3cooh'], label: 'C₂H₅OH + CH₃COOH' }]),
      startHidden: true,
    },
    { title: 'Điều chế giấm ăn', prompt: 'Đi qua các bước lên men giấm.', question: 'Vì sao rượu vang để tiếp xúc với không khí lâu ngày có vị chua?', doc: { mode: 'steps', set: 'vinegar', step: 0 } },
    { title: 'Ứng dụng', prompt: 'Bấm vào từng ứng dụng của acetic acid.', question: 'Vì sao có thể dùng giấm ăn để loại bỏ lớp cặn trong ấm đun nước?', doc: { mode: 'cards', set: 'aceticUses', sel: 0 } },
  ],
};

const h9_28: LessonContent = {
  scenes: [
    { title: 'Lipid và chất béo', prompt: 'Bấm vào từng thẻ để xem trạng thái tự nhiên và vai trò.', question: 'Đặc trưng tính chất vật lí của lipid là gì? Có những loại lipid điển hình nào?', doc: { mode: 'cards', set: 'lipids', sel: 0 } },
    { title: 'Phản ứng xà phòng hoá', prompt: 'Đi qua các bước làm xà phòng từ chất béo.', question: 'Viết phương trình phản ứng xà phòng hoá. Cách sử dụng chất béo hợp lí để phòng bệnh béo phì?', doc: { mode: 'steps', set: 'soap', step: 0 }, startHidden: true },
  ],
};

const h9_29: LessonContent = {
  scenes: [
    { title: 'Glucose và saccharose', prompt: 'Học sinh so sánh từng đặc điểm; bấm ô để mở đáp án.', question: 'Lấy ví dụ các sản phẩm tự nhiên chứa nhiều glucose, saccharose.', doc: { mode: 'table', set: 'glucoseSaccharose', open: [] }, startHidden: true },
    {
      title: 'Phản ứng tráng bạc',
      prompt: 'Cho dung dịch AgNO₃/NH₃ vào hai ống, rồi đun nóng (ngâm cốc nước nóng).',
      question: 'Quan sát thành ống nghiệm. Ống nào có phản ứng hoá học?',
      doc: tubes(['tollens', '@heat'], [
        { init: ['glucose'], label: 'glucose' },
        { init: ['saccharose'], label: 'saccharose' },
      ]),
      startHidden: true,
    },
    {
      title: 'Thuỷ phân saccharose',
      prompt: 'Thêm HCl vào dung dịch saccharose, đun nóng; sau đó làm phản ứng tráng bạc để kiểm tra glucose.',
      question: 'Vì sao sau khi thuỷ phân, dung dịch có phản ứng tráng bạc?',
      doc: tubes(['hcl', '@heat', 'tollens'], [{ init: ['saccharose'], label: 'saccharose' }]),
      startHidden: true,
    },
    { title: 'Vai trò và ứng dụng', prompt: 'Bấm vào từng thẻ.', question: 'Chỉ ra mối liên hệ giữa ứng dụng và tính chất của glucose, saccharose.', doc: { mode: 'cards', set: 'carbs', sel: 0 } },
  ],
};

const h9_30: LessonContent = {
  scenes: [
    { title: 'Sự tạo thành tinh bột, cellulose', prompt: 'Kéo thanh tiến trình để xem quá trình trong cây xanh.', question: 'Trình bày sự tạo thành tinh bột và cellulose ở thực vật.', doc: { mode: 'photo', p: 0 } },
    {
      title: 'Hồ tinh bột với iodine',
      prompt: 'Nhỏ vài giọt dung dịch iodine vào hồ tinh bột (1) và dung dịch glucose (2).',
      question: 'Hồ tinh bột phản ứng với iodine tạo ra hợp chất có màu gì?',
      doc: tubes(['iot'], [
        { init: ['tinhbot'], label: 'hồ tinh bột' },
        { init: ['glucose'], label: 'glucose' },
      ]),
      startHidden: true,
    },
    {
      title: 'Thuỷ phân tinh bột',
      prompt: 'Đun ống (1) (hồ tinh bột + HCl) và ống (2) (hồ tinh bột) trong nước sôi; để nguội rồi nhỏ iodine.',
      question: 'Ở ống nghiệm nào đã có phản ứng hoá học xảy ra?',
      doc: tubes(['@heat', 'iot'], [
        { init: ['tinhbot', 'hcl'], label: 'tinh bột + HCl' },
        { init: ['tinhbot', 'h2o'], label: 'tinh bột' },
      ]),
      startHidden: true,
    },
    { title: 'So sánh tinh bột và cellulose', prompt: 'Học sinh so sánh; bấm ô để mở đáp án.', question: 'Kể tên một số lương thực, thực phẩm giàu tinh bột và cách sử dụng hợp lí.', doc: { mode: 'table', set: 'starchCellulose', open: [] }, startHidden: true },
    { title: 'Ứng dụng', prompt: 'Bấm vào thẻ tinh bột, cellulose.', doc: { mode: 'cards', set: 'carbs', sel: 2 } },
  ],
};

const h9_31: LessonContent = {
  scenes: [
    {
      title: 'Tính chất của protein',
      prompt: '(1) thêm HCl; (2) đun nóng nhẹ; (3) đun mạnh đến khi có mùi khét.',
      question: 'Quan sát và nhận xét hiện tượng ở ba ống nghiệm.',
      doc: tubes(['hcl', '@heat', '@strong'], [
        { init: ['longtrang'], label: 'lòng trắng trứng' },
        { init: ['longtrang'], label: 'lòng trắng trứng' },
        { init: ['longtrang'], label: 'lòng trắng trứng' },
      ]),
      startHidden: true,
    },
    { title: 'Vai trò và ứng dụng', prompt: 'Bấm vào từng thẻ.', question: 'Nêu cách phân biệt tơ tự nhiên (tơ tằm) với tơ tổng hợp (tơ nylon).', doc: { mode: 'cards', set: 'proteins', sel: 0 } },
  ],
};

const h9_32: LessonContent = {
  scenes: [
    { title: 'Polymer, monomer, mắt xích', prompt: 'Kéo thanh tiến trình: các phân tử ethylene trùng hợp thành PE.', question: 'Polymer là gì? Chỉ ra monomer và mắt xích của PE.', doc: { mode: 'polymer', kind: 'pe', p: 0 }, startHidden: true },
    { title: 'Điều chế PP', prompt: 'Chuyển sang propylene.', question: 'Viết phương trình hoá học tổng hợp PE, PP từ các monomer tương ứng.', doc: { mode: 'polymer', kind: 'pp', p: 0 }, startHidden: true },
    { title: 'Vật liệu polymer', prompt: 'Bấm vào chất dẻo, tơ, cao su, composite.', question: 'Tìm hiểu các vật dụng trong gia đình làm từ cao su, vật liệu composite.', doc: { mode: 'cards', set: 'polymerMat', sel: 0 } },
    { title: 'Kí hiệu trên đồ nhựa', prompt: 'Bấm vào từng kí hiệu.', question: 'Quan sát kí hiệu trên đồ nhựa trong gia đình: chúng làm từ loại nhựa nào, cần lưu ý gì?', doc: { mode: 'cards', set: 'plasticSigns', sel: 0 } },
    { title: 'Nguyên tắc 5R', prompt: 'Bấm vào từng nguyên tắc.', question: 'Trình bày các biện pháp giảm thiểu rác thải nhựa trong gia đình em.', doc: { mode: 'cards', set: 'fiveR', sel: 0 } },
  ],
};

const h9_33: LessonContent = {
  scenes: [
    { title: 'Nguyên tố trong vỏ Trái Đất', prompt: 'Chuyển giữa biểu đồ hình tròn và biểu đồ cột.', question: 'Đọc biểu đồ và nhận xét về hàm lượng các nguyên tố trong vỏ Trái Đất.', doc: { mode: 'crust', chart: 'pie' }, startHidden: true },
    { title: 'Các dạng chất trong vỏ Trái Đất', prompt: 'Bấm vào từng loại đá, khoáng chất.', question: 'Các chất trong thành phần chủ yếu của các loại đá thuộc loại hợp chất nào?', doc: { mode: 'cards', set: 'crust', sel: 0 } },
  ],
};

const h9_34: LessonContent = {
  scenes: [
    { title: 'Khai thác đá vôi', prompt: 'Đi qua các bước khai thác và ứng dụng của đá vôi.', question: 'Viết phương trình nhiệt phân đá vôi và phản ứng vôi sống tác dụng với nước.', doc: { mode: 'steps', set: 'limestone', step: 0 }, startHidden: true },
    { title: 'Silicon và hợp chất', prompt: 'Bấm vào từng ứng dụng.', question: 'Đất sét trắng (cao lanh) có những ứng dụng gì?', doc: { mode: 'cards', set: 'silicon', sel: 0 } },
    { title: 'Sản xuất đồ gốm', prompt: 'Đi qua các công đoạn sản xuất gạch ngói, đồ sứ.', doc: { mode: 'steps', set: 'ceramic', step: 0 } },
    { title: 'Sản xuất thuỷ tinh', prompt: 'Đi qua các công đoạn sản xuất thuỷ tinh.', question: 'Vì sao ở công đoạn ép, thổi thuỷ tinh dẻo phải làm nguội từ từ?', doc: { mode: 'steps', set: 'glass', step: 0 }, startHidden: true },
    { title: 'Sản xuất xi măng', prompt: 'Đi qua các công đoạn sản xuất xi măng.', question: 'Kể tên một số nơi sản xuất xi măng ở Việt Nam.', doc: { mode: 'steps', set: 'cement', step: 0 } },
  ],
};

const h9_35: LessonContent = {
  scenes: [
    { title: 'Nhiên liệu hoá thạch, nguồn methane', prompt: 'Bấm vào từng thẻ.', question: 'Củi gỗ có phải là nhiên liệu hoá thạch không? Vì sao?', doc: { mode: 'cards', set: 'methane', sel: 0 } },
    { title: 'Khai thác dầu thô', prompt: 'Bật "Hiện số đo" để vẽ đồ thị sản lượng khai thác dầu thô.', question: 'Nhận xét tốc độ gia tăng khai thác dầu thô mỗi năm.', doc: { mode: 'carbon', tab: 'oil', sel: 0, burn: 0.5 }, startHidden: true },
    { title: 'Chu trình carbon', prompt: 'Bấm vào từng quá trình trong chu trình carbon.', question: 'Cho biết vai trò của carbon dioxide trong tự nhiên.', doc: { mode: 'carbon', tab: 'cycle', sel: 0, burn: 0.5 } },
    { title: 'Hiệu ứng nhà kính', prompt: 'Tăng mức đốt nhiên liệu hoá thạch, quan sát nồng độ CO₂ và nhiệt độ.', question: 'Vì sao nhiệt độ trung bình toàn cầu tăng dẫn tới nước biển dâng? Hiện tượng này gây tác hại gì?', doc: { mode: 'carbon', tab: 'climate', sel: 0, burn: 0.3 } },
    { title: 'Năng suất toả nhiệt', prompt: 'So sánh nhiệt lượng toả ra khi đốt 1 g các nhiên liệu.', question: 'Đề xuất giải pháp hạn chế sử dụng nhiên liệu hoá thạch.', doc: { mode: 'fuelheat', set: 'fuels', per: 'g' } },
  ],
};

export const CHEM9_LESSONS: Record<string, LessonContent> = {
  'h9-1': h9_1,
  'h9-18': h9_18,
  'h9-19': h9_19,
  'h9-20': h9_20,
  'h9-21': h9_21,
  'h9-22': h9_22,
  'h9-23': h9_23,
  'h9-24': h9_24,
  'h9-25': h9_25,
  'h9-26': h9_26,
  'h9-27': h9_27,
  'h9-28': h9_28,
  'h9-29': h9_29,
  'h9-30': h9_30,
  'h9-31': h9_31,
  'h9-32': h9_32,
  'h9-33': h9_33,
  'h9-34': h9_34,
  'h9-35': h9_35,
};
