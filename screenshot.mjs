import puppeteer from "puppeteer";
import { mkdir, readdir } from "fs/promises";
import path from "path";

const BASE_URL = process.argv[2] || "http://localhost:3000";
const LABEL = process.argv[3] || "";
const OUTPUT_DIR = path.resolve("temporary screenshots");

async function getNextNumber() {
  try {
    const files = await readdir(OUTPUT_DIR);
    const numbers = files
      .filter((f) => f.startsWith("screenshot-") && f.endsWith(".png"))
      .map((f) => {
        const match = f.match(/^screenshot-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      });
    return numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
  } catch {
    return 1;
  }
}

async function takeScreenshot() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const num = await getNextNumber();
  const suffix = LABEL ? `-${LABEL}` : "";
  const filename = `screenshot-${num}${suffix}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 30000 });

  // Wait for animations to settle
  await new Promise((r) => setTimeout(r, 1000));

  await page.screenshot({ path: filepath, fullPage: true });
  await browser.close();

  console.log(`Screenshot saved: ${filepath}`);
}

takeScreenshot().catch((err) => {
  console.error("Screenshot failed:", err.message);
  process.exit(1);
});
