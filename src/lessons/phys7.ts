// Nội dung phần Vật lí KHTN 7: Bài 1 (Mở đầu), Bài 8 – Bài 20.
import type { LessonContent, ReportDef } from '../core/types';

const speedReport = (method: 'gate' | 'stopwatch'): ReportDef => ({
  title: method === 'gate' ? 'Đo tốc độ bằng đồng hồ đo thời gian hiện số và cổng quang' : 'Đo tốc độ bằng đồng hồ bấm giây',
  practical: true,
  purpose: 'Đo được tốc độ chuyển động bằng cách đo quãng đường và thời gian; biết cách giảm sai số bằng cách đo nhiều lần.',
  equipment: method === 'gate' ? ['Máng (thanh ray) có thước đo', 'Xe lăn hoặc viên bi', 'Hai cổng quang điện', 'Đồng hồ đo thời gian hiện số'] : ['Thước dây', 'Đồng hồ bấm giây', 'Cờ hiệu xuất phát'],
  steps:
    method === 'gate'
      ? ['Đặt cổng quang A, B cách nhau một khoảng s, đo s bằng thước.', 'Chọn thang đo 99,99 s – 0,01 s, chế độ A ↔ B. Nhấn RESET.', 'Thả xe chuyển động qua hai cổng quang, đọc thời gian t trên đồng hồ.', 'Lặp lại 3 lần, tính giá trị trung bình; tính v = s / t.']
      : ['Đo quãng đường s từ vạch xuất phát đến vạch đích.', 'Bấm đồng hồ khi người chạy xuất phát, bấm dừng khi người chạy qua vạch đích.', 'Lặp lại 3 lần, ghi kết quả vào bảng.', 'Tính thời gian trung bình và tốc độ v = s / t.'],
  columns: [
    { key: 's', label: 'Quãng đường s', unit: 'm', source: 's', digits: 2 },
    { key: 't', label: 'Thời gian t', unit: 's', source: 't', digits: 2, average: true },
    { key: 'v', label: 'Tốc độ v = s/t', unit: 'm/s', formula: (r) => (r.s && r.t ? r.s / r.t : undefined), digits: 2, average: true },
  ],
  questions: ['So sánh kết quả các lần đo. Vì sao các lần đo cho kết quả khác nhau?', method === 'gate' ? 'Vì sao dùng cổng quang đo thời gian chính xác hơn dùng đồng hồ bấm giây?' : 'Nêu nguyên nhân gây sai số khi đo bằng đồng hồ bấm giây và cách khắc phục.'],
});

const l7_1: LessonContent = {
  scenes: [
    { title: 'Phương pháp tìm hiểu tự nhiên', prompt: 'Đi lần lượt qua 5 bước. Lấy ví dụ hạt đậu nảy mầm để học sinh thảo luận từng bước.', question: 'Nếu kết quả thí nghiệm không đúng như dự đoán thì cần làm gì tiếp theo?', doc: { mode: 'steps', set: 'sciMethod7', step: 0 } },
    { title: 'Các kĩ năng học tập môn KHTN', prompt: 'Bấm vào từng kĩ năng để xem nội dung và ví dụ.', question: 'Khi đo khối lượng cuốn sách 3 lần được 125,2 g; 125,4 g; 125,3 g. Khối lượng cuốn sách là bao nhiêu?', doc: { mode: 'cards', set: 'skills7', sel: 0 } },
    { title: 'Dụng cụ đo trong KHTN 7', prompt: 'Bấm vào từng dụng cụ: cổng quang điện, đồng hồ đo thời gian hiện số, đồng hồ bấm giây, thước, cân điện tử.', question: 'Đồng hồ đo thời gian hiện số được điều khiển bằng bộ phận nào?', doc: { mode: 'cards', set: 'tools7', sel: 0 } },
    {
      title: 'Đo thời gian bằng cổng quang',
      prompt: 'Chỉnh khoảng cách hai cổng quang, bấm "Thả xe". Đọc thời gian trên đồng hồ. Mở "Báo cáo" và ghi lại 3 lần đo.',
      question: 'Khi nào đồng hồ bắt đầu đếm, khi nào dừng? Vì sao 3 lần đo cho kết quả hơi khác nhau?',
      doc: { mode: 'timer', method: 'gate', s: 50, v: 0.5, lockMethod: true },
      report: { ...speedReport('gate'), practical: false, title: 'Đo thời gian chuyển động của xe giữa hai cổng quang' },
    },
  ],
};

