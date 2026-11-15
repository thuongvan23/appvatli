// KHTN 7 – phần Vật lí: Bài 1 (Mở đầu), Bài 8 – Bài 20.
import type { LessonNotes } from './types';

export const NOTES_7: Record<string, LessonNotes> = {
  'l7-1': {
    opener: 'Các nhà khoa học đã làm thế nào để tìm ra câu trả lời cho những câu hỏi về thế giới tự nhiên?',
    goals: ['Trình bày và vận dụng được một số phương pháp và kĩ năng trong học tập môn KHTN: quan sát, phân loại, liên kết, đo, dự báo.', 'Thực hiện được các kĩ năng tiến trình: quan sát, phân loại, liên kết, đo, dự báo.', 'Sử dụng được một số dụng cụ đo: đồng hồ đo thời gian hiện số dùng cổng quang điện.'],
    sections: [
      { title: 'Phương pháp tìm hiểu tự nhiên', body: ['Gồm 5 bước: (1) Đề xuất vấn đề cần tìm hiểu; (2) Đưa ra dự đoán khoa học để giải quyết vấn đề; (3) Lập kế hoạch kiểm tra dự đoán; (4) Thực hiện kế hoạch kiểm tra dự đoán; (5) Viết báo cáo, thảo luận và trình bày báo cáo.', 'Nếu kết quả không phù hợp với dự đoán thì quay lại bước 2, đưa ra dự đoán mới.'], scene: 1 },
      { title: 'Kĩ năng học tập môn KHTN', body: ['Kĩ năng quan sát, phân loại: quan sát để chỉ ra đặc điểm của đối tượng; dựa vào sự giống và khác nhau để chia đối tượng thành nhóm.', 'Kĩ năng liên kết: liên kết các thông tin, kiến thức để tìm ra mối quan hệ giữa các sự vật, hiện tượng.', 'Kĩ năng đo: ước lượng để chọn dụng cụ đo phù hợp; thực hiện phép đo, ghi kết quả, xử lí số liệu; nhận xét độ chính xác; phân tích, thảo luận kết quả.', 'Kĩ năng dự báo: đề xuất điều sẽ xảy ra dựa trên quan sát, kiến thức, suy luận. Có dự báo định tính và dự báo định lượng.'], scene: 2 },
      { title: 'Cổng quang điện và đồng hồ đo thời gian hiện số', body: ['Cổng quang điện gồm bộ phận phát tia hồng ngoại và bộ phận thu tia hồng ngoại, nối với đồng hồ bằng dây cáp; có vai trò như công tắc đóng, mở đồng hồ.', 'Đồng hồ đo thời gian hiện số: nút THANG ĐO (chọn 99,99 s – 0,01 s), nút MODE (chọn chế độ A ↔ B để đo khoảng thời gian vật đi từ cổng A đến cổng B), nút RESET (đưa số chỉ về 0).', 'Khi vật chắn tia hồng ngoại ở cổng A, đồng hồ bắt đầu đếm; khi vật chắn tia hồng ngoại ở cổng B, đồng hồ dừng đếm.'], scene: 3 },
    ],
    examples: ['Đo khối lượng cuốn sách bằng cân điện tử 3 lần được 125,2 g; 125,4 g; 125,3 g. Khối lượng trung bình là 125,3 g.', 'Đo thời gian chạy 60 m trong giờ Thể dục bằng đồng hồ bấm giây.'],
    facts: ['Đồng hồ đo thời gian hiện số có thể đo chính xác tới 0,001 s – nhanh hơn rất nhiều so với phản xạ bấm tay của con người (khoảng 0,1 – 0,3 s).'],
    exercises: [
      { q: 'Sắp xếp các bước của phương pháp tìm hiểu tự nhiên theo đúng thứ tự.', a: 'Đề xuất vấn đề → Đưa ra dự đoán → Lập kế hoạch kiểm tra dự đoán → Thực hiện kế hoạch → Viết báo cáo, thảo luận.' },
      { q: 'Muốn đo thời gian viên bi lăn từ cổng A đến cổng B, cần chọn chế độ nào của đồng hồ đo thời gian hiện số?', a: 'Chọn chế độ MODE A ↔ B, thang đo 99,99 s – 0,01 s.' },
      { q: 'Vì sao khi đo cần thực hiện nhiều lần và lấy giá trị trung bình?', a: 'Để giảm sai số ngẫu nhiên, kết quả đo đáng tin cậy hơn.' },
    ],
  },

  'l7-8': {
    opener: 'Làm thế nào để biết ai chạy nhanh nhất trong một cuộc thi chạy?',
    goals: ['Nêu được ý nghĩa vật lí của tốc độ, xác định được tốc độ qua quãng đường vật đi được trong khoảng thời gian tương ứng: v = s / t.', 'Liệt kê được một số đơn vị đo tốc độ thường dùng.'],
    sections: [
      { title: 'Tốc độ chuyển động', body: ['Có hai cách so sánh độ nhanh, chậm: so sánh quãng đường đi được trong cùng một khoảng thời gian (vật nào đi được quãng đường dài hơn thì nhanh hơn) hoặc so sánh thời gian để đi cùng một quãng đường (vật nào mất ít thời gian hơn thì nhanh hơn).', 'Quãng đường vật đi được trong một đơn vị thời gian gọi là tốc độ chuyển động – đại lượng cho biết mức độ nhanh hay chậm của chuyển động.', 'Công thức: v = s / t, trong đó s là quãng đường, t là thời gian đi hết quãng đường đó.'], scene: 1 },
      { title: 'Đơn vị tốc độ', body: ['Đơn vị tốc độ phụ thuộc đơn vị độ dài và đơn vị thời gian. Đơn vị thường dùng: m/s và km/h.', 'Đổi đơn vị: 1 m/s = 3,6 km/h; 1 km/h = 1/3,6 m/s ≈ 0,28 m/s.'], scene: 3 },
    ],
    formulas: [
      { expr: 'v = s / t', note: 'v: tốc độ; s: quãng đường; t: thời gian' },
      { expr: 's = v · t ;  t = s / v', note: 'Tính quãng đường, thời gian khi biết tốc độ' },
      { expr: '1 m/s = 3,6 km/h', note: 'Đổi đơn vị tốc độ' },
    ],
    examples: ['Người đi xe đạp đi 3 km trong 15 phút: v = 3 km : 0,25 h = 12 km/h.', 'Đổi 54 km/h = 54 : 3,6 = 15 m/s.'],
    facts: ['Báo gêpa có thể chạy với tốc độ khoảng 100 km/h trong một quãng đường ngắn – nhanh nhất trong các loài động vật trên cạn.'],
    exercises: [
      { q: 'Một ô tô đi quãng đường 120 km trong 2 giờ. Tính tốc độ của ô tô theo km/h và m/s.', a: 'v = 120 : 2 = 60 km/h ≈ 16,7 m/s.' },
      { q: 'Bạn An đi bộ từ nhà đến trường với tốc độ 1,2 m/s hết 15 phút. Tính quãng đường từ nhà đến trường.', a: 't = 15 phút = 900 s; s = v·t = 1,2 × 900 = 1 080 m.' },
      { q: 'Tàu hoả chạy với tốc độ 72 km/h, ô tô chạy với tốc độ 15 m/s. Phương tiện nào nhanh hơn?', a: '72 km/h = 20 m/s > 15 m/s. Tàu hoả nhanh hơn.' },
    ],
  },

  'l7-9': {
    opener: 'Để xác định tốc độ chuyển động người ta phải đo những đại lượng nào và dùng những dụng cụ nào?',
    goals: ['Mô tả được sơ lược cách đo tốc độ bằng đồng hồ bấm giây và cổng quang điện trong dụng cụ thực hành ở nhà trường.', 'Mô tả được sơ lược thiết bị “bắn tốc độ” trong kiểm tra tốc độ các phương tiện giao thông.'],
    sections: [
      { title: 'Đo tốc độ dùng đồng hồ bấm giây', body: ['Dụng cụ: thước đo độ dài, đồng hồ bấm giây.', 'Có hai cách: chọn quãng đường s trước rồi đo thời gian t; hoặc chọn thời gian t trước rồi đo quãng đường s. Trong phòng thực hành thường dùng cách 1.', 'Các bước: dùng thước đo quãng đường s (xác định vạch xuất phát, vạch đích); bấm đồng hồ khi vật bắt đầu chuyển động từ vạch xuất phát, bấm dừng khi vật tới vạch đích; đo 3 lần, lấy giá trị trung bình; tính v = s / t.'], scene: 1 },
      { title: 'Đo tốc độ dùng đồng hồ đo thời gian hiện số và cổng quang', body: ['Đặt hai cổng quang A, B cách nhau quãng đường s. Đồng hồ ở chế độ A ↔ B, thang đo 99,99 s – 0,01 s.', 'Khi vật chắn tia hồng ngoại ở cổng A, đồng hồ bắt đầu đếm; khi vật chắn tia hồng ngoại ở cổng B, đồng hồ dừng đếm. Số chỉ là thời gian t vật đi hết quãng đường s.', 'Cách đo này chính xác hơn vì không phụ thuộc phản xạ của người bấm giờ.'], scene: 2 },
      { title: 'Thiết bị “bắn tốc độ”', body: ['Thiết bị kiểm tra tốc độ phương tiện giao thông gồm camera ghi hình và máy tính. Camera ghi lại thời điểm xe chạy qua hai vạch mốc cách nhau một khoảng đã biết; máy tính tính tốc độ của xe.', 'Nếu tốc độ vượt quá tốc độ tối đa cho phép, máy ghi lại hình ảnh, biển số xe để xử lí vi phạm.', 'Dụng cụ đo tốc độ của phương tiện là tốc kế (đồng hồ tốc độ) gắn trên xe.'], scene: 3 },
    ],
    formulas: [{ expr: 'v = s / t', note: 'Đo s bằng thước, đo t bằng đồng hồ' }],
    examples: ['Kiểm tra chạy cự li ngắn 60 m: giáo viên bấm giờ khi có hiệu lệnh xuất phát và khi học sinh về đích.'],
    facts: ['Ngoài camera, cảnh sát giao thông còn dùng súng bắn tốc độ dùng sóng ra-đa hoặc tia laser: thiết bị đo sự thay đổi của sóng phản xạ từ xe để tính tốc độ.'],
    exercises: [
      { q: 'Vì sao khi đo bằng đồng hồ bấm giây cần đo nhiều lần?', a: 'Vì có sai số do phản xạ của người bấm (bấm sớm hoặc muộn); đo nhiều lần và lấy trung bình giúp giảm sai số.' },
      { q: 'Hai cổng quang cách nhau 40 cm, đồng hồ chỉ 0,80 s. Tính tốc độ của xe.', a: 'v = 0,4 m : 0,8 s = 0,5 m/s.' },
      { q: 'Camera ghi được ô tô đi qua hai vạch mốc cách nhau 10 m hết 0,5 s. Đoạn đường có biển báo tốc độ tối đa 60 km/h. Ô tô có vi phạm không?', a: 'v = 10 : 0,5 = 20 m/s = 72 km/h > 60 km/h. Ô tô vượt quá tốc độ cho phép.' },
    ],
  },

  'l7-10': {
    opener: 'Có cách nào mô tả chuyển động của một vật một cách trực quan, dễ đọc hơn bảng số liệu không?',
    goals: ['Vẽ được đồ thị quãng đường – thời gian cho chuyển động thẳng.', 'Từ đồ thị quãng đường – thời gian cho trước, tìm được quãng đường vật đi (hoặc tốc độ, hay thời gian chuyển động của vật).'],
    sections: [
      { title: 'Vẽ đồ thị quãng đường – thời gian', body: ['Bước 1: Lập bảng ghi quãng đường đi được theo thời gian.', 'Bước 2: Vẽ hai trục vuông góc: trục nằm ngang (Ot) biểu diễn thời gian, trục thẳng đứng (Os) biểu diễn quãng đường; chọn tỉ lệ thích hợp.', 'Bước 3: Xác định các điểm biểu diễn các cặp giá trị (t, s) và nối các điểm lại.'], scene: 1 },
      { title: 'Đọc đồ thị', body: ['Chuyển động với tốc độ không đổi: đồ thị là một đoạn thẳng nằm nghiêng (đi lên). Đoạn thẳng càng dốc, tốc độ càng lớn.', 'Đoạn đồ thị nằm ngang (song song với trục thời gian): vật đứng yên.', 'Từ đồ thị, đọc được quãng đường đi được ở mỗi thời điểm; tính tốc độ v = Δs / Δt trên mỗi đoạn.', 'Hai đồ thị của hai vật cắt nhau: tại thời điểm đó hai vật ở cùng một vị trí (gặp nhau).'], scene: 2 },
    ],
    formulas: [{ expr: 'v = (s₂ − s₁) / (t₂ − t₁)', note: 'Tốc độ tính từ hai điểm trên cùng một đoạn đồ thị thẳng' }],
    examples: ['Đồ thị của ô tô: 0 – 30 s đi từ 0 đến 450 m (v = 15 m/s); 30 – 40 s nằm ngang (dừng); 40 – 60 s đi từ 450 m đến 850 m (v = 20 m/s).'],
    exercises: [
      { q: 'Trên đồ thị quãng đường – thời gian, đoạn nằm ngang cho biết điều gì?', a: 'Trong khoảng thời gian đó quãng đường không tăng: vật đứng yên.' },
      { q: 'Đồ thị của xe đạp là đoạn thẳng đi qua gốc toạ độ và điểm (100 s; 400 m). Tính tốc độ xe đạp.', a: 'v = 400 : 100 = 4 m/s.' },
      { q: 'Hai vật cùng xuất phát. Đồ thị của vật A dốc hơn đồ thị của vật B. Vật nào chuyển động nhanh hơn?', a: 'Vật A, vì trong cùng thời gian A đi được quãng đường dài hơn.' },
    ],
  },

  'l7-11': {
    opener: 'Vì sao trên các tuyến đường có những biển báo giới hạn tốc độ và yêu cầu giữ khoảng cách giữa các xe?',
    goals: ['Dựa vào tranh ảnh (hoặc học liệu điện tử) thảo luận để nêu được ảnh hưởng của tốc độ trong an toàn giao thông.'],
    sections: [
      { title: 'Tốc độ và an toàn giao thông', body: ['Khi gặp chướng ngại vật, người lái cần một khoảng thời gian để phản ứng (thời gian phản ứng); trong thời gian đó xe vẫn chạy với tốc độ cũ. Sau khi đạp phanh, xe còn đi thêm một quãng đường nữa mới dừng hẳn (quãng đường phanh).', 'Tốc độ càng lớn thì quãng đường đi được trong thời gian phản ứng và quãng đường phanh càng dài, nguy cơ tai nạn càng cao và hậu quả càng nghiêm trọng.', 'Thời gian phản ứng tăng khi người lái mệt mỏi, buồn ngủ, sử dụng điện thoại, uống rượu bia. Quãng đường phanh tăng khi mặt đường trơn trượt, lốp mòn, phanh kém.'], scene: 1 },
      { title: 'Khoảng cách an toàn và tốc độ giới hạn', body: ['Khi tham gia giao thông phải đi đúng tốc độ quy định ghi trên biển báo và giữ khoảng cách an toàn với xe phía trước.', 'Khoảng cách an toàn tối thiểu giữa hai xe trên đường khô ráo: tốc độ đến 60 km/h: 35 m; trên 60 đến 80 km/h: 55 m; trên 80 đến 100 km/h: 70 m; trên 100 đến 120 km/h: 100 m. Trời mưa, sương mù, đường trơn phải giữ khoảng cách lớn hơn.'], scene: 3 },
    ],
    examples: ['Ô tô đi 72 km/h (20 m/s), thời gian phản ứng 1 s: trước khi kịp phanh, xe đã đi thêm 20 m.', 'Biển báo tròn viền đỏ có số 50: tốc độ tối đa cho phép là 50 km/h.'],
    facts: ['Khi tốc độ tăng gấp đôi, quãng đường phanh tăng khoảng gấp bốn lần.'],
    exercises: [
      { q: 'Một xe máy đi với tốc độ 54 km/h. Người lái phản ứng mất 0,8 s. Tính quãng đường xe đi được trong thời gian phản ứng.', a: '54 km/h = 15 m/s; s = 15 × 0,8 = 12 m.' },
      { q: 'Vì sao khi trời mưa cần giảm tốc độ và tăng khoảng cách với xe phía trước?', a: 'Đường trơn làm quãng đường phanh dài hơn, xe dễ trượt; giảm tốc độ và tăng khoảng cách để kịp dừng an toàn.' },
      { q: 'Nêu hai việc học sinh cần làm để đảm bảo an toàn khi đi xe đạp đến trường.', a: 'Đi đúng phần đường, không phóng nhanh, không đi hàng ba; quan sát, giảm tốc độ khi qua ngã tư, đội mũ bảo hiểm khi đi xe máy điện…' },
    ],
  },

  'l7-12': {
    opener: 'Âm thanh được tạo ra như thế nào và truyền đến tai ta bằng cách nào?',
    goals: ['Thực hiện thí nghiệm tạo sóng âm (như gảy đàn, gõ vào thanh kim loại…) để chứng tỏ được sóng âm có thể truyền được trong chất rắn, lỏng, khí.', 'Giải thích được sự truyền sóng âm trong không khí.'],
    sections: [
      { title: 'Nguồn âm', body: ['Các vật phát ra âm gọi là nguồn âm. Khi phát ra âm, các vật đều dao động.', 'Dao động là sự chuyển động qua lại quanh một vị trí cân bằng. Ví dụ: mặt trống, dây đàn, âm thoa, thước thép, cột không khí trong ống sáo dao động phát ra âm.'], scene: 1 },
      { title: 'Sóng âm', body: ['Sóng là sự lan truyền dao động trong môi trường. Sóng âm là sự lan truyền dao động âm trong các môi trường rắn, lỏng, khí.', 'Khi màng loa dao động, lớp không khí sát màng loa bị nén, giãn liên tục; dao động này truyền sang các lớp không khí kế tiếp tạo thành sóng âm lan truyền ra xa. Các hạt không khí chỉ dao động quanh vị trí cân bằng, không di chuyển theo sóng.', 'Sóng âm truyền tới tai làm màng nhĩ dao động, giúp ta nghe được âm.'], scene: 3 },
      { title: 'Môi trường truyền âm', body: ['Âm truyền được trong chất rắn, chất lỏng, chất khí; không truyền được trong chân không.', 'Tốc độ truyền âm trong chất rắn lớn hơn trong chất lỏng, trong chất lỏng lớn hơn trong chất khí. Ở khoảng 20 °C: không khí ≈ 343 m/s; nước ≈ 1 500 m/s; thép ≈ 6 100 m/s.'], scene: 4 },
    ],
    examples: ['Áp tai xuống mặt bàn, gõ nhẹ đầu bàn bên kia: nghe rõ tiếng gõ – âm truyền qua chất rắn.', 'Người thợ lặn dưới nước vẫn nghe được tiếng chân người đi trên bờ.'],
    facts: ['Trên Mặt Trăng không có không khí nên các nhà du hành phải trò chuyện với nhau qua máy bộ đàm (dùng sóng vô tuyến).'],
    exercises: [
      { q: 'Khi gõ vào mặt trống, làm thế nào để biết mặt trống đang dao động?', a: 'Đặt các mẩu giấy nhỏ lên mặt trống: khi gõ, các mẩu giấy nảy lên.' },
      { q: 'Vì sao áp tai xuống đường ray có thể nghe thấy tiếng tàu từ rất xa?', a: 'Âm truyền trong thép (chất rắn) nhanh hơn và ít bị yếu đi hơn trong không khí.' },
      { q: 'Âm có truyền qua chân không không? Nêu thí nghiệm chứng tỏ.', a: 'Không. Đặt chuông điện đang reo trong bình rồi hút dần không khí ra: tiếng chuông nhỏ dần rồi gần như không nghe thấy.' },
    ],
  },

  'l7-13': {
    opener: 'Âm mà ta nghe được phát ra từ dây số 1 và dây số 6 của cây đàn ghi ta có gì khác nhau?',
    goals: ['Từ hình ảnh hoặc đồ thị xác định được biên độ và tần số sóng âm.', 'Nêu được đơn vị của tần số là hertz (kí hiệu là Hz).', 'Nêu được sự liên quan của độ to của âm với biên độ âm.', 'Sử dụng nhạc cụ (hoặc dao động kí) chứng tỏ được độ cao của âm liên hệ với tần số âm.'],
    sections: [
      { title: 'Độ to và biên độ', body: ['Biên độ dao động là khoảng cách từ vị trí ban đầu (cân bằng) đến vị trí xa nhất của vật dao động.', 'Trên màn hình dao động kí, biên độ của sóng âm được biểu diễn bằng khoảng cách từ đường xy (đường cân bằng) đến điểm cao nhất của đường biểu diễn.', 'Biên độ dao động càng lớn thì âm càng to; biên độ càng nhỏ thì âm càng nhỏ.'], scene: 1 },
      { title: 'Tần số và độ cao', body: ['Tần số là số dao động vật thực hiện được trong một giây. Đơn vị tần số là hertz (Hz).', 'Tần số dao động càng lớn thì âm phát ra càng cao (bổng); tần số càng nhỏ thì âm càng thấp (trầm).', 'Phần tự do của thước thép càng ngắn, thước dao động càng nhanh, âm phát ra càng cao. Dây đàn càng mảnh, càng căng thì âm càng cao.'], scene: 3 },
      { title: 'Hạ âm và siêu âm', body: ['Tai người nghe được âm có tần số từ khoảng 20 Hz đến 20 000 Hz.', 'Âm có tần số dưới 20 Hz gọi là hạ âm; âm có tần số trên 20 000 Hz gọi là siêu âm. Tai người không nghe được hạ âm và siêu âm.', 'Một số động vật nghe được hạ âm (voi) hoặc siêu âm (chó, mèo, dơi, cá heo).'], scene: 5 },
    ],
    examples: ['Gảy mạnh dây đàn: dây dao động với biên độ lớn, âm to. Gảy nhẹ: âm nhỏ.', 'Âm thoa có ghi 440 Hz: nhánh âm thoa thực hiện 440 dao động trong một giây.'],
    facts: ['Dơi phát ra siêu âm và nghe tiếng vọng lại để xác định vị trí con mồi và vật cản trong bóng tối.'],
    exercises: [
      { q: 'Một vật thực hiện 1 200 dao động trong 1 phút. Tính tần số dao động. Tai người có nghe được âm do vật phát ra không?', a: 'f = 1 200 : 60 = 20 Hz. Tai người vừa đủ nghe được (ngưỡng thấp nhất).' },
      { q: 'Muốn âm thanh phát ra từ loa to hơn, cần làm gì? Khi đó biên độ dao động của màng loa thay đổi thế nào?', a: 'Vặn tăng âm lượng; màng loa dao động với biên độ lớn hơn.' },
      { q: 'Vì sao có thể dùng còi siêu âm để huấn luyện chó mà không làm phiền người xung quanh?', a: 'Chó nghe được siêu âm còn tai người không nghe được.' },
    ],
  },

  'l7-14': {
    opener: 'Vì sao khi hét to trong hang động hay trước vách núi ta lại nghe thấy tiếng vọng lại?',
    goals: ['Lấy được ví dụ về vật phản xạ âm tốt, vật phản xạ âm kém.', 'Giải thích được một số hiện tượng đơn giản thường gặp trong thực tế về sóng âm.', 'Đề xuất được phương án đơn giản để hạn chế tiếng ồn ảnh hưởng đến sức khoẻ.'],
    sections: [
      { title: 'Phản xạ âm', body: ['Âm gặp một vật cản bị phản xạ trở lại. Âm dội lại khi gặp vật cản gọi là âm phản xạ.', 'Ta nghe được tiếng vang khi âm phản xạ đến tai chậm hơn âm phát ra ít nhất 1/15 giây. Nếu âm phản xạ đến sớm hơn, nó hoà lẫn với âm phát ra làm âm nghe to hơn.'], scene: 1 },
      { title: 'Vật phản xạ âm tốt, phản xạ âm kém', body: ['Vật cứng, có bề mặt nhẵn phản xạ âm tốt (hấp thụ âm kém): tường gạch, kim loại, kính, đá…', 'Vật mềm, xốp, có bề mặt gồ ghề phản xạ âm kém (hấp thụ âm tốt): rèm vải, thảm, xốp, gỗ xốp, cao su…'], scene: 2 },
      { title: 'Ứng dụng phản xạ âm', body: ['Tàu thuỷ dùng máy phát và thu siêu âm để đo độ sâu đáy biển: h = v·t / 2 (âm đi xuống và phản xạ trở lại nên đi quãng đường gấp đôi độ sâu).', 'Dơi, cá heo dùng siêu âm phản xạ để định hướng; máy siêu âm trong y học dùng để khám bệnh.'], scene: 3 },
      { title: 'Ô nhiễm tiếng ồn và cách khắc phục', body: ['Ô nhiễm tiếng ồn là tình trạng tiếng ồn to, kéo dài, gây ảnh hưởng xấu đến sức khoẻ và hoạt động bình thường của con người.', 'Biện pháp: tác động vào nguồn âm (giảm độ to, hạn chế bấm còi, quy định giờ làm việc), phân tán âm trên đường truyền (trồng cây xanh), ngăn chặn đường truyền âm (xây tường chắn, làm cửa kính hai lớp), dùng vật liệu hấp thụ âm (rèm, thảm, tường xốp).'], scene: 4 },
    ],
    formulas: [{ expr: 'h = v · t / 2', note: 'Khoảng cách tới vật cản từ thời gian âm đi và về' }],
    examples: ['Phòng hoà nhạc, phòng thu âm, phòng karaoke thường làm tường sần sùi, treo rèm, dán xốp để giảm tiếng vang.', 'Nhà gần đường quốc lộ trồng nhiều cây xanh, làm cửa kính để giảm tiếng ồn.'],
    facts: ['Nghe âm thanh trên 85 dB trong thời gian dài có thể làm giảm thính lực; nên hạn chế dùng tai nghe với âm lượng lớn.'],
    exercises: [
      { q: 'Tàu phát siêu âm xuống đáy biển, sau 1,4 s thu được âm phản xạ. Tốc độ siêu âm trong nước biển là 1 500 m/s. Tính độ sâu đáy biển.', a: 'h = 1 500 × 1,4 : 2 = 1 050 m.' },
      { q: 'Một người đứng cách vách đá 10 m và hét to. Người đó có nghe được tiếng vang không? (tốc độ âm 340 m/s)', a: 't = 2 × 10 : 340 ≈ 0,059 s < 1/15 s ≈ 0,067 s. Không nghe được tiếng vang rõ ràng.' },
      { q: 'Đề xuất 3 biện pháp chống ô nhiễm tiếng ồn cho lớp học gần chợ.', a: 'Trồng cây xanh quanh trường; đóng cửa kính, treo rèm dày; đề nghị chợ hạn chế dùng loa công suất lớn, không họp chợ trước cổng trường.' },
    ],
  },

  'l7-15': {
    opener: 'Ánh sáng Mặt Trời có thể làm cho quạt quay, làm nóng nước. Ánh sáng có phải là một dạng năng lượng không?',
    goals: ['Thực hiện thí nghiệm thu được năng lượng ánh sáng; từ đó nêu được ánh sáng là một dạng của năng lượng.', 'Thực hiện thí nghiệm tạo ra được mô hình tia sáng bằng một chùm sáng hẹp song song.', 'Vẽ được hình biểu diễn vùng tối do nguồn sáng rộng và vùng tối do nguồn sáng hẹp.'],
    sections: [
      { title: 'Năng lượng ánh sáng', body: ['Ánh sáng là một dạng năng lượng. Năng lượng ánh sáng có thể chuyển hoá thành các dạng năng lượng khác: năng lượng điện (pin mặt trời), năng lượng nhiệt (bình nước nóng năng lượng mặt trời, sấy khô nông sản), năng lượng hoá học (quang hợp của cây xanh).', 'Vật nhận được càng nhiều ánh sáng thì năng lượng ánh sáng thu được càng lớn.'], scene: 1 },
      { title: 'Tia sáng và chùm sáng', body: ['Ánh sáng truyền theo đường thẳng trong môi trường trong suốt và đồng tính.', 'Tia sáng là đường truyền của ánh sáng, được biểu diễn bằng một đường thẳng có mũi tên chỉ hướng truyền.', 'Chùm sáng gồm nhiều tia sáng. Có ba loại: chùm sáng song song (các tia không giao nhau), chùm sáng hội tụ (các tia giao nhau tại một điểm), chùm sáng phân kì (các tia loe rộng ra).'], scene: 3 },
      { title: 'Vùng tối và vùng nửa tối', body: ['Vùng tối là vùng ở phía sau vật cản, không nhận được ánh sáng từ nguồn sáng truyền tới.', 'Nguồn sáng hẹp: phía sau vật cản chỉ có vùng tối, ranh giới rõ nét.', 'Nguồn sáng rộng: phía sau vật cản có vùng tối và vùng nửa tối. Vùng nửa tối chỉ nhận được một phần ánh sáng từ nguồn sáng.'], scene: 4 },
    ],
    examples: ['Pin mặt trời trên mái nhà, đèn đường năng lượng mặt trời, máy tính bỏ túi dùng pin mặt trời.', 'Nhật thực, nguyệt thực là hiện tượng vùng tối, vùng nửa tối trong thiên nhiên.'],
    facts: ['Ánh sáng truyền trong chân không với tốc độ khoảng 300 000 km/s; ánh sáng từ Mặt Trời tới Trái Đất mất khoảng 8 phút 20 giây.'],
    exercises: [
      { q: 'Kể tên ba thiết bị biến đổi năng lượng ánh sáng thành năng lượng khác.', a: 'Pin mặt trời (điện năng), bình nước nóng năng lượng mặt trời (nhiệt năng), máy sấy năng lượng mặt trời (nhiệt năng)…' },
      { q: 'Vì sao bóng của cây dưới ánh đèn ống dài thường có phần rìa mờ?', a: 'Đèn ống là nguồn sáng rộng nên phía sau vật có vùng nửa tối (phần mờ) bao quanh vùng tối.' },
      { q: 'Khi đưa vật cản lại gần nguồn sáng hẹp (giữ nguyên màn chắn), vùng tối trên màn thay đổi thế nào?', a: 'Vùng tối to ra.' },
    ],
  },

  'l7-16': {
    opener: 'Vì sao ta nhìn thấy được ảnh của mình trong gương nhưng không nhìn thấy ảnh của mình trên tờ giấy trắng?',
    goals: ['Vẽ được hình biểu diễn và nêu được các khái niệm: tia sáng tới, tia sáng phản xạ, pháp tuyến, góc tới, góc phản xạ, mặt phẳng tới, ảnh.', 'Thực hiện được thí nghiệm rút ra định luật và phát biểu được nội dung của định luật phản xạ ánh sáng.', 'Phân biệt được phản xạ và phản xạ khuếch tán.'],
    sections: [
      { title: 'Các khái niệm', body: ['Hiện tượng ánh sáng bị hắt lại khi gặp bề mặt nhẵn bóng gọi là sự phản xạ ánh sáng.', 'SI: tia tới; IR: tia phản xạ; I: điểm tới; IN: pháp tuyến (đường vuông góc với mặt gương tại điểm tới); góc SIN = i: góc tới; góc NIR = i\': góc phản xạ; mặt phẳng chứa tia tới và pháp tuyến: mặt phẳng tới.'], scene: 1 },
      { title: 'Định luật phản xạ ánh sáng', body: ['Tia phản xạ nằm trong mặt phẳng tới (mặt phẳng chứa tia tới và pháp tuyến của gương tại điểm tới).', 'Góc phản xạ bằng góc tới: i\' = i.', 'Chiếu tia sáng vuông góc với mặt gương (i = 0) thì tia phản xạ bật ngược trở lại theo phương cũ.'], scene: 1 },
      { title: 'Phản xạ và phản xạ khuếch tán', body: ['Chùm tia tới song song gặp bề mặt nhẵn bóng thì chùm tia phản xạ cũng song song: phản xạ gương (phản xạ định hướng).', 'Chùm tia tới song song gặp bề mặt gồ ghề thì bị phản xạ theo mọi hướng: phản xạ khuếch tán. Nhờ phản xạ khuếch tán mà ta nhìn thấy các vật từ nhiều hướng khác nhau.'], scene: 4 },
    ],
    formulas: [{ expr: "i' = i", note: 'Góc phản xạ bằng góc tới' }],
    examples: ['Mặt nước phẳng lặng phản xạ ánh sáng như gương; mặt nước gợn sóng cho phản xạ khuếch tán.', 'Biển báo giao thông phủ lớp phản quang để phản xạ ánh sáng đèn xe về phía người lái.'],
    exercises: [
      { q: 'Chiếu một tia sáng tới gương phẳng với góc tới 35°. Tính góc phản xạ và góc hợp bởi tia tới và tia phản xạ.', a: "i' = 35°; góc giữa tia tới và tia phản xạ = 35° + 35° = 70°." },
      { q: 'Tia sáng tới hợp với mặt gương một góc 30°. Tính góc phản xạ.', a: 'Góc tới i = 90° − 30° = 60°, nên góc phản xạ i\' = 60°.' },
      { q: 'Vì sao ta đọc được chữ trên trang sách từ nhiều phía?', a: 'Trang giấy có bề mặt gồ ghề, phản xạ khuếch tán ánh sáng theo mọi hướng nên ánh sáng từ trang sách đi vào mắt ta ở nhiều vị trí.' },
    ],
  },

  'l7-17': {
    opener: 'Ảnh của em trong gương phẳng có đặc điểm gì? Vì sao chữ trên đầu xe cứu thương lại được viết ngược?',
    goals: ['Nêu được tính chất ảnh của vật qua gương phẳng.', 'Dựng được ảnh của một vật tạo bởi gương phẳng.', 'Vận dụng được định luật phản xạ ánh sáng trong một số trường hợp đơn giản.'],
    sections: [
      { title: 'Tính chất ảnh tạo bởi gương phẳng', body: ['Ảnh tạo bởi gương phẳng là ảnh ảo – không hứng được trên màn chắn.', 'Ảnh có độ lớn bằng vật.', 'Khoảng cách từ một điểm của vật đến gương bằng khoảng cách từ ảnh của điểm đó đến gương: ảnh và vật đối xứng nhau qua gương.', 'Thí nghiệm: dùng tấm kính trong thay gương phẳng, đặt cây nến B (không cháy) ở phía sau kính sao cho trùng với ảnh của cây nến A (đang cháy).'], scene: 1 },
      { title: 'Dựng ảnh của vật', body: ['Cách 1: dựa vào tính chất đối xứng – vẽ điểm A\' đối xứng với A qua gương (AA\' vuông góc với gương, A và A\' cách đều gương). Làm tương tự với B, nối A\'B\' bằng nét đứt.', 'Cách 2: dựa vào định luật phản xạ – vẽ hai tia tới từ A, vẽ hai tia phản xạ tương ứng; đường kéo dài của hai tia phản xạ giao nhau tại ảnh A\'.', 'Mắt nhìn thấy ảnh A\' vì các tia phản xạ đi vào mắt có đường kéo dài đi qua A\'.'], scene: 2 },
    ],
    examples: ['Gương chiếu hậu trên xe, gương trang điểm, kính tiềm vọng dùng gương phẳng.', 'Chữ "AMBULANCE" in ngược trên đầu xe cứu thương để người lái xe phía trước nhìn qua gương chiếu hậu đọc được đúng chiều.'],
    facts: ['Một người cao 1,6 m chỉ cần gương phẳng cao 0,8 m treo đúng vị trí là nhìn thấy toàn bộ ảnh của mình.'],
    exercises: [
      { q: 'Một người đứng cách gương phẳng 1,5 m. Ảnh của người đó cách người bao nhiêu mét?', a: 'Ảnh cách gương 1,5 m nên ảnh cách người 1,5 + 1,5 = 3 m.' },
      { q: 'Vật AB cao 4 cm đặt song song với gương phẳng, cách gương 10 cm. Ảnh A\'B\' cao bao nhiêu, cách vật bao nhiêu?', a: 'A\'B\' cao 4 cm, cách vật 20 cm.' },
      { q: 'Vì sao không hứng được ảnh của vật qua gương phẳng trên màn chắn?', a: 'Vì ảnh là ảnh ảo: các tia phản xạ không thực sự đi qua ảnh, chỉ có đường kéo dài của chúng đi qua ảnh.' },
    ],
  },

  'l7-18': {
    opener: 'Người xưa đã dùng la bàn để xác định phương hướng khi đi biển. Bộ phận chính của la bàn là gì?',
    goals: ['Tiến hành thí nghiệm để nêu được: tương tác giữa các từ cực của hai nam châm; hướng tác dụng của nam châm vào các vật liệu khác nhau.', 'Mô tả được hiện tượng chứng tỏ nam châm vĩnh cửu có từ tính.'],
    sections: [
      { title: 'Vật liệu từ', body: ['Nam châm hút được các vật làm bằng sắt, thép, nickel, cobalt và một số hợp kim của chúng. Các vật liệu này gọi là vật liệu từ.', 'Nam châm không hút các vật làm bằng nhôm, đồng, nhựa, gỗ, cao su, giấy…', 'Nam châm có tính chất hút sắt gọi là có từ tính. Nam châm giữ được từ tính lâu dài gọi là nam châm vĩnh cửu.'], scene: 1 },
      { title: 'Tương tác giữa hai nam châm', body: ['Mỗi nam châm có hai cực: cực Bắc (N, thường sơn đỏ) và cực Nam (S, thường sơn xanh). Hai cực có từ tính mạnh nhất.', 'Khi đặt hai nam châm gần nhau: các từ cực cùng tên thì đẩy nhau, các từ cực khác tên thì hút nhau.'], scene: 2 },
      { title: 'Định hướng của nam châm – la bàn', body: ['Thanh nam châm treo tự do (hoặc kim nam châm đặt trên trục quay) khi đứng cân bằng luôn nằm theo hướng Bắc – Nam địa lí: đầu chỉ hướng Bắc là cực Bắc (N), đầu chỉ hướng Nam là cực Nam (S).', 'La bàn gồm kim nam châm quay được trên trục, mặt chia độ có ghi các hướng; dùng để xác định phương hướng.'], scene: 3 },
    ],
    examples: ['Nam châm gắn ở cửa tủ lạnh, nắp hộp bút, móc treo đồ trên bảng sắt.', 'Dùng nam châm để tách mạt sắt ra khỏi hỗn hợp với cát.'],
    facts: ['La bàn được người Trung Quốc phát minh từ khoảng thế kỉ XI và được dùng trong đi biển.'],
    exercises: [
      { q: 'Có một thanh kim loại, làm thế nào để biết nó có phải là nam châm không?', a: 'Đưa lại gần các vụn sắt: nếu hút được thì là nam châm. Hoặc treo tự do: nếu luôn nằm theo hướng Bắc – Nam thì là nam châm.' },
      { q: 'Khi đưa cực Bắc của hai nam châm lại gần nhau thì xảy ra hiện tượng gì?', a: 'Hai nam châm đẩy nhau vì hai cực cùng tên.' },
      { q: 'Vì sao không nên đặt la bàn gần các vật bằng sắt khi xác định phương hướng?', a: 'Vật bằng sắt bị kim nam châm hút (và làm kim lệch) nên la bàn chỉ sai hướng.' },
    ],
  },

  'l7-19': {
    opener: 'Không chạm vào nhau, vì sao nam châm vẫn tác dụng lực lên kim la bàn đặt gần nó?',
    goals: ['Nêu được vùng không gian bao quanh một nam châm (hoặc dây dẫn mang dòng điện) mà vật liệu có tính chất từ đặt trong nó chịu tác dụng lực từ, được gọi là từ trường.', 'Nêu được khái niệm từ phổ và tạo được từ phổ bằng mạt sắt và nam châm.', 'Nêu được khái niệm đường sức từ và vẽ được đường sức từ quanh một thanh nam châm.', 'Dựa vào ảnh (hoặc hình vẽ, đoạn phim khoa học) khẳng định được Trái Đất có từ trường.', 'Nêu được cực Bắc địa từ và cực Bắc địa lí không trùng nhau.', 'Sử dụng la bàn để tìm được hướng địa lí.'],
    sections: [
      { title: 'Từ trường', body: ['Vùng không gian bao quanh nam châm (hoặc dây dẫn mang dòng điện) mà vật liệu có tính chất từ đặt trong nó chịu tác dụng của lực từ gọi là từ trường.', 'Dùng kim nam châm (la bàn) để nhận biết từ trường: ở nơi có từ trường, kim nam châm bị lệch khỏi hướng Bắc – Nam.'], scene: 1 },
      { title: 'Từ phổ và đường sức từ', body: ['Rắc mạt sắt lên tấm nhựa đặt trên nam châm, gõ nhẹ: mạt sắt sắp xếp thành những đường cong nối từ cực này sang cực kia. Hình ảnh đó gọi là từ phổ.', 'Mỗi đường cong của từ phổ là một đường sức từ. Quy ước: bên ngoài nam châm, đường sức từ có chiều đi ra từ cực Bắc, đi vào cực Nam. Kim la bàn đặt trên đường sức từ thì nằm dọc theo đường sức, cực Bắc chỉ theo chiều đường sức.', 'Nơi nào đường sức từ dày thì từ trường mạnh, nơi nào thưa thì từ trường yếu.'], scene: 2 },
      { title: 'Từ trường Trái Đất', body: ['Trái Đất có từ trường – Trái Đất như một nam châm khổng lồ. Vì vậy kim la bàn luôn chỉ hướng Bắc – Nam.', 'Cực Bắc địa từ và cực Bắc địa lí không trùng nhau.'], scene: 4 },
      { title: 'Từ trường của dòng điện', body: ['Thí nghiệm Oersted: đặt dây dẫn song song với kim nam châm; khi cho dòng điện chạy qua dây, kim nam châm bị lệch. Xung quanh dòng điện có từ trường.', 'Ống dây có dòng điện chạy qua có từ phổ giống từ phổ của thanh nam châm; hai đầu ống dây là hai cực từ. Đổi chiều dòng điện thì cực từ đổi chỗ.'], scene: 5 },
    ],
    examples: ['Chim bồ câu, rùa biển có khả năng cảm nhận từ trường Trái Đất để định hướng khi di chuyển xa.', 'Dùng la bàn để xác định hướng nhà, hướng đi khi đi rừng, đi biển.'],
    facts: ['Cực quang (ánh sáng nhiều màu ở vùng gần hai cực Trái Đất) xuất hiện do các hạt mang điện từ Mặt Trời bị từ trường Trái Đất dẫn về vùng cực.'],
    exercises: [
      { q: 'Làm thế nào để phát hiện một nơi có từ trường hay không?', a: 'Đặt kim nam châm (la bàn) tại đó: nếu kim bị lệch khỏi hướng Bắc – Nam thì nơi đó có từ trường.' },
      { q: 'Đường sức từ bên ngoài thanh nam châm có chiều như thế nào?', a: 'Đi ra từ cực Bắc (N), đi vào cực Nam (S).' },
      { q: 'Thí nghiệm Oersted chứng tỏ điều gì?', a: 'Dòng điện gây ra từ trường xung quanh nó (dòng điện có tác dụng từ).' },
    ],
  },

  'l7-20': {
    opener: 'Nam châm ở cần cẩu bốc dỡ phế liệu sắt thép có phải là nam châm vĩnh cửu không? Vì sao nó có thể thả rơi sắt thép khi cần?',
    goals: ['Chế tạo được nam châm điện đơn giản và làm thay đổi được từ trường của nó bằng thay đổi dòng điện.'],
    sections: [
      { title: 'Nam châm điện', body: ['Cấu tạo: một ống dây dẫn có lõi sắt non, hai đầu ống dây được nối với nguồn điện qua khoá K.', 'Khi có dòng điện chạy qua, ống dây trở thành nam châm điện: hút được các vật bằng sắt thép, làm lệch kim la bàn. Khi ngắt dòng điện, nam châm điện mất từ tính.'], scene: 1 },
      { title: 'Thay đổi từ trường của nam châm điện', body: ['Tăng cường độ dòng điện chạy qua ống dây (tăng số pin) thì từ trường của nam châm điện mạnh hơn (hút được nhiều ghim hơn).', 'Tăng số vòng dây của ống dây cũng làm từ trường mạnh hơn. Lõi sắt non làm tăng từ trường của ống dây lên rất nhiều.', 'Đổi chiều dòng điện thì các cực từ của nam châm điện đổi chỗ cho nhau.'], scene: 1 },
      { title: 'Ứng dụng', body: ['Cần cẩu điện nâng sắt thép, chuông điện, rơ le điện từ, khoá cửa điện từ, loa điện, tàu đệm từ…', 'Ưu điểm so với nam châm vĩnh cửu: có thể tạo từ trường rất mạnh, có thể ngắt từ tính khi cần, thay đổi được độ mạnh và đổi cực từ.'], scene: 3 },
    ],
    examples: ['Chuông điện: khi có dòng điện, nam châm điện hút thanh sắt làm búa gõ vào chuông.', 'Cần cẩu ở bãi phế liệu: đóng mạch để hút sắt thép, ngắt mạch để thả xuống thùng xe.'],
    facts: ['Tàu đệm từ dùng nam châm điện rất mạnh để nâng đoàn tàu lên khỏi đường ray, có thể chạy với tốc độ trên 500 km/h.'],
    exercises: [
      { q: 'Nêu hai cách làm tăng từ trường của nam châm điện.', a: 'Tăng cường độ dòng điện chạy qua ống dây; tăng số vòng dây của ống dây.' },
      { q: 'Vì sao lõi của nam châm điện làm bằng sắt non mà không làm bằng thép?', a: 'Sắt non bị nhiễm từ mạnh và mất từ tính ngay khi ngắt dòng điện; thép giữ lại từ tính nên không ngắt được nam châm.' },
      { q: 'Làm thế nào để đổi cực từ của một nam châm điện?', a: 'Đổi chiều dòng điện chạy qua ống dây (đổi hai đầu dây nối với cực của nguồn).' },
    ],
  },
};
