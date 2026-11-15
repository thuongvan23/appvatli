// KHTN 8 – phần Hoá học: Bài 1 – Bài 12.
import type { LessonNotes } from './types';

export const NOTES_H8: Record<string, LessonNotes> = {
  'h8-1': {
    opener: 'Trong giờ thực hành, cần chú ý những gì khi sử dụng dụng cụ, thiết bị đo và hoá chất để thí nghiệm thành công và an toàn?',
    goals: ['Nhận biết được một số dụng cụ, hoá chất và nêu được quy tắc sử dụng hoá chất an toàn.', 'Nhận biết được các thiết bị điện trong môn KHTN 8 và trình bày được cách sử dụng điện an toàn.'],
    sections: [
      { title: 'Nhận biết hoá chất', body: ['Hoá chất trong phòng thí nghiệm được đựng trong chai, lọ kín (thuỷ tinh, nhựa…) có dán nhãn ghi tên, công thức, khối lượng hoặc thể tích, độ tinh khiết, nhà sản xuất, kí hiệu cảnh báo, điều kiện bảo quản. Dung dịch pha sẵn có ghi nồng độ.', 'Các kí hiệu cảnh báo (hình thoi viền đỏ) cho biết mức độ nguy hiểm: ăn mòn, dễ cháy, độc, chất oxi hoá, khí nén…'], scene: 3 },
      { title: 'Quy tắc sử dụng hoá chất an toàn', body: ['Không dùng hoá chất trong lọ không có nhãn hoặc nhãn mờ. Đọc kĩ nhãn và tìm hiểu tính chất, cảnh báo trước khi dùng.', 'Không dùng tay lấy hoá chất. Chất rắn dạng bột, hạt nhỏ: xúc bằng thìa; dạng hạt to, dây, thanh: gắp bằng panh. Chất lỏng: rót qua phễu hoặc cốc, ống đong có mỏ; lượng nhỏ dùng ống hút nhỏ giọt; rót từ lọ thì hướng nhãn lên trên.', 'Hoá chất dính vào người hoặc bị đổ phải báo giáo viên. Hoá chất thừa không đổ lại vào bình chứa.'], scene: 2 },
      { title: 'Dụng cụ thí nghiệm', body: ['Ống nghiệm, cốc thuỷ tinh, bình tam giác, phễu lọc, ống đong, ống hút nhỏ giọt, kẹp gỗ, đèn cồn.', 'Đun ống nghiệm: kẹp ở khoảng 1/3 ống tính từ miệng; hơ nóng đều rồi đun tại chỗ có hoá chất, ở khoảng 2/3 ngọn lửa từ dưới lên; miệng ống hướng về phía không có người.'], scene: 1 },
      { title: 'Thiết bị đo và thiết bị điện', body: ['Thiết bị đo pH (máy đo, bút đo), huyết áp kế, pin 1,5 V, biến áp nguồn (chuyển 220 V xoay chiều thành điện áp nhỏ), ampe kế, vôn kế, joulemeter.', 'Thiết bị sử dụng điện: biến trở, điốt phát quang (LED), bóng đèn; thiết bị hỗ trợ: công tắc, cầu chì, dây nối.', 'Dùng ampe kế, vôn kế phải chú ý chốt (+), (−) và chọn thang đo lớn hơn giá trị cần đo. LED phải mắc đúng cực và nối tiếp với điện trở bảo vệ.'], scene: 4 },
    ],
    examples: ['Nhãn chai "Hydrochloric acid 37%" có kí hiệu ăn mòn: cần đeo găng tay, kính bảo hộ.', 'Biến áp nguồn chọn đầu ra DC: chốt đỏ là cực dương, chốt đen là cực âm.'],
    facts: ['Bộ nguồn 3 V dùng hai pin 1,5 V mắc nối tiếp; bộ nguồn 6 V dùng bốn pin.'],
    exercises: [
      { q: 'Vì sao khi rót hoá chất lỏng từ lọ phải hướng nhãn lên trên?', a: 'Để giọt hoá chất chảy ra (nếu có) không dính vào nhãn, làm hỏng nhãn.' },
      { q: 'Vì sao không được đặt lại thìa đã dùng vào lọ hoá chất?', a: 'Tránh làm bẩn, làm hỏng hoá chất trong lọ.' },
      { q: 'Khi đo cường độ dòng điện chưa biết, nên chọn thang đo nào trước?', a: 'Chọn thang đo lớn nhất, sau đó giảm dần cho phù hợp để không làm hỏng ampe kế.' },
    ],
  },

  'h8-2': {
    opener: 'Khi đốt nến, một phần nến chảy lỏng, một phần nến bị cháy. Phần nến nào đã bị biến đổi thành chất mới?',
    goals: ['Phân biệt được biến đổi vật lí, biến đổi hoá học; nêu được ví dụ.', 'Nêu được khái niệm phản ứng hoá học, chất đầu và sản phẩm; sự sắp xếp lại nguyên tử trong phản ứng.', 'Chỉ ra được dấu hiệu chứng tỏ có phản ứng hoá học xảy ra.', 'Nêu được khái niệm phản ứng toả nhiệt, thu nhiệt và ứng dụng của phản ứng toả nhiệt.'],
    sections: [
      { title: 'Biến đổi vật lí và biến đổi hoá học', body: ['Biến đổi vật lí: chất chỉ chuyển từ trạng thái này sang trạng thái khác, không tạo thành chất mới (hoà tan, đông đặc, nóng chảy…).', 'Biến đổi hoá học: có sự tạo thành chất mới (đốt cháy nhiên liệu, nung đá vôi, quang hợp…).', 'Thí nghiệm: hỗn hợp bột sắt và lưu huỳnh (tỉ lệ khối lượng 7 : 4) bị nam châm hút. Đun nóng mạnh, hỗn hợp nóng đỏ rực, để nguội thu được chất rắn màu xám đen không bị nam châm hút – đã có chất mới (iron(II) sulfide).'], scene: 2 },
      { title: 'Phản ứng hoá học', body: ['Quá trình biến đổi từ chất này thành chất khác là phản ứng hoá học. Chất ban đầu là chất phản ứng (chất tham gia), chất mới sinh ra là sản phẩm.', 'Phương trình chữ: Iron + Sulfur → Iron(II) sulfide. Trong quá trình phản ứng, lượng chất phản ứng giảm dần, lượng sản phẩm tăng dần. Phản ứng xảy ra hoàn toàn khi ít nhất một chất phản ứng hết.', 'Diễn biến: liên kết trong phân tử chất đầu bị phá vỡ, các nguyên tử liên kết lại theo cách khác tạo phân tử mới; số nguyên tử mỗi nguyên tố không đổi.'], scene: 3 },
      { title: 'Dấu hiệu nhận biết', body: ['Có chất khí tạo thành (Zn + HCl sủi bọt), có chất kết tủa (CuSO₄ + NaOH tạo kết tủa xanh), thay đổi màu sắc, toả nhiệt và phát sáng.', 'BaCl₂ + HCl: không có dấu hiệu nào – không xảy ra phản ứng.'], scene: 4 },
      { title: 'Phản ứng toả nhiệt, thu nhiệt', body: ['Phản ứng toả nhiệt giải phóng năng lượng (dạng nhiệt) ra môi trường: đốt cồn, than, xăng, gas.', 'Phản ứng thu nhiệt nhận năng lượng (dạng nhiệt) trong suốt quá trình: nhiệt phân Cu(OH)₂, nung đá vôi. Khi ngừng cung cấp nhiệt, phản ứng dừng lại.', 'Nhiên liệu hoá thạch (than, xăng, dầu) không vô tận; đốt cháy thải CO₂ và có thể sinh khí CO rất độc khi thiếu không khí.'], scene: 5 },
    ],
    examples: ['Biến đổi vật lí: nước đá tan, phơi nước biển thu muối. Biến đổi hoá học: sắt bị gỉ, thức ăn ôi thiu, nấu cơm cháy.', 'Nhỏ giấm vào đá vôi thấy sủi bọt khí – dấu hiệu có phản ứng hoá học.'],
    facts: ['Khí CO không màu, không mùi, không gây kích ứng nên rất nguy hiểm; chỉ 0,001% – 0,01% CO trong không khí đã gây đau đầu, tức ngực.'],
    exercises: [
      { q: 'Viết phương trình chữ khi than cháy trong không khí. Chất nào là chất phản ứng, chất nào là sản phẩm?', a: 'Carbon + Oxygen → Carbon dioxide. Chất phản ứng: carbon, oxygen; sản phẩm: carbon dioxide.' },
      { q: 'Trong phản ứng giữa oxygen và hydrogen, nếu oxygen hết thì phản ứng có xảy ra nữa không?', a: 'Không. Phản ứng dừng khi một chất phản ứng đã hết.' },
      { q: 'Nung đá vôi thành vôi sống cần cung cấp nhiệt liên tục. Đây là phản ứng toả nhiệt hay thu nhiệt?', a: 'Phản ứng thu nhiệt.' },
    ],
  },

  'h8-3': {
    opener: 'Bằng phép đo thông thường ta chỉ xác định được khối lượng hoặc thể tích. Làm thế nào để biết lượng chất có bao nhiêu nguyên tử, phân tử?',
    goals: ['Nêu được khái niệm mol, tính được khối lượng mol và chuyển đổi giữa số mol và khối lượng.', 'Nêu được khái niệm tỉ khối, so sánh chất khí nặng hay nhẹ hơn chất khí khác.', 'Nêu được thể tích mol của chất khí ở 25 °C, 1 bar và chuyển đổi n = V / 24,79.'],
    sections: [
      { title: 'Mol', body: ['12 gam carbon chứa 6,022·10²³ nguyên tử; số này gọi là số Avogadro (N_A).', 'Mol là lượng chất có chứa N_A nguyên tử hoặc phân tử của chất đó.'], scene: 1 },
      { title: 'Khối lượng mol', body: ['Khối lượng mol M là khối lượng của N_A nguyên tử hoặc phân tử chất đó, tính bằng gam. M (g/mol) bằng về trị số với khối lượng nguyên tử/phân tử (amu).', 'Ví dụ: M(C) = 12 g/mol; M(H₂O) = 18 g/mol; M(CaCO₃) = 100 g/mol.'], scene: 2 },
      { title: 'Thể tích mol chất khí', body: ['Ở cùng điều kiện nhiệt độ, áp suất, 1 mol mọi chất khí chiếm cùng một thể tích. Ở điều kiện chuẩn (25 °C, 1 bar): 24,79 L.', 'Thể tích mol của chất rắn, chất lỏng nhỏ hơn rất nhiều (nước lỏng: 18 cm³/mol).'], scene: 3 },
      { title: 'Tỉ khối chất khí', body: ['d(A/B) = M_A / M_B cho biết khí A nặng hay nhẹ hơn khí B bao nhiêu lần.', 'Không khí (khoảng 20% O₂, 80% N₂) có "khối lượng mol" ≈ 0,2·32 + 0,8·28 ≈ 29 g/mol, nên d(A/kk) = M_A / 29.', 'CO₂ (d ≈ 1,52) nặng hơn không khí, tích tụ ở đáy hang sâu; CH₄ (d ≈ 0,55) nhẹ hơn không khí, bay lên khỏi giếng.'], scene: 4 },
    ],
    formulas: [
      { expr: 'N = n · N_A', note: 'N_A = 6,022·10²³' },
      { expr: 'M = m / n', note: 'm (g), n (mol), M (g/mol)' },
      { expr: 'V = 24,79 · n', note: 'Thể tích khí (L) ở 25 °C, 1 bar' },
      { expr: 'd(A/B) = M_A / M_B ; d(A/kk) = M_A / 29', note: 'Tỉ khối chất khí' },
    ],
    examples: ['1 mol quả cam (đường kính 6 cm) xếp thành hàng dài khoảng 36·10¹⁸ km – gấp khoảng 240 tỉ lần khoảng cách Trái Đất – Mặt Trời.', 'Bóng bay bơm khí helium bay lên vì He nhẹ hơn không khí.'],
    exercises: [
      { q: 'Tính khối lượng mol của chất X, biết 0,4 mol X có khối lượng 23,4 g.', a: 'M = 23,4 / 0,4 = 58,5 g/mol.' },
      { q: 'Tính số mol trong 9 g nước.', a: 'n = 9 / 18 = 0,5 mol.' },
      { q: 'Hỗn hợp 1 mol O₂ và 4 mol N₂ ở 25 °C, 1 bar có thể tích bao nhiêu?', a: 'V = 24,79 × 5 = 123,95 L.' },
      { q: 'Tính số mol khí trong bình 500 mL ở 25 °C, 1 bar.', a: 'n = 0,5 / 24,79 ≈ 0,0202 mol.' },
      { q: 'Khí methane CH₄ nặng hay nhẹ hơn không khí bao nhiêu lần?', a: 'd = 16 / 29 ≈ 0,55: nhẹ hơn không khí khoảng 0,55 lần.' },
    ],
  },

  'h8-4': {
    opener: 'Các dung dịch thường ghi nồng độ như nước muối sinh lí 0,9%, sulfuric acid 1 mol/L… Vậy nồng độ dung dịch là gì?',
    goals: ['Nêu được dung dịch là hỗn hợp lỏng đồng nhất của các chất đã tan trong nhau.', 'Nêu được định nghĩa độ tan, nồng độ phần trăm, nồng độ mol; tính được theo công thức.', 'Tiến hành được thí nghiệm pha một dung dịch theo nồng độ cho trước.'],
    sections: [
      { title: 'Dung dịch, chất tan, dung môi', body: ['Dung dịch là hỗn hợp đồng nhất của chất tan và dung môi (thường là nước). Chất tan có thể ở thể rắn, lỏng hoặc khí.', 'Dung dịch chưa bão hoà: còn hoà tan thêm được chất tan; dung dịch bão hoà: không hoà tan thêm được nữa (ở nhiệt độ, áp suất xác định).', 'Muối ăn, CuSO₄ tan tạo dung dịch; bột gạo, sữa bột không tan tạo hỗn hợp không đồng nhất.'], scene: 1 },
      { title: 'Độ tan', body: ['Độ tan S của một chất trong nước là số gam chất đó tan trong 100 g nước để tạo dung dịch bão hoà ở nhiệt độ, áp suất xác định.', 'Độ tan của hầu hết chất rắn tăng khi nhiệt độ tăng; độ tan của chất khí giảm khi nhiệt độ tăng hoặc áp suất giảm.'], scene: 3 },
      { title: 'Nồng độ phần trăm, nồng độ mol', body: ['Nồng độ phần trăm C% cho biết số gam chất tan có trong 100 g dung dịch. Khối lượng dung dịch = khối lượng chất tan + khối lượng dung môi.', 'Nồng độ mol C_M cho biết số mol chất tan trong 1 lít dung dịch (đơn vị mol/L, kí hiệu M).'], scene: 4 },
      { title: 'Thực hành pha dung dịch NaCl 0,9%', body: ['Tính: m₁ = 0,9 × 100 / 100 = 0,9 g muối; m₂ = 100 − 0,9 = 99,1 g nước.', 'Cân 0,9 g muối khan cho vào cốc, đong 99,1 g (≈ 99,1 mL) nước cất rót vào, khuấy tan.'], scene: 5 },
    ],
    formulas: [
      { expr: 'S = m_ct / m_nước × 100', note: 'g/100 g nước' },
      { expr: 'C% = m_ct / m_dd × 100%', note: 'm_dd = m_ct + m_dung môi' },
      { expr: 'C_M = n_ct / V_dd', note: 'n (mol), V (L)' },
    ],
    examples: ['Nước muối sinh lí 0,9% dùng súc miệng, rửa vết thương.', 'Oresol bù nước và điện giải chứa sodium chloride, potassium chloride, sodium citrate, glucose.', 'Ngày nóng, cá ngoi lên mặt nước vì độ tan của oxygen trong nước giảm.'],
    exercises: [
      { q: 'Ở 25 °C, cho 12 g muối X vào 20 g nước, còn 5 g không tan. Tính độ tan của X.', a: 'm_ct = 7 g; S = 7/20 × 100 = 35 g/100 g nước.' },
      { q: 'Tính khối lượng H₂SO₄ có trong 20 g dung dịch H₂SO₄ 98%.', a: 'm = 20 × 98/100 = 19,6 g.' },
      { q: 'Hoà tan 1,35 g CuCl₂ được 50 mL dung dịch. Tính nồng độ mol.', a: 'n = 1,35/135 = 0,01 mol; C_M = 0,01/0,05 = 0,2 M.' },
      { q: 'Trộn 2 L urea 0,02 M với 3 L urea 0,1 M. Tính nồng độ mol dung dịch thu được.', a: 'n = 0,04 + 0,3 = 0,34 mol; C_M = 0,34/5 = 0,068 M – nằm giữa 0,02 M và 0,1 M.' },
    ],
  },

  'h8-5': {
    opener: 'Khi phản ứng xảy ra, lượng chất phản ứng giảm dần, lượng sản phẩm tăng dần. Tổng khối lượng các chất trước và sau phản ứng có thay đổi không?',
    goals: ['Tiến hành thí nghiệm chứng minh khối lượng được bảo toàn; phát biểu định luật bảo toàn khối lượng.', 'Nêu được khái niệm phương trình hoá học, các bước lập và ý nghĩa của phương trình hoá học.'],
    sections: [
      { title: 'Định luật bảo toàn khối lượng', body: ['Lomonosov và Lavoisier: "Trong một phản ứng hoá học, tổng khối lượng của các chất sản phẩm bằng tổng khối lượng các chất tham gia phản ứng".', 'Giải thích: trong phản ứng chỉ có liên kết giữa các nguyên tử thay đổi, số nguyên tử mỗi nguyên tố giữ nguyên.', 'Phản ứng có chất khí thoát ra (CaCO₃ + HCl) trong cốc hở: số chỉ cân giảm vì khí bay đi; nếu bịt kín thì khối lượng không đổi.'], scene: 1 },
      { title: 'Áp dụng', body: ['m(barium chloride) + m(sodium sulfate) = m(barium sulfate) + m(sodium chloride). Biết khối lượng của (n − 1) chất sẽ tính được khối lượng chất còn lại.', 'Ví dụ: 20,8 + 14,2 − 23,3 = 11,7 g sodium chloride.'], scene: 2 },
      { title: 'Lập phương trình hoá học', body: ['Bước 1: viết sơ đồ phản ứng (Al + O₂ ---> Al₂O₃). Bước 2: cân bằng số nguyên tử mỗi nguyên tố hai vế bằng cách đặt hệ số. Bước 3: viết phương trình 4Al + 3O₂ → 2Al₂O₃.', 'Lưu ý: hệ số viết ngang kí hiệu; không thay đổi chỉ số trong công thức (viết 3O₂, không viết 6O); nhóm nguyên tử không đổi (SO₄, OH…) coi như một "nguyên tố" để cân bằng.'], scene: 4 },
      { title: 'Ý nghĩa của phương trình hoá học', body: ['Cho biết tỉ lệ số nguyên tử, phân tử (cũng là tỉ lệ số mol) giữa các chất: 4Al + 3O₂ → 2Al₂O₃ có tỉ lệ 4 : 3 : 2.', 'Từ đó suy ra tỉ lệ khối lượng: (27·4) : (32·3) : (102·2) = 9 : 8 : 17.'], scene: 5 },
    ],
    formulas: [{ expr: 'Σ m(chất tham gia) = Σ m(sản phẩm)', note: 'Định luật bảo toàn khối lượng' }],
    examples: ['Quên đậy nắp lọ vôi sống CaO: CaO hấp thụ CO₂ và hơi nước trong không khí nên khối lượng lọ tăng.', 'Xỉ than nhẹ hơn than tổ ong vì carbon đã cháy thành khí CO₂ bay đi.'],
    exercises: [
      { q: 'Lập phương trình: Fe + O₂ ---> Fe₃O₄', a: '3Fe + 2O₂ → Fe₃O₄' },
      { q: 'Lập phương trình: Al + HCl ---> AlCl₃ + H₂', a: '2Al + 6HCl → 2AlCl₃ + 3H₂' },
      { q: 'Lập phương trình: Al₂(SO₄)₃ + NaOH ---> Al(OH)₃ + Na₂SO₄', a: 'Al₂(SO₄)₃ + 6NaOH → 2Al(OH)₃ + 3Na₂SO₄' },
      { q: 'Lập phương trình: CaCO₃ + HCl ---> CaCl₂ + CO₂ + H₂O', a: 'CaCO₃ + 2HCl → CaCl₂ + CO₂ + H₂O' },
      { q: 'Từ 5,6 g sắt tạo ra tối đa bao nhiêu gam gỉ sắt Fe₂O₃?', a: '4Fe + 3O₂ → 2Fe₂O₃; n(Fe) = 0,1 mol → n(Fe₂O₃) = 0,05 mol → m = 0,05 × 160 = 8 g.' },
    ],
  },

  'h8-6': {
    opener: 'Bằng cách nào có thể tính được lượng chất tham gia và lượng sản phẩm trong quá trình sản xuất?',
    goals: ['Tính được lượng chất trong phương trình hoá học theo số mol, khối lượng hoặc thể tích (25 °C, 1 bar).', 'Nêu được khái niệm hiệu suất phản ứng và tính được hiệu suất.'],
    sections: [
      { title: 'Các bước tính theo phương trình', body: ['1) Đổi lượng chất đề bài cho ra số mol (n = m/M hoặc n = V/24,79). 2) Dựa vào tỉ lệ số mol trong phương trình tìm số mol chất cần tính. 3) Đổi ra khối lượng (m = n·M) hoặc thể tích (V = 24,79·n).', 'Ví dụ: 0,65 g Zn + HCl: n(Zn) = 0,01 mol → n(ZnCl₂) = 0,01 mol → m = 0,01 × 136 = 1,36 g.'], scene: 1 },
      { title: 'Hiệu suất phản ứng', body: ['Thực tế lượng sản phẩm thường nhỏ hơn lí thuyết: lượng chất phản ứng dùng thực tế lớn hơn lí thuyết, lượng sản phẩm thu được thực tế nhỏ hơn lí thuyết.', 'H = m(thực tế) / m(lí thuyết) × 100% = n(thực tế) / n(lí thuyết) × 100%.', 'Ví dụ: 8 g Fe₂O₃ + H₂ dư thu được 4,2 g Fe. Lí thuyết: 0,05 mol Fe₂O₃ → 0,1 mol Fe = 5,6 g. H = 4,2/5,6 × 100% = 75%.'], scene: 3 },
    ],
    formulas: [
      { expr: 'H = m′ / m × 100% = n′ / n × 100%', note: "m, n: lí thuyết; m′, n′: thực tế" },
      { expr: 'n = m / M ; n = V / 24,79', note: 'Đổi khối lượng, thể tích khí ra số mol' },
    ],
    examples: ['Trong sản xuất, tính trước lượng nguyên liệu cần dùng để thu được lượng sản phẩm mong muốn, có tính đến hiệu suất.'],
    exercises: [
      { q: 'Cần bao nhiêu mol Fe để thu được 1,5 mol H₂ (Fe + 2HCl → FeCl₂ + H₂)?', a: '1,5 mol Fe.' },
      { q: 'Tính thể tích H₂ (25 °C, 1 bar) thu được khi cho 0,65 g Zn tác dụng hết với HCl.', a: 'n(H₂) = 0,01 mol; V = 0,2479 L.' },
      { q: 'Mg + H₂SO₄ thu được 0,02 mol MgSO₄. Tính thể tích H₂.', a: 'n(H₂) = 0,02 mol; V = 0,4958 L.' },
      { q: 'Nung 10 g CaCO₃ với hiệu suất 80%. Tính khối lượng CaO thu được.', a: 'Lí thuyết 0,1 mol CaO = 5,6 g; thực tế 5,6 × 80% = 4,48 g.' },
    ],
  },

  'h8-7': {
    opener: 'Có phản ứng xảy ra rất nhanh như nổ, cháy; có phản ứng rất chậm như sắt gỉ. Đại lượng nào đặc trưng cho sự nhanh chậm của phản ứng? Yếu tố nào ảnh hưởng?',
    goals: ['Nêu được khái niệm tốc độ phản ứng.', 'Trình bày được các yếu tố ảnh hưởng đến tốc độ phản ứng và ứng dụng.', 'Nêu được khái niệm chất xúc tác.'],
    sections: [
      { title: 'Tốc độ phản ứng', body: ['Tốc độ phản ứng đặc trưng cho sự nhanh, chậm của phản ứng hoá học. Đốt cồn xảy ra rất nhanh; sắt gỉ trong không khí ẩm xảy ra chậm.', 'Có thể so sánh tốc độ qua sự thay đổi thể tích khí, khối lượng chất rắn hoặc nồng độ chất tan trong cùng một khoảng thời gian.'], scene: 1 },
      { title: 'Các yếu tố ảnh hưởng', body: ['Nồng độ: đinh sắt trong HCl 1 M sủi bọt nhanh hơn trong HCl 0,1 M.', 'Nhiệt độ: viên C sủi tan nhanh trong nước nóng hơn nước lạnh.', 'Diện tích bề mặt tiếp xúc: đá vôi dạng bột phản ứng với HCl nhanh hơn dạng viên.', 'Khi tăng nồng độ, nhiệt độ hoặc diện tích bề mặt tiếp xúc, tốc độ phản ứng tăng.'], scene: 1 },
      { title: 'Chất xúc tác', body: ['MnO₂ làm tăng tốc độ phân huỷ H₂O₂; enzyme amylase trong nước bọt thúc đẩy chuyển hoá tinh bột thành đường.', 'Chất xúc tác làm tăng tốc độ phản ứng nhưng sau phản ứng vẫn giữ nguyên khối lượng và tính chất hoá học.'], scene: 4 },
    ],
    examples: ['Đập nhỏ đá vôi khi nung vôi; bảo quản thực phẩm trong tủ lạnh.', 'Ống xả ô tô có bộ chuyển đổi xúc tác biến CO thành CO₂, các oxide của nitrogen thành nitrogen.', 'Than cháy trong bình oxygen nhanh hơn trong không khí do nồng độ oxygen lớn hơn.'],
    exercises: [
      { q: 'Bảo quản thực phẩm trong tủ lạnh là tác động vào yếu tố nào?', a: 'Nhiệt độ – nhiệt độ thấp làm chậm tốc độ các phản ứng gây hỏng thực phẩm.' },
      { q: 'Trong sản xuất sulfuric acid, 2SO₂ + O₂ → 2SO₃ xảy ra nhanh hơn khi có vanadium(V) oxide. V₂O₅ đóng vai trò gì? Khối lượng của nó sau phản ứng có thay đổi không?', a: 'V₂O₅ là chất xúc tác; khối lượng không thay đổi sau phản ứng.' },
    ],
  },

  'h8-8': {
    opener: 'Tại sao giấm ăn, nước chanh đều có vị chua và dùng để loại bỏ cặn trong dụng cụ đun nước?',
    goals: ['Nêu được khái niệm acid (tạo ra ion H⁺).', 'Tiến hành thí nghiệm của hydrochloric acid (đổi màu chất chỉ thị, phản ứng với kim loại), viết phương trình và nhận xét tính chất của acid.', 'Trình bày được ứng dụng của HCl, H₂SO₄, CH₃COOH.'],
    sections: [
      { title: 'Khái niệm acid', body: ['Acid là những hợp chất trong phân tử có nguyên tử hydrogen liên kết với gốc acid. Khi tan trong nước, acid tạo ra ion H⁺.', 'Ví dụ: HCl (gốc –Cl), HNO₃ (gốc –NO₃), H₂SO₄ (gốc =SO₄).'], scene: 1 },
      { title: 'Tính chất hoá học', body: ['Dung dịch acid làm giấy quỳ tím chuyển sang màu đỏ.', 'Dung dịch acid tác dụng với một số kim loại (Mg, Fe, Zn…) tạo muối và giải phóng khí hydrogen: Mg + H₂SO₄ → MgSO₄ + H₂. Đồng không tác dụng với dung dịch HCl, H₂SO₄ loãng.'], scene: 2 },
      { title: 'Một số acid thông dụng', body: ['Sulfuric acid: chất lỏng sánh, không bay hơi, nặng gần gấp đôi nước, tan vô hạn và toả rất nhiều nhiệt. Tuyệt đối không tự ý pha loãng acid đặc.', 'Hydrochloric acid: dung dịch không màu, có trong dịch vị dạ dày.', 'Acetic acid: chất lỏng không màu, vị chua; giấm ăn chứa 2 – 5%.'], scene: 4 },
    ],
    examples: ['Dùng giấm ăn hoặc nước chanh để loại bỏ cặn trong ấm đun nước.', 'Dùng chất tẩy rửa có acid mạnh cần đeo găng tay, không để dính vào da, quần áo.'],
    exercises: [
      { q: 'Cho biết gốc acid trong H₂SO₄, HCl, HNO₃.', a: '=SO₄ (sulfate), –Cl (chloride), –NO₃ (nitrate).' },
      { q: 'Viết phương trình hoá học khi cho dung dịch HCl tác dụng với Mg.', a: 'Mg + 2HCl → MgCl₂ + H₂↑' },
      { q: 'Viết phương trình phản ứng của HCl với Fe, Zn.', a: 'Fe + 2HCl → FeCl₂ + H₂↑; Zn + 2HCl → ZnCl₂ + H₂↑' },
    ],
  },

  'h8-9': {
    opener: 'Tại sao khi bị ong hoặc kiến đốt, người ta thường bôi vôi vào vết đốt?',
    goals: ['Nêu được khái niệm base (tạo ra ion OH⁻); kiềm là các hydroxide tan tốt trong nước.', 'Tiến hành thí nghiệm của base (đổi màu chất chỉ thị, phản ứng với acid tạo muối).', 'Tra bảng tính tan để biết hydroxide thuộc loại kiềm hay base không tan.', 'Nêu được thang pH; đo pH một số dung dịch; liên hệ pH trong dạ dày, máu, nước mưa, đất.'],
    sections: [
      { title: 'Khái niệm base', body: ['Base là những hợp chất trong phân tử có nguyên tử kim loại liên kết với nhóm hydroxide (–OH). Khi tan trong nước, base tạo ra ion OH⁻. Số nhóm –OH bằng hoá trị của kim loại.', 'Tên base: tên kim loại (kèm hoá trị nếu kim loại có nhiều hoá trị) + hydroxide. Ví dụ: Fe(OH)₂ iron(II) hydroxide; Fe(OH)₃ iron(III) hydroxide.', 'Phần lớn base không tan; một số tan tạo dung dịch kiềm như KOH, NaOH, Ba(OH)₂.'], scene: 1 },
      { title: 'Tính chất hoá học', body: ['Dung dịch base làm giấy quỳ tím chuyển màu xanh, phenolphthalein không màu chuyển màu hồng.', 'Base tác dụng với acid tạo muối và nước – phản ứng trung hoà: Ca(OH)₂ + H₂SO₄ → CaSO₄ + 2H₂O. Nhỏ từ từ HCl vào NaOH có phenolphthalein, màu hồng nhạt dần rồi mất.'], scene: 2 },
      { title: 'Thang pH', body: ['Thang pH gồm các giá trị từ 1 đến 14: pH < 7 môi trường acid, pH = 7 trung tính, pH > 7 môi trường base.', 'pH còn dùng để so sánh độ mạnh của acid (base) cùng nồng độ: HCl 0,1 M có pH = 1; CH₃COOH 0,1 M có pH ≈ 3 nên HCl mạnh hơn.', 'Xác định pH bằng chất chỉ thị vạn năng (giấy pH) hoặc máy đo pH, bút đo pH.'], scene: 5 },
    ],
    examples: ['Nọc ong, kiến chứa acid; bôi vôi tôi (Ca(OH)₂) giúp giảm đau do phản ứng trung hoà.', 'Rắc vôi bột (CaO) lên ruộng để khử chua: CaO + H₂O → Ca(OH)₂, Ca(OH)₂ trung hoà acid trong đất.', 'NaOH dùng sản xuất nhôm, xà phòng, giấy, tơ nhân tạo, xử lí nước.'],
    facts: ['pH máu người khoảng 7,35 – 7,45; dịch vị dạ dày khoảng 1,5 – 3,5; nước mưa bình thường khoảng 5,6.'],
    exercises: [
      { q: 'Có hai ống nghiệm không nhãn đựng dung dịch NaOH và HCl. Nêu cách nhận biết.', a: 'Nhúng giấy quỳ tím: ống làm quỳ hoá xanh là NaOH, hoá đỏ là HCl (hoặc nhỏ phenolphthalein: ống hoá hồng là NaOH).' },
      { q: 'Dựa vào bảng tính tan, base nào là kiềm: KOH, NaOH, Mg(OH)₂, Ba(OH)₂, Cu(OH)₂?', a: 'Kiềm: KOH, NaOH, Ba(OH)₂. Base không tan: Mg(OH)₂, Cu(OH)₂.' },
      { q: 'Nêu cách kiểm tra đất trồng có bị chua không.', a: 'Lấy mẫu đất hoà vào nước cất, để lắng rồi đo pH nước lọc bằng giấy pH hoặc bút đo pH; pH < 7 (thấp) là đất chua.' },
    ],
  },

  'h8-10': {
    opener: 'Tại sao vôi sống (CaO) lại được sử dụng để khử chua đất trồng trọt?',
    goals: ['Nêu được khái niệm oxide và phân loại oxide theo khả năng phản ứng với acid/base.', 'Viết được phương trình tạo oxide từ kim loại, phi kim với oxygen.', 'Tiến hành thí nghiệm oxide kim loại phản ứng với acid; oxide phi kim phản ứng với base.'],
    sections: [
      { title: 'Khái niệm, phân loại', body: ['Oxide là hợp chất của hai nguyên tố, trong đó có một nguyên tố là oxygen. Theo thành phần: oxide kim loại (BaO, ZnO, Al₂O₃) và oxide phi kim (CO₂, SO₃, P₂O₅).', 'Kim loại + oxygen → oxide kim loại: 2Ba + O₂ → 2BaO. Phi kim + oxygen → oxide phi kim: C + O₂ → CO₂.', 'Gọi tên: tên nguyên tố (kèm hoá trị nếu có nhiều hoá trị) + oxide (Fe₂O₃: iron(III) oxide); có thể dùng tiền tố mono, di, tri… (CO: carbon monoxide; CO₂: carbon dioxide).'], scene: 1 },
      { title: 'Oxide acid', body: ['Oxide acid tác dụng với dung dịch base tạo muối và nước.', 'Sục CO₂ vào nước vôi trong: ban đầu vẩn đục do tạo CaCO₃ không tan: Ca(OH)₂ + CO₂ → CaCO₃ + H₂O. Sục tiếp, kết tủa tan dần.'], scene: 3 },
      { title: 'Oxide base', body: ['Oxide base tác dụng với dung dịch acid tạo muối và nước. CuO (đen) tan trong H₂SO₄ tạo dung dịch xanh: CuO + H₂SO₄ → CuSO₄ + H₂O.', 'Phản ứng tẩy gỉ sắt: Fe₂O₃ + 6HCl → 2FeCl₃ + 3H₂O.'], scene: 4 },
      { title: 'Oxide lưỡng tính, oxide trung tính', body: ['Oxide lưỡng tính tác dụng được với cả dung dịch acid và dung dịch base: Al₂O₃, ZnO.', 'Oxide trung tính (không tạo muối) không tác dụng với acid, base: CO, NO.'], scene: 1 },
    ],
    examples: ['CO₂ là khí nhà kính chủ yếu; SO₂, NO₂ trong khí thải nhà máy gây mưa acid.', 'Hố vôi tôi để lâu có lớp váng trắng: Ca(OH)₂ tác dụng với CO₂ trong không khí tạo CaCO₃.'],
    exercises: [
      { q: 'Viết phương trình SO₂ tác dụng với dung dịch NaOH.', a: 'SO₂ + 2NaOH → Na₂SO₃ + H₂O' },
      { q: 'Hoàn thành: … + O₂ → Al₂O₃; P + … → P₂O₅; S + … → SO₂; Mg + O₂ → …', a: '4Al + 3O₂ → 2Al₂O₃ (aluminium oxide); 4P + 5O₂ → 2P₂O₅ (diphosphorus pentoxide); S + O₂ → SO₂ (sulfur dioxide); 2Mg + O₂ → 2MgO (magnesium oxide).' },
      { q: 'Trong các oxide CaO, Fe₂O₃, SO₃, CO₂, CO, oxide nào tác dụng với HCl? Với NaOH?', a: 'Với HCl: CaO, Fe₂O₃ (oxide base). Với NaOH: SO₃, CO₂ (oxide acid). CO là oxide trung tính.' },
    ],
  },

  'h8-11': {
    opener: 'Muối có nhiều ứng dụng: làm phân bón, bảo quản thực phẩm, làm bột nở… Muối có những tính chất hoá học nào và được điều chế như thế nào?',
    goals: ['Nêu được khái niệm muối, đọc tên một số muối và trình bày phương pháp điều chế muối.', 'Chỉ ra muối tan và muối không tan từ bảng tính tan.', 'Tiến hành thí nghiệm muối phản ứng với kim loại, acid, base, muối; rút ra tính chất hoá học của muối.', 'Trình bày mối quan hệ giữa acid, base, oxide và muối.'],
    sections: [
      { title: 'Khái niệm, tên gọi', body: ['Muối là hợp chất được tạo thành từ sự thay thế ion H⁺ của acid bằng ion kim loại hoặc ion ammonium (NH₄⁺).', 'Tên muối: tên kim loại (kèm hoá trị nếu kim loại có nhiều hoá trị) + tên gốc acid. Ví dụ: Na₂SO₄ sodium sulfate; NH₄Cl ammonium chloride; CuSO₄ copper(II) sulfate.'], scene: 3 },
      { title: 'Tính chất hoá học', body: ['Dung dịch muối + kim loại → muối mới + kim loại mới: Fe + CuSO₄ → FeSO₄ + Cu.', 'Muối + dung dịch acid → muối mới + acid mới: BaCl₂ + H₂SO₄ → BaSO₄↓ + 2HCl; CaCO₃ + 2HCl → CaCl₂ + CO₂ + H₂O.', 'Dung dịch muối + dung dịch base → muối mới + base mới: CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄.', 'Hai dung dịch muối → hai muối mới: BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl.', 'Phản ứng trao đổi trong dung dịch chỉ xảy ra khi sản phẩm có ít nhất một chất không tan hoặc chất khí.'], scene: 1 },
      { title: 'Điều chế muối', body: ['Acid + base: HCl + NaOH → NaCl + H₂O. Acid + oxide base: 2HNO₃ + CuO → Cu(NO₃)₂ + H₂O. Acid + muối: H₂SO₄ + BaCl₂ → BaSO₄ + 2HCl. Oxide acid + base: CO₂ + 2NaOH → Na₂CO₃ + H₂O. Muối + muối: NaCl + AgNO₃ → AgCl + NaNO₃.', 'Muối ăn được sản xuất từ nước biển (phơi nắng cho bay hơi) hoặc từ mỏ muối.'], scene: 4 },
    ],
    examples: ['Na₂CO₃ + Ca(NO₃)₂ tạo kết tủa CaCO₃; KCl + Ca(NO₃)₂ không phản ứng vì không tạo chất kết tủa hay chất khí.'],
    exercises: [
      { q: 'Viết công thức: potassium sulfate, sodium hydrogencarbonate, calcium hydrogenphosphate, magnesium sulfate.', a: 'K₂SO₄, NaHCO₃, CaHPO₄, MgSO₄.' },
      { q: 'Gọi tên: AlCl₃, KCl, Al₂(SO₄)₃, NH₄NO₃, NaHCO₃.', a: 'Aluminium chloride, potassium chloride, aluminium sulfate, ammonium nitrate, sodium hydrogencarbonate.' },
      { q: 'Cặp chất nào phản ứng: BaCl₂ với Na₂CO₃, KCl, Na₂SO₄, NaNO₃?', a: 'BaCl₂ + Na₂CO₃ → BaCO₃↓ + 2NaCl; BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl. Không phản ứng với KCl, NaNO₃.' },
      { q: 'Viết phương trình tạo thành muối KCl và MgSO₄.', a: 'KOH + HCl → KCl + H₂O; Mg + H₂SO₄ → MgSO₄ + H₂ (hoặc MgO + H₂SO₄ → MgSO₄ + H₂O).' },
    ],
  },

  'h8-12': {
    opener: 'Phân bón hoá học là gì? Tại sao cần bón phân cho cây trồng?',
    goals: ['Trình bày được vai trò của phân bón (N, P, K) đối với cây trồng.', 'Nêu được thành phần và tác dụng cơ bản của một số loại phân bón hoá học.', 'Trình bày được ảnh hưởng của việc sử dụng phân bón đến môi trường, sức khoẻ; đề xuất biện pháp giảm thiểu ô nhiễm.'],
    sections: [
      { title: 'Vai trò các nguyên tố dinh dưỡng', body: ['Cây cần nguyên tố đa lượng (N, P, K), trung lượng (Ca, Mg…) và vi lượng (Zn, Mn, Fe, Cu…).', 'Nitrogen: giúp cây sinh trưởng, phát triển, điều tiết trao đổi chất. Phosphorus: giúp cây nở hoa, đậu quả, phát triển rễ. Potassium: chuyển hoá năng lượng, cây ra nhiều nhánh.', 'Phân bón hoá học là những hoá chất chứa nguyên tố dinh dưỡng, bón cho cây nhằm nâng cao năng suất.'], scene: 1 },
      { title: 'Một số loại phân bón', body: ['Phân đạm: NaNO₃, Ca(NO₃)₂, NH₄NO₃, urea (NH₂)₂CO – đều dễ tan.', 'Phân lân: lân nung chảy (Ca₃(PO₄)₂, thích hợp đất chua), superphosphate đơn, superphosphate kép.', 'Phân kali: KCl, K₂SO₄; tro bếp, phân dơi.', 'Phân NPK: hỗn hợp chứa N, P, K, có thể thêm trung lượng, vi lượng.'], scene: 2 },
      { title: 'Sử dụng phân bón đúng cách', body: ['Phân bón dư thừa bị rửa trôi, ngấm vào nước ngầm, sông hồ gây ô nhiễm; có thể tạo khí ammonia, nitrogen oxide gây ô nhiễm không khí; gây tồn dư hoá chất trong thực phẩm.', 'Bón phân theo quy tắc "4 đúng": đúng liều, đúng loại, đúng lúc, đúng nơi. Tăng cường phân bón hữu cơ.', 'Khi bón phân cần mặc đồ bảo hộ, đeo khẩu trang, găng tay; bảo quản phân bón xa trẻ em và nơi ăn uống.'], scene: 3 },
    ],
    examples: ['Super lân phù hợp với đất không chua hoặc chua ít (pH 5,6 – 6,5); lân nung chảy thích hợp với đất chua.'],
    exercises: [
      { q: 'Cho biết nguyên tố dinh dưỡng trong phân đạm, lân, kali, NPK.', a: 'Đạm: N; lân: P; kali: K; NPK: N, P, K.' },
      { q: 'Tại sao cần bón phân theo quy tắc "4 đúng"?', a: 'Để cây hấp thụ tốt, tránh lãng phí, tránh dư thừa phân bón gây ô nhiễm đất, nước, không khí và tồn dư hoá chất trong nông sản.' },
    ],
  },
};
