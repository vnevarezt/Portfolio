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
        padding: '72px 40px',
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

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 820 }}>
        {/* Availability row */}
        <div
          className="hl"
          style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}
        >
          <span style={{ position: 'relative', display: 'flex', width: 10, height: 10 }}>
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
              fontSize: 11,
              color: 'var(--fg-m)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
            }}
          >
            Available for work · Spring 2026
          </span>
          <span style={{ flex: 1, height: 1, background: 'var(--br)', maxWidth: 180 }} />
          <Clock />
        </div>

        {/* Name */}
        <h1
          className="d hl"
          style={{
            fontSize: 'clamp(56px, 8vw, 120px)',
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
            fontSize: 'clamp(15px, 1.3vw, 18px)',
            color: 'var(--fg-m)',
            margin: '24px 0 0',
            maxWidth: 460,
            lineHeight: 1.55,
          }}
        >
          Developer & interface designer — turning complex ideas into{' '}
          <span style={{ color: 'var(--fg)' }}>calm, intuitive software</span>.
        </p>

        {/* CTA buttons */}
        <div className="hl" style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
          <button
            className="btn p"
            onClick={() => onNavigate?.('Contact')}
            style={{ padding: '12px 22px' }}
          >
            Get in touch <ArrowIcon size={13} />
          </button>
          <button
            className="btn"
            onClick={() => onNavigate?.('Work')}
            style={{ padding: '12px 22px' }}
          >
            View work <ChevronRightIcon size={13} />
          </button>
          <a href="#" className="btn" style={{ padding: '12px 18px' }}>
            CV <DownloadIcon size={13} />
          </a>
        </div>

        {/* Spec rail */}
        <dl
          className="hl"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, auto)',
            gap: '0 40px',
            marginTop: 52,
            paddingTop: 22,
            borderTop: '1px solid var(--br)',
            width: 'fit-content',
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
                  fontSize: 9,
                  color: 'var(--fg-d)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  marginBottom: 4,
                }}
              >
                {k}
              </dt>
              <dd className="m" style={{ margin: 0, fontSize: 12, color: 'var(--fg-m)' }}>
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
