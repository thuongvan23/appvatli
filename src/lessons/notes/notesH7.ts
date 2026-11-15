// KHTN 7 – phần Hoá học: Bài 2 – Bài 7.
import type { LessonNotes } from './types';

export const NOTES_H7: Record<string, LessonNotes> = {
  'h7-2': {
    opener: 'Mọi vật quanh ta đều được tạo nên từ những hạt vô cùng nhỏ bé. Những hạt đó là gì và có cấu tạo như thế nào?',
    goals: ['Trình bày được mô hình nguyên tử của Rutherford – Bohr (mô hình sắp xếp electron trong các lớp vỏ nguyên tử).', 'Nêu được khối lượng của một nguyên tử theo đơn vị quốc tế amu (đơn vị khối lượng nguyên tử).'],
    sections: [
      { title: 'Nguyên tử là gì?', body: ['Các chất được tạo nên từ các hạt vô cùng nhỏ, trung hoà về điện gọi là nguyên tử.', 'Nguyên tử có kích thước vô cùng nhỏ, đường kính khoảng 10⁻¹⁰ m.'], scene: 1 },
      { title: 'Cấu tạo nguyên tử', body: ['Theo mô hình Rutherford – Bohr: nguyên tử gồm hạt nhân mang điện tích dương ở tâm và vỏ nguyên tử gồm các electron mang điện tích âm chuyển động xung quanh hạt nhân theo từng lớp.', 'Hạt nhân được tạo bởi hai loại hạt: proton (p, mang điện tích +1) và neutron (n, không mang điện). Electron (e) mang điện tích −1.', 'Trong nguyên tử, số proton bằng số electron nên nguyên tử trung hoà về điện.'], scene: 2 },
      { title: 'Sự sắp xếp electron', body: ['Các electron sắp xếp thành từng lớp. Lớp thứ nhất (gần hạt nhân nhất) có tối đa 2 electron; lớp thứ hai có tối đa 8 electron; với 20 nguyên tố đầu, lớp thứ ba có tối đa 8 electron.', 'Ví dụ: nguyên tử sodium (11 e) có 3 lớp electron: 2, 8, 1 – lớp ngoài cùng có 1 electron.'], scene: 4 },
      { title: 'Khối lượng nguyên tử', body: ['Khối lượng nguyên tử rất nhỏ nên dùng đơn vị khối lượng nguyên tử amu: 1 amu ≈ 1,6605·10⁻²⁷ kg.', 'Khối lượng proton ≈ khối lượng neutron ≈ 1 amu; khối lượng electron ≈ 0,00055 amu (rất nhỏ). Vì vậy khối lượng nguyên tử ≈ khối lượng hạt nhân ≈ số p + số n (amu).'], scene: 3 },
    ],
    formulas: [
      { expr: 'Số p = số e', note: 'Nguyên tử trung hoà về điện' },
      { expr: 'Khối lượng nguyên tử ≈ p + n (amu)', note: 'Bỏ qua khối lượng electron' },
    ],
    examples: ['Nguyên tử carbon có 6 p, 6 n, 6 e: khối lượng ≈ 12 amu; 2 lớp electron (2, 4).', 'Nguyên tử oxygen có 8 p, 8 n: khối lượng ≈ 16 amu.'],
    facts: ['Nếu phóng to nguyên tử bằng một sân vận động thì hạt nhân chỉ to bằng một viên bi đặt ở giữa sân – phần lớn nguyên tử là khoảng trống.'],
    exercises: [
      { q: 'Nguyên tử aluminium có 13 proton. Hỏi nguyên tử có bao nhiêu electron? Vẽ sơ đồ sắp xếp electron.', a: '13 electron, xếp thành 3 lớp: 2, 8, 3.' },
      { q: 'Nguyên tử X có 8 proton và 8 neutron. Tính khối lượng nguyên tử X.', a: '≈ 8 + 8 = 16 amu (nguyên tử oxygen).' },
      { q: 'Vì sao nói khối lượng hạt nhân được coi là khối lượng nguyên tử?', a: 'Vì khối lượng electron rất nhỏ so với khối lượng proton và neutron, có thể bỏ qua.' },
    ],
  },

  'h7-3': {
    opener: 'Có hơn một trăm nguyên tố hoá học nhưng tạo nên hàng triệu chất khác nhau. Nguyên tố hoá học là gì và được kí hiệu như thế nào?',
    goals: ['Phát biểu được khái niệm về nguyên tố hoá học và kí hiệu nguyên tố hoá học.', 'Viết được kí hiệu hoá học và đọc được tên của 20 nguyên tố đầu tiên.'],
    sections: [
      { title: 'Nguyên tố hoá học', body: ['Nguyên tố hoá học là tập hợp những nguyên tử cùng loại, có cùng số proton trong hạt nhân.', 'Số proton là số đặc trưng của một nguyên tố. Các nguyên tử của cùng một nguyên tố có thể có số neutron khác nhau nhưng tính chất hoá học giống nhau.', 'Đến nay đã biết 118 nguyên tố hoá học, trong đó có khoảng 90 nguyên tố tự nhiên, còn lại là nguyên tố nhân tạo.'], scene: 1 },
      { title: 'Kí hiệu hoá học', body: ['Mỗi nguyên tố được biểu diễn bằng một kí hiệu hoá học gồm một hoặc hai chữ cái lấy từ tên nguyên tố. Chữ cái đầu viết in hoa, chữ cái thứ hai (nếu có) viết thường và nhỏ hơn.', 'Ví dụ: H (hydrogen), O (oxygen), C (carbon), Ca (calcium), Cl (chlorine).', 'Một số kí hiệu lấy từ tên Latin: Na (Natrium – sodium), K (Kalium – potassium), Fe (Ferrum – iron), Cu (Cuprum – copper), Ag (Argentum – silver), Au (Aurum – gold), Hg (Hydrargyrum – mercury), Pb (Plumbum – lead).'], scene: 2 },
      { title: 'Nguyên tố trong tự nhiên và đời sống', body: ['Oxygen là nguyên tố phổ biến nhất trong vỏ Trái Đất; tiếp theo là silicon, aluminium, iron…', 'Cơ thể người chứa chủ yếu các nguyên tố O, C, H, N, Ca, P… và một lượng nhỏ các nguyên tố vi lượng như Fe, I, Zn rất cần cho sức khoẻ.'], scene: 4 },
    ],
    examples: ['Kí hiệu "Co" là nguyên tố cobalt; "CO" là công thức của hợp chất carbon monoxide gồm C và O.', 'Muối iodine bổ sung nguyên tố iodine (I) phòng bệnh bướu cổ.'],
    facts: ['Nguyên tố hydrogen chiếm khoảng 75% khối lượng vật chất thông thường trong vũ trụ.'],
    exercises: [
      { q: 'Nguyên tử X có 17 proton. X là nguyên tố nào? Viết kí hiệu hoá học.', a: 'Chlorine, kí hiệu Cl.' },
      { q: 'Viết kí hiệu hoá học của các nguyên tố: nitrogen, magnesium, phosphorus, sulfur, potassium.', a: 'N, Mg, P, S, K.' },
      { q: 'Cách viết "cA", "NA", "mg" đã đúng chưa? Sửa lại.', a: 'Sai. Viết đúng: Ca, Na, Mg (chữ đầu in hoa, chữ thứ hai viết thường).' },
    ],
  },

  'h7-4': {
    opener: 'Các nhà khoa học đã sắp xếp hơn 100 nguyên tố hoá học vào một bảng như thế nào để dễ tra cứu và dự đoán tính chất?',
    goals: ['Nêu được các nguyên tắc xây dựng bảng tuần hoàn các nguyên tố hoá học.', 'Mô tả được cấu tạo bảng tuần hoàn gồm: ô, nhóm, chu kì.', 'Sử dụng được bảng tuần hoàn để chỉ ra các nhóm nguyên tố/nguyên tố kim loại, các nhóm nguyên tố/nguyên tố phi kim, nhóm nguyên tố khí hiếm trong bảng tuần hoàn.'],
    sections: [
      { title: 'Nguyên tắc sắp xếp', body: ['Các nguyên tố được sắp xếp theo chiều tăng dần của điện tích hạt nhân nguyên tử.', 'Các nguyên tố trong cùng một hàng có cùng số lớp electron trong nguyên tử.', 'Các nguyên tố trong cùng một cột có tính chất hoá học tương tự nhau.'], scene: 1 },
      { title: 'Ô nguyên tố', body: ['Mỗi nguyên tố được xếp vào một ô. Ô nguyên tố cho biết: số hiệu nguyên tử (bằng số proton = số đơn vị điện tích hạt nhân = số electron), kí hiệu hoá học, tên nguyên tố, khối lượng nguyên tử.', 'Số thứ tự của ô bằng số hiệu nguyên tử của nguyên tố.'], scene: 1 },
      { title: 'Chu kì', body: ['Chu kì gồm các nguyên tố mà nguyên tử của chúng có cùng số lớp electron, xếp thành một hàng.', 'Số thứ tự của chu kì bằng số lớp electron. Bảng tuần hoàn có 7 chu kì: chu kì 1, 2, 3 là chu kì nhỏ; chu kì 4 – 7 là chu kì lớn.'], scene: 2 },
      { title: 'Nhóm', body: ['Nhóm gồm các nguyên tố mà nguyên tử của chúng có tính chất hoá học tương tự nhau, xếp thành một cột.', 'Có 8 nhóm A (IA đến VIIIA) và 8 nhóm B. Với nguyên tố nhóm A, số thứ tự của nhóm bằng số electron lớp ngoài cùng.', 'Nhóm IA (trừ H): kim loại kiềm, hoạt động hoá học mạnh. Nhóm VIIA: halogen, phi kim hoạt động mạnh. Nhóm VIIIA: khí hiếm, rất khó tham gia phản ứng.'], scene: 3 },
      { title: 'Kim loại, phi kim, khí hiếm', body: ['Nguyên tố kim loại chiếm phần lớn bảng tuần hoàn, ở phía bên trái và giữa bảng (nhóm IA, IIA, IIIA trừ boron, và các nhóm B).', 'Nguyên tố phi kim ở phía trên bên phải bảng (một phần các nhóm IVA đến VIIA); hydrogen cũng là phi kim.', 'Nguyên tố khí hiếm ở nhóm VIIIA, cột cuối cùng của bảng.'], scene: 4 },
    ],
    examples: ['Sodium (Z = 11): chu kì 3 (3 lớp e), nhóm IA (1 e lớp ngoài cùng), là kim loại.', 'Chlorine (Z = 17): chu kì 3, nhóm VIIA (7 e lớp ngoài cùng), là phi kim.'],
    facts: ['Nhà hoá học Mendeleev (Nga) công bố bảng tuần hoàn đầu tiên năm 1869 và để trống một số ô cho những nguyên tố chưa được tìm ra; sau này các nguyên tố đó đã được phát hiện đúng như dự đoán.'],
    exercises: [
      { q: 'Nguyên tố X ở ô số 12. Cho biết số proton, số electron, số lớp electron, số electron lớp ngoài cùng của X.', a: 'X là magnesium: 12 p, 12 e; 3 lớp electron (2, 8, 2); 2 e lớp ngoài cùng (chu kì 3, nhóm IIA).' },
      { q: 'Nguyên tố ở chu kì 2, nhóm VIA là nguyên tố nào? Là kim loại hay phi kim?', a: 'Oxygen (Z = 8), là phi kim.' },
      { q: 'Vì sao các nguyên tố trong cùng nhóm IA có tính chất hoá học tương tự nhau?', a: 'Vì nguyên tử của chúng đều có 1 electron ở lớp ngoài cùng.' },
    ],
  },

  'h7-5': {
    opener: 'Khí oxygen, nước, muối ăn được tạo nên từ những nguyên tố nào? Hạt nào đại diện cho mỗi chất?',
    goals: ['Nêu được khái niệm phân tử, đơn chất, hợp chất.', 'Đưa ra được một số ví dụ về đơn chất và hợp chất.', 'Tính được khối lượng phân tử theo đơn vị amu.'],
    sections: [
      { title: 'Phân tử', body: ['Phân tử là hạt đại diện cho chất, gồm một số nguyên tử liên kết với nhau và thể hiện đầy đủ tính chất hoá học của chất.', 'Ví dụ: phân tử oxygen gồm 2 nguyên tử O; phân tử nước gồm 2 nguyên tử H và 1 nguyên tử O.'], scene: 1 },
      { title: 'Khối lượng phân tử', body: ['Khối lượng phân tử bằng tổng khối lượng các nguyên tử có trong phân tử, đơn vị amu.', 'Ví dụ: khối lượng phân tử nước H₂O = 2 × 1 + 16 = 18 amu; carbon dioxide CO₂ = 12 + 2 × 16 = 44 amu.'], scene: 3 },
      { title: 'Đơn chất', body: ['Đơn chất là những chất được tạo nên từ một nguyên tố hoá học.', 'Đơn chất kim loại (sắt, đồng, nhôm…): các nguyên tử sắp xếp khít nhau; phân tử được coi là nguyên tử. Đơn chất phi kim: phân tử thường gồm một số nguyên tử liên kết với nhau (O₂, N₂, H₂, Cl₂, O₃…). Khí hiếm: phân tử gồm 1 nguyên tử (He, Ne, Ar).', 'Một nguyên tố có thể tạo nên nhiều đơn chất khác nhau: oxygen tạo nên khí oxygen O₂ và khí ozone O₃; carbon tạo nên kim cương, than chì.'], scene: 1 },
      { title: 'Hợp chất', body: ['Hợp chất là những chất được tạo nên từ hai hay nhiều nguyên tố hoá học.', 'Ví dụ: nước (H, O), muối ăn (Na, Cl), đá vôi CaCO₃ (Ca, C, O), đường mía (C, H, O).'], scene: 2 },
    ],
    formulas: [{ expr: 'KLPT = tổng khối lượng các nguyên tử', note: 'Đơn vị amu' }],
    examples: ['Đơn chất: O₂, N₂, Fe, Cu, S. Hợp chất: H₂O, CO₂, NaCl, NH₃, CH₄.', 'Khối lượng phân tử của NH₃ = 14 + 3 × 1 = 17 amu.'],
    exercises: [
      { q: 'Trong các chất sau, chất nào là đơn chất, chất nào là hợp chất: H₂, NaOH, Cl₂, Fe, CaO, N₂, HCl?', a: 'Đơn chất: H₂, Cl₂, Fe, N₂. Hợp chất: NaOH, CaO, HCl.' },
      { q: 'Tính khối lượng phân tử của: Cl₂, CH₄, CaCO₃ (Ca = 40, C = 12, O = 16, H = 1, Cl = 35,5).', a: 'Cl₂ = 71 amu; CH₄ = 16 amu; CaCO₃ = 100 amu.' },
      { q: 'Khí oxygen và khí ozone đều được tạo nên từ nguyên tố nào? Chúng có phải là một chất không?', a: 'Đều được tạo nên từ nguyên tố oxygen, nhưng là hai đơn chất khác nhau (phân tử O₂ và O₃).' },
    ],
  },

  'h7-6': {
    opener: 'Vì sao các nguyên tử lại liên kết với nhau để tạo thành phân tử? Muối ăn và nước có kiểu liên kết giống nhau không?',
    goals: ['Nêu được mô hình sắp xếp electron trong vỏ nguyên tử của một số nguyên tố khí hiếm; sự hình thành liên kết cộng hoá trị theo nguyên tắc dùng chung electron để tạo ra lớp vỏ electron của nguyên tố khí hiếm (áp dụng cho các phân tử đơn giản như H₂, Cl₂, NH₃, H₂O, CH₄, O₂, N₂, CO₂).', 'Nêu được sự hình thành liên kết ion theo nguyên tắc cho và nhận electron để tạo ra ion có lớp vỏ electron của nguyên tố khí hiếm (áp dụng cho phân tử đơn giản như NaCl, MgO…).', 'Chỉ ra được sự khác nhau về một số tính chất của chất ion và chất cộng hoá trị.'],
    sections: [
      { title: 'Lớp vỏ electron bền của khí hiếm', body: ['Nguyên tử khí hiếm có 8 electron ở lớp ngoài cùng (riêng helium có 2 electron) – đây là lớp vỏ bền vững. Vì vậy khí hiếm hầu như không tham gia phản ứng hoá học và tồn tại ở dạng nguyên tử riêng rẽ.', 'Nguyên tử của các nguyên tố khác có xu hướng tạo liên kết để đạt được lớp vỏ electron bền vững giống khí hiếm.'], scene: 1 },
      { title: 'Liên kết ion', body: ['Nguyên tử kim loại (ít electron lớp ngoài cùng) dễ nhường electron tạo thành ion dương; nguyên tử phi kim (nhiều electron lớp ngoài cùng) dễ nhận electron tạo thành ion âm.', 'Ví dụ: Na → Na⁺ + 1e; Cl + 1e → Cl⁻. Ion Na⁺ có lớp vỏ giống Ne, ion Cl⁻ có lớp vỏ giống Ar.', 'Liên kết ion là liên kết giữa ion mang điện tích trái dấu (lực hút tĩnh điện). Ví dụ: NaCl, MgO (Mg → Mg²⁺ + 2e; O + 2e → O²⁻).'], scene: 2 },
      { title: 'Liên kết cộng hoá trị', body: ['Liên kết cộng hoá trị là liên kết được tạo nên giữa hai nguyên tử bằng một hay nhiều cặp electron dùng chung.', 'Ví dụ: trong H₂, mỗi nguyên tử H góp 1 electron tạo 1 cặp electron dùng chung; trong O₂ có 2 cặp, trong N₂ có 3 cặp electron dùng chung.', 'Trong H₂O, nguyên tử O dùng chung 2 cặp electron với 2 nguyên tử H; trong NH₃ có 3 cặp; trong CH₄ có 4 cặp; trong CO₂, nguyên tử C dùng chung 2 cặp electron với mỗi nguyên tử O.'], scene: 3 },
      { title: 'Chất ion và chất cộng hoá trị', body: ['Chất ion: thường ở thể rắn ở nhiệt độ phòng, khó bay hơi, khó nóng chảy; khi tan trong nước tạo dung dịch dẫn điện.', 'Chất cộng hoá trị: có thể ở thể rắn, lỏng hoặc khí; thường dễ bay hơi, dễ nóng chảy; thường không dẫn điện ở mọi trạng thái.'], scene: 5 },
    ],
    examples: ['Muối ăn (NaCl) là chất ion: rắn, nóng chảy ở khoảng 801 °C, dung dịch muối dẫn điện.', 'Đường, nước, khí CO₂ là chất cộng hoá trị.'],
    exercises: [
      { q: 'Nguyên tử Mg (2, 8, 2) nhường hay nhận bao nhiêu electron để có lớp vỏ bền? Ion tạo thành có điện tích bao nhiêu?', a: 'Nhường 2 electron, tạo ion Mg²⁺ có lớp vỏ giống khí hiếm Ne.' },
      { q: 'Trong phân tử Cl₂ có bao nhiêu cặp electron dùng chung? Mỗi nguyên tử Cl có bao nhiêu electron lớp ngoài cùng sau khi liên kết?', a: '1 cặp electron dùng chung; mỗi nguyên tử Cl có 8 electron lớp ngoài cùng (giống Ar).' },
      { q: 'Vì sao dung dịch muối ăn dẫn điện còn nước đường không dẫn điện?', a: 'Muối ăn là chất ion, khi tan tạo các ion chuyển động được; đường là chất cộng hoá trị, khi tan không tạo ion.' },
    ],
  },

  'h7-7': {
    opener: 'Vì sao công thức của nước là H₂O mà không phải HO hay H₃O? Làm thế nào để viết đúng công thức hoá học của một chất?',
    goals: ['Trình bày được khái niệm về hoá trị (cho chất cộng hoá trị). Cách viết công thức hoá học.', 'Viết được công thức hoá học của một số chất và hợp chất đơn giản thông dụng.', 'Nêu được mối liên hệ giữa hoá trị của nguyên tố với công thức hoá học.', 'Tính được phần trăm (%) nguyên tố trong hợp chất khi biết công thức hoá học của hợp chất.', 'Xác định được công thức hoá học của hợp chất dựa vào phần trăm (%) nguyên tố và khối lượng phân tử.'],
    sections: [
      { title: 'Hoá trị', body: ['Trong hợp chất cộng hoá trị, hoá trị của một nguyên tố được xác định bằng số cặp electron dùng chung của nguyên tử nguyên tố đó với nguyên tử khác.', 'Quy ước: H có hoá trị I, O có hoá trị II. Ví dụ: trong H₂O, O có hoá trị II; trong NH₃, N có hoá trị III; trong CH₄, C có hoá trị IV.', 'Một số nguyên tố có nhiều hoá trị: Fe (II, III), Cu (I, II), S (II, IV, VI), C (II, IV), N (III, V…).'], scene: 1 },
      { title: 'Quy tắc hoá trị', body: ['Trong phân tử hợp chất hai nguyên tố AₓBᵧ (A hoá trị a, B hoá trị b): x × a = y × b.', 'Quy tắc này cũng đúng khi B là nhóm nguyên tử như OH (I), NO₃ (I), SO₄ (II), CO₃ (II), PO₄ (III).'], scene: 2 },
      { title: 'Lập công thức hoá học', body: ['Bước 1: Viết công thức dạng chung AₓBᵧ.', 'Bước 2: Áp dụng quy tắc hoá trị: x × a = y × b.', 'Bước 3: Chuyển thành tỉ lệ x : y = b : a, lấy tỉ lệ tối giản.', 'Bước 4: Viết công thức hoá học. Ví dụ: Al (III) và O (II): x : y = 2 : 3 → Al₂O₃.'], scene: 2 },
      { title: 'Công thức hoá học và ý nghĩa', body: ['Công thức hoá học biểu diễn chất bằng kí hiệu hoá học của các nguyên tố và chỉ số ở chân bên phải kí hiệu. Đơn chất kim loại: Fe, Cu; đơn chất phi kim: O₂, H₂, N₂…; hợp chất: H₂O, NaCl, CaCO₃.', 'Công thức hoá học cho biết: nguyên tố tạo nên chất, số nguyên tử mỗi nguyên tố trong một phân tử, khối lượng phân tử.'], scene: 4 },
      { title: 'Phần trăm khối lượng nguyên tố', body: ['Với hợp chất AₓBᵧ: %A = (x × khối lượng nguyên tử A) : khối lượng phân tử × 100%; %B = 100% − %A.', 'Tìm công thức từ phần trăm: khối lượng của nguyên tố trong một phân tử = % × khối lượng phân tử; số nguyên tử = khối lượng đó : khối lượng nguyên tử.'], scene: 5 },
    ],
    formulas: [
      { expr: 'x · a = y · b', note: 'Quy tắc hoá trị cho hợp chất AₓBᵧ' },
      { expr: '%A = x·M_A / KLPT × 100%', note: 'Phần trăm khối lượng nguyên tố A' },
    ],
    examples: ['Ca (II) và OH (I): x : y = 1 : 2 → Ca(OH)₂.', 'Trong CO₂: %C = 12 : 44 × 100% ≈ 27,27%; %O ≈ 72,73%.'],
    facts: ['Phân đạm urea CO(NH₂)₂ có hàm lượng nitrogen khoảng 46,7% – cao nhất trong các loại phân đạm thông dụng.'],
    exercises: [
      { q: 'Xác định hoá trị của S trong SO₂ và SO₃.', a: 'SO₂: S có hoá trị IV (1 × a = 2 × II); SO₃: S có hoá trị VI.' },
      { q: 'Lập công thức hoá học của hợp chất tạo bởi: Na và O; Fe (III) và Cl (I); Ba và nhóm SO₄.', a: 'Na₂O; FeCl₃; BaSO₄.' },
      { q: 'Tính phần trăm khối lượng các nguyên tố trong Fe₂O₃ (Fe = 56, O = 16).', a: 'KLPT = 160 amu; %Fe = 112 : 160 × 100% = 70%; %O = 30%.' },
      { q: 'Hợp chất X gồm C và H, C chiếm 75% khối lượng, khối lượng phân tử 16 amu. Tìm công thức X.', a: 'Khối lượng C = 12 amu → 1 nguyên tử C; khối lượng H = 4 amu → 4 nguyên tử H. X là CH₄.' },
    ],
  },
};

