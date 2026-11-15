// KHTN 9 Bài 16, 17: vòng năng lượng, năng lượng hoá thạch, năng lượng tái tạo, tiết kiệm năng lượng.
import { useRef, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Slider, Toggle } from '../../ui/controls';
import { fmt, fmtShort } from '../../core/format';
import { useRaf } from '../mechanics/LeverViews';

export interface CycleDoc {
  mode: 'cycle';
  sel: number;
}
export interface FossilDoc {
  mode: 'fossil';
  /** tiến trình hình thành 0..1 */
  t: number;
  fuel: 'coal' | 'oil';
}
export interface ClimateDoc {
  mode: 'climate';
  /** mức đốt nhiên liệu hoá thạch tương đối 0..2 */
  burn: number;
}
export interface RenewDoc {
  mode: 'renew';
  sel: number;
}
export interface WindDoc {
  mode: 'wind';
  v: number;
}
export interface SolarDoc {
  mode: 'solar';
  hour: number;
  tilt: number;
  clouds: number;
}
export interface HydroDoc {
  mode: 'hydro';
  Q: number;
  h: number;
}
export interface SavingDoc {
  mode: 'saving';
  on: boolean[];
}

// ====================== Vòng năng lượng ======================
const CYCLE = [
  { name: 'Mặt Trời', x: 160, y: 120, color: '#ffb703', text: 'Nguồn năng lượng chủ yếu của Trái Đất. Năng lượng Mặt Trời truyền tới Trái Đất bằng bức xạ.' },
  { name: 'Thực vật', x: 470, y: 120, color: '#2a9d8f', text: 'Thực vật hấp thụ ánh sáng Mặt Trời, quang hợp tạo chất hữu cơ: năng lượng ánh sáng chuyển thành năng lượng hoá học.' },
  { name: 'Động vật, con người', x: 800, y: 120, color: '#e76f51', text: 'Động vật, con người lấy năng lượng từ thức ăn (thực vật) để sống, vận động, giữ ấm cơ thể.' },
  { name: 'Nhiên liệu hoá thạch', x: 800, y: 400, color: '#6d597a', text: 'Xác thực vật, động vật bị vùi lấp hàng triệu năm biến đổi thành than đá, dầu mỏ, khí tự nhiên: năng lượng hoá học được tích trữ.' },
  { name: 'Nước bốc hơi – mưa', x: 160, y: 400, color: '#219ebc', text: 'Năng lượng Mặt Trời làm nước bốc hơi, tạo mây, mưa; nước chảy từ cao xuống có năng lượng (thuỷ điện).' },
  { name: 'Gió', x: 470, y: 400, color: '#8ecae6', text: 'Mặt Trời làm nóng không khí không đều, tạo ra gió mang động năng (điện gió).' },
  { name: 'Nhiệt thải vào không gian', x: 470, y: 590, color: '#adb5bd', text: 'Sau các quá trình chuyển hoá, năng lượng cuối cùng chuyển thành nhiệt và bức xạ trở lại không gian.' },
];
const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [0, 4],
  [0, 5],
  [2, 6],
  [3, 6],
  [4, 6],
  [5, 6],
];

