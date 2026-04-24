import { useLayoutEffect, useRef, useState } from 'react';
import {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  ChartIcon,
  PenIcon,
  MailIcon,
} from '@/components/icons/Icons';

const TABS = [
  { key: 'Home', label: 'Home', Icon: HomeIcon },
  { key: 'About', label: 'About', Icon: UserIcon },
  { key: 'Work', label: 'Work', Icon: BriefcaseIcon },
  { key: 'Career', label: 'Career', Icon: ChartIcon },
  { key: 'Writing', label: 'Writing', Icon: PenIcon },
  { key: 'Contact', label: 'Contact', Icon: MailIcon },
] as const;

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileBottomNav({ activeTab, onTabChange }: MobileBottomNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [navWidth, setNavWidth] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ clientX: 0, offsetX: 0 });

  const activeIndex = Math.max(
    0,
    TABS.findIndex((t) => t.key === activeTab),
  );
  const tabWidth = navWidth > 0 ? (navWidth - 8) / TABS.length : 0;
  const computedX = isDragging ? dragX : activeIndex * tabWidth;

  const hoverIndex =
    isDragging && tabWidth > 0
      ? Math.max(0, Math.min(TABS.length - 1, Math.round(dragX / tabWidth)))
      : activeIndex;

  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const measure = () => setNavWidth(el.offsetWidth);
    measure();
    const obs = new ResizeObserver(measure);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (tabWidth === 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStart.current = {
      clientX: e.clientX,
      offsetX: activeIndex * tabWidth,
    };
    setDragX(activeIndex * tabWidth);
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (!isDragging || tabWidth === 0) return;
    const delta = e.clientX - dragStart.current.clientX;
    const maxX = (TABS.length - 1) * tabWidth;
    const newX = Math.max(0, Math.min(maxX, dragStart.current.offsetX + delta));
    setDragX(newX);
  };

  const endDrag = () => {
    if (!isDragging || tabWidth === 0) return;
    const snapIndex = Math.max(
      0,
      Math.min(TABS.length - 1, Math.round(dragX / tabWidth)),
    );
    setIsDragging(false);
    if (TABS[snapIndex].key !== activeTab) onTabChange(TABS[snapIndex].key);
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)',
        left: 12,
        right: 12,
        zIndex: 20,
        height: 64,
        display: 'flex',
        alignItems: 'stretch',
        padding: 4,
        borderRadius: 32,
        background: 'color-mix(in oklab, var(--bg-c) 70%, transparent)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid var(--br-s)',
        boxShadow:
          '0 12px 32px rgba(0, 0, 0, 0.35), 0 1px 0 rgba(255, 255, 255, 0.04) inset',
      }}
    >
      {/* Draggable sliding indicator */}
      <span
        aria-hidden
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{
          position: 'absolute',
          top: 4,
          bottom: 4,
          left: 4,
          width:
            tabWidth > 0 ? `${tabWidth}px` : `calc((100% - 8px) / ${TABS.length})`,
          background: 'var(--ac)',
          borderRadius: 26,
          transform: `translateX(${computedX}px)`,
          transition: isDragging
            ? 'none'
            : 'transform 0.42s cubic-bezier(0.32, 0.72, 0, 1)',
          zIndex: 1,
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          willChange: 'transform',
        }}
      />

      {TABS.map((tab, i) => {
        const isHover = i === hoverIndex;
        const isActiveSlot = i === activeIndex;
        const { Icon } = tab;
        return (
          <button
            key={tab.key}
            onClick={() => {
              if (!isDragging) onTabChange(tab.key);
            }}
            style={{
              position: 'relative',
              zIndex: 2,
              pointerEvents: isActiveSlot ? 'none' : 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              border: 'none',
              background: 'transparent',
              color: isHover ? 'var(--ac-f)' : 'var(--fg-m)',
              borderRadius: 26,
              cursor: 'pointer',
              fontFamily: 'var(--font-b)',
              fontSize: 10,
              fontWeight: isHover ? 600 : 500,
              letterSpacing: '-0.005em',
              padding: '0 2px',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s ease, font-weight 0.15s',
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
          >
            <Icon size={17} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