const l7_8: LessonContent = {
  scenes: [
    { title: 'Cùng thời gian, ai đi xa hơn?', prompt: 'Bấm "Bắt đầu". Sau cùng một khoảng thời gian, so sánh quãng đường các vật đi được.', question: 'Trong cùng thời gian, vật nào chuyển động nhanh nhất? Dựa vào đâu để so sánh?', doc: { mode: 'race', movers: ['walk', 'bike', 'moto', 'car'], by: 'time', T: 10, D: 100 }, startHidden: true },
    { title: 'Cùng quãng đường, ai về trước?', prompt: 'So sánh thời gian các vật đi hết cùng một quãng đường 100 m.', question: 'Trên cùng quãng đường, vật nào đi hết ít thời gian hơn thì chuyển động nhanh hơn hay chậm hơn?', doc: { mode: 'race', movers: ['walk', 'bike', 'run'], by: 'distance', T: 10, D: 100 }, startHidden: true },
    { title: 'Tốc độ v = s / t', prompt: 'Đổi thời gian hoặc quãng đường. Bấm "Hiện số đo" để xem tốc độ theo m/s và km/h.', question: 'Một ô tô đi 72 km trong 1 giờ. Tính tốc độ của ô tô theo km/h và m/s.', doc: { mode: 'race', movers: ['walk', 'run', 'bike', 'moto', 'car'], by: 'time', T: 20, D: 200 } },
    { title: 'Tốc độ của một số chuyển động', prompt: 'Học sinh ước lượng trước, bấm vào từng ô để mở đáp án.', question: 'Đổi 36 km/h ra m/s; đổi 5 m/s ra km/h.', doc: { mode: 'table', set: 'speeds7', open: [] }, startHidden: true },
  ],
};

const l7_9: LessonContent = {
  scenes: [
    { title: 'Đo tốc độ bằng đồng hồ bấm giây', prompt: 'Chọn quãng đường, bấm "Xuất phát". Mở "Báo cáo", đo 3 lần và ghi số đo.', question: 'Có những cách nào để đo tốc độ? Trong phòng thực hành thường chọn cách nào?', doc: { mode: 'timer', method: 'stopwatch', s: 60, v: 6, lockMethod: true }, report: speedReport('stopwatch') },
    { title: 'Đo tốc độ bằng cổng quang', prompt: 'Đặt hai cổng quang cách nhau s, thả xe, đọc t. Đo 3 lần, ghi vào báo cáo.', question: 'So sánh độ chính xác của hai cách đo tốc độ.', doc: { mode: 'timer', method: 'gate', s: 50, v: 0.5, lockMethod: true }, report: speedReport('gate') },
    { title: 'Thiết bị “bắn tốc độ”', prompt: 'Chọn tốc độ thật của xe, bấm "Cho xe chạy qua". Thiết bị tính tốc độ từ thời gian xe đi giữa hai vạch mốc.', question: 'Ô tô đi qua hai vạch cách nhau 10 m hết 0,56 s. Biển báo 60 km/h. Ô tô có vượt quá tốc độ không?', doc: { mode: 'speedcam', v: 70, limit: 60, gap: 10 }, startHidden: true },
  ],
};

