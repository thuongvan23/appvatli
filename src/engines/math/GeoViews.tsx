// Hình học phẳng Toán 8: tứ giác và các tứ giác đặc biệt (Chương III), định lí Thalès, đường trung bình,
// đường phân giác (Chương IV), tam giác đồng dạng, định lí Pythagore, hình đồng dạng (Chương IX)
// và ứng dụng đo chiều cao, khoảng cách. Mọi điểm đều kéo được; số đo cập nhật trực tiếp.
import { useRef } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, Toggle, useSvgDrag } from '../../ui/controls';
import {
  Arc, C, InfLine, Line, MiniTable, P, ParMark, Poly, Pt, SegLabel, Ticks, UNIT, VH, VW,
  add, angleAt, cross, dist, dot, f2, fcm, fdeg, isParallel, labelOff, lerp, mid, mul, polyArea, project, projK, reflect, rot, rot90, sub, unit,
} from './mcommon';
import { HOMO_SHAPES } from './mathData';

const near = (a: number, b: number, tol: number) => Math.abs(a - b) < tol;
const snap = (p: P, g = 20): P => ({ x: Math.round(p.x / g) * g, y: Math.round(p.y / g) * g });
const clampP = (p: P): P => ({ x: Math.max(30, Math.min(VW - 330, p.x)), y: Math.max(30, Math.min(VH - 30, p.y)) });

function DotGrid() {
  return (
    <g opacity={0.5}>
      {Array.from({ length: 22 }, (_, i) =>
        Array.from({ length: 17 }, (_, j) => <circle key={`${i}-${j}`} cx={20 + i * UNIT} cy={20 + j * UNIT} r={1.6} fill="var(--muted)" />),
      )}
    </g>
  );
}

// =====================================================================
// Tứ giác và các tứ giác đặc biệt
// =====================================================================

export type QuadKind = 'free' | 'trap' | 'rtrap' | 'isoTrap' | 'para' | 'rect' | 'rhombus' | 'square';

export interface QuadDoc {
  mode: 'quad';
  kind: QuadKind;
  p: P[];
  diag?: boolean;
  angles?: boolean;
  sides?: boolean;
  marks?: boolean;
  /** Danh sách loại tứ giác cho phép chọn */
  kinds?: QuadKind[];
  /** Cắt ghép 4 góc để thấy tổng 360° */
  sum?: boolean;
}

export const QUAD_NAME: Record<QuadKind, string> = {
  free: 'Tứ giác bất kì',
  trap: 'Hình thang',
  rtrap: 'Hình thang vuông',
  isoTrap: 'Hình thang cân',
  para: 'Hình bình hành',
  rect: 'Hình chữ nhật',
  rhombus: 'Hình thoi',
  square: 'Hình vuông',
};

/** Các điểm được kéo trực tiếp cho từng loại tứ giác (các điểm còn lại suy ra) */
const HANDLES: Record<QuadKind, number[]> = {
  free: [0, 1, 2, 3],
  trap: [0, 1, 2, 3],
  rtrap: [0, 1, 2, 3],
  isoTrap: [0, 1, 2, 3],
  para: [0, 1, 2, 3],
  rect: [0, 1, 2, 3],
  rhombus: [0, 1, 2, 3],
  square: [0, 1, 2, 3],
};

/** Kéo điểm i tới q, giữ đúng tính chất của loại tứ giác. Thứ tự đỉnh A, B, C, D. */
export function moveQuad(kind: QuadKind, p: P[], i: number, q: P): P[] {
  const [A, B, Cc, D] = p;
  const n = [...p];
  switch (kind) {
    case 'free':
      n[i] = q;
      return n;
    case 'trap': {
      // AB // CD: C = D + s·u (u = hướng AB)
      const u0 = unit(sub(B, A));
      const s = dot(sub(Cc, D), u0);
      n[i] = q;
      const u = unit(sub(n[1], n[0]));
      if (i === 2) n[2] = project(q, n[3], add(n[3], u));
      else n[2] = add(n[3], mul(u, s));
      return n;
    }
    case 'rtrap': {
      // AB // CD, AD ⊥ AB: D = A + h·nrm, C = D + s·u
      const u0 = unit(sub(B, A));
      const nr0 = rot90(u0);
      const h = dot(sub(D, A), nr0);
      const s = dot(sub(Cc, D), u0);
      if (i === 0 || i === 1) {
        n[i] = q;
        const u = unit(sub(n[1], n[0]));
        const nr = rot90(u);
        n[3] = add(n[0], mul(nr, h));
        n[2] = add(n[3], mul(u, s));
      } else if (i === 3) {
        const hh = dot(sub(q, A), nr0);
        n[3] = add(A, mul(nr0, hh));
        n[2] = add(n[3], mul(u0, s));
      } else {
        n[2] = add(D, mul(u0, dot(sub(q, D), u0)));
      }
      return n;
    }
    case 'isoTrap': {
      n[i] = q;
      const m = mid(n[0], n[1]);
      const axisB = add(m, rot90(sub(n[1], n[0])));
      if (i === 2) n[3] = reflect(n[2], m, axisB);
      else if (i === 3) n[2] = reflect(n[3], m, axisB);
      else {
        // giữ D, dựng lại C đối xứng với D qua trục đối xứng của AB
        n[2] = reflect(n[3], m, axisB);
      }
      return n;
    }
    case 'para': {
      n[i] = q;
      if (i === 2) n[3] = add(n[0], sub(n[2], n[1]));
      else n[2] = add(n[1], sub(n[3], n[0]));
      return n;
    }
    case 'rect': {
      const nr0 = rot90(unit(sub(B, A)));
      let h = dot(sub(D, A), nr0);
      if (i === 3) h = dot(sub(q, A), nr0);
      if (i === 2) h = dot(sub(q, B), nr0);
      if (i === 0 || i === 1) n[i] = q;
      const nr = rot90(unit(sub(n[1], n[0])));
      n[3] = add(n[0], mul(nr, h));
      n[2] = add(n[1], mul(nr, h));
      return n;
    }
    case 'rhombus': {
      // Đường chéo AC; B, D đối xứng qua AC, nằm trên trung trực của AC
      const O = mid(A, Cc);
      const nr0 = rot90(unit(sub(Cc, A)));
      let hq = dot(sub(B, O), nr0);
      if (i === 1) hq = dot(sub(q, O), nr0);
      if (i === 3) hq = -dot(sub(q, O), nr0);
      if (i === 0 || i === 2) n[i] = q;
      const O2 = mid(n[0], n[2]);
      const nr = rot90(unit(sub(n[2], n[0])));
      n[1] = add(O2, mul(nr, hq));
      n[3] = add(O2, mul(nr, -hq));
      return n;
    }
    case 'square': {
      let v = sub(B, A);
      let a0 = A;
      if (i === 0) a0 = q;
      if (i === 1) v = sub(q, A);
      if (i === 3) {
        const w = sub(q, A);
        v = { x: -w.y, y: w.x };
      }
      if (i === 2) {
        const w = sub(q, A);
        v = { x: (w.x - w.y) / 2, y: (w.x + w.y) / 2 };
      }
      if (i === 0) v = sub(B, a0);
      const d = rot90(v);
      return [a0, add(a0, v), add(add(a0, v), d), add(a0, d)];
    }
  }
}

/** Nhận dạng tứ giác theo các tính chất đo được */
export function classifyQuad(p: P[]): QuadKind | 'concave' {
  const [A, B, Cc, D] = p;
  const cr = [0, 1, 2, 3].map((i) => cross(sub(p[(i + 1) % 4], p[i]), sub(p[(i + 2) % 4], p[(i + 1) % 4])));
  if (!(cr.every((c) => c > 0) || cr.every((c) => c < 0))) return 'concave';
  const par1 = isParallel(A, B, D, Cc);
  const par2 = isParallel(A, D, B, Cc);
  const s = [dist(A, B), dist(B, Cc), dist(Cc, D), dist(D, A)];
  const tol = 0.03 * Math.max(...s);
  const allEq = s.every((x) => near(x, s[0], tol));
  const ang = [angleAt(D, A, B), angleAt(A, B, Cc), angleAt(B, Cc, D), angleAt(Cc, D, A)];
  const right = ang.map((x) => near(x, 90, 1.2));
  if (par1 && par2) {
    if (right[0] && allEq) return 'square';
    if (right[0]) return 'rect';
    if (allEq) return 'rhombus';
    return 'para';
  }
  if (par1 || par2) {
    if (right.some((r) => r)) return 'rtrap';
    // hình thang cân: hai góc kề một đáy bằng nhau
    const iso = par1 ? near(ang[0], ang[1], 1.2) : near(ang[0], ang[3], 1.2);
    return iso ? 'isoTrap' : 'trap';
  }
  return 'free';
}

