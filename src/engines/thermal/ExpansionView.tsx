// Sự nở vì nhiệt của chất rắn, lỏng, khí (KHTN 8 Bài 29).
import { useState } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg, Slider } from '../../ui/controls';
import { fmtShort } from '../../core/format';
import type { ExpansionDoc, ThermalOptions } from './model';

const KIND_NAME: Record<ExpansionDoc['kind'], string> = {
  ball: 'Quả cầu và vòng kim loại',
  strip: 'Băng kép',
  liquid: 'Chất lỏng nở vì nhiệt',
  gas: 'Chất khí nở vì nhiệt',
};

function Flame({ x, y, on }: { x: number; y: number; on: boolean }) {
  return (
    <g>
      <rect x={x - 36} y={y} width={72} height={56} rx={12} fill="#bfe9f2" stroke="#555" />
      {on && <path d={`M ${x - 14} ${y} Q ${x} ${y - 70} ${x} ${y - 90} Q ${x + 6} ${y - 55} ${x + 14} ${y} Z`} fill="#ff8c1a" opacity={0.9} />}
    </g>
  );
}

export function ExpansionView({ doc, onDoc, showValues }: EngineProps<ExpansionDoc, ThermalOptions>) {
  const [drop, setDrop] = useState(false);
  const dT = doc.T - 25;
  const hot = doc.T > 40;
  let body: JSX.Element;
  let note = '';

  if (doc.kind === 'ball') {
    const r0 = 60;
    const r = r0 * (1 + dT * 0.00035); // phóng đại để dễ quan sát
    const ring = 62;
    const passes = r < ring;
    const by = drop ? (passes ? 520 : 240 - r + 6) : 120;
    body = (
      <g>
        <rect x={420} y={240} width={360} height={14} fill="#777" />
        <ellipse cx={600} cy={247} rx={ring + 12} ry={18} fill="none" stroke="#555" strokeWidth={12} />
        <line x1={600} y1={by - r - 80} x2={600} y2={by - r} stroke="#333" strokeWidth={3} />
        <circle cx={600} cy={by} r={r} fill="#9aa3ad" stroke="#444" strokeWidth={3} style={{ transition: 'cy 0.8s ease-in' }} />
        <Flame x={600} y={600} on={hot} />
        <text x={600} y={440} textAnchor="middle" className="lab-value">
          {showValues ? `Đường kính quả cầu: ${fmtShort(2 * r * 0.1, 2)} cm · Lỗ vòng: ${fmtShort(2 * ring * 0.1, 2)} cm` : ''}
        </text>
      </g>
    );
    note = passes ? 'Quả cầu lọt qua vòng.' : 'Quả cầu nở ra, không lọt qua vòng.';
  } else if (doc.kind === 'strip') {
    const k = dT * 0.000012; // độ cong (1/px), phóng đại để dễ quan sát
    const L = 520;
    const x0 = 340;
    const y0 = 300;
    const pts = (off: number) => {
      const arr = [];
      for (let i = 0; i <= 40; i++) {
        const s = (i / 40) * L;
        const th = s * k;
        // uốn cong về phía thép (phía dưới) khi nóng: đồng nở nhiều hơn
        const x = Math.abs(k) < 1e-6 ? x0 + s : x0 + Math.sin(th) / k;
        const y = Math.abs(k) < 1e-6 ? y0 : y0 + (1 - Math.cos(th)) / k;
        arr.push(`${x - off * Math.sin(th)},${y + off * Math.cos(th)}`);
      }
      return arr.join(' ');
    };
    body = (
      <g>
        <rect x={x0 - 60} y={y0 - 40} width={60} height={90} fill="#777" />
        <polyline points={pts(-7)} fill="none" stroke="#c87533" strokeWidth={14} />
        <polyline points={pts(7)} fill="none" stroke="#6e7378" strokeWidth={14} />
        <text x={x0 + 40} y={y0 - 26} className="lab-small">
          Đồng
        </text>
        <text x={x0 + 40} y={y0 + 40} className="lab-small">
          Thép
        </text>
        <Flame x={600} y={560} on={hot} />
      </g>
    );
    note = hot ? 'Băng kép cong về phía thanh thép (đồng nở vì nhiệt nhiều hơn thép).' : doc.T < 20 ? 'Khi lạnh, băng kép cong về phía thanh đồng.' : 'Băng kép thẳng.';
  } else if (doc.kind === 'liquid') {
    const liquids = [
      { name: 'Rượu', beta: 1.1, color: 'rgba(230,80,90,0.75)' },
      { name: 'Dầu', beta: 0.7, color: 'rgba(235,190,40,0.85)' },
      { name: 'Nước', beta: 0.21, color: 'rgba(70,150,235,0.75)' },
    ];
    body = (
      <g>
        <rect x={180} y={360} width={840} height={240} fill={hot ? 'rgba(255,120,90,0.25)' : 'rgba(110,170,255,0.2)'} stroke="#6a7a8c" strokeWidth={3} />
        <text x={600} y={630} textAnchor="middle" className="lab-label">
          Chậu nước {doc.T} °C
        </text>
        {liquids.map((l, i) => {
          const x = 330 + i * 270;
          const rise = dT * l.beta * 2.2;
          const level = 280 - rise;
          return (
            <g key={l.name}>
              <circle cx={x} cy={500} r={70} fill={l.color} stroke="#555" strokeWidth={3} />
              <rect x={x - 7} y={120} width={14} height={330} fill="rgba(255,255,255,0.6)" stroke="#555" />
              <rect x={x - 5} y={level} width={10} height={450 - level} fill={l.color} />
              <line x1={x - 22} y1={280} x2={x + 22} y2={280} stroke="#333" strokeDasharray="4 3" />
              <text x={x} y={100} textAnchor="middle" className="lab-label">
                {l.name}
              </text>
              <text x={x + 26} y={level} className="lab-small" dominantBaseline="central">
                {showValues ? `${rise >= 0 ? '+' : ''}${fmtShort(rise / 10, 1)} cm` : ''}
              </text>
            </g>
          );
        })}
      </g>
    );
    note = 'Các chất lỏng khác nhau nở vì nhiệt khác nhau.';
  } else {
    const shift = dT * 6;
    body = (
      <g>
        <circle cx={420} cy={400} r={130} fill="rgba(220,240,255,0.35)" stroke="#6a7a8c" strokeWidth={4} />
        <rect x={540} y={392} width={540} height={16} fill="rgba(255,255,255,0.7)" stroke="#555" />
        <rect x={700 + shift} y={393} width={30} height={14} fill="#e63946" style={{ transition: 'x 0.3s' }} />
        <line x1={715} y1={360} x2={715} y2={440} stroke="#333" strokeDasharray="4 3" />
        <text x={715} y={350} textAnchor="middle" className="lab-small">
          Vị trí ban đầu
        </text>
        {hot && (
          <g opacity={0.8}>
            <path d="M 300 300 q -60 100 0 200 q 30 -20 40 -100 q -10 -80 -40 -100 Z" fill="#f2c4a0" stroke="#a87d5a" strokeWidth={2} />
            <path d="M 540 300 q 60 100 0 200 q -30 -20 -40 -100 q 10 -80 40 -100 Z" fill="#f2c4a0" stroke="#a87d5a" strokeWidth={2} />
          </g>
        )}
        <text x={420} y={580} textAnchor="middle" className="lab-label">
          Bình cầu chứa không khí
        </text>
        <text x={715 + shift} y={450} textAnchor="middle" className="lab-small">
          giọt nước màu
        </text>
      </g>
    );
    note = hot ? 'Không khí trong bình nóng lên, nở ra, đẩy giọt nước màu đi ra ngoài.' : doc.T < 25 ? 'Không khí lạnh đi, co lại, giọt nước màu đi vào trong.' : '';
  }

  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          {body}
        </svg>
        {showValues && note && <div className="bench-badge ok">{note}</div>}
      </div>
      <aside className="eng-side">
        <h3>{KIND_NAME[doc.kind]}</h3>
        <Row label={doc.kind === 'gas' ? 'Nhiệt độ không khí trong bình' : doc.kind === 'liquid' ? 'Nhiệt độ chậu nước' : 'Nhiệt độ'}>
          <Slider value={doc.T} min={doc.kind === 'ball' ? 25 : 0} max={doc.kind === 'ball' ? 400 : doc.kind === 'strip' ? 300 : doc.kind === 'gas' ? 45 : 90} step={doc.kind === 'ball' || doc.kind === 'strip' ? 25 : 5} onChange={(v) => onDoc({ ...doc, T: v })} suffix="°C" digits={0} />
        </Row>
        {doc.kind === 'ball' && (
          <button className="btn primary big" onClick={() => setDrop((d) => !d)}>
            {drop ? 'Nhấc quả cầu lên' : 'Thả quả cầu qua vòng'}
          </button>
        )}
        {doc.kind === 'gas' && <Seg value={doc.T >= 37 ? 'hand' : 'none'} options={['none', 'hand'] as const} onChange={(v) => onDoc({ ...doc, T: v === 'hand' ? 37 : 25 })} fmtOpt={(v) => (v === 'hand' ? 'Áp hai bàn tay vào bình' : 'Bỏ tay ra')} />}
        <p className="small">
          {doc.kind === 'ball' && 'Chất rắn nở ra khi nóng lên, co lại khi lạnh đi. Ứng dụng: chừa khe hở giữa các thanh ray, đầu cầu thép.'}
          {doc.kind === 'strip' && 'Băng kép gồm hai thanh kim loại khác nhau tán chặt vào nhau. Ứng dụng: tự động đóng ngắt mạch điện trong bàn là, nồi cơm điện.'}
          {doc.kind === 'liquid' && 'Chất lỏng nở ra khi nóng lên, co lại khi lạnh đi. Ứng dụng: nhiệt kế chất lỏng; không đổ nước thật đầy ấm khi đun.'}
          {doc.kind === 'gas' && 'Chất khí nở vì nhiệt nhiều hơn chất lỏng, chất lỏng nở vì nhiệt nhiều hơn chất rắn.'}
        </p>
      </aside>
    </div>
  );
}
