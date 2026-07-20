import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    target: 'es2022',
    cssTarget: 'chrome111',
    rollupOptions: {
      output: {
        // Split React into its own chunk so it stays cached across app deploys.
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) {
            return 'vendor-react';
          }
        },
      },
    },
  },
  server: { port: 3000 },
});
