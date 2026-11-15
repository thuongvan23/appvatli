// Tốc độ (KHTN 7 Bài 1, 8–11): đo thời gian bằng cổng quang và đồng hồ bấm giây, so sánh tốc độ,
// đồ thị quãng đường – thời gian, khoảng cách an toàn, thiết bị "bắn tốc độ".
import { useEffect, useMemo, useRef, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider } from '../../ui/controls';
import { Arrow, Lcd, VH, VW, fixed, jitter, useRaf, vn } from './common';

// =====================================================================
// Đo thời gian – đo tốc độ
// =====================================================================

export interface TimerDoc {
  mode: 'timer';
  method: 'gate' | 'stopwatch';
  /** gate: khoảng cách hai cổng quang (cm); stopwatch: quãng đường chạy (m) */
  s: number;
  /** tốc độ đẩy xe / tốc độ người chạy (m/s) */
  v: number;
  /** cho phép đổi cách đo */
  lockMethod?: boolean;
}

export function TimerView({ doc, onDoc, showValues, onMeasure }: EngineProps<TimerDoc, unknown>) {
  const gate = doc.method === 'gate';
  const [runs, setRuns] = useState(0);
  const [st, setSt] = useState<{ p: number; t: number; running: boolean; shown: number; done: boolean }>({ p: 0, t: 0, running: false, shown: 0, done: false });
  // tốc độ thật lần chạy này (có sai lệch nhỏ)
  const vReal = doc.v * (1 + jitter(runs + doc.s, 0.025));
  // gate: đơn vị cm; stopwatch: đơn vị m
  const L = gate ? 120 : Math.max(doc.s + 10, 70);
  const A = gate ? 20 : 0;
  const B = gate ? 20 + doc.s : doc.s;
  const speed = gate ? vReal * 100 : vReal;
  const delay1 = gate ? 0 : 0.2 + jitter(runs * 3 + 1, 0.08);
  const delay2 = gate ? 0 : 0.22 + jitter(runs * 7 + 2, 0.1);
  const tTrue = (B - A) / speed;
  const tMeas = Math.max(0, tTrue + delay2 - delay1);

  useEffect(() => setSt({ p: 0, t: 0, running: false, shown: 0, done: false }), [doc.method, doc.s, doc.v]);

  useRaf((dt) => {
    setSt((s) => {
      if (!s.running) return s;
      const t = s.t + dt;
      const p = Math.min(L - (gate ? 12 : 2), (gate ? 0 : 0) + speed * t);
      // thời gian hiện trên đồng hồ
      const tA = (A - 0) / speed + delay1;
      const shown = t < tA ? 0 : Math.min(tMeas, t - tA);
      const done = t >= tA + tMeas + 0.05 && p >= B;
      const end = p >= L - (gate ? 12 : 2);
      return { p, t, running: !end, shown, done: done || s.done };
    });
  }, st.running);

  useEffect(() => {
    if (st.done) onMeasure?.({ s: gate ? doc.s / 100 : doc.s, t: tMeas, v: (gate ? doc.s / 100 : doc.s) / tMeas });
  }, [st.done, tMeas, doc.s, gate, onMeasure]);

  const x0 = 110;
  const x1 = 1090;
  const X = (u: number) => x0 + ((x1 - x0) * u) / L;
  const trackY = gate ? 430 : 470;
  const go = () => {
    setRuns((r) => r + 1);
    setSt({ p: 0, t: 0, running: true, shown: 0, done: false });
  };
  const disp = gate ? fixed(st.shown, 2) : fixed(st.shown, 2);
  const sM = gate ? doc.s / 100 : doc.s;

  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          {gate ? (
            <g>
              {/* máng / thanh ray */}
              <rect x={x0 - 20} y={trackY} width={x1 - x0 + 40} height={18} rx={4} fill="#9aa5b1" stroke="#5b6672" />
              {Array.from({ length: 13 }, (_, k) => (
                <g key={k}>
                  <line x1={X(k * 10)} x2={X(k * 10)} y1={trackY + 18} y2={trackY + 32} stroke="var(--ink-2)" strokeWidth={2} />
                  <text x={X(k * 10)} y={trackY + 52} textAnchor="middle" className="tick-small">
                    {k * 10}
                  </text>
                </g>
              ))}
              <text x={x1 + 10} y={trackY + 52} className="tick-small">
                cm
              </text>
              <rect x={0} y={630} width={VW} height={50} className="lab-table" />
              <line x1={x0 - 20} y1={trackY + 18} x2={x0 - 20} y2={630} stroke="#5b6672" strokeWidth={6} />
              <line x1={x1 + 20} y1={trackY + 18} x2={x1 + 20} y2={630} stroke="#5b6672" strokeWidth={6} />
              {/* cổng quang A, B */}
              {[
                { u: A, n: 'A' },
                { u: B, n: 'B' },
              ].map((g) => (
                <g key={g.n}>
                  <path d={`M ${X(g.u) - 26} ${trackY + 4} L ${X(g.u) - 26} ${trackY - 110} L ${X(g.u) + 26} ${trackY - 110} L ${X(g.u) + 26} ${trackY + 4}`} fill="none" stroke="#2b2f36" strokeWidth={10} strokeLinejoin="round" />
                  <rect x={X(g.u) - 34} y={trackY - 70} width={14} height={22} rx={3} fill="#e63946" />
                  <rect x={X(g.u) + 20} y={trackY - 70} width={14} height={22} rx={3} fill="#e63946" />
                  <line x1={X(g.u) - 20} y1={trackY - 59} x2={X(g.u) + 20} y2={trackY - 59} stroke="#ff4d4d" strokeWidth={2} strokeDasharray="4 4" opacity={0.8} />
                  <text x={X(g.u)} y={trackY - 122} textAnchor="middle" className="lab-label">
                    Cổng quang {g.n}
                  </text>
                  <path d={`M ${X(g.u)} ${trackY - 114} C ${X(g.u)} ${trackY - 200}, 600 ${trackY - 160}, 600 ${150}`} fill="none" stroke="#333" strokeWidth={3} opacity={0.5} />
                </g>
              ))}
              {/* xe lăn */}
              <g transform={`translate(${X(st.p)} ${trackY})`}>
                <rect x={-12 * ((x1 - x0) / L)} y={-46} width={12 * ((x1 - x0) / L)} height={34} rx={6} fill="#1d6fe0" stroke="#0b3d91" strokeWidth={2} />
                <rect x={-4} y={-74} width={4} height={30} fill="#0b3d91" />
                <circle cx={-9 * ((x1 - x0) / L)} cy={-6} r={8} fill="#333" />
                <circle cx={-3 * ((x1 - x0) / L)} cy={-6} r={8} fill="#333" />
              </g>
              <text x={X(A + doc.s / 2)} y={trackY + 86} textAnchor="middle" className="lab-label">
                s = {doc.s} cm
              </text>
              <Arrow x1={X(A) + 4} y1={trackY + 66} x2={X(B) - 4} y2={trackY + 66} color="var(--accent)" width={3} head={12} />
              <Arrow x1={X(B) - 4} y1={trackY + 66} x2={X(A) + 4} y2={trackY + 66} color="var(--accent)" width={3} head={12} />
              {/* đồng hồ đo thời gian hiện số */}
              <g transform="translate(420 40)">
                <rect x={0} y={0} width={360} height={150} rx={14} fill="#e9edf2" stroke="#7a8794" strokeWidth={3} />
                <Lcd x={20} y={20} w={200} h={70} text={disp} />
                <text x={230} y={50} className="tick-small">
                  THANG ĐO
                </text>
                <text x={230} y={70} className="tick-small">
                  99,99 s – 0,01 s
                </text>
                <text x={230} y={100} className="tick-small">
                  MODE: A ↔ B
                </text>
                <circle cx={320} cy={125} r={12} fill="#e63946" />
                <text x={290} y={130} textAnchor="end" className="tick-small">
                  RESET
                </text>
                <text x={20} y={130} className="tick-small">
                  Đồng hồ đo thời gian hiện số
                </text>
              </g>
            </g>
          ) : (
            <g>
              {/* đường chạy */}
              <rect x={0} y={trackY - 120} width={VW} height={200} fill="#c0533d" opacity={0.85} />
              {[0, 1, 2].map((k) => (
                <line key={k} x1={0} x2={VW} y1={trackY - 120 + k * 100} y2={trackY - 120 + k * 100} stroke="#fff" strokeWidth={4} />
              ))}
              <rect x={0} y={trackY + 80} width={VW} height={VH} fill="#7fb36a" />
              <line x1={X(A)} x2={X(A)} y1={trackY - 120} y2={trackY + 80} stroke="#fff" strokeWidth={8} />
              <line x1={X(B)} x2={X(B)} y1={trackY - 120} y2={trackY + 80} stroke="#fff" strokeWidth={8} strokeDasharray="16 10" />
              <text x={X(A)} y={trackY - 132} textAnchor="middle" className="lab-label">
                Vạch xuất phát
              </text>
              <text x={X(B)} y={trackY - 132} textAnchor="middle" className="lab-label">
                Vạch đích
              </text>
              {Array.from({ length: Math.floor(L / 10) + 1 }, (_, k) => (
                <text key={k} x={X(k * 10)} y={trackY + 110} textAnchor="middle" className="tick-small">
                  {k * 10} m
                </text>
              ))}
              {/* người chạy */}
              <g transform={`translate(${X(Math.min(st.p, L))} ${trackY - 20})`}>
                <circle cx={0} cy={-58} r={14} fill="#f2c48d" stroke="#333" strokeWidth={2} />
                <line x1={0} y1={-44} x2={-4} y2={-4} stroke="#1d6fe0" strokeWidth={10} strokeLinecap="round" />
                {(() => {
                  const ph = Math.sin(st.t * 14) * (st.running ? 1 : 0);
                  return (
                    <g stroke="#333" strokeWidth={6} strokeLinecap="round">
                      <line x1={-4} y1={-4} x2={-4 + 18 * ph} y2={30} />
                      <line x1={-4} y1={-4} x2={-4 - 18 * ph} y2={30} />
                      <line x1={-2} y1={-36} x2={-2 - 18 * ph} y2={-14} />
                      <line x1={-2} y1={-36} x2={-2 + 18 * ph} y2={-14} />
                    </g>
                  );
                })()}
              </g>
              {/* đồng hồ bấm giây */}
              <g transform="translate(600 150)">
                <rect x={-12} y={-112} width={24} height={20} rx={4} fill="#666" />
                <circle r={92} fill="#e9edf2" stroke="#555" strokeWidth={6} />
                <Lcd x={-74} y={-30} w={148} h={60} text={disp} color="#2bdc4a" />
                <text y={58} textAnchor="middle" className="tick-small">
                  Đồng hồ bấm giây
                </text>
              </g>
              <text x={600} y={290} textAnchor="middle" className="lab-small">
                Người bấm giờ: bấm khi thấy xuất phát, bấm dừng khi người chạy qua vạch đích
              </text>
            </g>
          )}
          {showValues && st.done && (
            <text x={600} y={gate ? 240 : 650} textAnchor="middle" fontSize={30} fontWeight={800} fill="var(--accent)">
              v = s / t = {vn(sM, 2)} m / {fixed(tMeas, 2)} s ≈ {vn(sM / tMeas, 2)} m/s
            </text>
          )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{gate ? 'Đo tốc độ bằng cổng quang' : 'Đo tốc độ bằng đồng hồ bấm giây'}</h3>
        {!doc.lockMethod && (
          <Row label="Cách đo">
            <Seg value={doc.method} options={['gate', 'stopwatch'] as const} onChange={(m) => onDoc({ ...doc, method: m, s: m === 'gate' ? 50 : 60, v: m === 'gate' ? 0.5 : 6 })} fmtOpt={(m) => (m === 'gate' ? 'Cổng quang + đồng hồ hiện số' : 'Đồng hồ bấm giây')} />
          </Row>
        )}
        <Row label={gate ? 'Khoảng cách hai cổng quang s' : 'Quãng đường chạy s'}>
          {gate ? <Slider value={doc.s} min={10} max={90} step={5} digits={0} suffix="cm" onChange={(v) => onDoc({ ...doc, s: v })} /> : <Seg value={doc.s} options={[20, 30, 60] as const} onChange={(v) => onDoc({ ...doc, s: v })} fmtOpt={(v) => `${v} m`} />}
        </Row>
        <Row label={gate ? 'Lực đẩy xe' : 'Người chạy'}>
          {gate ? (
            <Seg value={doc.v} options={[0.3, 0.5, 0.8] as const} onChange={(v) => onDoc({ ...doc, v })} fmtOpt={(v) => (v === 0.3 ? 'Nhẹ' : v === 0.5 ? 'Vừa' : 'Mạnh')} />
          ) : (
            <Seg value={doc.v} options={[4, 6, 7.5] as const} onChange={(v) => onDoc({ ...doc, v })} fmtOpt={(v) => (v === 4 ? 'Chạy chậm' : v === 6 ? 'Chạy vừa' : 'Chạy nhanh')} />
          )}
        </Row>
        <div className="insp-actions">
          <button className="btn primary" onClick={go} disabled={st.running}>
            {gate ? 'Thả xe' : 'Xuất phát'}
          </button>
          <button className="btn" onClick={() => setSt({ p: 0, t: 0, running: false, shown: 0, done: false })}>
            RESET
          </button>
        </div>
        <div className="insp-values">
          <div>
            <span>s</span>
            <b>{vn(sM, 2)} m</b>
          </div>
          <div>
            <span>t</span>
            <b>{st.done ? `${fixed(tMeas, 2)} s` : '–'}</b>
          </div>
          <div>
            <span>v = s/t</span>
            <b>{st.done && showValues ? `${vn(sM / tMeas, 2)} m/s` : '?'}</b>
          </div>
        </div>
        {gate ? (
          <p className="small">Khi xe chắn tia hồng ngoại ở cổng A, đồng hồ bắt đầu đếm; khi xe chắn tia ở cổng B, đồng hồ dừng. Số chỉ là thời gian t xe đi hết quãng đường s giữa hai cổng.</p>
        ) : (
          <p className="small">Thời gian đo bằng tay có sai số do phản xạ của người bấm giờ (bấm muộn khi xuất phát, bấm muộn khi về đích). Đo 3 lần và lấy giá trị trung bình.</p>
        )}
        <p className="small muted">Mở “Báo cáo”, sau mỗi lần đo bấm “Ghi số đo” để lập bảng và tính trung bình.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// So sánh tốc độ
// =====================================================================

export const MOVERS: Record<string, { name: string; v: number; color: string; kind: 'walk' | 'run' | 'bike' | 'moto' | 'car' | 'snail' }> = {
  walk: { name: 'Người đi bộ', v: 1.5, color: '#2a9d8f', kind: 'walk' },
  run: { name: 'Vận động viên chạy', v: 8, color: '#e76f51', kind: 'run' },
  bike: { name: 'Xe đạp', v: 4, color: '#457b9d', kind: 'bike' },
  moto: { name: 'Xe máy', v: 11, color: '#9b5de5', kind: 'moto' },
  car: { name: 'Ô tô', v: 20, color: '#e63946', kind: 'car' },
};

export interface RaceDoc {
  mode: 'race';
  movers: string[];
  by: 'time' | 'distance';
  /** so sánh trong cùng thời gian T (s) */
  T: number;
  /** so sánh trên cùng quãng đường D (m) */
  D: number;
}

function MoverGlyph({ kind, color, t }: { kind: string; color: string; t: number }) {
  const ph = Math.sin(t * 12);
  if (kind === 'car')
    return (
      <g>
        <path d="M -70 -10 L -62 -34 L -22 -48 L 18 -48 L 44 -30 L 70 -26 L 70 -6 L -70 -6 Z" fill={color} stroke="#333" strokeWidth={2} />
        <rect x={-14} y={-44} width={28} height={14} fill="#cfe8ff" />
        <circle cx={-40} cy={-4} r={11} fill="#222" />
        <circle cx={44} cy={-4} r={11} fill="#222" />
      </g>
    );
  if (kind === 'bike' || kind === 'moto')
    return (
      <g>
        <circle cx={-26} cy={-14} r={14} fill="none" stroke="#222" strokeWidth={4} />
        <circle cx={26} cy={-14} r={14} fill="none" stroke="#222" strokeWidth={4} />
        {kind === 'moto' ? <path d="M -26 -14 L -8 -34 L 18 -34 L 26 -14 Z" fill={color} stroke="#333" strokeWidth={2} /> : <path d="M -26 -14 L -4 -14 L 10 -34 L -12 -34 Z M 10 -34 L 26 -14" fill="none" stroke={color} strokeWidth={4} />}
        <circle cx={-2} cy={-62} r={9} fill="#f2c48d" stroke="#333" />
        <line x1={-4} y1={-52} x2={-8} y2={-34} stroke={color} strokeWidth={7} strokeLinecap="round" />
      </g>
    );
  // người
  const a = kind === 'run' ? 20 : 10;
  return (
    <g stroke="#333" strokeLinecap="round">
      <circle cx={0} cy={-62} r={9} fill="#f2c48d" strokeWidth={2} />
      <line x1={0} y1={-52} x2={0} y2={-26} stroke={color} strokeWidth={8} />
      <line x1={0} y1={-26} x2={a * ph * 0.8} y2={-2} strokeWidth={5} />
      <line x1={0} y1={-26} x2={-a * ph * 0.8} y2={-2} strokeWidth={5} />
      <line x1={0} y1={-46} x2={-a * ph * 0.7} y2={-30} strokeWidth={4} />
      <line x1={0} y1={-46} x2={a * ph * 0.7} y2={-30} strokeWidth={4} />
    </g>
  );
}

export function RaceView({ doc, onDoc, showValues }: EngineProps<RaceDoc, unknown>) {
  const ms = doc.movers.map((k) => ({ k, ...MOVERS[k] }));
  const tEnd = doc.by === 'time' ? doc.T : Math.max(...ms.map((m) => doc.D / m.v));
  const L = doc.by === 'time' ? Math.max(...ms.map((m) => m.v * doc.T)) * 1.08 : doc.D * 1.08;
  const scaleT = Math.max(1, tEnd / 8); // tua nhanh để mỗi lượt chạy khoảng 8 s
  const [t, setT] = useState(0);
  const [run, setRun] = useState(false);
  useEffect(() => {
    setT(0);
    setRun(false);
  }, [doc.by, doc.T, doc.D, doc.movers.join()]);
  useRaf((dt) => {
    setT((x) => {
      const n = Math.min(tEnd, x + dt * scaleT);
      if (n >= tEnd) setRun(false);
      return n;
    });
  }, run);
  const x0 = 120;
  const x1 = 1100;
  const X = (s: number) => x0 + ((x1 - x0) * s) / L;
  const laneH = Math.min(130, 520 / ms.length);
  const finished = t >= tEnd - 1e-6;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <text x={600} y={40} textAnchor="middle" className="lab-label">
            {doc.by === 'time' ? `Cùng thời gian t = ${doc.T} s: vật nào đi được quãng đường dài hơn?` : `Cùng quãng đường s = ${doc.D} m: vật nào đi hết ít thời gian hơn?`}
          </text>
          {ms.map((m, i) => {
            const y = 80 + i * laneH;
            const s = Math.min(m.v * t, doc.by === 'distance' ? doc.D : Infinity);
            const tm = doc.by === 'distance' ? Math.min(t, doc.D / m.v) : t;
            return (
              <g key={m.k}>
                <rect x={0} y={y} width={VW} height={laneH - 6} fill={i % 2 ? 'rgba(120,130,140,0.12)' : 'rgba(120,130,140,0.2)'} />
                <text x={12} y={y + 24} className="lab-small">
                  {m.name}
                </text>
                <g transform={`translate(${X(s)} ${y + laneH - 14})`}>
                  <MoverGlyph kind={m.kind} color={m.color} t={run && s < (doc.by === 'distance' ? doc.D : Infinity) ? t / scaleT : 0} />
                </g>
                <text x={x1 - 4} y={y + 24} textAnchor="end" className="lab-small">
                  {showValues ? `s = ${vn(s, 1)} m · t = ${vn(tm, 1)} s` : ''}
                </text>
              </g>
            );
          })}
          <line x1={X(0)} x2={X(0)} y1={70} y2={80 + ms.length * laneH} stroke="#fff" strokeWidth={5} />
          {doc.by === 'distance' && <line x1={X(doc.D)} x2={X(doc.D)} y1={70} y2={80 + ms.length * laneH} stroke="var(--danger)" strokeWidth={5} strokeDasharray="14 8" />}
          <text x={600} y={660} textAnchor="middle" className="lab-label">
            Đồng hồ: t = {vn(t, 1)} s {scaleT >= 1.5 ? `(tua nhanh ×${vn(scaleT, 0)})` : ''}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>So sánh nhanh, chậm</h3>
        <Row label="So sánh theo">
          <Seg value={doc.by} options={['time', 'distance'] as const} onChange={(b) => onDoc({ ...doc, by: b })} fmtOpt={(b) => (b === 'time' ? 'Cùng thời gian' : 'Cùng quãng đường')} />
        </Row>
        {doc.by === 'time' ? (
          <Row label="Thời gian t">
            <Slider value={doc.T} min={5} max={60} step={5} digits={0} suffix="s" onChange={(v) => onDoc({ ...doc, T: v })} />
          </Row>
        ) : (
          <Row label="Quãng đường s">
            <Slider value={doc.D} min={50} max={500} step={50} digits={0} suffix="m" onChange={(v) => onDoc({ ...doc, D: v })} />
          </Row>
        )}
        <div className="insp-actions">
          <button className="btn primary" onClick={() => (finished ? (setT(0), setRun(true)) : setRun(!run))}>
            {run ? 'Tạm dừng' : finished ? 'Chạy lại' : 'Bắt đầu'}
          </button>
          <button className="btn" onClick={() => (setT(0), setRun(false))}>
            Về vạch xuất phát
          </button>
        </div>
        <div className="insp-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>s (m)</th>
                <th>t (s)</th>
                <th>v (m/s)</th>
                <th>v (km/h)</th>
              </tr>
            </thead>
            <tbody>
              {ms.map((m) => {
                const s = doc.by === 'time' ? m.v * doc.T : doc.D;
                const tt = doc.by === 'time' ? doc.T : doc.D / m.v;
                return (
                  <tr key={m.k}>
                    <th>{m.name}</th>
                    <td>{finished ? vn(s, 1) : '…'}</td>
                    <td>{finished ? vn(tt, 1) : '…'}</td>
                    <td>{finished && showValues ? vn(m.v, 1) : '?'}</td>
                    <td>{finished && showValues ? vn(m.v * 3.6, 1) : '?'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="small">Tốc độ v = s / t cho biết quãng đường đi được trong một đơn vị thời gian. Đổi đơn vị: 1 m/s = 3,6 km/h.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Đồ thị quãng đường – thời gian
// =====================================================================

interface Seg3 {
  t0: number;
  t1: number;
  v: number;
}
interface GraphObj {
  name: string;
  color: string;
  kind: string;
  /** thời điểm xuất phát, quãng đường ban đầu */
  segs: Seg3[];
}
export const GRAPH_SC: Record<string, { title: string; tMax: number; sMax: number; objs: GraphObj[]; table?: [number, number][] }> = {
  deu: { title: 'Người đi xe đạp chuyển động thẳng với tốc độ không đổi', tMax: 100, sMax: 500, objs: [{ name: 'Xe đạp', color: '#457b9d', kind: 'bike', segs: [{ t0: 0, t1: 100, v: 4 }] }] },
  dung: {
    title: 'Người đi xe đạp: đi – dừng lại nghỉ – đi tiếp',
    tMax: 160,
    sMax: 500,
    objs: [{ name: 'Xe đạp', color: '#457b9d', kind: 'bike', segs: [{ t0: 0, t1: 60, v: 5 }, { t0: 60, t1: 100, v: 0 }, { t0: 100, t1: 160, v: 2.5 }] }],
  },
  hai: {
    title: 'Hai người cùng xuất phát từ một nơi, người B đi sau 40 s',
    tMax: 120,
    sMax: 700,
    objs: [
      { name: 'Người A (đi bộ nhanh)', color: '#2a9d8f', kind: 'walk', segs: [{ t0: 0, t1: 120, v: 5 }] },
      { name: 'Người B (xe đạp)', color: '#e63946', kind: 'bike', segs: [{ t0: 40, t1: 105, v: 10 }, { t0: 105, t1: 120, v: 0 }] },
    ],
  },
  bang: {
    title: 'Vẽ đồ thị từ bảng số liệu: ô tô đi trên đường',
    tMax: 60,
    sMax: 900,
    objs: [{ name: 'Ô tô', color: '#e63946', kind: 'car', segs: [{ t0: 0, t1: 30, v: 15 }, { t0: 30, t1: 40, v: 0 }, { t0: 40, t1: 60, v: 20 }] }],
    table: [
      [0, 0],
      [10, 150],
      [20, 300],
      [30, 450],
      [40, 450],
      [50, 650],
      [60, 850],
    ],
  },
};

function sAt(o: GraphObj, t: number): number {
  let s = 0;
  for (const g of o.segs) {
    if (t <= g.t0) break;
    s += g.v * (Math.min(t, g.t1) - g.t0);
  }
  return s;
}

export interface GraphDoc {
  mode: 'graph';
  sc: keyof typeof GRAPH_SC;
  /** số điểm đã chấm (bài vẽ từ bảng) */
  dots?: number;
}

export function GraphView({ doc, onDoc, showValues }: EngineProps<GraphDoc, unknown>) {
  const sc = GRAPH_SC[doc.sc];
  const [t, setT] = useState(sc.table ? sc.tMax : 0);
  const [run, setRun] = useState(false);
  useEffect(() => {
    setT(sc.table ? sc.tMax : 0);
    setRun(false);
  }, [doc.sc, sc]);
  useRaf((dt) => {
    setT((x) => {
      const n = Math.min(sc.tMax, x + (dt * sc.tMax) / 9);
      if (n >= sc.tMax) setRun(false);
      return n;
    });
  }, run);
  const gx0 = 150;
  const gy0 = 610;
  const gw = 900;
  const gh = 360;
  const GX = (tt: number) => gx0 + (gw * tt) / sc.tMax;
  const GY = (s: number) => gy0 - (gh * s) / sc.sMax;
  const tx0 = 120;
  const tx1 = 1080;
  const TX = (s: number) => tx0 + ((tx1 - tx0) * s) / sc.sMax;
  const tStep = sc.tMax <= 60 ? 10 : 20;
  const sStep = sc.sMax <= 500 ? 100 : 100;
  const dots = doc.dots ?? 0;
  const isTable = !!sc.table;

  const paths = useMemo(
    () =>
      sc.objs.map((o) => {
        const pts: string[] = [];
        const N = 120;
        for (let k = 0; k <= N; k++) {
          const tt = (sc.tMax * k) / N;
          if (tt > t + 1e-9) break;
          pts.push(`${GX(tt)},${GY(sAt(o, tt))}`);
        }
        pts.push(`${GX(t)},${GY(sAt(o, t))}`);
        return pts.join(' ');
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sc, t],
  );

  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <text x={600} y={32} textAnchor="middle" className="lab-label">
            {sc.title}
          </text>
          {/* đường đi */}
          <rect x={tx0 - 20} y={92} width={tx1 - tx0 + 40} height={38} fill="#8d99a6" />
          <line x1={tx0 - 20} x2={tx1 + 20} y1={111} y2={111} stroke="#fff" strokeWidth={3} strokeDasharray="18 12" />
          {sc.objs.map((o, i) => (
            <g key={i} transform={`translate(${TX(sAt(o, t))} ${100 + i * 14}) scale(0.7)`}>
              <MoverGlyph kind={o.kind} color={o.color} t={run ? t : 0} />
            </g>
          ))}
          {Array.from({ length: Math.floor(sc.sMax / sStep) + 1 }, (_, k) => (
            <text key={k} x={TX(k * sStep)} y={150} textAnchor="middle" className="tick-small">
              {k * sStep} m
            </text>
          ))}
          {/* đồ thị */}
          {Array.from({ length: Math.floor(sc.tMax / tStep) + 1 }, (_, k) => (
            <g key={`t${k}`}>
              <line x1={GX(k * tStep)} x2={GX(k * tStep)} y1={gy0} y2={gy0 - gh} stroke="var(--line)" strokeWidth={1} />
              <text x={GX(k * tStep)} y={gy0 + 26} textAnchor="middle" className="tick-small">
                {k * tStep}
              </text>
            </g>
          ))}
          {Array.from({ length: Math.floor(sc.sMax / sStep) + 1 }, (_, k) => (
            <g key={`s${k}`}>
              <line x1={gx0} x2={gx0 + gw} y1={GY(k * sStep)} y2={GY(k * sStep)} stroke="var(--line)" strokeWidth={1} />
              <text x={gx0 - 10} y={GY(k * sStep) + 6} textAnchor="end" className="tick-small">
                {k * sStep}
              </text>
            </g>
          ))}
          <Arrow x1={gx0} y1={gy0} x2={gx0 + gw + 40} y2={gy0} color="var(--ink)" width={3} head={14} />
          <Arrow x1={gx0} y1={gy0} x2={gx0} y2={gy0 - gh - 36} color="var(--ink)" width={3} head={14} />
          <text x={gx0 + gw + 44} y={gy0 + 28} textAnchor="end" className="lab-label">
            t (s)
          </text>
          <text x={gx0 + 12} y={gy0 - gh - 26} className="lab-label">
            s (m)
          </text>
          {!isTable &&
            sc.objs.map((o, i) => <polyline key={i} points={paths[i]} fill="none" stroke={o.color} strokeWidth={5} strokeLinejoin="round" />)}
          {isTable && (
            <g>
              {sc.table!.slice(0, dots).map(([tt, s], k) => (
                <g key={k}>
                  <line x1={GX(tt)} x2={GX(tt)} y1={gy0} y2={GY(s)} stroke="var(--accent)" strokeDasharray="5 5" />
                  <line x1={gx0} x2={GX(tt)} y1={GY(s)} y2={GY(s)} stroke="var(--accent)" strokeDasharray="5 5" />
                  <circle cx={GX(tt)} cy={GY(s)} r={8} fill="var(--danger)" />
                </g>
              ))}
              {dots >= sc.table!.length && showValues && <polyline points={sc.table!.map(([tt, s]) => `${GX(tt)},${GY(s)}`).join(' ')} fill="none" stroke="#e63946" strokeWidth={4} />}
            </g>
          )}
          {/* con trỏ đọc đồ thị */}
          {!isTable &&
            sc.objs.map((o, i) => {
              const s = sAt(o, t);
              return (
                <g key={`c${i}`}>
                  <line x1={GX(t)} x2={GX(t)} y1={gy0} y2={GY(s)} stroke={o.color} strokeDasharray="6 5" strokeWidth={2} />
                  <line x1={gx0} x2={GX(t)} y1={GY(s)} y2={GY(s)} stroke={o.color} strokeDasharray="6 5" strokeWidth={2} />
                  <circle cx={GX(t)} cy={GY(s)} r={7} fill={o.color} />
                </g>
              );
            })}
          {showValues &&
            !isTable &&
            t >= sc.tMax - 1e-6 &&
            sc.objs.map((o) =>
              o.segs.map((g, k) => {
                const sm = sAt(o, (g.t0 + g.t1) / 2);
                return (
                  <text key={`${o.name}${k}`} x={GX((g.t0 + g.t1) / 2) - 10} y={GY(sm) - 16} textAnchor="end" fontSize={20} fontWeight={800} fill={o.color}>
                    {g.v === 0 ? 'đứng yên' : `v = ${vn(g.v, 1)} m/s`}
                  </text>
                );
              }),
            )}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Đồ thị quãng đường – thời gian</h3>
        <Row label="Tình huống">
          <Seg value={doc.sc} options={Object.keys(GRAPH_SC) as (keyof typeof GRAPH_SC)[]} onChange={(s) => onDoc({ ...doc, sc: s, dots: 0 })} fmtOpt={(s) => ({ deu: 'Đi đều', dung: 'Đi – nghỉ – đi', hai: 'Hai người', bang: 'Vẽ từ bảng' })[s as string] ?? String(s)} />
        </Row>
        {isTable ? (
          <>
            <div className="insp-table">
              <table>
                <thead>
                  <tr>
                    <th>t (s)</th>
                    {sc.table!.map(([tt]) => (
                      <td key={tt}>{tt}</td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>s (m)</th>
                    {sc.table!.map(([tt, s]) => (
                      <td key={tt}>{s}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="insp-actions">
              <button className="btn primary" disabled={dots >= sc.table!.length} onClick={() => onDoc({ ...doc, dots: dots + 1 })}>
                Chấm điểm tiếp theo
              </button>
              <button className="btn" onClick={() => onDoc({ ...doc, dots: sc.table!.length })}>
                Chấm tất cả
              </button>
              <button className="btn" onClick={() => onDoc({ ...doc, dots: 0 })}>
                Xoá
              </button>
            </div>
            <p className="small">Mỗi cặp (t, s) là một điểm trên hệ trục. Nối các điểm, ta được đồ thị. Đoạn nằm ngang: ô tô dừng lại (s không đổi).</p>
          </>
        ) : (
          <>
            <div className="insp-actions">
              <button className="btn primary" onClick={() => (t >= sc.tMax ? (setT(0), setRun(true)) : setRun(!run))}>
                {run ? 'Tạm dừng' : t >= sc.tMax ? 'Chạy lại' : 'Chạy'}
              </button>
            </div>
            <Row label="Đọc đồ thị tại thời điểm t">
              <Slider value={t} min={0} max={sc.tMax} step={sc.tMax / 40} digits={0} suffix="s" onChange={(v) => (setRun(false), setT(v))} />
            </Row>
            <div className="insp-values two">
              {sc.objs.map((o) => (
                <div key={o.name}>
                  <span style={{ color: o.color }}>{o.name}</span>
                  <b>s = {showValues ? vn(sAt(o, t), 0) : '?'} m</b>
                </div>
              ))}
            </div>
            <p className="small">Đồ thị là đoạn thẳng dốc lên: chuyển động với tốc độ không đổi; càng dốc thì tốc độ càng lớn. Đoạn nằm ngang: vật đứng yên. Tính tốc độ: v = Δs / Δt đọc trên đồ thị.</p>
            {doc.sc === 'hai' && showValues && <p className="nature">Hai đồ thị cắt nhau tại t = 80 s, s = 400 m: người B đuổi kịp người A.</p>}
          </>
        )}
      </aside>
    </div>
  );
}

// =====================================================================
// Tốc độ và an toàn giao thông
// =====================================================================

export const DRIVERS = {
  alert: { name: 'Tỉnh táo', tr: 0.75 },
  tired: { name: 'Mệt mỏi, buồn ngủ', tr: 1.5 },
  phone: { name: 'Dùng điện thoại', tr: 2 },
  alcohol: { name: 'Đã uống rượu bia', tr: 2.5 },
} as const;

export interface SafetyDoc {
  mode: 'safety';
  /** tốc độ (km/h) */
  v: number;
  road: 'dry' | 'wet';
  driver: keyof typeof DRIVERS;
  /** khoảng cách tới chướng ngại vật khi phát hiện (m) */
  gap: number;
}

export function safeGap(v: number): number {
  if (v <= 60) return 35;
  if (v <= 80) return 55;
  if (v <= 100) return 70;
  return 100;
}

export function SafetyView({ doc, onDoc, showValues }: EngineProps<SafetyDoc, unknown>) {
  const v = doc.v / 3.6;
  const tr = DRIVERS[doc.driver].tr;
  const mu = doc.road === 'dry' ? 0.7 : 0.4;
  const a = mu * 9.8;
  const dr = v * tr;
  const db = (v * v) / (2 * a);
  const total = dr + db;
  const hit = total > doc.gap;
  const tStop = tr + v / a;
  const [t, setT] = useState(0);
  const [run, setRun] = useState(false);
  useEffect(() => {
    setT(0);
    setRun(false);
  }, [doc.v, doc.road, doc.driver, doc.gap]);
  const posAt = (tt: number) => (tt <= tr ? v * tt : dr + v * Math.min(tt - tr, v / a) - 0.5 * a * Math.min(tt - tr, v / a) ** 2);
  const stopAt = Math.min(doc.gap, total);
  const tEnd = (() => {
    if (!hit) return tStop;
    // thời điểm chạm vật cản
    if (doc.gap <= dr) return doc.gap / v;
    const D = doc.gap - dr;
    const disc = v * v - 2 * a * D;
    return tr + (v - Math.sqrt(Math.max(0, disc))) / a;
  })();
  useRaf((dt) => {
    setT((x) => {
      const n = Math.min(tEnd, x + dt);
      if (n >= tEnd) setRun(false);
      return n;
    });
  }, run);
  const pos = Math.min(posAt(t), stopAt);
  const Lm = Math.max(120, doc.gap + 20, total + 10);
  const x0 = 160;
  const x1 = 1140;
  const X = (s: number) => x0 + ((x1 - x0) * s) / Lm;
  const done = t >= tEnd - 1e-6;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={0} y={160} width={VW} height={170} fill={doc.road === 'wet' ? '#5d6670' : '#7b848d'} />
          <line x1={0} x2={VW} y1={245} y2={245} stroke="#fff" strokeWidth={4} strokeDasharray="30 20" />
          <rect x={0} y={150} width={VW} height={10} fill="#ddd" />
          <rect x={0} y={330} width={VW} height={10} fill="#ddd" />
          {doc.road === 'wet' && Array.from({ length: 30 }, (_, k) => <ellipse key={k} cx={(k * 97) % VW} cy={180 + ((k * 53) % 130)} rx={26} ry={5} fill="rgba(170,210,255,0.35)" />)}
          {/* vật cản: quả bóng */}
          <g transform={`translate(${X(doc.gap) + 30} 290)`}>
            <circle r={20} fill="#ffb703" stroke="#333" strokeWidth={2} />
            <path d="M -20 0 Q 0 -10 20 0 M 0 -20 Q -8 0 0 20" stroke="#333" strokeWidth={2} fill="none" />
          </g>
          <text x={X(doc.gap) + 30} y={140} textAnchor="middle" className="lab-small">
            vật cản
          </text>
          {/* ô tô */}
          <g transform={`translate(${X(pos)} 300)`}>
            <MoverGlyph kind="car" color="#1d6fe0" t={0} />
          </g>
          {hit && done && (
            <text x={X(doc.gap)} y={120} textAnchor="middle" fontSize={34} fontWeight={900} fill="var(--danger)">
              VA CHẠM!
            </text>
          )}
          {!hit && done && (
            <text x={X(stopAt)} y={120} textAnchor="middle" fontSize={30} fontWeight={900} fill="var(--ok)">
              Dừng kịp
            </text>
          )}
          {/* thanh quãng đường */}
          <g>
            <text x={20} y={420} className="lab-label">
              Quãng đường dừng xe
            </text>
            <rect x={X(0)} y={440} width={X(Math.min(dr, Lm)) - X(0)} height={40} fill="#f4a261" />
            <rect x={X(Math.min(dr, Lm))} y={440} width={X(Math.min(total, Lm)) - X(Math.min(dr, Lm))} height={40} fill="#e63946" />
            <line x1={X(doc.gap)} x2={X(doc.gap)} y1={430} y2={500} stroke="var(--ink)" strokeWidth={3} strokeDasharray="6 4" />
            {showValues && X(Math.min(total, Lm)) - X(0) > 220 && (
              <>
                <text x={(X(0) + X(Math.min(dr, Lm))) / 2} y={467} textAnchor="middle" fontSize={18} fontWeight={800} fill="#222">
                  phản ứng {vn(dr, 1)} m
                </text>
                <text x={(X(Math.min(dr, Lm)) + X(Math.min(total, Lm))) / 2} y={467} textAnchor="middle" fontSize={18} fontWeight={800} fill="#fff">
                  phanh {vn(db, 1)} m
                </text>
              </>
            )}
            {Array.from({ length: Math.floor(Lm / 20) + 1 }, (_, k) => (
              <text key={k} x={X(k * 20)} y={520} textAnchor="middle" className="tick-small">
                {k * 20} m
              </text>
            ))}
            <rect x={20} y={560} width={24} height={20} fill="#f4a261" />
            <text x={52} y={576} className="lab-small">
              Quãng đường đi được trong thời gian phản ứng (người lái chưa kịp phanh){showValues ? `: ${vn(dr, 1)} m` : ''}
            </text>
            <rect x={20} y={596} width={24} height={20} fill="#e63946" />
            <text x={52} y={612} className="lab-small">
              Quãng đường từ lúc đạp phanh đến khi xe dừng hẳn{showValues ? `: ${vn(db, 1)} m` : ''}
            </text>
          </g>
          {/* biển báo tốc độ */}
          <g transform="translate(70 70)">
            <circle r={44} fill="#fff" stroke="#e63946" strokeWidth={10} />
            <text y={14} textAnchor="middle" fontSize={36} fontWeight={900} fill="#222">
              {doc.v}
            </text>
          </g>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Tốc độ và quãng đường dừng xe</h3>
        <Row label="Tốc độ xe">
          <Slider value={doc.v} min={20} max={120} step={10} digits={0} suffix="km/h" onChange={(x) => onDoc({ ...doc, v: x })} />
        </Row>
        <Row label="Mặt đường">
          <Seg value={doc.road} options={['dry', 'wet'] as const} onChange={(r) => onDoc({ ...doc, road: r })} fmtOpt={(r) => (r === 'dry' ? 'Khô' : 'Ướt, trơn')} />
        </Row>
        <Row label="Người lái xe">
          <Seg value={doc.driver} options={Object.keys(DRIVERS) as (keyof typeof DRIVERS)[]} onChange={(d) => onDoc({ ...doc, driver: d })} fmtOpt={(d) => DRIVERS[d].name} />
        </Row>
        <Row label="Phát hiện vật cản ở cách xe">
          <Slider value={doc.gap} min={20} max={120} step={5} digits={0} suffix="m" onChange={(x) => onDoc({ ...doc, gap: x })} />
        </Row>
        <div className="insp-actions">
          <button className="btn primary" onClick={() => (setT(0), setRun(true))}>
            Chạy thử
          </button>
        </div>
        <div className="insp-values">
          <div>
            <span>Thời gian phản ứng</span>
            <b>{vn(tr, 2)} s</b>
          </div>
          <div>
            <span>Quãng đường dừng</span>
            <b>{showValues ? `${vn(total, 1)} m` : '?'}</b>
          </div>
          <div>
            <span>Khoảng cách an toàn tối thiểu</span>
            <b>{safeGap(doc.v)} m</b>
          </div>
        </div>
        <p className="small">Tốc độ càng lớn, quãng đường xe đi được trong thời gian phản ứng và quãng đường phanh càng dài. Mặt đường trơn, người lái mệt mỏi, dùng điện thoại, uống rượu bia làm quãng đường dừng xe dài thêm.</p>
        <p className="small muted">Khoảng cách an toàn tối thiểu giữa hai xe (đường khô ráo): đến 60 km/h: 35 m; 60–80 km/h: 55 m; 80–100 km/h: 70 m; 100–120 km/h: 100 m. Số liệu mô phỏng là gần đúng.</p>
      </aside>
    </div>
  );
}

// =====================================================================
// Thiết bị "bắn tốc độ"
// =====================================================================

export interface SpeedCamDoc {
  mode: 'speedcam';
  /** tốc độ thật của xe (km/h) */
  v: number;
  /** tốc độ tối đa cho phép (km/h) */
  limit: number;
  /** khoảng cách hai vạch mốc (m) */
  gap: number;
}

export function SpeedCamView({ doc, onDoc, showValues }: EngineProps<SpeedCamDoc, unknown>) {
  const SLOW = 12; // quay chậm
  const v = doc.v / 3.6;
  const L = 40;
  const A = 15;
  const B = A + doc.gap;
  const [t, setT] = useState(0);
  const [run, setRun] = useState(false);
  const runId = useRef(0);
  useEffect(() => {
    setT(0);
    setRun(false);
  }, [doc.v, doc.gap, doc.limit]);
  const tEnd = (L - 2) / v;
  useRaf((dt) => {
    setT((x) => {
      const n = Math.min(tEnd, x + dt / SLOW);
      if (n >= tEnd) setRun(false);
      return n;
    });
  }, run);
  const p = v * t; // vị trí đầu xe (m)
  const tMeas = doc.gap / v;
  const passedB = p >= B;
  const shown = p < A ? 0 : Math.min(tMeas, (p - A) / v);
  const vMeas = (doc.gap / tMeas) * 3.6;
  const over = vMeas > doc.limit;
  const x0 = 40;
  const x1 = 1160;
  const X = (s: number) => x0 + ((x1 - x0) * s) / L;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={0} y={330} width={VW} height={170} fill="#7b848d" />
          <line x1={0} x2={VW} y1={415} y2={415} stroke="#fff" strokeWidth={4} strokeDasharray="30 20" />
          {[A, B].map((u, k) => (
            <g key={k}>
              <line x1={X(u)} x2={X(u)} y1={330} y2={500} stroke="#ffe11a" strokeWidth={6} />
              <text x={X(u)} y={530} textAnchor="middle" className="lab-label">
                Vạch mốc {k + 1}
              </text>
            </g>
          ))}
          <Arrow x1={X(A)} y1={555} x2={X(B)} y2={555} color="var(--accent)" width={3} head={12} />
          <Arrow x1={X(B)} y1={555} x2={X(A)} y2={555} color="var(--accent)" width={3} head={12} />
          <text x={(X(A) + X(B)) / 2} y={590} textAnchor="middle" className="lab-label">
            {doc.gap} m
          </text>
          {/* camera */}
          <g transform="translate(860 120)">
            <rect x={-6} y={0} width={12} height={210} fill="#555" />
            <rect x={-60} y={-30} width={90} height={44} rx={8} fill="#333" />
            <circle cx={-60} cy={-8} r={14} fill="#1d6fe0" stroke="#999" strokeWidth={3} />
            <text x={0} y={-44} textAnchor="middle" className="lab-small">
              Camera giám sát tốc độ
            </text>
          </g>
          <g transform={`translate(${X(p)} 440)`}>
            <MoverGlyph kind="car" color="#e63946" t={0} />
          </g>
          {/* màn hình xử lí */}
          <g transform="translate(60 60)">
            <rect width={460} height={210} rx={14} fill="#1b1f24" stroke="#555" strokeWidth={3} />
            <text x={20} y={40} fill="#9fe" fontSize={20} fontWeight={700}>
              Thời gian xe đi giữa hai vạch:
            </text>
            <text x={20} y={80} fill="#ff4d4d" fontSize={34} fontWeight={900} fontFamily="'Courier New', monospace">
              t = {fixed(shown, 3)} s
            </text>
            <text x={20} y={125} fill="#9fe" fontSize={20} fontWeight={700}>
              Tốc độ v = s / t:
            </text>
            <text x={20} y={165} fill={passedB && over ? '#ff4d4d' : '#2bdc4a'} fontSize={34} fontWeight={900} fontFamily="'Courier New', monospace">
              {passedB && showValues ? `${vn(vMeas, 0)} km/h` : '– – –'}
            </text>
            {passedB && showValues && (
              <text x={440} y={195} textAnchor="end" fill={over ? '#ff4d4d' : '#2bdc4a'} fontSize={22} fontWeight={900}>
                {over ? 'VƯỢT QUÁ TỐC ĐỘ CHO PHÉP' : 'Đúng tốc độ quy định'}
              </text>
            )}
          </g>
          <g transform="translate(1080 90)">
            <circle r={46} fill="#fff" stroke="#e63946" strokeWidth={10} />
            <text y={14} textAnchor="middle" fontSize={36} fontWeight={900} fill="#222">
              {doc.limit}
            </text>
          </g>
          <text x={600} y={650} textAnchor="middle" className="lab-small">
            Quay chậm ×{SLOW}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Thiết bị “bắn tốc độ”</h3>
        <Row label="Tốc độ thật của xe">
          <Slider value={doc.v} min={30} max={110} step={5} digits={0} suffix="km/h" onChange={(x) => onDoc({ ...doc, v: x })} />
        </Row>
        <Row label="Biển báo tốc độ tối đa">
          <Seg value={doc.limit} options={[50, 60, 80] as const} onChange={(x) => onDoc({ ...doc, limit: x })} fmtOpt={(x) => `${x} km/h`} />
        </Row>
        <Row label="Khoảng cách hai vạch mốc">
          <Seg value={doc.gap} options={[5, 10] as const} onChange={(x) => onDoc({ ...doc, gap: x })} fmtOpt={(x) => `${x} m`} />
        </Row>
        <div className="insp-actions">
          <button
            className="btn primary"
            onClick={() => {
              runId.current++;
              setT(0);
              setRun(true);
            }}
          >
            Cho xe chạy qua
          </button>
        </div>
        <div className="calc">
          <b>Cách tính:</b>
          <p>
            v = s / t = {doc.gap} m / {passedB ? fixed(tMeas, 3) : '…'} s {passedB && showValues ? `≈ ${vn(doc.gap / tMeas, 2)} m/s ≈ ${vn(vMeas, 0)} km/h` : ''}
          </p>
        </div>
        <p className="small">Camera ghi lại thời điểm xe đi qua hai vạch mốc cách nhau một khoảng đã biết; máy tính tính ra tốc độ và so sánh với tốc độ tối đa cho phép. Ô tô vượt quá tốc độ sẽ bị ghi hình biển số để xử phạt.</p>
      </aside>
    </div>
  );
}
