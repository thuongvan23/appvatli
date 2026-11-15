// KHTN 8 – Chương VI: Nhiệt (Bài 26–29).
import type { LessonNotes } from './types';

export const NOTES_8C: Record<string, LessonNotes> = {
  'l8-26': {
    opener: 'Năng lượng nhiệt là gì và tại sao mọi vật đều luôn có năng lượng này?',
    goals: ['Nêu được khái niệm năng lượng nhiệt, khái niệm nội năng.', 'Nêu được: khi một vật được làm nóng, các phân tử của vật chuyển động nhanh lên và nội năng của vật tăng.'],
    sections: [
      {
        title: 'Tính chất của phân tử, nguyên tử',
        body: [
          'Các chất được cấu tạo từ phân tử, nguyên tử chuyển động hỗn loạn không ngừng. Nhiệt độ của vật càng cao, các phân tử, nguyên tử cấu tạo nên vật chuyển động càng nhanh.',
          'Giữa các phân tử, nguyên tử có lực hút và lực đẩy (lực tương tác phân tử).',
          'Năm 1827, Brown quan sát bằng kính hiển vi thấy các hạt phấn hoa trong nước chuyển động không ngừng về mọi hướng – do các phân tử nước chuyển động hỗn loạn va chạm vào hạt phấn hoa. Nước càng nóng, hạt phấn hoa chuyển động càng nhanh.',
        ],
        scene: 1,
      },
      {
        title: 'Năng lượng nhiệt (nhiệt năng)',
        body: [
          'Chuyển động hỗn loạn của các phân tử, nguyên tử gọi là chuyển động nhiệt. Năng lượng mà vật có được nhờ chuyển động nhiệt gọi là năng lượng nhiệt (nhiệt năng).',
          'Mọi vật đều có nhiệt năng. Khi nhiệt độ của vật tăng thì nhiệt năng của vật tăng.',
        ],
      },
      {
        title: 'Nội năng',
        body: [
          'Phân tử chuyển động nên có động năng; các phân tử tương tác với nhau nên có thế năng (phụ thuộc khoảng cách giữa chúng).',
          'Nội năng của một vật là tổng động năng và thế năng của các phân tử, nguyên tử cấu tạo nên vật. Khi vật được làm nóng, phân tử chuyển động nhanh lên, nội năng tăng.',
          'Ở các thể rắn, lỏng, khí, các phân tử sắp xếp và chuyển động khác nhau: thể rắn dao động quanh vị trí cố định; thể lỏng trượt lên nhau; thể khí chuyển động tự do.',
        ],
        scene: 2,
      },
      {
        title: 'Sự tăng, giảm nội năng',
        body: [
          'Thả quả cầu kim loại ở nhiệt độ phòng vào cốc nước nóng: nhiệt độ quả cầu tăng (nhận thêm nhiệt năng), nhiệt độ nước giảm (truyền bớt nhiệt năng). Nội năng quả cầu tăng, nội năng nước giảm.',
          'Khi đun nước: trước khi sôi, nhiệt độ nước tăng dần; khi nước đã sôi, nhiệt độ không tăng dù vẫn đun – nhiệt năng nhận được dùng để chuyển nước thành hơi.',
          'Hai cách làm thay đổi nội năng: thực hiện công (xoa hai tay vào nhau) và truyền nhiệt (áp tay vào cốc nước ấm).',
        ],
      },
      {
        title: 'Khuếch tán',
        body: ['Nhỏ thuốc tím vào cốc nước nóng và cốc nước lạnh: thuốc tím lan ra trong nước nóng nhanh hơn, vì các phân tử chuyển động nhanh hơn khi nhiệt độ cao.'],
        scene: 3,
      },
    ],
    examples: [
      'Mở lọ nước hoa ở đầu lớp, một lúc sau người cuối lớp mới ngửi thấy mùi thơm – các phân tử nước hoa chuyển động hỗn loạn, va chạm với các phân tử không khí nên lan đi chậm.',
      'Xoa hai bàn tay vào nhau thì tay nóng lên (thực hiện công làm tăng nội năng).',
      'Pha trà bằng nước sôi thì nước nhanh có màu và mùi hơn pha bằng nước nguội.',
      'Đường tan trong nước nóng nhanh hơn trong nước lạnh.',
    ],
    exercises: [
      { q: 'Nêu hai cách làm tăng nhiệt năng của hai bàn tay em.', a: 'Xoa hai tay vào nhau (thực hiện công) hoặc áp tay vào cốc nước ấm, hơ gần lửa (truyền nhiệt).' },
      { q: 'So sánh động năng của phân tử nước trong cốc nước nóng và cốc nước lạnh.', a: 'Phân tử nước trong cốc nước nóng chuyển động nhanh hơn nên có động năng lớn hơn.' },
      { q: 'Khi nước đang sôi, vẫn tiếp tục đun nhưng nhiệt độ không tăng. Nhiệt năng nhận được đi đâu?', a: 'Nhiệt năng được dùng để chuyển nước từ thể lỏng sang thể hơi (sự sôi).' },
    ],
  },

  'l8-27': {
    opener: 'Muốn đun sôi một lượng nước xác định cần cung cấp bao nhiêu năng lượng nhiệt? Làm thế nào đo được năng lượng nhiệt đó?',
    goals: ['Đo được năng lượng nhiệt mà vật nhận được khi bị đun nóng bằng joulemeter.', 'Tính được năng lượng nhiệt để đun nóng một lượng nước xác định.'],
    sections: [
      {
        title: 'Dụng cụ',
        body: ['Bình nhiệt lượng kế có dây đốt, nhiệt kế, joulemeter (đo năng lượng điện do nguồn cung cấp), nguồn điện 12 V, bốn dây nối, một lượng nước sạch. Khi dòng điện chạy qua dây đốt đặt trong bình, năng lượng điện chuyển hoá thành năng lượng nhiệt đun nóng nước.'],
        scene: 1,
      },
      {
        title: 'Cách tiến hành',
        body: [
          'Đổ một lượng nước xác định vào bình sao cho nước ngập dây đốt và đầu đo nhiệt kế. Mắc hai dây từ nguồn vào joulemeter, hai dây từ joulemeter vào dây đốt; chọn đại lượng cần đo là năng lượng.',
          'Khuấy đều, đọc nhiệt độ ban đầu t₀. Bật nguồn, khuấy nhẹ; đọc giá trị năng lượng trên joulemeter khi nhiệt độ nước tăng thêm 3 °C, 6 °C, 9 °C. Tắt nguồn.',
          'Lặp lại với lượng nước nhiều hơn.',
        ],
        scene: 1,
      },
      {
        title: 'Kết quả và nhận xét',
        body: [
          'Với cùng lượng nước, năng lượng cần cung cấp tỉ lệ với độ tăng nhiệt độ. Với cùng độ tăng nhiệt độ, lượng nước càng nhiều thì năng lượng cần cung cấp càng lớn.',
          'Nhiệt lượng là phần nhiệt năng vật nhận được hay mất đi trong quá trình truyền nhiệt. Nhiệt lượng cần cung cấp cho m kg nước tăng từ t₁ lên t₂ là Q = m·c·(t₂ − t₁), với nhiệt dung riêng của nước c ≈ 4 180 J/(kg·K).',
          'Trong thực tế, nhiệt độ đo được thường thấp hơn tính toán vì một phần năng lượng truyền cho bình, nhiệt kế và môi trường.',
        ],
      },
    ],
    formulas: [{ expr: 'Q = m · c · (t₂ − t₁)', note: 'Q: nhiệt lượng (J); m: khối lượng (kg); c: nhiệt dung riêng (nước ≈ 4 180 J/(kg·K)); t₂ − t₁: độ tăng nhiệt độ' }],
    examples: [
      'Đun 2 lít nước từ 25 °C đến sôi cần khoảng Q = 2·4 180·75 ≈ 627 000 J; ấm siêu tốc 1 500 W cần khoảng 7 phút (chưa tính hao phí).',
      'Nước có nhiệt dung riêng lớn nên được dùng làm chất làm mát động cơ ô tô, xe máy.',
      'Vùng gần biển có khí hậu ôn hoà hơn vùng sâu trong lục địa vì nước biển nóng lên và nguội đi chậm.',
    ],
    facts: ['Người đầu tiên đo nhiệt dung riêng của nước là nhà bác học James Prescott Joule (1818–1889); đơn vị năng lượng jun (J) được đặt theo tên ông.'],
    exercises: [
      { q: 'Tính năng lượng nhiệt cần thiết để đun 0,5 kg nước từ 20 °C lên 80 °C.', a: 'Q = 0,5 · 4 180 · 60 = 125 400 J.' },
      { q: 'Có thể ước tính năng lượng để đun nước trong nhiệt lượng kế tới 100 °C không? Bằng cách nào?', a: 'Có: dùng Q = m·c·(100 − t₀); hoặc từ kết quả đo, năng lượng tỉ lệ với độ tăng nhiệt độ nên ngoại suy lên 100 °C.' },
      { q: 'Vì sao trong thí nghiệm phải khuấy nước liên tục?', a: 'Để nhiệt độ nước trong bình đồng đều, nhiệt kế đo đúng nhiệt độ chung của nước.' },
    ],
  },

  'l8-28': {
    opener: 'Năng lượng nhiệt có thể truyền được trong những môi trường nào: chất rắn, chất lỏng, chất khí, chân không?',
    goals: ['Lấy được ví dụ về dẫn nhiệt, đối lưu, bức xạ nhiệt và mô tả sự truyền năng lượng trong mỗi hiện tượng.', 'Phân tích công dụng của vật dẫn nhiệt tốt, vật cách nhiệt tốt.', 'Mô tả sự truyền năng lượng trong hiệu ứng nhà kính; vận dụng giải thích hiện tượng thường gặp.'],
    sections: [
      {
        title: 'Dẫn nhiệt',
        body: [
          'Gắn các đinh a, b, c, d, e bằng sáp dọc thanh đồng, đốt nóng đầu A bằng đèn cồn: các đinh lần lượt rơi xuống theo thứ tự a → e. Năng lượng nhiệt đã truyền từ đầu A dọc theo thanh.',
          'Giải thích: các nguyên tử đồng ở đầu A chuyển động nhanh lên, va chạm và truyền bớt động năng cho các nguyên tử bên cạnh. Dẫn nhiệt là sự truyền năng lượng trực tiếp từ các phân tử, nguyên tử có động năng lớn hơn sang các phân tử, nguyên tử có động năng nhỏ hơn thông qua va chạm.',
        ],
        scene: 1,
      },
      {
        title: 'Vật dẫn nhiệt tốt, vật cách nhiệt tốt',
        body: [
          'Chất rắn (nhất là kim loại) dẫn nhiệt tốt; chất lỏng, chất khí dẫn nhiệt kém. Nếu coi khả năng dẫn nhiệt của không khí là 1 thì của thuỷ tinh khoảng vài chục, của nhôm và đồng hàng nghìn đến hàng chục nghìn.',
          'Vật dẫn nhiệt tốt: nồi, chảo, ấm bằng kim loại. Vật cách nhiệt tốt: tay cầm bằng gỗ, nhựa; áo bông, len; xốp; lớp không khí giữa hai lớp kính.',
        ],
        scene: 2,
      },
      {
        title: 'Đối lưu',
        body: [
          'Hai ống nghiệm đựng nước gắn viên sáp: đun nóng gần miệng ống (1) thì sáp ở đáy không chảy; đun đáy ống (2) thì sau thời gian ngắn cả ống nước nóng lên, sáp ở miệng ống chảy.',
          'Thả gói thuốc tím vào đáy bình nước rồi đun nóng: nước ở gần ngọn lửa nóng lên, nhẹ hơn, đi lên trên tạo dòng nước nóng; nước lạnh ở trên nặng hơn đi xuống – tạo thành dòng đối lưu.',
          'Đối lưu là sự truyền năng lượng bằng các dòng chất lỏng hoặc chất khí (chất lưu) di chuyển từ vùng nóng lên vùng lạnh. Ví dụ: ngọn nến làm quay cánh quạt (chong chóng) đặt phía trên.',
        ],
        scene: 3,
      },
      {
        title: 'Bức xạ nhiệt',
        body: [
          'Bình thuỷ tinh phủ đen có nhiệt kế bên trong, đặt gần bóng đèn dây tóc: nhiệt độ trong bình tăng dần. Chắn tấm gỗ giữa đèn và bình: nhiệt độ giảm dần về như cũ. Năng lượng truyền bằng các tia nhiệt đi thẳng.',
          'Tia nhiệt mang năng lượng, truyền thẳng, phản xạ, bị chắn bởi vật chắn sáng; truyền được cả trong chân không. Hình thức truyền nhiệt này gọi là bức xạ nhiệt. Mặt Trời truyền năng lượng tới Trái Đất bằng bức xạ nhiệt.',
          'Vật có mặt ngoài càng xù xì, sẫm màu thì hấp thụ tia nhiệt càng mạnh; mặt ngoài càng nhẵn, sáng màu thì phản xạ tia nhiệt càng mạnh.',
        ],
        scene: 5,
      },
      {
        title: 'Hiệu ứng nhà kính',
        body: [
          'Bức xạ nhiệt của Mặt Trời (bề mặt khoảng 6 000 °C) mạnh, dễ truyền qua khí quyển và kính trong suốt; bức xạ nhiệt của Trái Đất (khoảng 18 °C) yếu, không truyền qua được khí quyển và lớp kính. Nhà lồng kính trồng cây giữ lại năng lượng mặt trời nhờ tính chất này.',
          'Khí quyển giống như một nhà kính, giữ lại bức xạ nhiệt của Trái Đất, làm bề mặt và không khí nóng lên – hiệu ứng nhà kính. Khí carbon dioxide (CO₂) đóng vai trò quan trọng nhất. Đốt nhiên liệu hoá thạch, chặt phá rừng làm tăng CO₂, tăng hiệu ứng nhà kính.',
        ],
        scene: 4,
      },
    ],
    examples: [
      'Chảo làm bằng kim loại (dẫn nhiệt tốt) còn cán chảo làm bằng gỗ hoặc nhựa (cách nhiệt).',
      'Nhà mái ngói mùa hè mát, mùa đông ấm hơn nhà mái tôn.',
      'Đun nước phải đun từ phía dưới; điều hoà thường lắp trên cao, lò sưởi đặt dưới thấp.',
      'Mùa hè nên mặc áo màu sáng; mùa đông mặc nhiều lớp áo mỏng giữ lớp không khí cách nhiệt.',
      'Phích nước: lớp chân không giữa hai lớp thuỷ tinh ngăn dẫn nhiệt và đối lưu; mặt thuỷ tinh tráng bạc phản xạ tia nhiệt; nút đậy ngăn đối lưu ra ngoài.',
      'Đứng gần bếp lửa thấy nóng chủ yếu do bức xạ nhiệt.',
    ],
    facts: ['Cơ thể người luôn truyền nhiệt ra môi trường: trung bình khoảng 60% dưới dạng bức xạ, 15% đối lưu, chỉ 5% dẫn nhiệt; nếu không truyền nhiệt ra ngoài, sau 1 giờ nhiệt độ cơ thể có thể tăng thêm khoảng 3 °C.'],
    exercises: [
      { q: 'Vì sao chảo được làm bằng kim loại còn cán chảo được làm bằng gỗ hoặc nhựa?', a: 'Kim loại dẫn nhiệt tốt giúp thức ăn nhanh chín; gỗ, nhựa dẫn nhiệt kém giúp cầm không bị nóng tay.' },
      { q: 'Khi đốt nến, vì sao chong chóng giấy đặt phía trên ngọn nến lại quay?', a: 'Không khí gần ngọn nến nóng lên, nhẹ hơn nên bay lên thành dòng đối lưu, đẩy cánh chong chóng quay.' },
      { q: 'Nêu một số biện pháp làm giảm hiệu ứng nhà kính mà em có thể thực hiện.', a: 'Tiết kiệm điện, đi bộ/xe đạp, dùng phương tiện công cộng, trồng cây xanh, hạn chế đốt rác, dùng năng lượng tái tạo.' },
    ],
  },

  'l8-29': {
    opener: 'Đo tháp Eiffel bằng thép (cao 324 m) vào ngày 01/01 và 01/07 năm 1890 thấy sau 6 tháng tháp cao thêm khoảng 10 cm. Chẳng lẽ một cái tháp bằng thép lại "lớn lên" được?',
    goals: ['Thực hiện thí nghiệm chứng tỏ các chất khác nhau nở vì nhiệt khác nhau.', 'Lấy được ví dụ về công dụng và tác hại của sự nở vì nhiệt.', 'Vận dụng giải thích một số hiện tượng đơn giản thường gặp.'],
    sections: [
      {
        title: 'Sự nở vì nhiệt của chất rắn',
        body: [
          'Ba thanh nhôm, đồng, sắt được nung nóng như nhau: kim chỉ thị gắn với thanh nhôm quay nhiều nhất, thanh sắt quay ít nhất. Khi tắt đèn, các kim quay về vị trí cũ.',
          'Các chất rắn nở ra khi nóng lên, co lại khi lạnh đi; các chất rắn khác nhau nở vì nhiệt khác nhau. Quả cầu kim loại khi nguội lọt qua vòng, khi bị hơ nóng thì nở ra, không lọt qua vòng.',
          'Mùa hè nhiệt độ cao hơn mùa đông nên tháp Eiffel bằng thép nở dài ra, cao thêm khoảng 10 cm.',
        ],
        scene: 1,
      },
      {
        title: 'Băng kép',
        body: [
          'Hai thanh đồng và sắt (thép) ghép chặt tạo thành băng kép. Khi hơ nóng, đồng nở nhiều hơn sắt nên băng kép cong về phía thanh sắt; khi làm lạnh băng kép cong về phía thanh đồng.',
          'Băng kép được dùng để tự động đóng ngắt mạch điện trong bàn là, nồi cơm điện, thiết bị báo cháy.',
        ],
        scene: 4,
      },
      {
        title: 'Sự nở vì nhiệt của chất lỏng',
        body: [
          'Đặt bình thuỷ tinh đựng nước màu có ống thuỷ tinh xuyên qua nút vào chậu nước nóng: mực nước màu trong ống dâng lên; chuyển sang chậu nước lạnh: mực nước hạ xuống.',
          'Các chất lỏng nở ra khi nóng lên, co lại khi lạnh đi; các chất lỏng khác nhau (rượu, dầu, nước) nở vì nhiệt khác nhau.',
          'Sự nở vì nhiệt đặc biệt của nước: từ 0 °C đến 4 °C nước co lại, từ 4 °C trở lên nước nở ra. Nước ở 4 °C có khối lượng riêng lớn nhất. Vì vậy khi trời lạnh dưới 0 °C, lớp nước dưới đáy hồ vẫn ở 4 °C, giúp các loài thuỷ sản sống sót.',
        ],
        scene: 2,
      },
      {
        title: 'Sự nở vì nhiệt của chất khí',
        body: [
          'Bình cầu có nút cao su gắn ống thuỷ tinh chứa một giọt nước màu. Xoa hai tay rồi áp vào bình: giọt nước màu dịch chuyển ra ngoài – không khí trong bình nóng lên nở ra.',
          'Chất khí nở vì nhiệt nhiều hơn chất lỏng, chất lỏng nở vì nhiệt nhiều hơn chất rắn. Các chất khí khác nhau nở vì nhiệt giống nhau.',
        ],
        scene: 3,
      },
      {
        title: 'Công dụng và tác hại',
        body: [
          'Công dụng: chế tạo nhiệt kế (chất lỏng, chất khí), khí cầu (không khí nóng), băng kép đóng ngắt mạch tự động.',
          'Tác hại: sự nở vì nhiệt có thể tạo lực rất lớn làm biến dạng đường sắt, ống dẫn nước, dẫn khí… gây tai nạn. Vì vậy chỗ nối hai thanh ray có khe hở, ống dẫn khí có đoạn uốn cong, đầu cầu thép đặt trên con lăn.',
        ],
      },
    ],
    examples: [
      'Khe hở giữa các thanh ray xe lửa, giữa các tấm bê tông mặt đường, ở hai đầu cầu.',
      'Đường dây điện mắc hơi chùng vào mùa hè để mùa đông co lại không bị đứt.',
      'Không đổ nước thật đầy ấm khi đun vì nước nở ra sẽ tràn.',
      'Quả bóng bàn bị bẹp nhúng vào nước nóng sẽ phồng lên trở lại.',
      'Rót nước nóng vào cốc thuỷ tinh dày dễ bị nứt vỡ vì mặt trong nở ra trước mặt ngoài.',
      'Khí cầu bay lên nhờ không khí bên trong được đốt nóng nở ra, nhẹ hơn không khí bên ngoài.',
    ],
    facts: ['Nước nở ra khi đông đặc thành nước đá – vì vậy chai nước đầy để trong ngăn đá có thể bị nứt vỡ.'],
    exercises: [
      { q: 'Vì sao chỗ nối hai đầu thanh ray xe lửa phải để một khe hở?', a: 'Khi nhiệt độ tăng, thanh ray nở dài ra; khe hở giúp thanh ray nở mà không bị cong vênh, đảm bảo an toàn.' },
      { q: 'Băng kép đồng – sắt cong về phía nào khi được hơ nóng? Vì sao?', a: 'Cong về phía thanh sắt, vì đồng nở vì nhiệt nhiều hơn sắt nên thanh đồng dài hơn, nằm ở phía ngoài cung.' },
      { q: 'Tại sao có thể nói chất khí nở vì nhiệt nhiều hơn chất lỏng?', a: 'Chỉ cần áp tay vào bình (tăng nhiệt độ rất ít) giọt nước màu đã dịch chuyển rõ, trong khi chất lỏng phải nhúng vào nước nóng mới thấy mực dâng lên rõ.' },
    ],
  },
};
