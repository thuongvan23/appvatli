// KHTN 7 – Hoá học: mô hình nguyên tử, nguyên tố và kí hiệu, bảng tuần hoàn, phân tử – đơn chất – hợp chất,
// liên kết ion và liên kết cộng hoá trị, hoá trị và công thức hoá học, phần trăm khối lượng nguyên tố.
import { useEffect, useMemo, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider } from '../../ui/controls';
import { CAT_COLOR, CAT_NAME, ELEMENTS, MASS_NUMBER, elBySym, elByZ, fillShells, groupName } from './elements';
import { ATOMIC_MASS, ATOM_COLOR, parseFormula, pretty } from './formula';
import { Atom, Bond } from './ReactionViews';

const EC = '#1d6fe0'; // electron
const PC = '#e63946'; // proton
const NCOL = '#9aa5b1'; // neutron

const vn = (x: number, d = 2) => x.toLocaleString('vi-VN', { maximumFractionDigits: d });

// =====================================================================
// Mô hình nguyên tử (Rutherford – Bohr)
// =====================================================================

function Nucleus({ x, y, p, n, R }: { x: number; y: number; p: number; n: number; R: number }) {
  const total = p + n;
  const pts = useMemo(() => {
    const out: { x: number; y: number; isP: boolean }[] = [];
    // xếp xen kẽ proton và neutron theo hình xoắn ốc
    for (let k = 0; k < total; k++) {
      const r = total === 1 ? 0 : R * 0.82 * Math.sqrt((k + 0.5) / total);
      const a = k * 2.39996;
      out.push({ x: r * Math.cos(a), y: r * Math.sin(a), isP: false });
    }
    // gán proton rải đều
    let given = 0;
    for (let k = 0; k < total && given < p; k++) {
      if (Math.floor(((k + 1) * p) / total) > Math.floor((k * p) / total) || total - k === p - given) {
        out[k].isP = true;
        given++;
      }
    }
    return out;
  }, [p, n, total, R]);
  const r = Math.max(5, Math.min(12, (R * 0.9) / Math.sqrt(Math.max(1, total))));
  return (
    <g transform={`translate(${x} ${y})`}>
      {pts.map((q, i) => (
        <g key={i}>
          <circle cx={q.x} cy={q.y} r={r} fill={q.isP ? PC : NCOL} stroke="rgba(0,0,0,0.35)" />
          {q.isP && r >= 8 && (
            <text x={q.x} y={q.y + r * 0.4} textAnchor="middle" fontSize={r * 1.2} fontWeight={900} fill="#fff">
              +
            </text>
          )}
        </g>
      ))}
    </g>
  );
}

export function ShellAtom({ x, y, Z, n, e, scale = 1, spin = 0, sym, showNucleus = true, outerOnly = false, hideLast = 0, label = true }: { x: number; y: number; Z: number; n?: number; e?: number; scale?: number; spin?: number; sym?: string; showNucleus?: boolean; outerOnly?: boolean; hideLast?: number; label?: boolean }) {
  const shells = fillShells(e ?? Z);
  const R0 = 46 * scale;
  const dR = 38 * scale;
  return (
    <g>
      {shells.map((cnt, k) => {
        if (outerOnly && k < shells.length - 1) return null;
        const r = R0 + k * dR;
        const show = k === shells.length - 1 ? cnt - hideLast : cnt;
        return (
          <g key={k}>
            <circle cx={x} cy={y} r={r} fill="none" stroke="var(--line)" strokeWidth={2} />
            {Array.from({ length: Math.max(0, show) }, (_, j) => {
              const a = (j / cnt) * Math.PI * 2 - Math.PI / 2 + spin * (1 / (k + 1));
              return <circle key={j} cx={x + r * Math.cos(a)} cy={y + r * Math.sin(a)} r={7 * Math.max(0.8, scale)} fill={EC} stroke="#fff" strokeWidth={1.5} />;
            })}
          </g>
        );
      })}
      {showNucleus && n !== undefined ? (
        <Nucleus x={x} y={y} p={Z} n={n} R={30 * scale} />
      ) : (
        <g>
          <circle cx={x} cy={y} r={26 * scale} fill={ATOM_COLOR[sym ?? ''] ?? '#c0392b'} stroke="#333" />
          <text x={x} y={y + 7 * scale} textAnchor="middle" fontWeight={900} fontSize={18 * scale} fill="#fff" stroke="#000" strokeWidth={0.6}>
            +{Z}
          </text>
        </g>
      )}
      {label && sym && (
        <text x={x} y={y + R0 + (shells.length - 1) * dR + 42 * scale} textAnchor="middle" fontSize={30 * scale} fontWeight={800} fill="var(--ink)">
          {sym}
        </text>
      )}
    </g>
  );
}

export interface AtomDoc {
  mode: 'atom';
  /** nguyên tố đang xem (chế độ xem) */
  Z: number;
  /** chế độ tự lắp ráp nguyên tử */
  build?: boolean;
  p?: number;
  n?: number;
  e?: number;
  /** danh sách nguyên tố cho chọn nhanh */
  list?: number[];
}

