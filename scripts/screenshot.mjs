import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";
import path from "path";

const BASE_URL = process.argv[2] || "http://localhost:3001";
const OUTPUT_DIR = path.resolve("screenshots");

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
];

async function takeScreenshots() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 30000 });

    // Wait a beat for any animations
    await new Promise((r) => setTimeout(r, 1000));

    // Full-page screenshot
    const fullPath = path.join(OUTPUT_DIR, `${vp.name}-full.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`✓ ${vp.name} full-page → ${fullPath}`);

    // Above-the-fold screenshot
    const foldPath = path.join(OUTPUT_DIR, `${vp.name}-fold.png`);
    await page.screenshot({ path: foldPath, fullPage: false });
    console.log(`✓ ${vp.name} above-fold → ${foldPath}`);
  }

  await browser.close();
  console.log(`\nDone! Screenshots saved to ${OUTPUT_DIR}`);
}

takeScreenshots().catch((err) => {
  console.error("Screenshot failed:", err.message);
  process.exit(1);
});
