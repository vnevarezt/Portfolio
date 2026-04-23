import type { ReactNode } from 'react';

interface SectionHeaderProps {
  kicker: string;
  title: string;
  action?: ReactNode;
}

export function SectionHeader({ kicker, title, action }: SectionHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      <div>
        <div
          className="m"
          style={{
            fontSize: 10,
            color: 'var(--fg-d)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          {kicker}
        </div>
        <h2
          className="d"
          style={{
            fontSize: 30,
            fontWeight: 500,
            margin: '4px 0 0',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          {title}
        </h2>
        <div
          style={{
            width: 40,
            height: 2,
            background: 'var(--ac)',
            marginTop: 10,
            borderRadius: 2,
          }}
        />
      </div>
      {action}
    </div>
  );
}
