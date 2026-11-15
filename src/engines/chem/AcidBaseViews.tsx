// Thang pH và phản ứng trung hoà (KHTN 8 Bài 9; KHTN 9 Bài 27).
import { useEffect } from 'react';
import type { EngineProps } from '../../core/types';
import { fmt, fmtShort } from '../../core/format';
import { Row, Seg, Slider, Toggle } from '../../ui/controls';
import { Beaker } from './glass';

// ---------------- Giấy pH ----------------

export interface PhDoc {
  mode: 'ph';
  samples: string[];
  tested: string[];
  meter?: boolean;
}

export const SAMPLES: Record<string, { name: string; pH: number; color: string }> = {
  nuocloc: { name: 'Nước lọc', pH: 7, color: 'rgba(200,230,250,0.5)' },
  nuocmay: { name: 'Nước máy', pH: 7.2, color: 'rgba(200,230,250,0.5)' },
  hoao: { name: 'Nước hồ, ao', pH: 7.8, color: 'rgba(120,170,110,0.5)' },
  cam: { name: 'Nước cam', pH: 3.6, color: 'rgba(250,170,40,0.6)' },
  chanh: { name: 'Nước chanh', pH: 2.4, color: 'rgba(240,240,170,0.6)' },
  soda: { name: 'Nước ngọt có gas', pH: 3, color: 'rgba(150,90,40,0.55)' },
  ruabat: { name: 'Nước rửa bát', pH: 9, color: 'rgba(170,230,170,0.6)' },
  giam: { name: 'Giấm ăn', pH: 3, color: 'rgba(250,245,220,0.6)' },
  bakingsoda: { name: 'Dung dịch baking soda', pH: 8.3, color: 'rgba(235,240,245,0.6)' },
  xaphong: { name: 'Nước xà phòng', pH: 10, color: 'rgba(240,240,250,0.7)' },
  voitrong: { name: 'Nước vôi trong', pH: 12.4, color: 'rgba(225,235,240,0.6)' },
  mau: { name: 'Máu người', pH: 7.4, color: 'rgba(170,20,30,0.7)' },
  dichvi: { name: 'Dịch vị dạ dày', pH: 1.8, color: 'rgba(235,230,200,0.5)' },
  nuocmua: { name: 'Nước mưa', pH: 5.6, color: 'rgba(200,230,250,0.5)' },
  datchua: { name: 'Nước ngâm đất chua', pH: 4.5, color: 'rgba(150,110,70,0.55)' },
  hcl01: { name: 'HCl 0,1 M', pH: 1, color: 'rgba(200,230,250,0.5)' },
  ch3cooh01: { name: 'CH₃COOH 0,1 M', pH: 2.9, color: 'rgba(200,230,250,0.5)' },
  naoh01: { name: 'NaOH 0,1 M', pH: 13, color: 'rgba(200,230,250,0.5)' },
};

const PH_COLORS = ['#d7191c', '#e8412c', '#f2722a', '#f7a325', '#f6c915', '#d1d62b', '#8cc63f', '#3fae49', '#1f9e86', '#2a80c2', '#3b5ca8', '#4b3f98', '#5b2c86', '#4a1f6b'];

export function phColor(pH: number): string {
  const i = Math.max(1, Math.min(14, Math.round(pH)));
  return PH_COLORS[i - 1];
}

const nature = (pH: number) => (pH < 6.8 ? 'acid' : pH > 7.2 ? 'base' : 'trung tính');

