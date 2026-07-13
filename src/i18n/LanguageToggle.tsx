import type { CSSProperties } from 'react';
import { useLang } from './useLang';
import type { Lang } from './types';

const LANGS: Lang[] = ['en', 'es'];

interface LanguageToggleProps {
  /** Fixed, blurred pill for viewports without persistent chrome (mobile). */
  floating?: boolean;
}

export function LanguageToggle({ floating }: LanguageToggleProps) {
  const { lang, setLang } = useLang();

  const rootStyle: CSSProperties = floating
    ? {
        position: 'fixed',
        top: 'calc(env(safe-area-inset-top, 0px) + 10px)',
        right: 'calc(env(safe-area-inset-right, 0px) + 12px)',
        zIndex: 30,
        background: 'color-mix(in oklab, var(--bg-c) 72%, transparent)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.28)',
      }
    : {};

  return (
    <div
      role="group"
      aria-label="Language"
      style={{
        display: 'inline-flex',
        gap: 2,
        padding: 3,
        borderRadius: 999,
        border: '1px solid var(--br)',
        background: floating ? undefined : 'var(--bg-c)',
        ...rootStyle,
      }}
    >
      {LANGS.map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            onClick={() => setLang(code)}
            className={active ? 'accent-surface' : undefined}
            style={{
              padding: '3px 9px',
              border: 'none',
              borderRadius: 999,
              background: active ? undefined : 'transparent',
              color: active ? undefined : 'var(--fg-m)',
              fontFamily: 'var(--font-m)',
              fontSize: 'var(--fs-9)',
              fontWeight: active ? 600 : 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'color 0.15s ease',
            }}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
