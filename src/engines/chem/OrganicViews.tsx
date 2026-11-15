// Hợp chất hữu cơ: công thức cấu tạo, phân loại, phản ứng cộng, trùng hợp; liên kết ion; nhiệt lượng nhiên liệu.
import { useState } from 'react';
import type { EngineProps } from '../../core/types';
import { fmt, fmtShort } from '../../core/format';
import { Row, Seg, Slider } from '../../ui/controls';
import { ATOM_COLOR, molarMass, pretty } from './formula';
import { Atom, Bond } from './ReactionViews';

// ---------------- Thư viện phân tử ----------------

interface MolDef {
  name: string;
  f: string; // công thức phân tử (dạng thường)
  cond: string;
  cls: string;
  note: string;
  atoms: { el: string; x: number; y: number }[];
  bonds: [number, number, number][];
}

type V2 = [number, number];
const U: V2 = [0, -64];
const D: V2 = [0, 64];
const L: V2 = [-64, 0];
const R: V2 = [64, 0];

function mk(fn: (add: (el: string, x: number, y: number) => number, bond: (a: number, b: number, o?: number) => void, hs: (c: number, dirs: V2[]) => void) => void) {
  const atoms: MolDef['atoms'] = [];
  const bonds: MolDef['bonds'] = [];
  const add = (el: string, x: number, y: number) => atoms.push({ el, x, y }) - 1;
  const bond = (a: number, b: number, o = 1) => void bonds.push([a, b, o]);
  const hs = (c: number, dirs: V2[]) => dirs.forEach(([dx, dy]) => bond(c, add('H', atoms[c].x + dx, atoms[c].y + dy)));
  fn(add, bond, hs);
  return { atoms, bonds };
}

function alkane(n: number) {
  return mk((add, bond, hs) => {
    const cs: number[] = [];
    for (let i = 0; i < n; i++) cs.push(add('C', (i - (n - 1) / 2) * 96, 0));
    cs.forEach((c, i) => {
      if (i > 0) bond(cs[i - 1], c);
      const dirs: V2[] = [U, D];
      if (i === 0) dirs.push(L);
      if (i === n - 1) dirs.push(R);
      hs(c, dirs);
    });
  });
}

