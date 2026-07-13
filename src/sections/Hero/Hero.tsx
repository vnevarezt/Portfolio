import { Clock } from '@/components/widgets/Clock/Clock';
import { ArrowIcon, ChevronRightIcon, DownloadIcon } from '@/components/icons/Icons';
import { Pill } from '@/components/ui/Pill/Pill';
import { useT } from '@/i18n/useT';
import { HeroMeshBackground } from './mesh/HeroMeshBackground';

interface HeroProps {
  onNavigate?: (tab: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const t = useT();
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
        <Pill variant="accent" pulse>
          {t.common.available}
        </Pill>

        <span
          className="m"
          style={{
            fontSize: 'var(--fs-11)',
            color: 'var(--fg-m)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          {t.common.availabilityNote}
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
          {t.hero.taglinePre}
          <em style={{ color: 'var(--ac)', fontStyle: 'italic' }}>{t.hero.taglineAccent}</em>
          {t.hero.taglinePost}
        </p>

        <div className="hero-ctas" style={{ marginTop: 'clamp(20px, 3vw, 32px)' }}>
          <button className="btn p" onClick={() => onNavigate?.('Contact')}>
            {t.hero.getInTouch} <ArrowIcon size={13} />
          </button>
          <button className="btn" onClick={() => onNavigate?.('Work')}>
            {t.hero.viewWork} <ChevronRightIcon size={13} />
          </button>
          <a href="/cv" className="btn">
            {t.common.cv} <DownloadIcon size={13} />
          </a>
        </div>
      </div>

      {/* Zone 3 — Spec rail (bottom) */}
      <dl className="hero-spec">
        {(
          [
            [t.hero.spec.based, t.hero.specValues.based],
            [t.hero.spec.focus, t.hero.specValues.focus],
            [t.hero.spec.since, t.hero.specValues.since],
            [t.hero.spec.stack, t.hero.specValues.stack],
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
