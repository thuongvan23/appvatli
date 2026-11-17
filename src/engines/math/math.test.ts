import { LESSONS } from '../../core/catalog';
import { CONTENT } from '../../lessons';
import { NOTES } from '../../lessons/notes';
import { TABLES } from '../chem/ProcessViews';
import { MATH_MODES } from './MathView';
import { CHARTS, DATAFIX, DERIVE, EXPS, FMAPS, FRACS, FUNCS, HOMO_SHAPES, LIN_CTX, MONO_SETS, POLY_TASKS, SORTS } from './mathData';
import { collect, divByTerm, evalPoly, fmtPoly, polyMul, polyPow, polySub, t } from './poly';
import { IDENTITIES, rootsOf } from './AlgebraViews';
import { classifyQuad, moveQuad, similarCheck } from './GeoViews';
import { QUAD_P } from '../../lessons/math8a';
import { pyramidMetrics } from './SolidViews';
import { angleAt, dist, isParallel } from './mcommon';

describe('nội dung Toán 8', () => {
  it('Toán 9 đủ 32 bài, có mô phỏng và nội dung bài học', () => {
    const m = LESSONS.filter((l) => l.subject === 'math' && l.grade === 9);
    expect(m.length).toBe(32);
    for (const l of m) {
      expect(CONTENT[l.id], l.id).toBeTruthy();
      expect(NOTES[l.id], l.id).toBeTruthy();
      for (const s of NOTES[l.id].sections) if (s.scene) expect(s.scene, `${l.id} ${s.title}`).toBeLessThanOrEqual(CONTENT[l.id].scenes.length);
    }
  });

  it('đủ 39 bài, mỗi bài có mô phỏng và nội dung bài học', () => {
    const m = LESSONS.filter((l) => l.subject === 'math' && l.grade === 8);
    expect(m.length).toBe(39);
    expect(m.map((l) => l.num)).toEqual(Array.from({ length: 39 }, (_, i) => i + 1));
    for (const l of m) {
      expect(CONTENT[l.id], l.id).toBeTruthy();
      expect(NOTES[l.id], l.id).toBeTruthy();
      for (const s of NOTES[l.id].sections) if (s.scene) expect(s.scene, `${l.id} ${s.title}`).toBeLessThanOrEqual(CONTENT[l.id].scenes.length);
    }
  });

  it('mọi cảnh tham chiếu dữ liệu hợp lệ', () => {
    for (const l of LESSONS.filter((x) => x.subject === 'math')) {
      CONTENT[l.id].scenes.forEach((s, i) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const d = s.doc as any;
        const where = `${l.id} cảnh ${i + 1}`;
        expect(MATH_MODES as readonly string[], where).toContain(d.mode);
        if (d.mode === 'derive') expect(DERIVE[d.set], where).toBeTruthy();
        if (d.mode === 'sort') expect(SORTS[d.set], where).toBeTruthy();
        if (d.mode === 'table') expect(TABLES[d.set], where).toBeTruthy();
        if (d.mode === 'mono') expect(MONO_SETS[d.set], where).toBeTruthy();
        if (d.mode === 'poly') expect(POLY_TASKS[d.set]?.tasks[d.sel], where).toBeTruthy();
        if (d.mode === 'frac') for (const k of [d.sel, ...d.list]) expect(FRACS[k], `${where} ${k}`).toBeTruthy();
        if (d.mode === 'fmap') for (const k of [d.sel, ...d.list]) expect(FMAPS[k], `${where} ${k}`).toBeTruthy();
        if (d.mode === 'plane' && d.fn) expect(FUNCS[d.fn], where).toBeTruthy();
        if (d.mode === 'linear' && d.ctx) expect(LIN_CTX[d.ctx], where).toBeTruthy();
        if (d.mode === 'homothety') for (const k of [d.shape, ...(d.shapes ?? [])]) expect(HOMO_SHAPES[k], where).toBeTruthy();
        if (d.mode === 'chart') expect(CHARTS[d.set], where).toBeTruthy();
        if (d.mode === 'datafix') expect(DATAFIX[d.set], where).toBeTruthy();
        if (d.mode === 'prob' || d.mode === 'experiment') for (const k of [d.exp, ...(d.exps ?? [])]) expect(EXPS[k], where).toBeTruthy();
        if (d.mode === 'balance') {
          const [a, b] = d.L;
          const [c, e] = d.R;
          expect(a * d.sol + b, where).toBe(c * d.sol + e);
        }
      });
    }
  });

  it('nhóm phân loại có chỉ số nhóm hợp lệ', () => {
    for (const [k, s] of Object.entries(SORTS)) for (const it of s.items) expect(it.bin, `${k} ${it.t}`).toBeLessThan(s.bins.length);
  });
});