const l7_10: LessonContent = {
  scenes: [
    { title: 'Vẽ đồ thị từ bảng số liệu', prompt: 'Lần lượt chấm từng cặp (t, s) lên hệ trục, sau đó nối các điểm.', question: 'Trong khoảng thời gian nào ô tô đứng yên? Tính tốc độ ô tô trong 30 s đầu.', doc: { mode: 'graph', sc: 'bang', dots: 0 }, startHidden: true },
    { title: 'Chuyển động với tốc độ không đổi', prompt: 'Bấm "Chạy": đồ thị được vẽ đồng thời với chuyển động. Kéo thanh thời gian để đọc quãng đường.', question: 'Đồ thị quãng đường – thời gian có dạng gì? Từ đồ thị, tính tốc độ của xe đạp.', doc: { mode: 'graph', sc: 'deu' } },
    { title: 'Đi – nghỉ – đi tiếp', prompt: 'Quan sát đồ thị gồm ba đoạn. Kéo thanh thời gian để đọc s tại các thời điểm.', question: 'Đoạn đồ thị nằm ngang cho biết điều gì? Đoạn nào xe đi nhanh hơn?', doc: { mode: 'graph', sc: 'dung' }, startHidden: true },
    { title: 'Hai người trên cùng đồ thị', prompt: 'Người B xuất phát sau 40 s. Đọc đồ thị để tìm thời điểm và vị trí B đuổi kịp A.', question: 'Đồ thị của người nào dốc hơn? Hai đồ thị cắt nhau cho biết điều gì?', doc: { mode: 'graph', sc: 'hai' }, startHidden: true },
  ],
};

const l7_11: LessonContent = {
  scenes: [
    { title: 'Tốc độ và quãng đường dừng xe', prompt: 'Tăng dần tốc độ xe, bấm "Chạy thử". Quan sát quãng đường phản ứng và quãng đường phanh.', question: 'Khi tốc độ tăng gấp đôi, quãng đường dừng xe thay đổi thế nào? Vì sao phải đi đúng tốc độ quy định?', doc: { mode: 'safety', v: 40, road: 'dry', driver: 'alert', gap: 40 } },
    { title: 'Người lái và mặt đường', prompt: 'Giữ nguyên tốc độ 60 km/h, đổi người lái (mệt mỏi, dùng điện thoại, uống rượu bia) và mặt đường ướt.', question: 'Vì sao không được sử dụng điện thoại, uống rượu bia khi lái xe?', doc: { mode: 'safety', v: 60, road: 'dry', driver: 'phone', gap: 45 }, startHidden: true },
    { title: 'Khoảng cách an toàn', prompt: 'Đặt vật cản ở cách xe bằng khoảng cách an toàn tối thiểu theo tốc độ, chạy thử và nhận xét.', question: 'Ở tốc độ 80 km/h, xe phía sau phải giữ khoảng cách tối thiểu bao nhiêu mét với xe phía trước?', doc: { mode: 'safety', v: 80, road: 'dry', driver: 'alert', gap: 55 } },
    { title: 'Camera giám sát tốc độ', prompt: 'Thay đổi tốc độ xe và biển báo, bấm "Cho xe chạy qua".', question: 'Thiết bị “bắn tốc độ” xác định tốc độ của xe bằng cách nào?', doc: { mode: 'speedcam', v: 55, limit: 50, gap: 5 } },
    { title: 'Thảo luận: tốc độ và an toàn', prompt: 'Học sinh thảo luận từng tình huống, bấm vào ô để mở gợi ý.', question: 'Em và gia đình cần làm gì để tham gia giao thông an toàn?', doc: { mode: 'table', set: 'trafficSafety7', open: [] }, startHidden: true },
  ],
};

