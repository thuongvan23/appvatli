// Âm thanh (KHTN 7 Bài 12–14): nguồn âm dao động, sóng âm truyền trong các môi trường, độ to – biên độ,
// độ cao – tần số (dao động kí), phản xạ âm, tiếng vang, chống ô nhiễm tiếng ồn.
import { useEffect, useMemo, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, Toggle } from '../../ui/controls';
import { Arrow, VH, VW, pluck, useRaf, useTone, vn } from './common';

// =====================================================================
// Nguồn âm
// =====================================================================

export const SOURCES = {
  drum: { name: 'Mặt trống', f: 110, note: 'Gõ vào mặt trống: mặt trống dao động, các mẩu giấy trên mặt trống nảy lên.' },
  fork: { name: 'Âm thoa', f: 440, note: 'Gõ âm thoa rồi chạm nhẹ một nhánh vào quả bóng bàn treo: quả bóng bị bật ra – nhánh âm thoa đang dao động.' },
  ruler: { name: 'Thước thép', f: 0, note: 'Kéo đầu tự do của thước thép rồi buông tay: thước dao động phát ra âm.' },
  string: { name: 'Dây đàn', f: 196, note: 'Gảy dây đàn: dây dao động phát ra âm. Khi dây ngừng dao động thì âm tắt.' },
  bottle: { name: 'Ống nghiệm (cột khí)', f: 520, note: 'Thổi mạnh vào miệng ống nghiệm: cột không khí trong ống dao động phát ra âm.' },
} as const;

export interface SourceDoc {
  mode: 'source';
  src: keyof typeof SOURCES;
  /** chỉ hiện các nguồn này */
  list?: (keyof typeof SOURCES)[];
}

