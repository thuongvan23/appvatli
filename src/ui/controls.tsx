// Các điều khiển dùng chung cho bảng thông số của mọi engine.
import { ReactNode, RefObject, useCallback, useRef } from 'react';
import { fmtShort } from '../core/format';

export function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="insp-row">
      {label && <div className="insp-label">{label}</div>}
      <div className="insp-ctl">{children}</div>
    </div>
  );
}

export function Seg<T extends string | number>({ value, options, onChange, fmtOpt }: { value: T; options: readonly T[]; onChange: (v: T) => void; fmtOpt?: (v: T) => string }) {
  return (
    <div className="seg wrap">
      {options.map((o) => (
        <button key={String(o)} className={o === value ? 'on' : ''} onClick={() => onChange(o)}>
          {fmtOpt ? fmtOpt(o) : String(o)}
        </button>
      ))}
    </div>
  );
}

export function Slider({ value, min, max, step, onChange, suffix, digits = 2 }: { value: number; min: number; max: number; step: number; onChange: (v: number) => void; suffix?: string; digits?: number }) {
  return (
    <div className="slider">
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      <span className="slider-val">
        {fmtShort(value, digits)}
        {suffix ? ` ${suffix}` : ''}
      </span>
    </div>
  );
}

export function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

/** Ô hiển thị giá trị đo lớn (dùng trong bảng bên phải). */
export function Readout({ label, value, hidden }: { label: string; value: string; hidden?: boolean }) {
  return (
    <div className="readout-box">
      <span>{label}</span>
      <b>{hidden ? '?' : value}</b>
    </div>
  );
}

export interface SvgPt {
  x: number;
  y: number;
}

/** Đổi toạ độ con trỏ sang toạ độ SVG và hỗ trợ kéo thả bằng chuột/cảm ứng. */
export function useSvgDrag(svgRef: RefObject<SVGSVGElement>) {
  const active = useRef<{ move: (p: SvgPt, start: SvgPt) => void; end?: () => void; start: SvgPt } | null>(null);

  const toSvg = useCallback(
    (clientX: number, clientY: number): SvgPt => {
      const svg = svgRef.current;
      const m = svg?.getScreenCTM();
      if (!svg || !m) return { x: 0, y: 0 };
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const r = pt.matrixTransform(m.inverse());
      return { x: r.x, y: r.y };
    },
    [svgRef],
  );

  const start = useCallback(
    (e: React.PointerEvent, move: (p: SvgPt, start: SvgPt) => void, end?: () => void) => {
      e.stopPropagation();
      e.preventDefault();
      const s = toSvg(e.clientX, e.clientY);
      active.current = { move, end, start: s };
      const onMove = (ev: PointerEvent) => active.current?.move(toSvg(ev.clientX, ev.clientY), active.current.start);
      const onUp = () => {
        active.current?.end?.();
        active.current = null;
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    },
    [toSvg],
  );

  return { toSvg, start };
}

export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
export const deg = (r: number) => (r * 180) / Math.PI;
export const rad = (d: number) => (d * Math.PI) / 180;