const l7_12: LessonContent = {
  scenes: [
    { title: 'Nguồn âm: mặt trống', prompt: 'Bấm "Gõ" và quan sát các mẩu giấy trên mặt trống. Bấm "Giữ chặt" để mặt trống ngừng dao động.', question: 'Khi mặt trống phát ra âm, mặt trống có đặc điểm gì? Khi giữ chặt mặt trống thì sao?', doc: { mode: 'source', src: 'drum', list: ['drum'] } },
    { title: 'Các vật phát ra âm', prompt: 'Lần lượt chọn âm thoa, thước thép, dây đàn, ống nghiệm và làm cho chúng phát ra âm.', question: 'Các nguồn âm có chung đặc điểm gì?', doc: { mode: 'source', src: 'fork', list: ['fork', 'ruler', 'string', 'bottle'] } },
    { title: 'Sóng âm trong không khí', prompt: 'Quan sát các lớp không khí bị nén, giãn khi màng loa dao động. Chuyển sang cách biểu diễn "Các lớp nén – giãn".', question: 'Các hạt không khí có chuyển động theo sóng âm tới tai không?', doc: { mode: 'wave', medium: 'air', view: 'particles' } },
    { title: 'Âm truyền trong rắn, lỏng, khí', prompt: 'Đổi môi trường: không khí, nước, thép, chân không. So sánh tốc độ truyền âm.', question: 'Âm truyền trong môi trường nào nhanh nhất? Vì sao áp tai xuống đường ray có thể nghe tiếng tàu từ xa?', doc: { mode: 'wave', medium: 'water', view: 'layers' }, startHidden: true },
    { title: 'Âm có truyền qua chân không?', prompt: 'Bật chuông, hút dần không khí ra khỏi bình. Bật loa máy tính để nghe.', question: 'Vì sao các nhà du hành vũ trụ trên Mặt Trăng phải nói chuyện với nhau qua máy bộ đàm?', doc: { mode: 'belljar', air: 1 } },
  ],
};

const l7_13: LessonContent = {
  scenes: [
    { title: 'Biên độ và độ to', prompt: 'Bấm "Phát âm", tăng giảm biên độ. Đường vàng là âm ban đầu để so sánh.', question: 'Biên độ dao động thay đổi thế nào khi âm to hơn?', doc: { mode: 'scope', src: 'tone', A: 0.6, f: 300, ref: { A: 0.3, f: 300 }, only: 'A' } },
    { title: 'Thước thép dao động', prompt: 'Thay đổi chiều dài phần tự do của thước, bấm "Kéo rồi buông thước". Quan sát tần số và nghe âm.', question: 'Phần tự do của thước dài hay ngắn thì âm phát ra cao hơn? Vì sao khi thước quá dài lại không nghe thấy âm?', doc: { mode: 'scope', src: 'ruler', A: 0.7, f: 100, L: 20, only: 'f' }, startHidden: true },
    { title: 'Tần số và độ cao', prompt: 'Thay đổi tần số của máy phát âm. Đường vàng là âm 200 Hz để so sánh.', question: 'Âm có tần số lớn nghe cao hay thấp? Tần số đo bằng đơn vị gì?', doc: { mode: 'scope', src: 'tone', A: 0.6, f: 600, ref: { A: 0.6, f: 200 }, only: 'f' } },
    { title: 'Các dây đàn ghi ta', prompt: 'Lần lượt gảy dây 1 đến dây 6. So sánh tần số và độ cao của âm.', question: 'Âm phát ra từ dây số 1 và dây số 6 khác nhau thế nào?', doc: { mode: 'scope', src: 'string', A: 0.7, f: 330, str: 1 }, startHidden: true },
    { title: 'Hạ âm, siêu âm', prompt: 'Học sinh dự đoán, bấm vào ô để mở đáp án.', question: 'Vì sao có thể dùng còi siêu âm để gọi chó mà người không nghe thấy?', doc: { mode: 'table', set: 'hearingRange', open: [] }, startHidden: true },
  ],
};

