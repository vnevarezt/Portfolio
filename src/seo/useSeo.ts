import { useEffect } from 'react';
import type { Lang } from '@/i18n/types';
import { localePath } from '@/i18n/routing';
import {
  AVATAR,
  EMAIL,
  JOB_TITLE,
  OG_IMAGE,
  SAME_AS,
  SEO,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
  ogLocale,
  type RouteSeo,
} from './seo.config';

/**
 * Imperatively manages the document `<head>` for the active route + language:
 * title, description, canonical, Open Graph, Twitter Card, hreflang alternates
 * and JSON-LD. Runs client-side and — because the prerender step captures the
 * DOM after effects settle — bakes the right tags into each static HTML file.
 *
 * `enabled` lets a page opt out (e.g. the bare CV sheet the PDF generator uses).
 */
export function useSeo(route: string, lang: Lang, enabled = true): void {
  useEffect(() => {
    if (!enabled) return;
    const meta = SEO[route]?.[lang];
    if (!meta) return;
    applyHead(route, lang, meta);
  }, [route, lang, enabled]);
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]:not([hreflang])`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setAlternates(alternates: { hreflang: string; href: string }[]): void {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.remove());
  for (const alt of alternates) {
    const el = document.createElement('link');
    el.setAttribute('rel', 'alternate');
    el.setAttribute('hreflang', alt.hreflang);
    el.setAttribute('href', alt.href);
    document.head.appendChild(el);
  }
}

function setJsonLd(data: unknown): void {
  let el = document.getElementById('seo-jsonld') as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = 'seo-jsonld';
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function buildJsonLd(route: string, lang: Lang, meta: RouteSeo): unknown {
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
  const graph: Record<string, unknown>[] = [person];
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

function applyHead(route: string, lang: Lang, meta: RouteSeo): void {
  const url = SITE_URL + localePath(lang, route);
  const enUrl = SITE_URL + localePath('en', route);
  const esUrl = SITE_URL + localePath('es', route);

  document.title = meta.title;
  upsertMeta('name', 'description', meta.description);
  upsertMeta('name', 'keywords', meta.keywords);
  upsertMeta('name', 'author', SITE_NAME);
  upsertLink('canonical', url);

  // Open Graph
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:site_name', SITE_NAME);
  upsertMeta('property', 'og:title', meta.title);
  upsertMeta('property', 'og:description', meta.description);
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:image', OG_IMAGE);
  upsertMeta('property', 'og:image:width', '1200');
  upsertMeta('property', 'og:image:height', '630');
  upsertMeta('property', 'og:locale', ogLocale(lang));
  upsertMeta('property', 'og:locale:alternate', ogLocale(lang === 'en' ? 'es' : 'en'));

  // Twitter Card
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', meta.title);
  upsertMeta('name', 'twitter:description', meta.description);
  upsertMeta('name', 'twitter:image', OG_IMAGE);
  upsertMeta('name', 'twitter:site', TWITTER_HANDLE);
  upsertMeta('name', 'twitter:creator', TWITTER_HANDLE);

  // hreflang alternates (reciprocal, English is x-default)
  setAlternates([
    { hreflang: 'en', href: enUrl },
    { hreflang: 'es', href: esUrl },
    { hreflang: 'x-default', href: enUrl },
  ]);

  setJsonLd(buildJsonLd(route, lang, meta));
}