export const MOLS: Record<string, MolDef> = {
  ch4: { name: 'Methane', f: 'CH4', cond: 'CH₄', cls: 'Hydrocarbon – alkane', note: 'Thành phần chính của khí thiên nhiên, khí bùn ao, khí biogas.', ...alkane(1) },
  c2h6: { name: 'Ethane', f: 'C2H6', cond: 'CH₃–CH₃', cls: 'Hydrocarbon – alkane', note: 'Có trong khí thiên nhiên, khí mỏ dầu.', ...alkane(2) },
  c3h8: { name: 'Propane', f: 'C3H8', cond: 'CH₃–CH₂–CH₃', cls: 'Hydrocarbon – alkane', note: 'Thành phần của khí hoá lỏng (gas) dùng đun nấu.', ...alkane(3) },
  c4h10: { name: 'Butane', f: 'C4H10', cond: 'CH₃–CH₂–CH₂–CH₃', cls: 'Hydrocarbon – alkane (mạch hở, không phân nhánh)', note: 'Có trong bật lửa gas, bình gas.', ...alkane(4) },
  ic4h10: {
    name: 'Isobutane',
    f: 'C4H10',
    cond: 'CH₃–CH(CH₃)–CH₃',
    cls: 'Hydrocarbon – alkane (mạch hở, phân nhánh)',
    note: 'Cùng công thức phân tử C₄H₁₀ với butane nhưng khác công thức cấu tạo nên là chất khác.',
    ...mk((add, bond, hs) => {
      const c = add('C', 0, 0);
      const a = add('C', -96, 0);
      const b = add('C', 96, 0);
      const d = add('C', 0, 96);
      bond(c, a);
      bond(c, b);
      bond(c, d);
      hs(c, [U]);
      hs(a, [U, D, L]);
      hs(b, [U, D, R]);
      hs(d, [L, R, D]);
    }),
  },
  cc4h8: {
    name: 'Cyclobutane',
    f: 'C4H8',
    cond: 'vòng 4 nguyên tử C',
    cls: 'Hydrocarbon (mạch vòng)',
    note: 'Các nguyên tử carbon liên kết với nhau tạo thành mạch vòng.',
    ...mk((add, bond, hs) => {
      const p = [add('C', -50, -50), add('C', 50, -50), add('C', 50, 50), add('C', -50, 50)];
      p.forEach((c, i) => bond(c, p[(i + 1) % 4]));
      hs(p[0], [U, L]);
      hs(p[1], [U, R]);
      hs(p[2], [D, R]);
      hs(p[3], [D, L]);
    }),
  },
  c2h4: {
    name: 'Ethylene',
    f: 'C2H4',
    cond: 'CH₂=CH₂',
    cls: 'Hydrocarbon – alkene',
    note: 'Phân tử có một liên kết đôi C=C, trong đó có một liên kết kém bền, dễ bị phá vỡ trong phản ứng.',
    ...mk((add, bond, hs) => {
      const a = add('C', -48, 0);
      const b = add('C', 48, 0);
      bond(a, b, 2);
      hs(a, [[-44, -52], [-44, 52]]);
      hs(b, [[44, -52], [44, 52]]);
    }),
  },
  c3h6: {
    name: 'Propylene',
    f: 'C3H6',
    cond: 'CH₂=CH–CH₃',
    cls: 'Hydrocarbon – alkene',
    note: 'Có liên kết đôi nên có tính chất hoá học tương tự ethylene; nguyên liệu sản xuất nhựa PP.',
    ...mk((add, bond, hs) => {
      const a = add('C', -100, 0);
      const b = add('C', 0, 0);
      const c = add('C', 100, 0);
      bond(a, b, 2);
      bond(b, c);
      hs(a, [[-44, -52], [-44, 52]]);
      hs(b, [U]);
      hs(c, [U, D, R]);
    }),
  },
  c2h5oh: {
    name: 'Ethylic alcohol',
    f: 'C2H6O',
    cond: 'CH₃–CH₂–OH',
    cls: 'Dẫn xuất của hydrocarbon – alcohol',
    note: 'Nhóm –OH gây nên tính chất đặc trưng: tác dụng với natri giải phóng khí hydrogen.',
    ...mk((add, bond, hs) => {
      const a = add('C', -110, 0);
      const b = add('C', -14, 0);
      const o = add('O', 82, 0);
      bond(a, b);
      bond(b, o);
      hs(a, [U, D, L]);
      hs(b, [U, D]);
      hs(o, [R]);
    }),
  },
  ch3och3: {
    name: 'Dimethyl ether',
    f: 'C2H6O',
    cond: 'CH₃–O–CH₃',
    cls: 'Dẫn xuất của hydrocarbon – ether',
    note: 'Cùng công thức phân tử C₂H₆O với ethylic alcohol nhưng là chất khí, không tác dụng với natri.',
    ...mk((add, bond, hs) => {
      const a = add('C', -96, 0);
      const o = add('O', 0, 0);
      const b = add('C', 96, 0);
      bond(a, o);
      bond(o, b);
      hs(a, [U, D, L]);
      hs(b, [U, D, R]);
    }),
  },
  ch3cooh: {
    name: 'Acetic acid',
    f: 'C2H4O2',
    cond: 'CH₃–COOH',
    cls: 'Dẫn xuất của hydrocarbon – carboxylic acid',
    note: 'Nhóm –COOH gây nên tính acid: làm quỳ tím hoá đỏ, tác dụng với kim loại, base, oxide base, muối carbonate.',
    ...mk((add, bond, hs) => {
      const a = add('C', -100, 0);
      const b = add('C', 0, 0);
      const o1 = add('O', 0, -82);
      const o2 = add('O', 96, 0);
      bond(a, b);
      bond(b, o1, 2);
      bond(b, o2);
      hs(a, [U, D, L]);
      hs(o2, [R]);
    }),
  },
  ch3cl: {
    name: 'Methyl chloride',
    f: 'CH3Cl',
    cond: 'CH₃–Cl',
    cls: 'Dẫn xuất của hydrocarbon',
    note: 'Ngoài C và H còn có nguyên tố Cl.',
    ...mk((add, bond, hs) => {
      const c = add('C', 0, 0);
      bond(c, add('Cl', 80, 0));
      hs(c, [U, D, L]);
    }),
  },
};

export interface StructureDoc {
  mode: 'structure';
  list: string[];
  mol: string;
  view: 'full' | 'model';
}

export function MoleculeDrawing({ m, view, scale = 1, cx = 600, cy = 340 }: { m: Pick<MolDef, 'atoms' | 'bonds'>; view: 'full' | 'model'; scale?: number; cx?: number; cy?: number }) {
  const P = (i: number) => ({ x: cx + m.atoms[i].x * scale, y: cy + m.atoms[i].y * scale });
  return (
    <g>
      {m.bonds.map(([a, b, o], k) => {
        const A = P(a);
        const B = P(b);
        if (view === 'model') return <Bond key={k} x1={A.x} y1={A.y} x2={B.x} y2={B.y} order={o} color="#8a94a3" />;
        const dx = B.x - A.x;
        const dy = B.y - A.y;
        const Ln = Math.hypot(dx, dy);
        const s = 22 / Ln;
        return <Bond key={k} x1={A.x + dx * s} y1={A.y + dy * s} x2={B.x - dx * s} y2={B.y - dy * s} order={o} color="var(--ink)" />;
      })}
      {m.atoms.map((a, i) => {
        const p = P(i);
        return view === 'model' ? (
          <Atom key={i} x={p.x} y={p.y} el={a.el} r={(a.el === 'H' ? 16 : 25) * Math.max(0.8, scale)} />
        ) : (
          <text key={i} x={p.x} y={p.y + 12} textAnchor="middle" fontSize={34 * Math.max(0.8, scale)} fontWeight={700} fill={a.el === 'C' ? 'var(--accent)' : a.el === 'O' ? 'var(--danger)' : a.el === 'Cl' ? '#2f9e44' : 'var(--ink)'} fontFamily="'Times New Roman', serif">
            {a.el}
          </text>
        );
      })}
    </g>
  );
}

