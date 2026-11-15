// KHTN 9 – Bài 1; Chương I (Năng lượng cơ học); Chương II (Ánh sáng).
import type { LessonNotes } from './types';

export const NOTES_9A: Record<string, LessonNotes> = {
  'l9-1': {
    opener: 'Để kiểm chứng các dự đoán khoa học cần tiến hành thí nghiệm. Làm thế nào lựa chọn được dụng cụ phù hợp để thí nghiệm thành công?',
    goals: ['Nhận biết được một số dụng cụ sử dụng trong dạy học phần Năng lượng và sự biến đổi (quang học, điện từ).', 'Trình bày được các bước viết và trình bày báo cáo; làm được bài thuyết trình một vấn đề khoa học.'],
    sections: [
      {
        title: 'Dụng cụ thí nghiệm quang học',
        body: [
          'Nguồn sáng: đèn dây tóc nối nguồn 12 V cùng các tấm chắn có một hoặc nhiều khe để tạo chùm sáng hẹp; hoặc nguồn laser trong phòng thí nghiệm. Lưu ý: không để tia laser chiếu vào mắt.',
          'Bản bán trụ (khối thuỷ tinh trong suốt) và bảng chia độ dùng để đọc góc tới, góc khúc xạ, góc phản xạ khi nghiên cứu khúc xạ và phản xạ toàn phần.',
          'Bộ dụng cụ tìm hiểu ảnh qua thấu kính: thấu kính hội tụ, thấu kính phân kì, màn chắn, vật sáng hình chữ F, đặt trên giá quang học.',
        ],
        scene: 1,
      },
      {
        title: 'Dụng cụ thí nghiệm điện từ',
        body: [
          'Điện kế: phát hiện dòng điện cảm ứng; vạch 0 nằm giữa – dòng điện đi vào chốt G₀ thì kim lệch sang phải, đi vào chốt âm thì kim lệch sang trái.',
          'Đồng hồ đo điện đa năng: đo cường độ dòng điện, hiệu điện thế, điện trở trong mạch một chiều và xoay chiều.',
          'Cuộn dây dẫn có hai đèn LED mắc song song ngược cực: phát hiện dòng điện cảm ứng và chiều của nó.',
        ],
        scene: 2,
      },
      {
        title: 'Viết và trình bày báo cáo khoa học',
        body: [
          'Cấu trúc báo cáo: Tiêu đề; Tóm tắt; Giới thiệu; Phương pháp; Kết quả; Thảo luận; Kết luận; Tài liệu tham khảo.',
          'Có thể thuyết trình bằng phần mềm trình chiếu (mỗi trang ứng với một phần của báo cáo) hoặc báo cáo treo tường (khổ A0/A1, chữ to, nhiều hình ảnh, biểu đồ).',
        ],
        scene: 3,
      },
    ],
    examples: ['Trình bày kết quả đo bằng bảng số liệu, biểu đồ, đồ thị.', 'Báo cáo thực hành trong phòng lab này có sẵn khung: mục đích, chuẩn bị, các bước, kết quả, nhận xét.'],
    exercises: [
      { q: 'Kể tên dụng cụ dùng để phát hiện dòng điện cảm ứng và chiều của nó.', a: 'Điện kế (kim lệch hai phía vạch 0) hoặc cuộn dây có hai LED mắc song song ngược cực.' },
      { q: 'Nêu cấu trúc chung của một bài báo cáo khoa học.', a: 'Tiêu đề, tóm tắt, giới thiệu, phương pháp, kết quả, thảo luận, kết luận, tài liệu tham khảo.' },
    ],
  },

  'l9-2': {
    opener: 'Khi chơi xích đu, động năng của người chơi thay đổi như thế nào khi chuyển động từ vị trí cao nhất xuống vị trí thấp nhất?',
    goals: ['Viết được biểu thức tính động năng của vật.', 'Viết được biểu thức tính thế năng của vật ở gần mặt đất.'],
    sections: [
      {
        title: 'Động năng',
        body: [
          'Một viên bi chuyển động đập vào viên bi khác làm nó chuyển động; gió làm di chuyển thuyền buồm, quay tua-bin máy phát điện gió; dòng nước chảy làm quay bánh xe nước. Năng lượng mà vật có được do chuyển động gọi là động năng.',
          'Búa có khối lượng càng lớn và chuyển động càng nhanh thì khi đập vào thanh thép làm thanh thép biến dạng càng nhiều. Động năng phụ thuộc vào khối lượng và tốc độ của vật: Wđ = ½·m·v².',
        ],
        scene: 1,
      },
      {
        title: 'Thế năng trọng trường',
        body: [
          'Thế năng trọng trường (thế năng) là năng lượng của vật khi ở một độ cao nhất định so với mặt đất hoặc một vị trí được chọn làm gốc. Wt = P·h, với P = 10·m.',
          'Giá trị thế năng phụ thuộc vào gốc thế năng; thường chọn mặt đất làm gốc.',
          'Nhà máy thuỷ điện dự trữ năng lượng dưới dạng thế năng của nước trong hồ chứa; máy phát đặt càng thấp so với mực nước hồ thì khai thác được càng nhiều thế năng.',
        ],
        scene: 2,
      },
      {
        title: 'Các dạng thế năng khác',
        body: ['Thế năng đàn hồi: vật bị biến dạng đàn hồi (cây cung đang kéo căng). Thế năng tĩnh điện: hệ các điện tích đặt gần nhau.'],
      },
    ],
    formulas: [
      { expr: 'Wđ = ½ · m · v²', note: 'Wđ: động năng (J); m: khối lượng (kg); v: tốc độ (m/s)' },
      { expr: 'Wt = P · h = 10 · m · h', note: 'Wt: thế năng (J); P: trọng lượng (N); h: độ cao so với gốc (m)' },
    ],
    examples: [
      'Ô tô đang chạy trên đường, máy bay đang bay, quả bóng đang lăn đều có động năng.',
      'Tốc độ xe tăng gấp đôi thì động năng tăng gấp bốn – lí do phải giảm tốc độ để giảm mức độ nguy hiểm khi va chạm.',
      'Quả dừa trên cây, nước trên hồ thuỷ điện, búa máy được nâng lên cao đều có thế năng.',
      'Cây cung kéo căng, lò xo bị nén có thế năng đàn hồi.',
    ],
    exercises: [
      { q: 'Tính động năng của quả bóng đá khối lượng 0,45 kg bay với tốc độ 20 m/s.', a: 'Wđ = ½ · 0,45 · 20² = 90 J.' },
      { q: 'Động năng của ô tô thay đổi thế nào nếu tốc độ tăng gấp đôi?', a: 'Tăng gấp 4 lần vì động năng tỉ lệ với bình phương tốc độ.' },
      { q: 'Bao xi măng nặng 500 N trên vai công nhân, cao 1,4 m so với sân thượng; sân thượng cao 20 m. Tính thế năng khi chọn gốc tại sân thượng và tại mặt đất.', a: 'Gốc sân thượng: Wt = 500·1,4 = 700 J. Gốc mặt đất: Wt = 500·21,4 = 10 700 J.' },
    ],
  },

  'l9-3': {
    opener: 'Dùng búa máy đóng cọc: đầu búa được nâng lên cao rồi thả rơi xuống cọc. Trong quá trình rơi, động năng và thế năng của đầu búa chuyển hoá thế nào?',
    goals: ['Nêu được cơ năng là tổng động năng và thế năng của vật.', 'Vận dụng khái niệm cơ năng phân tích sự chuyển hoá năng lượng trong một số trường hợp đơn giản.'],
    sections: [
      {
        title: 'Cơ năng',
        body: [
          'Trò chơi tung hứng: khi vật đi lên, độ cao tăng nên thế năng tăng, tốc độ giảm nên động năng giảm; khi vật rơi xuống thì ngược lại. Động năng và thế năng có thể chuyển hoá qua lại lẫn nhau.',
          'Tổng động năng và thế năng gọi là cơ năng của vật: W = Wđ + Wt. Đơn vị jun (J).',
        ],
      },
      {
        title: 'Thí nghiệm con lắc đơn',
        body: [
          'Kéo vật nặng đến vị trí A ở độ cao h rồi thả nhẹ: vật đi xuống vị trí thấp nhất O rồi đi lên dừng lại tại B, sau đó chuyển động ngược lại. Từ A xuống O: thế năng giảm, động năng tăng; từ O lên B: động năng giảm, thế năng tăng.',
          'Nếu không có ma sát và lực cản, cơ năng được bảo toàn: điểm B cao bằng điểm A.',
        ],
        scene: 1,
      },
      {
        title: 'Khi có ma sát và lực cản',
        body: [
          'Sau một thời gian, độ cao của vật nặng giảm dần rồi dừng lại: một phần cơ năng đã chuyển hoá thành nhiệt năng do ma sát và lực cản không khí. Khi đó cơ năng không được bảo toàn, nhưng năng lượng vẫn được bảo toàn.',
        ],
        scene: 2,
      },
    ],
    formulas: [{ expr: 'W = Wđ + Wt = ½·m·v² + P·h', note: 'Cơ năng của vật (J)' }],
    examples: [
      'Vận động viên nhảy xa phải chạy lấy đà thật nhanh (tăng động năng) và bật cao ở vị trí giậm nhảy.',
      'Tàu lượn siêu tốc: lên dốc chậm dần, xuống dốc nhanh dần.',
      'Xe thế năng: quả nặng nối với trục xe qua ròng rọc; khi quả nặng rơi, thế năng chuyển thành động năng của xe.',
      'Vật ném ngang hoặc ném xiên: khi đi lên thế năng tăng, khi rơi xuống động năng tăng.',
    ],
    exercises: [
      { q: 'Vật 1,5 kg rơi từ độ cao 4 m. Bỏ qua lực cản, tính tốc độ khi chạm đất.', a: 'Wt = 10·1,5·4 = 60 J = ½·1,5·v² ⇒ v² = 80 ⇒ v ≈ 8,9 m/s.' },
      { q: 'Vì sao con lắc dao động một lúc rồi dừng lại?', a: 'Do ma sát ở chỗ treo và lực cản không khí, cơ năng chuyển dần thành nhiệt năng.' },
      { q: 'Xe thế năng có quả nặng 20 g cao 8 cm, xe nặng 50 g. Coi toàn bộ thế năng thành động năng của xe, tính tốc độ xe.', a: 'Wt = 10·0,02·0,08 = 0,016 J = ½·0,05·v² ⇒ v = 0,8 m/s.' },
    ],
  },

  'l9-4': {
    opener: 'Trong đời sống ta thường nói cần "tốn công" khi cày lúa, xây nhà, ngồi đọc sách… Công trong mỗi trường hợp đó được xác định như thế nào?',
    goals: ['Rút ra được: công có giá trị bằng lực nhân với quãng đường dịch chuyển theo hướng của lực; công suất là tốc độ thực hiện công.', 'Liệt kê được một số đơn vị thường dùng đo công và công suất; tính được công và công suất trong trường hợp đơn giản.'],
    sections: [
      {
        title: 'Công cơ học',
        body: [
          'Có hai hình thức truyền năng lượng phổ biến: truyền nhiệt và thực hiện công. Người đẩy xe hàng làm xe dịch chuyển quãng đường s, xe có tốc độ – nhận năng lượng (động năng) – người đã thực hiện công.',
          'Công cơ học là số đo phần năng lượng được truyền từ vật này sang vật khác. A = F·s, với s là quãng đường dịch chuyển theo hướng của lực. Đơn vị jun: 1 J = 1 N·m; 1 kJ = 1 000 J; 1 kcal = 4 186 J.',
          'Có công cơ học khi có lực tác dụng và vật dịch chuyển theo hướng của lực. Học sinh ngồi học, vận động viên đứng yên giữ tạ không thực hiện công cơ học. Nếu vật dịch chuyển vuông góc với phương của lực thì công của lực đó bằng 0.',
        ],
        scene: 1,
      },
      {
        title: 'Công suất',
        body: [
          'Hai xe nâng cùng nâng hàng lên sàn xe tải: xe thứ nhất nâng thùng 500 N trong 10 s, xe thứ hai nâng thùng 700 N trong 15 s. Để so sánh xe nào làm việc khoẻ hơn, ta so sánh công thực hiện trong một giây.',
          'Công suất là tốc độ thực hiện công: P = A / t. Đơn vị oát (W): 1 W = 1 J/s; 1 kW = 1 000 W; 1 MW = 10⁶ W; mã lực 1 HP ≈ 746 W.',
          'Công suất còn mô tả tốc độ chuyển hoá năng lượng: bóng đèn 50 W chuyển hoá 50 J điện năng trong 1 s.',
        ],
        scene: 2,
      },
    ],
    formulas: [
      { expr: 'A = F · s', note: 'A: công (J); F: lực (N); s: quãng đường theo hướng lực (m)' },
      { expr: 'P = A / t', note: 'P: công suất (W); t: thời gian (s)' },
    ],
    examples: [
      'Đưa vật nặng lên cao, vận động viên ném lao: có công cơ học.',
      'Học sinh ngồi học, người đứng yên giữ quả tạ: không có công cơ học.',
      'Máy điều hoà ghi công suất làm lạnh bằng BTU/h (1 BTU/h ≈ 0,293 W).',
      'Mỗi lần đập, tim người thực hiện công khoảng 1 J; có thể ước tính công suất của tim bằng cách đếm số nhịp trong một phút.',
    ],
    exercises: [
      { q: 'Xe nâng tác dụng lực 700 N nâng thùng hàng lên cao 2 m. Tính công của lực nâng.', a: 'A = 700 · 2 = 1 400 J.' },
      { q: 'Xe 1 nâng thùng 500 N lên 1 m trong 10 s; xe 2 nâng thùng 700 N lên 1 m trong 15 s. Xe nào có công suất lớn hơn?', a: 'P₁ = 500/10 = 50 W; P₂ = 700/15 ≈ 46,7 W. Xe 1 có công suất lớn hơn.' },
      { q: 'Tim đập 75 lần mỗi phút, mỗi lần thực hiện công 1 J. Tính công suất của tim.', a: 'P = 75 J / 60 s = 1,25 W.' },
    ],
  },

  'l9-5': {
    opener: 'Đặt mắt sao cho không nhìn thấy đồng xu dưới đáy cốc khi cốc chưa có nước. Giữ nguyên mắt và cốc, rót nước vào thì lại nhìn thấy đồng xu. Vì sao?',
    goals: ['Thực hiện thí nghiệm chứng tỏ khi truyền từ môi trường này sang môi trường khác tia sáng có thể bị khúc xạ.', 'Nêu được chiết suất có giá trị bằng tỉ số tốc độ ánh sáng trong không khí (chân không) với tốc độ ánh sáng trong môi trường.', 'Thực hiện thí nghiệm rút ra và phát biểu định luật khúc xạ ánh sáng; vận dụng giải thích hiện tượng thường gặp.'],
    sections: [
      {
        title: 'Hiện tượng khúc xạ ánh sáng',
        body: [
          'Chiếu chùm sáng hẹp tới tâm bản bán trụ thuỷ tinh đặt trên bảng chia độ: chùm sáng truyền từ không khí vào thuỷ tinh bị gãy khúc tại mặt phân cách.',
          'Hiện tượng tia sáng bị gãy khúc (lệch khỏi phương truyền ban đầu) tại mặt phân cách khi truyền từ môi trường trong suốt này sang môi trường trong suốt khác gọi là hiện tượng khúc xạ ánh sáng. Tại mặt phân cách đồng thời có một phần ánh sáng bị phản xạ.',
          'Các khái niệm: điểm tới I, tia tới SI, tia khúc xạ IK, pháp tuyến NN′, góc tới i, góc khúc xạ r, mặt phẳng tới.',
        ],
        scene: 1,
      },
      {
        title: 'Định luật khúc xạ ánh sáng',
        body: [
          'Chiếu tia sáng tới tâm I với góc tới 0°, 20°, 40°, 60°, 80°, đọc góc khúc xạ: góc tới tăng thì góc khúc xạ tăng; tỉ số sin i / sin r không đổi.',
          'Định luật: tia khúc xạ nằm trong mặt phẳng tới và ở phía bên kia pháp tuyến so với tia tới. Với hai môi trường trong suốt nhất định, tỉ số giữa sin góc tới và sin góc khúc xạ luôn không đổi: sin i / sin r = n₂₁.',
        ],
        scene: 2,
      },
      {
        title: 'Chiết suất',
        body: [
          'Hằng số n₂₁ là chiết suất tỉ đối của môi trường 2 đối với môi trường 1. Nếu n₂₁ > 1 thì r < i: tia khúc xạ lệch gần pháp tuyến hơn; nếu n₂₁ < 1 thì r > i: tia khúc xạ lệch xa pháp tuyến hơn.',
          'Chiết suất tuyệt đối (chiết suất) của một môi trường: n = c / v, với c = 3·10⁸ m/s là tốc độ ánh sáng trong chân không, v là tốc độ ánh sáng trong môi trường. Nguyên nhân của khúc xạ là sự thay đổi tốc độ ánh sáng. Chiết suất của không khí ≈ 1, nước 1,33, thuỷ tinh ≈ 1,5, kim cương 2,42.',
        ],
        scene: 3,
      },
      {
        title: 'Ánh sáng đi từ nước (thuỷ tinh) ra không khí',
        body: ['Khi tia sáng truyền từ nước ra không khí, góc khúc xạ lớn hơn góc tới: tia khúc xạ lệch xa pháp tuyến. Mắt nhìn thấy vật dưới nước dường như ở gần mặt nước hơn vị trí thật.'],
        scene: 4,
      },
    ],
    formulas: [
      { expr: 'sin i / sin r = n₂₁ = n₂ / n₁', note: 'Định luật khúc xạ' },
      { expr: 'n = c / v', note: 'Chiết suất tuyệt đối; c = 3·10⁸ m/s' },
    ],
    examples: [
      'Ống hút cắm nghiêng trong cốc nước trông như bị gãy khúc tại mặt nước.',
      'Nhìn từ trên bờ, đáy bể bơi, đáy suối trông nông hơn thực tế.',
      'Người đi xiên cá phải phóng xiên thấp hơn vị trí con cá mà mắt nhìn thấy.',
      'Rót nước vào cốc thì nhìn thấy đồng xu trước đó bị khuất.',
    ],
    exercises: [
      { q: 'Tia sáng đi từ không khí vào nước với góc tới 60°, góc khúc xạ 40°. Tính chiết suất của nước.', a: 'n = sin 60° / sin 40° ≈ 0,866 / 0,643 ≈ 1,35.' },
      { q: 'Trả lời câu hỏi mở đầu về đồng xu.', a: 'Ánh sáng từ đồng xu đi từ nước ra không khí bị khúc xạ, lệch xa pháp tuyến nên truyền được tới mắt; mắt nhìn thấy ảnh đồng xu nâng cao lên.' },
      { q: 'Tốc độ ánh sáng trong thuỷ tinh có chiết suất 1,5 là bao nhiêu?', a: 'v = c / n = 3·10⁸ / 1,5 = 2·10⁸ m/s.' },
    ],
  },

  'l9-6': {
    opener: 'Ánh sáng truyền từ bán trụ thuỷ tinh ra không khí, khi góc tới 41° thì góc khúc xạ gần 90°. Nếu tiếp tục tăng góc tới thì điều gì xảy ra?',
    goals: ['Thực hiện thí nghiệm rút ra điều kiện xảy ra phản xạ toàn phần và xác định được góc tới hạn.', 'Vận dụng giải thích một số hiện tượng thường gặp (ảo ảnh, cáp quang).'],
    sections: [
      {
        title: 'Thí nghiệm',
        body: [
          'Chiếu chùm sáng hẹp từ bản bán trụ ra không khí, tăng dần góc tới i. Khi i còn nhỏ: có cả tia khúc xạ và tia phản xạ, góc khúc xạ lớn hơn góc tới. Tăng i: tia khúc xạ mờ dần, tia phản xạ sáng dần. Khi i đủ lớn: không còn tia khúc xạ, toàn bộ ánh sáng bị phản xạ.',
        ],
        scene: 1,
      },
      {
        title: 'Phản xạ toàn phần và góc tới hạn',
        body: [
          'Hiện tượng phản xạ toàn phần là hiện tượng phản xạ toàn bộ tia tới, xảy ra ở mặt phân cách giữa hai môi trường trong suốt.',
          'Khi n₁ > n₂ thì r > i. Khi r = 90° thì i đạt giá trị i_th gọi là góc tới hạn: sin i_th = n₂ / n₁. Với thuỷ tinh (n = 1,5) ra không khí: i_th ≈ 41,8°; nước (1,33): ≈ 48,8°; kim cương (2,42): ≈ 24,4°.',
          'Điều kiện có phản xạ toàn phần: ánh sáng truyền từ môi trường chiết suất lớn sang môi trường chiết suất nhỏ (n₁ > n₂) và góc tới lớn hơn hoặc bằng góc tới hạn (i ≥ i_th).',
        ],
        scene: 2,
      },
      {
        title: 'Cáp quang',
        body: [
          'Sợi quang gồm lõi thuỷ tinh hoặc chất dẻo trong suốt chiết suất n₁, bao quanh bởi lớp vỏ chiết suất n₂ < n₁. Tia sáng vào lõi gặp mặt tiếp xúc lõi – vỏ với góc tới lớn hơn góc tới hạn nên bị phản xạ toàn phần liên tiếp, truyền đi rất xa mà ít bị suy hao.',
          'Ứng dụng: truyền dữ liệu (internet, điện thoại) trong công nghệ thông tin; ống nội soi trong y học.',
        ],
        scene: 3,
      },
      {
        title: 'Ảo ảnh trên đường nhựa',
        body: ['Ngày nắng nóng, lớp không khí sát mặt đường nóng hơn nên có chiết suất nhỏ hơn lớp trên. Tia sáng từ vật đi xiên xuống bị khúc xạ liên tiếp, đến lớp gần mặt đường thì bị phản xạ toàn phần và hắt lên mắt – ta thấy như có vũng nước phản chiếu phía xa. Hiện tượng tương tự xảy ra trên sa mạc.'],
      },
    ],
    formulas: [{ expr: 'sin i_th = n₂ / n₁', note: 'Góc tới hạn phản xạ toàn phần (n₁ > n₂)' }],
    examples: ['Cáp quang internet, ống nội soi dạ dày.', 'Kim cương lấp lánh vì góc tới hạn nhỏ, ánh sáng bị phản xạ toàn phần nhiều lần bên trong.', 'Lăng kính phản xạ toàn phần dùng trong ống nhòm, kính tiềm vọng.', 'Ảo ảnh "vũng nước" trên đường nhựa ngày nắng, trên sa mạc.'],
    exercises: [
      { q: 'Tính góc tới hạn khi ánh sáng đi từ thuỷ tinh (n = 1,5) ra không khí.', a: 'sin i_th = 1/1,5 ≈ 0,667 ⇒ i_th ≈ 41,8°.' },
      { q: 'Tia sáng đi từ nước (n = 4/3) tới mặt nước với góc tới 60°. Có tia khúc xạ không?', a: 'sin i_th = 3/4 ⇒ i_th ≈ 48,6°. Vì 60° > i_th nên xảy ra phản xạ toàn phần, không có tia khúc xạ.' },
      { q: 'Vì sao chỉ quan sát được ảo ảnh trên đường ở khoảng cách rất xa?', a: 'Chỉ những tia sáng đi gần như song song với mặt đường (góc tới rất lớn) mới bị phản xạ toàn phần; khi lại gần, góc nhìn lớn hơn nên không còn hiện tượng đó.' },
    ],
  },

  'l9-7': {
    opener: 'Ánh sáng từ đèn sợi đốt hoặc từ Mặt Trời sau khi đi qua lăng kính tạo thành một chùm sáng có màu từ đỏ đến tím. Lăng kính có tác dụng gì?',
    goals: ['Vẽ được đường truyền của tia sáng qua lăng kính.', 'Thực hiện thí nghiệm tạo quang phổ ánh sáng trắng qua lăng kính; giải thích định tính sự tán sắc.', 'Nêu được khái niệm ánh sáng màu; màu sắc của vật phụ thuộc vào màu ánh sáng bị vật hấp thụ và phản xạ.'],
    sections: [
      {
        title: 'Cấu tạo lăng kính và đường truyền tia sáng',
        body: [
          'Lăng kính là khối trong suốt, đồng chất, giới hạn bởi hai mặt phẳng không song song, thường có dạng lăng trụ tam giác. Hai mặt phẳng giới hạn là mặt bên, giao tuyến là cạnh, mặt đối diện cạnh là đáy; góc A giữa hai mặt bên là góc chiết quang.',
          'Tia sáng tới mặt bên bị khúc xạ hai lần (vào và ra khỏi lăng kính). Tia ló ra khỏi lăng kính lệch về phía đáy so với tia tới; góc giữa tia tới và tia ló gọi là góc lệch D.',
        ],
        scene: 1,
      },
      {
        title: 'Hiện tượng tán sắc ánh sáng',
        body: [
          'Chiếu chùm ánh sáng trắng hẹp vào mặt bên lăng kính, đặt màn phía sau: thu được dải màu đỏ, da cam, vàng, lục, lam, chàm, tím – quang phổ của ánh sáng trắng. Hiện tượng này là tán sắc ánh sáng.',
          'Lăng kính tách riêng các chùm sáng màu có sẵn trong chùm sáng trắng, cho mỗi chùm đi theo một phương khác nhau: chiết suất của lăng kính nhỏ nhất với ánh sáng đỏ (lệch ít nhất), lớn nhất với ánh sáng tím (lệch nhiều nhất).',
          'Chắn kính lọc màu đỏ (hoặc tím) trước nguồn sáng: ánh sáng qua lăng kính không bị tách màu. Ánh sáng đơn sắc là ánh sáng có một màu nhất định và không bị tán sắc khi đi qua lăng kính.',
        ],
        scene: 2,
      },
      {
        title: 'Kính lọc màu',
        body: ['Chiếu ánh sáng trắng qua tấm lọc màu đỏ: tấm lọc hấp thụ ít ánh sáng đỏ nhưng hấp thụ mạnh các ánh sáng màu khác, nên ánh sáng ló ra có màu đỏ.'],
        scene: 3,
      },
      {
        title: 'Màu sắc của vật',
        body: [
          'Màu sắc của vật nhìn thấy phụ thuộc vào màu ánh sáng bị vật hấp thụ và phản xạ. Dưới ánh sáng trắng, vật có màu nào là do nó phản xạ ánh sáng màu đó vào mắt và hấp thụ các màu còn lại. Vật màu trắng phản xạ mọi ánh sáng màu.',
          'Vật màu đen hấp thụ tất cả ánh sáng màu và không phản xạ ánh sáng; ta nhận ra vật màu đen vì nó được đặt cạnh những vật có màu khác.',
        ],
        scene: 4,
      },
    ],
    examples: [
      'Cầu vồng: ánh sáng Mặt Trời đi vào các giọt nước mưa li ti bị khúc xạ, phản xạ toàn phần và tán sắc; quan sát được khi Mặt Trời ở sau lưng người quan sát.',
      'Hoa hướng dương: cánh màu vàng, lá màu xanh, nhuỵ màu nâu vì phản xạ các ánh sáng màu khác nhau.',
      'Đĩa CD, váng dầu trên mặt nước, bong bóng xà phòng có nhiều màu sắc.',
      'Đèn sân khấu dùng kính lọc màu để tạo ánh sáng màu.',
      'Đĩa tròn tô bảy màu cầu vồng quay thật nhanh sẽ trông gần như màu trắng (trộn ánh sáng màu).',
    ],
    exercises: [
      { q: 'Viết thứ tự các màu trong quang phổ ánh sáng trắng. Màu nào lệch ít nhất, nhiều nhất?', a: 'Đỏ, da cam, vàng, lục, lam, chàm, tím. Đỏ lệch ít nhất, tím lệch nhiều nhất.' },
      { q: 'Vì sao dưới ánh sáng đỏ, chiếc lá xanh trông gần như màu đen?', a: 'Lá chỉ phản xạ mạnh ánh sáng xanh lục; ánh sáng đỏ chiếu vào bị lá hấp thụ, không có ánh sáng phản xạ vào mắt nên lá trông tối/đen.' },
      { q: 'Ánh sáng đơn sắc là gì?', a: 'Là ánh sáng có một màu nhất định và không bị tán sắc khi đi qua lăng kính.' },
    ],
  },

  'l9-8': {
    opener: 'Thấu kính có trong ống nhòm, kính lúp, kính hiển vi và ngay trong mắt chúng ta. Ánh sáng truyền qua thấu kính tạo thành ảnh của vật như thế nào?',
    goals: ['Nêu được các khái niệm quang tâm, trục chính, tiêu điểm chính, tiêu cự của thấu kính.', 'Tiến hành thí nghiệm rút ra đường truyền của một số tia sáng đặc biệt qua thấu kính.', 'Vẽ được ảnh qua thấu kính; khẳng định ảnh thật hứng được trên màn, ảnh ảo không hứng được trên màn.'],
    sections: [
      {
        title: 'Cấu tạo và phân loại thấu kính',
        body: [
          'Thấu kính là khối đồng chất trong suốt giới hạn bởi hai mặt cong hoặc một mặt cong và một mặt phẳng.',
          'Thấu kính rìa mỏng (phần rìa mỏng hơn phần giữa): chiếu chùm sáng song song qua thì thu được chùm tia ló hội tụ – thấu kính hội tụ.',
          'Thấu kính rìa dày (phần rìa dày hơn phần giữa): chùm tia ló phân kì – thấu kính phân kì.',
        ],
        scene: 1,
      },
      {
        title: 'Quang tâm, trục chính, tiêu điểm, tiêu cự',
        body: [
          'Quang tâm O: mọi tia sáng tới O đều truyền thẳng. Trục chính: đường thẳng qua O vuông góc với tiết diện thẳng của thấu kính.',
          'Tiêu điểm chính F: chùm tia tới song song với trục chính cho chùm tia ló hội tụ tại F (thấu kính hội tụ), hoặc đường kéo dài của chùm tia ló đi qua F (thấu kính phân kì). Tiêu cự f = OF.',
          'Có thể hình dung thấu kính hội tụ gồm nhiều lăng kính nhỏ có đáy hướng về trục chính, tia sáng qua mỗi lăng kính bị lệch về đáy nên hội tụ; thấu kính phân kì có đáy các lăng kính hướng ra ngoài.',
        ],
        scene: 2,
      },
      {
        title: 'Đường truyền của các tia sáng đặc biệt',
        body: [
          'Tia tới qua quang tâm O: truyền thẳng.',
          'Tia tới song song với trục chính: tia ló (thấu kính hội tụ) hoặc đường kéo dài tia ló (thấu kính phân kì) đi qua tiêu điểm chính F′.',
          'Tia tới qua tiêu điểm F (thấu kính hội tụ): tia ló song song với trục chính.',
        ],
        scene: 3,
      },
      {
        title: 'Ảnh của vật qua thấu kính',
        body: [
          'Dựng ảnh của vật AB vuông góc với trục chính: từ B vẽ tia qua quang tâm và tia song song với trục chính; giao điểm hai tia ló (hoặc đường kéo dài) là B′; hạ vuông góc xuống trục chính được A′. Ảnh thật vẽ nét liền, ảnh ảo vẽ nét đứt.',
          'Thấu kính hội tụ: vật ngoài khoảng tiêu cự (d > f) cho ảnh thật, ngược chiều; vật trong khoảng tiêu cự (d < f) cho ảnh ảo, cùng chiều, lớn hơn vật.',
          'Thấu kính phân kì: vật đặt ở mọi vị trí luôn cho ảnh ảo, cùng chiều, nhỏ hơn vật.',
          'Ảnh thật hứng được trên màn chắn; ảnh ảo không hứng được, phải đặt mắt nhìn qua thấu kính mới thấy.',
        ],
        scene: 4,
      },
    ],
    formulas: [{ expr: '1/f = 1/d + 1/d′ (mở rộng)', note: 'Liên hệ giữa tiêu cự f, khoảng cách vật d và ảnh d′ (thấu kính hội tụ, ảnh thật)' }],
    examples: ['Ống kính máy ảnh gồm nhiều thấu kính hội tụ và phân kì ghép lại để ảnh rõ nét.', 'Kính cận là thấu kính phân kì, kính lão là thấu kính hội tụ.', 'Có thể chế tạo thấu kính hội tụ từ chai nhựa trong đựng nước.', 'Thuỷ tinh thể trong mắt là một thấu kính hội tụ.'],
    exercises: [
      { q: 'Nêu cách nhận biết thấu kính hội tụ và thấu kính phân kì.', a: 'Thấu kính hội tụ rìa mỏng, cho chùm tia ló hội tụ, nhìn vật gần qua kính thấy ảnh to hơn. Thấu kính phân kì rìa dày, chùm tia ló phân kì, nhìn qua kính thấy ảnh nhỏ hơn.' },
      { q: 'Đặt vật trong khoảng nào trước thấu kính hội tụ thì hứng được ảnh rõ nét trên màn?', a: 'Đặt vật ngoài khoảng tiêu cự (d > f); ảnh thật, ngược chiều.' },
      { q: 'Ảnh ảo tạo bởi thấu kính hội tụ và thấu kính phân kì giống và khác nhau thế nào?', a: 'Giống: đều cùng chiều với vật, không hứng được trên màn. Khác: thấu kính hội tụ cho ảnh ảo lớn hơn vật, thấu kính phân kì cho ảnh ảo nhỏ hơn vật.' },
    ],
  },

  'l9-9': {
    opener: 'Có thể đo tiêu cự thấu kính hội tụ bằng cách đo trực tiếp khoảng cách từ quang tâm O tới tiêu điểm F không? Cách đo đó có nhược điểm gì?',
    goals: ['Đo được tiêu cự của thấu kính hội tụ bằng dụng cụ thực hành (phương pháp Silbermann).'],
    sections: [
      {
        title: 'Cơ sở của phương pháp Silbermann (phương pháp đối xứng)',
        body: [
          'Dựng ảnh của vật AB cao h đặt vuông góc với trục chính, cách thấu kính hội tụ d = 2f. Khi đó ảnh A′B′ là ảnh thật, ngược chiều, cao bằng vật (h′ = h) và cách thấu kính d′ = d = 2f.',
          'Khoảng cách từ vật đến ảnh L = d + d′ = 4f, nên f = (d + d′) / 4.',
        ],
      },
      {
        title: 'Cách tiến hành',
        body: [
          'Đo chiều cao h của vật hình chữ F. Đặt vật và màn sát thấu kính, dịch đồng thời vật và màn ra xa dần thấu kính những khoảng bằng nhau cho đến khi thu được ảnh rõ nét trên màn. Ghi d, d′; đo chiều cao h′ của ảnh.',
          'Lặp lại thêm hai lần; tính giá trị trung bình của d, d′ rồi tính tiêu cự trung bình f = (d_tb + d′_tb) / 4.',
        ],
        scene: 1,
      },
    ],
    formulas: [{ expr: 'f = (d + d′) / 4 = L / 4', note: 'Khi ảnh thật cao bằng vật' }],
    examples: [
      'Phương pháp hoán vị (Bessel): đặt vật và màn cách nhau L cố định, dịch thấu kính tìm hai vị trí cho ảnh rõ nét cách nhau l; tiêu cự f = (L² − l²) / (4L).',
      'Cách đo nhanh gần đúng: hứng ảnh của vật ở rất xa (cửa sổ, Mặt Trời) trên màn – khoảng cách từ thấu kính tới màn xấp xỉ bằng tiêu cự.',
    ],
    exercises: [
      { q: 'Khi ảnh rõ nét và cao bằng vật, người ta đo được khoảng cách vật – màn L = 60 cm. Tính tiêu cự.', a: 'f = L / 4 = 15 cm.' },
      { q: 'So sánh ưu, nhược điểm của phương pháp Silbermann với cách đo trực tiếp OF.', a: 'Đo trực tiếp OF khó xác định chính xác vị trí F; phương pháp Silbermann dựa vào ảnh rõ nét, cao bằng vật nên dễ nhận biết và chính xác hơn, nhưng cần dịch đồng thời vật và màn.' },
    ],
  },

  'l9-10': {
    opener: 'Tại sao người thợ sửa đồng hồ lại phải sử dụng kính lúp khi làm việc?',
    goals: ['Mô tả được cấu tạo và sử dụng được kính lúp.', 'Vẽ được sơ đồ tỉ lệ để giải các bài tập đơn giản về thấu kính hội tụ.'],
    sections: [
      {
        title: 'Cấu tạo kính lúp',
        body: [
          'Kính lúp là dụng cụ quang bổ trợ cho mắt để quan sát các vật nhỏ: một thấu kính hội tụ có tiêu cự ngắn (vài cm), thường có khung và tay cầm.',
          'Mỗi kính lúp có số bội giác ghi trên khung (2x, 5x, 20x…): G = 25 / f (f tính bằng cm). Số bội giác càng lớn thì quan sát được vật càng nhỏ.',
        ],
        scene: 1,
      },
      {
        title: 'Cách quan sát vật nhỏ qua kính lúp',
        body: [
          'Đặt vật nhỏ trong khoảng tiêu cự của kính lúp (từ quang tâm đến tiêu điểm); mắt nhìn thấy ảnh ảo, cùng chiều, lớn hơn vật.',
          'Đặt kính sát vật rồi từ từ dịch kính ra xa đến khi nhìn thấy ảnh rõ nét. Ảnh phải nằm trong khoảng nhìn rõ của mắt (mắt bình thường: từ khoảng 25 cm đến vô cực).',
          'Mắt phân biệt được hai điểm khi góc trông lớn hơn năng suất phân li (khoảng 1′). Kính lúp làm tăng góc trông ảnh so với góc trông vật.',
        ],
        scene: 1,
      },
      {
        title: 'Vẽ sơ đồ tạo ảnh theo tỉ lệ',
        body: [
          'Bước 1: chọn tỉ lệ xích thích hợp. Bước 2: xác định f, d, h theo cùng tỉ lệ. Bước 3: vẽ sơ đồ tạo ảnh bằng hai tia đặc biệt, đo d′ và h′ trên hình rồi đổi ra kích thước thật.',
          'Có thể kiểm tra bằng tam giác đồng dạng: với thấu kính hội tụ cho ảnh thật, d′ = d·f / (d − f) và h′ = h·d′ / d.',
        ],
        scene: 2,
      },
    ],
    formulas: [
      { expr: 'G = 25 / f', note: 'Số bội giác kính lúp (f tính bằng cm)' },
      { expr: 'h′ / h = d′ / d', note: 'Tỉ số chiều cao ảnh và vật' },
    ],
    examples: ['Thợ sửa đồng hồ, thợ kim hoàn dùng kính lúp đeo mắt.', 'Đọc chữ nhỏ trên bản đồ, quan sát côn trùng, mẫu lá cây trong giờ sinh học.', 'Kiểm tra tiền giả, quan sát vân tay.'],
    exercises: [
      { q: 'Kính lúp ghi 5x có tiêu cự bao nhiêu?', a: 'f = 25 / G = 25 / 5 = 5 cm.' },
      { q: 'Vật AB cao 2 cm đặt cách thấu kính hội tụ (f = 5 cm) một khoảng 7,5 cm. Tính khoảng cách ảnh và chiều cao ảnh.', a: "d′ = d·f/(d − f) = 7,5·5/2,5 = 15 cm; h′ = h·d′/d = 2·15/7,5 = 4 cm. Ảnh thật, ngược chiều, cao gấp đôi vật." },
      { q: 'Muốn quan sát ảnh qua kính lúp, phải đặt vật ở đâu?', a: 'Trong khoảng tiêu cự của kính (gần kính hơn tiêu điểm).' },
    ],
  },
};
