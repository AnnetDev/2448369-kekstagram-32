import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/2448369-kekstagram-32/' : './',
}));
