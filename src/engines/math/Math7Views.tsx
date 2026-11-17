// Toán 7 (Kết nối tri thức): số hữu tỉ trên trục số, số thập phân vô hạn tuần hoàn, số vô tỉ √2,
// góc đối đỉnh – kề bù – tia phân giác, hai đường thẳng song song và các cặp góc, tổng ba góc tam giác,
// tam giác cân – đường trung trực, quan hệ cạnh – góc, đường vuông góc – đường xiên, bất đẳng thức tam giác,
// các điểm đồng quy trong tam giác, đại lượng tỉ lệ thuận – nghịch, hình hộp chữ nhật và lăng trụ đứng.
import { useRef } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, Toggle, useSvgDrag } from '../../ui/controls';
import { Arc, C, Curve, Grid, Line, MiniTable, P, Poly, Pt, SegLabel, Ticks, UNIT, VH, VW, add, angleAt, dist, f2, fcm, fdeg, intersect, labelOff, mid, mkAxes, mul, project, sub, unit } from './mcommon';
import { dec, fmtNum } from './poly';
import { circumcircle, incircle } from './Math9Views';

const clampP = (p: P): P => ({ x: Math.max(30, Math.min(VW - 330, p.x)), y: Math.max(30, Math.min(VH - 30, p.y)) });
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));

// =====================================================================
// Trục số: số hữu tỉ, số thập phân vô hạn tuần hoàn, số vô tỉ
// =====================================================================

export interface NumLineDoc {
  mode: 'numline';
  sub: 'rational' | 'decimal' | 'real';
  p: number;
  q: number;
  opp?: boolean;
  /** real: hai cạnh góc vuông */
  a?: number;
  b?: number;
}

/** Khai triển thập phân p/q: phần nguyên, các chữ số, vị trí bắt đầu chu kì (−1 nếu hữu hạn) */
export function decimalExpand(p: number, q: number, max = 40): { int: number; digits: number[]; start: number; rems: number[] } {
  const sign = p < 0 ? -1 : 1;
  const P0 = Math.abs(p);
  const int = Math.floor(P0 / q) * sign;
  let r = P0 % q;
  const digits: number[] = [];
  const rems: number[] = [];
  const seen = new Map<number, number>();
  while (r !== 0 && digits.length < max) {
    if (seen.has(r)) return { int, digits, start: seen.get(r)!, rems };
    seen.set(r, digits.length);
    rems.push(r);
    r *= 10;
    digits.push(Math.floor(r / q));
    r %= q;
  }
  return { int, digits, start: -1, rems };
}

export function decStr(p: number, q: number): string {
  const e = decimalExpand(p, q);
  const neg = p < 0 && Math.abs(p) < q ? '−' : '';
  const ip = `${neg}${String(e.int).replace('-', '−')}`;
  if (!e.digits.length) return ip;
  if (e.start < 0) return `${ip},${e.digits.join('')}`;
  return `${ip},${e.digits.slice(0, e.start).join('')}(${e.digits.slice(e.start).join('')})`;
}

