import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { LanguageContext } from './languageContext';
import type { Lang } from './types';
import { baseRouteFromPath, langFromPath, localePath, navigate } from './routing';

/**
 * The active language is derived from the URL so each language is crawlable at
 * its own address (see ./routing). `?lang=` still wins because the CV PDF
 * generator drives the bare sheet with `/cv?print&lang=<lang>`.
 */
function resolveLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  const query = new URLSearchParams(window.location.search).get('lang');
  if (query === 'en' || query === 'es') return query;
  return langFromPath(window.location.pathname);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(resolveLang);

  // Keep the language in sync with the URL (back/forward + programmatic nav).
  useEffect(() => {
    const sync = () => setLangState(resolveLang());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Changing language navigates to the mirror URL of the current page.
  const setLang = useCallback((next: Lang) => {
    navigate(localePath(next, baseRouteFromPath(window.location.pathname)));
  }, []);

  const toggleLang = useCallback(() => {
    setLang(langFromPath(window.location.pathname) === 'en' ? 'es' : 'en');
  }, [setLang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