const l7_14: LessonContent = {
  scenes: [
    { title: 'Phản xạ âm, tiếng vang', prompt: 'Thay đổi khoảng cách tới vách đá, bấm "Hét to". Bật loa để nghe tiếng vang.', question: 'Phải đứng cách vách đá ít nhất bao nhiêu mét để nghe được tiếng vang? (âm phản xạ đến tai chậm hơn âm phát ra ít nhất 1/15 s)', doc: { mode: 'echo', scene: 'wall', d: 34, surface: 'hard' }, startHidden: true },
    { title: 'Vật phản xạ âm tốt, kém', prompt: 'Đổi bề mặt vật cản: cứng nhẵn, mềm xốp. So sánh âm phản xạ.', question: 'Kể tên vật phản xạ âm tốt và vật phản xạ âm kém. Vì sao phòng hát karaoke thường dán xốp trên tường?', doc: { mode: 'echo', scene: 'wall', d: 34, surface: 'soft' } },
    { title: 'Đo độ sâu đáy biển', prompt: 'Thay đổi độ sâu, bấm "Phát siêu âm". Tính độ sâu từ thời gian thu được âm phản xạ.', question: 'Tàu phát siêu âm, sau 2 s thu được âm phản xạ từ đáy biển. Tốc độ siêu âm trong nước 1 500 m/s. Tính độ sâu.', doc: { mode: 'echo', scene: 'sonar', d: 1500, surface: 'hard' }, startHidden: true },
    { title: 'Chống ô nhiễm tiếng ồn', prompt: 'Lần lượt áp dụng các biện pháp và theo dõi độ to tại nhà.', question: 'Nêu các biện pháp chống ô nhiễm tiếng ồn cho một trường học nằm cạnh đường quốc lộ.', doc: { mode: 'noise', on: [] } },
    { title: 'Độ to của một số âm', prompt: 'Học sinh ước lượng, bấm vào ô để mở đáp án.', question: 'Tiếng ồn ở mức nào thì gây hại cho tai? Em cần làm gì để bảo vệ tai?', doc: { mode: 'table', set: 'soundLevels7', open: [] }, startHidden: true },
  ],
};

const l7_15: LessonContent = {
  scenes: [
    { title: 'Ánh sáng làm quay quạt', prompt: 'Bật đèn chiếu vào pin mặt trời, thay đổi khoảng cách.', question: 'Năng lượng ánh sáng đã chuyển hoá thành những dạng năng lượng nào?', doc: { mode: 'lightenergy', device: 'solar', d: 40 } },
    { title: 'Ánh sáng làm nóng vật', prompt: 'Bật đèn, theo dõi số chỉ nhiệt kế có bầu bọc giấy đen.', question: 'Kể tên một số ứng dụng biến năng lượng ánh sáng thành năng lượng nhiệt.', doc: { mode: 'lightenergy', device: 'heat', d: 30 } },
    { title: 'Chùm sáng và tia sáng', prompt: 'Thu hẹp dần khe trên tấm chắn để tạo vệt sáng hẹp; đổi loại chùm sáng.', question: 'Tia sáng được biểu diễn như thế nào? Phân biệt chùm sáng song song, hội tụ, phân kì.', doc: { mode: 'beams', kind: 'parallel', slit: 120 } },
    { title: 'Vùng tối sau vật cản', prompt: 'Dùng nguồn sáng hẹp. Kéo vật cản lại gần, ra xa nguồn sáng và quan sát vùng tối trên màn.', question: 'Vùng tối là gì? Khi đưa vật cản lại gần nguồn sáng, vùng tối thay đổi thế nào?', doc: { mode: 'shadow', src: 'point', sx: 180, ox: 520, r: 60 }, startHidden: true },
    { title: 'Vùng nửa tối', prompt: 'Chuyển sang nguồn sáng rộng, quan sát vùng tối và vùng nửa tối.', question: 'Vì sao dưới ánh đèn ống dài hoặc đèn lớn, bóng của vật có phần mờ ở rìa?', doc: { mode: 'shadow', src: 'wide', sx: 180, ox: 560, r: 70 }, startHidden: true },
  ],
};

