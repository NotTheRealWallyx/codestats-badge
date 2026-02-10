import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      '@': '.',
    },
  },
  test: {
    globals: true,
    environment: 'node',
  },
});
