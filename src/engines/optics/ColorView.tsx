// Màu sắc của vật dưới ánh sáng màu: vật chỉ hắt lại những ánh sáng màu mà nó có.
import type { EngineProps } from '../../core/types';
import { Row, Seg } from '../../ui/controls';
import type { ColorDoc, ColorLight, OpticsOptions } from './model';

type RGB = [number, number, number];
const LIGHT: Record<ColorLight, { name: string; rgb: RGB }> = {
  white: { name: 'Trắng', rgb: [1, 1, 1] },
  red: { name: 'Đỏ', rgb: [1, 0, 0] },
  green: { name: 'Lục', rgb: [0, 1, 0] },
  blue: { name: 'Lam', rgb: [0, 0, 1] },
  yellow: { name: 'Vàng', rgb: [1, 1, 0] },
};

const OBJECTS: { name: string; rgb: RGB; shape: 'apple' | 'leaf' | 'paper' | 'shirt' | 'banana' }[] = [
  { name: 'Quả táo đỏ', rgb: [1, 0, 0], shape: 'apple' },
  { name: 'Chiếc lá xanh lục', rgb: [0, 1, 0], shape: 'leaf' },
  { name: 'Tờ giấy trắng', rgb: [1, 1, 1], shape: 'paper' },
  { name: 'Áo xanh lam', rgb: [0, 0, 1], shape: 'shirt' },
  { name: 'Quả chuối vàng', rgb: [1, 1, 0], shape: 'banana' },
];

const NAMES: Record<string, string> = { '1,0,0': 'đỏ', '0,1,0': 'lục', '0,0,1': 'lam', '1,1,0': 'vàng', '1,1,1': 'trắng', '0,0,0': 'đen', '0,1,1': 'xanh lơ', '1,0,1': 'đỏ tươi' };
const toCss = ([r, g, b]: RGB) => `rgb(${r ? 235 : 28},${g ? 225 : 28},${b ? 235 : 34})`;

function Shape({ kind, fill }: { kind: string; fill: string }) {
  switch (kind) {
    case 'apple':
      return (
        <g>
          <path d="M0 -40 C -45 -70 -75 -10 -55 30 C -40 60 -15 65 0 55 C 15 65 40 60 55 30 C 75 -10 45 -70 0 -40 Z" fill={fill} stroke="#000" strokeOpacity={0.4} strokeWidth={2} />
          <path d="M0 -40 Q 4 -62 14 -70" stroke="#5a3b1c" strokeWidth={5} fill="none" />
        </g>
      );
    case 'leaf':
      return <path d="M-60 40 C -60 -30 0 -70 65 -55 C 70 10 20 60 -60 40 Z M-60 40 L 40 -40" fill={fill} stroke="#000" strokeOpacity={0.4} strokeWidth={2} />;
    case 'paper':
      return <rect x={-50} y={-62} width={100} height={124} fill={fill} stroke="#000" strokeOpacity={0.4} strokeWidth={2} />;
    case 'shirt':
      return <path d="M-25 -60 L -70 -35 L -55 -5 L -40 -15 L -40 60 L 40 60 L 40 -15 L 55 -5 L 70 -35 L 25 -60 Q 0 -40 -25 -60 Z" fill={fill} stroke="#000" strokeOpacity={0.4} strokeWidth={2} />;
    default:
      return <path d="M-70 -20 Q -10 70 70 -40 Q 60 -45 55 -35 Q 0 30 -60 -30 Z" fill={fill} stroke="#000" strokeOpacity={0.4} strokeWidth={2} />;
  }
}

export function ColorView({ doc, onDoc, showValues }: EngineProps<ColorDoc, OpticsOptions>) {
  const L = LIGHT[doc.light];
  return (
    <div className="eng">
      <div className="eng-stage optics-dark">
        <svg viewBox="0 0 1200 640" className="eng-svg">
          <defs>
            <radialGradient id="lampLight" cx="50%" cy="0%" r="90%">
              <stop offset="0%" stopColor={toCss(L.rgb)} stopOpacity={0.45} />
              <stop offset="100%" stopColor={toCss(L.rgb)} stopOpacity={0} />
            </radialGradient>
          </defs>
          <rect x={0} y={0} width={1200} height={640} fill="url(#lampLight)" />
          <g transform="translate(600 40)">
            <path d="M-60 0 L 60 0 L 30 -30 L -30 -30 Z" fill="#555" />
            <ellipse cx={0} cy={2} rx={60} ry={10} fill={toCss(L.rgb)} />
          </g>
          {OBJECTS.map((o, k) => {
            const seen: RGB = [o.rgb[0] & L.rgb[0], o.rgb[1] & L.rgb[1], o.rgb[2] & L.rgb[2]] as RGB;
            const x = 140 + k * 230;
            return (
              <g key={k} transform={`translate(${x} 330)`}>
                <Shape kind={o.shape} fill={toCss(seen)} />
                <text y={110} className="optics-label big" textAnchor="middle">
                  {o.name}
                </text>
                <text y={140} className="optics-label" textAnchor="middle" fill="#ffd166">
                  {showValues ? `nhìn thấy: ${NAMES[seen.join(',')]}` : 'nhìn thấy: ?'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="eng-side">
        <div className="insp-part">
          <h3>Đèn chiếu</h3>
          <Row label="Màu ánh sáng chiếu vào vật">
            <Seg<ColorLight> value={doc.light} options={['white', 'red', 'green', 'blue', 'yellow']} onChange={(c) => onDoc({ ...doc, light: c })} fmtOpt={(c) => LIGHT[c].name} />
          </Row>
        </div>
        <p className="small">
          Vật màu nào thì hắt lại (tán xạ) mạnh ánh sáng màu đó và hấp thụ các ánh sáng màu khác. Dưới ánh sáng trắng, vật có màu như ta thường thấy. Vật màu trắng hắt lại mọi ánh sáng màu; vật đen hầu như không hắt lại ánh sáng nào.
        </p>
      </aside>
    </div>
  );
}
