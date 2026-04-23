import { ContactForm } from '@/components/widgets/ContactForm/ContactForm';
import {
  ArrowIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  PhoneIcon,
  XIcon,
} from '@/components/icons/Icons';

const SOCIALS = [
  {
    icon: <LinkedInIcon size={14} />,
    label: 'linkedin.com/in/vicentcodes',
    handle: '@vicentcodes',
    cat: 'LinkedIn',
    tagline: 'Work history & recommendations',
    hue: 245,
    href: '#',
  },
  {
    icon: <GitHubIcon size={14} />,
    label: 'github.com/vicentcodes',
    handle: '@vicentcodes',
    cat: 'GitHub',
    tagline: 'Code, side projects & dotfiles',
    hue: 285,
    href: '#',
  },
  {
    icon: <XIcon size={14} />,
    label: 'x.com/VicentCodes',
    handle: '@VicentCodes',
    cat: 'X',
    tagline: 'Thinking out loud, occasionally',
    hue: 215,
    href: '#',
  },
];

const EMAIL = 'contact@vicentcodes.com';

export function Contact() {
  return (
    <div style={{ padding: 'var(--pad-y) var(--pad-x) var(--pad-b)', maxWidth: 'min(960px, 100%)' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 6,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div className="m" style={{ fontSize: 'var(--fs-9)', color: 'var(--fg-d)', letterSpacing: '0.18em' }}>
          05 · LET'S TALK
        </div>
        <div className="m" style={{ fontSize: 'var(--fs-9)', color: 'var(--fg-d)', letterSpacing: '0.1em' }}>
          Usually replies in &lt; 24h
        </div>
      </div>
      <h2
        className="d"
        style={{ fontSize: 'var(--fs-36)', fontWeight: 500, letterSpacing: '-0.035em', margin: '0 0 8px' }}
      >
        Let's build <em style={{ color: 'var(--ac)', fontStyle: 'italic' }}>something</em>.
      </h2>
      <p
        style={{
          fontSize: 'var(--fs-14)',
          color: 'var(--fg-m)',
          margin: '0 0 24px',
          lineHeight: 1.55,
          maxWidth: 560,
        }}
      >
        Freelance, full-time, or just to say hi — I read every message and reply personally within{' '}
        <span style={{ color: 'var(--ac)' }}>24h</span>.
      </p>

      {/* Featured email card */}
      <a
        href={`mailto:${EMAIL}`}
        className="card featured-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--featured-cols)',
          gap: 0,
          overflow: 'hidden',
          textDecoration: 'none',
          color: 'var(--fg)',
          marginBottom: 14,
          transition: 'border-color .2s, transform .2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--ac)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--br)';
          e.currentTarget.style.transform = '';
        }}
      >
        <div
          className="gbg featured-deco"
          style={{
            position: 'relative',
            minHeight: 220,
            background: 'oklch(25% 0.08 130 / 0.35)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 22,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 30% 30%, oklch(60% 0.2 130 / 0.18), transparent 60%)',
            }}
          />
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
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
                  background: 'var(--ac)',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    inset: -4,
                    borderRadius: '50%',
                    background: 'var(--ac)',
                    opacity: 0.25,
                    animation: 'pulse 1.8s ease-in-out infinite',
                  }}
                />
              </span>
              Available
            </span>
            <span
              className="m"
              style={{
                fontSize: 'var(--fs-9)',
                color: 'var(--fg-d)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              Featured
            </span>
          </div>
          <div
            className="featured-quote"
            style={{
              position: 'relative',
              fontSize: 88,
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
              fontFamily: 'var(--font-d)',
              fontWeight: 500,
              color: 'oklch(82% 0.17 130 / 0.9)',
              fontStyle: 'italic',
            }}
          >
            @
          </div>
        </div>
        <div
          style={{
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <span
            className="m"
            style={{
              fontSize: 'var(--fs-9)',
              padding: '3px 9px',
              borderRadius: 999,
              background: 'oklch(70% 0.18 130 / 0.18)',
              color: 'oklch(85% 0.15 130)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              alignSelf: 'flex-start',
            }}
          >
            Direct Email
          </span>
          <h3
            className="d"
            style={{
              fontSize: 'var(--fs-22)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              margin: 0,
              wordBreak: 'break-all',
            }}
          >
            {EMAIL}
          </h3>
          <p style={{ fontSize: 'var(--fs-13)', color: 'var(--fg-m)', lineHeight: 1.6, margin: 0 }}>
            The best way to reach me. I read every email and reply to every real one within 24 hours.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, flexWrap: 'wrap' }}>
            <span className="m" style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-d)' }}>GMT−5</span>
            <span className="m" style={{ color: 'var(--fg-d)' }}>·</span>
            <span className="m" style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-d)' }}>Mon–Fri</span>
            <span
              style={{
                marginLeft: 'auto',
                color: 'var(--ac)',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 12,
              }}
            >
              Send <ArrowIcon size={12} />
            </span>
          </div>
        </div>
      </a>

      {/* Sociales + Form en 2 columnas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--contact-2col)',
          gap: 14,
          alignItems: 'start',
        }}
      >
        {/* Social stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SOCIALS.map((s) => (
            <a
              key={s.cat}
              href={s.href}
              className="card"
              style={{
                padding: 'var(--space-4) var(--space-5)',
                textDecoration: 'none',
                color: 'var(--fg)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                transition: 'border-color .2s, transform .2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--ac)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--br)';
                e.currentTarget.style.transform = '';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  className="m"
                  style={{
                    fontSize: 'var(--fs-9)',
                    padding: '3px 8px',
                    borderRadius: 999,
                    background: `oklch(70% 0.18 ${s.hue} / 0.14)`,
                    color: `oklch(78% 0.15 ${s.hue})`,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {s.cat}
                </span>
                <span style={{ color: 'var(--fg-d)', display: 'flex' }}>{s.icon}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                <h3
                  className="d"
                  style={{ fontSize: 'var(--fs-15)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.3, margin: 0 }}
                >
                  {s.handle}
                </h3>
                <span style={{ color: 'var(--ac)', display: 'flex', alignItems: 'center', fontSize: 11, flexShrink: 0 }}>
                  <ArrowIcon size={11} />
                </span>
              </div>
              <p style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-m)', lineHeight: 1.5, margin: 0 }}>
                {s.tagline}
              </p>
            </a>
          ))}
        </div>

        {/* Form card */}
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <div style={{ marginBottom: 14 }}>
            <div
              className="m"
              style={{ fontSize: 'var(--fs-9)', letterSpacing: '0.18em', color: 'var(--fg-d)', marginBottom: 4 }}
            >
              OR WRITE HERE
            </div>
            <div className="d" style={{ fontSize: 'var(--fs-17)', fontWeight: 500, letterSpacing: '-0.02em' }}>
              Tell me what you're{' '}
              <em style={{ color: 'var(--ac)', fontStyle: 'italic' }}>building</em>.
            </div>
          </div>
          <ContactForm />
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          marginTop: 36,
          padding: 'var(--space-5) var(--space-6)',
          border: '1px dashed var(--br-s)',
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div className="d" style={{ fontSize: 'var(--fs-15)', fontWeight: 500 }}>
            Want the full CV or a quick intro call?
          </div>
          <div style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-m)', marginTop: 2 }}>
            20-min video chat, no agenda. Perfect if you're exploring options.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a href="#" className="btn p" style={{ fontSize: 'var(--fs-13)' }}>
            Download CV <DownloadIcon size={13} />
          </a>
          <a href="#" className="btn" style={{ fontSize: 'var(--fs-13)' }}>
            Book a call <PhoneIcon size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
