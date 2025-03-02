import { defineConfig } from 'vite';

export default defineConfig({
  base: '/2448369-kekstagram-32/',
  build: {
    rollupOptions: {
      input: 'index.html',
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
      }
    }
  }
});

// import { defineConfig } from 'vite';

// export default defineConfig(({ command }) => ({
//   base: command === 'build' ? '/2448369-kekstagram-32/' : './',
// }));

