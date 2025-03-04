import { defineConfig } from 'vite';

export default defineConfig({

  css: {
    devSourcemap: true
  },
  root: './',
  build: {
    outDir: './dist',
  },
  base: '/2448369-kekstagram-32/',
  // server: {
  //   port: 3000,
  // }
});
