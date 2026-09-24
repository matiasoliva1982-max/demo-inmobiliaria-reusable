import { defineConfig } from '@playwright/test';

declare const process: {
  env: Record<string, string | undefined>;
};

const webServer = process.env.PLAYWRIGHT_SKIP_WEBSERVER === '1'
  ? undefined
  : {
      command: 'node ./scripts/playwright-dev-server.mjs',
      url: 'http://127.0.0.1:4321',
      reuseExistingServer: true,
    };

export default defineConfig({
  testDir: './tests/e2e',
  webServer,
  use: {
    browserName: 'chromium',
    baseURL: 'http://127.0.0.1:4321',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'mobile-320', use: { viewport: { width: 320, height: 720 }, isMobile: true } },
    { name: 'mobile-375', use: { viewport: { width: 375, height: 812 }, isMobile: true } },
    { name: 'tablet', use: { viewport: { width: 768, height: 900 } } },
    { name: 'desktop', use: { viewport: { width: 1366, height: 900 } } },
  ],
});
