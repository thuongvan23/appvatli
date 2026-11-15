// KHTN 9 – Chương III (Điện), Chương IV (Điện từ), Chương V (Năng lượng với cuộc sống).
import type { LessonNotes } from './types';

export const NOTES_9B: Record<string, LessonNotes> = {
  'l9-11': {
    opener: 'Nếu đặt cùng một hiệu điện thế vào hai đầu các dây dẫn khác nhau thì cường độ dòng điện qua chúng có như nhau không?',
    goals: ['Thực hiện thí nghiệm đơn giản để nêu được điện trở có tác dụng cản trở dòng điện.', 'Thực hiện thí nghiệm để xây dựng định luật Ohm; nêu được công thức tính điện trở của dây dẫn R = ρ·l/S.', 'Nêu được ý nghĩa của điện trở, đơn vị đo; vận dụng định luật Ohm giải bài tập.'],
    sections: [
      {
        title: 'Điện trở',
        body: [
          'Mắc lần lượt các điện trở khác nhau vào cùng một nguồn điện nối tiếp với đèn: điện trở càng lớn thì đèn càng tối, cường độ dòng điện càng nhỏ. Điện trở có tác dụng cản trở dòng điện.',
          'Điện trở của dây dẫn đặc trưng cho mức độ cản trở dòng điện. Đơn vị ôm (Ω); 1 kΩ = 1 000 Ω; 1 MΩ = 1 000 000 Ω.',
        ],
        scene: 2,
      },
      {
        title: 'Sự phụ thuộc của I vào U',
        body: [
          'Mắc mạch gồm nguồn điện điều chỉnh được, ampe kế nối tiếp, vôn kế song song với điện trở. Thay đổi hiệu điện thế 0, 2, 4, 6, 8 V, đọc cường độ dòng điện.',
          'Đồ thị biểu diễn I theo U là một đường thẳng đi qua gốc toạ độ: cường độ dòng điện tỉ lệ thuận với hiệu điện thế. Thương số U/I không đổi với mỗi dây dẫn và chính là điện trở của dây.',
        ],
        scene: 1,
      },
      {
        title: 'Định luật Ohm',
        body: ['Cường độ dòng điện chạy qua một đoạn dây dẫn tỉ lệ thuận với hiệu điện thế đặt vào hai đầu dây và tỉ lệ nghịch với điện trở của dây: I = U / R.'],
        scene: 2,
      },
      {
        title: 'Điện trở của dây dẫn phụ thuộc vào gì?',
        body: [
          'Điện trở của dây dẫn tỉ lệ thuận với chiều dài l, tỉ lệ nghịch với tiết diện S và phụ thuộc vào vật liệu làm dây: R = ρ·l / S, với ρ là điện trở suất (Ω·m).',
          'Điện trở suất của bạc, đồng, nhôm rất nhỏ (dẫn điện tốt, dùng làm dây dẫn); của nikêlin, constantan, nicrom lớn (dùng làm dây điện trở, dây đốt nóng).',
        ],
        scene: 3,
      },
      {
        title: 'Biến trở và điện trở trong kĩ thuật',
        body: [
          'Biến trở là điện trở có thể thay đổi trị số, dùng để điều chỉnh cường độ dòng điện trong mạch (điều chỉnh độ sáng đèn, âm lượng, tốc độ quạt).',
          'Điện trở dùng trong kĩ thuật thường có trị số ghi trực tiếp hoặc thể hiện bằng các vòng màu sơn trên điện trở.',
        ],
        scene: 4,
      },
    ],
    formulas: [
      { expr: 'I = U / R', note: 'Định luật Ohm: I (A), U (V), R (Ω)' },
      { expr: 'R = ρ · l / S', note: 'ρ: điện trở suất (Ω·m); l: chiều dài (m); S: tiết diện (m²)' },
    ],
    examples: [
      'Dây dẫn điện trong nhà làm bằng đồng (điện trở suất nhỏ), có tiết diện lớn cho các thiết bị công suất lớn.',
      'Dây đốt nóng của bàn là, bếp điện làm bằng nicrom có điện trở suất lớn.',
      'Núm vặn âm lượng của đài, núm điều chỉnh độ sáng đèn là biến trở.',
    ],
    exercises: [
      { q: 'Đặt hiệu điện thế 12 V vào hai đầu điện trở 24 Ω. Tính cường độ dòng điện.', a: 'I = U/R = 12/24 = 0,5 A.' },
      { q: 'Dây nicrom dài 2 m, tiết diện 0,2 mm², ρ = 1,1·10⁻⁶ Ω·m. Tính điện trở.', a: 'R = 1,1·10⁻⁶ · 2 / (0,2·10⁻⁶) = 11 Ω.' },
      { q: 'Hai dây đồng cùng chiều dài, dây thứ nhất có tiết diện gấp đôi dây thứ hai. So sánh điện trở.', a: 'R₁ = R₂/2 vì điện trở tỉ lệ nghịch với tiết diện.' },
    ],
  },

  'l9-12': {
    opener: 'Các thiết bị điện trong gia đình được mắc như thế nào? Vì sao khi tắt một đèn thì các đèn khác vẫn sáng?',
    goals: ['Thực hiện thí nghiệm rút ra: trong đoạn mạch nối tiếp, cường độ dòng điện là như nhau tại mọi điểm; trong đoạn mạch song song, tổng cường độ dòng điện các nhánh bằng cường độ dòng điện mạch chính.', 'Tính được điện trở tương đương của đoạn mạch nối tiếp, song song gồm hai điện trở.'],
    sections: [
      {
        title: 'Đoạn mạch nối tiếp',
        body: [
          'Mắc R₁, R₂ nối tiếp với nguồn, dùng ampe kế đo cường độ dòng điện ở các vị trí khác nhau và vôn kế đo hiệu điện thế giữa hai đầu mỗi điện trở và cả đoạn mạch.',
          'Kết quả: cường độ dòng điện như nhau tại mọi điểm: I = I₁ = I₂. Hiệu điện thế giữa hai đầu đoạn mạch bằng tổng hiệu điện thế trên mỗi điện trở: U = U₁ + U₂.',
          'Điện trở tương đương: Rtđ = R₁ + R₂. Hiệu điện thế trên mỗi điện trở tỉ lệ thuận với điện trở: U₁/U₂ = R₁/R₂.',
        ],
        scene: 1,
      },
      {
        title: 'Đoạn mạch song song',
        body: [
          'Mắc R₁, R₂ song song: hiệu điện thế giữa hai đầu mỗi nhánh bằng nhau và bằng hiệu điện thế của đoạn mạch: U = U₁ = U₂.',
          'Cường độ dòng điện mạch chính bằng tổng cường độ dòng điện các nhánh: I = I₁ + I₂. Dòng điện qua mỗi nhánh tỉ lệ nghịch với điện trở: I₁/I₂ = R₂/R₁.',
          'Điện trở tương đương: 1/Rtđ = 1/R₁ + 1/R₂; Rtđ nhỏ hơn mỗi điện trở thành phần.',
        ],
        scene: 2,
      },
      {
        title: 'Các bóng đèn mắc nối tiếp và song song',
        body: [
          'Hai đèn giống nhau mắc nối tiếp vào nguồn: mỗi đèn chỉ có một nửa hiệu điện thế, đèn sáng yếu; tháo một đèn thì đèn còn lại tắt (mạch hở).',
          'Hai đèn mắc song song: mỗi đèn có đủ hiệu điện thế của nguồn, sáng bình thường; tháo một đèn thì đèn kia vẫn sáng. Vì vậy các thiết bị trong gia đình được mắc song song.',
        ],
        scene: 3,
      },
    ],
    formulas: [
      { expr: 'Nối tiếp: I = I₁ = I₂; U = U₁ + U₂; Rtđ = R₁ + R₂', note: '' },
      { expr: 'Song song: U = U₁ = U₂; I = I₁ + I₂; 1/Rtđ = 1/R₁ + 1/R₂', note: '' },
    ],
    examples: ['Dây đèn trang trí nhấp nháy thường mắc nối tiếp: một bóng hỏng có thể làm cả dây tắt.', 'Đèn, quạt, ti vi, tủ lạnh trong nhà mắc song song với mạng điện 220 V.', 'Cầu chì mắc nối tiếp với thiết bị cần bảo vệ.'],
    exercises: [
      { q: 'R₁ = 10 Ω, R₂ = 20 Ω mắc nối tiếp vào hiệu điện thế 6 V. Tính I, U₁, U₂.', a: 'Rtđ = 30 Ω; I = 0,2 A; U₁ = 2 V; U₂ = 4 V.' },
      { q: 'R₁ = 6 Ω, R₂ = 12 Ω mắc song song vào hiệu điện thế 6 V. Tính Rtđ, I₁, I₂, I.', a: 'Rtđ = 4 Ω; I₁ = 1 A; I₂ = 0,5 A; I = 1,5 A.' },
      { q: 'Vì sao các thiết bị điện trong gia đình được mắc song song?', a: 'Để mỗi thiết bị đều có hiệu điện thế 220 V (đúng định mức) và có thể bật, tắt từng thiết bị độc lập.' },
    ],
  },

  'l9-13': {
    opener: 'Trên bóng đèn có ghi 220 V – 60 W. Các con số này có ý nghĩa gì? Vì sao hằng tháng gia đình phải trả tiền điện?',
    goals: ['Lấy ví dụ chứng tỏ dòng điện có năng lượng.', 'Nêu được công suất điện định mức của dụng cụ điện; tính được năng lượng điện và công suất điện trong trường hợp đơn giản.'],
    sections: [
      {
        title: 'Năng lượng của dòng điện',
        body: [
          'Dòng điện có năng lượng vì có thể thực hiện công (quay động cơ quạt, máy bơm) và cung cấp nhiệt lượng (bàn là, nồi cơm điện). Năng lượng của dòng điện gọi là năng lượng điện (điện năng).',
          'Năng lượng điện tiêu thụ trong thời gian t: W = U·I·t = P·t. Đơn vị jun (J); trong thực tế dùng kilôoát giờ: 1 kWh = 3 600 000 J. Lượng điện năng sử dụng được đo bằng công tơ điện, mỗi số đếm của công tơ là 1 kWh.',
        ],
        scene: 2,
      },
      {
        title: 'Công suất điện',
        body: [
          'Công suất điện của một đoạn mạch: P = U·I. Với điện trở: P = I²·R = U²/R. Đơn vị oát (W).',
          'Số oát ghi trên dụng cụ điện là công suất định mức: khi dụng cụ được dùng đúng hiệu điện thế định mức thì tiêu thụ công suất bằng công suất định mức. Đèn 220 V – 60 W sáng bình thường khi đặt vào 220 V, tiêu thụ 60 W.',
          'Đặt hiệu điện thế nhỏ hơn định mức thì đèn sáng yếu; lớn hơn nhiều so với định mức thì đèn sáng quá mức và dễ cháy.',
        ],
        scene: 1,
      },
    ],
    formulas: [
      { expr: 'P = U · I = I² · R = U² / R', note: 'Công suất điện (W)' },
      { expr: 'W = P · t = U · I · t', note: 'Năng lượng điện tiêu thụ; 1 kWh = 3,6·10⁶ J' },
    ],
    examples: ['Ấm siêu tốc 1 500 W đun nước trong 6 phút tiêu thụ 0,15 kWh.', 'Thay bóng đèn sợi đốt 60 W bằng bóng LED 9 W cho độ sáng tương đương, tiết kiệm khoảng 85% điện năng.', 'Công tơ điện ở mỗi gia đình đếm số kWh để tính tiền điện.'],
    exercises: [
      { q: 'Bóng đèn 220 V – 100 W dùng 5 giờ mỗi ngày trong 30 ngày tiêu thụ bao nhiêu kWh? Tính tiền điện nếu giá 2 000 đ/kWh.', a: 'W = 0,1 kW · 150 h = 15 kWh; tiền = 30 000 đ.' },
      { q: 'Tính cường độ dòng điện và điện trở của đèn 220 V – 60 W khi sáng bình thường.', a: 'I = P/U ≈ 0,27 A; R = U²/P ≈ 807 Ω.' },
      { q: 'Đèn 6 V – 3 W được mắc vào nguồn 3 V. Đèn sáng thế nào? Công suất thực bao nhiêu (coi R không đổi)?', a: 'R = 36/3 = 12 Ω; P = 3²/12 = 0,75 W – đèn sáng yếu hơn bình thường.' },
    ],
  },

  'l9-14': {
    opener: 'Ở lớp 7 ta biết dòng điện có thể tạo ra từ trường. Ngược lại, từ trường có thể tạo ra dòng điện không?',
    goals: ['Thực hiện thí nghiệm để nêu được các cách tạo ra dòng điện cảm ứng.', 'Nêu được dòng điện cảm ứng xuất hiện khi số đường sức từ xuyên qua tiết diện cuộn dây dẫn kín biến thiên.', 'Giải thích được nguyên tắc tạo ra dòng điện xoay chiều.'],
    sections: [
      {
        title: 'Dòng điện cảm ứng',
        body: [
          'Cuộn dây dẫn kín nối với điện kế (hoặc hai đèn LED mắc song song ngược cực). Đưa nam châm lại gần hoặc đưa vào trong cuộn dây: kim điện kế lệch, một LED sáng. Để nam châm đứng yên trong cuộn dây: không có dòng điện. Rút nam châm ra: kim lệch ngược chiều, LED kia sáng.',
          'Dòng điện xuất hiện như vậy gọi là dòng điện cảm ứng; hiện tượng gọi là hiện tượng cảm ứng điện từ.',
          'Cũng có thể giữ nam châm đứng yên và di chuyển cuộn dây; hoặc dùng nam châm điện rồi đóng, ngắt mạch điện của nam châm điện.',
        ],
        scene: 1,
      },
      {
        title: 'Điều kiện xuất hiện dòng điện cảm ứng',
        body: [
          'Khi đưa nam châm vào gần, số đường sức từ xuyên qua tiết diện cuộn dây tăng; khi rút ra, số đường sức từ giảm; khi nam châm đứng yên, số đường sức từ không đổi.',
          'Dòng điện cảm ứng xuất hiện trong cuộn dây dẫn kín khi số đường sức từ xuyên qua tiết diện của cuộn dây biến thiên. Khi số đường sức từ tăng thì dòng điện cảm ứng có một chiều, khi giảm thì có chiều ngược lại. Di chuyển nam châm càng nhanh, cuộn dây càng nhiều vòng thì dòng điện cảm ứng càng mạnh.',
        ],
        scene: 2,
      },
      {
        title: 'Nguyên tắc tạo ra dòng điện xoay chiều',
        body: [
          'Dòng điện luân phiên đổi chiều gọi là dòng điện xoay chiều.',
          'Cho nam châm quay trước cuộn dây (hoặc cuộn dây quay trong từ trường của nam châm): số đường sức từ xuyên qua tiết diện cuộn dây luân phiên tăng, giảm nên trong cuộn dây xuất hiện dòng điện cảm ứng xoay chiều – hai LED sáng luân phiên.',
          'Máy phát điện xoay chiều có hai bộ phận chính là nam châm và cuộn dây; bộ phận quay gọi là rôto, bộ phận đứng yên gọi là stato. Dòng điện lưới ở Việt Nam có tần số 50 Hz (đổi chiều 100 lần mỗi giây).',
        ],
        scene: 3,
      },
    ],
    examples: ['Đinamô xe đạp: núm quay làm nam châm quay trong cuộn dây, tạo dòng điện thắp đèn.', 'Máy phát điện ở nhà máy thuỷ điện, nhiệt điện, điện gió.', 'Bếp từ, sạc không dây cho điện thoại hoạt động dựa trên cảm ứng điện từ.'],
    exercises: [
      { q: 'Khi nam châm đứng yên trong lòng cuộn dây thì có dòng điện cảm ứng không? Vì sao?', a: 'Không, vì số đường sức từ xuyên qua tiết diện cuộn dây không biến thiên.' },
      { q: 'Nêu hai cách làm tăng cường độ dòng điện cảm ứng.', a: 'Di chuyển nam châm nhanh hơn; tăng số vòng dây; dùng nam châm mạnh hơn.' },
      { q: 'Vì sao khi nam châm quay trước cuộn dây, hai LED mắc ngược cực lại sáng luân phiên?', a: 'Số đường sức từ qua cuộn dây luân phiên tăng, giảm nên dòng điện cảm ứng luân phiên đổi chiều, mỗi LED chỉ sáng với một chiều dòng điện.' },
    ],
  },

  'l9-15': {
    opener: 'Khi cắm quạt điện, bàn là, nồi cơm điện vào ổ điện (dòng điện xoay chiều) thì chúng đều hoạt động. Dòng điện xoay chiều có những tác dụng nào?',
    goals: ['Lấy ví dụ chứng tỏ dòng điện xoay chiều có tác dụng nhiệt, phát sáng, tác dụng từ, tác dụng sinh lí.'],
    sections: [
      {
        title: 'Tác dụng nhiệt và tác dụng phát sáng',
        body: [
          'Dòng điện xoay chiều qua dây đốt nóng của bàn là, nồi cơm điện, máy sấy tóc làm chúng nóng lên – tác dụng nhiệt.',
          'Dòng điện xoay chiều làm sáng bóng đèn sợi đốt, đèn LED, đèn huỳnh quang – tác dụng phát sáng. Với dòng điện 50 Hz, dòng điện đổi chiều rất nhanh nên mắt thấy đèn sáng gần như liên tục.',
        ],
        scene: 1,
      },
      {
        title: 'Tác dụng từ',
        body: [
          'Nam châm điện dùng dòng điện xoay chiều vẫn hút đinh sắt. Kim nam châm đặt gần cuộn dây có dòng điện một chiều bị lệch về một phía; với dòng điện xoay chiều, lực từ đổi chiều theo dòng điện nên kim nam châm dao động.',
          'Loa, máy biến áp, động cơ điện xoay chiều hoạt động nhờ tác dụng từ.',
        ],
        scene: 2,
      },
      {
        title: 'Tác dụng sinh lí và an toàn điện',
        body: ['Dòng điện xoay chiều qua cơ thể người gây co giật, có thể gây tử vong. Mạng điện gia đình 220 V rất nguy hiểm: không chạm vào dây trần, ổ điện; dùng thiết bị cách điện; lắp cầu dao chống giật. Dòng điện xoay chiều thích hợp được dùng trong y học (máy kích thích cơ, châm cứu điện).'],
      },
    ],
    examples: ['Bàn là, bình nóng lạnh, ấm siêu tốc (tác dụng nhiệt).', 'Đèn chiếu sáng trong nhà, đèn đường (tác dụng phát sáng).', 'Quạt điện, máy bơm, máy giặt dùng động cơ điện; chuông điện, loa (tác dụng từ).', 'Máy biến áp ở trạm điện thay đổi hiệu điện thế xoay chiều.'],
    exercises: [
      { q: 'Kể tên các tác dụng của dòng điện xoay chiều, mỗi tác dụng một ví dụ.', a: 'Nhiệt: bàn là; phát sáng: bóng đèn; từ: quạt điện, nam châm điện; sinh lí: điện giật, máy kích thích cơ trong y học.' },
      { q: 'Vì sao kim nam châm đặt gần cuộn dây có dòng điện xoay chiều lại dao động?', a: 'Dòng điện luân phiên đổi chiều nên từ trường của cuộn dây và lực từ tác dụng lên kim nam châm cũng luân phiên đổi chiều.' },
    ],
  },

  'l9-16': {
    opener: 'Hầu hết năng lượng con người đang sử dụng có nguồn gốc từ đâu?',
    goals: ['Nêu được sơ lược vòng năng lượng trên Trái Đất (Mặt Trời là nguồn năng lượng chủ yếu).', 'Nêu được nhiên liệu hoá thạch là nguồn năng lượng không tái tạo; tác động của việc sử dụng nhiên liệu hoá thạch đối với môi trường và các biện pháp giảm thiểu.'],
    sections: [
      {
        title: 'Vòng năng lượng trên Trái Đất',
        body: [
          'Mặt Trời truyền năng lượng tới Trái Đất bằng bức xạ. Thực vật quang hợp chuyển năng lượng ánh sáng thành năng lượng hoá học trong chất hữu cơ; động vật và con người lấy năng lượng từ thức ăn.',
          'Năng lượng Mặt Trời làm nước bốc hơi tạo mây, mưa; nước chảy từ cao xuống có năng lượng. Mặt Trời làm nóng không khí không đều tạo ra gió.',
          'Sau các quá trình chuyển hoá, năng lượng cuối cùng chuyển thành nhiệt và bức xạ ra không gian.',
        ],
        scene: 1,
      },
      {
        title: 'Năng lượng hoá thạch',
        body: [
          'Nhiên liệu hoá thạch (than đá, dầu mỏ, khí tự nhiên) hình thành từ xác thực vật, động vật bị vùi lấp hàng triệu năm dưới tác dụng của nhiệt độ, áp suất cao. Năng lượng hoá học trong chúng có nguồn gốc từ năng lượng Mặt Trời.',
          'Nhiên liệu hoá thạch hình thành rất chậm nên là nguồn năng lượng không tái tạo; nếu khai thác quá mức sẽ cạn kiệt.',
        ],
        scene: 2,
      },
      {
        title: 'Tác động đến môi trường',
        body: [
          'Đốt nhiên liệu hoá thạch thải ra CO₂, SO₂, NOx, bụi… gây ô nhiễm không khí, mưa acid, tăng hiệu ứng nhà kính làm Trái Đất nóng lên, biến đổi khí hậu.',
          'Biện pháp: sử dụng năng lượng tiết kiệm, hiệu quả; phát triển năng lượng tái tạo; trồng rừng; dùng phương tiện giao thông công cộng, xe điện.',
        ],
        scene: 3,
      },
    ],
    examples: ['Nhà máy nhiệt điện than thải nhiều khói bụi và CO₂.', 'Xăng, dầu diesel dùng cho ô tô, xe máy đều từ dầu mỏ.', 'Khí đốt (gas) dùng nấu ăn là khí tự nhiên hoặc khí hoá lỏng từ dầu mỏ.'],
    exercises: [
      { q: 'Vì sao nói Mặt Trời là nguồn gốc của hầu hết các dạng năng lượng trên Trái Đất?', a: 'Năng lượng Mặt Trời tạo ra chất hữu cơ (thực phẩm, nhiên liệu hoá thạch), gió, vòng tuần hoàn nước (thuỷ điện)…' },
      { q: 'Nêu ba tác hại của việc sử dụng nhiên liệu hoá thạch.', a: 'Ô nhiễm không khí, mưa acid, tăng hiệu ứng nhà kính gây biến đổi khí hậu; cạn kiệt tài nguyên.' },
    ],
  },

  'l9-17': {
    opener: 'Năng lượng tái tạo là gì? Ở Việt Nam đang khai thác những dạng năng lượng tái tạo nào?',
    goals: ['Lấy ví dụ về một số dạng năng lượng tái tạo; nêu ưu, nhược điểm của chúng.', 'Đề xuất được biện pháp sử dụng năng lượng tiết kiệm và hiệu quả.'],
    sections: [
      {
        title: 'Năng lượng tái tạo',
        body: ['Năng lượng tái tạo là năng lượng từ những nguồn liên tục được bổ sung trong tự nhiên: năng lượng Mặt Trời, gió, nước, sóng biển, thuỷ triều, địa nhiệt, sinh khối. Chúng ít gây ô nhiễm môi trường.'],
        scene: 1,
      },
      {
        title: 'Năng lượng gió',
        body: ['Động năng của gió làm quay cánh quạt tua-bin, trục quay làm quay máy phát điện. Gió quá yếu tua-bin không quay; gió quá mạnh tua-bin phải dừng để bảo vệ. Ưu điểm: sạch, không tốn nhiên liệu; nhược điểm: phụ thuộc gió, gây tiếng ồn, chiếm diện tích.'],
        scene: 2,
      },
      {
        title: 'Năng lượng Mặt Trời',
        body: ['Pin quang điện chuyển hoá trực tiếp năng lượng ánh sáng thành điện năng; bình nước nóng năng lượng mặt trời chuyển năng lượng ánh sáng thành nhiệt. Tấm pin nhận nhiều năng lượng nhất khi hướng vuông góc với tia nắng. Nhược điểm: phụ thuộc thời tiết, ban đêm không phát điện.'],
        scene: 3,
      },
      {
        title: 'Năng lượng nước',
        body: ['Thế năng của nước trên hồ chứa chuyển thành động năng làm quay tua-bin, máy phát điện. Thuỷ điện ổn định, công suất lớn, điều tiết lũ nhưng ảnh hưởng hệ sinh thái, phải di dời dân cư. Ngoài ra còn năng lượng sóng biển, thuỷ triều.'],
        scene: 4,
      },
      {
        title: 'Sử dụng năng lượng tiết kiệm, hiệu quả',
        body: ['Tắt thiết bị khi không dùng; dùng đèn LED, thiết bị dán nhãn tiết kiệm năng lượng; đặt điều hoà ở 26 °C trở lên; tận dụng ánh sáng, gió tự nhiên; đi bộ, xe đạp, phương tiện công cộng.'],
        scene: 5,
      },
    ],
    examples: ['Thuỷ điện Hoà Bình, Sơn La; điện gió ở Bạc Liêu, Ninh Thuận; điện mặt trời ở Ninh Thuận, Bình Thuận.', 'Pin mặt trời trên mái nhà, đèn đường năng lượng mặt trời.', 'Biogas từ chất thải chăn nuôi để đun nấu (năng lượng sinh khối).', 'Nhà máy điện địa nhiệt ở các nước có núi lửa (Iceland, New Zealand).'],
    exercises: [
      { q: 'Nêu ưu điểm và nhược điểm của điện mặt trời.', a: 'Ưu: nguồn vô tận, sạch, lắp được trên mái nhà. Nhược: phụ thuộc thời tiết, ban đêm không có, chi phí ban đầu cao, chiếm diện tích.' },
      { q: 'Đề xuất ba việc em có thể làm để tiết kiệm năng lượng ở trường.', a: 'Tắt đèn, quạt khi ra khỏi lớp; tận dụng ánh sáng tự nhiên; tuyên truyền, đi xe đạp đến trường…' },
    ],
  },
};
