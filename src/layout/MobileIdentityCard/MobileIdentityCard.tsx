import { useState } from 'react';
import { Monogram } from '@/components/marks/Monogram';
import { GitHubIcon, LinkedInIcon, XIcon, MailIcon, ArrowIcon } from '@/components/icons/Icons';

const SOCIALS = [
  { icon: <GitHubIcon size={14} />, label: 'GitHub' },
  { icon: <LinkedInIcon size={14} />, label: 'LinkedIn' },
  { icon: <XIcon size={14} />, label: 'X' },
  { icon: <MailIcon size={14} />, label: 'Email' },
];

export function MobileIdentityCard() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'color-mix(in oklab, var(--bg) 88%, transparent)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: 'inset 0 -1px 0 var(--br)',
      }}
    >
      {/* Collapsed row — always visible */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px var(--pad-x)',
          height: 'var(--topbar-h)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--fg)',
        }}
      >
        <Monogram size={34} />
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div
            className="d"
            style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            Vicente Nevárez
          </div>
          <div style={{ fontSize: 10, color: 'var(--fg-m)', marginTop: 1 }}>
            VicentCodes · Software dev
          </div>
        </div>
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            color: 'var(--fg-d)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.25s ease',
            flexShrink: 0,
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Expandable body */}
      <div
        style={{
          maxHeight: open ? 400 : 0,
          overflow: 'hidden',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease',
        }}
      >
        <div
          style={{
            padding: '0 var(--pad-x) 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {/* Availability */}
          <div
            className="card"
            style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <span style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
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
                  animation: 'pulse 1.8s ease-in-out infinite',
                }}
              />
            </span>
            <div style={{ fontSize: 12, lineHeight: 1.3 }}>
              <div style={{ fontWeight: 500 }}>Available for work</div>
              <div className="m" style={{ fontSize: 9, color: 'var(--fg-d)' }}>
                Spring 2026 · remote
              </div>
            </div>
          </div>

          {/* Bottom row: socials + hire me */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  title={s.label}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    border: '1px solid var(--br)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--fg-m)',
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <a
              href="mailto:contact@vicentcodes.com"
              className="btn p"
              style={{ flex: 1, justifyContent: 'center', fontSize: 13 }}
            >
              Hire me <ArrowIcon size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
