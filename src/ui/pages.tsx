import { useCallback, useEffect, useMemo, useState } from 'react';
import { CHAPTERS, LESSONS, SUBJECT_GRADES, SUBJECT_NAME, SUBJECT_PATH, chaptersOf, lessonById } from '../core/catalog';
import { decodeShare } from '../core/share';
import { go } from '../core/route';
import type { Grade, Subject } from '../core/types';
import { ENGINES } from '../engines/registry';
import { CONTENT, isReady } from '../lessons';
import { NOTES } from '../lessons/notes';
import { Icon } from './Icon';
import { ThemeToggle } from './theme';
import { Workspace } from './Workspace';

const ENGINE_LABEL: Record<string, string> = {
  circuit: 'Mạch điện',
  optics: 'Quang học',
  fluid: 'Chất lỏng – áp suất',
  mechanics: 'Cơ học',
  thermal: 'Nhiệt – hạt',
  electromagnet: 'Điện từ',
  diagram: 'Sơ đồ tương tác',
  chemlab: 'Bàn thí nghiệm',
  molecule: 'Mô hình phân tử',
  process: 'Sơ đồ – quy trình',
  motion: 'Chuyển động',
  sound: 'Âm thanh',
  light: 'Ánh sáng',
  magnet: 'Từ',
  algebra: 'Đại số',
  func: 'Hàm số – đồ thị',
  geometry: 'Hình học',
  stats: 'Dữ liệu – biểu đồ',
  prob: 'Xác suất',
  solid: 'Hình khối',
};

const SUBJECT_SUB: Record<Subject, string> = { phys: 'Năng lượng và sự biến đổi', chem: 'Chất và sự biến đổi của chất', math: 'Toán 8, Toán 9 – bộ Kết nối tri thức' };
const bookName = (subject: Subject, g: Grade) => (subject === 'math' ? `Toán ${g}` : `${SUBJECT_NAME[subject]} – KHTN ${g}`);

function TopBar({ children }: { children?: React.ReactNode }) {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => go('/')}>
        <span className="brand-mark">
          <Icon name="bolt" size={22} />
        </span>
        Phòng Lab KHTN &amp; Toán
      </button>
      <span className="grow" />
      {children}
      <ThemeToggle />
    </header>
  );
}

