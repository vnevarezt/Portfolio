import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { LanguageContext } from './languageContext';
import type { Lang } from './types';

const STORAGE_KEY = 'lang';

function isLang(value: string | null): value is Lang {
  return value === 'en' || value === 'es';
}

/** ?lang= wins (used by the CV PDF generator), then a stored choice, then English. */
function initialLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  const query = new URLSearchParams(window.location.search).get('lang');
  if (isLang(query)) return query;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLang(stored)) return stored;
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable — non-fatal */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(() => setLangState((prev) => (prev === 'en' ? 'es' : 'en')), []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
