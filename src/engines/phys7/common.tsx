// Tiện ích dùng chung cho các engine Vật lí 7 (chuyển động, âm thanh, ánh sáng, từ).
import { useEffect, useRef } from 'react';

export const VW = 1200;
export const VH = 680;

export { useRaf } from '../mechanics/LeverViews';

export function Arrow({ x1, y1, x2, y2, color = 'var(--ink)', width = 4, head = 16, dash }: { x1: number; y1: number; x2: number; y2: number; color?: string; width?: number; head?: number; dash?: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const L = Math.hypot(x2 - x1, y2 - y1);
  if (L < 1) return null;
  const hl = Math.min(head, L * 0.6);
  const bx = x2 - Math.cos(a) * hl;
  const by = y2 - Math.sin(a) * hl;
  const w = hl * 0.5;
  return (
    <g>
      <line x1={x1} y1={y1} x2={bx} y2={by} stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash} />
      <path d={`M ${x2} ${y2} L ${bx + Math.sin(a) * w} ${by - Math.cos(a) * w} L ${bx - Math.sin(a) * w} ${by + Math.cos(a) * w} Z`} fill={color} />
    </g>
  );
}

/** Số kiểu Việt Nam: dấu phẩy thập phân. */
export function vn(x: number, digits = 2): string {
  if (!Number.isFinite(x)) return '–';
  return x.toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: digits });
}

/** Số cố định số chữ số thập phân (đồng hồ hiện số). */
export function fixed(x: number, digits: number): string {
  return x.toFixed(digits).replace('.', ',');
}

/** Nhiễu nhỏ có thể lặp lại theo số lần đo (để mỗi lần đo cho kết quả hơi khác nhau). */
export function jitter(seed: number, amp: number): number {
  const s = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return (s - Math.floor(s) - 0.5) * 2 * amp;
}

// ---------------- Âm thanh thật qua loa máy tính (Web Audio) ----------------

let ctx: AudioContext | null = null;
function audio(): AudioContext | null {
  try {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

/** Phát một âm ngắn có tần số f (Hz), độ to a (0..1), tắt dần trong dur giây. */
export function pluck(f: number, a: number, dur = 1.2, type: OscillatorType = 'sine') {
  const ac = audio();
  if (!ac || f < 20 || f > 20000 || a <= 0) return;
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = type;
  o.frequency.value = f;
  const t = ac.currentTime;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002, 0.35 * a * a), t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(ac.destination);
  o.start(t);
  o.stop(t + dur + 0.05);
}

/** Âm liên tục: bật khi on = true, cập nhật tần số và độ to theo thời gian thực. */
export function useTone(on: boolean, f: number, a: number) {
  const ref = useRef<{ o: OscillatorNode; g: GainNode } | null>(null);
  useEffect(() => {
    if (!on) return;
    const ac = audio();
    if (!ac) return;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = 'sine';
    g.gain.value = 0;
    o.connect(g).connect(ac.destination);
    o.start();
    ref.current = { o, g };
    return () => {
      const t = ac.currentTime;
      g.gain.setTargetAtTime(0, t, 0.03);
      o.stop(t + 0.2);
      ref.current = null;
    };
  }, [on]);
  useEffect(() => {
    const r = ref.current;
    const ac = ctx;
    if (!r || !ac) return;
    const audible = f >= 20 && f <= 20000;
    r.o.frequency.setTargetAtTime(Math.min(20000, Math.max(20, f)), ac.currentTime, 0.02);
    r.g.gain.setTargetAtTime(audible ? 0.3 * a * a : 0, ac.currentTime, 0.03);
  }, [f, a, on]);
}

/** Đèn LED 7 đoạn đơn giản: dùng font số, nền tối. */
export function Lcd({ x, y, w, h, text, color = '#ff4d4d' }: { x: number; y: number; w: number; h: number; text: string; color?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill="#1b1f24" stroke="#555" strokeWidth={2} />
      <text x={x + w - 14} y={y + h * 0.74} textAnchor="end" fontFamily="'Courier New', monospace" fontWeight={900} fontSize={h * 0.7} fill={color}>
        {text}
      </text>
    </g>
  );
}
