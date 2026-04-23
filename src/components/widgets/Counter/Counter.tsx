import { useCounter } from '@/hooks/useCounter';

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
}

export function Counter({ to, suffix = '', duration }: CounterProps) {
  const value = useCounter(to, duration);
  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}
