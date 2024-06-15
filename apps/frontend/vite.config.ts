import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import reactPlugin from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [reactPlugin()],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: fileURLToPath(new URL('src', import.meta.url)),
      },
    ],
  },
  build: {
    outDir: 'build',
  },
});
