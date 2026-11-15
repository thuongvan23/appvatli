// Thư viện hình vẽ nhỏ (khoảng 100×100, gốc ở tâm) dùng cho thẻ thông tin và quy trình.
import { ReactNode } from 'react';

const G = ({ children }: { children: ReactNode }) => <g strokeLinejoin="round" strokeLinecap="round">{children}</g>;
const GLASS = 'rgba(205,230,250,0.6)';
const EDGE = '#5f7488';

function Hazard({ children, color = '#d62828' }: { children: ReactNode; color?: string }) {
  return (
    <G>
      <path d="M 0 -46 L 46 0 L 0 46 L -46 0 Z" fill="#fff" stroke={color} strokeWidth={6} />
      {children}
    </G>
  );
}

export function Glyph({ name }: { name: string }) {
  switch (name) {
    // ---------- dụng cụ ----------
    case 'tube':
      return (
        <G>
          <path d="M -12 -44 L -12 30 A 12 12 0 0 0 12 30 L 12 -44" fill={GLASS} stroke={EDGE} strokeWidth={3} />
          <path d="M -12 10 L -12 30 A 12 12 0 0 0 12 30 L 12 10 Z" fill="rgba(80,150,230,0.5)" />
        </G>
      );
    case 'beaker':
      return (
        <G>
          <path d="M -34 -38 L -30 38 L 30 38 L 34 -38" fill={GLASS} stroke={EDGE} strokeWidth={3} />
          <rect x={-30} y={0} width={60} height={38} fill="rgba(80,150,230,0.4)" />
          {[-20, -6, 8, 22].map((y) => <line key={y} x1={-28} x2={-16} y1={y} y2={y} stroke={EDGE} strokeWidth={2} />)}
        </G>
      );
    case 'flask':
      return (
        <G>
          <path d="M -10 -44 L -10 -14 L -38 38 L 38 38 L 10 -14 L 10 -44" fill={GLASS} stroke={EDGE} strokeWidth={3} />
          <path d="M -26 16 L -38 38 L 38 38 L 26 16 Z" fill="rgba(80,150,230,0.4)" />
        </G>
      );
    case 'roundflask':
      return (
        <G>
          <path d="M -9 -44 L -9 -16 A 32 32 0 1 0 9 -16 L 9 -44" fill={GLASS} stroke={EDGE} strokeWidth={3} />
          <path d="M -30 16 A 32 32 0 0 0 30 16 Z" fill="rgba(80,150,230,0.4)" />
        </G>
      );
    case 'funnel':
      return (
        <G>
          <path d="M -40 -36 L 40 -36 L 6 4 L 6 42 L -6 42 L -6 4 Z" fill={GLASS} stroke={EDGE} strokeWidth={3} />
        </G>
      );
    case 'sepfunnel':
      return (
        <G>
          <path d="M -6 -44 L 6 -44 L 6 -36 Q 30 -10 8 22 L 3 26 L 3 44 L -3 44 L -3 26 L -8 22 Q -30 -10 -6 -36 Z" fill={GLASS} stroke={EDGE} strokeWidth={3} />
          <rect x={-10} y={26} width={20} height={6} fill="#d62828" />
          <path d="M -14 0 Q 0 -4 14 0 Q 14 16 6 22 L -6 22 Q -14 16 -14 0 Z" fill="rgba(240,200,80,0.5)" />
        </G>
      );
    case 'cylinder':
      return (
        <G>
          <rect x={-12} y={-44} width={24} height={80} rx={3} fill={GLASS} stroke={EDGE} strokeWidth={3} />
          <rect x={-10} y={-4} width={20} height={38} fill="rgba(80,150,230,0.45)" />
          <rect x={-24} y={36} width={48} height={8} rx={3} fill={EDGE} />
          {[-34, -24, -14, -4, 6, 16].map((y) => <line key={y} x1={-12} x2={-4} y1={y} y2={y} stroke={EDGE} strokeWidth={2} />)}
        </G>
      );
    case 'dropper':
      return (
        <G>
          <ellipse cx={-30} cy={-30} rx={12} ry={16} fill="#d62828" transform="rotate(-45 -30 -30)" />
          <path d="M -22 -22 L 30 30" stroke={EDGE} strokeWidth={9} />
          <path d="M -22 -22 L 30 30" stroke={GLASS} strokeWidth={5} />
          <circle cx={38} cy={40} r={4} fill="rgba(80,150,230,0.8)" />
        </G>
      );
    case 'clamp':
      return (
        <G>
          <rect x={-46} y={-8} width={92} height={16} rx={3} fill="#e9a43a" stroke="#9a6a1e" strokeWidth={2} />
          <rect x={-10} y={-14} width={20} height={28} rx={3} fill="#c0c6cc" stroke="#666" strokeWidth={2} />
          <circle cx={30} cy={0} r={6} fill="#fff" stroke="#9a6a1e" />
        </G>
      );
    case 'spoon':
      return (
        <G>
          <ellipse cx={-26} cy={0} rx={18} ry={11} fill="#d6dbe0" stroke="#666" strokeWidth={2} />
          <line x1={-8} y1={0} x2={44} y2={0} stroke="#888" strokeWidth={6} />
          <path d="M -36 -2 Q -26 -10 -16 -2" fill="#fafafa" />
        </G>
      );
    case 'tongs':
      return (
        <G>
          <path d="M -44 -6 L 40 -2 M -44 6 L 40 2" stroke="#888" strokeWidth={6} />
          <circle cx={-44} cy={0} r={8} fill="none" stroke="#888" strokeWidth={4} />
        </G>
      );
    case 'burner':
      return (
        <G>
          <path d="M 0 -46 Q 14 -26 7 -14 L -7 -14 Q -14 -26 0 -46 Z" fill="#ffb627" />
          <path d="M 0 -34 Q 6 -24 3 -16 L -3 -16 Q -6 -24 0 -34 Z" fill="#4ea8ff" />
          <rect x={-4} y={-14} width={8} height={10} fill="#e9e1c9" />
          <path d="M -30 40 Q -32 -4 0 -4 Q 32 -4 30 40 Z" fill={GLASS} stroke={EDGE} strokeWidth={3} />
        </G>
      );
    case 'dish':
      return (
        <G>
          <path d="M -44 -6 Q -40 32 0 32 Q 40 32 44 -6 Z" fill="#f6f2ea" stroke="#8a826f" strokeWidth={3} />
          <ellipse cx={0} cy={-6} rx={44} ry={8} fill="#fffdf8" stroke="#8a826f" strokeWidth={2} />
        </G>
      );
    case 'mesh':
      return (
        <G>
          <rect x={-40} y={-40} width={80} height={80} fill="#9fb3c8" stroke="#555" strokeWidth={3} />
          {[-28, -14, 0, 14, 28].map((v) => (
            <g key={v}>
              <line x1={v} y1={-40} x2={v} y2={40} stroke="#556" strokeWidth={1.5} />
              <line x1={-40} y1={v} x2={40} y2={v} stroke="#556" strokeWidth={1.5} />
            </g>
          ))}
          <circle r={18} fill="#e6e1d6" />
        </G>
      );
    case 'phmeter':
      return (
        <G>
          <rect x={-40} y={-30} width={56} height={64} rx={8} fill="#e9edf2" stroke="#555" strokeWidth={2} />
          <rect x={-32} y={-22} width={40} height={20} fill="#11231a" />
          <text x={-12} y={-7} textAnchor="middle" fill="#6dff9f" fontSize={13} fontWeight={700}>
            7.0
          </text>
          <path d="M 16 0 Q 34 -10 30 -30 L 30 30" fill="none" stroke="#333" strokeWidth={3} />
          <rect x={24} y={20} width={12} height={22} rx={4} fill={GLASS} stroke={EDGE} strokeWidth={2} />
        </G>
      );
    case 'bp':
      return (
        <G>
          <rect x={-44} y={-12} width={50} height={30} rx={6} fill="#3b4a5e" />
          <circle cx={26} cy={2} r={18} fill="#fff" stroke="#555" strokeWidth={3} />
          <line x1={26} y1={2} x2={34} y2={-8} stroke="#d62828" strokeWidth={3} />
          <path d="M -20 18 Q -20 40 10 40" fill="none" stroke="#333" strokeWidth={3} />
          <ellipse cx={14} cy={40} rx={8} ry={6} fill="#222" />
        </G>
      );
    case 'supply':
      return (
        <G>
          <rect x={-44} y={-30} width={88} height={60} rx={8} fill="#e8edf3" stroke="#555" strokeWidth={2} />
          <rect x={-30} y={-20} width={40} height={18} fill="#11231a" />
          <circle cx={26} cy={-10} r={9} fill="#555" />
          <circle cx={-18} cy={16} r={6} fill="#222" />
          <circle cx={18} cy={16} r={6} fill="#d62828" />
        </G>
      );
    case 'meter':
      return (
        <G>
          <rect x={-40} y={-34} width={80} height={68} rx={8} fill="#fffdf5" stroke="#d62828" strokeWidth={4} />
          <path d="M -26 10 A 30 30 0 0 1 26 10" fill="none" stroke="#333" strokeWidth={2} />
          <line x1={0} y1={14} x2={14} y2={-12} stroke="#d62828" strokeWidth={3} />
          <text x={0} y={30} textAnchor="middle" fontWeight={900} fontSize={14} fill="#d62828">
            A
          </text>
        </G>
      );
    case 'joule':
      return (
        <G>
          <rect x={-44} y={-30} width={88} height={60} rx={8} fill="#2b3a55" />
          <rect x={-34} y={-20} width={68} height={22} fill="#11231a" />
          <text x={0} y={-4} textAnchor="middle" fill="#6dff9f" fontSize={13} fontWeight={700}>
            1250 J
          </text>
          <circle cx={-20} cy={16} r={6} fill="#ddd" />
          <circle cx={0} cy={16} r={6} fill="#ddd" />
        </G>
      );
    case 'rheostat':
      return (
        <G>
          <rect x={-44} y={-12} width={88} height={24} rx={10} fill="#8a8f96" />
          {Array.from({ length: 14 }, (_, i) => <line key={i} x1={-38 + i * 6} x2={-38 + i * 6} y1={-12} y2={12} stroke="#3a3a3a" strokeWidth={2} />)}
          <rect x={-46} y={-26} width={92} height={6} fill="#555" />
          <rect x={6} y={-30} width={10} height={20} fill="#222" />
        </G>
      );
    case 'led':
      return (
        <G>
          <path d="M -14 0 A 14 14 0 0 1 14 0 L 14 20 L -14 20 Z" fill="rgba(255,90,90,0.8)" stroke="#a11" strokeWidth={2} />
          <line x1={-6} y1={20} x2={-6} y2={44} stroke="#888" strokeWidth={3} />
          <line x1={6} y1={20} x2={6} y2={36} stroke="#888" strokeWidth={3} />
          <path d="M 18 -18 l 10 -10 M 24 -8 l 12 -6" stroke="#f5b700" strokeWidth={3} />
        </G>
      );
    case 'bulb':
      return (
        <G>
          <circle cx={0} cy={-10} r={24} fill="rgba(255,240,170,0.8)" stroke="#888" strokeWidth={2} />
          <rect x={-10} y={12} width={20} height={20} fill="#bbb" stroke="#777" />
          <path d="M -6 -4 q 6 -12 12 0" fill="none" stroke="#a66" strokeWidth={2} />
        </G>
      );
    case 'switch':
      return (
        <G>
          <rect x={-44} y={6} width={88} height={22} rx={4} fill="#ffd43b" />
          <circle cx={-26} cy={6} r={6} fill="#555" />
          <circle cx={26} cy={6} r={6} fill="#555" />
          <line x1={-26} y1={6} x2={22} y2={-16} stroke="#888" strokeWidth={6} />
        </G>
      );
    case 'fuse':
      return (
        <G>
          <rect x={-30} y={-12} width={60} height={24} rx={10} fill={GLASS} stroke={EDGE} strokeWidth={2} />
          <rect x={-42} y={-12} width={14} height={24} rx={3} fill="#c0c6cc" />
          <rect x={28} y={-12} width={14} height={24} rx={3} fill="#c0c6cc" />
          <path d="M -28 0 q 7 -6 14 0 t 14 0 t 14 0 t 14 0" fill="none" stroke="#666" strokeWidth={1.5} />
        </G>
      );
    case 'wires':
      return (
        <G>
          <path d="M -40 -20 Q 0 -50 40 -10" fill="none" stroke="#d62828" strokeWidth={5} />
          <path d="M -40 10 Q 0 -20 40 20" fill="none" stroke="#222" strokeWidth={5} />
          <circle cx={-40} cy={-20} r={6} fill="#d62828" />
          <circle cx={-40} cy={10} r={6} fill="#222" />
        </G>
      );
    case 'battery':
      return (
        <G>
          <rect x={-34} y={-14} width={64} height={28} rx={5} fill="#2b2b2b" />
          <rect x={30} y={-6} width={6} height={12} fill="#999" />
          <rect x={-34} y={-14} width={22} height={28} rx={5} fill="#f2b705" />
          <text x={8} y={6} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={800}>
            1,5V
          </text>
        </G>
      );
    case 'bottle':
      return (
        <G>
          <rect x={-8} y={-46} width={16} height={12} fill="#444" />
          <path d="M -8 -34 L -8 -26 Q -28 -20 -28 0 L -28 40 L 28 40 L 28 0 Q 28 -20 8 -26 L 8 -34 Z" fill="#8a5a2a" opacity={0.85} stroke="#5a3a1a" strokeWidth={2} />
          <rect x={-22} y={0} width={44} height={26} fill="#fff" />
          <line x1={-16} y1={8} x2={16} y2={8} stroke="#333" strokeWidth={3} />
          <line x1={-16} y1={17} x2={8} y2={17} stroke="#999" strokeWidth={2} />
        </G>
      );
    case 'label':
      return (
        <G>
          <rect x={-42} y={-36} width={84} height={72} rx={6} fill="#fff" stroke="#555" strokeWidth={2} />
          <rect x={-42} y={-36} width={84} height={18} rx={6} fill="#1d6fe0" />
          <line x1={-32} y1={-6} x2={20} y2={-6} stroke="#333" strokeWidth={3} />
          <line x1={-32} y1={6} x2={30} y2={6} stroke="#999" strokeWidth={2} />
          <line x1={-32} y1={16} x2={10} y2={16} stroke="#999" strokeWidth={2} />
          <path d="M 22 18 l 10 -10 l 10 10 l -10 10 Z" fill="#fff" stroke="#d62828" strokeWidth={2} />
        </G>
      );
    // ---------- kí hiệu cảnh báo ----------
    case 'hzCorrosive':
      return (
        <Hazard>
          <path d="M -22 -14 l 8 0 l 0 10 M 6 -14 l 8 0 l 0 10" stroke="#222" strokeWidth={3} fill="none" />
          <circle cx={-17} cy={0} r={2.5} fill="#222" />
          <circle cx={11} cy={0} r={2.5} fill="#222" />
          <path d="M -26 16 h 18 M 4 16 h 22" stroke="#222" strokeWidth={4} />
          <path d="M -18 18 q 6 6 12 0" stroke="#222" strokeWidth={2} fill="none" />
        </Hazard>
      );
    case 'hzFlame':
      return (
        <Hazard>
          <path d="M 0 -26 Q 16 -6 10 10 Q 18 2 16 -6 Q 26 10 14 22 L -14 22 Q -26 8 -12 -8 Q -10 4 -4 6 Q -12 -12 0 -26 Z" fill="#222" />
          <rect x={-18} y={24} width={36} height={4} fill="#222" />
        </Hazard>
      );
    case 'hzToxic':
      return (
        <Hazard>
          <circle cx={0} cy={-8} r={14} fill="#222" />
          <circle cx={-5} cy={-10} r={3.5} fill="#fff" />
          <circle cx={5} cy={-10} r={3.5} fill="#fff" />
          <rect x={-8} y={4} width={16} height={7} fill="#222" />
          <path d="M -20 14 L 20 26 M 20 14 L -20 26" stroke="#222" strokeWidth={4} />
        </Hazard>
      );
    case 'hzOxid':
      return (
        <Hazard>
          <circle cx={0} cy={12} r={11} fill="none" stroke="#222" strokeWidth={4} />
          <path d="M 0 -26 Q 12 -12 6 -2 L -6 -2 Q -12 -12 0 -26 Z" fill="#222" />
          <rect x={-18} y={24} width={36} height={4} fill="#222" />
        </Hazard>
      );
    case 'hzHealth':
      return (
        <Hazard>
          <circle cx={0} cy={-16} r={7} fill="#222" />
          <path d="M -12 24 L -10 -6 L 10 -6 L 12 24 Z" fill="#222" />
          <path d="M -3 -2 l 6 0 l -2 8 l 4 0 l -7 12 l 2 -9 l -4 0 Z" fill="#fff" />
        </Hazard>
      );
    case 'hzEnv':
      return (
        <Hazard>
          <path d="M -24 18 L 22 18" stroke="#222" strokeWidth={3} />
          <path d="M -16 18 L -16 -4 M -16 -4 l -8 -8 M -16 -4 l 8 -10" stroke="#222" strokeWidth={3} />
          <path d="M 4 10 q 10 -10 20 0 q -10 10 -20 0 Z M 2 10 l -6 -5 l 0 10 Z" fill="#222" />
        </Hazard>
      );
    case 'hzGas':
      return (
        <Hazard>
          <rect x={-8} y={-22} width={16} height={44} rx={7} fill="#222" />
          <rect x={-4} y={-28} width={8} height={7} fill="#222" />
        </Hazard>
      );
    case 'hzExcl':
      return (
        <Hazard>
          <rect x={-5} y={-24} width={10} height={32} rx={3} fill="#222" />
          <circle cx={0} cy={18} r={5} fill="#222" />
        </Hazard>
      );
    case 'hzExplode':
      return (
        <Hazard>
          <circle cx={0} cy={8} r={10} fill="#222" />
          {[-60, -30, 0, 30, 60].map((a) => (
            <line key={a} x1={0} y1={-6} x2={22 * Math.sin((a * Math.PI) / 180)} y2={-6 - 22 * Math.cos((a * Math.PI) / 180)} stroke="#222" strokeWidth={3} />
          ))}
        </Hazard>
      );
    // ---------- tự nhiên, đời sống ----------
    case 'plant':
      return (
        <G>
          <path d="M 0 40 L 0 -10" stroke="#3a7d2c" strokeWidth={5} />
          <path d="M 0 0 Q -30 -10 -34 -34 Q -8 -30 0 0 Z" fill="#5cb85c" />
          <path d="M 0 -10 Q 26 -18 32 -42 Q 6 -38 0 -10 Z" fill="#6cc96c" />
          <rect x={-26} y={36} width={52} height={10} rx={4} fill="#8a5a2a" />
        </G>
      );
    case 'rice':
      return (
        <G>
          {[-18, 0, 18].map((x) => (
            <g key={x}>
              <path d={`M ${x} 40 Q ${x + 4} 0 ${x + 14} -30`} fill="none" stroke="#7a9a2c" strokeWidth={4} />
              {[0, 1, 2, 3].map((k) => <ellipse key={k} cx={x + 6 + k * 3} cy={-4 - k * 8} rx={3} ry={6} fill="#e2c044" />)}
            </g>
          ))}
        </G>
      );
    case 'factory':
      return (
        <G>
          <path d="M -44 40 L -44 0 L -20 -14 L -20 0 L 4 -14 L 4 0 L 28 -14 L 28 40 Z" fill="#8a96a3" />
          <rect x={28} y={-40} width={12} height={80} fill="#6b7480" />
          <circle cx={36} cy={-46} r={8} fill="#c9ced6" />
          <circle cx={26} cy={-54} r={10} fill="#d9dde3" />
          {[-34, -12, 10].map((x) => <rect key={x} x={x} y={14} width={10} height={10} fill="#ffd166" />)}
        </G>
      );
    case 'car':
      return (
        <G>
          <path d="M -44 10 L -36 -8 Q -30 -20 -16 -20 L 16 -20 Q 28 -20 34 -8 L 44 10 L 44 22 L -44 22 Z" fill="#e63946" />
          <rect x={-24} y={-14} width={20} height={14} fill="#bde0fe" />
          <rect x={2} y={-14} width={22} height={14} fill="#bde0fe" />
          <circle cx={-24} cy={24} r={9} fill="#222" />
          <circle cx={24} cy={24} r={9} fill="#222" />
        </G>
      );
    case 'fire':
      return (
        <G>
          <path d="M 0 -44 Q 30 -10 20 20 Q 14 40 0 40 Q -14 40 -20 20 Q -30 -10 0 -44 Z" fill="#ff7b00" />
          <path d="M 0 -14 Q 14 4 8 22 Q 4 32 0 32 Q -4 32 -8 22 Q -14 4 0 -14 Z" fill="#ffd60a" />
        </G>
      );
    case 'gas':
      return (
        <G>
          <rect x={-26} y={-30} width={52} height={70} rx={14} fill="#d62828" />
          <rect x={-10} y={-44} width={20} height={16} rx={3} fill="#666" />
          <text x={0} y={12} textAnchor="middle" fill="#fff" fontWeight={900} fontSize={16}>
            GAS
          </text>
        </G>
      );
    case 'oil':
      return (
        <G>
          <path d="M -30 40 L -20 -30 L 20 -30 L 30 40 Z" fill="none" stroke="#444" strokeWidth={4} />
          <path d="M -24 0 L 24 0 M -26 20 L 26 20 M -22 -16 L 22 -16" stroke="#444" strokeWidth={3} />
          <path d="M 0 -44 L 0 -30" stroke="#444" strokeWidth={4} />
          <path d="M 34 22 q 8 10 0 18 q -8 -8 0 -18 Z" fill="#222" />
        </G>
      );
    case 'coal':
      return (
        <G>
          <path d="M -40 30 L -30 0 L -6 -12 L 20 -6 L 40 14 L 30 34 Z" fill="#2b2b2b" />
          <path d="M -20 0 L 0 -6 L 12 6 Z" fill="#555" />
        </G>
      );
    case 'wood':
      return (
        <G>
          <rect x={-40} y={-12} width={80} height={24} rx={12} fill="#a5672f" transform="rotate(-15)" />
          <rect x={-40} y={6} width={80} height={24} rx={12} fill="#8a5527" transform="rotate(10)" />
          <ellipse cx={-38} cy={20} rx={8} ry={12} fill="#d8a96a" />
        </G>
      );
    case 'drop':
      return (
        <G>
          <path d="M 0 -40 Q 30 0 24 18 Q 16 40 0 40 Q -16 40 -24 18 Q -30 0 0 -40 Z" fill="#4ea8ff" />
        </G>
      );
    case 'sun':
      return (
        <G>
          <circle r={20} fill="#ffc300" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            return <line key={i} x1={28 * Math.cos(a)} y1={28 * Math.sin(a)} x2={40 * Math.cos(a)} y2={40 * Math.sin(a)} stroke="#ffc300" strokeWidth={5} />;
          })}
        </G>
      );
    case 'rock':
      return (
        <G>
          <path d="M -40 30 L -36 -4 L -14 -26 L 18 -22 L 40 2 L 34 30 Z" fill="#b7aa96" stroke="#7d715e" strokeWidth={2} />
          <path d="M -20 0 L 0 -10 L 14 4" stroke="#7d715e" strokeWidth={2} fill="none" />
        </G>
      );
    case 'crystal':
      return (
        <G>
          {[-20, 0, 20].map((x, i) => <path key={x} d={`M ${x - 9} 36 L ${x - 9} ${-10 - i * 8} L ${x} ${-28 - i * 8} L ${x + 9} ${-10 - i * 8} L ${x + 9} 36 Z`} fill="rgba(230,240,250,0.9)" stroke="#8aa0b5" strokeWidth={2} />)}
        </G>
      );
    case 'sand':
      return (
        <G>
          <path d="M -44 36 Q -10 -30 44 36 Z" fill="#e8d3a2" />
          {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={-24 + ((i * 17) % 48)} cy={10 + ((i * 11) % 22)} r={1.6} fill="#b89a5c" />)}
        </G>
      );
    case 'bag':
      return (
        <G>
          <path d="M -32 -30 Q 0 -40 32 -30 L 36 40 L -36 40 Z" fill="#f2efe6" stroke="#8a826f" strokeWidth={2} />
          <text x={0} y={10} textAnchor="middle" fontWeight={900} fontSize={16} fill="#2f6f3e">
            NPK
          </text>
        </G>
      );
    case 'soap':
      return (
        <G>
          <rect x={-38} y={-18} width={76} height={40} rx={14} fill="#f7a8c4" stroke="#c76b8f" strokeWidth={2} />
          <circle cx={-26} cy={-28} r={8} fill="none" stroke="#9ad" strokeWidth={2} />
          <circle cx={-10} cy={-36} r={5} fill="none" stroke="#9ad" strokeWidth={2} />
        </G>
      );
    case 'butter':
      return (
        <G>
          <path d="M -40 10 L -20 -20 L 40 -20 L 40 10 Z" fill="#ffe08a" stroke="#c9a227" strokeWidth={2} />
          <rect x={-40} y={10} width={80} height={20} fill="#ffd25e" stroke="#c9a227" strokeWidth={2} />
        </G>
      );
    case 'oilbottle':
      return (
        <G>
          <rect x={-8} y={-46} width={16} height={10} fill="#2f9e44" />
          <path d="M -8 -36 L -20 -20 L -20 40 L 20 40 L 20 -20 L 8 -36 Z" fill="rgba(245,200,40,0.85)" stroke="#b38b00" strokeWidth={2} />
        </G>
      );
    case 'egg':
      return (
        <G>
          <ellipse cx={0} cy={4} rx={28} ry={36} fill="#f5e6c8" stroke="#c8b48a" strokeWidth={2} />
        </G>
      );
    case 'meat':
      return (
        <G>
          <path d="M -40 0 Q -36 -30 0 -30 Q 40 -30 40 0 Q 40 30 0 30 Q -36 30 -40 0 Z" fill="#c0392b" />
          <path d="M -20 -6 Q 0 -16 20 -4" stroke="#f5c6c0" strokeWidth={4} fill="none" />
        </G>
      );
    case 'milk':
      return (
        <G>
          <path d="M -22 -26 L -14 -40 L 14 -40 L 22 -26 L 22 40 L -22 40 Z" fill="#fff" stroke="#8aa0b5" strokeWidth={2} />
          <rect x={-22} y={0} width={44} height={20} fill="#4ea8ff" />
        </G>
      );
    case 'silk':
      return (
        <G>
          <ellipse cx={-14} cy={8} rx={16} ry={24} fill="#fbfaf2" stroke="#c8c2a8" strokeWidth={2} />
          <ellipse cx={16} cy={0} rx={16} ry={24} fill="#fbfaf2" stroke="#c8c2a8" strokeWidth={2} />
        </G>
      );
    case 'grape':
      return (
        <G>
          {[[0, -20], [-12, -6], [12, -6], [-6, 8], [6, 8], [0, 22], [-18, 8], [18, 8]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={9} fill="#7b2d8e" />)}
          <path d="M 0 -30 L 4 -42" stroke="#3a7d2c" strokeWidth={4} />
        </G>
      );
    case 'cane':
      return (
        <G>
          {[-14, 4, 20].map((x) => (
            <g key={x}>
              <rect x={x - 5} y={-40} width={10} height={80} fill="#c7b357" />
              {[-20, 0, 20].map((y) => <line key={y} x1={x - 5} x2={x + 5} y1={y} y2={y} stroke="#7a6a20" strokeWidth={2} />)}
            </g>
          ))}
        </G>
      );
    case 'bread':
      return (
        <G>
          <path d="M -40 30 L -40 -6 Q -40 -34 0 -34 Q 40 -34 40 -6 L 40 30 Z" fill="#e0a458" stroke="#a86b24" strokeWidth={2} />
        </G>
      );
    case 'cotton':
      return (
        <G>
          {[[-14, -8], [14, -8], [0, -26], [0, 8]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={16} fill="#fafafa" stroke="#ccc" />)}
          <path d="M 0 20 L 0 44" stroke="#7a5a2a" strokeWidth={4} />
        </G>
      );
    case 'paper':
      return (
        <G>
          <rect x={-30} y={-38} width={60} height={76} fill="#fff" stroke="#999" strokeWidth={2} />
          {[-20, -8, 4, 16].map((y) => <line key={y} x1={-20} x2={20} y1={y} y2={y} stroke="#bbb" strokeWidth={2} />)}
        </G>
      );
    case 'plastic':
      return (
        <G>
          <rect x={-10} y={-44} width={20} height={10} fill="#1d6fe0" />
          <path d="M -10 -34 Q -26 -24 -24 0 L -24 40 L 24 40 L 24 0 Q 26 -24 10 -34 Z" fill="rgba(160,210,250,0.7)" stroke="#5f7488" strokeWidth={2} />
        </G>
      );
    case 'tire':
      return (
        <G>
          <circle r={38} fill="#2b2b2b" />
          <circle r={18} fill="#9aa3ab" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI) / 6;
            return <line key={i} x1={30 * Math.cos(a)} y1={30 * Math.sin(a)} x2={38 * Math.cos(a)} y2={38 * Math.sin(a)} stroke="#555" strokeWidth={3} />;
          })}
        </G>
      );
    case 'fiber':
      return (
        <G>
          {[-16, -6, 4, 14].map((x, i) => <path key={x} d={`M ${x} -40 Q ${x + 14} 0 ${x} 40`} fill="none" stroke={['#e63946', '#f4a261', '#2a9d8f', '#457b9d'][i]} strokeWidth={6} />)}
        </G>
      );
    case 'composite':
      return (
        <G>
          {[0, 1, 2].map((k) => (
            <rect key={k} x={-40} y={-30 + k * 22} width={80} height={18} fill={['#2a9d8f', '#e9c46a', '#e76f51'][k]} stroke="#555" />
          ))}
        </G>
      );
    case 'recycle':
      return (
        <G>
          {[0, 120, 240].map((a) => (
            <path key={a} d="M 0 -34 L 22 4 L 10 4 L 0 -14 L -10 4" fill="#2f9e44" transform={`rotate(${a})`} />
          ))}
        </G>
      );
    case 'refuse':
      return (
        <G>
          <circle r={36} fill="none" stroke="#d62828" strokeWidth={7} />
          <line x1={-26} y1={-26} x2={26} y2={26} stroke="#d62828" strokeWidth={7} />
          <path d="M -12 -18 L 12 -18 L 10 18 L -10 18 Z" fill="rgba(160,210,250,0.7)" />
        </G>
      );
    case 'reduce':
      return (
        <G>
          <rect x={-30} y={-20} width={44} height={50} rx={6} fill="#2a9d8f" />
          <path d="M -20 -20 Q -8 -40 4 -20" fill="none" stroke="#2a9d8f" strokeWidth={5} />
          <path d="M 20 0 L 34 0 L 34 34 L 20 34" fill="none" stroke="#a5672f" strokeWidth={6} />
        </G>
      );
    case 'reuse':
      return (
        <G>
          <path d="M -20 -30 L 20 -30 L 24 30 L -24 30 Z" fill="rgba(160,210,250,0.7)" stroke="#5f7488" strokeWidth={2} />
          <path d="M 0 -30 Q -16 -44 -6 -50 M 0 -30 Q 16 -44 8 -50" stroke="#3a7d2c" strokeWidth={4} fill="none" />
          <rect x={-24} y={6} width={48} height={24} fill="#8a5a2a" />
        </G>
      );
    case 'renew':
      return (
        <G>
          <circle r={36} fill="#e9f7ef" stroke="#2f9e44" strokeWidth={4} />
          <text y={8} textAnchor="middle" fontWeight={900} fontSize={20} fill="#2f9e44">
            BIO
          </text>
        </G>
      );
    case 'metal':
      return (
        <G>
          <path d="M -40 10 L -24 -12 L 40 -12 L 24 10 Z" fill="#d6dbe0" stroke="#7d8790" strokeWidth={2} />
          <path d="M -40 10 L 24 10 L 24 26 L -40 26 Z" fill="#aeb6be" stroke="#7d8790" strokeWidth={2} />
          <path d="M 24 10 L 40 -12 L 40 4 L 24 26 Z" fill="#c2c9d0" stroke="#7d8790" strokeWidth={2} />
        </G>
      );
    case 'gold':
      return (
        <G>
          <path d="M -40 10 L -24 -12 L 40 -12 L 24 10 Z" fill="#ffe066" stroke="#b8860b" strokeWidth={2} />
          <path d="M -40 10 L 24 10 L 24 26 L -40 26 Z" fill="#f2c94c" stroke="#b8860b" strokeWidth={2} />
          <path d="M 24 10 L 40 -12 L 40 4 L 24 26 Z" fill="#e0b43a" stroke="#b8860b" strokeWidth={2} />
        </G>
      );
    case 'copperwire':
      return (
        <G>
          <path d="M -44 0 L 10 0" stroke="#222" strokeWidth={22} />
          {[-6, 0, 6].map((y) => <path key={y} d={`M 10 ${y} L 44 ${y * 1.6}`} stroke="#c8743a" strokeWidth={4} />)}
        </G>
      );
    case 'pot':
      return (
        <G>
          <path d="M -36 -10 L -32 30 L 32 30 L 36 -10 Z" fill="#cfd5db" stroke="#7d8790" strokeWidth={2} />
          <rect x={-40} y={-16} width={80} height={8} rx={4} fill="#aeb6be" />
          <rect x={-56} y={-6} width={20} height={6} rx={3} fill="#555" />
          <rect x={36} y={-6} width={20} height={6} rx={3} fill="#555" />
        </G>
      );
    case 'bridge':
      return (
        <G>
          <path d="M -46 20 L 46 20" stroke="#7a4a2a" strokeWidth={6} />
          <path d="M -40 20 L -20 -20 L 0 20 L 20 -20 L 40 20 M -20 -20 L 20 -20" stroke="#a0522d" strokeWidth={4} fill="none" />
        </G>
      );
    case 'plane':
      return (
        <G>
          <path d="M -44 0 L 40 -4 Q 48 0 40 4 L -44 0 Z" fill="#9aa8b6" stroke="#5f7488" strokeWidth={2} />
          <path d="M 0 -2 L -16 -30 L -6 -30 L 14 -2 Z M 0 2 L -16 30 L -6 30 L 14 2 Z M -36 0 L -44 -14 L -38 -14 L -28 0 Z" fill="#7d8b99" />
        </G>
      );
    case 'mask':
      return (
        <G>
          <path d="M -36 -16 Q 0 -28 36 -16 L 30 18 Q 0 34 -30 18 Z" fill="#3b3b3b" />
          <circle cx={-14} cy={4} r={8} fill="#777" />
          <circle cx={14} cy={4} r={8} fill="#777" />
        </G>
      );
    case 'filter':
      return (
        <G>
          <rect x={-24} y={-40} width={48} height={80} rx={8} fill="#e9edf2" stroke="#5f7488" strokeWidth={2} />
          <rect x={-18} y={-10} width={36} height={30} fill="#222" />
          <path d="M 0 -50 L 0 -40" stroke="#4ea8ff" strokeWidth={6} />
        </G>
      );
    case 'pencil':
      return (
        <G>
          <path d="M -40 10 L 26 -24 L 36 -6 L -30 28 Z" fill="#f2c94c" stroke="#a07a20" strokeWidth={2} />
          <path d="M 26 -24 L 44 -24 L 36 -6 Z" fill="#e8d3a2" />
          <path d="M 40 -20 L 44 -24 L 42 -16 Z" fill="#333" />
        </G>
      );
    case 'diamond':
      return (
        <G>
          <path d="M -36 -10 L -20 -30 L 20 -30 L 36 -10 L 0 36 Z" fill="#e0f4ff" stroke="#6aa9d8" strokeWidth={2} />
          <path d="M -36 -10 L 36 -10 M -20 -30 L -8 -10 L 0 36 L 8 -10 L 20 -30" fill="none" stroke="#6aa9d8" strokeWidth={1.5} />
        </G>
      );
    case 'sulfur':
      return (
        <G>
          <ellipse cx={0} cy={14} rx={42} ry={20} fill="#e8eef5" stroke="#9aa" strokeWidth={2} />
          <ellipse cx={0} cy={6} rx={34} ry={14} fill="#f4d03f" />
        </G>
      );
    case 'chlorine':
      return (
        <G>
          <rect x={-26} y={-34} width={52} height={72} rx={10} fill="rgba(200,230,120,0.6)" stroke="#5f7488" strokeWidth={2} />
          <text x={0} y={10} textAnchor="middle" fontWeight={900} fontSize={22} fill="#3a6b1e">
            Cl₂
          </text>
        </G>
      );
    case 'pool':
      return (
        <G>
          <rect x={-44} y={-6} width={88} height={40} fill="#4ea8ff" />
          <path d="M -30 -30 L -30 34 M -14 -30 L -14 34 M -30 -16 L -14 -16 M -30 4 L -14 4" stroke="#999" strokeWidth={4} />
        </G>
      );
    case 'chip':
      return (
        <G>
          <rect x={-26} y={-26} width={52} height={52} rx={4} fill="#2b2b2b" />
          {[-16, -6, 4, 14].map((v) => (
            <g key={v}>
              <line x1={v} y1={-26} x2={v} y2={-38} stroke="#c0c6cc" strokeWidth={3} />
              <line x1={v} y1={26} x2={v} y2={38} stroke="#c0c6cc" strokeWidth={3} />
            </g>
          ))}
          <rect x={-12} y={-12} width={24} height={24} fill="#555" />
        </G>
      );
    case 'solar':
      return (
        <G>
          <path d="M -44 20 L -30 -24 L 44 -24 L 30 20 Z" fill="#1d3f8a" stroke="#888" strokeWidth={2} />
          <path d="M -20 -24 L -32 20 M 6 -24 L -4 20 M 30 -24 L 22 20 M -38 -2 L 38 -2" stroke="#6aa9d8" strokeWidth={1.5} />
        </G>
      );
    case 'glass':
      return (
        <G>
          <path d="M -24 -36 L -18 36 L 18 36 L 24 -36 Z" fill="rgba(200,230,250,0.6)" stroke="#5f7488" strokeWidth={3} />
          <path d="M -16 -26 L -12 26" stroke="#fff" strokeWidth={4} />
        </G>
      );
    case 'ceramic':
      return (
        <G>
          <path d="M -14 -38 L 14 -38 L 12 -26 Q 36 -10 30 14 Q 24 38 0 38 Q -24 38 -30 14 Q -36 -10 -12 -26 Z" fill="#f2f2ee" stroke="#1d4f91" strokeWidth={3} />
          <path d="M -22 4 Q 0 -10 22 4 Q 0 18 -22 4" fill="none" stroke="#1d4f91" strokeWidth={2} />
        </G>
      );
    case 'cement':
      return (
        <G>
          <path d="M -34 -30 L 34 -30 L 38 40 L -38 40 Z" fill="#9aa1a8" stroke="#666" strokeWidth={2} />
          <text x={0} y={12} textAnchor="middle" fontWeight={900} fontSize={13} fill="#fff">
            XI MĂNG
          </text>
        </G>
      );
    case 'brick':
      return (
        <G>
          {[0, 1, 2].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={-40 + c * 40 + (r % 2) * 20 - 10} y={-30 + r * 22} width={38} height={20} fill="#c0573b" stroke="#7a2e1c" />))}
        </G>
      );
    case 'lime':
      return (
        <G>
          <path d="M -40 36 L -30 6 L -10 -6 L 14 -2 L 34 10 L 40 36 Z" fill="#f4f1e8" stroke="#a9a28c" strokeWidth={2} />
          <path d="M -20 0 Q -16 -24 -4 -30 M 8 -2 Q 12 -24 24 -28" stroke="#ccc" strokeWidth={4} fill="none" opacity={0.7} />
        </G>
      );
    case 'mountain':
      return (
        <G>
          <path d="M -46 36 L -20 -20 L -6 0 L 12 -36 L 46 36 Z" fill="#9aa59a" stroke="#5f6b5f" strokeWidth={2} />
        </G>
      );
    case 'volcano':
      return (
        <G>
          <path d="M -46 36 L -14 -16 L 14 -16 L 46 36 Z" fill="#7a5a44" />
          <path d="M -14 -16 Q 0 -40 14 -16 Z" fill="#ff7b00" />
          <circle cx={-4} cy={-36} r={8} fill="#aaa" />
          <circle cx={8} cy={-44} r={10} fill="#bbb" />
        </G>
      );
    case 'tree':
      return (
        <G>
          <rect x={-5} y={0} width={10} height={40} fill="#7a4a2a" />
          <circle cx={0} cy={-14} r={26} fill="#3a9d48" />
        </G>
      );
    case 'cow':
      return (
        <G>
          <ellipse cx={0} cy={0} rx={34} ry={18} fill="#fff" stroke="#333" strokeWidth={2} />
          <circle cx={-10} cy={-4} r={6} fill="#333" />
          <circle cx={36} cy={-10} r={11} fill="#fff" stroke="#333" strokeWidth={2} />
          {[-22, -8, 10, 24].map((x) => <line key={x} x1={x} y1={16} x2={x} y2={34} stroke="#333" strokeWidth={4} />)}
        </G>
      );
    case 'trash':
      return (
        <G>
          <path d="M -28 -20 L 28 -20 L 22 40 L -22 40 Z" fill="#6b7480" />
          <rect x={-34} y={-30} width={68} height={10} fill="#4b5563" />
          <path d="M -10 -14 L -8 34 M 10 -14 L 8 34" stroke="#9aa3ab" strokeWidth={3} />
        </G>
      );
    case 'ocean':
      return (
        <G>
          <rect x={-46} y={-10} width={92} height={46} fill="#2a7fc1" />
          <path d="M -46 -10 q 12 -10 23 0 t 23 0 t 23 0 t 23 0" fill="#2a7fc1" stroke="#7fc1f0" strokeWidth={3} />
        </G>
      );
    case 'thermo':
      return (
        <G>
          <rect x={-7} y={-42} width={14} height={66} rx={7} fill="#fff" stroke="#555" strokeWidth={2} />
          <rect x={-3} y={-20} width={6} height={42} fill="#e63946" />
          <circle cy={30} r={12} fill="#e63946" />
        </G>
      );
    case 'magnet':
      return (
        <G>
          <path d="M -30 -36 L -30 10 A 30 30 0 0 0 30 10 L 30 -36 L 14 -36 L 14 10 A 14 14 0 0 1 -14 10 L -14 -36 Z" fill="#d62828" />
          <rect x={-30} y={-36} width={16} height={14} fill="#9aa3ab" />
          <rect x={14} y={-36} width={16} height={14} fill="#9aa3ab" />
        </G>
      );
    case 'alcohol':
      return (
        <G>
          <rect x={-8} y={-44} width={16} height={10} fill="#1d6fe0" />
          <path d="M -8 -34 L -20 -18 L -20 40 L 20 40 L 20 -18 L 8 -34 Z" fill="rgba(220,240,255,0.8)" stroke="#5f7488" strokeWidth={2} />
          <text x={0} y={16} textAnchor="middle" fontSize={13} fontWeight={900} fill="#1d6fe0">
            70°
          </text>
        </G>
      );
    case 'vinegar':
      return (
        <G>
          <rect x={-8} y={-44} width={16} height={10} fill="#e9c46a" />
          <path d="M -8 -34 L -20 -18 L -20 40 L 20 40 L 20 -18 L 8 -34 Z" fill="rgba(250,240,200,0.85)" stroke="#a08a4a" strokeWidth={2} />
          <rect x={-16} y={0} width={32} height={18} fill="#2f9e44" />
        </G>
      );
    case 'pill':
      return (
        <G>
          <rect x={-36} y={-14} width={72} height={28} rx={14} fill="#fff" stroke="#999" strokeWidth={2} />
          <path d="M 0 -14 L 0 14" stroke="#999" strokeWidth={2} />
          <path d="M 0 -14 L 22 -14 A 14 14 0 0 1 22 14 L 0 14 Z" fill="#e63946" />
        </G>
      );
    case 'paint':
      return (
        <G>
          <path d="M -30 -20 L -30 36 L 30 36 L 30 -20 Z" fill="#cfd5db" stroke="#666" strokeWidth={2} />
          <ellipse cx={0} cy={-20} rx={30} ry={8} fill="#1d6fe0" />
          <path d="M -30 -20 Q -40 -40 0 -44 Q 40 -40 30 -20" fill="none" stroke="#666" strokeWidth={2} />
        </G>
      );
    case 'detergent':
      return (
        <G>
          <path d="M -20 -30 L 20 -30 L 24 40 L -24 40 Z" fill="#2a9d8f" />
          <rect x={-8} y={-44} width={16} height={14} fill="#e9c46a" />
          <rect x={-16} y={0} width={32} height={20} fill="#fff" />
        </G>
      );
    case 'battery2':
      return (
        <G>
          <rect x={-18} y={-36} width={36} height={72} rx={5} fill="#2b2b2b" />
          <rect x={-8} y={-42} width={16} height={6} fill="#999" />
          <rect x={-18} y={-36} width={36} height={24} rx={5} fill="#2f9e44" />
        </G>
      );
    case 'water':
      return (
        <G>
          <path d="M -34 -20 L -30 40 L 30 40 L 34 -20 Z" fill="rgba(160,210,250,0.6)" stroke="#5f7488" strokeWidth={2} />
          <path d="M -32 0 q 8 -6 16 0 t 16 0 t 16 0 t 16 0" stroke="#fff" strokeWidth={3} fill="none" />
        </G>
      );
    // ---------- KHTN 7 ----------
    case 'eye':
      return (
        <G>
          <path d="M -44 0 Q 0 -40 44 0 Q 0 40 -44 0 Z" fill="#fff" stroke="#333" strokeWidth={4} />
          <circle r={16} fill="#3a6fd8" />
          <circle r={7} fill="#111" />
        </G>
      );
    case 'sort':
      return (
        <G>
          <rect x={-44} y={-40} width={36} height={36} rx={6} fill="#e63946" />
          <rect x={8} y={-40} width={36} height={36} rx={6} fill="#1d6fe0" />
          <circle cx={-26} cy={24} r={18} fill="#e63946" />
          <circle cx={26} cy={24} r={18} fill="#1d6fe0" />
        </G>
      );
    case 'link':
      return (
        <G>
          <rect x={-44} y={-16} width={52} height={32} rx={16} fill="none" stroke="#2a9d8f" strokeWidth={8} />
          <rect x={-8} y={-16} width={52} height={32} rx={16} fill="none" stroke="#e76f51" strokeWidth={8} />
        </G>
      );
    case 'ruler':
      return (
        <G>
          <rect x={-46} y={-14} width={92} height={28} fill="#ffd166" stroke="#8a6d00" strokeWidth={3} />
          {[-36, -24, -12, 0, 12, 24, 36].map((x, i) => <line key={x} x1={x} x2={x} y1={-14} y2={i % 2 ? -4 : 2} stroke="#333" strokeWidth={2} />)}
        </G>
      );
    case 'forecast':
      return (
        <G>
          <path d="M -40 36 L -40 -40 M -40 36 L 44 36" stroke="#333" strokeWidth={4} fill="none" />
          <path d="M -32 24 L -12 4 L 4 12 L 22 -12" stroke="#1d6fe0" strokeWidth={5} fill="none" />
          <path d="M 22 -12 L 40 -34" stroke="#e63946" strokeWidth={5} strokeDasharray="6 5" fill="none" />
        </G>
      );
    case 'stopwatch':
      return (
        <G>
          <rect x={-8} y={-48} width={16} height={10} fill="#666" />
          <circle cy={6} r={38} fill="#fff" stroke="#333" strokeWidth={5} />
          <line x1={0} y1={6} x2={0} y2={-22} stroke="#e63946" strokeWidth={4} />
          <line x1={0} y1={6} x2={16} y2={14} stroke="#333" strokeWidth={4} />
        </G>
      );
    case 'gate':
      return (
        <G>
          <path d="M -30 40 L -30 -36 L 30 -36 L 30 40" fill="none" stroke="#2b2f36" strokeWidth={10} />
          <rect x={-38} y={-6} width={14} height={20} fill="#e63946" />
          <rect x={24} y={-6} width={14} height={20} fill="#e63946" />
          <line x1={-24} y1={4} x2={24} y2={4} stroke="#ff4d4d" strokeWidth={2} strokeDasharray="4 4" />
        </G>
      );
    case 'timer':
      return (
        <G>
          <rect x={-46} y={-30} width={92} height={60} rx={8} fill="#e9edf2" stroke="#555" strokeWidth={3} />
          <rect x={-38} y={-20} width={56} height={26} fill="#1b1f24" />
          <text x={-10} y={0} textAnchor="middle" fill="#ff4d4d" fontSize={16} fontWeight={900} fontFamily="monospace">
            0.52
          </text>
          <circle cx={32} cy={-8} r={7} fill="#e63946" />
          <circle cx={32} cy={14} r={6} fill="#555" />
        </G>
      );
    case 'scale':
      return (
        <G>
          <rect x={-44} y={0} width={88} height={34} rx={6} fill="#dfe3e6" stroke="#555" strokeWidth={3} />
          <rect x={-26} y={8} width={52} height={18} fill="#1b1f24" />
          <text y={22} textAnchor="middle" fill="#2bdc4a" fontSize={13} fontWeight={900} fontFamily="monospace">
            125.4
          </text>
          <rect x={-36} y={-10} width={72} height={10} rx={3} fill="#9aa5b1" />
          <rect x={-22} y={-40} width={44} height={30} fill="#1d6fe0" />
        </G>
      );
    case 'question':
      return (
        <G>
          <circle r={40} fill="#ffd166" stroke="#8a6d00" strokeWidth={4} />
          <text y={18} textAnchor="middle" fontSize={54} fontWeight={900} fill="#5c4400">
            ?
          </text>
        </G>
      );
    case 'idea':
      return (
        <G>
          <circle cy={-10} r={30} fill="#fff3b0" stroke="#a68a00" strokeWidth={4} />
          <rect x={-14} y={18} width={28} height={20} rx={4} fill="#9aa5b1" />
          <path d="M -8 -6 L 0 6 L 8 -6" stroke="#a68a00" strokeWidth={3} fill="none" />
        </G>
      );
    case 'conclude':
      return (
        <G>
          <circle r={40} fill="#2a9d8f" />
          <path d="M -20 0 L -4 16 L 22 -16" stroke="#fff" strokeWidth={8} fill="none" />
        </G>
      );
    case 'atom':
      return (
        <G>
          <ellipse rx={44} ry={16} fill="none" stroke="#1d6fe0" strokeWidth={3} />
          <ellipse rx={44} ry={16} fill="none" stroke="#1d6fe0" strokeWidth={3} transform="rotate(60)" />
          <ellipse rx={44} ry={16} fill="none" stroke="#1d6fe0" strokeWidth={3} transform="rotate(-60)" />
          <circle r={9} fill="#e63946" />
        </G>
      );
    default:
      return (
        <G>
          <circle r={34} fill="var(--surface-2)" stroke="var(--line)" strokeWidth={3} />
          <text y={8} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--ink-2)">
            ?
          </text>
        </G>
      );
  }
}
