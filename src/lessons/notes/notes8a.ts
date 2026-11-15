// KHTN 8 – Chương III (Khối lượng riêng và áp suất), Chương IV (Tác dụng làm quay của lực).
import type { LessonNotes } from './types';

export const NOTES_8A: Record<string, LessonNotes> = {
  'l8-13': {
    opener: 'Người ta hay nói "sắt nặng hơn nhôm". Câu nói này đúng hay sai? Một cái đinh sắt có nặng hơn một nồi nhôm không?',
    goals: [
      'Nêu được định nghĩa khối lượng riêng; tính được khối lượng riêng khi biết khối lượng và thể tích.',
      'Kể được các đơn vị đo khối lượng riêng thường dùng và đổi được đơn vị.',
      'Dựa vào bảng khối lượng riêng để nhận biết vật được làm bằng chất gì.',
    ],
    sections: [
      {
        title: 'Thí nghiệm: tỉ số khối lượng / thể tích của cùng một chất',
        body: [
          'Dùng cân đo khối lượng của ba thỏi sắt có thể tích V, 2V, 3V. Kết quả: thể tích tăng gấp đôi, gấp ba thì khối lượng cũng tăng gấp đôi, gấp ba. Tỉ số m/V của ba thỏi sắt bằng nhau.',
          'Như vậy, với cùng một chất, tỉ số giữa khối lượng và thể tích là một giá trị không đổi.',
        ],
        scene: 2,
      },
      {
        title: 'Thí nghiệm: các chất khác nhau, cùng thể tích',
        body: [
          'Ba thỏi sắt, nhôm, đồng có cùng thể tích nhưng khi đặt lên cân thì khối lượng khác nhau: đồng nặng nhất, nhôm nhẹ nhất. Tỉ số m/V của các chất khác nhau là khác nhau.',
          'Vì vậy câu "sắt nặng hơn nhôm" chỉ đúng khi so sánh hai vật có cùng thể tích: khối lượng của 1 cm³ sắt lớn hơn khối lượng của 1 cm³ nhôm.',
        ],
        scene: 1,
      },
      {
        title: 'Khối lượng riêng',
        body: [
          'Khối lượng riêng của một chất cho biết khối lượng của một đơn vị thể tích chất đó. Kí hiệu D.',
          'Đơn vị: kg/m³ hoặc g/cm³ (g/mL). Đổi: 1 g/cm³ = 1 g/mL = 1 000 kg/m³; 1 kg/m³ = 0,001 g/cm³.',
          'Ví dụ: sắt có D = 7 800 kg/m³, nghĩa là 1 m³ sắt có khối lượng 7 800 kg (1 cm³ sắt nặng 7,8 g).',
          'Mỗi chất có một khối lượng riêng xác định. Đo được khối lượng riêng của một vật làm bằng một chất, rồi đối chiếu với bảng khối lượng riêng, ta biết vật đó làm bằng chất gì.',
        ],
      },
      {
        title: 'Trọng lượng riêng (mở rộng)',
        body: ['Trọng lượng của một mét khối một chất gọi là trọng lượng riêng d của chất đó: d = P / V, đơn vị N/m³. Vì P = 10·m nên d = 10·D.'],
      },
    ],
    formulas: [
      { expr: 'D = m / V', note: 'D: khối lượng riêng (kg/m³); m: khối lượng (kg); V: thể tích (m³)' },
      { expr: 'm = D · V', note: 'Tính khối lượng khi biết khối lượng riêng và thể tích' },
      { expr: 'd = P / V = 10·D', note: 'd: trọng lượng riêng (N/m³)' },
    ],
    examples: [
      'Tính khối lượng nước trong một bể hình hộp: đo chiều dài, rộng, cao để có V, rồi m = D·V với D nước = 1 000 kg/m³.',
      'Vàng thật có D ≈ 19 300 kg/m³; đo khối lượng riêng giúp phát hiện vàng giả pha kim loại nhẹ hơn.',
      'Một bao gạo và một bao xốp cùng kích thước nhưng khối lượng rất khác nhau vì khối lượng riêng khác nhau.',
      'Xăng (khoảng 700 kg/m³) nhẹ hơn nước nên khi bị đổ ra, xăng nổi thành váng trên mặt nước.',
    ],
    facts: ['Thuỷ ngân là kim loại ở thể lỏng có khối lượng riêng 13 600 kg/m³ – một quả cầu sắt có thể nổi trên thuỷ ngân!'],
    exercises: [
      { q: 'Một khối gang hình hộp chữ nhật có các cạnh 2 cm, 3 cm, 5 cm và khối lượng 210 g. Tính khối lượng riêng của gang.', a: 'V = 2·3·5 = 30 cm³; D = 210 / 30 = 7 g/cm³ = 7 000 kg/m³.' },
      { q: 'Dựa vào đại lượng nào để nói "sắt nặng hơn nhôm"?', a: 'Dựa vào khối lượng riêng: cùng một thể tích thì sắt có khối lượng lớn hơn nhôm (7 800 kg/m³ so với 2 700 kg/m³).' },
      { q: 'Tính khối lượng của 2 lít dầu ăn, biết dầu ăn có khối lượng riêng 800 kg/m³.', a: 'V = 2 L = 0,002 m³; m = 800 · 0,002 = 1,6 kg.' },
    ],
  },

  'l8-14': {
    opener: 'Để xác định khối lượng riêng của một chất cần đo những đại lượng nào? Cách đo với vật rắn và với chất lỏng có khác nhau không?',
    goals: ['Thực hiện thí nghiệm xác định khối lượng riêng của một khối hộp chữ nhật, của một lượng chất lỏng và của một vật có hình dạng bất kì không thấm nước.', 'Ghi chép, xử lí số liệu (tính giá trị trung bình) và viết báo cáo thực hành.'],
    sections: [
      {
        title: 'Khối hộp chữ nhật',
        body: [
          'Dùng thước (độ chia nhỏ nhất 1 mm) đo ba cạnh a, b, c của khối hộp; tính thể tích V = a·b·c.',
          'Dùng cân điện tử đo khối lượng m. Đo mỗi đại lượng 3 lần, lấy trung bình. Tính D = m_tb / V_tb.',
        ],
        scene: 1,
      },
      {
        title: 'Một lượng chất lỏng (nước)',
        body: [
          'Đo khối lượng ống đong (hoặc cốc) rỗng m₁. Rót một lượng nước vào ống đong, đọc thể tích V. Đo khối lượng ống đong có nước m₂.',
          'Khối lượng nước m = m₂ − m₁. Khối lượng riêng D = m / V. So sánh kết quả với giá trị 1 000 kg/m³ trong bảng và tìm nguyên nhân sai lệch (nước còn bám trên thành, đọc sai vạch chia…).',
        ],
        scene: 2,
      },
      {
        title: 'Vật có hình dạng bất kì, không thấm nước (hòn sỏi)',
        body: [
          'Đo khối lượng hòn sỏi m bằng cân. Rót nước vào ống đong, đọc thể tích V₁. Buộc sợi chỉ vào hòn sỏi, thả từ từ cho ngập trong nước, đọc thể tích V₂.',
          'Thể tích hòn sỏi V = V₂ − V₁ (phần nước dâng lên). Tính D = m / V. Lặp lại 3 lần (lau khô sỏi trước mỗi lần).',
        ],
        scene: 3,
      },
    ],
    formulas: [
      { expr: 'V = a · b · c', note: 'Thể tích khối hộp chữ nhật' },
      { expr: 'D = (m₂ − m₁) / V', note: 'Khối lượng riêng chất lỏng' },
      { expr: 'D = m / (V₂ − V₁)', note: 'Khối lượng riêng vật rắn bất kì (phương pháp bình chia độ)' },
    ],
    examples: [
      'Trong thực tế, người ta đo khối lượng riêng của chất lỏng bằng tỉ trọng kế (phù kế): thả tỉ trọng kế nổi trong chất lỏng, đọc giá trị trên thang chia ở chỗ mặt chất lỏng.',
      'Ngành thực phẩm dùng tỉ trọng kế để kiểm tra độ ngọt của nước mía, sữa, mật ong.',
      'Đo khối lượng riêng giúp nhận biết một vật làm bằng chất gì (ví dụ phân biệt nhẫn bạc thật và nhẫn hợp kim).',
    ],
    exercises: [
      { q: 'Vì sao phải đo nhiều lần rồi lấy giá trị trung bình?', a: 'Mỗi lần đo đều có sai số (đặt dụng cụ, đọc vạch chia…). Lấy trung bình giúp giảm ảnh hưởng của sai số ngẫu nhiên, kết quả đáng tin cậy hơn.' },
      { q: 'Hòn sỏi có khối lượng 52 g. Mực nước trong ống đong từ 100 mL dâng lên 120 mL. Tính khối lượng riêng của sỏi.', a: 'V = 120 − 100 = 20 cm³; D = 52 / 20 = 2,6 g/cm³ = 2 600 kg/m³.' },
      { q: 'Có thể dùng cách thả vào ống đong để đo thể tích một miếng gỗ nổi trên nước không?', a: 'Không trực tiếp được vì gỗ nổi, không chìm hẳn. Cần dùng vật nặng (hoặc kim) ấn gỗ chìm hoàn toàn rồi trừ thể tích phần vật nặng/kim.' },
    ],
  },

  'l8-15': {
    opener: 'Vì sao khi một em bé đứng trên đệm thì đệm lún sâu hơn khi một người lớn nằm trên đệm?',
    goals: ['Phân biệt được áp lực với các lực khác.', 'Khẳng định được: áp suất sinh ra khi có áp lực tác dụng lên một diện tích bề mặt, p = F / S.', 'Kể được các đơn vị đo áp suất; nêu được cách làm tăng, giảm áp suất trong thực tế.'],
    sections: [
      {
        title: 'Áp lực',
        body: [
          'Áp lực là lực ép có phương vuông góc với mặt bị ép. Ví dụ: người đứng trên sàn, chân bàn ghế ép lên nền nhà, xe ô tô ép lên mặt đường.',
          'Lực kéo của sợi dây hay lực kéo thùng hàng theo phương ngang không phải áp lực lên mặt sàn.',
        ],
      },
      {
        title: 'Thí nghiệm: tác dụng của áp lực',
        body: [
          'Đặt các khối kim loại hình hộp giống nhau lên khay bột mịn theo các cách khác nhau: đặt nằm (diện tích tiếp xúc lớn), đặt đứng (diện tích nhỏ), chồng thêm khối (áp lực lớn hơn).',
          'Kết quả: cùng áp lực, diện tích bị ép càng nhỏ thì độ lún càng sâu; cùng diện tích, áp lực càng lớn thì độ lún càng sâu.',
        ],
        scene: 1,
      },
      {
        title: 'Áp suất',
        body: [
          'Áp suất được tính bằng độ lớn của áp lực trên một đơn vị diện tích bị ép: p = F / S.',
          'Đơn vị: N/m², còn gọi là paxcan (Pa): 1 Pa = 1 N/m². Ngoài ra: 1 atm = 1,013·10⁵ Pa; 1 mmHg = 133,3 Pa; 1 bar = 10⁵ Pa.',
        ],
      },
      {
        title: 'Làm tăng, giảm áp suất',
        body: [
          'Muốn tăng áp suất: tăng áp lực hoặc giảm diện tích bị ép (mài sắc dao, làm nhọn đầu đinh, đầu cọc).',
          'Muốn giảm áp suất: giảm áp lực hoặc tăng diện tích bị ép (xe tăng dùng bánh xích, lót ván khi đi trên bùn, móng nhà làm rộng).',
        ],
      },
    ],
    formulas: [{ expr: 'p = F / S', note: 'p: áp suất (Pa); F: áp lực (N); S: diện tích bị ép (m²)' }],
    examples: [
      'Ống hút cắm vào hộp sữa có một đầu vát nhọn để giảm diện tích, tăng áp suất, dễ đâm thủng nắp hộp.',
      'Lưỡi dao, lưỡi kéo được mài sắc; mũi kim, đinh được làm nhọn.',
      'Xe tăng nặng hơn ô tô rất nhiều nhưng đi được trên đất mềm nhờ bánh xích có diện tích tiếp xúc lớn.',
      'Muốn đóng cọc xuống đất dễ dàng, người ta vót nhọn đầu cọc.',
      'Ô tô đi qua vùng lầy: lót ván, rơm hoặc đá dưới bánh xe để tăng diện tích tiếp xúc.',
    ],
    exercises: [
      { q: 'Xe tăng có trọng lượng 350 000 N, diện tích tiếp xúc của bản xích với mặt đường là 1,5 m². Tính áp suất xe tăng tác dụng lên mặt đường.', a: 'p = 350 000 / 1,5 ≈ 233 333 Pa.' },
      { q: 'Ô tô có trọng lượng 25 000 N, diện tích bánh xe tiếp xúc mặt đường là 250 cm². So sánh áp suất của ô tô với xe tăng ở câu 1.', a: 'S = 0,025 m²; p = 25 000 / 0,025 = 1 000 000 Pa – lớn gấp khoảng 4,3 lần áp suất của xe tăng.' },
      { q: 'Trả lời câu hỏi mở đầu: vì sao em bé đứng lại làm đệm lún sâu hơn người lớn nằm?', a: 'Em bé đứng có diện tích tiếp xúc rất nhỏ (hai bàn chân) nên áp suất lớn; người lớn nằm có diện tích tiếp xúc lớn nên áp suất nhỏ dù trọng lượng lớn hơn.' },
    ],
  },

  'l8-16': {
    opener: 'Vì sao muốn nước trong bình chảy ra khi mở vòi thì trên nắp bình phải có một lỗ nhỏ?',
    goals: [
      'Thực hiện thí nghiệm khảo sát tác dụng của chất lỏng lên vật đặt trong chất lỏng.',
      'Nêu được: áp suất tác dụng vào chất lỏng được chất lỏng truyền đi nguyên vẹn theo mọi hướng.',
      'Thực hiện thí nghiệm chứng tỏ tồn tại áp suất khí quyển và áp suất này tác dụng theo mọi phương; giải thích một số ứng dụng (giác mút, bình xịt, tàu đệm khí) và hiện tượng ù tai.',
    ],
    sections: [
      {
        title: 'Áp suất chất lỏng tác dụng lên vật đặt trong nó',
        body: [
          'Một bình trụ có đáy và các lỗ ở thành được bịt bằng màng cao su mỏng. Nhúng bình vào nước: các màng cao su đều bị lõm vào, chứng tỏ chất lỏng gây áp suất lên đáy, lên thành bình và lên các vật ở trong lòng nó.',
          'Ở cùng một độ sâu, di chuyển bình đến các vị trí khác nhau, các màng lõm như nhau: áp suất như nhau. Nhúng sâu hơn thì màng lõm nhiều hơn: vật càng ở sâu thì chịu áp suất chất lỏng càng lớn.',
          'Áp suất chất lỏng tại độ sâu h: p = d·h (d là trọng lượng riêng của chất lỏng).',
        ],
        scene: 1,
      },
      {
        title: 'Chất lỏng gây áp suất lên thành bình',
        body: ['Đục các lỗ ở thành một bình nước ở các độ cao khác nhau: tia nước ở lỗ càng sâu phun ra càng mạnh và xa – áp suất tăng theo độ sâu.'],
        scene: 2,
      },
      {
        title: 'Sự truyền áp suất chất lỏng – máy nén thuỷ lực',
        body: [
          'Hai pít-tông nối với nhau qua chất lỏng, pít-tông (1) có tiết diện gấp đôi pít-tông (2). Đặt 4 quả nặng lên pít-tông (1) thì cần đặt 2 quả nặng lên pít-tông (2) để cân bằng.',
          'Kết luận (nguyên lí Pascal): áp suất tác dụng vào chất lỏng được chất lỏng truyền đi nguyên vẹn theo mọi hướng.',
          'Máy nén thuỷ lực: tác dụng lực nhỏ f lên pít-tông nhỏ diện tích s thì pít-tông lớn diện tích S chịu lực F = f·S/s – nâng được cả ô tô.',
        ],
        scene: 4,
      },
      {
        title: 'Bình thông nhau',
        body: ['Trong bình thông nhau chứa cùng một chất lỏng đứng yên, mực chất lỏng ở các nhánh luôn ở cùng một độ cao, dù các nhánh có hình dạng khác nhau. Ứng dụng: ấm trà, ống đo mực nước, hệ thống cấp nước.'],
        scene: 3,
      },
      {
        title: 'Áp suất khí quyển',
        body: [
          'Trái Đất được bao bọc bởi lớp không khí dày hàng nghìn kilômét gọi là khí quyển. Áp suất do lớp không khí này tác dụng lên mọi vật trên Trái Đất gọi là áp suất khí quyển; nó tác dụng theo mọi phương.',
          'Thí nghiệm 1: rót đầy nước vào cốc, đậy tấm nylon cứng, úp ngược cốc rồi bỏ tay ra – tấm nylon không rơi, nước không chảy: áp suất khí quyển ép từ dưới lên.',
          'Thí nghiệm 2: nhúng ống thuỷ tinh hở hai đầu vào nước, bịt kín đầu trên rồi nhấc lên – nước không chảy ra, kể cả khi nghiêng ống theo các phương khác nhau.',
          'Thí nghiệm 3: hút bớt không khí trong hộp sữa giấy, hộp bị bẹp theo nhiều phía vì áp suất khí quyển bên ngoài lớn hơn áp suất trong hộp.',
        ],
        scene: 5,
      },
      {
        title: 'Ảnh hưởng và ứng dụng của áp suất không khí',
        body: [
          'Ù tai: khi máy bay cất, hạ cánh hoặc lên núi cao, áp suất thay đổi đột ngột; vòi tai không kịp cân bằng áp suất hai bên màng nhĩ nên màng nhĩ bị đẩy về phía áp suất nhỏ hơn, gây ù tai. Nuốt hoặc ngáp giúp vòi tai mở rộng, cân bằng lại áp suất.',
          'Giác mút: ấn phễu cao su sát vào kính, khi thả tay phễu đàn hồi làm không gian bên trong tăng thể tích, áp suất bên trong giảm, áp suất khí quyển ép giác mút chặt vào kính.',
          'Bình xịt nước: bơm không khí vào bình làm tăng áp suất, khi mở van nước bị đẩy ra qua vòi phun.',
          'Tàu đệm khí: quạt bơm không khí vào khoảng giữa tàu và mặt đất (mặt nước), tạo áp suất cao nâng tàu lên, giảm ma sát.',
        ],
      },
    ],
    formulas: [
      { expr: 'p = d · h', note: 'Áp suất chất lỏng ở độ sâu h (d: trọng lượng riêng chất lỏng, N/m³)' },
      { expr: 'F / f = S / s', note: 'Máy nén thuỷ lực' },
      { expr: 'p₀ ≈ 101 300 Pa = 760 mmHg', note: 'Áp suất khí quyển ở mặt nước biển' },
    ],
    examples: [
      'Thợ lặn phải mặc bộ áo lặn chịu áp lực khi xuống sâu.',
      'Thân đập thuỷ điện được xây phần dưới dày hơn phần trên vì áp suất nước ở đáy lớn hơn.',
      'Phanh dầu ô tô, kích thuỷ lực, máy ép thuỷ lực dùng nguyên lí truyền áp suất của chất lỏng.',
      'Uống nước bằng ống hút: hút bớt không khí trong ống, áp suất khí quyển đẩy nước lên.',
      'Bình nước có vòi cần lỗ nhỏ trên nắp để không khí vào, áp suất khí quyển giúp nước chảy ra đều.',
      'Giác mút treo đồ trong nhà tắm, bình xịt tưới cây, bình xịt thuốc trừ sâu.',
    ],
    facts: ['Ở độ sâu khoảng 10 m dưới nước, áp suất do nước gây ra đã xấp xỉ bằng áp suất khí quyển.'],
    exercises: [
      { q: 'Tính áp suất nước tác dụng lên một điểm ở độ sâu 1,2 m. Biết trọng lượng riêng của nước 10 000 N/m³.', a: 'p = d·h = 10 000 · 1,2 = 12 000 Pa.' },
      { q: 'Máy nén thuỷ lực có pít-tông nhỏ 4 cm², pít-tông lớn 400 cm². Cần tác dụng lực bao nhiêu lên pít-tông nhỏ để nâng ô tô nặng 12 000 N?', a: 'f = F·s/S = 12 000 · 4 / 400 = 120 N.' },
      { q: 'Áp suất tác dụng lên mặt hồ và lên đáy hồ là những áp suất nào?', a: 'Mặt hồ chịu áp suất khí quyển; đáy hồ chịu áp suất khí quyển cộng với áp suất của cột nước (p₀ + d·h).' },
    ],
  },

  'l8-17': {
    opener: 'Thả viên bi sắt, ốc vít kim loại và nắp chai nhựa vào cốc rồi đổ nước vào. Vì sao có vật nổi lên, có vật lại không nổi?',
    goals: ['Thực hiện thí nghiệm khảo sát tác dụng của chất lỏng lên vật đặt trong chất lỏng; rút ra điều kiện định tính về vật nổi, vật chìm.', 'Phát biểu và vận dụng định luật Archimedes F_A = d·V.'],
    sections: [
      {
        title: 'Lực đẩy tác dụng lên vật đặt trong chất lỏng',
        body: [
          'Khi đổ nước vào cốc, nắp chai nhựa nổi lên: nước tác dụng lực đẩy lên vật ngược chiều trọng lực. Dùng tay nhấn quả bóng xuống nước ta cảm nhận được lực đẩy lên; nhấn càng sâu (phần chìm càng lớn) lực đẩy càng mạnh.',
          'Lực đẩy do chất lỏng tác dụng lên vật đặt trong nó gọi là lực đẩy Archimedes, có phương thẳng đứng, chiều từ dưới lên.',
          'Treo vật vào lực kế, nhúng vào nước thì số chỉ lực kế giảm. Độ lớn lực đẩy: F_A = P − F (P: số chỉ khi ở ngoài không khí, F: số chỉ khi vật trong nước).',
        ],
        scene: 1,
      },
      {
        title: 'Thí nghiệm: độ lớn của lực đẩy Archimedes',
        body: [
          'Treo quả nặng vào lực kế rồi nhúng vào bình tràn đựng đầy nước, hứng nước tràn sang ống đong. Khi nước tràn ra lần lượt 20, 40, 60, 80 cm³, đọc số chỉ lực kế và đo trọng lượng phần nước tràn.',
          'Kết quả: lực đẩy Archimedes bằng trọng lượng phần chất lỏng bị vật chiếm chỗ. Thay nước bằng nước muối đặc thì lực đẩy lớn hơn.',
        ],
        scene: 2,
      },
      {
        title: 'Định luật Archimedes',
        body: ['Một vật đặt trong chất lỏng chịu tác dụng của một lực đẩy hướng thẳng đứng từ dưới lên, có độ lớn F_A = d·V, trong đó d là trọng lượng riêng của chất lỏng, V là thể tích phần chất lỏng bị vật chiếm chỗ.'],
      },
      {
        title: 'Điều kiện vật nổi, vật chìm',
        body: [
          'Vật chìm xuống khi F_A < P; vật nổi lên khi F_A > P; vật lơ lửng khi F_A = P. Khi vật nổi trên mặt chất lỏng thì F_A = P.',
          'So sánh trọng lượng riêng: vật chìm nếu d_vật > d_chất lỏng; vật nổi nếu d_vật < d_chất lỏng.',
          'Một viên đất nặn hình tròn chìm xuống đáy cốc, nhưng nặn thành hình chiếc thuyền thì nổi được, vì thể tích phần nước bị chiếm chỗ lớn hơn nhiều, lực đẩy đủ lớn.',
        ],
        scene: 3,
      },
    ],
    formulas: [
      { expr: 'F_A = d · V', note: 'd: trọng lượng riêng chất lỏng (N/m³); V: thể tích phần chất lỏng bị vật chiếm chỗ (m³)' },
      { expr: 'F_A = P − F', note: 'Đo lực đẩy bằng lực kế' },
    ],
    examples: [
      'Tàu thuỷ bằng thép rất nặng nhưng nổi được vì thân tàu rỗng, chiếm chỗ một thể tích nước rất lớn.',
      'Cá chép có bong bóng khí: làm phồng bong bóng thì thể tích tăng, lực đẩy tăng, cá nổi lên; bóp nhỏ bong bóng thì cá chìm xuống.',
      'Quả trứng chìm trong nước thường nhưng nổi trong nước muối đặc.',
      'Phao bơi, áo phao giúp người nổi trên nước; khí cầu, bóng bay nổi trong không khí cũng nhờ lực đẩy Archimedes.',
      'Tàu ngầm bơm nước vào hoặc ra khỏi khoang để lặn xuống hoặc nổi lên.',
    ],
    exercises: [
      { q: 'Một vật có thể tích 100 cm³ chìm hoàn toàn trong nước. Tính lực đẩy Archimedes (d nước = 10 000 N/m³).', a: 'V = 0,0001 m³; F_A = 10 000 · 0,0001 = 1 N.' },
      { q: 'Vì sao trong thí nghiệm mở đầu nắp chai nhựa nổi lên, còn viên bi, ốc vít nằm ở đáy cốc?', a: 'Trọng lượng riêng của nhựa nhỏ hơn của nước nên lực đẩy lớn hơn trọng lượng, nắp nổi; sắt, kim loại có trọng lượng riêng lớn hơn nước nên chìm.' },
      { q: 'Treo vật vào lực kế ngoài không khí chỉ 2,7 N; nhúng chìm vào nước chỉ 1,7 N. Tính lực đẩy và thể tích vật.', a: 'F_A = 2,7 − 1,7 = 1 N; V = F_A / d = 1 / 10 000 = 0,0001 m³ = 100 cm³.' },
    ],
  },

  'l8-18': {
    opener: 'Khi đẩy cửa, đặt tay xa bản lề thì mở cửa dễ dàng hơn khi đặt tay gần bản lề. Vì sao?',
    goals: ['Thực hiện thí nghiệm để mô tả được tác dụng làm quay của lực.', 'Nêu được: tác dụng làm quay của lực lên một vật quanh một điểm hoặc một trục được đặc trưng bằng moment lực.'],
    sections: [
      {
        title: 'Lực có thể làm quay vật',
        body: [
          'Gắn thanh nhựa cứng có các lỗ cách đều lên giá tại trục quay O. Treo quả nặng vào điểm A (bên trái O) thì thanh quay theo một chiều; treo vào điểm C (bên phải) thì thanh quay theo chiều ngược lại; treo đúng tại O thì thanh không quay.',
          'Đường thẳng chứa mũi tên biểu diễn lực gọi là giá của lực. Tác dụng lực vào cánh cửa: lực có giá cắt trục quay (đẩy dọc theo cánh cửa vào bản lề) hoặc song song với trục quay thì cửa không quay; lực có giá không song song và không cắt trục quay thì có thể làm cửa quay.',
        ],
        scene: 3,
      },
      {
        title: 'Moment lực',
        body: [
          'Thí nghiệm treo một hay hai quả nặng ở các vị trí khác nhau cho thấy: lực càng lớn, tác dụng làm quay càng lớn; giá của lực càng cách xa trục quay, tác dụng làm quay càng lớn.',
          'Tác dụng làm quay của lực được đặc trưng bằng moment lực: M = F·d, với d là khoảng cách từ trục quay đến giá của lực (cánh tay đòn).',
        ],
        scene: 1,
      },
    ],
    formulas: [{ expr: 'M = F · d', note: 'M: moment lực (N·m); F: lực (N); d: cánh tay đòn – khoảng cách từ trục quay đến giá của lực (m)' }],
    examples: [
      'Tay nắm cửa được lắp ở phía xa bản lề.',
      'Dùng cờ lê cán dài để vặn đai ốc dễ dàng; nắm ở cuối cán và đẩy vuông góc với cán.',
      'Khi bắt đầu đạp xe, đặt bàn đạp ở vị trí nằm ngang và đạp thẳng xuống để có moment lớn nhất.',
      'Vô lăng ô tô có bán kính lớn giúp người lái xoay dễ dàng.',
      'Mở nắp chai bằng dụng cụ mở nắp có tay cầm dài.',
    ],
    exercises: [
      { q: 'Tác dụng lực 20 N vuông góc với cán cờ lê tại điểm cách tâm đai ốc 25 cm. Tính moment lực.', a: 'M = F·d = 20 · 0,25 = 5 N·m.' },
      { q: 'Muốn vặn một đai ốc rất chặt, có nên chọn cờ lê cán ngắn không? Vì sao?', a: 'Không. Nên chọn cờ lê cán dài: cánh tay đòn lớn thì moment lớn với cùng một lực.' },
      { q: 'Đẩy cửa bằng một lực hướng thẳng vào bản lề thì cửa có quay không?', a: 'Không, vì giá của lực đi qua trục quay, cánh tay đòn bằng 0 nên moment bằng 0.' },
    ],
  },

  'l8-19': {
    opener: 'Muốn nâng một vật nặng lên cao, có cách nào tận dụng được trọng lượng của người để nâng vật không?',
    goals: ['Dùng dụng cụ đơn giản minh hoạ được đòn bẩy có thể làm thay đổi hướng tác dụng của lực.', 'Lấy được ví dụ về các loại đòn bẩy khác nhau trong thực tế.', 'Sử dụng kiến thức về đòn bẩy để giải quyết một số vấn đề thực tiễn.'],
    sections: [
      {
        title: 'Tác dụng của đòn bẩy',
        body: [
          'Tác dụng lực vào một đầu thanh nhựa hướng xuống dưới có thể nâng được quả nặng treo ở đầu kia lên trên: đòn bẩy làm thay đổi hướng tác dụng của lực.',
          'Đòn bẩy quay quanh một trục đi qua điểm tựa O. Khoảng cách từ giá của lực đến điểm tựa gọi là cánh tay đòn. Dùng lực kế đo lực ở các vị trí khác nhau: cánh tay đòn của lực tác dụng càng lớn thì lực cần dùng càng nhỏ.',
          'Đòn bẩy cân bằng khi F₁·d₁ = F₂·d₂.',
        ],
        scene: 1,
      },
      {
        title: 'Các loại đòn bẩy',
        body: [
          'Đòn bẩy loại 1: điểm tựa O nằm trong khoảng giữa điểm đặt O₁, O₂ của hai lực (kéo cắt giấy, bập bênh, xà beng nhổ đinh…).',
          'Đòn bẩy loại 2: điểm tựa O nằm ngoài khoảng giữa O₁, O₂; lực tác dụng nằm xa điểm tựa hơn vật nên cho lợi về lực (xe cút kít, cái mở nắp chai).',
          'Có những đòn bẩy không cho lợi về lực: lực tác dụng nằm gần điểm tựa hơn vật (cái kẹp gắp, đôi đũa, cần câu, cánh tay người) – tốn lực nhưng lợi về đường đi, thao tác nhanh và khéo. Một số tài liệu gọi đây là đòn bẩy loại 3.',
        ],
        scene: 2,
      },
      {
        title: 'Đòn bẩy trong cơ thể người và xe đạp',
        body: [
          'Đầu người là đòn bẩy loại 1, trục quay là đốt sống trên cùng; hệ cơ sau gáy giữ đầu cân bằng. Ngồi cúi đầu lâu làm cơ gáy phải hoạt động nhiều, dễ mỏi cổ.',
          'Cẳng tay là đòn bẩy (khớp khuỷu tay là điểm tựa, cơ bắp tay tạo lực). Khi cầm vật nặng nên gập sát cánh tay vào bắp tay để giảm cánh tay đòn của vật.',
          'Xe đạp có nhiều bộ phận là đòn bẩy: bàn đạp – trục giữa, tay phanh, ghi đông.',
        ],
        scene: 3,
      },
    ],
    formulas: [{ expr: 'F₁ · d₁ = F₂ · d₂', note: 'Điều kiện cân bằng của đòn bẩy' }],
    examples: [
      'Cần câu cá, cái bắt nắp chai, đôi đũa, kẹp làm vỡ vỏ hạt, chèo thuyền, kéo cắt – mỗi dụng cụ là một loại đòn bẩy.',
      'Máy bơm nước bằng tay: tay đòn dài giúp bơm nước với lực nhỏ.',
      'Dùng xà beng để bẩy hòn đá nặng: kê điểm tựa gần hòn đá.',
      'Tận dụng trọng lượng của người để nâng vật: dùng một thanh dài gác qua điểm tựa, người đè lên đầu xa.',
    ],
    exercises: [
      { q: 'Đòn bẩy cân bằng với vật nặng 60 N cách điểm tựa 20 cm. Lực tác dụng ở đầu kia cách điểm tựa 80 cm có độ lớn bao nhiêu?', a: 'F₂ = F₁·d₁/d₂ = 60 · 20 / 80 = 15 N.' },
      { q: 'Chỉ ra điểm tựa, vật và lực tác dụng khi dùng xe cút kít. Đó là đòn bẩy loại nào?', a: 'Điểm tựa là trục bánh xe, vật đặt trong thùng ở giữa, tay người nâng ở cuối càng xe: đòn bẩy loại 2, cho lợi về lực.' },
      { q: 'Vì sao dùng kẹp gắp than lại tốn lực hơn gắp trực tiếp, nhưng người ta vẫn dùng?', a: 'Lực tác dụng gần điểm tựa hơn vật nên tốn lực, nhưng lợi về đường đi, giữ được khoảng cách an toàn và thao tác chính xác.' },
    ],
  },
};
