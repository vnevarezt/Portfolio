import styles from './Monogram.module.css';

interface MonogramProps {
  size?: number;
}

export function Monogram({ size = 120 }: MonogramProps) {
  return (
    <div
      className={styles.root}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
      }}
    >
      <div className={styles.gradient} />
      <div className={styles.inner} style={{ borderRadius: size * 0.22 }} />
      <div
        className={`d ${styles.letters}`}
        style={{ fontSize: size * 0.44 }}
      >
        <span style={{ color: 'var(--fg)' }}>V</span>
        <span style={{ color: 'var(--ac)', marginLeft: '-0.12em' }}>N</span>
      </div>
    </div>
  );
}
