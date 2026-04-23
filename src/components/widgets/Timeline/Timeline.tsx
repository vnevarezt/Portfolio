import type { Experience } from '@/types';

interface TimelineProps {
  items: Experience[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ol style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          left: 7,
          top: 8,
          bottom: 8,
          width: 1,
          background: 'var(--br)',
        }}
      />
      {items.map((item, i) => (
        <li key={i} style={{ paddingLeft: 28, position: 'relative', paddingBottom: 18 }}>
          <span
            style={{
              position: 'absolute',
              left: 3,
              top: 6,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'var(--bg)',
              border: '2px solid var(--ac)',
            }}
          />
          <div
            className="m"
            style={{ fontSize: 10, color: 'var(--ac)', letterSpacing: '0.14em' }}
          >
            {item.time.toUpperCase()}
          </div>
          <div
            className="d"
            style={{ fontSize: 15, fontWeight: 500, marginTop: 4, letterSpacing: '-0.01em' }}
          >
            {item.role}
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-m)', marginTop: 2 }}>{item.org}</div>
          <div
            style={{
              fontSize: 12.5,
              color: 'var(--fg-m)',
              marginTop: 6,
              lineHeight: 1.55,
              textWrap: 'pretty' as never,
            }}
          >
            {item.desc}
          </div>
        </li>
      ))}
    </ol>
  );
}
