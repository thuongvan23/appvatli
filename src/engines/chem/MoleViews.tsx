// Mol, khối lượng mol, thể tích mol, tỉ khối chất khí (KHTN 8 Bài 3).
import { useEffect, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { fmt, fmtShort } from '../../core/format';
import { Row, Slider } from '../../ui/controls';
import { NA, VM, molarMass, pretty, sci } from './formula';
import { Balance } from './glass';

export const MOLE_SUBS: Record<string, { f: string; name: string; state: 'solid' | 'liquid' | 'gas'; color: string }> = {
  C: { f: 'C', name: 'Carbon (than)', state: 'solid', color: '#2b2b2b' },
  Fe: { f: 'Fe', name: 'Sắt', state: 'solid', color: '#7a8088' },
  Cu: { f: 'Cu', name: 'Đồng', state: 'solid', color: '#c8743a' },
  NaCl: { f: 'NaCl', name: 'Muối ăn', state: 'solid', color: '#f4f4f4' },
  I2: { f: 'I2', name: 'Iodine', state: 'solid', color: '#4a2a5e' },
  CaCO3: { f: 'CaCO3', name: 'Calcium carbonate', state: 'solid', color: '#eee8dc' },
  H2O: { f: 'H2O', name: 'Nước', state: 'liquid', color: 'rgba(120,180,240,0.6)' },
  H2: { f: 'H2', name: 'Hydrogen', state: 'gas', color: 'rgba(220,235,255,0.7)' },
  O2: { f: 'O2', name: 'Oxygen', state: 'gas', color: 'rgba(220,235,255,0.7)' },
  N2: { f: 'N2', name: 'Nitrogen', state: 'gas', color: 'rgba(220,235,255,0.7)' },
  CO2: { f: 'CO2', name: 'Carbon dioxide', state: 'gas', color: 'rgba(220,235,255,0.7)' },
};

export interface MoleDoc {
  mode: 'mole';
  subs: string[];
  n: number;
}

export function MoleView({ doc, onDoc, showValues }: EngineProps<MoleDoc, unknown>) {
  const k = doc.subs.length;
  const w = 1200 / k;
  const all = Object.keys(MOLE_SUBS);
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <rect x={0} y={590} width={1200} height={90} className="lab-table" />
          {doc.subs.map((id, i) => {
            const s = MOLE_SUBS[id];
            const M = molarMass(s.f);
            const m = M * doc.n;
            const x = w * i + w / 2;
            const V = VM * doc.n;
            const N = NA * doc.n;
            const size = s.state === 'gas' ? 60 * Math.cbrt(V / 24.79) * 2.2 : 30 + 22 * Math.cbrt(m / 10);
            return (
              <g key={id}>
                {s.state === 'gas' ? (
                  <g>
                    <rect x={x - size / 2} y={440 - size} width={size} height={size} fill={s.color} stroke="#7f93a8" strokeWidth={2} strokeDasharray="8 5" />
                    {Array.from({ length: 24 }, (_, j) => (
                      <circle key={j} cx={x - size / 2 + 8 + ((j * 37) % Math.max(10, size - 16))} cy={440 - 8 - ((j * 53) % Math.max(10, size - 16))} r={3} fill="#5b7fa8" />
                    ))}
                    <text x={x} y={470} textAnchor="middle" className="lab-small">
                      V = {showValues ? `${fmt(V, 2)} L` : '?'} (25 °C, 1 bar)
                    </text>
                  </g>
                ) : (
                  <g>
                    <Balance x={x} y={500} value={`${fmt(m, 1)} g`} show={showValues} w={Math.min(260, w - 30)} />
                    {s.state === 'liquid' ? (
                      <g>
                        <rect x={x - size / 2} y={488 - size * 1.2} width={size} height={size * 1.2} rx={6} fill="rgba(255,255,255,0.35)" stroke="#7f93a8" strokeWidth={2} />
                        <rect x={x - size / 2 + 2} y={488 - size * 0.8} width={size - 4} height={size * 0.8} fill={s.color} />
                      </g>
                    ) : (
                      <path d={`M ${x - size} 488 Q ${x} ${488 - size * 1.2} ${x + size} 488 Z`} fill={s.color} stroke="rgba(0,0,0,0.3)" />
                    )}
                  </g>
                )}
                <text x={x} y={100} textAnchor="middle" fontSize={34} fontWeight={800} fill="var(--ink)">
                  {fmtShort(doc.n, 2)} mol {pretty(s.f)}
                </text>
                <text x={x} y={132} textAnchor="middle" className="lab-small">
                  {s.name}
                </text>
                <text x={x} y={170} textAnchor="middle" className="lab-small">
                  M = {fmtShort(M, 1)} g/mol
                </text>
                <text x={x} y={200} textAnchor="middle" className="lab-small">
                  {showValues ? `≈ ${sci(N, 3)} ${s.f.length > 2 || ['H2', 'O2', 'N2', 'I2'].includes(s.f) ? 'phân tử' : 'nguyên tử'}` : 'Số hạt: ?'}
                </text>
                <text x={x} y={640} textAnchor="middle" className="lab-label">
                  m = n·M = {showValues ? `${fmt(m, 2)} g` : '?'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Mol – khối lượng mol</h3>
        <Row label="Số mol (n)">
          <Slider value={doc.n} min={0.1} max={3} step={0.05} digits={2} onChange={(v) => onDoc({ ...doc, n: v })} suffix="mol" />
        </Row>
        <div className="insp-actions">
          {[0.25, 0.5, 1, 2].map((v) => (
            <button key={v} className="btn" onClick={() => onDoc({ ...doc, n: v })}>
              {fmtShort(v, 2)} mol
            </button>
          ))}
        </div>
        <Row label="Chất (chọn tối đa 3)">
          <div className="seg wrap">
            {all.map((id) => (
              <button
                key={id}
                className={doc.subs.includes(id) ? 'on' : ''}
                onClick={() => {
                  const on = doc.subs.includes(id);
                  const subs = on ? doc.subs.filter((s) => s !== id) : [...doc.subs, id].slice(-3);
                  if (subs.length) onDoc({ ...doc, subs });
                }}
              >
                {pretty(id)}
              </button>
            ))}
          </div>
        </Row>
        <div className="calc">
          <p>N = n × N<sub>A</sub> (N<sub>A</sub> = 6,022·10²³)</p>
          <p>m = n × M</p>
          <p>V (khí, 25 °C, 1 bar) = 24,79 × n (L)</p>
        </div>
      </aside>
    </div>
  );
}

// ---------------- Tỉ khối chất khí ----------------

export const GASES: Record<string, string> = { H2: 'Hydrogen', He: 'Helium', CH4: 'Methane', N2: 'Nitrogen', O2: 'Oxygen', CO2: 'Carbon dioxide', SO2: 'Sulfur dioxide', NH3: 'Ammonia', Cl2: 'Chlorine' };

export interface GasDensDoc {
  mode: 'gasdens';
  gases: string[];
  scene: 'balloon' | 'cave' | 'well';
}

export function GasDensView({ doc, onDoc, showValues }: EngineProps<GasDensDoc, unknown>) {
  const [t, setT] = useState(0);
  const [run, setRun] = useState(false);
  useEffect(() => {
    setT(0);
    setRun(false);
  }, [doc.scene, doc.gases]);
  useEffect(() => {
    if (!run) return;
    const id = window.setInterval(() => setT((v) => (v >= 1 ? (setRun(false), 1) : v + 0.02)), 40);
    return () => window.clearInterval(id);
  }, [run]);
  const n = doc.gases.length;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          {doc.scene === 'balloon' && (
            <g>
              <rect x={0} y={600} width={1200} height={80} className="lab-table" />
              {doc.gases.map((g, i) => {
                const d = molarMass(g) / 29;
                const x = 600 + (i - (n - 1) / 2) * Math.min(160, 1100 / n);
                const dy = (d < 1 ? -1 : 1) * Math.min(1, Math.abs(1 - d) * 1.5 + 0.15) * t * (d < 1 ? 330 : 170);
                const y = 380 + dy;
                return (
                  <g key={g}>
                    <line x1={x} y1={y + 52} x2={x + 6} y2={y + 110} stroke="#555" strokeWidth={2} />
                    <ellipse cx={x} cy={y} rx={44} ry={52} fill={['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#8338ec', '#fb5607', '#3a86ff', '#ff006e', '#8ac926'][i % 9]} opacity={0.85} />
                    <text x={x} y={y + 8} textAnchor="middle" fontWeight={900} fontSize={22} fill="#fff">
                      {pretty(g)}
                    </text>
                  </g>
                );
              })}
              <text x={600} y={60} textAnchor="middle" className="lab-label">
                Thả các quả bóng chứa khí khác nhau trong không khí (M ≈ 29 g/mol)
              </text>
            </g>
          )}
          {doc.scene !== 'balloon' && (
            <g>
              {doc.scene === 'cave' ? (
                <g>
                  <rect x={0} y={90} width={1200} height={590} fill="#8a7a64" />
                  <path d="M 140 620 Q 150 300 600 250 Q 1050 300 1060 620 Z" fill="#e7ebef" />
                  <rect x={140} y={620} width={920} height={60} fill="#6f6250" />
                </g>
              ) : (
                <g>
                  <rect x={0} y={0} width={1200} height={150} fill="rgba(140,200,255,0.25)" />
                  <rect x={0} y={150} width={1200} height={530} fill="#8a7a64" />
                  <rect x={480} y={150} width={240} height={530} fill="#2f2a24" />
                  <rect x={480} y={600} width={240} height={80} fill="rgba(80,130,180,0.7)" />
                </g>
              )}
              {Array.from({ length: 70 }, (_, i) => {
                const heavy = doc.scene === 'cave';
                const r1 = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
                const r2 = Math.abs(Math.sin(i * 78.233) * 12345.678) % 1;
                const x0 = doc.scene === 'cave' ? 230 + r1 * 740 : 500 + ((i * 53) % 200);
                const yStart = doc.scene === 'cave' ? 360 + r2 * 220 : 380 + ((i * 41) % 290);
                const yEnd = heavy ? 570 + r2 * 42 : 40 + ((i * 29) % 300);
                const y = yStart + (yEnd - yStart) * t;
                return <circle key={i} cx={x0} cy={y} r={7} fill={heavy ? 'rgba(120,120,120,0.75)' : 'rgba(255,255,255,0.75)'} />;
              })}
              <text x={600} y={60} textAnchor="middle" className="lab-label">
                {doc.scene === 'cave' ? 'Khí CO₂ sinh ra trong hang sâu' : 'Khí CH₄ sinh ra dưới đáy giếng'}
              </text>
            </g>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Tỉ khối chất khí</h3>
        <Row label="Tình huống">
          <div className="seg wrap">
            {(['balloon', 'cave', 'well'] as const).map((s) => (
              <button key={s} className={doc.scene === s ? 'on' : ''} onClick={() => onDoc({ ...doc, scene: s })}>
                {s === 'balloon' ? 'Bóng bay' : s === 'cave' ? 'Hang sâu (CO₂)' : 'Giếng sâu (CH₄)'}
              </button>
            ))}
          </div>
        </Row>
        <div className="insp-actions">
          <button className="btn primary" onClick={() => (t >= 1 ? (setT(0), setRun(true)) : setRun(true))}>
            {doc.scene === 'balloon' ? 'Thả bóng' : 'Theo dõi khí'}
          </button>
          <button className="btn" onClick={() => (setRun(false), setT(0))}>
            Làm lại
          </button>
        </div>
        <div className="insp-table">
          <table>
            <thead>
              <tr>
                <th>Khí</th>
                <th>M</th>
                <th>d/kk</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(doc.scene === 'balloon' ? doc.gases : doc.scene === 'cave' ? ['CO2'] : ['CH4']).map((g) => {
                const M = molarMass(g);
                const d = M / 29;
                return (
                  <tr key={g}>
                    <td>{pretty(g)}</td>
                    <td>{fmtShort(M, 1)}</td>
                    <td>{showValues ? fmt(d, 2) : '?'}</td>
                    <td>{showValues ? (d > 1 ? 'nặng hơn kk' : 'nhẹ hơn kk') : ''}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="calc">
          <p>
            d<sub>A/B</sub> = M<sub>A</sub> / M<sub>B</sub>
          </p>
          <p>
            d<sub>A/kk</sub> = M<sub>A</sub> / 29
          </p>
        </div>
        {showValues && doc.scene === 'cave' && <p className="nature">CO₂ nặng hơn không khí (d ≈ 1,52) nên tích tụ ở đáy hang – nguy hiểm khi thám hiểm hang động.</p>}
        {showValues && doc.scene === 'well' && <p className="nature">CH₄ nhẹ hơn không khí (d ≈ 0,55) nên bay lên trên miệng giếng.</p>}
      </aside>
    </div>
  );
}