export function PhView({ doc, onDoc, showValues }: EngineProps<PhDoc, unknown>) {
  const n = doc.samples.length;
  const sp = Math.min(150, 1100 / n);
  const toggle = (id: string) => onDoc({ ...doc, tested: doc.tested.includes(id) ? doc.tested.filter((t) => t !== id) : [...doc.tested, id] });
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <rect x={0} y={420} width={1200} height={260} className="lab-table" />
          {doc.samples.map((id, i) => {
            const s = SAMPLES[id];
            const x = 600 + (i - (n - 1) / 2) * sp;
            const on = doc.tested.includes(id);
            return (
              <g key={id} className="draggable" onPointerDown={() => toggle(id)}>
                <Beaker x={x} bottom={410} w={Math.min(100, sp - 30)} h={120} level={0.6} color={s.color} marks={false} />
                {on && (
                  <g>
                    <rect x={x - 8} y={180} width={16} height={70} rx={2} fill="#f3e2a0" stroke="#999" />
                    <rect x={x - 8} y={180} width={16} height={36} rx={2} fill={phColor(s.pH)} style={{ transition: 'fill 0.6s' }} />
                    {doc.meter && (
                      <g>
                        <rect x={x - 36} y={130} width={72} height={34} rx={6} fill="#11231a" />
                        <text x={x} y={154} textAnchor="middle" className="lcd-text" style={{ fontSize: 20 }}>
                          {showValues ? fmt(s.pH, 1) : '?'}
                        </text>
                      </g>
                    )}
                  </g>
                )}
                <foreignObject x={x - sp / 2 + 4} y={430} width={sp - 8} height={60}>
                  <div className="svg-cap">{s.name}</div>
                </foreignObject>
              </g>
            );
          })}
          {/* thang pH */}
          {PH_COLORS.map((c, i) => (
            <g key={i}>
              <rect x={110 + i * 70} y={540} width={70} height={46} fill={c} />
              <text x={145 + i * 70} y={570} textAnchor="middle" fill="#fff" fontWeight={900} fontSize={20}>
                {i + 1}
              </text>
            </g>
          ))}
          <text x={110} y={612} className="lab-small">
            ← tính acid tăng
          </text>
          <text x={600} y={612} textAnchor="middle" className="lab-small">
            trung tính (pH = 7)
          </text>
          <text x={1090} y={612} textAnchor="end" className="lab-small">
            tính base tăng →
          </text>
          {showValues &&
            doc.tested.map((id, k) => {
              const p = SAMPLES[id].pH;
              const x = 110 + (p - 0.5) * 70;
              return <path key={id} d={`M ${x} ${536 - (k % 3) * 0} l -9 -16 h 18 Z`} fill="var(--ink)" />;
            })}
          <text x={600} y={60} textAnchor="middle" className="lab-small">
            Bấm vào cốc để nhúng mẩu giấy pH, so màu với bảng màu chuẩn
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Kết quả đo pH</h3>
        <Toggle value={!!doc.meter} onChange={(v) => onDoc({ ...doc, meter: v })} label="Dùng thêm máy đo pH" />
        <div className="insp-table">
          <table>
            <thead>
              <tr>
                <th>Mẫu</th>
                <th>pH</th>
                <th>Môi trường</th>
              </tr>
            </thead>
            <tbody>
              {doc.tested.map((id) => (
                <tr key={id}>
                  <td>{SAMPLES[id].name}</td>
                  <td>{showValues ? fmtShort(SAMPLES[id].pH, 1) : '?'}</td>
                  <td>{showValues ? nature(SAMPLES[id].pH) : '?'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small">pH &lt; 7: môi trường acid · pH = 7: trung tính · pH &gt; 7: môi trường base.</p>
        <button className="btn" onClick={() => onDoc({ ...doc, tested: [] })}>
          Làm lại
        </button>
      </aside>
    </div>
  );
}

// ---------------- Phản ứng trung hoà (nhỏ từng giọt acid vào base) ----------------

export interface TitrationDoc {
  mode: 'titration';
  acid: 'hcl' | 'ch3cooh';
  drops: number;
}

const EQ = 20; // số giọt acid cần để trung hoà vừa hết base
const MAXD = 36;

export function titrationPH(acid: 'hcl' | 'ch3cooh', drops: number): number {
  const nOH = 2e-4; // 2 mL NaOH 0,1 M
  const perDrop = nOH / EQ;
  const V = (2 + drops * 0.1) / 1000;
  const nA = drops * perDrop;
  if (nA < nOH - 1e-12) return 14 + Math.log10((nOH - nA) / V);
  if (acid === 'hcl') {
    const ex = nA - nOH;
    if (ex < 1e-9) return 7;
    return Math.max(1, -Math.log10(ex / V));
  }
  const ex = nA - nOH;
  if (ex < 1e-9) return 8.7;
  return Math.max(2.9, 4.76 + Math.log10(nOH / ex));
}

export function TitrationView({ doc, onDoc, showValues, onMeasure }: EngineProps<TitrationDoc, unknown>) {
  const pH = titrationPH(doc.acid, doc.drops);
  const pink = Math.max(0, Math.min(1, (pH - 8.2) / 1.8));
  useEffect(() => onMeasure?.({ drops: doc.drops, pH }), [doc.drops, pH, onMeasure]);
  const pts = Array.from({ length: doc.drops + 1 }, (_, d) => [d, titrationPH(doc.acid, d)] as const);
  const gx = (d: number) => 640 + (d / MAXD) * 500;
  const gy = (p: number) => 520 - ((p - 0) / 14) * 400;
  const acidName = doc.acid === 'hcl' ? 'HCl' : 'CH₃COOH';
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <rect x={0} y={600} width={1200} height={80} className="lab-table" />
          {/* ống nhỏ giọt */}
          <rect x={290} y={60} width={20} height={200} rx={4} fill="rgba(220,235,250,0.8)" stroke="#7f93a8" strokeWidth={2} />
          <rect x={292} y={60 + (doc.drops / MAXD) * 160} width={16} height={200 - (doc.drops / MAXD) * 160 - 10} fill="rgba(200,230,250,0.9)" />
          <ellipse cx={300} cy={52} rx={18} ry={22} fill="#d62828" />
          <path d="M 290 260 L 300 290 L 310 260 Z" fill="rgba(220,235,250,0.8)" stroke="#7f93a8" strokeWidth={2} />
          <text x={330} y={120} className="lab-small">
            dung dịch {acidName}
          </text>
          <circle key={doc.drops} className="drop" cx={300} cy={300} r={6} fill="rgba(170,210,250,0.95)" />
          <Beaker x={300} bottom={590} w={190} h={210} level={0.32 + doc.drops * 0.004} color={`rgba(${Math.round(200 + 36 * pink)},${Math.round(230 - 158 * pink)},${Math.round(250 - 97 * pink)},${0.45 + 0.25 * pink})`} />
          <text x={300} y={636} textAnchor="middle" className="lab-label">
            NaOH + phenolphthalein
          </text>
          {/* đồ thị pH */}
          <rect x={640} y={120} width={500} height={400} fill="var(--surface)" stroke="var(--line)" />
          {[0, 2, 4, 6, 7, 8, 10, 12, 14].map((p) => (
            <g key={p}>
              <line x1={640} x2={1140} y1={gy(p)} y2={gy(p)} stroke={p === 7 ? 'var(--ink-2)' : 'var(--line)'} strokeDasharray={p === 7 ? '6 4' : undefined} />
              <text x={630} y={gy(p) + 5} textAnchor="end" className="tick-small">
                {p}
              </text>
            </g>
          ))}
          {[0, 10, 20, 30].map((d) => (
            <text key={d} x={gx(d)} y={545} textAnchor="middle" className="tick-small">
              {d}
            </text>
          ))}
          <text x={890} y={575} textAnchor="middle" className="lab-small">
            Số giọt acid đã nhỏ
          </text>
          <text x={650} y={108} className="lab-small">
            pH
          </text>
          {showValues && <polyline points={pts.map(([d, p]) => `${gx(d)},${gy(p)}`).join(' ')} fill="none" stroke="var(--accent)" strokeWidth={4} />}
          {showValues && <circle cx={gx(doc.drops)} cy={gy(pH)} r={7} fill="var(--danger)" />}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Phản ứng trung hoà</h3>
        <Row label="Acid nhỏ vào">
          <Seg value={doc.acid} options={['hcl', 'ch3cooh'] as const} onChange={(a) => onDoc({ ...doc, acid: a })} fmtOpt={(a) => (a === 'hcl' ? 'HCl' : 'CH₃COOH')} />
        </Row>
        <Row label="Số giọt acid">
          <Slider value={doc.drops} min={0} max={MAXD} step={1} digits={0} onChange={(v) => onDoc({ ...doc, drops: v })} />
        </Row>
        <div className="insp-actions">
          <button className="btn primary" disabled={doc.drops >= MAXD} onClick={() => onDoc({ ...doc, drops: doc.drops + 1 })}>
            Nhỏ 1 giọt
          </button>
          <button className="btn" disabled={doc.drops >= MAXD} onClick={() => onDoc({ ...doc, drops: Math.min(MAXD, doc.drops + 5) })}>
            +5 giọt
          </button>
          <button className="btn" onClick={() => onDoc({ ...doc, drops: 0 })}>
            Làm lại
          </button>
        </div>
        <div className="insp-values two">
          <div>
            <span>pH</span>
            <b>{showValues ? fmt(pH, 1) : '?'}</b>
          </div>
          <div>
            <span>Màu dung dịch</span>
            <b>{pink > 0.05 ? 'hồng' : 'không màu'}</b>
          </div>
        </div>
        {showValues && <p className="small obs-eq">{doc.acid === 'hcl' ? 'NaOH + HCl → NaCl + H₂O' : 'CH₃COOH + NaOH → CH₃COONa + H₂O'}</p>}
        <p className="small muted">Phenolphthalein có màu hồng trong môi trường base (pH &gt; khoảng 8,2) và không màu khi pH thấp hơn.</p>
      </aside>
    </div>
  );
}
