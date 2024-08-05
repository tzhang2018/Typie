import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config();

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
    use: {
      actionTimeout: 0,
      baseURL: process.env.BaseUrl,
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