export function NumLineView({ doc, onDoc, showValues }: EngineProps<NumLineDoc, unknown>) {
  const { p, q } = doc;
  const g = gcd(p, q) || 1;
  const frac = (a: number, b: number) => `${a < 0 ? '−' : ''}${Math.abs(a)}/${b}`;
  if (doc.sub === 'real') {
    const a = doc.a ?? 1;
    const b = doc.b ?? 1;
    const h = Math.hypot(a, b);
    const s = 110;
    const X = (v: number) => 140 + v * s;
    const y0 = 470;
    const tri = [{ x: X(0), y: y0 }, { x: X(a), y: y0 }, { x: X(a), y: y0 - b * s }];
    const ang = Math.atan2(b, a);
    const sq = Number.isInteger(Math.round(h * 1e9) / 1e9);
    return (
      <div className="eng">
        <div className="eng-stage lab-bg">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
            <line x1={60} x2={1160} y1={y0} y2={y0} stroke="var(--ink)" strokeWidth={3} />
            {Array.from({ length: 10 }, (_, i) => i).map((v) => (
              <g key={v}>
                <line x1={X(v)} x2={X(v)} y1={y0 - 8} y2={y0 + 8} stroke="var(--ink)" strokeWidth={2} />
                <text x={X(v)} y={y0 + 32} textAnchor="middle" className="tick-small">
                  {v}
                </text>
              </g>
            ))}
            <Poly pts={tri} fill={C.soft[0]} stroke={C.a} w={3} />
            <Line a={tri[0]} b={tri[2]} color={C.b} w={4} />
            <path d={`M ${tri[2].x} ${tri[2].y} A ${h * s} ${h * s} 0 0 1 ${X(h)} ${y0}`} fill="none" stroke={C.b} strokeWidth={2.5} strokeDasharray="8 6" />
            <circle cx={X(h)} cy={y0} r={10} fill={C.b} stroke="#fff" strokeWidth={3} />
            <text x={X(h)} y={y0 + 64} textAnchor="middle" fontSize={26} fontWeight={900} fill={C.b} className="math-text">
              √{a * a + b * b}
            </text>
            <text x={(X(0) + X(a)) / 2} y={y0 - 10} textAnchor="middle" fontSize={20} fontWeight={800} fill={C.a}>
              {a}
            </text>
            <text x={X(a) + 14} y={y0 - (b * s) / 2} fontSize={20} fontWeight={800} fill={C.a}>
              {b}
            </text>
            <text x={X(0) + Math.cos(ang) * (h * s) * 0.5 - 20} y={y0 - Math.sin(ang) * (h * s) * 0.5 - 10} fontSize={20} fontWeight={800} fill={C.b} className="math-text">
              √{a * a + b * b}
            </text>
            <foreignObject x={760} y={50} width={410} height={300}>
              <div className="fmap-box">
                <p>Cạnh huyền của tam giác vuông có hai cạnh góc vuông {a} và {b} dài √({a}² + {b}²) = √{a * a + b * b}.</p>
                <p>Quay compa tâm O để đặt đoạn này lên trục số.</p>
                <p style={{ fontWeight: 800, color: C.b }}>
                  √{a * a + b * b} {showValues ? (sq ? `= ${Math.round(h)} (số hữu tỉ)` : `≈ ${h.toFixed(8).replace('.', ',')}… (số vô tỉ)`) : '≈ ?'}
                </p>
                <p className="small">Số vô tỉ là số viết được dưới dạng số thập phân vô hạn không tuần hoàn. Số hữu tỉ và số vô tỉ gọi chung là số thực; mỗi số thực ứng với một điểm trên trục số.</p>
              </div>
            </foreignObject>
          </svg>
        </div>
        <aside className="eng-side">
          <h3>Số vô tỉ trên trục số</h3>
          <Row label="Cạnh góc vuông thứ nhất">
            <Slider value={a} min={1} max={4} step={1} digits={0} onChange={(v) => onDoc({ ...doc, a: v })} />
          </Row>
          <Row label="Cạnh góc vuông thứ hai">
            <Slider value={b} min={1} max={3} step={1} digits={0} onChange={(v) => onDoc({ ...doc, b: v })} />
          </Row>
          <p className="small muted">Thử 1 và 1 (√2), 2 và 1 (√5), 3 và 4 (√25 = 5).</p>
        </aside>
      </div>
    );
  }
  if (doc.sub === 'decimal') {
    const e = decimalExpand(p, q, 30);
    const only25 = (() => {
      let n = q / g;
      while (n % 2 === 0) n /= 2;
      while (n % 5 === 0) n /= 5;
      return n === 1;
    })();
    return (
      <div className="eng">
        <div className="eng-stage lab-bg">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
            <text x={600} y={60} textAnchor="middle" fontSize={40} fontWeight={800} fill="var(--accent)" className="math-text">
              {frac(p, q)} = {showValues ? decStr(p, q) : '?'}
            </text>
            <text x={60} y={130} fontSize={20} fontWeight={800} fill="var(--muted)">
              Chia {Math.abs(p)} cho {q}: các số dư lần lượt là
            </text>
            {e.rems.slice(0, 16).map((r, i) => {
              const inCycle = e.start >= 0 && i >= e.start;
              return (
                <g key={i} transform={`translate(${60 + i * 68} 150)`}>
                  <rect width={60} height={60} rx={10} fill={showValues && inCycle ? C.soft[1] : 'var(--surface)'} stroke={showValues && inCycle ? C.b : 'var(--line)'} strokeWidth={2} />
                  <text x={30} y={40} textAnchor="middle" fontSize={24} fontWeight={800} fill="var(--ink)">
                    {r}
                  </text>
                  <text x={30} y={88} textAnchor="middle" fontSize={22} fontWeight={800} fill={C.a}>
                    {e.digits[i]}
                  </text>
                </g>
              );
            })}
            <text x={60} y={268} fontSize={16} fontWeight={700} fill="var(--muted)">
              (hàng dưới: chữ số thập phân nhận được)
            </text>
            <foreignObject x={60} y={300} width={1080} height={340}>
              <div className="fmap-box">
                <p>
                  Phân số tối giản: <b>{frac(p / g, q / g)}</b>; mẫu {q / g} = {factorStr(q / g)}.
                </p>
                <p style={{ fontWeight: 800, color: only25 ? C.c : C.b }}>
                  {showValues
                    ? only25
                      ? 'Mẫu chỉ có ước nguyên tố 2 và 5 → số thập phân hữu hạn.'
                      : `Mẫu có ước nguyên tố khác 2 và 5 → số thập phân vô hạn tuần hoàn; số dư lặp lại nên các chữ số lặp lại. Chu kì: ${e.digits.slice(e.start).join('')}.`
                    : 'Số thập phân hữu hạn hay vô hạn tuần hoàn?'}
                </p>
                <p className="small">Mỗi số hữu tỉ được biểu diễn bởi một số thập phân hữu hạn hoặc vô hạn tuần hoàn. Phép chia chỉ có hữu hạn số dư khác nhau (nhỏ hơn số chia), nên đến lúc nào đó số dư phải lặp lại.</p>
              </div>
            </foreignObject>
          </svg>
        </div>
        <aside className="eng-side">
          <h3>Số thập phân</h3>
          <Row label="Tử số">
            <Slider value={p} min={1} max={30} step={1} digits={0} onChange={(v) => onDoc({ ...doc, p: v })} />
          </Row>
          <Row label="Mẫu số">
            <Slider value={q} min={2} max={30} step={1} digits={0} onChange={(v) => onDoc({ ...doc, q: v })} />
          </Row>
          <p className="small muted">Thử 1/3, 5/6, 1/7, 3/8, 7/12, 2/11.</p>
        </aside>
      </div>
    );
  }
  const lo = -3;
  const hi = 3;
  const X = (v: number) => 90 + ((v - lo) / (hi - lo)) * 1020;
  const y0 = 330;
  const v = p / q;
  const ticks: number[] = [];
  for (let k = lo * q; k <= hi * q; k++) ticks.push(k / q);
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <text x={600} y={80} textAnchor="middle" fontSize={40} fontWeight={800} fill="var(--accent)" className="math-text">
            {frac(p, q)}
            {g > 1 ? ` = ${frac(p / g, q / g)}` : ''}
          </text>
          <line x1={60} x2={1150} y1={y0} y2={y0} stroke="var(--ink)" strokeWidth={3} />
          <path d={`M 1160 ${y0} l -14 -7 l 0 14 Z`} fill="var(--ink)" />
          {ticks.map((t, i) => {
            const whole = Math.abs(t - Math.round(t)) < 1e-9;
            return (
              <g key={i}>
                <line x1={X(t)} x2={X(t)} y1={y0 - (whole ? 14 : 7)} y2={y0 + (whole ? 14 : 7)} stroke="var(--ink)" strokeWidth={whole ? 3 : 1.5} />
                {whole && (
                  <text x={X(t)} y={y0 + 40} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--ink)">
                    {String(Math.round(t)).replace('-', '−')}
                  </text>
                )}
              </g>
            );
          })}
          {Math.abs(v) <= 3 && (
            <g>
              <circle cx={X(v)} cy={y0} r={12} fill={C.b} stroke="#fff" strokeWidth={3} />
              <text x={X(v)} y={y0 - 26} textAnchor="middle" fontSize={24} fontWeight={900} fill={C.b} className="math-text">
                {showValues ? frac(p, q) : '?'}
              </text>
              {doc.opp && v !== 0 && (
                <g>
                  <circle cx={X(-v)} cy={y0} r={12} fill={C.c} stroke="#fff" strokeWidth={3} />
                  <text x={X(-v)} y={y0 - 26} textAnchor="middle" fontSize={24} fontWeight={900} fill={C.c} className="math-text">
                    {showValues ? frac(-p, q) : '?'}
                  </text>
                  <path d={`M ${X(-v)} ${y0 + 60} Q ${X(0)} ${y0 + 110} ${X(v)} ${y0 + 60}`} fill="none" stroke={C.e} strokeWidth={2} strokeDasharray="6 5" />
                  <text x={X(0)} y={y0 + 120} textAnchor="middle" fontSize={18} fontWeight={800} fill={C.e}>
                    cách đều điểm 0: |{frac(p, q)}| = {showValues ? frac(Math.abs(p), q) : '?'}
                  </text>
                </g>
              )}
            </g>
          )}
          <foreignObject x={90} y={500} width={1020} height={140}>
            <div className="fmap-box">
              <p>
                Chia mỗi đoạn đơn vị thành <b>{q}</b> phần bằng nhau; mỗi phần ứng với 1/{q}. Điểm {frac(p, q)} cách gốc {Math.abs(p)} phần về phía {p >= 0 ? 'bên phải (số dương)' : 'bên trái (số âm)'}.
              </p>
              <p>Dạng thập phân: {showValues ? decStr(p, q) : '?'}</p>
            </div>
          </foreignObject>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Số hữu tỉ trên trục số</h3>
        <Row label="Tử số">
          <Slider value={p} min={-3 * q} max={3 * q} step={1} digits={0} onChange={(x) => onDoc({ ...doc, p: x })} />
        </Row>
        <Row label="Mẫu số">
          <Slider value={q} min={1} max={10} step={1} digits={0} onChange={(x) => onDoc({ ...doc, q: x, p: Math.max(-3 * x, Math.min(3 * x, p)) })} />
        </Row>
        <Toggle value={!!doc.opp} onChange={(x) => onDoc({ ...doc, opp: x })} label="Số đối và giá trị tuyệt đối" />
        <p className="small muted">Hai phân số bằng nhau biểu diễn cùng một số hữu tỉ, ứng với cùng một điểm trên trục số (thử 2/4 và 1/2).</p>
      </aside>
    </div>
  );
}

