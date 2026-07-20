/**
 * Renders the social share card (Open Graph / Twitter) to public/og-image.png
 * at exactly 1200×630 by screenshotting scripts/og-template.html in headless
 * Chrome. Mirrors the tooling of build-cv-pdf.mjs.
 *
 * Usage: npm run og:image
 * Requires system Google Chrome (Playwright channel: 'chrome').
 */
import { chromium } from 'playwright-core';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const TEMPLATE = pathToFileURL(resolve(here, 'og-template.html')).href;
const OUT = resolve(here, '..', 'public', 'og-image.png');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1,
    });
    await page.goto(TEMPLATE, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    await page.screenshot({ path: OUT, clip: { x: 0, y: 0, width: 1200, height: 630 } });
    console.log(`✓ OG image written to ${OUT}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
