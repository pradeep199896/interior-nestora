import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { chromium } from "@playwright/test";
import { writeFileSync, mkdirSync } from "node:fs";
mkdirSync("artifacts", { recursive: true });
const chrome = await chromeLauncher.launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ["--headless", "--no-sandbox"],
  port: 9223,
});
try {
  for (const mode of ["mobile", "desktop"]) {
    const result = await lighthouse("http://localhost:3000", {
      port: chrome.port,
      output: ["json", "html"],
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      ...(mode === "desktop"
        ? {
            formFactor: "desktop",
            screenEmulation: {
              mobile: false,
              width: 1440,
              height: 1000,
              deviceScaleFactor: 1,
              disabled: false,
            },
            throttling: {
              rttMs: 40,
              throughputKbps: 10240,
              cpuSlowdownMultiplier: 1,
              requestLatencyMs: 0,
              downloadThroughputKbps: 0,
              uploadThroughputKbps: 0,
            },
          }
        : {}),
    });
    writeFileSync(`artifacts/lighthouse-${mode}.json`, result.report[0]);
    writeFileSync(`artifacts/lighthouse-${mode}.html`, result.report[1]);
    console.log(
      mode,
      JSON.stringify(
        Object.fromEntries(
          Object.entries(result.lhr.categories).map(([k, v]) => [k, v.score]),
        ),
      ),
    );
  }
} finally {
  await chrome.kill();
}
