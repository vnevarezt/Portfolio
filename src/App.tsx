import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { Sidebar } from '@/layout/Sidebar/Sidebar';
import { MainPanel } from '@/layout/MainPanel/MainPanel';
import { MobileIdentityCard } from '@/layout/MobileIdentityCard/MobileIdentityCard';
import { MobileBottomNav } from '@/layout/MobileBottomNav/MobileBottomNav';
import { useMediaQuery } from '@/hooks/useMediaQuery';

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
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg)',
        }}
      >
        <MobileIdentityCard />
        <div style={{ flex: 1, overflow: 'auto', paddingBottom: 'calc(var(--bottomnav-h) + env(safe-area-inset-bottom, 0px))' }}>
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
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}
