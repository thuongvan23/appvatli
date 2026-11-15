import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { EngineProps, Measurements } from '../../core/types';
import { CELL, CircuitDoc, Dir, Part, PartType, PART_INFO, Pt, Wire, dirVec, makePart, newId, ptKey, terminals, wirePoints } from './model';
import { SolveResult, solveCircuit } from './solver';
import { GlyphState, MirrorCtx, PartGlyph, View } from './glyphs';
import { Inspector } from './Inspector';
import { fmtMeter } from '../../core/format';

export interface CircuitOptions {
  /** Lớp 8: định tính; lớp 9: hiện thêm R, U, I, P */
  level?: 8 | 9;
  view?: View;
  /** Danh sách linh kiện trong hộp đồ nghề; false = không cho thêm linh kiện */
  palette?: PartType[] | false;
  /** Khoá: không kéo/xoá/nối dây, chỉ bật tắt công tắc và chỉnh thông số */
  locked?: boolean;
  /** Hiển thị chuyển động: electron, chiều dòng điện quy ước, hoặc tắt */
  flow?: Flow;
  /** Bảng R, U, I, P của các linh kiện */
  table?: boolean;
  /** Công tơ điện đếm điện năng tiêu thụ */
  energyMeter?: boolean;
  /** Sơ đồ mẫu hiện ở góc để học sinh lắp theo */
  reference?: CircuitDoc;
  /** Ghi tên linh kiện bên dưới mỗi linh kiện */
  showNames?: boolean;
}

export type Flow = 'electron' | 'current' | 'none';

const COLS = 24;
const ROWS = 13;
const W = COLS * CELL;
const H = ROWS * CELL;

export const PALETTE_8: PartType[] = ['battery', 'switch', 'lamp', 'led', 'ammeter', 'voltmeter', 'fuse', 'bell', 'heater', 'coil', 'electrolysis', 'sample', 'resistor'];
export const PALETTE_9: PartType[] = ['supply', 'battery', 'switch', 'lamp', 'resistor', 'rheostat', 'wireSample', 'ammeter', 'voltmeter', 'fuse', 'led'];
export const PALETTE_ALL: PartType[] = ['battery', 'supply', 'switch', 'lamp', 'led', 'resistor', 'rheostat', 'wireSample', 'ammeter', 'voltmeter', 'fuse', 'bell', 'heater', 'coil', 'electrolysis', 'sample'];

type Drag =
  | { kind: 'move'; id: string; start: Pt; ox: number; oy: number; moved: boolean; canMove: boolean; attach: { wid: string; end: 1 | 2; ti: 0 | 1 }[]; isNew: boolean; base: CircuitDoc }
  | { kind: 'wire'; from: Pt; to: Pt; moved: boolean }
  | { kind: 'empty'; start: Pt; moved: boolean };

type Sel = { kind: 'part' | 'wire'; id: string } | null;

export const keyOf = (p: Part) => p.props.label ?? p.id;

export function measurementsOf(doc: CircuitDoc, res: SolveResult): Measurements {
  const m: Measurements = {};
  for (const p of doc.parts) {
    const r = res.parts[p.id];
    if (!r) continue;
    const k = keyOf(p);
    const isSource = p.type === 'battery' || p.type === 'supply';
    m[`${k}.I`] = r.I;
    // với nguồn: hiệu điện thế giữa cực dương và cực âm
    m[`${k}.U`] = isSource ? -r.U : r.U;
    m[`${k}.P`] = r.P;
    if (p.type === 'battery') m[`${k}.E`] = 1.5 * (p.props.cells ?? 1);
    if (p.type === 'supply') m[`${k}.E`] = p.props.voltage ?? 0;
    if (p.type === 'wireSample') {
      m[`${k}.l`] = p.props.length ?? 1;
      m[`${k}.S`] = p.props.area ?? 0.1;
    }
    if (p.type === 'resistor') m[`${k}.R`] = p.props.R ?? 10;
  }
  return m;
}

