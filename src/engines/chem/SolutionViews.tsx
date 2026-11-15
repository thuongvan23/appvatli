// Dung dịch, độ tan, nồng độ (KHTN 8 Bài 4) và định luật bảo toàn khối lượng (Bài 5).
import { useEffect, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { fmt, fmtShort } from '../../core/format';
import { Row, Seg, Slider, Toggle } from '../../ui/controls';
import { Balance, Beaker } from './glass';

// ---------------- Độ tan ----------------

export interface SolutionDoc {
  mode: 'solution';
  solute: 'nacl' | 'cuso4' | 'duong' | 'na2co3' | 'botgao';
  /** khối lượng chất tan cho vào (g) */
  m: number;
  /** khối lượng nước (g) */
  water: number;
  T: number;
}

// Độ tan (g/100 g nước) tại 0, 20, 40, 60, 80, 100 °C (số liệu làm tròn)
const SOL: Record<SolutionDoc['solute'], { name: string; f: string; S: number[]; color: (c: number) => string; crystal: string; M?: number }> = {
  nacl: { name: 'Muối ăn', f: 'NaCl', S: [35.7, 35.9, 36.4, 37.1, 38, 39.2], color: () => 'rgba(200,230,250,0.45)', crystal: '#f7f7f7', M: 58.5 },
  cuso4: { name: 'Copper(II) sulfate', f: 'CuSO₄', S: [14.3, 20.7, 28.5, 40, 55, 75.4], color: (c) => `rgba(30,110,230,${Math.min(0.85, 0.15 + c * 2.6)})`, crystal: '#2b78e4', M: 160 },
  duong: { name: 'Đường saccharose', f: 'C₁₂H₂₂O₁₁', S: [179, 204, 238, 287, 362, 487], color: () => 'rgba(250,245,225,0.5)', crystal: '#fffdf4', M: 342 },
  na2co3: { name: 'Sodium carbonate', f: 'Na₂CO₃', S: [7, 21.5, 49, 46, 44, 44.5], color: () => 'rgba(200,230,250,0.45)', crystal: '#ffffff', M: 106 },
  botgao: { name: 'Bột gạo (không tan)', f: 'bột gạo', S: [0, 0, 0, 0, 0, 0], color: () => 'rgba(240,238,228,0.75)', crystal: '#efeadb' },
};

export function solubility(s: SolutionDoc['solute'], T: number): number {
  const t = SOL[s].S;
  const i = Math.max(0, Math.min(4, Math.floor(T / 20)));
  const f = (T - i * 20) / 20;
  return t[i] + (t[i + 1] - t[i]) * f;
}

export function SolutionView({ doc, onDoc, showValues, onMeasure }: EngineProps<SolutionDoc, unknown>) {
  const d = SOL[doc.solute];
  const S = solubility(doc.solute, doc.T);
  const maxDiss = (S * doc.water) / 100;
  const diss = Math.min(doc.m, maxDiss);
  const left = doc.m - diss;
  const mdd = doc.water + diss;
  const C = mdd > 0 ? (100 * diss) / mdd : 0;
  const sat = left > 0.05 && S > 0;
  useEffect(() => onMeasure?.({ S, C, mct: diss, mdd }), [S, C, diss, mdd, onMeasure]);
  const nCrys = Math.min(90, Math.round(left * (doc.solute === 'duong' ? 0.3 : 2)));
  const cloudy = doc.solute === 'botgao' && doc.m > 0;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <rect x={0} y={590} width={1200} height={90} className="lab-table" />
          <Beaker x={420} bottom={580} w={300} h={380} level={0.2 + doc.water / 600} color={cloudy ? d.color(0) : d.color(diss / Math.max(1, mdd))}>
            {Array.from({ length: nCrys }, (_, i) => (
              <rect key={i} x={300 + ((i * 47) % 240)} y={566 - ((i * 7) % 22)} width={7} height={6} fill={d.crystal} stroke="rgba(0,0,0,0.25)" strokeWidth={0.6} transform={`rotate(${(i * 37) % 90} ${304 + ((i * 47) % 240)} ${569 - ((i * 7) % 22)})`} />
            ))}
            {cloudy && Array.from({ length: 60 }, (_, i) => <circle key={i} cx={290 + ((i * 53) % 260)} cy={330 + ((i * 97) % 240)} r={2.5} fill="#e9e3cf" opacity={0.8} />)}
          </Beaker>
          {/* nhiệt kế */}
          <rect x={612} y={170} width={14} height={330} rx={7} fill="#fff" stroke="#666" />
          <rect x={615} y={480 - doc.T * 2.8} width={8} height={doc.T * 2.8 + 20} fill="#e63946" />
          <circle cx={619} cy={510} r={14} fill="#e63946" />
          <text x={640} y={480 - doc.T * 2.8} className="lab-value">
            {fmtShort(doc.T, 0)} °C
          </text>
          {/* thanh trạng thái */}
          <g transform="translate(720 150)">
            <rect width={420} height={300} rx={14} fill="var(--surface)" stroke="var(--line)" />
            <text x={20} y={40} className="lab-label">
              Cho {fmtShort(doc.m, 1)} g {d.f} vào {fmtShort(doc.water, 0)} g nước
            </text>
            <text x={20} y={84} className="lab-small">
              Độ tan ở {fmtShort(doc.T, 0)} °C: {showValues ? `${fmt(S, 1)} g/100 g nước` : '?'}
            </text>
            <text x={20} y={120} className="lab-small">
              Lượng tan tối đa trong {fmtShort(doc.water, 0)} g nước: {showValues ? `${fmt(maxDiss, 1)} g` : '?'}
            </text>
            <text x={20} y={156} className="lab-small">
              Phần không tan còn lại: {showValues ? `${fmt(left, 1)} g` : '?'}
            </text>
            <text x={20} y={192} className="lab-small">
              Nồng độ phần trăm: {showValues && !cloudy ? `${fmt(C, 1)} %` : '?'}
            </text>
            <rect x={20} y={222} width={380} height={52} rx={10} fill={cloudy ? '#fff1e6' : sat ? '#fff1e6' : '#dcfce7'} />
            <text x={210} y={255} textAnchor="middle" fontWeight={800} fontSize={19} fill={cloudy || sat ? '#9a3412' : '#14532d'}>
              {cloudy ? 'Hỗn hợp không đồng nhất – không phải dung dịch' : !showValues ? 'Dung dịch bão hoà hay chưa bão hoà?' : sat ? 'Dung dịch bão hoà (còn chất rắn không tan)' : 'Dung dịch chưa bão hoà'}
            </text>
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Độ tan – dung dịch bão hoà</h3>
        <Row label="Chất tan">
          <Seg value={doc.solute} options={['nacl', 'cuso4', 'duong', 'na2co3', 'botgao'] as const} onChange={(s) => onDoc({ ...doc, solute: s })} fmtOpt={(s) => SOL[s].name} />
        </Row>
        <Row label="Khối lượng chất cho vào (g)">
          <Slider value={doc.m} min={0} max={doc.solute === 'duong' ? 300 : 60} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, m: v })} suffix="g" />
        </Row>
        <Row label="Khối lượng nước (g)">
          <Slider value={doc.water} min={20} max={200} step={5} digits={0} onChange={(v) => onDoc({ ...doc, water: v })} suffix="g" />
        </Row>
        <Row label="Nhiệt độ">
          <Slider value={doc.T} min={0} max={100} step={1} digits={0} onChange={(v) => onDoc({ ...doc, T: v })} suffix="°C" />
        </Row>
        <p className="small">
          Độ tan S = m<sub>ct</sub> / m<sub>nước</sub> × 100 (g/100 g nước). Nồng độ phần trăm C% = m<sub>ct</sub> / m<sub>dd</sub> × 100%.
        </p>
      </aside>
    </div>
  );
}

