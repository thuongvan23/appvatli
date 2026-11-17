// Hình khối Toán 8 (Chương X): hình chóp tam giác đều, hình chóp tứ giác đều – quay xem 3D,
// các yếu tố (đỉnh, cạnh bên, mặt bên, mặt đáy, đường cao, trung đoạn), trải hình (khai triển),
// diện tích xung quanh, thể tích (đổ nước so sánh với hình lăng trụ cùng đáy, cùng chiều cao).
import { useRef } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, Toggle } from '../../ui/controls';
import { C, VH, VW, f2 } from './mcommon';

type V3 = [number, number, number];

export interface PyramidDoc {
  mode: 'pyramid';
  kind: 'tri' | 'sq';
  kinds?: ('tri' | 'sq')[];
  a: number;
  h: number;
  yaw: number;
  pitch: number;
  unfold: number;
  labels?: boolean;
  height?: boolean;
  apothem?: boolean;
  /** 'pour': so sánh thể tích bằng cách đổ nước */
  sub?: 'model' | 'pour';
  pours?: number;
}

export function pyramidMetrics(kind: 'tri' | 'sq', a: number, h: number) {
  const n = kind === 'tri' ? 3 : 4;
  const R = kind === 'tri' ? a / Math.sqrt(3) : a / Math.SQRT2; // bán kính đường tròn ngoại tiếp đáy
  const r = kind === 'tri' ? a / (2 * Math.sqrt(3)) : a / 2; // khoảng cách từ tâm đáy tới cạnh đáy
  const Sd = kind === 'tri' ? (Math.sqrt(3) / 4) * a * a : a * a;
  const d = Math.hypot(h, r); // trung đoạn
  const edge = Math.hypot(h, R); // cạnh bên
  const p = (n * a) / 2; // nửa chu vi đáy
  const Sxq = p * d;
  return { n, R, r, Sd, d, edge, p, Sxq, Stp: Sxq + Sd, V: (Sd * h) / 3 };
}

