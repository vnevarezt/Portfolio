import { useState, useEffect, lazy, Suspense } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { LanguageToggle } from '@/i18n/LanguageToggle';
import { useLang } from '@/i18n/useLang';
import { useSeo } from '@/seo/useSeo';
import { Sidebar } from '@/layout/Sidebar/Sidebar';
import { MainPanel } from '@/layout/MainPanel/MainPanel';
import { MobileBottomNav } from '@/layout/MobileBottomNav/MobileBottomNav';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const CVPage = lazy(() => import('@/sections/CV/CVPage').then((m) => ({ default: m.CVPage })));
const LinksPage = lazy(() =>
  import('@/sections/Links/LinksPage').then((m) => ({ default: m.LinksPage })),
);

function usePathname(): string {
  const [pathname, setPathname] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname,
  );
  useEffect(() => {
    const onChange = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onChange);
    return () => window.removeEventListener('popstate', onChange);
  }, []);
  return pathname;
}

function isLinksRoute(pathname: string): boolean {
  return /^\/(es\/)?me\/?$/.test(pathname);
}

function isCVRoute(pathname: string): boolean {
  return /^\/(es\/)?cv\/?$/.test(pathname);
}

function Portfolio() {
  const [tab, setTab] = useState('Home');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { lang } = useLang();
  useSeo('/', lang);

  useEffect(() => {
    document.body.style.overflow = isMobile ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div
        style={{
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg)',
          overflow: 'hidden',
        }}
      >
        <LanguageToggle floating />
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
            overscrollBehaviorY: 'contain',
            paddingTop: 'env(safe-area-inset-top, 0px)',
            paddingBottom: 'calc(var(--bottomnav-h) + env(safe-area-inset-bottom, 0px))',
          }}
        >
          <MainPanel activeTab={tab} onTabChange={setTab} />
        </div>
        <MobileBottomNav activeTab={tab} onTabChange={setTab} />
      </div>
    );
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      <Sidebar activeTab={tab} onTabChange={setTab} />
      <MainPanel activeTab={tab} onTabChange={setTab} />
    </div>
  );
}

export default function App() {
  const pathname = usePathname();

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Suspense fallback={null}>
          {isCVRoute(pathname) ? (
            <CVPage />
          ) : isLinksRoute(pathname) ? (
            <LinksPage />
          ) : (
            <Portfolio />
          )}
        </Suspense>
      </LanguageProvider>
    </ThemeProvider>
  );
}
