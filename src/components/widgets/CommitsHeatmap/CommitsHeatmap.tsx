import { useMemo } from 'react';
import { Counter } from '@/components/widgets/Counter/Counter';

export function CommitsHeatmap() {
  const data = useMemo(() => {
    const arr: number[] = [];
    const seeds: number[] = [42];
    for (let i = 0; i < 12 * 7; i++) {
      seeds.push((seeds[i] * 1103515245 + 12345) % 2147483647);
      const v = seeds[i + 1] / 2147483647;
      arr.push(v < 0.3 ? 0 : v < 0.55 ? 1 : v < 0.78 ? 2 : v < 0.92 ? 3 : 4);
    }
    return arr;
  }, []);

  return (
    <div
      className="card"
      style={{
        padding: 'var(--space-4)',
        marginTop: 14,
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ minWidth: 120 }}>
        <div
          className="m"
          style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-d)', letterSpacing: '0.14em' }}
        >
          LAST 12 WEEKS
        </div>
        <div
          className="d"
          style={{
            fontSize: 'var(--fs-28)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            marginTop: 4,
          }}
        >
          <Counter to={347} /> commits
        </div>
        <div style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-m)', marginTop: 4 }}>
          across 8 repos ·{' '}
          <span style={{ color: 'var(--ac)' }}>+24%</span> vs. last quarter
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'repeat(7, 1fr)',
          gap: 3,
          gridAutoFlow: 'column',
          flex: '1 1 160px',
          minHeight: 64,
          maxHeight: 84,
        }}
      >
        {data.map((lvl, i) => (
          <div
            key={i}
            style={{
              width: '100%',
              aspectRatio: '1',
              borderRadius: 2,
              background:
                lvl === 0
                  ? 'var(--br)'
                  : `color-mix(in oklab, var(--ac) ${lvl * 25}%, var(--bg-e))`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
