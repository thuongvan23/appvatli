// Từ (KHTN 7 Bài 18–20): tương tác giữa hai nam châm, vật liệu từ, kim nam châm chỉ hướng Bắc – Nam,
// từ phổ – đường sức từ, từ trường Trái Đất, thí nghiệm Oersted, ống dây và nam châm điện.
import { useEffect, useMemo, useRef, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Toggle, clamp, useSvgDrag } from '../../ui/controls';
import { Arrow, VH, VW, useRaf, vn } from './common';

const NC = '#e63946'; // cực Bắc (N) – đỏ
const SC = '#1d6fe0'; // cực Nam (S) – xanh

function BarMagnet({ x, y, w = 240, h = 56, flip = false, angle = 0 }: { x: number; y: number; w?: number; h?: number; flip?: boolean; angle?: number }) {
  // mặc định: S bên trái, N bên phải
  const L = flip ? NC : SC;
  const R = flip ? SC : NC;
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <rect x={-w / 2} y={-h / 2} width={w / 2} height={h} fill={L} stroke="#333" strokeWidth={2} />
      <rect x={0} y={-h / 2} width={w / 2} height={h} fill={R} stroke="#333" strokeWidth={2} />
      <text x={-w / 4} y={h * 0.18} textAnchor="middle" fill="#fff" fontWeight={900} fontSize={h * 0.55}>
        {flip ? 'N' : 'S'}
      </text>
      <text x={w / 4} y={h * 0.18} textAnchor="middle" fill="#fff" fontWeight={900} fontSize={h * 0.55}>
        {flip ? 'S' : 'N'}
      </text>
    </g>
  );
}

function Needle({ x, y, angle, r = 40, ring = true }: { x: number; y: number; angle: number; r?: number; ring?: boolean }) {
  // angle: hướng cực N của kim (độ, 0 = sang phải, đo theo chiều kim đồng hồ trên màn hình)
  return (
    <g transform={`translate(${x} ${y})`}>
      {ring && <circle r={r + 8} fill="rgba(255,255,255,0.85)" stroke="#555" strokeWidth={3} />}
      <g transform={`rotate(${angle})`}>
        <path d={`M ${r} 0 L 0 ${-r * 0.18} L 0 ${r * 0.18} Z`} fill={NC} />
        <path d={`M ${-r} 0 L 0 ${-r * 0.18} L 0 ${r * 0.18} Z`} fill={SC} />
      </g>
      <circle r={4} fill="#333" />
    </g>
  );
}

// =====================================================================
// Nam châm: tương tác, vật liệu từ, định hướng Bắc – Nam
// =====================================================================

export const MATERIALS = [
  { name: 'Đinh sắt', mag: true, color: '#7d8590' },
  { name: 'Ghim thép', mag: true, color: '#aab4be' },
  { name: 'Vòng nickel', mag: true, color: '#c8ccd0' },
  { name: 'Mẩu cobalt', mag: true, color: '#6c7a89' },
  { name: 'Lá nhôm', mag: false, color: '#dfe3e6' },
  { name: 'Dây đồng', mag: false, color: '#c8743a' },
  { name: 'Thước nhựa', mag: false, color: '#f4a261' },
  { name: 'Mẩu gỗ', mag: false, color: '#b08968' },
  { name: 'Tẩy cao su', mag: false, color: '#e5989b' },
];

export interface MagnetsDoc {
  mode: 'magnets';
  sub: 'pair' | 'materials' | 'hang';
  /** đảo chiều nam châm bên phải */
  flip?: boolean;
  /** chỉ hiện một phần thí nghiệm */
  lock?: boolean;
}