const reflectReport: ReportDef = {
  title: 'Kiểm tra định luật phản xạ ánh sáng',
  practical: true,
  purpose: 'Đo góc tới và góc phản xạ, rút ra mối quan hệ giữa góc phản xạ và góc tới.',
  equipment: ['Gương phẳng', 'Đèn laser (hoặc đèn chiếu tia sáng)', 'Thước đo góc (tờ giấy có vẽ thước đo độ)', 'Giá đỡ'],
  steps: ['Đặt gương vuông góc với mặt tờ giấy, vạch pháp tuyến IN tại điểm tới I.', 'Chiếu tia tới SI với góc tới i, đánh dấu tia phản xạ IR.', 'Đo góc phản xạ i\'. Thay đổi góc tới, lặp lại thí nghiệm.'],
  columns: [
    { key: 'i', label: 'Góc tới i', unit: '°', source: 'i', digits: 0 },
    { key: 'r', label: "Góc phản xạ i'", unit: '°', source: 'r', digits: 0 },
  ],
  chart: { x: 'i', y: 'r', title: "Góc phản xạ i' theo góc tới i" },
  questions: ['So sánh góc phản xạ và góc tới.', 'Tia phản xạ nằm trong mặt phẳng nào?'],
};

const l7_16: LessonContent = {
  scenes: [
    { title: 'Định luật phản xạ ánh sáng', prompt: 'Kéo đèn laser (hoặc dùng thanh trượt) để đổi góc tới. Mở "Báo cáo", ghi số đo với nhiều góc tới.', question: 'Góc phản xạ có quan hệ thế nào với góc tới?', doc: { mode: 'reflect', i: 30, surface: 'mirror', showNormal: true }, report: reflectReport },
    { title: 'Vẽ tia phản xạ', prompt: 'Đang ẩn tia phản xạ: học sinh dự đoán, vẽ bằng bút trình chiếu, sau đó bấm "Hiện số đo" để kiểm tra.', question: 'Chiếu tia sáng tới gương với góc tới 50°. Vẽ tia phản xạ và tính góc hợp bởi tia tới và tia phản xạ.', doc: { mode: 'reflect', i: 50, surface: 'mirror', showNormal: true }, startHidden: true },
    { title: 'Chiếu vuông góc với gương', prompt: 'Đặt góc tới i = 0°.', question: 'Khi chiếu tia sáng vuông góc với mặt gương, tia phản xạ có hướng như thế nào?', doc: { mode: 'reflect', i: 0, surface: 'mirror', showNormal: true }, startHidden: true },
    { title: 'Phản xạ khuếch tán', prompt: 'Chuyển sang bề mặt gồ ghề, quan sát các tia phản xạ.', question: 'Vì sao ta nhìn thấy trang sách từ nhiều phía nhưng không soi gương được vào trang sách?', doc: { mode: 'reflect', i: 30, surface: 'rough' }, startHidden: true },
  ],
};

const l7_17: LessonContent = {
  scenes: [
    { title: 'Thí nghiệm với tấm kính', prompt: 'Kéo nến B ra sau tấm kính đến khi nhìn thấy nến B như đang cháy.', question: 'So sánh khoảng cách từ nến A và nến B đến tấm kính. So sánh độ lớn của ảnh và vật.', doc: { mode: 'mirror', variant: 'glass', d: 180, h: 120, ex: 140, ey: 300, b: 300 }, startHidden: true },
    { title: 'Dựng ảnh của vật qua gương phẳng', prompt: 'Học sinh vẽ ảnh A\'B\' bằng bút trình chiếu (dựa vào tính chất đối xứng), sau đó bấm "Hiện số đo" để kiểm tra.', question: 'Nêu cách vẽ ảnh của một vật qua gương phẳng.', doc: { mode: 'mirror', variant: 'rays', d: 260, h: 180, ex: 200, ey: 160 }, startHidden: true },
    { title: 'Ta nhìn thấy ảnh như thế nào?', prompt: 'Kéo mắt và vật: các tia phản xạ đi vào mắt có đường kéo dài đi qua ảnh.', question: 'Vì sao ảnh tạo bởi gương phẳng không hứng được trên màn chắn?', doc: { mode: 'mirror', variant: 'rays', d: 200, h: 160, ex: 260, ey: 220 } },
  ],
};

