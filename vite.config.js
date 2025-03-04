import { defineConfig } from 'vite';

export default defineConfig({

  css: {
    devSourcemap: true
  },
  root: './',
  build: {
    outDir: './dist',
  },
  base: './',
  // server: {
  //   port: 3000,
  // }
});
