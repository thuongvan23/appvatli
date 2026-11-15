// KHTN 9 Bài 1: nhận biết dụng cụ, tập đọc số chỉ, cấu trúc báo cáo.
import { useMemo, useState } from 'react';
import type { EngineProps } from '../../core/types';
import { Row, Seg } from '../../ui/controls';
import { Dial, majorStep } from '../circuit/glyphs';
import { fmtShort } from '../../core/format';

export interface ToolsDoc {
  mode: 'tools';
}
export interface QuizDoc {
  mode: 'meterQuiz';
  unit: 'A' | 'V';
  range: number;
  seed: number;
}
export interface ReportGuideDoc {
  mode: 'reportGuide';
  step: number;
}

const TOOLS: { name: string; icon: string; use: string; note: string }[] = [
  { name: 'Biến áp nguồn', icon: 'supply', use: 'Biến đổi điện áp xoay chiều 220 V thành điện áp một chiều hoặc xoay chiều nhỏ (3 V, 6 V, 12 V…) để làm thí nghiệm.', note: 'Bật công tắc sau khi đã mắc xong mạch; chọn đúng loại điện áp (AC/DC).' },
  { name: 'Đồng hồ đo điện đa năng', icon: 'multimeter', use: 'Đo hiệu điện thế, cường độ dòng điện, điện trở. Xoay núm chọn đại lượng và thang đo.', note: 'Chọn thang đo lớn trước rồi giảm dần; không đo điện trở khi mạch đang có điện.' },
  { name: 'Ampe kế', icon: 'ammeter', use: 'Đo cường độ dòng điện. Mắc nối tiếp với đoạn mạch cần đo.', note: 'Chốt (+) nối về phía cực dương của nguồn; chọn GHĐ phù hợp.' },
  { name: 'Vôn kế', icon: 'voltmeter', use: 'Đo hiệu điện thế. Mắc song song với đoạn mạch cần đo.', note: 'Chốt (+) nối về phía cực dương của nguồn.' },
  { name: 'Joulemeter', icon: 'joule', use: 'Đo năng lượng điện cung cấp cho thiết bị (đơn vị J), đồng thời đo công suất, thời gian.', note: 'Mắc giữa nguồn điện và thiết bị cần đo năng lượng.' },
  { name: 'Điện kế', icon: 'galvano', use: 'Phát hiện dòng điện rất nhỏ và chiều của dòng điện (kim lệch sang hai phía của vạch 0).', note: 'Dùng trong thí nghiệm cảm ứng điện từ.' },
  { name: 'Đèn laze', icon: 'laser', use: 'Tạo chùm sáng hẹp để quan sát đường truyền ánh sáng.', note: 'Tuyệt đối không chiếu tia laze vào mắt.' },
  { name: 'Bán trụ, lăng kính, thấu kính', icon: 'lens', use: 'Khảo sát khúc xạ, phản xạ toàn phần, tán sắc, sự tạo ảnh.', note: 'Cầm vào phần mặt mờ, tránh để vân tay trên mặt quang học.' },
  { name: 'Lực kế', icon: 'spring', use: 'Đo độ lớn của lực (đơn vị N).', note: 'Hiệu chỉnh kim về vạch 0 trước khi đo.' },
  { name: 'Cân điện tử', icon: 'scale', use: 'Đo khối lượng của vật.', note: 'Nhấn nút "Tare/Zero" để đưa về 0 trước khi cân.' },
  { name: 'Nhiệt kế', icon: 'thermo', use: 'Đo nhiệt độ (°C).', note: 'Đọc khi mực chất lỏng (hoặc số hiển thị) đã ổn định.' },
  { name: 'Đồng hồ bấm giây', icon: 'timer', use: 'Đo khoảng thời gian.', note: 'Bấm "Reset" trước khi đo.' },
];