const l7_18: LessonContent = {
  scenes: [
    { title: 'Nam châm hút vật nào?', prompt: 'Bấm "Đưa nam châm lại gần" và quan sát các vật bị hút.', question: 'Nam châm hút được những vật làm bằng chất nào? Vật liệu từ là gì?', doc: { mode: 'magnets', sub: 'materials', lock: true }, startHidden: true },
    { title: 'Tương tác giữa hai nam châm', prompt: 'Bấm "Thả tay" và quan sát. Đổi đầu nam châm 2 rồi làm lại.', question: 'Hai cực cùng tên đặt gần nhau thì thế nào? Hai cực khác tên thì sao?', doc: { mode: 'magnets', sub: 'pair', flip: false, lock: true }, startHidden: true },
    { title: 'Nam châm treo tự do', prompt: 'Kéo cho thanh nam châm quay lệch đi rồi thả tay. Quan sát hướng khi nam châm đứng yên.', question: 'Khi đứng cân bằng, nam châm treo tự do nằm theo hướng nào? Vì sao có thể dùng la bàn để xác định phương hướng?', doc: { mode: 'magnets', sub: 'hang', lock: true } },
  ],
};

const l7_19: LessonContent = {
  scenes: [
    { title: 'Từ phổ của thanh nam châm', prompt: 'Quan sát mạt sắt rắc quanh thanh nam châm. Kéo các la bàn đặt ở nhiều vị trí.', question: 'Mạt sắt sắp xếp như thế nào? Ở đâu mạt sắt dày nhất?', doc: { mode: 'field', cfg: 'bar', show: 'filings', compasses: [{ x: 600, y: 170 }], list: ['bar'] } },
    { title: 'Đường sức từ', prompt: 'Chuyển sang "Đường sức từ". Kéo la bàn dọc theo một đường sức từ. Bấm "Hiện số đo" để hiện chiều đường sức.', question: 'Chiều của đường sức từ bên ngoài nam châm được quy ước như thế nào?', doc: { mode: 'field', cfg: 'bar', show: 'lines', compasses: [{ x: 600, y: 180 }, { x: 300, y: 250 }, { x: 900, y: 450 }], list: ['bar'] }, startHidden: true },
    { title: 'Từ phổ các nam châm khác', prompt: 'Chọn nam châm chữ U, hai cực khác tên, hai cực cùng tên đặt gần nhau.', question: 'So sánh từ phổ giữa hai cực khác tên và giữa hai cực cùng tên.', doc: { mode: 'field', cfg: 'u', show: 'filings', compasses: [{ x: 600, y: 500 }], list: ['u', 'unlike', 'like'] } },
    { title: 'Từ trường Trái Đất', prompt: 'Kéo các la bàn đặt quanh Trái Đất, chuyển sang "Đường sức từ".', question: 'Vì sao kim la bàn luôn chỉ hướng Bắc – Nam địa lí?', doc: { mode: 'field', cfg: 'earth', show: 'lines', compasses: [{ x: 600, y: 120 }, { x: 830, y: 340 }, { x: 370, y: 340 }, { x: 600, y: 580 }], list: ['earth'] } },
    { title: 'Thí nghiệm Oersted', prompt: 'Đóng, ngắt khoá K; đổi chiều dòng điện. Quan sát kim nam châm.', question: 'Thí nghiệm chứng tỏ điều gì về từ trường của dòng điện?', doc: { mode: 'coil', sub: 'oersted', cells: 2, turns: 200, core: false, reverse: false }, startHidden: true },
    { title: 'Từ trường của ống dây', prompt: 'Đóng khoá K, quan sát mạt sắt và la bàn quanh ống dây. Đổi chiều dòng điện.', question: 'Từ phổ của ống dây có dòng điện giống từ phổ của nam châm nào?', doc: { mode: 'coil', sub: 'solenoid', cells: 2, turns: 200, core: false, reverse: false } },
  ],
};

