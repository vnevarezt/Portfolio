import type { ReactNode } from 'react';

export function SubHead({ children }: { children: ReactNode }) {
  return (
    <h3
      className="d"
      style={{
        fontSize: 20,
        fontWeight: 500,
        margin: 0,
        letterSpacing: '-0.02em',
        display: 'flex',
        alignItems: 'baseline',
        gap: 10,
      }}
    >
      {children}
      <span style={{ flex: 1, height: 1, background: 'var(--br)' }} />
    </h3>
  );
}
