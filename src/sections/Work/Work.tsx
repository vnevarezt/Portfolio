import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { ProjectMark } from '@/components/marks/ProjectMark';
import { PROJECTS, PROJECT_CATEGORIES } from '@/data/projects';
import type { Project } from '@/types';

function ProjMini({ p, delay = 0 }: { p: Project; delay?: number }) {
  const [ref, visible] = useReveal();
  const [hover, setHover] = useState(false);

  return (
    <article
      ref={ref}
      className="card"
      style={{
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        cursor: 'pointer',
        borderColor: hover ? 'var(--ac)' : 'var(--br)',
        opacity: visible ? 1 : 0,
        transform: visible ? (hover ? 'translateY(-3px)' : 'none') : 'translateY(20px)',
        transition: `opacity .6s ${delay}s ease, transform .6s ${delay}s ease, border-color .2s`,
        boxShadow: hover ? '0 6px 24px oklch(50% 0.1 130 / 0.12)' : 'none',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          height: 140,
          borderRadius: 10,
          overflow: 'hidden',
          border: '1px solid var(--br)',
        }}
      >
        <ProjectMark kind={p.mark} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 8,
        }}
      >
        <h3
          className="d"
          style={{
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: '-0.02em',
            margin: 0,
            color: hover ? 'var(--ac)' : 'var(--fg)',
            transition: 'color .2s',
          }}
        >
          {p.title}
        </h3>
        <span
          className="m"
          style={{ fontSize: 10, color: 'var(--fg-d)', whiteSpace: 'nowrap' }}
        >
          {p.year}
        </span>
      </div>
      <p style={{ fontSize: 12, lineHeight: 1.5, margin: 0, color: 'var(--fg-m)' }}>{p.desc}</p>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {p.stack.map((s) => (
          <span
            key={s}
            className="m"
            style={{
              fontSize: 9,
              padding: '2px 7px',
              borderRadius: 4,
              border: '1px solid var(--br)',
              color: 'var(--fg-d)',
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}

export function Work() {
  const [filter, setFilter] = useState('All');
  const list = PROJECTS.filter((p) => filter === 'All' || p.cat.includes(filter));

  return (
    <div style={{ padding: '28px 32px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <div>
          <div
            className="m"
            style={{
              fontSize: 9,
              color: 'var(--fg-d)',
              letterSpacing: '0.18em',
              marginBottom: 8,
            }}
          >
            03 · SELECTED WORK
          </div>
          <h2
            className="d"
            style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.03em', margin: 0 }}
          >
            Portfolio
          </h2>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 4,
            padding: 3,
            background: 'var(--bg-c)',
            border: '1px solid var(--br)',
            borderRadius: 999,
          }}
        >
          {PROJECT_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                padding: '5px 12px',
                border: 'none',
                borderRadius: 999,
                background: filter === c ? 'var(--ac)' : 'transparent',
                color: filter === c ? 'var(--ac-f)' : 'var(--fg-m)',
                fontFamily: 'var(--font-b)',
                fontSize: 11,
                cursor: 'pointer',
                transition: 'all .15s',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {list.slice(0, 6).map((p, i) => (
          <ProjMini key={p.title} p={p} delay={i * 0.04} />
        ))}
      </div>
    </div>
  );
}
