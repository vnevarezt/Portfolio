import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

export type OvershootDir = 'down' | 'up';

export interface OvershootHintHandle {
  setProgress: (progress: number) => void;
  snapBack: () => void;
}

interface OvershootHintProps {
  dir: OvershootDir;
  label: string;
}

/**
 * Floating progress pill shown while the user keeps scrolling past a
 * section edge. Driven imperatively (ref) to avoid re-rendering on every
 * wheel/touch event.
 */
export const OvershootHint = forwardRef<OvershootHintHandle, OvershootHintProps>(
  function OvershootHint({ dir, label }, ref) {
    const isDown = dir === 'down';
    const rootRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    const updateVisual = useCallback(
      (progress: number, animateBar: boolean) => {
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
      },
      [isDown],
    );

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
          willChange: 'opacity, transform',
          backfaceVisibility: 'hidden',
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
              fontSize: 'var(--fs-9)',
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
  },
);