// ---------------- Pha dung dịch theo nồng độ cho trước ----------------

export interface PrepareDoc {
  mode: 'prepare';
  /** nồng độ cần pha (%) */
  target: number;
  /** khối lượng dung dịch cần pha (g) */
  total: number;
  salt: number;
  water: number;
  mixed: boolean;
}

export function PrepareView({ doc, onDoc, showValues, onMeasure }: EngineProps<PrepareDoc, unknown>) {
  const m1 = (doc.target * doc.total) / 100;
  const m2 = doc.total - m1;
  const C = doc.salt + doc.water > 0 ? (100 * doc.salt) / (doc.salt + doc.water) : 0;
  const ok = doc.mixed && Math.abs(C - doc.target) <= doc.target * 0.05 && Math.abs(doc.salt + doc.water - doc.total) <= doc.total * 0.03;
  useEffect(() => onMeasure?.({ m1: doc.salt, m2: doc.water, C }), [doc.salt, doc.water, C, onMeasure]);
  const [stage, setStage] = useState(0);
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <rect x={0} y={590} width={1200} height={90} className="lab-table" />
          {/* cân muối */}
          <Balance x={220} y={500} value={`${fmt(doc.salt, 2)} g`} />
          <path d={`M 160 488 Q 220 ${470 - Math.min(40, doc.salt * 4)} 280 488 Z`} fill="#fbfbfb" stroke="#bbb" />
          <text x={220} y={620} textAnchor="middle" className="lab-label">
            Cân muối ăn khan
          </text>
          {/* ống đong nước */}
          <rect x={530} y={170} width={70} height={330} rx={6} fill="rgba(255,255,255,0.4)" stroke="#7f93a8" strokeWidth={3} />
          <rect x={533} y={500 - (doc.water / 200) * 326} width={64} height={(doc.water / 200) * 326} fill="rgba(160,210,250,0.6)" />
          {[0, 50, 100, 150, 200].map((v) => (
            <g key={v}>
              <line x1={530} x2={550} y1={500 - (v / 200) * 326} y2={500 - (v / 200) * 326} stroke="#7f93a8" strokeWidth={2} />
              <text x={606} y={505 - (v / 200) * 326} className="tick-small">
                {v} mL
              </text>
            </g>
          ))}
          <rect x={500} y={500} width={130} height={14} rx={4} fill="#7f93a8" />
          <text x={565} y={620} textAnchor="middle" className="lab-label">
            Ống đong nước cất
          </text>
          {/* cốc pha */}
          <Beaker x={920} bottom={560} w={230} h={260} level={doc.mixed ? 0.15 + (doc.salt + doc.water) / 400 : 0} color="rgba(190,225,250,0.55)">
            {!doc.mixed && doc.salt > 0 && null}
          </Beaker>
          <text x={920} y={620} textAnchor="middle" className="lab-label">
            Cốc pha dung dịch
          </text>
          {doc.mixed && (
            <text x={920} y={250} textAnchor="middle" className="lab-value">
              {showValues ? `C% = ${fmt(C, 2)} %` : 'C% = ?'}
            </text>
          )}
          {doc.mixed && showValues && (
            <text x={920} y={210} textAnchor="middle" fontWeight={800} fontSize={20} fill={ok ? 'var(--ok)' : 'var(--danger)'}>
              {ok ? 'Đạt yêu cầu!' : 'Chưa đúng nồng độ / khối lượng'}
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>
          Pha {fmtShort(doc.total, 0)} g dung dịch NaCl {fmtShort(doc.target, 1)}%
        </h3>
        <div className="steps">
          <button className={`step ${stage === 0 ? 'on' : ''}`} onClick={() => setStage(0)}>
            1. Tính toán
          </button>
          <button className={`step ${stage === 1 ? 'on' : ''}`} onClick={() => setStage(1)}>
            2. Cân, đong
          </button>
          <button className={`step ${stage === 2 ? 'on' : ''}`} onClick={() => setStage(2)}>
            3. Pha
          </button>
        </div>
        {stage === 0 && (
          <div className="calc">
            <p>m₁ (muối) = C% × m<sub>dd</sub> / 100 = {showValues ? `${fmtShort(doc.target, 2)} × ${fmtShort(doc.total, 0)} / 100 = ${fmt(m1, 2)} g` : '?'}</p>
            <p>m₂ (nước) = m<sub>dd</sub> − m₁ = {showValues ? `${fmt(m2, 2)} g (≈ ${fmt(m2, 1)} mL)` : '?'}</p>
          </div>
        )}
        {stage === 1 && (
          <>
            <Row label="Lượng muối trên cân (g)">
              <Slider value={doc.salt} min={0} max={Math.max(5, m1 * 3)} step={0.05} digits={2} onChange={(v) => onDoc({ ...doc, salt: v, mixed: false })} suffix="g" />
            </Row>
            <Row label="Thể tích nước cất (mL)">
              <Slider value={doc.water} min={0} max={200} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, water: v, mixed: false })} suffix="mL" />
            </Row>
          </>
        )}
        {stage === 2 && (
          <button className="btn primary big" onClick={() => onDoc({ ...doc, mixed: true })}>
            Cho muối vào cốc, rót nước, khuấy tan
          </button>
        )}
        <Row label="Nồng độ cần pha">
          <Seg value={doc.target} options={[0.9, 5, 10] as const} onChange={(v) => onDoc({ ...doc, target: v, mixed: false })} fmtOpt={(v) => `${fmtShort(v, 1)} %`} />
        </Row>
        <p className="small muted">Dùng muối khan để khối lượng cân được đúng là khối lượng chất tan. Nước cất có khối lượng riêng 1 g/mL nên 1 mL nước ≈ 1 g.</p>
      </aside>
    </div>
  );
}

