import { unstable_cloudflarePreset as cloudflare, unstable_vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    process.env.VITEST === 'true'
      ? null
      : remix({
          future: {
            v3_fetcherPersist: true,
            v3_relativeSplatPath: true,
            v3_throwAbortReason: true,
          },
          presets: [cloudflare()],
        }),
    tsconfigPaths(),
  ],
  ssr: {
    resolve: {
      externalConditions: ['workerd', 'worker'],
    },
  },
  test: {
    setupFiles: ['./test/setup'],
  },
});
