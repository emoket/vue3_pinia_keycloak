import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig((mode) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [vue()],
    server: {
      host: 'localhost',
      port: env.VITE_APP_PORT,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
        '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
        '@components': fileURLToPath(
          new URL('./src/components', import.meta.url)
        ),
      },
    },
  };
});