const l7_20: LessonContent = {
  scenes: [
    {
      title: 'Chế tạo nam châm điện',
      prompt: 'Đóng khoá K, đếm số ghim hút được. Thay đổi số pin, số vòng dây, lõi sắt; mỗi lần bấm "Ghi số đo" trong Báo cáo.',
      question: 'Từ trường của nam châm điện phụ thuộc vào những yếu tố nào?',
      doc: { mode: 'coil', sub: 'magnet', cells: 1, turns: 200, core: true, reverse: false },
      report: {
        title: 'Chế tạo nam châm điện đơn giản',
        practical: true,
        purpose: 'Chế tạo được nam châm điện đơn giản và làm thay đổi được từ trường của nó bằng thay đổi dòng điện.',
        equipment: ['Ống dây (100, 200, 300 vòng)', 'Lõi sắt non', 'Pin 1,5 V và đế pin', 'Khoá K, dây nối', 'Ghim giấy bằng thép', 'La bàn'],
        steps: ['Lồng lõi sắt non vào ống dây, mắc ống dây với nguồn điện qua khoá K.', 'Đóng khoá K, đưa đầu ống dây lại gần ghim giấy, đếm số ghim bị hút.', 'Tăng số pin (tăng dòng điện), lặp lại. Thay ống dây có số vòng khác, lặp lại.', 'Ngắt khoá K, quan sát các ghim.'],
        columns: [
          { key: 'U', label: 'Hiệu điện thế nguồn', unit: 'V', source: 'U', digits: 1 },
          { key: 'N', label: 'Số vòng dây', source: 'N', digits: 0 },
          { key: 'clips', label: 'Số ghim hút được', source: 'clips', digits: 0 },
        ],
        chart: { x: 'U', y: 'clips', title: 'Số ghim hút được theo hiệu điện thế' },
        questions: ['Khi tăng số pin, số ghim hút được thay đổi thế nào?', 'Khi ngắt dòng điện, các ghim có còn bị hút không? Giải thích.', 'Làm thế nào để đổi cực từ của nam châm điện?'],
      },
    },
    { title: 'Đổi cực nam châm điện', prompt: 'Đóng khoá K, quan sát la bàn. Đổi chiều dòng điện rồi quan sát lại.', question: 'Làm thế nào để biết đầu nào của ống dây là cực Bắc?', doc: { mode: 'coil', sub: 'magnet', cells: 2, turns: 300, core: true, reverse: false }, startHidden: true },
    { title: 'Nam châm vĩnh cửu và nam châm điện', prompt: 'Học sinh so sánh, bấm vào ô để mở đáp án.', question: 'Vì sao cần cẩu ở bãi phế liệu dùng nam châm điện mà không dùng nam châm vĩnh cửu?', doc: { mode: 'table', set: 'magnetCompare', open: [] }, startHidden: true },
  ],
};

export const PHYS7_LESSONS: Record<string, LessonContent> = {
  'l7-1': l7_1,
  'l7-8': l7_8,
  'l7-9': l7_9,
  'l7-10': l7_10,
  'l7-11': l7_11,
  'l7-12': l7_12,
  'l7-13': l7_13,
  'l7-14': l7_14,
  'l7-15': l7_15,
  'l7-16': l7_16,
  'l7-17': l7_17,
  'l7-18': l7_18,
  'l7-19': l7_19,
  'l7-20': l7_20,
};
