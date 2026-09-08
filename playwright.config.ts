import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  timeout: 45000,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: process.env.TEST_BASE_URL || "http://localhost:3000", trace: "retain-on-failure" },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "tablet",
      use: { ...devices["iPad (gen 7)"], defaultBrowserType: "chromium" },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: process.env.TEST_SERVER_COMMAND || "npm run start",
    url: process.env.TEST_BASE_URL || "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
