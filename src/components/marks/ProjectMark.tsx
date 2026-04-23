import type { CSSProperties } from 'react';
import type { ProjectKind } from '@/types';

interface ProjectMarkProps {
  kind: ProjectKind;
  big?: boolean;
}

export function ProjectMark({ kind, big }: ProjectMarkProps) {
  const box: CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    background: 'var(--bg-e)',
    fontFamily: 'var(--font-d)',
    color: 'var(--fg)',
  };

  if (kind === 'vc')
    return (
      <div style={{ ...box, background: 'var(--ac)', color: 'var(--ac-f)' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            opacity: 0.1,
          }}
        />
        <div
          style={{
            fontSize: big ? 180 : 72,
            fontWeight: 500,
            letterSpacing: '-0.08em',
            display: 'flex',
            lineHeight: 0.8,
          }}
        >
          <span>V</span>
          <span style={{ marginLeft: '-0.2em', opacity: 0.45 }}>C</span>
        </div>
      </div>
    );

  if (kind === 'lumen')
    return (
      <div style={box}>
        <svg width="70%" height="70%" viewBox="0 0 200 200" style={{ maxWidth: 180 }}>
          {Array.from({ length: 11 }).map((_, y) =>
            Array.from({ length: 11 }).map((_, x) => {
              const cx = 40 + x * 12;
              const cy = 40 + y * 12;
              const d = Math.hypot(cx - 110, cy - 110);
              const carve = Math.hypot(cx - 140, cy - 90) < 65;
              if (d >= 80 || carve) return null;
              return <circle key={`${x}-${y}`} cx={cx} cy={cy} r={2.2} fill="var(--fg-m)" />;
            }),
          )}
        </svg>
      </div>
    );

  if (kind === 'tinta')
    return (
      <div style={box}>
        <div
          style={{
            fontStyle: 'italic',
            fontSize: big ? 140 : 70,
            fontWeight: 400,
            letterSpacing: '-0.05em',
            color: 'var(--fg)',
          }}
        >
          T
        </div>
      </div>
    );

  if (kind === 'desk')
    return (
      <div style={box}>
        <svg width={big ? 120 : 64} height={big ? 120 : 64} viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="var(--br-s)"
            strokeWidth="1"
          />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = ((i * 30 - 90) * Math.PI) / 180;
            const r1 = 70;
            const r2 = i % 3 === 0 ? 60 : 65;
            return (
              <line
                key={i}
                x1={80 + Math.cos(a) * r1}
                y1={80 + Math.sin(a) * r1}
                x2={80 + Math.cos(a) * r2}
                y2={80 + Math.sin(a) * r2}
                stroke="var(--fg-m)"
                strokeWidth={i % 3 === 0 ? 2 : 1}
              />
            );
          })}
          <line
            x1="80"
            y1="80"
            x2="80"
            y2="36"
            stroke="var(--fg)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="80"
            y1="80"
            x2="112"
            y2="80"
            stroke="var(--ac)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="80" cy="80" r="3" fill="var(--fg)" />
        </svg>
      </div>
    );

  if (kind === 'pal')
    return (
      <div
        style={{
          ...box,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          padding: 14,
          gap: 6,
        }}
      >
        {['60% 0.18 30', '72% 0.17 90', '80% 0.17 130', '70% 0.17 200', '65% 0.17 255', '60% 0.19 310'].map(
          (c, i) => (
            <div key={i} style={{ background: `oklch(${c})`, borderRadius: 6, aspectRatio: '1' }} />
          ),
        )}
      </div>
    );

  if (kind === 'kaito')
    return (
      <div
        style={{
          ...box,
          flexDirection: 'column',
          gap: 4,
          padding: 14,
          alignItems: 'flex-start',
          justifyContent: 'center',
          fontFamily: 'var(--font-m)',
          fontSize: big ? 13 : 9,
          color: 'var(--fg-m)',
        }}
      >
        <div>
          <span style={{ color: 'var(--ac)' }}>$</span> kaito init
        </div>
        <div style={{ color: 'var(--fg-d)' }}>&#10003; scaffolded</div>
        <div>
          <span style={{ color: 'var(--ac)' }}>$</span> _
        </div>
      </div>
    );

  return <div style={box} />;
}
