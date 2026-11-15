import { useCallback, useEffect, useRef, useState } from 'react';
import type { EngineDef, Measurements, ReportDef } from '../core/types';
import { downloadJson, encodeShare, makeSaved, pickJsonFile, shareUrl } from '../core/share';
import { go } from '../core/route';
import { Icon } from './Icon';
import { PenOverlay } from './PenOverlay';
import { ReportDrawer, ReportState, emptyReport } from './ReportDrawer';
import { ThemeToggle } from './theme';
import { NotesDrawer } from './NotesDrawer';
import type { LessonNotes } from '../lessons/notes/types';

export interface WorkspaceProps {
  backHref: string;
  backLabel: string;
  kicker: string;
  title: string;
  scenes?: { titles: string[]; index: number; onSelect: (i: number) => void };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  engine: EngineDef<any, any>;
  doc: unknown;
  onDoc: (d: unknown) => void;
  options: unknown;
  prompt?: string;
  question?: string;
  report?: ReportDef;
  /** Khoá lưu báo cáo trong trình duyệt và để đặt lại trạng thái khi đổi cảnh */
  sceneKey: string;
  startHidden?: boolean;
  onReset?: () => void;
  saveTitle: string;
  /** Nội dung bài học (lí thuyết, ví dụ, câu hỏi) */
  notes?: LessonNotes;
}

function loadReport(key: string): ReportState {
  try {
    const s = localStorage.getItem(`report:${key}`);
    if (s) return { ...emptyReport(), ...JSON.parse(s) };
  } catch {
    /* bỏ qua */
  }
  return emptyReport();
}

