import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Bản build là MỘT file index.html duy nhất: chép vào USB, nhấp đúp là chạy (không cần mạng).
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  test: { globals: true },
});
