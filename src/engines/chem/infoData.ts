// Dữ liệu thẻ thông tin và các bước quy trình (nội dung tự biên soạn theo chương trình KHTN 8, 9).

export interface Card {
  name: string;
  icon: string;
  /** công thức / kí hiệu */
  f?: string;
  use: string;
  note?: string;
}

export interface CardSet {
  title: string;
  cards: Card[];
  /** tiêu đề mục "lưu ý" ở bảng bên */
  noteLabel?: string;
}

export const CARD_SETS: Record<string, CardSet> = {
  // ---------- KHTN 7 ----------
  skills7: {
    title: 'Các kĩ năng học tập môn Khoa học tự nhiên',
    noteLabel: 'Ví dụ',
    cards: [
      { name: 'Kĩ năng quan sát, phân loại', icon: 'eye', use: 'Quan sát để chỉ ra đặc điểm của đối tượng; dựa vào đặc điểm giống và khác nhau để sắp xếp đối tượng thành từng nhóm.', note: 'Quan sát hình dạng lá cây rồi chia thành nhóm lá đơn, lá kép; xếp các vật thành nhóm vật dẫn điện và vật cách điện.' },
      { name: 'Kĩ năng liên kết', icon: 'link', use: 'Liên kết các kiến thức, sự kiện, hiện tượng để tìm ra mối quan hệ giữa chúng, từ đó giải thích hiện tượng.', note: 'Nước được cấu tạo từ hydrogen và oxygen, vậy trong nước có nguyên tố hydrogen và nguyên tố oxygen.' },
      { name: 'Kĩ năng đo', icon: 'ruler', use: 'Ước lượng để chọn dụng cụ đo phù hợp; thực hiện phép đo, ghi kết quả và xử lí số liệu; nhận xét độ chính xác; phân tích, thảo luận kết quả.', note: 'Đo khối lượng cuốn sách bằng cân điện tử 3 lần, lấy giá trị trung bình.' },
      { name: 'Kĩ năng dự báo', icon: 'forecast', use: 'Đề xuất điều gì sẽ xảy ra dựa trên quan sát, kiến thức và suy luận; có dự báo định tính và dự báo định lượng.', note: 'Dựa vào số liệu phát thải khí nhà kính để dự báo xu hướng nhiệt độ trung bình của Trái Đất.' },
      { name: 'Kĩ năng viết, trình bày báo cáo', icon: 'paper', use: 'Báo cáo gồm: tên đề tài, mục đích, câu hỏi, giả thuyết, dụng cụ, các bước tiến hành, kết quả, thảo luận, kết luận.', note: 'Có thể trình bày bằng lời nói, bài viết, sơ đồ, bảng biểu, poster, bài trình chiếu…' },
    ],
  },
  tools7: {
    title: 'Dụng cụ đo trong môn Khoa học tự nhiên 7',
    noteLabel: 'Cách sử dụng',
    cards: [
      { name: 'Cổng quang điện', icon: 'gate', use: 'Đóng vai trò như công tắc điều khiển đồng hồ đo thời gian hiện số. Gồm bộ phận phát tia hồng ngoại và bộ phận thu tia hồng ngoại, nối với đồng hồ bằng dây cáp.', note: 'Khi vật chắn tia hồng ngoại, cổng quang gửi tín hiệu điện tới đồng hồ để bắt đầu hoặc dừng đếm.' },
      { name: 'Đồng hồ đo thời gian hiện số', icon: 'timer', use: 'Hoạt động như đồng hồ bấm giây nhưng được điều khiển bằng cổng quang nên đo chính xác hơn.', note: 'Chọn thang đo 99,99 s – 0,01 s; chế độ MODE A ↔ B: đo khoảng thời gian từ lúc vật qua cổng A đến lúc vật qua cổng B. Nút RESET đưa số chỉ về 0.' },
      { name: 'Đồng hồ bấm giây', icon: 'stopwatch', use: 'Đo khoảng thời gian bằng tay: bấm để bắt đầu, bấm để dừng.', note: 'Có sai số do thời gian phản ứng của người bấm; nên đo nhiều lần và lấy giá trị trung bình.' },
      { name: 'Thước đo độ dài', icon: 'ruler', use: 'Đo quãng đường, khoảng cách giữa hai cổng quang.', note: 'Chọn thước có giới hạn đo và độ chia nhỏ nhất phù hợp; đặt mắt nhìn vuông góc với thước khi đọc.' },
      { name: 'Cân điện tử', icon: 'scale', use: 'Đo khối lượng của vật.', note: 'Bấm nút đưa số chỉ về 0 trước khi đặt vật; không đặt vật nặng quá giới hạn đo của cân.' },
    ],
  },
  tools8: {
    title: 'Dụng cụ thí nghiệm thông dụng',
    noteLabel: 'Cách sử dụng',
    cards: [
      { name: 'Ống nghiệm', icon: 'tube', use: 'Đựng lượng nhỏ hoá chất để làm thí nghiệm, quan sát hiện tượng.', note: 'Cầm bằng tay không thuận, dùng tay thuận thêm hoá chất. Khi đun phải kẹp bằng kẹp gỗ.' },
      { name: 'Cốc thuỷ tinh', icon: 'beaker', use: 'Đựng, pha chế dung dịch; có vạch chia ước lượng thể tích.', note: 'Khi đun cốc cần đặt trên lưới tản nhiệt.' },
      { name: 'Bình tam giác', icon: 'flask', use: 'Đựng dung dịch, thực hiện phản ứng cần lắc trộn mà ít bị bắn ra ngoài.', note: 'Miệng bình hẹp nên hạn chế bay hơi và văng hoá chất.' },
      { name: 'Phễu lọc', icon: 'funnel', use: 'Rót chất lỏng vào bình miệng nhỏ; lọc tách chất rắn không tan (kèm giấy lọc).', note: 'Đặt phễu trên giá, cuống phễu chạm thành cốc hứng.' },
      { name: 'Ống đong (bình chia độ)', icon: 'cylinder', use: 'Đo thể tích chất lỏng.', note: 'Đặt ống đong thẳng đứng, mắt nhìn ngang mực chất lỏng khi đọc.' },
      { name: 'Ống hút nhỏ giọt', icon: 'dropper', use: 'Lấy một lượng nhỏ chất lỏng, nhỏ từng giọt.', note: 'Bóp quả bóp trước khi nhúng vào lọ, thả từ từ để hút; không chạm đầu ống vào thành ống nghiệm.' },
      { name: 'Kẹp gỗ', icon: 'clamp', use: 'Kẹp ống nghiệm khi đun nóng.', note: 'Kẹp ở khoảng 1/3 ống nghiệm tính từ miệng ống.' },
      { name: 'Thìa, panh lấy hoá chất', icon: 'spoon', use: 'Xúc hoá chất rắn dạng bột, hạt nhỏ (thìa); gắp chất rắn dạng hạt to, dây, thanh (panh).', note: 'Không dùng tay lấy hoá chất; không đặt lại thìa, panh vào lọ hoá chất sau khi dùng.' },
      { name: 'Đèn cồn', icon: 'burner', use: 'Đun nóng hoá chất. Phần nóng nhất là khoảng 2/3 ngọn lửa tính từ dưới lên.', note: 'Không châm đèn cồn từ một đèn cồn khác; tắt bằng nắp đậy, không thổi.' },
    ],
  },
  devices8: {
    title: 'Một số thiết bị trong phòng thí nghiệm KHTN 8',
    noteLabel: 'Lưu ý khi sử dụng',
    cards: [
      { name: 'Thiết bị đo pH', icon: 'phmeter', use: 'Máy đo pH, bút đo pH: nhúng điện cực vào dung dịch, giá trị pH hiện trên màn hình.', note: 'Rửa sạch điện cực bằng nước cất trước và sau mỗi lần đo.' },
      { name: 'Huyết áp kế', icon: 'bp', use: 'Đo huyết áp: bao cao su quấn quanh cánh tay, nối với áp kế đồng hồ và quả bóp cao su có van.', note: 'Ngồi yên, thả lỏng khi đo.' },
      { name: 'Pin (nguồn điện)', icon: 'battery', use: 'Các thí nghiệm điện thường dùng pin 1,5 V; 2 pin cho nguồn 3 V, 4 pin cho nguồn 6 V.', note: 'Lắp đúng cực dương (+), cực âm (−).' },
      { name: 'Biến áp nguồn', icon: 'supply', use: 'Chuyển điện áp xoay chiều 220 V thành điện áp nhỏ (3 V, 6 V, 9 V, 12 V…) an toàn cho thí nghiệm.', note: 'KHTN 8 dùng đầu ra một chiều (DC): chốt đỏ là cực dương, chốt đen là cực âm. Chọn điện áp phù hợp trước khi bật.' },
      { name: 'Ampe kế, vôn kế', icon: 'meter', use: 'Ampe kế đo cường độ dòng điện, vôn kế đo hiệu điện thế.', note: 'Chú ý chốt (+), chốt (−); ước lượng giá trị cần đo để chọn thang đo phù hợp, không vượt quá giới hạn đo.' },
      { name: 'Joulemeter', icon: 'joule', use: 'Đo dòng điện, điện áp, công suất và năng lượng điện cung cấp cho mạch; hiển thị trên màn hình LED.', note: 'Nút Start: khởi động; nút cài đặt: chọn đại lượng cần đo; nút Reset: đưa số chỉ về 0.' },
      { name: 'Biến trở', icon: 'rheostat', use: 'Thay đổi điện trở để điều chỉnh cường độ dòng điện trong mạch.', note: 'Đặt con chạy ở vị trí điện trở lớn nhất trước khi đóng mạch.' },
      { name: 'Điốt phát quang (LED)', icon: 'led', use: 'Phát sáng khi có dòng điện chạy qua theo một chiều nhất định.', note: 'Cực dương của LED nối với cực dương của nguồn; mắc nối tiếp với một điện trở bảo vệ.' },
      { name: 'Bóng đèn pin kèm đui', icon: 'bulb', use: 'Thiết bị tiêu thụ điện, sáng khi có dòng điện.', note: 'Dùng đúng hiệu điện thế định mức (thường 3 V).' },
      { name: 'Công tắc', icon: 'switch', use: 'Đóng, ngắt mạch điện.', note: 'Mắc nối tiếp trong mạch; ngắt công tắc khi lắp mạch.' },
      { name: 'Cầu chì ống', icon: 'fuse', use: 'Tự ngắt mạch khi dòng điện quá lớn, bảo vệ thiết bị.', note: 'Thay đúng loại cầu chì có cường độ định mức phù hợp.' },
      { name: 'Dây nối', icon: 'wires', use: 'Nối các thiết bị điện thành mạch kín.', note: 'Kiểm tra vỏ cách điện; không chạm tay vào phần kim loại khi mạch có điện.' },
    ],
  },
  hazards: {
    title: 'Kí hiệu cảnh báo trên nhãn hoá chất',
    noteLabel: 'Cần làm gì',
    cards: [
      { name: 'Chất ăn mòn', icon: 'hzCorrosive', use: 'Gây bỏng da, tổn thương mắt, ăn mòn kim loại. Ví dụ: acid đặc, sodium hydroxide.', note: 'Đeo găng tay, kính bảo hộ; nếu dính vào da phải rửa ngay bằng nhiều nước và báo giáo viên.' },
      { name: 'Chất dễ cháy', icon: 'hzFlame', use: 'Dễ bắt lửa. Ví dụ: cồn (ethylic alcohol), xăng, acetone.', note: 'Để xa nguồn lửa, đậy kín nắp sau khi dùng.' },
      { name: 'Chất độc', icon: 'hzToxic', use: 'Gây ngộ độc, nguy hiểm tính mạng khi nuốt, hít phải hoặc tiếp xúc qua da.', note: 'Không ngửi trực tiếp, không nếm; làm trong tủ hút; rửa tay sau thí nghiệm.' },
      { name: 'Chất oxi hoá', icon: 'hzOxid', use: 'Có thể gây cháy hoặc làm đám cháy mạnh thêm. Ví dụ: bình khí oxygen, KMnO₄.', note: 'Không để gần chất dễ cháy.' },
      { name: 'Khí nén', icon: 'hzGas', use: 'Bình chứa khí dưới áp suất cao, có thể nổ khi bị nung nóng.', note: 'Đặt bình ở nơi thoáng mát, tránh va đập.' },
      { name: 'Nguy hại sức khoẻ', icon: 'hzHealth', use: 'Có thể gây hại lâu dài cho sức khoẻ (phổi, hệ thần kinh…).', note: 'Hạn chế tiếp xúc, dùng khẩu trang và găng tay.' },
      { name: 'Gây kích ứng, có hại', icon: 'hzExcl', use: 'Có thể gây kích ứng da, mắt, đường hô hấp.', note: 'Tránh tiếp xúc trực tiếp.' },
      { name: 'Nguy hại môi trường', icon: 'hzEnv', use: 'Độc với sinh vật dưới nước, gây ô nhiễm môi trường.', note: 'Không đổ hoá chất thừa vào cống; thu gom theo hướng dẫn của giáo viên.' },
      { name: 'Chất dễ nổ', icon: 'hzExplode', use: 'Có thể nổ khi gặp lửa, va đập hoặc ma sát.', note: 'Học sinh không được tự ý sử dụng.' },
    ],
  },
  tools9: {
    title: 'Dụng cụ thí nghiệm về chất và sự biến đổi chất (KHTN 9)',
    noteLabel: 'Lưu ý',
    cards: [
      { name: 'Bát sứ', icon: 'dish', use: 'Trộn hoặc đun nóng chảy chất rắn, cô đặc dung dịch, thực hiện phản ứng toả nhiệt mạnh (đốt cồn…).', note: 'Bát sứ chịu nhiệt tốt nhưng dễ vỡ khi bị làm lạnh đột ngột.' },
      { name: 'Phễu', icon: 'funnel', use: 'Rót chất lỏng hoặc lọc (kèm giấy lọc).', note: 'Thường làm bằng thuỷ tinh hoặc nhựa; không dùng phễu nhựa với dung dịch nóng.' },
      { name: 'Phễu chiết', icon: 'sepfunnel', use: 'Tách các chất lỏng không tan vào nhau (chiết): mở khoá cho lớp dưới chảy ra trước.', note: 'Đóng khoá trước khi rót chất lỏng vào; mở nút trên khi chiết.' },
      { name: 'Bình cầu', icon: 'roundflask', use: 'Đựng chất lỏng, pha chế dung dịch, đun nóng, chưng cất (bình cầu có nhánh).', note: 'Đun trên lưới tản nhiệt hoặc bếp điện; không đun khi bình kín.' },
      { name: 'Lưới tản nhiệt', icon: 'mesh', use: 'Đặt dưới cốc, bình khi đun để nhiệt phân bố đều, tránh nứt vỡ dụng cụ thuỷ tinh.', note: 'Dùng kèm kiềng sắt hoặc giá đỡ.' },
      { name: 'Hoá chất cơ bản', icon: 'bottle', use: 'Kim loại (Na, Fe, Cu…), phi kim (S, I₂…), oxide (CuO, CaO, MnO₂…), acid (HCl, H₂SO₄…), base (NaOH, NH₃…), chất hữu cơ (C₂H₅OH, C₆H₁₂O₆…), chất chỉ thị (giấy pH, phenolphthalein…).', note: 'Bảo quản trong chai, lọ có nắp đậy kín và có nhãn ghi thông tin hoá chất.' },
      { name: 'Hoá chất dễ phân huỷ bởi ánh sáng', icon: 'label', f: 'KMnO₄, AgNO₃', use: 'Đựng trong lọ tối màu, để chỗ tối hoặc bọc giấy màu đen bên ngoài lọ.', note: 'Đọc kĩ nhãn trước khi dùng; không tự ý trộn các hoá chất với nhau.' },
      { name: 'Natri (sodium)', icon: 'bottle', f: 'Na', use: 'Kim loại hoạt động mạnh, phản ứng mãnh liệt với nước.', note: 'Bảo quản ngâm trong dầu hoả; dùng panh kẹp, không cầm bằng tay.' },
      { name: 'Sulfuric acid đặc', icon: 'hzCorrosive', f: 'H₂SO₄', use: 'Hoá chất nguy hiểm, háo nước, gây bỏng nặng.', note: 'Học sinh tuyệt đối không tự ý pha loãng acid đặc.' },
    ],
  },
  acidUses: {
    title: 'Ứng dụng của một số acid quan trọng',
    noteLabel: 'Lưu ý',
    cards: [
      { name: 'Sulfuric acid', icon: 'factory', f: 'H₂SO₄', use: 'Hoá chất được tiêu thụ nhiều nhất thế giới: sản xuất phân bón, chất tẩy rửa, chất dẻo, phẩm nhuộm, sơn, giấy, tơ sợi…', note: 'Chất lỏng sánh như dầu, không bay hơi, nặng gần gấp đôi nước; tan vô hạn trong nước và toả rất nhiều nhiệt.' },
      { name: 'Hydrochloric acid', icon: 'pool', f: 'HCl', use: 'Tẩy gỉ thép, tổng hợp chất hữu cơ, xử lí pH nước bể bơi…', note: 'HCl có trong dịch vị dạ dày giúp tiêu hoá thức ăn, diệt vi khuẩn có hại.' },
      { name: 'Acetic acid', icon: 'vinegar', f: 'CH₃COOH', use: 'Chế biến thực phẩm (giấm ăn chứa 2 – 5% acetic acid), sản xuất sơn, dược phẩm, sợi poly(vinyl acetate)…', note: 'Giấm ăn dùng để loại bỏ cặn (chứa CaCO₃) trong ấm đun nước.' },
      { name: 'Nitric acid', icon: 'bag', f: 'HNO₃', use: 'Sản xuất phân đạm, thuốc nổ, phẩm nhuộm…', note: 'Là acid mạnh, cần cẩn thận khi sử dụng.' },
    ],
  },
  naohUses: {
    title: 'Ứng dụng của sodium hydroxide (NaOH)',
    cards: [
      { name: 'Sản xuất nhôm', icon: 'metal', use: 'Xử lí quặng bauxite để tách aluminium oxide.' },
      { name: 'Sản xuất xà phòng', icon: 'soap', use: 'Đun chất béo với dung dịch NaOH (phản ứng xà phòng hoá).' },
      { name: 'Sản xuất tơ nhân tạo', icon: 'fiber', use: 'Xử lí cellulose để sản xuất tơ.' },
      { name: 'Sản xuất pin, acquy', icon: 'battery2', use: 'Làm chất điện li trong một số loại pin.' },
      { name: 'Xử lí nước', icon: 'water', use: 'Điều chỉnh pH, loại bỏ kim loại nặng trong nước thải.' },
      { name: 'Sản xuất giấy', icon: 'paper', use: 'Xử lí gỗ, tách cellulose làm bột giấy.' },
      { name: 'Sản xuất dược phẩm', icon: 'pill', use: 'Nguyên liệu, chất điều chỉnh pH trong sản xuất thuốc.' },
    ],
  },
  fertilizers: {
    title: 'Một số loại phân bón hoá học',
    noteLabel: 'Tác dụng',
    cards: [
      { name: 'Phân đạm', icon: 'bag', f: 'NH₄NO₃, (NH₂)₂CO, NaNO₃, Ca(NO₃)₂', use: 'Cung cấp nguyên tố nitrogen (N). Đều dễ tan trong nước.', note: 'Thúc đẩy sinh trưởng, giúp cây phát triển thân, rễ, lá.' },
      { name: 'Phân lân', icon: 'bag', f: 'Ca₃(PO₄)₂, Ca(H₂PO₄)₂', use: 'Cung cấp phosphorus (P). Lân nung chảy (không tan, tan chậm trong đất chua); superphosphate đơn (Ca(H₂PO₄)₂ + CaSO₄, ít tan); superphosphate kép (Ca(H₂PO₄)₂, tan được).', note: 'Giúp cây phát triển bộ rễ, ra hoa, đậu quả. Đất chua dùng lân nung chảy; đất không chua hoặc chua ít dùng super lân.' },
      { name: 'Phân kali', icon: 'bag', f: 'KCl, K₂SO₄', use: 'Cung cấp potassium (K). Có cả trong phân dơi, tro bếp.', note: 'Tăng khả năng hút nước, chất dinh dưỡng của rễ; giúp cây chịu lạnh, cứng cáp.' },
      { name: 'Phân NPK', icon: 'bag', f: 'N – P – K', use: 'Phân hỗn hợp chứa đạm, lân, kali; có thể thêm nguyên tố trung lượng (Ca, Mg…) và vi lượng (Zn, Cu…).', note: 'Con số trên bao (ví dụ 16-16-8) cho biết hàm lượng của từng thành phần.' },
      { name: 'Nguyên tố vi lượng', icon: 'plant', f: 'Zn, Mn, Fe, Cu…', use: 'Cây cần lượng rất ít nhưng không thể thiếu.', note: 'Kích thích quá trình sinh trưởng, trao đổi chất của cây.' },
      { name: 'Phân bón hữu cơ', icon: 'trash', use: 'Ủ từ rác thải hữu cơ (rau thừa, vỏ củ quả…) với chế phẩm vi sinh trong 25 – 30 ngày.', note: 'Giàu dinh dưỡng, làm đất tơi xốp, an toàn, giảm ô nhiễm do phân hoá học.' },
    ],
  },
  metalUses: {
    title: 'Tính chất vật lí và ứng dụng của kim loại',
    noteLabel: 'Dựa trên tính chất',
    cards: [
      { name: 'Vàng làm đồ trang sức', icon: 'gold', f: 'Au', use: 'Vàng là kim loại dẻo nhất, dễ dát mỏng, kéo sợi; có ánh kim đẹp, không bị gỉ.', note: 'Tính dẻo, ánh kim; không phản ứng với oxygen.' },
      { name: 'Đồng làm lõi dây điện', icon: 'copperwire', f: 'Cu', use: 'Đồng dẫn điện rất tốt (chỉ sau bạc), giá thành hợp lí.', note: 'Tính dẫn điện, tính dẻo.' },
      { name: 'Nhôm làm xoong, nồi', icon: 'pot', f: 'Al', use: 'Nhôm nhẹ, dẫn nhiệt tốt, bề mặt có lớp oxide bảo vệ.', note: 'Tính dẫn nhiệt, khối lượng riêng nhỏ.' },
      { name: 'Thép làm cầu, nhà', icon: 'bridge', f: 'Fe – C', use: 'Thép cứng, bền, chịu lực tốt.', note: 'Độ cứng, độ bền cao.' },
      { name: 'Bạc', icon: 'metal', f: 'Ag', use: 'Kim loại dẫn điện và dẫn nhiệt tốt nhất.', note: 'Dùng trong tiếp điểm điện cao cấp, đồ trang sức.' },
      { name: 'Tungsten', icon: 'bulb', f: 'W', use: 'Kim loại có nhiệt độ nóng chảy cao nhất (khoảng 3 400 °C).', note: 'Làm dây tóc bóng đèn sợi đốt.' },
      { name: 'Thuỷ ngân', icon: 'thermo', f: 'Hg', use: 'Kim loại có nhiệt độ nóng chảy thấp nhất, ở thể lỏng ở nhiệt độ thường.', note: 'Hơi thuỷ ngân rất độc.' },
    ],
  },
  alloys: {
    title: 'Một số hợp kim phổ biến',
    noteLabel: 'Ứng dụng',
    cards: [
      { name: 'Gang', icon: 'metal', f: 'Fe + C (2 – 5%)', use: 'Hợp kim của sắt với carbon (2 – 5%) và một số nguyên tố khác. Cứng và giòn hơn thép.', note: 'Đúc chi tiết máy, ống dẫn nước, nắp cống…' },
      { name: 'Thép', icon: 'bridge', f: 'Fe + C (< 2%)', use: 'Hợp kim của sắt với carbon (dưới 2%). Cứng, đàn hồi, chịu lực tốt hơn sắt.', note: 'Xây dựng nhà cửa, cầu đường, phương tiện giao thông.' },
      { name: 'Inox (thép không gỉ)', icon: 'pot', f: 'Fe, C, Cr, Ni', use: 'Thép đặc biệt có thêm chromium, nickel; cứng và khó bị gỉ.', note: 'Đồ gia dụng, thiết bị y tế.' },
      { name: 'Đuy-ra (duralumin)', icon: 'plane', f: 'Al, Cu, Mn, Mg', use: 'Hợp kim của nhôm, nhẹ tương đương nhôm nhưng bền và cứng hơn nhiều.', note: 'Chế tạo máy bay, ô tô.' },
      { name: 'Hợp kim Wood', icon: 'fire', f: 'Bi, Pb, Sn, Cd', use: 'Nóng chảy ở nhiệt độ thấp (dưới 100 °C) – thấp hơn nhiều so với từng kim loại thành phần (Bi 271 °C, Pb 327 °C, Sn 232 °C, Cd 321 °C).', note: 'Làm van nước cứu hoả của hệ thống dập lửa tự động.' },
    ],
  },
  nonmetals: {
    title: 'Ứng dụng của một số phi kim',
    noteLabel: 'Ghi chú',
    cards: [
      { name: 'Kim cương', icon: 'diamond', f: 'C', use: 'Rất cứng: làm mũi khoan, dao cắt kính, đồ trang sức.', note: 'Một dạng đơn chất của carbon.' },
      { name: 'Than chì (graphite)', icon: 'pencil', f: 'C', use: 'Làm điện cực, chất bôi trơn, ruột bút chì.', note: 'Dẫn điện nhưng kém hơn kim loại.' },
      { name: 'Than hoạt tính', icon: 'mask', f: 'C', use: 'Có tính hấp phụ: dùng trong mặt nạ phòng độc, khẩu trang, máy lọc nước, khử màu, khử mùi.', note: 'Giữ trên bề mặt các phân tử chất khí, chất tan.' },
      { name: 'Than cốc', icon: 'coal', f: 'C', use: 'Nhiên liệu, nguyên liệu trong công nghiệp luyện kim (sản xuất gang).', note: '' },
      { name: 'Lưu huỳnh', icon: 'sulfur', f: 'S', use: 'Sản xuất sulfuric acid, lưu hoá cao su, dược phẩm, thuốc diệt nấm, pháo hoa, diêm.', note: 'Lưu hoá cao su tạo cầu nối lưu huỳnh giữa các mạch, giúp cao su bền, đàn hồi hơn.' },
      { name: 'Chlorine', icon: 'chlorine', f: 'Cl₂', use: 'Khử trùng nước sinh hoạt; sản xuất nước Javel, chất tẩy rửa; tẩy trắng vải, giấy; sản xuất chất dẻo, hydrochloric acid.', note: 'Khí màu vàng lục, rất độc.' },
    ],
  },
  fuels: {
    title: 'Nhiên liệu phổ biến',
    noteLabel: 'Sử dụng an toàn, hiệu quả',
    cards: [
      { name: 'Gỗ, củi', icon: 'wood', use: 'Nhiên liệu rắn, năng suất toả nhiệt khoảng 15 – 20 kJ/g.', note: 'Không phải nhiên liệu hoá thạch; đốt nhiều gây khói bụi.' },
      { name: 'Than đá', icon: 'coal', use: 'Nhiên liệu rắn (20 – 30 kJ/g), dùng cho nhà máy nhiệt điện, luyện kim.', note: 'Không đốt than trong phòng kín – nguy cơ ngộ độc khí CO.' },
      { name: 'Xăng', icon: 'car', use: 'Nhiên liệu lỏng cho động cơ xe máy, ô tô.', note: 'Bảo quản trong bình chứa đúng tiêu chuẩn, xa nguồn lửa.' },
      { name: 'Dầu diesel, dầu hoả', icon: 'oil', use: 'Nhiên liệu lỏng cho động cơ diesel, lò nung; dầu hoả cho động cơ phản lực (42 – 45 kJ/g).', note: '' },
      { name: 'Xăng sinh học E5', icon: 'renew', use: 'Xăng có pha 5% ethylic alcohol (về thể tích).', note: 'Giảm tiêu thụ nhiên liệu hoá thạch và khí thải.' },
      { name: 'Khí thiên nhiên, khí mỏ dầu', icon: 'fire', use: 'Nhiên liệu khí, thành phần chính là methane; dùng cho nhà máy điện, sản xuất phân đạm.', note: '' },
      { name: 'Khí hoá lỏng (gas)', icon: 'gas', use: 'Hỗn hợp propane và butane dùng cho bếp gas, bật lửa.', note: 'Đặt bình gas nơi thoáng, xa nguồn nhiệt, thường xuyên kiểm tra rò rỉ.' },
    ],
  },
  ethanolUses: {
    title: 'Ứng dụng của ethylic alcohol',
    noteLabel: 'Dựa vào tính chất',
    cards: [
      { name: 'Dung môi', icon: 'paint', use: 'Dung môi trong mĩ phẩm, dược phẩm, vecni, sơn…', note: 'Hoà tan được nhiều chất như iodine, benzene…' },
      { name: 'Dung dịch sát khuẩn', icon: 'alcohol', use: 'Cồn y tế 70°, nước rửa tay sát khuẩn (60 – 85% ethylic alcohol).', note: 'Làm đông tụ protein của vi khuẩn.' },
      { name: 'Đồ uống có cồn', icon: 'grape', use: 'Rượu, bia, nước quả lên men.', note: 'Lạm dụng rượu bia gây bệnh gan, dạ dày, tim mạch, thần kinh và tai nạn giao thông.' },
      { name: 'Nhiên liệu', icon: 'fire', use: 'Nhiên liệu đèn cồn; pha xăng sinh học E5.', note: 'Cháy toả nhiều nhiệt.' },
      { name: 'Nguyên liệu', icon: 'vinegar', use: 'Điều chế acetic acid, ester…', note: '' },
    ],
  },
  aceticUses: {
    title: 'Ứng dụng của acetic acid',
    cards: [
      { name: 'Giấm ăn', icon: 'vinegar', use: 'Giấm ăn chứa acetic acid 2 – 5%, làm gia vị, bảo quản thực phẩm.' },
      { name: 'Sản xuất tơ', icon: 'fiber', use: 'Nguyên liệu sản xuất tơ nhân tạo.' },
      { name: 'Dược phẩm', icon: 'pill', use: 'Nguyên liệu sản xuất thuốc.' },
      { name: 'Hoá chất, chất dẻo', icon: 'factory', use: 'Sản xuất ester, phẩm nhuộm, chất dẻo…' },
      { name: 'Chất kết dính', icon: 'paint', use: 'Sản xuất keo dán.' },
      { name: 'Dung môi', icon: 'flask', use: 'Dùng làm dung môi trong công nghiệp.' },
    ],
  },
  lipids: {
    title: 'Lipid trong tự nhiên',
    noteLabel: 'Vai trò',
    cards: [
      { name: 'Dầu thực vật', icon: 'oilbottle', use: 'Chất béo ở thể lỏng: dầu lạc, dầu hướng dương, dầu đậu nành…', note: 'Nên ưu tiên chất béo nguồn gốc thực vật trong khẩu phần ăn.' },
      { name: 'Mỡ động vật', icon: 'meat', use: 'Chất béo ở thể rắn: mỡ lợn, mỡ bò…', note: 'Nguồn dự trữ năng lượng chính trong cơ thể.' },
      { name: 'Bơ', icon: 'butter', use: 'Chất béo dùng trong chế biến thực phẩm.', note: '' },
      { name: 'Sáp', icon: 'tree', use: 'Có trên bề mặt lá, thân cây, vỏ trái cây và da, lông một số động vật.', note: 'Giúp chống thấm nước và bảo vệ khỏi tác động có hại từ môi trường.' },
      { name: 'Xà phòng', icon: 'soap', use: 'Sản xuất từ chất béo và dung dịch kiềm.', note: 'Muối Na (hoặc K) của acid béo.' },
      { name: 'Diesel sinh học', icon: 'renew', use: 'Nhiên liệu sản xuất từ dầu thực vật hoặc mỡ động vật.', note: '' },
    ],
  },
  carbs: {
    title: 'Carbohydrate trong đời sống',
    noteLabel: 'Ứng dụng dựa trên tính chất',
    cards: [
      { name: 'Glucose', icon: 'grape', f: 'C₆H₁₂O₆', use: 'Có nhiều trong quả nho chín; có trong máu người. Tráng gương, sản xuất đồ uống có cồn, dịch truyền glucose.', note: 'Có phản ứng tráng bạc, phản ứng lên men rượu.' },
      { name: 'Saccharose', icon: 'cane', f: 'C₁₂H₂₂O₁₁', use: 'Có nhiều trong mía, củ cải đường, thốt nốt. Chất tạo ngọt cho đồ uống, bánh kẹo.', note: 'Thuỷ phân (xúc tác acid hoặc enzyme) tạo glucose và fructose.' },
      { name: 'Tinh bột', icon: 'rice', f: '(C₆H₁₀O₅)ₙ', use: 'Có nhiều trong gạo, ngô, khoai, sắn. Lương thực; sản xuất hồ dán, ethylic alcohol.', note: 'Phản ứng màu xanh tím với iodine.' },
      { name: 'Cellulose', icon: 'cotton', f: '(C₆H₁₀O₅)ₘ', use: 'Có nhiều trong gỗ, bông, tre, nứa. Sản xuất giấy, tơ sợi, đồ gỗ, cồn công nghiệp.', note: 'Cơ thể người không có enzyme thuỷ phân cellulose.' },
    ],
  },
  proteins: {
    title: 'Protein – vai trò và nguồn thực phẩm',
    noteLabel: 'Ghi chú',
    cards: [
      { name: 'Sữa', icon: 'milk', use: 'Thực phẩm giàu protein.', note: '' },
      { name: 'Trứng', icon: 'egg', use: 'Lòng trắng trứng chứa nhiều protein, dễ đông tụ khi đun nóng.', note: '' },
      { name: 'Thịt, cá', icon: 'meat', use: 'Nguồn protein quan trọng trong khẩu phần ăn.', note: '' },
      { name: 'Kén tằm', icon: 'silk', use: 'Nguyên liệu sản xuất tơ tằm (tơ tự nhiên).', note: 'Đốt tơ tằm có mùi khét như tóc cháy – phân biệt với tơ nylon.' },
      { name: 'Vai trò cấu trúc', icon: 'plant', use: 'Cấu tạo nên cơ bắp, da, tóc…', note: '' },
      { name: 'Vai trò xúc tác, nội tiết, vận chuyển', icon: 'pill', use: 'Enzyme xúc tác phản ứng sinh hoá; hormone điều hoà; hemoglobin vận chuyển oxygen.', note: '' },
    ],
  },
  polymerMat: {
    title: 'Vật liệu polymer',
    noteLabel: 'Sử dụng, bảo quản',
    cards: [
      { name: 'Chất dẻo', icon: 'plastic', use: 'Vật liệu chế tạo từ polymer có tính dẻo (biến dạng khi chịu nhiệt, áp lực và giữ được biến dạng). Gồm polymer, chất độn, chất hoá dẻo, chất tạo màu…', note: 'Không để đồ nhựa gần nguồn nhiệt cao; hạn chế đựng thức ăn nóng.' },
      { name: 'Tơ', icon: 'fiber', use: 'Polymer mạch không phân nhánh, kéo dài thành sợi: tơ thiên nhiên (tơ tằm, bông, len), tơ tổng hợp (nylon, polyester).', note: 'Đọc nhãn kí hiệu giặt, là trên quần áo.' },
      { name: 'Cao su', icon: 'tire', use: 'Vật liệu có tính đàn hồi, không thấm nước, không thấm khí, cách điện: lốp xe, ống dẫn, gioăng đệm, áo lặn.', note: 'Tránh nhiệt độ quá cao/thấp, ánh sáng mạnh, xăng dầu.' },
      { name: 'Vật liệu composite', icon: 'composite', use: 'Gồm vật liệu cốt (sợi thuỷ tinh, sợi carbon…) và vật liệu nền (polymer). Làm ống dẫn, bồn chứa, vỏ ô tô, máy bay, tàu thuyền.', note: 'Ví dụ: gỗ nhựa composite từ bột gỗ và nhựa PE.' },
      { name: 'Polyethylene (PE)', icon: 'plastic', use: 'Túi đựng, màng bọc, chai lọ, ống nhựa, vỏ dây điện, đồ chơi.', note: 'Rất khó phân huỷ sinh học, tồn tại hàng trăm năm trong môi trường.' },
    ],
  },
  fiveR: {
    title: 'Nguyên tắc 5R giảm thiểu rác thải nhựa',
    noteLabel: 'Việc em có thể làm',
    cards: [
      { name: 'Đổi mới công nghệ (Renew)', icon: 'renew', use: 'Dùng vật liệu polymer sản xuất từ nguồn tái tạo hoặc có thể phân huỷ sinh học.', note: 'Chọn sản phẩm nhựa sinh học khi có thể.' },
      { name: 'Từ chối (Refuse)', icon: 'refuse', use: 'Từ chối sản phẩm nhựa không phân huỷ sinh học, chọn vật liệu thân thiện môi trường.', note: 'Không lấy túi nilon, ống hút nhựa khi không cần.' },
      { name: 'Giảm thiểu (Reduce)', icon: 'reduce', use: 'Giảm đồ nhựa dùng một lần, thay bằng đồ dùng nhiều lần.', note: 'Mang bình nước, túi vải, hộp cơm cá nhân.' },
      { name: 'Tái sử dụng (Reuse)', icon: 'reuse', use: 'Dùng lại đồ nhựa thành vật dụng hữu ích.', note: 'Chai nhựa làm chậu trồng cây, hộp đựng đồ.' },
      { name: 'Tái chế (Recycle)', icon: 'recycle', use: 'Thu gom, phân loại nhựa có thể tái chế, không vứt ra môi trường.', note: 'Phân loại rác tại nguồn.' },
    ],
  },
  plasticSigns: {
    title: 'Kí hiệu thường gặp trên đồ nhựa gia dụng',
    cards: [
      { name: 'An toàn khi đựng thực phẩm', icon: 'reuse', use: 'Hình cái li và cái nĩa: dùng được để đựng thức ăn, đồ uống.' },
      { name: 'Dùng được trong lò vi sóng', icon: 'water', use: 'Hình lò vi sóng hoặc các đường lượn sóng.' },
      { name: 'Dùng được trong máy rửa bát', icon: 'pot', use: 'Hình đĩa, li trong máy rửa hoặc dưới vòi nước.' },
      { name: 'An toàn khi đông lạnh', icon: 'crystal', use: 'Hình bông tuyết.' },
      { name: 'Nhiệt độ tối đa sử dụng', icon: 'thermo', use: 'Ghi giới hạn nhiệt độ, ví dụ +120 °C.' },
      { name: 'Mã số nhận diện nhựa', icon: 'recycle', use: 'Tam giác mũi tên có số 1 – 7 cho biết loại nhựa (1: PET, 2: HDPE, 4: LDPE, 5: PP…), giúp phân loại để tái chế.' },
    ],
  },
  crust: {
    title: 'Một số loại đá, khoáng chất trong vỏ Trái Đất',
    noteLabel: 'Thành phần hoá học',
    cards: [
      { name: 'Thạch anh', icon: 'crystal', f: 'SiO₂', use: 'Thành phần chính của cát trắng.', note: 'Oxide – oxide phổ biến nhất trong vỏ Trái Đất.' },
      { name: 'Dolomite', icon: 'rock', f: 'CaCO₃·MgCO₃', use: 'Dùng trong xây dựng, sản xuất thuỷ tinh, phân bón.', note: 'Muối carbonate.' },
      { name: 'Đá hoa cương (granite)', icon: 'rock', f: 'muối silicate của Al, Na, K, Ca…', use: 'Làm đá ốp lát, xây dựng.', note: 'Muối silicate.' },
      { name: 'Đá cẩm thạch', icon: 'rock', f: 'CaCO₃, CaCO₃·MgCO₃', use: 'Làm đá trang trí, tượng.', note: 'Muối carbonate.' },
      { name: 'Quặng bauxite', icon: 'rock', f: 'Al₂O₃', use: 'Nguyên liệu sản xuất nhôm.', note: 'Oxide.' },
      { name: 'Quặng hematite', icon: 'rock', f: 'Fe₂O₃', use: 'Nguyên liệu sản xuất gang, thép.', note: 'Oxide.' },
      { name: 'Đá vôi', icon: 'lime', f: 'CaCO₃', use: 'Sản xuất vôi, xi măng, thuỷ tinh…', note: 'Muối carbonate.' },
      { name: 'Than, dầu mỏ, khí thiên nhiên', icon: 'oil', use: 'Nhiên liệu khai thác từ mỏ than, mỏ dầu, mỏ khí.', note: 'Nguồn năng lượng quý nhưng có hạn.' },
    ],
  },
  silicon: {
    title: 'Ứng dụng của silicon và hợp chất của silicon',
    noteLabel: 'Ghi chú',
    cards: [
      { name: 'Vi mạch điện tử', icon: 'chip', f: 'Si', use: 'Silicon tinh khiết là chất bán dẫn, dùng chế tạo vi mạch, cảm biến, thiết bị quang điện.', note: 'Silicon chiếm 28,2% khối lượng vỏ Trái Đất, chỉ sau oxygen.' },
      { name: 'Pin Mặt Trời', icon: 'solar', f: 'Si', use: 'Biến đổi năng lượng ánh sáng thành điện năng.', note: '' },
      { name: 'Thạch anh', icon: 'crystal', f: 'SiO₂', use: 'Máy phát siêu âm, dụng cụ quang học, thuỷ tinh chịu nhiệt, sợi cáp quang.', note: '' },
      { name: 'Đồ gốm, sứ', icon: 'ceramic', use: 'Từ đất sét, cao lanh (muối silicate).', note: 'Làng gốm Bát Tràng (Hà Nội), Phù Lãng (Bắc Ninh), Thanh Hà (Đà Nẵng), Bàu Trúc (Khánh Hoà)…' },
      { name: 'Thuỷ tinh', icon: 'glass', use: 'Hỗn hợp sodium silicate, calcium silicate: kính cửa, chai lọ.', note: '' },
      { name: 'Xi măng', icon: 'cement', use: 'Vật liệu kết dính trong xây dựng.', note: '' },
    ],
  },
  methane: {
    title: 'Nhiên liệu hoá thạch và nguồn khí methane',
    noteLabel: 'Ghi chú',
    cards: [
      { name: 'Than mỏ', icon: 'coal', use: 'Than đá, than nâu, than bùn – thành phần chính là carbon.', note: 'Nhiên liệu hoá thạch dạng rắn.' },
      { name: 'Dầu mỏ', icon: 'oil', use: 'Thành phần chủ yếu là các hydrocarbon.', note: 'Nhiên liệu hoá thạch dạng lỏng.' },
      { name: 'Khí mỏ dầu, khí thiên nhiên', icon: 'fire', use: 'Có hàm lượng methane lớn (khí thiên nhiên khoảng 95% methane).', note: 'Nhiên liệu hoá thạch dạng khí.' },
      { name: 'Băng cháy', icon: 'crystal', use: 'Hỗn hợp đông lạnh của nước và khí tự nhiên, hình thành ở áp suất cao, nhiệt độ thấp.', note: '' },
      { name: 'Methane từ bãi rác', icon: 'trash', use: 'Sinh ra khi các chất hữu cơ bị phân huỷ sinh học.', note: 'Nguồn nhân tạo.' },
      { name: 'Methane từ chăn nuôi, nông nghiệp', icon: 'cow', use: 'Tiêu hoá thức ăn của gia súc, ruộng lúa ngập nước.', note: 'Nguồn nhân tạo.' },
    ],
  },
};

