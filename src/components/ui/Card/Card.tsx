import type { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  hoverable?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function Card({ children, style, className = '', hoverable, onMouseEnter, onMouseLeave }: CardProps) {
  return (
    <div
      className={`card ${className}`}
      style={{
        ...style,
        transition: hoverable ? 'border-color 0.2s, transform 0.2s' : undefined,
        cursor: hoverable ? 'pointer' : undefined,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
