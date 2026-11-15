import { useEffect, useState } from 'react';
import type { Measurements, ReportColumn, ReportDef } from '../core/types';
import { fmt } from '../core/format';
import { Icon } from './Icon';

export type ReportRow = Record<string, number | undefined>;

export interface ReportState {
  rows: ReportRow[];
  name: string;
  className: string;
  answers: string[];
  notes: string;
}

export const emptyReport = (): ReportState => ({ rows: [], name: '', className: '', answers: [], notes: '' });

function computeRow(def: ReportDef, raw: ReportRow): ReportRow {
  const row: ReportRow = { ...raw };
  for (const c of def.columns) if (c.formula) row[c.key] = c.formula(row);
  return row;
}

function parseNum(s: string): number | undefined {
  const t = s.trim().replace(/\./g, '').replace(',', '.');
  if (t === '') return undefined;
  const n = Number(t);
  return Number.isFinite(n) ? n : undefined;
}

export function ReportDrawer({ def, state, setState, getMeasurements, onClose, lessonTitle }: { def: ReportDef; state: ReportState; setState: (s: ReportState) => void; getMeasurements: () => Measurements; onClose: () => void; lessonTitle: string }) {
  const [live, setLive] = useState<Measurements>({});
  useEffect(() => {
    const t = setInterval(() => setLive({ ...getMeasurements() }), 300);
    return () => clearInterval(t);
  }, [getMeasurements]);

  const rows = state.rows.map((r) => computeRow(def, r));
  const sourceCols = def.columns.filter((c) => c.source);

  const record = () => {
    const m = getMeasurements();
    const row: ReportRow = {};
    for (const c of def.columns) if (c.source) row[c.key] = roundTo(m[c.source], c.digits ?? 2);
    setState({ ...state, rows: [...state.rows, row] });
  };

  const editCell = (i: number, c: ReportColumn, v: string) => {
    const rowsNext = state.rows.map((r, j) => (j === i ? { ...r, [c.key]: parseNum(v) } : r));
    setState({ ...state, rows: rowsNext });
  };

  const avg = (c: ReportColumn) => {
    const vals = rows.map((r) => r[c.key]).filter((v): v is number => v !== undefined && Number.isFinite(v));
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : undefined;
  };

  const doPrint = () => {
    document.body.classList.add('printing-report');
    const done = () => {
      document.body.classList.remove('printing-report');
      window.removeEventListener('afterprint', done);
    };
    window.addEventListener('afterprint', done);
    window.print();
  };

  return (
    <aside className="report-drawer">
      <div className="report-head no-print">
        <h2>{def.practical ? 'Báo cáo thực hành' : 'Bảng số liệu'}</h2>
        <button className="icon-btn" onClick={onClose} aria-label="Đóng">
          <Icon name="close" />
        </button>
      </div>

      {sourceCols.length > 0 && (
        <div className="report-live no-print">
          <span className="muted">Số đo hiện tại:</span>
          {sourceCols.map((c) => (
            <span key={c.key} className="chip">
              {c.label} = <b>{fmt(live[c.source!], c.digits ?? 2)}</b> {c.unit}
            </span>
          ))}
          <button className="btn primary big" onClick={record}>
            <Icon name="plus" size={18} /> Ghi số đo
          </button>
        </div>
      )}

      <div className="report-sheet">
        {def.practical && (
          <>
            <div className="print-only report-title">BÁO CÁO THỰC HÀNH</div>
            <div className="report-names">
              <label>
                Họ và tên: <input value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
              </label>
              <label>
                Lớp: <input value={state.className} onChange={(e) => setState({ ...state, className: e.target.value })} />
              </label>
            </div>
          </>
        )}
        <h3>{def.title}</h3>
        <div className="muted small print-only">{lessonTitle}</div>
        {def.purpose && (
          <section>
            <h4>1. Mục đích</h4>
            <p>{def.purpose}</p>
          </section>
        )}
        {def.equipment && (
          <section>
            <h4>2. Chuẩn bị</h4>
            <ul>
              {def.equipment.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </section>
        )}
        {def.steps && (
          <section>
            <h4>3. Các bước tiến hành</h4>
            <ol>
              {def.steps.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ol>
          </section>
        )}
        <section>
          {def.practical && <h4>4. Kết quả</h4>}
          <table className="report-table">
            <thead>
              <tr>
                <th>Lần đo</th>
                {def.columns.map((c) => (
                  <th key={c.key}>
                    {c.label}
                    {c.unit ? ` (${c.unit})` : ''}
                  </th>
                ))}
                <th className="no-print"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  {def.columns.map((c) => (
                    <td key={c.key}>
                      {c.formula ? (
                        fmt(r[c.key], c.digits ?? 2)
                      ) : (
                        <input key={`${i}-${r[c.key]}`} className="cell" defaultValue={r[c.key] === undefined ? '' : fmt(r[c.key], c.digits ?? 2)} onBlur={(e) => editCell(i, c, e.target.value)} />
                      )}
                    </td>
                  ))}
                  <td className="no-print">
                    <button className="icon-btn small" onClick={() => setState({ ...state, rows: state.rows.filter((_, j) => j !== i) })} aria-label="Xoá dòng">
                      <Icon name="trash" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={def.columns.length + 2} className="muted">
                    Chưa có số liệu. Bấm “Ghi số đo” sau mỗi lần thay đổi thí nghiệm.
                  </td>
                </tr>
              )}
              {rows.length > 1 && def.columns.some((c) => c.average) && (
                <tr className="avg-row">
                  <td>Trung bình</td>
                  {def.columns.map((c) => (
                    <td key={c.key}>{c.average ? fmt(avg(c), c.digits ?? 2) : ''}</td>
                  ))}
                  <td className="no-print"></td>
                </tr>
              )}
            </tbody>
          </table>
          {def.chart && rows.length > 0 && <Chart rows={rows} def={def} />}
        </section>
        {def.questions && (
          <section>
            <h4>{def.practical ? '5. Trả lời câu hỏi' : 'Câu hỏi'}</h4>
            {def.questions.map((q, i) => (
              <div key={i} className="report-q">
                <p>
                  {i + 1}. {q}
                </p>
                <textarea
                  rows={2}
                  value={state.answers[i] ?? ''}
                  onChange={(e) => {
                    const a = [...state.answers];
                    a[i] = e.target.value;
                    setState({ ...state, answers: a });
                  }}
                />
              </div>
            ))}
          </section>
        )}
        <section>
          <h4>Nhận xét</h4>
          <textarea rows={2} value={state.notes} onChange={(e) => setState({ ...state, notes: e.target.value })} />
        </section>
      </div>

      <div className="report-foot no-print">
        <button className="btn" onClick={() => setState({ ...state, rows: [] })} disabled={rows.length === 0}>
          Xoá bảng
        </button>
        <button className="btn" onClick={() => downloadCsv(def, rows)} disabled={rows.length === 0}>
          Tải CSV (Excel)
        </button>
        <button className="btn primary" onClick={doPrint}>
          <Icon name="print" size={18} /> In / Lưu PDF
        </button>
      </div>
    </aside>
  );
}

