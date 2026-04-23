import type { PostMarkKind } from '@/types';

interface PostMarkProps {
  kind: PostMarkKind;
}

export function PostMark({ kind }: PostMarkProps) {
  if (kind === 'oklch')
    return (
      <div
        style={{
          width: 80,
          height: 20,
          borderRadius: 10,
          background:
            'linear-gradient(90deg, oklch(70% 0.17 30), oklch(80% 0.17 130), oklch(70% 0.17 255), oklch(60% 0.19 310))',
        }}
      />
    );

  if (kind === '2fa')
    return (
      <div className="m" style={{ fontSize: 28, letterSpacing: '0.1em', color: 'var(--fg-d)' }}>
        &#8226;&#8226;&#8226; &#8226;&#8226;&#8226;
      </div>
    );

  if (kind === 'android')
    return (
      <div
        style={{
          width: 36,
          height: 56,
          borderRadius: 8,
          border: '2px solid var(--fg-m)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: 4,
        }}
      >
        <div style={{ width: '100%', height: 4, borderRadius: 2, background: 'var(--ac)' }} />
      </div>
    );

  if (kind === 'auth')
    return (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--fg-m)" strokeWidth="1.4">
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 018 0v4" />
      </svg>
    );

  return null;
}
