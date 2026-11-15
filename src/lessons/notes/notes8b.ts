// KHTN 8 – Chương V: Điện (Bài 20–25).
import type { LessonNotes } from './types';

export const NOTES_8B: Record<string, LessonNotes> = {
  'l8-20': {
    opener: 'Vì sao vào những ngày hanh khô, khi chải tóc bằng lược nhựa thì nhiều sợi tóc bị lược nhựa hút kéo thẳng ra?',
    goals: ['Giải thích được sơ lược nguyên nhân một vật cách điện nhiễm điện do cọ xát.', 'Giải thích được một vài hiện tượng thực tế liên quan đến sự nhiễm điện do cọ xát.'],
    sections: [
      {
        title: 'Vật nhiễm điện',
        body: [
          'Đưa chiếc đũa nhựa lại gần các mẩu giấy vụn: không có hiện tượng gì. Cọ xát đũa nhựa vào mảnh vải len (hoặc dạ) rồi đưa lại gần: đũa hút các mẩu giấy. Làm tương tự với đũa thuỷ tinh cọ xát vào lụa cũng thấy giấy bị hút.',
          'Các vật sau khi bị cọ xát có tính chất hút được các vật khác gọi là vật nhiễm điện hay vật mang điện tích.',
        ],
        scene: 1,
      },
      {
        title: 'Hai loại điện tích',
        body: [
          'Treo một đũa nhựa đã cọ xát vào len lên giá. Đưa đũa nhựa thứ hai (cũng cọ vào len) lại gần: hai đũa đẩy nhau. Thay bằng đũa thuỷ tinh đã cọ vào lụa: hai đũa hút nhau.',
          'Điện tích trên đũa nhựa và đũa thuỷ tinh là hai loại khác nhau. Quy ước: điện tích trên thuỷ tinh cọ xát vào lụa là điện tích dương (+); điện tích trên đũa nhựa cọ xát vào len là điện tích âm (−).',
          'Hai vật nhiễm điện cùng dấu thì đẩy nhau, nhiễm điện khác dấu thì hút nhau.',
        ],
        scene: 3,
      },
      {
        title: 'Giải thích sự nhiễm điện do cọ xát',
        body: [
          'Nguyên tử gồm hạt nhân mang điện dương và các electron mang điện âm chuyển động xung quanh; bình thường nguyên tử trung hoà về điện. Electron có thể bứt ra khỏi nguyên tử và dịch chuyển sang vật khác.',
          'Cọ xát thuỷ tinh vào lụa: electron dịch chuyển từ thuỷ tinh sang lụa. Thuỷ tinh mất bớt electron nên nhiễm điện dương, lụa nhận thêm electron nên nhiễm điện âm.',
          'Cọ xát đũa nhựa vào len: electron dịch chuyển từ len sang đũa nhựa. Đũa nhựa nhiễm điện âm, len nhiễm điện dương.',
        ],
        scene: 2,
      },
      {
        title: 'Sấm sét và điện nghiệm',
        body: [
          'Sự cọ xát mạnh giữa các giọt nước trong luồng không khí bốc lên cao làm các đám mây dông bị nhiễm điện. Khi hai đám mây tích điện trái dấu lại gần nhau, giữa chúng có tia lửa điện chói loà gọi là sét (sét cũng là sự phóng điện giữa đám mây và mặt đất). Nhiệt độ tia lửa điện rất cao làm không khí dãn nở đột ngột, phát ra tiếng nổ gọi là sấm.',
          'Phòng tránh sét: trong nhà đứng xa cửa sổ, đồ dùng điện, chỗ ẩm ướt, rút phích cắm; ngoài trời tuyệt đối không trú dưới cây cao, tránh chỗ cao, tránh xa vật kim loại.',
          'Điện nghiệm dùng để phát hiện vật có nhiễm điện hay không: chạm vật vào quả cầu kim loại, nếu hai lá kim loại xoè ra thì vật nhiễm điện; góc xoè càng lớn vật nhiễm điện càng mạnh.',
        ],
      },
    ],
    examples: [
      'Bụi bám nhiều ở cánh quạt điện sau một thời gian sử dụng do cánh quạt cọ xát với không khí bị nhiễm điện, hút bụi.',
      'Lau gương, kính, màn hình ti vi bằng khăn bông khô vẫn thấy bụi bông bám vào.',
      'Cởi áo len trong phòng tối nghe tiếng lách tách, thấy chớp sáng nhỏ.',
      'Chạm tay vào tay nắm cửa kim loại sau khi đi trên thảm có thể bị "giật" nhẹ.',
      'Xe chở xăng có dây xích kéo lê xuống đất để truyền điện tích xuống đất, tránh phát sinh tia lửa điện.',
    ],
    exercises: [
      { q: 'Vì sao chải tóc khô bằng lược nhựa thì tóc bị lược hút?', a: 'Khi chải, lược và tóc cọ xát nhau nên bị nhiễm điện trái dấu, chúng hút nhau.' },
      { q: 'Cọ xát thanh thuỷ tinh vào lụa, thanh thuỷ tinh nhiễm điện gì? Electron dịch chuyển thế nào?', a: 'Electron dịch chuyển từ thuỷ tinh sang lụa; thuỷ tinh mất electron nên nhiễm điện dương, lụa nhiễm điện âm.' },
      { q: 'Hai quả cầu nhẹ treo gần nhau đẩy nhau. Có thể kết luận gì về điện tích của chúng?', a: 'Hai quả cầu nhiễm điện cùng loại (cùng dương hoặc cùng âm).' },
    ],
  },

  'l8-21': {
    opener: 'Hai điện nghiệm: A tích điện (hai lá xoè), B không tích điện (hai lá cụp). Nối hai quả cầu bằng thanh kim loại thì lá của A cụp bớt, lá của B xoè ra. Điều gì đã xảy ra?',
    goals: ['Định nghĩa được dòng điện là dòng chuyển dời có hướng của hạt mang điện; phân loại được vật dẫn điện, vật không dẫn điện.', 'Nêu được nguồn điện có khả năng cung cấp năng lượng điện; kể được một số nguồn điện thông dụng.'],
    sections: [
      {
        title: 'Dòng điện',
        body: [
          'Trong thí nghiệm với hai điện nghiệm, các hạt mang điện ở điện nghiệm A đã chuyển dịch qua thanh kim loại sang điện nghiệm B: qua thanh kim loại đã có dòng điện.',
          'Dòng điện là dòng chuyển dời có hướng của các hạt mang điện. Trong kim loại, đó là dòng các electron tự do chuyển động có hướng.',
          'Quy ước: chiều dòng điện trong mạch là chiều từ cực dương của nguồn qua dây nối và các dụng cụ điện tới cực âm. Chiều này ngược với chiều chuyển động của electron.',
        ],
        scene: 1,
      },
      {
        title: 'Nguồn điện',
        body: [
          'Muốn duy trì dòng điện trong thiết bị phải có nguồn điện. Nguồn điện có khả năng cung cấp năng lượng điện để các dụng cụ điện hoạt động.',
          'Nguồn điện thường dùng: pin, acquy, pin mặt trời, máy phát điện. Pin, acquy có hai cực: cực dương (+) và cực âm (−).',
        ],
        scene: 4,
      },
      {
        title: 'Vật dẫn điện và vật không dẫn điện',
        body: [
          'Mắc mạch gồm nguồn 3 V, bóng đèn pin, công tắc và hai kẹp kim loại. Lần lượt kẹp lá đồng, lá nhôm, lá nhựa vào giữa hai kẹp rồi đóng công tắc: với lá đồng, lá nhôm đèn sáng; với lá nhựa đèn không sáng.',
          'Vật dẫn điện là vật cho dòng điện chạy qua (vật làm bằng kim loại, ruột bút chì, nước muối…). Vật không dẫn điện (vật cách điện) không cho dòng điện chạy qua (nhựa, gỗ khô, thuỷ tinh, sứ, cao su…).',
        ],
        scene: 3,
      },
    ],
    examples: [
      'Dây điện trong nhà: lõi bằng đồng (dẫn điện), vỏ bọc bằng nhựa (cách điện).',
      'Phích cắm điện có chân bằng đồng, thân bằng nhựa; kìm điện có cán bọc cao su.',
      'Pin chanh (pin Volta đơn giản): cắm hai điện cực đồng và kẽm vào nửa quả chanh tạo ra một nguồn điện nhỏ.',
      'Acquy xe máy, pin điện thoại, pin đồng hồ, pin mặt trời trên mái nhà.',
    ],
    facts: ['Năm 1800, Volta chế tạo pin điện đầu tiên gồm hai bản đồng và kẽm nhúng trong dung dịch acid loãng – tạo ra dòng điện một chiều ổn định.'],
    exercises: [
      { q: 'Trong các vật: thanh gỗ khô, ruột bút chì, dây nhựa, thanh thuỷ tinh, đoạn dây nhôm – vật nào dẫn điện, vật nào cách điện?', a: 'Dẫn điện: ruột bút chì, đoạn dây nhôm. Cách điện: thanh gỗ khô, dây nhựa, thanh thuỷ tinh.' },
      { q: 'Chiều dòng điện quy ước và chiều chuyển động của electron trong dây dẫn kim loại có giống nhau không?', a: 'Không. Dòng điện quy ước đi từ cực dương sang cực âm qua mạch ngoài; electron chuyển động ngược lại.' },
      { q: 'Kể tên những vật liệu cách điện trong các dụng cụ, thiết bị điện thường dùng.', a: 'Vỏ nhựa dây điện, thân nhựa phích cắm và ổ cắm, núm sứ, găng tay cao su, cán nhựa tua vít…' },
    ],
  },

  'l8-22': {
    opener: 'Có một pin, một bóng đèn pin, một công tắc và các đoạn dây nối. Làm cách nào để bóng đèn sáng?',
    goals: ['Vẽ được sơ đồ mạch điện với các kí hiệu: điện trở, biến trở, chuông điện, ampe kế, vôn kế, điốt và điốt phát quang.', 'Mắc được mạch điện đơn giản gồm pin, công tắc, dây nối, bóng đèn.', 'Mô tả được sơ lược công dụng của cầu chì, rơ le, cầu dao tự động, chuông điện.'],
    sections: [
      {
        title: 'Mạch điện và các bộ phận',
        body: [
          'Nối pin, bóng đèn, công tắc bằng dây nối thành một mạch kín – khi đóng công tắc đèn sáng. Bất kì mạch điện nào cũng gồm nguồn điện, dây nối và các thiết bị tiêu thụ năng lượng điện (bóng đèn, động cơ, bếp điện, quạt, ti vi…).',
          'Để mô tả gọn mạch điện, người ta dùng các kí hiệu (nguồn điện, bóng đèn, dây nối, công tắc đóng/mở, điện trở, biến trở, chuông điện, điốt, điốt phát quang, ampe kế, vôn kế) để vẽ sơ đồ mạch điện.',
        ],
        scene: 1,
      },
      {
        title: 'Sơ đồ mạch điện và chiều dòng điện',
        body: [
          'Từ mạch điện thật có thể vẽ sơ đồ và ngược lại, từ sơ đồ có thể lắp mạch điện. Nếu đèn không sáng cần kiểm tra: mạch có kín không, các chỗ nối có chặt không, pin còn tốt không, bóng đèn có bị đứt dây tóc không.',
          'Dòng điện do pin, acquy cung cấp có chiều không đổi gọi là dòng điện một chiều. Chiều quy ước: từ cực dương qua dây nối và dụng cụ điện tới cực âm.',
        ],
        scene: 2,
      },
      {
        title: 'Cầu chì, cầu dao tự động, rơ le, chuông điện',
        body: [
          'Cầu chì: bộ phận chính là đoạn dây chì nóng chảy ở nhiệt độ thấp. Khi dòng điện tăng quá mức (ví dụ do đoản mạch), dây chì nóng chảy, mạch điện bị ngắt, bảo vệ các thiết bị.',
          'Cầu dao tự động (aptomat): tự động ngắt mạch khi dòng điện tăng quá mức; sau khi sửa chữa có thể đóng lại để dùng tiếp.',
          'Rơ le: dùng dòng điện nhỏ để tự động đóng, ngắt mạch điện có dòng điện lớn (trong tủ lạnh, máy bơm, mạch điều khiển tự động).',
          'Chuông điện hoạt động nhờ nam châm điện, phát ra âm thanh khi có dòng điện chạy qua.',
        ],
        scene: 4,
      },
    ],
    examples: [
      'Đèn pin: pin, công tắc, bóng đèn (hoặc LED), vỏ kim loại hoặc lò xo làm dây nối.',
      'Bảng điện trong nhà có cầu dao tự động ở đầu đường dây; khi chập điện cầu dao "nhảy" ngắt điện.',
      'Chuông cửa, chuông báo giờ ở trường học.',
      'Mạch đèn trang trí đơn giản gồm pin, công tắc, các bóng đèn nhỏ.',
    ],
    exercises: [
      { q: 'Vẽ sơ đồ mạch điện gồm một pin, một công tắc đóng, một bóng đèn và dây nối; vẽ chiều dòng điện.', a: 'Sơ đồ vòng kín: pin – công tắc – bóng đèn. Mũi tên chiều dòng điện đi từ cực dương (vạch dài) của pin qua công tắc, bóng đèn về cực âm.' },
      { q: 'Vì sao khi xảy ra đoản mạch, cầu chì lại bảo vệ được các thiết bị điện?', a: 'Đoản mạch làm dòng điện tăng rất lớn, dây chì nóng chảy và đứt, ngắt mạch điện trước khi các thiết bị, dây dẫn bị hỏng hoặc gây cháy.' },
      { q: 'Lắp mạch đèn pin nhưng đèn không sáng. Nêu các nguyên nhân có thể.', a: 'Mạch hở (công tắc chưa đóng, dây nối lỏng), pin hết điện hoặc lắp sai chiều, bóng đèn bị đứt dây tóc.' },
    ],
  },

  'l8-23': {
    opener: 'Khi có dòng điện trong mạch, ta không nhìn thấy các hạt mang điện dịch chuyển. Làm sao nhận biết được dòng điện?',
    goals: ['Thực hiện thí nghiệm để minh hoạ các tác dụng cơ bản của dòng điện: nhiệt, phát sáng, hoá học, sinh lí (và tác dụng từ).'],
    sections: [
      {
        title: 'Tác dụng nhiệt',
        body: [
          'Mắc mạch gồm nguồn 9 V, công tắc, sợi dây hợp kim nicrom có vắt các mảnh giấy. Đóng công tắc: dây nicrom nóng lên, các mảnh giấy bị cháy. Vật dẫn nóng lên khi có dòng điện chạy qua – đó là tác dụng nhiệt của dòng điện.',
        ],
        scene: 1,
      },
      {
        title: 'Tác dụng phát sáng',
        body: [
          'Mắc mạch gồm nguồn 3 V, đèn LED, điện trở bảo vệ, công tắc. Đóng công tắc: LED sáng. Đảo ngược hai đầu dây của LED: LED không sáng.',
          'LED (điốt phát quang) chỉ sáng khi dòng điện chạy qua theo đúng chiều (cực dương của đèn nối với cực dương của nguồn). Đèn LED rất tiết kiệm điện so với đèn sợi đốt vì toả nhiệt không đáng kể và tuổi thọ rất lớn (có thể tới 100 000 giờ).',
        ],
        scene: 2,
      },
      {
        title: 'Tác dụng hoá học',
        body: [
          'Mắc mạch gồm nguồn 6 V, bóng đèn, công tắc và bình đựng dung dịch copper(II) sulfate (CuSO₄) có hai thỏi than làm điện cực. Đóng công tắc, đèn sáng (dung dịch dẫn điện). Sau vài phút, thỏi than nối với cực âm được phủ một lớp màu đỏ – đó là đồng.',
          'Dòng điện chạy qua dung dịch muối làm tách kim loại khỏi dung dịch: tác dụng hoá học của dòng điện.',
        ],
        scene: 3,
      },
      {
        title: 'Tác dụng từ',
        body: ['Cuộn dây quấn quanh lõi sắt trở thành nam châm điện khi có dòng điện chạy qua, hút được đinh sắt; ngắt điện thì hết hút. Chuông điện, rơ le, cần cẩu điện hoạt động nhờ tác dụng từ.'],
        scene: 4,
      },
      {
        title: 'Tác dụng sinh lí',
        body: [
          'Cơ thể sống chứa nhiều chất dẫn điện. Dòng điện đi qua cơ thể người làm các cơ co giật, có thể làm tim ngừng đập, ngạt thở, thần kinh tê liệt – rất nguy hiểm đến tính mạng. Phải hết sức thận trọng với mạng điện gia đình; không lại gần trạm biến thế, nơi có biển "Nguy hiểm chết người".',
          'Trong y học, dòng điện thích hợp được dùng để chữa bệnh, ví dụ sốc điện ngoài lồng ngực (dòng điện lớn trong 0,03–0,1 s) để khôi phục nhịp tim.',
        ],
      },
    ],
    examples: [
      'Tác dụng nhiệt: bàn là, nồi cơm điện, ấm siêu tốc, máy sấy tóc, bếp điện.',
      'Tác dụng phát sáng: đèn LED, đèn ống huỳnh quang, đèn báo hiệu trên thiết bị.',
      'Tác dụng hoá học: mạ điện (mạ kẽm, mạ nickel, mạ vàng), tinh luyện kim loại, nạp acquy.',
      'Mạ nickel vỏ đèn pin: nối vỏ đèn với cực âm, tấm nickel với cực dương, nhúng trong dung dịch muối nickel; sau một thời gian lớp nickel phủ lên vỏ đèn.',
      'Tác dụng từ: chuông điện, loa, rơ le, cần cẩu điện nâng sắt thép.',
    ],
    exercises: [
      { q: 'Vì sao nên dùng đèn LED thay cho đèn sợi đốt?', a: 'Đèn LED biến phần lớn điện năng thành ánh sáng, toả nhiệt rất ít nên tiết kiệm điện và có tuổi thọ cao hơn nhiều.' },
      { q: 'Vì sao khi trời mưa gió không được lại gần dây điện bị đứt rơi xuống đường?', a: 'Dây điện có thể còn điện; nước mưa dẫn điện, dòng điện có thể đi qua cơ thể gây tác dụng sinh lí, nguy hiểm tính mạng.' },
      { q: 'Muốn mạ đồng cho một chiếc chìa khoá sắt, phải nối chìa khoá với cực nào của nguồn điện?', a: 'Nối chìa khoá với cực âm, thanh đồng với cực dương, nhúng trong dung dịch muối đồng.' },
    ],
  },

  'l8-24': {
    opener: 'Ampe kế dùng để đo cường độ dòng điện, vôn kế dùng để đo hiệu điện thế. Vậy số chỉ của ampe kế và vôn kế cho ta biết điều gì?',
    goals: ['Thực hiện thí nghiệm để nêu được số chỉ của ampe kế là giá trị của cường độ dòng điện.', 'Nêu được khả năng sinh ra dòng điện của pin (acquy) được đo bằng hiệu điện thế giữa hai cực của nó.', 'Nêu được đơn vị đo cường độ dòng điện và hiệu điện thế.'],
    sections: [
      {
        title: 'Cường độ dòng điện',
        body: [
          'Mắc mạch gồm pin 3 V, biến trở, ampe kế, bóng đèn 2,5 V, công tắc. Dịch chuyển con chạy biến trở đến các vị trí khác nhau: đèn càng sáng thì số chỉ ampe kế càng lớn.',
          'Số chỉ của ampe kế là giá trị của cường độ dòng điện, cho biết mức độ mạnh, yếu của dòng điện. Kí hiệu I, đơn vị ampe (A); 1 A = 1 000 mA.',
          'Ampe kế được mắc nối tiếp với dụng cụ cần đo sao cho dòng điện đi vào chốt dương (+) và đi ra ở chốt âm (−). Không được mắc hai chốt của ampe kế trực tiếp vào hai cực của nguồn điện.',
        ],
        scene: 1,
      },
      {
        title: 'Mắc ampe kế đúng cách',
        body: ['Nếu mắc ngược chốt (+), (−) kim ampe kế lệch ngược về phía trái vạch 0. Cần chọn ampe kế có giới hạn đo (GHĐ) phù hợp với dòng điện cần đo.'],
        scene: 2,
      },
      {
        title: 'Hiệu điện thế',
        body: [
          'Trên mỗi pin, acquy có ghi giá trị như 1,5 V; 4,5 V; 9 V – đó là hiệu điện thế giữa hai cực của nguồn.',
          'Lần lượt thay nguồn 1,5 V; 3 V; 4,5 V vào mạch: số chỉ vôn kế xấp xỉ giá trị ghi trên nguồn, số chỉ ampe kế tăng dần. Khả năng sinh ra dòng điện của pin được đo bằng hiệu điện thế (còn gọi là điện áp) giữa hai cực của nó.',
          'Kí hiệu U, đơn vị vôn (V); 1 V = 1 000 mV, 1 kV = 1 000 V. Vôn kế mắc song song với dụng cụ (hoặc nối vào hai cực nguồn) cần đo hiệu điện thế.',
        ],
        scene: 3,
      },
      {
        title: 'Đọc số chỉ đồng hồ đo',
        body: ['Trước khi đo cần xác định giới hạn đo (GHĐ) và độ chia nhỏ nhất (ĐCNN) của đồng hồ; đọc số chỉ khi kim đã đứng yên, mắt nhìn vuông góc với mặt số.'],
        scene: 4,
      },
    ],
    examples: [
      'Pin tiểu AA ghi 1,5 V; pin vuông ghi 9 V; acquy xe máy 12 V; mạng điện gia đình 220 V.',
      'An toàn điện: các nguồn dùng trong thí nghiệm cần có hiệu điện thế nhỏ hơn 40 V. Tiếp xúc với hiệu điện thế trên 40 V, dòng điện qua cơ thể có thể lên tới trên 70 mA – gây hại cho cơ thể.',
      'Đồng hồ vạn năng (đồng hồ đo điện đa năng) đo được cả cường độ dòng điện và hiệu điện thế.',
    ],
    exercises: [
      { q: 'Đổi đơn vị: 0,35 A = ? mA; 1 250 mV = ? V.', a: '0,35 A = 350 mA; 1 250 mV = 1,25 V.' },
      { q: 'Vì sao không được mắc hai chốt ampe kế trực tiếp vào hai cực nguồn điện?', a: 'Ampe kế có điện trở rất nhỏ, mắc như vậy gây đoản mạch: dòng điện rất lớn làm hỏng ampe kế và nguồn điện.' },
      { q: 'Muốn đo hiệu điện thế giữa hai đầu bóng đèn, mắc vôn kế thế nào?', a: 'Mắc vôn kế song song với bóng đèn, chốt (+) nối với đầu đèn có dòng điện đi vào (phía cực dương của nguồn).' },
    ],
  },

  'l8-25': {
    opener: 'Một học sinh cho rằng: "Bóng đèn tiêu thụ dòng điện nên cường độ dòng điện sẽ giảm sau khi đi qua bóng đèn". Em có đồng ý không? Kiểm tra bằng cách nào?',
    goals: ['Đo được cường độ dòng điện và hiệu điện thế bằng dụng cụ thực hành.', 'Vẽ được sơ đồ mạch điện với các kí hiệu ampe kế, vôn kế.'],
    sections: [
      {
        title: 'Đo cường độ dòng điện',
        body: [
          'Chuẩn bị: nguồn 1,5 V, 3 V, 6 V; bóng đèn 6 V; ampe kế GHĐ từ 0,5 A, ĐCNN 0,01 A; vôn kế GHĐ 6 V, ĐCNN 0,1 V; công tắc, dây nối.',
          'Mắc mạch với nguồn 1,5 V, đo cường độ dòng điện I₁ ở vị trí (1) trước bóng đèn, rồi I₂ ở vị trí (2) sau bóng đèn. Lặp lại với nguồn 3 V. Kết quả: I₁ = I₂ – dòng điện không bị "tiêu hao" khi đi qua bóng đèn; bóng đèn tiêu thụ năng lượng điện chứ không tiêu thụ dòng điện.',
        ],
        scene: 2,
      },
      {
        title: 'Đo hiệu điện thế',
        body: [
          'Đo hiệu điện thế của pin. Mắc vôn kế song song với bóng đèn (chốt + nối với đầu đèn có dòng điện đi vào), đóng công tắc, đọc hiệu điện thế giữa hai đầu bóng đèn. Thay pin 1,5 V bằng pin 3 V và lặp lại.',
          'Nhận xét: hiệu điện thế giữa hai đầu bóng đèn xấp xỉ hiệu điện thế của nguồn; nguồn có hiệu điện thế lớn hơn thì dòng điện qua đèn lớn hơn, đèn sáng hơn.',
        ],
        scene: 1,
      },
    ],
    examples: [
      'Mắc nối tiếp: các dụng cụ nối liền nhau thành một dãy; mắc song song: các dụng cụ được nối vào cùng hai điểm.',
      'Ampe kế mắc nối tiếp với dụng cụ cần đo cường độ dòng điện; vôn kế mắc song song với dụng cụ cần đo hiệu điện thế.',
      'Dùng vôn kế để kiểm tra pin cũ hay mới: pin cũ có hiệu điện thế thấp hơn giá trị ghi trên vỏ.',
      'Dùng ampe kế để xác định mạch kín hay hở: ampe kế chỉ 0 thì mạch hở.',
    ],
    exercises: [
      { q: 'Em có nhận xét gì về cường độ dòng điện tại vị trí trước và sau bóng đèn?', a: 'Cường độ dòng điện tại hai vị trí bằng nhau.' },
      { q: 'Vì sao kết quả đo giữa các nhóm có thể khác nhau một chút?', a: 'Do sai số dụng cụ, cách đọc số chỉ, pin có mức năng lượng khác nhau, dây nối và chỗ tiếp xúc khác nhau.' },
      { q: 'Cần lưu ý gì khi chọn thang đo cho ampe kế và vôn kế?', a: 'Chọn GHĐ lớn hơn giá trị cần đo (nếu chưa biết thì chọn thang lớn nhất trước), ĐCNN nhỏ để đọc chính xác.' },
    ],
  },
};
