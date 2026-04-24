import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Clock } from '@/components/widgets/Clock/Clock';
import { Hero } from '@/sections/Hero/Hero';
import { About } from '@/sections/About/About';
import { Work } from '@/sections/Work/Work';
import { Contact } from '@/sections/Contact/Contact';
import { useOverscrollNav } from './useOverscrollNav';

interface MainPanelProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TAB_ORDER = ['Home', 'About', 'Work', 'Contact'] as const;

const PANELS: Record<string, (props: { onTabChange: (tab: string) => void }) => React.ReactNode> = {
  Home: ({ onTabChange }) => <Hero onNavigate={onTabChange} />,
  About: () => <About />,
  Work: () => <Work />,
  Contact: () => <Contact />,
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

interface HintProps {
  direction: 'down' | 'up';
  progress: number;
  label: string;
}

function OverscrollHint({ direction, progress, label }: HintProps) {
  const isDown = direction === 'down';
  const visible = progress > 0.02;
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        [isDown ? 'bottom' : 'top']: 0,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: isDown ? 'column' : 'column-reverse',
        alignItems: 'center',
        gap: 10,
        padding: '18px 16px calc(env(safe-area-inset-bottom, 0px) + 18px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${isDown ? 12 : -12}px)`,
        transition:
          'opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        background: `linear-gradient(${
          isDown ? 'to top' : 'to bottom'
        }, color-mix(in oklab, var(--bg) 94%, transparent) 0%, transparent 100%)`,
        zIndex: 4,
      }}
    >
      <div
        className="m"
        style={{
          fontSize: 10,
          color: progress >= 1 ? 'var(--ac)' : 'var(--fg-d)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          transition: 'color 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
          whiteSpace: 'nowrap',
        }}
      >
        {isDown ? '↓' : '↑'}  {label}
      </div>
      <div
        style={{
          width: 'min(200px, 44vw)',
          height: 2,
          borderRadius: 2,
          background: 'var(--br)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: '100%',
            background: 'var(--ac)',
            transition: 'width 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </div>
  );
}

export function MainPanel({ activeTab, onTabChange }: MainPanelProps) {
  const isHome = activeTab === 'Home';
  const scrollRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const prevTabRef = useRef(activeTab);

  const activeIndex = TAB_ORDER.indexOf(activeTab as (typeof TAB_ORDER)[number]);
  const prevIndex = TAB_ORDER.indexOf(prevTabRef.current as (typeof TAB_ORDER)[number]);
  const navDirection: 'forward' | 'back' | null =
    activeTab === prevTabRef.current
      ? null
      : activeIndex > prevIndex
        ? 'forward'
        : 'back';

  useLayoutEffect(() => {
    if (prevTabRef.current !== activeTab) {
      prevTabRef.current = activeTab;
      scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [activeTab]);

  const nextTab = activeIndex >= 0 && activeIndex < TAB_ORDER.length - 1 ? TAB_ORDER[activeIndex + 1] : null;
  const prevTab = activeIndex > 0 ? TAB_ORDER[activeIndex - 1] : null;

  const { direction, progress } = useOverscrollNav({
    scrollRef,
    onNext: () => nextTab && onTabChange(nextTab),
    onPrev: () => prevTab && onTabChange(prevTab),
    canGoNext: nextTab != null,
    canGoPrev: prevTab != null,
    disabled: reducedMotion,
    resetKey: activeTab,
  });

  const pullOffset =
    direction === 'down' ? -progress * 24 : direction === 'up' ? progress * 24 : 0;

  const enterClass =
    navDirection === 'forward'
      ? 'panel-enter-forward'
      : navDirection === 'back'
        ? 'panel-enter-back'
        : 'panel-enter';

  return (
    <main
      ref={scrollRef}
      style={{
        position: 'relative',
        flex: 1,
        overflow: 'auto',
        background: 'var(--bg)',
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

      <div key={activeTab} className={enterClass}>
        <div
          style={{
            transform: `translateY(${pullOffset}px)`,
            transition:
              progress > 0
                ? 'transform 0.14s cubic-bezier(0.22, 1, 0.36, 1)'
                : 'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)',
            willChange: direction ? 'transform' : 'auto',
          }}
        >
          {PANELS[activeTab]?.({ onTabChange })}
        </div>
      </div>

      {nextTab && (
        <OverscrollHint
          direction="down"
          progress={direction === 'down' ? progress : 0}
          label={`Next: ${nextTab}`}
        />
      )}
      {prevTab && (
        <OverscrollHint
          direction="up"
          progress={direction === 'up' ? progress : 0}
          label={`Back: ${prevTab}`}
        />
      )}
    </main>
  );
}
