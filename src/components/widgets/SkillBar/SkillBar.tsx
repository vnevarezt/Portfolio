import { useState, useEffect } from 'react';

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

export function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setWidth(level), delay + 120);
    return () => clearTimeout(id);
  }, [level, delay]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 13, color: 'var(--fg)' }}>{name}</span>
        <span className="m" style={{ fontSize: 11, color: 'var(--fg-d)' }}>
          {level}%
        </span>
      </div>
      <div
        style={{
          height: 4,
          background: 'var(--br)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${width}%`,
            height: '100%',
            background: 'var(--ac)',
            borderRadius: 2,
            transition: 'width 1.2s cubic-bezier(.2,.8,.2,1)',
          }}
        />
      </div>
    </div>
  );
}
