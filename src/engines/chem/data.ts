// Cơ sở dữ liệu hoá chất và phản ứng cho bàn ống nghiệm (KHTN 8 – 9, phần Hoá học).
// Mô hình định tính: mỗi ống nghiệm là một tập hợp chất; khi thêm chất/đun nóng thì tìm luật phản ứng phù hợp.

export type SubKind = 'liq' | 'sol' | 'solid' | 'precip' | 'gas' | 'ind' | 'mirror' | 'layer' | 'flame';
export type SolidShape = 'granule' | 'nail' | 'wire' | 'ribbon' | 'lump' | 'powder' | 'chip' | 'mixture';

export interface Sub {
  id: string;
  /** Công thức hiển thị */
  f: string;
  name: string;
  kind: SubKind;
  /** Màu dung dịch (rgba) hoặc màu chất rắn */
  color?: string;
  /** Độ ưu tiên màu khi trộn (lớn hơn thì át màu khác) */
  pri?: number;
  shape?: SolidShape;
  /** Lớp phủ trên kim loại (kim loại mới bám vào) */
  coat?: string;
  acid?: boolean;
  base?: boolean;
  magnetic?: boolean;
  /** Không hiện trong danh sách thành phần (sản phẩm phụ như nước) */
  quiet?: boolean;
}

const S = (id: string, f: string, name: string, kind: SubKind, extra: Partial<Sub> = {}): Sub => ({ id, f, name, kind, ...extra });

const BLUE = 'rgba(40,120,235,0.55)';
const PALE_GREEN = 'rgba(140,200,110,0.4)';

