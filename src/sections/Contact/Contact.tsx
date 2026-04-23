import { useState } from 'react';
import { ContactForm } from '@/components/widgets/ContactForm/ContactForm';
import {
  MailIcon,
  LinkedInIcon,
  XIcon,
  GitHubIcon,
  ArrowIcon,
  DownloadIcon,
} from '@/components/icons/Icons';

const LINKS = [
  { icon: <MailIcon size={14} />, label: 'contact@vicentcodes.com', sub: 'EMAIL' },
  { icon: <LinkedInIcon size={14} />, label: 'linkedin.com/in/vicentcodes', sub: 'LINKEDIN' },
  { icon: <XIcon size={14} />, label: '@VicentCodes', sub: 'X' },
  { icon: <GitHubIcon size={14} />, label: 'github.com/vicentcodes', sub: 'GITHUB' },
];

function CLink({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="#"
      style={{
        padding: '11px 13px',
        borderRadius: 11,
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        border: `1px solid ${hover ? 'var(--ac)' : 'var(--br)'}`,
        background: hover ? 'var(--ac-s)' : 'var(--bg-c)',
        color: 'var(--fg)',
        textDecoration: 'none',
        transition: 'all .15s',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          flexShrink: 0,
          background: 'var(--ac-s)',
          color: 'var(--ac)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
        <div
          className="m"
          style={{
            fontSize: 9,
            color: 'var(--fg-d)',
            letterSpacing: '0.12em',
            marginTop: 1,
          }}
        >
          {sub}
        </div>
      </div>
      <ArrowIcon size={11} />
    </a>
  );
}

export function Contact() {
  return (
    <div style={{ padding: '28px 32px' }}>
      <div
        className="m"
        style={{ fontSize: 9, color: 'var(--fg-d)', letterSpacing: '0.18em', marginBottom: 16 }}
      >
        05 · LET'S TALK
      </div>
      <h2
        className="d"
        style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.03em', margin: '0 0 8px' }}
      >
        Contact
      </h2>
      <p style={{ fontSize: 14, color: 'var(--fg-m)', margin: '0 0 24px', lineHeight: 1.6 }}>
        Available for freelance. Reply within{' '}
        <span style={{ color: 'var(--ac)' }}>24h</span>.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {LINKS.map((c, i) => (
            <CLink key={i} {...c} />
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <a
              href="mailto:contact@vicentcodes.com"
              className="btn p"
              style={{ padding: '11px 18px', fontSize: 13 }}
            >
              Start a project <ArrowIcon size={13} />
            </a>
            <a href="#" className="btn" style={{ padding: '11px 18px', fontSize: 13 }}>
              CV <DownloadIcon size={13} />
            </a>
          </div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
