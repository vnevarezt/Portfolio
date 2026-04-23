import type { ReactNode } from 'react';
import styles from './Chip.module.css';

interface ChipProps {
  children: ReactNode;
  dot?: boolean;
}

export function Chip({ children, dot }: ChipProps) {
  return <span className={`${styles.chip} ${dot ? styles.dot : ''}`}>{children}</span>;
}
