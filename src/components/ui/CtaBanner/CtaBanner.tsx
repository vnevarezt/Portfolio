import type { ReactNode } from 'react';
import styles from './CtaBanner.module.css';

interface CtaBannerProps {
  title: ReactNode;
  sub?: ReactNode;
  /** Actions (buttons, links, or a small form) rendered on the right. */
  children?: ReactNode;
}

export function CtaBanner({ title, sub, children }: CtaBannerProps) {
  return (
    <div className={styles.banner}>
      <div>
        <div className={`d ${styles.title}`}>{title}</div>
        {sub && <div className={styles.sub}>{sub}</div>}
      </div>
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  );
}
