import type { ReactNode } from 'react';
import { ContactForm } from '@/components/widgets/ContactForm/ContactForm';
import { FeaturedCard } from '@/components/ui/FeaturedCard/FeaturedCard';
import { Pill } from '@/components/ui/Pill/Pill';
import { CtaBanner } from '@/components/ui/CtaBanner/CtaBanner';
import { SectionIntro, Accent } from '@/components/ui/SectionIntro/SectionIntro';
import {
  ArrowIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  PhoneIcon,
  XIcon,
} from '@/components/icons/Icons';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/data/social';
import { CV_PDF_FILENAME, CV_PDF_PATH } from '@/sections/CV/cv.data';

interface SocialCard {
  icon: ReactNode;
  handle: string;
  cat: string;
  tagline: string;
  hue: number;
  href: string;
}

const SOCIAL_URL = Object.fromEntries(SOCIAL_LINKS.map((s) => [s.name, s.url]));

const SOCIALS: SocialCard[] = [
  {
    icon: <LinkedInIcon size={14} />,
    handle: '@vnevarezt',
    cat: 'LinkedIn',
    tagline: 'Work history & recommendations',
    hue: 245,
    href: SOCIAL_URL.LinkedIn,
  },
  {
    icon: <GitHubIcon size={14} />,
    handle: '@vnevarezt',
    cat: 'GitHub',
    tagline: 'Code, side projects & dotfiles',
    hue: 285,
    href: SOCIAL_URL.GitHub,
  },
  {
    icon: <XIcon size={14} />,
    handle: '@vnevarezt',
    cat: 'X',
    tagline: 'Thinking out loud, occasionally',
    hue: 215,
    href: SOCIAL_URL.X,
  },
];

export function Contact() {
  return (
    <div style={{ padding: 'var(--pad-y) var(--pad-x) var(--pad-b)' }}>
      <SectionIntro
        kicker="04 · LET'S TALK"
        meta="Usually replies in < 24h"
        title={
          <>
            Let's build <Accent>something</Accent>.
          </>
        }
        lede={
          <>
            Freelance, full-time, or just to say hi — I read every message and reply personally
            within <span style={{ color: 'var(--ac)' }}>24h</span>.
          </>
        }
      />

      {/* Featured email card */}
      <FeaturedCard
        hue={130}
        glyph="@"
        href={`mailto:${CONTACT_INFO.email}`}
        ariaLabel={`Email ${CONTACT_INFO.email}`}
        pills={
          <>
            <Pill variant="accent" pulse>
              Available
            </Pill>
            <Pill variant="ghost">Featured</Pill>
          </>
        }
      >
        <Pill hue={130} style={{ alignSelf: 'flex-start' }}>
          Direct Email
        </Pill>
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
          {CONTACT_INFO.email}
        </h3>
        <p style={{ fontSize: 'var(--fs-13)', color: 'var(--fg-m)', lineHeight: 1.6, margin: 0 }}>
          The best way to reach me. I read every email and reply to every real one within 24 hours.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, flexWrap: 'wrap' }}>
          <span className="m" style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-d)' }}>
            GMT−5
          </span>
          <span className="m" style={{ color: 'var(--fg-d)' }}>
            ·
          </span>
          <span className="m" style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-d)' }}>
            Mon–Fri
          </span>
          <span
            style={{
              marginLeft: 'auto',
              color: 'var(--ac)',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 'var(--fs-12)',
            }}
          >
            Send <ArrowIcon size={12} />
          </span>
        </div>
      </FeaturedCard>

      {/* Socials + form, two columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--contact-2col)',
          gap: 14,
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SOCIALS.map((s) => (
            <a
              key={s.cat}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover"
              style={{
                padding: 'var(--space-4) var(--space-5)',
                color: 'var(--fg)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Pill hue={s.hue}>{s.cat}</Pill>
                <span style={{ color: 'var(--fg-d)', display: 'flex' }}>{s.icon}</span>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}
              >
                <h3
                  className="d hover-title"
                  style={{
                    fontSize: 'var(--fs-15)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  {s.handle}
                </h3>
                <span
                  style={{
                    color: 'var(--ac)',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 'var(--fs-11)',
                    flexShrink: 0,
                  }}
                >
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
              style={{
                fontSize: 'var(--fs-9)',
                letterSpacing: '0.18em',
                color: 'var(--fg-d)',
                marginBottom: 4,
                textTransform: 'uppercase',
              }}
            >
              OR WRITE HERE
            </div>
            <div className="d" style={{ fontSize: 'var(--fs-17)', fontWeight: 500, letterSpacing: '-0.02em' }}>
              Tell me what you're <Accent>building</Accent>.
            </div>
          </div>
          <ContactForm />
        </div>
      </div>

      <CtaBanner
        title="Want the full CV or a quick intro call?"
        sub="20-min video chat, no agenda. Perfect if you're exploring options."
      >
        <a
          href={CV_PDF_PATH}
          download={CV_PDF_FILENAME}
          className="btn p"
          style={{ fontSize: 'var(--fs-13)' }}
        >
          Download CV <DownloadIcon size={13} />
        </a>
        <a href="#" className="btn" style={{ fontSize: 'var(--fs-13)' }}>
          Book a call <PhoneIcon size={13} />
        </a>
      </CtaBanner>
    </div>
  );
}
