import { defineConfig } from 'vite';

export default defineConfig({
  base: import.meta.env.MODE === 'production' ? '/2448369-kekstagram-32/' : '/',
});
