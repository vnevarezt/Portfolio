const TABS = ['Home', 'About', 'Work', 'Experience', 'Writing', 'Contact'];

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileBottomNav({ activeTab, onTabChange }: MobileBottomNavProps) {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        height: 'calc(var(--bottomnav-h) + env(safe-area-inset-bottom, 0px))',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        display: 'flex',
        alignItems: 'stretch',
        background: 'color-mix(in oklab, var(--bg) 88%, transparent)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderTop: '1px solid var(--br)',
      }}
    >
      {TABS.map((tab, i) => {
        const active = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '6px 0',
              color: active ? 'var(--ac)' : 'var(--fg-d)',
              transition: 'color 0.15s',
            }}
          >
            <span
              className="m"
              style={{
                fontSize: 9,
                letterSpacing: '0.08em',
                lineHeight: 1,
              }}
            >
              0{i + 1}
            </span>
            <span
              style={{
                fontSize: 9,
                fontWeight: active ? 500 : 400,
                lineHeight: 1,
              }}
            >
              {tab}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
