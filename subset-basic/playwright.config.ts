import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    expect: {
      timeout: 5000,
    },
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
      ['list'],
      ['html'],
    ],
    webServer: {
      command: 'node ./server',
      port: 4345,
      cwd: __dirname,
    },
    use: {
      actionTimeout: 0,
      trace: 'on',
      acceptDownloads: true,
      ignoreHTTPSErrors: true,
    },
    projects: [
      {
        name: 'chromium',
        use: {
          ...devices['Desktop Chrome'],
        },
      },
    ],
  });