function ToolIcon({ kind }: { kind: string }) {
  switch (kind) {
    case 'supply':
      return (
        <g>
          <rect x={-40} y={-30} width={80} height={60} rx={8} fill="#e8edf3" stroke="#555" strokeWidth={2} />
          <rect x={-26} y={-20} width={52} height={20} fill="#11231a" />
          <circle cx={-22} cy={16} r={6} fill="#222" />
          <circle cx={22} cy={16} r={6} fill="#d62828" />
        </g>
      );
    case 'multimeter':
      return (
        <g>
          <rect x={-28} y={-40} width={56} height={80} rx={8} fill="#f4c430" stroke="#555" strokeWidth={2} />
          <rect x={-20} y={-32} width={40} height={20} fill="#c8d8c0" />
          <circle cx={0} cy={12} r={14} fill="#333" />
          <line x1={0} y1={12} x2={8} y2={2} stroke="#fff" strokeWidth={3} />
        </g>
      );
    case 'ammeter':
    case 'voltmeter':
      return (
        <g>
          <circle r={34} fill="#fffdf5" stroke={kind === 'ammeter' ? '#d62828' : '#1d4fd8'} strokeWidth={5} />
          <text textAnchor="middle" dominantBaseline="central" fontSize={30} fontWeight={900} fill={kind === 'ammeter' ? '#d62828' : '#1d4fd8'}>
            {kind === 'ammeter' ? 'A' : 'V'}
          </text>
        </g>
      );
    case 'joule':
      return (
        <g>
          <rect x={-40} y={-30} width={80} height={60} rx={8} fill="#2b3a55" />
          <rect x={-30} y={-20} width={60} height={22} fill="#11231a" />
          <text y={-5} textAnchor="middle" fill="#6dff9f" fontSize={13} fontWeight={700}>
            1250 J
          </text>
        </g>
      );
    case 'galvano':
      return (
        <g>
          <rect x={-38} y={-30} width={76} height={56} rx={8} fill="#f3f0e6" stroke="#8a7f62" strokeWidth={2} />
          <path d="M -26 6 A 30 30 0 0 1 26 6" fill="none" stroke="#333" strokeWidth={2} />
          <line x1={0} y1={10} x2={0} y2={-20} stroke="#d62828" strokeWidth={3} />
        </g>
      );
    case 'laser':
      return (
        <g>
          <rect x={-40} y={-12} width={60} height={24} rx={6} fill="#2c3440" />
          <line x1={20} y1={0} x2={44} y2={0} stroke="#ff2a2a" strokeWidth={4} />
        </g>
      );
    case 'lens':
      return (
        <g>
          <path d="M -36 0 A 36 36 0 0 1 36 0 Z" fill="rgba(150,210,255,0.6)" stroke="#2a6bb0" strokeWidth={2} transform="translate(-14 10)" />
          <path d="M 0 -30 Q 14 0 0 30 Q -14 0 0 -30 Z" fill="rgba(150,210,255,0.6)" stroke="#2a6bb0" strokeWidth={2} transform="translate(30 0)" />
        </g>
      );
    case 'spring':
      return (
        <g>
          <rect x={-14} y={-40} width={28} height={80} rx={6} fill="#f3f0e6" stroke="#8a7f62" strokeWidth={2} />
          <path d="M 0 -32 l 8 6 l -16 6 l 16 6 l -16 6 l 16 6 l -8 4" fill="none" stroke="#666" strokeWidth={2} />
        </g>
      );
    case 'scale':
      return (
        <g>
          <rect x={-40} y={-10} width={80} height={34} rx={6} fill="#e9edf2" stroke="#555" strokeWidth={2} />
          <rect x={-34} y={-22} width={68} height={10} rx={3} fill="#c8cfd8" />
          <rect x={-20} y={0} width={40} height={16} fill="#11231a" />
        </g>
      );
    case 'thermo':
      return (
        <g>
          <rect x={-6} y={-40} width={12} height={66} rx={6} fill="#fff" stroke="#555" />
          <circle cy={30} r={11} fill="#e63946" />
          <rect x={-3} y={-10} width={6} height={36} fill="#e63946" />
        </g>
      );
    default:
      return (
        <g>
          <circle r={30} fill="#fff" stroke="#555" strokeWidth={3} />
          <rect x={-6} y={-42} width={12} height={10} fill="#555" />
          <line x1={0} y1={0} x2={0} y2={-20} stroke="#d62828" strokeWidth={3} />
        </g>
      );
  }
}

