// Nội dung phần Hoá học KHTN 7: Bài 2 – Bài 7.
import type { LessonContent } from '../core/types';

const h7_2: LessonContent = {
  scenes: [
    { title: 'Mô hình nguyên tử', prompt: 'Chọn các nguyên tử H, C, O, Na. Quan sát hạt nhân và các lớp electron.', question: 'Nguyên tử được cấu tạo từ những loại hạt nào? Hạt nào mang điện dương, hạt nào mang điện âm?', doc: { mode: 'atom', Z: 8, list: [1, 2, 6, 7, 8, 11, 13, 17] } },
    { title: 'Các hạt trong nguyên tử', prompt: 'Học sinh trả lời từng ô, bấm vào ô để mở đáp án.', question: 'Vì sao khối lượng nguyên tử được coi bằng khối lượng hạt nhân?', doc: { mode: 'table', set: 'atomParticles', open: [] }, startHidden: true },
    { title: 'Lắp ráp nguyên tử', prompt: 'Thêm, bớt proton, neutron, electron. Lắp nguyên tử carbon có 6 p, 6 n, 6 e.', question: 'Vì sao nguyên tử trung hoà về điện? Tính khối lượng nguyên tử carbon (amu).', doc: { mode: 'atom', Z: 6, build: true, p: 3, n: 4, e: 3 } },
    { title: 'Sự phân bố electron', prompt: 'Chọn lần lượt các nguyên tử có 1 đến 20 electron; quan sát số lớp và số electron mỗi lớp.', question: 'Nguyên tử Na có 11 electron. Vẽ sơ đồ và cho biết số electron lớp ngoài cùng.', doc: { mode: 'atom', Z: 11, list: Array.from({ length: 20 }, (_, i) => i + 1) }, startHidden: true },
    { title: 'Luyện tập: thành phần nguyên tử', prompt: 'Học sinh tính số hạt, khối lượng và số electron lớp ngoài cùng; bấm vào ô để mở đáp án.', question: 'Nguyên tử aluminium có 13 proton, 14 neutron. Tính số electron và khối lượng nguyên tử.', doc: { mode: 'table', set: 'atomsExamples', open: [] }, startHidden: true },
    { title: 'Đố vui: lắp nguyên tử theo yêu cầu', prompt: 'Lắp nguyên tử có 3 lớp electron và 2 electron ở lớp ngoài cùng. Đó là nguyên tử gì?', question: 'Nguyên tử X có tổng số hạt là 34, số hạt mang điện gấp khoảng 1,83 lần số hạt không mang điện. X là nguyên tử nào? (Gợi ý: p = e = 11)', doc: { mode: 'atom', Z: 12, build: true, p: 1, n: 0, e: 1 } },
  ],
};

