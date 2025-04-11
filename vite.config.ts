import path from 'path';

import pluginPurgeCss from '@mojojoejo/vite-plugin-purgecss';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import { compression } from 'vite-plugin-compression2';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnvValues = {
    'process.env': Object.entries(env).reduce((prev, [key, val]) => {
      return {
        ...prev,
        [key]: val,
      };
    }, {}),
  };

  return defineConfig({
    optimizeDeps: {
      include: ['antd', 'react-router'],
    },
    base: '/toram-boss-list',
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          // svgr options
        },
      }),
      ViteImageOptimizer(),
      compression({
        algorithm: 'brotliCompress',
        exclude: [/\.(br)$/, /\.(gz)$/],
      }),
      pluginPurgeCss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 3000,
      open: true,
    },
    build: {
      minify: 'esbuild',
      outDir: './build',
      sourcemap: true,
    },
    define: processEnvValues,
  });
};