export const SUBS: Record<string, Sub> = Object.fromEntries(
  [
    // ---- chất lỏng, dung dịch ----
    S('h2o', 'H₂O', 'Nước cất', 'liq', { quiet: true }),
    S('hcl', 'HCl', 'Dung dịch hydrochloric acid', 'sol', { acid: true }),
    S('h2so4', 'H₂SO₄', 'Dung dịch sulfuric acid loãng', 'sol', { acid: true }),
    S('h2so4dac', 'H₂SO₄ đặc', 'Sulfuric acid đặc (xúc tác)', 'sol', { acid: true }),
    S('hno3', 'HNO₃', 'Dung dịch nitric acid', 'sol', { acid: true }),
    S('ch3cooh', 'CH₃COOH', 'Dung dịch acetic acid', 'sol', { acid: true }),
    S('naoh', 'NaOH', 'Dung dịch sodium hydroxide', 'sol', { base: true }),
    S('caoh2', 'Ca(OH)₂', 'Nước vôi trong', 'sol', { base: true }),
    S('cuso4', 'CuSO₄', 'Dung dịch copper(II) sulfate', 'sol', { color: BLUE, pri: 3 }),
    S('bacl2', 'BaCl₂', 'Dung dịch barium chloride', 'sol'),
    S('na2so4', 'Na₂SO₄', 'Dung dịch sodium sulfate', 'sol'),
    S('agno3', 'AgNO₃', 'Dung dịch silver nitrate', 'sol'),
    S('nacl', 'NaCl', 'Dung dịch sodium chloride', 'sol'),
    S('kcl', 'KCl', 'Dung dịch potassium chloride', 'sol'),
    S('na2co3', 'Na₂CO₃', 'Dung dịch sodium carbonate', 'sol', { base: true }),
    S('cano32', 'Ca(NO₃)₂', 'Dung dịch calcium nitrate', 'sol'),
    S('nano3', 'NaNO₃', 'Dung dịch sodium nitrate', 'sol'),
    S('bano32', 'Ba(NO₃)₂', 'Barium nitrate', 'sol'),
    S('feso4', 'FeSO₄', 'Iron(II) sulfate', 'sol', { color: PALE_GREEN, pri: 1 }),
    S('fecl2', 'FeCl₂', 'Iron(II) chloride', 'sol', { color: PALE_GREEN, pri: 1 }),
    S('zncl2', 'ZnCl₂', 'Zinc chloride', 'sol'),
    S('znso4', 'ZnSO₄', 'Zinc sulfate', 'sol'),
    S('znno32', 'Zn(NO₃)₂', 'Zinc nitrate', 'sol'),
    S('mgcl2', 'MgCl₂', 'Magnesium chloride', 'sol'),
    S('mgso4', 'MgSO₄', 'Magnesium sulfate', 'sol'),
    S('alcl3', 'AlCl₃', 'Aluminium chloride', 'sol'),
    S('cacl2', 'CaCl₂', 'Calcium chloride', 'sol'),
    S('cuno32', 'Cu(NO₃)₂', 'Copper(II) nitrate', 'sol', { color: BLUE, pri: 3 }),
    S('cucl2', 'CuCl₂', 'Copper(II) chloride', 'sol', { color: 'rgba(40,160,170,0.55)', pri: 3 }),
    S('cahco32', 'Ca(HCO₃)₂', 'Calcium hydrogencarbonate', 'sol'),
    S('h2o2', 'H₂O₂', 'Nước oxy già 3%', 'sol'),
    S('c2h5oh', 'C₂H₅OH', 'Ethylic alcohol (cồn)', 'sol'),
    S('c2h5ona', 'C₂H₅ONa', 'Sodium ethylate', 'sol'),
    S('ch3coona', 'CH₃COONa', 'Sodium acetate', 'sol'),
    S('acmg', '(CH₃COO)₂Mg', 'Magnesium acetate', 'sol'),
    S('accu', '(CH₃COO)₂Cu', 'Copper(II) acetate', 'sol', { color: 'rgba(40,150,150,0.55)', pri: 3 }),
    S('acca', '(CH₃COO)₂Ca', 'Calcium acetate', 'sol'),
    S('glucose', 'C₆H₁₂O₆', 'Dung dịch glucose', 'sol'),
    S('saccharose', 'C₁₂H₂₂O₁₁', 'Dung dịch saccharose', 'sol'),
    S('gluacid', 'C₆H₁₂O₇', 'Gluconic acid', 'sol', { quiet: true }),
    S('tollens', 'AgNO₃/NH₃', 'Dung dịch silver nitrate trong ammonia', 'sol'),
    S('tinhbot', '(C₆H₁₀O₅)ₙ', 'Hồ tinh bột', 'sol', { color: 'rgba(235,235,225,0.6)', pri: 0.5 }),
    S('iot', 'I₂', 'Dung dịch iodine', 'sol', { color: 'rgba(190,110,20,0.5)', pri: 2 }),
    S('tbiot', 'tinh bột–iodine', 'Hợp chất màu xanh tím', 'sol', { color: 'rgba(55,30,130,0.88)', pri: 6 }),
    S('br2', 'Br₂', 'Nước bromine', 'sol', { color: 'rgba(235,140,20,0.62)', pri: 4 }),
    S('c2h4br2', 'C₂H₄Br₂', '1,2-dibromoethane', 'sol'),
    S('longtrang', 'protein', 'Lòng trắng trứng', 'sol', { color: 'rgba(250,244,215,0.65)', pri: 0.5 }),
    S('mau', 'nước màu', 'Nước màu (pha loãng)', 'sol', { color: 'rgba(225,40,120,0.55)', pri: 3 }),
    // ---- chất rắn ----
    S('zn', 'Zn', 'Kẽm viên', 'solid', { shape: 'granule', color: '#9aa3ab' }),
    S('zn_cu', 'Zn', 'Kẽm (có đồng bám)', 'solid', { shape: 'granule', color: '#9aa3ab', coat: '#b4542a' }),
    S('zn_ag', 'Zn', 'Kẽm (có bạc bám)', 'solid', { shape: 'granule', color: '#9aa3ab', coat: '#7d848c' }),
    S('fe', 'Fe', 'Đinh sắt', 'solid', { shape: 'nail', color: '#69717a', magnetic: true }),
    S('fe_cu', 'Fe', 'Đinh sắt (có đồng bám)', 'solid', { shape: 'nail', color: '#69717a', coat: '#b4542a', magnetic: true }),
    S('cu', 'Cu', 'Dây đồng', 'solid', { shape: 'wire', color: '#c8743a' }),
    S('cu_ag', 'Cu', 'Dây đồng (có bạc bám)', 'solid', { shape: 'wire', color: '#c8743a', coat: '#7d848c' }),
    S('mg', 'Mg', 'Magnesium (băng)', 'solid', { shape: 'ribbon', color: '#c9ccd0' }),
    S('al', 'Al', 'Nhôm (lá)', 'solid', { shape: 'ribbon', color: '#d6dbe0' }),
    S('ag', 'Ag', 'Bạc', 'solid', { shape: 'wire', color: '#c7c9cc' }),
    S('na', 'Na', 'Mẩu natri', 'solid', { shape: 'lump', color: '#dfe3e8' }),
    S('ca', 'Ca', 'Mẩu calcium', 'solid', { shape: 'lump', color: '#e9e4d6' }),
    S('caco3', 'CaCO₃', 'Đá vôi (viên)', 'solid', { shape: 'chip', color: '#ece6d8' }),
    S('cuo', 'CuO', 'Bột copper(II) oxide', 'solid', { shape: 'powder', color: '#1f1f1f' }),
    S('mno2', 'MnO₂', 'Bột manganese dioxide', 'solid', { shape: 'powder', color: '#2a2622' }),
    S('fesmix', 'Fe + S', 'Hỗn hợp bột sắt và lưu huỳnh', 'solid', { shape: 'mixture', color: '#c9b84a', magnetic: true }),
    S('fes', 'FeS', 'Iron(II) sulfide', 'solid', { shape: 'lump', color: '#2d2b29' }),
    S('than', 'C', 'Bột than gỗ', 'solid', { shape: 'powder', color: '#151515' }),
    S('khet', 'C', 'Chất rắn cháy đen', 'solid', { shape: 'powder', color: '#2a1d12' }),
    // ---- kết tủa ----
    S('baso4', 'BaSO₄', 'Barium sulfate (kết tủa trắng)', 'precip', { color: '#f4f4f2' }),
    S('caco3p', 'CaCO₃', 'Calcium carbonate (kết tủa trắng)', 'precip', { color: '#f2f0ea' }),
    S('baco3', 'BaCO₃', 'Barium carbonate (kết tủa trắng)', 'precip', { color: '#f2f0ea' }),
    S('caso4', 'CaSO₄', 'Calcium sulfate (ít tan)', 'precip', { color: '#f4f4f2' }),
    S('agcl', 'AgCl', 'Silver chloride (kết tủa trắng)', 'precip', { color: '#f7f7f7' }),
    S('cuoh2', 'Cu(OH)₂', 'Copper(II) hydroxide (kết tủa xanh lam)', 'precip', { color: '#3f86e0' }),
    S('feoh2', 'Fe(OH)₂', 'Iron(II) hydroxide (kết tủa trắng xanh)', 'precip', { color: '#a9c49a' }),
    S('cuo_p', 'CuO', 'Copper(II) oxide (màu đen)', 'precip', { color: '#1d1d1d' }),
    S('proteindt', 'protein', 'Protein đông tụ', 'precip', { color: '#fbfbf6' }),
    // ---- khác ----
    S('agmirror', 'Ag', 'Lớp bạc bám trên thành ống', 'mirror', { color: '#d5d8dc' }),
    S('ester', 'CH₃COOC₂H₅', 'Ethyl acetate (lớp chất lỏng mùi thơm)', 'layer', { color: 'rgba(255,255,240,0.7)' }),
    S('flame', 'lửa', 'Ngọn lửa', 'flame', { color: '#5aa7ff', quiet: true }),
    S('co2', 'CO₂', 'Khí carbon dioxide (sục vào)', 'gas'),
    S('c2h4', 'C₂H₄', 'Khí ethylene (dẫn vào)', 'gas'),
    S('ch4', 'CH₄', 'Khí methane (dẫn vào)', 'gas'),
    // ---- chất chỉ thị ----
    S('quy', 'Quỳ tím', 'Giấy quỳ tím', 'ind'),
    S('phenol', 'Phenolphthalein', 'Dung dịch phenolphthalein', 'ind'),
  ].map((s) => [s.id, s]),
);

