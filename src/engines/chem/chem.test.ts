import { CHEM8_LESSONS } from '../../lessons/chem8';
import { CHEM9_LESSONS } from '../../lessons/chem9';
import { CHEM7_LESSONS } from '../../lessons/chem7';
import { BONDS7, MOL7, PERCENT_TASKS, VALENCE, buildFormula } from './AtomViews';
import { ELEMENTS, elBySym, elByZ, fillShells } from './elements';
import { LESSONS } from '../../core/catalog';
import { SUBS, TOOLS, runTube, mediumOf } from './data';
import { CARD_SETS, STEP_SETS } from './infoData';
import { TABLES } from './ProcessViews';
import { CLASS_SETS, MOLS } from './OrganicViews';
import { EQUATIONS, RX_MODELS, STOICH } from './ReactionViews';
import { MOLE_SUBS } from './MoleViews';
import { SAMPLES } from './AcidBaseViews';
import { molarMass, parseFormula } from './formula';

const ALL = { ...CHEM7_LESSONS, ...CHEM8_LESSONS, ...CHEM9_LESSONS };
const MODES = ['tubes', 'ph', 'titration', 'rate', 'solution', 'prepare', 'mix', 'mass', 'rearrange', 'balance', 'stoich', 'mole', 'gasdens', 'structure', 'classify', 'polymer', 'ionic', 'fuelheat', 'cards', 'steps', 'relations', 'soltable', 'activity', 'furnace', 'distill', 'fert', 'conduct', 'crust', 'carbon', 'photo', 'table', 'atom', 'symbols', 'ptable', 'molecules', 'bond', 'valence', 'percent', 'ionprop'];

describe('nội dung bài Hoá học', () => {
  it('mọi bài Hoá trong danh mục đều có nội dung', () => {
    for (const l of LESSONS.filter((x) => x.subject === 'chem')) expect(ALL[l.id], l.id).toBeTruthy();
  });

  it('mọi cảnh tham chiếu dữ liệu hợp lệ', () => {
    for (const [id, c] of Object.entries(ALL)) {
      c.scenes.forEach((s, i) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const d = s.doc as any;
        const where = `${id} cảnh ${i + 1}`;
        expect(MODES, where).toContain(d.mode);
        if (d.mode === 'cards') expect(CARD_SETS[d.set], where).toBeTruthy();
        if (d.mode === 'steps') expect(STEP_SETS[d.set], where).toBeTruthy();
        if (d.mode === 'table') expect(TABLES[d.set], where).toBeTruthy();
        if (d.mode === 'classify') expect(CLASS_SETS[d.set], where).toBeTruthy();
        if (d.mode === 'structure') for (const m of [...d.list, d.mol]) expect(MOLS[m], `${where} ${m}`).toBeTruthy();
        if (d.mode === 'rearrange') expect(RX_MODELS[d.rx], where).toBeTruthy();
        if (d.mode === 'stoich') expect(STOICH[d.rx], where).toBeTruthy();
        if (d.mode === 'mole') for (const m of d.subs) expect(MOLE_SUBS[m], `${where} ${m}`).toBeTruthy();
        if (d.mode === 'ph') for (const m of d.samples) expect(SAMPLES[m], `${where} ${m}`).toBeTruthy();
        if (d.mode === 'atom') for (const z of [d.Z, ...(d.list ?? [])]) expect(elByZ(z), `${where} Z=${z}`).toBeTruthy();
        if (d.mode === 'symbols') for (const s of d.list) expect(elBySym(s), `${where} ${s}`).toBeTruthy();
        if (d.mode === 'ptable') expect(elByZ(d.sel), where).toBeTruthy();
        if (d.mode === 'molecules') for (const m of [d.sel, ...d.list]) expect(MOL7[m], `${where} ${m}`).toBeTruthy();
        if (d.mode === 'bond') for (const m of [d.pair, ...(d.list ?? [])]) expect(BONDS7[m], `${where} ${m}`).toBeTruthy();
        if (d.mode === 'valence') for (const m of [d.a, d.b, ...(d.as ?? []), ...(d.bs ?? [])]) expect(VALENCE[m], `${where} ${m}`).toBeTruthy();
        if (d.mode === 'percent') for (const m of [d.task, ...d.list]) expect(PERCENT_TASKS[m], `${where} ${m}`).toBeTruthy();
        if (d.mode === 'classify' && d.sets) for (const m of d.sets) expect(CLASS_SETS[m], `${where} ${m}`).toBeTruthy();
        if (d.mode === 'tubes') {
          for (const x of d.shelf) expect(SUBS[x] || TOOLS[x], `${where} ${x}`).toBeTruthy();
          for (const t of d.tubes) {
            for (const x of t.init) expect(SUBS[x], `${where} ${x}`).toBeTruthy();
            // thử mọi thao tác trên giá
            for (const x of d.shelf) expect(() => runTube(t.init, [x, x])).not.toThrow();
          }
        }
      });
    }
  });
});