describe('đại số', () => {
  it('thu gọn và nhân đa thức', () => {
    expect(fmtPoly(collect([t(1, 2, 1), t(-3, 1, 1), t(5, 2, 1), t(2, 1, 1), t(-4), t(1, 0, 1)]))).toBe('6x²y − xy + y − 4');
    expect(fmtPoly(polyMul([t(1, 1), t(2)], [t(1, 2), t(-3, 1), t(1)]))).toBe('x³ − x² − 5x + 2');
    expect(fmtPoly(polyMul([t(2, 1), t(-1, 0, 1)], [t(1, 1), t(3, 0, 1)]))).toBe('2x² + 5xy − 3y²');
    expect(fmtPoly(divByTerm([t(6, 3, 2), t(-9, 2, 1), t(3, 1, 1)], t(3, 1, 1))!)).toBe('2x²y − 3x + 1');
    expect(fmtPoly(polySub([t(3, 2), t(-2, 1, 1), t(1, 0, 2)], [t(1, 2), t(5, 1, 1), t(-3, 0, 2)]))).toBe('2x² − 7xy + 4y²');
  });
  it('các hằng đẳng thức đúng với nhiều giá trị', () => {
    for (const I of Object.values(IDENTITIES)) for (const [a, b] of [[3, 2], [5, 1.5], [-2, 7]]) expect(I.L(a, b)).toBeCloseTo(I.R(a, b), 9);
    // (x + 1)³ bằng phép nhân
    expect(fmtPoly(polyPow([t(1, 1), t(1)], 3))).toBe('x³ + 3x² + 3x + 1');
  });
  it('mọi bài trong POLY_TASKS chia hết khi là phép chia', () => {
    for (const s of Object.values(POLY_TASKS)) for (const k of s.tasks) if (k.kind === 'div') expect(divByTerm(k.A, k.B![0])).not.toBeNull();
  });
  it('phân thức rút gọn bằng phân thức ban đầu (trừ chỗ mẫu bằng 0)', () => {
    for (const F of Object.values(FRACS)) {
      if (!F.simp) continue;
      for (const x of [-3.5, -1.5, 0.5, 2.5, 4.5]) {
        const d = evalPoly(F.den, [x, 0, 0]);
        if (Math.abs(d) < 1e-9) continue;
        expect(evalPoly(F.num, [x, 0, 0]) / d).toBeCloseTo(evalPoly(F.simp.num, [x, 0, 0]) / evalPoly(F.simp.den, [x, 0, 0]), 9);
      }
    }
    expect(rootsOf(FRACS.f3.den)).toEqual([-2, 2]);
  });
});