export function MagnetsView({ doc, onDoc, showValues }: EngineProps<MagnetsDoc, unknown>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  // ---- hai nam châm ----
  const attract = !doc.flip;
  const [cx, setCx] = useState(780); // tâm nam châm phải
  const [vx, setVx] = useState(0);
  const [free, setFree] = useState(false);
  // ---- vật liệu ----
  const [near, setNear] = useState(false);
  // ---- nam châm treo ----
  const [ang, setAng] = useState(30);
  const [w, setW] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    setCx(780);
    setVx(0);
    setFree(false);
    setNear(false);
    setAng(30);
    setW(0);
  }, [doc.sub, doc.flip]);

  useRaf((dt) => {
    if (doc.sub === 'pair' && free) {
      const gap = cx - 120 - 420; // khoảng cách giữa hai mặt cực
      const F = ((attract ? -1 : 1) * 4e7) / Math.max(30, gap + 40) ** 2;
      let v = vx + F * dt;
      v *= Math.exp(-dt * 1.5);
      let x = cx + v * dt;
      if (x - 120 <= 420) {
        x = 540;
        v = 0;
      }
      if (x > 1080) {
        x = 1080;
        v = 0;
      }
      setVx(v);
      setCx(x);
    }
    if (doc.sub === 'hang' && !hold) {
      // kim nam châm quay về hướng Bắc (lên trên màn hình: -90°)
      const target = -90;
      let d = ((ang - target + 540) % 360) - 180;
      const acc = -8 * Math.sin((d * Math.PI) / 180) * 60 - w * 1.2;
      const nw = w + acc * dt;
      d = d + nw * dt;
      setW(nw);
      setAng(target + d);
    }
  }, (doc.sub === 'pair' && free) || (doc.sub === 'hang' && !hold));

  const settled = doc.sub === 'hang' && Math.abs(w) < 2 && Math.abs((((ang + 90 + 540) % 360) - 180)) < 2;

  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {doc.sub === 'pair' && (
            <g>
              <rect x={0} y={420} width={VW} height={260} className="lab-table" />
              <BarMagnet x={300} y={380} />
              <g>
                <BarMagnet x={cx} y={380} flip={doc.flip} />
                <circle cx={cx - 80} cy={418} r={10} fill="#333" />
                <circle cx={cx + 80} cy={418} r={10} fill="#333" />
              </g>
              <text x={300} y={320} textAnchor="middle" className="lab-label">
                Nam châm 1 (giữ cố định)
              </text>
              <text x={cx} y={470} textAnchor="middle" className="lab-label">
                Nam châm 2 (đặt trên xe lăn)
              </text>
              {showValues && free && (
                <text x={600} y={200} textAnchor="middle" fontSize={32} fontWeight={900} fill={attract ? 'var(--ok)' : 'var(--danger)'}>
                  {attract ? 'Hai cực khác tên: HÚT nhau' : 'Hai cực cùng tên: ĐẨY nhau'}
                </text>
              )}
              {showValues && !free && (
                <text x={600} y={200} textAnchor="middle" className="lab-label">
                  Hai cực đối diện: {doc.flip ? 'N – N (cùng tên)' : 'N – S (khác tên)'}
                </text>
              )}
            </g>
          )}
          {doc.sub === 'materials' && (
            <g>
              <rect x={0} y={560} width={VW} height={120} className="lab-table" />
              <g transform={`translate(600 ${near ? 300 : 120})`} style={{ transition: 'transform 0.6s' }}>
                <BarMagnet x={0} y={0} w={760} h={60} />
                <rect x={-4} y={-140} width={8} height={110} fill="#666" />
              </g>
              {MATERIALS.map((m, i) => {
                const x = 140 + i * 115;
                const up = near && m.mag;
                const y = up ? 352 : 540;
                return (
                  <g key={m.name} style={{ transition: 'transform 0.5s' }} transform={`translate(${x} ${y})`}>
                    <rect x={-34} y={-18} width={68} height={22} rx={6} fill={m.color} stroke="#555" strokeWidth={1.5} />
                    {!up && (
                      <foreignObject x={-56} y={10} width={112} height={44}>
                        <div className="svg-cap">{m.name}</div>
                      </foreignObject>
                    )}
                    {up && (
                      <text x={0} y={46} textAnchor="middle" className="tick-small">
                        {m.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          )}
          {doc.sub === 'hang' && (
            <g>
              {/* hướng địa lí */}
              <g transform="translate(1040 140)">
                <circle r={70} fill="var(--surface)" stroke="var(--line)" strokeWidth={2} />
                <Arrow x1={0} y1={40} x2={0} y2={-56} color="var(--ink)" width={4} />
                <text y={-76} textAnchor="middle" className="lab-label">
                  Bắc
                </text>
                <text y={100} textAnchor="middle" className="lab-label">
                  Nam
                </text>
                <text x={92} y={8} textAnchor="middle" className="lab-small">
                  Đông
                </text>
                <text x={-92} y={8} textAnchor="middle" className="lab-small">
                  Tây
                </text>
              </g>
              <rect x={420} y={60} width={360} height={16} fill="#666" />
              <line x1={600} y1={76} x2={600} y2={340} stroke="#333" strokeWidth={2} />
              <ellipse cx={600} cy={360} rx={190} ry={60} fill="none" stroke="var(--line)" strokeDasharray="8 6" />
              <text x={600} y={600} textAnchor="middle" className="lab-small">
                (nhìn từ trên xuống: thanh nam châm treo bằng sợi chỉ, quay tự do)
              </text>
              <g className="draggable" onPointerDown={(e) => { setHold(true); start(e, (p) => setAng((Math.atan2(p.y - 360, p.x - 600) * 180) / Math.PI), () => setHold(false)); }}>
                <BarMagnet x={600} y={360} w={300} h={50} angle={ang} />
              </g>
              <Needle x={300} y={360} angle={hold ? ang : -90 + (ang + 90) * 0.4} r={50} />
              <text x={300} y={450} textAnchor="middle" className="lab-label">
                La bàn
              </text>
              {settled && showValues && (
                <text x={600} y={560} textAnchor="middle" fontSize={28} fontWeight={900} fill="var(--accent)">
                  Cực N chỉ hướng Bắc địa lí, cực S chỉ hướng Nam địa lí
                </text>
              )}
            </g>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Nam châm</h3>
        {!doc.lock && (
          <Row label="Thí nghiệm">
            <Seg value={doc.sub} options={['pair', 'materials', 'hang'] as const} onChange={(s) => onDoc({ ...doc, sub: s })} fmtOpt={(s) => (s === 'pair' ? 'Hai nam châm' : s === 'materials' ? 'Vật liệu từ' : 'Nam châm treo tự do')} />
          </Row>
        )}
        {doc.sub === 'pair' && (
          <>
            <div className="insp-actions">
              <button className="btn" onClick={() => onDoc({ ...doc, flip: !doc.flip })}>
                Đổi đầu nam châm 2
              </button>
              <button className="btn primary" onClick={() => (setCx(780), setVx(0), setFree(true))}>
                Thả tay
              </button>
            </div>
            <p className="small">Đặt hai nam châm gần nhau: các cực cùng tên thì đẩy nhau, các cực khác tên thì hút nhau.</p>
          </>
        )}
        {doc.sub === 'materials' && (
          <>
            <div className="insp-actions">
              <button className={`btn ${near ? 'on' : 'primary'}`} onClick={() => setNear(!near)}>
                {near ? 'Nhấc nam châm ra xa' : 'Đưa nam châm lại gần'}
              </button>
            </div>
            <div className="insp-values two">
              <div>
                <span>Bị nam châm hút</span>
                <b style={{ fontSize: '0.9rem' }}>{showValues && near ? MATERIALS.filter((m) => m.mag).map((m) => m.name).join(', ') : '?'}</b>
              </div>
              <div>
                <span>Không bị hút</span>
                <b style={{ fontSize: '0.9rem' }}>{showValues && near ? MATERIALS.filter((m) => !m.mag).map((m) => m.name).join(', ') : '?'}</b>
              </div>
            </div>
            <p className="small">Nam châm hút được các vật làm bằng sắt, thép, nickel, cobalt (vật liệu từ). Nam châm không hút nhôm, đồng, nhựa, gỗ, cao su…</p>
          </>
        )}
        {doc.sub === 'hang' && (
          <>
            <div className="insp-actions">
              <button className="btn primary" onClick={() => (setAng(ang + 120), setW(0))}>
                Xoay lệch đi rồi thả
              </button>
            </div>
            <p className="small">Kéo thanh nam châm xoay đi rồi thả tay: khi đứng cân bằng, nam châm luôn nằm theo hướng Bắc – Nam. Đầu chỉ hướng Bắc là cực Bắc (N), đầu chỉ hướng Nam là cực Nam (S).</p>
            <p className="small muted">La bàn hoạt động dựa trên tính chất này: kim la bàn là một nam châm nhỏ.</p>
          </>
        )}
      </aside>
    </div>
  );
}

// =====================================================================
// Từ trường: từ phổ, đường sức từ, la bàn thử
// =====================================================================

interface Pole {
  x: number;
  y: number;
  q: number;
}

function fieldAt(poles: Pole[], x: number, y: number, bg?: [number, number]): [number, number] {
  let bx = bg?.[0] ?? 0;
  let by = bg?.[1] ?? 0;
  for (const p of poles) {
    const dx = x - p.x;
    const dy = y - p.y;
    const r2 = dx * dx + dy * dy + 40;
    const r = Math.sqrt(r2);
    bx += (p.q * dx) / (r2 * r);
    by += (p.q * dy) / (r2 * r);
  }
  return [bx, by];
}

function traceLines(poles: Pole[], perPole = 14): string[] {
  const out: string[] = [];
  const souths = poles.filter((p) => p.q < 0);
  for (const p of poles.filter((pp) => pp.q > 0)) {
    for (let k = 0; k < perPole; k++) {
      const a = (2 * Math.PI * (k + 0.5)) / perPole;
      let x = p.x + 14 * Math.cos(a);
      let y = p.y + 14 * Math.sin(a);
      const pts = [`${x.toFixed(1)},${y.toFixed(1)}`];
      for (let s = 0; s < 1400; s++) {
        const [bx, by] = fieldAt(poles, x, y);
        const m = Math.hypot(bx, by);
        if (m === 0) break;
        x += (5 * bx) / m;
        y += (5 * by) / m;
        if (s % 2 === 0) pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
        if (x < -40 || x > VW + 40 || y < -40 || y > VH + 40) break;
        if (souths.some((q) => Math.hypot(x - q.x, y - q.y) < 10)) break;
      }
      out.push(pts.join(' '));
    }
  }
  return out;
}

/** Vẽ các đường sức từ. Chấm sáng chạy theo chiều vẽ của đường (N → S bên ngoài, S → N bên trong nam châm).
 *  Khi chiều còn ẩn (showValues = false) đường sức chỉ sáng/mờ, không lộ chiều. */
function FlowLines({ lines, inner = [], showValues, moving, period = 0.6, faint = false }: { lines: string[]; inner?: string[]; showValues: boolean; moving: boolean; period?: number; faint?: boolean }) {
  const one = (pts: string, i: number, isInner: boolean) => {
    const arr = pts.split(' ');
    const mid = arr[Math.floor(arr.length / 2)]?.split(',').map(Number);
    const nxt = arr[Math.floor(arr.length / 2) + 1]?.split(',').map(Number);
    const lech = { animationDelay: `${-((i * 0.37) % period).toFixed(2)}s`, animationDuration: `${period}s` };
    return (
      <g key={`${isInner ? 'i' : 'o'}${i}`}>
        <polyline
          points={pts}
          fill="none"
          stroke="#7b2cbf"
          strokeWidth={faint ? 1.6 : 2.2}
          strokeDasharray={isInner ? '6 5' : undefined}
          opacity={faint ? 0.45 : isInner ? 0.6 : 0.75}
          className={moving && !showValues ? 'field-breathe' : undefined}
          style={moving && !showValues ? { animationDelay: `${-((i * 0.53) % 2.4).toFixed(2)}s` } : undefined}
        />
        {moving && showValues && <polyline points={pts} fill="none" stroke={isInner ? '#ffe066' : '#e0b3ff'} strokeWidth={faint ? 4 : 5} strokeLinecap="round" className="field-flow" style={lech} />}
        {showValues && !isInner && mid && nxt && <Arrow x1={mid[0]} y1={mid[1]} x2={mid[0] + (nxt[0] - mid[0]) * 3} y2={mid[1] + (nxt[1] - mid[1]) * 3} color="#7b2cbf" width={2} head={14} />}
      </g>
    );
  };
  return (
    <g>
      {lines.map((pts, i) => one(pts, i, false))}
      {inner.map((pts, i) => one(pts, i, true))}
    </g>
  );
}

/** Đường thẳng (đoạn bên trong nam châm, đi từ S sang N) dưới dạng chuỗi điểm cho polyline. */
function seg(x1: number, y1: number, x2: number, y2: number, n = 24): string {
  return Array.from({ length: n + 1 }, (_, k) => `${(x1 + ((x2 - x1) * k) / n).toFixed(1)},${(y1 + ((y2 - y1) * k) / n).toFixed(1)}`).join(' ');
}

export const FIELD_CFG = {
  bar: 'Thanh nam châm',
  u: 'Nam châm chữ U',
  unlike: 'Hai cực khác tên',
  like: 'Hai cực cùng tên',
  earth: 'Trái Đất',
} as const;

function cfgPoles(cfg: keyof typeof FIELD_CFG): { poles: Pole[]; draw: JSX.Element; inside: (x: number, y: number) => boolean; inner: string[] } {
  const K = 3.2e6;
  switch (cfg) {
    case 'bar':
      return {
        poles: [
          { x: 728, y: 340, q: K },
          { x: 472, y: 340, q: -K },
        ],
        draw: <BarMagnet x={600} y={340} w={300} h={64} />,
        inside: (x, y) => x > 450 && x < 750 && Math.abs(y - 340) < 32,
        inner: [-16, 0, 16].map((d) => seg(472, 340 + d, 728, 340 + d)),
      };
    case 'u':
      return {
        poles: [
          { x: 520, y: 420, q: K },
          { x: 680, y: 420, q: -K },
        ],
        draw: (
          <g>
            <path d="M 480 430 L 480 260 A 120 120 0 0 1 720 260 L 720 430 L 640 430 L 640 260 A 40 40 0 0 0 560 260 L 560 430 Z" fill="#888" stroke="#333" strokeWidth={2} />
            <rect x={480} y={380} width={80} height={50} fill={NC} stroke="#333" strokeWidth={2} />
            <rect x={640} y={380} width={80} height={50} fill={SC} stroke="#333" strokeWidth={2} />
            <text x={520} y={418} textAnchor="middle" fill="#fff" fontWeight={900} fontSize={30}>
              N
            </text>
            <text x={680} y={418} textAnchor="middle" fill="#fff" fontWeight={900} fontSize={30}>
              S
            </text>
          </g>
        ),
        inside: (x, y) => (x > 480 && x < 560 && y > 200 && y < 430) || (x > 640 && x < 720 && y > 200 && y < 430) || (y < 270 && y > 130 && Math.hypot(x - 600, y - 260) < 122 && Math.hypot(x - 600, y - 260) > 38),
        // bên trong nam châm chữ U: từ cực S đi lên, vòng qua đỉnh rồi xuống cực N
        inner: [-16, 0, 16].map((d) => {
          const r = 80 + d;
          const pts: string[] = [];
          for (let y = 420; y >= 260; y -= 8) pts.push(`${600 + r},${y}`);
          for (let k = 1; k <= 24; k++) {
            const a = (Math.PI * k) / 24;
            pts.push(`${(600 + r * Math.cos(a)).toFixed(1)},${(260 - r * Math.sin(a)).toFixed(1)}`);
          }
          for (let y = 268; y <= 420; y += 8) pts.push(`${600 - r},${y}`);
          return pts.join(' ');
        }),
      };
    case 'unlike':
      return {
        poles: [
          { x: 458, y: 340, q: K },
          { x: 230, y: 340, q: -K },
          { x: 742, y: 340, q: -K },
          { x: 970, y: 340, q: K },
        ],
        draw: (
          <g>
            <BarMagnet x={345} y={340} w={260} h={60} />
            <BarMagnet x={855} y={340} w={260} h={60} />
          </g>
        ),
        inside: (x, y) => Math.abs(y - 340) < 30 && ((x > 215 && x < 475) || (x > 725 && x < 985)),
        inner: [-12, 12].flatMap((d) => [seg(230, 340 + d, 458, 340 + d), seg(742, 340 + d, 970, 340 + d)]),
      };
    case 'like':
      return {
        poles: [
          { x: 458, y: 340, q: K },
          { x: 230, y: 340, q: -K },
          { x: 742, y: 340, q: K },
          { x: 970, y: 340, q: -K },
        ],
        draw: (
          <g>
            <BarMagnet x={345} y={340} w={260} h={60} />
            <BarMagnet x={855} y={340} w={260} h={60} flip />
          </g>
        ),
        inside: (x, y) => Math.abs(y - 340) < 30 && ((x > 215 && x < 475) || (x > 725 && x < 985)),
        inner: [-12, 12].flatMap((d) => [seg(230, 340 + d, 458, 340 + d), seg(970, 340 + d, 742, 340 + d)]),
      };
    case 'earth':
      return {
        // cực Bắc địa lí ở trên; gần đó là cực Nam của "nam châm Trái Đất"
        poles: [
          { x: 615, y: 420, q: K },
          { x: 585, y: 260, q: -K },
        ],
        draw: (
          <g>
            <circle cx={600} cy={340} r={150} fill="#4a90d9" stroke="#1d4f8a" strokeWidth={3} opacity={0.85} />
            <path d="M 520 250 q 40 -30 80 0 q 30 20 10 60 q -40 30 -70 0 z M 640 350 q 40 -10 50 30 q -10 40 -50 30 z M 500 380 q 30 10 30 50 q -30 10 -40 -20 z" fill="#5cb85c" />
            <g opacity={0.6}>
              <BarMagnet x={600} y={340} w={170} h={30} angle={-79} />
            </g>
            <line x1={600} y1={160} x2={600} y2={520} stroke="#fff" strokeDasharray="6 6" />
            <text x={640} y={182} className="lab-label">
              Bắc địa lí
            </text>
            <text x={640} y={512} className="lab-label">
              Nam địa lí
            </text>
          </g>
        ),
        inside: (x, y) => Math.hypot(x - 600, y - 340) < 150,
        inner: [-10, 10].map((d) => seg(585 + d, 260, 615 + d, 420)),
      };
  }
}

export interface FieldDoc {
  mode: 'field';
  cfg: keyof typeof FIELD_CFG;
  show: 'filings' | 'lines' | 'none';
  /** vị trí các la bàn thử */
  compasses: { x: number; y: number }[];
  /** chỉ cho chọn các cấu hình này */
  list?: (keyof typeof FIELD_CFG)[];
}

export function FieldView({ doc, onDoc, showValues }: EngineProps<FieldDoc, unknown>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const { poles, draw, inside, inner } = useMemo(() => cfgPoles(doc.cfg), [doc.cfg]);
  const lines = useMemo(() => traceLines(poles, doc.cfg === 'earth' ? 12 : 16), [poles, doc.cfg]);
  const filings = useMemo(() => {
    const out: { x: number; y: number; a: number; o: number }[] = [];
    let k = 0;
    for (let y = 40; y < VH - 20; y += 18)
      for (let x = 30; x < VW - 20; x += 18) {
        k++;
        const jx = x + (((k * 37) % 11) - 5);
        const jy = y + (((k * 53) % 11) - 5);
        if (inside(jx, jy)) continue;
        const [bx, by] = fieldAt(poles, jx, jy);
        const m = Math.hypot(bx, by);
        const o = Math.min(1, m * 260);
        if (o < 0.12) continue;
        out.push({ x: jx, y: jy, a: (Math.atan2(by, bx) * 180) / Math.PI, o });
      }
    return out;
  }, [poles, inside]);
  const list = doc.list ?? (Object.keys(FIELD_CFG) as (keyof typeof FIELD_CFG)[]);
  // Chuyển động của đường sức: chấm sáng chạy theo chiều N → S (chỉ khi đã hiện chiều);
  // khi chiều còn ẩn thì đường sức chỉ "thở" sáng/mờ để không lộ đáp án.
  const [chuyenDong, setChuyenDong] = useState(true);
  // Từ phổ: có thể vẽ chồng đường sức từ (chuyển động) lên mạt sắt để thấy chiều của từ trường.
  const [chong, setChong] = useState(false);
  const moveCompass = (i: number) => (e: React.PointerEvent) =>
    start(e, (p) => {
      const cs = doc.compasses.slice();
      cs[i] = { x: Math.round(clamp(p.x, 40, VW - 40)), y: Math.round(clamp(p.y, 40, VH - 40)) };
      onDoc({ ...doc, compasses: cs });
    });
  return (
    <div className="eng">
      <div className="eng-stage" style={{ background: doc.show === 'filings' ? '#f3efe6' : undefined }}>
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {doc.show === 'filings' &&
            filings.map((f, i) => <line key={i} x1={f.x - 6} y1={f.y} x2={f.x + 6} y2={f.y} stroke="#3a3a3a" strokeWidth={2} opacity={f.o} transform={`rotate(${f.a} ${f.x} ${f.y})`} />)}
          {doc.cfg === 'earth' && draw}
          {doc.show === 'lines' && <FlowLines lines={lines} showValues={showValues} moving={chuyenDong} />}
          {doc.show === 'filings' && chong && <FlowLines lines={lines} showValues={showValues} moving={chuyenDong} faint />}
          {doc.cfg !== 'earth' && draw}
          {(doc.show === 'lines' || (doc.show === 'filings' && chong)) && <FlowLines lines={[]} inner={inner} showValues={showValues} moving={chuyenDong} />}
          {doc.compasses.map((c, i) => {
            const [bx, by] = fieldAt(poles, c.x, c.y, [0, -2e-4]);
            return (
              <g key={i} className="draggable" onPointerDown={moveCompass(i)}>
                <Needle x={c.x} y={c.y} angle={(Math.atan2(by, bx) * 180) / Math.PI} r={24} />
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Từ trường</h3>
        {list.length > 1 && (
          <Row label="Nguồn từ trường">
            <Seg value={doc.cfg} options={list} onChange={(c) => onDoc({ ...doc, cfg: c })} fmtOpt={(c) => FIELD_CFG[c]} />
          </Row>
        )}
        <Row label="Hiển thị">
          <Seg value={doc.show} options={['filings', 'lines', 'none'] as const} onChange={(s) => onDoc({ ...doc, show: s })} fmtOpt={(s) => (s === 'filings' ? 'Rắc mạt sắt (từ phổ)' : s === 'lines' ? 'Đường sức từ' : 'Chỉ la bàn')} />
        </Row>
        {doc.show === 'filings' && <Toggle value={chong} onChange={setChong} label="Vẽ chồng đường sức từ lên từ phổ" />}
        {(doc.show === 'lines' || (doc.show === 'filings' && chong)) && <Toggle value={chuyenDong} onChange={setChuyenDong} label="Chuyển động đường sức từ" />}
        <div className="insp-actions">
          <button className="btn" onClick={() => onDoc({ ...doc, compasses: [...doc.compasses, { x: 600, y: 600 }] })}>
            + Thêm la bàn
          </button>
          <button className="btn" disabled={doc.compasses.length === 0} onClick={() => onDoc({ ...doc, compasses: doc.compasses.slice(0, -1) })}>
            − Bớt la bàn
          </button>
        </div>
        <p className="small">Kéo các la bàn đặt quanh nam châm: kim la bàn định hướng theo từ trường. Mạt sắt sắp xếp thành những đường cong nối hai cực – gọi là từ phổ.</p>
        <p className="small">Đường sức từ ở bên ngoài nam châm có chiều đi ra từ cực Bắc (N), đi vào cực Nam (S). Nơi nào đường sức từ dày, từ trường mạnh; nơi nào thưa, từ trường yếu.</p>
        {doc.cfg === 'earth' && <p className="small muted">Trái Đất là một nam châm khổng lồ. Gần cực Bắc địa lí là cực từ Nam của “nam châm Trái Đất”, nên cực N của kim la bàn chỉ về phía Bắc địa lí. Cực từ và cực địa lí không trùng nhau.</p>}
        {(doc.show === 'lines' || chong) && showValues && <p className="small muted">Chấm sáng chạy theo chiều đường sức từ: bên ngoài nam châm đi từ N sang S, bên trong nam châm (nét đứt, chấm vàng) đi từ S về N – mỗi đường sức là một đường cong khép kín.</p>}
        {showValues || <p className="small muted">Bấm “Hiện số đo” để hiện chiều và cho đường sức từ chuyển động theo chiều đó.</p>}
      </aside>
    </div>
  );
}

// =====================================================================
// Dòng điện và từ trường: Oersted, ống dây, nam châm điện
// =====================================================================

export interface CoilDoc {
  mode: 'coil';
  sub: 'oersted' | 'solenoid' | 'magnet';
  /** số pin 1,5 V */
  cells: number;
  /** số vòng dây */
  turns: number;
  /** có lõi sắt non */
  core: boolean;
  reverse: boolean;
  lock?: boolean;
}

export function clipsFor(doc: Pick<CoilDoc, 'cells' | 'turns' | 'core'>): number {
  return Math.min(16, Math.round((doc.cells * doc.turns * (doc.core ? 1 : 0.12)) / 75));
}

export function CoilView({ doc, onDoc, showValues, onMeasure }: EngineProps<CoilDoc, unknown>) {
  const [on, setOn] = useState(false);
  const I = on ? doc.cells * 0.5 : 0; // cường độ dòng điện (A) gần đúng
  const sign = doc.reverse ? -1 : 1;
  const pts = useMemo(() => Array.from({ length: 16 }, (_, i) => ({ x: 470 + ((i * 53) % 240), y: 590 + ((i * 29) % 40), r: (i * 67) % 180 })), []);
  const clips = on ? clipsFor(doc) : 0;
  useEffect(() => onMeasure?.({ U: doc.cells * 1.5, N: doc.turns, clips: clipsFor(doc) }), [doc.cells, doc.turns, doc.core, onMeasure, doc]);
  // nguồn điện + khoá K vẽ chung
  const circuit = (x: number, y: number) => (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: doc.cells }, (_, k) => (
        <g key={k} transform={`translate(${k * 74} 0)`}>
          <rect x={0} y={-22} width={64} height={44} rx={8} fill="#2b2d42" />
          <rect x={64} y={-8} width={6} height={16} fill="#888" />
          <text x={32} y={7} textAnchor="middle" fill="#ffd166" fontSize={14} fontWeight={800}>
            1,5 V
          </text>
        </g>
      ))}
      <text x={doc.cells * 37} y={44} textAnchor="middle" className="tick-small">
        {doc.cells} pin = {vn(doc.cells * 1.5, 1)} V
      </text>
    </g>
  );
  const sw = (x: number, y: number) => (
    <g className="draggable" onPointerDown={() => setOn(!on)} transform={`translate(${x} ${y})`}>
      <circle cx={0} cy={0} r={7} fill="#333" />
      <circle cx={70} cy={0} r={7} fill="#333" />
      <line x1={0} y1={0} x2={on ? 70 : 60} y2={on ? 0 : -36} stroke="#333" strokeWidth={6} strokeLinecap="round" />
      <text x={35} y={36} textAnchor="middle" className="tick-small">
        Khoá K (bấm)
      </text>
    </g>
  );

  if (doc.sub === 'oersted') {
    // dây dẫn đặt dọc hướng Bắc – Nam, phía trên kim nam châm
    const defl = on ? sign * Math.min(80, (Math.atan(I * 1.6) * 180) / Math.PI) : 0;
    return (
      <div className="eng">
        <div className="eng-stage lab-bg">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
            <text x={600} y={40} textAnchor="middle" className="lab-label">
              Thí nghiệm Oersted (nhìn từ trên xuống) – dây dẫn đặt song song với kim nam châm
            </text>
            <Needle x={600} y={360} angle={-90 + defl} r={150} />
            <rect x={590} y={100} width={20} height={520} fill="#c8743a" opacity={0.85} />
            {on && (
              <g>
                {[180, 300, 420, 540].map((y) => (
                  <Arrow key={y} x1={630} y1={sign > 0 ? y + 40 : y - 40} x2={630} y2={sign > 0 ? y - 40 : y + 40} color="#e63946" width={3} head={12} />
                ))}
                <text x={650} y={130} className="lab-small" fill="#e63946">
                  chiều dòng điện
                </text>
              </g>
            )}
            <path d="M 600 100 L 600 70 L 160 70 L 160 300" fill="none" stroke="#c8743a" strokeWidth={6} />
            <path d="M 600 620 L 600 650 L 160 650 L 160 460" fill="none" stroke="#c8743a" strokeWidth={6} />
            <g transform="rotate(90 160 300)">{circuit(160, 300)}</g>
            {sw(860, 600)}
            <g transform="translate(1060 140)">
              <Arrow x1={0} y1={40} x2={0} y2={-50} color="var(--ink)" width={3} />
              <text y={-62} textAnchor="middle" className="lab-small">
                Bắc
              </text>
            </g>
            {showValues && (
              <text x={600} y={560} textAnchor="middle" fontSize={26} fontWeight={800} fill={on ? 'var(--danger)' : 'var(--ink-2)'}>
                {on ? `Kim nam châm bị lệch ${Math.abs(Math.round(defl))}° – dòng điện sinh ra từ trường` : 'Không có dòng điện: kim chỉ hướng Bắc – Nam'}
              </text>
            )}
          </svg>
        </div>
        <aside className="eng-side">
          <h3>Thí nghiệm Oersted</h3>
          <div className="insp-actions">
            <button className={`btn ${on ? 'on' : 'primary'}`} onClick={() => setOn(!on)}>
              {on ? 'Ngắt khoá K' : 'Đóng khoá K'}
            </button>
            <button className="btn" onClick={() => onDoc({ ...doc, reverse: !doc.reverse })}>
              Đổi chiều dòng điện
            </button>
          </div>
          <Row label="Số pin">
            <Seg value={doc.cells} options={[1, 2, 3, 4] as const} onChange={(c) => onDoc({ ...doc, cells: c })} />
          </Row>
          <p className="small">Khi có dòng điện chạy qua dây dẫn, kim nam châm đặt gần dây bị lệch khỏi hướng Bắc – Nam: xung quanh dòng điện có từ trường. Đổi chiều dòng điện, kim lệch theo chiều ngược lại. Ngắt dòng điện, kim trở về hướng cũ.</p>
        </aside>
      </div>
    );
  }

  if (doc.sub === 'solenoid') {
    const k = on ? doc.cells / 2 : 0;
    const K = 2.6e6 * k;
    const nX = sign > 0 ? 760 : 440;
    const sX = sign > 0 ? 440 : 760;
    const poles: Pole[] = on
      ? [
          { x: nX, y: 340, q: K },
          { x: sX, y: 340, q: -K },
        ]
      : [];
    const inside = (x: number, y: number) => x > 420 && x < 780 && Math.abs(y - 340) < 70;
    return (
      <SolenoidField
        doc={doc}
        onDoc={onDoc}
        on={on}
        setOn={setOn}
        poles={poles}
        inside={inside}
        showValues={showValues}
        nLeft={sign < 0}
        circuit={circuit(470, 600)}
        sw={sw(860, 600)}
      />
    );
  }

  // ---------------- nam châm điện ----------------
  const topN = sign > 0;
  const coilW = 140 + doc.turns / 2;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={0} y={620} width={VW} height={60} className="lab-table" />
          {/* giá đỡ */}
          <rect x={250} y={60} width={16} height={560} fill="#666" />
          <rect x={250} y={80} width={350} height={14} fill="#666" />
          {/* lõi sắt + ống dây (đặt thẳng đứng) */}
          <g transform="translate(590 300)">
            {doc.core && <rect x={-22} y={-coilW / 2 - 40} width={44} height={coilW + 80} fill="#8d99a6" stroke="#555" strokeWidth={2} />}
            <rect x={-6} y={-200} width={12} height={200 - coilW / 2 - 40} fill="#666" />
            {Array.from({ length: Math.round(doc.turns / 20) + 6 }, (_, k) => {
              const nT = Math.round(doc.turns / 20) + 6;
              const y = -coilW / 2 + (coilW * k) / (nT - 1);
              return <ellipse key={k} cx={0} cy={y} rx={46} ry={8} fill="none" stroke="#c8743a" strokeWidth={4} />;
            })}
            {showValues && on && (
              <g>
                <text x={70} y={-coilW / 2} fontSize={30} fontWeight={900} fill={topN ? NC : SC}>
                  {topN ? 'N' : 'S'}
                </text>
                <text x={70} y={coilW / 2 + 40} fontSize={30} fontWeight={900} fill={topN ? SC : NC}>
                  {topN ? 'S' : 'N'}
                </text>
              </g>
            )}
            <text x={-70} y={0} textAnchor="end" className="lab-small">
              Ống dây {doc.turns} vòng{doc.core ? ', lõi sắt non' : ' (không lõi)'}
            </text>
          </g>
          {/* dây nối: ống dây – nguồn – khoá K */}
          <path d={`M 636 ${300 - coilW / 2} L 740 ${300 - coilW / 2} L 740 330 L 780 330`} fill="none" stroke="#c8743a" strokeWidth={4} />
          <path d={`M ${780 + doc.cells * 74 - 4} 330 L 1130 330 L 1130 560 L 1050 560`} fill="none" stroke="#c8743a" strokeWidth={4} />
          <path d={`M 636 ${300 + coilW / 2} L 700 ${300 + coilW / 2} L 700 560 L 980 560`} fill="none" stroke="#c8743a" strokeWidth={4} />
          {circuit(780, 330)}
          {sw(980, 560)}
          {/* ghim giấy */}
          {pts.map((p, i) => {
            const up = i < clips;
            const x = up ? 560 + (i % 4) * 18 : p.x;
            const y = up ? 300 + coilW / 2 + 52 + Math.floor(i / 4) * 22 : p.y;
            return <rect key={i} x={x} y={y} width={28} height={10} rx={5} fill="none" stroke="#666" strokeWidth={3} transform={`rotate(${up ? 90 : p.r} ${x + 14} ${y + 5})`} style={{ transition: 'all 0.4s' }} />;
          })}
          <text x={590} y={668} textAnchor="middle" className="lab-small">
            Ghim giấy bằng thép
          </text>
          {/* la bàn ở đầu dưới */}
          <g transform="translate(940 220)">
            <Needle x={0} y={0} angle={on ? (topN ? 90 : -90) : -90} r={36} />
            <text y={70} textAnchor="middle" className="tick-small">
              La bàn
            </text>
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Nam châm điện</h3>
        <div className="insp-actions">
          <button className={`btn ${on ? 'on' : 'primary'}`} onClick={() => setOn(!on)}>
            {on ? 'Ngắt khoá K' : 'Đóng khoá K'}
          </button>
          {!doc.lock && (
            <button className="btn" onClick={() => onDoc({ ...doc, reverse: !doc.reverse })}>
              Đổi chiều dòng điện
            </button>
          )}
        </div>
        <Row label="Số pin (hiệu điện thế)">
          <Seg value={doc.cells} options={[1, 2, 3, 4] as const} onChange={(c) => onDoc({ ...doc, cells: c })} fmtOpt={(c) => `${vn(c * 1.5, 1)} V`} />
        </Row>
        <Row label="Số vòng dây">
          <Seg value={doc.turns} options={[100, 200, 300] as const} onChange={(n) => onDoc({ ...doc, turns: n })} />
        </Row>
        <Toggle value={doc.core} onChange={(c) => onDoc({ ...doc, core: c })} label="Lồng lõi sắt non vào ống dây" />
        <div className="insp-values two">
          <div>
            <span>Số ghim hút được</span>
            <b>{showValues ? clips : '?'}</b>
          </div>
          <div>
            <span>Dòng điện (gần đúng)</span>
            <b>{vn(I, 1)} A</b>
          </div>
        </div>
        <p className="small">Ống dây có lõi sắt non, có dòng điện chạy qua trở thành nam châm điện. Ngắt dòng điện, nam châm điện mất từ tính, các ghim rơi xuống. Tăng dòng điện (tăng số pin) hoặc tăng số vòng dây thì từ trường của nam châm điện mạnh hơn.</p>
        <p className="small muted">Mở “Báo cáo”, bấm “Ghi số đo” sau mỗi lần thay đổi số pin, số vòng dây để lập bảng.</p>
      </aside>
    </div>
  );
}

function SolenoidField({
  doc,
  onDoc,
  on,
  setOn,
  poles,
  inside,
  showValues,
  nLeft,
  circuit,
  sw,
}: {
  doc: CoilDoc;
  onDoc: (d: CoilDoc) => void;
  on: boolean;
  setOn: (v: boolean) => void;
  poles: Pole[];
  inside: (x: number, y: number) => boolean;
  showValues: boolean;
  nLeft: boolean;
  circuit: JSX.Element;
  sw: JSX.Element;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const [show, setShow] = useState<'filings' | 'lines'>('filings');
  const [moving, setMoving] = useState(true);
  const lines = useMemo(() => (poles.length ? traceLines(poles, 14) : []), [poles]);
  const nX = poles.find((p) => p.q > 0)?.x ?? 0;
  const sX = poles.find((p) => p.q < 0)?.x ?? 0;
  const inner = poles.length ? [-24, 0, 24].map((d) => seg(sX, 340 + d, nX, 340 + d)) : [];
  // dòng điện càng lớn, đường sức "chạy" càng nhanh (chỉ để gợi ý từ trường mạnh hơn)
  const period = 1.2 / Math.max(1, doc.cells);
  const [cs, setCs] = useState([
    { x: 320, y: 340 },
    { x: 880, y: 340 },
    { x: 600, y: 200 },
    { x: 600, y: 480 },
  ]);
  const filings = useMemo(() => {
    const out: { x: number; y: number; a: number; o: number }[] = [];
    if (poles.length === 0) return out;
    let k = 0;
    for (let y = 40; y < 560; y += 18)
      for (let x = 30; x < VW - 20; x += 18) {
        k++;
        const jx = x + (((k * 37) % 11) - 5);
        const jy = y + (((k * 53) % 11) - 5);
        if (inside(jx, jy)) continue;
        const [bx, by] = fieldAt(poles, jx, jy);
        const m = Math.hypot(bx, by);
        const o = Math.min(1, m * 300);
        if (o < 0.12) continue;
        out.push({ x: jx, y: jy, a: (Math.atan2(by, bx) * 180) / Math.PI, o });
      }
    return out;
  }, [poles, inside]);
  return (
    <div className="eng">
      <div className="eng-stage" style={{ background: '#f3efe6' }}>
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {show === 'filings' &&
            filings.map((f, i) => (
              <line key={i} x1={f.x - 6} y1={f.y} x2={f.x + 6} y2={f.y} stroke="#3a3a3a" strokeWidth={2} opacity={f.o} transform={`rotate(${f.a} ${f.x} ${f.y})`} />
            ))}
          {show === 'lines' && <FlowLines lines={lines} showValues={showValues} moving={moving} period={period} />}
          {/* ống dây nằm ngang */}
          <rect x={420} y={300} width={360} height={80} fill="rgba(200,200,200,0.4)" />
          {Array.from({ length: 16 }, (_, k) => (
            <ellipse key={k} cx={432 + k * 22.5} cy={340} rx={9} ry={44} fill="none" stroke="#c8743a" strokeWidth={5} />
          ))}
          {show === 'lines' && <FlowLines lines={[]} inner={inner} showValues={showValues} moving={moving} period={period} />}
          {on && showValues && (
            <g>
              <text x={nLeft ? 390 : 810} y={350} textAnchor="middle" fontSize={34} fontWeight={900} fill={NC}>
                N
              </text>
              <text x={nLeft ? 810 : 390} y={350} textAnchor="middle" fontSize={34} fontWeight={900} fill={SC}>
                S
              </text>
            </g>
          )}
          <path d="M 432 384 L 432 600 L 470 600" fill="none" stroke="#c8743a" strokeWidth={4} />
          <path d="M 770 384 L 770 470 L 960 470 L 960 600 L 930 600" fill="none" stroke="#c8743a" strokeWidth={4} />
          {circuit}
          {sw}
          {cs.map((c, i) => {
            const [bx, by] = fieldAt(poles, c.x, c.y, [0, -2e-4]);
            return (
              <g
                key={i}
                className="draggable"
                onPointerDown={(e) =>
                  start(e, (p) => {
                    const n = cs.slice();
                    n[i] = { x: clamp(p.x, 40, VW - 40), y: clamp(p.y, 40, 560) };
                    setCs(n);
                  })
                }
              >
                <Needle x={c.x} y={c.y} angle={(Math.atan2(by, bx) * 180) / Math.PI} r={24} />
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Từ trường của ống dây có dòng điện</h3>
        <div className="insp-actions">
          <button className={`btn ${on ? 'on' : 'primary'}`} onClick={() => setOn(!on)}>
            {on ? 'Ngắt khoá K' : 'Đóng khoá K'}
          </button>
          <button className="btn" onClick={() => onDoc({ ...doc, reverse: !doc.reverse })}>
            Đổi chiều dòng điện
          </button>
        </div>
        <Row label="Số pin">
          <Seg value={doc.cells} options={[1, 2, 3, 4] as const} onChange={(c) => onDoc({ ...doc, cells: c })} />
        </Row>
        <Row label="Hiển thị">
          <Seg value={show} options={['filings', 'lines'] as const} onChange={setShow} fmtOpt={(v) => (v === 'filings' ? 'Rắc mạt sắt (từ phổ)' : 'Đường sức từ')} />
        </Row>
        {show === 'lines' && <Toggle value={moving} onChange={setMoving} label="Chuyển động đường sức từ" />}
        {show === 'lines' && !on && <p className="small muted">Đóng khoá K để có dòng điện – khi đó mới có từ trường và đường sức từ.</p>}
        <p className="small">Khi có dòng điện, mạt sắt xung quanh ống dây sắp xếp giống từ phổ của thanh nam châm; các la bàn định hướng theo từ trường. Ống dây có dòng điện chạy qua giống như một thanh nam châm, hai đầu ống dây là hai cực từ.</p>
        <p className="small muted">Đổi chiều dòng điện thì hai cực từ của ống dây đổi chỗ cho nhau. Kéo các la bàn để khảo sát.</p>
      </aside>
    </div>
  );
}
