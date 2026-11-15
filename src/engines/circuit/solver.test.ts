import { describe, expect, it } from 'vitest';
import { CircuitDoc, Part, Wire, makePart } from './model';
import { solveCircuit } from './solver';

let wc = 0;
const w = (x1: number, y1: number, x2: number, y2: number): Wire => ({ id: `w${wc++}`, x1, y1, x2, y2 });

/**
 * Vòng mạch chữ nhật: nguồn ở cạnh dưới (0,4)→(2,4) chiều sang phải... được dựng bằng tay
 * trong từng test cho rõ ràng.
 */
function doc(parts: Part[], wires: Wire[]): CircuitDoc {
  return { parts, wires };
}

describe('solveCircuit', () => {
  it('định luật Ohm: nguồn 6 V, điện trở 12 Ω ⇒ I ≈ 0,5 A', () => {
    // Nguồn: a(0,0) − , b(2,0) +. Điện trở từ (2,2) tới (0,2)
    const src = makePart('supply', 0, 0, 0, { voltage: 6 }, 'src');
    const r = makePart('resistor', 2, 2, 2, { R: 12 }, 'r');
    const A = makePart('ammeter', 2, 0, 1, {}, 'A'); // (2,0) → (2,2)
    const res = solveCircuit(doc([src, r, A], [w(0, 2, 0, 0)]));
    expect(res.parts.A.I).toBeCloseTo(0.5, 2);
    expect(res.parts.r.U).toBeCloseTo(6, 1);
    expect(res.shorted).toEqual([]);
  });

  it('mạch nối tiếp: I như nhau, U chia theo R', () => {
    const src = makePart('supply', 0, 0, 0, { voltage: 9 }, 'src'); // (0,0)→(2,0)
    const r1 = makePart('resistor', 2, 0, 1, { R: 10 }, 'r1'); // (2,0)→(2,2)
    const r2 = makePart('resistor', 2, 2, 2, { R: 20 }, 'r2'); // (2,2)→(0,2)
    const res = solveCircuit(doc([src, r1, r2], [w(0, 2, 0, 0)]));
    expect(res.parts.r1.I).toBeCloseTo(0.3, 2);
    expect(res.parts.r2.I).toBeCloseTo(0.3, 2);
    expect(res.parts.r1.U).toBeCloseTo(3, 1);
    expect(res.parts.r2.U).toBeCloseTo(6, 1);
  });

  it('mạch song song: I tổng = I1 + I2', () => {
    const src = makePart('supply', 0, 0, 0, { voltage: 6 }, 'src'); // (0,0)→(2,0)
    const A = makePart('ammeter', 2, 0, 0, {}, 'A'); // (2,0)→(4,0)
    const r1 = makePart('resistor', 4, 0, 1, { R: 6 }, 'r1'); // (4,0)→(4,2)
    const r2 = makePart('resistor', 6, 0, 1, { R: 3 }, 'r2'); // (6,0)→(6,2)
    const res = solveCircuit(doc([src, A, r1, r2], [w(4, 0, 6, 0), w(4, 2, 6, 2), w(4, 2, 0, 2), w(0, 2, 0, 0)]));
    expect(res.parts.r1.I).toBeCloseTo(1, 1);
    expect(res.parts.r2.I).toBeCloseTo(2, 1);
    expect(res.parts.A.I).toBeCloseTo(3, 1);
  });

  it('vôn kế mắc song song đo đúng hiệu điện thế, gần như không làm thay đổi mạch', () => {
    const src = makePart('battery', 0, 0, 0, { cells: 2 }, 'src'); // 3 V
    const r = makePart('resistor', 2, 0, 1, { R: 100 }, 'r'); // (2,0)→(2,2)
    const V = makePart('voltmeter', 4, 0, 1, {}, 'V'); // (4,0)→(4,2)
    const res = solveCircuit(doc([src, r, V], [w(2, 0, 4, 0), w(2, 2, 4, 2), w(2, 2, 0, 2), w(0, 2, 0, 0)]));
    expect(res.parts.V.U).toBeCloseTo(3, 1);
  });

  it('công tắc mở ⇒ không có dòng điện', () => {
    const src = makePart('battery', 0, 0, 0, { cells: 2 }, 'src');
    const k = makePart('switch', 2, 0, 1, { closed: false }, 'k');
    const l = makePart('lamp', 2, 2, 2, {}, 'l');
    const res = solveCircuit(doc([src, k, l], [w(0, 2, 0, 0)]));
    expect(Math.abs(res.parts.l.I)).toBeLessThan(1e-6);
  });

  it('LED chỉ sáng khi mắc đúng chiều', () => {
    const src = makePart('battery', 0, 0, 0, { cells: 2 }, 'src'); // + ở (2,0)
    const r = makePart('resistor', 2, 0, 1, { R: 100 }, 'r'); // (2,0)→(2,2)
    const ledOk = makePart('led', 2, 2, 2, {}, 'led'); // anode (2,2) → cathode (0,2)
    const ok = solveCircuit(doc([src, r, ledOk], [w(0, 2, 0, 0)]));
    expect(ok.parts.led.on).toBe(true);
    expect(ok.parts.led.I).toBeCloseTo((3 - 1.8) / 115, 3);

    const ledBad = makePart('led', 0, 2, 0, {}, 'led'); // anode (0,2) → cathode (2,2): ngược
    const bad = solveCircuit(doc([src, r, ledBad], [w(0, 2, 0, 0)]));
    expect(bad.parts.led.on).toBe(false);
    expect(Math.abs(bad.parts.led.I)).toBeLessThan(1e-6);
  });

  it('đoản mạch: phát hiện và làm đứt cầu chì', () => {
    const src = makePart('battery', 0, 0, 0, { cells: 2 }, 'src');
    const f = makePart('fuse', 2, 0, 1, { maxI: 0.5 }, 'f');
    const lamp = makePart('lamp', 2, 2, 2, {}, 'l');
    // dây nối tắt hai đầu bóng đèn
    const res = solveCircuit(doc([src, f, lamp], [w(0, 2, 0, 0), w(2, 2, 0, 2)]));
    expect(res.newlyBroken).toContain('f');
    expect(Math.abs(res.parts.l.I)).toBeLessThan(1e-6);

    const noFuse = solveCircuit(doc([src, makePart('switch', 2, 0, 1, { closed: true }, 'k')], [w(0, 2, 0, 0), w(2, 2, 0, 2)]));
    expect(noFuse.shorted).toEqual(['src']);
  });

  it('đèn quá tải nặng thì cháy', () => {
    const src = makePart('supply', 0, 0, 0, { voltage: 12 }, 'src');
    const lamp = makePart('lamp', 2, 0, 1, { ratedV: 3, ratedP: 0.9 }, 'l');
    const res = solveCircuit(doc([src, lamp], [w(2, 2, 0, 2), w(0, 2, 0, 0)]));
    expect(res.newlyBroken).toEqual(['l']);
  });

  it('biến trở: dịch con chạy làm thay đổi cường độ dòng điện', () => {
    const src = makePart('supply', 0, 0, 0, { voltage: 6 }, 'src');
    const a = solveCircuit(doc([src, makePart('rheostat', 2, 0, 1, { Rmax: 20, pos: 1 }, 'rb')], [w(2, 2, 0, 2), w(0, 2, 0, 0)]));
    const b = solveCircuit(doc([src, makePart('rheostat', 2, 0, 1, { Rmax: 20, pos: 0.5 }, 'rb')], [w(2, 2, 0, 2), w(0, 2, 0, 0)]));
    expect(a.parts.rb.I).toBeCloseTo(0.3, 2);
    expect(b.parts.rb.I).toBeCloseTo(0.6, 2);
  });
});