export function HomePage() {
  const count = (subject: Subject, g: Grade) => {
    const all = LESSONS.filter((l) => l.grade === g && l.subject === subject);
    return { ready: all.filter((l) => isReady(l.id)).length, total: all.length };
  };
  return (
    <div className="page">
      <TopBar />
      <main className="home">
        <section className="hero">
          <h1>Phòng thí nghiệm Khoa học tự nhiên và Toán trực tuyến</h1>
          <p>Mô phỏng thí nghiệm cho phần Vật lí và Hoá học – Khoa học tự nhiên 7, 8, 9 và mô hình trực quan cho Toán 8, Toán 9 (bộ Kết nối tri thức). Thiết kế để giáo viên trình chiếu trên lớp.</p>
        </section>
        {(['phys', 'chem', 'math'] as Subject[]).map((subject) => (
          <section key={subject}>
            <h2 className="subject-head">
              {SUBJECT_NAME[subject]}
              <span className="muted small">{SUBJECT_SUB[subject]}</span>
            </h2>
            <div className="grade-cards">
              {SUBJECT_GRADES[subject].map((g) => {
                const c = count(subject, g);
                return (
                  <button key={g} className={`grade-card ${subject === 'phys' ? '' : subject} ${g === 7 ? 'g7' : ''}`} onClick={() => go(`/${SUBJECT_PATH[subject]}/${g}`)}>
                    <span className="grade-num">{g}</span>
                    <span className="grade-text">
                      <b>{bookName(subject, g)}</b>
                      <span>
                        {c.ready}/{c.total} bài đã có mô phỏng
                      </span>
                      <span className="progress">
                        <span style={{ width: `${(100 * c.ready) / c.total}%` }} />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
        <section className="free-labs">
          <h2>Phòng lab tự do</h2>
          <p className="muted">Tự lắp thí nghiệm của riêng thầy cô, lưu thành file hoặc đường link để dùng lại trên lớp.</p>
          <div className="free-grid">
            {(['circuit', 'optics', 'chemlab', 'func', 'geometry', 'stats'] as const).map((id) => {
              const e = ENGINES[id]!;
              return (
                <button key={id} className="free-card" onClick={() => go(`/lab/${id}`)}>
                  <Icon name="bolt" />
                  {e.name}
                </button>
              );
            })}
            <button className="free-card" onClick={() => go('/huong-dan')}>
              <Icon name="help" />
              Hướng dẫn sử dụng
            </button>
          </div>
        </section>
        <section className="tips muted small">
          <b>Phím tắt khi trình chiếu:</b> ← → chuyển cảnh · H ẩn/hiện số đo · P bút vẽ · Q câu hỏi · N nội dung bài học · F toàn màn hình · Ctrl+Z hoàn tác · R xoay linh kiện · Delete xoá
        </section>
      </main>
    </div>
  );
}

export function GradePage({ grade, subject = 'phys' }: { grade: Grade; subject?: Subject }) {
  const chapters = chaptersOf(grade, subject);
  const base = SUBJECT_PATH[subject];
  return (
    <div className="page">
      <TopBar>
        <div className="seg">
          <button className={subject === 'phys' ? 'on' : ''} onClick={() => go(`/lop/${subject === 'math' ? 8 : grade}`)}>
            Vật lí
          </button>
          <button className={subject === 'chem' ? 'on' : ''} onClick={() => go(`/hoa/${subject === 'math' ? 8 : grade}`)}>
            Hoá học
          </button>
          <button className={subject === 'math' ? 'on' : ''} onClick={() => go(`/toan/${grade === 9 ? 9 : 8}`)}>
            Toán
          </button>
        </div>
        <div className="seg">
          {SUBJECT_GRADES[subject].map((g) => (
            <button key={g} className={grade === g ? 'on' : ''} onClick={() => go(`/${base}/${g}`)}>
              Lớp {g}
            </button>
          ))}
        </div>
      </TopBar>
      <main className="grade-page">
        <h1>{subject === 'math' ? `Toán ${grade} – Kết nối tri thức với cuộc sống` : `Khoa học tự nhiên ${grade} – Phần ${SUBJECT_NAME[subject]}`}</h1>
        {chapters.map(({ key, meta, lessons }) => (
          <section key={key} className="chapter">
            <h2>
              {meta.roman ? `Chương ${meta.roman}. ` : ''}
              {meta.title}
            </h2>
            <div className="lesson-grid">
              {lessons.map((l) => {
                const ready = isReady(l.id);
                const n = ready ? CONTENT[l.id].scenes.length : 0;
                return (
                  <button key={l.id} className={`lesson-card ${ready ? '' : 'soon'}`} disabled={!ready} onClick={() => go(`/bai/${l.id}`)}>
                    <span className="lesson-num">Bài {l.num}</span>
                    <span className="lesson-title">{l.title}</span>
                    <span className="lesson-meta">
                      <span className={`badge e-${l.engine}`}>{ENGINE_LABEL[l.engine]}</span>
                      {l.practical && <span className="badge practical">Thực hành</span>}
                      {ready ? <span className="muted">{n} cảnh</span> : <span className="muted">Đang xây dựng ({l.phase})</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export function GuidePage() {
  return (
    <div className="page">
      <TopBar />
      <main className="home guide">
        <h1>Hướng dẫn sử dụng cho giáo viên</h1>
        <section>
          <h2>1. Mở bài học</h2>
          <p>Từ trang chủ chọn môn (Vật lí, Hoá học, Toán) và lớp, rồi chọn bài theo đúng số thứ tự trong SGK Khoa học tự nhiên hoặc SGK Toán 8, Toán 9 (bộ Kết nối tri thức). Mỗi bài gồm nhiều <b>cảnh</b> (giống các trang trình chiếu), mỗi cảnh là một thí nghiệm đã dựng sẵn.</p>
        </section>
        <section>
          <h2>2. Trình chiếu trên lớp</h2>
          <ul>
            <li>
              Bấm <b>Toàn màn hình</b> (phím F) khi chiếu. Chuyển cảnh bằng phím <b>← →</b>, PageUp/PageDown hoặc bút trình chiếu.
            </li>
            <li>
              <b>Ẩn số đo</b> (phím H): để học sinh dự đoán trước, sau đó mới hiện kết quả.
            </li>
            <li>
              <b>Câu hỏi</b> (phím Q): hiện câu hỏi gợi ý ở chân màn hình.
            </li>
            <li>
              <b>Bút vẽ</b> (phím P): vẽ chú thích trực tiếp lên thí nghiệm. <b>Kính lúp</b>: rê chuột để phóng to một vùng, bấm để tắt.
            </li>
            <li>
              <b>Đặt lại</b>: đưa cảnh về trạng thái ban đầu. Nút mặt trăng/mặt trời đổi nền sáng/tối (nền sáng rõ hơn khi chiếu máy chiếu).
            </li>
          </ul>
        </section>
        <section>
          <h2>3. Bảng số liệu và báo cáo thực hành</h2>
          <p>
            Các cảnh có nút <b>Báo cáo</b>: mở bảng, mỗi lần thay đổi thí nghiệm bấm <b>Ghi số đo</b> – số liệu tự điền, tự tính, tự vẽ đồ thị. Có thể sửa trực tiếp ô số liệu, tải file CSV mở bằng Excel, hoặc <b>In / Lưu PDF</b> theo mẫu báo cáo thực hành.
          </p>
        </section>
        <section>
          <h2>4. Bàn lắp mạch điện</h2>
          <ul>
            <li>Kéo linh kiện từ hộp bên trái vào bàn. Kéo từ một chấm tròn (đầu linh kiện, đầu dây) tới điểm khác để nối dây.</li>
            <li>Bấm vào linh kiện để chỉnh thông số ở bảng bên phải (số pin, điện trở, con chạy biến trở, loại đồng hồ…). Bấm vào công tắc để đóng/ngắt.</li>
            <li>Phím R: xoay linh kiện; Delete: xoá; Ctrl+Z: hoàn tác. “Đảo chiều” để mắc ngược cực (LED, ampe kế, vôn kế, nguồn).</li>
            <li>Chuyển “Hình vẽ thật” ↔ “Sơ đồ mạch”; hiển thị dòng electron hoặc chiều dòng điện quy ước.</li>
          </ul>
        </section>
        <section>
          <h2>5. Bàn thí nghiệm hoá học</h2>
          <ul>
            <li>Chọn một hoá chất (hoặc dụng cụ: đèn cồn, que đóm, nam châm) trên giá ở bảng bên phải, rồi bấm vào ống nghiệm để cho vào. Có thể cho nhiều chất lần lượt.</li>
            <li>Hiện tượng (sủi bọt khí, kết tủa, đổi màu, toả nhiệt…) hiện trực tiếp trên ống nghiệm; nhận xét và phương trình hoá học hiện ở bảng bên phải. Bấm <b>Ẩn số đo</b> để che hiện tượng, phương trình cho học sinh tự quan sát, dự đoán.</li>
            <li><b>Làm lại ống này</b> để làm lại một ống; <b>Đặt lại</b> để đưa cả cảnh về ban đầu.</li>
            <li>Bàn thí nghiệm hoá học tự do (ở trang chủ) có đầy đủ hoá chất để thầy cô tự thiết kế thí nghiệm.</li>
          </ul>
        </section>
        <section>
          <h2>6. Lưu và chia sẻ thí nghiệm</h2>
          <p>
            Bấm <b>Lưu</b> để tải thí nghiệm thành file <code>.json</code>; bấm <b>Mở</b> để mở lại. Bấm <b>Link</b> để chép đường link chứa toàn bộ thí nghiệm – gửi cho đồng nghiệp hoặc học sinh. Các bàn tự do (mạch điện, quang học, thí nghiệm hoá học) ở trang chủ dùng để tự thiết kế thí nghiệm riêng.
          </p>
        </section>
        <section>
          <h2>7. Dùng không cần mạng</h2>
          <p>
            Toàn bộ ứng dụng là <b>một file duy nhất</b> <code>PhongLabKHTN.html</code>. Chép vào USB, mở bằng Chrome hoặc Edge trên máy ở lớp là dùng được, không cần Internet.
          </p>
        </section>
        <p className="muted small">Số liệu trong mô phỏng được làm tròn, một số hiện tượng được phóng đại để dễ quan sát; lời dẫn và hình vẽ do nhóm phát triển tự biên soạn theo chương trình GDPT 2018.</p>
        <button className="btn primary big" onClick={() => go('/')}>
          Về trang chủ
        </button>
      </main>
    </div>
  );
}

const clone = <T,>(x: T): T => (x === undefined ? x : JSON.parse(JSON.stringify(x)));

export function LessonPage({ id, scene }: { id: string; scene: number }) {
  const meta = lessonById(id);
  const content = CONTENT[id];
  const idx = Math.min(scene, (content?.scenes.length ?? 1) - 1);
  const [docs, setDocs] = useState<Record<number, unknown>>({});

  useEffect(() => setDocs({}), [id]);

  const sc = content?.scenes[idx];
  const doc = useMemo(() => (idx in docs ? docs[idx] : clone(sc?.doc)), [docs, idx, sc]);
  const onDoc = useCallback((d: unknown) => setDocs((m) => ({ ...m, [idx]: d })), [idx]);

  if (!meta || !content || !sc) {
    return (
      <div className="page">
        <TopBar />
        <main className="home">
          <p>Bài học này chưa có mô phỏng.</p>
          <button className="btn" onClick={() => go('/')}>
            Về trang chủ
          </button>
        </main>
      </div>
    );
  }
  const engine = ENGINES[meta.engine];
  if (!engine) return null;
  const ch = CHAPTERS[meta.chapter];

  return (
    <Workspace
      backHref={`/${SUBJECT_PATH[meta.subject]}/${meta.grade}`}
      backLabel={`${meta.subject === 'chem' ? 'Hoá' : meta.subject === 'math' ? 'Toán' : 'Lí'} ${meta.grade}`}
      kicker={`${meta.subject === 'math' ? 'Toán' : 'KHTN'} ${meta.grade}${ch.roman ? ` · Chương ${ch.roman}` : ''} · Bài ${meta.num}`}
      title={meta.title}
      scenes={{ titles: content.scenes.map((s) => s.title), index: idx, onSelect: (i) => go(`/bai/${id}/${i + 1}`, true) }}
      engine={engine}
      doc={doc}
      onDoc={onDoc}
      options={sc.options ?? {}}
      prompt={sc.prompt}
      question={sc.question}
      report={sc.report}
      sceneKey={`${id}/${idx}`}
      startHidden={sc.startHidden}
      onReset={() =>
        setDocs((m) => {
          const n = { ...m };
          delete n[idx];
          return n;
        })
      }
      saveTitle={`Bai ${meta.num} lop ${meta.grade} - canh ${idx + 1}`}
      notes={NOTES[id]}
    />
  );
}

export function FreeLabPage({ engineId, data }: { engineId: string; data?: string }) {
  const engine = ENGINES[engineId as keyof typeof ENGINES];
  const initial = useMemo(() => {
    if (data) {
      try {
        const s = decodeShare(data);
        return { doc: s.doc, options: s.options ?? engine?.freeOptions, title: s.title, error: '' };
      } catch {
        return { doc: engine?.emptyDoc(), options: engine?.freeOptions, title: undefined, error: 'Đường link thí nghiệm bị lỗi hoặc không đầy đủ.' };
      }
    }
    return { doc: engine?.emptyDoc(), options: engine?.freeOptions, title: undefined, error: '' };
  }, [data, engine]);
  const [doc, setDoc] = useState<unknown>(initial.doc);
  useEffect(() => setDoc(initial.doc), [initial]);

  if (!engine) {
    return (
      <div className="page">
        <TopBar />
        <main className="home">
          <p>Không tìm thấy loại thí nghiệm này.</p>
        </main>
      </div>
    );
  }

  // Thí nghiệm mở từ file/link: cho phép chỉnh sửa tự do (bỏ khoá), giữ các tuỳ chọn hiển thị.
  const options = { ...(initial.options as object), locked: false, palette: (engine.freeOptions as { palette?: unknown }).palette };

  return (
    <Workspace
      backHref="/"
      backLabel="Trang chủ"
      kicker="Phòng lab tự do"
      title={initial.title ?? engine.name}
      engine={engine}
      doc={doc}
      onDoc={setDoc}
      options={options}
      prompt={
        initial.error ||
        (engineId === 'chemlab' || engineId === 'molecule' || engineId === 'process'
          ? 'Chọn hoá chất hoặc dụng cụ ở giá bên phải rồi bấm vào ống nghiệm. Dùng "+ Thêm ống", "Đổi vật chứa" để tự thiết kế thí nghiệm; bấm "Lưu" hoặc "Link" để dùng lại.'
          : engineId === 'optics'
            ? 'Kéo nguồn sáng, khối thuỷ tinh, lăng kính để tạo đường truyền ánh sáng. Bấm "Lưu" hoặc "Link" để dùng lại thí nghiệm.'
            : engineId === 'func'
              ? 'Kéo thanh trượt a, b để vẽ đồ thị y = ax + b; bật thêm đường thẳng thứ hai để xét vị trí tương đối. Bấm "Lưu" hoặc "Link" để dùng lại.'
              : engineId === 'geometry'
                ? 'Chọn loại tứ giác rồi kéo các đỉnh; bật số đo góc, cạnh, đường chéo. Bấm "Lưu" hoặc "Link" để dùng lại hình đã dựng.'
                : engineId === 'stats'
                  ? 'Sửa số liệu ở bảng bên phải, đổi qua lại giữa bảng và các loại biểu đồ.'
                  : engineId === 'algebra' || engineId === 'prob' || engineId === 'solid'
                    ? 'Dùng các điều khiển ở bảng bên phải.'
            : 'Kéo linh kiện từ hộp bên trái vào bàn; kéo từ chấm tròn ở đầu linh kiện để nối dây. Bấm "Lưu" hoặc "Link" để dùng lại thí nghiệm.')
      }
      sceneKey={`lab/${engineId}`}
      onReset={() => setDoc(initial.doc)}
      saveTitle={initial.title ?? 'thi-nghiem'}
    />
  );
}