// ------------------------------------------------------------------------------------

export interface Step {
  t: string;
  d: string;
  icon: string;
  eq?: string;
}

export interface StepSet {
  title: string;
  steps: Step[];
}

export const STEP_SETS: Record<string, StepSet> = {
  sciMethod7: {
    title: 'Phương pháp tìm hiểu tự nhiên',
    steps: [
      { t: 'Đề xuất vấn đề cần tìm hiểu', d: 'Quan sát, đặt câu hỏi về hiện tượng cần tìm hiểu. Ví dụ: Vì sao hạt đậu để ở chỗ ẩm thì nảy mầm, còn hạt để ở chỗ khô thì không?', icon: 'question' },
      { t: 'Đưa ra dự đoán khoa học', d: 'Dựa vào hiểu biết đã có, đưa ra dự đoán (giả thuyết) để giải quyết vấn đề. Ví dụ: hạt đậu cần nước để nảy mầm.', icon: 'idea' },
      { t: 'Lập kế hoạch kiểm tra dự đoán', d: 'Chọn dụng cụ, thiết kế thí nghiệm hoặc cách thu thập thông tin để kiểm tra dự đoán. Chỉ thay đổi một yếu tố, giữ nguyên các yếu tố khác.', icon: 'paper' },
      { t: 'Thực hiện kế hoạch', d: 'Tiến hành thí nghiệm, quan sát, đo đạc, ghi lại kết quả; phân tích kết quả để khẳng định dự đoán đúng hay sai.', icon: 'flask' },
      { t: 'Viết báo cáo, thảo luận', d: 'Viết báo cáo, trình bày kết quả và thảo luận với các bạn. Nếu dự đoán sai, quay lại bước 2 đưa ra dự đoán mới.', icon: 'conclude' },
    ],
  },
  takeChem: {
    title: 'Quy tắc lấy và sử dụng hoá chất an toàn',
    steps: [
      { t: 'Đọc kĩ nhãn hoá chất', d: 'Không dùng hoá chất trong lọ không có nhãn hoặc nhãn mờ, mất chữ. Đọc tên, công thức, nồng độ, kí hiệu cảnh báo trước khi dùng.', icon: 'label' },
      { t: 'Lấy hoá chất rắn', d: 'Không dùng tay. Dạng bột, hạt nhỏ: xúc bằng thìa kim loại hoặc thuỷ tinh. Dạng hạt to, dây, thanh: gắp bằng panh. Không đặt lại thìa, panh vào lọ sau khi dùng.', icon: 'spoon' },
      { t: 'Lấy hoá chất lỏng', d: 'Rót qua phễu hoặc qua cốc, ống đong có mỏ; lượng nhỏ dùng ống hút nhỏ giọt. Khi rót, hướng nhãn lên trên để giọt hoá chất không làm hỏng nhãn.', icon: 'dropper' },
      { t: 'Đun nóng ống nghiệm', d: 'Kẹp ống ở khoảng 1/3 từ miệng ống. Hơ nóng đều đáy ống rồi mới đun tại chỗ có hoá chất, ở khoảng 2/3 ngọn lửa từ dưới lên. Miệng ống hướng về phía không có người.', icon: 'burner' },
      { t: 'Khi có sự cố', d: 'Hoá chất dính vào người hoặc bị đổ, tràn ra ngoài: báo ngay cho giáo viên để được hướng dẫn xử lí.', icon: 'hzExcl' },
      { t: 'Sau thí nghiệm', d: 'Hoá chất dùng còn thừa không đổ trở lại bình chứa, xử lí theo hướng dẫn của giáo viên. Rửa sạch dụng cụ, rửa tay.', icon: 'water' },
    ],
  },
  safeElectric: {
    title: 'Sử dụng điện an toàn trong phòng thí nghiệm',
    steps: [
      { t: 'Kiểm tra thiết bị', d: 'Kiểm tra dây nối, vỏ cách điện, thang đo của đồng hồ trước khi lắp mạch.', icon: 'wires' },
      { t: 'Lắp mạch khi chưa có điện', d: 'Ngắt công tắc, tắt biến áp nguồn khi lắp hoặc sửa mạch.', icon: 'switch' },
      { t: 'Chọn đúng nguồn', d: 'Dùng đầu ra một chiều (DC) của biến áp nguồn; chọn điện áp phù hợp với thí nghiệm.', icon: 'supply' },
      { t: 'Mắc đúng đồng hồ đo', d: 'Ampe kế mắc nối tiếp, vôn kế mắc song song; chốt (+) nối về phía cực dương của nguồn; chọn thang đo lớn hơn giá trị cần đo.', icon: 'meter' },
      { t: 'Bảo vệ thiết bị', d: 'Mắc điện trở bảo vệ cho đèn LED; dùng cầu chì đúng loại.', icon: 'fuse' },
      { t: 'Kết thúc', d: 'Tắt nguồn, tháo mạch, sắp xếp lại thiết bị.', icon: 'battery' },
    ],
  },
  metalBurn: {
    title: 'Kim loại tác dụng với phi kim',
    steps: [
      { t: 'Sắt cháy trong oxygen', d: 'Đốt nóng dây sắt (uốn hình lò xo) rồi đưa vào bình khí oxygen: sắt cháy sáng, tạo khói màu nâu đỏ.', icon: 'fire', eq: '3Fe + 2O₂ →(t°) Fe₃O₄' },
      { t: 'Nhôm cháy trong không khí', d: 'Rắc bột nhôm trên ngọn lửa đèn cồn: nhôm cháy sáng tạo chất rắn màu trắng.', icon: 'burner', eq: '4Al + 3O₂ →(t°) 2Al₂O₃' },
      { t: 'Natri cháy trong chlorine', d: 'Đun nóng chảy mẩu natri rồi đưa nhanh vào bình khí chlorine (màu vàng lục): natri cháy tạo tinh thể muối ăn màu trắng.', icon: 'chlorine', eq: '2Na + Cl₂ →(t°) 2NaCl' },
      { t: 'Sắt cháy trong chlorine', d: 'Đốt dây sắt nóng đỏ rồi đưa vào bình chlorine: sắt cháy tạo iron(III) chloride màu nâu đỏ.', icon: 'chlorine', eq: '2Fe + 3Cl₂ →(t°) 2FeCl₃' },
      { t: 'Kim loại tác dụng với lưu huỳnh', d: 'Khi đun nóng, nhiều kim loại tác dụng với lưu huỳnh tạo muối sulfide.', icon: 'sulfur', eq: 'Fe + S →(t°) FeS ; 2Al + 3S →(t°) Al₂S₃' },
      { t: 'Vàng không phản ứng với oxygen', d: 'Đồ trang sức bằng vàng để lâu vẫn sáng đẹp; còn nhôm, kẽm, crom… phản ứng với oxygen tạo lớp oxide mỏng, bền bảo vệ kim loại bên trong.', icon: 'gold' },
    ],
  },
  organicFert: {
    title: 'Làm phân bón hữu cơ từ rác thải',
    steps: [
      { t: 'Chuẩn bị', d: 'Khoảng 3 kg rác thải hữu cơ (rau thừa, vỏ củ quả), khoảng 6 g chế phẩm vi sinh (ví dụ Trichoderma – Bacillus), nước, thùng nhựa 5 L, dao, kéo.', icon: 'trash' },
      { t: 'Băm nhỏ rác', d: 'Băm nhỏ rác thải hữu cơ rồi xếp vào thùng nhựa. Không dùng thức ăn thừa có nguồn gốc động vật.', icon: 'plant' },
      { t: 'Trộn chế phẩm vi sinh', d: 'Rắc chế phẩm vi sinh lên rác, trộn đều rồi đậy nắp thùng.', icon: 'reuse' },
      { t: 'Giữ ẩm', d: 'Thỉnh thoảng bổ sung nước để giữ cho hỗn hợp ẩm.', icon: 'drop' },
      { t: 'Thu phân bón', d: 'Sau 25 – 30 ngày thu được phân bón hữu cơ, giúp đất tơi xốp, an toàn khi sử dụng.', icon: 'bag' },
    ],
  },
  extract: {
    title: 'Tách kim loại từ quặng',
    steps: [
      { t: 'Quặng kim loại', d: 'Trong tự nhiên kim loại chủ yếu tồn tại trong quặng dưới dạng hợp chất (oxide, muối…): bauxite (Al₂O₃), hematite (Fe₂O₃), sphalerite (ZnS). Vàng có thể ở dạng đơn chất.', icon: 'rock' },
      { t: 'Làm giàu quặng', d: 'Loại bỏ tạp chất như đất, cát, đá để thu được hợp chất chứa kim loại.', icon: 'sand' },
      { t: 'Điện phân nóng chảy', d: 'Dùng cho kim loại hoạt động hoá học mạnh: Na, Ca, Mg, Al…', icon: 'battery2', eq: '2Al₂O₃ →(điện phân nóng chảy, cryolite) 4Al + 3O₂' },
      { t: 'Nhiệt luyện', d: 'Dùng cho kim loại hoạt động trung bình: Fe, Zn… Dùng C, CO, H₂, Al… khử oxide kim loại ở nhiệt độ cao.', icon: 'fire', eq: 'Fe₂O₃ + 3CO →(t°) 2Fe + 3CO₂ ; ZnO + C →(t°) Zn + CO' },
      { t: 'Thuỷ luyện', d: 'Dùng cho kim loại hoạt động yếu: Ag, Au… Chuyển thành muối tan rồi dùng kim loại mạnh hơn đẩy kim loại ra khỏi dung dịch muối.', icon: 'beaker' },
      { t: 'Thu kim loại', d: 'Quặng →(làm giàu) hợp chất chứa kim loại →(phương pháp hoá học) kim loại.', icon: 'metal' },
    ],
  },
  soap: {
    title: 'Làm xà phòng thủ công',
    steps: [
      { t: 'Chuẩn bị chất béo', d: 'Dầu thực vật hoặc mỡ động vật (có thể tận dụng dầu ăn đã lọc sạch).', icon: 'oilbottle' },
      { t: 'Đun với dung dịch kiềm', d: 'Đun nóng chất béo với dung dịch NaOH (hoặc KOH). Cần đeo găng tay, kính bảo hộ vì kiềm ăn mòn da.', icon: 'burner', eq: '(RCOO)₃C₃H₅ + 3NaOH →(t°) 3RCOONa + C₃H₅(OH)₃' },
      { t: 'Tách muối của acid béo', d: 'Muối natri của acid béo tạo thành ở dạng keo được tách ra; sản phẩm phụ là glycerol.', icon: 'beaker' },
      { t: 'Phối trộn, ép bánh', d: 'Trộn với chất phụ gia, hương liệu, chất tạo màu rồi ép thành bánh xà phòng.', icon: 'soap' },
    ],
  },
  oil: {
    title: 'Khai thác và chế biến dầu mỏ',
    steps: [
      { t: 'Mỏ dầu', d: 'Mỏ dầu thường có ba lớp: khí mỏ dầu (khí đồng hành, chủ yếu methane) ở trên, lớp dầu lỏng ở giữa, nước mặn ở dưới.', icon: 'mountain' },
      { t: 'Khoan, thu dầu và khí', d: 'Khoan xuống mỏ; dầu và khí được thu lên. Khí thiên nhiên tự phun lên do áp suất trong mỏ lớn hơn áp suất khí quyển.', icon: 'oil' },
      { t: 'Loại bỏ tạp chất', d: 'Thu được dầu thô, vận chuyển đến nhà máy lọc dầu bằng ống dẫn hoặc tàu chở dầu.', icon: 'factory' },
      { t: 'Chưng cất', d: 'Dầu thô được chưng cất để tách thành các phân đoạn ở các khoảng nhiệt độ khác nhau: khí hoá lỏng, xăng, dầu hoả, dầu diesel, dầu bôi trơn, nhựa đường…', icon: 'roundflask' },
      { t: 'Sử dụng', d: 'Làm nhiên liệu, vật liệu, nguyên liệu cho ngành hoá dầu.', icon: 'car' },
    ],
  },
  limestone: {
    title: 'Khai thác và chế biến đá vôi',
    steps: [
      { t: 'Nguồn đá vôi', d: 'Đá vôi có ở các dãy núi đá, mỏ đá, bãi vỏ sò, ốc, xương san hô ở ven biển. Ở nước ta tập trung nhiều ở Bắc Bộ và Bắc Trung Bộ.', icon: 'mountain' },
      { t: 'Khoan và nổ mìn', d: 'Khoan lỗ vào đá, lấp chất nổ rồi kích nổ để phá vỡ đá thành mảnh nhỏ.', icon: 'hzExplode' },
      { t: 'Bốc xếp, vận chuyển', d: 'Vận chuyển đá đến nhà máy.', icon: 'car' },
      { t: 'Chế biến', d: 'Đập nhỏ, phân loại; dùng trong xây dựng, công nghiệp, nông nghiệp.', icon: 'lime' },
      { t: 'Nung vôi', d: 'Nung đá vôi thu vôi sống; vôi sống tác dụng với nước tạo vôi tôi.', icon: 'fire', eq: 'CaCO₃ →(t°) CaO + CO₂ ; CaO + H₂O → Ca(OH)₂' },
      { t: 'Bảo vệ môi trường', d: 'Khai thác đá vôi có thể gây xói mòn đất, ô nhiễm, phá huỷ môi trường sống – cần quy hoạch, cấp phép, giảm thiểu tác động.', icon: 'tree' },
    ],
  },
  ceramic: {
    title: 'Sản xuất đồ gốm',
    steps: [
      { t: 'Nghiền, phối trộn', d: 'Gạch ngói: đất sét, nước. Đồ sứ: đất sét trắng (cao lanh), cát trắng, nước… trộn thành khối dẻo.', icon: 'sand' },
      { t: 'Tạo hình, phơi khô', d: 'Tạo hình sản phẩm rồi phơi (sấy) khô thành sản phẩm thô.', icon: 'brick' },
      { t: 'Nung', d: 'Nung sản phẩm thô trong lò ở nhiệt độ cao trong khoảng thời gian thích hợp.', icon: 'fire' },
      { t: 'Tráng men, nung lần hai (đồ sứ)', d: 'Tráng men, trang trí rồi nung lần hai.', icon: 'ceramic' },
    ],
  },
  glass: {
    title: 'Sản xuất thuỷ tinh',
    steps: [
      { t: 'Trộn nguyên liệu', d: 'Trộn cát thạch anh (cát trắng), đá vôi và soda (Na₂CO₃) theo tỉ lệ thích hợp.', icon: 'sand' },
      { t: 'Nung chảy', d: 'Nung hỗn hợp trong lò ở khoảng 1 400 °C thành thuỷ tinh dạng nhão.', icon: 'fire', eq: 'CaCO₃ →(t°) CaO + CO₂ ; CaO + SiO₂ →(t°) CaSiO₃ ; Na₂CO₃ + SiO₂ →(t°) Na₂SiO₃ + CO₂' },
      { t: 'Làm nguội, tạo hình', d: 'Làm nguội từ từ được thuỷ tinh dẻo; ép, thổi thành các đồ vật.', icon: 'glass' },
    ],
  },
  cement: {
    title: 'Sản xuất xi măng',
    steps: [
      { t: 'Nghiền, trộn nguyên liệu', d: 'Nghiền nhỏ đá vôi, trộn với đất sét có nhiều SiO₂ và một ít quặng sắt.', icon: 'lime' },
      { t: 'Nung clanhke', d: 'Nung hỗn hợp trong lò quay hoặc lò đứng ở 1 400 – 1 600 °C, thu được clanhke (hỗn hợp rắn màu xám).', icon: 'fire' },
      { t: 'Nghiền với thạch cao', d: 'Nghiền clanhke với thạch cao (CaSO₄·2H₂O, khoảng 5%) và phụ gia thành bột mịn: xi măng.', icon: 'cement' },
    ],
  },
  vinegar: {
    title: 'Điều chế acetic acid (lên men giấm)',
    steps: [
      { t: 'Nguyên liệu', d: 'Dung dịch ethylic alcohol loãng (rượu có độ cồn thấp, nước quả lên men).', icon: 'grape' },
      { t: 'Lên men giấm', d: 'Để tiếp xúc với không khí, có men giấm; ethylic alcohol bị oxi hoá thành acetic acid.', icon: 'vinegar', eq: 'C₂H₅OH + O₂ →(men giấm) CH₃COOH + H₂O' },
      { t: 'Thu giấm ăn', d: 'Giấm ăn chứa acetic acid 2 – 5%. Đây cũng là lí do rượu vang để lâu ngoài không khí có vị chua.', icon: 'vinegar' },
    ],
  },
  ethanolMake: {
    title: 'Điều chế ethylic alcohol',
    steps: [
      { t: 'Từ tinh bột (lên men)', d: 'Nguyên liệu chứa tinh bột (gạo, ngô, sắn…) được thuỷ phân thành glucose rồi lên men.', icon: 'rice', eq: '(C₆H₁₀O₅)ₙ →(+H₂O/enzyme) C₆H₁₂O₆ →(enzyme) C₂H₅OH + CO₂' },
      { t: 'Từ phụ phẩm, cellulose', d: 'Có thể dùng rỉ đường, rơm rạ, gỗ phế liệu để sản xuất ethylic alcohol.', icon: 'wood' },
      { t: 'Từ ethylene (công nghiệp)', d: 'Cộng nước vào ethylene có xúc tác acid, đun nóng.', icon: 'factory', eq: 'CH₂=CH₂ + H₂O →(t°, H⁺) C₂H₅OH' },
    ],
  },
};