export function AtomView({ doc, onDoc, showValues }: EngineProps<AtomDoc, unknown>) {
  const [spin, setSpin] = useState(0);
  const [run, setRun] = useState(true);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      setSpin((s) => s + ((now - last) / 1000) * 0.8);
      last = now;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [run]);
  const p = doc.build ? doc.p ?? 1 : doc.Z;
  const n = doc.build ? doc.n ?? 0 : MASS_NUMBER[doc.Z] - doc.Z;
  const e = doc.build ? doc.e ?? 1 : doc.Z;
  const el = elByZ(p);
  const shells = fillShells(e);
  const set = (k: 'p' | 'n' | 'e', d: number) => {
    const cur = { p, n, e };
    const max = { p: 20, n: 22, e: 20 }[k];
    const v = Math.max(k === 'p' ? 1 : 0, Math.min(max, cur[k] + d));
    onDoc({ ...doc, p, n, e, [k]: v });
  };
  const list = doc.list ?? Array.from({ length: 20 }, (_, i) => i + 1);
  const scale = shells.length >= 4 ? 0.95 : shells.length === 3 ? 1.1 : 1.35;
  const neutral = p === e;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <ShellAtom x={520} y={340} Z={p} n={n} e={e} scale={scale} spin={spin} />
          {/* chú thích */}
          <g transform="translate(940 120)">
            <circle r={12} fill={PC} />
            <text x={24} y={6} className="lab-small">
              proton (p) – mang điện tích +1
            </text>
            <circle cy={40} r={12} fill={NCOL} />
            <text x={24} y={46} className="lab-small">
              neutron (n) – không mang điện
            </text>
            <circle cy={80} r={8} fill={EC} />
            <text x={24} y={86} className="lab-small">
              electron (e) – mang điện tích −1
            </text>
          </g>
          {showValues && (
            <g transform="translate(940 260)">
              <text className="lab-label">Hạt nhân: {p} p + {n} n</text>
              <text y={34} className="lab-label">
                Vỏ: {e} e, {shells.length} lớp
              </text>
              <text y={68} className="lab-label">
                Số e mỗi lớp: {shells.join(', ')}
              </text>
              <text y={102} className="lab-label">
                Khối lượng ≈ {p + n} amu
              </text>
            </g>
          )}
          <text x={520} y={50} textAnchor="middle" fontSize={34} fontWeight={800} fill="var(--ink)">
            {el ? `Nguyên tử ${el.name} (${el.sym})` : ''}
            {doc.build && !neutral ? ' – chưa trung hoà điện' : ''}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{doc.build ? 'Lắp ráp nguyên tử' : 'Mô hình nguyên tử'}</h3>
        {!doc.build && (
          <Row label="Nguyên tố">
            <div className="seg wrap">
              {list.map((z) => (
                <button key={z} className={z === doc.Z ? 'on' : ''} onClick={() => onDoc({ ...doc, Z: z })}>
                  {elByZ(z)?.sym}
                </button>
              ))}
            </div>
          </Row>
        )}
        {doc.build && (
          <div className="insp-table">
            <table>
              <tbody>
                {(['p', 'n', 'e'] as const).map((k) => (
                  <tr key={k}>
                    <th>{k === 'p' ? 'Proton' : k === 'n' ? 'Neutron' : 'Electron'}</th>
                    <td>
                      <button className="btn" onClick={() => set(k, -1)}>
                        −
                      </button>
                    </td>
                    <td style={{ fontWeight: 900, fontSize: '1.2rem' }}>{{ p, n, e }[k]}</td>
                    <td>
                      <button className="btn" onClick={() => set(k, 1)}>
                        +
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="insp-values two">
          <div>
            <span>Điện tích hạt nhân</span>
            <b>+{p}</b>
          </div>
          <div>
            <span>Số e lớp ngoài cùng</span>
            <b>{showValues ? shells[shells.length - 1] ?? 0 : '?'}</b>
          </div>
          <div>
            <span>Khối lượng nguyên tử</span>
            <b>{showValues ? `≈ ${p + n} amu` : '?'}</b>
          </div>
          <div>
            <span>Nguyên tử trung hoà?</span>
            <b>{showValues ? (neutral ? 'Có (p = e)' : 'Không') : '?'}</b>
          </div>
        </div>
        {doc.build && el && showValues && <p className="nature">Số proton = {p} → nguyên tố {el.name} ({el.sym})</p>}
        <div className="insp-actions">
          <button className="btn" onClick={() => setRun(!run)}>
            {run ? 'Dừng chuyển động electron' : 'Cho electron chuyển động'}
          </button>
          <button className="btn" onClick={() => onDoc(doc.build ? { ...doc, build: false } : { ...doc, build: true, p: doc.Z, n: MASS_NUMBER[doc.Z] - doc.Z, e: doc.Z })}>
            {doc.build ? 'Xem nguyên tử có sẵn' : 'Tự lắp ráp nguyên tử'}
          </button>
        </div>
        <p className="small">Nguyên tử gồm hạt nhân mang điện dương ở tâm và vỏ nguyên tử gồm các electron mang điện âm chuyển động quanh hạt nhân theo từng lớp. Lớp thứ nhất có tối đa 2 electron, lớp thứ hai tối đa 8 electron.</p>
        <p className="small muted">Khối lượng nguyên tử ≈ khối lượng hạt nhân (p + n), vì electron rất nhẹ. 1 amu ≈ 1,6605·10⁻²⁷ kg. Hình vẽ không đúng tỉ lệ: thực tế hạt nhân nhỏ hơn nguyên tử khoảng 10 000 lần.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Kí hiệu hoá học
// =====================================================================

export interface SymbolsDoc {
  mode: 'symbols';
  list: string[];
  ask: 'symbol' | 'name';
  open: string[];
}

export function SymbolsView({ doc, onDoc, showValues }: EngineProps<SymbolsDoc, unknown>) {
  const els = doc.list.map((s) => elBySym(s)!).filter(Boolean);
  const cols = els.length <= 12 ? 4 : 5;
  const w = 1120 / cols;
  const h = Math.min(130, 600 / Math.ceil(els.length / cols));
  const toggle = (s: string) => onDoc({ ...doc, open: doc.open.includes(s) ? doc.open.filter((x) => x !== s) : [...doc.open, s] });
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <text x={600} y={40} textAnchor="middle" className="lab-label">
            {doc.ask === 'symbol' ? 'Viết kí hiệu hoá học của các nguyên tố – bấm vào ô để kiểm tra' : 'Gọi tên các nguyên tố có kí hiệu sau – bấm vào ô để kiểm tra'}
          </text>
          {els.map((e, i) => {
            const x = 40 + (i % cols) * w;
            const y = 64 + Math.floor(i / cols) * h;
            const open = showValues || doc.open.includes(e.sym);
            return (
              <g key={e.sym} className="draggable" onPointerDown={() => toggle(e.sym)}>
                <rect x={x + 6} y={y + 6} width={w - 12} height={h - 12} rx={14} fill={open ? CAT_COLOR[e.cat] : 'var(--surface)'} stroke="var(--line)" strokeWidth={2} />
                <text x={x + w / 2} y={y + h / 2 - 4} textAnchor="middle" fontSize={doc.ask === 'symbol' ? 26 : 44} fontWeight={800} fill="var(--ink)">
                  {doc.ask === 'symbol' ? e.name : e.sym}
                </text>
                <text x={x + w / 2} y={y + h / 2 + 34} textAnchor="middle" fontSize={doc.ask === 'symbol' ? 34 : 22} fontWeight={900} fill={open ? '#1b1f24' : 'var(--muted)'}>
                  {open ? (doc.ask === 'symbol' ? e.sym : e.name) : '?'}
                </text>
                {open && e.latin && (
                  <text x={x + w - 16} y={y + 28} textAnchor="end" fontSize={14} fill="#333" fontStyle="italic">
                    {e.latin}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Kí hiệu hoá học</h3>
        <Row label="Hỏi">
          <Seg value={doc.ask} options={['symbol', 'name'] as const} onChange={(a) => onDoc({ ...doc, ask: a, open: [] })} fmtOpt={(a) => (a === 'symbol' ? 'Tên → kí hiệu' : 'Kí hiệu → tên')} />
        </Row>
        <button className="btn" onClick={() => onDoc({ ...doc, open: [] })}>
          Che lại tất cả
        </button>
        <p className="small">Kí hiệu hoá học gồm một hoặc hai chữ cái trong tên nguyên tố. Chữ cái đầu viết in hoa, chữ cái thứ hai (nếu có) viết thường và nhỏ hơn. Ví dụ: H, O, C; Ca, Cl, Mg.</p>
        <p className="small muted">Một số kí hiệu lấy từ tên Latin: Na (Natrium), K (Kalium), Fe (Ferrum), Cu (Cuprum), Ag (Argentum), Au (Aurum), Hg (Hydrargyrum), Pb (Plumbum).</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Bảng tuần hoàn (chu kì 1–4)
// =====================================================================

export interface PTableDoc {
  mode: 'ptable';
  sel: number;
  hl: 'none' | 'period' | 'group' | 'cat';
  /** che kí hiệu để học sinh đoán */
  quiz?: boolean;
}

export function PTableView({ doc, onDoc, showValues }: EngineProps<PTableDoc, unknown>) {
  const el = elByZ(doc.sel) ?? ELEMENTS[0];
  const grid: (typeof ELEMENTS[number] | null)[][] = Array.from({ length: 4 }, () => Array(18).fill(null));
  for (const e of ELEMENTS) grid[e.period - 1][e.col - 1] = e;
  const dim = (e: (typeof ELEMENTS)[number]) => (doc.hl === 'period' && e.period !== el.period) || (doc.hl === 'group' && e.col !== el.col);
  const bg = (e: (typeof ELEMENTS)[number]) => (doc.hl === 'none' ? 'var(--surface-2)' : CAT_COLOR[e.cat]);
  const isA = el.col <= 2 || el.col >= 13;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg" style={{ overflow: 'auto' }}>
        <div className="html-table-wrap">
          <h2>Bảng tuần hoàn các nguyên tố hoá học (chu kì 1 – 4)</h2>
          <table className="ptable">
            <thead>
              <tr>
                <th></th>
                {Array.from({ length: 18 }, (_, c) => (
                  <th key={c}>{groupName(c + 1)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grid.map((row, r) => (
                <tr key={r}>
                  <th>{r + 1}</th>
                  {row.map((e, c) =>
                    e ? (
                      <td key={c} className={`${e.Z === el.Z ? 'sel' : ''} ${dim(e) ? 'dim' : ''}`} style={{ background: bg(e) }} onClick={() => onDoc({ ...doc, sel: e.Z })}>
                        <span className="z">{e.Z}</span>
                        <span className="sym">{doc.quiz && !showValues && e.Z !== el.Z ? '?' : e.sym}</span>
                        <span className="nm">{vn(e.mass, 1)}</span>
                      </td>
                    ) : (
                      <td key={c} className="empty" />
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {doc.hl === 'cat' && (
            <p style={{ textAlign: 'center' }}>
              {(Object.keys(CAT_NAME) as (keyof typeof CAT_NAME)[]).map((k) => (
                <span key={k} style={{ background: CAT_COLOR[k], padding: '4px 12px', borderRadius: 8, margin: '0 6px', color: '#1b1f24', fontWeight: 700 }}>
                  {CAT_NAME[k]}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
      <aside className="eng-side">
        <h3>Ô nguyên tố</h3>
        <svg viewBox="0 0 300 200" style={{ width: '100%', maxWidth: 320 }}>
          <rect x={80} y={10} width={140} height={160} rx={12} fill={CAT_COLOR[el.cat]} stroke="#333" strokeWidth={2} />
          <text x={96} y={42} fontSize={22} fontWeight={800} fill="#1b1f24">
            {el.Z}
          </text>
          <text x={150} y={108} textAnchor="middle" fontSize={56} fontWeight={900} fill="#1b1f24">
            {el.sym}
          </text>
          <text x={150} y={136} textAnchor="middle" fontSize={16} fontWeight={700} fill="#1b1f24">
            {el.name}
          </text>
          <text x={150} y={160} textAnchor="middle" fontSize={16} fill="#1b1f24">
            {vn(el.mass, 1)}
          </text>
          <g fontSize={13} fill="var(--ink-2)">
            <text x={4} y={38}>Số hiệu</text>
            <text x={4} y={54}>nguyên tử</text>
            <text x={232} y={100}>Kí hiệu</text>
            <text x={232} y={136}>Tên</text>
            <text x={4} y={160}>Khối lượng</text>
            <text x={4} y={176}>nguyên tử</text>
          </g>
        </svg>
        <div className="insp-values two">
          <div>
            <span>Chu kì</span>
            <b>{showValues ? el.period : '?'}</b>
          </div>
          <div>
            <span>Nhóm</span>
            <b>{showValues ? groupName(el.col) : '?'}</b>
          </div>
          <div>
            <span>Số lớp electron</span>
            <b>{showValues ? el.shells.length : '?'}</b>
          </div>
          <div>
            <span>Số e lớp ngoài cùng</span>
            <b>{showValues ? el.shells[el.shells.length - 1] : '?'}</b>
          </div>
          <div>
            <span>Loại nguyên tố</span>
            <b>{showValues ? CAT_NAME[el.cat] : '?'}</b>
          </div>
          <div>
            <span>Electron các lớp</span>
            <b>{showValues ? el.shells.join(', ') : '?'}</b>
          </div>
        </div>
        <Row label="Làm nổi bật">
          <Seg value={doc.hl} options={['none', 'period', 'group', 'cat'] as const} onChange={(h) => onDoc({ ...doc, hl: h })} fmtOpt={(h) => ({ none: 'Không', period: 'Chu kì', group: 'Nhóm', cat: 'Kim loại – phi kim' })[h]} />
        </Row>
        {showValues && <p className="small">{isA ? `Nguyên tố nhóm A: số thứ tự nhóm (${groupName(el.col)}) = số electron lớp ngoài cùng.` : 'Nguyên tố nhóm B (kim loại chuyển tiếp).'} Số thứ tự chu kì = số lớp electron.</p>}
        <p className="small muted">Các nguyên tố được xếp theo chiều tăng dần điện tích hạt nhân. Các nguyên tố cùng hàng (chu kì) có cùng số lớp electron; cùng cột (nhóm) có tính chất hoá học tương tự nhau.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Phân tử – đơn chất – hợp chất
// =====================================================================

interface MolModel {
  name: string;
  f: string;
  kind: 'simple' | 'compound';
  /** dạng tồn tại: phân tử rời rạc, mạng tinh thể kim loại, mạng ion, nguyên tử rời rạc (khí hiếm) */
  form: 'molecule' | 'metal' | 'ionic' | 'atom';
  atoms: { el: string; x: number; y: number }[];
  bonds: [number, number, number][];
  state: string;
  note: string;
  /** hợp chất ion: điện tích của ion (1 hoặc 2) */
  charge?: number;
}

export const MOL7: Record<string, MolModel> = {
  Cu: { name: 'Copper (đồng)', f: 'Cu', kind: 'simple', form: 'metal', atoms: [{ el: 'Cu', x: 0, y: 0 }], bonds: [], state: 'rắn', note: 'Đơn chất kim loại: các nguyên tử sắp xếp khít nhau, phân tử của đơn chất kim loại được coi là nguyên tử.' },
  Fe: { name: 'Iron (sắt)', f: 'Fe', kind: 'simple', form: 'metal', atoms: [{ el: 'Fe', x: 0, y: 0 }], bonds: [], state: 'rắn', note: 'Đơn chất kim loại sắt. Khối lượng phân tử bằng khối lượng nguyên tử: 56 amu.' },
  He: { name: 'Helium', f: 'He', kind: 'simple', form: 'atom', atoms: [{ el: 'He', x: 0, y: 0 }], bonds: [], state: 'khí', note: 'Khí hiếm: phân tử chỉ gồm 1 nguyên tử, các nguyên tử đứng riêng rẽ.' },
  H2: { name: 'Hydrogen', f: 'H2', kind: 'simple', form: 'molecule', atoms: [{ el: 'H', x: -17, y: 0 }, { el: 'H', x: 17, y: 0 }], bonds: [[0, 1, 1]], state: 'khí', note: 'Phân tử gồm 2 nguyên tử H liên kết với nhau.' },
  O2: { name: 'Oxygen', f: 'O2', kind: 'simple', form: 'molecule', atoms: [{ el: 'O', x: -22, y: 0 }, { el: 'O', x: 22, y: 0 }], bonds: [[0, 1, 2]], state: 'khí', note: 'Phân tử gồm 2 nguyên tử O. Oxygen duy trì sự cháy và sự sống.' },
  N2: { name: 'Nitrogen', f: 'N2', kind: 'simple', form: 'molecule', atoms: [{ el: 'N', x: -22, y: 0 }, { el: 'N', x: 22, y: 0 }], bonds: [[0, 1, 3]], state: 'khí', note: 'Chiếm khoảng 78% thể tích không khí.' },
  Cl2: { name: 'Chlorine', f: 'Cl2', kind: 'simple', form: 'molecule', atoms: [{ el: 'Cl', x: -24, y: 0 }, { el: 'Cl', x: 24, y: 0 }], bonds: [[0, 1, 1]], state: 'khí', note: 'Khí màu vàng lục, độc; dùng khử trùng nước.' },
  O3: { name: 'Ozone', f: 'O3', kind: 'simple', form: 'molecule', atoms: [{ el: 'O', x: 0, y: -16 }, { el: 'O', x: -38, y: 18 }, { el: 'O', x: 38, y: 18 }], bonds: [[0, 1, 2], [0, 2, 1]], state: 'khí', note: 'Cùng tạo nên từ nguyên tố oxygen nhưng phân tử gồm 3 nguyên tử O. Tầng ozone bảo vệ Trái Đất khỏi tia cực tím.' },
  H2O: { name: 'Nước', f: 'H2O', kind: 'compound', form: 'molecule', atoms: [{ el: 'O', x: 0, y: -8 }, { el: 'H', x: -34, y: 18 }, { el: 'H', x: 34, y: 18 }], bonds: [[0, 1, 1], [0, 2, 1]], state: 'lỏng', note: 'Phân tử gồm 2 nguyên tử H và 1 nguyên tử O.' },
  CO2: { name: 'Carbon dioxide', f: 'CO2', kind: 'compound', form: 'molecule', atoms: [{ el: 'O', x: -46, y: 0 }, { el: 'C', x: 0, y: 0 }, { el: 'O', x: 46, y: 0 }], bonds: [[0, 1, 2], [1, 2, 2]], state: 'khí', note: 'Phân tử gồm 1 nguyên tử C và 2 nguyên tử O. Khí gây hiệu ứng nhà kính.' },
  NH3: { name: 'Ammonia', f: 'NH3', kind: 'compound', form: 'molecule', atoms: [{ el: 'N', x: 0, y: -6 }, { el: 'H', x: -36, y: 18 }, { el: 'H', x: 36, y: 18 }, { el: 'H', x: 0, y: -44 }], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], state: 'khí', note: 'Khí mùi khai, dùng sản xuất phân đạm.' },
  CH4: { name: 'Methane', f: 'CH4', kind: 'compound', form: 'molecule', atoms: [{ el: 'C', x: 0, y: 0 }, { el: 'H', x: -38, y: 0 }, { el: 'H', x: 38, y: 0 }, { el: 'H', x: 0, y: -38 }, { el: 'H', x: 0, y: 38 }], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], state: 'khí', note: 'Thành phần chính của khí thiên nhiên, khí biogas.' },
  HCl: { name: 'Hydrogen chloride', f: 'HCl', kind: 'compound', form: 'molecule', atoms: [{ el: 'H', x: -22, y: 0 }, { el: 'Cl', x: 22, y: 0 }], bonds: [[0, 1, 1]], state: 'khí', note: 'Tan trong nước tạo dung dịch hydrochloric acid.' },
  NaCl: { name: 'Sodium chloride (muối ăn)', f: 'NaCl', kind: 'compound', form: 'ionic', charge: 1, atoms: [{ el: 'Na', x: 0, y: 0 }, { el: 'Cl', x: 0, y: 0 }], bonds: [], state: 'rắn', note: 'Hợp chất ion: các ion Na⁺ và Cl⁻ sắp xếp xen kẽ thành mạng tinh thể; công thức NaCl cho biết tỉ lệ 1 : 1.' },
  KCl: { name: 'Potassium chloride', f: 'KCl', kind: 'compound', form: 'ionic', charge: 1, atoms: [{ el: 'K', x: 0, y: 0 }, { el: 'Cl', x: 0, y: 0 }], bonds: [], state: 'rắn', note: 'Hợp chất ion, dùng làm phân kali (bón cho cây), muối ăn ít natri.' },
  MgO: { name: 'Magnesium oxide', f: 'MgO', kind: 'compound', form: 'ionic', charge: 2, atoms: [{ el: 'Mg', x: 0, y: 0 }, { el: 'O', x: 0, y: 0 }], bonds: [], state: 'rắn', note: 'Hợp chất ion tạo thành khi đốt magnesium trong không khí (ngọn lửa sáng chói); nóng chảy ở khoảng 2 850 °C, dùng làm vật liệu chịu nhiệt.' },
  CaO: { name: 'Calcium oxide (vôi sống)', f: 'CaO', kind: 'compound', form: 'ionic', charge: 2, atoms: [{ el: 'Ca', x: 0, y: 0 }, { el: 'O', x: 0, y: 0 }], bonds: [], state: 'rắn', note: 'Hợp chất ion; vôi sống dùng trong xây dựng, khử chua đất, tẩy uế chuồng trại.' },
  Al: { name: 'Aluminium (nhôm)', f: 'Al', kind: 'simple', form: 'metal', atoms: [{ el: 'Al', x: 0, y: 0 }], bonds: [], state: 'rắn', note: 'Đơn chất kim loại nhẹ, dẫn điện, dẫn nhiệt tốt; làm dây điện, nồi, vỏ máy bay.' },
  Mg: { name: 'Magnesium', f: 'Mg', kind: 'simple', form: 'metal', atoms: [{ el: 'Mg', x: 0, y: 0 }], bonds: [], state: 'rắn', note: 'Đơn chất kim loại; cháy trong không khí với ngọn lửa sáng chói (dùng làm pháo sáng).' },
  Ne: { name: 'Neon', f: 'Ne', kind: 'simple', form: 'atom', atoms: [{ el: 'Ne', x: 0, y: 0 }], bonds: [], state: 'khí', note: 'Khí hiếm; phát ánh sáng đỏ cam trong đèn quảng cáo (đèn neon).' },
  Ar: { name: 'Argon', f: 'Ar', kind: 'simple', form: 'atom', atoms: [{ el: 'Ar', x: 0, y: 0 }], bonds: [], state: 'khí', note: 'Khí hiếm chiếm gần 1% thể tích không khí; bơm vào bóng đèn sợi đốt để bảo vệ dây tóc.' },
  C: { name: 'Carbon (than chì, kim cương)', f: 'C', kind: 'simple', form: 'metal', atoms: [{ el: 'C', x: 0, y: 0 }], bonds: [], state: 'rắn', note: 'Đơn chất phi kim có cấu trúc gồm rất nhiều nguyên tử C liên kết với nhau; công thức được viết là C. Than chì và kim cương đều là đơn chất của carbon.' },
  CO: { name: 'Carbon monoxide', f: 'CO', kind: 'compound', form: 'molecule', atoms: [{ el: 'C', x: -22, y: 0 }, { el: 'O', x: 22, y: 0 }], bonds: [[0, 1, 3]], state: 'khí', note: 'Khí không màu, không mùi, rất độc; sinh ra khi đốt nhiên liệu thiếu không khí (bếp than, xe máy chạy trong phòng kín).' },
  SO2: { name: 'Sulfur dioxide', f: 'SO2', kind: 'compound', form: 'molecule', atoms: [{ el: 'S', x: 0, y: -10 }, { el: 'O', x: -42, y: 18 }, { el: 'O', x: 42, y: 18 }], bonds: [[0, 1, 2], [0, 2, 2]], state: 'khí', note: 'Khí mùi hắc, độc; sinh ra khi đốt lưu huỳnh, than đá; là một nguyên nhân gây mưa acid.' },
  H2S: { name: 'Hydrogen sulfide', f: 'H2S', kind: 'compound', form: 'molecule', atoms: [{ el: 'S', x: 0, y: -10 }, { el: 'H', x: -38, y: 20 }, { el: 'H', x: 38, y: 20 }], bonds: [[0, 1, 1], [0, 2, 1]], state: 'khí', note: 'Khí mùi trứng thối, rất độc; sinh ra khi chất hữu cơ (trứng, rác thải) bị phân huỷ.' },
  H2O2: { name: 'Hydrogen peroxide', f: 'H2O2', kind: 'compound', form: 'molecule', atoms: [{ el: 'O', x: -20, y: 0 }, { el: 'O', x: 20, y: 0 }, { el: 'H', x: -44, y: -26 }, { el: 'H', x: 44, y: 26 }], bonds: [[0, 1, 1], [0, 2, 1], [1, 3, 1]], state: 'lỏng', note: 'Cùng tạo nên từ H và O như nước nhưng tỉ lệ số nguyên tử khác (2 : 2) nên là chất khác; dung dịch 3% (oxy già) dùng sát trùng vết thương.' },
  C2H5OH: { name: 'Ethanol (cồn)', f: 'C2H6O', kind: 'compound', form: 'molecule', atoms: [{ el: 'C', x: -40, y: 0 }, { el: 'C', x: 0, y: 0 }, { el: 'O', x: 38, y: -10 }, { el: 'H', x: 62, y: 8 }, { el: 'H', x: -60, y: -22 }, { el: 'H', x: -60, y: 22 }, { el: 'H', x: -46, y: 30 }, { el: 'H', x: 0, y: -34 }, { el: 'H', x: 0, y: 34 }], bonds: [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 4, 1], [0, 5, 1], [0, 6, 1], [1, 7, 1], [1, 8, 1]], state: 'lỏng', note: 'Hợp chất của C, H, O (công thức C₂H₅OH); có trong rượu, cồn sát trùng, nhiên liệu đèn cồn.' },
};

export interface MoleculesDoc {
  mode: 'molecules';
  list: string[];
  sel: string;
}

export function MoleculesView({ doc, onDoc, showValues }: EngineProps<MoleculesDoc, unknown>) {
  const m = MOL7[doc.sel] ?? MOL7.H2O;
  const counts = parseFormula(m.f);
  const M = Object.entries(counts).reduce((s, [el, k]) => s + (ATOMIC_MASS[el] ?? elBySym(el)?.mass ?? 0) * k, 0);
  // vùng mẫu chất (nhiều hạt) bên trái
  const sample = () => {
    if (m.form === 'metal' || m.form === 'ionic') {
      const out = [];
      for (let r = 0; r < 6; r++)
        for (let c = 0; c < 6; c++) {
          const el = m.form === 'ionic' ? m.atoms[(r + c) % 2].el : m.atoms[0].el;
          const big = m.form === 'ionic' && (r + c) % 2 === 1;
          out.push(<Atom key={`${r}-${c}`} x={110 + c * 50 + (m.form === 'metal' && r % 2 ? 25 : 0)} y={200 + r * 50} el={el} r={big ? 26 : 22} label={m.form === 'ionic'} />);
        }
      return out;
    }
    const pos = [
      [140, 210],
      [300, 190],
      [220, 300],
      [120, 400],
      [320, 380],
      [210, 470],
    ];
    return pos.map(([x, y], i) => (
      <g key={i} transform={`translate(${x} ${y}) rotate(${(i * 57) % 360})`}>
        {m.bonds.map(([a, b, o], k) => (
          <Bond key={k} x1={m.atoms[a].x} y1={m.atoms[a].y} x2={m.atoms[b].x} y2={m.atoms[b].y} order={o} color="#8a94a3" />
        ))}
        {m.atoms.map((a, k) => (
          <Atom key={k} x={a.x} y={a.y} el={a.el} r={a.el === 'H' ? 13 : 19} label={false} />
        ))}
      </g>
    ));
  };
  const s = 2.2;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <rect x={60} y={140} width={360} height={400} rx={18} fill="var(--surface)" stroke="var(--line)" strokeWidth={2} />
          <text x={240} y={124} textAnchor="middle" className="lab-label">
            Mẫu chất (mô hình các hạt)
          </text>
          {sample()}
          <rect x={480} y={140} width={660} height={400} rx={18} fill="var(--surface)" stroke="var(--line)" strokeWidth={2} />
          <text x={810} y={124} textAnchor="middle" className="lab-label">
            {m.form === 'metal' ? (m.atoms[0].el === 'C' ? 'Một nguyên tử carbon' : 'Một nguyên tử (phân tử) kim loại') : m.form === 'ionic' ? `Một cặp ion ${m.atoms[0].el}${m.charge === 2 ? '²⁺' : '⁺'} và ${m.atoms[1].el}${m.charge === 2 ? '²⁻' : '⁻'}` : m.form === 'atom' ? 'Một nguyên tử khí hiếm' : 'Một phân tử'}
          </text>
          {m.form === 'ionic' ? (
            <g>
              <Atom x={720} y={340} el={m.atoms[0].el} r={44} />
              <Atom x={900} y={340} el={m.atoms[1].el} r={56} />
              <text x={720} y={290} textAnchor="middle" fontSize={26} fontWeight={900} fill="var(--danger)">
                {m.charge === 2 ? '2+' : '+'}
              </text>
              <text x={900} y={278} textAnchor="middle" fontSize={26} fontWeight={900} fill={EC}>
                {m.charge === 2 ? '2−' : '−'}
              </text>
            </g>
          ) : (
            <g transform="translate(810 340)">
              {m.bonds.map(([a, b, o], k) => (
                <Bond key={k} x1={m.atoms[a].x * s} y1={m.atoms[a].y * s} x2={m.atoms[b].x * s} y2={m.atoms[b].y * s} order={o} color="#8a94a3" />
              ))}
              {m.atoms.map((a, k) => (
                <Atom key={k} x={a.x * s} y={a.y * s} el={a.el} r={(a.el === 'H' ? 16 : 25) * 1.6} />
              ))}
            </g>
          )}
          <text x={810} y={600} textAnchor="middle" fontSize={34} fontWeight={800} fill="var(--ink)">
            {pretty(m.f)} – {m.name}
          </text>
          {showValues && (
            <text x={810} y={645} textAnchor="middle" fontSize={24} fontWeight={700} fill="var(--accent)">
              Khối lượng phân tử = {Object.entries(counts)
                .map(([el, k]) => `${k > 1 ? `${k}×` : ''}${ATOMIC_MASS[el] ?? elBySym(el)?.mass}`)
                .join(' + ')}{' '}
              = {vn(M, 1)} amu
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Phân tử – đơn chất – hợp chất</h3>
        <Row label="Chất">
          <div className="seg wrap">
            {doc.list.map((k) => (
              <button key={k} className={k === doc.sel ? 'on' : ''} onClick={() => onDoc({ ...doc, sel: k })}>
                {pretty(MOL7[k].f)}
              </button>
            ))}
          </div>
        </Row>
        <div className="insp-values two">
          <div>
            <span>Loại chất</span>
            <b>{showValues ? (m.kind === 'simple' ? 'Đơn chất' : 'Hợp chất') : '?'}</b>
          </div>
          <div>
            <span>Số nguyên tố tạo nên</span>
            <b>{showValues ? Object.keys(counts).length : '?'}</b>
          </div>
          <div>
            <span>Thành phần</span>
            <b style={{ fontSize: '0.95rem' }}>{showValues ? Object.entries(counts).map(([el, k]) => `${k} ${el}`).join(', ') : '?'}</b>
          </div>
          <div>
            <span>Thể (ở nhiệt độ phòng)</span>
            <b>{m.state}</b>
          </div>
        </div>
        <p className="small">{m.note}</p>
        <p className="small muted">Phân tử là hạt đại diện cho chất, gồm một số nguyên tử liên kết với nhau. Đơn chất được tạo nên từ một nguyên tố; hợp chất được tạo nên từ hai hay nhiều nguyên tố. Khối lượng phân tử bằng tổng khối lượng các nguyên tử trong phân tử (đơn vị amu).</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Liên kết hoá học: ion và cộng hoá trị
// =====================================================================

interface BondModel {
  title: string;
  type: 'ionic' | 'covalent' | 'noble';
  atoms: { sym: string; x: number; y: number }[];
  /** liên kết cộng hoá trị: [i, j, số cặp e dùng chung] */
  bonds?: [number, number, number][];
  /** liên kết ion: số electron kim loại nhường */
  give?: number;
  eq?: string;
  note: string;
}

export const BONDS7: Record<string, BondModel> = {
  noble: { title: 'Khí hiếm He, Ne, Ar', type: 'noble', atoms: [{ sym: 'He', x: -340, y: 0 }, { sym: 'Ne', x: -60, y: 0 }, { sym: 'Ar', x: 290, y: 0 }], note: 'Lớp electron ngoài cùng của khí hiếm có 8 electron (riêng He có 2): cấu hình bền vững, nên khí hiếm hầu như không tham gia phản ứng hoá học, tồn tại dạng nguyên tử riêng rẽ.' },
  NaCl: { title: 'Sodium chloride NaCl', type: 'ionic', atoms: [{ sym: 'Na', x: -230, y: 0 }, { sym: 'Cl', x: 230, y: 0 }], give: 1, eq: 'Na → Na⁺ + 1e;   Cl + 1e → Cl⁻', note: 'Nguyên tử Na nhường 1 electron lớp ngoài cùng cho nguyên tử Cl, tạo ion Na⁺ và Cl⁻ đều có lớp vỏ bền như khí hiếm. Hai ion trái dấu hút nhau tạo liên kết ion.' },
  MgO: { title: 'Magnesium oxide MgO', type: 'ionic', atoms: [{ sym: 'Mg', x: -230, y: 0 }, { sym: 'O', x: 230, y: 0 }], give: 2, eq: 'Mg → Mg²⁺ + 2e;   O + 2e → O²⁻', note: 'Nguyên tử Mg nhường 2 electron cho nguyên tử O, tạo ion Mg²⁺ và O²⁻. Hai ion hút nhau bằng lực hút tĩnh điện.' },
  KCl: { title: 'Potassium chloride KCl', type: 'ionic', atoms: [{ sym: 'K', x: -230, y: 0 }, { sym: 'Cl', x: 230, y: 0 }], give: 1, eq: 'K → K⁺ + 1e;   Cl + 1e → Cl⁻', note: 'Nguyên tử K (2, 8, 8, 1) nhường 1 electron cho nguyên tử Cl, tạo ion K⁺ (giống Ar) và Cl⁻ (giống Ar).' },
  CaO: { title: 'Calcium oxide CaO', type: 'ionic', atoms: [{ sym: 'Ca', x: -230, y: 0 }, { sym: 'O', x: 230, y: 0 }], give: 2, eq: 'Ca → Ca²⁺ + 2e;   O + 2e → O²⁻', note: 'Nguyên tử Ca nhường 2 electron cho nguyên tử O, tạo ion Ca²⁺ (giống Ar) và O²⁻ (giống Ne).' },
  NaF: { title: 'Sodium fluoride NaF', type: 'ionic', atoms: [{ sym: 'Na', x: -230, y: 0 }, { sym: 'F', x: 230, y: 0 }], give: 1, eq: 'Na → Na⁺ + 1e;   F + 1e → F⁻', note: 'Hợp chất ion có trong một số loại kem đánh răng giúp chống sâu răng. Ion Na⁺ và F⁻ đều có lớp vỏ giống khí hiếm Ne.' },
  H2: { title: 'Hydrogen H₂', type: 'covalent', atoms: [{ sym: 'H', x: -30, y: 0 }, { sym: 'H', x: 30, y: 0 }], bonds: [[0, 1, 1]], note: 'Mỗi nguyên tử H góp 1 electron tạo thành 1 cặp electron dùng chung. Mỗi nguyên tử H có 2 electron ở lớp ngoài cùng, giống khí hiếm He.' },
  Cl2: { title: 'Chlorine Cl₂', type: 'covalent', atoms: [{ sym: 'Cl', x: -92, y: 0 }, { sym: 'Cl', x: 92, y: 0 }], bonds: [[0, 1, 1]], note: 'Mỗi nguyên tử Cl góp 1 electron tạo 1 cặp electron dùng chung; mỗi nguyên tử Cl có 8 electron lớp ngoài cùng, giống khí hiếm Ar.' },
  O2: { title: 'Oxygen O₂', type: 'covalent', atoms: [{ sym: 'O', x: -64, y: 0 }, { sym: 'O', x: 64, y: 0 }], bonds: [[0, 1, 2]], note: 'Mỗi nguyên tử O góp 2 electron tạo 2 cặp electron dùng chung; mỗi nguyên tử O có 8 electron lớp ngoài cùng.' },
  N2: { title: 'Nitrogen N₂', type: 'covalent', atoms: [{ sym: 'N', x: -64, y: 0 }, { sym: 'N', x: 64, y: 0 }], bonds: [[0, 1, 3]], note: 'Mỗi nguyên tử N góp 3 electron tạo 3 cặp electron dùng chung.' },
  HCl: { title: 'Hydrogen chloride HCl', type: 'covalent', atoms: [{ sym: 'H', x: -70, y: 0 }, { sym: 'Cl', x: 60, y: 0 }], bonds: [[0, 1, 1]], note: 'Nguyên tử H và Cl mỗi nguyên tử góp 1 electron tạo 1 cặp electron dùng chung. H có 2 e lớp ngoài (giống He), Cl có 8 e lớp ngoài (giống Ar).' },
  H2O: { title: 'Nước H₂O', type: 'covalent', atoms: [{ sym: 'O', x: 0, y: -20 }, { sym: 'H', x: -78, y: 52 }, { sym: 'H', x: 78, y: 52 }], bonds: [[0, 1, 1], [0, 2, 1]], note: 'Nguyên tử O góp 2 electron với 2 nguyên tử H (mỗi H góp 1 electron), tạo 2 cặp electron dùng chung.' },
  F2: { title: 'Fluorine F₂', type: 'covalent', atoms: [{ sym: 'F', x: -50, y: 0 }, { sym: 'F', x: 50, y: 0 }], bonds: [[0, 1, 1]], note: 'Mỗi nguyên tử F (2, 7) góp 1 electron tạo 1 cặp electron dùng chung; mỗi nguyên tử F có 8 electron lớp ngoài cùng, giống Ne.' },
  HF: { title: 'Hydrogen fluoride HF', type: 'covalent', atoms: [{ sym: 'H', x: -52, y: 0 }, { sym: 'F', x: 46, y: 0 }], bonds: [[0, 1, 1]], note: 'H và F mỗi nguyên tử góp 1 electron tạo 1 cặp electron dùng chung.' },
  H2S: { title: 'Hydrogen sulfide H₂S', type: 'covalent', atoms: [{ sym: 'S', x: 0, y: -24 }, { sym: 'H', x: -98, y: 62 }, { sym: 'H', x: 98, y: 62 }], bonds: [[0, 1, 1], [0, 2, 1]], note: 'Nguyên tử S (2, 8, 6) góp 2 electron với 2 nguyên tử H, giống cách liên kết trong phân tử nước – S và O cùng nhóm VIA.' },
  PH3: { title: 'Phosphine PH₃', type: 'covalent', atoms: [{ sym: 'P', x: 0, y: 0 }, { sym: 'H', x: -112, y: 52 }, { sym: 'H', x: 112, y: 52 }, { sym: 'H', x: 0, y: -122 }], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], note: 'Nguyên tử P (2, 8, 5) góp 3 electron với 3 nguyên tử H, giống NH₃ – P và N cùng nhóm VA.' },
  C2H4: { title: 'Ethylene C₂H₄', type: 'covalent', atoms: [{ sym: 'C', x: -50, y: 0 }, { sym: 'C', x: 50, y: 0 }, { sym: 'H', x: -118, y: -70 }, { sym: 'H', x: -118, y: 70 }, { sym: 'H', x: 118, y: -70 }, { sym: 'H', x: 118, y: 70 }], bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]], note: 'Hai nguyên tử C dùng chung 2 cặp electron với nhau (liên kết đôi), mỗi C còn dùng chung 1 cặp với mỗi nguyên tử H. Ethylene làm trái cây mau chín.' },
  NH3: { title: 'Ammonia NH₃', type: 'covalent', atoms: [{ sym: 'N', x: 0, y: 0 }, { sym: 'H', x: -86, y: 40 }, { sym: 'H', x: 86, y: 40 }, { sym: 'H', x: 0, y: -94 }], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], note: 'Nguyên tử N góp 3 electron với 3 nguyên tử H, tạo 3 cặp electron dùng chung.' },
  CH4: { title: 'Methane CH₄', type: 'covalent', atoms: [{ sym: 'C', x: 0, y: 0 }, { sym: 'H', x: -94, y: 0 }, { sym: 'H', x: 94, y: 0 }, { sym: 'H', x: 0, y: -94 }, { sym: 'H', x: 0, y: 94 }], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], note: 'Nguyên tử C góp 4 electron với 4 nguyên tử H, tạo 4 cặp electron dùng chung.' },
  CO2: { title: 'Carbon dioxide CO₂', type: 'covalent', atoms: [{ sym: 'O', x: -124, y: 0 }, { sym: 'C', x: 0, y: 0 }, { sym: 'O', x: 124, y: 0 }], bonds: [[0, 1, 2], [1, 2, 2]], note: 'Nguyên tử C góp 4 electron, mỗi nguyên tử O góp 2 electron, tạo 4 cặp electron dùng chung (2 cặp với mỗi O).' },
};

const shellR = (k: number) => 34 + 28 * k;

function zOf(sym: string) {
  return elBySym(sym)?.Z ?? 1;
}

export interface BondDoc {
  mode: 'bond';
  pair: keyof typeof BONDS7;
  p: number;
  list?: (keyof typeof BONDS7)[];
}

export function BondView({ doc, onDoc, showValues }: EngineProps<BondDoc, unknown>) {
  const b = BONDS7[doc.pair] ?? BONDS7.NaCl;
  const t = Math.max(0, Math.min(1, doc.p));
  const list = doc.list ?? (Object.keys(BONDS7) as (keyof typeof BONDS7)[]);
  const C = { x: 600, y: 330 };
  let body: JSX.Element;
  if (b.type === 'noble') {
    body = (
      <g>
        {b.atoms.map((a) => (
          <ShellAtom key={a.sym} x={C.x + a.x} y={C.y + a.y} Z={zOf(a.sym)} sym={a.sym} scale={0.85} showNucleus={false} />
        ))}
      </g>
    );
  } else if (b.type === 'ionic') {
    const [m, nm] = b.atoms;
    const Zm = zOf(m.sym);
    const Zn = zOf(nm.sym);
    const g = b.give ?? 1;
    const done = t >= 1;
    const mSh = fillShells(Zm);
    const outerR = 46 * 0.9 + (mSh.length - 1) * 38 * 0.9;
    const nSh = fillShells(Zn);
    const nOuterR = 46 * 0.9 + (nSh.length - 1) * 38 * 0.9;
    body = (
      <g>
        <ShellAtom x={C.x + m.x} y={C.y} Z={Zm} e={done ? Zm - g : Zm} hideLast={done ? 0 : t > 0 ? g : 0} sym={m.sym} scale={0.9} showNucleus={false} label={false} />
        <ShellAtom x={C.x + nm.x} y={C.y} Z={Zn} e={done ? Zn + g : Zn} sym={nm.sym} scale={0.9} showNucleus={false} label={false} />
        {!done &&
          t > 0 &&
          Array.from({ length: g }, (_, k) => {
            const sx = C.x + m.x + outerR * Math.cos(-0.25 + k * 0.5);
            const sy = C.y + outerR * Math.sin(-0.25 + k * 0.5);
            const ex = C.x + nm.x - nOuterR;
            const ey = C.y + (k - (g - 1) / 2) * 22;
            const x = sx + (ex - sx) * t;
            const y = sy + (ey - sy) * t - Math.sin(t * Math.PI) * 90;
            return <circle key={k} cx={x} cy={y} r={9} fill="#ff8c1a" stroke="#fff" strokeWidth={2} />;
          })}
        <text x={C.x + m.x} y={C.y + 250} textAnchor="middle" fontSize={34} fontWeight={800} fill="var(--ink)">
          {m.sym}
          {done && <tspan fontSize={22} dy={-14}>{g === 1 ? '+' : `${g}+`}</tspan>}
        </text>
        <text x={C.x + nm.x} y={C.y + 250} textAnchor="middle" fontSize={34} fontWeight={800} fill="var(--ink)">
          {nm.sym}
          {done && <tspan fontSize={22} dy={-14}>{g === 1 ? '−' : `${g}−`}</tspan>}
        </text>
        {done && (
          <g>
            <path d={`M ${C.x - 80} ${C.y} L ${C.x + 80} ${C.y}`} stroke="var(--danger)" strokeWidth={4} strokeDasharray="10 6" />
            <text x={C.x} y={C.y - 16} textAnchor="middle" className="lab-small">
              lực hút tĩnh điện
            </text>
          </g>
        )}
        {showValues && b.eq && (
          <text x={C.x} y={60} textAnchor="middle" fontSize={26} fontWeight={800} fill="var(--accent)">
            {b.eq}
          </text>
        )}
      </g>
    );
  } else {
    // cộng hoá trị
    const spread = 1 + (1 - t) * 0.9;
    const atoms = b.atoms.map((a) => {
      const sh = fillShells(zOf(a.sym));
      return { ...a, Z: zOf(a.sym), sh, R: shellR(sh.length - 1), X: C.x + a.x * spread, Y: C.y + a.y * spread };
    });
    const bonds = b.bonds ?? [];
    const els: JSX.Element[] = [];
    atoms.forEach((a, i) => {
      // các lớp trong
      a.sh.forEach((cnt, k) => {
        const r = shellR(k);
        els.push(<circle key={`r${i}-${k}`} cx={a.X} cy={a.Y} r={r} fill="none" stroke="var(--line)" strokeWidth={2} />);
        if (k < a.sh.length - 1)
          for (let j = 0; j < cnt; j++) {
            const ang = (j / cnt) * Math.PI * 2;
            els.push(<circle key={`i${i}-${k}-${j}`} cx={a.X + r * Math.cos(ang)} cy={a.Y + r * Math.sin(ang)} r={5} fill={EC} opacity={0.7} />);
          }
      });
      // electron lớp ngoài không tham gia liên kết
      const myBonds = bonds.filter(([p, q]) => p === i || q === i);
      const shared = myBonds.reduce((s, [, , o]) => s + o, 0);
      const free = a.sh[a.sh.length - 1] - shared;
      const dirs = myBonds.map(([p, q]) => {
        const o = atoms[p === i ? q : p];
        return Math.atan2(o.Y - a.Y, o.X - a.X);
      });
      const slots: number[] = [];
      for (let s = 0; s < 8; s++) {
        const ang = (s / 8) * Math.PI * 2 + Math.PI / 8;
        if (dirs.every((d) => Math.abs(((ang - d + Math.PI * 3) % (Math.PI * 2)) - Math.PI) > 0.75)) slots.push(ang);
      }
      const pairs = Math.ceil(free / 2);
      for (let j = 0; j < free; j++) {
        const pi = Math.floor(j / 2);
        const slot = slots.length ? slots[Math.floor(((pi + 0.5) * slots.length) / pairs) % slots.length] : (j * Math.PI) / 4;
        const ang = slot + (j % 2 ? 0.16 : -0.16);
        els.push(<circle key={`f${i}-${j}`} cx={a.X + a.R * Math.cos(ang)} cy={a.Y + a.R * Math.sin(ang)} r={8} fill={EC} stroke="#fff" strokeWidth={1.5} />);
      }
    });
    // electron dùng chung
    bonds.forEach(([p, q, o], k) => {
      const A = atoms[p];
      const B = atoms[q];
      const d = Math.atan2(B.Y - A.Y, B.X - A.X);
      const mx = (A.X + A.R * Math.cos(d) + B.X - B.R * Math.cos(d)) / 2;
      const my = (A.Y + A.R * Math.sin(d) + B.Y - B.R * Math.sin(d)) / 2;
      const nx = -Math.sin(d);
      const ny = Math.cos(d);
      for (let j = 0; j < o; j++) {
        const off = (j - (o - 1) / 2) * 30;
        // electron của A và của B trong cặp
        ([
          [A, 1, -6],
          [B, -1, 6],
        ] as const).forEach(([src, dirSign, along], s) => {
          const own = { x: src.X + src.R * Math.cos(d + (dirSign > 0 ? 0 : Math.PI) + off / 120), y: src.Y + src.R * Math.sin(d + (dirSign > 0 ? 0 : Math.PI) + off / 120) };
          const fin = { x: mx + nx * off + Math.cos(d) * along, y: my + ny * off + Math.sin(d) * along };
          els.push(<circle key={`s${k}-${j}-${s}`} cx={own.x + (fin.x - own.x) * t} cy={own.y + (fin.y - own.y) * t} r={8} fill={t >= 1 ? '#ff8c1a' : EC} stroke="#fff" strokeWidth={1.5} />);
        });
        if (t >= 1) els.push(<ellipse key={`h${k}-${j}`} cx={mx + nx * off} cy={my + ny * off} rx={22} ry={14} transform={`rotate(${(d * 180) / Math.PI} ${mx + nx * off} ${my + ny * off})`} fill="none" stroke="#ff8c1a" strokeWidth={2} strokeDasharray="4 3" />);
      }
    });
    atoms.forEach((a, i) => {
      els.push(<circle key={`n${i}`} cx={a.X} cy={a.Y} r={20} fill={ATOM_COLOR[a.sym] ?? '#999'} stroke="#333" />);
      els.push(
        <text key={`t${i}`} x={a.X} y={a.Y + 6} textAnchor="middle" fontWeight={900} fontSize={16} fill={['C', 'N', 'Na', 'Mg'].includes(a.sym) ? '#fff' : '#222'}>
          {a.sym}
        </text>,
      );
    });
    body = <g transform={`translate(${C.x} ${C.y}) scale(1.35) translate(${-C.x} ${-C.y})`}>{els}</g>;
  }
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          {body}
          <text x={600} y={640} textAnchor="middle" fontSize={28} fontWeight={800} fill="var(--ink)">
            {b.title}
            {showValues && b.type !== 'noble' ? (b.type === 'ionic' ? ' – liên kết ion' : ' – liên kết cộng hoá trị') : ''}
          </text>
          {b.type === 'covalent' && t >= 1 && showValues && (
            <text x={600} y={60} textAnchor="middle" fontSize={22} fontWeight={700} fill="#c26a1b">
              Các electron màu cam trong vòng nét đứt là cặp electron dùng chung
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Liên kết hoá học</h3>
        <Row label="Chất">
          <div className="seg wrap">
            {list.map((k) => (
              <button key={k} className={k === doc.pair ? 'on' : ''} onClick={() => onDoc({ ...doc, pair: k, p: 0 })}>
                {k === 'noble' ? 'Khí hiếm' : pretty(k)}
              </button>
            ))}
          </div>
        </Row>
        {b.type !== 'noble' && (
          <>
            <Row label="Tiến trình">
              <Slider value={doc.p} min={0} max={1} step={0.01} digits={2} onChange={(v) => onDoc({ ...doc, p: v })} />
            </Row>
            <button className="btn primary" onClick={() => onDoc({ ...doc, p: doc.p >= 1 ? 0 : 1 })}>
              {doc.p >= 1 ? 'Về lúc đầu' : b.type === 'ionic' ? 'Chuyển electron' : 'Góp chung electron'}
            </button>
          </>
        )}
        <p className="small">{b.note}</p>
        <p className="small muted">
          {b.type === 'ionic'
            ? 'Liên kết ion: liên kết giữa ion dương và ion âm (thường giữa kim loại và phi kim). Hợp chất ion thường ở thể rắn, khó bay hơi, khó nóng chảy; khi tan trong nước tạo dung dịch dẫn điện.'
            : b.type === 'covalent'
              ? 'Liên kết cộng hoá trị: liên kết được tạo thành bởi một hay nhiều cặp electron dùng chung giữa hai nguyên tử (thường giữa các phi kim). Chất cộng hoá trị có thể ở thể rắn, lỏng, khí.'
              : 'Các nguyên tử khác có xu hướng nhường, nhận hoặc góp chung electron để đạt lớp vỏ bền vững giống khí hiếm.'}
        </p>
      </aside>
    </div>
  );
}

// =====================================================================
// Hoá trị và công thức hoá học
// =====================================================================

export const VALENCE: Record<string, { label: string; v: number[]; kind: 'el' | 'group' }> = {
  H: { label: 'H', v: [1], kind: 'el' },
  Na: { label: 'Na', v: [1], kind: 'el' },
  K: { label: 'K', v: [1], kind: 'el' },
  Ag: { label: 'Ag', v: [1], kind: 'el' },
  Ca: { label: 'Ca', v: [2], kind: 'el' },
  Mg: { label: 'Mg', v: [2], kind: 'el' },
  Ba: { label: 'Ba', v: [2], kind: 'el' },
  Zn: { label: 'Zn', v: [2], kind: 'el' },
  Cu: { label: 'Cu', v: [2, 1], kind: 'el' },
  Fe: { label: 'Fe', v: [2, 3], kind: 'el' },
  Al: { label: 'Al', v: [3], kind: 'el' },
  C: { label: 'C', v: [4, 2], kind: 'el' },
  S: { label: 'S', v: [2, 4, 6], kind: 'el' },
  N: { label: 'N', v: [3, 5], kind: 'el' },
  P: { label: 'P', v: [3, 5], kind: 'el' },
  O: { label: 'O', v: [2], kind: 'el' },
  Cl: { label: 'Cl', v: [1], kind: 'el' },
  Br: { label: 'Br', v: [1], kind: 'el' },
  Li: { label: 'Li', v: [1], kind: 'el' },
  Pb: { label: 'Pb', v: [2], kind: 'el' },
  Hg: { label: 'Hg', v: [2], kind: 'el' },
  Si: { label: 'Si', v: [4], kind: 'el' },
  Mn: { label: 'Mn', v: [2, 4], kind: 'el' },
  NH4: { label: 'NH4', v: [1], kind: 'group' },
  OH: { label: 'OH', v: [1], kind: 'group' },
  NO3: { label: 'NO3', v: [1], kind: 'group' },
  SO4: { label: 'SO4', v: [2], kind: 'group' },
  CO3: { label: 'CO3', v: [2], kind: 'group' },
  PO4: { label: 'PO4', v: [3], kind: 'group' },
};

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

export function buildFormula(a: string, va: number, b: string, vb: number): { x: number; y: number; f: string } {
  const g = gcd(va, vb);
  const x = vb / g;
  const y = va / g;
  const part = (s: string, n: number, group: boolean) => (n === 1 ? s : group ? `(${s})${n}` : `${s}${n}`);
  return { x, y, f: part(a, x, VALENCE[a]?.kind === 'group') + part(b, y, VALENCE[b]?.kind === 'group') };
}

export interface ValenceDoc {
  mode: 'valence';
  a: string;
  va: number;
  b: string;
  vb: number;
  step: number;
  /** danh sách để chọn */
  as?: string[];
  bs?: string[];
}

export function ValenceView({ doc, onDoc, showValues }: EngineProps<ValenceDoc, unknown>) {
  const { x, y, f } = buildFormula(doc.a, doc.va, doc.b, doc.vb);
  const as = doc.as ?? ['H', 'Li', 'Na', 'K', 'Ag', 'Ca', 'Mg', 'Ba', 'Zn', 'Pb', 'Cu', 'Fe', 'Al', 'C', 'Si', 'S', 'N', 'P', 'Mn', 'NH4'];
  const bs = doc.bs ?? ['O', 'Cl', 'Br', 'S', 'OH', 'NO3', 'SO4', 'CO3', 'PO4'];
  const st = showValues ? doc.step : Math.min(doc.step, 1);
  const L = Math.max(x * doc.va, 1);
  const unit = Math.min(140, 900 / L);
  const steps = [
    `Gọi công thức hoá học dạng chung: ${pretty(doc.a)}ₓ${VALENCE[doc.b]?.kind === 'group' ? `(${pretty(doc.b)})` : pretty(doc.b)}ᵧ`,
    `Theo quy tắc hoá trị: x × ${ROMAN[doc.va]} = y × ${ROMAN[doc.vb]}`,
    `Tỉ lệ x : y = ${doc.vb} : ${doc.va} = ${x} : ${y} (tối giản)`,
    `Vậy x = ${x}, y = ${y}. Công thức hoá học: ${pretty(f)}`,
  ];
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <text x={600} y={56} textAnchor="middle" fontSize={34} fontWeight={800} fill="var(--ink)">
            Lập công thức hoá học của hợp chất tạo bởi {pretty(doc.a)} ({ROMAN[doc.va]}) và {pretty(doc.b)} ({ROMAN[doc.vb]})
          </text>
          {/* mô hình "móc" hoá trị: x thanh dài a = y thanh dài b */}
          <g transform="translate(150 140)">
            <text x={0} y={-12} className="lab-small">
              Mỗi {pretty(doc.a)} có {doc.va} “liên kết”
            </text>
            {Array.from({ length: st >= 3 ? x : 1 }, (_, i) => (
              <g key={i} transform={`translate(${i * doc.va * unit} 0)`}>
                <rect width={doc.va * unit - 4} height={56} rx={10} fill="#ffd6a5" stroke="#a65b00" strokeWidth={2} />
                <text x={(doc.va * unit) / 2} y={38} textAnchor="middle" fontSize={26} fontWeight={800} fill="#1b1f24">
                  {pretty(doc.a)}
                </text>
              </g>
            ))}
            <text x={0} y={110} className="lab-small">
              Mỗi {pretty(doc.b)} có {doc.vb} “liên kết”
            </text>
            {Array.from({ length: st >= 3 ? y : 1 }, (_, i) => (
              <g key={i} transform={`translate(${i * doc.vb * unit} 122)`}>
                <rect width={doc.vb * unit - 4} height={56} rx={10} fill="#bde0fe" stroke="#1d4f8a" strokeWidth={2} />
                <text x={(doc.vb * unit) / 2} y={38} textAnchor="middle" fontSize={26} fontWeight={800} fill="#1b1f24">
                  {pretty(doc.b)}
                </text>
              </g>
            ))}
            {st >= 3 && (
              <g>
                <line x1={L * unit - 2} x2={L * unit - 2} y1={-6} y2={186} stroke="var(--ok)" strokeWidth={4} strokeDasharray="8 6" />
                <text x={L * unit + 10} y={100} className="lab-small" fill="var(--ok)">
                  bằng nhau: {x} × {doc.va} = {y} × {doc.vb} = {L}
                </text>
              </g>
            )}
          </g>
          <g transform="translate(150 380)">
            {steps.map((s, i) => (
              <text key={i} x={0} y={i * 56} fontSize={28} fontWeight={i === 3 ? 900 : 700} fill={i <= st ? (i === 3 ? 'var(--accent)' : 'var(--ink)') : 'transparent'}>
                Bước {i + 1}: {s}
              </text>
            ))}
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Hoá trị và công thức hoá học</h3>
        <Row label="Nguyên tố thứ nhất">
          <div className="seg wrap">
            {as.map((k) => (
              <button key={k} className={k === doc.a ? 'on' : ''} onClick={() => onDoc({ ...doc, a: k, va: VALENCE[k].v[0], step: 0 })}>
                {pretty(k)}
              </button>
            ))}
          </div>
        </Row>
        {VALENCE[doc.a].v.length > 1 && (
          <Row label={`Hoá trị của ${doc.a}`}>
            <Seg value={doc.va} options={VALENCE[doc.a].v} onChange={(v) => onDoc({ ...doc, va: v, step: 0 })} fmtOpt={(v) => ROMAN[v]} />
          </Row>
        )}
        <Row label="Nguyên tố / nhóm nguyên tử thứ hai">
          <div className="seg wrap">
            {bs.map((k) => (
              <button key={k} className={k === doc.b ? 'on' : ''} onClick={() => onDoc({ ...doc, b: k, vb: VALENCE[k].v[0], step: 0 })}>
                {pretty(k)}
              </button>
            ))}
          </div>
        </Row>
        {VALENCE[doc.b].v.length > 1 && (
          <Row label={`Hoá trị của ${doc.b}`}>
            <Seg value={doc.vb} options={VALENCE[doc.b].v} onChange={(v) => onDoc({ ...doc, vb: v, step: 0 })} fmtOpt={(v) => ROMAN[v]} />
          </Row>
        )}
        <div className="insp-actions">
          <button className="btn" disabled={doc.step <= 0} onClick={() => onDoc({ ...doc, step: doc.step - 1 })}>
            ← Bước trước
          </button>
          <button className="btn primary" disabled={doc.step >= 3} onClick={() => onDoc({ ...doc, step: doc.step + 1 })}>
            Bước tiếp →
          </button>
        </div>
        {!showValues && doc.step > 1 && <p className="small muted">Đang ẩn số đo: các bước 3, 4 được che để học sinh tự làm.</p>}
        <p className="small">Quy tắc hoá trị: trong phân tử hợp chất hai nguyên tố AₓBᵧ, tích chỉ số và hoá trị của nguyên tố này bằng tích chỉ số và hoá trị của nguyên tố kia: x × a = y × b.</p>
        <p className="small muted">Hoá trị của một nguyên tố trong hợp chất cộng hoá trị bằng số electron mà nguyên tử đó góp chung để tạo liên kết. Quy ước H có hoá trị I, O có hoá trị II.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Phần trăm khối lượng nguyên tố – tìm công thức từ phần trăm
// =====================================================================

export const PERCENT_TASKS: Record<string, { f: string; given?: { el: string; pct: number }[]; M?: number }> = {
  H2O: { f: 'H2O' },
  CO2: { f: 'CO2' },
  NH3: { f: 'NH3' },
  CaCO3: { f: 'CaCO3' },
  Fe2O3: { f: 'Fe2O3' },
  'CO(NH2)2': { f: 'CO(NH2)2' },
  Al2O3: { f: 'Al2O3' },
  KNO3: { f: 'KNO3' },
  NH4NO3: { f: 'NH4NO3' },
  '(NH4)2SO4': { f: '(NH4)2SO4' },
  CuSO4: { f: 'CuSO4' },
  C6H12O6: { f: 'C6H12O6' },
  'r-CuO': { f: 'CuO', given: [{ el: 'Cu', pct: 80 }, { el: 'O', pct: 20 }], M: 80 },
  'r-MgO': { f: 'MgO', given: [{ el: 'Mg', pct: 60 }, { el: 'O', pct: 40 }], M: 40 },
  'r-CaCO3': { f: 'CaCO3', given: [{ el: 'Ca', pct: 40 }, { el: 'C', pct: 12 }, { el: 'O', pct: 48 }], M: 100 },
  'r-SO2': { f: 'SO2', given: [{ el: 'S', pct: 50 }, { el: 'O', pct: 50 }], M: 64 },
  'r-Fe2O3': { f: 'Fe2O3', given: [{ el: 'Fe', pct: 70 }, { el: 'O', pct: 30 }], M: 160 },
  'r-C2H6': { f: 'C2H6', given: [{ el: 'C', pct: 80 }, { el: 'H', pct: 20 }], M: 30 },
};

export interface PercentDoc {
  mode: 'percent';
  task: string;
  list: string[];
  step: number;
}

export function PercentView({ doc, onDoc, showValues }: EngineProps<PercentDoc, unknown>) {
  const task = PERCENT_TASKS[doc.task] ?? PERCENT_TASKS.H2O;
  const counts = parseFormula(task.f);
  const massOf = (el: string) => ATOMIC_MASS[el] ?? elBySym(el)?.mass ?? 0;
  const M = Object.entries(counts).reduce((s, [el, k]) => s + massOf(el) * k, 0);
  const parts = Object.entries(counts).map(([el, k]) => ({ el, k, m: massOf(el) * k, pct: (100 * massOf(el) * k) / M }));
  const reverse = !!task.given;
  const st = showValues ? doc.step : 0;
  const colors = ['#e63946', '#1d6fe0', '#2a9d8f', '#f4a261'];
  // biểu đồ tròn
  let acc = 0;
  const pie = parts.map((p, i) => {
    const a0 = (acc / 100) * Math.PI * 2 - Math.PI / 2;
    acc += p.pct;
    const a1 = (acc / 100) * Math.PI * 2 - Math.PI / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const R = 150;
    const d = parts.length === 1 ? '' : `M 0 0 L ${R * Math.cos(a0)} ${R * Math.sin(a0)} A ${R} ${R} 0 ${large} 1 ${R * Math.cos(a1)} ${R * Math.sin(a1)} Z`;
    const am = (a0 + a1) / 2;
    return (
      <g key={p.el}>
        <path d={d} fill={colors[i % colors.length]} stroke="#fff" strokeWidth={3} />
        <text x={95 * Math.cos(am)} y={95 * Math.sin(am) + 8} textAnchor="middle" fontSize={22} fontWeight={900} fill="#fff">
          {p.el}
        </text>
      </g>
    );
  });
  const lines = reverse
    ? [
        `Khối lượng phân tử: ${task.M} amu. ${task.given!.map((g) => `%${g.el} = ${g.pct}%`).join(', ')}`,
        ...task.given!.map((g) => `Khối lượng ${g.el} trong một phân tử: ${g.pct}% × ${task.M} = ${vn((g.pct * task.M!) / 100, 1)} amu → số nguyên tử ${g.el} = ${vn((g.pct * task.M!) / 100, 1)} : ${massOf(g.el)} = ${vn((g.pct * task.M!) / 100 / massOf(g.el), 2)}`),
        `Công thức hoá học: ${pretty(task.f)}`,
      ]
    : [
        `Khối lượng phân tử ${pretty(task.f)} = ${parts.map((p) => `${p.k > 1 ? `${p.k}×` : ''}${massOf(p.el)}`).join(' + ')} = ${vn(M, 1)} amu`,
        ...parts.map((p) => `%${p.el} = ${p.k > 1 ? `${p.k}×` : ''}${massOf(p.el)} : ${vn(M, 1)} × 100% ≈ ${vn(p.pct, 2)}%`),
      ];
  const nSteps = lines.length;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <text x={600} y={56} textAnchor="middle" fontSize={32} fontWeight={800} fill="var(--ink)">
            {reverse ? `Xác định công thức hoá học của hợp chất tạo bởi ${task.given!.map((g) => g.el).join(' và ')}` : `Tính phần trăm khối lượng các nguyên tố trong ${pretty(task.f)}`}
          </text>
          <g transform="translate(220 300)">{showValues && (!reverse || st >= nSteps - 1) ? pie : <circle r={150} fill="var(--surface-2)" stroke="var(--line)" />}</g>
          {showValues && (!reverse || st >= nSteps - 1) && (
            <g transform="translate(80 500)">
              {parts.map((p, i) => (
                <g key={p.el} transform={`translate(0 ${i * 34})`}>
                  <rect width={22} height={22} fill={colors[i % colors.length]} />
                  <text x={32} y={18} className="lab-small">
                    {p.el}: {vn(p.pct, 2)}%
                  </text>
                </g>
              ))}
            </g>
          )}
          <g transform="translate(440 150)">
            {lines.map((s, i) => (
              <foreignObject key={i} x={0} y={i * 92} width={720} height={88}>
                <div style={{ fontSize: 24, fontWeight: i === nSteps - 1 && reverse ? 900 : 700, color: i <= st ? (i === nSteps - 1 && reverse ? 'var(--accent)' : 'var(--ink)') : 'transparent' }}>
                  {i + 1}. {s}
                </div>
              </foreignObject>
            ))}
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{reverse ? 'Tìm công thức từ phần trăm' : 'Phần trăm khối lượng nguyên tố'}</h3>
        <Row label="Bài tập">
          <div className="seg wrap">
            {doc.list.map((k) => (
              <button key={k} className={k === doc.task ? 'on' : ''} onClick={() => onDoc({ ...doc, task: k, step: 0 })}>
                {PERCENT_TASKS[k].given ? `? (${PERCENT_TASKS[k].given!.map((g) => g.el).join(', ')})` : pretty(PERCENT_TASKS[k].f)}
              </button>
            ))}
          </div>
        </Row>
        <div className="insp-actions">
          <button className="btn" disabled={doc.step <= 0} onClick={() => onDoc({ ...doc, step: doc.step - 1 })}>
            ← Bước trước
          </button>
          <button className="btn primary" disabled={doc.step >= nSteps - 1} onClick={() => onDoc({ ...doc, step: doc.step + 1 })}>
            Bước tiếp →
          </button>
        </div>
        {!showValues && <p className="small muted">Đang ẩn số đo: lời giải được che để học sinh tự làm. Bấm “Hiện số đo” để xem từng bước.</p>}
        <p className="small">Phần trăm khối lượng nguyên tố A trong hợp chất AₓBᵧ: %A = (x × khối lượng nguyên tử A) : khối lượng phân tử × 100%.</p>
        <p className="small muted">Tìm công thức: tính khối lượng mỗi nguyên tố trong một phân tử (= % × khối lượng phân tử), chia cho khối lượng nguyên tử để được số nguyên tử.</p>
      </aside>
    </div>
  );
}


// =====================================================================
// Thí nghiệm: so sánh tính chất chất ion và chất cộng hoá trị
// =====================================================================

export const HEAT_SAMPLES = {
  nacl: { name: 'Muối ăn (NaCl)', kind: 'ion', melt: 801, tMelt: Infinity, color: '#ffffff', liquid: '#ffffff' },
  sugar: { name: 'Đường (saccharose)', kind: 'cov', melt: 186, tMelt: 3, color: '#fffdf2', liquid: '#c98b2b' },
  wax: { name: 'Nến (paraffin)', kind: 'cov', melt: 55, tMelt: 1, color: '#fdf3d7', liquid: '#f7e7b0' },
  ice: { name: 'Nước đá (H₂O)', kind: 'cov', melt: 0, tMelt: 0.4, color: '#dff3ff', liquid: '#9fd3ff' },
} as const;

export const SOLUTIONS7 = {
  water: { name: 'Nước cất', ions: false, color: 'rgba(170,215,255,0.35)', note: 'Nước cất hầu như không dẫn điện.' },
  nacl: { name: 'Dung dịch muối ăn', ions: true, color: 'rgba(170,215,255,0.35)', note: 'Muối ăn tan trong nước tạo thành các ion Na⁺ và Cl⁻ chuyển động tự do nên dung dịch dẫn điện.' },
  sugar: { name: 'Dung dịch đường', ions: false, color: 'rgba(255,240,200,0.45)', note: 'Đường là chất cộng hoá trị, tan trong nước không tạo ion nên dung dịch không dẫn điện.' },
  ethanol: { name: 'Dung dịch cồn', ions: false, color: 'rgba(220,240,255,0.4)', note: 'Ethanol là chất cộng hoá trị, dung dịch không dẫn điện.' },
  cuso4: { name: 'Dung dịch copper(II) sulfate', ions: true, color: 'rgba(40,120,230,0.45)', note: 'CuSO₄ là chất ion, dung dịch chứa ion Cu²⁺ và SO₄²⁻ nên dẫn điện.' },
  solid: { name: 'Muối ăn khan (rắn)', ions: false, color: 'transparent', note: 'Ở thể rắn, các ion bị giữ chặt trong mạng tinh thể, không chuyển động tự do nên không dẫn điện.' },
} as const;

export interface IonPropDoc {
  mode: 'ionprop';
  sub: 'heat' | 'conduct';
  sol: keyof typeof SOLUTIONS7;
  samples?: (keyof typeof HEAT_SAMPLES)[];
}

export function IonPropView({ doc, onDoc, showValues }: EngineProps<IonPropDoc, unknown>) {
  const [t, setT] = useState(0);
  const [heating, setHeating] = useState(false);
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    setT(0);
    setHeating(false);
  }, [doc.sub]);
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setPhase((p) => p + dt);
      if (heating) setT((x) => Math.min(8, x + dt));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [heating]);

  if (doc.sub === 'heat') {
    const list = doc.samples ?? (['nacl', 'sugar', 'wax'] as (keyof typeof HEAT_SAMPLES)[]);
    return (
      <div className="eng">
        <div className="eng-stage lab-bg">
          <svg viewBox="0 0 1200 680" className="eng-svg">
            <rect x={0} y={600} width={1200} height={80} className="lab-table" />
            <text x={600} y={50} textAnchor="middle" className="lab-label">
              Đun nóng cùng lúc các mẫu chất đặt trên tấm kim loại
            </text>
            {/* giá và tấm kim loại */}
            <rect x={180} y={330} width={840} height={16} rx={4} fill="#8d99a6" stroke="#5b6672" />
            <rect x={200} y={346} width={12} height={254} fill="#666" />
            <rect x={988} y={346} width={12} height={254} fill="#666" />
            {list.map((k, i) => {
              const x = 600 + (i - (list.length - 1) / 2) * 260;
              const smp = HEAT_SAMPLES[k];
              const melted = t >= smp.tMelt;
              const brown = k === 'sugar' && t > smp.tMelt + 2;
              return (
                <g key={k}>
                  {/* đèn cồn */}
                  <g transform={`translate(${x} 520)`}>
                    <path d="M -40 80 L -46 20 Q 0 -6 46 20 L 40 80 Z" fill="rgba(210,235,255,0.7)" stroke="#5f7488" strokeWidth={2} />
                    <rect x={-6} y={-6} width={12} height={20} fill="#ddd" />
                    {heating && (
                      <path d={`M 0 ${-130 - Math.sin(phase * 18) * 6} Q 22 -60 0 -8 Q -22 -60 0 ${-130 - Math.sin(phase * 18) * 6} Z`} fill="rgba(80,140,255,0.6)" />
                    )}
                  </g>
                  {/* mẫu chất */}
                  {!melted ? (
                    k === 'wax' || k === 'ice' ? (
                      <rect x={x - 34} y={282} width={68} height={48} rx={6} fill={smp.color} stroke="#999" />
                    ) : (
                      <g>
                        {Array.from({ length: 14 }, (_, j) => (
                          <rect key={j} x={x - 46 + (j % 7) * 13} y={314 - Math.floor(j / 7) * 12} width={11} height={11} fill={smp.color} stroke="#aaa" transform={`rotate(${(j * 23) % 40} ${x - 40 + (j % 7) * 13} ${320 - Math.floor(j / 7) * 12})`} />
                        ))}
                      </g>
                    )
                  ) : (
                    <ellipse cx={x} cy={326} rx={70} ry={8} fill={brown ? '#7a4a1a' : smp.liquid} stroke="#999" />
                  )}
                  {brown && showValues && (
                    <path d={`M ${x - 10} 300 q 10 -20 0 -40 q -10 -20 0 -40`} fill="none" stroke="#999" strokeWidth={3} opacity={0.6} />
                  )}
                  <text x={x} y={258} textAnchor="middle" className="lab-label">
                    {smp.name}
                  </text>
                  {showValues && heating && (
                    <text x={x} y={226} textAnchor="middle" fontSize={20} fontWeight={800} fill={melted ? 'var(--danger)' : 'var(--ink-2)'}>
                      {melted ? (brown ? 'nóng chảy, hoá đen' : 'đã nóng chảy') : 'chưa nóng chảy'}
                    </text>
                  )}
                </g>
              );
            })}
            <text x={600} y={110} textAnchor="middle" className="lab-small">
              Thời gian đun: {vn(t, 1)} phút (mô phỏng tua nhanh)
            </text>
          </svg>
        </div>
        <aside className="eng-side">
          <h3>Đun nóng chất ion và chất cộng hoá trị</h3>
          <Row label="Thí nghiệm">
            <Seg value={doc.sub} options={['heat', 'conduct'] as const} onChange={(s) => onDoc({ ...doc, sub: s })} fmtOpt={(s) => (s === 'heat' ? 'Đun nóng' : 'Thử tính dẫn điện')} />
          </Row>
          <div className="insp-actions">
            <button className={`btn ${heating ? 'on' : 'primary'}`} onClick={() => setHeating(!heating)}>
              {heating ? 'Tắt đèn cồn' : 'Đun nóng'}
            </button>
            <button className="btn" onClick={() => (setT(0), setHeating(false))}>
              Làm lại
            </button>
          </div>
          <div className="insp-table">
            <table>
              <thead>
                <tr>
                  <th>Chất</th>
                  <th>Loại chất</th>
                  <th>t° nóng chảy</th>
                </tr>
              </thead>
              <tbody>
                {list.map((k) => (
                  <tr key={k}>
                    <th>{HEAT_SAMPLES[k].name}</th>
                    <td>{showValues ? (HEAT_SAMPLES[k].kind === 'ion' ? 'chất ion' : 'chất cộng hoá trị') : '?'}</td>
                    <td>{showValues ? `${vn(HEAT_SAMPLES[k].melt, 0)} °C` : '?'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="small">Đun cùng lúc: nến, đường nhanh chóng nóng chảy (đường còn bị hoá đen); muối ăn vẫn ở thể rắn. Chất ion có nhiệt độ nóng chảy cao vì lực hút giữa các ion trái dấu rất mạnh; chất cộng hoá trị thường dễ nóng chảy hơn.</p>
          <p className="small muted">Ngọn lửa đèn cồn chỉ khoảng 600 – 800 °C, không đủ làm muối ăn nóng chảy.</p>
        </aside>
      </div>
    );
  }

  // ---------------- thử tính dẫn điện ----------------
  const sol = SOLUTIONS7[doc.sol];
  const lit = sol.ions;
  const ions = Array.from({ length: 18 }, (_, i) => {
    const pos = i % 2 === 0;
    const base = 470 + ((i * 47) % 240);
    const y = 400 + ((i * 31) % 150);
    // ion dương đi về điện cực âm (bên phải), ion âm đi về điện cực dương (bên trái)
    const drift = (((phase * 30 + i * 13) % 120) - 60) * (pos ? 1 : -1);
    return { x: base + drift, y, pos };
  });
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <rect x={0} y={600} width={1200} height={80} className="lab-table" />
          {/* mạch điện */}
          <path d="M 500 330 L 500 160 L 560 160 M 640 160 L 700 160 L 700 330" fill="none" stroke="#d62828" strokeWidth={5} />
          <rect x={250} y={140} width={120} height={50} rx={8} fill="#2b2b2b" />
          <rect x={250} y={140} width={36} height={50} rx={8} fill="#f2b705" />
          <path d="M 370 165 L 440 165 L 440 120 L 600 120 L 600 128" fill="none" stroke="#222" strokeWidth={4} />
          <path d="M 250 165 L 200 165 L 200 300 L 500 300" fill="none" stroke="#222" strokeWidth={4} />
          <circle cx={600} cy={160} r={40} fill={lit ? 'rgba(255,225,80,0.95)' : 'rgba(240,240,240,0.6)'} stroke="#888" strokeWidth={3} />
          {lit && <circle cx={600} cy={160} r={80} fill="rgba(255,230,120,0.3)" />}
          <text x={310} y={220} textAnchor="middle" className="lab-small">
            Pin
          </text>
          {/* cốc và điện cực */}
          {doc.sol === 'solid' ? (
            <g>
              <path d="M 420 360 L 430 590 L 770 590 L 780 360" fill="rgba(210,235,255,0.25)" stroke="#5f7488" strokeWidth={4} />
              {Array.from({ length: 60 }, (_, j) => (
                <rect key={j} x={440 + (j % 15) * 21} y={570 - Math.floor(j / 15) * 18} width={16} height={14} fill="#fff" stroke="#bbb" />
              ))}
            </g>
          ) : (
            <g>
              <path d="M 420 360 L 430 590 L 770 590 L 780 360" fill="rgba(210,235,255,0.25)" stroke="#5f7488" strokeWidth={4} />
              <path d="M 424 390 L 430 590 L 770 590 L 776 390 Z" fill={sol.color} />
            </g>
          )}
          <rect x={490} y={330} width={20} height={240} fill="#555" />
          <rect x={690} y={330} width={20} height={240} fill="#555" />
          <text x={500} y={320} textAnchor="middle" fontWeight={900} fontSize={22} fill="var(--danger)">
            +
          </text>
          <text x={700} y={320} textAnchor="middle" fontWeight={900} fontSize={22} fill={EC}>
            −
          </text>
          {sol.ions && showValues &&
            ions.map((o, i) => (
              <g key={i}>
                <circle cx={o.x} cy={o.y} r={11} fill={o.pos ? '#f4a261' : '#3fbf5a'} stroke="#333" />
                <text x={o.x} y={o.y + 6} textAnchor="middle" fontSize={16} fontWeight={900} fill="#222">
                  {o.pos ? '+' : '−'}
                </text>
              </g>
            ))}
          <text x={600} y={640} textAnchor="middle" className="lab-label">
            {sol.name}
          </text>
          <text x={600} y={60} textAnchor="middle" fontSize={28} fontWeight={800} fill={lit ? 'var(--ok)' : 'var(--ink-2)'}>
            {showValues ? (lit ? 'Đèn sáng: có dòng điện chạy qua' : 'Đèn không sáng') : 'Đèn có sáng không?'}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Tính dẫn điện</h3>
        <Row label="Thí nghiệm">
          <Seg value={doc.sub} options={['heat', 'conduct'] as const} onChange={(s) => onDoc({ ...doc, sub: s })} fmtOpt={(s) => (s === 'heat' ? 'Đun nóng' : 'Thử tính dẫn điện')} />
        </Row>
        <Row label="Mẫu thử">
          <div className="seg wrap">
            {(Object.keys(SOLUTIONS7) as (keyof typeof SOLUTIONS7)[]).map((k) => (
              <button key={k} className={k === doc.sol ? 'on' : ''} onClick={() => onDoc({ ...doc, sol: k })}>
                {SOLUTIONS7[k].name}
              </button>
            ))}
          </div>
        </Row>
        <p className="small">{showValues ? sol.note : 'Dự đoán: đèn có sáng không? Vì sao?'}</p>
        <p className="small muted">Dung dịch của chất ion (muối ăn, CuSO₄) dẫn điện vì có các ion chuyển động tự do: ion dương (cam) về điện cực âm, ion âm (xanh) về điện cực dương. Dung dịch đường, cồn không có ion nên không dẫn điện.</p>
      </aside>
    </div>
  );
}
