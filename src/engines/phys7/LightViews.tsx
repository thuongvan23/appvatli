// Ánh sáng (KHTN 7 Bài 15–17): năng lượng ánh sáng, chùm sáng – tia sáng, vùng tối – vùng nửa tối,
// định luật phản xạ ánh sáng, phản xạ khuếch tán, ảnh của vật qua gương phẳng.
import { useEffect, useRef, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, Toggle, clamp, useSvgDrag } from '../../ui/controls';
import { Arrow, VH, VW, useRaf, vn } from './common';

const LASER = '#ff2a2a';

function Lamp({ x, y, on = true, scale = 1 }: { x: number; y: number; on?: boolean; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {on && <circle r={46} fill="rgba(255,225,80,0.35)" />}
      <circle r={24} fill={on ? '#ffe066' : '#ddd'} stroke="#a68a00" strokeWidth={3} />
      <rect x={-12} y={22} width={24} height={22} fill="#888" />
      <rect x={-4} y={44} width={8} height={120} fill="#666" />
      <rect x={-40} y={164} width={80} height={14} rx={4} fill="#555" />
    </g>
  );
}

// =====================================================================
// Năng lượng ánh sáng
// =====================================================================

export interface LightEnergyDoc {
  mode: 'lightenergy';
  device: 'solar' | 'heat';
  /** khoảng cách đèn – vật nhận ánh sáng (cm) */
  d: number;
}