const h7_3: LessonContent = {
  scenes: [
    { title: 'Cùng số proton, cùng nguyên tố', prompt: 'Giữ nguyên 6 proton, thay đổi số neutron. Sau đó thay đổi số proton.', question: 'Các nguyên tử có cùng số proton nhưng khác số neutron có thuộc cùng một nguyên tố không? Nguyên tố hoá học là gì?', doc: { mode: 'atom', Z: 6, build: true, p: 6, n: 6, e: 6 } },
    { title: 'Kí hiệu hoá học', prompt: 'Học sinh viết kí hiệu, bấm vào từng ô để kiểm tra.', question: 'Nêu quy tắc viết kí hiệu hoá học. Kí hiệu "CO" và "Co" khác nhau thế nào?', doc: { mode: 'symbols', ask: 'symbol', open: [], list: ['H', 'He', 'C', 'N', 'O', 'F', 'Ne', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'Ca', 'Zn'] }, startHidden: true },
    { title: 'Kí hiệu có nguồn gốc Latin', prompt: 'Học sinh gọi tên nguyên tố, bấm vào ô để kiểm tra.', question: 'Vì sao kí hiệu của sodium là Na, của iron là Fe?', doc: { mode: 'symbols', ask: 'name', open: [], list: ['Na', 'K', 'Fe', 'Cu', 'Ag', 'Au', 'Hg', 'Pb', 'Sn', 'I', 'Ba', 'Mn'] }, startHidden: true },
    { title: 'Nguyên tố trong đời sống', prompt: 'Học sinh nêu hiểu biết, bấm vào ô để mở đáp án.', question: 'Kể tên các nguyên tố có nhiều trong cơ thể người.', doc: { mode: 'table', set: 'elementsLife', open: [] }, startHidden: true },
    { title: 'Ba loại nguyên tử hydrogen', prompt: 'Giữ 1 proton, 1 electron; lần lượt cho 0, 1, 2 neutron. Quan sát tên nguyên tố và khối lượng nguyên tử.', question: 'Ba nguyên tử trên có thuộc cùng một nguyên tố không? Vì sao?', doc: { mode: 'atom', Z: 1, build: true, p: 1, n: 0, e: 1 } },
    { title: 'Nguyên tố phổ biến', prompt: 'Học sinh dự đoán nguyên tố nhiều nhất trong vỏ Trái Đất và trong cơ thể người, bấm vào ô để mở đáp án.', question: 'Nguyên tố nào chiếm nhiều nhất cả trong vỏ Trái Đất lẫn trong cơ thể người?', doc: { mode: 'table', set: 'abundance7', open: [] }, startHidden: true },
    { title: 'Kí hiệu 20 nguyên tố đầu', prompt: 'Học sinh đọc tên các nguyên tố theo kí hiệu, bấm vào ô để kiểm tra.', question: 'Đọc tên các nguyên tố: Li, Be, B, Ne, K, Ca.', doc: { mode: 'symbols', ask: 'name', open: [], list: ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'] }, startHidden: true },
  ],
};

const h7_4: LessonContent = {
  scenes: [
    { title: 'Ô nguyên tố', prompt: 'Bấm vào từng ô trong bảng: ô nguyên tố cho biết số hiệu nguyên tử, kí hiệu, tên, khối lượng nguyên tử.', question: 'Ô số 12 cho biết những thông tin gì về nguyên tố magnesium?', doc: { mode: 'ptable', sel: 12, hl: 'none' } },
    { title: 'Chu kì', prompt: 'Chọn "Làm nổi bật: Chu kì", bấm vào các nguyên tố khác nhau.', question: 'Các nguyên tố trong cùng một chu kì có đặc điểm gì chung? Số thứ tự chu kì cho biết điều gì?', doc: { mode: 'ptable', sel: 11, hl: 'period' }, startHidden: true },
    { title: 'Nhóm', prompt: 'Chọn "Làm nổi bật: Nhóm", bấm vào các nguyên tố nhóm IA, VIIA, VIIIA.', question: 'Nguyên tố nhóm A: số thứ tự nhóm cho biết điều gì? Các nguyên tố trong cùng một nhóm có tính chất thế nào?', doc: { mode: 'ptable', sel: 17, hl: 'group' }, startHidden: true },
    { title: 'Kim loại, phi kim, khí hiếm', prompt: 'Chọn "Làm nổi bật: Kim loại – phi kim" và quan sát vị trí các nhóm nguyên tố.', question: 'Các nguyên tố kim loại, phi kim, khí hiếm nằm ở khu vực nào của bảng tuần hoàn?', doc: { mode: 'ptable', sel: 18, hl: 'cat' } },
    { title: 'Phân loại nguyên tố', prompt: 'Bấm vào từng nguyên tố để xếp vào nhóm, sau đó bấm "Kiểm tra".', question: 'Dựa vào bảng tuần hoàn, cho biết nguyên tố có số hiệu 19 là kim loại hay phi kim.', doc: { mode: 'classify', set: 'kimPhi', placed: {}, sets: ['kimPhi'] } },
    { title: 'Đố vui bảng tuần hoàn', prompt: 'Các kí hiệu bị che. Học sinh đoán nguyên tố ở từng ô dựa vào số hiệu nguyên tử.', question: 'Nguyên tố ở chu kì 3, nhóm VIA là nguyên tố nào?', doc: { mode: 'ptable', sel: 16, hl: 'none', quiz: true }, startHidden: true },
    { title: 'Một số nhóm tiêu biểu', prompt: 'Học sinh nêu đặc điểm từng nhóm, bấm vào ô để mở đáp án.', question: 'Vì sao các kim loại nhóm IA phải bảo quản trong dầu hoả?', doc: { mode: 'table', set: 'groups7', open: [] }, startHidden: true },
    { title: 'Từ cấu tạo nguyên tử suy ra vị trí', prompt: 'Chọn nguyên tử, đếm số lớp electron (→ chu kì) và số electron lớp ngoài cùng (→ nhóm A). Kiểm tra lại trên bảng tuần hoàn.', question: 'Nguyên tử X có 3 lớp electron, lớp ngoài cùng có 7 electron. X ở chu kì nào, nhóm nào? Là kim loại hay phi kim?', doc: { mode: 'atom', Z: 17, list: [3, 9, 11, 12, 13, 15, 16, 17, 18, 19, 20] }, startHidden: true },
  ],
};

const h7_5: LessonContent = {
  scenes: [
    { title: 'Đơn chất', prompt: 'Chọn từng chất, quan sát mẫu chất và mô hình hạt.', question: 'Đơn chất được tạo nên từ bao nhiêu nguyên tố? Đơn chất kim loại và đơn chất phi kim khác nhau thế nào?', doc: { mode: 'molecules', list: ['Cu', 'Fe', 'Al', 'Mg', 'C', 'He', 'Ne', 'Ar', 'H2', 'O2', 'N2', 'Cl2', 'O3'], sel: 'O2' } },
    { title: 'Hợp chất', prompt: 'Chọn từng hợp chất, quan sát thành phần nguyên tố.', question: 'Hợp chất là gì? Phân tử nước gồm những nguyên tử nào?', doc: { mode: 'molecules', list: ['H2O', 'H2O2', 'CO2', 'CO', 'SO2', 'H2S', 'NH3', 'CH4', 'HCl', 'C2H5OH', 'NaCl', 'KCl', 'MgO', 'CaO'], sel: 'H2O' }, startHidden: true },
    { title: 'Khối lượng phân tử', prompt: 'Học sinh tính khối lượng phân tử trước, bấm "Hiện số đo" để kiểm tra.', question: 'Tính khối lượng phân tử của khí oxygen (O₂), carbon dioxide (CO₂), methane (CH₄).', doc: { mode: 'molecules', list: ['O2', 'O3', 'Cl2', 'H2O', 'H2O2', 'CO2', 'SO2', 'NH3', 'CH4', 'C2H5OH', 'NaCl', 'CaO'], sel: 'CO2' }, startHidden: true },
    { title: 'Đơn chất hay hợp chất?', prompt: 'Bấm vào từng chất để xếp vào nhóm, sau đó bấm "Kiểm tra".', question: 'Oxygen (O₂) và ozone (O₃) là đơn chất hay hợp chất? Vì sao?', doc: { mode: 'classify', set: 'donHop', placed: {}, sets: ['donHop', 'donHop3'] } },
    { title: 'Cùng nguyên tố, khác chất', prompt: 'So sánh O₂ với O₃; H₂O với H₂O₂; CO với CO₂.', question: 'Nước (H₂O) và oxy già (H₂O₂) đều tạo nên từ H và O. Vì sao chúng là hai chất khác nhau?', doc: { mode: 'molecules', list: ['O2', 'O3', 'H2O', 'H2O2', 'CO', 'CO2'], sel: 'H2O2' }, startHidden: true },
  ],
};

const h7_6: LessonContent = {
  scenes: [
    { title: 'Lớp vỏ bền của khí hiếm', prompt: 'Quan sát số electron lớp ngoài cùng của He, Ne, Ar.', question: 'Vì sao các khí hiếm hầu như không tham gia phản ứng hoá học?', doc: { mode: 'bond', pair: 'noble', p: 0, list: ['noble'] } },
    { title: 'Liên kết ion trong NaCl', prompt: 'Kéo thanh tiến trình hoặc bấm "Chuyển electron".', question: 'Nguyên tử Na nhường hay nhận electron? Ion tạo thành có lớp vỏ giống khí hiếm nào?', doc: { mode: 'bond', pair: 'NaCl', p: 0, list: ['NaCl', 'KCl', 'NaF', 'MgO', 'CaO'] }, startHidden: true },
    { title: 'Liên kết cộng hoá trị', prompt: 'Chọn H₂, Cl₂, O₂, N₂, HCl. Bấm "Góp chung electron".', question: 'Trong phân tử H₂, mỗi nguyên tử H góp bao nhiêu electron? Có bao nhiêu cặp electron dùng chung?', doc: { mode: 'bond', pair: 'H2', p: 0, list: ['H2', 'Cl2', 'F2', 'O2', 'N2', 'HCl', 'HF'] }, startHidden: true },
    { title: 'Phân tử nhiều nguyên tử', prompt: 'Chọn H₂O, NH₃, CH₄, CO₂. Đếm số cặp electron dùng chung.', question: 'Trong phân tử nước, nguyên tử O liên kết với mấy nguyên tử H? Có mấy cặp electron dùng chung?', doc: { mode: 'bond', pair: 'H2O', p: 0, list: ['H2O', 'H2S', 'NH3', 'PH3', 'CH4', 'CO2', 'C2H4'] }, startHidden: true },
    { title: 'Chất ion và chất cộng hoá trị', prompt: 'Học sinh so sánh, bấm vào ô để mở đáp án.', question: 'Vì sao muối ăn khó nóng chảy còn nước đá dễ nóng chảy?', doc: { mode: 'table', set: 'ionicCovalent', open: [] }, startHidden: true },
    { title: 'Phân loại hợp chất', prompt: 'Bấm vào từng chất để xếp nhóm, sau đó bấm "Kiểm tra".', question: 'Hợp chất tạo bởi kim loại và phi kim thường có liên kết gì?', doc: { mode: 'classify', set: 'ionCov', placed: {}, sets: ['ionCov'] } },
    { title: 'Thí nghiệm: đun nóng muối ăn, đường, nến', prompt: 'Bấm "Đun nóng", quan sát mẫu nào nóng chảy trước, mẫu nào không nóng chảy.', question: 'Vì sao muối ăn không nóng chảy khi đun bằng đèn cồn, còn đường và nến nóng chảy nhanh?', doc: { mode: 'ionprop', sub: 'heat', sol: 'nacl' }, startHidden: true },
    { title: 'Thí nghiệm: dung dịch nào dẫn điện?', prompt: 'Lần lượt thử nước cất, dung dịch muối ăn, đường, cồn, CuSO₄ và muối ăn khan. Học sinh dự đoán trước khi bấm "Hiện số đo".', question: 'Vì sao dung dịch muối ăn dẫn điện còn muối ăn khan và dung dịch đường không dẫn điện?', doc: { mode: 'ionprop', sub: 'conduct', sol: 'water' }, startHidden: true },
  ],
};

const h7_7: LessonContent = {
  scenes: [
    { title: 'Hoá trị trong hợp chất cộng hoá trị', prompt: 'Đếm số cặp electron dùng chung của mỗi nguyên tử trong H₂O, NH₃, CH₄.', question: 'Trong các hợp chất H₂O, NH₃, CH₄, hoá trị của O, N, C là bao nhiêu?', doc: { mode: 'bond', pair: 'CH4', p: 1, list: ['HCl', 'H2O', 'H2S', 'NH3', 'PH3', 'CH4', 'CO2'] }, startHidden: true },
    { title: 'Lập công thức theo hoá trị', prompt: 'Chọn hai nguyên tố (hoặc nhóm nguyên tử), đi qua từng bước lập công thức.', question: 'Lập công thức hoá học của hợp chất tạo bởi Al (III) và O (II).', doc: { mode: 'valence', a: 'Al', va: 3, b: 'O', vb: 2, step: 0 }, startHidden: true },
    { title: 'Nhóm nguyên tử', prompt: 'Chọn kim loại và nhóm nguyên tử (OH, NO₃, SO₄, CO₃, PO₄).', question: 'Lập công thức hoá học của hợp chất tạo bởi Fe (III) và nhóm SO₄ (II); Ca (II) và nhóm OH (I).', doc: { mode: 'valence', a: 'Fe', va: 3, b: 'SO4', vb: 2, step: 0, as: ['Na', 'K', 'Ag', 'Ca', 'Mg', 'Ba', 'Zn', 'Pb', 'Cu', 'Fe', 'Al', 'NH4'], bs: ['OH', 'NO3', 'SO4', 'CO3', 'PO4', 'Cl'] }, startHidden: true },
    { title: 'Ý nghĩa của công thức hoá học', prompt: 'Học sinh trả lời từng ô, bấm vào ô để mở đáp án.', question: 'Công thức CaCO₃ cho biết những thông tin gì?', doc: { mode: 'table', set: 'formulaMeaning', open: [] }, startHidden: true },
    { title: 'Phần trăm khối lượng nguyên tố', prompt: 'Chọn bài tập, đi qua từng bước tính.', question: 'Tính phần trăm khối lượng của nguyên tố nitrogen trong phân đạm urea CO(NH₂)₂.', doc: { mode: 'percent', task: 'CO2', list: ['H2O', 'CO2', 'NH3', 'CaCO3', 'Fe2O3', 'Al2O3', 'CuSO4', 'C6H12O6'], step: 0 }, startHidden: true },
    { title: 'Tìm công thức hoá học', prompt: 'Từ phần trăm khối lượng và khối lượng phân tử, tìm số nguyên tử mỗi nguyên tố.', question: 'Hợp chất X gồm S và O, trong đó S chiếm 50% khối lượng, khối lượng phân tử là 64 amu. Tìm công thức của X.', doc: { mode: 'percent', task: 'r-SO2', list: ['r-SO2', 'r-Fe2O3', 'r-C2H6', 'r-CuO', 'r-MgO', 'r-CaCO3'], step: 0 }, startHidden: true },
    { title: 'Bảng hoá trị', prompt: 'Học sinh nêu hoá trị và lấy ví dụ hợp chất, bấm vào ô để mở đáp án.', question: 'Dựa vào bảng hoá trị, viết công thức hợp chất của Zn với Cl, của Al với nhóm NO₃.', doc: { mode: 'table', set: 'valence7', open: [] }, startHidden: true },
    { title: 'Công thức đúng hay sai?', prompt: 'Bấm vào từng công thức để xếp vào nhóm, sau đó bấm "Kiểm tra". Sửa lại các công thức sai.', question: 'Sửa lại các công thức viết sai: AlO, NaCl₂, Ca₂O, MgCl, KSO₄, CaOH.', doc: { mode: 'classify', set: 'congThuc', placed: {}, sets: ['congThuc'] } },
    { title: 'Phần trăm nitrogen trong phân đạm', prompt: 'So sánh hàm lượng nitrogen trong các loại phân đạm: urea, ammonium nitrate, ammonium sulfate.', question: 'Bón cho cây, loại phân đạm nào cung cấp nhiều nitrogen nhất trên cùng một khối lượng phân?', doc: { mode: 'percent', task: 'CO(NH2)2', list: ['CO(NH2)2', 'NH4NO3', '(NH4)2SO4', 'KNO3'], step: 0 }, startHidden: true },
  ],
};

export const CHEM7_LESSONS: Record<string, LessonContent> = {
  'h7-2': h7_2,
  'h7-3': h7_3,
  'h7-4': h7_4,
  'h7-5': h7_5,
  'h7-6': h7_6,
  'h7-7': h7_7,
};