export function QuadView({ doc, onDoc, showValues }: EngineProps<QuadDoc, unknown>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const p = doc.p;
  const [A, B, Cc, D] = p;
  const names = ['A', 'B', 'C', 'D'];
  const ctr = { x: (A.x + B.x + Cc.x + D.x) / 4, y: (A.y + B.y + Cc.y + D.y) / 4 };
  const ang = [angleAt(D, A, B), angleAt(A, B, Cc), angleAt(B, Cc, D), angleAt(Cc, D, A)];
  const sides = [dist(A, B), dist(B, Cc), dist(Cc, D), dist(D, A)];
  const cls = classifyQuad(p);
  const O = (() => {
    const d1 = sub(Cc, A);
    const d2 = sub(D, B);
    const den = cross(d1, d2);
    if (Math.abs(den) < 1e-9) return null;
    const k = cross(sub(B, A), d2) / den;
    return add(A, mul(d1, k));
  })();
  const tol = 0.03 * Math.max(...sides);
  // nhóm cạnh bằng nhau để đánh dấu
  const tickN: number[] = [0, 0, 0, 0];
  let g = 0;
  for (let i = 0; i < 4; i++) {
    if (tickN[i]) continue;
    const same = [0, 1, 2, 3].filter((j) => !tickN[j] && near(sides[j], sides[i], tol));
    if (same.length > 1) {
      g++;
      same.forEach((j) => (tickN[j] = g));
    }
  }
  const par1 = isParallel(A, B, D, Cc);
  const par2 = isParallel(A, D, B, Cc);
  const sum = ang.reduce((s, x) => s + x, 0);
  const drag = (i: number) => (e: React.PointerEvent) =>
    start(e, (q) => {
      const qq = doc.kind === 'free' ? snap(clampP(q)) : clampP(q);
      onDoc({ ...doc, p: moveQuad(doc.kind, p, i, qq) });
    });
  const props: string[] = [];
  if (cls !== 'concave' && cls !== 'free') {
    if (par1 && par2) props.push('Các cạnh đối song song và bằng nhau');
    else if (par1 || par2) props.push('Có hai cạnh đối song song');
    if (cls === 'isoTrap') props.push('Hai góc kề một đáy bằng nhau; hai cạnh bên bằng nhau; hai đường chéo bằng nhau');
    if (cls === 'para' || cls === 'rect' || cls === 'rhombus' || cls === 'square') props.push('Các góc đối bằng nhau; hai đường chéo cắt nhau tại trung điểm mỗi đường');
    if (cls === 'rect' || cls === 'square') props.push('Bốn góc vuông; hai đường chéo bằng nhau');
    if (cls === 'rhombus' || cls === 'square') props.push('Bốn cạnh bằng nhau; hai đường chéo vuông góc và là phân giác các góc');
  }
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <DotGrid />
          <Poly pts={p} fill={C.soft[0]} stroke={C.a} w={4} />
          {doc.diag && (
            <g>
              <Line a={A} b={Cc} color={C.e} w={2.5} dash="10 6" />
              <Line a={B} b={D} color={C.e} w={2.5} dash="10 6" />
              {O && <Pt p={O} label="O" dx={22} dy={6} />}
              {O && showValues && doc.marks && (
                <g>
                  {near(dist(A, O), dist(O, Cc), tol * 0.5) && (
                    <>
                      <Ticks a={A} b={O} n={1} color={C.e} />
                      <Ticks a={O} b={Cc} n={1} color={C.e} />
                    </>
                  )}
                  {near(dist(B, O), dist(O, D), tol * 0.5) && (
                    <>
                      <Ticks a={B} b={O} n={2} color={C.e} />
                      <Ticks a={O} b={D} n={2} color={C.e} />
                    </>
                  )}
                  {Math.abs(dot(unit(sub(Cc, A)), unit(sub(D, B)))) < 0.02 && <Arc a={Cc} o={O} b={D} r={22} color={C.e} />}
                </g>
              )}
            </g>
          )}
          {doc.marks && showValues && (
            <g>
              {[0, 1, 2, 3].map((i) => (tickN[i] ? <Ticks key={i} a={p[i]} b={p[(i + 1) % 4]} n={tickN[i]} color={C.b} /> : null))}
              {par1 && (
                <>
                  <ParMark a={A} b={B} n={1} color={C.c} />
                  <ParMark a={D} b={Cc} n={1} color={C.c} />
                </>
              )}
              {par2 && (
                <>
                  <ParMark a={A} b={D} n={2} color={C.c} />
                  <ParMark a={B} b={Cc} n={2} color={C.c} />
                </>
              )}
            </g>
          )}
          {doc.angles &&
            p.map((v, i) => (
              <Arc key={i} a={p[(i + 3) % 4]} o={v} b={p[(i + 1) % 4]} r={30} color={C.solid[i + 2]} label={showValues ? fdeg(ang[i]) : '?'} fill />
            ))}
          {doc.sides &&
            [0, 1, 2, 3].map((i) => <SegLabel key={i} a={p[i]} b={p[(i + 1) % 4]} away={ctr} text={showValues ? `${fcm(sides[i])} cm` : '?'} />)}
          {p.map((v, i) => {
            const o = labelOff(v, ctr, 30);
            return <Pt key={i} p={v} label={names[i]} dx={o.dx} dy={o.dy} onDown={HANDLES[doc.kind].includes(i) ? drag(i) : undefined} />;
          })}
          {doc.sum && (
            <g transform="translate(960 150)">
              <text x={0} y={-70} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--ink)">
                Ghép bốn góc tại một điểm
              </text>
              {(() => {
                let a0 = 0;
                return ang.map((x, i) => {
                  const s0 = a0;
                  a0 += x;
                  const r = 80;
                  const p1 = { x: r * Math.cos((s0 * Math.PI) / 180), y: -r * Math.sin((s0 * Math.PI) / 180) };
                  const p2 = { x: r * Math.cos((a0 * Math.PI) / 180), y: -r * Math.sin((a0 * Math.PI) / 180) };
                  return <path key={i} d={`M 0 0 L ${p1.x} ${p1.y} A ${r} ${r} 0 ${x > 180 ? 1 : 0} 0 ${p2.x} ${p2.y} Z`} fill={C.solid[i + 2]} opacity={0.55} stroke="#fff" strokeWidth={2} />;
                });
              })()}
              <text x={0} y={130} textAnchor="middle" fontSize={24} fontWeight={900} fill={C.e}>
                {showValues ? `Tổng = ${Math.round(sum)}°` : 'Tổng = ?'}
              </text>
            </g>
          )}
          <text x={30} y={VH - 20} fontSize={22} fontWeight={900} fill={cls === 'concave' ? C.b : C.c}>
            {showValues ? (cls === 'concave' ? 'Tứ giác không lồi' : `Nhận dạng: ${QUAD_NAME[cls]}`) : 'Nhận dạng: ?'}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{QUAD_NAME[doc.kind]}</h3>
        {doc.kinds && doc.kinds.length > 1 && (
          <Row label="Dựng hình">
            <Seg
              value={doc.kind}
              options={doc.kinds}
              onChange={(k) => {
                // dựng lại các đỉnh cho đúng loại mới từ A, B, D hiện tại
                let np = [...p];
                np = moveQuad(k, np, 0, np[0]);
                if (k === 'rect' || k === 'rtrap') np = moveQuad(k, np, 3, np[3]);
                if (k === 'rhombus') np = moveQuad(k, np, 1, np[1]);
                onDoc({ ...doc, kind: k, p: np });
              }}
              fmtOpt={(k) => QUAD_NAME[k]}
            />
          </Row>
        )}
        <p className="small">Kéo các đỉnh. {doc.kind === 'free' ? 'Đỉnh tự bắt vào lưới để dễ tạo hình đặc biệt.' : 'Hình luôn giữ đúng tính chất của loại tứ giác đã chọn.'}</p>
        <Toggle value={!!doc.angles} onChange={(v) => onDoc({ ...doc, angles: v })} label="Số đo các góc" />
        <Toggle value={!!doc.sides} onChange={(v) => onDoc({ ...doc, sides: v })} label="Độ dài các cạnh" />
        <Toggle value={!!doc.diag} onChange={(v) => onDoc({ ...doc, diag: v })} label="Hai đường chéo" />
        <Toggle value={!!doc.marks} onChange={(v) => onDoc({ ...doc, marks: v })} label="Kí hiệu cạnh bằng nhau, song song" />
        <Toggle value={!!doc.sum} onChange={(v) => onDoc({ ...doc, sum: v })} label="Ghép bốn góc (tổng các góc)" />
        <MiniTable
          head={['', 'A', 'B', 'C', 'D']}
          rows={[
            ['Góc', ...ang.map((x) => (showValues ? fdeg(x) : '?'))],
            ['Cạnh', `AB ${showValues ? fcm(sides[0]) : '?'}`, `BC ${showValues ? fcm(sides[1]) : '?'}`, `CD ${showValues ? fcm(sides[2]) : '?'}`, `DA ${showValues ? fcm(sides[3]) : '?'}`],
          ]}
        />
        {doc.diag && <p className="small">Đường chéo: AC = {showValues ? fcm(dist(A, Cc)) : '?'} cm, BD = {showValues ? fcm(dist(B, D)) : '?'} cm.</p>}
        {showValues && props.length > 0 && (
          <div className="insp-row">
            <div className="insp-label">Tính chất quan sát được</div>
            <ul className="small" style={{ margin: 0, paddingLeft: 18 }}>
              {props.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="small muted">Diện tích: {showValues ? f2(polyArea(p) / UNIT / UNIT, 1) : '?'} cm²</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Định lí Thalès, đường trung bình của tam giác
// =====================================================================

export interface ThalesDoc {
  mode: 'thales';
  sub: 'thales' | 'converse' | 'mid' | 'ext';
  tri: P[];
  k: number;
  k2?: number;
  /** đường trung bình: hiện cả ba đường */
  all3?: boolean;
}

export function ThalesView({ doc, onDoc, showValues }: EngineProps<ThalesDoc, unknown>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const [A, B, Cc] = doc.tri;
  const isMid = doc.sub === 'mid';
  const k = isMid ? 0.5 : doc.k;
  const k2 = doc.sub === 'converse' ? (doc.k2 ?? 0.5) : k;
  const M = lerp(A, B, k);
  const N = lerp(A, Cc, k2);
  const ctr = { x: (A.x + B.x + Cc.x) / 3, y: (A.y + B.y + Cc.y) / 3 };
  const par = isParallel(M, N, B, Cc, 0.6);
  const AM = dist(A, M);
  const AB = dist(A, B);
  const AN = dist(A, N);
  const AC = dist(A, Cc);
  const MB = dist(M, B);
  const NC = dist(N, Cc);
  const MN = dist(M, N);
  const BC = dist(B, Cc);
  const dragV = (i: number) => (e: React.PointerEvent) => start(e, (q) => onDoc({ ...doc, tri: doc.tri.map((v, j) => (j === i ? clampP(q) : v)) }));
  const range = doc.sub === 'ext' ? [-0.9, 1.8] : [0.08, 0.92];
  const dragK = (which: 'k' | 'k2') => (e: React.PointerEvent) =>
    start(e, (q) => {
      const kk = which === 'k' ? projK(q, A, B) : projK(q, A, Cc);
      const v = Math.round(Math.max(range[0], Math.min(range[1], kk)) * 100) / 100;
      onDoc({ ...doc, [which]: v });
    });
  const P3 = mid(B, Cc);
  const r = (x: number) => (showValues ? f2(x, 2) : '?');
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <DotGrid />
          {doc.sub === 'ext' && (
            <g>
              <InfLine a={A} b={B} dash="4 6" />
              <InfLine a={A} b={Cc} dash="4 6" />
            </g>
          )}
          <Poly pts={[A, B, Cc]} fill={C.soft[0]} stroke={C.a} w={4} />
          {isMid && doc.all3 && (
            <g>
              <Line a={M} b={P3} color={C.d} w={4} />
              <Line a={N} b={P3} color={C.d} w={4} />
              <Pt p={P3} label="P" dy={34} />
            </g>
          )}
          {(doc.sub !== 'converse' || par) && <InfLine a={M} b={N} color={C.b} w={1.5} dash="6 6" />}
          <Line a={M} b={N} color={C.b} w={5} />
          {showValues && par && (
            <g>
              <ParMark a={M} b={N} color={C.c} />
              <ParMark a={B} b={Cc} color={C.c} />
            </g>
          )}
          {isMid && (
            <g>
              <Ticks a={A} b={M} n={1} color={C.b} />
              <Ticks a={M} b={B} n={1} color={C.b} />
              <Ticks a={A} b={N} n={2} color={C.b} />
              <Ticks a={N} b={Cc} n={2} color={C.b} />
            </g>
          )}
          <Pt p={A} label="A" {...labelOff(A, ctr, 30)} onDown={dragV(0)} />
          <Pt p={B} label="B" {...labelOff(B, ctr, 30)} onDown={dragV(1)} />
          <Pt p={Cc} label="C" {...labelOff(Cc, ctr, 30)} onDown={dragV(2)} />
          <Pt p={M} label="M" {...labelOff(M, mid(N, ctr), 30)} color={C.b} onDown={isMid ? undefined : dragK('k')} />
          <Pt p={N} label="N" {...labelOff(N, mid(M, ctr), 30)} color={C.b} onDown={doc.sub === 'converse' ? dragK('k2') : undefined} />
          {doc.sub === 'converse' && (
            <text x={30} y={VH - 20} fontSize={22} fontWeight={900} fill={par ? C.c : C.b}>
              {showValues ? (par ? 'AM/AB = AN/AC → MN // BC' : 'AM/AB ≠ AN/AC → MN không song song với BC') : 'MN có song song với BC không?'}
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{isMid ? 'Đường trung bình của tam giác' : doc.sub === 'converse' ? 'Định lí Thalès đảo' : doc.sub === 'ext' ? 'Hệ quả của định lí Thalès' : 'Định lí Thalès'}</h3>
        <p className="small">
          {isMid
            ? 'M, N là trung điểm của AB, AC. Kéo các đỉnh tam giác: MN luôn song song với BC và bằng nửa BC.'
            : doc.sub === 'converse'
              ? 'Kéo M trên AB và N trên AC. Khi nào MN song song với BC?'
              : 'Kéo điểm M trên cạnh AB; đường thẳng qua M song song với BC cắt AC tại N.'}
        </p>
        {isMid && <Toggle value={!!doc.all3} onChange={(v) => onDoc({ ...doc, all3: v })} label="Vẽ cả ba đường trung bình" />}
        <MiniTable
          head={['Đoạn', 'Độ dài (cm)']}
          rows={[
            ['AM', showValues ? fcm(AM) : '?'],
            ['MB', showValues ? fcm(MB) : '?'],
            ['AB', showValues ? fcm(AB) : '?'],
            ['AN', showValues ? fcm(AN) : '?'],
            ['NC', showValues ? fcm(NC) : '?'],
            ['AC', showValues ? fcm(AC) : '?'],
            ['MN', showValues ? fcm(MN) : '?'],
            ['BC', showValues ? fcm(BC) : '?'],
          ]}
        />
        <MiniTable
          head={['Tỉ số', 'Giá trị']}
          rows={
            isMid
              ? [
                  ['MN / BC', r(MN / BC)],
                  ['AM / AB', r(AM / AB)],
                  ['AN / AC', r(AN / AC)],
                ]
              : [
                  ['AM / AB', r(AM / AB)],
                  ['AN / AC', r(AN / AC)],
                  ['AM / MB', r(AM / MB)],
                  ['AN / NC', r(AN / NC)],
                  ['MN / BC', r(MN / BC)],
                ]
          }
        />
      </aside>
    </div>
  );
}

// =====================================================================
// Tính chất đường phân giác của tam giác
// =====================================================================

export interface BisectorDoc {
  mode: 'bisector';
  tri: P[];
}

export function BisectorView({ doc, onDoc, showValues }: EngineProps<BisectorDoc, unknown>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const [A, B, Cc] = doc.tri;
  const AB = dist(A, B);
  const AC = dist(A, Cc);
  const D = lerp(B, Cc, AB / (AB + AC));
  const ctr = { x: (A.x + B.x + Cc.x) / 3, y: (A.y + B.y + Cc.y) / 3 };
  const dragV = (i: number) => (e: React.PointerEvent) => start(e, (q) => onDoc({ ...doc, tri: doc.tri.map((v, j) => (j === i ? clampP(q) : v)) }));
  const DB = dist(D, B);
  const DC = dist(D, Cc);
  const r = (x: number) => (showValues ? f2(x, 2) : '?');
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <DotGrid />
          <Poly pts={[A, B, Cc]} fill={C.soft[0]} stroke={C.a} w={4} />
          <Line a={A} b={D} color={C.b} w={4} />
          <Arc a={B} o={A} b={D} r={46} color={C.d} />
          <Arc a={D} o={A} b={Cc} r={52} color={C.d} />
          <Line a={B} b={D} color={C.c} w={7} op={0.6} />
          <Line a={D} b={Cc} color={C.e} w={7} op={0.6} />
          <SegLabel a={A} b={B} away={Cc} text={showValues ? `${fcm(AB)}` : 'AB'} color={C.c} />
          <SegLabel a={A} b={Cc} away={B} text={showValues ? `${fcm(AC)}` : 'AC'} color={C.e} />
          <SegLabel a={B} b={D} away={A} text={showValues ? fcm(DB) : 'DB'} color={C.c} />
          <SegLabel a={D} b={Cc} away={A} text={showValues ? fcm(DC) : 'DC'} color={C.e} />
          <Pt p={A} label="A" {...labelOff(A, ctr, 30)} onDown={dragV(0)} />
          <Pt p={B} label="B" {...labelOff(B, ctr, 30)} onDown={dragV(1)} />
          <Pt p={Cc} label="C" {...labelOff(Cc, ctr, 30)} onDown={dragV(2)} />
          <Pt p={D} label="D" {...labelOff(D, A, 30)} color={C.b} />
          <text x={30} y={VH - 20} fontSize={24} fontWeight={900} fill={C.c} className="math-text">
            {showValues ? `DB/DC = ${f2(DB / DC)}   AB/AC = ${f2(AB / AC)}` : 'DB/DC = ?   AB/AC = ?'}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Đường phân giác của tam giác</h3>
        <p className="small">AD là tia phân giác của góc BAC (D thuộc BC). Kéo các đỉnh và so sánh hai tỉ số.</p>
        <MiniTable
          head={['', 'Giá trị']}
          rows={[
            ['AB', showValues ? fcm(AB) : '?'],
            ['AC', showValues ? fcm(AC) : '?'],
            ['DB', showValues ? fcm(DB) : '?'],
            ['DC', showValues ? fcm(DC) : '?'],
            ['DB / DC', r(DB / DC)],
            ['AB / AC', r(AB / AC)],
            ['Góc BAD', showValues ? fdeg(angleAt(B, A, D)) : '?'],
            ['Góc DAC', showValues ? fdeg(angleAt(D, A, Cc)) : '?'],
          ]}
        />
        <p className="small muted">Trong tam giác, đường phân giác của một góc chia cạnh đối diện thành hai đoạn thẳng tỉ lệ với hai cạnh kề hai đoạn ấy.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Tam giác đồng dạng
// =====================================================================

export interface SimilarDoc {
  mode: 'similar';
  sub: 'def' | 'ccc' | 'cgc' | 'gg' | 'free2' | 'right' | 'altitude';
  tri: P[];
  /** tam giác thứ hai (chỉ dùng khi free2) */
  tri2?: P[];
  k: number;
  rot: number;
  flip?: boolean;
  showAll?: boolean;
}

function similarImage(tri: P[], k: number, rotDeg: number, flip: boolean, center: P): P[] {
  const g = { x: (tri[0].x + tri[1].x + tri[2].x) / 3, y: (tri[0].y + tri[1].y + tri[2].y) / 3 };
  return tri.map((v) => {
    let d = sub(v, g);
    if (flip) d = { x: -d.x, y: d.y };
    d = rot(mul(d, k), rotDeg);
    return add(center, d);
  });
}

/** So khớp hai tam giác: xét 3 tỉ số cạnh tương ứng theo thứ tự đỉnh đã cho */
export function similarCheck(t1: P[], t2: P[]) {
  const s1 = [dist(t1[1], t1[2]), dist(t1[0], t1[2]), dist(t1[0], t1[1])];
  const s2 = [dist(t2[1], t2[2]), dist(t2[0], t2[2]), dist(t2[0], t2[1])];
  const ratios = s2.map((x, i) => x / s1[i]);
  const a1 = [angleAt(t1[1], t1[0], t1[2]), angleAt(t1[0], t1[1], t1[2]), angleAt(t1[0], t1[2], t1[1])];
  const a2 = [angleAt(t2[1], t2[0], t2[2]), angleAt(t2[0], t2[1], t2[2]), angleAt(t2[0], t2[2], t2[1])];
  const ok = ratios.every((r) => Math.abs(r - ratios[0]) < 0.03 * ratios[0]);
  return { s1, s2, ratios, a1, a2, ok };
}

export function SimilarView({ doc, onDoc, showValues }: EngineProps<SimilarDoc, unknown>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  let tri = doc.tri;
  const rightSub = doc.sub === 'right' || doc.sub === 'altitude';
  if (rightSub) {
    // tam giác vuông tại A: C nằm trên đường vuông góc với AB tại A
    const [A, B, Cc] = tri;
    const nr = rot90(unit(sub(B, A)));
    tri = [A, B, add(A, mul(nr, dot(sub(Cc, A), nr)))];
  }
  const [A, B, Cc] = tri;
  const tri2 = doc.sub === 'free2' && doc.tri2 ? doc.tri2 : similarImage(tri, doc.k, doc.rot, !!doc.flip, { x: 690, y: 360 });
  const chk = similarCheck(tri, tri2);
  const ctr1 = { x: (A.x + B.x + Cc.x) / 3, y: (A.y + B.y + Cc.y) / 3 };
  const ctr2 = { x: (tri2[0].x + tri2[1].x + tri2[2].x) / 3, y: (tri2[0].y + tri2[1].y + tri2[2].y) / 3 };
  const dragV = (i: number, second = false) => (e: React.PointerEvent) =>
    start(e, (q) => {
      if (second && doc.tri2) onDoc({ ...doc, tri2: doc.tri2.map((v, j) => (j === i ? snap(clampP(q)) : v)) });
      else onDoc({ ...doc, tri: doc.tri.map((v, j) => (j === i ? (doc.sub === 'free2' ? snap(clampP(q)) : clampP(q)) : v)) });
    });
  const names = ['A', 'B', 'C'];
  const names2 = ["A'", "B'", "C'"];
  // phần tử được "cho" theo từng trường hợp
  const showSide = (i: number) => doc.showAll || doc.sub === 'def' || doc.sub === 'free2' || doc.sub === 'ccc' || (doc.sub === 'cgc' && i !== 0) || (rightSub && i !== 1 && doc.sub === 'right');
  const showAng = (i: number) => doc.showAll || doc.sub === 'def' || doc.sub === 'free2' || (doc.sub === 'cgc' && i === 0) || (doc.sub === 'gg' && i !== 0) || (rightSub && (i === 0 || i === 1));
  const angCol = [C.d, C.c, C.e];
  const sideCol = [C.b, C.f, C.a];
  const drawTri = (t: P[], nm: string[], ctr: P, second: boolean, s: number[], a: number[]) => (
    <g>
      <Poly pts={t} fill={second ? C.soft[1] : C.soft[0]} stroke={second ? C.b : C.a} w={4} />
      {[0, 1, 2].map((i) =>
        showAng(i) ? <Arc key={`a${i}`} a={t[(i + 1) % 3]} o={t[i]} b={t[(i + 2) % 3]} r={30} n={i + 1} color={angCol[i]} label={showValues ? fdeg(a[i]) : undefined} /> : null,
      )}
      {[0, 1, 2].map((i) =>
        showSide(i) ? <SegLabel key={`s${i}`} a={t[(i + 1) % 3]} b={t[(i + 2) % 3]} away={t[i]} text={showValues ? fcm(s[i]) : '?'} color={sideCol[i]} /> : null,
      )}
      {t.map((v, i) => (
        <Pt key={i} p={v} label={nm[i]} {...labelOff(v, ctr, 30)} onDown={!second ? dragV(i) : doc.sub === 'free2' ? dragV(i, true) : undefined} color={second ? C.b : C.a} />
      ))}
    </g>
  );
  const H = rightSub ? project(A, B, Cc) : null;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <DotGrid />
          {doc.sub === 'altitude' && H ? (
            <g>
              <Poly pts={[A, B, Cc]} fill="none" stroke={C.a} w={4} />
              <Poly pts={[H, B, A]} fill={C.soft[1]} stroke="none" />
              <Poly pts={[H, A, Cc]} fill={C.soft[2]} stroke="none" />
              <Line a={A} b={H} color={C.b} w={4} />
              <Arc a={B} o={A} b={Cc} r={26} color={C.a} />
              <Arc a={A} o={H} b={Cc} r={22} color={C.b} />
              <Arc a={A} o={B} b={Cc} r={36} color={C.d} />
              <Arc a={A} o={Cc} b={B} r={36} n={2} color={C.c} />
              <Arc a={B} o={A} b={H} r={56} n={2} color={C.c} />
              <Arc a={H} o={A} b={Cc} r={60} color={C.d} />
              {[A, B, Cc].map((v, i) => (
                <Pt key={i} p={v} label={names[i]} {...labelOff(v, ctr1, 30)} onDown={dragV(i)} />
              ))}
              <Pt p={H} label="H" {...labelOff(H, A, 30)} />
              <foreignObject x={760} y={60} width={420} height={560}>
                <div className="fmap-box">
                  <b>Đường cao AH của tam giác ABC vuông tại A tạo ra:</b>
                  <p>
                    <span style={{ color: C.b }}>△HBA</span> ∽ △ABC ∽ <span style={{ color: C.c }}>△HAC</span>
                  </p>
                  <p className="small">(cùng có một góc vuông và một góc nhọn chung)</p>
                  <p>AB = {showValues ? fcm(dist(A, B)) : '?'}, AC = {showValues ? fcm(dist(A, Cc)) : '?'}, BC = {showValues ? fcm(dist(B, Cc)) : '?'}</p>
                  <p>HB = {showValues ? fcm(dist(H, B)) : '?'}, HC = {showValues ? fcm(dist(H, Cc)) : '?'}, AH = {showValues ? fcm(dist(A, H)) : '?'}</p>
                  {showValues && (
                    <>
                      <p className="math-side">AH² = {f2((dist(A, H) / UNIT) ** 2)} ; HB·HC = {f2((dist(H, B) * dist(H, Cc)) / UNIT / UNIT)}</p>
                      <p className="math-side">AB² = {f2((dist(A, B) / UNIT) ** 2)} ; BH·BC = {f2((dist(H, B) * dist(B, Cc)) / UNIT / UNIT)}</p>
                      <p className="math-side">AB·AC = {f2((dist(A, B) * dist(A, Cc)) / UNIT / UNIT)} ; BC·AH = {f2((dist(B, Cc) * dist(A, H)) / UNIT / UNIT)}</p>
                    </>
                  )}
                </div>
              </foreignObject>
            </g>
          ) : (
            <g>
              {drawTri(tri, names, ctr1, false, chk.s1, chk.a1)}
              {drawTri(tri2, names2, ctr2, true, chk.s2, chk.a2)}
              <text x={30} y={VH - 20} fontSize={22} fontWeight={900} fill={chk.ok ? C.c : C.b} className="math-text">
                {showValues ? (chk.ok ? `△A'B'C' ∽ △ABC, tỉ số đồng dạng k = ${f2(chk.ratios[0])}` : 'Hai tam giác không đồng dạng (theo thứ tự đỉnh này)') : '△A′B′C′ và △ABC có đồng dạng không?'}
              </text>
            </g>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{SIM_TITLE[doc.sub]}</h3>
        <p className="small">{SIM_HINT[doc.sub]}</p>
        {doc.sub !== 'free2' && doc.sub !== 'altitude' && (
          <>
            <Row label="Tỉ số đồng dạng k">
              <Slider value={doc.k} min={0.4} max={2} step={0.05} digits={2} onChange={(v) => onDoc({ ...doc, k: v })} />
            </Row>
            <Row label="Quay tam giác thứ hai">
              <Slider value={doc.rot} min={-180} max={180} step={5} digits={0} suffix="°" onChange={(v) => onDoc({ ...doc, rot: v })} />
            </Row>
            <Toggle value={!!doc.flip} onChange={(v) => onDoc({ ...doc, flip: v })} label="Lật tam giác thứ hai" />
            {doc.sub !== 'def' && <Toggle value={!!doc.showAll} onChange={(v) => onDoc({ ...doc, showAll: v })} label="Hiện tất cả các cạnh, các góc" />}
          </>
        )}
        {doc.sub !== 'altitude' && (
          <MiniTable
            head={['', 'ABC', "A'B'C'", 'Tỉ số']}
            rows={[
              ['BC', showValues ? fcm(chk.s1[0]) : '?', showValues ? fcm(chk.s2[0]) : '?', showValues ? f2(chk.ratios[0]) : '?'],
              ['CA', showValues ? fcm(chk.s1[1]) : '?', showValues ? fcm(chk.s2[1]) : '?', showValues ? f2(chk.ratios[1]) : '?'],
              ['AB', showValues ? fcm(chk.s1[2]) : '?', showValues ? fcm(chk.s2[2]) : '?', showValues ? f2(chk.ratios[2]) : '?'],
              ['Góc A', showValues ? fdeg(chk.a1[0]) : '?', showValues ? fdeg(chk.a2[0]) : '?', ''],
              ['Góc B', showValues ? fdeg(chk.a1[1]) : '?', showValues ? fdeg(chk.a2[1]) : '?', ''],
              ['Góc C', showValues ? fdeg(chk.a1[2]) : '?', showValues ? fdeg(chk.a2[2]) : '?', ''],
            ]}
          />
        )}
        {doc.sub !== 'altitude' && showValues && chk.ok && <p className="small">Tỉ số chu vi = {f2(chk.ratios[0])} = k; tỉ số diện tích = {f2(polyArea(tri2) / polyArea(tri))} = k².</p>}
      </aside>
    </div>
  );
}

const SIM_TITLE: Record<SimilarDoc['sub'], string> = {
  def: 'Hai tam giác đồng dạng',
  ccc: 'Trường hợp cạnh – cạnh – cạnh',
  cgc: 'Trường hợp cạnh – góc – cạnh',
  gg: 'Trường hợp góc – góc',
  free2: 'Kiểm tra hai tam giác đồng dạng',
  right: 'Đồng dạng của hai tam giác vuông',
  altitude: 'Đường cao trong tam giác vuông',
};
const SIM_HINT: Record<SimilarDoc['sub'], string> = {
  def: "Kéo các đỉnh của △ABC; △A'B'C' luôn đồng dạng với △ABC theo tỉ số k. Quan sát các góc tương ứng và tỉ số các cạnh tương ứng.",
  ccc: "Ba cạnh của △A'B'C' tỉ lệ với ba cạnh của △ABC (cùng tỉ số k) thì hai tam giác đồng dạng.",
  cgc: "Hai cạnh của △A'B'C' tỉ lệ với hai cạnh của △ABC và góc xen giữa bằng nhau thì hai tam giác đồng dạng.",
  gg: "Hai góc của △A'B'C' lần lượt bằng hai góc của △ABC thì hai tam giác đồng dạng.",
  free2: 'Kéo các đỉnh của cả hai tam giác (bắt vào lưới). So sánh các tỉ số cạnh tương ứng để kết luận.',
  right: 'Hai tam giác vuông đồng dạng nếu: có một góc nhọn bằng nhau, hoặc hai cạnh góc vuông tỉ lệ, hoặc cạnh huyền và một cạnh góc vuông tỉ lệ.',
  altitude: 'Kéo B, C (tam giác luôn vuông tại A). Đường cao AH chia tam giác thành hai tam giác vuông đồng dạng với tam giác ban đầu.',
};

// =====================================================================
// Định lí Pythagore
// =====================================================================

export interface PythagDoc {
  mode: 'pythag';
  sub: 'squares' | 'proof' | 'converse';
  a: number;
  b: number;
  c?: number;
  t: number;
  grid?: boolean;
}

export function PythagView({ doc, onDoc, showValues }: EngineProps<PythagDoc, unknown>) {
  const { a, b, t } = doc;
  const hyp = Math.hypot(a, b);
  let pic: React.ReactNode = null;
  if (doc.sub === 'squares') {
    const s = Math.min(40, 210 / Math.max(a, b, 1));
    const Cv = { x: 420, y: 400 };
    const Av = { x: Cv.x + a * s, y: Cv.y };
    const Bv = { x: Cv.x, y: Cv.y - b * s };
    const sq = (p: P, q: P, col: string, lab: string, area: number, n: number) => {
      // hình vuông dựng ra phía ngoài tam giác trên cạnh pq
      const d = sub(q, p);
      const nr0 = rot90(d);
      const g = { x: (Cv.x + Av.x + Bv.x) / 3, y: (Cv.y + Av.y + Bv.y) / 3 };
      const nr = dot(nr0, sub(g, p)) > 0 ? mul(nr0, -1) : nr0;
      const pts = [p, q, add(q, nr), add(p, nr)];
      const cc = add(mid(p, q), mul(nr, 0.5));
      const grid: React.ReactNode[] = [];
      if (doc.grid && n > 0 && Number.isInteger(n) && n <= 15)
        for (let i = 1; i < n; i++) {
          grid.push(<Line key={`g1${i}`} a={lerp(p, add(p, nr), i / n)} b={lerp(q, add(q, nr), i / n)} color={col} w={1} op={0.6} />);
          grid.push(<Line key={`g2${i}`} a={lerp(p, q, i / n)} b={lerp(add(p, nr), add(q, nr), i / n)} color={col} w={1} op={0.6} />);
        }
      return (
        <g>
          <Poly pts={pts} fill={col} op={0.22} stroke="none" />
          {grid}
          <Poly pts={pts} stroke={col} w={3} />
          <text x={cc.x} y={cc.y + 8} textAnchor="middle" fontSize={24} fontWeight={900} fill={col} className="math-text" stroke="var(--board)" strokeWidth={4} paintOrder="stroke">
            {lab}
            {showValues ? ` = ${f2(area, 2).replace(/,00$/, '')}` : ''}
          </text>
        </g>
      );
    };
    pic = (
      <g>
        {sq(Cv, Av, C.a, 'a²', a * a, a)}
        {sq(Bv, Cv, C.c, 'b²', b * b, b)}
        {sq(Av, Bv, C.b, 'c²', hyp * hyp, hyp)}
        <Poly pts={[Cv, Av, Bv]} fill="var(--surface)" stroke="var(--ink)" w={4} />
        <Arc a={Av} o={Cv} b={Bv} r={24} color="var(--ink)" />
        <SegLabel a={Cv} b={Av} text="a" away={Bv} off={-22} color={C.a} />
        <SegLabel a={Bv} b={Cv} text="b" away={Av} off={-22} color={C.c} />
        <SegLabel a={Av} b={Bv} text="c" away={Cv} off={-24} color={C.b} />
      </g>
    );
  } else if (doc.sub === 'proof') {
    const s = Math.min(48, 520 / (a + b));
    const S = a + b;
    const o = { x: 330 - (S * s) / 2, y: 340 - (S * s) / 2 };
    const conf1: [number, P][] = [
      [0, { x: 0, y: 0 }],
      [90, { x: S, y: 0 }],
      [180, { x: S, y: S }],
      [270, { x: 0, y: S }],
    ];
    const conf2: [number, P][] = [
      [0, { x: 0, y: a }],
      [90, { x: S, y: 0 }],
      [180, { x: a, y: S }],
      [270, { x: a, y: a }],
    ];
    const tris = conf1.map(([r1, p1], i) => {
      const [, p2] = conf2[i];
      const tr = lerp(p1, p2, t);
      const pts = [{ x: 0, y: 0 }, { x: a, y: 0 }, { x: 0, y: b }].map((v) => add(o, mul(add(rot(v, r1), tr), s)));
      return <Poly key={i} pts={pts} fill={C.solid[i]} op={0.75} stroke="#1f2937" w={2} />;
    });
    const big = [o, add(o, { x: S * s, y: 0 }), add(o, { x: S * s, y: S * s }), add(o, { x: 0, y: S * s })];
    const tilted = [{ x: a, y: 0 }, { x: S, y: a }, { x: b, y: S }, { x: 0, y: b }].map((v) => add(o, mul(v, s)));
    pic = (
      <g>
        <Poly pts={big} fill="var(--surface)" stroke="var(--ink)" w={3} />
        {t < 0.02 && (
          <g>
            <Poly pts={tilted} fill={C.soft[4]} stroke={C.e} w={2} />
            <text x={o.x + (S * s) / 2} y={o.y + (S * s) / 2 + 12} textAnchor="middle" fontSize={40} fontWeight={900} fill={C.e} className="math-text">
              c²
            </text>
          </g>
        )}
        {t > 0.98 && (
          <g>
            <rect x={o.x} y={o.y} width={a * s} height={a * s} fill={C.soft[0]} stroke={C.a} strokeWidth={2} />
            <text x={o.x + (a * s) / 2} y={o.y + (a * s) / 2 + 12} textAnchor="middle" fontSize={36} fontWeight={900} fill={C.a} className="math-text">
              a²
            </text>
            <rect x={o.x + a * s} y={o.y + a * s} width={b * s} height={b * s} fill={C.soft[2]} stroke={C.c} strokeWidth={2} />
            <text x={o.x + a * s + (b * s) / 2} y={o.y + a * s + (b * s) / 2 + 12} textAnchor="middle" fontSize={36} fontWeight={900} fill={C.c} className="math-text">
              b²
            </text>
          </g>
        )}
        {tris}
        <text x={o.x + (S * s) / 2} y={o.y - 16} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--ink)">
          Hình vuông cạnh a + b
        </text>
      </g>
    );
  } else {
    // đảo: tam giác có ba cạnh a, b, c
    const c = doc.c ?? 5;
    const s = Math.min(42, 480 / Math.max(a, b, c));
    const cosC = (a * a + b * b - c * c) / (2 * a * b);
    const valid = a + b > c && a + c > b && b + c > a;
    const angC = valid ? (Math.acos(Math.max(-1, Math.min(1, cosC))) * 180) / Math.PI : NaN;
    const Cv = { x: 220, y: 520 };
    const Bv = { x: Cv.x + a * s, y: Cv.y };
    const Av = { x: Cv.x + b * s * Math.cos((angC * Math.PI) / 180), y: Cv.y - b * s * Math.sin((angC * Math.PI) / 180) };
    pic = valid ? (
      <g>
        <Poly pts={[Av, Bv, Cv]} fill={C.soft[0]} stroke={C.a} w={4} />
        <Arc a={Bv} o={Cv} b={Av} r={34} color={near(angC, 90, 0.5) ? C.c : C.d} label={showValues ? fdeg(angC) : '?'} />
        <SegLabel a={Cv} b={Bv} text={`a = ${a}`} away={Av} color={C.a} />
        <SegLabel a={Cv} b={Av} text={`b = ${b}`} away={Bv} color={C.c} />
        <SegLabel a={Av} b={Bv} text={`c = ${c}`} away={Cv} color={C.b} />
        <Pt p={Av} label="A" dy={-18} />
        <Pt p={Bv} label="B" dx={18} dy={20} />
        <Pt p={Cv} label="C" dx={-18} dy={20} />
      </g>
    ) : (
      <text x={330} y={340} textAnchor="middle" fontSize={26} fontWeight={800} fill={C.b}>
        Ba độ dài này không tạo thành tam giác
      </text>
    );
  }
  const c = doc.c ?? 5;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {pic}
          <g transform="translate(760 70)">
            <rect x={0} y={0} width={410} height={540} rx={20} fill="var(--surface)" stroke="var(--line)" />
            {doc.sub === 'converse' ? (
              <g>
                <text x={205} y={60} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--muted)">
                  So sánh c² với a² + b²
                </text>
                <text x={40} y={130} fontSize={30} fontWeight={800} fill={C.b} className="math-text">
                  c² = {showValues ? c * c : '?'}
                </text>
                <text x={40} y={190} fontSize={30} fontWeight={800} fill={C.e} className="math-text">
                  a² + b² = {showValues ? a * a + b * b : '?'}
                </text>
                {showValues && (
                  <foreignObject x={30} y={230} width={350} height={280}>
                    <div className="fmap-box">
                      <p style={{ fontWeight: 800, color: c * c === a * a + b * b ? C.c : C.d }}>
                        {c * c === a * a + b * b ? 'c² = a² + b² → tam giác vuông tại C' : c * c > a * a + b * b ? 'c² > a² + b² → góc C tù' : 'c² < a² + b² → góc C nhọn'}
                      </p>
                      <p className="small">Định lí Pythagore đảo: nếu một tam giác có bình phương một cạnh bằng tổng bình phương hai cạnh kia thì tam giác đó là tam giác vuông.</p>
                    </div>
                  </foreignObject>
                )}
              </g>
            ) : (
              <g>
                <text x={205} y={60} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--muted)">
                  Tam giác vuông: hai cạnh góc vuông a, b
                </text>
                <text x={40} y={130} fontSize={28} fontWeight={800} fill={C.a} className="math-text">
                  a² = {showValues ? f2(a * a).replace(/,00$/, '') : '?'}
                </text>
                <text x={40} y={180} fontSize={28} fontWeight={800} fill={C.c} className="math-text">
                  b² = {showValues ? f2(b * b).replace(/,00$/, '') : '?'}
                </text>
                <text x={40} y={240} fontSize={28} fontWeight={800} fill={C.b} className="math-text">
                  c² = a² + b² = {showValues ? f2(a * a + b * b).replace(/,00$/, '') : '?'}
                </text>
                <text x={40} y={300} fontSize={28} fontWeight={800} fill={C.b} className="math-text">
                  c = {showValues ? f2(hyp) : '?'}
                </text>
                <foreignObject x={30} y={330} width={350} height={190}>
                  <div className="small" style={{ fontWeight: 600, color: 'var(--ink-2)' }}>
                    {doc.sub === 'proof'
                      ? 'Hai cách xếp 4 tam giác vuông giống nhau vào hình vuông cạnh a + b. Phần còn trống ở hai cách có diện tích bằng nhau: c² = a² + b².'
                      : 'Trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông.'}
                  </div>
                </foreignObject>
              </g>
            )}
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Định lí Pythagore</h3>
        <Row label="a">
          <Slider value={a} min={1} max={doc.sub === 'converse' ? 15 : 8} step={doc.sub === 'converse' ? 1 : 0.5} digits={1} onChange={(v) => onDoc({ ...doc, a: v })} />
        </Row>
        <Row label="b">
          <Slider value={b} min={1} max={doc.sub === 'converse' ? 15 : 8} step={doc.sub === 'converse' ? 1 : 0.5} digits={1} onChange={(v) => onDoc({ ...doc, b: v })} />
        </Row>
        {doc.sub === 'converse' && (
          <Row label="c">
            <Slider value={c} min={1} max={20} step={1} digits={0} onChange={(v) => onDoc({ ...doc, c: v })} />
          </Row>
        )}
        {doc.sub === 'proof' && (
          <Row label="Sắp xếp lại 4 tam giác">
            <Slider value={t} min={0} max={1} step={0.05} digits={2} onChange={(v) => onDoc({ ...doc, t: v })} />
          </Row>
        )}
        {doc.sub === 'squares' && <Toggle value={!!doc.grid} onChange={(v) => onDoc({ ...doc, grid: v })} label="Chia ô vuông đơn vị (khi độ dài là số nguyên)" />}
        <p className="small muted">{doc.sub === 'converse' ? 'Thử các bộ ba: (3, 4, 5), (5, 12, 13), (6, 8, 10), (4, 5, 6), (2, 3, 4).' : 'Thử a = 3, b = 4 hoặc a = 6, b = 8.'}</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Hình đồng dạng (phép vị tự): hình đồng dạng phối cảnh
// =====================================================================

export interface HomoDoc {
  mode: 'homothety';
  shape: string;
  shapes?: string[];
  O: P;
  k: number;
  rays?: boolean;
  /** quay thêm hình ảnh để thấy hai hình đồng dạng nhưng không phối cảnh */
  turn?: number;
}

export function HomothetyView({ doc, onDoc, showValues }: EngineProps<HomoDoc, unknown>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const sh = HOMO_SHAPES[doc.shape];
  const base = { x: 380, y: 340 };
  const pts = sh.pts.map(([x, y]) => ({ x: base.x + x * 1.6, y: base.y + y * 1.6 }));
  const img0 = pts.map((p) => add(doc.O, mul(sub(p, doc.O), doc.k)));
  const gc = img0.reduce((s, p) => add(s, mul(p, 1 / img0.length)), { x: 0, y: 0 });
  const img = doc.turn ? img0.map((p) => add(gc, rot(sub(p, gc), doc.turn!))) : img0;
  const per = (ps: P[]) => ps.reduce((s, p, i) => s + dist(p, ps[(i + 1) % ps.length]), 0);
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <DotGrid />
          {doc.rays && !doc.turn && pts.map((p, i) => <InfLine key={i} a={doc.O} b={p} color={C.soft[4].replace('0.18', '0.7')} w={1.5} dash="5 6" />)}
          <Poly pts={pts} fill={C.soft[0]} stroke={C.a} w={4} />
          <Poly pts={img} fill={C.soft[1]} stroke={C.b} w={4} />
          {sh.label.map((l, i) => (
            <g key={i}>
              <text x={pts[i].x} y={pts[i].y - 10} textAnchor="middle" fontSize={18} fontWeight={800} fill={C.a}>
                {l}
              </text>
              <text x={img[i].x} y={img[i].y - 10} textAnchor="middle" fontSize={18} fontWeight={800} fill={C.b}>
                {l}′
              </text>
            </g>
          ))}
          <Pt p={doc.O} label="O" color={C.e} onDown={(e) => start(e, (q) => onDoc({ ...doc, O: clampP(q) }))} />
          <text x={30} y={VH - 20} fontSize={22} fontWeight={900} fill={C.c}>
            {showValues ? `Tỉ số chu vi hình mới / hình ban đầu = ${f2(per(img) / per(pts))} = |k|; tỉ số diện tích = ${f2(polyArea(img) / polyArea(pts))} = k²` : 'Tỉ số chu vi, tỉ số diện tích = ?'}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Hình đồng dạng</h3>
        {doc.shapes && doc.shapes.length > 1 && (
          <Row label="Hình">
            <Seg value={doc.shape} options={doc.shapes} onChange={(v) => onDoc({ ...doc, shape: v })} fmtOpt={(k) => HOMO_SHAPES[k].name} />
          </Row>
        )}
        <Row label="Tỉ số k">
          <Slider value={doc.k} min={-2} max={2.5} step={0.25} digits={2} onChange={(v) => onDoc({ ...doc, k: v === 0 ? 0.25 : v })} />
        </Row>
        <Toggle value={!!doc.rays} onChange={(v) => onDoc({ ...doc, rays: v })} label="Vẽ các tia từ tâm O" />
        <Row label="Quay hình mới">
          <Slider value={doc.turn ?? 0} min={0} max={180} step={15} digits={0} suffix="°" onChange={(v) => onDoc({ ...doc, turn: v })} />
        </Row>
        <p className="small">
          Với mỗi điểm M của hình ban đầu, lấy M′ sao cho OM′ = k·OM (cùng hướng nếu k &gt; 0, ngược hướng nếu k &lt; 0). Hình gồm các điểm M′ <b>đồng dạng phối cảnh</b> với hình ban đầu, O là tâm phối cảnh.
        </p>
        <p className="small muted">Quay hoặc dời hình mới đi, ta vẫn được một hình đồng dạng với hình ban đầu.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Ứng dụng: đo chiều cao, khoảng cách
// =====================================================================

export interface HeightDoc {
  mode: 'height';
  sub: 'shadow' | 'stick' | 'river';
  /** shadow: chiều cao cọc h1, bóng cọc s1, bóng cây s2 (m) */
  h1: number;
  s1: number;
  s2: number;
}

export function HeightView({ doc, onDoc, showValues }: EngineProps<HeightDoc, unknown>) {
  const { h1, s1, s2 } = doc;
  const g = 560;
  let pic: React.ReactNode;
  let ans = '';
  let formula = '';
  if (doc.sub === 'shadow') {
    const H = (h1 * s2) / s1;
    const sc = Math.min(40, 420 / Math.max(H, 1), 700 / (s2 + s1 + 4));
    const treeX = 140;
    const stickX = treeX + (s2 + 2) * sc;
    const dir = { x: s1 * sc, y: h1 * sc };
    pic = (
      <g>
        <rect x={0} y={g} width={VW} height={VH - g} fill="#b7d99a" />
        <circle cx={1100} cy={80} r={40} fill="#fcd34d" />
        {/* cây */}
        <rect x={treeX - 8} y={g - H * sc * 0.75} width={16} height={H * sc * 0.75} fill="#92400e" />
        <ellipse cx={treeX} cy={g - H * sc * 0.75} rx={Math.max(20, H * sc * 0.18)} ry={H * sc * 0.25} fill="#16a34a" />
        <line x1={treeX} y1={g - H * sc} x2={treeX + s2 * sc} y2={g} stroke="#f59e0b" strokeWidth={3} strokeDasharray="8 5" />
        <line x1={treeX} y1={g + 8} x2={treeX + s2 * sc} y2={g + 8} stroke="#334155" strokeWidth={8} opacity={0.6} />
        {/* cọc */}
        <rect x={stickX - 4} y={g - h1 * sc} width={8} height={h1 * sc} fill="#475569" />
        <line x1={stickX} y1={g - h1 * sc} x2={stickX + dir.x} y2={g} stroke="#f59e0b" strokeWidth={3} strokeDasharray="8 5" />
        <line x1={stickX} y1={g + 8} x2={stickX + s1 * sc} y2={g + 8} stroke="#334155" strokeWidth={8} opacity={0.6} />
        <text x={treeX + (s2 * sc) / 2} y={g + 44} textAnchor="middle" className="lab-label">
          bóng cây {f2(s2, 1)} m
        </text>
        <text x={stickX + (s1 * sc) / 2} y={g + 44} textAnchor="middle" className="lab-label">
          bóng cọc {f2(s1, 1)} m
        </text>
        <text x={stickX - 12} y={g - (h1 * sc) / 2} textAnchor="end" className="lab-label">
          cọc {f2(h1, 1)} m
        </text>
        <text x={treeX - 30} y={g - (H * sc) / 2} textAnchor="end" fontSize={24} fontWeight={900} fill={C.b}>
          {showValues ? `${f2(H, 2)} m` : '? m'}
        </text>
      </g>
    );
    formula = 'Chiều cao cây / chiều cao cọc = bóng cây / bóng cọc';
    ans = `Chiều cao cây = ${f2(h1, 1)} · ${f2(s2, 1)} : ${f2(s1, 1)} = ${f2(H, 2)} m`;
  } else if (doc.sub === 'stick') {
    // ngắm: mắt E ở mặt đất (độ cao mắt bỏ qua), cọc cao h1 đặt cách mắt s1, cây cách mắt s2
    const H = (h1 * s2) / s1;
    const sc = Math.min(40, 440 / Math.max(H, 1), 900 / (s2 + 2));
    const E = { x: 120, y: g };
    pic = (
      <g>
        <rect x={0} y={g} width={VW} height={VH - g} fill="#b7d99a" />
        <line x1={E.x} y1={E.y} x2={E.x + s2 * sc} y2={g - H * sc} stroke={C.b} strokeWidth={2.5} strokeDasharray="8 6" />
        <rect x={E.x + s1 * sc - 4} y={g - h1 * sc} width={8} height={h1 * sc} fill="#475569" />
        <rect x={E.x + s2 * sc - 8} y={g - H * sc * 0.75} width={16} height={H * sc * 0.75} fill="#92400e" />
        <ellipse cx={E.x + s2 * sc} cy={g - H * sc * 0.75} rx={Math.max(20, H * sc * 0.18)} ry={H * sc * 0.25} fill="#16a34a" />
        <circle cx={E.x} cy={E.y - 6} r={8} fill={C.e} />
        <text x={E.x} y={E.y + 40} textAnchor="middle" className="lab-label">
          Mắt (A)
        </text>
        <text x={E.x + s1 * sc} y={g + 40} textAnchor="middle" className="lab-label">
          Cọc (B)
        </text>
        <text x={E.x + s2 * sc} y={g + 40} textAnchor="middle" className="lab-label">
          Cây (C)
        </text>
        <text x={E.x + s1 * sc + 12} y={g - (h1 * sc) / 2} className="lab-label">
          {f2(h1, 1)} m
        </text>
        <text x={E.x + s2 * sc + 30} y={g - (H * sc) / 2} fontSize={24} fontWeight={900} fill={C.b}>
          {showValues ? `${f2(H, 2)} m` : '? m'}
        </text>
        <text x={E.x + (s1 * sc) / 2} y={g + 72} textAnchor="middle" className="lab-small">
          AB = {f2(s1, 1)} m
        </text>
        <text x={E.x + (s2 * sc) / 2 + 60} y={g + 100} textAnchor="middle" className="lab-small">
          AC = {f2(s2, 1)} m
        </text>
      </g>
    );
    formula = 'Đỉnh cọc, đỉnh cây và mắt thẳng hàng: chiều cao cây / chiều cao cọc = AC / AB';
    ans = `Chiều cao cây = ${f2(h1, 1)} · ${f2(s2, 1)} : ${f2(s1, 1)} = ${f2(H, 2)} m`;
  } else {
    // đo khoảng cách qua sông: A (bờ bên kia), B, C trên bờ này; dựng DE // BC
    // BC = s2, DE = s1, BD = h1; AB/AD = BC/DE ⇒ AB = BD·BC/(DE − BC)
    const AB = (s2 * h1) / (s1 - s2);
    const W = AB;
    const sc = Math.min(30, 420 / (W + h1 + 2));
    const yA = 90;
    const yB = yA + W * sc;
    const yD = yB + h1 * sc;
    const xA = 420;
    pic = (
      <g>
        <rect x={0} y={yA + 30} width={VW} height={Math.max(10, yB - yA - 50)} fill="#93c5fd" opacity={0.6} />
        <circle cx={xA} cy={yA} r={10} fill={C.b} />
        <text x={xA} y={yA - 18} textAnchor="middle" className="lab-label">
          A (cây bên kia sông)
        </text>
        <line x1={xA} y1={yA} x2={xA} y2={yD} stroke="var(--ink)" strokeWidth={2} strokeDasharray="6 6" />
        <line x1={xA} y1={yA} x2={xA + s2 * sc * (yD - yA) / (yB - yA)} y2={yD} stroke="var(--ink)" strokeWidth={2} strokeDasharray="6 6" />
        <line x1={xA} y1={yB} x2={xA + s2 * sc} y2={yB} stroke={C.a} strokeWidth={4} />
        <line x1={xA} y1={yD} x2={xA + (s2 * sc * (yD - yA)) / (yB - yA)} y2={yD} stroke={C.c} strokeWidth={4} />
        {[
          [xA, yB, 'B'],
          [xA + s2 * sc, yB, 'C'],
          [xA, yD, 'D'],
          [xA + (s2 * sc * (yD - yA)) / (yB - yA), yD, 'E'],
        ].map(([x, y, l]) => (
          <g key={l as string}>
            <circle cx={x as number} cy={y as number} r={8} fill="var(--ink)" />
            <text x={(x as number) - 16} y={(y as number) + 6} textAnchor="end" fontSize={22} fontWeight={800} fontStyle="italic" fill="var(--ink)">
              {l}
            </text>
          </g>
        ))}
        <text x={xA + (s2 * sc) / 2} y={yB - 10} textAnchor="middle" fontSize={18} fontWeight={800} fill={C.a}>
          BC = {f2(s2, 1)} m
        </text>
        <text x={xA + (s1 * sc) / 2 + 40} y={yD + 30} textAnchor="middle" fontSize={18} fontWeight={800} fill={C.c}>
          DE = {f2(s1, 1)} m
        </text>
        <text x={xA - 30} y={(yB + yD) / 2} textAnchor="end" fontSize={18} fontWeight={800} fill="var(--ink-2)">
          BD = {f2(h1, 1)} m
        </text>
        <text x={xA - 30} y={(yA + yB) / 2} textAnchor="end" fontSize={24} fontWeight={900} fill={C.b}>
          AB = {showValues ? `${f2(W, 2)} m` : '?'}
        </text>
      </g>
    );
    formula = 'BC // DE nên AB / AD = BC / DE (định lí Thalès)';
    ans = `AB = ${f2(W, 2)} m`;
  }
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {pic}
          <foreignObject x={760} y={150} width={420} height={260}>
            <div className="fmap-box">
              <b>{doc.sub === 'shadow' ? 'Đo chiều cao bằng bóng nắng' : doc.sub === 'stick' ? 'Đo chiều cao bằng cọc ngắm' : 'Đo khoảng cách qua sông'}</b>
              <p>{formula}</p>
              <p style={{ color: C.b, fontWeight: 800 }}>{showValues ? ans : '?'}</p>
            </div>
          </foreignObject>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Đo gián tiếp</h3>
        {doc.sub === 'river' ? (
          <>
            <Row label="BC (m)">
              <Slider value={s2} min={2} max={10} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, s2: v })} />
            </Row>
            <Row label="DE (m)">
              <Slider value={s1} min={s2 + 0.5} max={20} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, s1: Math.max(v, s2 + 0.5) })} />
            </Row>
            <Row label="BD (m)">
              <Slider value={h1} min={1} max={10} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, h1: v })} />
            </Row>
            <p className="small muted">AB/AD = BC/DE ⇒ AB/(AB + BD) = BC/DE ⇒ AB = BD·BC/(DE − BC).</p>
          </>
        ) : (
          <>
            <Row label="Chiều cao cọc (m)">
              <Slider value={h1} min={0.5} max={3} step={0.1} digits={1} onChange={(v) => onDoc({ ...doc, h1: v })} />
            </Row>
            <Row label={doc.sub === 'shadow' ? 'Bóng cọc (m)' : 'Mắt → cọc AB (m)'}>
              <Slider value={s1} min={0.5} max={6} step={0.1} digits={1} onChange={(v) => onDoc({ ...doc, s1: v })} />
            </Row>
            <Row label={doc.sub === 'shadow' ? 'Bóng cây (m)' : 'Mắt → cây AC (m)'}>
              <Slider value={s2} min={2} max={20} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, s2: v })} />
            </Row>
          </>
        )}
      </aside>
    </div>
  );
}
