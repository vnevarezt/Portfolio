import { useClock } from '@/hooks/useClock';

interface ClockProps {
  compact?: boolean;
}

export function Clock({ compact }: ClockProps) {
  const time = useClock();

  return (
    <span className="m" style={{ fontSize: compact ? 10 : 11, color: 'var(--fg-m)' }}>
      {time} <span style={{ color: 'var(--fg-d)' }}>CET</span>
    </span>
  );
}
