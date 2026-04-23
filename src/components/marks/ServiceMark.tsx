import type { ServiceKind } from '@/types';

interface ServiceMarkProps {
  kind: ServiceKind;
}

export function ServiceMark({ kind }: ServiceMarkProps) {
  const common = { width: 22, height: 22, fill: 'none' as const, stroke: 'currentColor', strokeWidth: 1.6 };

  if (kind === 'web')
    return (
      <svg {...common} viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 8h18M7 12h6M7 16h4" strokeLinecap="round" />
      </svg>
    );

  if (kind === 'droid')
    return (
      <svg {...common} viewBox="0 0 24 24">
        <rect x="6" y="3" width="12" height="18" rx="3" />
        <path d="M10 18h4" strokeLinecap="round" />
        <circle cx="12" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    );

  if (kind === 'ui')
    return (
      <svg {...common} viewBox="0 0 24 24">
        <circle cx="8" cy="8" r="4" />
        <path d="M12 14h8M12 18h5" strokeLinecap="round" />
        <path d="M8 14l4 6" strokeLinecap="round" />
      </svg>
    );

  if (kind === 'desk')
    return (
      <svg {...common} viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="12" rx="1.5" />
        <path d="M9 20h6M12 16v4" strokeLinecap="round" />
      </svg>
    );

  return null;
}