export function CycleView({ doc, onDoc }: EngineProps<CycleDoc, unknown>) {
  const s = CYCLE[doc.sel];
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1000 680" className="eng-svg">
          <defs>
            <marker id="cyArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--ink-2)" />
            </marker>
          </defs>
          {LINKS.map(([a, b], i) => {
            const A = CYCLE[a];
            const B = CYCLE[b];
            const dx = B.x - A.x;
            const dy = B.y - A.y;
            const L = Math.hypot(dx, dy);
            const on = a === doc.sel || b === doc.sel;
            return <line key={i} x1={A.x + (dx / L) * 80} y1={A.y + (dy / L) * 50} x2={B.x - (dx / L) * 80} y2={B.y - (dy / L) * 50} stroke={on ? 'var(--accent)' : 'var(--ink-2)'} strokeWidth={on ? 5 : 3} markerEnd="url(#cyArrow)" className={on ? 'jet' : ''} />;
          })}
          {CYCLE.map((c, i) => (
            <g key={i} onPointerDown={() => onDoc({ ...doc, sel: i })} className="draggable">
              <rect x={c.x - 110} y={c.y - 42} width={220} height={84} rx={42} fill={c.color} stroke={i === doc.sel ? 'var(--ink)' : 'transparent'} strokeWidth={4} />
              <text x={c.x} y={c.y + 2} textAnchor="middle" dominantBaseline="central" fill="#fff" fontWeight={800} fontSize={19}>
                {c.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{s.name}</h3>
        <p>{s.text}</p>
        <p className="small muted">Bấm vào từng ô trong sơ đồ để xem sự chuyển hoá năng lượng.</p>
      </aside>
    </div>
  );
}

// ====================== Hình thành nhiên liệu hoá thạch ======================
export function FossilView({ doc, onDoc }: EngineProps<FossilDoc, unknown>) {
  const t = doc.t;
  const coal = doc.fuel === 'coal';
  const stages = coal
    ? ['Rừng cây cổ đại phát triển mạnh', 'Cây chết, bị vùi lấp dưới đầm lầy', 'Các lớp đất đá bồi đắp, nén chặt', 'Áp suất và nhiệt độ cao biến đổi thành than bùn', 'Sau hàng trăm triệu năm: than đá']
    : ['Sinh vật phù du sống ở biển', 'Xác sinh vật lắng xuống đáy biển', 'Bị bùn, cát phủ lên, nén chặt', 'Nhiệt độ, áp suất cao biến đổi', 'Sau hàng triệu năm: dầu mỏ, khí tự nhiên'];
  const k = Math.min(4, Math.floor(t * 5));
  const layers = Math.floor(t * 6);
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <rect x={0} y={0} width={1200} height={250 - layers * 15} fill={coal ? '#cfe8ff' : '#7fb6e6'} />
          {Array.from({ length: layers }, (_, i) => (
            <rect key={i} x={0} y={250 - (i + 1) * 15} width={1200} height={15} fill={['#b08968', '#9c6644', '#c9a227', '#7f5539', '#a68a64', '#937062'][i % 6]} />
          ))}
          <rect x={0} y={250} width={1200} height={430} fill="#6b4f3a" />
          {/* lớp hoá thạch */}
          <rect x={150} y={420} width={900} height={70} rx={20} fill={coal ? `rgba(20,20,20,${0.3 + 0.7 * t})` : `rgba(40,30,20,${0.3 + 0.7 * t})`} />
          {!coal && t > 0.8 && <ellipse cx={600} cy={455} rx={260} ry={26} fill="#111" opacity={0.85} />}
          {k === 0 &&
            (coal
              ? Array.from({ length: 8 }, (_, i) => (
                  <g key={i} transform={`translate(${120 + i * 130} 250)`}>
                    <rect x={-6} y={-90} width={12} height={90} fill="#7a5a37" />
                    <circle cy={-110} r={40} fill="#2a9d8f" />
                  </g>
                ))
              : Array.from({ length: 30 }, (_, i) => <circle key={i} cx={60 + ((i * 97) % 1100)} cy={60 + ((i * 53) % 160)} r={6} fill="#a7f3d0" />))}
          <text x={600} y={600} textAnchor="middle" fill="#fff" fontWeight={800} fontSize={26}>
            {stages[k]}
          </text>
          <text x={600} y={640} textAnchor="middle" fill="#ffd166" fontWeight={700} fontSize={20}>
            Khoảng {Math.round(t * (coal ? 300 : 150))} triệu năm
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Nhiên liệu">
          <div className="seg wrap">
            <button className={coal ? 'on' : ''} onClick={() => onDoc({ ...doc, fuel: 'coal' })}>
              Than đá
            </button>
            <button className={!coal ? 'on' : ''} onClick={() => onDoc({ ...doc, fuel: 'oil' })}>
              Dầu mỏ, khí tự nhiên
            </button>
          </div>
        </Row>
        <Row label="Thời gian địa chất">
          <Slider value={Math.round(t * 100)} min={0} max={100} step={1} onChange={(v) => onDoc({ ...doc, t: v / 100 })} suffix="%" digits={0} />
        </Row>
        <p className="small">Nhiên liệu hoá thạch hình thành rất chậm (hàng triệu năm) nên là nguồn năng lượng không tái tạo: sẽ cạn kiệt nếu khai thác quá mức.</p>
      </aside>
    </div>
  );
}

// ====================== Tác động môi trường ======================
export function ClimateView({ doc, onDoc, showValues }: EngineProps<ClimateDoc, unknown>) {
  const co2 = 280 + 140 * doc.burn;
  const dT = 0.9 * doc.burn;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <rect x={0} y={0} width={1200} height={460} fill={`rgb(${180 + 40 * doc.burn},${210 - 30 * doc.burn},${240 - 60 * doc.burn})`} />
          <rect x={0} y={460} width={1200} height={220} fill="#7c9a5a" />
          {/* nhà máy */}
          <g transform="translate(250 460)">
            <rect x={-80} y={-120} width={160} height={120} fill="#6c757d" />
            <rect x={30} y={-220} width={36} height={110} fill="#495057" />
            {Array.from({ length: Math.round(doc.burn * 6) }, (_, i) => (
              <circle key={i} cx={48 + i * 22} cy={-240 - i * 28} r={22 + i * 5} fill="#444" opacity={0.5 - i * 0.04} />
            ))}
          </g>
          {/* ô tô */}
          {Array.from({ length: Math.round(doc.burn * 3) }, (_, i) => (
            <g key={i} transform={`translate(${620 + i * 150} 520)`}>
              <rect x={-50} y={-30} width={100} height={30} rx={8} fill="#e63946" />
              <circle cx={-28} cy={2} r={10} fill="#222" />
              <circle cx={28} cy={2} r={10} fill="#222" />
              <circle cx={-64} cy={-10} r={10} fill="#555" opacity={0.5} />
            </g>
          ))}
          {/* lớp khí nhà kính */}
          <rect x={0} y={40} width={1200} height={24} fill="#888" opacity={0.15 + 0.3 * doc.burn} />
          <text x={1180} y={30} textAnchor="end" className="lab-small">
            Lớp khí nhà kính (CO₂…)
          </text>
          <text x={900} y={180} textAnchor="middle" className="lab-label">
            Nồng độ CO₂: {showValues ? `${Math.round(co2)} ppm` : '?'}
          </text>
          <text x={900} y={215} textAnchor="middle" className="lab-label">
            Nhiệt độ tăng thêm: {showValues ? `${fmt(dT, 1)} °C` : '?'}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Mức sử dụng nhiên liệu hoá thạch">
          <Slider value={Math.round(doc.burn * 50)} min={0} max={100} step={5} onChange={(v) => onDoc({ ...doc, burn: v / 50 })} suffix="%" digits={0} />
        </Row>
        <p className="small">Đốt nhiên liệu hoá thạch thải ra khí CO₂, SO₂, NOx, bụi… gây ô nhiễm không khí, mưa axit, tăng hiệu ứng nhà kính làm Trái Đất nóng lên.</p>
        <p className="small muted">Số liệu chỉ mang tính minh hoạ xu hướng, không phải số liệu dự báo.</p>
      </aside>
    </div>
  );
}

// ====================== Các dạng năng lượng tái tạo ======================
const RENEW = [
  { name: 'Năng lượng Mặt Trời', color: '#ffb703', pro: 'Vô tận, sạch, lắp được trên mái nhà.', con: 'Phụ thuộc thời tiết, ban đêm không có; chi phí ban đầu cao.' },
  { name: 'Năng lượng gió', color: '#8ecae6', pro: 'Sạch, không tốn nhiên liệu.', con: 'Phụ thuộc gió; gây tiếng ồn; chiếm diện tích lớn.' },
  { name: 'Năng lượng nước (thuỷ điện)', color: '#219ebc', pro: 'Ổn định, công suất lớn, điều tiết lũ.', con: 'Ảnh hưởng hệ sinh thái, di dời dân cư khi xây hồ chứa.' },
  { name: 'Năng lượng sóng biển, thuỷ triều', color: '#023047', pro: 'Nguồn năng lượng lớn, dự đoán được.', con: 'Công nghệ phức tạp, chi phí cao, ảnh hưởng sinh vật biển.' },
  { name: 'Năng lượng địa nhiệt', color: '#e76f51', pro: 'Ổn định, hoạt động liên tục.', con: 'Chỉ có ở một số nơi; có thể thải khí độc.' },
  { name: 'Năng lượng sinh khối', color: '#2a9d8f', pro: 'Tận dụng chất thải nông nghiệp, rác hữu cơ.', con: 'Khi đốt vẫn thải khí; cần diện tích trồng trọt.' },
];

export function RenewView({ doc, onDoc }: EngineProps<RenewDoc, unknown>) {
  const r = RENEW[doc.sel];
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          {RENEW.map((x, i) => {
            const cx = 220 + (i % 3) * 380;
            const cy = 190 + Math.floor(i / 3) * 290;
            return (
              <g key={i} onPointerDown={() => onDoc({ ...doc, sel: i })} className="draggable">
                <rect x={cx - 170} y={cy - 120} width={340} height={240} rx={22} fill={x.color} opacity={i === doc.sel ? 1 : 0.75} stroke={i === doc.sel ? 'var(--ink)' : 'transparent'} strokeWidth={5} />
                <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fill="#fff" fontWeight={800} fontSize={22}>
                  {x.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{r.name}</h3>
        <div className="insp-row">
          <div className="insp-label">Ưu điểm</div>
          <p>{r.pro}</p>
        </div>
        <div className="insp-row">
          <div className="insp-label">Nhược điểm</div>
          <p>{r.con}</p>
        </div>
        <p className="small muted">Năng lượng tái tạo là năng lượng từ các nguồn liên tục được bổ sung trong tự nhiên.</p>
      </aside>
    </div>
  );
}

// ====================== Điện gió ======================
export function WindView({ doc, onDoc, showValues }: EngineProps<WindDoc, unknown>) {
  const ang = useRef(0);
  const [, tick] = useState(0);
  const Prated = 2000; // kW
  const P = doc.v < 3 ? 0 : doc.v >= 12 ? (doc.v > 25 ? 0 : Prated) : Prated * ((doc.v - 3) / 9) ** 3;
  const rpm = doc.v < 3 || doc.v > 25 ? 0 : Math.min(16, doc.v * 1.4);
  useRaf((dt) => {
    ang.current += rpm * 6 * dt;
    tick((x) => x + 1);
  }, true);
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <rect x={0} y={560} width={1200} height={120} fill="#7c9a5a" />
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1={40 + ((i * 140 + ang.current * doc.v * 0.3) % 400)} y1={120 + i * 50} x2={100 + ((i * 140 + ang.current * doc.v * 0.3) % 400)} y2={120 + i * 50} stroke="#8ecae6" strokeWidth={4} opacity={doc.v > 0 ? 0.8 : 0} />
          ))}
          <polygon points="590,560 610,560 604,220 596,220" fill="#e9ecef" stroke="#adb5bd" />
          <g transform={`translate(600 220) rotate(${ang.current})`}>
            {[0, 120, 240].map((a) => (
              <path key={a} transform={`rotate(${a})`} d="M 0 -6 C 60 -14 180 -8 220 0 C 180 8 60 14 0 6 Z" fill="#f8f9fa" stroke="#adb5bd" strokeWidth={2} />
            ))}
            <circle r={16} fill="#dee2e6" stroke="#adb5bd" />
          </g>
          <text x={900} y={300} textAnchor="middle" className="lab-label">
            Công suất phát: {showValues ? `${Math.round(P).toLocaleString('vi-VN')} kW` : '?'}
          </text>
          {doc.v > 25 && (
            <text x={900} y={340} textAnchor="middle" className="lab-value" fill="var(--danger)">
              Gió quá mạnh – tua bin dừng để bảo vệ
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Tốc độ gió">
          <Slider value={doc.v} min={0} max={28} step={1} onChange={(v) => onDoc({ ...doc, v })} suffix="m/s" digits={0} />
        </Row>
        <p className="small">Động năng của gió làm quay cánh quạt, trục quay làm quay máy phát điện. Gió yếu (dưới 3 m/s) tua bin không quay; gió mạnh hơn thì công suất tăng rất nhanh.</p>
      </aside>
    </div>
  );
}

// ====================== Pin mặt trời ======================
export function SolarView({ doc, onDoc, showValues }: EngineProps<SolarDoc, unknown>) {
  const sunAng = ((doc.hour - 6) / 12) * Math.PI; // 0 lúc 6h, π lúc 18h
  const day = doc.hour > 6 && doc.hour < 18;
  const elev = day ? Math.sin(sunAng) : 0;
  const sunX = 600 - Math.cos(sunAng) * 480;
  const sunY = 520 - Math.sin(sunAng) * 400;
  // góc giữa tia nắng và pháp tuyến tấm pin
  const sunDir = Math.atan2(Math.sin(sunAng), -Math.cos(sunAng));
  const normal = Math.PI / 2 + (doc.tilt * Math.PI) / 180;
  const cosI = Math.max(0, Math.cos(sunDir - normal));
  const P = day ? 3000 * elev ** 0.5 * cosI * (1 - doc.clouds * 0.8) : 0;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <rect x={0} y={0} width={1200} height={560} fill={day ? '#cfe8ff' : '#1d2b53'} />
          {day && <circle cx={sunX} cy={sunY} r={46} fill="#ffb703" />}
          {day && doc.clouds > 0.1 && <ellipse cx={sunX + 30} cy={sunY + 10} rx={90 * doc.clouds + 20} ry={40 * doc.clouds + 10} fill="#fff" opacity={0.9} />}
          <rect x={0} y={560} width={1200} height={120} fill="#7c9a5a" />
          <g transform={`translate(600 520) rotate(${-doc.tilt})`}>
            <rect x={-160} y={-12} width={320} height={16} fill="#1d3557" stroke="#457b9d" strokeWidth={2} />
            {Array.from({ length: 8 }, (_, i) => (
              <line key={i} x1={-160 + i * 40} y1={-12} x2={-160 + i * 40} y2={4} stroke="#a8dadc" />
            ))}
          </g>
          <rect x={590} y={520} width={20} height={40} fill="#555" />
          {day && <line x1={sunX} y1={sunY} x2={600} y2={510} stroke="#ffb703" strokeWidth={3} strokeDasharray="8 8" />}
          <text x={600} y={620} textAnchor="middle" fill="#fff" fontWeight={800} fontSize={22}>
            Công suất tấm pin: {showValues ? `${Math.round(P).toLocaleString('vi-VN')} W` : '?'}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Giờ trong ngày">
          <Slider value={doc.hour} min={5} max={19} step={0.5} onChange={(v) => onDoc({ ...doc, hour: v })} suffix="giờ" digits={1} />
        </Row>
        <Row label="Góc nghiêng tấm pin">
          <Slider value={doc.tilt} min={-60} max={60} step={5} onChange={(v) => onDoc({ ...doc, tilt: v })} suffix="°" digits={0} />
        </Row>
        <Row label="Mây che">
          <Slider value={Math.round(doc.clouds * 100)} min={0} max={100} step={10} onChange={(v) => onDoc({ ...doc, clouds: v / 100 })} suffix="%" digits={0} />
        </Row>
        <p className="small">Pin quang điện chuyển hoá trực tiếp năng lượng ánh sáng thành điện năng. Tấm pin nhận nhiều năng lượng nhất khi hướng vuông góc với tia nắng.</p>
      </aside>
    </div>
  );
}

// ====================== Thuỷ điện ======================
export function HydroView({ doc, onDoc, showValues }: EngineProps<HydroDoc, unknown>) {
  const eff = 0.85;
  const PkW = (1000 * 10 * doc.Q * doc.h * eff) / 1000;
  const water = 120 + (doc.h / 200) * 280;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <path d={`M 0 ${560 - water} H 420 V 600 H 0 Z`} fill="rgba(70,150,235,0.6)" />
          <path d="M 420 120 L 520 120 L 560 600 L 420 600 Z" fill="#adb5bd" stroke="#6c757d" strokeWidth={3} />
          <path d={`M 430 ${560 - water + 40} Q 470 450 600 560`} fill="none" stroke="#3a8de0" strokeWidth={8 + doc.Q / 20} className="jet" />
          <circle cx={640} cy={560} r={40} fill="#495057" />
          <rect x={700} y={510} width={140} height={90} rx={10} fill="#2b3a55" />
          <text x={770} y={560} textAnchor="middle" fill="#fff" fontWeight={800}>
            Máy phát
          </text>
          <path d="M 560 600 H 1200 V 640 H 560 Z" fill="rgba(70,150,235,0.5)" />
          <line x1={380} y1={560 - water} x2={380} y2={600} stroke="#d62828" strokeWidth={3} />
          <text x={370} y={600 - water / 2} textAnchor="end" className="lab-value">
            h = {doc.h} m
          </text>
          <text x={900} y={300} textAnchor="middle" className="lab-label">
            Công suất: {showValues ? `${fmtShort(PkW / 1000, 1)} MW` : '?'}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Lưu lượng nước qua tua bin">
          <Slider value={doc.Q} min={10} max={300} step={10} onChange={(v) => onDoc({ ...doc, Q: v })} suffix="m³/s" digits={0} />
        </Row>
        <Row label="Độ cao cột nước">
          <Slider value={doc.h} min={10} max={200} step={10} onChange={(v) => onDoc({ ...doc, h: v })} suffix="m" digits={0} />
        </Row>
        <p className="small">Thế năng của nước trên hồ chuyển thành động năng làm quay tua bin và máy phát điện. Công suất tỉ lệ với lưu lượng nước và độ cao cột nước.</p>
      </aside>
    </div>
  );
}

// ====================== Tiết kiệm năng lượng ======================
const HABITS = [
  { name: 'Tắt đèn, quạt khi ra khỏi phòng', kwh: 15 },
  { name: 'Dùng bóng đèn LED thay đèn sợi đốt', kwh: 25 },
  { name: 'Đặt điều hoà ở 26 °C trở lên', kwh: 60 },
  { name: 'Rút phích cắm thiết bị không dùng', kwh: 8 },
  { name: 'Không mở tủ lạnh quá lâu', kwh: 6 },
  { name: 'Phơi quần áo thay vì dùng máy sấy', kwh: 20 },
  { name: 'Đi xe đạp, đi bộ khi đi gần', kwh: 0 },
];

export function SavingView({ doc, onDoc, showValues }: EngineProps<SavingDoc, unknown>) {
  const saved = HABITS.reduce((s, h, i) => s + (doc.on[i] ? h.kwh : 0), 0);
  const base = 300;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          <text x={600} y={80} textAnchor="middle" className="lab-label">
            Điện năng tiêu thụ của một gia đình trong một tháng
          </text>
          <rect x={300} y={140} width={600} height={70} rx={10} fill="var(--surface-2)" />
          <rect x={300} y={140} width={(600 * (base - saved)) / base} height={70} rx={10} fill="#e85d04" style={{ transition: 'width 0.4s' }} />
          <text x={600} y={182} textAnchor="middle" fill="#fff" fontWeight={800} fontSize={24}>
            {showValues ? `${base - saved} kWh` : '?'}
          </text>
          <text x={600} y={290} textAnchor="middle" className="lab-value">
            Tiết kiệm: {showValues ? `${saved} kWh ≈ ${(saved * 2000).toLocaleString('vi-VN')} đ mỗi tháng` : '?'}
          </text>
          <text x={600} y={340} textAnchor="middle" className="lab-small">
            Lượng CO₂ giảm được: {showValues ? `${fmtShort(saved * 0.7, 0)} kg` : '?'}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Thói quen sử dụng năng lượng</h3>
        {HABITS.map((h, i) => (
          <Toggle
            key={i}
            value={!!doc.on[i]}
            onChange={(v) => {
              const on = [...doc.on];
              on[i] = v;
              onDoc({ ...doc, on });
            }}
            label={h.name}
          />
        ))}
        <p className="small muted">Số liệu chỉ để minh hoạ, ước tính cho một gia đình điển hình.</p>
      </aside>
    </div>
  );
}
