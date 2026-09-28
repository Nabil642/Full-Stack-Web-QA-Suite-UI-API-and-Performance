import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "https://automationexercise.com";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: { timeout: 12_000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "ui-chromium",
      testDir: "./tests/ui",
      use: {
        ...devices["Desktop Chrome"],
        channel: process.env.CI ? undefined : "chrome",
      },
    },
    { name: "api", testDir: "./tests/api" },
  ],
});
