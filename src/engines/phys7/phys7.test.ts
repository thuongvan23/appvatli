import { PHYS7_LESSONS } from '../../lessons/phys7';
import { LESSONS } from '../../core/catalog';
import { NOTES } from '../../lessons/notes';
import { CONTENT } from '../../lessons';
import { CARD_SETS, STEP_SETS } from '../chem/infoData';
import { TABLES } from '../chem/ProcessViews';
import { PHYS7_MODES } from './Phys7View';
import { MOVERS, GRAPH_SC, DRIVERS } from './MotionViews';
import { SOURCES, MEDIA_SOUND, NOISE_FIX, scopeFreq } from './SoundViews';
import { FIELD_CFG, clipsFor } from './MagnetViews';

describe('nội dung Vật lí 7', () => {
  it('mọi bài lớp 7 trong danh mục đều có mô phỏng và nội dung bài học', () => {
    const g7 = LESSONS.filter((l) => l.grade === 7);
    expect(g7.length).toBe(20);
    for (const l of g7) {
      expect(CONTENT[l.id], l.id).toBeTruthy();
      expect(NOTES[l.id], l.id).toBeTruthy();
      for (const s of NOTES[l.id].sections) if (s.scene) expect(s.scene, `${l.id} ${s.title}`).toBeLessThanOrEqual(CONTENT[l.id].scenes.length);
    }
  });

  it('mọi cảnh tham chiếu dữ liệu hợp lệ', () => {
    for (const [id, c] of Object.entries(PHYS7_LESSONS)) {
      c.scenes.forEach((s, i) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const d = s.doc as any;
        const where = `${id} cảnh ${i + 1}`;
        expect(PHYS7_MODES as readonly string[], where).toContain(d.mode);
        if (d.mode === 'cards') expect(CARD_SETS[d.set], where).toBeTruthy();
        if (d.mode === 'steps') expect(STEP_SETS[d.set], where).toBeTruthy();
        if (d.mode === 'table') expect(TABLES[d.set], where).toBeTruthy();
        if (d.mode === 'race') for (const m of d.movers) expect(MOVERS[m], `${where} ${m}`).toBeTruthy();
        if (d.mode === 'graph') expect(GRAPH_SC[d.sc], where).toBeTruthy();
        if (d.mode === 'safety') expect(DRIVERS[d.driver as keyof typeof DRIVERS], where).toBeTruthy();
        if (d.mode === 'source') for (const m of [d.src, ...(d.list ?? [])]) expect(SOURCES[m as keyof typeof SOURCES], where).toBeTruthy();
        if (d.mode === 'wave') expect(MEDIA_SOUND[d.medium as keyof typeof MEDIA_SOUND], where).toBeTruthy();
        if (d.mode === 'noise') for (const m of d.on) expect(NOISE_FIX[m as keyof typeof NOISE_FIX], where).toBeTruthy();
        if (d.mode === 'field') for (const m of [d.cfg, ...(d.list ?? [])]) expect(FIELD_CFG[m as keyof typeof FIELD_CFG], where).toBeTruthy();
        if (s.report) for (const col of s.report.columns) if (col.source) expect(typeof col.source, where).toBe('string');
      });
    }
  });
});

describe('mô hình Vật lí 7', () => {
  it('đồ thị từ bảng khớp với chuyển động', () => {
    const sc = GRAPH_SC.bang;
    const o = sc.objs[0];
    const sAt = (t: number) => o.segs.reduce((s, g) => (t <= g.t0 ? s : s + g.v * (Math.min(t, g.t1) - g.t0)), 0);
    for (const [t, s] of sc.table!) expect(sAt(t), `t=${t}`).toBe(s);
  });
  it('hai người gặp nhau tại 80 s, 400 m', () => {
    const [a, b] = GRAPH_SC.hai.objs;
    const sAt = (o: typeof a, t: number) => o.segs.reduce((s, g) => (t <= g.t0 ? s : s + g.v * (Math.min(t, g.t1) - g.t0)), 0);
    expect(sAt(a, 80)).toBe(400);
    expect(sAt(b, 80)).toBe(400);
  });
  it('thước càng ngắn âm càng cao; dây 1 cao hơn dây 6', () => {
    const base = { mode: 'scope' as const, src: 'ruler' as const, A: 0.5, f: 0 };
    expect(scopeFreq({ ...base, L: 10 })).toBeGreaterThan(scopeFreq({ ...base, L: 25 }));
    expect(scopeFreq({ ...base, L: 30 })).toBeLessThan(50);
    expect(scopeFreq({ ...base, src: 'string', str: 1 })).toBeGreaterThan(scopeFreq({ ...base, src: 'string', str: 6 }));
  });
  it('nam châm điện mạnh hơn khi tăng pin, số vòng, có lõi sắt', () => {
    expect(clipsFor({ cells: 2, turns: 200, core: true })).toBeGreaterThan(clipsFor({ cells: 1, turns: 200, core: true }));
    expect(clipsFor({ cells: 2, turns: 300, core: true })).toBeGreaterThan(clipsFor({ cells: 2, turns: 100, core: true }));
    expect(clipsFor({ cells: 2, turns: 200, core: true })).toBeGreaterThan(clipsFor({ cells: 2, turns: 200, core: false }));
  });
});
