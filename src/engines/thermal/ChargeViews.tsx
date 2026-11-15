// Nhiễm điện do cọ xát (KHTN 8 Bài 20).
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRaf } from '../mechanics/LeverViews';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider, useSvgDrag } from '../../ui/controls';
import type { ChargeDoc, InteractDoc, ThermalOptions } from './model';

const VW = 1200;
const VH = 680;

function Sign({ x, y, neg }: { x: number; y: number; neg: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={neg ? '#1d6fe0' : '#e63946'} />
      <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central" fill="#fff" fontWeight={900} fontSize={18}>
        {neg ? '−' : '+'}
      </text>
    </g>
  );
}

export function ChargeView({ doc, onDoc, showValues }: EngineProps<ChargeDoc, ThermalOptions>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { start } = useSvgDrag(svgRef);
  const plastic = doc.pair === 'nhuaVai';
  const moved = Math.min(10, Math.floor(doc.rubs / 3));
  // thước nhựa nhận thêm electron (nhiễm điện âm); thanh thuỷ tinh mất electron (nhiễm điện dương)
  const rodNeg = plastic;
  const rod = { x: 330, y: 260, w: 520, h: 46 };
  const cloth = useRef({ x: 640 });
  const lastX = useRef(0);
  const papers = useMemo(() => Array.from({ length: 14 }, (_, i) => ({ x: 380 + ((i * 53) % 420), y: 590 + ((i * 29) % 40), r: (i * 37) % 360 })), []);

  const onCloth = (e: React.PointerEvent) => {
    lastX.current = cloth.current.x;
    let acc = 0;
    start(e, (p) => {
      const nx = Math.max(rod.x + 30, Math.min(rod.x + rod.w - 30, p.x));
      acc += Math.abs(nx - lastX.current);
      lastX.current = nx;
      cloth.current.x = nx;
      if (acc > 60) {
        acc = 0;
        onDoc({ ...doc, rubs: Math.min(40, doc.rubs + 1), near: false });
      } else onDoc({ ...doc });
    });
  };

  const rodY = doc.near ? 470 : rod.y;
  const attract = doc.near && moved > 0;

  // vị trí các dấu điện tích
  const rodSigns = [];
  for (let k = 0; k < 10; k++) {
    const x = rod.x + 40 + k * 46;
    // điện tích trung hoà: mỗi vị trí có 1 cặp + − ; thêm/mất electron theo số lần cọ xát
    rodSigns.push(<Sign key={`p${k}`} x={x} y={rodY + rod.h / 2 - 9} neg={false} />);
    const hasElectron = rodNeg ? true : k >= moved;
    if (hasElectron) rodSigns.push(<Sign key={`n${k}`} x={x + 16} y={rodY + rod.h / 2 + 9} neg />);
    if (rodNeg && k < moved) rodSigns.push(<Sign key={`e${k}`} x={x + 8} y={rodY - 14} neg />);
  }
  const clothSigns = [];
  for (let k = 0; k < 6; k++) {
    const x = cloth.current.x - 70 + (k % 3) * 60;
    const y = 120 + Math.floor(k / 3) * 34;
    clothSigns.push(<Sign key={`cp${k}`} x={x} y={y} neg={false} />);
  }
  // electron trên vải: vải nhường electron cho thước nhựa; lụa nhận electron từ thuỷ tinh
  const clothElectrons = plastic ? Math.max(0, 6 - Math.ceil(moved * 0.6)) : 6 + Math.ceil(moved * 0.6);
  for (let k = 0; k < clothElectrons; k++) {
    const x = cloth.current.x - 55 + (k % 4) * 40;
    const y = 136 + Math.floor(k / 4) * 30;
    clothSigns.push(<Sign key={`cn${k}`} x={x} y={y + 16} neg />);
  }

  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={0} y={630} width={VW} height={50} className="lab-table" />
          {/* thước / thanh thuỷ tinh */}
          <g style={{ transition: 'transform 0.5s' }}>
            <rect x={rod.x} y={rodY} width={rod.w} height={rod.h} rx={10} fill={plastic ? '#e8505b' : 'rgba(190,230,245,0.8)'} stroke="#555" strokeWidth={2} />
            {showValues && rodSigns}
            <text x={rod.x + rod.w / 2} y={rodY + rod.h + 30} textAnchor="middle" className="lab-label">
              {plastic ? 'Thước nhựa' : 'Thanh thuỷ tinh'}
            </text>
          </g>
          {/* mảnh vải */}
          {!doc.near && (
            <g onPointerDown={onCloth} className="draggable">
              <path d={`M ${cloth.current.x - 100} 90 Q ${cloth.current.x} 70 ${cloth.current.x + 100} 90 L ${cloth.current.x + 90} ${rod.y + 20} Q ${cloth.current.x} ${rod.y + 10} ${cloth.current.x - 90} ${rod.y + 20} Z`} fill={plastic ? '#7a8aa8' : '#f1e3f3'} stroke="#555" strokeWidth={2} opacity={0.92} />
              {showValues && clothSigns}
              <text x={cloth.current.x} y={78} textAnchor="middle" className="lab-label">
                {plastic ? 'Mảnh vải khô' : 'Mảnh lụa'} – kéo qua lại để cọ xát
              </text>
            </g>
          )}
          {/* giấy vụn */}
          {papers.map((p, i) => {
            const lift = attract && Math.abs(p.x - (rod.x + rod.w / 2)) < rod.w / 2 + 10 && i % 4 < moved;
            const y = lift ? rodY + rod.h + 6 : p.y;
            return <rect key={i} x={p.x} y={y} width={16} height={10} fill="#fffef5" stroke="#999" transform={`rotate(${p.r} ${p.x + 8} ${y + 5})`} style={{ transition: 'y 0.4s' }} />;
          })}
          <text x={600} y={662} textAnchor="middle" className="lab-small">
            Giấy vụn
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Cặp vật cọ xát">
          <Seg value={doc.pair} options={['nhuaVai', 'thuyTinhLua'] as const} onChange={(p) => onDoc({ ...doc, pair: p, rubs: 0, near: false })} fmtOpt={(p) => (p === 'nhuaVai' ? 'Thước nhựa – vải khô' : 'Thuỷ tinh – lụa')} />
        </Row>
        <div className="insp-actions">
          <button className="btn" onClick={() => onDoc({ ...doc, rubs: Math.min(40, doc.rubs + 9), near: false })}>
            Cọ xát nhanh
          </button>
          <button className={`btn ${doc.near ? 'on' : ''}`} onClick={() => onDoc({ ...doc, near: !doc.near })}>
            {doc.near ? 'Nhấc thước lên' : 'Đưa lại gần giấy vụn'}
          </button>
          <button className="btn" onClick={() => onDoc({ ...doc, rubs: 0, near: false })}>
            Làm trung hoà
          </button>
        </div>
        <div className="insp-values two">
          <div>
            <span>Số lần cọ xát</span>
            <b>{doc.rubs}</b>
          </div>
          <div>
            <span>{plastic ? 'Thước nhựa' : 'Thanh thuỷ tinh'}</span>
            <b>{!showValues ? '?' : moved === 0 ? 'trung hoà' : rodNeg ? 'nhiễm điện âm' : 'nhiễm điện dương'}</b>
          </div>
        </div>
        <p className="small">Khi cọ xát, electron dịch chuyển từ vật này sang vật kia. Vật nhận thêm electron nhiễm điện âm, vật mất bớt electron nhiễm điện dương. Vật nhiễm điện hút được các vật nhẹ.</p>
        <p className="small muted">Bấm “Ẩn số đo” để ẩn các dấu điện tích.</p>
      </aside>
    </div>
  );
}

