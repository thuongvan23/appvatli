// Lưu/mở thí nghiệm dưới dạng file .json hoặc đường link (dữ liệu nằm ngay trong link, không cần máy chủ).

import type { EngineId } from './types';

export interface SavedLab {
  app: 'phong-lab-vat-li';
  version: 1;
  engine: EngineId;
  title?: string;
  doc: unknown;
  options?: unknown;
}

export function makeSaved(engine: EngineId, doc: unknown, options?: unknown, title?: string): SavedLab {
  return { app: 'phong-lab-vat-li', version: 1, engine, title, doc, options };
}

export function downloadJson(saved: SavedLab, filename: string) {
  const blob = new Blob([JSON.stringify(saved, null, 1)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.json') ? filename : `${filename}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function parseSaved(text: string): SavedLab {
  const data = JSON.parse(text);
  if (!data || data.app !== 'phong-lab-vat-li' || !data.engine || !data.doc) {
    throw new Error('File không phải thí nghiệm của Phòng Lab KHTN.');
  }
  return data as SavedLab;
}

export function pickJsonFile(): Promise<SavedLab> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = async () => {
      const f = input.files?.[0];
      if (!f) return reject(new Error('Chưa chọn file.'));
      try {
        resolve(parseSaved(await f.text()));
      } catch (e) {
        reject(e);
      }
    };
    input.click();
  });
}

function toBase64Url(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(s: string): string {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeShare(saved: SavedLab): string {
  return toBase64Url(JSON.stringify(saved));
}

export function decodeShare(code: string): SavedLab {
  return parseSaved(fromBase64Url(code));
}

export function shareUrl(saved: SavedLab): string {
  const base = window.location.href.split('#')[0];
  return `${base}#/lab/${saved.engine}?d=${encodeShare(saved)}`;
}
