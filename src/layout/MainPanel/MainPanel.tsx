import { useCallback, useEffect, useRef } from 'react';
import { haptic } from 'ios-haptics';
import { Clock } from '@/components/widgets/Clock/Clock';
import { prefersReducedMotion, scrollBehavior } from '@/lib/motion';
import { Hero } from '@/sections/Hero/Hero';
import { About } from '@/sections/About/About';
import { Work } from '@/sections/Work/Work';
import { Contact } from '@/sections/Contact/Contact';
import { OvershootHint } from './OvershootHint';
import { useSectionOvershoot } from './useSectionOvershoot';

interface MainPanelProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TAB_ORDER = ['Home', 'About', 'Work', 'Contact'] as const;
type Tab = (typeof TAB_ORDER)[number];

const PANELS: Record<Tab, (props: { onTabChange: (tab: string) => void }) => React.ReactNode> = {
  Home: ({ onTabChange }) => <Hero onNavigate={onTabChange} />,
  About: () => <About />,
  Work: () => <Work />,
  Contact: () => <Contact />,
};

function triggerHaptic() {
  if (prefersReducedMotion()) return;
  haptic.confirm();
}

function StickyHeader({ tab }: { tab: string }) {
  return (
    <div
      className="main-sticky-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 5,
        background: 'color-mix(in oklab, var(--bg) 85%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--br)',
        padding: '0 var(--pad-x)',
        height: 56,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className="m" style={{ fontSize: 'var(--fs-9)', color: 'var(--fg-d)', letterSpacing: '0.2em' }}>
        V<span style={{ color: 'var(--ac)' }}>NEVAREZ</span>T · {tab.toUpperCase()}
      </div>
      <Clock />
    </div>
  );
}

export function MainPanel({ activeTab, onTabChange }: MainPanelProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Partial<Record<Tab, HTMLElement | null>>>({});
  const lastSpyTabRef = useRef<Tab>(activeTab as Tab);
  const rafRef = useRef<number | null>(null);

  const activeIndex = TAB_ORDER.indexOf(activeTab as Tab);
  const nextTab =
    activeIndex >= 0 && activeIndex < TAB_ORDER.length - 1 ? TAB_ORDER[activeIndex + 1] : null;
  const prevTab = activeIndex > 0 ? TAB_ORDER[activeIndex - 1] : null;

  const getSection = useCallback((tab: Tab) => sectionRefs.current[tab] ?? null, []);

  const scrollToTab = useCallback((tab: Tab) => {
    sectionRefs.current[tab]?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
  }, []);

  const { hint, hintApiRef } = useSectionOvershoot<Tab>({
    activeTab: activeTab as Tab,
    nextTab,
    prevTab,
    getSection,
    onNavigate: scrollToTab,
  });

  // Outer scroll spy — report the dominant section.
  useEffect(() => {
    const main = scrollAreaRef.current;
    if (!main) return;

    const updateActive = () => {
      rafRef.current = null;
      const h = main.clientHeight;
      if (h === 0) return;
      const idx = Math.round(main.scrollTop / h);
      const tab = TAB_ORDER[Math.max(0, Math.min(TAB_ORDER.length - 1, idx))];
      if (tab && tab !== lastSpyTabRef.current) {
        lastSpyTabRef.current = tab;
        triggerHaptic();
        onTabChange(tab);
      }
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(updateActive);
    };

    main.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      main.removeEventListener('scroll', onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [onTabChange]);

  // External activeTab change — scroll there.
  useEffect(() => {
    if (activeTab === lastSpyTabRef.current) return;
    lastSpyTabRef.current = activeTab as Tab;
    scrollToTab(activeTab as Tab);
  }, [activeTab, scrollToTab]);

  return (
    <main
      style={{
        position: 'relative',
        flex: 1,
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      <div
        ref={scrollAreaRef}
        style={{
          position: 'absolute',
          inset: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollSnapType: 'y mandatory',
          overscrollBehaviorY: 'contain',
        }}
      >
        {TAB_ORDER.map((tab) => {
          const isHome = tab === 'Home';
          return (
            <section
              key={tab}
              ref={(el) => {
                sectionRefs.current[tab] = el;
              }}
              data-tab={tab}
              style={{
                scrollSnapAlign: 'start',
                scrollSnapStop: 'always',
                height: '100%',
                overflowY: isHome ? 'hidden' : 'auto',
                overflowX: 'hidden',
                overscrollBehaviorY: 'contain',
                position: 'relative',
                background: 'var(--bg)',
              }}
            >
              {!isHome && <StickyHeader tab={tab} />}
              {PANELS[tab]({ onTabChange })}
            </section>
          );
        })}
      </div>

      {hint && <OvershootHint ref={hintApiRef} dir={hint.dir} label={hint.label} />}
    </main>
  );
}