export function Workspace(p: WorkspaceProps) {
  const { engine, scenes } = p;
  const [showValues, setShowValues] = useState(!p.startHidden);
  const [pen, setPen] = useState(false);
  const [zoom, setZoom] = useState<{ on: boolean; x: number; y: number }>({ on: false, x: 0, y: 0 });
  const [reportOpen, setReportOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [fullscreen, setFullscreen] = useState(!!document.fullscreenElement);
  const [toast, setToast] = useState('');
  const [report, setReportState] = useState<ReportState>(() => loadReport(p.sceneKey));
  const measureRef = useRef<Measurements>({});
  const stageRef = useRef<HTMLDivElement>(null);

  // Đổi cảnh: đặt lại trạng thái hiển thị
  useEffect(() => {
    setShowValues(!p.startHidden);
    setShowQuestion(false);
    setZoom({ on: false, x: 0, y: 0 });
    setReport(loadReport(p.sceneKey));
    if (!p.report) setReportOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.sceneKey]);

  const setReport = (s: ReportState) => {
    setReportState(s);
    try {
      localStorage.setItem(`report:${p.sceneKey}`, JSON.stringify(s));
    } catch {
      /* bỏ qua */
    }
  };

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(''), 2500);
  };

  const toggleFull = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.().catch(() => flash('Trình duyệt không cho phép toàn màn hình.'));
  }, []);

  useEffect(() => {
    const on = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);

  // Phím tắt trình chiếu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT')) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const k = e.key;
      if (scenes && (k === 'ArrowRight' || k === 'PageDown')) {
        e.preventDefault();
        if (scenes.index < scenes.titles.length - 1) scenes.onSelect(scenes.index + 1);
      } else if (scenes && (k === 'ArrowLeft' || k === 'PageUp')) {
        e.preventDefault();
        if (scenes.index > 0) scenes.onSelect(scenes.index - 1);
      } else if (k === 'h' || k === 'H') setShowValues((v) => !v);
      else if (k === 'f' || k === 'F') toggleFull();
      else if (k === 'p' || k === 'P') setPen((v) => !v);
      else if (k === 'q' || k === 'Q') setShowQuestion((v) => !v);
      else if (k === 'n' || k === 'N') setNotesOpen((v) => !v);
      else if (k === 'Escape') {
        setPen(false);
        setZoom({ on: false, x: 0, y: 0 });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [scenes, toggleFull]);

  const getMeasurements = useCallback(() => measureRef.current, []);
  const onMeasure = useCallback((m: Measurements) => {
    measureRef.current = m;
  }, []);

  const saved = () => makeSaved(engine.id, p.doc, p.options, p.saveTitle);

  const View = engine.View;

  return (
    <div className="ws">
      <header className="ws-head no-print">
        <button className="btn ghost" onClick={() => go(p.backHref)} title="Quay lại">
          <Icon name="back" /> <span className="hide-sm">{p.backLabel}</span>
        </button>
        <div className="ws-title">
          <div className="kicker">{p.kicker}</div>
          <h1>{p.title}</h1>
        </div>
        <div className="ws-tools">
          <button className={`tool ${showValues ? '' : 'on'}`} onClick={() => setShowValues((v) => !v)} title="Ẩn/hiện số đo (H)">
            <Icon name={showValues ? 'eye' : 'eyeOff'} />
            <span>{showValues ? 'Ẩn số đo' : 'Hiện số đo'}</span>
          </button>
          <button className={`tool ${pen ? 'on' : ''}`} onClick={() => setPen((v) => !v)} title="Bút vẽ chú thích (P)">
            <Icon name="pen" />
            <span>Bút vẽ</span>
          </button>
          <button className={`tool ${zoom.on ? 'on' : ''}`} onClick={() => setZoom((z) => ({ ...z, on: !z.on }))} title="Kính lúp: rê chuột để phóng to (Esc để thoát)">
            <Icon name="zoom" />
            <span>Kính lúp</span>
          </button>
          {p.notes && (
            <button
              className={`tool ${notesOpen ? 'on' : ''}`}
              onClick={() => {
                setNotesOpen((v) => !v);
                setReportOpen(false);
              }}
              title="Nội dung bài học: kiến thức, hiện tượng, ví dụ, câu hỏi (N)"
            >
              <Icon name="help" />
              <span>Bài học</span>
            </button>
          )}
          {p.report && (
            <button className={`tool ${reportOpen ? 'on' : ''}`} onClick={() => { setReportOpen((v) => !v); setNotesOpen(false); }} title="Bảng số liệu / Báo cáo thực hành">
              <Icon name="report" />
              <span>Báo cáo</span>
            </button>
          )}
          <span className="tool-sep" />
          {p.onReset && (
            <button className="tool" onClick={p.onReset} title="Đặt lại cảnh như ban đầu">
              <Icon name="reset" />
              <span>Đặt lại</span>
            </button>
          )}
          <button className="tool" onClick={() => downloadJson(saved(), p.saveTitle)} title="Lưu thí nghiệm thành file">
            <Icon name="save" />
            <span>Lưu</span>
          </button>
          <button
            className="tool"
            onClick={() =>
              pickJsonFile()
                .then((s) => go(`/lab/${s.engine}?d=${encodeShare(s)}`))
                .catch((e) => e?.message && flash(e.message))
            }
            title="Mở thí nghiệm đã lưu"
          >
            <Icon name="open" />
            <span>Mở</span>
          </button>
          <button
            className="tool"
            onClick={async () => {
              const url = shareUrl(saved());
              try {
                await navigator.clipboard.writeText(url);
                flash('Đã chép đường link thí nghiệm.');
              } catch {
                window.prompt('Chép đường link này:', url);
              }
            }}
            title="Chép đường link chứa thí nghiệm hiện tại"
          >
            <Icon name="link" />
            <span>Link</span>
          </button>
          <ThemeToggle />
          <button className="tool" onClick={toggleFull} title="Toàn màn hình (F)">
            <Icon name={fullscreen ? 'exitFull' : 'full'} />
          </button>
        </div>
      </header>

      {scenes && scenes.titles.length > 1 && (
        <nav className="ws-scenes no-print" aria-label="Các cảnh">
          <button className="icon-btn" disabled={scenes.index === 0} onClick={() => scenes.onSelect(scenes.index - 1)} aria-label="Cảnh trước">
            <Icon name="prev" />
          </button>
          <div className="scene-tabs">
            {scenes.titles.map((t, i) => (
              <button key={i} className={`scene-tab ${i === scenes.index ? 'on' : ''}`} onClick={() => scenes.onSelect(i)}>
                <span className="num">{i + 1}</span>
                {t}
              </button>
            ))}
          </div>
          <button className="icon-btn" disabled={scenes.index === scenes.titles.length - 1} onClick={() => scenes.onSelect(scenes.index + 1)} aria-label="Cảnh sau">
            <Icon name="next" />
          </button>
        </nav>
      )}

      <div className="ws-body">
        <main className="ws-stage" ref={stageRef}>
          <div className="ws-stage-inner" style={zoom.on && (zoom.x || zoom.y) ? { transform: 'scale(2)', transformOrigin: `${zoom.x}px ${zoom.y}px` } : undefined}>
            <View doc={p.doc} onDoc={p.onDoc} options={p.options} showValues={showValues} onMeasure={onMeasure} />
          </div>
          {zoom.on && (
            <div
              className="zoom-overlay"
              onPointerMove={(e) => {
                const r = stageRef.current!.getBoundingClientRect();
                setZoom({ on: true, x: e.clientX - r.left, y: e.clientY - r.top });
              }}
              onPointerLeave={() => setZoom({ on: true, x: 0, y: 0 })}
              onClick={() => setZoom({ on: false, x: 0, y: 0 })}
              title="Bấm để tắt kính lúp"
            />
          )}
          <PenOverlay active={pen} clearKey={p.sceneKey} onClose={() => setPen(false)} />
          {!showValues && <div className="hidden-badge no-print">Số đo đang ẩn – bấm “Hiện số đo” (H)</div>}
        </main>
        {notesOpen && p.notes && <NotesDrawer notes={p.notes} title={`${p.kicker} – ${p.title}`} onClose={() => setNotesOpen(false)} onScene={scenes?.onSelect} sceneTitles={scenes?.titles} />}
        {reportOpen && p.report && <ReportDrawer def={p.report} state={report} setState={setReport} getMeasurements={getMeasurements} onClose={() => setReportOpen(false)} lessonTitle={`${p.kicker} – ${p.title}`} />}
      </div>

      {(p.prompt || p.question) && (
        <footer className="ws-caption no-print">
          {p.prompt && (
            <div className="caption-prompt">
              <Icon name="help" /> <span>{p.prompt}</span>
            </div>
          )}
          {p.question && (
            <div className="caption-q">
              <button className={`btn ${showQuestion ? 'on' : ''}`} onClick={() => setShowQuestion((v) => !v)} title="Hiện/ẩn câu hỏi (Q)">
                <Icon name="question" size={18} /> {showQuestion ? 'Ẩn câu hỏi' : 'Câu hỏi'}
              </button>
              {showQuestion && <span className="q-text">{p.question}</span>}
            </div>
          )}
        </footer>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
