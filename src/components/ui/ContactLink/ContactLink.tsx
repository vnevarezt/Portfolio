import { useState, type ReactNode } from 'react';
import { ArrowIcon } from '@/components/icons/Icons';

interface ContactLinkProps {
  icon: ReactNode;
  label: string;
  sub: string;
  href?: string;
}

export function ContactLink({ icon, label, sub, href = '#' }: ContactLinkProps) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={href}
      style={{
        padding: '10px 12px',
        borderRadius: 10,
        border: '1px solid var(--border)',
        background: hover ? 'var(--ac-s)' : 'var(--bg-c)',
        borderColor: hover ? 'var(--ac)' : 'var(--br)',
        textDecoration: 'none',
        color: 'var(--fg)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
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
          background: 'var(--ac-s)',
          color: 'var(--ac)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13 }}>{label}</div>
        <div
          className="m"
          style={{
            fontSize: 10,
            color: 'var(--fg-d)',
            letterSpacing: '0.1em',
            marginTop: 1,
          }}
        >
          {sub.toUpperCase()}
        </div>
      </div>
      <ArrowIcon size={13} />
    </a>
  );
}
