import { Monogram } from '@/components/marks/Monogram';
import { GitHubIcon, LinkedInIcon, XIcon, MailIcon, ArrowIcon } from '@/components/icons/Icons';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = ['Home', 'About', 'Work', 'Contact'];

const SOCIALS = [
  { icon: <GitHubIcon size={14} />, label: 'GitHub' },
  { icon: <LinkedInIcon size={14} />, label: 'LinkedIn' },
  { icon: <XIcon size={14} />, label: 'X' },
  { icon: <MailIcon size={14} />, label: 'Email' },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside
      style={{
        width: 'var(--sidebar-w)',
        flexShrink: 0,
        borderRight: '1px solid var(--br)',
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        gap: 18,
        overflow: 'auto',
      }}
    >
      {/* Monogram */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
        <Monogram size={96} />
      </div>

      {/* Name + subtitle */}
      <div style={{ textAlign: 'center' }}>
        <div
          className="d"
          style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          Vicente Nevárez
        </div>
        <div style={{ fontSize: 12, color: 'var(--fg-m)', marginTop: 6 }}>
          VicentCodes · Software dev
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--br)' }} />

      {/* Availability */}
      <div
        className="card"
        style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}
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

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => onTabChange(t)}
            style={{
              textAlign: 'left',
              padding: '11px 16px',
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              background: activeTab === t ? 'var(--ac-s)' : 'transparent',
              color: activeTab === t ? 'var(--ac)' : 'var(--fg-m)',
              fontFamily: 'var(--font-b)',
              fontSize: 13,
              fontWeight: activeTab === t ? 500 : 400,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              transition: 'all .15s',
            }}
          >
            <span
              className="m"
              style={{
                fontSize: 9,
                color: activeTab === t ? 'var(--ac)' : 'var(--fg-d)',
                width: 16,
              }}
            >
              0{i + 1}
            </span>
            {t}
          </button>
        ))}
      </nav>

      <div style={{ height: 1, background: 'var(--br)' }} />

      {/* Socials */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href="#"
            title={s.label}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: '1px solid var(--br)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--fg-m)',
              transition: 'all .15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--ac)';
              e.currentTarget.style.borderColor = 'var(--ac)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--fg-m)';
              e.currentTarget.style.borderColor = 'var(--br)';
            }}
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Hire me */}
      <a
        href="mailto:contact@vicentcodes.com"
        className="btn p"
        style={{ justifyContent: 'center', padding: '10px 14px', fontSize: 13 }}
      >
        Hire me <ArrowIcon size={12} />
      </a>

      {/* Footer */}
      <div
        className="m"
        style={{
          fontSize: 9,
          color: 'var(--fg-d)',
          textAlign: 'center',
          letterSpacing: '0.1em',
          marginTop: 'auto',
          paddingTop: 8,
        }}
      >
        VicentCodes · 2026
      </div>
    </aside>
  );
}