function factorStr(n: number): string {
  const f: number[] = [];
  let m = n;
  for (let d = 2; d * d <= m; d++) while (m % d === 0) (f.push(d), (m /= d));
  if (m > 1) f.push(m);
  return f.length ? f.join(' · ') : '1';
}

// =====================================================================
// Góc: đối đỉnh, kề bù, tia phân giác, hai đường thẳng song song
// =====================================================================

export interface AnglesDoc {
  mode: 'angles';
  sub: 'pair' | 'bisector' | 'parallel';
  ang: number;
  /** parallel: độ lệch của đường thẳng b so với a (0: song song) */
  dev?: number;
  pair?: 'dongvi' | 'sole' | 'trong';
}

export function AnglesView({ doc, onDoc, showValues }: EngineProps<AnglesDoc, unknown>) {
  const th = doc.ang;
  const r = (d: number) => (d * Math.PI) / 180;
  const ray = (o: P, d: number, L = 300): P => ({ x: o.x + L * Math.cos(r(d)), y: o.y - L * Math.sin(r(d)) });
  const v = (x: number) => (showValues ? fdeg(x) : '?');
  if (doc.sub === 'pair' || doc.sub === 'bisector') {
    const O: P = { x: 400, y: 360 };
    if (doc.sub === 'bisector') {
      const x = ray(O, 0);
      const y = ray(O, th);
      const z = ray(O, th / 2, 260);
      return (
        <div className="eng">
          <div className="eng-stage lab-bg">
            <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
              <Line a={O} b={x} color={C.a} w={4} />
              <Line a={O} b={y} color={C.a} w={4} />
              <Line a={O} b={z} color={C.b} w={4} />
              <Arc a={x} o={O} b={z} r={70} color={C.d} label={v(th / 2)} right={false} fill />
              <Arc a={z} o={O} b={y} r={80} color={C.c} label={v(th / 2)} right={false} fill />
              <Pt p={O} label="O" dx={-16} dy={26} />
              {[
                [x, 'x'],
                [y, 'y'],
                [z, 'z'],
              ].map(([p, n]) => (
                <text key={n as string} x={(p as P).x + 10} y={(p as P).y - 10} fontSize={26} fontWeight={800} fontStyle="italic" fill="var(--ink)">
                  {n as string}
                </text>
              ))}
              <foreignObject x={790} y={80} width={380} height={400}>
                <div className="fmap-box">
                  <b>Tia phân giác Oz của góc xOy</b>
                  <p>xOz = zOy = {showValues ? `${fmtNum(th / 2)}°` : '?'} = ½ · xOy</p>
                  <p className="small">Tia phân giác của một góc là tia nằm giữa hai cạnh của góc và tạo với hai cạnh ấy hai góc bằng nhau. Có thể vẽ bằng thước đo góc hoặc gấp giấy.</p>
                </div>
              </foreignObject>
            </svg>
          </div>
          <aside className="eng-side">
            <h3>Tia phân giác</h3>
            <Row label="Góc xOy">
              <Slider value={th} min={20} max={180} step={2} digits={0} suffix="°" onChange={(a) => onDoc({ ...doc, ang: a })} />
            </Row>
          </aside>
        </div>
      );
    }
    const A1 = ray(O, 0);
    const A2 = ray(O, th);
    const A3 = ray(O, 180);
    const A4 = ray(O, th + 180);
    return (
      <div className="eng">
        <div className="eng-stage lab-bg">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
            <Line a={A3} b={A1} color={C.a} w={4} />
            <Line a={A4} b={A2} color={C.b} w={4} />
            <Arc a={A1} o={O} b={A2} r={50} color={C.d} label={`Ô₁ ${v(th)}`} right={false} fill />
            <Arc a={A2} o={O} b={A3} r={60} color={C.c} label={`Ô₂ ${v(180 - th)}`} right={false} fill />
            <Arc a={A3} o={O} b={A4} r={50} color={C.d} label={`Ô₃ ${v(th)}`} right={false} fill />
            <Arc a={A4} o={O} b={A1} r={60} color={C.c} label={`Ô₄ ${v(180 - th)}`} right={false} fill />
            <Pt p={O} label="O" dx={-20} dy={30} />
            <foreignObject x={790} y={80} width={380} height={480}>
              <div className="fmap-box">
                <b>Hai đường thẳng cắt nhau tại O</b>
                <p>
                  <span style={{ color: C.d }}>Ô₁ và Ô₃</span> là hai góc đối đỉnh: {showValues ? 'Ô₁ = Ô₃' : '?'}
                </p>
                <p>
                  <span style={{ color: C.c }}>Ô₁ và Ô₂</span> là hai góc kề bù: {showValues ? 'Ô₁ + Ô₂ = 180°' : '?'}
                </p>
                <p className="small">Hai góc đối đỉnh thì bằng nhau. Hai góc kề bù có tổng số đo bằng 180°.</p>
              </div>
            </foreignObject>
          </svg>
        </div>
        <aside className="eng-side">
          <h3>Góc ở vị trí đặc biệt</h3>
          <Row label="Góc Ô₁">
            <Slider value={th} min={10} max={170} step={2} digits={0} suffix="°" onChange={(a) => onDoc({ ...doc, ang: a })} />
          </Row>
        </aside>
      </div>
    );
  }
  // hai đường thẳng a, b bị cắt bởi c
  const dev = doc.dev ?? 0;
  const ca: [P, P] = [{ x: 60, y: 220 }, { x: 760, y: 220 }];
  const bO: P = { x: 400, y: 470 };
  const cb: [P, P] = [ray(bO, 180 + dev, 400), ray(bO, dev, 400)];
  const cO: P = { x: 420, y: 345 };
  const c1 = ray(cO, th, 400);
  const c2 = ray(cO, th + 180, 400);
  const A = intersect(ca[0], ca[1], c1, c2)!;
  const B = intersect(cb[0], cb[1], c1, c2)!;
  const up = unit(sub(c1, c2));
  const cu = (o: P) => add(o, mul(up, 120));
  const cd = (o: P) => add(o, mul(up, -120));
  const aR = { x: A.x + 120, y: A.y };
  const aL = { x: A.x - 120, y: A.y };
  const bR = ray(B, dev, 120);
  const bL = ray(B, dev + 180, 120);
  const a1 = angleAt(aR, A, cu(A));
  const b1 = angleAt(bR, B, cu(B));
  const angs = { A: [a1, 180 - a1, a1, 180 - a1], B: [b1, 180 - b1, b1, 180 - b1] };
  const rays = (o: P, R: P, L: P) => [
    [R, cu(o)],
    [cu(o), L],
    [L, cd(o)],
    [cd(o), R],
  ] as [P, P][];
  const pairs: Record<string, [number, number][]> = {
    dongvi: [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
    ],
    sole: [
      [3, 1],
      [2, 0],
    ],
    trong: [
      [3, 0],
      [2, 1],
    ],
  };
  const sel = doc.pair ?? 'sole';
  const [pi, pj] = pairs[sel][0];
  const hiA = new Set([pi]);
  const hiB = new Set([pj]);
  const par = Math.abs(dev) < 0.01;
  const pa = angs.A[pi];
  const pb = angs.B[pj];
  const names = { dongvi: 'đồng vị', sole: 'so le trong', trong: 'trong cùng phía' };
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <Line a={ca[0]} b={ca[1]} color={C.a} w={4} />
          <Line a={cb[0]} b={cb[1]} color={C.a} w={4} />
          <Line a={c1} b={c2} color={C.b} w={4} />
          <text x={740} y={210} fontSize={26} fontWeight={800} fontStyle="italic" fill={C.a}>
            a
          </text>
          <text x={cb[1].x - 20} y={cb[1].y - 10} fontSize={26} fontWeight={800} fontStyle="italic" fill={C.a}>
            b
          </text>
          <text x={c1.x + 10} y={c1.y + 20} fontSize={26} fontWeight={800} fontStyle="italic" fill={C.b}>
            c
          </text>
          {rays(A, aR, aL).map(([p, q], i) => (
            <Arc key={`a${i}`} a={p} o={A} b={q} r={hiA.has(i) ? 44 : 30} color={hiA.has(i) ? C.d : 'var(--muted)'} label={`${i + 1}`} right={false} fill={hiA.has(i)} />
          ))}
          {rays(B, bR, bL).map(([p, q], i) => (
            <Arc key={`b${i}`} a={p} o={B} b={q} r={hiB.has(i) ? 44 : 30} color={hiB.has(i) ? C.c : 'var(--muted)'} label={`${i + 1}`} right={false} fill={hiB.has(i)} />
          ))}
          <Pt p={A} label="A" dx={-26} dy={-12} />
          <Pt p={B} label="B" dx={-26} dy={-12} />
          <foreignObject x={790} y={60} width={380} height={560}>
            <div className="fmap-box">
              <b>Cặp góc {names[sel]}</b>
              <p>
                <span style={{ color: C.d }}>Â{'₁₂₃₄'[pi]} = {v(pa)}</span>; <span style={{ color: C.c }}>B̂{'₁₂₃₄'[pj]} = {v(pb)}</span>
              </p>
              <p style={{ fontWeight: 800, color: par ? C.c : C.b }}>
                {showValues ? (par ? 'a // b' : 'a không song song với b') : 'a có song song với b không?'}
              </p>
              <p className="small">
                {sel === 'trong'
                  ? 'Nếu a // b thì hai góc trong cùng phía bù nhau (tổng 180°).'
                  : `Nếu đường thẳng c cắt hai đường thẳng a, b và trong các góc tạo thành có một cặp góc ${names[sel]} bằng nhau thì a // b. Ngược lại, nếu a // b thì các góc ${names[sel]} bằng nhau.`}
              </p>
            </div>
          </foreignObject>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Hai đường thẳng song song</h3>
        <Row label="Cặp góc">
          <Seg value={sel} options={['sole', 'dongvi', 'trong'] as const} onChange={(x) => onDoc({ ...doc, pair: x })} fmtOpt={(x) => names[x]} />
        </Row>
        <Row label="Góc của đường thẳng c">
          <Slider value={th} min={30} max={150} step={2} digits={0} suffix="°" onChange={(a) => onDoc({ ...doc, ang: a })} />
        </Row>
        <Row label="Độ nghiêng của b so với a">
          <Slider value={dev} min={-20} max={20} step={1} digits={0} suffix="°" onChange={(a) => onDoc({ ...doc, dev: a })} />
        </Row>
        <p className="small muted">Đặt độ nghiêng bằng 0° để a // b. Qua một điểm ở ngoài một đường thẳng chỉ có một đường thẳng song song với đường thẳng đó (tiên đề Euclid).</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Tam giác: tổng ba góc, tam giác cân – trung trực, quan hệ cạnh – góc,
// đường vuông góc – đường xiên, bất đẳng thức tam giác, các điểm đồng quy
// =====================================================================

export interface Tri7Doc {
  mode: 'tri7';
  sub: 'sum' | 'iso' | 'side' | 'perp' | 'ineq3' | 'concur';
  tri: P[];
  ext?: boolean;
  M?: P;
  /** perp: điểm B, C trên d */
  bx?: number;
  cx?: number;
  len?: [number, number, number];
  med?: boolean;
  bis?: boolean;
  perpb?: boolean;
  alt?: boolean;
}

export function Tri7View({ doc, onDoc, showValues }: EngineProps<Tri7Doc, unknown>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const v = (s: string) => (showValues ? s : '?');
  const dragV = (i: number) => (e: React.PointerEvent) => start(e, (q) => onDoc({ ...doc, tri: doc.tri.map((p, j) => (j === i ? clampP(q) : p)) }));
  let tri = doc.tri;
  if (doc.sub === 'iso') {
    // A nằm trên đường trung trực của BC
    const [A, B, Cc] = tri;
    const m = mid(B, Cc);
    const n = { x: -(Cc.y - B.y), y: Cc.x - B.x };
    tri = [project(A, m, add(m, n)), B, Cc];
  }
  const [A, B, Cc] = tri;
  const g = { x: (A.x + B.x + Cc.x) / 3, y: (A.y + B.y + Cc.y) / 3 };
  const ang = [angleAt(B, A, Cc), angleAt(A, B, Cc), angleAt(A, Cc, B)];
  const side = [dist(B, Cc), dist(A, Cc), dist(A, B)];
  const verts = (drag = true) => tri.map((p, i) => <Pt key={i} p={p} label={'ABC'[i]} {...labelOff(p, g, 28)} onDown={drag ? dragV(i) : undefined} />);
  let pic: React.ReactNode = null;
  const info: [string, string][] = [];
  let title = '';
  let note = '';
  let controls: React.ReactNode = null;
  switch (doc.sub) {
    case 'sum': {
      title = 'Tổng ba góc của một tam giác';
      const ext = add(Cc, mul(unit(sub(Cc, B)), 160));
      pic = (
        <g>
          <Poly pts={tri} fill={C.soft[0]} stroke={C.a} w={4} />
          {[0, 1, 2].map((i) => (
            <Arc key={i} a={tri[(i + 1) % 3]} o={tri[i]} b={tri[(i + 2) % 3]} r={34} color={C.solid[i + 2]} label={v(fdeg(ang[i]))} fill />
          ))}
          {doc.ext && (
            <g>
              <Line a={Cc} b={ext} color="var(--ink-2)" w={3} dash="8 5" />
              <Arc a={A} o={Cc} b={ext} r={54} color={C.e} label={v(fdeg(180 - ang[2]))} right={false} />
              <text x={ext.x} y={ext.y + 26} fontSize={22} fontStyle="italic" fontWeight={800} fill="var(--ink)">
                x
              </text>
            </g>
          )}
          {verts()}
          <g transform="translate(980 180)">
            {(() => {
              let a0 = 0;
              return ang.map((x, i) => {
                const s0 = a0;
                a0 += x;
                const R = 90;
                const p1 = { x: R * Math.cos((s0 * Math.PI) / 180), y: -R * Math.sin((s0 * Math.PI) / 180) };
                const p2 = { x: R * Math.cos((a0 * Math.PI) / 180), y: -R * Math.sin((a0 * Math.PI) / 180) };
                return <path key={i} d={`M 0 0 L ${p1.x} ${p1.y} A ${R} ${R} 0 0 0 ${p2.x} ${p2.y} Z`} fill={C.solid[i + 2]} opacity={0.6} stroke="#fff" strokeWidth={2} />;
              });
            })()}
            <line x1={-110} x2={110} y1={0} y2={0} stroke="var(--ink)" strokeWidth={2} />
            <text y={40} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--ink)">
              Ghép ba góc: {v('góc bẹt 180°')}
            </text>
          </g>
        </g>
      );
      info.push(['Â + B̂ + Ĉ', v(fdeg(ang[0] + ang[1] + ang[2]))]);
      if (doc.ext) info.push(['Góc ngoài ACx', v(fdeg(180 - ang[2]))], ['Â + B̂', v(fdeg(ang[0] + ang[1]))]);
      note = 'Tổng ba góc của một tam giác bằng 180°. Mỗi góc ngoài của tam giác bằng tổng hai góc trong không kề với nó.';
      controls = <Toggle value={!!doc.ext} onChange={(x) => onDoc({ ...doc, ext: x })} label="Góc ngoài tại đỉnh C" />;
      break;
    }
    case 'iso': {
      title = 'Tam giác cân. Đường trung trực';
      const m = mid(B, Cc);
      const n = unit({ x: -(Cc.y - B.y), y: Cc.x - B.x });
      const M = doc.M ? project(doc.M, m, add(m, n)) : add(m, mul(n, -120));
      pic = (
        <g>
          <Line a={add(m, mul(n, -600))} b={add(m, mul(n, 600))} color={C.e} w={2} dash="10 6" />
          <Poly pts={tri} fill={C.soft[0]} stroke={C.a} w={4} />
          <Ticks a={A} b={B} n={1} color={C.b} />
          <Ticks a={A} b={Cc} n={1} color={C.b} />
          <Arc a={A} o={B} b={Cc} r={34} color={C.d} label={v(fdeg(ang[1]))} />
          <Arc a={B} o={Cc} b={A} r={34} color={C.d} label={v(fdeg(ang[2]))} />
          <Arc a={B} o={m} b={add(m, n)} r={16} color={C.e} />
          <Line a={M} b={B} color={C.c} w={2.5} />
          <Line a={M} b={Cc} color={C.c} w={2.5} />
          <Pt p={m} label="H" dx={18} dy={28} />
          <Pt p={M} label="M" dx={22} color={C.c} onDown={(e) => start(e, (q) => onDoc({ ...doc, M: clampP(q) }))} />
          <Pt p={A} label="A" {...labelOff(A, g, 28)} onDown={dragV(0)} />
          <Pt p={B} label="B" {...labelOff(B, g, 28)} onDown={dragV(1)} />
          <Pt p={Cc} label="C" {...labelOff(Cc, g, 28)} onDown={dragV(2)} />
        </g>
      );
      info.push(['AB', v(`${fcm(side[2])} cm`)], ['AC', v(`${fcm(side[1])} cm`)], ['Góc B', v(fdeg(ang[1]))], ['Góc C', v(fdeg(ang[2]))], ['MB', v(`${fcm(dist(M, B))} cm`)], ['MC', v(`${fcm(dist(M, Cc))} cm`)]);
      note = 'Tam giác cân có hai góc ở đáy bằng nhau. Đường trung trực của đoạn BC (vuông góc với BC tại trung điểm H) gồm các điểm cách đều B và C.';
      break;
    }
    case 'side': {
      title = 'Quan hệ giữa góc và cạnh đối diện';
      const order = [0, 1, 2].sort((i, j) => side[j] - side[i]);
      pic = (
        <g>
          <Poly pts={tri} fill={C.soft[0]} stroke={C.a} w={4} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <Line a={tri[(i + 1) % 3]} b={tri[(i + 2) % 3]} color={i === order[0] ? C.b : i === order[2] ? C.c : C.a} w={i === order[1] ? 4 : 7} />
              <Arc a={tri[(i + 1) % 3]} o={tri[i]} b={tri[(i + 2) % 3]} r={34} color={i === order[0] ? C.b : i === order[2] ? C.c : C.a} label={v(fdeg(ang[i]))} fill />
              <SegLabel a={tri[(i + 1) % 3]} b={tri[(i + 2) % 3]} away={tri[i]} text={v(`${fcm(side[i])} cm`)} color={i === order[0] ? C.b : i === order[2] ? C.c : C.a} />
            </g>
          ))}
          {verts()}
        </g>
      );
      const n = ['BC', 'CA', 'AB'];
      const an = ['Â', 'B̂', 'Ĉ'];
      info.push(['Cạnh lớn nhất', v(`${n[order[0]]} – đối diện ${an[order[0]]}`)], ['Góc lớn nhất', v(an[ang.indexOf(Math.max(...ang))])], ['Cạnh nhỏ nhất', v(`${n[order[2]]} – đối diện ${an[order[2]]}`)]);
      note = 'Trong một tam giác, góc đối diện với cạnh lớn hơn là góc lớn hơn; cạnh đối diện với góc lớn hơn là cạnh lớn hơn.';
      break;
    }
    case 'perp': {
      title = 'Đường vuông góc và đường xiên';
      const Ap = tri[0];
      const y = 520;
      const H = { x: Ap.x, y };
      const Bp = { x: doc.bx ?? Ap.x + 160, y };
      const Cp = { x: doc.cx ?? Ap.x - 300, y };
      pic = (
        <g>
          <line x1={40} x2={760} y1={y} y2={y} stroke="var(--ink)" strokeWidth={3} />
          <text x={740} y={y - 12} fontSize={24} fontStyle="italic" fontWeight={800} fill="var(--ink)">
            d
          </text>
          <Line a={Ap} b={H} color={C.c} w={4} />
          <Arc a={Ap} o={H} b={{ x: H.x + 40, y }} r={20} color={C.c} />
          <Line a={Ap} b={Bp} color={C.b} w={4} />
          <Line a={Ap} b={Cp} color={C.d} w={4} />
          <Pt p={H} label="H" dy={34} />
          <Pt p={Ap} label="A" dy={-18} onDown={(e) => start(e, (q) => onDoc({ ...doc, tri: [{ x: Math.max(80, Math.min(720, q.x)), y: Math.max(60, Math.min(y - 60, q.y)) }, tri[1], tri[2]] }))} />
          <Pt p={Bp} label="B" dy={34} color={C.b} onDown={(e) => start(e, (q) => onDoc({ ...doc, bx: Math.max(40, Math.min(760, q.x)) }))} />
          <Pt p={Cp} label="C" dy={34} color={C.d} onDown={(e) => start(e, (q) => onDoc({ ...doc, cx: Math.max(40, Math.min(760, q.x)) }))} />
        </g>
      );
      info.push(['AH (đường vuông góc)', v(`${fcm(dist(Ap, H))} cm`)], ['AB (đường xiên)', v(`${fcm(dist(Ap, Bp))} cm`)], ['AC (đường xiên)', v(`${fcm(dist(Ap, Cp))} cm`)], ['HB (hình chiếu của AB)', v(`${fcm(dist(H, Bp))} cm`)], ['HC (hình chiếu của AC)', v(`${fcm(dist(H, Cp))} cm`)]);
      note = 'Trong các đường xiên và đường vuông góc kẻ từ một điểm ở ngoài một đường thẳng đến đường thẳng đó, đường vuông góc là đường ngắn nhất. Đường xiên nào có hình chiếu lớn hơn thì lớn hơn.';
      break;
    }
    case 'ineq3': {
      title = 'Quan hệ giữa ba cạnh của một tam giác';
      const [a, b, c] = doc.len ?? [5, 4, 3];
      const ok = a < b + c && b < a + c && c < a + b;
      const s = Math.min(UNIT, 600 / Math.max(a, b + c, 1));
      const Bq = { x: 120, y: 480 };
      const Cq = { x: 120 + a * s, y: 480 };
      let Aq: P | null = null;
      if (ok) {
        const x = (c * c - b * b + a * a) / (2 * a);
        const h = Math.sqrt(Math.max(0, c * c - x * x));
        Aq = { x: Bq.x + x * s, y: Bq.y - h * s };
      }
      pic = (
        <g>
          <circle cx={Bq.x} cy={Bq.y} r={c * s} fill="none" stroke={C.b} strokeWidth={1.5} strokeDasharray="6 6" />
          <circle cx={Cq.x} cy={Cq.y} r={b * s} fill="none" stroke={C.c} strokeWidth={1.5} strokeDasharray="6 6" />
          <Line a={Bq} b={Cq} color={C.a} w={5} />
          {Aq ? (
            <g>
              <Line a={Bq} b={Aq} color={C.b} w={5} />
              <Line a={Cq} b={Aq} color={C.c} w={5} />
              <Pt p={Aq} label="A" dy={-18} />
            </g>
          ) : (
            <g>
              <Line a={Bq} b={{ x: Bq.x + c * s * 0.8, y: Bq.y - c * s * 0.6 }} color={C.b} w={5} />
              <Line a={Cq} b={{ x: Cq.x - b * s * 0.8, y: Cq.y - b * s * 0.6 }} color={C.c} w={5} />
            </g>
          )}
          <Pt p={Bq} label="B" dy={34} />
          <Pt p={Cq} label="C" dy={34} />
          <text x={(Bq.x + Cq.x) / 2} y={Bq.y + 40} textAnchor="middle" fontSize={20} fontWeight={800} fill={C.a}>
            a = {fmtNum(a)}
          </text>
        </g>
      );
      info.push(['b + c', `${fmtNum(b + c)}`], ['|b − c|', `${fmtNum(Math.abs(b - c))}`], ['a', `${fmtNum(a)}`], ['Kết luận', v(ok ? '|b − c| < a < b + c: tạo thành tam giác' : 'Không tạo thành tam giác')]);
      note = 'Trong một tam giác, độ dài một cạnh bao giờ cũng lớn hơn hiệu và nhỏ hơn tổng độ dài hai cạnh còn lại.';
      controls = (
        <>
          {(['a (BC)', 'b (CA)', 'c (AB)'] as const).map((nm, i) => (
            <Row key={nm} label={nm}>
              <Slider value={(doc.len ?? [5, 4, 3])[i]} min={1} max={12} step={0.5} digits={1} onChange={(x) => onDoc({ ...doc, len: (doc.len ?? [5, 4, 3]).map((y, j) => (j === i ? x : y)) as [number, number, number] })} />
            </Row>
          ))}
        </>
      );
      break;
    }
    case 'concur': {
      title = 'Các đường đồng quy của tam giác';
      const Ma = mid(B, Cc);
      const Mb = mid(A, Cc);
      const Mc = mid(A, B);
      const G = g;
      const ic = incircle(A, B, Cc);
      const cc = circumcircle(A, B, Cc);
      const Ha = project(A, B, Cc);
      const Hb = project(B, A, Cc);
      const Hc = project(Cc, A, B);
      const Hh = intersect(A, Ha, B, Hb);
      pic = (
        <g>
          {doc.perpb && <circle cx={cc.c.x} cy={cc.c.y} r={cc.r} fill="none" stroke={C.b} strokeWidth={2} strokeDasharray="8 5" />}
          {doc.bis && <circle cx={ic.c.x} cy={ic.c.y} r={ic.r} fill="none" stroke={C.c} strokeWidth={2} strokeDasharray="8 5" />}
          <Poly pts={tri} fill={C.soft[0]} stroke={C.a} w={4} />
          {doc.med && (
            <g>
              <Line a={A} b={Ma} color={C.d} w={3} />
              <Line a={B} b={Mb} color={C.d} w={3} />
              <Line a={Cc} b={Mc} color={C.d} w={3} />
              <Pt p={G} label="G" dx={20} dy={-8} color={C.d} />
            </g>
          )}
          {doc.bis && (
            <g>
              {tri.map((p, i) => (
                <Line key={i} a={p} b={ic.c} color={C.c} w={3} />
              ))}
              <Pt p={ic.c} label="I" dx={20} dy={-8} />
            </g>
          )}
          {doc.perpb && (
            <g>
              {[Ma, Mb, Mc].map((m, i) => (
                <Line key={i} a={m} b={cc.c} color={C.b} w={2.5} dash="6 4" />
              ))}
              <Pt p={cc.c} label="O" dx={20} dy={-8} />
            </g>
          )}
          {doc.alt && Hh && (
            <g>
              <Line a={A} b={Ha} color={C.e} w={2.5} />
              <Line a={B} b={Hb} color={C.e} w={2.5} />
              <Line a={Cc} b={Hc} color={C.e} w={2.5} />
              {[Ha, Hb, Hc].map((h, i) => (
                <Line key={i} a={h} b={Hh} color={C.e} w={1.5} dash="4 4" />
              ))}
              <Pt p={Hh} label="H" dx={20} dy={-8} />
            </g>
          )}
          {verts()}
        </g>
      );
      if (doc.med) info.push(['AG : AM (M trung điểm BC)', v(f2(dist(A, G) / dist(A, Ma), 3))]);
      if (doc.bis) info.push(['Khoảng cách từ I tới ba cạnh', v(`${fcm(ic.r)} cm (bằng nhau)`)]);
      if (doc.perpb) info.push(['OA = OB = OC', v(`${fcm(cc.r)} cm`)]);
      if (doc.alt) info.push(['Trực tâm H', v(Hh ? 'giao điểm ba đường cao' : '–')]);
      note = 'Ba đường trung tuyến đồng quy tại trọng tâm G (AG = ⅔AM); ba đường phân giác đồng quy tại I cách đều ba cạnh; ba đường trung trực đồng quy tại O cách đều ba đỉnh; ba đường cao đồng quy tại trực tâm H.';
      controls = (
        <>
          <Toggle value={!!doc.med} onChange={(x) => onDoc({ ...doc, med: x })} label="Ba đường trung tuyến (G)" />
          <Toggle value={!!doc.bis} onChange={(x) => onDoc({ ...doc, bis: x })} label="Ba đường phân giác (I)" />
          <Toggle value={!!doc.perpb} onChange={(x) => onDoc({ ...doc, perpb: x })} label="Ba đường trung trực (O)" />
          <Toggle value={!!doc.alt} onChange={(x) => onDoc({ ...doc, alt: x })} label="Ba đường cao (H)" />
        </>
      );
      break;
    }
  }
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {pic}
          {doc.sub !== 'sum' && (
            <foreignObject x={790} y={40} width={390} height={600}>
              <div className="fmap-box">
                <b>{title}</b>
                <table className="cmp-table mini" style={{ marginTop: 10 }}>
                  <tbody>
                    {info.map(([k, val]) => (
                      <tr key={k}>
                        <th style={{ textAlign: 'left', width: '55%' }}>{k}</th>
                        <td>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="small">{note}</p>
              </div>
            </foreignObject>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{title}</h3>
        <p className="small">{doc.sub === 'ineq3' ? 'Đổi độ dài ba đoạn thẳng. Khi nào ghép được thành tam giác?' : 'Kéo các điểm trên hình.'}</p>
        {controls}
        {doc.sub === 'sum' && <MiniTable head={['', 'Giá trị']} rows={info} />}
        {doc.sub === 'sum' && <p className="small muted">{note}</p>}
      </aside>
    </div>
  );
}

// =====================================================================
// Đại lượng tỉ lệ thuận, tỉ lệ nghịch
// =====================================================================

const RATIO_CTX = {
  apple: { title: 'Mua táo', text: 'Giá 1 kg táo là k nghìn đồng. Số tiền y (nghìn đồng) phải trả khi mua x kg táo.', xName: 'x (kg)', yName: 'y (nghìn đồng)', inv: false },
  move: { title: 'Ô tô đi với vận tốc không đổi', text: 'Ô tô đi với vận tốc k (km/h). Quãng đường y (km) đi được trong x giờ.', xName: 'x (giờ)', yName: 'y (km)', inv: false },
  trip: { title: 'Đi hết quãng đường cố định', text: 'Quãng đường dài k (km). Vận tốc x (km/h) và thời gian y (giờ) đi hết quãng đường.', xName: 'x (km/h)', yName: 'y (giờ)', inv: true },
  work: { title: 'Làm xong một công việc', text: 'Một công việc cần k ngày công. Số người x và số ngày y để làm xong (năng suất mỗi người như nhau).', xName: 'x (người)', yName: 'y (ngày)', inv: true },
};

export interface RatioDoc {
  mode: 'ratio';
  ctx: keyof typeof RATIO_CTX;
  ctxs?: (keyof typeof RATIO_CTX)[];
  k: number;
}

export function RatioView({ doc, onDoc, showValues }: EngineProps<RatioDoc, unknown>) {
  const cx = RATIO_CTX[doc.ctx];
  const k = doc.k;
  const f = (x: number) => (cx.inv ? k / x : k * x);
  const xs = cx.inv ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6];
  const ys = xs.map(f);
  const yMax = Math.max(...ys) * 1.15;
  const ax = mkAxes(0, 7, 0, yMax, { x: 70, y: 40, w: 600, h: 560 });
  const ystep = yMax / 10;
  const nice = (s: number) => {
    const p = Math.pow(10, Math.floor(Math.log10(s)));
    return [1, 2, 5, 10].map((m) => m * p).find((m) => m >= s) ?? 10 * p;
  };
  const gy = nice(ystep);
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <Grid ax={ax} step={1} labelStep={1} stepY={gy} labelStepY={gy * 2} xName={cx.xName} yName={cx.yName} />
          <Curve ax={ax} f={(x) => (x <= 0 ? NaN : f(x))} color={C.a} w={4} />
          {xs.map((x) => (
            <circle key={x} cx={ax.X(x)} cy={ax.Y(f(x))} r={8} fill={C.d} stroke="#fff" strokeWidth={2} />
          ))}
          <g transform="translate(700 40)">
            <rect width={470} height={600} rx={20} fill="var(--surface)" stroke="var(--line)" />
            <foreignObject x={20} y={16} width={430} height={570}>
              <div className="fmap-box">
                <b>{cx.title}</b>
                <p className="small">{cx.text}</p>
                <table className="cmp-table mini">
                  <tbody>
                    <tr>
                      <th>x</th>
                      {xs.map((x) => (
                        <td key={x}>{x}</td>
                      ))}
                    </tr>
                    <tr>
                      <th>y</th>
                      {ys.map((y, i) => (
                        <td key={i}>{dec(y, 2)}</td>
                      ))}
                    </tr>
                    <tr>
                      <th>{cx.inv ? 'x·y' : 'y/x'}</th>
                      {xs.map((x, i) => (
                        <td key={i}>{showValues ? dec(cx.inv ? x * ys[i] : ys[i] / x, 2) : '?'}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                <p style={{ fontWeight: 800, color: C.b, marginTop: 12 }}>
                  {showValues ? (cx.inv ? `x · y = ${fmtNum(k)} không đổi → y tỉ lệ nghịch với x theo hệ số ${fmtNum(k)}: y = ${fmtNum(k)}/x` : `y/x = ${fmtNum(k)} không đổi → y tỉ lệ thuận với x theo hệ số ${fmtNum(k)}: y = ${fmtNum(k)}x`) : 'y và x là hai đại lượng tỉ lệ gì?'}
                </p>
                <p className="small">
                  {cx.inv ? 'x tăng gấp đôi thì y giảm một nửa.' : 'x tăng gấp đôi thì y cũng tăng gấp đôi; đồ thị là một phần đường thẳng đi qua gốc toạ độ.'}
                </p>
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{cx.inv ? 'Đại lượng tỉ lệ nghịch' : 'Đại lượng tỉ lệ thuận'}</h3>
        {doc.ctxs && doc.ctxs.length > 1 && (
          <Row label="Tình huống">
            <Seg value={doc.ctx} options={doc.ctxs} onChange={(c) => onDoc({ ...doc, ctx: c, k: RATIO_CTX[c].inv ? 120 : 30 })} fmtOpt={(c) => RATIO_CTX[c].title} />
          </Row>
        )}
        <Row label="Hệ số k">
          <Slider value={k} min={cx.inv ? 12 : 5} max={cx.inv ? 240 : 80} step={cx.inv ? 12 : 5} digits={0} onChange={(x) => onDoc({ ...doc, k: x })} />
        </Row>
      </aside>
    </div>
  );
}

// =====================================================================
// Hình hộp chữ nhật, hình lập phương, hình lăng trụ đứng tam giác / tứ giác
// =====================================================================

export interface PrismDoc {
  mode: 'prism';
  kind: 'box' | 'cube' | 'tri' | 'quad';
  kinds?: PrismDoc['kind'][];
  a: number;
  b: number;
  h: number;
  /** đáy tứ giác (hình thang): đáy nhỏ */
  c?: number;
  yaw: number;
  pitch: number;
  net?: boolean;
}

/** Đa giác đáy (trong mặt phẳng, đơn vị cm) */
export function prismBase(d: Pick<PrismDoc, 'kind' | 'a' | 'b' | 'c'>): [number, number][] {
  if (d.kind === 'cube') return [[0, 0], [d.a, 0], [d.a, d.a], [0, d.a]];
  if (d.kind === 'box') return [[0, 0], [d.a, 0], [d.a, d.b], [0, d.b]];
  if (d.kind === 'tri') return [[0, 0], [d.a, 0], [0, d.b]];
  const c = d.c ?? d.a / 2;
  const off = (d.a - c) / 2;
  return [[0, 0], [d.a, 0], [d.a - off, d.b], [off, d.b]];
}

export function prismMetrics(d: Pick<PrismDoc, 'kind' | 'a' | 'b' | 'c' | 'h'>) {
  const base = prismBase(d);
  const h = d.kind === 'cube' ? d.a : d.h;
  const per = base.reduce((s, p, i) => s + Math.hypot(base[(i + 1) % base.length][0] - p[0], base[(i + 1) % base.length][1] - p[1]), 0);
  const S = Math.abs(base.reduce((s, p, i) => s + p[0] * base[(i + 1) % base.length][1] - base[(i + 1) % base.length][0] * p[1], 0)) / 2;
  return { per, S, h, Sxq: per * h, Stp: per * h + 2 * S, V: S * h };
}

export function PrismView({ doc, onDoc, showValues }: EngineProps<PrismDoc, unknown>) {
  const dragRef = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);
  const base = prismBase(doc);
  const M = prismMetrics(doc);
  const h = M.h;
  const cxm = base.reduce((s, p) => s + p[0], 0) / base.length;
  const czm = base.reduce((s, p) => s + p[1], 0) / base.length;
  const S = Math.min(48, 260 / Math.max(doc.a, doc.b, h, 1));
  const cy = Math.cos((doc.yaw * Math.PI) / 180);
  const sy = Math.sin((doc.yaw * Math.PI) / 180);
  const cp = Math.cos((doc.pitch * Math.PI) / 180);
  const sp = Math.sin((doc.pitch * Math.PI) / 180);
  const ox = doc.net ? 250 : 380;
  const oy = 380;
  const proj = (x: number, y: number, z: number) => {
    const X = x - cxm;
    const Z = z - czm;
    const Y = y - h / 2;
    const x1 = X * cy - Z * sy;
    const z1 = X * sy + Z * cy;
    const y2 = Y * cp - z1 * sp;
    const z2 = Y * sp + z1 * cp;
    return { x: ox + x1 * S, y: oy - y2 * S, z: z2 };
  };
  const n = base.length;
  const bot = base.map(([x, z]) => proj(x, 0, z));
  const top = base.map(([x, z]) => proj(x, h, z));
  const faces = [
    { pts: bot, col: '#94a3b8' },
    { pts: top, col: '#94a3b8' },
    ...base.map((_, i) => ({ pts: [bot[i], bot[(i + 1) % n], top[(i + 1) % n], top[i]], col: C.solid[i % C.solid.length] })),
  ].map((f) => ({ ...f, z: f.pts.reduce((s, p) => s + p.z, 0) / f.pts.length }));
  faces.sort((p, q) => q.z - p.z);
  const onDown = (e: React.PointerEvent) => {
    dragRef.current = { x: e.clientX, y: e.clientY, yaw: doc.yaw, pitch: doc.pitch };
    const mv = (ev: PointerEvent) => {
      const d = dragRef.current;
      if (!d) return;
      onDoc({ ...doc, yaw: Math.round(d.yaw - (ev.clientX - d.x) * 0.5), pitch: Math.max(-10, Math.min(80, Math.round(d.pitch + (ev.clientY - d.y) * 0.4))) });
    };
    const up = () => {
      dragRef.current = null;
      window.removeEventListener('pointermove', mv);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', mv);
    window.addEventListener('pointerup', up);
  };
  // hình khai triển: dải mặt bên + hai đáy gắn vào mặt bên thứ nhất
  let net: React.ReactNode = null;
  if (doc.net) {
    const edges = base.map((p, i) => Math.hypot(base[(i + 1) % n][0] - p[0], base[(i + 1) % n][1] - p[1]));
    const ns = Math.min(30, 340 / M.per, 300 / (h + 2 * Math.max(doc.a, doc.b)));
    const x0 = 500;
    const y0 = 340 - (h * ns) / 2;
    let x = x0;
    const rects = edges.map((e, i) => {
      const r = <rect key={i} x={x} y={y0} width={e * ns} height={h * ns} fill={C.soft[i % C.soft.length]} stroke={C.solid[i % C.solid.length]} strokeWidth={2.5} />;
      x += e * ns;
      return r;
    });
    // đáy: đặt cạnh 0 của đa giác trùng cạnh trên/dưới của hình chữ nhật đầu tiên
    const [p0, p1] = [base[0], base[1]];
    const ang = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]);
    const place = (flip: boolean) =>
      base.map(([bx, bz]) => {
        const dx = bx - p0[0];
        const dz = bz - p0[1];
        const rx = dx * Math.cos(-ang) - dz * Math.sin(-ang);
        const rz = dx * Math.sin(-ang) + dz * Math.cos(-ang);
        return { x: x0 + rx * ns, y: flip ? y0 + h * ns + rz * ns : y0 - rz * ns };
      });
    net = (
      <g>
        {rects}
        <Poly pts={place(false)} fill="#cbd5e1" stroke="#475569" w={2.5} />
        <Poly pts={place(true)} fill="#cbd5e1" stroke="#475569" w={2.5} />
      </g>
    );
  }
  const name = { box: 'Hình hộp chữ nhật', cube: 'Hình lập phương', tri: 'Hình lăng trụ đứng tam giác', quad: 'Hình lăng trụ đứng tứ giác' }[doc.kind];
  const val = (x: number, u: string) => (showValues ? `${f2(x, 2)} ${u}` : '?');
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg" onPointerDown={onDown} style={{ cursor: 'grab' }}>
          <text x={ox} y={44} textAnchor="middle" className="lab-label">
            {name}
          </text>
          {faces.map((f, i) => (
            <polygon key={i} points={f.pts.map((p) => `${p.x},${p.y}`).join(' ')} fill={f.col} fillOpacity={0.25} stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round" />
          ))}
          {net}
          <g transform="translate(860 70)">
            <rect width={310} height={540} rx={20} fill="var(--surface)" stroke="var(--line)" />
            {[
              ['Chu vi đáy', val(M.per, 'cm')],
              ['Diện tích đáy', val(M.S, 'cm²')],
              ['Chiều cao', `${f2(h, 1)} cm`],
              ['Sxq = chu vi đáy × chiều cao', val(M.Sxq, 'cm²')],
              ['S toàn phần', val(M.Stp, 'cm²')],
              ['V = diện tích đáy × chiều cao', val(M.V, 'cm³')],
            ].map(([k, v2], i) => (
              <g key={k} transform={`translate(18 ${50 + i * 80})`}>
                <text fontSize={15} fontWeight={800} fill="var(--muted)">
                  {k}
                </text>
                <text x={274} y={36} textAnchor="end" fontSize={24} fontWeight={900} fill={C.solid[i]}>
                  {v2}
                </text>
              </g>
            ))}
          </g>
          <text x={20} y={VH - 16} fontSize={15} fill="var(--muted)">
            Kéo trên hình để xoay
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{name}</h3>
        {doc.kinds && doc.kinds.length > 1 && (
          <Row label="Hình">
            <Seg value={doc.kind} options={doc.kinds} onChange={(k) => onDoc({ ...doc, kind: k })} fmtOpt={(k) => ({ box: 'Hộp CN', cube: 'Lập phương', tri: 'Lăng trụ tam giác', quad: 'Lăng trụ tứ giác' })[k]} />
          </Row>
        )}
        <Row label={doc.kind === 'cube' ? 'Cạnh a (cm)' : doc.kind === 'tri' ? 'Cạnh góc vuông của đáy a' : 'Chiều dài a (cm)'}>
          <Slider value={doc.a} min={1} max={8} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, a: v })} />
        </Row>
        {doc.kind !== 'cube' && (
          <Row label={doc.kind === 'tri' ? 'Cạnh góc vuông của đáy b' : doc.kind === 'quad' ? 'Chiều cao đáy hình thang' : 'Chiều rộng b (cm)'}>
            <Slider value={doc.b} min={1} max={8} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, b: v })} />
          </Row>
        )}
        {doc.kind !== 'cube' && (
          <Row label="Chiều cao h (cm)">
            <Slider value={doc.h} min={1} max={8} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, h: v })} />
          </Row>
        )}
        <Toggle value={!!doc.net} onChange={(v) => onDoc({ ...doc, net: v })} label="Hình khai triển" />
        <p className="small muted">
          {doc.kind === 'tri' ? 'Đáy là tam giác vuông có hai cạnh góc vuông a, b.' : doc.kind === 'quad' ? 'Đáy là hình thang cân có đáy lớn a, đáy nhỏ a/2.' : 'Hình hộp chữ nhật có 6 mặt là hình chữ nhật, 8 đỉnh, 12 cạnh.'}
        </p>
      </aside>
    </div>
  );
}

