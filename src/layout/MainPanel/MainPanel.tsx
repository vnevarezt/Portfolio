import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { haptic } from 'ios-haptics';
import { Clock } from '@/components/widgets/Clock/Clock';
import { Hero } from '@/sections/Hero/Hero';
import { About } from '@/sections/About/About';
import { Work } from '@/sections/Work/Work';
import { Contact } from '@/sections/Contact/Contact';

interface MainPanelProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TAB_ORDER = ['Home', 'About', 'Work', 'Contact'] as const;
type Tab = (typeof TAB_ORDER)[number];
type Dir = 'down' | 'up';

const PANELS: Record<Tab, (props: { onTabChange: (tab: string) => void }) => React.ReactNode> = {
  Home: ({ onTabChange }) => <Hero onNavigate={onTabChange} />,
  About: () => <About />,
  Work: () => <Work />,
  Contact: () => <Contact />,
};

function triggerHaptic() {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
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
        borderBottom: '1px solid var(--br)',
        padding: '0 var(--pad-x)',
        height: 56,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className="m" style={{ fontSize: 10, color: 'var(--fg-d)', letterSpacing: '0.2em' }}>
        VICENT<span style={{ color: 'var(--ac)' }}>CODES</span> · {tab.toUpperCase()}
      </div>
      <Clock />
    </div>
  );
}

interface OvershootHintHandle {
  setProgress: (progress: number) => void;
  snapBack: () => void;
}

interface OvershootHintProps {
  dir: Dir;
  label: string;
}

const OvershootHint = forwardRef<OvershootHintHandle, OvershootHintProps>(function OvershootHint(
  { dir, label },
  ref,
) {
  const isDown = dir === 'down';
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const updateVisual = useCallback((progress: number, animateBar: boolean) => {
    const clamped = Math.max(0, Math.min(1, progress));
    const visible = clamped > 0.01;
    const root = rootRef.current;
    const bar = barRef.current;
    const text = labelRef.current;

    if (root) {
      root.style.opacity = visible ? '1' : '0';
      root.style.transform = visible
        ? 'translate(-50%, 0)'
        : `translate(-50%, ${isDown ? 8 : -8}px)`;
    }

    if (bar) {
      bar.style.transition = animateBar
        ? 'transform 160ms cubic-bezier(0.22, 1, 0.36, 1)'
        : 'none';
      bar.style.transform = `scaleX(${clamped})`;
    }

    if (text) {
      text.style.color = clamped >= 0.99 ? 'var(--ac)' : 'var(--fg-d)';
    }
  }, [isDown]);

  useImperativeHandle(ref, () => ({
    setProgress: (progress) => {
      updateVisual(progress, false);
    },
    snapBack: () => {
      updateVisual(0, true);
    },
  }));

  useEffect(() => {
    updateVisual(0, false);
  }, [dir, updateVisual]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{
        position: 'absolute',
        [isDown ? 'bottom' : 'top']: 'calc(env(safe-area-inset-bottom, 0px) + 22px)',
        left: '50%',
        zIndex: 6,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        opacity: 0,
        transform: `translate(-50%, ${isDown ? 8 : -8}px)`,
        transition:
          'opacity 0.2s cubic-bezier(0.22, 1, 0.36, 1), transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'opacity, transform',
        backfaceVisibility: 'hidden',
        translate: '0 0',
        WebkitTransform: 'translateZ(0)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          padding: '8px 12px',
          borderRadius: 10,
          background: 'color-mix(in oklab, var(--bg) 68%, transparent)',
          border: '1px solid color-mix(in oklab, var(--br) 70%, transparent)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div
          ref={labelRef}
          className="m"
          style={{
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--fg-d)',
            transition: 'color 0.18s cubic-bezier(0.22, 1, 0.36, 1)',
            whiteSpace: 'nowrap',
          }}
        >
          {isDown ? '↓' : '↑'} {label}
        </div>
        <div
          style={{
            width: 90,
            height: 2,
            borderRadius: 2,
            background: 'var(--br)',
            overflow: 'hidden',
          }}
        >
          <div
            ref={barRef}
            style={{
              width: '100%',
              height: '100%',
              background: 'var(--ac)',
              transform: 'scaleX(0)',
              transformOrigin: 'left center',
              transition: 'transform 160ms cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform',
            }}
          />
        </div>
      </div>
    </div>
  );
});

const RESET_MS = 160;
const COOLDOWN_MS = 350;
const EDGE_TOLERANCE = 2;
const TOUCH_GATE = 10;
const WHEEL_END_MS = 280;
const WHEEL_EDGE_STABLE_MS = 70;
const TOUCH_EDGE_STABLE_MS = 70;
const TOUCH_EDGE_TOLERANCE = 0.5;

function getThreshold() {
  if (typeof window === 'undefined') return 280;
  return Math.max(280, window.innerHeight * 0.32);
}

