import { useEffect, useState } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'guide' }
  | { name: 'grade'; grade: 7 | 8 | 9; subject: 'phys' | 'chem' | 'math' }
  | { name: 'lesson'; id: string; scene: number }
  | { name: 'lab'; engine: string; data?: string };

export function parseHash(hash: string): Route {
  const h = hash.replace(/^#/, '');
  const [path, query = ''] = h.split('?');
  const parts = path.split('/').filter(Boolean);
  const q = new URLSearchParams(query);
  if (parts[0] === 'huong-dan') return { name: 'guide' };
  if ((parts[0] === 'lop' || parts[0] === 'hoa') && (parts[1] === '7' || parts[1] === '8' || parts[1] === '9')) return { name: 'grade', grade: Number(parts[1]) as 7 | 8 | 9, subject: parts[0] === 'hoa' ? 'chem' : 'phys' };
  if (parts[0] === 'toan') return { name: 'grade', grade: parts[1] === '9' ? 9 : parts[1] === '7' ? 7 : 8, subject: 'math' };
  if (parts[0] === 'bai' && parts[1]) return { name: 'lesson', id: parts[1], scene: Math.max(0, Number(parts[2] ?? 1) - 1) || 0 };
  if (parts[0] === 'lab' && parts[1]) return { name: 'lab', engine: parts[1], data: q.get('d') ?? undefined };
  return { name: 'home' };
}

export function go(path: string, replace = false) {
  const target = `#${path}`;
  if (replace) window.history.replaceState(null, '', target);
  else window.location.hash = target;
  if (replace) window.dispatchEvent(new HashChangeEvent('hashchange'));
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    const on = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}
