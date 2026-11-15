import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

const COLORS = ['#e63946', '#1d6fe0', '#11a05a', '#111111', '#f4a300'];

interface Stroke {
  color: string;
  width: number;
  pts: [number, number][];
}

/** Lớp bút vẽ chú thích phủ lên khu vực mô phỏng. Nét vẽ được giữ lại khi tắt bút. */
export function PenOverlay({ active, clearKey, onClose }: { active: boolean; clearKey: unknown; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const drawing = useRef<Stroke | null>(null);
  const [color, setColor] = useState(COLORS[0]);
  const [width, setWidth] = useState(5);
  const [count, setCount] = useState(0);

  const redraw = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const s of [...strokes.current, ...(drawing.current ? [drawing.current] : [])]) {
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      ctx.beginPath();
      s.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.stroke();
    }
  };

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const resize = () => {
      const r = c.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      c.width = r.width * dpr;
      c.height = r.height * dpr;
      redraw();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    strokes.current = [];
    setCount(0);
    redraw();
  }, [clearKey]);

  const pos = (e: React.PointerEvent): [number, number] => {
    const r = canvasRef.current!.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`pen-canvas ${active ? 'active' : ''}`}
        onPointerDown={(e) => {
          if (!active) return;
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          drawing.current = { color, width, pts: [pos(e)] };
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          drawing.current.pts.push(pos(e));
          redraw();
        }}
        onPointerUp={() => {
          if (drawing.current) strokes.current.push(drawing.current);
          drawing.current = null;
          setCount(strokes.current.length);
        }}
      />
      {active && (
        <div className="pen-tools">
          {COLORS.map((c) => (
            <button key={c} className={`pen-color ${c === color ? 'on' : ''}`} style={{ background: c }} onClick={() => setColor(c)} aria-label="Màu bút" />
          ))}
          <span className="sep" />
          {[3, 5, 10].map((w) => (
            <button key={w} className={`pen-width ${w === width ? 'on' : ''}`} onClick={() => setWidth(w)} aria-label={`Nét ${w}`}>
              <span style={{ width: w + 4, height: w + 4 }} />
            </button>
          ))}
          <span className="sep" />
          <button
            className="btn"
            disabled={count === 0}
            onClick={() => {
              strokes.current.pop();
              setCount(strokes.current.length);
              redraw();
            }}
          >
            ↶
          </button>
          <button
            className="btn"
            onClick={() => {
              strokes.current = [];
              setCount(0);
              redraw();
            }}
          >
            <Icon name="trash" size={18} /> Xoá nét
          </button>
          <button className="btn" onClick={onClose}>
            <Icon name="close" size={18} /> Tắt bút
          </button>
        </div>
      )}
    </>
  );
}