export function MainPanel({ activeTab, onTabChange }: MainPanelProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Partial<Record<Tab, HTMLElement | null>>>({});
  const lastSpyTabRef = useRef<Tab>(activeTab as Tab);
  const rafRef = useRef<number | null>(null);

  const [activeHint, setActiveHint] = useState<{ dir: Dir; label: string } | null>(null);
  const hintApiRef = useRef<OvershootHintHandle | null>(null);

  const activeIndex = TAB_ORDER.indexOf(activeTab as Tab);
  const nextTab =
    activeIndex >= 0 && activeIndex < TAB_ORDER.length - 1 ? TAB_ORDER[activeIndex + 1] : null;
  const prevTab = activeIndex > 0 ? TAB_ORDER[activeIndex - 1] : null;

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
    const target = sectionRefs.current[activeTab as Tab];
    if (!target) return;
    lastSpyTabRef.current = activeTab as Tab;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [activeTab]);

  // Boundary overshoot detection — only fires once user is at section edge.
  useEffect(() => {
    const sectionEl = sectionRefs.current[activeTab as Tab];
    if (!sectionEl) return;

    let buffer = 0;
    let dirRef: Dir | null = null;
    let cooldownUntil = 0;
    let wheelEdgeDir: Dir | null = null;
    let wheelEdgeArrivedAt: number | null = null;
    let touchStartY: number | null = null;
    let touchStartAtBottom = false;
    let touchStartAtTop = false;
    let touchEdgeDir: Dir | null = null;
    let touchEdgeArrivedAt: number | null = null;
    let touchEdgeAnchorY: number | null = null;
    let touchLocked = false;
    let hideHintTimer: number | null = null;
    let wheelEndTimer: number | null = null;

    const setHint = (dir: Dir) => {
      const label = dir === 'down' ? (nextTab ? `Next · ${nextTab}` : null) : prevTab ? `Back · ${prevTab}` : null;
      if (!label) return;
      setActiveHint((current) => {
        if (current && current.dir === dir && current.label === label) return current;
        return { dir, label };
      });
    };

    const clearHintAfterSnap = () => {
      if (hideHintTimer != null) {
        window.clearTimeout(hideHintTimer);
      }
      hideHintTimer = window.setTimeout(() => {
        setActiveHint(null);
        hideHintTimer = null;
      }, RESET_MS);
    };

    const scheduleWheelEndReset = () => {
      if (wheelEndTimer != null) {
        window.clearTimeout(wheelEndTimer);
      }
      wheelEndTimer = window.setTimeout(() => {
        wheelEndTimer = null;
        if (dirRef != null) {
          reset();
        }
      }, WHEEL_END_MS);
    };

    const reset = () => {
      buffer = 0;
      const hadDir = dirRef;
      dirRef = null;
      wheelEdgeDir = null;
      wheelEdgeArrivedAt = null;
      if (hadDir != null) {
        hintApiRef.current?.snapBack();
        clearHintAfterSnap();
      }
    };

    const commit = (dir: Dir) => {
      const target = dir === 'down' ? nextTab : prevTab;
      cooldownUntil = performance.now() + COOLDOWN_MS;
      reset();
      if (!target) return;
      const targetEl = sectionRefs.current[target];
      targetEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const apply = (dir: Dir, accum: number) => {
      setHint(dir);
      const t = getThreshold();
      const progress = Math.min(1, accum / t);
      hintApiRef.current?.setProgress(progress);
      if (accum >= t) {
        commit(dir);
      }
    };

    const atBottom = () =>
      sectionEl.scrollTop + sectionEl.clientHeight >= sectionEl.scrollHeight - EDGE_TOLERANCE;
    const atTop = () => sectionEl.scrollTop <= EDGE_TOLERANCE;
    const atBottomStrict = () =>
      sectionEl.scrollTop + sectionEl.clientHeight >= sectionEl.scrollHeight - TOUCH_EDGE_TOLERANCE;
    const atTopStrict = () => sectionEl.scrollTop <= TOUCH_EDGE_TOLERANCE;

    const resetTouchEdgeGate = () => {
      touchEdgeDir = null;
      touchEdgeArrivedAt = null;
      touchEdgeAnchorY = null;
    };

    const resetWheelEdgeGate = () => {
      wheelEdgeDir = null;
      wheelEdgeArrivedAt = null;
    };

    const onWheel = (e: WheelEvent) => {
      if (performance.now() < cooldownUntil) return;
      const delta = e.deltaY;
      const isAtBottom = atBottom();
      const isAtTop = atTop();
      const isAtBottomStrict = atBottomStrict();
      const isAtTopStrict = atTopStrict();

      if (dirRef === 'down') {
        if (delta > 0 && isAtBottom && nextTab) {
          buffer += delta;
          apply('down', buffer);
          scheduleWheelEndReset();
          return;
        }
        if (delta < 0) {
          buffer = Math.max(0, buffer + delta);
          if (buffer === 0) {
            reset();
          } else {
            apply('down', buffer);
            scheduleWheelEndReset();
          }
          return;
        }
      } else if (dirRef === 'up') {
        if (delta < 0 && isAtTop && prevTab) {
          buffer += -delta;
          apply('up', buffer);
          scheduleWheelEndReset();
          return;
        }
        if (delta > 0) {
          buffer = Math.max(0, buffer - delta);
          if (buffer === 0) {
            reset();
          } else {
            apply('up', buffer);
            scheduleWheelEndReset();
          }
          return;
        }
      }

      const wantsDown = delta > 0 && isAtBottomStrict && nextTab;
      const wantsUp = delta < 0 && isAtTopStrict && prevTab;

      if (!wantsDown && !wantsUp) {
        resetWheelEdgeGate();
        return;
      }

      const target: Dir = wantsDown ? 'down' : 'up';
      const now = performance.now();

      if (wheelEdgeDir !== target) {
        wheelEdgeDir = target;
        wheelEdgeArrivedAt = now;
        return;
      }

      if (wheelEdgeArrivedAt == null || now - wheelEdgeArrivedAt < WHEEL_EDGE_STABLE_MS) {
        return;
      }

      if (dirRef !== target) {
        dirRef = target;
        buffer = 0;
      }
      buffer += Math.abs(delta);
      apply(target, buffer);
      scheduleWheelEndReset();
    };

    const onSectionScroll = () => {
      if (dirRef === 'down' && !atBottom()) {
        reset();
      } else if (dirRef === 'up' && !atTop()) {
        reset();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartY = e.touches[0].clientY;
      touchStartAtBottom = atBottomStrict();
      touchStartAtTop = atTopStrict();
      resetTouchEdgeGate();
      touchLocked = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchLocked) return;
      if (touchStartY == null || e.touches.length !== 1) return;
      if (performance.now() < cooldownUntil) return;
      const totalDelta = touchStartY - e.touches[0].clientY;
      if (Math.abs(totalDelta) < TOUCH_GATE) return;

      if (totalDelta > 0 && touchStartAtBottom && nextTab) {
        if (!atBottomStrict()) {
          resetTouchEdgeGate();
          return;
        }

        const now = performance.now();
        if (touchEdgeDir !== 'down') {
          touchEdgeDir = 'down';
          touchEdgeArrivedAt = now;
          touchEdgeAnchorY = e.touches[0].clientY;
          return;
        }

        if (touchEdgeArrivedAt == null || now - touchEdgeArrivedAt < TOUCH_EDGE_STABLE_MS) {
          return;
        }

        const anchorY = touchEdgeAnchorY ?? touchStartY;
        if (anchorY == null) return;
        const overshootPx = anchorY - e.touches[0].clientY - TOUCH_GATE;
        if (overshootPx <= 0) return;

        dirRef = 'down';
        buffer = overshootPx;
        apply('down', overshootPx);
        if (overshootPx >= getThreshold()) {
          touchLocked = true;
          commit('down');
        }
      } else if (totalDelta < 0 && touchStartAtTop && prevTab) {
        if (!atTopStrict()) {
          resetTouchEdgeGate();
          return;
        }

        const now = performance.now();
        if (touchEdgeDir !== 'up') {
          touchEdgeDir = 'up';
          touchEdgeArrivedAt = now;
          touchEdgeAnchorY = e.touches[0].clientY;
          return;
        }

        if (touchEdgeArrivedAt == null || now - touchEdgeArrivedAt < TOUCH_EDGE_STABLE_MS) {
          return;
        }

        const anchorY = touchEdgeAnchorY ?? touchStartY;
        if (anchorY == null) return;
        const overshootPx = e.touches[0].clientY - anchorY - TOUCH_GATE;
        if (overshootPx <= 0) return;

        dirRef = 'up';
        buffer = overshootPx;
        apply('up', overshootPx);
        if (overshootPx >= getThreshold()) {
          touchLocked = true;
          commit('up');
        }
      } else {
        resetTouchEdgeGate();
      }
    };

    const onTouchEnd = () => {
      touchStartY = null;
      touchStartAtBottom = false;
      touchStartAtTop = false;
      resetTouchEdgeGate();
      if (touchLocked) {
        touchLocked = false;
        return;
      }
      if (dirRef != null) reset();
    };

    sectionEl.addEventListener('wheel', onWheel, { passive: true });
    sectionEl.addEventListener('touchstart', onTouchStart, { passive: true });
    sectionEl.addEventListener('touchmove', onTouchMove, { passive: true });
    sectionEl.addEventListener('touchend', onTouchEnd, { passive: true });
    sectionEl.addEventListener('touchcancel', onTouchEnd, { passive: true });
    sectionEl.addEventListener('scroll', onSectionScroll, { passive: true });

    return () => {
      sectionEl.removeEventListener('wheel', onWheel);
      sectionEl.removeEventListener('touchstart', onTouchStart);
      sectionEl.removeEventListener('touchmove', onTouchMove);
      sectionEl.removeEventListener('touchend', onTouchEnd);
      sectionEl.removeEventListener('touchcancel', onTouchEnd);
      sectionEl.removeEventListener('scroll', onSectionScroll);
      if (hideHintTimer != null) window.clearTimeout(hideHintTimer);
      if (wheelEndTimer != null) window.clearTimeout(wheelEndTimer);
      setActiveHint(null);
    };
  }, [activeTab, nextTab, prevTab]);

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

      {activeHint && <OvershootHint ref={hintApiRef} dir={activeHint.dir} label={activeHint.label} />}
    </main>
  );
}