/** Dụng cụ thao tác (không phải hoá chất) */
export const TOOLS: Record<string, { name: string; short: string }> = {
  '@heat': { name: 'Đèn cồn – đun nóng', short: 'Đun nóng' },
  '@strong': { name: 'Đun mạnh (đến khô)', short: 'Đun mạnh' },
  '@fire': { name: 'Que đóm – châm lửa', short: 'Châm lửa' },
  '@magnet': { name: 'Nam châm – thử từ tính', short: 'Nam châm' },
};

export interface Rule {
  a: string;
  /** Chất thứ hai (bỏ trống: phản ứng của một chất khi đun/châm lửa) */
  b?: string;
  need?: 'heat' | 'fire' | 'strong';
  /** Chất xúc tác phải có mặt */
  cat?: string;
  out: string[];
  /** Chất tham gia còn lại sau phản ứng (dư hoặc không tham gia hết) */
  keep?: string[];
  gas?: string;
  /** cường độ sủi bọt 0..1 */
  rate?: number;
  hot?: boolean;
  eq: string;
  obs: string;
}

const H2 = 'H₂';

export const RULES: Rule[] = [
  // --- kim loại + acid ---
  { a: 'zn', b: 'hcl', out: ['zncl2'], keep: ['zn'], gas: H2, rate: 0.6, eq: 'Zn + 2HCl → ZnCl₂ + H₂↑', obs: 'Có nhiều bọt khí không màu thoát ra trên bề mặt viên kẽm.' },
  { a: 'fe', b: 'hcl', out: ['fecl2'], keep: ['fe'], gas: H2, rate: 0.3, eq: 'Fe + 2HCl → FeCl₂ + H₂↑', obs: 'Có bọt khí thoát ra chậm trên đinh sắt, dung dịch chuyển dần sang màu lục nhạt.' },
  { a: 'mg', b: 'hcl', out: ['mgcl2'], keep: ['mg'], gas: H2, rate: 1, hot: true, eq: 'Mg + 2HCl → MgCl₂ + H₂↑', obs: 'Sủi bọt khí rất mạnh, ống nghiệm nóng lên, băng magnesium tan dần.' },
  { a: 'al', b: 'hcl', out: ['alcl3'], keep: ['al'], gas: H2, rate: 0.55, eq: '2Al + 6HCl → 2AlCl₃ + 3H₂↑', obs: 'Lá nhôm tan dần, có bọt khí không màu thoát ra.' },
  { a: 'zn', b: 'h2so4', out: ['znso4'], keep: ['zn'], gas: H2, rate: 0.6, eq: 'Zn + H₂SO₄ → ZnSO₄ + H₂↑', obs: 'Có bọt khí không màu thoát ra trên bề mặt viên kẽm.' },
  { a: 'fe', b: 'h2so4', out: ['feso4'], keep: ['fe'], gas: H2, rate: 0.3, eq: 'Fe + H₂SO₄ → FeSO₄ + H₂↑', obs: 'Có bọt khí thoát ra chậm, dung dịch có màu lục nhạt.' },
  { a: 'mg', b: 'h2so4', out: ['mgso4'], keep: ['mg'], gas: H2, rate: 1, hot: true, eq: 'Mg + H₂SO₄ → MgSO₄ + H₂↑', obs: 'Sủi bọt khí rất mạnh, magnesium tan dần, ống nghiệm nóng lên.' },
  { a: 'mg', b: 'ch3cooh', out: ['acmg'], keep: ['mg'], gas: H2, rate: 0.5, eq: '2CH₃COOH + Mg → (CH₃COO)₂Mg + H₂↑', obs: 'Có bọt khí thoát ra, mảnh magnesium tan dần (chậm hơn so với trong HCl).' },
  // --- kim loại + nước ---
  { a: 'na', b: 'h2o', out: ['naoh'], keep: ['h2o'], gas: H2, rate: 0.85, hot: true, eq: '2Na + 2H₂O → 2NaOH + H₂↑', obs: 'Mẩu natri nóng chảy thành giọt tròn, chạy trên mặt nước, có khí thoát ra rồi tan hết.' },
  { a: 'ca', b: 'h2o', out: ['caoh2'], keep: ['h2o'], gas: H2, rate: 0.5, hot: true, eq: 'Ca + 2H₂O → Ca(OH)₂ + H₂↑', obs: 'Mẩu calcium tan dần, có bọt khí thoát ra, dung dịch hơi đục.' },
  { a: 'na', b: 'c2h5oh', out: ['c2h5ona'], keep: ['c2h5oh'], gas: H2, rate: 0.35, eq: '2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑', obs: 'Mẩu natri tan dần, có bọt khí thoát ra từ từ (êm dịu hơn so với natri trong nước).' },
  // --- kim loại + dung dịch muối ---
  { a: 'fe', b: 'cuso4', out: ['fe_cu', 'feso4'], eq: 'Fe + CuSO₄ → FeSO₄ + Cu', obs: 'Có lớp kim loại màu đỏ bám trên đinh sắt; màu xanh của dung dịch nhạt dần.' },
  { a: 'cu', b: 'agno3', out: ['cu_ag', 'cuno32'], eq: 'Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag', obs: 'Có lớp kim loại màu xám bạc bám trên dây đồng; dung dịch chuyển dần sang màu xanh.' },
  { a: 'zn', b: 'agno3', out: ['zn_ag', 'znno32'], eq: 'Zn + 2AgNO₃ → Zn(NO₃)₂ + 2Ag', obs: 'Có lớp kim loại màu xám bạc bám trên viên kẽm.' },
  { a: 'zn', b: 'cuso4', out: ['zn_cu', 'znso4'], eq: 'Zn + CuSO₄ → ZnSO₄ + Cu', obs: 'Có lớp kim loại màu đỏ bám trên viên kẽm; màu xanh của dung dịch nhạt dần.' },
  // --- acid + base (trung hoà) ---
  { a: 'naoh', b: 'hcl', out: ['nacl'], hot: true, eq: 'NaOH + HCl → NaCl + H₂O', obs: 'Không thấy khí hay kết tủa; ống nghiệm hơi ấm lên (phản ứng trung hoà).' },
  { a: 'naoh', b: 'h2so4', out: ['na2so4'], hot: true, eq: '2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O', obs: 'Không thấy khí hay kết tủa; ống nghiệm hơi ấm lên (phản ứng trung hoà).' },
  { a: 'caoh2', b: 'h2so4', out: ['caso4'], eq: 'Ca(OH)₂ + H₂SO₄ → CaSO₄ + 2H₂O', obs: 'Phản ứng trung hoà, có thể thấy một ít chất rắn trắng ít tan.' },
  { a: 'caoh2', b: 'hcl', out: ['cacl2'], eq: 'Ca(OH)₂ + 2HCl → CaCl₂ + 2H₂O', obs: 'Phản ứng trung hoà, không thấy khí hay kết tủa.' },
  { a: 'naoh', b: 'ch3cooh', out: ['ch3coona'], eq: 'CH₃COOH + NaOH → CH₃COONa + H₂O', obs: 'Không thấy khí hay kết tủa (phản ứng trung hoà).' },
  { a: 'cuoh2', b: 'h2so4', out: ['cuso4'], eq: 'Cu(OH)₂ + H₂SO₄ → CuSO₄ + 2H₂O', obs: 'Kết tủa xanh tan dần, dung dịch có màu xanh lam.' },
  { a: 'cuoh2', b: 'hcl', out: ['cucl2'], eq: 'Cu(OH)₂ + 2HCl → CuCl₂ + 2H₂O', obs: 'Kết tủa xanh tan dần, dung dịch có màu xanh.' },
  // --- oxide ---
  { a: 'cuo', b: 'h2so4', out: ['cuso4'], eq: 'CuO + H₂SO₄ → CuSO₄ + H₂O', obs: 'Bột màu đen tan dần, dung dịch chuyển sang màu xanh lam.' },
  { a: 'cuo', b: 'hcl', out: ['cucl2'], eq: 'CuO + 2HCl → CuCl₂ + H₂O', obs: 'Bột màu đen tan dần, dung dịch có màu xanh.' },
  { a: 'cuo', b: 'ch3cooh', need: 'heat', out: ['accu'], eq: '2CH₃COOH + CuO → (CH₃COO)₂Cu + H₂O', obs: 'Khi đun nhẹ, bột CuO tan dần, dung dịch có màu xanh.' },
  { a: 'caoh2', b: 'co2', out: ['caco3p'], eq: 'Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O', obs: 'Nước vôi trong bị vẩn đục (kết tủa trắng).' },
  { a: 'caco3p', b: 'co2', out: ['cahco32'], eq: 'CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂', obs: 'Tiếp tục sục khí: kết tủa tan dần, dung dịch trong trở lại.' },
  { a: 'naoh', b: 'co2', out: ['na2co3'], eq: 'CO₂ + 2NaOH → Na₂CO₃ + H₂O', obs: 'Không thấy hiện tượng rõ rệt (khí bị dung dịch hấp thụ).' },
  // --- muối ---
  { a: 'cuso4', b: 'naoh', out: ['cuoh2', 'na2so4'], eq: 'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄', obs: 'Xuất hiện kết tủa màu xanh lam.' },
  { a: 'feso4', b: 'naoh', out: ['feoh2', 'na2so4'], eq: 'FeSO₄ + 2NaOH → Fe(OH)₂↓ + Na₂SO₄', obs: 'Xuất hiện kết tủa màu trắng xanh.' },
  { a: 'bacl2', b: 'h2so4', out: ['baso4', 'hcl'], eq: 'BaCl₂ + H₂SO₄ → BaSO₄↓ + 2HCl', obs: 'Xuất hiện kết tủa màu trắng.' },
  { a: 'bacl2', b: 'na2so4', out: ['baso4', 'nacl'], eq: 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl', obs: 'Xuất hiện kết tủa màu trắng.' },
  { a: 'bacl2', b: 'cuso4', out: ['baso4', 'cucl2'], eq: 'BaCl₂ + CuSO₄ → BaSO₄↓ + CuCl₂', obs: 'Xuất hiện kết tủa màu trắng.' },
  { a: 'bacl2', b: 'na2co3', out: ['baco3', 'nacl'], eq: 'BaCl₂ + Na₂CO₃ → BaCO₃↓ + 2NaCl', obs: 'Xuất hiện kết tủa màu trắng.' },
  { a: 'cano32', b: 'na2co3', out: ['caco3p', 'nano3'], eq: 'Ca(NO₃)₂ + Na₂CO₃ → CaCO₃↓ + 2NaNO₃', obs: 'Xuất hiện kết tủa màu trắng.' },
  { a: 'cano32', b: 'na2so4', out: ['caso4', 'nano3'], eq: 'Ca(NO₃)₂ + Na₂SO₄ → CaSO₄ + 2NaNO₃', obs: 'Có thể thấy một ít kết tủa trắng (CaSO₄ là chất ít tan).' },
  { a: 'agno3', b: 'nacl', out: ['agcl', 'nano3'], eq: 'NaCl + AgNO₃ → AgCl↓ + NaNO₃', obs: 'Xuất hiện kết tủa màu trắng.' },
  { a: 'agno3', b: 'kcl', out: ['agcl'], eq: 'KCl + AgNO₃ → AgCl↓ + KNO₃', obs: 'Xuất hiện kết tủa màu trắng.' },
  { a: 'agno3', b: 'hcl', out: ['agcl', 'hno3'], eq: 'HCl + AgNO₃ → AgCl↓ + HNO₃', obs: 'Xuất hiện kết tủa màu trắng.' },
  { a: 'agno3', b: 'bacl2', out: ['agcl', 'bano32'], eq: '2AgNO₃ + BaCl₂ → 2AgCl↓ + Ba(NO₃)₂', obs: 'Xuất hiện kết tủa màu trắng.' },
  { a: 'na2co3', b: 'hcl', out: ['nacl'], gas: 'CO₂', rate: 0.7, eq: 'Na₂CO₃ + 2HCl → 2NaCl + CO₂↑ + H₂O', obs: 'Sủi bọt khí không màu.' },
  { a: 'na2co3', b: 'hno3', out: ['nano3'], gas: 'CO₂', rate: 0.7, eq: 'Na₂CO₃ + 2HNO₃ → 2NaNO₃ + CO₂↑ + H₂O', obs: 'Sủi bọt khí không màu.' },
  { a: 'na2co3', b: 'h2so4', out: ['na2so4'], gas: 'CO₂', rate: 0.7, eq: 'Na₂CO₃ + H₂SO₄ → Na₂SO₄ + CO₂↑ + H₂O', obs: 'Sủi bọt khí không màu.' },
  { a: 'caco3', b: 'hcl', out: ['cacl2'], keep: ['caco3'], gas: 'CO₂', rate: 0.6, eq: 'CaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O', obs: 'Đá vôi sủi bọt khí không màu, tan dần.' },
  { a: 'caco3', b: 'ch3cooh', out: ['acca'], keep: ['caco3'], gas: 'CO₂', rate: 0.4, eq: '2CH₃COOH + CaCO₃ → (CH₃COO)₂Ca + CO₂↑ + H₂O', obs: 'Đá vôi sủi bọt khí không màu, tan dần.' },
  // --- nhiệt phân, hoá hợp ---
  { a: 'fesmix', need: 'heat', out: ['fes'], hot: true, eq: 'Fe + S →(t°) FeS', obs: 'Hỗn hợp nóng đỏ rực lan dần; để nguội thu được chất rắn màu xám đen.' },
  { a: 'cuoh2', need: 'heat', out: ['cuo_p'], eq: 'Cu(OH)₂ →(t°) CuO + H₂O', obs: 'Kết tủa xanh lam chuyển dần sang màu đen.' },
  // --- xúc tác ---
  { a: 'h2o2', b: 'mno2', out: ['h2o'], keep: ['mno2'], gas: 'O₂', rate: 0.95, eq: '2H₂O₂ →(MnO₂) 2H₂O + O₂↑', obs: 'Sủi bọt khí rất mạnh. Bột MnO₂ vẫn còn nguyên sau phản ứng.' },
  // --- phi kim: hấp phụ ---
  { a: 'mau', b: 'than', out: [], keep: ['than'], eq: 'Không có phương trình: đây là hiện tượng hấp phụ (biến đổi vật lí).', obs: 'Màu của dung dịch nhạt dần rồi mất màu: than gỗ giữ các phân tử chất màu trên bề mặt.' },
  // --- hữu cơ ---
  { a: 'c2h4', b: 'br2', out: ['c2h4br2'], eq: 'C₂H₄ + Br₂ → C₂H₄Br₂', obs: 'Nước bromine bị mất màu (phản ứng cộng).' },
  { a: 'c2h5oh', need: 'fire', out: ['flame'], keep: ['c2h5oh'], hot: true, eq: 'C₂H₅OH + 3O₂ →(t°) 2CO₂ + 3H₂O', obs: 'Ethylic alcohol cháy với ngọn lửa màu xanh nhạt, toả nhiều nhiệt.' },
  { a: 'ch3cooh', b: 'c2h5oh', need: 'heat', cat: 'h2so4dac', out: ['ester'], eq: 'CH₃COOH + C₂H₅OH ⇌(H₂SO₄ đặc, t°) CH₃COOC₂H₅ + H₂O', obs: 'Xuất hiện lớp chất lỏng không màu, có mùi thơm nhẹ nổi phía trên (ester).' },
  { a: 'glucose', b: 'tollens', need: 'heat', out: ['agmirror', 'gluacid'], eq: 'C₆H₁₂O₆ + Ag₂O →(NH₃, t°) C₆H₁₂O₇ + 2Ag↓', obs: 'Thành ống nghiệm được phủ một lớp bạc sáng như gương (phản ứng tráng bạc).' },
  { a: 'saccharose', b: 'hcl', need: 'heat', out: ['glucose'], keep: ['hcl'], eq: 'C₁₂H₂₂O₁₁ + H₂O →(acid, t°) C₆H₁₂O₆ (glucose) + C₆H₁₂O₆ (fructose)', obs: 'Không thấy biến đổi bên ngoài; saccharose đã bị thuỷ phân thành glucose và fructose.' },
  { a: 'tinhbot', b: 'iot', out: ['tbiot'], eq: 'Hồ tinh bột + iodine → hợp chất màu xanh tím (dùng để nhận biết tinh bột)', obs: 'Dung dịch chuyển sang màu xanh tím.' },
  { a: 'tinhbot', b: 'hcl', need: 'heat', out: ['glucose'], keep: ['hcl'], eq: '(C₆H₁₀O₅)ₙ + nH₂O →(acid, t°) nC₆H₁₂O₆', obs: 'Không thấy biến đổi bên ngoài; tinh bột đã bị thuỷ phân thành glucose.' },
  { a: 'longtrang', b: 'hcl', out: ['proteindt'], keep: ['hcl'], eq: 'Protein bị đông tụ dưới tác dụng của acid.', obs: 'Lòng trắng trứng đông tụ, xuất hiện chất rắn màu trắng.' },
  { a: 'longtrang', need: 'heat', out: ['proteindt'], eq: 'Protein bị đông tụ khi đun nóng.', obs: 'Lòng trắng trứng đông tụ thành chất rắn màu trắng đục.' },
  { a: 'proteindt', need: 'strong', out: ['khet'], eq: 'Protein bị phân huỷ khi đun nóng mạnh, không có nước.', obs: 'Chất rắn cháy đen, có mùi khét giống mùi tóc cháy.' },
  { a: 'longtrang', need: 'strong', out: ['khet'], eq: 'Protein bị phân huỷ khi đun nóng mạnh, không có nước.', obs: 'Lòng trắng trứng đông tụ rồi cháy đen, có mùi khét.' },
];

// ----------------------------------------------------------------------------------------------

export interface LogEntry {
  /** chất hoặc dụng cụ vừa thêm */
  add: string;
  eq?: string;
  obs: string;
  /** có phản ứng hoá học không */
  reacted: boolean;
}

export interface TubeState {
  S: string[];
  heated: boolean;
  strong: boolean;
  fire: boolean;
  magnet: boolean;
  gas?: { name: string; rate: number };
  hot: boolean;
  /** số lần rót chất lỏng (để tính mực chất lỏng) */
  pours: number;
  log: LogEntry[];
}

const has = (S: string[], id?: string) => !!id && S.includes(id);

function findRule(st: TubeState): Rule | undefined {
  return RULES.find((r) => {
    if (!has(st.S, r.a)) return false;
    if (r.b && !has(st.S, r.b)) return false;
    if (r.cat && !has(st.S, r.cat)) return false;
    if (r.need === 'heat' && !st.heated) return false;
    if (r.need === 'strong' && !st.strong) return false;
    if (r.need === 'fire' && !st.fire) return false;
    // Phản ứng cháy: chỉ xảy ra một lần
    if (r.out.length === 1 && r.out[0] === 'flame' && has(st.S, 'flame')) return false;
    return true;
  });
}

function applyRule(st: TubeState, r: Rule) {
  const used = [r.a, r.b].filter((x): x is string => !!x && !(r.keep ?? []).includes(x));
  st.S = st.S.filter((s) => !used.includes(s));
  for (const o of r.out) if (!st.S.includes(o)) st.S.push(o);
  if (r.gas) st.gas = { name: r.gas, rate: r.rate ?? 0.5 };
  if (r.hot) st.hot = true;
}

/** Tính trạng thái của ống nghiệm từ thành phần ban đầu và chuỗi thao tác. */
export function runTube(init: string[], events: string[]): TubeState {
  const st: TubeState = { S: [...init], heated: false, strong: false, fire: false, magnet: false, hot: false, pours: init.filter((x) => isLiquid(x)).length, log: [] };
  const settle = () => {
    const fired: Rule[] = [];
    for (let i = 0; i < 12; i++) {
      const r = findRule(st);
      if (!r) break;
      applyRule(st, r);
      fired.push(r);
    }
    return fired;
  };
  settle();
  for (const e of events) {
    st.gas = undefined;
    st.hot = false;
    if (e === '@magnet') {
      st.magnet = !st.magnet;
      if (st.magnet) {
        const mag = st.S.some((s) => SUBS[s]?.magnetic);
        st.log.push({ add: e, reacted: false, obs: mag ? 'Nam châm hút được các hạt/vật bằng sắt trong ống nghiệm.' : 'Nam châm không hút chất trong ống nghiệm.' });
      }
      continue;
    }
    if (e === '@heat' || e === '@strong' || e === '@fire') {
      if (e === '@heat') st.heated = !st.heated;
      if (e === '@strong') {
        st.strong = !st.strong;
        st.heated = st.strong || st.heated;
      }
      if (e === '@fire') st.fire = true;
      const on = e === '@heat' ? st.heated : e === '@strong' ? st.strong : true;
      const fired = on ? settle() : [];
      if (e === '@fire') st.fire = false;
      if (fired.length) for (const r of fired) st.log.push({ add: e, reacted: true, eq: r.eq, obs: r.obs });
      else st.log.push({ add: e, reacted: false, obs: !on ? 'Đã tắt đèn cồn.' : e === '@fire' ? 'Châm lửa nhưng chất trong vật chứa không cháy.' : 'Đun nóng nhưng chưa thấy biến đổi gì.' });
      continue;
    }
    if (isLiquid(e)) st.pours++;
    if (!st.S.includes(e)) st.S.push(e);
    const fired = settle();
    if (fired.length) for (const r of fired) st.log.push({ add: e, reacted: true, eq: r.eq, obs: r.obs });
    else st.log.push({ add: e, reacted: false, obs: indicatorObs(st, e) ?? 'Không thấy hiện tượng gì: không xảy ra phản ứng hoá học.' });
  }
  return st;
}

export function isLiquid(id: string) {
  const k = SUBS[id]?.kind;
  return k === 'liq' || k === 'sol';
}

export type Medium = 'acid' | 'base' | 'neutral' | 'none';

export function mediumOf(S: string[]): Medium {
  const liquid = S.some((s) => isLiquid(s));
  if (!liquid) return 'none';
  const a = S.some((s) => SUBS[s]?.acid);
  const b = S.some((s) => SUBS[s]?.base);
  if (a && !b) return 'acid';
  if (b && !a) return 'base';
  return 'neutral';
}

export const LITMUS = { acid: '#e0313b', base: '#2b5fd9', neutral: '#8a55b8', none: '#8a55b8' };

function indicatorObs(st: TubeState, e: string): string | undefined {
  const m = mediumOf(st.S);
  if (e === 'quy') return m === 'acid' ? 'Giấy quỳ tím chuyển sang màu đỏ: dung dịch có tính acid.' : m === 'base' ? 'Giấy quỳ tím chuyển sang màu xanh: dung dịch có tính base.' : 'Giấy quỳ tím không đổi màu.';
  if (e === 'phenol') return m === 'base' ? 'Dung dịch chuyển sang màu hồng: dung dịch có tính base.' : 'Dung dịch phenolphthalein không đổi màu (không màu).';
  if (has(st.S, 'quy') && isLiquid(e)) return m === 'acid' ? 'Giấy quỳ trong ống có màu đỏ.' : m === 'base' ? 'Giấy quỳ trong ống có màu xanh.' : undefined;
  if (has(st.S, 'phenol') && isLiquid(e)) return m === 'base' ? 'Dung dịch có màu hồng.' : 'Dung dịch không màu (màu hồng biến mất nếu trước đó có).';
  return undefined;
}

/** Màu chất lỏng trong ống */
export function liquidColor(S: string[]): string {
  if (has(S, 'phenol') && mediumOf(S) === 'base') return 'rgba(236,72,153,0.6)';
  let best: Sub | undefined;
  for (const s of S) {
    const d = SUBS[s];
    if (d && (d.kind === 'sol' || d.kind === 'liq') && d.color && (!best || (d.pri ?? 0) >= (best.pri ?? 0))) best = d;
  }
  return best?.color ?? 'rgba(190,225,250,0.45)';
}