function roundTo(v: number | undefined, d: number) {
  if (v === undefined || !Number.isFinite(v)) return undefined;
  const k = 10 ** d;
  return Math.round(v * k) / k;
}

function downloadCsv(def: ReportDef, rows: ReportRow[]) {
  const head = ['Lần đo', ...def.columns.map((c) => `${c.label}${c.unit ? ` (${c.unit})` : ''}`)];
  const lines = [head, ...rows.map((r, i) => [String(i + 1), ...def.columns.map((c) => (r[c.key] === undefined ? '' : fmt(r[c.key], c.digits ?? 2)))])];
  // Dùng dấu chấm phẩy để Excel tiếng Việt đọc đúng số có dấu phẩy thập phân
  const csv = '﻿' + lines.map((l) => l.map((x) => `"${x.replace(/"/g, '""')}"`).join(';')).join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${def.title}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function niceMax(v: number) {
  if (!(v > 0)) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  for (const m of [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) if (m * p >= v) return m * p;
  return 10 * p;
}

function Chart({ rows, def }: { rows: ReportRow[]; def: ReportDef }) {
  const { x, y, title } = def.chart!;
  const cx = def.columns.find((c) => c.key === x)!;
  const cy = def.columns.find((c) => c.key === y)!;
  const pts = rows.map((r) => [r[x], r[y]] as [number | undefined, number | undefined]).filter((p): p is [number, number] => p[0] !== undefined && p[1] !== undefined).sort((a, b) => a[0] - b[0]);
  const W = 520;
  const H = 300;
  const m = { l: 58, r: 20, t: 16, b: 46 };
  const xm = niceMax(Math.max(...pts.map((p) => p[0]), 0));
  const ym = niceMax(Math.max(...pts.map((p) => p[1]), 0));
  const sx = (v: number) => m.l + (v / xm) * (W - m.l - m.r);
  const sy = (v: number) => H - m.b - (v / ym) * (H - m.t - m.b);
  const ticks = [0, 0.25, 0.5, 0.75, 1];
  return (
    <figure className="chart">
      <figcaption>{title}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={sx(t * xm)} y1={sy(0)} x2={sx(t * xm)} y2={sy(ym)} className="grid" />
            <line x1={sx(0)} y1={sy(t * ym)} x2={sx(xm)} y2={sy(t * ym)} className="grid" />
            <text x={sx(t * xm)} y={H - m.b + 18} textAnchor="middle" className="tick">
              {fmt(t * xm, xm < 1 ? 2 : xm < 10 ? 1 : 0)}
            </text>
            <text x={m.l - 8} y={sy(t * ym) + 4} textAnchor="end" className="tick">
              {fmt(t * ym, ym < 1 ? 2 : ym < 10 ? 1 : 0)}
            </text>
          </g>
        ))}
        <line x1={sx(0)} y1={sy(0)} x2={sx(xm)} y2={sy(0)} className="axis" />
        <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(ym)} className="axis" />
        <text x={W - m.r} y={H - 6} textAnchor="end" className="axis-label">
          {cx.label} ({cx.unit})
        </text>
        <text x={m.l - 50} y={m.t - 2} className="axis-label">
          {cy.label} ({cy.unit})
        </text>
        {pts.length > 1 && <polyline points={pts.map((p) => `${sx(p[0])},${sy(p[1])}`).join(' ')} className="series-line" />}
        {pts.map((p, i) => (
          <circle key={i} cx={sx(p[0])} cy={sy(p[1])} r={6} className="series-dot" />
        ))}
      </svg>
    </figure>
  );
}
