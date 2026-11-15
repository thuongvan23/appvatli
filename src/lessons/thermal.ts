// Nội dung KHTN 8: Bài 20 (nhiễm điện) và Chương VI Nhiệt (Bài 26–29).
import type { LessonContent } from '../core/types';

const l8_20: LessonContent = {
  scenes: [
    {
      title: 'Cọ xát thước nhựa',
      prompt: 'Kéo mảnh vải qua lại trên thước nhựa để cọ xát (hoặc bấm "Cọ xát nhanh"). Sau đó đưa thước lại gần giấy vụn.',
      question: 'Vì sao sau khi cọ xát, thước nhựa hút được giấy vụn? Electron đã dịch chuyển từ vật nào sang vật nào?',
      doc: { mode: 'charge', pair: 'nhuaVai', rubs: 0, near: false },
    },
    {
      title: 'Cọ xát thanh thuỷ tinh',
      prompt: 'Cọ xát thanh thuỷ tinh bằng mảnh lụa. So sánh loại điện tích của thanh thuỷ tinh với thước nhựa.',
      question: 'Thanh thuỷ tinh nhiễm điện dương hay âm? Vì sao?',
      doc: { mode: 'charge', pair: 'thuyTinhLua', rubs: 0, near: false },
    },
    {
      title: 'Hai loại điện tích',
      prompt: 'Chọn loại điện tích cho hai quả cầu nhẹ treo bằng sợi chỉ. Quan sát hai quả cầu đẩy nhau hay hút nhau; kéo thanh trượt để đưa chúng lại gần.',
      question: 'Hai vật nhiễm điện cùng loại thì thế nào? Khác loại thì thế nào? Vật không nhiễm điện có bị hút không? Giải thích hiện tượng sét.',
      doc: { mode: 'interact', hanging: 'neg', hand: 'neg', close: 0.5 },
      startHidden: true,
    },
  ],
};

const l8_26: LessonContent = {
  scenes: [
    {
      title: 'Phân tử chuyển động không ngừng',
      prompt: 'Thay đổi nhiệt độ và quan sát tốc độ chuyển động của các phân tử chất khí.',
      question: 'Khi nhiệt độ tăng, các phân tử chuyển động nhanh hơn hay chậm hơn? Động năng của chúng thay đổi thế nào?',
      doc: { mode: 'particles', T: 25, state: 'gas' },
    },
    {
      title: 'Ba thể rắn, lỏng, khí',
      prompt: 'Chọn thể rắn, lỏng, khí. Quan sát cách sắp xếp và chuyển động của các phân tử ở mỗi thể.',
      question: 'Nội năng của vật là gì? Làm thế nào để tăng nội năng của một vật?',
      doc: { mode: 'particles', T: 25, state: 'solid' },
    },
    {
      title: 'Khuếch tán trong nước nóng và lạnh',
      prompt: 'Nhỏ thuốc tím vào hai cốc nước có nhiệt độ khác nhau. So sánh tốc độ thuốc tím lan ra.',
      question: 'Vì sao thuốc tím lan ra trong nước nóng nhanh hơn?',
      doc: { mode: 'diffusion', Tcold: 15, Thot: 80 },
    },
  ],
};

const l8_27: LessonContent = {
  scenes: [
    {
      title: 'Đo năng lượng nhiệt',
      prompt: 'Bật nguồn đun nước. Cứ sau một khoảng thời gian, mở "Báo cáo" và bấm "Ghi số đo" (năng lượng, nhiệt độ).',
      question: 'Năng lượng nhiệt cần cung cấp phụ thuộc thế nào vào độ tăng nhiệt độ và khối lượng nước?',
      doc: { mode: 'joule', m: 200, P: 40 },
      report: {
        title: 'Đo năng lượng nhiệt bằng joulemeter',
        practical: true,
        purpose: 'Đo được năng lượng nhiệt cung cấp cho nước bằng joulemeter; tìm mối liên hệ giữa năng lượng nhiệt, khối lượng nước và độ tăng nhiệt độ.',
        equipment: ['Joulemeter', 'Bình nhiệt lượng kế có dây đốt', 'Nhiệt kế', 'Nguồn điện, dây nối', 'Cân, nước'],
        steps: [
          'Cho một lượng nước đã biết khối lượng vào bình nhiệt lượng kế, ghi nhiệt độ ban đầu.',
          'Bật nguồn, đun nước. Ghi số chỉ joulemeter và nhiệt độ của nước sau những khoảng thời gian bằng nhau.',
          'Thay đổi khối lượng nước, lặp lại thí nghiệm.',
        ],
        columns: [
          { key: 'm', label: 'm nước', unit: 'g', source: 'm', digits: 0 },
          { key: 't', label: 't', unit: 's', source: 't', digits: 0 },
          { key: 'E', label: 'Năng lượng E', unit: 'J', source: 'E', digits: 0 },
          { key: 'dT', label: 'Δt°', unit: '°C', source: 'dT', digits: 1 },
          { key: 'k', label: 'E / (m·Δt°)', unit: 'J/(g·°C)', formula: (r) => (r.m && r.dT ? (r.E ?? 0) / (r.m * r.dT) : undefined), digits: 2 },
        ],
        chart: { x: 'dT', y: 'E', title: 'Năng lượng E theo độ tăng nhiệt độ' },
        questions: ['Khi khối lượng nước không đổi, năng lượng cần cung cấp thay đổi thế nào theo độ tăng nhiệt độ?', 'Vì sao trong thực tế nhiệt độ đo được luôn thấp hơn một chút so với tính toán?'],
      },
    },
  ],
};

