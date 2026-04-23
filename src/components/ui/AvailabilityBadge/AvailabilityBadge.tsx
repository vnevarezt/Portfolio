import styles from './AvailabilityBadge.module.css';

export function AvailabilityBadge() {
  return (
    <div className={`card ${styles.badge}`}>
      <span className={styles.dotWrapper}>
        <span className={styles.dot} />
        <span className={styles.pulse} />
      </span>
      <div style={{ fontSize: 12, lineHeight: 1.3 }}>
        <div style={{ color: 'var(--fg)', fontWeight: 500 }}>Available for work</div>
        <div className="m" style={{ color: 'var(--fg-d)', fontSize: 10 }}>
          Spring 2026 · remote
        </div>
      </div>
    </div>
  );
}
