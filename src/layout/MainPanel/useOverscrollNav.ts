import { useCallback, useEffect, useRef, useState } from 'react';

const THRESHOLD = 200;
const RESET_MS = 220;
const COOLDOWN_MS = 650;
const EDGE_TOLERANCE = 1;

export type OverscrollDirection = 'down' | 'up' | null;

interface UseOverscrollNavOptions {
  scrollRef: React.RefObject<HTMLElement | null>;
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  disabled?: boolean;
  resetKey?: unknown;
}

interface OverscrollState {
  direction: OverscrollDirection;
  progress: number;
}

export function useOverscrollNav({
  scrollRef,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
  disabled = false,
  resetKey,
}: UseOverscrollNavOptions): OverscrollState {
  const [state, setState] = useState<OverscrollState>({ direction: null, progress: 0 });
  const bufferRef = useRef(0);
  const directionRef = useRef<OverscrollDirection>(null);
  const resetTimerRef = useRef<number | null>(null);
  const cooldownUntilRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartAtTopRef = useRef(false);
  const touchStartAtBottomRef = useRef(false);
  const touchLockedRef = useRef(false);

  const reset = useCallback(() => {
    bufferRef.current = 0;
    directionRef.current = null;
    setState({ direction: null, progress: 0 });
    if (resetTimerRef.current != null) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reset();
  }, [resetKey, reset]);

  const commit = useCallback(
    (dir: 'down' | 'up') => {
      cooldownUntilRef.current = performance.now() + COOLDOWN_MS;
      reset();
      if (dir === 'down') onNext();
      else onPrev();
    },
    [onNext, onPrev, reset],
  );

  const scheduleReset = useCallback(() => {
    if (resetTimerRef.current != null) window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => {
      reset();
    }, RESET_MS);
  }, [reset]);

  const feed = useCallback(
    (delta: number) => {
      if (disabled) return;
      if (performance.now() < cooldownUntilRef.current) return;
      const el = scrollRef.current;
      if (!el) return;

      const atTop = el.scrollTop <= EDGE_TOLERANCE;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - EDGE_TOLERANCE;

      if (delta > 0 && atBottom && canGoNext) {
        if (directionRef.current !== 'down') {
          directionRef.current = 'down';
          bufferRef.current = 0;
        }
        bufferRef.current += delta;
        const progress = Math.min(1, bufferRef.current / THRESHOLD);
        setState({ direction: 'down', progress });
        if (bufferRef.current >= THRESHOLD) {
          commit('down');
          return;
        }
        scheduleReset();
      } else if (delta < 0 && atTop && canGoPrev) {
        if (directionRef.current !== 'up') {
          directionRef.current = 'up';
          bufferRef.current = 0;
        }
        bufferRef.current += -delta;
        const progress = Math.min(1, bufferRef.current / THRESHOLD);
        setState({ direction: 'up', progress });
        if (bufferRef.current >= THRESHOLD) {
          commit('up');
          return;
        }
        scheduleReset();
      } else if (directionRef.current != null) {
        reset();
      }
    },
    [disabled, scrollRef, canGoNext, canGoPrev, commit, scheduleReset, reset],
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || disabled) return;

    const onWheel = (e: WheelEvent) => {
      feed(e.deltaY);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartYRef.current = e.touches[0].clientY;
      touchStartAtTopRef.current = el.scrollTop <= EDGE_TOLERANCE;
      touchStartAtBottomRef.current = el.scrollTop + el.clientHeight >= el.scrollHeight - EDGE_TOLERANCE;
      touchLockedRef.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchLockedRef.current) return;
      if (touchStartYRef.current == null || e.touches.length !== 1) return;
      const currentY = e.touches[0].clientY;
      const delta = touchStartYRef.current - currentY;

      if (delta > 0 && touchStartAtBottomRef.current) {
        const atBottomNow =
          el.scrollTop + el.clientHeight >= el.scrollHeight - EDGE_TOLERANCE;
        if (atBottomNow) {
          const progress = Math.min(1, delta / THRESHOLD);
          directionRef.current = 'down';
          bufferRef.current = delta;
          setState({ direction: 'down', progress });
          if (delta >= THRESHOLD && canGoNext) {
            touchLockedRef.current = true;
            commit('down');
          }
        }
      } else if (delta < 0 && touchStartAtTopRef.current) {
        const atTopNow = el.scrollTop <= EDGE_TOLERANCE;
        if (atTopNow) {
          const progress = Math.min(1, -delta / THRESHOLD);
          directionRef.current = 'up';
          bufferRef.current = -delta;
          setState({ direction: 'up', progress });
          if (-delta >= THRESHOLD && canGoPrev) {
            touchLockedRef.current = true;
            commit('up');
          }
        }
      }
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
      if (!touchLockedRef.current) reset();
      touchLockedRef.current = false;
    };

    el.addEventListener('wheel', onWheel, { passive: true });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      if (resetTimerRef.current != null) window.clearTimeout(resetTimerRef.current);
    };
  }, [scrollRef, disabled, feed, commit, reset, canGoNext, canGoPrev]);

  return state;
}
