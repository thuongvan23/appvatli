// Sơ đồ, bảng tra và quy trình công nghiệp (KHTN 8 Bài 11, 12; KHTN 9 Bài 19 – 21, 25, 33 – 35).
import { useEffect, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { fmt, fmtShort } from '../../core/format';
import { Row, Seg, Slider } from '../../ui/controls';

const ARROW = (
  <defs>
    <marker id="arrowP" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 Z" fill="context-stroke" />
    </marker>
  </defs>
);

// ---------------- Mối quan hệ giữa các hợp chất vô cơ ----------------

export interface RelationsDoc {
  mode: 'relations';
  sel: number;
}

const BOXES: Record<string, [number, number]> = { ob: [190, 120], oa: [1010, 120], muoi: [600, 280], base: [190, 520], acid: [1010, 520] };
const BOX_NAME: Record<string, string> = { ob: 'OXIDE BASE', oa: 'OXIDE ACID', muoi: 'MUỐI', base: 'BASE', acid: 'ACID' };

const LINKS: { from: string; to: string; label: string; eqs: string[]; bend?: number }[] = [
  { from: 'ob', to: 'muoi', label: '+ Acid', eqs: ['CuO + H₂SO₄ → CuSO₄ + H₂O', 'Fe₂O₃ + 6HCl → 2FeCl₃ + 3H₂O'] },
  { from: 'oa', to: 'muoi', label: '+ Base', eqs: ['CO₂ + Ca(OH)₂ → CaCO₃ + H₂O', 'SO₂ + 2NaOH → Na₂SO₃ + H₂O'] },
  { from: 'base', to: 'muoi', label: '+ Acid, + Oxide acid, + Muối', eqs: ['NaOH + HCl → NaCl + H₂O', '2NaOH + CO₂ → Na₂CO₃ + H₂O', '2NaOH + CuSO₄ → Cu(OH)₂ + Na₂SO₄'], bend: -40 },
  { from: 'muoi', to: 'base', label: '+ Base', eqs: ['CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄', 'FeSO₄ + 2NaOH → Fe(OH)₂↓ + Na₂SO₄'], bend: -40 },
  { from: 'acid', to: 'muoi', label: '+ Kim loại, + Base, + Oxide base, + Muối', eqs: ['Zn + 2HCl → ZnCl₂ + H₂', 'HCl + NaOH → NaCl + H₂O', '2HNO₃ + CuO → Cu(NO₃)₂ + H₂O', 'H₂SO₄ + BaCl₂ → BaSO₄↓ + 2HCl'], bend: 40 },
  { from: 'muoi', to: 'acid', label: '+ Acid', eqs: ['BaCl₂ + H₂SO₄ → BaSO₄↓ + 2HCl', 'CaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O'], bend: 40 },
];

export function RelationsView({ doc, onDoc, showValues }: EngineProps<RelationsDoc, unknown>) {
  const link = LINKS[doc.sel];
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          {ARROW}
          {LINKS.map((l, i) => {
            const [x1, y1] = BOXES[l.from];
            const [x2, y2] = BOXES[l.to];
            const dx = x2 - x1;
            const dy = y2 - y1;
            const L = Math.hypot(dx, dy);
            const sx = x1 + (dx / L) * 110;
            const sy = y1 + (dy / L) * 50;
            const ex = x2 - (dx / L) * 110;
            const ey = y2 - (dy / L) * 50;
            const b = l.bend ?? 0;
            const mx = (sx + ex) / 2 + (-dy / L) * b;
            const my = (sy + ey) / 2 + (dx / L) * b;
            const on = i === doc.sel;
            return (
              <g key={i} className="draggable" onPointerDown={() => onDoc({ ...doc, sel: i })}>
                <path d={`M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`} fill="none" stroke="transparent" strokeWidth={30} />
                <path d={`M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`} fill="none" stroke={on ? 'var(--danger)' : 'var(--ink-2)'} strokeWidth={on ? 5 : 3} markerEnd="url(#arrowP)" />
                <text x={mx} y={my - 8} textAnchor="middle" className="lab-small" style={{ fill: on ? 'var(--danger)' : undefined, fontStyle: 'italic' }}>
                  {l.label}
                </text>
              </g>
            );
          })}
          {Object.entries(BOXES).map(([k, [x, y]]) => (
            <g key={k}>
              <rect x={x - 110} y={y - 36} width={220} height={72} rx={12} fill="#a8e6cf" stroke="#2f9e44" strokeWidth={2} />
              <text x={x} y={y + 9} textAnchor="middle" fontWeight={900} fontSize={24} fill="#14532d">
                {BOX_NAME[k]}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Mối quan hệ giữa các hợp chất vô cơ</h3>
        <p className="small">Bấm vào một mũi tên để xem phương trình hoá học minh hoạ.</p>
        <div className="insp-row">
          <div className="insp-label">
            {BOX_NAME[link.from]} → {BOX_NAME[link.to]} ({link.label})
          </div>
          {link.eqs.map((e) => (
            <p key={e} className="obs-eq">
              {showValues ? e : '? (học sinh viết phương trình)'}
            </p>
          ))}
        </div>
      </aside>
    </div>
  );
}

// ---------------- Bảng tính tan ----------------

export interface SolTableDoc {
  mode: 'soltable';
  sel?: [number, number];
  revealed: string[];
}

const CATIONS: [string, number, string][] = [
  ['K', 1, 'potassium'],
  ['Na', 1, 'sodium'],
  ['Ag', 1, 'silver'],
  ['Mg', 2, 'magnesium'],
  ['Ca', 2, 'calcium'],
  ['Ba', 2, 'barium'],
  ['Zn', 2, 'zinc'],
  ['Pb', 2, 'lead'],
  ['Cu', 2, 'copper(II)'],
  ['Fe', 2, 'iron(II)'],
  ['Fe', 3, 'iron(III)'],
  ['Al', 3, 'aluminium'],
];
const ANIONS: [string, number, string, boolean][] = [
  ['Cl', 1, 'chloride', false],
  ['NO3', 1, 'nitrate', true],
  ['SO4', 2, 'sulfate', true],
  ['CO3', 2, 'carbonate', true],
  ['PO4', 3, 'phosphate', true],
];
// t: dễ tan, i: ít tan, k: không tan, -: không tồn tại / bị nước phân huỷ
const SOLT = ['ttkttttitttt', 'tttttttttttt', 'ttitiktktttt', 'ttkkkkkk-k--', 'ttkkkkkkkkkk'];
const ROMAN = ['', 'I', 'II', 'III'];
const SUBD = '₀₁₂₃₄₅₆₇₈₉';
const sub = (n: number) => (n > 1 ? String(n).replace(/[0-9]/g, (d) => SUBD[Number(d)]) : '');

function saltFormula(ci: number, ai: number) {
  const [m, vm] = CATIONS[ci];
  const [a, va, , poly] = ANIONS[ai];
  const g = (x: number, y: number): number => (y ? g(y, x % y) : x);
  const k = g(vm, va);
  const nm = va / k;
  const na = vm / k;
  const an = a.replace(/[0-9]/g, (d) => SUBD[Number(d)]);
  return `${m}${sub(nm)}${na > 1 ? (poly ? `(${an})${sub(na)}` : `${an}${sub(na)}`) : an}`;
}

export function SolTableView({ doc, onDoc, showValues }: EngineProps<SolTableDoc, unknown>) {
  const cw = 80;
  const ch = 82;
  const x0 = 150;
  const y0 = 150;
  const key = (r: number, c: number) => `${r}-${c}`;
  const sel = doc.sel;
  const info = sel ? { f: saltFormula(sel[1], sel[0]), name: `${CATIONS[sel[1]][2]} ${ANIONS[sel[0]][2]}`, s: SOLT[sel[0]][sel[1]] } : null;
  const word = (s: string) => (s === 't' ? 'dễ tan trong nước' : s === 'i' ? 'ít tan' : s === 'k' ? 'không tan' : 'không tồn tại hoặc bị nước phân huỷ');
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <text x={600} y={50} textAnchor="middle" className="lab-label">
            Bảng tính tan trong nước của một số muối – bấm vào ô để xem
          </text>
          {CATIONS.map(([m, v], c) => (
            <g key={c}>
              <rect x={x0 + c * cw} y={y0 - 70} width={cw} height={70} fill="#e0c8ef" stroke="#fff" />
              <text x={x0 + c * cw + cw / 2} y={y0 - 38} textAnchor="middle" fontWeight={800} fontSize={22} fill="#3b1d52">
                {m}
              </text>
              <text x={x0 + c * cw + cw / 2} y={y0 - 12} textAnchor="middle" fontSize={16} fill="#3b1d52">
                {ROMAN[v]}
              </text>
            </g>
          ))}
          {ANIONS.map(([a, v], r) => (
            <g key={r}>
              <rect x={x0 - 130} y={y0 + r * ch} width={130} height={ch} fill="#e0c8ef" stroke="#fff" />
              <text x={x0 - 65} y={y0 + r * ch + ch / 2 + 8} textAnchor="middle" fontWeight={800} fontSize={22} fill="#3b1d52">
                {(v === 1 ? '−' : v === 2 ? '=' : '≡') + a.replace(/[0-9]/g, (d) => SUBD[Number(d)])}
              </text>
              {CATIONS.map((_, c) => {
                const s = SOLT[r][c];
                const k = key(r, c);
                const vis = showValues || doc.revealed.includes(k);
                const on = sel && sel[0] === r && sel[1] === c;
                return (
                  <g key={c} className="draggable" onPointerDown={() => onDoc({ ...doc, sel: [r, c], revealed: doc.revealed.includes(k) ? doc.revealed : [...doc.revealed, k] })}>
                    <rect x={x0 + c * cw} y={y0 + r * ch} width={cw} height={ch} fill={!vis ? 'var(--surface)' : s === 't' ? '#dcfce7' : s === 'i' ? '#fef3c7' : s === 'k' ? '#fee2e2' : '#e5e7eb'} stroke={on ? 'var(--accent)' : 'var(--line)'} strokeWidth={on ? 4 : 1} />
                    <text x={x0 + c * cw + cw / 2} y={y0 + r * ch + ch / 2 + 10} textAnchor="middle" fontSize={28} fontWeight={800} fill="var(--ink)">
                      {vis ? (s === '-' ? '–' : s) : '?'}
                    </text>
                  </g>
                );
              })}
            </g>
          ))}
          <text x={x0 - 130} y={600} className="tick-small">
            t: dễ tan · i: ít tan (độ tan nhỏ hơn 1 g/100 g nước) · k: không tan (độ tan nhỏ hơn 0,01 g/100 g nước) · –: không tồn tại hoặc bị nước phân huỷ
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Tính tan của muối</h3>
        {info ? (
          <div className="insp-row">
            <div className="tag big-f">{info.s === '-' ? '–' : info.f}</div>
            <p>
              <b>{info.name}</b>
            </p>
            <p>{word(info.s)}</p>
          </div>
        ) : (
          <p className="small">Chọn một ô để xem công thức, tên gọi và tính tan của muối.</p>
        )}
        <p className="small muted">Tên muối = tên kim loại (kèm hoá trị nếu kim loại có nhiều hoá trị) + tên gốc acid. Ví dụ: Fe₂(SO₄)₃ – iron(III) sulfate.</p>
        <button className="btn" onClick={() => onDoc({ ...doc, revealed: [], sel: undefined })}>
          Che lại các ô
        </button>
      </aside>
    </div>
  );
}

// ---------------- Dãy hoạt động hoá học ----------------

export interface ActivityDoc {
  mode: 'activity';
  metal: string;
  salt: string;
}

const SERIES = ['K', 'Na', 'Ca', 'Mg', 'Al', 'Zn', 'Fe', 'Pb', 'H', 'Cu', 'Ag', 'Au'];
const SALT_OF: Record<string, string> = { Mg: 'MgSO₄', Al: 'AlCl₃', Zn: 'ZnSO₄', Fe: 'FeSO₄', Pb: 'Pb(NO₃)₂', Cu: 'CuSO₄', Ag: 'AgNO₃' };
const WATER_EQ: Record<string, string> = { K: '2K + 2H₂O → 2KOH + H₂↑', Na: '2Na + 2H₂O → 2NaOH + H₂↑', Ca: 'Ca + 2H₂O → Ca(OH)₂ + H₂↑' };
const ACID_EQ: Record<string, string> = { Mg: 'Mg + 2HCl → MgCl₂ + H₂↑', Al: '2Al + 6HCl → 2AlCl₃ + 3H₂↑', Zn: 'Zn + 2HCl → ZnCl₂ + H₂↑', Fe: 'Fe + 2HCl → FeCl₂ + H₂↑', Pb: 'Pb + 2HCl → PbCl₂ + H₂↑ (rất chậm)' };
const SALT_EQ: Record<string, string> = {
  'Mg-CuSO₄': 'Mg + CuSO₄ → MgSO₄ + Cu',
  'Zn-CuSO₄': 'Zn + CuSO₄ → ZnSO₄ + Cu',
  'Fe-CuSO₄': 'Fe + CuSO₄ → FeSO₄ + Cu',
  'Al-CuSO₄': '2Al + 3CuSO₄ → Al₂(SO₄)₃ + 3Cu',
  'Cu-AgNO₃': 'Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag',
  'Zn-AgNO₃': 'Zn + 2AgNO₃ → Zn(NO₃)₂ + 2Ag',
  'Fe-AgNO₃': 'Fe + 2AgNO₃ → Fe(NO₃)₂ + 2Ag',
  'Mg-AgNO₃': 'Mg + 2AgNO₃ → Mg(NO₃)₂ + 2Ag',
  'Zn-FeSO₄': 'Zn + FeSO₄ → ZnSO₄ + Fe',
  'Mg-FeSO₄': 'Mg + FeSO₄ → MgSO₄ + Fe',
  'Mg-ZnSO₄': 'Mg + ZnSO₄ → MgSO₄ + Zn',
  'Al-FeSO₄': '2Al + 3FeSO₄ → Al₂(SO₄)₃ + 3Fe',
  'Zn-Pb(NO₃)₂': 'Zn + Pb(NO₃)₂ → Zn(NO₃)₂ + Pb',
  'Fe-Pb(NO₃)₂': 'Fe + Pb(NO₃)₂ → Fe(NO₃)₂ + Pb',
  'Pb-CuSO₄': 'Pb + CuSO₄ → PbSO₄ + Cu',
  'Pb-AgNO₃': 'Pb + 2AgNO₃ → Pb(NO₃)₂ + 2Ag',
  'Al-ZnSO₄': '2Al + 3ZnSO₄ → Al₂(SO₄)₃ + 3Zn',
  'Mg-AlCl₃': '3Mg + 2AlCl₃ → 3MgCl₂ + 2Al',
  'Al-Pb(NO₃)₂': '2Al + 3Pb(NO₃)₂ → 2Al(NO₃)₃ + 3Pb',
  'Mg-Pb(NO₃)₂': 'Mg + Pb(NO₃)₂ → Mg(NO₃)₂ + Pb',
  'Al-AgNO₃': 'Al + 3AgNO₃ → Al(NO₃)₃ + 3Ag',
  'Cu-': '',
};

export function ActivityView({ doc, onDoc, showValues }: EngineProps<ActivityDoc, unknown>) {
  const i = SERIES.indexOf(doc.metal);
  const iH = SERIES.indexOf('H');
  const saltMetal = Object.keys(SALT_OF).find((k) => SALT_OF[k] === doc.salt) ?? 'Cu';
  const j = SERIES.indexOf(saltMetal);
  const water = i <= 2;
  const acid = i < iH;
  const strong = i <= 2;
  const displace = !strong && i < j;
  const rows: { q: string; ok: boolean; eq?: string; why: string }[] = [
    { q: 'Tác dụng với nước ở điều kiện thường?', ok: water, eq: WATER_EQ[doc.metal], why: water ? 'Kim loại hoạt động hoá học mạnh (K, Na, Ca…) tác dụng với nước tạo base và khí hydrogen.' : 'Không phản ứng với nước ở điều kiện thường.' },
    { q: 'Tác dụng với dung dịch HCl, H₂SO₄ loãng?', ok: acid, eq: water ? undefined : ACID_EQ[doc.metal], why: acid ? 'Kim loại đứng trước H đẩy được hydrogen ra khỏi dung dịch acid.' : 'Kim loại đứng sau H không phản ứng với dung dịch HCl, H₂SO₄ loãng.' },
    {
      q: `Đẩy ${saltMetal} ra khỏi dung dịch ${doc.salt}?`,
      ok: displace,
      eq: SALT_EQ[`${doc.metal}-${doc.salt}`],
      why: strong ? 'K, Na, Ca… phản ứng với nước trong dung dịch trước nên không đẩy kim loại ra khỏi muối.' : displace ? `${doc.metal} đứng trước ${saltMetal} trong dãy hoạt động.` : doc.metal === saltMetal ? 'Cùng một kim loại.' : `${doc.metal} đứng sau ${saltMetal} nên không đẩy được.`,
    },
  ];
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          {ARROW}
          <text x={600} y={50} textAnchor="middle" className="lab-label">
            Dãy hoạt động hoá học – mức độ hoạt động giảm dần từ trái sang phải
          </text>
          {SERIES.map((m, k) => {
            const x = 70 + k * 96;
            const on = m === doc.metal;
            const isH = m === 'H';
            return (
              <g key={m} className={isH ? undefined : 'draggable'} onPointerDown={() => !isH && onDoc({ ...doc, metal: m })}>
                <rect x={x - 40} y={90} width={80} height={80} rx={14} fill={on ? 'var(--accent)' : isH ? '#e0f2fe' : k <= 2 ? '#fde2e2' : k < iH ? '#fef3c7' : '#e5e7eb'} stroke={on ? 'var(--accent)' : 'var(--line)'} strokeWidth={2} />
                <text x={x} y={142} textAnchor="middle" fontSize={32} fontWeight={900} fill={on ? '#fff' : isH ? '#0369a1' : 'var(--ink)'}>
                  {m}
                </text>
              </g>
            );
          })}
          <path d="M 40 196 L 1160 196" stroke="var(--ink-2)" strokeWidth={3} markerEnd="url(#arrowP)" />
          <text x={180} y={226} textAnchor="middle" className="tick-small">
            hoạt động mạnh
          </text>
          <text x={1060} y={226} textAnchor="middle" className="tick-small">
            hoạt động yếu
          </text>
          {rows.map((r, k) => (
            <g key={k} transform={`translate(70 ${270 + k * 128})`}>
              <rect width={1060} height={112} rx={14} fill="var(--surface)" stroke="var(--line)" />
              <text x={24} y={38} className="lab-label">
                {r.q}
              </text>
              <circle cx={1010} cy={56} r={30} fill={!showValues ? 'var(--surface-2)' : r.ok ? '#dcfce7' : '#fee2e2'} />
              <text x={1010} y={68} textAnchor="middle" fontSize={34} fontWeight={900} fill={!showValues ? 'var(--muted)' : r.ok ? 'var(--ok)' : 'var(--danger)'}>
                {!showValues ? '?' : r.ok ? '✓' : '✗'}
              </text>
              <text x={24} y={72} className="lab-small">
                {showValues ? r.why : 'Dự đoán dựa vào vị trí của kim loại trong dãy hoạt động.'}
              </text>
              {showValues && r.ok && r.eq && (
                <text x={24} y={100} fontSize={19} fontWeight={700} fill="var(--accent)">
                  {r.eq}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Dự đoán phản ứng của kim loại</h3>
        <p className="small">Bấm vào một kim loại trong dãy để dự đoán khả năng phản ứng với nước, dung dịch acid và dung dịch muối.</p>
        <Row label="Dung dịch muối">
          <Seg value={doc.salt} options={Object.values(SALT_OF)} onChange={(s) => onDoc({ ...doc, salt: s })} />
        </Row>
        <p className="small muted">Ý nghĩa: kim loại đứng trước (trừ K, Na, Ca…) đẩy được kim loại đứng sau ra khỏi dung dịch muối; kim loại đứng trước H tác dụng với dung dịch acid giải phóng H₂.</p>
      </aside>
    </div>
  );
}

// ---------------- Lò cao, lò thổi, điện phân ----------------

export interface FurnaceDoc {
  mode: 'furnace';
  kind: 'blast' | 'converter' | 'electro';
  sel: number;
}

const BLAST_ZONES = [
  { t: 'Nạp nguyên liệu', d: 'Quặng sắt (hematite, chứa Fe₂O₃), than cốc, chất tạo xỉ (đá vôi CaCO₃, SiO₂…) đưa vào qua miệng lò, chuyển dần từ trên xuống.', eq: '', y: 130 },
  { t: 'Khí CO khử oxide sắt', d: 'Khí CO đi lên, khử iron(III) oxide thành sắt.', eq: 'Fe₂O₃ + 3CO →(t°) 2Fe + 3CO₂', y: 260 },
  { t: 'Tạo khí CO', d: 'Không khí nóng thổi vào, đốt cháy than cốc tạo CO₂, rồi CO₂ tác dụng với than nóng đỏ tạo CO.', eq: 'C + O₂ →(t°) CO₂ ; C + CO₂ →(t°) 2CO', y: 400 },
  { t: 'Tạo xỉ', d: 'Đá vôi bị phân huỷ thành CaO; CaO kết hợp với SiO₂ tạo xỉ nhẹ, nổi lên trên gang lỏng và được tháo ra ở cửa tháo xỉ.', eq: 'CaO + SiO₂ →(t°) CaSiO₃', y: 500 },
  { t: 'Gang lỏng', d: 'Sắt nóng chảy hoà tan một lượng nhỏ carbon và một số nguyên tố khác tạo thành gang, tháo ra ở cửa tháo gang.', eq: '', y: 580 },
];

export function FurnaceView({ doc, onDoc, showValues }: EngineProps<FurnaceDoc, unknown>) {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setT((v) => (v + 1) % 1000), 60);
    return () => window.clearInterval(id);
  }, []);
  if (doc.kind === 'electro') {
    return (
      <div className="eng">
        <div className="eng-stage lab-bg">
          <svg viewBox="0 0 1200 680" className="eng-svg">
            <rect x={250} y={200} width={700} height={400} rx={10} fill="#1f6f78" />
            <rect x={280} y={220} width={640} height={360} fill="#2a2f35" />
            <rect x={280} y={260} width={640} height={250} fill="#f2c27b" />
            <rect x={280} y={510} width={640} height={70} fill="#cfd5db" />
            {[420, 560, 700].map((x) => (
              <g key={x}>
                <rect x={x - 22} y={100} width={44} height={290} fill="#1d2b3a" />
                {Array.from({ length: 4 }, (_, k) => <circle key={k} className="bubble" cx={x - 20 + k * 13} cy={380} r={5} style={{ ['--rise' as string]: '-120px', animationDelay: `${k * 0.3}s`, animationDuration: '1.6s' }} />)}
              </g>
            ))}
            <rect x={400} y={90} width={320} height={14} fill="#d62828" />
            <text x={740} y={100} className="lab-label" style={{ fill: '#d62828' }}>
              + Cực dương bằng than chì
            </text>
            <rect x={280} y={578} width={640} height={10} fill="#1d2b3a" />
            <text x={600} y={630} textAnchor="middle" className="lab-label" style={{ fill: '#1d4fd8' }}>
              − Cực âm: lớp than chì lót đáy bể
            </text>
            {Array.from({ length: 16 }, (_, k) => {
              const ph = ((t * 2 + k * 60) % 300) / 300;
              const al = k % 2 === 0;
              const x = 320 + ((k * 73) % 580);
              const y = al ? 300 + ph * 200 : 480 - ph * 200;
              return (
                <g key={k}>
                  <circle cx={x} cy={y} r={14} fill={al ? '#9aa3ab' : '#e5383b'} />
                  <text x={x} y={y + 5} textAnchor="middle" fontSize={11} fontWeight={800} fill="#fff">
                    {al ? 'Al³⁺' : 'O²⁻'}
                  </text>
                </g>
              );
            })}
            <text x={600} y={548} textAnchor="middle" className="lab-label">
              Nhôm nóng chảy (thu ở đáy bể)
            </text>
            <text x={290} y={290} className="lab-small">
              Al₂O₃ + cryolite nóng chảy
            </text>
            {showValues && (
              <text x={600} y={50} textAnchor="middle" fontSize={30} fontWeight={800} fill="var(--ink)">
                2Al₂O₃ →(điện phân nóng chảy, cryolite) 4Al + 3O₂
              </text>
            )}
          </svg>
        </div>
        <aside className="eng-side">
          <h3>Sản xuất nhôm</h3>
          <Row label="Quy trình">
            <Seg value={doc.kind} options={['blast', 'converter', 'electro'] as const} onChange={(k) => onDoc({ ...doc, kind: k, sel: 0 })} fmtOpt={(k) => (k === 'blast' ? 'Lò cao (gang)' : k === 'converter' ? 'Lò thổi (thép)' : 'Điện phân (nhôm)')} />
          </Row>
          <p className="small">Nguyên liệu: quặng bauxite (thành phần chính Al₂O₃). Điện phân aluminium oxide nóng chảy; ion Al³⁺ về cực âm tạo nhôm, ion O²⁻ về cực dương tạo khí oxygen.</p>
          <p className="small">Cryolite được thêm vào để hạ nhiệt độ nóng chảy của Al₂O₃, tiết kiệm năng lượng.</p>
          <p className="small muted">Oxygen sinh ra đốt cháy dần cực dương bằng than chì, nên phải thay cực dương định kì.</p>
        </aside>
      </div>
    );
  }
  if (doc.kind === 'converter') {
    return (
      <div className="eng">
        <div className="eng-stage lab-bg">
          <svg viewBox="0 0 1200 680" className="eng-svg">
            <path d="M 420 140 L 480 60 L 720 60 L 780 140 L 800 560 Q 600 640 400 560 Z" fill="#f08a24" stroke="#9a4a0a" strokeWidth={6} />
            <path d="M 440 200 L 760 200 L 770 540 Q 600 600 430 540 Z" fill="#c9ced6" />
            <path d="M 440 330 L 760 330 L 770 540 Q 600 600 430 540 Z" fill="#ff7b00" opacity={0.85} />
            <text x={600} y={460} textAnchor="middle" fontSize={26} fontWeight={800} fill="#fff">
              Gang lỏng → thép
            </text>
            <rect x={800} y={420} width={200} height={40} fill="#2f9e44" />
            <text x={1010} y={400} className="lab-label">
              Khí oxygen
            </text>
            {Array.from({ length: 12 }, (_, k) => {
              const ph = ((t * 3 + k * 40) % 200) / 200;
              return <circle key={k} cx={470 + k * 26} cy={530 - ph * 220} r={6} fill="#fff" opacity={1 - ph} />;
            })}
            {Array.from({ length: 6 }, (_, k) => {
              const ph = ((t * 2 + k * 50) % 200) / 200;
              return (
                <text key={k} x={520 + k * 30} y={50 - ph * 40} className="tick-small" opacity={1 - ph}>
                  {k % 2 ? 'CO₂' : 'SO₂'}
                </text>
              );
            })}
            <rect x={440} y={300} width={320} height={30} fill="#8a7a64" />
            <text x={600} y={322} textAnchor="middle" fontSize={18} fontWeight={700} fill="#fff">
              xỉ (SiO₂, MnO₂…)
            </text>
          </svg>
        </div>
        <aside className="eng-side">
          <h3>Sản xuất thép (lò thổi)</h3>
          <Row label="Quy trình">
            <Seg value={doc.kind} options={['blast', 'converter', 'electro'] as const} onChange={(k) => onDoc({ ...doc, kind: k, sel: 0 })} fmtOpt={(k) => (k === 'blast' ? 'Lò cao (gang)' : k === 'converter' ? 'Lò thổi (thép)' : 'Điện phân (nhôm)')} />
          </Row>
          <p className="small">Nguyên liệu: gang (hoặc thép phế liệu) và khí oxygen. Oxygen thổi vào gang nóng chảy, đốt cháy các tạp chất C, Si, Mn, S…</p>
          <p className="small">Oxide dạng khí (CO₂, SO₂…) thoát ra theo khí thải; oxide dạng rắn (SiO₂, MnO₂…) tạo xỉ nổi lên trên và được tách ra – thu được thép.</p>
          <p className="small muted">Giảm hàm lượng carbon và tạp chất trong gang thì thu được thép.</p>
        </aside>
      </div>
    );
  }
  const z = BLAST_ZONES[doc.sel];
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          {ARROW}
          <path d="M 470 80 L 400 220 L 380 440 L 420 560 L 420 640 L 780 640 L 780 560 L 820 440 L 800 220 L 730 80 Z" fill="#3a3f47" stroke="#20a4a4" strokeWidth={10} />
          <path d="M 560 60 L 600 30 L 640 60 Z" fill="#e9c46a" stroke="#555" strokeWidth={3} />
          <rect x={430} y={540} width={340} height={40} fill="#8a7a64" />
          <rect x={430} y={580} width={340} height={55} fill="#ff7b00" />
          <text x={600} y={566} textAnchor="middle" fontSize={16} fontWeight={700} fill="#fff">
            xỉ
          </text>
          <text x={600} y={614} textAnchor="middle" fontSize={18} fontWeight={800} fill="#fff">
            gang lỏng
          </text>
          {Array.from({ length: 18 }, (_, k) => {
            const ph = ((t * 1.2 + k * 37) % 400) / 400;
            return <rect key={k} x={470 + ((k * 61) % 250)} y={100 + ph * 420} width={12} height={12} fill={k % 3 === 0 ? '#222' : k % 3 === 1 ? '#a0522d' : '#eee8dc'} transform={`rotate(${k * 20} ${476 + ((k * 61) % 250)} ${106 + ph * 420})`} />;
          })}
          {Array.from({ length: 14 }, (_, k) => {
            const ph = ((t * 2 + k * 29) % 400) / 400;
            return <circle key={k} cx={480 + ((k * 47) % 240)} cy={520 - ph * 420} r={5} fill="rgba(140,200,255,0.8)" />;
          })}
          <path d="M 340 470 L 410 470" stroke="#e63946" strokeWidth={8} markerEnd="url(#arrowP)" />
          <path d="M 860 470 L 790 470" stroke="#e63946" strokeWidth={8} markerEnd="url(#arrowP)" />
          <text x={250} y={460} className="lab-small">
            Không khí nóng
          </text>
          <path d="M 420 560 L 330 560" stroke="#8a7a64" strokeWidth={8} markerEnd="url(#arrowP)" />
          <text x={210} y={570} className="lab-small">
            Cửa tháo xỉ
          </text>
          <path d="M 780 615 L 880 615" stroke="#ff7b00" strokeWidth={8} markerEnd="url(#arrowP)" />
          <text x={890} y={622} className="lab-small">
            Cửa tháo gang
          </text>
          <path d="M 740 110 L 860 70" stroke="#999" strokeWidth={8} markerEnd="url(#arrowP)" />
          <text x={870} y={70} className="lab-small">
            Khí lò cao
          </text>
          {BLAST_ZONES.map((zz, k) => (
            <g key={k} className="draggable" onPointerDown={() => onDoc({ ...doc, sel: k })}>
              <circle cx={k % 2 ? 1000 : 200} cy={zz.y} r={22} fill={k === doc.sel ? 'var(--accent)' : 'var(--surface)'} stroke="var(--accent)" strokeWidth={3} />
              <text x={k % 2 ? 1000 : 200} y={zz.y + 8} textAnchor="middle" fontWeight={900} fill={k === doc.sel ? '#fff' : 'var(--accent)'}>
                {k + 1}
              </text>
              <line x1={k % 2 ? 978 : 222} y1={zz.y} x2={k % 2 ? 800 : 400} y2={zz.y} stroke="var(--accent)" strokeDasharray="5 5" strokeWidth={2} />
            </g>
          ))}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Sản xuất gang (lò cao)</h3>
        <Row label="Quy trình">
          <Seg value={doc.kind} options={['blast', 'converter', 'electro'] as const} onChange={(k) => onDoc({ ...doc, kind: k, sel: 0 })} fmtOpt={(k) => (k === 'blast' ? 'Lò cao (gang)' : k === 'converter' ? 'Lò thổi (thép)' : 'Điện phân (nhôm)')} />
        </Row>
        <div className="insp-row">
          <div className="insp-label">
            {doc.sel + 1}. {z.t}
          </div>
          <p>{z.d}</p>
          {z.eq && <p className="obs-eq">{showValues ? z.eq : 'Phương trình: ?'}</p>}
        </div>
        <p className="small muted">Bấm các số 1 – 5 trên sơ đồ để xem từng giai đoạn. Nguyên liệu đi từ trên xuống, hỗn hợp khí đi từ dưới lên.</p>
      </aside>
    </div>
  );
}

// ---------------- Chưng cất dầu mỏ ----------------

export interface DistillDoc {
  mode: 'distill';
  sel: number;
}

const FRACTIONS = [
  { n: 'Khí hoá lỏng', T: 'dưới 40 °C', use: 'Nhiên liệu (sưởi ấm, bếp gas)', c: '#e0f2fe' },
  { n: 'Dầu nhẹ, naphtha nhẹ', T: '40 – 150 °C', use: 'Dung môi; nguyên liệu điều chế ethylene', c: '#fef9c3' },
  { n: 'Xăng', T: '40 – 180 °C', use: 'Nhiên liệu cho động cơ đốt trong (xe máy, ô tô…)', c: '#fde68a' },
  { n: 'Dầu hoả', T: '180 – 250 °C', use: 'Nhiên liệu cho động cơ phản lực', c: '#fcd34d' },
  { n: 'Dầu diesel', T: '250 – 350 °C', use: 'Nhiên liệu cho động cơ diesel và các lò nung', c: '#f59e0b' },
  { n: 'Dầu bôi trơn', T: '350 – 400 °C', use: 'Chất bôi trơn', c: '#b45309' },
  { n: 'Sáp paraffin', T: 'trên 400 °C', use: 'Sáp bóng, sáp dầu khoáng, nến', c: '#92400e' },
  { n: 'Nhựa đường', T: 'cặn', use: 'Bề mặt đường nhựa, giấy dầu lợp mái', c: '#3f2a14' },
];

export function DistillView({ doc, onDoc }: EngineProps<DistillDoc, unknown>) {
  const f = FRACTIONS[doc.sel];
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          {ARROW}
          <rect x={460} y={60} width={200} height={570} rx={30} fill="#d9dde3" stroke="#555" strokeWidth={4} />
          <text x={560} y={46} textAnchor="middle" className="lab-label">
            Tháp chưng cất
          </text>
          <rect x={200} y={560} width={160} height={70} rx={10} fill="#3a3f47" />
          <text x={280} y={600} textAnchor="middle" fill="#fff" fontWeight={800}>
            Dầu thô
          </text>
          <path d="M 360 595 L 455 595" stroke="#3a3f47" strokeWidth={10} markerEnd="url(#arrowP)" />
          <path d="M 300 650 Q 320 630 340 650" fill="#ff7b00" />
          <text x={410} y={660} textAnchor="middle" className="tick-small">
            đun nóng
          </text>
          <text x={430} y={90} textAnchor="end" className="tick-small">
            nhiệt độ thấp
          </text>
          <text x={430} y={540} textAnchor="end" className="tick-small">
            nhiệt độ cao
          </text>
          {FRACTIONS.map((fr, k) => {
            const y = 90 + k * 66;
            const on = k === doc.sel;
            return (
              <g key={k} className="draggable" onPointerDown={() => onDoc({ ...doc, sel: k })}>
                <line x1={470} x2={650} y1={y + 30} y2={y + 30} stroke="#888" strokeWidth={3} strokeDasharray="10 6" />
                <path d={`M 660 ${y + 14} L 760 ${y + 14}`} stroke="#555" strokeWidth={8} markerEnd="url(#arrowP)" />
                <rect x={770} y={y - 10} width={380} height={52} rx={10} fill={fr.c} stroke={on ? 'var(--accent)' : '#888'} strokeWidth={on ? 4 : 1.5} />
                <text x={790} y={y + 22} fontSize={20} fontWeight={800} fill={k >= 5 ? '#fff' : '#222'}>
                  {fr.n}
                </text>
                <text x={1140} y={y + 22} textAnchor="end" fontSize={15} fill={k >= 5 ? '#fff' : '#333'}>
                  {fr.T}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Các phân đoạn chưng cất dầu mỏ</h3>
        <div className="insp-row">
          <div className="tag big-f">{f.n}</div>
          <p>
            <b>Khoảng nhiệt độ sôi:</b> {f.T}
          </p>
          <p>
            <b>Ứng dụng:</b> {f.use}
          </p>
        </div>
        <p className="small">Dầu thô là hỗn hợp nhiều hydrocarbon có nhiệt độ sôi khác nhau. Khi chưng cất, các chất sôi thấp bay lên cao, các chất sôi cao ngưng tụ ở phía dưới tháp.</p>
        <p className="small muted">Khoảng nhiệt độ sôi chỉ mang tính tham khảo, khác nhau tuỳ nhà máy.</p>
      </aside>
    </div>
  );
}

// ---------------- Phân bón và sự phát triển của cây ----------------

export interface FertDoc {
  mode: 'fert';
  N: number;
  P: number;
  K: number;
}

export function FertView({ doc, onDoc, showValues }: EngineProps<FertDoc, unknown>) {
  const lvl = (v: number) => (v < 0.3 ? 'thiếu' : v > 0.8 ? 'thừa' : 'đủ');
  const good = (v: number) => Math.max(0, 1 - Math.abs(v - 0.55) * 1.6);
  const h = 120 + 200 * Math.min(good(doc.N) + 0.2, 1);
  const leafColor = doc.N < 0.3 ? '#c9c55a' : '#3a9d48';
  const roots = 30 + 90 * good(doc.P);
  const fruits = Math.round(6 * good(doc.P) * (0.4 + good(doc.K)));
  const stem = 4 + 8 * good(doc.K);
  const excess = Math.max(0, doc.N - 0.8) + Math.max(0, doc.P - 0.8) + Math.max(0, doc.K - 0.8);
  const base = 470;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <rect x={0} y={base} width={1200} height={210} fill="#8a5a2a" />
          <rect x={860} y={base} width={340} height={210} fill={excess > 0.1 ? `rgba(80,${150 - excess * 60},90,1)` : '#3a86c8'} />
          {excess > 0.1 && Array.from({ length: Math.round(excess * 30) }, (_, k) => <circle key={k} cx={880 + ((k * 53) % 300)} cy={base + 10 + ((k * 37) % 40)} r={6} fill="#5c8f2a" />)}
          <text x={1030} y={base + 120} textAnchor="middle" fill="#fff" fontWeight={800}>
            {excess > 0.1 ? 'Sông, hồ bị ô nhiễm (tảo phát triển)' : 'Sông, hồ'}
          </text>
          {/* rễ */}
          {Array.from({ length: 7 }, (_, k) => (
            <path key={k} d={`M 400 ${base} q ${(k - 3) * 14} ${roots * 0.5} ${(k - 3) * 22} ${roots}`} stroke="#e8d3a2" strokeWidth={3} fill="none" />
          ))}
          {/* thân */}
          <path d={`M 400 ${base} L 400 ${base - h}`} stroke="#3a7d2c" strokeWidth={stem} />
          {Array.from({ length: 5 }, (_, k) => {
            const y = base - h * (0.25 + k * 0.15);
            const s = k % 2 ? 1 : -1;
            return <path key={k} d={`M 400 ${y} q ${s * 50} -30 ${s * (60 + 30 * good(doc.N))} -6 q ${-s * 40} 20 ${-s * (60 + 30 * good(doc.N))} 6 Z`} fill={leafColor} />;
          })}
          {Array.from({ length: fruits }, (_, k) => (
            <circle key={k} cx={400 + (k % 2 ? 26 : -26)} cy={base - h * (0.3 + k * 0.1)} r={10} fill="#e63946" />
          ))}
          <circle cx={400} cy={base - h - 10} r={14} fill={fruits > 2 ? '#ffd166' : leafColor} />
          {excess > 0.1 && (
            <g>
              {Array.from({ length: 6 }, (_, k) => (
                <path key={k} className="jet" d={`M ${560 + k * 50} ${base + 40} q 80 10 ${300 - k * 30} 20`} stroke="#9ad" strokeWidth={3} fill="none" />
              ))}
              <text x={680} y={base + 100} textAnchor="middle" fill="#fff" fontWeight={700}>
                phân bón dư thừa bị rửa trôi
              </text>
            </g>
          )}
          <text x={600} y={50} textAnchor="middle" className="lab-label">
            Nitrogen: {lvl(doc.N)} · Phosphorus: {lvl(doc.P)} · Potassium: {lvl(doc.K)}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Vai trò của N, P, K</h3>
        <Row label="Phân đạm (N)">
          <Slider value={doc.N} min={0} max={1} step={0.05} digits={2} onChange={(v) => onDoc({ ...doc, N: v })} />
        </Row>
        <Row label="Phân lân (P)">
          <Slider value={doc.P} min={0} max={1} step={0.05} digits={2} onChange={(v) => onDoc({ ...doc, P: v })} />
        </Row>
        <Row label="Phân kali (K)">
          <Slider value={doc.K} min={0} max={1} step={0.05} digits={2} onChange={(v) => onDoc({ ...doc, K: v })} />
        </Row>
        {showValues ? (
          <ul className="small">
            <li>
              <b>N</b>: cây sinh trưởng, phát triển thân, lá; thiếu N lá vàng, cây còi cọc.
            </li>
            <li>
              <b>P</b>: phát triển bộ rễ, ra hoa, đậu quả.
            </li>
            <li>
              <b>K</b>: cây cứng cáp, hút nước tốt, chịu lạnh.
            </li>
            <li>Bón quá nhiều: phân dư thừa bị rửa trôi gây ô nhiễm đất, nước – cần bón theo quy tắc “4 đúng”: đúng liều, đúng loại, đúng lúc, đúng nơi.</li>
          </ul>
        ) : (
          <p className="small muted">Thay đổi lượng phân và quan sát cây. Dự đoán vai trò của từng nguyên tố.</p>
        )}
      </aside>
    </div>
  );
}

// ---------------- Tính dẫn điện: kim loại và phi kim ----------------

export interface ConductDoc {
  mode: 'conduct';
  mat: string;
}

const MATS: Record<string, { n: string; cond: number; color: string; kind: 'metal' | 'nonmetal' | 'other'; mp: string; D: string }> = {
  cu: { n: 'Đồng (Cu)', cond: 1, color: '#c8743a', kind: 'metal', mp: '1 085 °C', D: '8,96 g/cm³' },
  al: { n: 'Nhôm (Al)', cond: 0.95, color: '#c9ced4', kind: 'metal', mp: '660 °C', D: '2,70 g/cm³' },
  fe: { n: 'Sắt (Fe)', cond: 0.8, color: '#7a8088', kind: 'metal', mp: '1 538 °C', D: '7,87 g/cm³' },
  graphite: { n: 'Than chì (C)', cond: 0.55, color: '#2b2b2b', kind: 'nonmetal', mp: 'thăng hoa ~3 650 °C', D: '2,2 g/cm³' },
  si: { n: 'Silicon (Si)', cond: 0.15, color: '#6d7c8c', kind: 'nonmetal', mp: '1 414 °C', D: '2,33 g/cm³' },
  s: { n: 'Lưu huỳnh (S)', cond: 0, color: '#f4d03f', kind: 'nonmetal', mp: '115 °C', D: '2,07 g/cm³' },
  glass: { n: 'Thuỷ tinh', cond: 0, color: 'rgba(200,230,250,0.8)', kind: 'other', mp: '—', D: '~2,5 g/cm³' },
  plastic: { n: 'Nhựa', cond: 0, color: '#e76f51', kind: 'other', mp: '—', D: '~1 g/cm³' },
};

export function ConductView({ doc, onDoc, showValues }: EngineProps<ConductDoc, unknown>) {
  const m = MATS[doc.mat];
  const b = m.cond;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <path d="M 300 420 L 300 200 L 520 200 M 680 200 L 900 200 L 900 420 M 300 420 L 420 420 M 780 420 L 900 420" fill="none" stroke="#d62828" strokeWidth={6} />
          <rect x={240} y={260} width={120} height={60} rx={8} fill="#2b2b2b" />
          <rect x={240} y={260} width={40} height={60} rx={8} fill="#f2b705" />
          <text x={300} y={350} textAnchor="middle" className="lab-small">
            Pin
          </text>
          <circle cx={600} cy={190} r={66} fill={b > 0 ? `rgba(255,${200 + 40 * b},${80 + 60 * (1 - b)},${0.3 + 0.7 * b})` : 'rgba(240,240,240,0.6)'} stroke="#888" strokeWidth={3} />
          {b > 0 && <circle cx={600} cy={190} r={66 + 50 * b} fill={`rgba(255,230,120,${0.25 * b})`} />}
          <rect x={570} y={250} width={60} height={30} fill="#aaa" />
          <path d="M 520 200 L 570 255 M 680 200 L 630 255" stroke="#d62828" strokeWidth={6} />
          <rect x={420} y={395} width={360} height={50} rx={8} fill={m.color} stroke="#555" strokeWidth={2} />
          <text x={600} y={500} textAnchor="middle" className="lab-label">
            Mẫu thử: {m.n}
          </text>
          <text x={600} y={60} textAnchor="middle" className="lab-label">
            {!showValues ? 'Đèn có sáng không?' : b > 0.5 ? 'Đèn sáng: mẫu dẫn điện tốt' : b > 0.05 ? 'Đèn sáng yếu: mẫu dẫn điện kém' : 'Đèn không sáng: mẫu không dẫn điện'}
          </text>
          <g transform="translate(150 560)">
            <rect width={900} height={90} rx={12} fill="var(--surface)" stroke="var(--line)" />
            <text x={20} y={36} className="lab-small">
              Nhiệt độ nóng chảy: {showValues ? m.mp : '?'}
            </text>
            <text x={20} y={70} className="lab-small">
              Khối lượng riêng: {showValues ? m.D : '?'}
            </text>
            <text x={520} y={54} className="lab-label">
              {showValues ? (m.kind === 'metal' ? 'Kim loại' : m.kind === 'nonmetal' ? 'Phi kim' : 'Vật liệu khác') : ''}
            </text>
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Tính dẫn điện</h3>
        <Row label="Mẫu thử">
          <div className="seg wrap">
            {Object.entries(MATS).map(([k, v]) => (
              <button key={k} className={k === doc.mat ? 'on' : ''} onClick={() => onDoc({ ...doc, mat: k })}>
                {v.n}
              </button>
            ))}
          </div>
        </Row>
        <p className="small">Kim loại dẫn điện tốt. Phần lớn phi kim không dẫn điện; than chì dẫn điện nhưng kém hơn kim loại; silicon tinh khiết là chất bán dẫn.</p>
        <p className="small muted">Phần lớn phi kim có nhiệt độ nóng chảy, nhiệt độ sôi và khối lượng riêng nhỏ hơn kim loại.</p>
      </aside>
    </div>
  );
}

// ---------------- Thành phần vỏ Trái Đất ----------------

export interface CrustDoc {
  mode: 'crust';
  chart: 'pie' | 'bar';
}

const CRUST: [string, number, string][] = [
  ['O', 46.1, '#e5383b'],
  ['Si', 28.2, '#d9a066'],
  ['Al', 8.23, '#9aa3ab'],
  ['Fe', 5.63, '#c76d2e'],
  ['Ca', 4.15, '#7cc46a'],
  ['Na', 2.36, '#8e5bd6'],
  ['Mg', 2.33, '#2a9d8f'],
  ['K', 2.09, '#e9c46a'],
  ['Khác', 0.91, '#cbd5e1'],
];

export function CrustView({ doc, onDoc, showValues }: EngineProps<CrustDoc, unknown>) {
  const [sel, setSel] = useState(-1);
  let acc = 0;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <text x={600} y={50} textAnchor="middle" className="lab-label">
            Thành phần phần trăm về khối lượng các nguyên tố trong vỏ Trái Đất
          </text>
          {doc.chart === 'pie'
            ? CRUST.map(([el, v, c], i) => {
                const a0 = (acc / 100) * Math.PI * 2 - Math.PI / 2;
                acc += v;
                const a1 = (acc / 100) * Math.PI * 2 - Math.PI / 2;
                const r = i === sel ? 250 : 236;
                const cx = 460;
                const cy = 370;
                const large = a1 - a0 > Math.PI ? 1 : 0;
                const am = (a0 + a1) / 2;
                return (
                  <g key={el} className="draggable" onPointerDown={() => setSel(i)}>
                    <path d={`M ${cx} ${cy} L ${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)} A ${r} ${r} 0 ${large} 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} Z`} fill={c} stroke="var(--board)" strokeWidth={2} />
                    {v > 4 && (
                      <text x={cx + r * 0.65 * Math.cos(am)} y={cy + r * 0.65 * Math.sin(am) + 8} textAnchor="middle" fontWeight={900} fontSize={24} fill="#fff">
                        {el}
                      </text>
                    )}
                  </g>
                );
              })
            : CRUST.map(([el, v, c], i) => {
                const x = 120 + i * 80;
                const h = (v / 50) * 440;
                return (
                  <g key={el} className="draggable" onPointerDown={() => setSel(i)}>
                    <rect x={x} y={580 - h} width={60} height={h} fill={c} stroke={i === sel ? 'var(--ink)' : 'none'} strokeWidth={3} />
                    <text x={x + 30} y={610} textAnchor="middle" fontWeight={800} fill="var(--ink)">
                      {el}
                    </text>
                    <text x={x + 30} y={570 - h} textAnchor="middle" className="tick-small">
                      {showValues ? fmtShort(v, 2) : '?'}
                    </text>
                  </g>
                );
              })}
          <g transform="translate(860 120)">
            {CRUST.map(([el, v, c], i) => (
              <g key={el} transform={`translate(0 ${i * 48})`} className="draggable" onPointerDown={() => setSel(i)}>
                <rect width={30} height={30} rx={6} fill={c} />
                <text x={44} y={23} fontSize={22} fontWeight={i === sel ? 900 : 600} fill="var(--ink)">
                  {el}: {showValues || i === sel ? `${fmt(v, 2)} %` : '?'}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Vỏ Trái Đất</h3>
        <Row label="Biểu đồ">
          <Seg value={doc.chart} options={['pie', 'bar'] as const} onChange={(c) => onDoc({ ...doc, chart: c })} fmtOpt={(c) => (c === 'pie' ? 'Hình tròn' : 'Cột')} />
        </Row>
        <p className="small">Oxygen và silicon chiếm gần 3/4 khối lượng vỏ Trái Đất. Các nguyên tố chủ yếu tồn tại trong các oxide (SiO₂, Al₂O₃…) và muối (silicate, carbonate…).</p>
        <p className="small muted">Số liệu làm tròn; bấm vào từng phần để làm nổi bật.</p>
      </aside>
    </div>
  );
}

// ---------------- Chu trình carbon, hiệu ứng nhà kính ----------------

export interface CarbonDoc {
  mode: 'carbon';
  tab: 'cycle' | 'climate' | 'oil';
  sel: number;
  burn: number;
}

const CYCLE = [
  { t: 'Quang hợp', d: 'Cây xanh hấp thụ CO₂ và nước, dùng năng lượng ánh sáng tạo chất hữu cơ, giải phóng O₂.', x: 520, y: 250, out: false },
  { t: 'Hô hấp', d: 'Sinh vật hô hấp thải CO₂ vào khí quyển.', x: 470, y: 160, out: true },
  { t: 'Đốt nhiên liệu hoá thạch', d: 'Nhà máy, phương tiện giao thông, sản xuất vôi, xi măng… thải ra lượng lớn CO₂.', x: 280, y: 215, out: true },
  { t: 'Núi lửa phun trào', d: 'Phát thải CO₂ tự nhiên.', x: 110, y: 290, out: true },
  { t: 'Trao đổi CO₂ với đại dương', d: 'CO₂ hoà tan vào nước biển, sông, hồ và thoát ra trở lại.', x: 900, y: 230, out: false },
  { t: 'Phân huỷ xác sinh vật', d: 'Xác sinh vật, chất thải bị phân huỷ; bị vùi lấp lâu ngày tạo thành nhiên liệu hoá thạch, muối carbonate.', x: 400, y: 520, out: false },
  { t: 'Trầm tích', d: 'Vỏ, xương sinh vật biển lắng đọng tạo đá vôi (muối carbonate).', x: 900, y: 560, out: false },
];

const OIL: [number, number][] = [
  [1988, 23.7],
  [1992, 24.5],
  [1996, 26.2],
  [2000, 28.2],
  [2004, 30.5],
  [2008, 31.8],
  [2012, 33.2],
  [2016, 35.4],
];

export function CarbonView({ doc, onDoc, showValues }: EngineProps<CarbonDoc, unknown>) {
  const tabSeg = (
    <Row label="Nội dung">
      <Seg value={doc.tab} options={['cycle', 'climate', 'oil'] as const} onChange={(t) => onDoc({ ...doc, tab: t })} fmtOpt={(t) => (t === 'cycle' ? 'Chu trình carbon' : t === 'climate' ? 'Ấm lên toàn cầu' : 'Khai thác dầu thô')} />
    </Row>
  );
  if (doc.tab === 'oil') {
    const gx = (y: number) => 140 + ((y - 1988) / 28) * 900;
    const gy = (v: number) => 560 - ((v - 20) / 20) * 440;
    return (
      <div className="eng">
        <div className="eng-stage lab-bg">
          <svg viewBox="0 0 1200 680" className="eng-svg">
            <text x={600} y={50} textAnchor="middle" className="lab-label">
              Sản lượng khai thác dầu thô của thế giới (tỉ thùng/năm)
            </text>
            {[20, 25, 30, 35, 40].map((v) => (
              <g key={v}>
                <line x1={140} x2={1040} y1={gy(v)} y2={gy(v)} stroke="var(--line)" />
                <text x={130} y={gy(v) + 5} textAnchor="end" className="tick-small">
                  {v}
                </text>
              </g>
            ))}
            {OIL.map(([y]) => (
              <text key={y} x={gx(y)} y={590} textAnchor="middle" className="tick-small">
                {y}
              </text>
            ))}
            {showValues && <polyline points={OIL.map(([y, v]) => `${gx(y)},${gy(v)}`).join(' ')} fill="none" stroke="var(--accent)" strokeWidth={4} />}
            {OIL.map(([y, v]) => (
              <g key={y}>
                <circle cx={gx(y)} cy={gy(v)} r={7} fill="var(--accent)" />
                <text x={gx(y)} y={gy(v) - 14} textAnchor="middle" className="tick-small">
                  {fmtShort(v, 1)}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <aside className="eng-side">
          <h3>Khai thác nhiên liệu hoá thạch</h3>
          {tabSeg}
          <p className="small">Số liệu: sản lượng dầu thô thế giới 1988 – 2016 (nguồn: worldometers.info). Bật “Hiện số đo” để nối các điểm thành đồ thị.</p>
          {showValues && <p className="nature">Sản lượng khai thác tăng liên tục, trung bình khoảng 0,4 tỉ thùng mỗi năm.</p>}
          <p className="small muted">Năm 1986, tấn dầu đầu tiên được khai thác ở mỏ Bạch Hổ, đánh dấu sự phát triển của ngành dầu khí Việt Nam.</p>
        </aside>
      </div>
    );
  }
  if (doc.tab === 'climate') {
    const co2 = 300 + doc.burn * 220;
    const dT = (co2 - 300) / 100;
    return (
      <div className="eng">
        <div className="eng-stage lab-bg">
          <svg viewBox="0 0 1200 680" className="eng-svg">
            <rect x={0} y={0} width={1200} height={520} fill={`rgba(${140 + dT * 30},${200 - dT * 20},${255 - dT * 40},0.35)`} />
            <circle cx={1050} cy={110} r={60} fill="#ffc300" />
            {Array.from({ length: 4 }, (_, k) => (
              <path key={k} d={`M ${1000 - k * 40} 150 L ${500 - k * 80} 520`} stroke="#ffb703" strokeWidth={4} />
            ))}
            {Array.from({ length: Math.round(6 + doc.burn * 10) }, (_, k) => (
              <path key={k} d={`M ${300 + k * 40} 520 Q ${330 + k * 40} 300 ${290 + k * 40} 120`} stroke="#e63946" strokeWidth={3} fill="none" strokeDasharray="6 6" opacity={0.6} />
            ))}
            <rect x={0} y={90} width={1200} height={40} fill={`rgba(120,120,120,${0.1 + doc.burn * 0.5})`} />
            <text x={20} y={118} className="lab-small">
              lớp khí nhà kính (CO₂, CH₄…)
            </text>
            <rect x={0} y={520} width={1200} height={160} fill="#6a994e" />
            <rect x={760} y={520} width={440} height={160} fill="#2a7fc1" />
            <rect x={760} y={520 - dT * 12} width={440} height={dT * 12} fill="#2a7fc1" opacity={0.7} />
            {[150, 260].map((x) => (
              <g key={x} transform={`translate(${x} 470)`}>
                <rect x={-30} y={-50} width={60} height={100} fill="#8a96a3" />
                <rect x={10} y={-110} width={16} height={60} fill="#6b7480" />
                {Array.from({ length: Math.round(1 + doc.burn * 4) }, (_, k) => <circle key={k} cx={18 + k * 10} cy={-120 - k * 18} r={10 + k * 3} fill="#9aa1a8" opacity={0.7} />)}
              </g>
            ))}
            <g transform="translate(420 560)">
              <rect width={320} height={90} rx={12} fill="var(--surface)" stroke="var(--line)" />
              <text x={20} y={36} className="lab-small">
                CO₂ trong khí quyển: {showValues ? `${fmt(co2, 0)} ppm` : '?'}
              </text>
              <text x={20} y={70} className="lab-small">
                Nhiệt độ tăng thêm: {showValues ? `${fmt(dT, 1)} °C` : '?'}
              </text>
            </g>
          </svg>
        </div>
        <aside className="eng-side">
          <h3>Hiệu ứng nhà kính</h3>
          {tabSeg}
          <Row label="Mức đốt nhiên liệu hoá thạch">
            <Slider value={doc.burn} min={0} max={1} step={0.05} digits={2} onChange={(v) => onDoc({ ...doc, burn: v })} />
          </Row>
          <p className="small">CO₂ và CH₄ là nguyên nhân chính gây hiệu ứng nhà kính. Hệ quả: thời tiết cực đoan, băng tan, nước biển dâng, acid hoá nước biển, sa mạc hoá, suy giảm đa dạng sinh học.</p>
          <p className="small muted">Mô hình minh hoạ định tính, số liệu không dùng để dự báo.</p>
        </aside>
      </div>
    );
  }
  const c = CYCLE[doc.sel];
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          {ARROW}
          <rect x={0} y={0} width={1200} height={330} fill="rgba(140,200,255,0.25)" />
          <path d="M 0 330 L 760 330 Q 720 500 760 680 L 0 680 Z" fill="#8bb174" />
          <path d="M 760 330 L 1200 330 L 1200 680 L 760 680 Q 720 500 760 330 Z" fill="#2a7fc1" />
          <text x={640} y={80} textAnchor="middle" fontSize={44} fontWeight={900} fill="var(--ink)">
            CO₂
          </text>
          <path d="M 120 300 Q 300 120 600 80" fill="none" stroke="#e63946" strokeWidth={4} markerEnd="url(#arrowP)" />
          <path d="M 500 300 Q 540 180 610 100" fill="none" stroke="#e63946" strokeWidth={4} markerEnd="url(#arrowP)" />
          <path d="M 660 100 Q 600 200 560 300" fill="none" stroke="#2f9e44" strokeWidth={4} markerEnd="url(#arrowP)" />
          <path d="M 690 90 Q 900 140 920 380" fill="none" stroke="#2f9e44" strokeWidth={4} markerEnd="url(#arrowP)" />
          <path d="M 960 380 Q 940 140 700 70" fill="none" stroke="#e63946" strokeWidth={4} markerEnd="url(#arrowP)" />
          <path d="M 380 420 Q 300 520 380 600" fill="none" stroke="#e9c46a" strokeWidth={4} markerEnd="url(#arrowP)" />
          <path d="M 900 600 Q 700 650 480 620" fill="none" stroke="#e9c46a" strokeWidth={4} markerEnd="url(#arrowP)" />
          <text x={340} y={630} className="lab-small">
            Nhiên liệu hoá thạch, muối carbonate
          </text>
          {CYCLE.map((s, k) => (
            <g key={k} className="draggable" onPointerDown={() => onDoc({ ...doc, sel: k })}>
              <rect x={s.x - 100} y={s.y - 22} width={200} height={44} rx={22} fill={k === doc.sel ? 'var(--accent)' : 'var(--surface)'} stroke={s.out ? '#e63946' : '#2f9e44'} strokeWidth={3} />
              <text x={s.x} y={s.y + 7} textAnchor="middle" fontSize={16} fontWeight={800} fill={k === doc.sel ? '#fff' : 'var(--ink)'}>
                {s.t}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Chu trình carbon</h3>
        {tabSeg}
        <div className="insp-row">
          <div className="insp-label">{c.t}</div>
          <p>{c.d}</p>
        </div>
        <p className="small">Mũi tên đỏ: quá trình phát thải CO₂. Mũi tên xanh: quá trình hấp thụ CO₂.</p>
        <p className="small muted">Carbon tồn tại ở dạng đơn chất (kim cương, than chì), hợp chất vô cơ (CO₂, muối carbonate) và hợp chất hữu cơ.</p>
      </aside>
    </div>
  );
}

// ---------------- Quang hợp: tạo glucose, tinh bột, cellulose ----------------

export interface PhotoDoc {
  mode: 'photo';
  p: number;
}

export function PhotoView({ doc, onDoc, showValues }: EngineProps<PhotoDoc, unknown>) {
  const p = doc.p;
  const box = (x: number, y: number, t: string, sub: string, on: boolean, c: string) => (
    <g opacity={on ? 1 : 0.25} style={{ transition: 'opacity 0.6s' }}>
      <rect x={x - 130} y={y - 50} width={260} height={100} rx={16} fill={c} stroke="#555" strokeWidth={2} />
      <text x={x} y={y - 6} textAnchor="middle" fontSize={26} fontWeight={900} fill="#222">
        {t}
      </text>
      <text x={x} y={y + 26} textAnchor="middle" fontSize={17} fill="#333">
        {sub}
      </text>
    </g>
  );
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          {ARROW}
          <circle cx={120} cy={110} r={56} fill="#ffc300" />
          {box(250, 340, 'CO₂ + H₂O', 'từ không khí, đất', true, '#e0f2fe')}
          <path d="M 385 340 L 525 340" stroke="#2f9e44" strokeWidth={6} markerEnd="url(#arrowP)" />
          <text x={455} y={318} textAnchor="middle" className="lab-small">
            quang hợp
          </text>
          <text x={455} y={376} textAnchor="middle" className="tick-small">
            giải phóng O₂
          </text>
          {box(660, 340, 'GLUCOSE', 'C₆H₁₂O₆', p > 0.25, '#fef3c7')}
          <path d="M 790 310 L 900 200" stroke="#2f9e44" strokeWidth={6} markerEnd="url(#arrowP)" opacity={p > 0.5 ? 1 : 0.2} />
          <path d="M 790 370 L 900 480" stroke="#2f9e44" strokeWidth={6} markerEnd="url(#arrowP)" opacity={p > 0.5 ? 1 : 0.2} />
          <path d="M 905 500 L 800 395" stroke="#e76f51" strokeWidth={4} markerEnd="url(#arrowP)" opacity={p > 0.75 ? 1 : 0.2} />
          {box(1010, 170, 'CELLULOSE', 'xây dựng cấu trúc', p > 0.5, '#dcfce7')}
          {box(1010, 510, 'TINH BỘT', 'dự trữ năng lượng', p > 0.5, '#fde68a')}
          {showValues && (
            <text x={600} y={620} textAnchor="middle" fontSize={24} fontWeight={700} fill="var(--ink)">
              Thuỷ phân: (C₆H₁₀O₅)ₙ + nH₂O →(enzyme hoặc acid, t°) nC₆H₁₂O₆
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Sự tạo thành tinh bột, cellulose</h3>
        <Row label="Tiến trình">
          <Slider value={doc.p} min={0} max={1} step={0.01} digits={2} onChange={(v) => onDoc({ ...doc, p: v })} />
        </Row>
        <button className="btn primary" onClick={() => onDoc({ ...doc, p: doc.p >= 1 ? 0 : 1 })}>
          {doc.p >= 1 ? 'Về lúc đầu' : 'Xem toàn bộ'}
        </button>
        <p className="small">Cây xanh quang hợp chuyển hoá CO₂ và nước thành glucose, giải phóng O₂ – góp phần cân bằng CO₂ và O₂ trong khí quyển. Một phần glucose chuyển thành tinh bột (dự trữ năng lượng) và cellulose (tạo nên thành tế bào, bộ khung của cây).</p>
      </aside>
    </div>
  );
}

// ---------------- Bảng so sánh ----------------

export interface TableDoc {
  mode: 'table';
  set: string;
  open: string[];
}

export const TABLES: Record<string, { title: string; cols: string[]; rows: [string, ...string[]][] }> = {
  // ---------- KHTN 7 ----------
  atomParticles: {
    title: 'Các hạt cấu tạo nên nguyên tử',
    cols: ['Kí hiệu', 'Điện tích', 'Khối lượng (amu)', 'Vị trí'],
    rows: [
      ['Proton', 'p', '+1', '≈ 1', 'Trong hạt nhân'],
      ['Neutron', 'n', '0 (không mang điện)', '≈ 1', 'Trong hạt nhân'],
      ['Electron', 'e', '−1', '≈ 0,00055 (rất nhỏ)', 'Ở vỏ nguyên tử, chuyển động quanh hạt nhân theo từng lớp'],
    ],
  },
  atomsExamples: {
    title: 'Thành phần một số nguyên tử',
    cols: ['Số proton', 'Số neutron', 'Số electron', 'Khối lượng (amu)', 'Số e lớp ngoài cùng'],
    rows: [
      ['Hydrogen (H)', '1', '0', '1', '1', '1'],
      ['Helium (He)', '2', '2', '2', '4', '2'],
      ['Carbon (C)', '6', '6', '6', '12', '4'],
      ['Nitrogen (N)', '7', '7', '7', '14', '5'],
      ['Oxygen (O)', '8', '8', '8', '16', '6'],
      ['Sodium (Na)', '11', '12', '11', '23', '1'],
      ['Aluminium (Al)', '13', '14', '13', '27', '3'],
      ['Chlorine (Cl)', '17', '18', '17', '35', '7'],
      ['Calcium (Ca)', '20', '20', '20', '40', '2'],
    ],
  },
  abundance7: {
    title: 'Các nguyên tố phổ biến (phần trăm khối lượng, gần đúng)',
    cols: ['Trong vỏ Trái Đất', 'Trong cơ thể người'],
    rows: [
      ['Oxygen (O)', '46,6%', '65%'],
      ['Silicon (Si)', '27,7%', 'rất ít'],
      ['Aluminium (Al)', '8,1%', 'rất ít'],
      ['Iron (Fe)', '5,0%', '≈ 0,006%'],
      ['Calcium (Ca)', '3,6%', '1,5%'],
      ['Carbon (C)', '≈ 0,02%', '18%'],
      ['Hydrogen (H)', '≈ 0,14%', '10%'],
      ['Nitrogen (N)', 'rất ít', '3%'],
      ['Phosphorus (P)', '≈ 0,1%', '1%'],
    ],
  },
  groups7: {
    title: 'Một số nhóm nguyên tố tiêu biểu',
    cols: ['Các nguyên tố', 'Số e lớp ngoài cùng', 'Đặc điểm, ứng dụng'],
    rows: [
      ['Nhóm IA (kim loại kiềm)', 'Li, Na, K…', '1', 'Kim loại hoạt động mạnh, mềm, phản ứng mãnh liệt với nước; bảo quản trong dầu hoả.'],
      ['Nhóm IIA', 'Be, Mg, Ca…', '2', 'Kim loại; Ca có trong xương, đá vôi; Mg dùng làm pháo sáng, hợp kim nhẹ.'],
      ['Nhóm VIIA (halogen)', 'F, Cl, Br, I…', '7', 'Phi kim hoạt động mạnh; Cl₂ khử trùng nước, I bổ sung vào muối ăn, F trong kem đánh răng.'],
      ['Nhóm VIIIA (khí hiếm)', 'He, Ne, Ar, Kr…', '8 (He: 2)', 'Rất bền, hầu như không phản ứng; He bơm bóng bay, Ne đèn quảng cáo, Ar bóng đèn.'],
    ],
  },
  valence7: {
    title: 'Hoá trị của một số nguyên tố và nhóm nguyên tử',
    cols: ['Hoá trị', 'Ví dụ hợp chất'],
    rows: [
      ['H, Na, K, Ag, Cl', 'I', 'HCl, NaCl, KCl, AgCl'],
      ['O, Ca, Mg, Ba, Zn', 'II', 'H₂O, CaO, MgCl₂, BaO, ZnO'],
      ['Al', 'III', 'Al₂O₃, AlCl₃'],
      ['Fe', 'II, III', 'FeO, Fe₂O₃, FeCl₃'],
      ['Cu', 'I, II', 'Cu₂O, CuO'],
      ['C', 'II, IV', 'CO, CO₂, CH₄'],
      ['S', 'II, IV, VI', 'H₂S, SO₂, SO₃'],
      ['N', 'III, …', 'NH₃'],
      ['Nhóm OH, NO₃', 'I', 'NaOH, KNO₃'],
      ['Nhóm SO₄, CO₃', 'II', 'H₂SO₄, CaCO₃'],
      ['Nhóm PO₄', 'III', 'H₃PO₄, Na₃PO₄'],
    ],
  },
  ionicCovalent: {
    title: 'So sánh chất ion và chất cộng hoá trị',
    cols: ['Chất ion (ví dụ NaCl)', 'Chất cộng hoá trị (ví dụ H₂O, đường, CO₂)'],
    rows: [
      ['Liên kết được tạo thành do', 'Lực hút giữa ion dương và ion âm', 'Các cặp electron dùng chung giữa hai nguyên tử'],
      ['Thường tạo bởi', 'Kim loại và phi kim', 'Các phi kim với nhau'],
      ['Thể ở nhiệt độ phòng', 'Rắn', 'Rắn, lỏng hoặc khí'],
      ['Nhiệt độ sôi, nóng chảy', 'Cao, khó bay hơi', 'Thường thấp'],
      ['Dung dịch trong nước', 'Dẫn điện', 'Thường không dẫn điện'],
    ],
  },
  formulaMeaning: {
    title: 'Ý nghĩa của công thức hoá học',
    cols: ['Đơn chất hay hợp chất', 'Nguyên tố tạo nên', 'Số nguyên tử mỗi nguyên tố', 'Khối lượng phân tử'],
    rows: [
      ['O₂', 'Đơn chất', 'O', '2 O', '32 amu'],
      ['H₂O', 'Hợp chất', 'H, O', '2 H, 1 O', '18 amu'],
      ['CO₂', 'Hợp chất', 'C, O', '1 C, 2 O', '44 amu'],
      ['CaCO₃', 'Hợp chất', 'Ca, C, O', '1 Ca, 1 C, 3 O', '100 amu'],
      ['NaCl', 'Hợp chất', 'Na, Cl', '1 Na, 1 Cl', '58,5 amu'],
      ['C₁₂H₂₂O₁₁ (đường mía)', 'Hợp chất', 'C, H, O', '12 C, 22 H, 11 O', '342 amu'],
    ],
  },
  elementsLife: {
    title: 'Nguyên tố hoá học trong đời sống',
    cols: ['Kí hiệu', 'Có ở đâu, vai trò'],
    rows: [
      ['Oxygen', 'O', 'Chiếm khoảng 21% thể tích không khí; cần cho sự hô hấp và sự cháy; nguyên tố nhiều nhất trong vỏ Trái Đất và cơ thể người.'],
      ['Carbon', 'C', 'Có trong mọi cơ thể sống, than, kim cương, khí CO₂.'],
      ['Calcium', 'Ca', 'Có trong xương, răng, vỏ trứng, đá vôi.'],
      ['Iron', 'Fe', 'Có trong máu (hemoglobin), dùng làm sắt thép.'],
      ['Iodine', 'I', 'Cần cho tuyến giáp; bổ sung qua muối iodine.'],
      ['Nitrogen', 'N', 'Chiếm khoảng 78% thể tích không khí; có trong protein, phân đạm.'],
      ['Silicon', 'Si', 'Có nhiều trong cát, đất sét; làm chip máy tính, pin mặt trời.'],
    ],
  },
  // ---------- Vật lí 7 ----------
  speeds7: {
    title: 'Tốc độ (gần đúng) của một số chuyển động',
    cols: ['m/s', 'km/h'],
    rows: [
      ['Ốc sên', '≈ 0,001', '≈ 0,004'],
      ['Người đi bộ', '≈ 1,5', '≈ 5,4'],
      ['Người đi xe đạp', '≈ 4', '≈ 14,4'],
      ['Vận động viên chạy 100 m', '≈ 10', '≈ 36'],
      ['Ô tô trên đường cao tốc', '≈ 25', '≈ 90'],
      ['Máy bay chở khách', '≈ 250', '≈ 900'],
      ['Âm thanh trong không khí', '≈ 340', '≈ 1 224'],
      ['Ánh sáng', '300 000 000', '1 080 000 000'],
    ],
  },
  trafficSafety7: {
    title: 'Tốc độ và an toàn giao thông',
    cols: ['Nguy cơ', 'Cách phòng tránh'],
    rows: [
      ['Đi quá tốc độ cho phép', 'Quãng đường dừng xe dài, khó xử lí khi gặp chướng ngại vật', 'Đi đúng tốc độ ghi trên biển báo'],
      ['Không giữ khoảng cách an toàn', 'Đâm vào xe phía trước khi xe đó phanh gấp', 'Giữ khoảng cách tối thiểu theo tốc độ (60 km/h: 35 m; 80 km/h: 55 m…)'],
      ['Trời mưa, đường trơn', 'Quãng đường phanh dài hơn, xe dễ trượt', 'Giảm tốc độ, tăng khoảng cách với xe phía trước'],
      ['Dùng điện thoại khi lái xe', 'Mất tập trung, thời gian phản ứng tăng', 'Không dùng điện thoại khi đang điều khiển xe'],
      ['Uống rượu bia', 'Phản ứng chậm, mất khả năng phán đoán', 'Đã uống rượu bia thì không lái xe'],
      ['Đi bộ qua đường', 'Ước lượng sai tốc độ xe đang tới', 'Đi đúng vạch kẻ đường, quan sát kĩ, không chạy băng qua đường'],
    ],
  },
  soundLevels7: {
    title: 'Độ to của một số âm (đơn vị dB)',
    cols: ['Độ to', 'Ảnh hưởng'],
    rows: [
      ['Tiếng lá cây xào xạc', '10 dB', 'Rất nhỏ'],
      ['Tiếng nói thì thầm', '20 – 30 dB', 'Nhỏ'],
      ['Nói chuyện bình thường', '40 – 60 dB', 'Bình thường'],
      ['Đường phố đông xe', '70 – 90 dB', 'Ồn, kéo dài gây mệt mỏi, giảm thính lực'],
      ['Nhạc rất to, máy khoan', '100 – 120 dB', 'Rất ồn, có hại cho tai'],
      ['Tiếng sấm, động cơ phản lực gần', '130 dB trở lên', 'Ngưỡng đau, có thể làm tổn thương tai'],
    ],
  },
  hearingRange: {
    title: 'Giới hạn nghe của tai người và một số động vật',
    cols: ['Âm nghe được (Hz)', 'Ghi chú'],
    rows: [
      ['Người', '20 – 20 000', 'Âm dưới 20 Hz: hạ âm; trên 20 000 Hz: siêu âm'],
      ['Chó', '≈ 50 – 46 000', 'Nghe được siêu âm (còi gọi chó)'],
      ['Mèo', '≈ 45 – 64 000', 'Nghe được siêu âm'],
      ['Dơi', '≈ 2 000 – 110 000', 'Phát và nghe siêu âm để định hướng, săn mồi'],
      ['Cá heo', '≈ 150 – 150 000', 'Dùng siêu âm để giao tiếp, định vị'],
      ['Voi', '≈ 16 – 12 000', 'Giao tiếp bằng hạ âm, nghe được từ rất xa'],
    ],
  },
  magnetCompare: {
    title: 'So sánh nam châm vĩnh cửu và nam châm điện',
    cols: ['Nam châm vĩnh cửu', 'Nam châm điện'],
    rows: [
      ['Cấu tạo', 'Thanh, khối thép hoặc hợp kim đã nhiễm từ', 'Ống dây dẫn có lõi sắt non'],
      ['Từ tính', 'Giữ được từ tính lâu dài', 'Chỉ có từ tính khi có dòng điện chạy qua ống dây'],
      ['Làm mạnh, yếu', 'Không thay đổi được', 'Tăng dòng điện hoặc số vòng dây thì từ trường mạnh hơn'],
      ['Đổi cực từ', 'Không đổi được', 'Đổi chiều dòng điện thì đổi cực từ'],
      ['Ứng dụng', 'La bàn, loa, đồ chơi, cửa tủ', 'Cần cẩu nâng sắt thép, chuông điện, rơ le, khoá cửa điện'],
    ],
  },
  metalNonmetal: {
    title: 'So sánh kim loại và phi kim',
    cols: ['Kim loại', 'Phi kim'],
    rows: [
      ['Tính dẫn điện', 'Dẫn điện tốt', 'Thường không dẫn điện (than chì dẫn điện kém; silicon là chất bán dẫn)'],
      ['Trạng thái ở nhiệt độ thường', 'Rắn (trừ thuỷ ngân lỏng)', 'Khí (H₂, N₂, O₂, Cl₂…), lỏng (bromine), rắn (C, S, P, Si…)'],
      ['Nhiệt độ nóng chảy, sôi', 'Thường cao', 'Phần lớn thấp hơn kim loại'],
      ['Khối lượng riêng', 'Thường lớn', 'Phần lớn nhỏ hơn kim loại'],
      ['Trong phản ứng với phi kim', 'Nhường electron, tạo ion dương (Na → Na⁺ + 1e)', 'Nhận electron, tạo ion âm (Cl + 1e → Cl⁻)'],
      ['Phản ứng với oxygen', 'Thường tạo oxide base (2Mg + O₂ → 2MgO)', 'Thường tạo oxide acid (S + O₂ → SO₂)'],
    ],
  },
  glucoseSaccharose: {
    title: 'So sánh glucose và saccharose',
    cols: ['Glucose', 'Saccharose'],
    rows: [
      ['Công thức phân tử', 'C₆H₁₂O₆', 'C₁₂H₂₂O₁₁'],
      ['Trạng thái, màu, vị', 'Chất rắn kết tinh, không màu, vị ngọt', 'Chất rắn kết tinh, không màu, vị ngọt'],
      ['Tính tan', 'Tan tốt trong nước', 'Tan tốt trong nước'],
      ['Trạng thái tự nhiên', 'Quả chín (nho), máu người', 'Mía, củ cải đường, thốt nốt'],
      ['Phản ứng tráng bạc', 'Có', 'Không'],
      ['Phản ứng đặc trưng khác', 'Lên men rượu: C₆H₁₂O₆ →(enzyme) 2C₂H₅OH + 2CO₂', 'Thuỷ phân tạo glucose và fructose'],
    ],
  },
  starchCellulose: {
    title: 'So sánh tinh bột và cellulose',
    cols: ['Tinh bột', 'Cellulose'],
    rows: [
      ['Công thức', '(C₆H₁₀O₅)ₙ', '(C₆H₁₀O₅)ₘ'],
      ['Trạng thái, màu', 'Chất rắn dạng bột, màu trắng', 'Chất rắn dạng sợi, màu trắng'],
      ['Tính tan', 'Không tan trong nước lạnh; tan một phần trong nước nóng tạo hồ tinh bột', 'Không tan trong nước và các dung môi hữu cơ thông thường'],
      ['Có nhiều ở', 'Hạt, củ, quả: gạo, ngô, khoai, sắn', 'Thân cây, vỏ cây: gỗ, bông, tre, nứa, đay'],
      ['Vai trò trong cây', 'Dự trữ năng lượng', 'Xây dựng tế bào, bộ khung của cây'],
      ['Thuỷ phân', 'Tạo glucose (enzyme hoặc acid)', 'Tạo glucose (enzyme hoặc acid)'],
      ['Với iodine', 'Màu xanh tím', 'Không có màu xanh tím'],
    ],
  },
  acidIons: {
    title: 'Một số acid thông dụng và dạng tồn tại trong dung dịch',
    cols: ['Công thức', 'Cation (ion dương)', 'Anion – gốc acid'],
    rows: [
      ['Hydrochloric acid', 'HCl', 'H⁺', 'Cl⁻'],
      ['Nitric acid', 'HNO₃', 'H⁺', 'NO₃⁻'],
      ['Sulfuric acid', 'H₂SO₄', 'H⁺', 'SO₄²⁻'],
      ['Acetic acid', 'CH₃COOH', 'H⁺', 'CH₃COO⁻'],
      ['Nhận xét', 'Phân tử có nguyên tử H liên kết với gốc acid', 'Khi tan trong nước tạo ion H⁺', 'Gốc acid'],
    ],
  },
  bases: {
    title: 'Một số base và tính tan',
    cols: ['Công thức', 'Dạng tồn tại trong dung dịch', 'Tính tan'],
    rows: [
      ['Sodium hydroxide', 'NaOH', 'Na⁺ và OH⁻', 'Tan (kiềm)'],
      ['Potassium hydroxide', 'KOH', 'K⁺ và OH⁻', 'Tan (kiềm)'],
      ['Barium hydroxide', 'Ba(OH)₂', 'Ba²⁺ và OH⁻', 'Tan (kiềm)'],
      ['Calcium hydroxide', 'Ca(OH)₂', 'Ca²⁺ và OH⁻', 'Ít tan'],
      ['Magnesium hydroxide', 'Mg(OH)₂', '—', 'Không tan'],
      ['Copper(II) hydroxide', 'Cu(OH)₂', '—', 'Không tan'],
      ['Iron(II) hydroxide', 'Fe(OH)₂', '—', 'Không tan'],
      ['Iron(III) hydroxide', 'Fe(OH)₃', '—', 'Không tan'],
    ],
  },
  oxideTypes: {
    title: 'Phân loại oxide theo tính chất hoá học',
    cols: ['Ví dụ', 'Tính chất'],
    rows: [
      ['Oxide base', 'CaO, CuO, Na₂O, Fe₂O₃, MgO', 'Tác dụng với dung dịch acid tạo muối và nước'],
      ['Oxide acid', 'CO₂, SO₂, SO₃, P₂O₅', 'Tác dụng với dung dịch base tạo muối và nước'],
      ['Oxide lưỡng tính', 'Al₂O₃, ZnO', 'Tác dụng được với cả dung dịch acid và dung dịch base'],
      ['Oxide trung tính', 'CO, NO', 'Không tác dụng với dung dịch acid, dung dịch base'],
    ],
  },
  physChem: {
    title: 'Biến đổi vật lí hay biến đổi hoá học?',
    cols: ['Có tạo chất mới?', 'Loại biến đổi'],
    rows: [
      ['Nước đá tan thành nước lỏng', 'Không', 'Biến đổi vật lí'],
      ['Nước sôi thành hơi nước', 'Không', 'Biến đổi vật lí'],
      ['Hoà tan muối ăn vào nước', 'Không', 'Biến đổi vật lí'],
      ['Phần nến chảy lỏng', 'Không', 'Biến đổi vật lí'],
      ['Phần nến cháy (tạo CO₂, hơi nước)', 'Có', 'Biến đổi hoá học'],
      ['Đun hỗn hợp sắt và lưu huỳnh tạo FeS', 'Có', 'Biến đổi hoá học'],
      ['Nung đá vôi thành vôi sống', 'Có', 'Biến đổi hoá học'],
      ['Sắt để lâu ngoài không khí bị gỉ', 'Có', 'Biến đổi hoá học'],
      ['Thức ăn bị ôi thiu', 'Có', 'Biến đổi hoá học'],
    ],
  },
  exoEndo: {
    title: 'Phản ứng toả nhiệt hay thu nhiệt?',
    cols: ['Năng lượng', 'Loại phản ứng'],
    rows: [
      ['Đốt cháy cồn trong đèn cồn', 'Giải phóng nhiệt ra môi trường', 'Toả nhiệt'],
      ['Đốt than, xăng, dầu, gas', 'Giải phóng nhiệt', 'Toả nhiệt'],
      ['Chất dinh dưỡng phản ứng với oxygen trong tế bào', 'Giải phóng năng lượng', 'Toả nhiệt'],
      ['Phân huỷ Cu(OH)₂ thành CuO và hơi nước', 'Cần cung cấp nhiệt liên tục', 'Thu nhiệt'],
      ['Nung đá vôi CaCO₃ → CaO + CO₂', 'Cần cung cấp nhiệt liên tục', 'Thu nhiệt'],
      ['Phản ứng trung hoà acid – base', 'Hỗn hợp nóng lên', 'Toả nhiệt'],
    ],
  },
};

export function TableView({ doc, onDoc, showValues }: EngineProps<TableDoc, unknown>) {
  const t = TABLES[doc.set];
  const cols = t.cols.length;
  const toggle = (k: string) => onDoc({ ...doc, open: doc.open.includes(k) ? doc.open.filter((x) => x !== k) : [...doc.open, k] });
  return (
    <div className="eng">
      <div className="eng-stage lab-bg" style={{ overflow: 'auto' }}>
        <div className="html-table-wrap">
          <h2>{t.title}</h2>
          <table className="cmp-table">
            <thead>
              <tr>
                <th></th>
                {t.cols.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map((r, i) => (
                <tr key={i}>
                  <th>{r[0]}</th>
                  {Array.from({ length: cols }, (_, j) => {
                    const k = `${i}-${j}`;
                    const vis = showValues || doc.open.includes(k);
                    return (
                      <td key={j} className={vis ? '' : 'hid'} onClick={() => toggle(k)}>
                        {vis ? r[j + 1] : '?'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <aside className="eng-side">
        <h3>{t.title}</h3>
        <p className="small">Khi ẩn số đo, các ô hiện dấu “?”. Bấm vào từng ô để mở đáp án sau khi học sinh trả lời.</p>
        <button className="btn" onClick={() => onDoc({ ...doc, open: [] })}>
          Che lại tất cả
        </button>
      </aside>
    </div>
  );
}
