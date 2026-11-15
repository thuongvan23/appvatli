// Công cụ dựng nhanh các mạch điện mẫu cho cảnh bài học.
import { CircuitDoc, Dir, Part, PartProps, PartType, Pt, Wire, dirVec, makePart, terminals } from '../engines/circuit/model';

let wn = 0;
export function W(x1: number, y1: number, x2: number, y2: number): Wire {
  wn += 1;
  return { id: `w_${wn}`, x1, y1, x2, y2 };
}

/** Nối liên tiếp các điểm bằng dây. */
export function path(...pts: [number, number][]): Wire[] {
  const out: Wire[] = [];
  for (let i = 1; i < pts.length; i++) out.push(W(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1]));
  return out;
}

export function P(type: PartType, x: number, y: number, dir: Dir, props: PartProps = {}, id?: string): Part {
  return makePart(type, x, y, dir, props, id ?? props.label ?? `${type}_${x}_${y}`);
}

export interface Item {
  type: PartType;
  props?: PartProps;
  id?: string;
  /** Mắc ngược chiều so với chiều dòng điện trong vòng */
  flip?: boolean;
}

export const it = (type: PartType, props: PartProps = {}, extra: Partial<Item> = {}): Item => ({ type, props, ...extra });

/**
 * Vòng mạch nối tiếp hình chữ nhật. Nguồn đặt ở cạnh dưới với cực (+) bên phải thì
 * dòng điện đi: cạnh dưới → cạnh phải (lên) → cạnh trên (sang trái) → cạnh trái (xuống).
 * Linh kiện được đặt sao cho cực a là cực dòng điện đi vào (đúng cực cho đồng hồ, LED).
 */
export function ring(L: number, T: number, R: number, B: number, e: { bottom?: Item[]; right?: Item[]; top?: Item[]; left?: Item[] }): CircuitDoc {
  const parts: Part[] = [];
  const wires: Wire[] = [];
  let cur: Pt = { x: L, y: B };
  const edge = (items: Item[] = [], from: Pt, to: Pt, dir: Dir) => {
    const len = Math.abs(to.x - from.x) + Math.abs(to.y - from.y);
    const v = dirVec(dir);
    const k = items.length;
    const gap = (len - 2 * k) / (k + 1);
    items.forEach((item, i) => {
      const s = Math.round(gap * (i + 1) + 2 * i);
      const a = { x: from.x + v.x * s, y: from.y + v.y * s };
      if (a.x !== cur.x || a.y !== cur.y) wires.push(W(cur.x, cur.y, a.x, a.y));
      const b = { x: a.x + v.x * 2, y: a.y + v.y * 2 };
      const id = item.id ?? item.props?.label;
      parts.push(item.flip ? P(item.type, b.x, b.y, ((dir + 2) % 4) as Dir, item.props, id) : P(item.type, a.x, a.y, dir, item.props, id));
      cur = b;
    });
    if (cur.x !== to.x || cur.y !== to.y) wires.push(W(cur.x, cur.y, to.x, to.y));
    cur = to;
  };
  edge(e.bottom, { x: L, y: B }, { x: R, y: B }, 0);
  edge(e.right, { x: R, y: B }, { x: R, y: T }, 3);
  edge(e.top, { x: R, y: T }, { x: L, y: T }, 2);
  edge(e.left, { x: L, y: T }, { x: L, y: B }, 1);
  return { parts, wires };
}

/**
 * Mắc một linh kiện song song với linh kiện `target`, đặt lệch (dx, dy) ô.
 * Mặc định cực a nối với cực a (đúng cho vôn kế đo một thiết bị tiêu thụ);
 * dùng flip=true khi đo hai cực nguồn (cực + của vôn kế nối cực + của nguồn).
 */
export function across(doc: CircuitDoc, targetId: string, dx: number, dy: number, item: Item): CircuitDoc {
  const t = doc.parts.find((p) => p.id === targetId);
  if (!t) throw new Error(`Không tìm thấy ${targetId}`);
  const [a, b] = terminals(t);
  const id = item.id ?? item.props?.label;
  const part = item.flip ? P(item.type, b.x + dx, b.y + dy, ((t.dir + 2) % 4) as Dir, item.props, id) : P(item.type, a.x + dx, a.y + dy, t.dir, item.props, id);
  const [pa, pb] = terminals(part);
  const [ta, tb] = item.flip ? [b, a] : [a, b];
  return {
    parts: [...doc.parts, part],
    wires: [...doc.wires, W(ta.x, ta.y, pa.x, pa.y), W(tb.x, tb.y, pb.x, pb.y)],
  };
}

export function merge(...docs: CircuitDoc[]): CircuitDoc {
  return { parts: docs.flatMap((d) => d.parts), wires: docs.flatMap((d) => d.wires) };
}

export const EMPTY: CircuitDoc = { parts: [], wires: [] };
