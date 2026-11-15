// KHTN 9 – phần Hoá học: Bài 1 (phần hoá học), Bài 18 – Bài 35.
import type { LessonNotes } from './types';

export const NOTES_H9: Record<string, LessonNotes> = {
  'h9-1': {
    opener: 'Làm thế nào lựa chọn được dụng cụ, hoá chất phù hợp để thực hiện thí nghiệm thành công và an toàn?',
    goals: ['Nhận biết được một số dụng cụ và hoá chất sử dụng trong dạy học KHTN 9 (phần chất và sự biến đổi chất).', 'Đề xuất và thực hiện được thí nghiệm chứng minh tính chất hoá học chung của acid hoặc base.'],
    sections: [
      { title: 'Dụng cụ thí nghiệm về chất', body: ['Bát sứ: trộn, đun nóng chảy chất rắn, cô đặc dung dịch, thực hiện phản ứng toả nhiệt mạnh.', 'Phễu: rót chất lỏng, lọc; phễu chiết: tách chất lỏng không tan vào nhau. Bình cầu: đựng, pha chế, đun nóng, chưng cất. Lưới tản nhiệt: phân tán nhiệt khi đun.'], scene: 1 },
      { title: 'Hoá chất cơ bản', body: ['Kim loại (Na, Fe, Cu…), phi kim (S, I₂…), oxide (CuO, CaO, MnO₂…), acid (HCl, H₂SO₄…), base (NaOH, NH₃…), chất hữu cơ (C₂H₅OH, C₆H₁₂O₆…), chất chỉ thị (giấy pH, phenolphthalein…).', 'Hoá chất bảo quản trong chai lọ có nắp, có nhãn. Chất dễ bị phân huỷ bởi ánh sáng (KMnO₄, AgNO₃) đựng trong lọ tối màu.'], scene: 1 },
      { title: 'Thiết kế thí nghiệm', body: ['Tính chất chung của acid: làm quỳ hoá đỏ; tác dụng với kim loại (Zn), oxide base (CuO), base (NaOH), muối (CaCO₃).', 'Tính chất chung của base (kiềm): làm quỳ hoá xanh, phenolphthalein hoá hồng; tác dụng với acid; tác dụng với muối (CuSO₄).'], scene: 4 },
    ],
    examples: ['Natri được ngâm trong dầu hoả; acid đặc phải để nơi riêng, học sinh không tự ý pha loãng.'],
    exercises: [
      { q: 'Khi cần đun nóng dung dịch trong cốc thuỷ tinh, tại sao phải dùng lưới tản nhiệt?', a: 'Để nhiệt phân bố đều lên đáy cốc, tránh cốc bị nóng cục bộ gây nứt vỡ.' },
      { q: 'Đề xuất thí nghiệm chứng minh dung dịch HCl có tính chất của acid.', a: 'Nhỏ HCl vào quỳ tím (hoá đỏ); cho HCl vào kẽm (sủi bọt H₂); vào CuO (tan, dung dịch xanh); vào NaOH có phenolphthalein (mất màu hồng); vào đá vôi (sủi bọt CO₂).' },
    ],
  },

  'h9-18': {
    opener: 'Thép làm khung công trình, đồng làm dây điện, vàng làm đồ trang sức… Các ứng dụng đó dựa trên những tính chất nào của kim loại?',
    goals: ['Nêu được tính chất vật lí của kim loại.', 'Trình bày được tính chất hoá học cơ bản của kim loại: tác dụng với phi kim, nước, dung dịch HCl, dung dịch muối.', 'Mô tả được một số khác biệt về tính chất giữa các kim loại thông dụng (nhôm, sắt, vàng…).'],
    sections: [
      { title: 'Tính chất vật lí', body: ['Kim loại có tính dẻo, tính dẫn điện, dẫn nhiệt và ánh kim.', 'Vàng dẻo nhất; bạc dẫn điện, dẫn nhiệt tốt nhất; tungsten có nhiệt độ nóng chảy cao nhất; thuỷ ngân nóng chảy thấp nhất (thể lỏng ở nhiệt độ thường).'], scene: 1 },
      { title: 'Tác dụng với phi kim', body: ['Với oxygen: hầu hết kim loại tạo oxide: 3Fe + 2O₂ → Fe₃O₄; 4Al + 3O₂ → 2Al₂O₃. Vàng không phản ứng với oxygen.', 'Với chlorine, lưu huỳnh: tạo muối chloride, sulfide: 2Na + Cl₂ → 2NaCl; 2Fe + 3Cl₂ → 2FeCl₃; Cu + Cl₂ → CuCl₂; 2Al + 3S → Al₂S₃.'], scene: 2 },
      { title: 'Tác dụng với nước', body: ['K, Na, Ca… tác dụng với nước ở nhiệt độ thường tạo hydroxide và khí hydrogen, toả nhiều nhiệt: 2Na + 2H₂O → 2NaOH + H₂.', 'Zn, Fe… tác dụng với hơi nước ở nhiệt độ cao tạo oxide và hydrogen: Zn + H₂O → ZnO + H₂. Cu, Ag, Au… không tác dụng với nước.'], scene: 3 },
      { title: 'Tác dụng với dung dịch acid, dung dịch muối', body: ['Một số kim loại tác dụng với dung dịch HCl tạo muối và H₂: Fe + 2HCl → FeCl₂ + H₂; 2Al + 6HCl → 2AlCl₃ + 3H₂. Cu, Ag, Au không tác dụng.', 'Kim loại mạnh hơn đẩy kim loại yếu hơn ra khỏi dung dịch muối: Fe + CuSO₄ → FeSO₄ + Cu.'], scene: 4 },
    ],
    examples: ['Đồ trang sức bằng vàng để lâu vẫn sáng vì vàng không bị oxi hoá; nhôm, kẽm, crom có lớp oxide mỏng bền bảo vệ.'],
    exercises: [
      { q: 'Viết phương trình phản ứng của kẽm, đồng với oxygen.', a: '2Zn + O₂ → 2ZnO; 2Cu + O₂ → 2CuO.' },
      { q: 'Ở nhiệt độ cao, hơi nước tác dụng với sắt tạo Fe₃O₄. Viết phương trình.', a: '3Fe + 4H₂O →(t°) Fe₃O₄ + 4H₂' },
      { q: 'Tính lượng kẽm và thể tích dung dịch HCl 1 M cần để điều chế 250 mL khí H₂ (đkc).', a: 'n(H₂) = 0,25/24,79 ≈ 0,0101 mol; m(Zn) ≈ 0,0101 × 65 ≈ 0,66 g; n(HCl) ≈ 0,0202 mol → V ≈ 20,2 mL.' },
    ],
  },

  'h9-19': {
    opener: 'Đồ vật làm từ sắt, đồng, vàng, bạc… đồ vật nào dễ bị gỉ? Từ đó nhận xét khả năng tham gia phản ứng của các kim loại.',
    goals: ['Tiến hành (hoặc mô tả) thí nghiệm kim loại tiếp xúc với nước, hydrochloric acid…', 'Nêu được dãy hoạt động hoá học (K, Na, Ca, Mg, Al, Zn, Fe, Pb, H, Cu, Ag, Au).', 'Trình bày được ý nghĩa của dãy hoạt động hoá học.'],
    sections: [
      { title: 'Xây dựng dãy hoạt động', body: ['Na tác dụng mạnh với nước; Fe, Cu không tác dụng với nước ở điều kiện thường → Na hoạt động mạnh hơn Fe, Cu.', 'Fe tác dụng với HCl giải phóng H₂, Cu không → Fe hoạt động mạnh hơn H, H mạnh hơn Cu.', 'Cu đẩy được Ag ra khỏi dung dịch AgNO₃ → Cu mạnh hơn Ag. Thứ tự: Na, Fe, H, Cu, Ag.'], scene: 1 },
      { title: 'Dãy hoạt động hoá học', body: ['K, Na, Ca, Mg, Al, Zn, Fe, Pb, H, Cu, Ag, Au – từ trái sang phải mức độ hoạt động giảm dần.'], scene: 4 },
      { title: 'Ý nghĩa', body: ['Kim loại hoạt động mạnh (K, Na, Ca…) tác dụng với nước ở điều kiện thường, giải phóng H₂.', 'Kim loại đứng trước H tác dụng với dung dịch acid (HCl, H₂SO₄ loãng), giải phóng H₂.', 'Kim loại đứng trước (trừ K, Na, Ca…) đẩy được kim loại đứng sau ra khỏi dung dịch muối.'], scene: 4 },
    ],
    examples: ['Đồ bằng sắt dễ gỉ; đồ bằng bạc, vàng bền trong không khí.'],
    exercises: [
      { q: 'Dự đoán hiện tượng khi cho Mg, Ag, Zn vào dung dịch H₂SO₄ loãng.', a: 'Mg, Zn tan, sủi bọt khí H₂ (Mg mạnh hơn): Mg + H₂SO₄ → MgSO₄ + H₂; Zn + H₂SO₄ → ZnSO₄ + H₂. Ag không phản ứng.' },
      { q: 'Cho viên kẽm vào dung dịch AgNO₃.', a: 'Có kim loại màu xám bạc bám trên viên kẽm: Zn + 2AgNO₃ → Zn(NO₃)₂ + 2Ag.' },
      { q: 'Cho Cu, Fe, Ca vào nước cất.', a: 'Chỉ Ca phản ứng: Ca + 2H₂O → Ca(OH)₂ + H₂↑. Cu, Fe không phản ứng ở điều kiện thường.' },
    ],
  },

  'h9-20': {
    opener: 'Kim loại được tách từ nguồn nguyên liệu nào và sản xuất bằng cách nào?',
    goals: ['Nêu được phương pháp tách kim loại theo mức độ hoạt động hoá học.', 'Trình bày quá trình tách sắt (bằng CO), nhôm (điện phân), kẽm (từ zinc sulfide).', 'Nêu khái niệm hợp kim, giải thích vì sao kim loại thường dùng dưới dạng hợp kim; nêu thành phần, tính chất một số hợp kim.', 'Trình bày các giai đoạn sản xuất gang, thép.'],
    sections: [
      { title: 'Phương pháp tách kim loại', body: ['Quặng →(làm giàu quặng) hợp chất chứa kim loại →(phương pháp hoá học) kim loại.', 'Điện phân nóng chảy: kim loại hoạt động mạnh (Na, Ca, Mg, Al…). Nhiệt luyện: kim loại hoạt động trung bình (Fe, Zn…) dùng C, CO, H₂, Al… khử oxide ở nhiệt độ cao. Thuỷ luyện: kim loại yếu (Ag, Au…).'], scene: 1 },
      { title: 'Tách một số kim loại', body: ['Nhôm: 2Al₂O₃ →(điện phân nóng chảy, cryolite) 4Al + 3O₂. Cryolite hạ nhiệt độ nóng chảy của Al₂O₃.', 'Sắt: Fe₂O₃ + 3CO →(t°) 2Fe + 3CO₂.', 'Kẽm: 2ZnS + 3O₂ →(t°) 2ZnO + 2SO₂; ZnO + C →(t°) Zn + CO.'], scene: 4 },
      { title: 'Sản xuất gang, thép', body: ['Gang (lò cao): nguyên liệu quặng hematite, than cốc, đá vôi. C + O₂ → CO₂; C + CO₂ → 2CO; 3CO + Fe₂O₃ → 2Fe + 3CO₂; CaO + SiO₂ → CaSiO₃ (xỉ).', 'Thép (lò thổi): thổi oxygen vào gang nóng chảy, đốt cháy tạp chất C, Si, Mn…; oxide khí thoát ra, oxide rắn tạo xỉ.'], scene: 2 },
      { title: 'Hợp kim', body: ['Hợp kim là vật liệu kim loại chứa ít nhất một kim loại cơ bản và một số kim loại hoặc phi kim khác. Hợp kim thường cứng, bền, chống ăn mòn tốt hơn kim loại nguyên chất.', 'Gang (2 – 5% C), thép (dưới 2% C), inox (thêm Cr, Ni), đuy-ra (Al với Cu, Mn, Mg).'], scene: 5 },
    ],
    examples: ['Khí thải sản xuất gang thép chứa CO, CO₂, SO₂, bụi… cần được xử lí trước khi thải ra môi trường.'],
    exercises: [
      { q: 'Chỉ ra điểm giống và khác nhau giữa quá trình tách kẽm và tách sắt.', a: 'Giống: đều là nhiệt luyện, dùng chất khử ở nhiệt độ cao. Khác: tách sắt từ Fe₂O₃ bằng CO; tách kẽm phải đốt ZnS thành ZnO rồi khử bằng C.' },
      { q: 'Phương pháp tách kim loại nào được vận dụng trong sản xuất gang?', a: 'Phương pháp nhiệt luyện (CO khử iron(III) oxide).' },
      { q: 'Gang và thép khác nhau thế nào về thành phần và tính chất?', a: 'Gang chứa 2 – 5% C, cứng và giòn, dùng đúc chi tiết máy, ống nước; thép chứa dưới 2% C, cứng, đàn hồi, chịu lực tốt, dùng trong xây dựng, giao thông.' },
    ],
  },

  'h9-21': {
    opener: 'Carbon, lưu huỳnh, chlorine là những chất không thể thiếu trong công nghiệp và đời sống. Tính chất của chúng khác kim loại như thế nào?',
    goals: ['Nêu được ứng dụng của một số đơn chất phi kim (than, lưu huỳnh, chlorine…).', 'Chỉ ra sự khác nhau cơ bản giữa phi kim và kim loại: dẫn điện, nhiệt độ nóng chảy, sôi, khối lượng riêng; tạo ion dương, ion âm; phản ứng với oxygen tạo oxide acid, oxide base.'],
    sections: [
      { title: 'Ứng dụng của phi kim', body: ['Carbon: kim cương (mũi khoan, trang sức), than chì (điện cực, ruột bút chì), than hoạt tính (hấp phụ: mặt nạ phòng độc, khử màu, khử mùi), than cốc (luyện kim).', 'Lưu huỳnh: sản xuất sulfuric acid, lưu hoá cao su, dược phẩm, thuốc diệt nấm, pháo hoa, diêm.', 'Chlorine: khử trùng nước, sản xuất nước Javel, tẩy trắng, sản xuất chất dẻo, HCl.'], scene: 1 },
      { title: 'Khác nhau về tính chất vật lí', body: ['Kim loại dẫn điện tốt; phi kim thường không dẫn điện (than chì dẫn điện kém, silicon là bán dẫn).', 'Phần lớn phi kim có nhiệt độ nóng chảy, sôi và khối lượng riêng nhỏ hơn kim loại. Phi kim có thể ở thể khí, lỏng (bromine) hoặc rắn.'], scene: 3 },
      { title: 'Khác nhau về tính chất hoá học', body: ['Kim loại dễ nhường electron tạo ion dương; phi kim dễ nhận electron tạo ion âm: Na → Na⁺ + 1e; Cl + 1e → Cl⁻; 2Na + Cl₂ → 2NaCl.', 'Kim loại + oxygen thường tạo oxide base (2Mg + O₂ → 2MgO); phi kim + oxygen thường tạo oxide acid (S + O₂ → SO₂).'], scene: 4 },
    ],
    examples: ['Khẩu trang than hoạt tính lọc được khí độc, mùi tốt hơn khẩu trang thường.', 'Máy lọc nước dùng lõi than hoạt tính để khử màu, mùi.'],
    exercises: [
      { q: 'Vì sao trong phản ứng giữa kim loại và phi kim, phi kim thường nhận electron?', a: 'Nguyên tử phi kim có nhiều electron ở lớp ngoài cùng, dễ nhận thêm electron để đạt lớp vỏ bền; kim loại có ít electron lớp ngoài cùng nên dễ nhường.' },
      { q: 'Lấy ví dụ minh hoạ sự khác nhau giữa kim loại và phi kim về tính chất hoá học.', a: 'Mg cháy tạo MgO là oxide base; S cháy tạo SO₂ là oxide acid.' },
    ],
  },

  'h9-22': {
    opener: 'Hợp chất hữu cơ là gì và khác biệt về cấu tạo so với hợp chất vô cơ như thế nào?',
    goals: ['Nêu được khái niệm hợp chất hữu cơ, hoá học hữu cơ.', 'Nêu được khái niệm công thức phân tử, công thức cấu tạo và ý nghĩa; đặc điểm cấu tạo hợp chất hữu cơ.', 'Phân biệt chất vô cơ hay hữu cơ theo công thức phân tử.', 'Phân loại sơ bộ hợp chất hữu cơ: hydrocarbon và dẫn xuất của hydrocarbon.'],
    sections: [
      { title: 'Khái niệm', body: ['Hợp chất của carbon là hợp chất hữu cơ, trừ CO, CO₂, H₂CO₃, các muối carbonate…', 'Hoá học hữu cơ là chuyên ngành của Hoá học nghiên cứu về hợp chất hữu cơ.'], scene: 1 },
      { title: 'Công thức phân tử, công thức cấu tạo', body: ['Công thức phân tử cho biết thành phần nguyên tố và số nguyên tử mỗi nguyên tố trong phân tử.', 'Công thức cấu tạo cho biết trật tự liên kết và cách thức liên kết giữa các nguyên tử. Liên kết đơn: một gạch (–); liên kết đôi: hai gạch (=). Có thể viết thu gọn: CH₃–CH₃.'], scene: 2 },
      { title: 'Đặc điểm cấu tạo', body: ['Thành phần nhất thiết có carbon, thường có H, O, N, Cl, S… Liên kết chủ yếu là liên kết cộng hoá trị.', 'Carbon luôn có hoá trị IV; các nguyên tử C liên kết với nhau tạo mạch carbon: mạch hở không phân nhánh, mạch nhánh, mạch vòng.', 'Nhiều chất khác nhau có cùng công thức phân tử: ethylic alcohol và dimethyl ether (C₂H₆O); butane và isobutane (C₄H₁₀).'], scene: 3 },
      { title: 'Phân loại', body: ['Hydrocarbon: chỉ chứa C và H. Dẫn xuất của hydrocarbon: ngoài C còn có nguyên tố khác như O, N, Cl… và thường có H.'], scene: 5 },
    ],
    examples: ['Butane C₄H₁₀ (gas), ethylic alcohol C₂H₅OH (đồ uống có cồn), acetic acid CH₃COOH (giấm), urea CO(NH₂)₂ (phân đạm).'],
    facts: ['Năm 1828, Wöhler tổng hợp được urea từ chất vô cơ, chứng minh hợp chất hữu cơ không chỉ được tạo ra trong cơ thể sinh vật.'],
    exercises: [
      { q: 'Xếp các chất thành hữu cơ, vô cơ: C₆H₆, H₂SO₄, C₆H₁₂O₆, H₂CO₃, CaCO₃, KNO₃, C₂H₄, NaOH, Al₂O₃, CH₃Cl, CH₃OH.', a: 'Hữu cơ: C₆H₆, C₆H₁₂O₆, C₂H₄, CH₃Cl, CH₃OH. Vô cơ: H₂SO₄, H₂CO₃, CaCO₃, KNO₃, NaOH, Al₂O₃.' },
      { q: 'Xếp vào hydrocarbon/dẫn xuất: CH₄, CH₃Cl, CH₂=CH₂, CH₃CH₂OH, CH₃COOH, CH₃NH₂, CH₃CH₂CH₃.', a: 'Hydrocarbon: CH₄, CH₂=CH₂, CH₃CH₂CH₃. Dẫn xuất: CH₃Cl, CH₃CH₂OH, CH₃COOH, CH₃NH₂.' },
    ],
  },

  'h9-23': {
    opener: 'Khí hoá lỏng, xăng, dầu đều có thành phần chính là alkane. Dựa trên tính chất nào mà alkane được dùng làm nhiên liệu?',
    goals: ['Nêu được khái niệm hydrocarbon, alkane.', 'Viết được công thức cấu tạo và gọi tên alkane C1 – C4.', 'Viết phương trình đốt cháy butane; rút ra tính chất hoá học cơ bản của alkane.', 'Trình bày được ứng dụng làm nhiên liệu của alkane.'],
    sections: [
      { title: 'Hydrocarbon, alkane', body: ['Hydrocarbon là hợp chất hữu cơ chỉ chứa C và H (alkane, alkene…).', 'Alkane là hydrocarbon mạch hở, phân tử chỉ chứa liên kết đơn. Công thức chung CₙH₂ₙ₊₂ (n ≥ 1).'], scene: 1 },
      { title: 'Danh pháp C1 – C4', body: ['CH₄ methane; C₂H₆ ethane (CH₃–CH₃); C₃H₈ propane (CH₃–CH₂–CH₃); C₄H₁₀ butane (CH₃–CH₂–CH₂–CH₃).', 'Các alkane hơn kém nhau một hay nhiều nhóm CH₂.'], scene: 2 },
      { title: 'Phản ứng cháy', body: ['Đốt alkane tạo chủ yếu CO₂ và hơi nước, toả nhiều nhiệt: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O; C₄H₁₀ + 13/2 O₂ → 4CO₂ + 5H₂O.', 'Cháy không hoàn toàn tạo muội than và CO. Ở điều kiện thường alkane khá bền, không phản ứng với acid, base.'], scene: 4 },
      { title: 'Ứng dụng làm nhiên liệu', body: ['Khí: propane, butane (bật lửa, bếp gas). Lỏng: xăng, dầu hoả, diesel, nhiên liệu phản lực. Rắn: nến paraffin.'], scene: 6 },
    ],
    formulas: [{ expr: 'CₙH₂ₙ₊₂ + (3n+1)/2 O₂ → nCO₂ + (n+1)H₂O', note: 'Phản ứng cháy hoàn toàn của alkane' }],
    examples: ['Nhiệt lượng đốt 1 mol: CH₄ 891 kJ, C₂H₆ 1 561 kJ, C₃H₈ 2 220 kJ, C₄H₁₀ 2 878 kJ.'],
    exercises: [
      { q: 'Viết phương trình đốt cháy methane, ethane.', a: 'CH₄ + 2O₂ → CO₂ + 2H₂O; 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O.' },
      { q: 'Đốt 1 gam alkane nào (C1 – C4) toả nhiều nhiệt nhất?', a: 'Methane: 891/16 ≈ 55,7 kJ/g (ethane ≈ 52,0; propane ≈ 50,5; butane ≈ 49,6 kJ/g).' },
      { q: 'Gas là hỗn hợp propane và butane tỉ lệ thể tích 1 : 1. Tính nhiệt lượng khi đốt 1 kg gas.', a: 'Mỗi cặp (1 mol C₃H₈ + 1 mol C₄H₁₀) nặng 102 g, toả 5 098 kJ. 1 000 g ứng với 1000/102 ≈ 9,8 cặp → Q ≈ 9,8 × 5 098 ≈ 49 980 kJ ≈ 5·10⁴ kJ.' },
    ],
  },

  'h9-24': {
    opener: 'Khí ethylene thúc đẩy quá trình chín của trái cây. Ethylene có cấu tạo, tính chất thế nào và có vai trò gì trong công nghiệp hoá chất?',
    goals: ['Nêu được khái niệm alkene.', 'Viết công thức cấu tạo, nêu tính chất vật lí của ethylene.', 'Trình bày tính chất hoá học của ethylene: phản ứng cháy, làm mất màu nước bromine, trùng hợp.', 'Trình bày ứng dụng của ethylene: tổng hợp ethylic alcohol, nhựa PE.'],
    sections: [
      { title: 'Alkene, ethylene', body: ['Alkene là hydrocarbon mạch hở, trong phân tử có một liên kết đôi C=C. Công thức chung CₙH₂ₙ (n ≥ 2).', 'Ethylene C₂H₄ (CH₂=CH₂): chất khí, không màu, hầu như không tan trong nước. Liên kết đôi có một liên kết kém bền, dễ bị phá vỡ.'], scene: 1 },
      { title: 'Tính chất hoá học', body: ['Phản ứng cháy: C₂H₄ + 3O₂ → 2CO₂ + 2H₂O, toả nhiều nhiệt.', 'Phản ứng cộng: ethylene làm mất màu nước bromine: CH₂=CH₂ + Br₂ → CH₂Br–CH₂Br (1,2-dibromoethane). Methane không có phản ứng này.', 'Phản ứng trùng hợp: nCH₂=CH₂ →(t°, p, xt) –(CH₂–CH₂)ₙ– (polyethylene).'], scene: 2 },
      { title: 'Ứng dụng', body: ['Tổng hợp ethylic alcohol, acetic acid, dung môi; sản xuất PE, PVC; kích thích quả mau chín.'], scene: 4 },
    ],
    examples: ['Nhựa PE dùng làm túi đựng, màng bọc, chai lọ nhưng rất khó phân huỷ sinh học.'],
    exercises: [
      { q: 'Propylene CH₃–CH=CH₂ có tính chất hoá học tương tự ethylene không? Viết phương trình minh hoạ.', a: 'Có, vì có liên kết đôi C=C. CH₂=CH–CH₃ + Br₂ → CH₂Br–CHBr–CH₃; 2C₃H₆ + 9O₂ → 6CO₂ + 6H₂O; trùng hợp tạo PP.' },
      { q: 'Nêu cách phân biệt khí methane và khí ethylene.', a: 'Dẫn từng khí qua nước bromine: khí làm mất màu nước bromine là ethylene.' },
    ],
  },

  'h9-25': {
    opener: 'Hydrocarbon vừa là nguồn nhiên liệu vừa là nguồn nguyên liệu quý. Chúng được khai thác và sử dụng như thế nào?',
    goals: ['Nêu khái niệm, thành phần, trạng thái tự nhiên của dầu mỏ, khí thiên nhiên, khí mỏ dầu.', 'Trình bày phương pháp khai thác và một số sản phẩm chế biến từ dầu mỏ.', 'Nêu khái niệm nhiên liệu, các dạng nhiên liệu; cách sử dụng nhiên liệu an toàn, hiệu quả.'],
    sections: [
      { title: 'Dầu mỏ, khí mỏ dầu, khí thiên nhiên', body: ['Dầu mỏ là nhiên liệu hoá thạch, thành phần chính là các hydrocarbon. Mỏ dầu có ba lớp: khí mỏ dầu (khí đồng hành, khoảng 75% methane), dầu lỏng, nước mặn.', 'Khí thiên nhiên tập trung trong mỏ khí, thành phần chính là methane (khoảng 95%).'], scene: 1 },
      { title: 'Khai thác và chế biến', body: ['Khoan, thu dầu và khí → loại tạp chất được dầu thô → nhà máy lọc dầu chưng cất thành các phân đoạn: khí hoá lỏng, xăng, dầu hoả, dầu diesel, dầu bôi trơn, sáp paraffin, nhựa đường…'], scene: 2 },
      { title: 'Nhiên liệu', body: ['Nhiên liệu là những chất cháy được, khi cháy toả nhiệt và phát sáng. Gồm nhiên liệu rắn (gỗ, than), lỏng (xăng, dầu, ethanol), khí (hydrogen, methane, propane, butane).', 'Sử dụng tiết kiệm, an toàn: bảo quản xăng đúng tiêu chuẩn; đặt bình gas nơi thoáng, kiểm tra rò rỉ; không đốt than, gas trong phòng kín.'], scene: 3 },
    ],
    examples: ['Xe máy, ô tô dùng xăng; máy bay dùng dầu hoả; than dùng cho nhiệt điện, luyện kim.'],
    exercises: [
      { q: 'Theo em, các chất dùng làm nhiên liệu đều phải có tính chất gì?', a: 'Cháy được, khi cháy toả nhiều nhiệt (và phát sáng).' },
      { q: 'Đề xuất biện pháp sử dụng bếp gas an toàn, hiệu quả.', a: 'Đặt bình nơi thoáng, xa nguồn nhiệt; kiểm tra rò rỉ; điều chỉnh lửa xanh (cháy hoàn toàn); khoá van sau khi dùng.' },
    ],
  },

  'h9-26': {
    opener: 'Ethylic alcohol được dùng phổ biến trong đời sống và công nghiệp. Ethylic alcohol có cấu tạo và tính chất đặc trưng gì?',
    goals: ['Viết công thức phân tử, công thức cấu tạo, nêu đặc điểm cấu tạo của ethylic alcohol.', 'Trình bày tính chất vật lí; khái niệm và ý nghĩa của độ cồn.', 'Trình bày tính chất hoá học: phản ứng cháy, phản ứng với natri.', 'Trình bày phương pháp điều chế từ tinh bột và từ ethylene; ứng dụng; tác hại của lạm dụng rượu bia.'],
    sections: [
      { title: 'Cấu tạo', body: ['Công thức phân tử C₂H₆O; công thức cấu tạo CH₃–CH₂–OH. Nhóm –OH gây nên tính chất đặc trưng.'], scene: 1 },
      { title: 'Tính chất vật lí, độ cồn', body: ['Chất lỏng, không màu, mùi đặc trưng, vị cay, sôi ở 78,3 °C, khối lượng riêng 0,789 g/mL, tan vô hạn trong nước, hoà tan được iodine, benzene…', 'Độ cồn là số mililit ethylic alcohol nguyên chất có trong 100 mL dung dịch ở 20 °C. Cồn y tế 70° chứa 70 mL ethylic alcohol trong 100 mL.'], scene: 1 },
      { title: 'Tính chất hoá học', body: ['Cháy với ngọn lửa xanh nhạt, toả nhiều nhiệt: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O.', 'Tác dụng với natri giải phóng hydrogen: 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂.'], scene: 2 },
      { title: 'Điều chế, ứng dụng', body: ['Lên men nguyên liệu chứa tinh bột: (C₆H₁₀O₅)ₙ → C₆H₁₂O₆ → C₂H₅OH. Trong công nghiệp: CH₂=CH₂ + H₂O →(t°, H⁺) C₂H₅OH.', 'Dùng làm dung môi, sát khuẩn, nhiên liệu (đèn cồn, xăng E5), sản xuất đồ uống có cồn, điều chế acetic acid, ester.', 'Lạm dụng rượu bia gây viêm gan, viêm loét dạ dày, tăng huyết áp, tổn thương thần kinh và là nguyên nhân của tai nạn giao thông, bạo lực.'], scene: 4 },
    ],
    examples: ['Xăng E5 chứa 5% ethylic alcohol về thể tích.', 'Cồn y tế, nước rửa tay có 60 – 85% ethylic alcohol để diệt khuẩn.'],
    exercises: [
      { q: 'Trên nhãn rượu vang ghi 14% vol nghĩa là gì?', a: 'Trong 100 mL rượu vang có 14 mL ethylic alcohol nguyên chất.' },
      { q: 'Chất nào tác dụng được với Na: CH₃–CH₃, CH₂=CH₂, CH₃–OH, CH₃–CH₂–OH?', a: 'CH₃–OH và CH₃–CH₂–OH (có nhóm –OH): 2CH₃OH + 2Na → 2CH₃ONa + H₂; 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂.' },
    ],
  },

  'h9-27': {
    opener: 'Giấm là gia vị quen thuộc. Chất nào tạo nên vị chua của giấm?',
    goals: ['Viết công thức phân tử, công thức cấu tạo, nêu đặc điểm cấu tạo của acetic acid.', 'Trình bày tính chất vật lí, phương pháp điều chế bằng lên men giấm.', 'Trình bày tính chất hoá học: với quỳ tím, đá vôi, kim loại, oxide kim loại, base, phản ứng cháy, ester hoá.', 'Trình bày ứng dụng của acetic acid.'],
    sections: [
      { title: 'Cấu tạo, tính chất vật lí', body: ['Công thức phân tử C₂H₄O₂, công thức cấu tạo CH₃–COOH. Nhóm –COOH (gồm –OH liên kết với C=O) gây nên tính chất đặc trưng.', 'Chất lỏng không màu, vị chua, mùi đặc trưng, sôi ở 118 °C, tan vô hạn trong nước. Giấm ăn chứa 2 – 5% acetic acid.'], scene: 1 },
      { title: 'Tính acid', body: ['Acetic acid là acid yếu, có đầy đủ tính chất của acid: làm quỳ tím hoá đỏ; 2CH₃COOH + Mg → (CH₃COO)₂Mg + H₂; 2CH₃COOH + CuO → (CH₃COO)₂Cu + H₂O; CH₃COOH + NaOH → CH₃COONa + H₂O; 2CH₃COOH + CaCO₃ → (CH₃COO)₂Ca + CO₂ + H₂O.'], scene: 2 },
      { title: 'Phản ứng ester hoá, phản ứng cháy', body: ['CH₃COOH + C₂H₅OH ⇌(H₂SO₄ đặc, t°) CH₃COOC₂H₅ + H₂O. Ethyl acetate là chất lỏng không màu, mùi thơm, ít tan trong nước.', 'CH₃COOH + 2O₂ →(t°) 2CO₂ + 2H₂O.'], scene: 4 },
      { title: 'Điều chế, ứng dụng', body: ['Lên men giấm: C₂H₅OH + O₂ →(men giấm) CH₃COOH + H₂O.', 'Sản xuất giấm ăn, tơ, dược phẩm, chất kết dính, hoá chất, dung môi.'], scene: 5 },
    ],
    examples: ['Dùng giấm loại bỏ cặn (CaCO₃) trong ấm đun nước.', 'Rượu vang để lâu ngoài không khí bị chua do lên men giấm.'],
    exercises: [
      { q: 'Chất nào có tính chất hoá học đặc trưng giống acetic acid: CH₃OH, CH₃CHO, HCOOH, CH₃COOC₂H₅?', a: 'HCOOH – vì có nhóm –COOH.' },
      { q: 'Acetic acid tác dụng được với chất nào: Zn, KOH, ZnO, NaCl, MgCO₃, Cu?', a: 'Zn, KOH, ZnO, MgCO₃. Ví dụ: 2CH₃COOH + Zn → (CH₃COO)₂Zn + H₂; CH₃COOH + KOH → CH₃COOK + H₂O; 2CH₃COOH + ZnO → (CH₃COO)₂Zn + H₂O; 2CH₃COOH + MgCO₃ → (CH₃COO)₂Mg + CO₂ + H₂O.' },
      { q: 'Viết phương trình điều chế propyl acetate từ acetic acid và propyl alcohol.', a: 'CH₃COOH + CH₃CH₂CH₂OH ⇌(H₂SO₄ đặc, t°) CH₃COOCH₂CH₂CH₃ + H₂O' },
    ],
  },

  'h9-28': {
    opener: 'Dầu thực vật và mỡ động vật được dùng hằng ngày. Vai trò của chúng với cơ thể là gì? Cần ăn bao nhiêu là phù hợp?',
    goals: ['Nêu được khái niệm lipid, chất béo, trạng thái tự nhiên, công thức chung (RCOO)₃C₃H₅.', 'Trình bày tính chất vật lí và phản ứng xà phòng hoá của chất béo.', 'Nêu vai trò của lipid; ứng dụng và cách sử dụng chất béo hợp lí.'],
    sections: [
      { title: 'Lipid', body: ['Lipid là hợp chất hữu cơ có trong tế bào sống, không tan trong nước nhưng tan trong dung môi hữu cơ (xăng, dầu hoả…). Lipid điển hình: chất béo, sáp.'], scene: 1 },
      { title: 'Chất béo', body: ['Chất béo là triester của glycerol C₃H₅(OH)₃ và acid béo R–COOH (R thường là –C₁₇H₃₅, –C₁₅H₃₁…), công thức (RCOO)₃C₃H₅.', 'Ở thể lỏng (dầu lạc, dầu hướng dương) hoặc rắn (mỡ động vật, bơ); nhẹ hơn nước, không tan trong nước.', 'Phản ứng xà phòng hoá: (RCOO)₃C₃H₅ + 3NaOH →(t°) 3RCOONa + C₃H₅(OH)₃.'], scene: 2 },
      { title: 'Ứng dụng, sử dụng hợp lí', body: ['Thực phẩm thiết yếu; dùng trong mĩ phẩm, dược phẩm, diesel sinh học, sản xuất xà phòng.', 'Hạn chế béo phì: ăn lượng chất béo phù hợp, ưu tiên chất béo thực vật, omega-3; hạn chế mỡ động vật, đồ chiên rán.'], scene: 1 },
    ],
    examples: ['Có thể làm xà phòng từ dầu ăn đã qua sử dụng (lọc sạch) với dung dịch kiềm.'],
    exercises: [
      { q: 'Đặc trưng tính chất vật lí của lipid là gì?', a: 'Không tan trong nước, tan trong dung môi hữu cơ; chất béo nhẹ hơn nước.' },
      { q: 'Vì sao gọi phản ứng của chất béo với dung dịch kiềm là phản ứng xà phòng hoá?', a: 'Vì sản phẩm muối natri (kali) của acid béo được dùng làm xà phòng.' },
    ],
  },

  'h9-29': {
    opener: 'Đường trong bánh kẹo, gạo, ngô, khoai và bộ khung của cây đều là carbohydrate. Chúng giống và khác nhau thế nào?',
    goals: ['Nêu thành phần nguyên tố, công thức chung Cₙ(H₂O)ₘ của carbohydrate.', 'Nêu công thức phân tử, trạng thái tự nhiên, tính chất vật lí của glucose và saccharose.', 'Trình bày tính chất hoá học của glucose (tráng bạc, lên men rượu), saccharose (thuỷ phân).', 'Trình bày vai trò, ứng dụng của glucose, saccharose; sử dụng hợp lí.'],
    sections: [
      { title: 'Carbohydrate', body: ['Carbohydrate là hợp chất hữu cơ chứa C, H, O, thường có công thức chung Cₙ(H₂O)ₘ. Gồm glucose, saccharose, tinh bột, cellulose.'], scene: 1 },
      { title: 'Glucose và saccharose', body: ['Glucose C₆H₁₂O₆: chất rắn kết tinh không màu, vị ngọt, tan tốt; có nhiều trong nho chín, có trong máu người.', 'Saccharose C₁₂H₂₂O₁₁: chất rắn kết tinh không màu, vị ngọt, tan tốt; có nhiều trong mía, củ cải đường, thốt nốt.'], scene: 1 },
      { title: 'Tính chất hoá học', body: ['Phản ứng tráng bạc của glucose: C₆H₁₂O₆ + Ag₂O →(NH₃, t°) C₆H₁₂O₇ + 2Ag. Saccharose không có phản ứng này.', 'Lên men rượu: C₆H₁₂O₆ →(enzyme) 2C₂H₅OH + 2CO₂.', 'Thuỷ phân saccharose: C₁₂H₂₂O₁₁ + H₂O →(enzyme hoặc acid, t°) C₆H₁₂O₆ (glucose) + C₆H₁₂O₆ (fructose).'], scene: 2 },
      { title: 'Vai trò, ứng dụng', body: ['Glucose: nguồn năng lượng chính cho tế bào; dùng trong y tế (dịch truyền), thực phẩm, tráng gương, sản xuất đồ uống có cồn.', 'Saccharose: chất tạo ngọt cho đồ uống, bánh kẹo. Tiêu thụ quá nhiều đường có nguy cơ béo phì, tiểu đường, tim mạch.'], scene: 4 },
    ],
    examples: ['Gương soi được tráng bạc bằng phản ứng của glucose.'],
    exercises: [
      { q: 'So sánh tính chất vật lí của glucose và saccharose.', a: 'Đều là chất rắn kết tinh, không màu, không mùi, vị ngọt, tan tốt trong nước.' },
      { q: 'Nêu cách phân biệt dung dịch glucose và dung dịch saccharose.', a: 'Làm phản ứng tráng bạc (AgNO₃/NH₃, đun nóng): dung dịch tạo lớp bạc sáng là glucose.' },
    ],
  },

  'h9-30': {
    opener: 'Tinh bột là nguồn dự trữ năng lượng, cellulose tạo nên bộ khung của thực vật. Ứng dụng của chúng giống hay khác nhau?',
    goals: ['Nêu trạng thái tự nhiên, tính chất vật lí của tinh bột và cellulose.', 'Trình bày phản ứng thuỷ phân; phản ứng màu của hồ tinh bột với iodine.', 'Trình bày ứng dụng của tinh bột, cellulose; sự tạo thành và vai trò của chúng trong cây xanh.'],
    sections: [
      { title: 'Trạng thái tự nhiên, tính chất vật lí', body: ['Tinh bột (C₆H₁₀O₅)ₙ: chất rắn dạng bột, màu trắng, không tan trong nước lạnh, tan một phần trong nước nóng tạo hồ tinh bột; nhiều trong hạt, củ, quả.', 'Cellulose (C₆H₁₀O₅)ₘ: chất rắn dạng sợi, màu trắng, không tan trong nước và dung môi hữu cơ thông thường; nhiều trong thân, vỏ cây, bông, tre, nứa.'], scene: 4 },
      { title: 'Sự tạo thành trong cây xanh', body: ['Quang hợp chuyển CO₂ và nước thành glucose, giải phóng O₂, góp phần cân bằng CO₂ và O₂ trong khí quyển. Một phần glucose chuyển thành tinh bột (dự trữ năng lượng) và cellulose (xây dựng tế bào, giữ hình dáng cây).'], scene: 1 },
      { title: 'Tính chất hoá học', body: ['Hồ tinh bột tác dụng với iodine tạo hợp chất màu xanh tím (cellulose không có).', 'Thuỷ phân (enzyme hoặc acid): (C₆H₁₀O₅)ₙ + nH₂O → nC₆H₁₂O₆. Cơ thể người chỉ có enzyme thuỷ phân tinh bột (nước bọt, ruột non), không có enzyme thuỷ phân cellulose.'], scene: 2 },
      { title: 'Ứng dụng', body: ['Tinh bột: lương thực chính, sản xuất hồ dán, ethylic alcohol.', 'Cellulose: sản xuất giấy, tơ sợi, đồ gỗ, cồn công nghiệp.'], scene: 5 },
    ],
    examples: ['Nhỏ dung dịch iodine lên lát khoai, mặt cắt quả chuối xanh thấy màu xanh tím – chứng tỏ có tinh bột.'],
    exercises: [
      { q: 'Trong thí nghiệm thuỷ phân tinh bột, ống nghiệm nào đã xảy ra phản ứng hoá học? Giải thích.', a: 'Ống có HCl và được đun: nhỏ iodine không còn màu xanh tím vì tinh bột đã bị thuỷ phân thành glucose.' },
      { q: 'So sánh vai trò của tinh bột và cellulose trong cây xanh.', a: 'Tinh bột dự trữ năng lượng; cellulose xây dựng thành tế bào, tạo bộ khung của cây.' },
    ],
  },

  'h9-31': {
    opener: 'Protein có vai trò đặc biệt quan trọng trong cơ thể sinh vật. Protein có cấu tạo như thế nào và có tính chất gì?',
    goals: ['Nêu khái niệm, đặc điểm cấu tạo (amino acid, liên kết peptide), khối lượng phân tử của protein.', 'Trình bày tính chất hoá học: thuỷ phân, đông tụ, phân huỷ khi đun nóng mạnh.', 'Phân biệt protein (len, tơ tằm) với chất khác (tơ nylon); trình bày vai trò của protein.'],
    sections: [
      { title: 'Khái niệm, cấu tạo', body: ['Protein là hợp chất hữu cơ phức tạp có khối lượng phân tử rất lớn (vài chục nghìn đến hàng triệu amu), gồm nhiều đơn vị amino acid liên kết với nhau bởi liên kết peptide.'], scene: 1 },
      { title: 'Tính chất hoá học', body: ['Đông tụ dưới tác dụng của acid, base hoặc nhiệt độ (lòng trắng trứng thêm HCl hoặc đun nóng).', 'Bị phân huỷ khi đun nóng mạnh không có nước, tạo chất bay hơi có mùi khét.', 'Thuỷ phân (acid, base hoặc enzyme) tạo các amino acid: Protein + H₂O → amino acid.'], scene: 1 },
      { title: 'Vai trò và ứng dụng', body: ['Cấu trúc (cơ bắp, da, tóc), xúc tác (enzyme), nội tiết (hormone), vận chuyển (hemoglobin vận chuyển oxygen)…', 'Nguồn thực phẩm quan trọng (sữa, trứng, thịt, cá); nguyên liệu sản xuất tơ tự nhiên (tơ tằm).'], scene: 2 },
    ],
    examples: ['Đốt sợi tơ tằm, len có mùi khét như tóc cháy; đốt sợi nylon không có mùi này – dùng để phân biệt.'],
    exercises: [
      { q: 'Nêu cách phân biệt tơ tằm với tơ nylon.', a: 'Đốt một ít sợi: tơ tằm cháy có mùi khét như tóc cháy (protein); tơ nylon co lại, không có mùi đó.' },
      { q: 'Viết sơ đồ hai phản ứng có enzyme làm xúc tác trong cơ thể người.', a: 'Tinh bột + nước →(amylase) glucose; protein + nước →(enzyme) amino acid.' },
    ],
  },

  'h9-32': {
    opener: 'Vật liệu polymer được sử dụng rộng rãi. Polymer là gì và có đặc điểm cấu tạo, tính chất thế nào?',
    goals: ['Nêu khái niệm polymer, monomer, mắt xích; cấu tạo, phân loại polymer.', 'Trình bày tính chất vật lí chung; viết phương trình điều chế PE, PP.', 'Nêu khái niệm chất dẻo, tơ, cao su, vật liệu composite và cách sử dụng, bảo quản.', 'Trình bày ứng dụng của PE; vấn đề ô nhiễm môi trường và cách hạn chế.'],
    sections: [
      { title: 'Khái niệm, cấu tạo, phân loại', body: ['Polymer là chất có khối lượng phân tử rất lớn do nhiều mắt xích liên kết với nhau. Phân tử nhỏ kết hợp tạo polymer gọi là monomer.', 'Mạch không phân nhánh (amylose), mạch phân nhánh (amylopectin, glycogen), mạng không gian (cao su lưu hoá, nhựa bakelite).', 'Polymer thiên nhiên (tinh bột, cellulose, protein, cao su thiên nhiên) và polymer tổng hợp (PE, PP…).'], scene: 1 },
      { title: 'Điều chế PE, PP; tính chất vật lí', body: ['nCH₂=CH₂ → –(CH₂–CH₂)ₙ– (PE); nCH₂=CH–CH₃ → –(CH₂–CH(CH₃))ₙ– (PP).', 'Hầu hết polymer là chất rắn, không bay hơi, không có nhiệt độ nóng chảy xác định, không tan trong nước.'], scene: 2 },
      { title: 'Vật liệu polymer', body: ['Chất dẻo, tơ (thiên nhiên, tổng hợp), cao su (đàn hồi), vật liệu composite (vật liệu cốt + vật liệu nền).', 'Không để đồ nhựa gần nguồn nhiệt; đọc kí hiệu trên đồ nhựa, nhãn quần áo để dùng đúng cách.'], scene: 3 },
      { title: 'PE và ô nhiễm môi trường', body: ['PE dùng làm túi đựng, màng bọc, chai lọ, ống nhựa, vỏ dây điện, đồ chơi; rất khó phân huỷ sinh học.', 'Áp dụng nguyên tắc 5R: đổi mới công nghệ, từ chối, giảm thiểu, tái sử dụng, tái chế.'], scene: 5 },
    ],
    examples: ['Mã số nhận diện nhựa trên đáy chai giúp phân loại khi tái chế.'],
    exercises: [
      { q: 'Viết phương trình tổng hợp PE, PP từ monomer.', a: 'nCH₂=CH₂ →(t°, p, xt) –(CH₂–CH₂)ₙ–; nCH₂=CH(CH₃) →(t°, p, xt) –(CH₂–CH(CH₃))ₙ–' },
      { q: 'Nêu các biện pháp giảm thiểu rác thải nhựa trong gia đình.', a: 'Dùng túi vải, bình nước cá nhân; hạn chế đồ nhựa dùng một lần; tái sử dụng chai lọ; phân loại rác nhựa để tái chế.' },
    ],
  },

  'h9-33': {
    opener: 'Các nguyên tố chủ yếu trong vỏ Trái Đất là gì, nằm trong loại hợp chất nào? Chúng có phải là nguồn tài nguyên vô tận?',
    goals: ['Nêu hàm lượng các nguyên tố hoá học chủ yếu trong vỏ Trái Đất.', 'Phân loại các dạng chất chủ yếu trong vỏ Trái Đất (oxide, muối…).', 'Trình bày lợi ích của việc khai thác vỏ Trái Đất; lợi ích của tiết kiệm, bảo vệ tài nguyên, sử dụng vật liệu tái chế.'],
    sections: [
      { title: 'Hàm lượng các nguyên tố', body: ['Nhiều nhất là O (46,10%), Si (28,20%), Al (8,23%), Fe (5,63%), Ca (4,15%), Na (2,36%), Mg (2,33%), K (2,09%).'], scene: 1 },
      { title: 'Các dạng chất chủ yếu', body: ['Thành phần chủ yếu của khoáng chất là oxide và muối. Oxide phổ biến nhất: SiO₂ (cát trắng, thạch anh), Al₂O₃ (quặng bauxite).', 'Muối silicate có trong mica, feldspar, đá hoa cương; muối carbonate có trong đá vôi, đá phấn, dolomite, đá cẩm thạch.'], scene: 2 },
      { title: 'Khai thác tài nguyên', body: ['Khai thác nhiên liệu (dầu, than, khí), quặng kim loại, quặng phi kim (lưu huỳnh, phosphorus…), đá vôi… mang lại lợi ích kinh tế to lớn.', 'Các mỏ dần cạn kiệt, bãi phế thải gây ô nhiễm – cần tiết kiệm, bảo vệ tài nguyên, sử dụng vật liệu tái chế để phát triển bền vững.'], scene: 2 },
    ],
    examples: ['Khai thác cát trái phép ở lòng sông gây sạt lở bờ sông, ảnh hưởng dòng chảy và đời sống người dân.'],
    exercises: [
      { q: 'Hai nguyên tố nào chiếm nhiều nhất trong vỏ Trái Đất? Chúng thường tồn tại trong hợp chất nào?', a: 'Oxygen và silicon (khoảng 3/4 khối lượng), tồn tại chủ yếu trong SiO₂ và các muối silicate.' },
    ],
  },

  'h9-34': {
    opener: 'Nhỏ HCl vào đá vôi thấy sủi bọt. Đá vôi có thành phần chính là gì, khai thác từ đâu và có ứng dụng gì?',
    goals: ['Trình bày nguồn đá vôi, thành phần chính; ứng dụng: đá vôi nghiền, CaO, Ca(OH)₂, nguyên liệu xi măng.', 'Nêu ứng dụng quan trọng của silicon và hợp chất của silicon.', 'Trình bày sơ lược ngành công nghiệp silicate; các công đoạn sản xuất đồ gốm, thuỷ tinh, xi măng.'],
    sections: [
      { title: 'Đá vôi', body: ['Đá vôi có nhiều ở núi đá, mỏ đá, bãi vỏ sò, san hô; thành phần chính là CaCO₃ (rắn, trắng, không tan).', 'Nung đá vôi: CaCO₃ →(t°) CaO + CO₂. Vôi sống tác dụng với nước: CaO + H₂O → Ca(OH)₂.', 'Ứng dụng: chất độn cao su, chất dẻo; sản xuất thuỷ tinh, xi măng; CaO dùng tạo xỉ trong luyện kim, xử lí nước thải, khử chua đất; Ca(OH)₂ khử chua đất, sản xuất clorua vôi.'], scene: 1 },
      { title: 'Silicon và hợp chất', body: ['Silicon chiếm 28,2% khối lượng vỏ Trái Đất, chỉ tồn tại ở dạng hợp chất (SiO₂, muối silicate).', 'Silicon tinh khiết là chất bán dẫn: vi mạch, pin Mặt Trời. Thạch anh: dụng cụ quang học, thuỷ tinh chịu nhiệt, cáp quang.'], scene: 2 },
      { title: 'Công nghiệp silicate', body: ['Đồ gốm: nghiền, trộn nguyên liệu → tạo hình, sấy khô → nung (đồ sứ: tráng men, nung lần hai).', 'Thuỷ tinh: cát trắng + đá vôi + soda, nung khoảng 1 400 °C; CaO + SiO₂ → CaSiO₃; Na₂CO₃ + SiO₂ → Na₂SiO₃ + CO₂.', 'Xi măng: đá vôi + đất sét + quặng sắt, nung 1 400 – 1 600 °C được clanhke, nghiền với thạch cao.'], scene: 3 },
    ],
    examples: ['Làng gốm Bát Tràng (Hà Nội), Phù Lãng (Bắc Ninh), Bàu Trúc (Khánh Hoà); xi măng ở Thanh Hoá, Hải Phòng, Ninh Bình…'],
    exercises: [
      { q: 'Viết phương trình nhiệt phân đá vôi và vôi sống tác dụng với nước.', a: 'CaCO₃ →(t°) CaO + CO₂; CaO + H₂O → Ca(OH)₂.' },
      { q: 'Khai thác đá vôi ảnh hưởng gì đến môi trường? Đề xuất biện pháp.', a: 'Gây xói mòn đất, bụi, ô nhiễm nước, phá huỷ cảnh quan, môi trường sống. Cần quy hoạch, cấp phép, trồng cây phủ xanh, xử lí bụi, nước thải.' },
    ],
  },

  'h9-35': {
    opener: 'Nhiên liệu hoá thạch là gì? Khai thác, sử dụng chúng đem lại lợi ích gì và ảnh hưởng đến môi trường thế nào?',
    goals: ['Nêu khái niệm nhiên liệu hoá thạch; nguồn gốc tự nhiên và nhân tạo của methane.', 'Trình bày lợi ích, thực trạng khai thác và giải pháp hạn chế sử dụng nhiên liệu hoá thạch.', 'Nêu các dạng tồn tại của carbon; chu trình carbon và vai trò của CO₂.', 'Nêu CO₂, CH₄ là nguyên nhân chính gây hiệu ứng nhà kính; bằng chứng, hệ quả và biện pháp giảm phát thải.'],
    sections: [
      { title: 'Nhiên liệu hoá thạch, methane', body: ['Nhiên liệu hoá thạch tạo thành từ sự phân huỷ sinh vật bị chôn vùi hàng trăm triệu năm, chứa hàm lượng carbon cao: than mỏ (rắn), dầu mỏ (lỏng), khí mỏ dầu và khí thiên nhiên (khí), băng cháy.', 'Methane hình thành từ quá trình tự nhiên và từ hoạt động của con người: bãi rác, nông nghiệp, chăn nuôi gia súc, khai thác dầu khí.'], scene: 1 },
      { title: 'Khai thác, sử dụng nhiên liệu hoá thạch', body: ['Là nguồn năng lượng chính, trữ lượng lớn, dễ khai thác, vận chuyển. Nhưng đang cạn kiệt và khi đốt thải CO₂, CO, SO₂, NOₓ… gây ô nhiễm.', 'Giải pháp: tiết kiệm năng lượng; đi phương tiện công cộng, xe điện; dùng xăng E5, sinh khối, biodiesel.'], scene: 2 },
      { title: 'Chu trình carbon', body: ['Carbon tồn tại ở dạng đơn chất (kim cương, than chì), hợp chất vô cơ (CO₂, muối carbonate), hợp chất hữu cơ.', 'CO₂ được phát thải qua hô hấp, đốt nhiên liệu, cháy rừng, núi lửa; được hấp thụ qua quang hợp và hoà tan vào nước biển; xác sinh vật phân huỷ tạo nhiên liệu hoá thạch, muối carbonate.'], scene: 3 },
      { title: 'Hiệu ứng nhà kính, ấm lên toàn cầu', body: ['CO₂ và CH₄ là nguyên nhân chính gây hiệu ứng nhà kính. Từ 1901 đến 2020, hàm lượng CO₂ tăng từ 0,030% lên 0,040%.', 'Hệ quả: thời tiết cực đoan, băng tan, nước biển dâng, acid hoá nước biển, sa mạc hoá, suy giảm đa dạng sinh học.', 'Biện pháp: hạn chế năng lượng hoá thạch, tăng năng lượng tái tạo, xử lí rác thải, trồng rừng, phủ xanh đồi trọc.'], scene: 4 },
    ],
    examples: ['Năm 1986, tấn dầu đầu tiên được khai thác ở mỏ Bạch Hổ.', 'Năng suất toả nhiệt: gỗ 15 – 20 kJ/g, than đá 20 – 30 kJ/g, dầu hoả 42 – 45 kJ/g.'],
    exercises: [
      { q: 'Củi gỗ có phải là nhiên liệu hoá thạch không? Vì sao?', a: 'Không. Củi gỗ được tạo ra từ cây sống trong thời gian ngắn, không phải do sinh vật bị chôn vùi phân huỷ hàng triệu năm.' },
      { q: 'Viết phương trình đốt cháy ethylic alcohol, methane, than.', a: 'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O; CH₄ + 2O₂ → CO₂ + 2H₂O; C + O₂ → CO₂.' },
      { q: 'Vì sao nhiệt độ toàn cầu tăng dẫn đến nước biển dâng?', a: 'Băng ở vùng cực, núi cao tan chảy ra biển và nước biển nở ra khi nóng lên; gây ngập lụt, xâm nhập mặn, sạt lở ven biển.' },
    ],
  },
};
