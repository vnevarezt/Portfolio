/**
 * Static pre-rendering (SSG) for the client-rendered SPA.
 *
 * For each language-distinct URL it writes a standalone HTML file into dist/ so
 * crawlers and social scrapers get real, per-URL <title>, description,
 * canonical, Open Graph, hreflang and JSON-LD (see src/seo/*). It also emits
 * dist/sitemap.xml.
 *
 * Two strategies, chosen automatically:
 *   1. Full render — boots `vite preview` on dist/ and captures the DOM each URL
 *      renders (the app's own useSeo hook writes the head). Best quality; needs
 *      system Google Chrome (Playwright channel 'chrome').
 *   2. Head-only fallback — if no browser is available (e.g. a CI image without
 *      Chrome), injects the same meta into a copy of dist/index.html per URL.
 *      The body stays client-rendered, but all SEO tags are still baked in, so
 *      the build never breaks.
 *
 * Run automatically as part of `npm run build`.
 */
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(root, 'dist');
const PORT = 5330;

// ── SEO source of truth (keep in sync with src/seo/seo.config.ts) ────────────
const SITE_URL = 'https://vnevarezt.com';
const SITE_NAME = 'Vicente Nevárez';
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const AVATAR = `${SITE_URL}/avatar.jpg`;
const TWITTER = '@vnevarezt';
const EMAIL = 'contact@vnevarezt.com';
const SAME_AS = [
  'https://github.com/vnevarezt',
  'https://linkedin.com/in/vnevarezt',
  'https://x.com/vnevarezt',
  'https://instagram.com/vnevarezt',
];
const JOB_TITLE = {
  en: 'Developer & Interface Designer',
  es: 'Desarrollador y Diseñador de Interfaces',
};
const SEO = {
  '/': {
    en: {
      title: 'Vicente Nevárez — Developer & Interface Designer',
      description:
        'Developer and interface designer turning complex ideas into calm, intuitive software. Portfolio, selected projects, experience and CV.',
      keywords:
        'Vicente Nevárez, developer, interface designer, frontend developer, UI, UX, React, TypeScript, product design, portfolio',
    },
    es: {
      title: 'Vicente Nevárez — Desarrollador y Diseñador de Interfaces',
      description:
        'Desarrollador y diseñador de interfaces que convierte ideas complejas en software calmado e intuitivo. Portfolio, proyectos, experiencia y CV.',
      keywords:
        'Vicente Nevárez, desarrollador, diseñador de interfaces, desarrollador frontend, UI, UX, React, TypeScript, diseño de producto, portafolio',
    },
  },
  '/me': {
    en: {
      title: 'Vicente Nevárez — Links & Contact',
      description:
        'All of Vicente Nevárez in one place: portfolio, GitHub, LinkedIn, X, Instagram and a downloadable contact card.',
      keywords:
        'Vicente Nevárez, links, contact, vcard, GitHub, LinkedIn, X, Instagram, developer, designer',
    },
    es: {
      title: 'Vicente Nevárez — Enlaces y Contacto',
      description:
        'Todo Vicente Nevárez en un solo lugar: portfolio, GitHub, LinkedIn, X, Instagram y una tarjeta de contacto descargable.',
      keywords:
        'Vicente Nevárez, enlaces, contacto, vcard, GitHub, LinkedIn, X, Instagram, desarrollador, diseñador',
    },
  },
  '/cv': {
    en: {
      title: 'Vicente Nevárez — CV / Résumé',
      description:
        'The curriculum of Vicente Nevárez, developer and interface designer. Read it online or download the PDF.',
      keywords:
        'Vicente Nevárez, CV, résumé, curriculum, developer, interface designer, experience, hire',
    },
    es: {
      title: 'Vicente Nevárez — CV / Currículum',
      description:
        'El currículum de Vicente Nevárez, desarrollador y diseñador de interfaces. Léelo online o descarga el PDF.',
      keywords:
        'Vicente Nevárez, CV, currículum, desarrollador, diseñador de interfaces, experiencia, contratar',
    },
  },
};

const LANGS = ['en', 'es'];
const BASE_ROUTES = ['/', '/me', '/cv'];
const ogLocale = (lang) => (lang === 'es' ? 'es_ES' : 'en_US');

function localePath(lang, route) {
  const suffix = route === '/' ? '' : route;
  return lang === 'es' ? `/es${suffix}` : suffix || '/';
}

function outFile(path) {
  return path === '/' ? 'index.html' : `${path.replace(/^\//, '')}/index.html`;
}

const ROUTES = LANGS.flatMap((lang) =>
  BASE_ROUTES.map((route) => {
    const path = localePath(lang, route);
    return { route, lang, path, file: outFile(path) };
  }),
);