export function ToolsView(_: EngineProps<ToolsDoc, unknown>) {
  const [sel, setSel] = useState(0);
  const t = TOOLS[sel];
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          {TOOLS.map((tool, i) => {
            const x = 150 + (i % 4) * 300;
            const y = 120 + Math.floor(i / 4) * 210;
            return (
              <g key={i} onPointerDown={() => setSel(i)} className="draggable">
                <rect x={x - 120} y={y - 80} width={240} height={180} rx={16} fill={i === sel ? 'var(--accent-soft)' : 'var(--surface)'} stroke={i === sel ? 'var(--accent)' : 'var(--line)'} strokeWidth={i === sel ? 3 : 1.5} />
                <g transform={`translate(${x} ${y})`}>
                  <ToolIcon kind={tool.icon} />
                </g>
                <text x={x} y={y + 75} textAnchor="middle" className="lab-label" style={{ fontSize: 17 }}>
                  {tool.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>{t.name}</h3>
        <div className="insp-row">
          <div className="insp-label">Công dụng</div>
          <p>{t.use}</p>
        </div>
        <div className="insp-row">
          <div className="insp-label">Lưu ý khi sử dụng</div>
          <p>{t.note}</p>
        </div>
        <p className="small muted">Bấm vào từng dụng cụ để xem công dụng và cách sử dụng.</p>
      </aside>
    </div>
  );
}

function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export function MeterQuizView({ doc, onDoc, showValues }: EngineProps<QuizDoc, unknown>) {
  const step = majorStep(doc.range) / 5;
  const value = useMemo(() => Math.round((rand(doc.seed) * 0.9 + 0.05) * (doc.range / step)) * step, [doc.seed, doc.range, step]);
  const [answer, setAnswer] = useState('');
  const num = Number(answer.replace(',', '.'));
  const correct = answer !== '' && Math.abs(num - value) <= step / 2 + 1e-9;
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="-270 -265 540 300" className="eng-svg">
          <Dial cx={0} cy={0} r={240} value={value} range={doc.range} unit={doc.unit} showValues detailed />
        </svg>
      </div>
      <aside className="eng-side">
        <Row label="Loại đồng hồ">
          <Seg value={doc.unit} options={['A', 'V'] as const} onChange={(u) => onDoc({ ...doc, unit: u, range: u === 'A' ? 1 : 6 })} fmtOpt={(u) => (u === 'A' ? 'Ampe kế' : 'Vôn kế')} />
        </Row>
        <Row label="Giới hạn đo (GHĐ)">
          <Seg value={doc.range} options={doc.unit === 'A' ? [0.6, 1, 3] : [3, 6, 15]} onChange={(r) => onDoc({ ...doc, range: r })} fmtOpt={(r) => `${r.toLocaleString('vi-VN')} ${doc.unit}`} />
        </Row>
        <div className="insp-values two">
          <div>
            <span>GHĐ</span>
            <b>
              {doc.range.toLocaleString('vi-VN')} {doc.unit}
            </b>
          </div>
          <div>
            <span>ĐCNN</span>
            <b>{showValues ? `${fmtShort(step, 3)} ${doc.unit}` : '?'}</b>
          </div>
        </div>
        <Row label="Số chỉ của đồng hồ là">
          <div className="slider">
            <input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Nhập số…" style={{ width: 120, fontSize: 20 }} />
            <b>{doc.unit}</b>
          </div>
        </Row>
        {answer !== '' && <p className="nature" style={{ color: correct ? 'var(--ok)' : 'var(--danger)' }}>{correct ? 'Chính xác!' : 'Chưa đúng, thử lại.'}</p>}
        {showValues && (
          <p className="small">
            Đáp án: {fmtShort(value, 3)} {doc.unit}
          </p>
        )}
        <button
          className="btn primary big"
          onClick={() => {
            setAnswer('');
            onDoc({ ...doc, seed: doc.seed + 1 });
          }}
        >
          Câu khác
        </button>
      </aside>
    </div>
  );
}

const REPORT_STEPS = [
  { t: 'Tên đề tài, người thực hiện', d: 'Ghi rõ tên vấn đề nghiên cứu, họ tên, lớp, ngày thực hiện.' },
  { t: 'Mục đích nghiên cứu', d: 'Nêu câu hỏi cần trả lời hoặc giả thuyết cần kiểm chứng.' },
  { t: 'Phương pháp, dụng cụ', d: 'Liệt kê dụng cụ, vật liệu; mô tả các bước tiến hành thí nghiệm.' },
  { t: 'Kết quả', d: 'Trình bày số liệu bằng bảng, đồ thị, hình ảnh; xử lí số liệu (tính trung bình, sai số).' },
  { t: 'Thảo luận', d: 'Giải thích kết quả, so sánh với lí thuyết, nêu nguyên nhân sai số.' },
  { t: 'Kết luận', d: 'Trả lời câu hỏi nghiên cứu; đề xuất hướng mở rộng.' },
  { t: 'Tài liệu tham khảo', d: 'Ghi các nguồn tài liệu đã sử dụng.' },
];

export function ReportGuideView({ doc, onDoc }: EngineProps<ReportGuideDoc, unknown>) {
  return (
    <div className="eng">
      <div className="eng-stage lab-bg">
        <svg viewBox="0 0 1200 680" className="eng-svg">
          {REPORT_STEPS.map((s, i) => {
            const y = 60 + i * 86;
            const on = i <= doc.step;
            return (
              <g key={i} onPointerDown={() => onDoc({ ...doc, step: i })} className="draggable" opacity={on ? 1 : 0.35}>
                <rect x={150} y={y} width={900} height={70} rx={14} fill={i === doc.step ? 'var(--accent-soft)' : 'var(--surface)'} stroke={i === doc.step ? 'var(--accent)' : 'var(--line)'} strokeWidth={2} />
                <circle cx={195} cy={y + 35} r={22} fill="var(--accent)" />
                <text x={195} y={y + 36} textAnchor="middle" dominantBaseline="central" fill="#fff" fontWeight={900} fontSize={20}>
                  {i + 1}
                </text>
                <text x={235} y={y + 28} className="lab-label">
                  {s.t}
                </text>
                <text x={235} y={y + 54} className="lab-small">
                  {on ? s.d : ''}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <aside className="eng-side">
        <h3>Cấu trúc báo cáo một vấn đề khoa học</h3>
        <div className="insp-actions">
          <button className="btn" disabled={doc.step <= 0} onClick={() => onDoc({ ...doc, step: doc.step - 1 })}>
            ← Mục trước
          </button>
          <button className="btn primary" disabled={doc.step >= REPORT_STEPS.length - 1} onClick={() => onDoc({ ...doc, step: doc.step + 1 })}>
            Mục tiếp →
          </button>
        </div>
        <p className="small">Khi thuyết trình: nói ngắn gọn, rõ ràng; dùng hình ảnh, đồ thị minh hoạ; chuẩn bị trả lời câu hỏi.</p>
        <p className="small muted">Mỗi bài thực hành trong phòng lab đều có nút “Báo cáo” để ghi số liệu và in báo cáo theo mẫu này.</p>
      </aside>
    </div>
  );
}
