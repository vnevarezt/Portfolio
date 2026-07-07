import type { ReactNode } from 'react';
import styles from './TagChip.module.css';

export function TagChip({ children }: { children: ReactNode }) {
  return <span className={`m ${styles.tag}`}>{children}</span>;
}
