import type { Lang } from './types';

/**
 * URL scheme for SEO-distinct languages. English is the default and lives at the
 * root (`/`, `/me`, `/cv`); Spanish is served under an `/es` prefix
 * (`/es`, `/es/me`, `/es/cv`). The pathname — not localStorage — is the source
 * of truth for the active language, so each language has its own crawlable URL.
 */

/** Language-neutral routes the site exposes (used for sitemap + hreflang). */
export const BASE_ROUTES = ['/', '/me', '/cv'] as const;

/** Every concrete (lang, route) URL, in canonical order. */
export const ALL_ROUTES: { lang: Lang; path: string }[] = (['en', 'es'] as const).flatMap((lang) =>
  BASE_ROUTES.map((route) => ({ lang, path: localePath(lang, route) })),
);

/** Reads the language a pathname encodes (`/es…` → `es`, everything else → `en`). */
export function langFromPath(pathname: string): Lang {
  return /^\/es(\/|$)/.test(pathname) ? 'es' : 'en';
}

/** Strips the `/es` prefix, returning the language-neutral base route. */
export function baseRouteFromPath(pathname: string): string {
  let p = pathname.replace(/^\/es(?=\/|$)/, '');
  if (p === '') p = '/';
  if (p.length > 1) p = p.replace(/\/+$/, '') || '/';
  return p;
}

/** Builds the URL for a base route in a given language. */
export function localePath(lang: Lang, baseRoute: string): string {
  const suffix = baseRoute === '/' ? '' : baseRoute;
  return lang === 'es' ? `/es${suffix}` : suffix || '/';
}

/**
 * Client-side navigation that reuses the existing `popstate` subscribers
 * (App's `usePathname` and the LanguageProvider). Pushes a history entry and
 * synthesizes a `popstate` so the app re-renders without a full reload.
 */
export function navigate(path: string): void {
  if (typeof window === 'undefined') return;
  if (path === window.location.pathname) return;
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
