import electron from 'vite-plugin-electron/simple';

export default {
  server: {
    port: 5174
  },
  plugins: [
    electron({
      main: {
        entry: './main.ts',
        vite: {
          build: {
            outDir: 'main',
            emptyOutDir: true
          },
        },
      },
      preload: {
        input: '../../src/core/preload.ts',
        vite: {
          build: {
            outDir: 'preload',
            emptyOutDir: true
          },
        },
      },
    }),
  ],
  build: {
    lib: {}
  }
}