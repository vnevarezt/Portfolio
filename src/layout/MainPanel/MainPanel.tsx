import { Clock } from '@/components/widgets/Clock/Clock';
import { Hero } from '@/sections/Hero/Hero';
import { About } from '@/sections/About/About';
import { Work } from '@/sections/Work/Work';
import { Experience } from '@/sections/Experience/Experience';
import { Writing } from '@/sections/Writing/Writing';
import { Contact } from '@/sections/Contact/Contact';

interface MainPanelProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const PANELS: Record<string, (props: { onTabChange: (tab: string) => void }) => React.ReactNode> = {
  Home: ({ onTabChange }) => <Hero onNavigate={onTabChange} />,
  About: () => <About />,
  Work: () => <Work />,
  Experience: () => <Experience />,
  Writing: () => <Writing />,
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
        animation: 'in .45s cubic-bezier(.16,1,.3,1)',
      }}
    >
      {/* Sticky header — only on non-Home tabs */}
      {!isHome && (
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 5,
            background: 'color-mix(in oklab, var(--bg) 85%, transparent)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--br)',
            padding: '0 32px',
            height: 56,
            display: 'flex',
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