export function StructureView({ doc, onDoc, showValues }: EngineProps<StructureDoc, unknown>) {
  const m = MOLS[doc.mol] ?? MOLS.ch4;
  const same = doc.list.filter((k) => k !== doc.mol && MOLS[k].f === m.f);
  const xs = m.atoms.map((a) => a.x);
  const ys = m.atoms.map((a) => a.y);
  const bw = Math.max(...xs) - Math.min(...xs) + 120;
  const bh = Math.max(...ys) - Math.min(...ys) + 120;
  const fit = Math.min(1.8, 760 / bw, 400 / bh);
  const cxOff = (Math.max(...xs) + Math.min(...xs)) / 2;
  const cyOff = (Math.max(...ys) + Math.min(...ys)) / 2;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <text x={600} y={70} textAnchor="middle" fontSize={34} fontWeight={800} fill="var(--ink)">
            {m.name}
          </text>
          <MoleculeDrawing m={m} view={doc.view} scale={fit} cx={600 - cxOff * fit} cy={330 - cyOff * fit} />
          <text x={600} y={580} textAnchor="middle" fontSize={32} fontWeight={700} fill="var(--ink)">
            CTPT: {showValues ? pretty(m.f) : '?'} · CTCT thu gọn: {showValues ? m.cond : '?'}
          </text>
          {doc.view === 'model' && (
            <g>
              {Array.from(new Set(m.atoms.map((a) => a.el))).map((el, i) => (
                <g key={el} transform={`translate(${40 + i * 140} 640)`}>
                  <circle r={12} fill={ATOM_COLOR[el]} stroke="#555" />
                  <text x={20} y={6} className="tick-small">
                    nguyên tử {el}
                  </text>
                </g>
              ))}
            </g>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Công thức cấu tạo</h3>
        <Row label="Cách biểu diễn">
          <Seg value={doc.view} options={['full', 'model'] as const} onChange={(v) => onDoc({ ...doc, view: v })} fmtOpt={(v) => (v === 'full' ? 'Công thức đầy đủ' : 'Mô hình rỗng (bóng – que)')} />
        </Row>
        <Row label="Chất">
          <div className="seg wrap">
            {doc.list.map((k) => (
              <button key={k} className={k === doc.mol ? 'on' : ''} onClick={() => onDoc({ ...doc, mol: k })}>
                {MOLS[k].name}
              </button>
            ))}
          </div>
        </Row>
        <div className="insp-values two">
          <div>
            <span>Loại hợp chất</span>
            <b style={{ fontSize: '0.95rem' }}>{showValues ? m.cls : '?'}</b>
          </div>
          <div>
            <span>M (g/mol)</span>
            <b>{fmtShort(molarMass(m.f), 1)}</b>
          </div>
        </div>
        <p className="small">{m.note}</p>
        {same.length > 0 && showValues && (
          <p className="nature">
            Cùng CTPT {pretty(m.f)} với: {same.map((k) => MOLS[k].name).join(', ')}
          </p>
        )}
        <p className="small muted">Trong hợp chất hữu cơ, carbon luôn có hoá trị IV (4 nét liên kết), hydrogen hoá trị I, oxygen hoá trị II.</p>
      </aside>
    </div>
  );
}

// ---------------- Phân loại ----------------

export const CLASS_SETS: Record<string, { title: string; bins: string[]; items: [string, number][] }> = {
  orgInorg: {
    title: 'Hợp chất hữu cơ hay vô cơ?',
    bins: ['Hữu cơ', 'Vô cơ'],
    items: [['C6H6', 0], ['H2SO4', 1], ['C6H12O6', 0], ['H2CO3', 1], ['CaCO3', 1], ['KNO3', 1], ['C2H4', 0], ['NaOH', 1], ['Al2O3', 1], ['CH3Cl', 0], ['CH3OH', 0], ['CO2', 1], ['CH4', 0], ['CO', 1]],
  },
  hcDeriv: {
    title: 'Hydrocarbon hay dẫn xuất của hydrocarbon?',
    bins: ['Hydrocarbon', 'Dẫn xuất'],
    items: [['CH4', 0], ['CH3Cl', 1], ['CH2=CH2', 0], ['CH3CH2OH', 1], ['CH3COOH', 1], ['CH3NH2', 1], ['CH3CH2CH3', 0], ['CH3CH=CH2', 0], ['CH3COOCH2CH3', 1]],
  },
  donHop: {
    title: 'Đơn chất hay hợp chất?',
    bins: ['Đơn chất', 'Hợp chất'],
    items: [['O2', 0], ['H2O', 1], ['Fe', 0], ['NaCl', 1], ['Cl2', 0], ['CO2', 1], ['N2', 0], ['CH4', 1], ['Cu', 0], ['CaCO3', 1], ['O3', 0], ['NH3', 1]],
  },
  donHop3: {
    title: 'Đơn chất kim loại, đơn chất phi kim hay hợp chất?',
    bins: ['Đơn chất kim loại', 'Đơn chất phi kim', 'Hợp chất'],
    items: [['Fe', 0], ['Al', 0], ['Cu', 0], ['O2', 1], ['S', 1], ['C', 1], ['N2', 1], ['H2O', 2], ['NaCl', 2], ['CO2', 2], ['Zn', 0], ['P', 1], ['NH3', 2], ['CaO', 2]],
  },
  congThuc: {
    title: 'Công thức hoá học viết đúng hay sai?',
    bins: ['Viết đúng', 'Viết sai'],
    items: [['Al2O3', 0], ['AlO', 1], ['NaCl', 0], ['NaCl2', 1], ['CaO', 0], ['Ca2O', 1], ['Fe2O3', 0], ['HO', 1], ['MgCl2', 0], ['MgCl', 1], ['K2SO4', 0], ['KSO4', 1], ['Ca(OH)2', 0], ['CaOH', 1]],
  },
  ionCov: {
    title: 'Hợp chất ion hay hợp chất cộng hoá trị?',
    bins: ['Hợp chất ion', 'Hợp chất cộng hoá trị'],
    items: [['NaCl', 0], ['H2O', 1], ['MgO', 0], ['CO2', 1], ['KCl', 0], ['NH3', 1], ['CaO', 0], ['CH4', 1], ['HCl', 1], ['Na2O', 0]],
  },
  kimPhi: {
    title: 'Kim loại, phi kim hay khí hiếm?',
    bins: ['Kim loại', 'Phi kim', 'Khí hiếm'],
    items: [['Na', 0], ['O', 1], ['Ne', 2], ['Al', 0], ['Cl', 1], ['Ar', 2], ['Mg', 0], ['S', 1], ['He', 2], ['K', 0], ['N', 1], ['C', 1], ['Ca', 0], ['P', 1]],
  },
  alkane: {
    title: 'Chất nào là alkane?',
    bins: ['Alkane', 'Hydrocarbon khác', 'Không phải hydrocarbon'],
    items: [['CH3–CH3', 0], ['CH2=CH–CH3', 1], ['CH2=C(CH3)–CH3', 1], ['CH3–CH2–OH', 2], ['CH3–COOH', 2], ['CH3–CH(CH3)–CH3', 0], ['CH2=CH–CH=CH2', 1], ['CH4', 0]],
  },
};

export interface ClassifyDoc {
  mode: 'classify';
  set: keyof typeof CLASS_SETS;
  placed: Record<string, number>;
  check?: boolean;
  /** các bộ bài tập được chọn trong cảnh này */
  sets?: (keyof typeof CLASS_SETS)[];
}

const CLASS_SETS_9 = ['orgInorg', 'hcDeriv', 'alkane'];
const HINT: Record<string, string> = {
  orgInorg: 'Hợp chất của carbon là hợp chất hữu cơ, trừ CO, CO₂, H₂CO₃, các muối carbonate…',
  hcDeriv: 'Hydrocarbon chỉ chứa C và H; dẫn xuất có thêm nguyên tố khác như O, N, Cl…',
  alkane: 'Alkane là hydrocarbon mạch hở, phân tử chỉ có liên kết đơn, công thức chung CₙH₂ₙ₊₂.',
  donHop: 'Đơn chất được tạo nên từ một nguyên tố hoá học; hợp chất được tạo nên từ hai hay nhiều nguyên tố.',
  donHop3: 'Đơn chất kim loại: Fe, Al, Cu, Zn…; đơn chất phi kim: O₂, N₂, S, C, P…; hợp chất gồm từ hai nguyên tố trở lên.',
  congThuc: 'Kiểm tra bằng quy tắc hoá trị x·a = y·b. Ví dụ Al (III), O (II): Al₂O₃ vì 2 × III = 3 × II.',
  ionCov: 'Hợp chất tạo bởi kim loại và phi kim thường là hợp chất ion; hợp chất tạo bởi các phi kim thường là hợp chất cộng hoá trị.',
  kimPhi: 'Dựa vào vị trí trong bảng tuần hoàn: kim loại ở bên trái, phi kim ở bên phải, khí hiếm ở cột cuối cùng (nhóm VIIIA).',
};

export function ClassifyView({ doc, onDoc, showValues }: EngineProps<ClassifyDoc, unknown>) {
  const set = CLASS_SETS[doc.set];
  const nb = set.bins.length;
  const bw = 1100 / nb;
  const pool = set.items.filter(([f]) => doc.placed[f] === undefined);
  const cycle = (f: string) => {
    const cur = doc.placed[f];
    const next = cur === undefined ? 0 : cur + 1 >= nb ? undefined : cur + 1;
    const placed = { ...doc.placed };
    if (next === undefined) delete placed[f];
    else placed[f] = next;
    onDoc({ ...doc, placed, check: false });
  };
  const correct = set.items.filter(([f, b]) => doc.placed[f] === b).length;
  const chip = (f: string, x: number, y: number, mark?: boolean) => (
    <g key={f} className="draggable" onPointerDown={() => cycle(f)}>
      <rect x={x - 110} y={y - 24} width={220} height={48} rx={24} fill="var(--surface)" stroke={mark === undefined ? 'var(--line)' : mark ? 'var(--ok)' : 'var(--danger)'} strokeWidth={mark === undefined ? 1.5 : 4} />
      <text x={x} y={y + 9} textAnchor="middle" fontSize={22} fontWeight={700} fill="var(--ink)">
        {pretty(f)}
      </text>
    </g>
  );
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <text x={600} y={44} textAnchor="middle" className="lab-label">
            {set.title} – bấm vào từng chất để xếp vào nhóm
          </text>
          {pool.map(([f], i) => chip(f, 140 + (i % 5) * 230, 100 + Math.floor(i / 5) * 60))}
          {set.bins.map((b, k) => {
            const x0 = 50 + k * bw;
            const items = set.items.filter(([f]) => doc.placed[f] === k);
            return (
              <g key={b}>
                <rect x={x0 + 8} y={250} width={bw - 16} height={410} rx={18} fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth={2} />
                <text x={x0 + bw / 2} y={290} textAnchor="middle" fontSize={24} fontWeight={800} fill="var(--accent)">
                  {b}
                </text>
                {items.map(([f, ans], i) => chip(f, x0 + bw / 2, 340 + i * 54, doc.check && showValues ? ans === k : undefined))}
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Phân loại</h3>
        <Row label="Bài tập">
          <Seg value={doc.set} options={(doc.sets ?? (CLASS_SETS_9.includes(doc.set) ? CLASS_SETS_9 : [doc.set])) as (keyof typeof CLASS_SETS)[]} onChange={(s) => onDoc({ ...doc, set: s, placed: {}, check: false })} fmtOpt={(s) => CLASS_SETS[s].title} />
        </Row>
        <p className="small">Bấm vào một chất để đưa vào nhóm 1; bấm tiếp để chuyển sang nhóm sau hoặc trả về chỗ cũ.</p>
        <div className="insp-actions">
          <button className="btn primary" onClick={() => onDoc({ ...doc, check: true })}>
            Kiểm tra
          </button>
          <button className="btn" onClick={() => onDoc({ ...doc, placed: {}, check: false })}>
            Làm lại
          </button>
        </div>
        {doc.check && showValues && (
          <p className="nature">
            Đúng {correct}/{set.items.length} chất
          </p>
        )}
        {doc.check && !showValues && <p className="small muted">Bật “Hiện số đo” để xem đúng/sai.</p>}
        <p className="small muted">{HINT[doc.set as string]}</p>
      </aside>
    </div>
  );
}

// ---------------- Phản ứng cộng bromine, phản ứng trùng hợp ----------------

export interface PolymerDoc {
  mode: 'polymer';
  kind: 'br2' | 'pe' | 'pp';
  p: number;
}

function Monomer({ x, y, open, methyl, scale = 1 }: { x: number; y: number; open: number; methyl?: boolean; scale?: number }) {
  const s = scale;
  return (
    <g>
      <Bond x1={x - 40 * s} y1={y} x2={x + 40 * s} y2={y} order={open > 0.5 ? 1 : 2} color="#8a94a3" />
      <Bond x1={x - 40 * s} y1={y} x2={x - 40 * s} y2={y - 56 * s} color="#8a94a3" />
      <Bond x1={x - 40 * s} y1={y} x2={x - 40 * s} y2={y + 56 * s} color="#8a94a3" />
      <Bond x1={x + 40 * s} y1={y} x2={x + 40 * s} y2={y - 56 * s} color="#8a94a3" />
      <Bond x1={x + 40 * s} y1={y} x2={x + 40 * s} y2={y + 56 * s} color="#8a94a3" />
      <Atom x={x - 40 * s} y={y} el="C" r={20 * s} />
      <Atom x={x + 40 * s} y={y} el="C" r={20 * s} />
      <Atom x={x - 40 * s} y={y - 56 * s} el="H" r={14 * s} />
      <Atom x={x - 40 * s} y={y + 56 * s} el="H" r={14 * s} />
      <Atom x={x + 40 * s} y={y - 56 * s} el="H" r={14 * s} />
      {methyl ? (
        <g>
          <circle cx={x + 40 * s} cy={y + 60 * s} r={22 * s} fill="#4b5563" stroke="#222" />
          <text x={x + 40 * s} y={y + 66 * s} textAnchor="middle" fill="#fff" fontWeight={800} fontSize={16 * s}>
            CH₃
          </text>
        </g>
      ) : (
        <Atom x={x + 40 * s} y={y + 56 * s} el="H" r={14 * s} />
      )}
    </g>
  );
}

export function PolymerView({ doc, onDoc, showValues }: EngineProps<PolymerDoc, unknown>) {
  const [p, setP] = [doc.p, (v: number) => onDoc({ ...doc, p: v })];
  if (doc.kind === 'br2') {
    const t = Math.min(1, p / 0.6);
    const add = p > 0.6 ? Math.min(1, (p - 0.6) / 0.3) : 0;
    const by = 160 + 170 * t;
    return (
      <div className="eng">
        <div className="eng-stage lab-bg">
          <svg viewBox="0 0 1200 680" className="eng-svg">
            <Monomer x={600} y={380} open={add} />
            {add < 1 ? (
              <g>
                <Bond x1={560 - 20 * add} y1={by} x2={640 + 20 * add} y2={by} opacity={1 - add} color="#a33b1e" />
                <Atom x={560 - 0 * add} y={by + 60 * add} el="Br" r={26} />
                <Atom x={640 + 0 * add} y={by + 60 * add} el="Br" r={26} />
              </g>
            ) : (
              <g>
                <Bond x1={560} y1={380} x2={520} y2={300} color="#8a94a3" />
                <Bond x1={640} y1={380} x2={680} y2={300} color="#8a94a3" />
                <Atom x={520} y={300} el="Br" r={26} />
                <Atom x={680} y={300} el="Br" r={26} />
              </g>
            )}
            <text x={600} y={600} textAnchor="middle" className="lab-label">
              {p < 0.6 ? 'Phân tử bromine tiến lại gần liên kết đôi C=C' : p < 0.9 ? 'Liên kết kém bền trong liên kết đôi bị phá vỡ' : 'Mỗi nguyên tử C liên kết thêm một nguyên tử Br'}
            </text>
            {showValues && (
              <text x={600} y={70} textAnchor="middle" fontSize={32} fontWeight={800} fill="var(--ink)">
                CH₂=CH₂ + Br₂ → CH₂Br–CH₂Br
              </text>
            )}
          </svg>
        </div>
        <aside className="eng-side">
          <h3>Phản ứng cộng</h3>
          <Row label="Tiến trình">
            <Slider value={p} min={0} max={1} step={0.01} digits={2} onChange={setP} />
          </Row>
          <button className="btn primary" onClick={() => setP(p >= 1 ? 0 : 1)}>
            {p >= 1 ? 'Về lúc đầu' : 'Cho phản ứng xảy ra'}
          </button>
          <p className="small">Nước bromine màu vàng cam bị mất màu khi dẫn khí ethylene qua. Sản phẩm là 1,2-dibromoethane.</p>
          <p className="small muted">Alkane (như methane) chỉ có liên kết đơn nên không làm mất màu nước bromine.</p>
        </aside>
      </div>
    );
  }
  const methyl = doc.kind === 'pp';
  const N = 5;
  const open = Math.min(1, p / 0.35);
  const join = Math.max(0, Math.min(1, (p - 0.35) / 0.5));
  const gap = 230 - 70 * join;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          {Array.from({ length: N }, (_, i) => {
            const x = 600 + (i - (N - 1) / 2) * gap;
            return (
              <g key={i}>
                {join > 0.95 && i < N - 1 && <Bond x1={x + 40 * 0.9} y1={340} x2={x + gap - 40 * 0.9} y2={340} color="#e5383b" />}
                <Monomer x={x} y={340} open={open} methyl={methyl} scale={0.9} />
              </g>
            );
          })}
          {join > 0.95 && (
            <g>
              <text x={600 - ((N - 1) / 2) * gap - 110} y={352} fontSize={40} fill="var(--ink-2)">
                …
              </text>
              <text x={600 + ((N - 1) / 2) * gap + 80} y={352} fontSize={40} fill="var(--ink-2)">
                …
              </text>
            </g>
          )}
          <text x={600} y={520} textAnchor="middle" className="lab-label">
            {p < 0.35 ? `Các phân tử ${methyl ? 'propylene' : 'ethylene'} (monomer)` : p < 0.9 ? 'Liên kết kém bền trong liên kết đôi bị phá vỡ, các phân tử nối với nhau' : `Mạch polymer rất dài: ${methyl ? 'polypropylene (PP)' : 'polyethylene (PE)'}`}
          </text>
          {showValues && (
            <text x={600} y={80} textAnchor="middle" fontSize={32} fontWeight={800} fill="var(--ink)">
              {methyl ? 'nCH₂=CH(CH₃) →(t°, p, xt) –(CH₂–CH(CH₃))ₙ–' : 'nCH₂=CH₂ →(t°, p, xt) –(CH₂–CH₂)ₙ–'}
            </text>
          )}
          {showValues && (
            <text x={600} y={590} textAnchor="middle" className="lab-small">
              Mắt xích: {methyl ? '–CH₂–CH(CH₃)–' : '–CH₂–CH₂–'} · Monomer: {methyl ? 'CH₂=CH–CH₃' : 'CH₂=CH₂'} · n: hệ số trùng hợp (rất lớn)
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Phản ứng trùng hợp</h3>
        <Row label="Monomer">
          <Seg value={doc.kind} options={['pe', 'pp'] as const} onChange={(k) => onDoc({ ...doc, kind: k, p: 0 })} fmtOpt={(k) => (k === 'pe' ? 'Ethylene → PE' : 'Propylene → PP')} />
        </Row>
        <Row label="Tiến trình">
          <Slider value={p} min={0} max={1} step={0.01} digits={2} onChange={setP} />
        </Row>
        <button className="btn primary" onClick={() => setP(p >= 1 ? 0 : 1)}>
          {p >= 1 ? 'Về lúc đầu' : 'Trùng hợp'}
        </button>
        <p className="small">Ở nhiệt độ, áp suất và xúc tác thích hợp, rất nhiều phân tử nhỏ (monomer) kết hợp với nhau thành phân tử rất lớn (polymer).</p>
      </aside>
    </div>
  );
}

// ---------------- Kim loại nhường electron, phi kim nhận electron ----------------

export interface IonicDoc {
  mode: 'ionic';
  p: number;
}

function Shells({ x, y, Z, shells, sym, moving, charge }: { x: number; y: number; Z: number; shells: number[]; sym: string; moving?: number; charge?: string }) {
  return (
    <g>
      {shells.map((n, k) => {
        const r = 46 + k * 38;
        return (
          <g key={k}>
            <circle cx={x} cy={y} r={r} fill="none" stroke="var(--line)" strokeWidth={2} />
            {Array.from({ length: n }, (_, j) => {
              if (moving !== undefined && k === shells.length - 1 && j === n - 1) return null;
              const a = (j / n) * Math.PI * 2 - Math.PI / 2;
              return <circle key={j} cx={x + r * Math.cos(a)} cy={y + r * Math.sin(a)} r={7} fill="#1d6fe0" />;
            })}
          </g>
        );
      })}
      <circle cx={x} cy={y} r={30} fill={ATOM_COLOR[sym]} stroke="#333" />
      <text x={x} y={y + 7} textAnchor="middle" fontWeight={900} fontSize={18} fill="#fff">
        +{Z}
      </text>
      <text x={x} y={y + 200} textAnchor="middle" fontSize={34} fontWeight={800} fill="var(--ink)">
        {sym}
        {charge && <tspan dy={-14} fontSize={22}>{charge}</tspan>}
      </text>
    </g>
  );
}

export function IonicView({ doc, onDoc, showValues }: EngineProps<IonicDoc, unknown>) {
  const t = Math.max(0, Math.min(1, doc.p));
  const done = t >= 1;
  const ex = 330 + (748 - 330) * t;
  const ey = 208 + (330 - 208) * t - Math.sin(t * Math.PI) * 90;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <Shells x={330} y={330} Z={11} shells={done ? [2, 8] : [2, 8, 1]} sym="Na" moving={done ? undefined : 1} charge={done ? '+' : undefined} />
          <Shells x={870} y={330} Z={17} shells={done ? [2, 8, 8] : [2, 8, 7]} sym="Cl" charge={done ? '−' : undefined} />
          {!done && <circle cx={ex} cy={ey} r={9} fill="#e5383b" stroke="#fff" strokeWidth={2} />}
          {done && (
            <g>
              <path d="M 520 330 L 680 330" stroke="var(--danger)" strokeWidth={4} strokeDasharray="10 6" />
              <text x={600} y={316} textAnchor="middle" className="lab-small">
                hút nhau
              </text>
            </g>
          )}
          {showValues && (
            <g>
              <text x={330} y={610} textAnchor="middle" fontSize={24} fontWeight={700} fill="var(--ink)">
                Na → Na⁺ + 1e
              </text>
              <text x={870} y={610} textAnchor="middle" fontSize={24} fontWeight={700} fill="var(--ink)">
                Cl + 1e → Cl⁻
              </text>
              <text x={600} y={70} textAnchor="middle" fontSize={30} fontWeight={800} fill="var(--ink)">
                2Na + Cl₂ → 2NaCl
              </text>
            </g>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Kim loại – phi kim trong phản ứng</h3>
        <Row label="Tiến trình">
          <Slider value={doc.p} min={0} max={1} step={0.01} digits={2} onChange={(v) => onDoc({ ...doc, p: v })} />
        </Row>
        <button className="btn primary" onClick={() => onDoc({ ...doc, p: doc.p >= 1 ? 0 : 1 })}>
          {doc.p >= 1 ? 'Về lúc đầu' : 'Chuyển electron'}
        </button>
        <p className="small">Nguyên tử kim loại (Na) có ít electron ở lớp ngoài cùng, dễ nhường electron tạo ion dương. Nguyên tử phi kim (Cl) có nhiều electron lớp ngoài cùng, dễ nhận electron tạo ion âm.</p>
        <p className="small muted">Hình vẽ là mô hình đơn giản hoá để minh hoạ sự chuyển electron.</p>
      </aside>
    </div>
  );
}

// ---------------- Nhiệt lượng toả ra khi đốt nhiên liệu ----------------

export interface FuelHeatDoc {
  mode: 'fuelheat';
  set: 'alkane' | 'fuels';
  per: 'mol' | 'g';
}

const ALK: [string, string, number][] = [
  ['Methane', 'CH4', 891],
  ['Ethane', 'C2H6', 1561],
  ['Propane', 'C3H8', 2220],
  ['Butane', 'C4H10', 2878],
];
const FUELS: [string, number][] = [
  ['Gỗ', 17.5],
  ['Than đá', 25],
  ['Ethylic alcohol', 29.7],
  ['Dầu hoả', 43.5],
  ['Xăng', 46],
  ['Butane', 49.6],
  ['Methane', 55.7],
  ['Hydrogen', 142],
];

export function FuelHeatView({ doc, onDoc, showValues }: EngineProps<FuelHeatDoc, unknown>) {
  const [sel, setSel] = useState(-1);
  const rows: { name: string; v: number; unit: string }[] =
    doc.set === 'alkane' ? ALK.map(([n, f, q]) => ({ name: `${n} (${pretty(f)})`, v: doc.per === 'mol' ? q : q / molarMass(f), unit: doc.per === 'mol' ? 'kJ/mol' : 'kJ/g' })) : FUELS.map(([n, q]) => ({ name: n, v: q, unit: 'kJ/g' }));
  const max = Math.max(...rows.map((r) => r.v));
  const bh = Math.min(64, (540 - 10 * rows.length) / rows.length);
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <text x={600} y={50} textAnchor="middle" className="lab-label">
            Nhiệt lượng toả ra khi đốt cháy hoàn toàn {doc.set === 'alkane' && doc.per === 'mol' ? '1 mol' : '1 gam'} nhiên liệu
          </text>
          {rows.map((r, i) => {
            const y = 100 + i * (bh + 10);
            const w = (r.v / max) * 620;
            return (
              <g key={r.name} className="draggable" onPointerDown={() => setSel(i)}>
                <text x={300} y={y + bh / 2 + 7} textAnchor="end" className="lab-label">
                  {r.name}
                </text>
                <rect x={320} y={y} width={w} height={bh} rx={6} fill={i === sel ? 'var(--danger)' : '#f08a24'} opacity={0.85} />
                <text x={330 + w} y={y + bh / 2 + 7} className="lab-value">
                  {showValues || i === sel ? `${fmt(r.v, 1)} ${r.unit}` : '?'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>So sánh nhiên liệu</h3>
        <Row label="Dữ liệu">
          <Seg value={doc.set} options={['alkane', 'fuels'] as const} onChange={(s) => onDoc({ ...doc, set: s })} fmtOpt={(s) => (s === 'alkane' ? 'Các alkane' : 'Các nhiên liệu')} />
        </Row>
        {doc.set === 'alkane' && (
          <Row label="Tính cho">
            <Seg value={doc.per} options={['mol', 'g'] as const} onChange={(p) => onDoc({ ...doc, per: p })} fmtOpt={(p) => (p === 'mol' ? '1 mol' : '1 gam')} />
          </Row>
        )}
        {doc.set === 'alkane' && doc.per === 'g' && <p className="small">Nhiệt lượng tính cho 1 gam = nhiệt lượng 1 mol / khối lượng mol M.</p>}
        <p className="small muted">Số liệu làm tròn. Bấm vào từng thanh để hiện riêng giá trị khi đang ẩn số đo.</p>
      </aside>
    </div>
  );
}
