// @ts-check
const { devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://test-admin-am.platforms.team/89aa05a9-1ed4-401b-973d-0e21dff0cd82/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NjI5Nzc4NTQsImV4cCI6MTY2MzU4MjY1NCwicm9sZXMiOltdLCJ1c2VybmFtZSI6Inl1cnkuc2Frb3ZpY2hAbW9zYWljLmNvIiwibmFtZSI6Ill1cnkgU2Frb3ZpY2giLCJwcm9maWxlX2ltYWdlIjoiaHR0cHM6Ly9hdmF0YXJzLnNsYWNrLWVkZ2UuY29tLzIwMjEtMDYtMjkvMjIxNzc4ODA3MjU2NV9hMGRiNDg2OGRhY2Y2M2Q5MjU5NF8xOTIuanBnIn0.ZU2s6LMq03mtXCypvjxI8lsb0thFFIvD8w2FcishAgqekjbG-qt_WtNXzaojKRXOmI5AUgCaNhrBgFT7KD-4I2tjP-zc0Hg6H8N5VWXvK2f2WsbaEUpMDsf7uKqkqHY0E6UOfpCJvaEjSoqtu308eCIr_JzNlU4eGjGWSCJr6KGB8NLSzVYnv-fxENHolse3uffcrD0OwP3Tw1s04n0rC2Y7BqZkWehk1vz_qKo74FgYXvVcTImAo-QXZ-HPHzzaPBcRZSDwDtkhrJMADvPA5DCfyjk_2B8jmVg7H5XwlBjx38h1jQ3LGM8MKUjZajIm_kXSCGcqOfABcp8283MjzqU_Hu--i3oJ-Z9AoLjo3K8xv5mW0f-SXzJRnQIzPpPXM7LXsV26k9kTxibBe9HeynK1xYP7sIWh97Gc3saFyLxc6eNktuaAK6NzoHzFwY8iOQBdalPFvg6uPFdQSaWcrvqgcNsMeCRA3PfdHfyDoQpeEHkP-d3yx6x9TM-DUeM1Fa1_AfvrkFbYzcQgSKjtWoso3vYzFJciIutSl7XL9Vyv4mh6htk83Pf03Nb0pkBEDHT6suYakTnxA1hkyVteazXYvSQEFXwxfwCbJlyyimyJdPxktlJ26tWnpMjaAiEemAEfE4njunXmFhPne_zoo8G2Cyw64R5MkxCdbJU2UYk',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

module.exports = config;
