interface PulseDotProps {
  size?: number;
  color?: string;
}

export function PulseDot({ size = 8, color = 'var(--ac)' }: PulseDotProps) {
  return (
    <span
      aria-hidden
      style={{
        position: 'relative',
        display: 'inline-block',
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      <span
        style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color }}
      />
      <span
        style={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          background: color,
          opacity: 0.3,
          animation: 'pulse 1.8s ease-in-out infinite',
        }}
      />
    </span>
  );
}