describe('bàn ống nghiệm', () => {
  it('kẽm + HCl sủi bọt khí hydrogen', () => {
    const st = runTube(['zn'], ['hcl']);
    expect(st.gas?.name).toBe('H₂');
    expect(st.S).toContain('zncl2');
    expect(st.S).toContain('zn');
  });
  it('CuSO₄ + NaOH tạo kết tủa xanh', () => {
    const st = runTube(['cuso4'], ['naoh']);
    expect(st.S).toContain('cuoh2');
  });
  it('BaCl₂ + HCl không phản ứng', () => {
    const st = runTube(['bacl2'], ['hcl']);
    expect(st.log[0].reacted).toBe(false);
  });
  it('trung hoà làm mất màu hồng của phenolphthalein', () => {
    const a = runTube(['naoh'], ['phenol']);
    expect(mediumOf(a.S)).toBe('base');
    const b = runTube(['naoh'], ['phenol', 'hcl']);
    expect(mediumOf(b.S)).toBe('neutral');
  });
  it('CO₂ vào nước vôi trong: vẩn đục rồi trong trở lại', () => {
    expect(runTube(['caoh2'], ['co2']).S).toContain('caco3p');
    expect(runTube(['caoh2'], ['co2', 'co2']).S).toContain('cahco32');
  });
  it('Fe + S chỉ phản ứng khi đun nóng', () => {
    expect(runTube(['fesmix'], ['@magnet']).S).toContain('fesmix');
    expect(runTube(['fesmix'], ['@heat']).S).toContain('fes');
  });
  it('ester hoá cần H₂SO₄ đặc và đun nóng', () => {
    expect(runTube(['c2h5oh', 'ch3cooh'], ['@heat']).S).not.toContain('ester');
    expect(runTube(['c2h5oh', 'ch3cooh'], ['h2so4dac', '@heat']).S).toContain('ester');
  });
  it('thuỷ phân tinh bột rồi thử iodine không còn màu xanh tím', () => {
    expect(runTube(['tinhbot', 'hcl'], ['@heat', 'iot']).S).not.toContain('tbiot');
    expect(runTube(['tinhbot', 'h2o'], ['@heat', 'iot']).S).toContain('tbiot');
  });
});

describe('công thức hoá học', () => {
  it('đếm nguyên tử và khối lượng mol', () => {
    expect(parseFormula('Al2(SO4)3')).toEqual({ Al: 2, S: 3, O: 12 });
    expect(molarMass('CaCO3')).toBe(100);
    expect(molarMass('ZnCl2')).toBe(136);
  });
  it('mọi phương trình luyện tập đều cân bằng được với hệ số ≤ 12', () => {
    for (const eq of EQUATIONS) {
      const all = [...eq.left, ...eq.right];
      const els = Array.from(new Set(all.flatMap((f) => Object.keys(parseFormula(f)))));
      let found = false;
      const cs = all.map(() => 1);
      const rec = (i: number): boolean => {
        if (i === all.length) {
          return els.every((el) => {
            const L = eq.left.reduce((s, f, k) => s + (parseFormula(f)[el] ?? 0) * cs[k], 0);
            const R = eq.right.reduce((s, f, k) => s + (parseFormula(f)[el] ?? 0) * cs[eq.left.length + k], 0);
            return L === R;
          });
        }
        for (let c = 1; c <= 12; c++) {
          cs[i] = c;
          if (rec(i + 1)) return true;
        }
        return false;
      };
      found = rec(0);
      expect(found, all.join(' ')).toBe(true);
    }
  });
});

describe('Hoá học 7', () => {
  it('dữ liệu 36 nguyên tố khớp số electron và vị trí', () => {
    expect(ELEMENTS.length).toBe(36);
    for (const e of ELEMENTS) {
      expect(e.shells.reduce((a, b) => a + b, 0), e.sym).toBe(e.Z);
      expect(e.shells.length, e.sym).toBe(e.period);
      if (e.Z <= 20) expect(fillShells(e.Z), e.sym).toEqual(e.shells);
      // nhóm A: số e lớp ngoài cùng = số thứ tự nhóm (trừ He)
      if (e.col >= 13 && e.Z !== 2) expect(e.shells[e.shells.length - 1], e.sym).toBe(e.col - 10);
      if (e.col <= 2 && e.Z !== 2) expect(e.shells[e.shells.length - 1], e.sym).toBe(e.col);
    }
  });
  it('lập công thức theo hoá trị', () => {
    expect(buildFormula('Al', 3, 'O', 2).f).toBe('Al2O3');
    expect(buildFormula('Ca', 2, 'OH', 1).f).toBe('Ca(OH)2');
    expect(buildFormula('Fe', 3, 'SO4', 2).f).toBe('Fe2(SO4)3');
    expect(buildFormula('Na', 1, 'Cl', 1).f).toBe('NaCl');
    expect(buildFormula('C', 4, 'O', 2).f).toBe('CO2');
  });
  it('bài tìm công thức từ phần trăm cho đúng số nguyên tử', () => {
    for (const [k, t] of Object.entries(PERCENT_TASKS)) {
      if (!t.given) continue;
      const c = parseFormula(t.f);
      for (const g of t.given) {
        const n = (g.pct * t.M!) / 100 / (elBySym(g.el)?.mass ?? 0);
        expect(Math.abs(n - c[g.el]), `${k} ${g.el}`).toBeLessThan(0.05);
      }
      expect(molarMass(t.f), k).toBe(t.M);
    }
  });
  it('mô hình liên kết cộng hoá trị: mỗi nguyên tử đủ lớp vỏ bền', () => {
    for (const [k, b] of Object.entries(BONDS7)) {
      if (b.type !== 'covalent') continue;
      b.atoms.forEach((a, i) => {
        const outer = fillShells(elBySym(a.sym)!.Z).slice(-1)[0];
        const shared = (b.bonds ?? []).filter(([p, q]) => p === i || q === i).reduce((s, [, , o]) => s + o, 0);
        expect(outer + shared, `${k} ${a.sym}`).toBe(a.sym === 'H' ? 2 : 8);
      });
    }
  });
});
