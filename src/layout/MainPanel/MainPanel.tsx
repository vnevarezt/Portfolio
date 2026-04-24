import { Clock } from '@/components/widgets/Clock/Clock';
import { Hero } from '@/sections/Hero/Hero';
import { About } from '@/sections/About/About';
import { Work } from '@/sections/Work/Work';
import { Contact } from '@/sections/Contact/Contact';

interface MainPanelProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const PANELS: Record<string, (props: { onTabChange: (tab: string) => void }) => React.ReactNode> = {
  Home: ({ onTabChange }) => <Hero onNavigate={onTabChange} />,
  About: () => <About />,
  Work: () => <Work />,
  Contact: () => <Contact />,
};

export function MainPanel({ activeTab, onTabChange }: MainPanelProps) {
  const isHome = activeTab === 'Home';

  return (
    <main
      key={activeTab}
      style={{
        flex: 1,
        overflow: 'auto',
        background: 'var(--bg)',
        animation: 'in 0.2s ease-out',
      }}
    >
      {/* Sticky header — only on non-Home tabs, hidden on mobile via CSS */}
      {!isHome && (
        <div
          className="main-sticky-header"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 5,
            background: 'color-mix(in oklab, var(--bg) 85%, transparent)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--br)',
            padding: '0 var(--pad-x)',
            height: 56,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            className="m"
            style={{ fontSize: 10, color: 'var(--fg-d)', letterSpacing: '0.2em' }}
          >
            VICENT<span style={{ color: 'var(--ac)' }}>CODES</span> · {activeTab.toUpperCase()}
          </div>
          <Clock />
        </div>
      )}
      {PANELS[activeTab]?.({ onTabChange })}
    </main>
  );
}