export function SourceView({ doc, onDoc, showValues }: EngineProps<SourceDoc, unknown>) {
  const [amp, setAmp] = useState(0);
  const [t, setT] = useState(0);
  const [sound, setSound] = useState(true);
  useEffect(() => setAmp(0), [doc.src]);
  useRaf(
    (dt) => {
      setT((x) => x + dt);
      setAmp((a) => (a < 0.01 ? 0 : a * Math.exp(-dt * 0.9)));
    },
    amp > 0,
  );
  const s = SOURCES[doc.src];
  const hit = () => {
    setAmp(1);
    if (sound) pluck(doc.src === 'ruler' ? 140 : s.f, 0.8, 2.2, doc.src === 'string' ? 'triangle' : 'sine');
  };
  const osc = Math.sin(t * 2 * Math.PI * 9) * amp; // dao động được làm chậm để mắt thấy được
  const list = doc.list ?? (Object.keys(SOURCES) as (keyof typeof SOURCES)[]);
  const papers = useMemo(() => Array.from({ length: 9 }, (_, i) => ({ x: -110 + i * 28, r: (i * 47) % 360, k: 0.6 + ((i * 37) % 10) / 20 })), []);

  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={0} y={600} width={VW} height={80} className="lab-table" />
          {doc.src === 'drum' && (
            <g transform="translate(600 420)">
              <ellipse cx={0} cy={0} rx={190} ry={44} fill="#f5e9d0" stroke="#7a4b24" strokeWidth={6} />
              <path d={`M -190 0 L -190 170 Q 0 220 190 170 L 190 0`} fill="#c0392b" stroke="#7a4b24" strokeWidth={6} />
              {[-140, -70, 0, 70, 140].map((x) => (
                <line key={x} x1={x} y1={20} x2={x * 0.9 + 20} y2={180} stroke="#f1c40f" strokeWidth={4} />
              ))}
              {/* mặt trống rung */}
              <ellipse cx={0} cy={osc * 6} rx={186} ry={40} fill="none" stroke="#c9b38a" strokeWidth={3} opacity={amp > 0 ? 1 : 0} />
              {papers.map((p, i) => {
                const jump = Math.abs(Math.sin(t * 6 * p.k + i)) * 70 * amp;
                return <rect key={i} x={p.x} y={-14 - jump} width={18} height={10} fill="#fff" stroke="#777" transform={`rotate(${p.r + jump * 2} ${p.x + 9} ${-9 - jump})`} />;
              })}
              <g transform={`translate(260 ${-160 + (amp > 0.9 ? 30 : 0)}) rotate(-35)`}>
                <rect x={-8} y={-140} width={16} height={150} rx={6} fill="#a0703c" />
                <circle cx={0} cy={10} r={18} fill="#ddd" stroke="#888" />
              </g>
            </g>
          )}
          {doc.src === 'fork' && (
            <g transform="translate(560 460)">
              <rect x={-60} y={110} width={120} height={30} fill="#8b5a2b" />
              <rect x={-8} y={30} width={16} height={84} fill="#9aa5b1" />
              <path d={`M -8 40 L ${-30 - osc * 8} -200 L ${-14 - osc * 8} -200 L 0 30 L ${14 + osc * 8} -200 L ${30 + osc * 8} -200 L 8 40 Z`} fill="#b8c2cc" stroke="#5b6672" strokeWidth={2} />
              {/* quả bóng bàn treo */}
              {(() => {
                const push = Math.max(0, amp) * 70;
                const bx = 70 + push + Math.max(0, osc) * 10;
                return (
                  <g>
                    <line x1={60} y1={-420} x2={bx} y2={-120} stroke="#555" strokeWidth={2} />
                    <circle cx={bx + 2} cy={-110} r={18} fill="#fff" stroke="#999" strokeWidth={2} />
                  </g>
                );
              })()}
              <rect x={-20} y={-430} width={160} height={14} fill="#666" />
            </g>
          )}
          {doc.src === 'ruler' && (
            <g transform="translate(360 380)">
              <rect x={-220} y={-10} width={300} height={210} fill="#8b5a2b" />
              <rect x={-40} y={-60} width={70} height={60} fill="#c0392b" />
              <rect x={-40} y={-20} width={70} height={10} fill="#7b1f14" />
              <path d={`M -100 -12 L 40 -12 Q 250 ${-12 + osc * 30} 460 ${-12 + osc * 90} L 460 ${-4 + osc * 90} Q 250 ${-4 + osc * 30} 40 -4 L -100 -4 Z`} fill="#c4cdd6" stroke="#5b6672" strokeWidth={2} />
              {amp > 0 && (
                <g opacity={0.35}>
                  <path d="M 40 -10 Q 250 -40 460 -100" fill="none" stroke="#5b6672" strokeDasharray="6 5" />
                  <path d="M 40 -10 Q 250 20 460 80" fill="none" stroke="#5b6672" strokeDasharray="6 5" />
                </g>
              )}
              <text x={300} y={140} textAnchor="middle" className="lab-small">
                đầu tự do của thước
              </text>
            </g>
          )}
          {doc.src === 'string' && (
            <g transform="translate(600 340)">
              <rect x={-460} y={-60} width={920} height={120} rx={20} fill="#d39b5b" stroke="#7a4b24" strokeWidth={4} />
              <circle cx={140} cy={0} r={50} fill="#3b2a1a" />
              <rect x={-470} y={-50} width={20} height={100} fill="#eee" />
              <rect x={380} y={-50} width={20} height={100} fill="#eee" />
              {[-30, -10, 10, 30].map((y, k) => (
                <path key={k} d={`M -450 ${y} Q -35 ${y + (k === 1 ? osc * 40 : 0)} 380 ${y}`} fill="none" stroke="#e8e8e8" strokeWidth={k === 1 ? 4 : 2} />
              ))}
              {amp > 0 && (
                <g opacity={0.3}>
                  <path d="M -450 -10 Q -35 -50 380 -10" fill="none" stroke="#fff" strokeDasharray="6 5" />
                  <path d="M -450 -10 Q -35 30 380 -10" fill="none" stroke="#fff" strokeDasharray="6 5" />
                </g>
              )}
            </g>
          )}
          {doc.src === 'bottle' && (
            <g transform="translate(600 300)">
              <path d="M -40 -160 L -40 200 A 40 40 0 0 0 40 200 L 40 -160" fill="rgba(190,230,245,0.5)" stroke="#5f7488" strokeWidth={4} />
              {Array.from({ length: 30 }, (_, k) => (
                <circle key={k} cx={-24 + (k % 4) * 16} cy={-140 + Math.floor(k / 4) * 44 + Math.sin(t * 20 + k) * 10 * amp} r={4} fill="#5b8dd6" opacity={0.6} />
              ))}
              <g transform={`translate(-150 -230)`}>
                <circle r={40} fill="#f2c48d" stroke="#333" strokeWidth={2} />
                <ellipse cx={30} cy={14} rx={10} ry={6} fill="#c0392b" />
              </g>
              {amp > 0.2 && <Arrow x1={-100} y1={-210} x2={-30} y2={-170} color="#5b8dd6" width={3} />}
            </g>
          )}
          {amp > 0.05 && showValues && (
            <g>
              {[0, 1, 2].map((k) => {
                const r = 60 + (((t * 160 + k * 80) % 240) as number);
                return <path key={k} d={`M ${980 - r * 0.2} ${300 - r * 0.6} A ${r} ${r} 0 0 1 ${980 - r * 0.2} ${300 + r * 0.6}`} transform={`translate(${r * 0.3} 0)`} fill="none" stroke="var(--accent)" strokeWidth={4} opacity={amp * (1 - r / 320)} />;
              })}
              <text x={1060} y={140} textAnchor="middle" className="lab-label">
                ♪ âm phát ra
              </text>
            </g>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Nguồn âm</h3>
        <Row label="Vật phát ra âm">
          <Seg value={doc.src} options={list} onChange={(s) => onDoc({ ...doc, src: s })} fmtOpt={(s) => SOURCES[s].name} />
        </Row>
        <div className="insp-actions">
          <button className="btn primary" onClick={hit}>
            {doc.src === 'string' ? 'Gảy dây' : doc.src === 'ruler' ? 'Kéo rồi buông thước' : doc.src === 'bottle' ? 'Thổi vào ống' : 'Gõ'}
          </button>
          <button className="btn" onClick={() => setAmp(0)}>
            Giữ chặt (ngừng dao động)
          </button>
        </div>
        <Toggle value={sound} onChange={setSound} label="Phát âm thanh qua loa máy tính" />
        <div className="insp-values two">
          <div>
            <span>Trạng thái</span>
            <b>{amp > 0.02 ? 'đang dao động' : 'đứng yên'}</b>
          </div>
          <div>
            <span>Có âm phát ra?</span>
            <b>{showValues ? (amp > 0.02 ? 'Có' : 'Không') : '?'}</b>
          </div>
        </div>
        <p className="small">{s.note}</p>
        <p className="small">Các vật phát ra âm đều dao động. Vật phát ra âm gọi là nguồn âm. Chuyển động lặp đi lặp lại quanh một vị trí cân bằng gọi là dao động.</p>
        <p className="small muted">Dao động trong mô phỏng được làm chậm lại để mắt quan sát được.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Sóng âm truyền trong các môi trường
// =====================================================================

export const MEDIA_SOUND = {
  air: { name: 'Không khí', v: 343, color: '#9cc5ff', density: 1 },
  water: { name: 'Nước', v: 1500, color: '#3d8bfd', density: 1.6 },
  steel: { name: 'Thép', v: 6100, color: '#8d99a6', density: 2.2 },
  vacuum: { name: 'Chân không', v: 0, color: 'transparent', density: 0 },
} as const;

export interface WaveDoc {
  mode: 'wave';
  medium: keyof typeof MEDIA_SOUND;
  /** hiển thị mô hình hạt hay đường nén – giãn */
  view?: 'particles' | 'layers';
}

export function WaveView({ doc, onDoc, showValues }: EngineProps<WaveDoc, unknown>) {
  const [t, setT] = useState(0);
  const [on, setOn] = useState(true);
  useRaf((dt) => setT((x) => x + dt), on);
  const m = MEDIA_SOUND[doc.medium];
  const vac = doc.medium === 'vacuum';
  const k = (2 * Math.PI) / 170;
  const w = 2 * Math.PI * 0.9;
  const A = 16;
  // sóng chỉ lan tới vị trí x đã được truyền tới
  const front = 200 + t * 220;
  const parts = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    const cols = Math.round(70 * Math.sqrt(m.density || 1));
    const rows = Math.round(9 * Math.sqrt(m.density || 1));
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) out.push({ x: 210 + (c + ((r * 7) % 3) * 0.33) * (800 / cols), y: 190 + ((r + 0.5) * 300) / rows });
    return out;
  }, [m.density]);
  const disp = (x: number) => (vac || x > front ? 0 : A * Math.sin(w * t - k * (x - 200)) * Math.min(1, (front - x) / 60));
  const memb = vac ? A * Math.sin(w * t) : A * Math.sin(w * t);
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <text x={600} y={50} textAnchor="middle" className="lab-label">
            Sóng âm trong {m.name.toLowerCase()} {vac ? '' : '– các lớp nén, giãn lan truyền ra xa nguồn âm'}
          </text>
          <rect x={200} y={180} width={820} height={320} fill={vac ? 'rgba(0,0,0,0.04)' : m.color} opacity={vac ? 1 : 0.18} stroke="var(--line)" />
          {/* loa */}
          <g transform="translate(150 340)">
            <rect x={-80} y={-70} width={60} height={140} fill="#333" />
            <path d={`M -20 -60 L ${30 + memb * 0.4} -130 L ${30 + memb * 0.4} 130 L -20 60 Z`} fill="#555" stroke="#222" strokeWidth={3} />
            <text x={-40} y={110} textAnchor="middle" className="lab-small" transform="translate(0 70)">
              Loa (nguồn âm)
            </text>
          </g>
          {!vac &&
            (doc.view === 'layers'
              ? Array.from({ length: 80 }, (_, i) => {
                  const x0 = 210 + i * 10;
                  const x = x0 + disp(x0);
                  return <line key={i} x1={x} x2={x} y1={190} y2={490} stroke="var(--ink)" strokeWidth={2} opacity={0.65} />;
                })
              : parts.map((p, i) => <circle key={i} cx={p.x + disp(p.x)} cy={p.y} r={4.5} fill={doc.medium === 'air' ? '#3a6fd8' : doc.medium === 'water' ? '#1d4fa0' : '#444'} />))}
          {!vac && (
            <g>
              {/* một hạt được đánh dấu: chỉ dao động tại chỗ */}
              <circle cx={600 + disp(600)} cy={parts[Math.floor(parts.length / 2)]?.y ?? 340} r={9} fill="#e63946" stroke="#fff" strokeWidth={2} />
              <text x={600} y={530} textAnchor="middle" className="lab-small">
                hạt màu đỏ chỉ dao động qua lại quanh vị trí cân bằng, không đi theo sóng
              </text>
            </g>
          )}
          {vac && (
            <text x={610} y={350} textAnchor="middle" fontSize={30} fontWeight={800} fill="var(--danger)">
              Không có hạt nào để dao động – âm không truyền được
            </text>
          )}
          {/* tai người */}
          <g transform="translate(1090 340)">
            <path d="M -20 -60 C 40 -70 50 20 10 40 C -10 50 0 70 -20 70" fill="#f2c48d" stroke="#333" strokeWidth={3} />
            <text x={0} y={110} textAnchor="middle" className="lab-small">
              Tai
            </text>
            {showValues && (
              <text x={0} y={-90} textAnchor="middle" fontSize={22} fontWeight={800} fill={vac ? 'var(--danger)' : 'var(--ok)'}>
                {vac ? 'Không nghe thấy' : front > 1020 ? 'Nghe thấy' : '…'}
              </text>
            )}
          </g>
          <g transform="translate(200 580)">
            <text className="lab-label">Tốc độ truyền âm (ở khoảng 20 °C):</text>
            {(['air', 'water', 'steel'] as const).map((key, i) => (
              <g key={key} transform={`translate(${i * 300} 30)`}>
                <rect width={Math.max(8, MEDIA_SOUND[key].v / 25)} height={22} fill={MEDIA_SOUND[key].color} stroke="#555" />
                <text x={0} y={46} className="lab-small">
                  {MEDIA_SOUND[key].name}: {showValues ? `${vn(MEDIA_SOUND[key].v, 0)} m/s` : '?'}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Môi trường truyền âm</h3>
        <Row label="Môi trường">
          <Seg value={doc.medium} options={Object.keys(MEDIA_SOUND) as (keyof typeof MEDIA_SOUND)[]} onChange={(md) => (onDoc({ ...doc, medium: md }), setT(0))} fmtOpt={(md) => MEDIA_SOUND[md].name} />
        </Row>
        <Row label="Cách biểu diễn">
          <Seg value={doc.view ?? 'particles'} options={['particles', 'layers'] as const} onChange={(v) => onDoc({ ...doc, view: v })} fmtOpt={(v) => (v === 'particles' ? 'Mô hình hạt' : 'Các lớp nén – giãn')} />
        </Row>
        <div className="insp-actions">
          <button className="btn primary" onClick={() => setOn(!on)}>
            {on ? 'Tạm dừng' : 'Chạy tiếp'}
          </button>
          <button className="btn" onClick={() => setT(0)}>
            Phát lại từ đầu
          </button>
        </div>
        <div className="insp-values two">
          <div>
            <span>Tốc độ truyền âm</span>
            <b>{showValues ? (vac ? 'không truyền' : `${vn(m.v, 0)} m/s`) : '?'}</b>
          </div>
          <div>
            <span>Thời gian truyền 1 km</span>
            <b>{showValues ? (vac ? '–' : `${vn(1000 / m.v, 2)} s`) : '?'}</b>
          </div>
        </div>
        <p className="small">Màng loa dao động làm các lớp không khí sát nó lần lượt bị nén, giãn. Dao động truyền từ lớp hạt này sang lớp hạt khác tạo thành sóng âm. Sóng âm truyền được trong chất rắn, lỏng, khí; không truyền được trong chân không.</p>
        <p className="small muted">Nói chung tốc độ truyền âm trong chất rắn lớn hơn trong chất lỏng, trong chất lỏng lớn hơn trong chất khí.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Chuông điện trong bình hút khí
// =====================================================================

export interface BellJarDoc {
  mode: 'belljar';
  /** áp suất không khí còn lại trong bình (0..1) */
  air: number;
}

export function BellJarView({ doc, onDoc, showValues }: EngineProps<BellJarDoc, unknown>) {
  const [ring, setRing] = useState(false);
  const [t, setT] = useState(0);
  useRaf((dt) => setT((x) => x + dt), ring);
  useTone(ring, 880, Math.sqrt(doc.air) * 0.8);
  useEffect(() => () => setRing(false), []);
  const loud = doc.air;
  const hammer = ring ? Math.sin(t * 60) * 10 : 0;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={0} y={600} width={VW} height={80} className="lab-table" />
          <rect x={300} y={560} width={460} height={40} fill="#555" />
          <path d="M 330 560 L 330 260 Q 330 120 530 120 Q 730 120 730 260 L 730 560" fill="rgba(190,230,245,0.35)" stroke="#5f7488" strokeWidth={5} />
          {Array.from({ length: Math.round(60 * doc.air) }, (_, k) => (
            <circle key={k} cx={360 + ((k * 61) % 340) + Math.sin(t * 3 + k) * 4} cy={170 + ((k * 37) % 370)} r={4} fill="#3a6fd8" opacity={0.55} />
          ))}
          {/* chuông điện */}
          <g transform="translate(530 420)">
            <rect x={-12} y={20} width={24} height={120} fill="#777" />
            <path d="M -70 20 Q -70 -70 0 -70 Q 70 -70 70 20 Z" fill="#f1c40f" stroke="#a67c00" strokeWidth={3} />
            <line x1={80} y1={60} x2={50 + hammer} y2={-10} stroke="#333" strokeWidth={6} />
            <circle cx={50 + hammer} cy={-10} r={10} fill="#333" />
          </g>
          {/* máy hút */}
          <g transform="translate(900 480)">
            <rect x={-80} y={-60} width={160} height={120} rx={12} fill="#2a9d8f" stroke="#1d6b62" strokeWidth={3} />
            <text y={6} textAnchor="middle" fill="#fff" fontWeight={800} fontSize={20}>
              Máy hút khí
            </text>
            <path d="M -80 40 L -140 40 L -140 100 L -170 100" fill="none" stroke="#333" strokeWidth={10} />
          </g>
          {ring && loud > 0.03 && showValues && (
            <g>
              {[0, 1, 2].map((k) => {
                const r = 30 + ((t * 120 + k * 50) % 150);
                return <circle key={k} cx={530} cy={380} r={r + 120} fill="none" stroke="var(--accent)" strokeWidth={4} opacity={loud * (1 - r / 180) * 0.8} />;
              })}
            </g>
          )}
          <text x={530} y={100} textAnchor="middle" className="lab-label">
            Không khí còn lại trong bình: {Math.round(doc.air * 100)}%
          </text>
          <g transform="translate(60 120)">
            <text className="lab-small">Độ to nghe được</text>
            <rect y={14} width={40} height={300} rx={8} fill="var(--surface-2)" stroke="var(--line)" />
            <rect y={14 + 300 * (1 - (ring ? loud : 0))} width={40} height={300 * (ring ? loud : 0)} rx={8} fill="var(--accent)" opacity={showValues ? 1 : 0} />
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Âm có truyền qua chân không?</h3>
        <div className="insp-actions">
          <button className={`btn ${ring ? 'on' : 'primary'}`} onClick={() => setRing(!ring)}>
            {ring ? 'Tắt chuông' : 'Bật chuông'}
          </button>
        </div>
        <Row label="Hút bớt không khí">
          <Slider value={doc.air} min={0} max={1} step={0.05} digits={2} onChange={(v) => onDoc({ ...doc, air: v })} />
        </Row>
        <div className="insp-actions">
          <button className="btn" onClick={() => onDoc({ ...doc, air: 0 })}>
            Hút hết không khí
          </button>
          <button className="btn" onClick={() => onDoc({ ...doc, air: 1 })}>
            Cho không khí vào lại
          </button>
        </div>
        <p className="small">Khi hút dần không khí ra khỏi bình, tiếng chuông nhỏ dần dù búa chuông vẫn gõ. Gần như hết không khí thì không nghe thấy tiếng chuông: âm không truyền được trong chân không.</p>
        <p className="small muted">Bật loa máy tính để nghe tiếng chuông nhỏ dần.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Dao động kí: biên độ – độ to, tần số – độ cao
// =====================================================================

export interface ScopeDoc {
  mode: 'scope';
  src: 'tone' | 'ruler' | 'string';
  /** biên độ 0..1 */
  A: number;
  /** tần số (Hz) – chế độ máy phát âm */
  f: number;
  /** chiều dài phần tự do của thước (cm) */
  L?: number;
  /** dây đàn: số thứ tự dây 1 (mảnh, cao) .. 6 (to, trầm) */
  str?: number;
  /** âm so sánh vẽ mờ */
  ref?: { A: number; f: number };
  /** chỉ cho chỉnh một đại lượng */
  only?: 'A' | 'f';
}

const STR_F = [0, 330, 247, 196, 147, 110, 82];

export function scopeFreq(doc: ScopeDoc): number {
  if (doc.src === 'ruler') return Math.round(40000 / (doc.L ?? 20) ** 2);
  if (doc.src === 'string') return STR_F[doc.str ?? 1];
  return doc.f;
}

export function ScopeView({ doc, onDoc, showValues, onMeasure }: EngineProps<ScopeDoc, unknown>) {
  const f = scopeFreq(doc);
  const [play, setPlay] = useState(false);
  const [t, setT] = useState(0);
  useRaf((dt) => setT((x) => x + dt), true);
  useTone(play && doc.src === 'tone', f, doc.A);
  useEffect(() => onMeasure?.({ f, A: doc.A }), [f, doc.A, onMeasure]);
  useEffect(() => () => setPlay(false), []);
  // khung thời gian hiển thị tự chọn để thấy vài dao động
  const win = f <= 0 ? 0.1 : f < 30 ? 0.5 : f < 300 ? 0.02 : f < 3000 ? 0.004 : 0.0005;
  const sx = 120;
  const sy = 70;
  const sw = 760;
  const sh = 400;
  const cy = sy + sh / 2;
  const trace = (A: number, ff: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 600; i++) {
      const tt = (win * i) / 600;
      pts.push(`${sx + (sw * i) / 600},${cy - A * (sh / 2 - 20) * Math.sin(2 * Math.PI * ff * tt + t * 3)}`);
    }
    return pts.join(' ');
  };
  const band = f < 20 ? 'Hạ âm (tai người không nghe được)' : f > 20000 ? 'Siêu âm (tai người không nghe được)' : 'Âm nghe được';
  const pitch = f < 20 || f > 20000 ? '' : f < 200 ? 'âm trầm' : f < 1000 ? 'âm trung bình' : 'âm cao (bổng)';
  const db = Math.round(20 + doc.A * 80);
  const strike = () => {
    if (doc.src !== 'tone') pluck(f, doc.A, 1.8, doc.src === 'string' ? 'triangle' : 'sine');
  };
  const logF = Math.log10(Math.max(1, doc.f));
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {/* màn hình dao động kí */}
          <rect x={sx - 20} y={sy - 20} width={sw + 40} height={sh + 40} rx={18} fill="#1b1f24" />
          {Array.from({ length: 11 }, (_, i) => (
            <line key={`v${i}`} x1={sx + (sw * i) / 10} x2={sx + (sw * i) / 10} y1={sy} y2={sy + sh} stroke="#2e4b3c" strokeWidth={i === 5 ? 2 : 1} />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`h${i}`} x1={sx} x2={sx + sw} y1={sy + (sh * i) / 8} y2={sy + (sh * i) / 8} stroke="#2e4b3c" strokeWidth={i === 4 ? 2 : 1} />
          ))}
          {doc.ref && <polyline points={trace(doc.ref.A, doc.ref.f)} fill="none" stroke="#ffd166" strokeWidth={3} opacity={0.55} />}
          <polyline points={trace(doc.A, f)} fill="none" stroke="#2bdc4a" strokeWidth={4} />
          {showValues && (
            <g>
              <line x1={sx + 10} x2={sx + 10} y1={cy} y2={cy - doc.A * (sh / 2 - 20)} stroke="#ff4d4d" strokeWidth={3} />
              <text x={sx + 18} y={cy - doc.A * (sh / 2 - 20) / 2} fill="#ff4d4d" fontSize={18} fontWeight={800}>
                biên độ
              </text>
            </g>
          )}
          <text x={sx} y={sy + sh + 46} className="lab-small">
            Màn hình dao động kí · mỗi ô ngang: {win >= 0.01 ? `${vn((win / 10) * 1000, 1)} ms` : `${vn((win / 10) * 1e6, 0)} µs`}
          </text>
          {doc.ref && (
            <text x={sx + sw} y={sy + sh + 46} textAnchor="end" className="lab-small" fill="#c9a227">
              đường vàng: âm để so sánh
            </text>
          )}
          {/* nguồn âm nhỏ ở góc */}
          <g transform="translate(1040 160)">
            {doc.src === 'tone' && (
              <g>
                <rect x={-80} y={-60} width={160} height={110} rx={12} fill="#e9edf2" stroke="#7a8794" strokeWidth={3} />
                <text y={-24} textAnchor="middle" className="tick-small">
                  Máy phát âm tần
                </text>
                <text y={16} textAnchor="middle" fontSize={26} fontWeight={900} fill="#1d6fe0">
                  {vn(f, 0)} Hz
                </text>
                <path d="M 80 0 L 120 -30 L 120 30 Z" fill="#555" />
              </g>
            )}
            {doc.src === 'ruler' && (
              <g>
                <rect x={-100} y={-6} width={60} height={70} fill="#8b5a2b" />
                <rect x={-70} y={-30} width={30} height={24} fill="#c0392b" />
                <path d={`M -90 -8 L ${-40 + (doc.L ?? 20) * 5} ${-8 + Math.sin(t * 20) * doc.A * 20} L ${-40 + (doc.L ?? 20) * 5} ${Math.sin(t * 20) * doc.A * 20} L -90 0 Z`} fill="#c4cdd6" stroke="#5b6672" />
                <text x={0} y={100} textAnchor="middle" className="tick-small">
                  phần tự do: {doc.L} cm
                </text>
              </g>
            )}
            {doc.src === 'string' && (
              <g>
                {[1, 2, 3, 4, 5, 6].map((k) => (
                  <line key={k} x1={-100} x2={100} y1={-60 + k * 18} y2={-60 + k * 18} stroke={k === doc.str ? '#e63946' : '#c9b38a'} strokeWidth={1 + k * 0.7} />
                ))}
                <text y={90} textAnchor="middle" className="tick-small">
                  Dây số {doc.str} (dây 1 mảnh nhất)
                </text>
              </g>
            )}
          </g>
          {/* thang tần số */}
          <g transform="translate(120 600)">
            {[
              { a: 0, b: Math.log10(20), c: '#b8c2cc', n: 'Hạ âm' },
              { a: Math.log10(20), b: Math.log10(20000), c: '#8fd19e', n: 'Âm nghe được (20 Hz – 20 000 Hz)' },
              { a: Math.log10(20000), b: 5, c: '#c3a6ff', n: 'Siêu âm' },
            ].map((z) => (
              <g key={z.n}>
                <rect x={z.a * 192} y={0} width={(z.b - z.a) * 192} height={26} fill={z.c} />
                <text x={((z.a + z.b) / 2) * 192} y={18} textAnchor="middle" fontSize={15} fontWeight={800} fill="#222">
                  {z.n}
                </text>
              </g>
            ))}
            <path d={`M ${Math.log10(Math.max(1, f)) * 192} -4 l -8 -14 l 16 0 z`} fill="var(--danger)" />
            {[1, 10, 100, 1000, 10000, 100000].map((v, i) => (
              <text key={v} x={i * 192} y={48} textAnchor="middle" className="tick-small">
                {vn(v, 0)} Hz
              </text>
            ))}
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Độ to, độ cao của âm</h3>
        <Row label="Nguồn âm">
          <Seg value={doc.src} options={['tone', 'ruler', 'string'] as const} onChange={(s) => onDoc({ ...doc, src: s, L: doc.L ?? 20, str: doc.str ?? 1 })} fmtOpt={(s) => (s === 'tone' ? 'Máy phát âm' : s === 'ruler' ? 'Thước thép' : 'Dây đàn')} />
        </Row>
        {doc.only !== 'f' && (
          <Row label={doc.src === 'tone' ? 'Biên độ (núm âm lượng)' : 'Gảy/kéo mạnh hay nhẹ'}>
            <Slider value={doc.A} min={0.1} max={1} step={0.05} digits={2} onChange={(v) => onDoc({ ...doc, A: v })} />
          </Row>
        )}
        {doc.only !== 'A' && doc.src === 'tone' && (
          <Row label="Tần số">
            <div className="slider">
              <input type="range" min={0.5} max={4.6} step={0.01} value={logF} onChange={(e) => onDoc({ ...doc, f: Math.round(10 ** Number(e.target.value)) })} />
              <span className="slider-val">{vn(doc.f, 0)} Hz</span>
            </div>
          </Row>
        )}
        {doc.only !== 'A' && doc.src === 'ruler' && (
          <Row label="Chiều dài phần tự do của thước">
            <Slider value={doc.L ?? 20} min={8} max={30} step={1} digits={0} suffix="cm" onChange={(v) => onDoc({ ...doc, L: v })} />
          </Row>
        )}
        {doc.only !== 'A' && doc.src === 'string' && (
          <Row label="Dây đàn">
            <Seg value={doc.str ?? 1} options={[1, 2, 3, 4, 5, 6] as const} onChange={(v) => onDoc({ ...doc, str: v })} fmtOpt={(v) => `Dây ${v}`} />
          </Row>
        )}
        <div className="insp-actions">
          {doc.src === 'tone' ? (
            <button className={`btn ${play ? 'on' : 'primary'}`} onClick={() => setPlay(!play)}>
              {play ? 'Tắt âm' : 'Phát âm'}
            </button>
          ) : (
            <button className="btn primary" onClick={strike}>
              {doc.src === 'ruler' ? 'Kéo rồi buông thước' : 'Gảy dây'}
            </button>
          )}
        </div>
        <div className="insp-values">
          <div>
            <span>Tần số</span>
            <b>{showValues ? `${vn(f, 0)} Hz` : '?'}</b>
          </div>
          <div>
            <span>Độ to (ước tính)</span>
            <b>{showValues ? `${db} dB` : '?'}</b>
          </div>
          <div>
            <span>Loại âm</span>
            <b style={{ fontSize: '0.9rem' }}>{showValues ? pitch || band : '?'}</b>
          </div>
        </div>
        {showValues && (f < 20 || f > 20000) && <p className="nature">{band}</p>}
        <p className="small">Biên độ dao động càng lớn, âm càng to. Tần số (số dao động trong một giây, đơn vị hertz – Hz) càng lớn, âm càng cao (bổng); tần số càng nhỏ, âm càng thấp (trầm).</p>
        {doc.src === 'ruler' && <p className="small muted">Phần tự do của thước càng ngắn, thước dao động càng nhanh, âm phát ra càng cao. Thước quá dài dao động dưới 20 lần/giây: tai không nghe thấy (hạ âm).</p>}
        {doc.src === 'tone' && <p className="small muted">Bật loa máy tính. Tai người nghe được âm có tần số từ khoảng 20 Hz đến 20 000 Hz.</p>}
      </aside>
    </div>
  );
}

// =====================================================================
// Phản xạ âm – tiếng vang – đo độ sâu
// =====================================================================

export interface EchoDoc {
  mode: 'echo';
  scene: 'wall' | 'sonar';
  /** khoảng cách tới vật cản (m) */
  d: number;
  surface: 'hard' | 'soft';
}

export function EchoView({ doc, onDoc, showValues, onMeasure }: EngineProps<EchoDoc, unknown>) {
  const sonar = doc.scene === 'sonar';
  const v = sonar ? 1500 : 343;
  const tEcho = (2 * doc.d) / v;
  const [t, setT] = useState(-1);
  const run = t >= 0 && t < 1.2;
  useRaf((dt) => setT((x) => (x < 0 ? x : x + dt / 2.2)), run);
  // t ở đây là thời gian chuẩn hoá: 0 → phát, 0.5 → chạm vật cản, 1 → về tới nguồn
  const refl = doc.surface === 'hard' ? 1 : 0.25;
  const fire = () => {
    setT(0);
    if (!sonar) {
      pluck(500, 0.8, 0.25, 'square');
      if (tEcho >= 1 / 15) setTimeout(() => pluck(500, 0.8 * refl, 0.25, 'square'), tEcho * 1000);
    }
  };
  useEffect(() => onMeasure?.({ d: doc.d, t: tEcho }), [doc.d, tEcho, onMeasure]);
  const echo = tEcho >= 1 / 15;
  const sx = sonar ? 600 : 180;
  const sy = sonar ? 170 : 380;
  const wx = 1060;
  const by = 600;
  const D = sonar ? by - sy : wx - sx;
  const pos = Math.min(1, t * 2) * D;
  const back = t > 0.5 ? Math.min(1, (t - 0.5) * 2) * D : 0;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {!sonar ? (
            <g>
              <rect x={0} y={560} width={VW} height={120} fill="#9bc27a" />
              <rect x={wx} y={120} width={80} height={440} fill={doc.surface === 'hard' ? '#b5651d' : '#d8c3a5'} stroke="#7a4b24" strokeWidth={3} />
              {doc.surface === 'hard'
                ? Array.from({ length: 11 }, (_, k) => <line key={k} x1={wx} x2={wx + 80} y1={120 + k * 40} y2={120 + k * 40} stroke="#7a4b24" strokeWidth={2} />)
                : Array.from({ length: 22 }, (_, k) => <circle key={k} cx={wx + 20 + (k % 3) * 20} cy={140 + Math.floor(k / 3) * 60} r={8} fill="#b9a382" />)}
              <text x={wx + 40} y={100} textAnchor="middle" className="lab-label">
                {doc.surface === 'hard' ? 'Vách đá, tường cứng' : 'Bề mặt mềm, xốp'}
              </text>
              <g transform={`translate(${sx} ${sy})`}>
                <circle cx={0} cy={-80} r={26} fill="#f2c48d" stroke="#333" strokeWidth={2} />
                <rect x={-22} y={-54} width={44} height={110} rx={14} fill="#1d6fe0" />
                <rect x={-20} y={56} width={14} height={120} fill="#333" />
                <rect x={6} y={56} width={14} height={120} fill="#333" />
                <path d="M 20 -76 L 50 -96 L 50 -60 Z" fill="#c0392b" />
              </g>
            </g>
          ) : (
            <g>
              <rect x={0} y={170} width={VW} height={430} fill="#2f6fb0" opacity={0.6} />
              <rect x={0} y={by} width={VW} height={VH - by} fill="#a07c4f" />
              <path d={`M 470 170 L 730 170 L 700 130 L 500 130 Z`} fill="#eee" stroke="#555" strokeWidth={3} />
              <rect x={560} y={90} width={80} height={40} fill="#e63946" />
              <rect x={590} y={170} width={20} height={14} fill="#333" />
              <text x={600} y={70} textAnchor="middle" className="lab-label">
                Tàu có máy phát và thu siêu âm
              </text>
              <text x={1100} y={by + 40} textAnchor="end" className="lab-label">
                Đáy biển
              </text>
            </g>
          )}
          {/* sóng âm đi tới */}
          {t >= 0 && t <= 0.55 &&
            [0, 18, 36].map((o) =>
              sonar ? (
                <path key={o} d={`M ${sx - 70} ${sy + pos - o} Q ${sx} ${sy + pos - o + 22} ${sx + 70} ${sy + pos - o}`} fill="none" stroke="#ffd166" strokeWidth={4} opacity={pos - o > 0 ? 1 : 0} />
              ) : (
                <path key={o} d={`M ${sx + pos - o} ${sy - 120} Q ${sx + pos - o + 30} ${sy - 80} ${sx + pos - o} ${sy - 40}`} transform={`translate(0 0)`} fill="none" stroke="var(--accent)" strokeWidth={5} opacity={pos - o > 0 ? 1 : 0} />
              ),
            )}
          {/* sóng phản xạ */}
          {t > 0.5 && t <= 1.05 &&
            [0, 18, 36].map((o) =>
              sonar ? (
                <path key={o} d={`M ${sx - 70} ${by - back + o} Q ${sx} ${by - back + o - 22} ${sx + 70} ${by - back + o}`} fill="none" stroke="#ff8fab" strokeWidth={4} opacity={refl} />
              ) : (
                <path key={o} d={`M ${wx - back + o} ${sy - 120} Q ${wx - back + o - 30} ${sy - 80} ${wx - back + o} ${sy - 40}`} fill="none" stroke="var(--danger)" strokeWidth={5} opacity={refl} />
              ),
            )}
          {!sonar && doc.surface === 'soft' && t > 0.5 && t < 0.7 && (
            <text x={wx - 20} y={sy - 140} textAnchor="end" className="lab-small">
              phần lớn âm bị hấp thụ
            </text>
          )}
          {/* thước khoảng cách */}
          {!sonar ? (
            <g>
              <Arrow x1={sx} y1={600} x2={wx} y2={600} color="var(--ink)" width={3} head={12} />
              <Arrow x1={wx} y1={600} x2={sx} y2={600} color="var(--ink)" width={3} head={12} />
              <text x={(sx + wx) / 2} y={636} textAnchor="middle" className="lab-label">
                d = {vn(doc.d, 1)} m
              </text>
            </g>
          ) : (
            <g>
              <Arrow x1={760} y1={sy + 10} x2={760} y2={by} color="#fff" width={3} head={12} />
              <Arrow x1={760} y1={by} x2={760} y2={sy + 10} color="#fff" width={3} head={12} />
              <text x={780} y={(sy + by) / 2} fill="#fff" fontSize={22} fontWeight={800}>
                độ sâu h = {showValues ? `${vn(doc.d, 0)} m` : '?'}
              </text>
            </g>
          )}
          {t > 1 && showValues && (
            <text x={600} y={sonar ? 660 : 50} textAnchor="middle" fontSize={26} fontWeight={800} fill={sonar ? 'var(--ink)' : echo ? 'var(--danger)' : 'var(--accent)'}>
              {sonar
                ? `Thu được âm phản xạ sau t = ${vn(tEcho, 3)} s → h = v·t/2 = 1500·${vn(tEcho, 3)}/2 = ${vn(doc.d, 0)} m`
                : echo
                  ? `Nghe thấy tiếng vang sau ${vn(tEcho, 2)} s`
                  : `Âm phản xạ về sau ${vn(tEcho, 3)} s (< 1/15 s): hoà lẫn với âm phát ra, không thành tiếng vang`}
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{sonar ? 'Đo độ sâu đáy biển' : 'Phản xạ âm, tiếng vang'}</h3>
        <Row label="Tình huống">
          <Seg value={doc.scene} options={['wall', 'sonar'] as const} onChange={(s) => onDoc({ ...doc, scene: s, d: s === 'sonar' ? 3000 : 34 })} fmtOpt={(s) => (s === 'wall' ? 'Hét trước vách đá' : 'Tàu đo độ sâu')} />
        </Row>
        <Row label={sonar ? 'Độ sâu đáy biển' : 'Khoảng cách tới vật cản'}>
          {sonar ? <Slider value={doc.d} min={500} max={6000} step={250} digits={0} suffix="m" onChange={(x) => onDoc({ ...doc, d: x })} /> : <Slider value={doc.d} min={2} max={100} step={1} digits={0} suffix="m" onChange={(x) => onDoc({ ...doc, d: x })} />}
        </Row>
        {!sonar && (
          <Row label="Bề mặt vật cản">
            <Seg value={doc.surface} options={['hard', 'soft'] as const} onChange={(s) => onDoc({ ...doc, surface: s })} fmtOpt={(s) => (s === 'hard' ? 'Cứng, nhẵn' : 'Mềm, xốp, gồ ghề')} />
          </Row>
        )}
        <div className="insp-actions">
          <button className="btn primary" onClick={fire}>
            {sonar ? 'Phát siêu âm' : 'Hét to'}
          </button>
        </div>
        <div className="insp-values two">
          <div>
            <span>Tốc độ âm</span>
            <b>{v} m/s</b>
          </div>
          <div>
            <span>Thời gian âm đi và về</span>
            <b>{showValues ? `${vn(tEcho, 3)} s` : '?'}</b>
          </div>
        </div>
        <p className="small">Âm gặp vật cản bị phản xạ trở lại. Vật cứng, bề mặt nhẵn phản xạ âm tốt; vật mềm, xốp, bề mặt gồ ghề phản xạ âm kém (hấp thụ âm tốt).</p>
        <p className="small muted">{sonar ? 'Siêu âm phát xuống đáy biển, phản xạ trở lại tàu sau thời gian t. Âm đi hai lần độ sâu nên h = v·t/2.' : 'Ta nghe được tiếng vang khi âm phản xạ đến tai chậm hơn âm phát ra ít nhất 1/15 giây.'}</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Chống ô nhiễm tiếng ồn
// =====================================================================

export const NOISE_FIX = {
  limit: { name: 'Hạn chế xe, cấm bấm còi', db: 8, kind: 'Tác động vào nguồn âm' },
  trees: { name: 'Trồng cây xanh', db: 6, kind: 'Phân tán âm trên đường truyền' },
  wall: { name: 'Xây tường chắn', db: 10, kind: 'Ngăn chặn đường truyền âm' },
  window: { name: 'Cửa kính hai lớp', db: 8, kind: 'Ngăn chặn đường truyền âm' },
  curtain: { name: 'Rèm, thảm, tường xốp', db: 5, kind: 'Hấp thụ âm' },
} as const;

export interface NoiseDoc {
  mode: 'noise';
  on: (keyof typeof NOISE_FIX)[];
}

export function NoiseView({ doc, onDoc, showValues }: EngineProps<NoiseDoc, unknown>) {
  const [t, setT] = useState(0);
  useRaf((dt) => setT((x) => x + dt), true);
  const src = 85;
  const level = src - doc.on.reduce((s, k) => s + NOISE_FIX[k].db, 0);
  const has = (k: keyof typeof NOISE_FIX) => doc.on.includes(k);
  const toggle = (k: keyof typeof NOISE_FIX) => onDoc({ ...doc, on: has(k) ? doc.on.filter((x) => x !== k) : [...doc.on, k] });
  const cars = has('limit') ? 2 : 5;
  const waveOp = Math.max(0.15, (level - 30) / 55);
  const ok = level <= 70;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={0} y={0} width={VW} height={440} fill="#d6ecff" opacity={0.5} />
          <rect x={0} y={440} width={VW} height={240} fill="#9bc27a" />
          {/* đường */}
          <rect x={0} y={480} width={420} height={200} fill="#6b737c" transform="skewX(-10)" />
          {Array.from({ length: cars }, (_, k) => {
            const y = 520 + (k % 2) * 70;
            const x = ((t * (k % 2 ? 140 : -160) + k * 230) % 600 + 600) % 600 - 120;
            return (
              <g key={k} transform={`translate(${x} ${y})`}>
                <rect x={-40} y={-22} width={80} height={36} rx={8} fill={['#e63946', '#1d6fe0', '#f4a261', '#2a9d8f', '#9b5de5'][k]} />
                <circle cx={-24} cy={14} r={9} fill="#222" />
                <circle cx={24} cy={14} r={9} fill="#222" />
              </g>
            );
          })}
          {!has('limit') && (
            <text x={150} y={470} className="lab-small">
              Tin! Tin! (còi xe)
            </text>
          )}
          {/* sóng âm */}
          {[0, 1, 2, 3].map((k) => {
            const r = ((t * 120 + k * 90) % 360) + 60;
            return <path key={k} d={`M ${300 + r * 0.9} ${560 - r} A ${r} ${r} 0 0 1 ${300 + r} ${560}`} fill="none" stroke="#e63946" strokeWidth={5} opacity={(1 - r / 440) * (r > 360 ? waveOp : 1)} />;
          })}
          {/* cây xanh */}
          {has('trees') &&
            [520, 590, 660].map((x) => (
              <g key={x} transform={`translate(${x} 470)`}>
                <rect x={-8} y={-40} width={16} height={50} fill="#7a4b24" />
                <circle cx={0} cy={-80} r={46} fill="#2d8a3e" />
              </g>
            ))}
          {/* tường chắn */}
          {has('wall') && <rect x={720} y={300} width={30} height={170} fill="#a5a5a5" stroke="#666" strokeWidth={2} />}
          {/* nhà */}
          <g transform="translate(800 140)">
            <rect x={0} y={100} width={340} height={230} fill="#fefae0" stroke="#7a4b24" strokeWidth={4} />
            <path d="M -20 110 L 170 0 L 360 110 Z" fill="#bc4749" />
            <rect x={30} y={150} width={110} height={90} fill={has('window') ? '#bfe3ff' : '#d6ecff'} stroke="#555" strokeWidth={has('window') ? 8 : 3} />
            {has('window') && <rect x={40} y={160} width={90} height={70} fill="none" stroke="#555" strokeWidth={3} />}
            {has('curtain') && <path d="M 30 150 Q 50 200 30 240 L 60 240 Q 80 200 60 150 Z M 140 150 Q 120 200 140 240 L 110 240 Q 90 200 110 150 Z" fill="#c77dff" />}
            <rect x={210} y={200} width={70} height={130} fill="#7a4b24" />
            <g transform="translate(260 -40)">
              <rect x={-70} y={0} width={140} height={60} rx={10} fill="#1b1f24" />
              <text x={0} y={42} textAnchor="middle" fontSize={32} fontWeight={900} fill={ok ? '#2bdc4a' : '#ff4d4d'} fontFamily="'Courier New', monospace">
                {showValues ? `${level} dB` : '?? dB'}
              </text>
              <text x={0} y={-8} textAnchor="middle" className="tick-small">
                Máy đo độ to tại nhà
              </text>
            </g>
          </g>
          {showValues && (
            <text x={970} y={510} textAnchor="middle" fontSize={24} fontWeight={900} fill={ok ? 'var(--ok)' : 'var(--danger)'}>
              {ok ? 'Mức ồn chấp nhận được' : 'Ô nhiễm tiếng ồn'}
            </text>
          )}
          <text x={40} y={60} className="lab-label">
            Tiếng ồn từ đường giao thông: khoảng {src} dB
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Biện pháp chống ô nhiễm tiếng ồn</h3>
        {(Object.keys(NOISE_FIX) as (keyof typeof NOISE_FIX)[]).map((k) => (
          <Toggle key={k} value={has(k)} onChange={() => toggle(k)} label={`${NOISE_FIX[k].name} – ${NOISE_FIX[k].kind.toLowerCase()}`} />
        ))}
        <div className="insp-values two">
          <div>
            <span>Độ to tại nhà</span>
            <b>{showValues ? `${level} dB` : '?'}</b>
          </div>
          <div>
            <span>Đánh giá</span>
            <b>{showValues ? (ok ? 'Chấp nhận được' : 'Ô nhiễm') : '?'}</b>
          </div>
        </div>
        <p className="small">Ô nhiễm tiếng ồn xảy ra khi tiếng ồn to, kéo dài, gây ảnh hưởng xấu đến sức khoẻ và hoạt động bình thường của con người. Biện pháp: tác động vào nguồn âm, phân tán âm trên đường truyền, ngăn chặn đường truyền âm, dùng vật liệu hấp thụ âm.</p>
        <p className="small muted">Tham khảo: lá xào xạc ~10 dB, nói chuyện ~40 dB, đường phố đông xe ~70–90 dB, ngưỡng đau ~130 dB. Số liệu mô phỏng là gần đúng.</p>
      </aside>
    </div>
  );
}
