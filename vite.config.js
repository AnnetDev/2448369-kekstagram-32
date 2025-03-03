import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        format: 'esm',
      },
    },
  },
  base: '/2448369-kekstagram-32/', // Указываем правильную базовую директорию
});