export function CircuitBoard({ doc, onDoc, options, showValues, onMeasure }: EngineProps<CircuitDoc, CircuitOptions>) {
  const level = options.level ?? 9;
  const locked = !!options.locked;
  const palette = options.palette === false ? [] : options.palette ?? (level === 8 ? PALETTE_8 : PALETTE_9);
  const [view, setView] = useState<View>(options.view ?? 'real');
  const [flow, setFlow] = useState<Flow>(options.flow ?? 'electron');
  const [sel, setSel] = useState<Sel>(null);
  const [draft, setDraft] = useState<{ from: Pt; to: Pt } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<Drag | null>(null);
  const undoRef = useRef<CircuitDoc[]>([]);
  const docRef = useRef(doc);
  docRef.current = doc;

  useEffect(() => setView(options.view ?? 'real'), [options.view]);
  useEffect(() => setFlow(options.flow ?? 'electron'), [options.flow]);

  const res = useMemo(() => solveCircuit(doc), [doc]);
  const viewBox = useMemo(() => viewBoxOf(doc, locked), [doc, locked]);

  // Ghi lại linh kiện vừa bị hỏng (đèn cháy, cầu chì đứt) vào tài liệu.
  useEffect(() => {
    if (res.newlyBroken.length === 0) return;
    const ids = new Set(res.newlyBroken);
    onDoc({ ...doc, parts: doc.parts.map((p) => (ids.has(p.id) ? { ...p, props: { ...p.props, broken: true } } : p)) });
  }, [res, doc, onDoc]);

  useEffect(() => {
    onMeasure?.(measurementsOf(doc, res));
  }, [doc, res, onMeasure]);

  const commit = useCallback(
    (next: CircuitDoc, pushUndo = true) => {
      if (pushUndo) {
        undoRef.current.push(docRef.current);
        if (undoRef.current.length > 80) undoRef.current.shift();
      }
      onDoc(next);
    },
    [onDoc],
  );

  const undo = useCallback(() => {
    const prev = undoRef.current.pop();
    if (prev) onDoc(prev);
  }, [onDoc]);

  const updatePart = useCallback(
    (id: string, patch: Partial<Part>, pushUndo = true) => {
      const d = docRef.current;
      commit({ ...d, parts: d.parts.map((p) => (p.id === id ? { ...p, ...patch, props: { ...p.props, ...(patch.props ?? {}) } } : p)) }, pushUndo);
    },
    [commit],
  );

  const removeSel = useCallback(() => {
    if (!sel || locked) return;
    const d = docRef.current;
    if (sel.kind === 'part') {
      const p = d.parts.find((q) => q.id === sel.id);
      if (!p || p.props.fixed) return;
      commit({ ...d, parts: d.parts.filter((q) => q.id !== sel.id) });
    } else {
      commit({ ...d, wires: d.wires.filter((w) => w.id !== sel.id) });
    }
    setSel(null);
  }, [sel, locked, commit]);

  /** Xoay 90° quanh tâm linh kiện; dây nối vào cực sẽ đi theo cực. */
  const rotatePart = useCallback(
    (id: string) => {
      const d = docRef.current;
      const p = d.parts.find((q) => q.id === id);
      if (!p || locked || p.props.fixed) return;
      const v = dirVec(p.dir);
      const c = { x: p.x + v.x, y: p.y + v.y };
      const nd = ((p.dir + 1) % 4) as Dir;
      const nv = dirVec(nd);
      const np = { ...p, dir: nd, x: c.x - nv.x, y: c.y - nv.y };
      const [o0, o1] = terminals(p);
      const [n0, n1] = terminals(np);
      const wires = d.wires.map((w) => moveWireEnds(w, [o0, o1], [n0, n1]));
      commit({ ...d, parts: d.parts.map((q) => (q.id === id ? np : q)), wires });
    },
    [commit, locked],
  );

  /** Đảo chiều: đổi chỗ hai cực, dây giữ nguyên. */
  const flipPart = useCallback(
    (id: string) => {
      const d = docRef.current;
      const p = d.parts.find((q) => q.id === id);
      if (!p) return;
      const [, b] = terminals(p);
      commit({ ...d, parts: d.parts.map((q) => (q.id === id ? { ...p, x: b.x, y: b.y, dir: ((p.dir + 2) % 4) as Dir } : q)) });
    },
    [commit],
  );

  // ---------- Phím tắt ----------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT')) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        removeSel();
      } else if (e.key.toLowerCase() === 'r' && sel?.kind === 'part') {
        rotatePart(sel.id);
      } else if (e.key === 'Escape') {
        setSel(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [undo, removeSel, rotatePart, sel]);

  // ---------- Toạ độ ----------
  const toSvg = useCallback((clientX: number, clientY: number): Pt => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const m = svg.getScreenCTM();
    if (!m) return { x: 0, y: 0 };
    const r = pt.matrixTransform(m.inverse());
    return { x: r.x, y: r.y };
  }, []);
  const snap = (p: Pt): Pt => ({ x: Math.round(p.x / CELL), y: Math.round(p.y / CELL) });
  const clampGrid = (p: Pt): Pt => ({ x: Math.max(0, Math.min(COLS, p.x)), y: Math.max(0, Math.min(ROWS, p.y)) });

  // ---------- Kéo thả ----------
  const onMove = useCallback(
    (e: PointerEvent) => {
      const dr = dragRef.current;
      if (!dr) return;
      const p = toSvg(e.clientX, e.clientY);
      if (dr.kind === 'move') {
        const dx = Math.round((p.x - dr.start.x) / CELL);
        const dy = Math.round((p.y - dr.start.y) / CELL);
        if (!dr.canMove) return;
        if (!dr.moved && (Math.abs(p.x - dr.start.x) > 6 || Math.abs(p.y - dr.start.y) > 6)) dr.moved = true;
        if (!dr.moved) return;
        const base = dr.base;
        const part = base.parts.find((q) => q.id === dr.id);
        if (!part) return;
        const nx = dr.ox + dx;
        const ny = dr.oy + dy;
        const np = { ...part, x: nx, y: ny };
        const nt = terminals(np);
        const wires = base.wires.map((w) => {
          const a = dr.attach.filter((t) => t.wid === w.id);
          if (a.length === 0) return w;
          const nw = { ...w };
          for (const t of a) {
            if (t.end === 1) {
              nw.x1 = nt[t.ti].x;
              nw.y1 = nt[t.ti].y;
            } else {
              nw.x2 = nt[t.ti].x;
              nw.y2 = nt[t.ti].y;
            }
          }
          return nw;
        });
        onDoc({ ...base, parts: base.parts.map((q) => (q.id === dr.id ? np : q)), wires });
      } else if (dr.kind === 'wire') {
        const s = clampGrid(snap(p));
        if (s.x !== dr.from.x || s.y !== dr.from.y) dr.moved = true;
        dr.to = s;
        setDraft({ from: dr.from, to: s });
      } else if (dr.kind === 'empty') {
        const s = clampGrid(snap(p));
        const st = clampGrid(snap(dr.start));
        if (!locked && (s.x !== st.x || s.y !== st.y)) {
          dragRef.current = { kind: 'wire', from: st, to: s, moved: true };
          setDraft({ from: st, to: s });
        }
      }
    },
    [toSvg, onDoc, locked],
  );

  const onUp = useCallback(
    (e: PointerEvent) => {
      const dr = dragRef.current;
      dragRef.current = null;
      window.removeEventListener('pointermove', winMove);
      window.removeEventListener('pointerup', winUp);
      if (!dr) return;
      if (dr.kind === 'move') {
        const d = docRef.current;
        const part = d.parts.find((q) => q.id === dr.id);
        if (dr.isNew) {
          const svg = svgRef.current?.getBoundingClientRect();
          const inside = svg && e.clientX >= svg.left && e.clientX <= svg.right && e.clientY >= svg.top && e.clientY <= svg.bottom;
          const [t0, t1] = part ? terminals(part) : [{ x: -1, y: -1 }, { x: -1, y: -1 }];
          const onGrid = [t0, t1].every((t) => t.x >= 0 && t.x <= COLS && t.y >= 0 && t.y <= ROWS);
          if (!inside || !onGrid) {
            onDoc({ ...d, parts: d.parts.filter((q) => q.id !== dr.id) });
            undoRef.current.pop();
            return;
          }
          setSel({ kind: 'part', id: dr.id });
          return;
        }
        if (!dr.moved) {
          setSel({ kind: 'part', id: dr.id });
          if (part?.type === 'switch') updatePart(part.id, { props: { closed: !part.props.closed } });
        } else {
          undoRef.current.push(dr.base);
        }
      } else if (dr.kind === 'wire') {
        setDraft(null);
        if (dr.moved && (dr.from.x !== dr.to.x || dr.from.y !== dr.to.y)) {
          const d = docRef.current;
          const w: Wire = { id: newId('w'), x1: dr.from.x, y1: dr.from.y, x2: dr.to.x, y2: dr.to.y };
          commit({ ...d, wires: [...d.wires, w] });
        }
      } else if (dr.kind === 'empty') {
        setSel(null);
      }
    },
    [onDoc, commit, updatePart],
  );

  // Bộ lắng nghe cố định gắn vào window, luôn gọi phiên bản mới nhất của onMove/onUp.
  const moveRef = useRef(onMove);
  moveRef.current = onMove;
  const upRef = useRef(onUp);
  upRef.current = onUp;
  const [{ winMove, winUp }] = useState(() => ({
    winMove: (e: PointerEvent) => moveRef.current(e),
    winUp: (e: PointerEvent) => upRef.current(e),
  }));

  const startDrag = (dr: Drag) => {
    dragRef.current = dr;
    window.addEventListener('pointermove', winMove);
    window.addEventListener('pointerup', winUp);
  };

  const attachmentsOf = (d: CircuitDoc, part: Part) => {
    const t = terminals(part);
    const out: { wid: string; end: 1 | 2; ti: 0 | 1 }[] = [];
    for (const w of d.wires) {
      for (const ti of [0, 1] as const) {
        if (w.x1 === t[ti].x && w.y1 === t[ti].y) out.push({ wid: w.id, end: 1, ti });
        if (w.x2 === t[ti].x && w.y2 === t[ti].y) out.push({ wid: w.id, end: 2, ti });
      }
    }
    return out;
  };

  const onPartDown = (e: React.PointerEvent, part: Part) => {
    e.stopPropagation();
    e.preventDefault();
    const canMove = !locked && !part.props.fixed;
    const d = docRef.current;
    startDrag({
      kind: 'move',
      id: part.id,
      start: toSvg(e.clientX, e.clientY),
      ox: part.x,
      oy: part.y,
      moved: false,
      canMove,
      attach: canMove ? attachmentsOf(d, part) : [],
      isNew: false,
      base: d,
    });
  };

  const onHandleDown = (e: React.PointerEvent, pt: Pt) => {
    if (locked) return;
    e.stopPropagation();
    e.preventDefault();
    startDrag({ kind: 'wire', from: pt, to: pt, moved: false });
  };

  const onBoardDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    startDrag({ kind: 'empty', start: toSvg(e.clientX, e.clientY), moved: false });
  };

  const onPaletteDown = (e: React.PointerEvent, type: PartType) => {
    e.preventDefault();
    const p = toSvg(e.clientX, e.clientY);
    const g = snap({ x: p.x - CELL, y: p.y });
    const part = makePart(type, g.x, g.y, 0, autoLabel(docRef.current, type));
    const d = docRef.current;
    undoRef.current.push(d);
    const next = { ...d, parts: [...d.parts, part] };
    onDoc(next);
    startDrag({ kind: 'move', id: part.id, start: { x: g.x * CELL + CELL, y: g.y * CELL }, ox: g.x, oy: g.y, moved: true, canMove: true, attach: [], isNew: true, base: next });
  };

  // ---------- Hoạt ảnh: dòng electron, chuông, điện phân, công tơ ----------
  const flowEls = useRef(new Map<string, SVGPathElement>());
  const offsets = useRef(new Map<string, number>());
  const copperRef = useRef(new Map<string, number>());
  const [, setTick] = useState(0);
  const energyRef = useRef({ hours: 0, kwh: 0 });
  const [timeScale, setTimeScale] = useState(0); // giờ mô phỏng / giây thực

  const resRef = useRef(res);
  resRef.current = res;
  const flowRef = useRef(flow);
  flowRef.current = flow;
  const timeScaleRef = useRef(timeScale);
  timeScaleRef.current = timeScale;

  const needsTick = useMemo(() => {
    if (res.shorted.length) return true;
    return doc.parts.some((p) => {
      const r = res.parts[p.id];
      if (!r) return false;
      if (p.type === 'bell' || p.type === 'electrolysis') return Math.abs(r.I) > 0.02;
      return false;
    });
  }, [doc, res]);
  const needsTickRef = useRef(needsTick);
  needsTickRef.current = needsTick || (!!options.energyMeter && timeScale > 0);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const r = resRef.current;
      const fl = flowRef.current;
      flowEls.current.forEach((el, id) => {
        const I = r.wires[id] ?? 0;
        const sp = Math.abs(I) < 1e-5 ? 0 : Math.sign(I) * 110 * Math.tanh(Math.abs(I) / 0.25);
        // electron chuyển động ngược chiều dòng điện quy ước
        const v = fl === 'electron' ? sp : -sp;
        const o = (offsets.current.get(id) ?? 0) + v * dt;
        offsets.current.set(id, o % 1000);
        el.style.strokeDashoffset = String(o % 1000);
      });
      // điện phân: đồng bám dần lên điện cực âm
      for (const p of docRef.current.parts) {
        if (p.type !== 'electrolysis') continue;
        const I = r.parts[p.id]?.I ?? 0;
        if (Math.abs(I) > 1e-4) {
          const c = (copperRef.current.get(p.id) ?? 0) + (I * dt) / 6;
          copperRef.current.set(p.id, Math.max(-1, Math.min(1, c)));
        }
      }
      // công tơ điện
      const ts = timeScaleRef.current;
      if (ts > 0) {
        let Pw = 0;
        for (const p of docRef.current.parts) if (p.type === 'battery' || p.type === 'supply') Pw += Math.max(0, r.parts[p.id]?.P ?? 0);
        energyRef.current.hours += ts * dt;
        energyRef.current.kwh += (Pw / 1000) * ts * dt;
      }
      acc += dt;
      if (needsTickRef.current && acc > 1 / 20) {
        acc = 0;
        setTick((t) => t + 1);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ---------- Dữ liệu vẽ ----------
  const selPart = sel?.kind === 'part' ? doc.parts.find((p) => p.id === sel.id) ?? null : null;

  const degree = useMemo(() => {
    const m = new Map<string, number>();
    const add = (p: Pt) => m.set(ptKey(p), (m.get(ptKey(p)) ?? 0) + 1);
    doc.parts.forEach((p) => terminals(p).forEach(add));
    doc.wires.forEach((w) => {
      add({ x: w.x1, y: w.y1 });
      add({ x: w.x2, y: w.y2 });
    });
    return m;
  }, [doc]);

  const glyphState = (p: Part): GlyphState => {
    const r = res.parts[p.id];
    const I = r?.I ?? 0;
    const P = Math.abs(r?.P ?? 0);
    let glow = 0;
    if (p.type === 'lamp') glow = P / (p.props.ratedP ?? 0.9);
    if (p.type === 'led') glow = r?.on ? Math.min(1.2, 0.35 + Math.abs(I) / 0.03) : 0;
    let heat = 0;
    if (p.type === 'heater') heat = Math.min(1, P / 6);
    if ((p.type === 'battery' || p.type === 'supply') && res.shorted.includes(p.id)) heat = 1;
    const active = (p.type === 'bell' && Math.abs(I) > 0.05) || (p.type === 'coil' && Math.abs(I) > 0.15);
    const reading = p.type === 'ammeter' ? I : p.type === 'voltmeter' ? r?.U ?? 0 : 0;
    return { glow, heat, active, copper: copperRef.current.get(p.id) ?? 0, reading, showValues };
  };

  const warnings: string[] = [];
  if (res.shorted.length) warnings.push('Đoản mạch! Hai cực của nguồn bị nối trực tiếp bằng dây dẫn, dòng điện rất lớn làm nguồn nóng lên, có thể gây cháy.');
  for (const p of doc.parts) {
    if (p.type !== 'ammeter' && p.type !== 'voltmeter') continue;
    const r = res.parts[p.id];
    if (!r) continue;
    const v = p.type === 'ammeter' ? r.I : r.U;
    const name = `${PART_INFO[p.type].name}${p.props.label ? ` ${p.props.label}` : ''}`;
    if (v < (p.type === 'ammeter' ? -1e-3 : -0.05)) warnings.push(`${name} mắc ngược cực: kim lệch về phía trái vạch 0.`);
    else if (Math.abs(v) > (p.props.range ?? Infinity) * 1.02) warnings.push(`${name}: giá trị vượt quá giới hạn đo (GHĐ = ${(p.props.range ?? 0).toLocaleString('vi-VN')} ${p.type === 'ammeter' ? 'A' : 'V'}).`);
  }
  const brokenParts = doc.parts.filter((p) => p.props.broken);
  for (const p of brokenParts) {
    const name = p.props.label ? ` ${p.props.label}` : '';
    if (p.type === 'fuse') warnings.push(`Cầu chì${name} đã đứt, mạch điện bị ngắt. Bấm "Thay linh kiện hỏng" sau khi khắc phục.`);
    else if (p.type === 'lamp') warnings.push(`Bóng đèn${name} đã bị tháo ra hoặc bị cháy (hiệu điện thế quá lớn so với định mức).`);
    else if (p.type === 'led') warnings.push(`Đèn LED${name} bị hỏng do dòng điện quá lớn.`);
  }

  return (
    <div className="cb">
      {palette.length > 0 && !locked && (
        <aside className="cb-palette" aria-label="Hộp linh kiện">
          <div className="cb-palette-title">Linh kiện</div>
          {palette.map((t) => (
            <button key={t} className="cb-pal-item" onPointerDown={(e) => onPaletteDown(e, t)} title={`Kéo ${PART_INFO[t].name} vào bàn`}>
              <svg viewBox="-6 -38 92 76" width="64" height="52">
                <PartGlyph part={makePart(t, 0, 0, 0, {}, 'pal')} view={view} rot={0} st={{ glow: 0, heat: 0, active: false, copper: 0, reading: 0, showValues: false }} />
              </svg>
              <span>{PART_INFO[t].name}</span>
            </button>
          ))}
          <div className="cb-hint">Kéo linh kiện vào bàn. Kéo từ một chấm tròn để nối dây.</div>
        </aside>
      )}

      <div className="cb-stage">
        <div className="cb-toolbar">
          <div className="seg">
            <button className={view === 'real' ? 'on' : ''} onClick={() => setView('real')}>Hình vẽ thật</button>
            <button className={view === 'schematic' ? 'on' : ''} onClick={() => setView('schematic')}>Sơ đồ mạch</button>
          </div>
          <div className="seg">
            <button className={flow === 'electron' ? 'on' : ''} onClick={() => setFlow('electron')} title="Các electron tự do chuyển động có hướng">Electron</button>
            <button className={flow === 'current' ? 'on' : ''} onClick={() => setFlow('current')} title="Chiều dòng điện quy ước: từ cực dương qua mạch ngoài tới cực âm">Chiều dòng điện</button>
            <button className={flow === 'none' ? 'on' : ''} onClick={() => setFlow('none')}>Ẩn</button>
          </div>
          <span className="grow" />
          {!locked && (
            <>
              <button className="btn" onClick={undo} disabled={undoRef.current.length === 0} title="Hoàn tác (Ctrl+Z)">↶ Hoàn tác</button>
              <button
                className="btn"
                onClick={() => {
                  if (doc.parts.some((p) => !p.props.fixed) || doc.wires.length) {
                    commit({ parts: doc.parts.filter((p) => p.props.fixed), wires: [] });
                    setSel(null);
                  }
                }}
              >
                Xoá hết
              </button>
            </>
          )}
          {brokenParts.length > 0 && (
            <button className="btn warn" onClick={() => commit({ ...doc, parts: doc.parts.map((p) => (p.props.broken ? { ...p, props: { ...p.props, broken: false } } : p)) })}>
              Thay linh kiện hỏng ({brokenParts.length})
            </button>
          )}
        </div>

        <div className="cb-canvas">
          <svg ref={svgRef} viewBox={viewBox} preserveAspectRatio="xMidYMid meet" onPointerDown={onBoardDown} className={`cb-svg ${view}`}>
            <defs>
              <pattern id="gridDots" width={CELL} height={CELL} patternUnits="userSpaceOnUse" x={-CELL / 2} y={-CELL / 2}>
                <circle cx={CELL / 2} cy={CELL / 2} r={1.6} fill="var(--grid)" />
              </pattern>
              <radialGradient id="glowLamp">
                <stop offset="0%" stopColor="#fff7c2" stopOpacity={1} />
                <stop offset="45%" stopColor="#ffe066" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#ffd000" stopOpacity={0} />
              </radialGradient>
              <filter id="blur6" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation={6} />
              </filter>
            </defs>
            <rect x={-2000} y={-2000} width={6000} height={6000} fill="url(#gridDots)" />

            {/* Dây nối */}
            {doc.wires.map((w) => {
              const d = pathOf(wirePoints(w));
              const isSel = sel?.kind === 'wire' && sel.id === w.id;
              return (
                <g key={w.id}>
                  <path d={d} className="wire-hit" onPointerDown={(e) => { e.stopPropagation(); setSel({ kind: 'wire', id: w.id }); }} />
                  {isSel && <path d={d} className="wire-sel" />}
                  <path d={d} className="wire" />
                </g>
              );
            })}

            {/* Dòng electron */}
            {flow !== 'none' &&
              doc.wires.map((w) => (
                <path
                  key={`f${w.id}`}
                  d={pathOf(wirePoints(w))}
                  className={`flow ${flow}`}
                  ref={(el) => {
                    if (el) flowEls.current.set(w.id, el);
                    else flowEls.current.delete(w.id);
                  }}
                />
              ))}

            {/* Linh kiện */}
            {doc.parts.map((p) => {
              const isSel = selPart?.id === p.id;
              return (
                <g key={p.id} transform={partTransform(p)} className={`part ${isSel ? 'sel' : ''} ${p.type === 'switch' ? 'clickable' : ''}`} onPointerDown={(e) => onPartDown(e, p)}>
                  <rect x={-4} y={-36} width={88} height={72} rx={10} className="part-hit" />
                  <MirrorCtx.Provider value={p.dir === 2}>
                    <PartGlyph part={p} view={view} rot={p.dir === 2 ? 0 : p.dir * 90} st={glyphState(p)} />
                  </MirrorCtx.Provider>
                </g>
              );
            })}

            {/* Nhãn, số chỉ đồng hồ */}
            {doc.parts.map((p) => (
              <PartLabels key={`l${p.id}`} part={p} res={res} showValues={showValues} showNames={!!options.showNames} />
            ))}

            {/* Điểm nối */}
            {Array.from(degree.entries()).map(([k, n]) => {
              const [x, y] = k.split(',').map(Number);
              return (
                <g key={`h${k}`}>
                  {n >= 3 && <circle cx={x * CELL} cy={y * CELL} r={5} className="junction" />}
                  {!locked && (
                    <g className="handle-g" onPointerDown={(e) => onHandleDown(e, { x, y })}>
                      <circle cx={x * CELL} cy={y * CELL} r={17} className="handle-hit" />
                      <circle cx={x * CELL} cy={y * CELL} r={8} className="handle" />
                    </g>
                  )}
                </g>
              );
            })}

            {draft && <path d={pathOf(wirePoints({ id: '', x1: draft.from.x, y1: draft.from.y, x2: draft.to.x, y2: draft.to.y }))} className="wire draft" />}
          </svg>

          {options.reference && <ReferencePanel doc={options.reference} />}

          {warnings.length > 0 && (
            <div className="cb-warnings">
              {warnings.map((w, i) => (
                <div key={i} className="cb-warning">⚠ {w}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Inspector
        part={selPart}
        wireSelected={sel?.kind === 'wire'}
        res={res}
        doc={doc}
        level={level}
        locked={locked}
        showValues={showValues}
        onPatch={(id, props) => updatePart(id, { props })}
        onRotate={rotatePart}
        onFlip={flipPart}
        onDelete={removeSel}
        table={!!options.table}
        energy={options.energyMeter ? { counter: energyRef, timeScale, setTimeScale } : undefined}
        onClearCopper={(id) => {
          copperRef.current.set(id, 0);
          setTick((t) => t + 1);
        }}
      />
    </div>
  );
}

function moveWireEnds(w: Wire, from: Pt[], to: Pt[]): Wire {
  const nw = { ...w };
  from.forEach((f, i) => {
    if (w.x1 === f.x && w.y1 === f.y) {
      nw.x1 = to[i].x;
      nw.y1 = to[i].y;
    }
    if (w.x2 === f.x && w.y2 === f.y) {
      nw.x2 = to[i].x;
      nw.y2 = to[i].y;
    }
  });
  return nw;
}

/** Hướng trái (dir = 2) dùng lật gương để hình không bị lộn ngược. */
function partTransform(p: Part): string {
  const t = `translate(${p.x * CELL} ${p.y * CELL})`;
  return p.dir === 2 ? `${t} scale(-1 1)` : `${t} rotate(${p.dir * 90})`;
}

/** Khung nhìn: bàn khoá thì phóng vừa nội dung, bàn lắp ráp thì hiện toàn bộ lưới. */
function viewBoxOf(doc: CircuitDoc, fit: boolean): string {
  const full = `-30 -30 ${W + 60} ${H + 60}`;
  if (!fit) return full;
  const pts: Pt[] = [];
  doc.parts.forEach((p) => pts.push(...terminals(p)));
  doc.wires.forEach((w) => pts.push({ x: w.x1, y: w.y1 }, { x: w.x2, y: w.y2 }));
  if (pts.length === 0) return full;
  let x0 = Math.min(...pts.map((p) => p.x)) * CELL - 140;
  let x1 = Math.max(...pts.map((p) => p.x)) * CELL + 140;
  let y0 = Math.min(...pts.map((p) => p.y)) * CELL - 95;
  let y1 = Math.max(...pts.map((p) => p.y)) * CELL + 85;
  // không phóng quá to khi mạch rất nhỏ
  const minW = 15 * CELL;
  const minH = 8.5 * CELL;
  if (x1 - x0 < minW) {
    const c = (x0 + x1) / 2;
    x0 = c - minW / 2;
    x1 = c + minW / 2;
  }
  if (y1 - y0 < minH) {
    const c = (y0 + y1) / 2;
    y0 = c - minH / 2;
    y1 = c + minH / 2;
  }
  return `${x0} ${y0} ${x1 - x0} ${y1 - y0}`;
}

function pathOf(pts: Pt[]): string {
  return pts.map((p, i) => `${i ? 'L' : 'M'}${p.x * CELL} ${p.y * CELL}`).join(' ');
}

const LABEL_PREFIX: Partial<Record<PartType, string>> = { lamp: 'Đ', resistor: 'R', ammeter: 'A', voltmeter: 'V', switch: 'K', led: 'LED', rheostat: 'Rb' };

function autoLabel(doc: CircuitDoc, type: PartType) {
  const pre = LABEL_PREFIX[type];
  if (!pre) return {};
  let i = 1;
  const used = new Set(doc.parts.map((p) => p.props.label));
  while (used.has(`${pre}${i}`)) i++;
  return { label: `${pre}${i}` };
}

/** Nhãn linh kiện và số chỉ đồng hồ hiện số – luôn nằm ngang, đặt cạnh linh kiện. */
function PartLabels({ part, res, showValues, showNames }: { part: Part; res: SolveResult; showValues: boolean; showNames: boolean }) {
  const [a, b] = terminals(part);
  const cx = ((a.x + b.x) / 2) * CELL;
  const cy = ((a.y + b.y) / 2) * CELL;
  const horiz = part.dir % 2 === 0;
  const r = res.parts[part.id];
  const isMeter = part.type === 'ammeter' || part.type === 'voltmeter';
  const out = [];
  if (isMeter && part.props.display !== 'analog' && r) {
    const v = part.type === 'ammeter' ? r.I : r.U;
    const val = showValues ? fmtMeter(v, part.type === 'ammeter' ? 'A' : 'V') : '?';
    const txt = part.props.label ? `${part.props.label}: ${val}` : val;
    const w = Math.max(70, txt.length * 13 + 16);
    const bx = horiz ? cx : cx + 40 + w / 2;
    const by = horiz ? cy - 58 : cy;
    out.push(
      <g key="read" className="readout">
        <rect x={bx - w / 2} y={by - 17} width={w} height={34} rx={6} />
        <text x={bx} y={by + 1} textAnchor="middle" dominantBaseline="central">{txt}</text>
      </g>,
    );
  }
  const labelInReadout = isMeter && part.props.display !== 'analog' && !!r;
  if (part.props.label && !labelInReadout) {
    const lx = horiz ? cx : cx - 50;
    const ly = horiz ? cy + 50 : cy;
    out.push(
      <text key="lab" x={lx} y={ly} className="part-label" textAnchor={horiz ? 'middle' : 'end'} dominantBaseline="central">
        {part.props.label}
      </text>,
    );
  }
  if (showNames) {
    out.push(
      <text key="name" x={horiz ? cx : cx + 46} y={horiz ? cy + 66 : cy} className="part-name" textAnchor={horiz ? 'middle' : 'start'} dominantBaseline="central">
        {PART_INFO[part.type].name}
      </text>,
    );
  }
  return <g style={{ pointerEvents: 'none' }}>{out}</g>;
}

/** Sơ đồ mẫu (chỉ xem) ở góc màn hình. */
function ReferencePanel({ doc }: { doc: CircuitDoc }) {
  const pts: Pt[] = [];
  doc.parts.forEach((p) => pts.push(...terminals(p)));
  doc.wires.forEach((w) => pts.push({ x: w.x1, y: w.y1 }, { x: w.x2, y: w.y2 }));
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const x0 = (Math.min(...xs) - 1) * CELL;
  const y0 = (Math.min(...ys) - 1) * CELL;
  const w = (Math.max(...xs) - Math.min(...xs) + 2) * CELL;
  const h = (Math.max(...ys) - Math.min(...ys) + 2) * CELL;
  const st: GlyphState = { glow: 0, heat: 0, active: false, copper: 0, reading: 0, showValues: false };
  return (
    <div className="cb-reference">
      <div className="cb-reference-title">Sơ đồ mạch điện</div>
      <svg viewBox={`${x0} ${y0} ${w} ${h}`} className="schematic">
        {doc.wires.map((wi) => (
          <path key={wi.id} d={pathOf(wirePoints(wi))} className="wire" />
        ))}
        {doc.parts.map((p) => (
          <g key={p.id} transform={partTransform(p)}>
            <MirrorCtx.Provider value={p.dir === 2}>
              <PartGlyph part={p} view="schematic" rot={p.dir === 2 ? 0 : p.dir * 90} st={st} />
            </MirrorCtx.Provider>
          </g>
        ))}
      </svg>
    </div>
  );
}
