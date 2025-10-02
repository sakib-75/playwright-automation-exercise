import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';


const testEnv = process.env.TEST_ENV || 'dev';
const envFile = path.resolve(__dirname, `.env.${testEnv}`);

console.log(`Loading environment configuration for: ${testEnv}`);
if (!fs.existsSync(envFile)) {
  throw new Error(`Environment file not found: ${envFile}`);
}

dotenv.config({ path: envFile });


// Function to get browser-specific configuration
function getBrowserConfig() {
  const browserEnv = process.env.BROWSER || 'chrome';
  const isHeadless: boolean = process.env.CI === 'true' ? true : (process.env.HEADLESS ? process.env.HEADLESS.toLowerCase() === 'true' : true);
  const viewport = { width: Number(process.env.VIEWPORT_WIDTH) || 1920, height: Number(process.env.VIEWPORT_HEIGHT) || 1080 };
  
  const browserConfigs = {
    'chrome': {
      name: 'chrome',
      use: { 
        ...devices['Desktop Chrome'],
        headless: isHeadless,
        viewport: viewport
      },
    },
    'firefox': {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        headless: isHeadless,
        viewport: viewport
      },
    },
    'safari': {
      name: 'safari',
      use: { 
        ...devices['Desktop Safari'],
        headless: isHeadless,
        viewport: viewport
      },
    },
    'mobile-chrome': {
      name: 'mobile-chrome',
      use: { 
        ...devices['Pixel 5'],
        headless: isHeadless
      },
    },
    'mobile-safari': {
      name: 'mobile-safari',
      use: { 
        ...devices['iPhone 12'],
        headless: isHeadless
      },
    },
    'mobile-firefox': {
      name: 'mobile-firefox',
      use: { 
        ...devices['Pixel 5'],
        ...devices['Desktop Firefox'],
        headless: isHeadless
      },
    },
    'edge': {
      name: 'edge',
      use: { 
        ...devices['Desktop Edge'],
        headless: isHeadless,
        viewport: viewport
      },
    }
  };

  const browserKey = (browserEnv as keyof typeof browserConfigs);
  return browserConfigs[browserKey] || browserConfigs.chrome;
}

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  forbidOnly: !!process.env.CI,
  fullyParallel: process.env.PARALLEL ? process.env.PARALLEL === 'true' : false,
  retries: process.env.CI === 'true' ? 2 : Number(process.env.RETRIES ?? 0),
  workers: process.env.CI ==='true' ? 3 : Number(process.env.WORKERS ?? 1),
  timeout: Number(process.env.TIMEOUT ?? 30000),
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  outputDir: 'test-results',

  /* Configure projects for major browsers */
  projects: [getBrowserConfig()],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
