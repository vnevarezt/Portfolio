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
      <div className="accent-surface" style={{ ...box, background: undefined, color: undefined }}>
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

  if (kind === 'hydro')
    return (
      <div style={{ ...box, background: 'linear-gradient(160deg, oklch(28% 0.06 230), oklch(22% 0.04 220))' }}>
        <svg width={big ? 160 : 96} height={big ? 160 : 96} viewBox="0 0 160 160" aria-hidden>
          <defs>
            <linearGradient id="hydroDrop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(85% 0.12 220)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="oklch(58% 0.16 240)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M 10 ${110 + i * 10} Q 50 ${100 + i * 10}, 80 ${110 + i * 10} T 150 ${110 + i * 10}`}
              fill="none"
              stroke="oklch(75% 0.08 220)"
              strokeOpacity={0.18 + i * 0.06}
              strokeWidth={1}
            />
          ))}
          <path
            d="M 80 30 C 80 30, 50 70, 50 92 A 30 30 0 0 0 110 92 C 110 70, 80 30, 80 30 Z"
            fill="url(#hydroDrop)"
            stroke="oklch(78% 0.1 220)"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <ellipse cx="68" cy="78" rx="6" ry="10" fill="oklch(95% 0.04 220)" opacity="0.5" />
        </svg>
      </div>
    );

  if (kind === 'mine')
    return (
      <div style={{ ...box, background: 'linear-gradient(160deg, oklch(24% 0.05 145), oklch(18% 0.04 150))' }}>
        <svg width={big ? 160 : 96} height={big ? 160 : 96} viewBox="0 0 160 160" aria-hidden>
          <defs>
            <linearGradient id="mineTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(72% 0.18 140)" />
              <stop offset="100%" stopColor="oklch(58% 0.16 140)" />
            </linearGradient>
            <linearGradient id="mineLeft" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(46% 0.07 60)" />
              <stop offset="100%" stopColor="oklch(36% 0.06 60)" />
            </linearGradient>
            <linearGradient id="mineRight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(38% 0.06 60)" />
              <stop offset="100%" stopColor="oklch(30% 0.05 60)" />
            </linearGradient>
          </defs>
          <polygon points="80,30 130,55 80,80 30,55" fill="url(#mineTop)" stroke="oklch(80% 0.1 140)" strokeOpacity="0.3" />
          <polygon points="30,55 80,80 80,130 30,105" fill="url(#mineLeft)" stroke="oklch(50% 0.08 60)" strokeOpacity="0.4" />
          <polygon points="130,55 80,80 80,130 130,105" fill="url(#mineRight)" stroke="oklch(40% 0.06 60)" strokeOpacity="0.4" />
          {[
            [60, 47],
            [80, 57],
            [100, 47],
            [70, 65],
            [90, 65],
          ].map(([cx, cy], i) => (
            <rect key={i} x={cx - 4} y={cy - 4} width="8" height="8" fill="oklch(82% 0.16 140)" opacity="0.35" />
          ))}
        </svg>
      </div>
    );

  if (kind === 'algeb')
    return (
      <div style={{ ...box, background: 'linear-gradient(160deg, oklch(22% 0.04 290), oklch(18% 0.03 280))' }}>
        <svg width={big ? 160 : 110} height={big ? 110 : 78} viewBox="0 0 200 130" aria-hidden>
          <g stroke="oklch(85% 0.15 295)" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M 30 18 L 18 18 L 18 112 L 30 112" />
            <path d="M 170 18 L 182 18 L 182 112 L 170 112" />
          </g>
          <g fontFamily="ui-monospace, Menlo, monospace" fill="oklch(86% 0.14 295)" fontSize={big ? 22 : 18} fontWeight={500}>
            <text x="50" y="48">a</text>
            <text x="92" y="48">b</text>
            <text x="134" y="48">c</text>
            <text x="50" y="78">d</text>
            <text x="92" y="78">e</text>
            <text x="134" y="78">f</text>
            <text x="50" y="108">g</text>
            <text x="92" y="108">h</text>
            <text x="134" y="108">i</text>
          </g>
          <text
            x="100"
            y="20"
            textAnchor="middle"
            fontFamily="var(--font-d)"
            fontSize="11"
            letterSpacing="0.2em"
            fill="oklch(70% 0.06 295)"
          >
            ALGEB
          </text>
        </svg>
      </div>
    );

  if (kind === 'zoop')
    return (
      <div style={{ ...box, background: 'linear-gradient(160deg, oklch(28% 0.08 35), oklch(20% 0.05 25))' }}>
        <svg width={big ? 160 : 96} height={big ? 160 : 96} viewBox="0 0 160 160" aria-hidden>
          <defs>
            <linearGradient id="zoopZ" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(82% 0.18 45)" />
              <stop offset="100%" stopColor="oklch(64% 0.2 30)" />
            </linearGradient>
            <radialGradient id="zoopPin" cx="0.5" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="oklch(92% 0.14 50)" />
              <stop offset="100%" stopColor="oklch(70% 0.2 35)" />
            </radialGradient>
          </defs>
          {[40, 60, 80].map((cy, i) => (
            <circle
              key={cy}
              cx={130}
              cy={cy}
              r={2.4}
              fill="oklch(80% 0.12 40)"
              opacity={0.18 + i * 0.08}
            />
          ))}
          <path
            d="M 38 52 L 110 52 L 50 110 L 122 110"
            fill="none"
            stroke="url(#zoopZ)"
            strokeWidth={big ? 14 : 12}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 118 26 C 118 18, 130 18, 130 26 C 130 34, 124 42, 124 42 C 124 42, 118 34, 118 26 Z"
            fill="url(#zoopPin)"
            stroke="oklch(85% 0.1 40)"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <circle cx="124" cy="26" r="3" fill="oklch(20% 0.04 30)" />
        </svg>
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
