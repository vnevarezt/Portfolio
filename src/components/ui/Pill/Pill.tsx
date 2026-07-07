import type { CSSProperties, ReactNode } from 'react';
import { PulseDot } from '@/components/ui/PulseDot/PulseDot';
import styles from './Pill.module.css';

interface PillProps {
  children: ReactNode;
  /** Tint the pill with a hue (category chips). Ignored when a variant is set. */
  hue?: number;
  /** `accent` = solid lime pill, `ghost` = bare mono label. */
  variant?: 'accent' | 'ghost';
  /** Leading live-status dot. */
  pulse?: boolean;
  style?: CSSProperties;
}

export function Pill({ children, hue, variant, pulse, style }: PillProps) {
  const variantClass =
    variant === 'accent'
      ? 'accent-surface'
      : variant === 'ghost'
        ? styles.ghost
        : hue != null
          ? styles.hue
          : '';

  const pillStyle: CSSProperties | undefined =
    hue != null && !variant ? ({ ...style, '--pill-hue': hue } as CSSProperties) : style;

  return (
    <span className={`m ${styles.pill} ${variantClass}`} style={pillStyle}>
      {pulse && <PulseDot size={6} color={variant === 'accent' ? 'var(--ac-f)' : 'var(--ac)'} />}
      {children}
    </span>
  );
}
