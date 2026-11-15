import { useEffect, useState } from 'react';
import { Icon } from './Icon';

type Theme = 'light' | 'dark';

function readTheme(): Theme {
  try {
    const t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') return t;
  } catch {
    /* bỏ qua */
  }
  // Mặc định nền sáng: rõ nhất khi chiếu bằng máy chiếu trong phòng học
  return 'light';
}

export function applyTheme(t: Theme = readTheme()) {
  document.documentElement.dataset.theme = t;
}

export function ThemeToggle() {
  const [t, setT] = useState<Theme>(readTheme);
  useEffect(() => {
    applyTheme(t);
    try {
      localStorage.setItem('theme', t);
    } catch {
      /* bỏ qua */
    }
  }, [t]);
  return (
    <button className="tool" onClick={() => setT(t === 'light' ? 'dark' : 'light')} title={t === 'light' ? 'Chuyển nền tối' : 'Chuyển nền sáng'}>
      <Icon name={t === 'light' ? 'moon' : 'sun'} />
    </button>
  );
}