// ---------------- Nồng độ mol, trộn hai dung dịch ----------------

export interface MixDoc {
  mode: 'mix';
  V1: number;
  C1: number;
  V2: number;
  C2: number;
  mixed: boolean;
}

function Dots({ x, bottom, w, h, n, color }: { x: number; bottom: number; w: number; h: number; n: number; color: string }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a = Math.sin(i * 91.7) * 43758.5;
        const b = Math.sin(i * 12.3 + 4) * 9631.7;
        return <circle key={i} cx={x - w / 2 + 14 + (a - Math.floor(a)) * (w - 28)} cy={bottom - 8 - (b - Math.floor(b)) * (h - 12)} r={4} fill={color} />;
      })}
    </g>
  );
}

export function MixView({ doc, onDoc, showValues, onMeasure }: EngineProps<MixDoc, unknown>) {
  const n1 = doc.V1 * doc.C1;
  const n2 = doc.V2 * doc.C2;
  const V = doc.V1 + doc.V2;
  const C = (n1 + n2) / V;
  useEffect(() => onMeasure?.({ n1, n2, C }), [n1, n2, C, onMeasure]);
  const lv = (v: number) => 0.1 + v / 6;
  const dots = (Vl: number, Cm: number, hb: number) => Math.round(Math.min(160, Cm * 600 * (lv(Vl) * hb) / 240));
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <rect x={0} y={590} width={1200} height={90} className="lab-table" />
          {!doc.mixed ? (
            <>
              <Beaker x={260} bottom={560} w={220} h={300} level={lv(doc.V1)} label={`A: ${fmtShort(doc.V1, 1)} L – ${fmtShort(doc.C1, 2)} M`}>
                <Dots x={260} bottom={560} w={220} h={lv(doc.V1) * 300} n={dots(doc.V1, doc.C1, 300)} color="#1d6fe0" />
              </Beaker>
              <text x={600} y={400} textAnchor="middle" fontSize={60} fontWeight={900} fill="var(--ink-2)">
                +
              </text>
              <Beaker x={940} bottom={560} w={220} h={300} level={lv(doc.V2)} label={`B: ${fmtShort(doc.V2, 1)} L – ${fmtShort(doc.C2, 2)} M`}>
                <Dots x={940} bottom={560} w={220} h={lv(doc.V2) * 300} n={dots(doc.V2, doc.C2, 300)} color="#1d6fe0" />
              </Beaker>
            </>
          ) : (
            <Beaker x={600} bottom={560} w={340} h={380} level={0.1 + V / 9} label={`C: ${fmtShort(V, 1)} L – ${showValues ? fmt(C, 3) : '?'} M`}>
              <Dots x={600} bottom={560} w={340} h={(0.1 + V / 9) * 380} n={Math.round(Math.min(220, C * 600 * ((0.1 + V / 9) * 380 * 1.5) / 240))} color="#1d6fe0" />
            </Beaker>
          )}
          <text x={600} y={60} textAnchor="middle" className="lab-small">
            Mỗi chấm xanh tượng trưng cho một lượng chất tan (urea) – mật độ chấm thể hiện nồng độ
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Nồng độ mol</h3>
        <Row label="Dung dịch A: thể tích (L)">
          <Slider value={doc.V1} min={0.5} max={4} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, V1: v, mixed: false })} />
        </Row>
        <Row label="Dung dịch A: nồng độ (M)">
          <Slider value={doc.C1} min={0.01} max={0.2} step={0.01} digits={2} onChange={(v) => onDoc({ ...doc, C1: v, mixed: false })} />
        </Row>
        <Row label="Dung dịch B: thể tích (L)">
          <Slider value={doc.V2} min={0.5} max={4} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, V2: v, mixed: false })} />
        </Row>
        <Row label="Dung dịch B: nồng độ (M)">
          <Slider value={doc.C2} min={0.01} max={0.2} step={0.01} digits={2} onChange={(v) => onDoc({ ...doc, C2: v, mixed: false })} />
        </Row>
        <Toggle value={doc.mixed} onChange={(v) => onDoc({ ...doc, mixed: v })} label="Trộn A với B thành dung dịch C" />
        <div className="calc">
          <p>n<sub>A</sub> = C<sub>M</sub>·V = {showValues ? `${fmt(n1, 3)} mol` : '?'}</p>
          <p>n<sub>B</sub> = {showValues ? `${fmt(n2, 3)} mol` : '?'}</p>
          <p>n<sub>C</sub> = n<sub>A</sub> + n<sub>B</sub> = {showValues ? `${fmt(n1 + n2, 3)} mol` : '?'}</p>
          <p>
            C<sub>M(C)</sub> = n<sub>C</sub> / V<sub>C</sub> = {showValues ? `${fmt(C, 3)} M` : '?'}
          </p>
        </div>
        <p className="small muted">Nồng độ của dung dịch sau khi trộn luôn nằm giữa nồng độ của hai dung dịch ban đầu.</p>
      </aside>
    </div>
  );
}