// ---------------------------------------------------------------------
// Bổ sung ví dụ, thí nghiệm, câu hỏi vận dụng (gắn vào các cảnh mới ở cuối mỗi bài)
// ---------------------------------------------------------------------
const MORE: Record<string, { sections?: LessonNotes['sections']; examples?: string[]; facts?: string[]; exercises?: LessonNotes['exercises'] }> = {
  'h7-2': {
    sections: [{ title: 'Luyện tập về thành phần nguyên tử', body: ['Khi biết số proton (bằng số electron) và số neutron, tính được khối lượng nguyên tử ≈ p + n (amu) và vẽ được sơ đồ sắp xếp electron.', 'Ví dụ: nguyên tử chlorine có 17 p, 18 n, 17 e: khối lượng ≈ 35 amu; 3 lớp electron (2, 8, 7).'], scene: 5 }],
    examples: ['Nguyên tử magnesium: 12 p, 12 n, 12 e; 3 lớp electron (2, 8, 2).', 'Nguyên tử calcium: 20 p, 20 n, 20 e; 4 lớp electron (2, 8, 8, 2).'],
    facts: ['Khối lượng một nguyên tử hydrogen chỉ khoảng 1,67·10⁻²⁷ kg; cần khoảng 6·10²³ nguyên tử hydrogen mới nặng được 1 gam.', 'Năm 1911, Rutherford bắn các hạt alpha vào lá vàng mỏng: hầu hết hạt đi thẳng qua, chỉ rất ít hạt bật ngược lại – chứng tỏ nguyên tử rỗng, hạt nhân rất nhỏ ở tâm.'],
    exercises: [
      { q: 'Nguyên tử X có tổng số hạt là 34, trong đó số hạt mang điện nhiều hơn số hạt không mang điện là 10. Xác định X.', a: 'p + e + n = 34, p = e, (p + e) − n = 10 → 2p + n = 34; 2p − n = 10 → p = 11, n = 12. X là sodium (Na).' },
      { q: 'Nguyên tử nitrogen có 7 electron. Vẽ sơ đồ và cho biết số electron lớp ngoài cùng.', a: '2 lớp electron: 2, 5. Lớp ngoài cùng có 5 electron.' },
    ],
  },
  'h7-3': {
    sections: [{ title: 'Nguyên tử cùng nguyên tố có số neutron khác nhau', body: ['Hydrogen có ba loại nguyên tử: không có neutron, có 1 neutron và có 2 neutron. Cả ba đều có 1 proton nên đều thuộc nguyên tố hydrogen.', 'Khối lượng nguyên tử ghi trong bảng tuần hoàn là giá trị trung bình của các loại nguyên tử trong tự nhiên, ví dụ chlorine là 35,5.'], scene: 5 }],
    examples: ['Oxygen chiếm khoảng 65% khối lượng cơ thể người; silicon là nguyên tố nhiều thứ hai trong vỏ Trái Đất (cát, đá).', 'Thiếu nguyên tố iron gây thiếu máu; thiếu calcium làm xương yếu.'],
    facts: ['Tên nhiều nguyên tố đặt theo tên nhà khoa học (einsteinium, mendelevium), địa danh (polonium – Ba Lan, francium – Pháp) hoặc thiên thể (helium – Mặt Trời).'],
    exercises: [
      { q: 'Ba nguyên tử: A (1p, 0n), B (1p, 1n), C (2p, 1n). Những nguyên tử nào thuộc cùng một nguyên tố?', a: 'A và B (cùng 1 proton – hydrogen). C có 2 proton là helium.' },
      { q: 'Viết kí hiệu hoá học của: lithium, beryllium, boron, neon, argon.', a: 'Li, Be, B, Ne, Ar.' },
    ],
  },
  'h7-4': {
    sections: [{ title: 'Từ cấu tạo nguyên tử suy ra vị trí', body: ['Với 20 nguyên tố đầu: số lớp electron = số thứ tự chu kì; số electron lớp ngoài cùng = số thứ tự nhóm A.', 'Ví dụ: nguyên tử có 3 lớp, lớp ngoài cùng 7 electron → chu kì 3, nhóm VIIA → chlorine, phi kim.', 'Nguyên tử có 1, 2, 3 electron lớp ngoài cùng thường là kim loại (trừ H, He, B); có 5, 6, 7 electron lớp ngoài cùng thường là phi kim; có 8 electron (He có 2) là khí hiếm.'], scene: 8 }],
    examples: ['Sodium, potassium (nhóm IA) phản ứng mạnh với nước nên phải ngâm trong dầu hoả.', 'Chlorine, bromine, iodine (nhóm VIIA) có tính chất hoá học giống nhau: đều là phi kim hoạt động mạnh.'],
    facts: ['Bảng tuần hoàn hiện nay có 118 nguyên tố xếp vào 7 chu kì và 18 cột.'],
    exercises: [
      { q: 'Nguyên tố Y ở chu kì 2, nhóm IIIA. Y có bao nhiêu lớp electron, bao nhiêu electron lớp ngoài cùng? Y là nguyên tố nào?', a: '2 lớp, 3 electron lớp ngoài cùng → Z = 5, boron (B).' },
      { q: 'Vì sao helium tuy có 2 electron lớp ngoài cùng nhưng lại xếp ở nhóm VIIIA?', a: 'Vì lớp electron duy nhất của He đã đủ 2 electron – bền vững như các khí hiếm khác, He có tính chất giống khí hiếm.' },
    ],
  },
  'h7-5': {
    sections: [{ title: 'Cùng nguyên tố nhưng là chất khác nhau', body: ['O₂ và O₃ đều là đơn chất của oxygen nhưng số nguyên tử trong phân tử khác nhau nên là hai chất khác nhau.', 'H₂O và H₂O₂ đều tạo nên từ H và O; CO và CO₂ đều tạo nên từ C và O. Tỉ lệ số nguyên tử khác nhau nên tính chất rất khác: CO rất độc, CO₂ không độc ở nồng độ thấp.'], scene: 5 }],
    examples: ['Đơn chất kim loại: sắt, nhôm, đồng, magnesium. Đơn chất phi kim: oxygen, nitrogen, lưu huỳnh, carbon. Khí hiếm: helium, neon, argon.', 'Hợp chất trong đời sống: nước, muối ăn (NaCl), đường, cồn (C₂H₅OH), vôi sống (CaO), khí carbon dioxide.'],
    facts: ['Kim cương và than chì đều là đơn chất của carbon: kim cương cứng nhất trong tự nhiên, còn than chì mềm, dùng làm ruột bút chì.'],
    exercises: [
      { q: 'Tính khối lượng phân tử của SO₂, C₂H₅OH, CaO (S = 32, O = 16, C = 12, H = 1, Ca = 40).', a: 'SO₂ = 64 amu; C₂H₅OH = 46 amu; CaO = 56 amu.' },
      { q: 'Phân tử X gồm 2 nguyên tử của một nguyên tố, nặng gấp 16 lần phân tử hydrogen. X là chất nào?', a: 'KLPT X = 16 × 2 = 32 amu → mỗi nguyên tử nặng 16 amu → oxygen; X là O₂.' },
    ],
  },
  'h7-6': {
    sections: [
      { title: 'Thí nghiệm: đun nóng chất ion và chất cộng hoá trị', body: ['Đặt riêng muối ăn, đường, nến lên tấm kim loại rồi đun nóng: nến và đường nhanh chóng nóng chảy (đường còn bị hoá đen), muối ăn vẫn ở thể rắn.', 'Chất ion có nhiệt độ nóng chảy cao (NaCl: 801 °C) do lực hút giữa các ion trái dấu rất mạnh; chất cộng hoá trị thường có nhiệt độ nóng chảy thấp hơn (đường ≈ 186 °C, nến ≈ 50 – 60 °C).'], scene: 7 },
      { title: 'Thí nghiệm: tính dẫn điện', body: ['Dung dịch muối ăn, dung dịch CuSO₄ làm đèn sáng: trong dung dịch có các ion chuyển động tự do.', 'Nước cất, dung dịch đường, dung dịch cồn và muối ăn khan (rắn) không dẫn điện.'], scene: 8 },
    ],
    examples: ['Hợp chất ion: NaCl, KCl, NaF, MgO, CaO. Hợp chất cộng hoá trị: H₂O, CO₂, NH₃, CH₄, HCl, H₂S, đường, cồn.', 'Trong C₂H₄ hai nguyên tử carbon dùng chung 2 cặp electron (liên kết đôi).'],
    facts: ['Không được dùng tay ướt chạm vào ổ điện: nước thường ngày có hoà tan nhiều chất ion nên dẫn điện.'],
    exercises: [
      { q: 'Mô tả sự tạo thành liên kết trong phân tử KCl.', a: 'Nguyên tử K nhường 1 electron tạo ion K⁺; nguyên tử Cl nhận 1 electron tạo ion Cl⁻. Hai ion trái dấu hút nhau tạo liên kết ion.' },
      { q: 'Trong phân tử N₂ có mấy cặp electron dùng chung? Mỗi nguyên tử N có bao nhiêu electron lớp ngoài cùng sau khi liên kết?', a: '3 cặp electron dùng chung; mỗi nguyên tử N có 8 electron lớp ngoài cùng.' },
      { q: 'Có hai lọ mất nhãn đựng dung dịch muối ăn và dung dịch đường. Nêu cách phân biệt không cần nếm.', a: 'Thử tính dẫn điện: dung dịch làm đèn sáng là dung dịch muối ăn; dung dịch không làm đèn sáng là dung dịch đường.' },
    ],
  },
  'h7-7': {
    sections: [{ title: 'Kiểm tra công thức bằng quy tắc hoá trị', body: ['Một công thức viết đúng phải thoả mãn quy tắc hoá trị: x × a = y × b.', 'Ví dụ: AlO sai vì 1 × III ≠ 1 × II, sửa thành Al₂O₃; NaCl₂ sai, sửa thành NaCl; CaOH sai, sửa thành Ca(OH)₂ (nhóm nguyên tử có chỉ số lớn hơn 1 phải đặt trong ngoặc).'], scene: 8 }],
    examples: ['Hợp chất của NH₄ (I) với SO₄ (II): (NH₄)₂SO₄ – phân đạm ammonium sulfate.', 'Phần trăm khối lượng nitrogen: urea CO(NH₂)₂ ≈ 46,7%; NH₄NO₃ = 35%; (NH₄)₂SO₄ ≈ 21,2%.'],
    exercises: [
      { q: 'Lập công thức hoá học của hợp chất tạo bởi: Ba và PO₄; Pb (II) và NO₃; Si (IV) và O.', a: 'Ba₃(PO₄)₂; Pb(NO₃)₂; SiO₂.' },
      { q: 'Tính phần trăm khối lượng của Cu trong CuSO₄ (Cu = 64, S = 32, O = 16).', a: 'KLPT = 160 amu; %Cu = 64 : 160 × 100% = 40%.' },
      { q: 'Hợp chất của Mg và O có %Mg = 60%, khối lượng phân tử 40 amu. Tìm công thức.', a: 'Khối lượng Mg = 24 amu → 1 nguyên tử Mg; khối lượng O = 16 amu → 1 nguyên tử O. Công thức MgO.' },
    ],
  },
};

for (const [id, m] of Object.entries(MORE)) {
  const n = NOTES_H7[id];
  if (m.sections) n.sections.push(...m.sections);
  if (m.examples) n.examples.push(...m.examples);
  if (m.facts) n.facts = [...(n.facts ?? []), ...m.facts];
  if (m.exercises) n.exercises.push(...m.exercises);
}
