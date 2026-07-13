import { useState, useEffect, lazy, Suspense } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { LanguageToggle } from '@/i18n/LanguageToggle';
import { Sidebar } from '@/layout/Sidebar/Sidebar';
import { MainPanel } from '@/layout/MainPanel/MainPanel';
import { MobileBottomNav } from '@/layout/MobileBottomNav/MobileBottomNav';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { LinksPage } from '@/sections/Links/LinksPage';

const CVPage = lazy(() => import('@/sections/CV/CVPage').then((m) => ({ default: m.CVPage })));

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
  return /^\/me\/?$/.test(pathname);
}

function isCVRoute(pathname: string): boolean {
  return /^\/cv\/?$/.test(pathname);
}

function Portfolio() {
  const [tab, setTab] = useState('Home');
  const isMobile = useMediaQuery('(max-width: 768px)');

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
        {isCVRoute(pathname) ? (
          <Suspense fallback={null}>
            <CVPage />
          </Suspense>
        ) : isLinksRoute(pathname) ? (
          <LinksPage />
        ) : (
          <Portfolio />
        )}
      </LanguageProvider>
    </ThemeProvider>
  );
}
