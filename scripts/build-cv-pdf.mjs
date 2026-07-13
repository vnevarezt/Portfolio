/**
 * Generates the downloadable CV PDFs (one per language) from the exact
 * same React sheet the /cv page renders. Boots the Vite dev server, opens
 * /cv?print&lang=<lang> (bare sheet, no toolbar) in headless Chrome, and
 * prints each to public/cv/ with the CSS @page Letter size preserved — so
 * the PDFs and the on-screen preview are the same document.
 *
 * Usage: npm run cv:pdf
 * Requires system Google Chrome (Playwright channel: 'chrome').
 */
import { createServer } from 'vite';
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(root, 'public/cv');
const LANGS = ['en', 'es'];
const PORT = 5321;

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const server = await createServer({
    root,
    server: { port: PORT, strictPort: true },
    logLevel: 'error',
  });
  await server.listen();

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const lang of LANGS) {
      const outFile = resolve(OUT_DIR, `Vicente-Nevarez-Trevino-CV-${lang.toUpperCase()}.pdf`);
      const page = await browser.newPage();
      await page.goto(`http://localhost:${PORT}/cv?print&lang=${lang}`, {
        waitUntil: 'networkidle',
      });
      // Ensure webfonts are laid out before printing, or metrics shift.
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(150);

      await page.pdf({
        path: outFile,
        preferCSSPageSize: true,
        printBackground: true,
      });
      await page.close();
      console.log(`✓ CV PDF (${lang}) written to ${outFile}`);
    }
  } finally {
    await browser.close();
    await server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