// ---------------- Định luật bảo toàn khối lượng ----------------

export interface MassDoc {
  mode: 'mass';
  reaction: 'baso4' | 'caco3';
  closed: boolean;
  /** tiến trình phản ứng 0..1 */
  p: number;
}

export function MassView({ doc, onDoc, showValues, onMeasure }: EngineProps<MassDoc, unknown>) {
  const isB = doc.reaction === 'baso4';
  const m0 = isB ? 152.6 : 148.3;
  const co2 = isB ? 0 : 2.2 * doc.p;
  const mass = doc.closed || isB ? m0 : m0 - co2;
  useEffect(() => onMeasure?.({ m: mass }), [mass, onMeasure]);
  const [run, setRun] = useState(false);
  useEffect(() => {
    if (!run) return;
    const id = window.setInterval(() => {
      if (doc.p >= 1) {
        setRun(false);
        return;
      }
      onDoc({ ...doc, p: Math.min(1, doc.p + 0.05) });
    }, 120);
    return () => window.clearInterval(id);
  }, [run, doc, onDoc]);
  const poured = doc.p > 0;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <rect x={0} y={600} width={1200} height={80} className="lab-table" />
          <Balance x={600} y={510} value={`${fmt(mass, 1)} g`} show={showValues} w={640} />
          {isB ? (
            <>
              <Beaker x={460} bottom={498} w={150} h={190} level={poured ? 0 : 0.45} color="rgba(200,230,250,0.6)" />
              <text x={460} y={290} textAnchor="middle" className="lab-label">
                (1) BaCl₂
              </text>
              <text x={740} y={290} textAnchor="middle" className="lab-label">
                (2) Na₂SO₄
              </text>
              <Beaker x={740} bottom={498} w={150} h={190} level={poured ? 0.85 : 0.45} color={poured ? 'rgba(245,245,245,0.9)' : 'rgba(200,230,250,0.6)'}>
                {poured && Array.from({ length: 50 }, (_, i) => <circle key={i} cx={680 + ((i * 41) % 120)} cy={490 - ((i * 23) % 50) * doc.p} r={3} fill="#fff" stroke="#ccc" strokeWidth={0.5} />)}
              </Beaker>
            </>
          ) : (
            <>
              <Beaker x={600} bottom={498} w={180} h={200} level={0.45} color="rgba(200,230,250,0.6)">
                <path d="M 560 494 l 6 -22 l 24 -8 l 22 12 l 2 18 Z" fill="#ece6d8" stroke="#9a907a" />
                {doc.p > 0 && doc.p < 1 && Array.from({ length: 14 }, (_, i) => <circle key={i} className="bubble" cx={540 + ((i * 37) % 120)} cy={490} r={3} style={{ ['--rise' as string]: '-80px', animationDelay: `${(i % 5) * 0.2}s` }} />)}
              </Beaker>
              <text x={830} y={420} className="lab-label">
                Đá vôi + dung dịch HCl
              </text>
              {doc.closed ? (
                <path d={`M 510 298 Q 600 ${250 - doc.p * 120} 690 298 Z`} fill="rgba(255,120,120,0.55)" stroke="#d62828" strokeWidth={2} />
              ) : (
                doc.p > 0 &&
                doc.p < 1 &&
                [0, 1, 2].map((i) => (
                  <text key={i} x={560 + i * 40} y={270 - ((doc.p * 300 + i * 30) % 90)} className="lab-small" opacity={0.7}>
                    CO₂
                  </text>
                ))
              )}
            </>
          )}
          <text x={600} y={60} textAnchor="middle" className="lab-label">
            {isB ? 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl' : 'CaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O'}
          </text>
          {!isB && (
            <text x={600} y={96} textAnchor="middle" className="lab-small">
              {doc.closed ? 'Bình được bịt kín bằng quả bóng: khí CO₂ không thoát ra ngoài' : 'Cốc để hở: khí CO₂ bay ra ngoài'}
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Bảo toàn khối lượng</h3>
        <Row label="Thí nghiệm">
          <Seg value={doc.reaction} options={['baso4', 'caco3'] as const} onChange={(r) => onDoc({ ...doc, reaction: r, p: 0 })} fmtOpt={(r) => (r === 'baso4' ? 'Tạo kết tủa' : 'Tạo chất khí')} />
        </Row>
        {!isB && <Toggle value={doc.closed} onChange={(v) => onDoc({ ...doc, closed: v, p: 0 })} label="Bịt kín miệng cốc (bóng cao su)" />}
        <div className="insp-actions">
          <button className="btn primary" disabled={doc.p >= 1} onClick={() => setRun(true)}>
            {isB ? 'Đổ cốc (1) vào cốc (2)' : 'Cho phản ứng xảy ra'}
          </button>
          <button
            className="btn"
            onClick={() => {
              setRun(false);
              onDoc({ ...doc, p: 0 });
            }}
          >
            Làm lại
          </button>
        </div>
        <div className="insp-values two">
          <div>
            <span>Trước phản ứng</span>
            <b>{showValues ? `${fmt(m0, 1)} g` : '?'}</b>
          </div>
          <div>
            <span>Hiện tại</span>
            <b>{showValues ? `${fmt(mass, 1)} g` : '?'}</b>
          </div>
        </div>
        {showValues && doc.p >= 1 && (
          <p className="nature">{isB || doc.closed ? 'Tổng khối lượng không đổi: khối lượng được bảo toàn.' : 'Khối lượng trên cân giảm vì khí CO₂ thoát ra ngoài – nếu tính cả khí CO₂ thì tổng khối lượng vẫn không đổi.'}</p>
        )}
      </aside>
    </div>
  );
}
