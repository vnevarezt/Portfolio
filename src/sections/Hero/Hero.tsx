import { Clock } from '@/components/widgets/Clock/Clock';
import { ArrowIcon, ChevronRightIcon, DownloadIcon } from '@/components/icons/Icons';
import { HeroMeshBackground } from './mesh/HeroMeshBackground';

interface HeroProps {
  onNavigate?: (tab: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <div
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 'min(820px, 100%)' }}>
        {/* Availability row */}
        <div
          className="hl"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 'clamp(24px, 4vw, 40px)',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ position: 'relative', display: 'flex', width: 10, height: 10, flexShrink: 0 }}>
            <span
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'var(--ac)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                inset: -4,
                borderRadius: '50%',
                background: 'var(--ac)',
                opacity: 0.3,
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
          </span>
          <span
            className="m"
            style={{
              fontSize: 'var(--fs-11)',
              color: 'var(--fg-m)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
            }}
          >
            Available for work · Spring 2026
          </span>
          <span style={{ flex: 1, height: 1, background: 'var(--br)', maxWidth: 180, minWidth: 20 }} />
          <Clock />
        </div>

        {/* Name */}
        <h1
          className="d hl"
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

        {/* Subtitle */}
        <p
          className="hl"
          style={{
            fontSize: 'clamp(14px, 1.3vw, 18px)',
            color: 'var(--fg-m)',
            margin: 'clamp(16px, 2.5vw, 24px) 0 0',
            maxWidth: 460,
            lineHeight: 1.55,
          }}
        >
          Developer & interface designer — turning complex ideas into{' '}
          <span style={{ color: 'var(--fg)' }}>calm, intuitive software</span>.
        </p>

        {/* CTA buttons */}
        <div className="hl" style={{ display: 'flex', gap: 10, marginTop: 'clamp(20px, 3vw, 32px)', flexWrap: 'wrap' }}>
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

        {/* Spec rail */}
        <dl
          className="hl"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(14px, 2vw, 22px) clamp(20px, 4vw, 40px)',
            marginTop: 'clamp(32px, 5vw, 52px)',
            paddingTop: 'clamp(14px, 2vw, 22px)',
            borderTop: '1px solid var(--br)',
          }}
        >
          {(
            [
              ['Based', 'Spain · remote'],
              ['Focus', 'Web · Android'],
              ['Since', '2018'],
              ['Stack', 'React · Node'],
            ] as const
          ).map(([k, v]) => (
            <div key={k}>
              <dt
                className="m"
                style={{
                  fontSize: 'var(--fs-9)',
                  color: 'var(--fg-d)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  marginBottom: 4,
                }}
              >
                {k}
              </dt>
              <dd className="m" style={{ margin: 0, fontSize: 'var(--fs-12)', color: 'var(--fg-m)' }}>
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
