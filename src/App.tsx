import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { Sidebar } from '@/layout/Sidebar/Sidebar';
import { MainPanel } from '@/layout/MainPanel/MainPanel';

function Portfolio() {
  const [tab, setTab] = useState('Home');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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
