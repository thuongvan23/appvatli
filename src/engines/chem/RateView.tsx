// Tốc độ phản ứng và các yếu tố ảnh hưởng (KHTN 8 Bài 7).
import { useEffect, useRef, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { fmt } from '../../core/format';
import { Row, Seg } from '../../ui/controls';
import { Beaker } from './glass';

export interface RateDoc {
  mode: 'rate';
  factor: 'conc' | 'temp' | 'area' | 'cat';
}

interface Side {
  label: string;
  k: number;
  liquid: string;
  solid: 'nail' | 'tablet' | 'chip' | 'powder' | 'none';
}

const SETUPS: Record<RateDoc['factor'], { title: string; a: Side; b: Side; gas: string; Vmax: number; eq: string; concl: string }> = {
  conc: {
    title: 'Nồng độ',
    a: { label: 'HCl 0,1 M', k: 0.03, liquid: 'rgba(200,230,250,0.5)', solid: 'nail' },
    b: { label: 'HCl 1 M', k: 0.16, liquid: 'rgba(200,230,250,0.6)', solid: 'nail' },
    gas: 'H₂',
    Vmax: 40,
    eq: 'Fe + 2HCl → FeCl₂ + H₂↑',
    concl: 'Nồng độ chất phản ứng càng lớn, tốc độ phản ứng càng nhanh.',
  },
  temp: {
    title: 'Nhiệt độ',
    a: { label: 'Nước lạnh', k: 0.04, liquid: 'rgba(170,215,250,0.55)', solid: 'tablet' },
    b: { label: 'Nước nóng', k: 0.2, liquid: 'rgba(250,200,180,0.45)', solid: 'tablet' },
    gas: 'CO₂',
    Vmax: 60,
    eq: 'Viên C sủi tan trong nước giải phóng khí CO₂',
    concl: 'Nhiệt độ càng cao, tốc độ phản ứng càng nhanh.',
  },
  area: {
    title: 'Diện tích bề mặt tiếp xúc',
    a: { label: 'Đá vôi dạng viên', k: 0.04, liquid: 'rgba(200,230,250,0.5)', solid: 'chip' },
    b: { label: 'Đá vôi dạng bột', k: 0.22, liquid: 'rgba(200,230,250,0.5)', solid: 'powder' },
    gas: 'CO₂',
    Vmax: 50,
    eq: 'CaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O',
    concl: 'Diện tích bề mặt tiếp xúc càng lớn (chất rắn càng nhỏ), tốc độ phản ứng càng nhanh.',
  },
  cat: {
    title: 'Chất xúc tác',
    a: { label: 'H₂O₂ 3%', k: 0.01, liquid: 'rgba(200,230,250,0.5)', solid: 'none' },
    b: { label: 'H₂O₂ 3% + MnO₂', k: 0.3, liquid: 'rgba(200,230,250,0.5)', solid: 'powder' },
    gas: 'O₂',
    Vmax: 45,
    eq: '2H₂O₂ →(MnO₂) 2H₂O + O₂↑',
    concl: 'Chất xúc tác làm tăng tốc độ phản ứng; sau phản ứng chất xúc tác vẫn còn nguyên.',
  },
};

const TMAX = 30;
const vol = (k: number, Vmax: number, t: number) => Vmax * (1 - Math.exp(-k * t));

export function RateView({ doc, onDoc, showValues }: EngineProps<RateDoc, unknown>) {
  const [t, setT] = useState(0);
  const [run, setRun] = useState(false);
  const raf = useRef(0);
  const set = SETUPS[doc.factor];

  useEffect(() => {
    setT(0);
    setRun(false);
  }, [doc.factor]);

  useEffect(() => {
    if (!run) return;
    let last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((v) => {
        const nv = Math.min(TMAX, v + dt * 1.5);
        if (nv >= TMAX) setRun(false);
        return nv;
      });
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [run]);

  const sides = [set.a, set.b];
  const gx = (s: number) => 720 + (s / TMAX) * 420;
  const gy = (v: number) => 470 - (v / 60) * 330;

  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <rect x={0} y={560} width={1200} height={120} className="lab-table" />
          {sides.map((s, i) => {
            const x = 190 + i * 300;
            const V = vol(s.k, set.Vmax, t);
            const rate = s.k * set.Vmax * Math.exp(-s.k * t);
            const nb = t > 0 ? Math.min(22, Math.round(rate * 2.2)) : 0;
            return (
              <g key={i}>
                {/* ống đong úp ngược thu khí */}
                <rect x={x - 26} y={70} width={52} height={190} rx={6} fill="rgba(200,230,250,0.35)" stroke="#7f93a8" strokeWidth={2} />
                <rect x={x - 24} y={72} width={48} height={(V / 60) * 186} fill="rgba(255,255,255,0.85)" />
                {[0, 1, 2, 3, 4, 5].map((k) => (
                  <line key={k} x1={x - 26} x2={x - 12} y1={72 + k * 31} y2={72 + k * 31} stroke="#7f93a8" strokeWidth={1.5} />
                ))}
                <path d={`M ${x} 260 L ${x} 300 Q ${x} 320 ${x + 20} 320`} fill="none" stroke="#7f93a8" strokeWidth={4} />
                <Beaker x={x} bottom={550} w={170} h={210} level={0.55} color={s.liquid}>
                  {s.solid === 'nail' && <line x1={x - 30} y1={540} x2={x + 30} y2={500} stroke="#69717a" strokeWidth={7} strokeLinecap="round" />}
                  {s.solid === 'tablet' && <ellipse cx={x} cy={538 - (t > 0 ? 0 : 0)} rx={Math.max(4, 40 * (1 - V / set.Vmax))} ry={Math.max(2, 9 * (1 - V / set.Vmax))} fill="#f6f1e2" stroke="#bbb" />}
                  {s.solid === 'chip' && <path d={`M ${x - 26} 546 l 6 -24 l 22 -8 l 22 12 l 2 20 Z`} fill="#ece6d8" stroke="#9a907a" />}
                  {s.solid === 'powder' && Array.from({ length: 30 }, (_, k) => <circle key={k} cx={x - 60 + ((k * 37) % 120)} cy={544 - ((k * 13) % 10)} r={3} fill={doc.factor === 'cat' ? '#2a2622' : '#ece6d8'} stroke="#999" strokeWidth={0.5} />)}
                  {Array.from({ length: nb }, (_, k) => (
                    <circle key={k} className="bubble" cx={x - 60 + ((k * 53) % 120)} cy={540} r={3 + (k % 3)} style={{ ['--rise' as string]: '-110px', animationDelay: `${(k % 7) * 0.12}s`, animationDuration: '1.1s' }} />
                  ))}
                </Beaker>
                <text x={x} y={600} textAnchor="middle" className="lab-label">
                  ({i + 1}) {s.label}
                </text>
                <text x={x + 36} y={170} className="lab-value">
                  {showValues ? `${fmt(V, 1)} mL` : '? mL'}
                </text>
              </g>
            );
          })}
          {/* đồ thị */}
          <rect x={720} y={140} width={420} height={330} fill="var(--surface)" stroke="var(--line)" />
          {[0, 20, 40, 60].map((v) => (
            <g key={v}>
              <line x1={720} x2={1140} y1={gy(v)} y2={gy(v)} stroke="var(--line)" />
              <text x={710} y={gy(v) + 5} textAnchor="end" className="tick-small">
                {v}
              </text>
            </g>
          ))}
          {[0, 10, 20, 30].map((s) => (
            <text key={s} x={gx(s)} y={494} textAnchor="middle" className="tick-small">
              {s}
            </text>
          ))}
          <text x={930} y={522} textAnchor="middle" className="lab-small">
            Thời gian (giây)
          </text>
          <text x={724} y={128} className="lab-small">
            Thể tích khí {set.gas} (mL)
          </text>
          {showValues &&
            sides.map((s, i) => {
              const pts: string[] = [];
              for (let k = 0; k <= 60; k++) {
                const tt = (k / 60) * t;
                pts.push(`${gx(tt)},${gy(vol(s.k, set.Vmax, tt))}`);
              }
              return <polyline key={i} points={pts.join(' ')} fill="none" stroke={i ? 'var(--danger)' : 'var(--accent)'} strokeWidth={4} />;
            })}
          {showValues && (
            <g>
              <rect x={740} y={150} width={18} height={6} fill="var(--accent)" />
              <text x={764} y={158} className="tick-small">
                (1) {set.a.label}
              </text>
              <rect x={740} y={172} width={18} height={6} fill="var(--danger)" />
              <text x={764} y={180} className="tick-small">
                (2) {set.b.label}
              </text>
            </g>
          )}
          <text x={600} y={40} textAnchor="middle" className="lab-label">
            Yếu tố khảo sát: {set.title}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Tốc độ phản ứng</h3>
        <Row label="Yếu tố ảnh hưởng">
          <Seg value={doc.factor} options={['conc', 'temp', 'area', 'cat'] as const} onChange={(f) => onDoc({ ...doc, factor: f })} fmtOpt={(f) => SETUPS[f].title} />
        </Row>
        <div className="insp-actions">
          <button className="btn primary" onClick={() => (t >= TMAX ? (setT(0), setRun(true)) : setRun((r) => !r))}>
            {run ? 'Tạm dừng' : t > 0 && t < TMAX ? 'Chạy tiếp' : 'Bắt đầu'}
          </button>
          <button
            className="btn"
            onClick={() => {
              setRun(false);
              setT(0);
            }}
          >
            Làm lại
          </button>
        </div>
        <div className="insp-values two">
          <div>
            <span>Thời gian</span>
            <b>{fmt(t, 0)} s</b>
          </div>
          <div>
            <span>Khí thoát ra</span>
            <b>{set.gas}</b>
          </div>
        </div>
        <p className="small obs-eq">{set.eq}</p>
        {showValues && t >= 10 && <p className="nature">{set.concl}</p>}
        <p className="small muted">Có thể so sánh tốc độ phản ứng bằng lượng khí thoát ra (hoặc lượng chất rắn mất đi, kết tủa xuất hiện) trong cùng một khoảng thời gian.</p>
      </aside>
    </div>
  );
}
