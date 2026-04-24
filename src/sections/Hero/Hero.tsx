import { Clock } from '@/components/widgets/Clock/Clock';
import { ArrowIcon, ChevronRightIcon, DownloadIcon } from '@/components/icons/Icons';
import { HeroMeshBackground } from './mesh/HeroMeshBackground';

interface HeroProps {
  onNavigate?: (tab: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <div
      className="hero-root"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(40px, 7vw, 72px) var(--pad-x)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <HeroMeshBackground />

      {/* Bottom gradient */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(to bottom, transparent, var(--bg))',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Zone 1 — Availability (top) */}
      <div className="hero-avail">
        {/* Pill AVAILABLE — same pattern as Experience NOW + Contact featured */}
        <span
          className="m accent-surface"
          style={{
            fontSize: 'var(--fs-9)',
            padding: '3px 9px',
            borderRadius: 999,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span
            style={{
              position: 'relative',
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--ac-f)',
            }}
          >
            <span
              style={{
                position: 'absolute',
                inset: -4,
                borderRadius: '50%',
                background: 'var(--ac-f)',
                opacity: 0.3,
                animation: 'pulse 1.8s ease-in-out infinite',
              }}
            />
          </span>
          Available
        </span>

        <span
          className="m"
          style={{
            fontSize: 'var(--fs-11)',
            color: 'var(--fg-m)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          Spring 2026 · remote
        </span>

        <span
          className="hero-avail-sep"
          style={{ flex: 1, height: 1, background: 'var(--br)', maxWidth: 180, minWidth: 20 }}
        />
        <Clock />
      </div>

      {/* Zone 2 — Name + subtitle + CTAs (center) */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 'min(820px, 100%)' }}>
        <h1
          className="d"
          style={{
            fontSize: 'var(--fs-hero)',
            fontWeight: 500,
            letterSpacing: '-0.04em',
            lineHeight: 0.93,
            margin: 0,
          }}
        >
          Vicente
          <br />
          Nevárez<span style={{ color: 'var(--ac)' }}>.</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(14px, 1.3vw, 18px)',
            color: 'var(--fg-m)',
            margin: 'clamp(16px, 2.5vw, 24px) 0 0',
            maxWidth: 460,
            lineHeight: 1.55,
          }}
        >
          Developer & interface designer — turning complex ideas into{' '}
          <em style={{ color: 'var(--ac)', fontStyle: 'italic' }}>calm, intuitive software</em>.
        </p>

        <div className="hero-ctas" style={{ marginTop: 'clamp(20px, 3vw, 32px)' }}>
          <button className="btn p" onClick={() => onNavigate?.('Contact')}>
            Get in touch <ArrowIcon size={13} />
          </button>
          <button className="btn" onClick={() => onNavigate?.('Work')}>
            View work <ChevronRightIcon size={13} />
          </button>
          <a href="#" className="btn">
            CV <DownloadIcon size={13} />
          </a>
        </div>
      </div>

      {/* Zone 3 — Spec rail (bottom) */}
      <dl className="hero-spec">
        {(
          [
            ['Based', 'Mexico · remote'],
            ['Focus', 'Web · Android'],
            ['Since', '2018'],
            ['Stack', 'React · Node'],
          ] as const
        ).map(([k, v], i) => (
          <div key={k} className="hero-spec-item">
            <div
              className="hero-spec-head"
              style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}
            >
              <span
                className="m"
                style={{ fontSize: 'var(--fs-9)', color: 'var(--ac)', letterSpacing: '0.12em' }}
              >
                0{i + 1}
              </span>
              <dt
                className="m"
                style={{
                  fontSize: 'var(--fs-9)',
                  color: 'var(--fg-d)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  margin: 0,
                }}
              >
                {k}
              </dt>
            </div>
            <dd className="m" style={{ margin: 0, fontSize: 'var(--fs-12)', color: 'var(--fg-m)' }}>
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
