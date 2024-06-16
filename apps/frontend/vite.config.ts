import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import { fileURLToPath } from 'node:url';
import reactPlugin from '@vitejs/plugin-react';

const config = ({ mode }: ConfigEnv) => {
  const { VITE_APP_DEVELOPMENT_PORT } = loadEnv(mode, process.cwd());

  return defineConfig({
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
    server: {
      port: Number(VITE_APP_DEVELOPMENT_PORT),
    },
  });
};

export default config;
