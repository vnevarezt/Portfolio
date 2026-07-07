import { Monogram } from '@/components/marks/Monogram';
import { GitHubIcon, LinkedInIcon, XIcon, MailIcon, ArrowIcon } from '@/components/icons/Icons';
import { PulseDot } from '@/components/ui/PulseDot/PulseDot';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/data/social';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = ['Home', 'About', 'Work', 'Contact'];

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  GitHub: <GitHubIcon size={14} />,
  LinkedIn: <LinkedInIcon size={14} />,
  X: <XIcon size={14} />,
};

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
          style={{ fontSize: 'var(--fs-22)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          Vicente Nevárez
        </div>
        <div style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-m)', marginTop: 6 }}>
          vnevarezt · Software dev
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--br)' }} />

      {/* Availability */}
      <div
        className="card"
        style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}
      >
        <PulseDot />
        <div style={{ fontSize: 'var(--fs-12)', lineHeight: 1.3 }}>
          <div style={{ fontWeight: 500 }}>Available for work</div>
          <div className="m" style={{ fontSize: 'var(--fs-9)', color: 'var(--fg-d)' }}>
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
            aria-current={activeTab === t ? 'page' : undefined}
            style={{
              textAlign: 'left',
              padding: '11px 16px',
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              background: activeTab === t ? 'var(--ac-s)' : 'transparent',
              color: activeTab === t ? 'var(--ac)' : 'var(--fg-m)',
              fontFamily: 'var(--font-b)',
              fontSize: 'var(--fs-13)',
              fontWeight: activeTab === t ? 500 : 400,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              transition: 'background-color .15s ease, color .15s ease',
            }}
          >
            <span
              className="m"
              style={{
                fontSize: 'var(--fs-9)',
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
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.name}
            href={s.url}
            title={s.name}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-social"
          >
            {SOCIAL_ICONS[s.name]}
          </a>
        ))}
        <a href={`mailto:${CONTACT_INFO.email}`} title="Email" className="icon-social">
          <MailIcon size={14} />
        </a>
      </div>

      {/* Hire me */}
      <a
        href={`mailto:${CONTACT_INFO.email}`}
        className="btn p"
        style={{ justifyContent: 'center', padding: '10px 14px', fontSize: 'var(--fs-13)' }}
      >
        Hire me <ArrowIcon size={12} />
      </a>

      {/* Footer */}
      <div
        className="m"
        style={{
          fontSize: 'var(--fs-9)',
          color: 'var(--fg-d)',
          textAlign: 'center',
          letterSpacing: '0.1em',
          marginTop: 'auto',
          paddingTop: 8,
        }}
      >
        vnevarezt · 2026
      </div>
    </aside>
  );
}