describe('hình học', () => {
  it('các tứ giác dựng sẵn được nhận dạng đúng', () => {
    expect(classifyQuad(QUAD_P.trap)).toBe('trap');
    expect(classifyQuad(QUAD_P.rtrap)).toBe('rtrap');
    expect(classifyQuad(QUAD_P.isoTrap)).toBe('isoTrap');
    expect(classifyQuad(QUAD_P.para)).toBe('para');
    expect(classifyQuad(QUAD_P.rect)).toBe('rect');
    expect(classifyQuad(QUAD_P.rhombus)).toBe('rhombus');
    expect(classifyQuad(QUAD_P.square)).toBe('square');
  });
  it('kéo đỉnh vẫn giữ đúng loại tứ giác', () => {
    const kinds = ['trap', 'isoTrap', 'para', 'rect', 'rhombus', 'square'] as const;
    for (const k of kinds)
      for (let i = 0; i < 4; i++) {
        const q = moveQuad(k, QUAD_P[k], i, { x: QUAD_P[k][i].x + 37, y: QUAD_P[k][i].y - 23 });
        const c = classifyQuad(q);
        if (k === 'trap') expect(['trap', 'isoTrap', 'rtrap', 'para'], `${k} ${i}`).toContain(c);
        else if (k === 'isoTrap') expect(['isoTrap', 'rect'], `${k} ${i}`).toContain(c);
        else if (k === 'para') expect(['para', 'rect', 'rhombus', 'square'], `${k} ${i}`).toContain(c);
        else if (k === 'rect') expect(['rect', 'square'], `${k} ${i}`).toContain(c);
        else if (k === 'rhombus') expect(['rhombus', 'square'], `${k} ${i}`).toContain(c);
        else expect(c, `${k} ${i}`).toBe('square');
      }
  });
  it('tam giác ảnh đồng dạng với tam giác ban đầu', () => {
    const t1 = [{ x: 0, y: 0 }, { x: 100, y: 10 }, { x: 30, y: 80 }];
    const t2 = t1.map((p) => ({ x: 500 + p.x * 1.5, y: 200 + p.y * 1.5 }));
    expect(similarCheck(t1, t2).ok).toBe(true);
    expect(similarCheck(t1, [t2[0], t2[1], { x: t2[2].x + 30, y: t2[2].y }]).ok).toBe(false);
  });
  it('tiện ích hình học', () => {
    expect(angleAt({ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 })).toBeCloseTo(90);
    expect(dist({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
    expect(isParallel({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 5, y: 0 }, { x: 7, y: 2 })).toBe(true);
  });
  it('số đo hình chóp đều', () => {
    const m = pyramidMetrics('sq', 6, 4);
    expect(m.d).toBeCloseTo(5);
    expect(m.V).toBeCloseTo(48);
    expect(m.Sxq).toBeCloseTo(60);
  });
});

describe('xác suất', () => {
  it('đếm kết quả thuận lợi', () => {
    const fav = (e: string, i: number) => EXPS[e].outcomes.filter((o, k) => EXPS[e].events[i].test(o, k)).length;
    expect(fav('die', 1)).toBe(3);
    expect(fav('die2', 0)).toBe(6);
    expect(fav('cards20', 1)).toBe(8);
    expect(fav('bag', 0)).toBe(3);
    expect(fav('bagHidden', 0)).toBe(7);
  });
});

import { incircle, circumcircle, quadRoots, roundMetrics, solveIneq, solveSystem } from './Math9Views';

describe('Toán 9', () => {
  it('hệ phương trình', () => {
    expect(solveSystem([1, -2, 1], [3, 1, 10])).toEqual({ kind: 'one', x: 3, y: 1 });
    expect(solveSystem([1, 1, 2], [2, 2, 5]).kind).toBe('none');
    expect(solveSystem([1, 1, 2], [2, 2, 4]).kind).toBe('many');
  });
  it('bất phương trình đổi chiều khi chia số âm', () => {
    expect(solveIneq(3, -5, 7, '>')).toEqual({ rel: '>', v: 4 });
    expect(solveIneq(-2, 1, 9, '≥')).toEqual({ rel: '≤', v: -4 });
  });
  it('phương trình bậc hai', () => {
    expect(quadRoots(2, -5, 2)).toEqual([0.5, 2]);
    expect(quadRoots(1, -2, 1)).toEqual([1]);
    expect(quadRoots(1, 1, 1)).toEqual([]);
  });
  it('đường tròn ngoại tiếp, nội tiếp tam giác vuông 3-4-5', () => {
    const A = { x: 0, y: 0 }, B = { x: 3, y: 0 }, Cc = { x: 0, y: 4 };
    expect(circumcircle(A, B, Cc).r).toBeCloseTo(2.5);
    expect(incircle(A, B, Cc).r).toBeCloseTo(1);
  });
  it('hình trụ, nón, cầu', () => {
    expect(roundMetrics('cyl', 4, 10).V).toBeCloseTo(160 * Math.PI);
    expect(roundMetrics('cone', 3, 4).Sxq).toBeCloseTo(15 * Math.PI);
    expect(roundMetrics('sphere', 3, 0).V).toBeCloseTo(36 * Math.PI);
  });
});

import { decStr, decimalExpand, prismMetrics } from './Math7Views';

describe('Toán 7', () => {
  it('đủ 37 bài, có mô phỏng và nội dung bài học', () => {
    const m = LESSONS.filter((l) => l.subject === 'math' && l.grade === 7);
    expect(m.length).toBe(37);
    for (const l of m) {
      expect(CONTENT[l.id], l.id).toBeTruthy();
      expect(NOTES[l.id], l.id).toBeTruthy();
      for (const s of NOTES[l.id].sections) if (s.scene) expect(s.scene, `${l.id} ${s.title}`).toBeLessThanOrEqual(CONTENT[l.id].scenes.length);
    }
  });
  it('số thập phân vô hạn tuần hoàn', () => {
    expect(decStr(1, 3)).toBe('0,(3)');
    expect(decStr(5, 6)).toBe('0,8(3)');
    expect(decStr(1, 7)).toBe('0,(142857)');
    expect(decStr(3, 8)).toBe('0,375');
    expect(decimalExpand(2, 11).start).toBe(0);
  });
  it('hình hộp, lập phương, lăng trụ đứng', () => {
    expect(prismMetrics({ kind: 'box', a: 80, b: 40, h: 50 }).V).toBe(160000);
    expect(prismMetrics({ kind: 'cube', a: 3, b: 3, h: 0 }).V).toBe(27);
    expect(prismMetrics({ kind: 'tri', a: 3, b: 4, h: 10 }).V).toBe(60);
    expect(prismMetrics({ kind: 'box', a: 80, b: 40, h: 50 }).Sxq).toBe(12000);
  });
});
