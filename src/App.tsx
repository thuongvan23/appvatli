import { useRoute } from './core/route';
import { FreeLabPage, GradePage, GuidePage, HomePage, LessonPage } from './ui/pages';

export function App() {
  const r = useRoute();
  switch (r.name) {
    case 'grade':
      return <GradePage grade={r.grade} subject={r.subject} />;
    case 'lesson':
      return <LessonPage id={r.id} scene={r.scene} />;
    case 'guide':
      return <GuidePage />;
    case 'lab':
      return <FreeLabPage key={r.data ?? r.engine} engineId={r.engine} data={r.data} />;
    default:
      return <HomePage />;
  }
}