type Q = 'neg' | 'pos' | 'none';
const Q_NAME: Record<Q, string> = { neg: 'Nhiễm điện âm (−)', pos: 'Nhiễm điện dương (+)', none: 'Không nhiễm điện' };

/** Hai quả cầu nhẹ treo bằng sợi chỉ: cùng loại thì đẩy, khác loại thì hút. */
export function InteractView({ doc, onDoc, showValues }: EngineProps<InteractDoc, ThermalOptions>) {
  const qa = doc.hanging as Q;
  const qb = doc.hand as Q;
  const L = 300; // chiều dài sợi chỉ (px)
  const R = 34; // bán kính quả cầu
  const D = 150 + (1 - doc.close) * 260; // khoảng cách hai điểm treo
  const top = 110;
  const pa = 600 - D / 2;
  const pb = 600 + D / 2;
  const st = useRef({ a: 0, b: 0, va: 0, vb: 0, F: 0 });
  const [, tick] = useState(0);
  // dấu tương tác: +1 đẩy, −1 hút, 0 không tương tác
  const kind = qa === 'none' && qb === 'none' ? 0 : qa === 'none' || qb === 'none' ? -0.45 : qa === qb ? 1 : -1;
  useEffect(() => {
    st.current = { a: 0, b: 0, va: 0, vb: 0, F: 0 };
  }, [qa, qb]);
  useRaf((dt) => {
    const s = st.current;
    const sub = 6;
    for (let k = 0; k < sub; k++) {
      const h = dt / sub;
      const xa = pa + L * Math.sin(s.a);
      const xb = pb + L * Math.sin(s.b);
      const gap = Math.max(2 * R, xb - xa);
      const F = (kind * 1.2e7) / (gap * gap); // > 0: đẩy ra xa nhau
      s.F = F;
      // gia tốc góc: lực điện theo phương ngang, trọng lực kéo về vị trí thẳng đứng, có cản
      const g = 9;
      const aa = (-F / 60) * Math.cos(s.a) - g * Math.sin(s.a) - 2.2 * s.va;
      const ab = (F / 60) * Math.cos(s.b) - g * Math.sin(s.b) - 2.2 * s.vb;
      s.va += aa * h;
      s.vb += ab * h;
      s.a += s.va * h;
      s.b += s.vb * h;
      // hai quả cầu chạm nhau thì dừng lại sát nhau
      const xa2 = pa + L * Math.sin(s.a);
      const xb2 = pb + L * Math.sin(s.b);
      if (xb2 - xa2 < 2 * R) {
        const mid = (xa2 + xb2) / 2;
        s.a = Math.asin(Math.max(-1, Math.min(1, (mid - R - pa) / L)));
        s.b = Math.asin(Math.max(-1, Math.min(1, (mid + R - pb) / L)));
        s.va = 0;
        s.vb = 0;
      }
    }
    tick((t) => t + 1);
  }, true);
  const s = st.current;
  const A = { x: pa + L * Math.sin(s.a), y: top + L * Math.cos(s.a) };
  const B = { x: pb + L * Math.sin(s.b), y: top + L * Math.cos(s.b) };
  const fLen = Math.min(140, 30 + Math.abs(s.F) * 0.35);
  const repel = kind > 0;
  const verdict = kind === 0 ? 'Hai quả cầu không nhiễm điện: KHÔNG hút, không đẩy' : repel ? 'Nhiễm điện CÙNG LOẠI → ĐẨY NHAU' : qa === 'none' || qb === 'none' ? 'Vật nhiễm điện HÚT vật không nhiễm điện' : 'Nhiễm điện KHÁC LOẠI → HÚT NHAU';
  const ball = (c: { x: number; y: number }, q: Q, id: string) => {
    const fill = q === 'neg' ? '#cfe1ff' : q === 'pos' ? '#ffd6d9' : '#f1f1ea';
    return (
      <g>
        <circle cx={c.x} cy={c.y} r={R} fill={showValues ? fill : '#f1f1ea'} stroke="#555" strokeWidth={2.5} />
        {showValues &&
          q !== 'none' &&
          [-1, 0, 1].flatMap((i) => [
            <Sign key={`${id}${i}a`} x={c.x + i * 15} y={c.y - 9} neg={q === 'neg'} />,
            <Sign key={`${id}${i}b`} x={c.x + i * 15} y={c.y + 11} neg={q === 'neg'} />,
          ])}
        <text x={c.x} y={c.y + R + 26} textAnchor="middle" className="lab-label">
          {id}
        </text>
      </g>
    );
  };
  // Mũi tên lực theo hướng dir. Lực đẩy: vẽ từ quả cầu hướng ra ngoài.
  // Lực hút: vẽ ở phía ngoài, mũi tên chỉ vào quả cầu (cùng hướng lực).
  const arrow = (c: { x: number; y: number }, dir: number) => {
    const x1 = repel ? c.x + dir * (R + 4) : c.x - dir * (R + 4 + fLen);
    const x2 = repel ? c.x + dir * (R + fLen) : c.x - dir * (R + 4);
    return (
      <g>
        <line x1={x1} y1={c.y} x2={x2 - dir * 14} y2={c.y} stroke="#e85d04" strokeWidth={7} strokeLinecap="round" />
        <path d={`M ${x2} ${c.y} l ${-dir * 20} -12 v 24 Z`} fill="#e85d04" />
      </g>
    );
  };
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="eng-svg">
          <rect x={pa - 120} y={top - 22} width={pb - pa + 240} height={16} rx={4} fill="#777" />
          <line x1={pa} y1={top} x2={A.x} y2={A.y} stroke="#333" strokeWidth={2} />
          <line x1={pb} y1={top} x2={B.x} y2={B.y} stroke="#333" strokeWidth={2} />
          {/* vị trí thẳng đứng để so sánh */}
          <line x1={pa} y1={top} x2={pa} y2={top + L + R} stroke="var(--ink-2)" strokeDasharray="6 6" opacity={0.5} />
          <line x1={pb} y1={top} x2={pb} y2={top + L + R} stroke="var(--ink-2)" strokeDasharray="6 6" opacity={0.5} />
          {kind !== 0 && showValues && (
            <>
              {arrow(A, repel ? -1 : 1)}
              {arrow(B, repel ? 1 : -1)}
            </>
          )}
          {ball(A, qa, 'A')}
          {ball(B, qb, 'B')}
          <rect x={200} y={560} width={800} height={64} rx={14} fill={showValues ? (kind === 0 ? 'var(--surface-2)' : repel ? '#ffe3d0' : '#d9ecff') : 'transparent'} />
          <text x={600} y={600} textAnchor="middle" fontSize={30} fontWeight={900} fill={repel ? '#c2410c' : '#1d4fd8'}>
            {showValues ? verdict : ''}
          </text>
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Quả cầu A">
          <Seg<Q> value={qa} options={['neg', 'pos', 'none']} onChange={(v) => onDoc({ ...doc, hanging: v as InteractDoc['hanging'] })} fmtOpt={(v) => Q_NAME[v]} />
        </Row>
        <Row label="Quả cầu B">
          <Seg<Q> value={qb} options={['neg', 'pos', 'none']} onChange={(v) => onDoc({ ...doc, hand: v as InteractDoc['hand'] })} fmtOpt={(v) => Q_NAME[v]} />
        </Row>
        <Row label="Đưa hai điểm treo lại gần nhau">
          <Slider value={Math.round(doc.close * 100)} min={0} max={100} step={5} onChange={(v) => onDoc({ ...doc, close: v / 100 })} suffix="%" digits={0} />
        </Row>
        <button className="btn" onClick={() => (st.current = { a: 0, b: 0, va: 0, vb: 0, F: 0 })}>
          Thả lại hai quả cầu
        </button>
        <p className="small">Có hai loại điện tích: dương (+) và âm (−). Các vật nhiễm điện cùng loại thì đẩy nhau, khác loại thì hút nhau. Vật nhiễm điện còn hút được vật nhẹ không nhiễm điện.</p>
        <p className="small muted">Mũi tên cam: lực điện tác dụng lên mỗi quả cầu. Đặt quả cầu càng gần nhau, lực càng mạnh.</p>
      </aside>
    </div>
  );
}