export function PyramidView({ doc, onDoc, showValues }: EngineProps<PyramidDoc, unknown>) {
  const dragRef = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);
  const M = pyramidMetrics(doc.kind, doc.a, doc.h);
  const { n, R, r } = M;
  const base: V3[] = Array.from({ length: n }, (_, i) => {
    const t = (2 * Math.PI * i) / n + (doc.kind === 'sq' ? Math.PI / 4 : Math.PI / 2);
    return [R * Math.cos(t), 0, R * Math.sin(t)];
  });
  const apex: V3 = [0, doc.h, 0];
  const u = doc.unfold;
  // mặt bên i trên cạnh base[i] – base[i+1], quay quanh cạnh đáy
  const faceApex = (i: number): V3 => {
    const p1 = base[i];
    const p2 = base[(i + 1) % n];
    const m: V3 = [(p1[0] + p2[0]) / 2, 0, (p1[2] + p2[2]) / 2];
    const len = Math.hypot(m[0], m[2]) || 1;
    const out: V3 = [m[0] / len, 0, m[2] / len];
    const phi0 = Math.PI - Math.atan2(doc.h, r);
    const phi = phi0 * (1 - u);
    return [m[0] + M.d * Math.cos(phi) * out[0], M.d * Math.sin(phi), m[2] + M.d * Math.cos(phi) * out[2]];
  };
  const S = Math.min(70, 300 / Math.max(doc.a, doc.h, 1) / (1 + u * 0.9));
  const cy = Math.cos((doc.yaw * Math.PI) / 180);
  const sy = Math.sin((doc.yaw * Math.PI) / 180);
  const cp = Math.cos((doc.pitch * Math.PI) / 180);
  const sp = Math.sin((doc.pitch * Math.PI) / 180);
  const view = ([x, y, z]: V3): V3 => {
    const x1 = x * cy - z * sy;
    const z1 = x * sy + z * cy;
    const y2 = y * cp - z1 * sp;
    const z2 = y * sp + z1 * cp;
    return [x1, y2, z2];
  };
  const ox = 400;
  const oy = 400 - (doc.h * S * (1 - u)) / 3;
  const proj = (p: V3) => {
    const [x, y, z] = view(p);
    return { x: ox + x * S, y: oy - y * S, z };
  };
  type Face = { pts: V3[]; color: string; label: string };
  const faces: Face[] = [{ pts: base, color: '#94a3b8', label: 'Mặt đáy' }];
  for (let i = 0; i < n; i++) faces.push({ pts: [base[i], base[(i + 1) % n], u > 0 ? faceApex(i) : apex], color: C.solid[i], label: `Mặt bên ${i + 1}` });
  const fp = faces.map((f) => {
    const pp = f.pts.map(proj);
    const z = pp.reduce((s, q) => s + q.z, 0) / pp.length;
    return { ...f, pp, z };
  });
  fp.sort((a, b) => b.z - a.z);
  const A = proj(apex);
  const O = proj([0, 0, 0]);
  const midE = proj([(base[0][0] + base[1][0]) / 2, 0, (base[0][2] + base[1][2]) / 2]);
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
  const vlabel = doc.kind === 'tri' ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D'];
  const name = doc.kind === 'tri' ? 'Hình chóp tam giác đều' : 'Hình chóp tứ giác đều';
  const val = (x: number, unit: string) => (showValues ? `${f2(x, 2)} ${unit}` : '?');
  if (doc.sub === 'pour') {
    const k = doc.pours ?? 0;
    const W = 220;
    const H = 300;
    return (
      <div className="eng">
        <div className="eng-stage lab-bg">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
            <text x={600} y={40} textAnchor="middle" className="lab-label">
              Hình chóp và hình lăng trụ có cùng đáy, cùng chiều cao
            </text>
            <g transform="translate(330 560)">
              <path d={`M ${-W / 2} 0 L ${W / 2} 0 L 0 ${-H} Z`} fill={k < 3 ? '#60a5fa' : C.soft[0]} fillOpacity={0.7} stroke={C.a} strokeWidth={4} />
              <text y={50} textAnchor="middle" className="lab-label">
                Hình chóp (đầy nước)
              </text>
            </g>
            <g transform="translate(800 560)">
              <rect x={-W / 2} y={-H} width={W} height={H} fill="none" stroke={C.b} strokeWidth={4} />
              <rect x={-W / 2 + 3} y={(-H * k) / 3} width={W - 6} height={(H * k) / 3} fill="#60a5fa" opacity={0.7} />
              {[1, 2].map((j) => (
                <line key={j} x1={-W / 2 - 14} x2={-W / 2} y1={(-H * j) / 3} y2={(-H * j) / 3} stroke="var(--ink-2)" strokeWidth={2} />
              ))}
              <text y={50} textAnchor="middle" className="lab-label">
                Hình lăng trụ
              </text>
              <text x={W / 2 + 20} y={-H / 2} fontSize={24} fontWeight={900} fill={C.b}>
                {k}/3
              </text>
            </g>
            <text x={600} y={640} textAnchor="middle" fontSize={22} fontWeight={800} fill={k === 3 ? C.c : 'var(--ink-2)'}>
              {k === 3 ? (showValues ? 'Đổ 3 lần thì đầy: V(chóp) = 1/3 · V(lăng trụ) = 1/3 · S·h' : 'Đổ mấy lần thì đầy?') : `Đã đổ ${k} lần nước từ hình chóp sang hình lăng trụ`}
            </text>
          </svg>
        </div>
        <aside className="eng-side">
          <h3>So sánh thể tích</h3>
          <div className="insp-actions">
            <button className="btn primary" disabled={k >= 3} onClick={() => onDoc({ ...doc, pours: k + 1 })}>
              Đổ nước 1 lần
            </button>
            <button className="btn" onClick={() => onDoc({ ...doc, pours: 0 })}>
              Làm lại
            </button>
          </div>
          <p className="small">Đổ đầy nước vào hình chóp rồi rót sang hình lăng trụ có cùng diện tích đáy, cùng chiều cao. Cần đổ mấy lần thì đầy hình lăng trụ?</p>
        </aside>
      </div>
    );
  }
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg" onPointerDown={onDown} style={{ cursor: 'grab' }}>
          <text x={400} y={40} textAnchor="middle" className="lab-label">
            {name} {u > 0.98 ? '– hình khai triển' : ''}
          </text>
          {fp.map((f, i) => (
            <g key={i}>
              <polygon points={f.pp.map((q) => `${q.x},${q.y}`).join(' ')} fill={f.color} fillOpacity={0.28} stroke={f.color} strokeWidth={2} strokeLinejoin="round" />
            </g>
          ))}
          {fp.flatMap((f, i) =>
            f.pp.map((q, j) => {
              const q2 = f.pp[(j + 1) % f.pp.length];
              return <line key={`${i}-${j}`} x1={q.x} y1={q.y} x2={q2.x} y2={q2.y} stroke="var(--ink)" strokeWidth={2.5} strokeLinecap="round" />;
            }),
          )}
          {u === 0 && doc.height && (
            <g>
              <line x1={A.x} y1={A.y} x2={O.x} y2={O.y} stroke={C.b} strokeWidth={3} strokeDasharray="8 5" />
              <circle cx={O.x} cy={O.y} r={5} fill={C.b} />
              <text x={O.x + 10} y={O.y + 22} fontSize={20} fontWeight={800} fill={C.b} fontStyle="italic">
                H
              </text>
              <text x={(A.x + O.x) / 2 + 8} y={(A.y + O.y) / 2} fontSize={20} fontWeight={800} fill={C.b}>
                h
              </text>
            </g>
          )}
          {u === 0 && doc.apothem && (
            <g>
              <line x1={A.x} y1={A.y} x2={midE.x} y2={midE.y} stroke={C.e} strokeWidth={3.5} />
              <circle cx={midE.x} cy={midE.y} r={5} fill={C.e} />
              <text x={(A.x + midE.x) / 2 + 10} y={(A.y + midE.y) / 2} fontSize={20} fontWeight={800} fill={C.e}>
                d
              </text>
            </g>
          )}
          {doc.labels && u === 0 && (
            <g>
              <text x={A.x} y={A.y - 14} textAnchor="middle" fontSize={24} fontWeight={800} fontStyle="italic" fill="var(--ink)">
                S
              </text>
              {base.map((b, i) => {
                const q = proj(b);
                const d = { x: q.x - O.x, y: q.y - O.y };
                const l = Math.hypot(d.x, d.y) || 1;
                return (
                  <text key={i} x={q.x + (d.x / l) * 22} y={q.y + (d.y / l) * 22 + 8} textAnchor="middle" fontSize={24} fontWeight={800} fontStyle="italic" fill="var(--ink)">
                    {vlabel[i]}
                  </text>
                );
              })}
            </g>
          )}
          <g transform="translate(790 70)">
            <rect x={0} y={0} width={380} height={560} rx={20} fill="var(--surface)" stroke="var(--line)" />
            {[
              ['Cạnh đáy a', `${f2(doc.a, 1)} cm`, 'var(--ink)'],
              ['Chiều cao h', `${f2(doc.h, 1)} cm`, C.b],
              ['Trung đoạn d', val(M.d, 'cm'), C.e],
              ['Cạnh bên', val(M.edge, 'cm'), 'var(--ink)'],
              ['Diện tích đáy S', val(M.Sd, 'cm²'), '#64748b'],
              ['S xung quanh = p·d', val(M.Sxq, 'cm²'), C.d],
              ['S toàn phần', val(M.Stp, 'cm²'), C.d],
              ['Thể tích V = ⅓·S·h', val(M.V, 'cm³'), C.c],
            ].map(([k, v, c], i) => (
              <g key={k} transform={`translate(24 ${50 + i * 64})`}>
                <text fontSize={18} fontWeight={800} fill="var(--muted)">
                  {k}
                </text>
                <text x={330} y={0} textAnchor="end" fontSize={24} fontWeight={900} fill={c}>
                  {v}
                </text>
              </g>
            ))}
            <text x={24} y={555 - 20} fontSize={15} fill="var(--muted)">
              p: nửa chu vi đáy = {showValues ? f2(M.p, 2) : '?'} cm
            </text>
          </g>
          <text x={20} y={VH - 16} fontSize={15} fill="var(--muted)">
            Kéo trên hình để xoay
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{name}</h3>
        {doc.kinds && doc.kinds.length > 1 && (
          <Row label="Loại hình chóp">
            <Seg value={doc.kind} options={doc.kinds} onChange={(k) => onDoc({ ...doc, kind: k })} fmtOpt={(k) => (k === 'tri' ? 'Tam giác đều' : 'Tứ giác đều')} />
          </Row>
        )}
        <Row label="Cạnh đáy a (cm)">
          <Slider value={doc.a} min={1} max={8} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, a: v })} />
        </Row>
        <Row label="Chiều cao h (cm)">
          <Slider value={doc.h} min={1} max={8} step={0.5} digits={1} onChange={(v) => onDoc({ ...doc, h: v })} />
        </Row>
        <Row label="Trải hình (khai triển)">
          <Slider value={u} min={0} max={1} step={0.05} digits={2} onChange={(v) => onDoc({ ...doc, unfold: v, pitch: v > 0.5 ? Math.max(doc.pitch, 70) : doc.pitch })} />
        </Row>
        <Toggle value={!!doc.labels} onChange={(v) => onDoc({ ...doc, labels: v })} label="Tên các đỉnh" />
        <Toggle value={!!doc.height} onChange={(v) => onDoc({ ...doc, height: v })} label="Đường cao SH" />
        <Toggle value={!!doc.apothem} onChange={(v) => onDoc({ ...doc, apothem: v })} label="Trung đoạn d" />
        <p className="small muted">
          {doc.kind === 'tri' ? 'Hình chóp tam giác đều: đáy là tam giác đều, các mặt bên là những tam giác cân bằng nhau có chung đỉnh.' : 'Hình chóp tứ giác đều: đáy là hình vuông, các mặt bên là những tam giác cân bằng nhau có chung đỉnh.'}
        </p>
      </aside>
    </div>
  );
}