const l8_28: LessonContent = {
  scenes: [
    {
      title: 'Dẫn nhiệt trong kim loại',
      prompt: 'Đốt nóng một đầu ba thanh đồng, nhôm, thép. Quan sát thứ tự các đinh gắn bằng sáp rơi xuống.',
      question: 'Kim loại nào dẫn nhiệt tốt nhất? Vì sao xoong nồi làm bằng kim loại còn quai cầm bằng nhựa, gỗ?',
      doc: { mode: 'conduction', rods: ['dong', 'nhom', 'thep'] },
    },
    {
      title: 'Vật dẫn nhiệt kém',
      prompt: 'So sánh sự dẫn nhiệt của thanh đồng và thanh thuỷ tinh.',
      doc: { mode: 'conduction', rods: ['dong', 'thuyTinh'] },
    },
    {
      title: 'Đối lưu trong nước',
      prompt: 'Đun nóng đáy bình ở một bên, quan sát chuyển động của các hạt thuốc tím.',
      question: 'Vì sao khi đun nước phải đun từ phía dưới?',
      doc: { mode: 'convection', medium: 'water' },
    },
    {
      title: 'Đối lưu trong không khí',
      prompt: 'Quan sát dòng khói hương trong không khí khi có nguồn nhiệt ở dưới.',
      question: 'Giải thích sự tạo thành gió; vì sao điều hoà thường được lắp ở trên cao?',
      doc: { mode: 'convection', medium: 'air' },
    },
    {
      title: 'Bức xạ nhiệt',
      prompt: 'Bật đèn chiếu vào hai bình giống nhau: một bình phủ muội đen, một bình sơn trắng. So sánh nhiệt độ.',
      question: 'Vì sao mùa hè nên mặc áo màu sáng? Hiệu ứng nhà kính là gì?',
      doc: { mode: 'radiation' },
    },
  ],
};

const l8_29: LessonContent = {
  scenes: [
    {
      title: 'Sự nở vì nhiệt của chất rắn',
      prompt: 'Khi quả cầu còn nguội, thả qua vòng. Sau đó tăng nhiệt độ quả cầu rồi thả lại.',
      question: 'Vì sao giữa các thanh ray đường sắt phải để một khe hở?',
      doc: { mode: 'expansion', kind: 'ball', T: 25 },
    },
    {
      title: 'Sự nở vì nhiệt của chất lỏng',
      prompt: 'Nhúng ba bình đựng rượu, dầu, nước vào chậu nước nóng. Quan sát mực chất lỏng trong các ống.',
      question: 'Các chất lỏng khác nhau nở vì nhiệt có giống nhau không? Nguyên tắc hoạt động của nhiệt kế?',
      doc: { mode: 'expansion', kind: 'liquid', T: 25 },
    },
    {
      title: 'Sự nở vì nhiệt của chất khí',
      prompt: 'Áp hai bàn tay vào bình cầu để làm nóng không khí bên trong. Quan sát giọt nước màu trong ống.',
      question: 'Vì sao quả bóng bàn bị bẹp nhúng vào nước nóng lại phồng lên?',
      doc: { mode: 'expansion', kind: 'gas', T: 25 },
    },
    {
      title: 'Băng kép',
      prompt: 'Hơ nóng băng kép đồng – thép, quan sát băng kép bị cong về phía nào. Thử làm lạnh dưới 25 °C.',
      question: 'Giải thích hoạt động của băng kép trong bàn là điện tự động ngắt.',
      doc: { mode: 'expansion', kind: 'strip', T: 25 },
    },
  ],
};

export const THERMAL_LESSONS: Record<string, LessonContent> = {
  'l8-20': l8_20,
  'l8-26': l8_26,
  'l8-27': l8_27,
  'l8-28': l8_28,
  'l8-29': l8_29,
};