export function LightEnergyView({ doc, onDoc, showValues }: EngineProps<LightEnergyDoc, unknown>) {
  const [on, setOn] = useState(false);
  const [ang, setAng] = useState(0);
  const [T, setT] = useState(25);
  const I = on ? Math.min(1.6, (30 / doc.d) ** 2) : 0;
  const Teq = 25 + 30 * I;
  useRaf((dt) => {
    setAng((a) => a + dt * I * 900);
    setT((x) => x + (Teq - x) * Math.min(1, dt * 0.25));
  }, true);
  useEffect(() => setT(25), [doc.device]);
  const lampX = 180;
  const tx = lampX + 160 + doc.d * 8;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={0} y={600} width={VW} height={80} className="lab-table" />
          {on && <path d={`M ${lampX} 300 L ${tx} ${300 - 110} L ${tx} ${300 + 110} Z`} fill="rgba(255,225,80,0.28)" />}
          <Lamp x={lampX} y={300} on={on} scale={1.4} />
          <text x={lampX} y={570} textAnchor="middle" className="lab-label">
            Đèn
          </text>
          {doc.device === 'solar' ? (
            <g>
              <g transform={`translate(${tx} 300)`}>
                <rect x={-14} y={-110} width={28} height={220} fill="#1e3a8a" stroke="#93a3b8" strokeWidth={3} />
                {Array.from({ length: 6 }, (_, k) => (
                  <line key={k} x1={-14} x2={14} y1={-110 + k * 37} y2={-110 + k * 37} stroke="#93a3b8" />
                ))}
                <rect x={-4} y={110} width={8} height={190} fill="#666" />
                <text y={-130} textAnchor="middle" className="lab-label">
                  Pin mặt trời
                </text>
              </g>
              <path d={`M ${tx + 14} 360 C ${tx + 120} 360, ${tx + 120} 300, ${tx + 200} 300`} fill="none" stroke="#e63946" strokeWidth={4} />
              <path d={`M ${tx + 14} 380 C ${tx + 130} 380, ${tx + 140} 330, ${tx + 200} 330`} fill="none" stroke="#222" strokeWidth={4} />
              <g transform={`translate(${tx + 240} 310)`}>
                <rect x={-40} y={-30} width={60} height={60} rx={10} fill="#9aa5b1" stroke="#555" strokeWidth={2} />
                <rect x={-20} y={30} width={20} height={260} fill="#666" />
                <g transform={`translate(30 0) rotate(${ang})`}>
                  {[0, 120, 240].map((a) => (
                    <ellipse key={a} cx={0} cy={-50} rx={16} ry={50} fill="#2a9d8f" opacity={0.9} transform={`rotate(${a})`} />
                  ))}
                  <circle r={10} fill="#333" />
                </g>
                <text x={0} y={-110} textAnchor="middle" className="lab-label">
                  Quạt điện nhỏ
                </text>
              </g>
            </g>
          ) : (
            <g>
              <g transform={`translate(${tx} 120)`}>
                <rect x={-14} y={0} width={28} height={340} rx={14} fill="#f8f9fa" stroke="#666" strokeWidth={3} />
                <circle cx={0} cy={370} r={30} fill="#222" stroke="#666" strokeWidth={3} />
                <rect x={-5} y={30 + (1 - (T - 20) / 60) * 300} width={10} height={340 - (30 + (1 - (T - 20) / 60) * 300)} fill="#e63946" />
                {[20, 30, 40, 50, 60, 70, 80].map((v) => (
                  <g key={v}>
                    <line x1={14} x2={26} y1={30 + (1 - (v - 20) / 60) * 300} y2={30 + (1 - (v - 20) / 60) * 300} stroke="#555" />
                    <text x={30} y={36 + (1 - (v - 20) / 60) * 300} className="tick-small">
                      {v}
                    </text>
                  </g>
                ))}
                <text x={0} y={-16} textAnchor="middle" className="lab-label">
                  Nhiệt kế (bầu bọc giấy đen)
                </text>
              </g>
            </g>
          )}
          <Arrow x1={lampX + 30} y1={590} x2={tx - 4} y2={590} color="var(--ink)" width={2} head={10} />
          <text x={(lampX + tx) / 2} y={584} textAnchor="middle" className="lab-small">
            {doc.d} cm
          </text>
          {showValues && on && (
            <text x={600} y={60} textAnchor="middle" fontSize={26} fontWeight={800} fill="var(--accent)">
              {doc.device === 'solar' ? 'Năng lượng ánh sáng → năng lượng điện → động năng của quạt' : 'Năng lượng ánh sáng → năng lượng nhiệt'}
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Năng lượng ánh sáng</h3>
        <Row label="Vật nhận ánh sáng">
          <Seg value={doc.device} options={['solar', 'heat'] as const} onChange={(d) => onDoc({ ...doc, device: d })} fmtOpt={(d) => (d === 'solar' ? 'Pin mặt trời + quạt' : 'Nhiệt kế')} />
        </Row>
        <div className="insp-actions">
          <button className={`btn ${on ? 'on' : 'primary'}`} onClick={() => setOn(!on)}>
            {on ? 'Tắt đèn' : 'Bật đèn'}
          </button>
        </div>
        <Row label="Khoảng cách từ đèn">
          <Slider value={doc.d} min={20} max={70} step={5} digits={0} suffix="cm" onChange={(v) => onDoc({ ...doc, d: v })} />
        </Row>
        <div className="insp-values two">
          {doc.device === 'solar' ? (
            <div>
              <span>Quạt quay</span>
              <b>{showValues ? (I === 0 ? 'đứng yên' : I > 0.9 ? 'rất nhanh' : I > 0.4 ? 'nhanh' : 'chậm') : '?'}</b>
            </div>
          ) : (
            <div>
              <span>Nhiệt độ</span>
              <b>{showValues ? `${vn(T, 1)} °C` : '?'}</b>
            </div>
          )}
          <div>
            <span>Ánh sáng chiếu tới</span>
            <b>{on ? (doc.d <= 30 ? 'mạnh' : doc.d <= 50 ? 'vừa' : 'yếu') : 'không'}</b>
          </div>
        </div>
        <p className="small">Ánh sáng là một dạng năng lượng. Năng lượng ánh sáng có thể chuyển hoá thành các dạng năng lượng khác: năng lượng điện (pin mặt trời), năng lượng nhiệt (bình nước nóng năng lượng mặt trời), năng lượng hoá học (quang hợp ở cây xanh).</p>
        <p className="small muted">Đặt vật càng gần đèn, năng lượng ánh sáng nhận được càng nhiều.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Chùm sáng – tia sáng
// =====================================================================

export interface BeamsDoc {
  mode: 'beams';
  kind: 'parallel' | 'converging' | 'diverging';
  /** độ rộng khe (px trên hình) */
  slit: number;
}

export function BeamsView({ doc, onDoc, showValues }: EngineProps<BeamsDoc, unknown>) {
  const sx = 400;
  const n = Math.max(1, Math.round(doc.slit / 14));
  const ys = Array.from({ length: n }, (_, k) => (n === 1 ? 340 : 340 - doc.slit / 2 + (doc.slit * k) / (n - 1)));
  const end = (y: number) => {
    if (doc.kind === 'parallel') return { x: 1120, y };
    if (doc.kind === 'converging') {
      const fx = 860;
      const t = (1120 - sx) / (fx - sx);
      return { x: 1120, y: y + (340 - y) * t };
    }
    return { x: 1120, y: 340 + (y - 340) * 4 };
  };
  const narrow = doc.slit <= 14;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg" style={{ background: '#11161d' }}>
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {/* đèn pin */}
          <g transform="translate(110 340)">
            <rect x={-80} y={-34} width={120} height={68} rx={10} fill="#3a3f47" stroke="#888" strokeWidth={2} />
            <path d="M 40 -34 L 90 -60 L 90 60 L 40 34 Z" fill="#555" stroke="#888" strokeWidth={2} />
            <ellipse cx={90} cy={0} rx={8} ry={58} fill="#fff6c2" />
          </g>
          <path d={`M 200 285 L ${sx} ${340 - 120} L ${sx} ${340 + 120} L 200 395 Z`} fill="rgba(255,240,170,0.25)" />
          {/* tấm chắn có khe */}
          <rect x={sx - 8} y={140} width={16} height={340 - doc.slit / 2 - 140} fill="#999" />
          <rect x={sx - 8} y={340 + doc.slit / 2} width={16} height={540 - 340 - doc.slit / 2} fill="#999" />
          <text x={sx} y={130} textAnchor="middle" fill="#ddd" fontSize={17} fontWeight={700}>
            Tấm chắn có khe hẹp
          </text>
          {/* chùm sáng sau khe */}
          {ys.map((y, k) => {
            const e = end(y);
            return <line key={k} x1={sx} y1={y} x2={e.x} y2={e.y} stroke={narrow ? LASER : '#ffe680'} strokeWidth={narrow ? 4 : 3} opacity={0.9} />;
          })}
          {showValues && narrow && (
            <g>
              <Arrow x1={sx + 140} y1={600} x2={sx + 520} y2={600} color={LASER} width={4} />
              <text x={sx + 330} y={640} textAnchor="middle" fill="#ddd" fontSize={20} fontWeight={800}>
                Tia sáng: biểu diễn bằng đường thẳng có mũi tên chỉ hướng truyền ánh sáng
              </text>
            </g>
          )}
          {showValues && !narrow && (
            <text x={760} y={600} textAnchor="middle" fill="#ddd" fontSize={22} fontWeight={800}>
              {doc.kind === 'parallel' ? 'Chùm sáng song song' : doc.kind === 'converging' ? 'Chùm sáng hội tụ' : 'Chùm sáng phân kì'}
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Chùm sáng và tia sáng</h3>
        <Row label="Độ rộng khe">
          <Slider value={doc.slit} min={6} max={200} step={2} digits={0} onChange={(v) => onDoc({ ...doc, slit: v })} />
        </Row>
        <Row label="Loại chùm sáng">
          <Seg value={doc.kind} options={['parallel', 'converging', 'diverging'] as const} onChange={(k) => onDoc({ ...doc, kind: k })} fmtOpt={(k) => (k === 'parallel' ? 'Song song' : k === 'converging' ? 'Hội tụ' : 'Phân kì')} />
        </Row>
        <p className="small">Trong môi trường trong suốt và đồng tính, ánh sáng truyền theo đường thẳng. Khe càng hẹp, ta thu được một vệt sáng hẹp – mô hình tia sáng. Chùm sáng gồm nhiều tia sáng.</p>
        <p className="small muted">Chùm song song: các tia không giao nhau. Chùm hội tụ: các tia giao nhau tại một điểm. Chùm phân kì: các tia loe rộng ra.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Vùng tối, vùng nửa tối
// =====================================================================

export interface ShadowDoc {
  mode: 'shadow';
  src: 'point' | 'wide';
  /** toạ độ x của nguồn sáng, vật cản (px) */
  sx: number;
  ox: number;
  /** bán kính vật cản (px) */
  r: number;
}

export function ShadowView({ doc, onDoc, showValues }: EngineProps<ShadowDoc, unknown>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const cy = 330;
  const X = 980; // màn chắn
  const a = doc.src === 'point' ? 0 : 70; // nửa chiều cao nguồn sáng rộng
  const t = (doc.ox - doc.sx) / (X - doc.sx);
  // tỉ lệ phần nguồn bị che khi nhìn từ điểm y trên màn
  const frac = (y: number) => {
    if (a === 0) {
      const yc = cy + (y - cy) * t;
      return Math.abs(yc - cy) <= doc.r ? 1 : 0;
    }
    const lo = (cy - doc.r - y * t) / (1 - t);
    const hi = (cy + doc.r - y * t) / (1 - t);
    const s0 = cy - a;
    const s1 = cy + a;
    const ov = Math.max(0, Math.min(hi, s1) - Math.max(lo, s0));
    return ov / (s1 - s0);
  };
  // bán kính vùng tối và vùng nửa tối trên màn
  const umbra = a === 0 ? doc.r / t : Math.max(0, (doc.r - a * (1 - t)) / t);
  const pen = a === 0 ? doc.r / t : (doc.r + a * (1 - t)) / t;
  const strips = [];
  for (let y = 60; y < 620; y += 4) {
    const f = frac(y);
    strips.push(<rect key={y} x={X} y={y} width={30} height={4} fill={`rgba(20,20,30,${0.08 + 0.85 * f})`} />);
  }
  const srcPts = a === 0 ? [cy] : [cy - a, cy + a];
  const edge = (sy: number, oy: number) => {
    const k = (X - doc.sx) / (doc.ox - doc.sx);
    return { x: X, y: sy + (oy - sy) * k };
  };
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {/* vùng sáng */}
          <path d={`M ${doc.sx} ${cy - a} L ${X} ${edge(cy - a, cy - 600).y} L ${X} ${edge(cy + a, cy + 600).y} L ${doc.sx} ${cy + a} Z`} fill="rgba(255,225,80,0.18)" />
          {/* tia giới hạn */}
          {srcPts.map((sy, i) =>
            [cy - doc.r, cy + doc.r].map((oy, j) => {
              const e = edge(sy, oy);
              const isUmbraEdge = a === 0 || (i === 0 && j === 1) || (i === 1 && j === 0);
              return <line key={`${i}${j}`} x1={doc.sx} y1={sy} x2={e.x} y2={e.y} stroke={isUmbraEdge ? '#e63946' : '#f4a261'} strokeWidth={2.5} strokeDasharray={isUmbraEdge ? undefined : '8 6'} />;
            }),
          )}
          {/* màn chắn */}
          {strips}
          <rect x={X} y={60} width={30} height={560} fill="none" stroke="#555" strokeWidth={2} />
          <text x={X + 15} y={48} textAnchor="middle" className="lab-label">
            Màn chắn
          </text>
          {/* nguồn sáng */}
          <g className="draggable" onPointerDown={(e) => start(e, (p) => onDoc({ ...doc, sx: clamp(p.x, 60, doc.ox - 80) }))}>
            {a === 0 ? <circle cx={doc.sx} cy={cy} r={12} fill="#ffe066" stroke="#a68a00" strokeWidth={3} /> : <rect x={doc.sx - 14} y={cy - a} width={28} height={2 * a} rx={14} fill="#ffe066" stroke="#a68a00" strokeWidth={3} />}
            <text x={doc.sx} y={cy + a + 46} textAnchor="middle" className="lab-label">
              {a === 0 ? 'Nguồn sáng hẹp' : 'Nguồn sáng rộng'}
            </text>
          </g>
          {/* vật cản */}
          <g className="draggable" onPointerDown={(e) => start(e, (p) => onDoc({ ...doc, ox: clamp(p.x, doc.sx + 80, X - 60) }))}>
            <ellipse cx={doc.ox} cy={cy} rx={doc.r * 0.25} ry={doc.r} fill="#3a3f47" stroke="#111" strokeWidth={2} />
            <text x={doc.ox} y={cy - doc.r - 16} textAnchor="middle" className="lab-label">
              Vật cản
            </text>
          </g>
          {/* hình nhìn chính diện màn */}
          <g transform="translate(1100 560)">
            <rect x={-80} y={-80} width={160} height={160} fill="#fffbe6" stroke="#555" />
            <clipPath id="scr7">
              <rect x={-80} y={-80} width={160} height={160} />
            </clipPath>
            <g clipPath="url(#scr7)">
              {a > 0 && <circle r={pen * 0.25} fill="rgba(20,20,30,0.35)" />}
              <circle r={umbra * 0.25} fill="rgba(20,20,30,0.92)" />
            </g>
            <text y={-90} textAnchor="middle" className="tick-small">
              Nhìn thẳng vào màn
            </text>
          </g>
          {showValues && (
            <g>
              <text x={X - 12} y={cy + 6} textAnchor="end" fontSize={20} fontWeight={800} fill="var(--danger)">
                vùng tối
              </text>
              {a > 0 && pen - umbra > 18 && (
                <text x={X - 12} y={cy - (umbra + pen) / 2 + 6} textAnchor="end" fontSize={18} fontWeight={800} fill="#c26a1b">
                  vùng nửa tối
                </text>
              )}
            </g>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Vùng tối và vùng nửa tối</h3>
        <Row label="Nguồn sáng">
          <Seg value={doc.src} options={['point', 'wide'] as const} onChange={(s) => onDoc({ ...doc, src: s })} fmtOpt={(s) => (s === 'point' ? 'Hẹp (bóng đèn nhỏ)' : 'Rộng (đèn lớn)')} />
        </Row>
        <Row label="Kích thước vật cản">
          <Slider value={doc.r} min={30} max={110} step={5} digits={0} onChange={(v) => onDoc({ ...doc, r: v })} />
        </Row>
        <div className="insp-values two">
          <div>
            <span>Vùng tối (bán kính)</span>
            <b>{showValues ? vn(Math.max(0, umbra) / 10, 1) + ' cm' : '?'}</b>
          </div>
          <div>
            <span>Vùng nửa tối</span>
            <b>{showValues ? (a === 0 ? 'không có' : 'có') : '?'}</b>
          </div>
        </div>
        <p className="small">Kéo nguồn sáng và vật cản sang trái, phải. Vùng tối ở phía sau vật cản, không nhận được ánh sáng từ nguồn sáng truyền tới. Vùng nửa tối chỉ nhận được một phần ánh sáng từ nguồn sáng rộng.</p>
        <p className="small muted">Đường đỏ: tia sáng giới hạn vùng tối. Đường cam đứt nét: tia sáng giới hạn vùng nửa tối.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Định luật phản xạ ánh sáng
// =====================================================================

export interface ReflectDoc {
  mode: 'reflect';
  /** góc tới (độ) */
  i: number;
  surface: 'mirror' | 'rough';
  showNormal?: boolean;
}

export function ReflectView({ doc, onDoc, showValues, onMeasure }: EngineProps<ReflectDoc, unknown>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const I = { x: 600, y: 520 };
  const R = 330;
  const rad = (d: number) => (d * Math.PI) / 180;
  const S = { x: I.x - R * Math.sin(rad(doc.i)), y: I.y - R * Math.cos(rad(doc.i)) };
  const Rp = { x: I.x + R * Math.sin(rad(doc.i)), y: I.y - R * Math.cos(rad(doc.i)) };
  useEffect(() => onMeasure?.({ i: doc.i, r: doc.i }), [doc.i, onMeasure]);
  const mirror = doc.surface === 'mirror';
  const drag = (e: React.PointerEvent) =>
    start(e, (p) => {
      const a = Math.atan2(I.x - p.x, I.y - p.y);
      onDoc({ ...doc, i: Math.round(clamp((a * 180) / Math.PI, 0, 85)) });
    });
  const arc = (from: number, to: number, r: number) => {
    const p = (d: number) => `${I.x + r * Math.sin(rad(d))} ${I.y - r * Math.cos(rad(d))}`;
    return `M ${p(from)} A ${r} ${r} 0 0 ${to > from ? 1 : 0} ${p(to)}`;
  };
  // phản xạ khuếch tán: nhiều tia tới song song gặp bề mặt gồ ghề
  const rough = Array.from({ length: 9 }, (_, k) => {
    const x = 360 + k * 60;
    const nTilt = ((k * 47) % 60) - 30; // pháp tuyến lệch ngẫu nhiên
    const inc = doc.i;
    const out = clamp(2 * nTilt + inc, -85, 85); // góc phản xạ so với phương thẳng đứng (dương: lệch phải)
    return { x, nTilt, out, inc };
  });
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {mirror ? (
            <g>
              {/* thước đo góc */}
              <path d={`M ${I.x - R} ${I.y} A ${R} ${R} 0 0 1 ${I.x + R} ${I.y}`} fill="rgba(255,255,255,0.55)" stroke="var(--line)" strokeWidth={2} />
              {Array.from({ length: 19 }, (_, k) => {
                const d = -90 + k * 10;
                const r1 = R - (k % 3 === 0 ? 22 : 12);
                return (
                  <g key={k}>
                    <line x1={I.x + R * Math.sin(rad(d))} y1={I.y - R * Math.cos(rad(d))} x2={I.x + r1 * Math.sin(rad(d))} y2={I.y - r1 * Math.cos(rad(d))} stroke="var(--ink-2)" />
                    {k % 3 === 0 && (
                      <text x={I.x + (R - 40) * Math.sin(rad(d))} y={I.y - (R - 40) * Math.cos(rad(d)) + 6} textAnchor="middle" className="tick-small">
                        {Math.abs(d)}
                      </text>
                    )}
                  </g>
                );
              })}
              <rect x={240} y={I.y} width={720} height={16} fill="#bfe3ff" stroke="#5f7488" strokeWidth={2} />
              {Array.from({ length: 24 }, (_, k) => (
                <line key={k} x1={250 + k * 30} y1={I.y + 16} x2={240 + k * 30} y2={I.y + 32} stroke="#5f7488" strokeWidth={2} />
              ))}
              <text x={960} y={I.y + 60} textAnchor="end" className="lab-label">
                Gương phẳng
              </text>
              {(doc.showNormal ?? true) && <line x1={I.x} y1={I.y} x2={I.x} y2={I.y - R - 20} stroke="var(--ink)" strokeWidth={2} strokeDasharray="10 7" />}
              {(doc.showNormal ?? true) && (
                <text x={I.x + 8} y={I.y - R - 26} className="lab-small">
                  pháp tuyến IN
                </text>
              )}
              <Arrow x1={S.x} y1={S.y} x2={(S.x + I.x) / 2} y2={(S.y + I.y) / 2} color={LASER} width={5} head={18} />
              <line x1={S.x} y1={S.y} x2={I.x} y2={I.y} stroke={LASER} strokeWidth={5} />
              {showValues && (
                <g>
                  <line x1={I.x} y1={I.y} x2={Rp.x} y2={Rp.y} stroke={LASER} strokeWidth={5} />
                  <Arrow x1={I.x} y1={I.y} x2={(I.x + Rp.x) / 2 + (Rp.x - I.x) * 0.05} y2={(I.y + Rp.y) / 2 + (Rp.y - I.y) * 0.05} color={LASER} width={5} head={18} />
                  {doc.i > 3 && (
                    <>
                      <path d={arc(-doc.i, 0, 90)} fill="none" stroke="#1d6fe0" strokeWidth={3} />
                      <path d={arc(0, doc.i, 110)} fill="none" stroke="#2a9d8f" strokeWidth={3} />
                      <text x={I.x - 130 * Math.sin(rad(doc.i / 2))} y={I.y - 130 * Math.cos(rad(doc.i / 2))} textAnchor="middle" fontSize={22} fontWeight={800} fill="#1d6fe0">
                        i = {doc.i}°
                      </text>
                      <text x={I.x + 150 * Math.sin(rad(doc.i / 2))} y={I.y - 150 * Math.cos(rad(doc.i / 2))} textAnchor="middle" fontSize={22} fontWeight={800} fill="#2a9d8f">
                        i' = {doc.i}°
                      </text>
                    </>
                  )}
                  <text x={Rp.x + 14} y={Rp.y} className="lab-small">
                    R – tia phản xạ
                  </text>
                </g>
              )}
              {/* đèn laser */}
              <g className="draggable" onPointerDown={drag}>
                <circle cx={S.x} cy={S.y} r={22} fill="#333" stroke="#ff8080" strokeWidth={3} />
                <circle cx={S.x} cy={S.y} r={7} fill={LASER} />
              </g>
              <text x={S.x - 30} y={S.y - 30} textAnchor="end" className="lab-small">
                S – tia tới (kéo để đổi góc)
              </text>
              <text x={I.x} y={I.y + 50} textAnchor="middle" className="lab-label">
                I
              </text>
            </g>
          ) : (
            <g>
              <path d={`M 300 ${I.y} ${rough.map((r) => `L ${r.x - 30} ${I.y + ((r.nTilt * 7) % 14)} L ${r.x + 30} ${I.y - ((r.nTilt * 5) % 12)}`).join(' ')} L 900 ${I.y} L 900 ${I.y + 60} L 300 ${I.y + 60} Z`} fill="#c9b38a" stroke="#7a4b24" strokeWidth={2} />
              {rough.map((r, k) => {
                const sx = r.x - 400 * Math.sin(rad(r.inc));
                const sy = I.y - 400 * Math.cos(rad(r.inc));
                const ex = r.x + 300 * Math.sin(rad(r.out));
                const ey = I.y - 300 * Math.cos(rad(r.out));
                return (
                  <g key={k}>
                    <line x1={sx} y1={sy} x2={r.x} y2={I.y} stroke="#ffb703" strokeWidth={3} />
                    {showValues && <line x1={r.x} y1={I.y} x2={ex} y2={ey} stroke="#e63946" strokeWidth={3} />}
                  </g>
                );
              })}
              <text x={600} y={I.y + 100} textAnchor="middle" className="lab-label">
                Bề mặt gồ ghề (tờ giấy, bức tường…)
              </text>
            </g>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Sự phản xạ ánh sáng</h3>
        <Row label="Bề mặt">
          <Seg value={doc.surface} options={['mirror', 'rough'] as const} onChange={(s) => onDoc({ ...doc, surface: s })} fmtOpt={(s) => (s === 'mirror' ? 'Nhẵn bóng (gương)' : 'Gồ ghề')} />
        </Row>
        <Row label="Góc tới i">
          <Slider value={doc.i} min={0} max={85} step={5} digits={0} suffix="°" onChange={(v) => onDoc({ ...doc, i: v })} />
        </Row>
        {mirror && <Toggle value={doc.showNormal ?? true} onChange={(v) => onDoc({ ...doc, showNormal: v })} label="Vẽ pháp tuyến" />}
        <div className="insp-values two">
          <div>
            <span>Góc tới i</span>
            <b>{doc.i}°</b>
          </div>
          <div>
            <span>Góc phản xạ i'</span>
            <b>{showValues && mirror ? `${doc.i}°` : '?'}</b>
          </div>
        </div>
        {mirror ? (
          <p className="small">Định luật phản xạ ánh sáng: tia phản xạ nằm trong mặt phẳng chứa tia tới và pháp tuyến của gương tại điểm tới; góc phản xạ bằng góc tới (i' = i).</p>
        ) : (
          <p className="small">Chùm tia tới song song gặp bề mặt gồ ghề bị phản xạ theo mọi hướng: phản xạ khuếch tán (phản xạ không gương). Nhờ đó ta nhìn thấy các vật từ nhiều phía. Bề mặt nhẵn bóng cho phản xạ gương (phản xạ định hướng).</p>
        )}
        <p className="small muted">Bấm “Ẩn số đo” để ẩn tia phản xạ cho học sinh dự đoán.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Ảnh của vật qua gương phẳng
// =====================================================================

export interface MirrorDoc {
  mode: 'mirror';
  variant: 'rays' | 'glass';
  /** khoảng cách vật – gương (px) */
  d: number;
  /** chiều cao vật (px) */
  h: number;
  /** vị trí mắt */
  ex: number;
  ey: number;
  /** cây nến B sau tấm kính (px tính từ tấm kính) */
  b?: number;
}

export function MirrorView({ doc, onDoc, showValues }: EngineProps<MirrorDoc, unknown>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const M = 640;
  const base = 520;
  const ox = M - doc.d;
  const ix = M + doc.d;
  if (doc.variant === 'glass') {
    const b = doc.b ?? 120;
    const match = Math.abs(b - doc.d) < 8;
    const flame = (x: number, y: number, s = 1, op = 1) => (
      <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
        <path d="M 0 -40 Q 16 -14 0 0 Q -16 -14 0 -40 Z" fill="#ffb703" />
        <path d="M 0 -26 Q 7 -10 0 0 Q -7 -10 0 -26 Z" fill="#fff3b0" />
      </g>
    );
    return (
      <div className="eng">
        <div className="eng-stage lab-bg">
          <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
            <rect x={0} y={560} width={VW} height={120} className="lab-table" />
            {/* tấm kính */}
            <rect x={M - 6} y={180} width={12} height={380} fill="rgba(170,220,255,0.5)" stroke="#5f7488" strokeWidth={2} />
            <text x={M} y={166} textAnchor="middle" className="lab-label">
              Tấm kính trong (thay cho gương phẳng)
            </text>
            {/* nến A */}
            <g className="draggable" onPointerDown={(e) => start(e, (p) => onDoc({ ...doc, d: Math.round(clamp(M - p.x, 60, 420)) }))}>
              <rect x={ox - 14} y={440} width={28} height={120} fill="#fefae0" stroke="#b08968" strokeWidth={2} />
              <line x1={ox} y1={440} x2={ox} y2={428} stroke="#333" strokeWidth={2} />
              {flame(ox, 428)}
              <text x={ox} y={600} textAnchor="middle" className="lab-label">
                Nến A (đang cháy)
              </text>
            </g>
            {/* ảnh của nến A nhìn qua kính */}
            {flame(ix, 428, 1, showValues ? 0.55 : 0)}
            {/* nến B */}
            <g className="draggable" onPointerDown={(e) => start(e, (p) => onDoc({ ...doc, b: Math.round(clamp(p.x - M, 40, 520)) }))}>
              <rect x={M + b - 14} y={440} width={28} height={120} fill="#fefae0" stroke="#b08968" strokeWidth={2} />
              <line x1={M + b} y1={440} x2={M + b} y2={428} stroke="#333" strokeWidth={2} />
              {match && flame(M + b, 428)}
              <text x={M + b} y={600} textAnchor="middle" className="lab-label">
                Nến B (không cháy) – kéo
              </text>
            </g>
            {/* mắt */}
            <g transform="translate(130 330)">
              <ellipse rx={40} ry={22} fill="#fff" stroke="#333" strokeWidth={3} />
              <circle r={12} fill="#3a6fd8" />
              <text y={50} textAnchor="middle" className="lab-small">
                Mắt nhìn qua tấm kính
              </text>
            </g>
            {match && (
              <text x={600} y={80} textAnchor="middle" fontSize={28} fontWeight={900} fill="var(--ok)">
                Nến B trùng với ảnh của nến A – trông như nến B cũng đang cháy!
              </text>
            )}
            {showValues && (
              <g>
                <Arrow x1={ox} y1={640} x2={M} y2={640} color="var(--ink)" width={2} head={10} />
                <Arrow x1={M} y1={640} x2={ox} y2={640} color="var(--ink)" width={2} head={10} />
                <Arrow x1={M} y1={640} x2={M + b} y2={640} color="var(--accent)" width={2} head={10} />
                <Arrow x1={M + b} y1={640} x2={M} y2={640} color="var(--accent)" width={2} head={10} />
                <text x={(ox + M) / 2} y={668} textAnchor="middle" className="lab-small">
                  {vn(doc.d / 10, 1)} cm
                </text>
                <text x={M + b / 2} y={668} textAnchor="middle" className="lab-small">
                  {vn(b / 10, 1)} cm
                </text>
              </g>
            )}
          </svg>
        </div>
        <aside className="eng-side">
          <h3>Thí nghiệm với tấm kính</h3>
          <p className="small">Kéo nến B ra sau tấm kính đến khi nhìn qua kính thấy nến B trông như đang cháy (trùng với ảnh của nến A). Đo khoảng cách từ hai cây nến đến tấm kính và so sánh.</p>
          <div className="insp-values two">
            <div>
              <span>Nến A → kính</span>
              <b>{vn(doc.d / 10, 1)} cm</b>
            </div>
            <div>
              <span>Nến B → kính</span>
              <b>{vn(b / 10, 1)} cm</b>
            </div>
          </div>
          {match && showValues && <p className="nature">Ảnh và vật cách gương những khoảng bằng nhau; ảnh to bằng vật.</p>}
          <p className="small muted">Kéo nến A để đổi vị trí vật rồi tìm lại vị trí của ảnh.</p>
        </aside>
      </div>
    );
  }

  const A = { x: ox, y: base - doc.h };
  const Ai = { x: ix, y: base - doc.h };
  const E = { x: doc.ex, y: doc.ey };
  const hitY = (P: { x: number; y: number }) => P.y + ((E.y - P.y) * (M - P.x)) / (E.x - P.x);
  const iA = { x: M, y: hitY(Ai) };
  const Bi = { x: ix, y: base };
  const iB = { x: M, y: hitY(Bi) };
  const inMirror = (y: number) => y >= 140 && y <= 600;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={M} y={140} width={16} height={460} fill="#bfe3ff" stroke="#5f7488" strokeWidth={2} />
          {Array.from({ length: 16 }, (_, k) => (
            <line key={k} x1={M + 16} y1={150 + k * 28} x2={M + 30} y2={140 + k * 28} stroke="#5f7488" strokeWidth={2} />
          ))}
          <text x={M + 8} y={124} textAnchor="middle" className="lab-label">
            Gương phẳng
          </text>
          <line x1={60} x2={1140} y1={base} y2={base} stroke="var(--line)" strokeWidth={2} />
          {/* vật AB */}
          <g className="draggable" onPointerDown={(e) => start(e, (p) => onDoc({ ...doc, d: Math.round(clamp(M - p.x, 60, 480)), h: Math.round(clamp(base - p.y, 60, 300)) }))}>
            <Arrow x1={ox} y1={base} x2={A.x} y2={A.y} color="#1d6fe0" width={7} head={24} />
            <text x={ox - 16} y={A.y + 4} textAnchor="end" className="lab-label">
              A
            </text>
            <text x={ox - 16} y={base + 28} textAnchor="end" className="lab-label">
              B
            </text>
          </g>
          {/* ảnh A'B' */}
          {showValues && (
            <g opacity={0.75}>
              <Arrow x1={ix} y1={base} x2={Ai.x} y2={Ai.y} color="#1d6fe0" width={5} head={22} dash="10 8" />
              <text x={ix + 16} y={Ai.y + 4} className="lab-label">
                A'
              </text>
              <text x={ix + 16} y={base + 28} className="lab-label">
                B'
              </text>
              <line x1={A.x} y1={A.y} x2={Ai.x} y2={Ai.y} stroke="var(--ink-2)" strokeDasharray="4 6" />
              <text x={(ox + M) / 2} y={base + 56} textAnchor="middle" className="lab-small">
                {vn(doc.d / 10, 1)} cm
              </text>
              <text x={(ix + M) / 2 + 8} y={base + 56} textAnchor="middle" className="lab-small">
                {vn(doc.d / 10, 1)} cm
              </text>
            </g>
          )}
          {/* tia sáng tới mắt */}
          {showValues &&
            [
              { P: A, I: iA, Pi: Ai },
              { P: { x: ox, y: base - 2 }, I: iB, Pi: Bi },
            ].map(({ P, I, Pi }, k) =>
              inMirror(I.y) ? (
                <g key={k}>
                  <line x1={P.x} y1={P.y} x2={I.x} y2={I.y} stroke={LASER} strokeWidth={3} />
                  <Arrow x1={I.x} y1={I.y} x2={(I.x + E.x) / 2} y2={(I.y + E.y) / 2} color={LASER} width={3} head={14} />
                  <line x1={I.x} y1={I.y} x2={E.x} y2={E.y} stroke={LASER} strokeWidth={3} />
                  <line x1={I.x} y1={I.y} x2={Pi.x} y2={Pi.y} stroke={LASER} strokeWidth={2} strokeDasharray="6 6" opacity={0.7} />
                </g>
              ) : null,
            )}
          {/* mắt */}
          <g className="draggable" onPointerDown={(e) => start(e, (p) => onDoc({ ...doc, ex: Math.round(clamp(p.x, 60, M - 40)), ey: Math.round(clamp(p.y, 80, 460)) }))} transform={`translate(${E.x} ${E.y})`}>
            <ellipse rx={30} ry={16} fill="#fff" stroke="#333" strokeWidth={3} />
            <circle cx={8} r={9} fill="#3a6fd8" />
            <text y={-24} textAnchor="middle" className="lab-small">
              Mắt (kéo)
            </text>
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Ảnh tạo bởi gương phẳng</h3>
        <p className="small">Kéo vật AB (đổi khoảng cách, chiều cao) và kéo mắt. Bấm “Hiện số đo” để vẽ ảnh A'B' và các tia sáng từ vật phản xạ trên gương tới mắt.</p>
        <div className="insp-values two">
          <div>
            <span>Khoảng cách vật – gương</span>
            <b>{vn(doc.d / 10, 1)} cm</b>
          </div>
          <div>
            <span>Khoảng cách ảnh – gương</span>
            <b>{showValues ? `${vn(doc.d / 10, 1)} cm` : '?'}</b>
          </div>
          <div>
            <span>Chiều cao vật</span>
            <b>{vn(doc.h / 10, 1)} cm</b>
          </div>
          <div>
            <span>Chiều cao ảnh</span>
            <b>{showValues ? `${vn(doc.h / 10, 1)} cm` : '?'}</b>
          </div>
        </div>
        <p className="small">Ảnh tạo bởi gương phẳng là ảnh ảo (không hứng được trên màn chắn), lớn bằng vật. Ảnh và vật đối xứng nhau qua gương: khoảng cách từ một điểm của vật đến gương bằng khoảng cách từ ảnh của điểm đó đến gương.</p>
        <p className="small muted">Các tia phản xạ đi vào mắt có đường kéo dài (nét đứt) đi qua ảnh: mắt nhìn thấy ảnh như ánh sáng phát ra từ A'.</p>
      </aside>
    </div>
  );
}
