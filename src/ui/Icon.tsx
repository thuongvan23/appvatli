// Bộ biểu tượng nét đơn giản (tự vẽ, không phụ thuộc thư viện ngoài).
const PATHS: Record<string, string> = {
  back: 'M15 5 8 12l7 7',
  prev: 'M15 5 8 12l7 7',
  next: 'M9 5l7 7-7 7',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  eyeOff: 'M3 3l18 18 M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2 M6.6 6.6C3.8 8.4 2 12 2 12s3.5 7 10 7c1.8 0 3.4-.5 4.7-1.2 M9.9 9.9a3 3 0 0 0 4.2 4.2',
  pen: 'M4 20l4-1 11-11-3-3L5 16l-1 4Z M14 6l3 3',
  zoom: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z M21 21l-5-5 M11 8v6 M8 11h6',
  report: 'M7 3h7l5 5v13H7z M14 3v5h5 M10 13h6 M10 17h6',
  reset: 'M4 12a8 8 0 1 0 2.4-5.7 M4 4v5h5',
  save: 'M5 3h11l3 3v15H5z M8 3v5h7V3 M8 21v-7h8v7',
  open: 'M3 7h6l2 2h10v10H3z',
  link: 'M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1 M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1',
  full: 'M4 9V4h5 M20 9V4h-5 M4 15v5h5 M20 15v5h-5',
  exitFull: 'M9 4v5H4 M15 4v5h5 M9 20v-5H4 M15 20v-5h5',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M12 2v2 M12 20v2 M2 12h2 M20 12h2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z',
  question: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3 M12 17h.01',
  close: 'M6 6l12 12 M18 6 6 18',
  trash: 'M4 7h16 M9 7V4h6v3 M6 7l1 13h10l1-13',
  print: 'M7 9V3h10v6 M7 17H4v-7h16v7h-3 M7 14h10v7H7z',
  plus: 'M12 5v14 M5 12h14',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7z',
  home: 'M3 11l9-8 9 8 M5 9v12h14V9',
  help: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 16v-4 M12 8h.01',
};

export function Icon({ name, size = 22 }: { name: keyof typeof PATHS | string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name] ?? ''} />
    </svg>
  );
}