// ── Shared head/JSON-LD builders ─────────────────────────────────────────────
function buildJsonLd(route, lang, meta) {
  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: SITE_NAME,
    url: SITE_URL,
    image: AVATAR,
    jobTitle: JOB_TITLE[lang],
    description: meta.description,
    email: `mailto:${EMAIL}`,
    sameAs: SAME_AS,
  };
  const graph = [person];
  if (route === '/') {
    graph.push({
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: lang === 'es' ? 'es' : 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const escHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Rewrites the head of the base index.html for a specific route + language. */
function injectHead(template, { route, lang, path }) {
  const meta = SEO[route][lang];
  const url = SITE_URL + path;
  const enUrl = SITE_URL + localePath('en', route);
  const esUrl = SITE_URL + localePath('es', route);

  const setName = (html, name, content) =>
    html.replace(
      new RegExp(`<meta[^>]*name="${name}"[^>]*>`),
      `<meta name="${name}" content="${escAttr(content)}" />`,
    );
  const setProp = (html, prop, content) =>
    html.replace(
      new RegExp(`<meta[^>]*property="${prop.replace(/:/g, '\\:')}"[^>]*>`),
      `<meta property="${prop}" content="${escAttr(content)}" />`,
    );

  let html = template;
  html = html.replace('<html lang="en"', `<html lang="${lang}"`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escHtml(meta.title)}</title>`);
  html = setName(html, 'description', meta.description);
  html = setName(html, 'keywords', meta.keywords);
  html = html.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${url}" />`,
  );
  html = setProp(html, 'og:title', meta.title);
  html = setProp(html, 'og:description', meta.description);
  html = setProp(html, 'og:url', url);
  html = setProp(html, 'og:locale', ogLocale(lang));
  html = setProp(html, 'og:locale:alternate', ogLocale(lang === 'en' ? 'es' : 'en'));
  html = setName(html, 'twitter:title', meta.title);
  html = setName(html, 'twitter:description', meta.description);

  const extra = [
    `<link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `<link rel="alternate" hreflang="es" href="${esUrl}" />`,
    `<link rel="alternate" hreflang="x-default" href="${enUrl}" />`,
    `<script type="application/ld+json">${JSON.stringify(buildJsonLd(route, lang, meta))}</script>`,
  ].join('\n    ');
  return html.replace('</head>', `    ${extra}\n  </head>`);
}

// ── Sitemap ───────────────────────────────────────────────────────────────────
function buildSitemap() {
  const urls = BASE_ROUTES.map((route) => {
    const alts = LANGS.map(
      (lang) =>
        `      <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE_URL}${localePath(lang, route)}" />`,
    );
    alts.push(
      `      <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${localePath('en', route)}" />`,
    );
    return LANGS.map(
      (lang) =>
        `  <url>\n    <loc>${SITE_URL}${localePath(lang, route)}</loc>\n${alts.join('\n')}\n  </url>`,
    ).join('\n');
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}

// ── Full render via headless Chrome (best quality) ────────────────────────────
async function renderWithBrowser() {
  // Escape hatch: skip the browser and force head-only injection (e.g. on a CI
  // image without Chrome, to avoid the launch attempt entirely).
  if (process.env.PRERENDER_HEAD_ONLY === '1') {
    throw new Error('PRERENDER_HEAD_ONLY=1');
  }
  const { preview } = await import('vite');
  const { chromium } = await import('playwright-core');

  let server;
  let browser;
  try {
    server = await preview({
      root,
      preview: { port: PORT, strictPort: true },
      logLevel: 'error',
    });
    // Launch may throw when no browser is present (e.g. CI without Chrome);
    // the finally below still tears the preview server down so the build exits.
    browser = await chromium.launch({ channel: 'chrome', headless: true });

    for (const r of ROUTES) {
      const page = await browser.newPage();
      await page.goto(`http://localhost:${PORT}${r.path}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts?.ready);
      // Let the SEO effect settle so the head is fully written before capture.
      await page
        .waitForFunction(() => !!document.getElementById('seo-jsonld'), { timeout: 5000 })
        .catch(() => {});
      await page.waitForTimeout(120);
      const html =
        '<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML));
      await writeFileAt(r.file, html);
      await page.close();
      console.log(`  ✓ ${r.path} → dist/${r.file} (rendered)`);
    }
  } finally {
    await browser?.close();
    await server?.httpServer?.close();
  }
}

async function writeFileAt(file, contents) {
  const abs = resolve(DIST, file);
  await mkdir(dirname(abs), { recursive: true });
  await writeFile(abs, contents, 'utf8');
}

async function main() {
  const template = await readFile(resolve(DIST, 'index.html'), 'utf8');

  let rendered = false;
  try {
    await renderWithBrowser();
    rendered = true;
  } catch (err) {
    console.warn(`  ⚠ Browser prerender unavailable (${err.message}). Using head-only injection.`);
  }

  if (!rendered) {
    for (const r of ROUTES) {
      await writeFileAt(r.file, injectHead(template, r));
      console.log(`  ✓ ${r.path} → dist/${r.file} (head-injected)`);
    }
  }

  await writeFile(resolve(DIST, 'sitemap.xml'), buildSitemap(), 'utf8');
  console.log('  ✓ dist/sitemap.xml');
  console.log('Prerender complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
