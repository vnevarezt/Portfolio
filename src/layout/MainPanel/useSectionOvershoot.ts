import { useEffect, useRef, useState } from 'react';
import type { OvershootDir, OvershootHintHandle } from './OvershootHint';

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

interface SectionOvershootOptions<T extends string> {
  activeTab: T;
  nextTab: T | null;
  prevTab: T | null;
  getSection: (tab: T) => HTMLElement | null;
  /** Called when the user pushes past the threshold at a section edge. */
  onNavigate: (tab: T) => void;
}

/**
 * Keep-scrolling-past-the-edge navigation: once the active section is
 * scrolled to its top/bottom, further wheel/touch input fills a progress
 * hint and commits to the previous/next section at the threshold.
 */
export function useSectionOvershoot<T extends string>({
  activeTab,
  nextTab,
  prevTab,
  getSection,
  onNavigate,
}: SectionOvershootOptions<T>) {
  const [hint, setHintState] = useState<{ dir: OvershootDir; label: string } | null>(null);
  const hintApiRef = useRef<OvershootHintHandle | null>(null);

  useEffect(() => {
    const sectionEl = getSection(activeTab);
    if (!sectionEl) return;

    let buffer = 0;
    let dirRef: OvershootDir | null = null;
    let cooldownUntil = 0;
    let wheelEdgeDir: OvershootDir | null = null;
    let wheelEdgeArrivedAt: number | null = null;
    let touchStartY: number | null = null;
    let touchStartAtBottom = false;
    let touchStartAtTop = false;
    let touchEdgeDir: OvershootDir | null = null;
    let touchEdgeArrivedAt: number | null = null;
    let touchEdgeAnchorY: number | null = null;
    let touchLocked = false;
    let hideHintTimer: number | null = null;
    let wheelEndTimer: number | null = null;

    const setHint = (dir: OvershootDir) => {
      const label =
        dir === 'down'
          ? nextTab
            ? `Next · ${nextTab}`
            : null
          : prevTab
            ? `Back · ${prevTab}`
            : null;
      if (!label) return;
      setHintState((current) => {
        if (current && current.dir === dir && current.label === label) return current;
        return { dir, label };
      });
    };

    const clearHintAfterSnap = () => {
      if (hideHintTimer != null) {
        window.clearTimeout(hideHintTimer);
      }
      hideHintTimer = window.setTimeout(() => {
        setHintState(null);
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

    const commit = (dir: OvershootDir) => {
      const target = dir === 'down' ? nextTab : prevTab;
      cooldownUntil = performance.now() + COOLDOWN_MS;
      reset();
      if (target) onNavigate(target);
    };

    const apply = (dir: OvershootDir, accum: number) => {
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

      const target: OvershootDir = wantsDown ? 'down' : 'up';
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
      setHintState(null);
    };
  }, [activeTab, nextTab, prevTab, getSection, onNavigate]);

  return { hint, hintApiRef };
}
