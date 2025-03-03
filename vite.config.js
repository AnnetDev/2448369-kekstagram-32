import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext', // Устанавливаем таргет для вывода в ESM
    rollupOptions: {
      output: {
        format: 'esm', // Устанавливаем формат ESM
      },
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/2448369-kekstagram-32/' : '/',
});
