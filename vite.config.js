import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: { cssMinify: true },
  plugins: [
    process.env.VITEST === 'true'
      ? null
      : remix({
          future: {
            v3_fetcherPersist: true,
            v3_relativeSplatPath: true,
            v3_throwAbortReason: true,
          },
        }),
    tsconfigPaths(),
  ],
  test: {
    setupFiles: ['./test/setup'],
  },
});
