import { useState } from 'react';
import type { LessonNotes } from '../lessons/notes/types';
import { Icon } from './Icon';

type Tab = 'theory' | 'examples' | 'exercises';

/** Ngăn "Nội dung bài học": kiến thức, hiện tượng, ví dụ, câu hỏi vận dụng. */
export function NotesDrawer({ notes, title, onClose, onScene, sceneTitles }: { notes: LessonNotes; title: string; onClose: () => void; onScene?: (i: number) => void; sceneTitles?: string[] }) {
  const [tab, setTab] = useState<Tab>('theory');
  const [shown, setShown] = useState<Record<number, boolean>>({});
  const doPrint = () => {
    document.body.classList.add('printing-notes');
    const done = () => {
      document.body.classList.remove('printing-notes');
      window.removeEventListener('afterprint', done);
    };
    window.addEventListener('afterprint', done);
    window.print();
  };
  return (
    <aside className="report-drawer notes-drawer">
      <div className="report-head no-print">
        <h2>Nội dung bài học</h2>
        <button className="icon-btn" onClick={onClose} aria-label="Đóng">
          <Icon name="close" />
        </button>
      </div>
      <div className="notes-tabs no-print">
        <div className="seg">
          <button className={tab === 'theory' ? 'on' : ''} onClick={() => setTab('theory')}>
            Kiến thức & hiện tượng
          </button>
          <button className={tab === 'examples' ? 'on' : ''} onClick={() => setTab('examples')}>
            Ví dụ thực tế
          </button>
          <button className={tab === 'exercises' ? 'on' : ''} onClick={() => setTab('exercises')}>
            Câu hỏi
          </button>
        </div>
      </div>
      <div className="notes-sheet">
        <div className="print-only report-title">{title}</div>

        <section className={tab === 'theory' ? '' : 'screen-hidden'}>
          {notes.opener && <p className="notes-opener">{notes.opener}</p>}
          <h4>Mục tiêu</h4>
          <ul>
            {notes.goals.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
          {notes.sections.map((s, i) => (
            <div key={i} className="notes-section">
              <h3>
                {i + 1}. {s.title}
              </h3>
              {s.body.map((p, k) => (
                <p key={k}>{p}</p>
              ))}
              {s.scene && onScene && (
                <button className="btn small-btn no-print" onClick={() => onScene(s.scene! - 1)}>
                  <Icon name="bolt" size={16} /> Xem mô phỏng: {sceneTitles?.[s.scene - 1] ?? `cảnh ${s.scene}`}
                </button>
              )}
            </div>
          ))}
          {notes.formulas && notes.formulas.length > 0 && (
            <div className="notes-formulas">
              <h4>Công thức cần nhớ</h4>
              {notes.formulas.map((f, i) => (
                <div key={i} className="formula">
                  <b>{f.expr}</b>
                  <span>{f.note}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className={tab === 'examples' ? '' : 'screen-hidden'}>
          <h4 className="print-only">Ví dụ trong đời sống</h4>
          <ul className="notes-examples">
            {notes.examples.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
          {notes.facts && notes.facts.length > 0 && (
            <div className="notes-facts">
              <h4>Em có biết?</h4>
              {notes.facts.map((f, i) => (
                <p key={i}>{f}</p>
              ))}
            </div>
          )}
        </section>

        <section className={tab === 'exercises' ? '' : 'screen-hidden'}>
          <h4 className="print-only">Câu hỏi vận dụng</h4>
          {notes.exercises.map((e, i) => (
            <div key={i} className="notes-q">
              <p>
                <b>Câu {i + 1}.</b> {e.q}
              </p>
              {shown[i] ? (
                <p className="notes-a">
                  <b>Đáp án:</b> {e.a}
                </p>
              ) : (
                <button className="btn small-btn no-print" onClick={() => setShown({ ...shown, [i]: true })}>
                  Hiện đáp án
                </button>
              )}
            </div>
          ))}
        </section>
      </div>
      <div className="report-foot no-print">
        <button className="btn primary" onClick={doPrint}>
          <Icon name="print" size={18} /> In phiếu nội dung bài
        </button>
      </div>
    </aside>
  );
}
