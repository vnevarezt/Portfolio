import type { ReactNode } from 'react';
import styles from './SectionIntro.module.css';

interface SectionIntroProps {
  /** Mono eyebrow, e.g. "01 · ABOUT". */
  kicker?: string;
  /** Optional mono label on the right of the kicker row. */
  meta?: ReactNode;
  title: ReactNode;
  /** Optional control rendered to the right of the title (e.g. a view toggle). */
  action?: ReactNode;
  /** Optional intro paragraph under the title. */
  lede?: ReactNode;
}

/** Accent word inside a section title: <Accent>something</Accent>. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className={styles.accent}>{children}</em>;
}

export function SectionIntro({ kicker, meta, title, action, lede }: SectionIntroProps) {
  return (
    <header className={styles.root}>
      {(kicker || meta) && (
        <div className={styles.kickerRow}>
          {kicker && <span className={`m ${styles.kicker}`}>{kicker}</span>}
          {meta && <span className={`m ${styles.meta}`}>{meta}</span>}
        </div>
      )}
      <div className={styles.titleRow}>
        <h2 className={`d ${styles.title}`}>{title}</h2>
        {action}
      </div>
      {lede && <p className={styles.lede}>{lede}</p>}
    </header>
  );
}
