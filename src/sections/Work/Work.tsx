import { useState } from 'react';
import { ProjectMark } from '@/components/marks/ProjectMark';
import { PROJECTS, PROJECT_CATEGORIES } from '@/data/projects';
import { Writing } from '@/sections/Writing/Writing';
import type { Project } from '@/types';

function ProjMini({ p }: { p: Project }) {
  const [hover, setHover] = useState(false);

  return (
    <article
      className="card"
      style={{
        padding: 'var(--space-3)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        cursor: 'pointer',
        borderColor: hover ? 'var(--ac)' : 'var(--br)',
        transform: hover ? 'translateY(-3px)' : 'none',
        transition: 'transform .2s ease, border-color .2s',
        boxShadow: hover ? '0 6px 24px oklch(50% 0.1 130 / 0.12)' : 'none',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          aspectRatio: '16 / 9',
          borderRadius: 'calc(var(--card-radius) - 4px)',
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
            fontSize: 'var(--fs-15)',
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
          style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-d)', whiteSpace: 'nowrap' }}
        >
          {p.year}
        </span>
      </div>
      <p style={{ fontSize: 'var(--fs-12)', lineHeight: 1.5, margin: 0, color: 'var(--fg-m)' }}>{p.desc}</p>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {p.stack.map((s) => (
          <span
            key={s}
            className="m"
            style={{
              fontSize: 'var(--fs-9)',
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
  const [view, setView] = useState<'projects' | 'writing'>('projects');
  const [filter, setFilter] = useState('All');
  const list = PROJECTS.filter((p) => filter === 'All' || p.cat.includes(filter));

  return (
    <div style={{ padding: 'var(--pad-y) var(--pad-x) var(--pad-b)' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 20,
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            className="m"
            style={{
              fontSize: 'var(--fs-9)',
              color: 'var(--fg-d)',
              letterSpacing: '0.18em',
              marginBottom: 8,
            }}
          >
            02 · WORK
          </div>
          <h2
            className="d"
            style={{ fontSize: 'var(--fs-36)', fontWeight: 500, letterSpacing: '-0.03em', margin: 0 }}
          >
            {view === 'projects' ? 'Portfolio' : 'Writing'}
          </h2>
        </div>
        <div
          role="tablist"
          aria-label="Work view"
          style={{
            display: 'flex',
            gap: 4,
            padding: 3,
            background: 'var(--bg-c)',
            border: '1px solid var(--br)',
            borderRadius: 999,
          }}
        >
          {(['projects', 'writing'] as const).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              className={view === v ? 'accent-surface' : undefined}
              onClick={() => setView(v)}
              style={{
                padding: '6px 16px',
                border: 'none',
                borderRadius: 999,
                background: view === v ? undefined : 'transparent',
                color: view === v ? undefined : 'var(--fg-m)',
                fontFamily: 'var(--font-b)',
                fontSize: 'var(--fs-12)',
                fontWeight: view === v ? 500 : 400,
                cursor: 'pointer',
                transition: 'all .15s',
                textTransform: 'capitalize',
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === 'projects' ? (
        <>
          <div
            style={{
              display: 'flex',
              gap: 4,
              padding: 3,
              background: 'var(--bg-c)',
              border: '1px solid var(--br)',
              borderRadius: 999,
              width: 'fit-content',
              marginBottom: 20,
              flexWrap: 'wrap',
              maxWidth: '100%',
              overflowX: 'auto',
            }}
          >
            {PROJECT_CATEGORIES.map((c) => (
              <button
                key={c}
                className={filter === c ? 'accent-surface' : undefined}
                onClick={() => setFilter(c)}
                style={{
                  padding: '5px 12px',
                  border: 'none',
                  borderRadius: 999,
                  background: filter === c ? undefined : 'transparent',
                  color: filter === c ? undefined : 'var(--fg-m)',
                  fontFamily: 'var(--font-b)',
                  fontSize: 'var(--fs-11)',
                  cursor: 'pointer',
                  transition: 'all .15s',
                  whiteSpace: 'nowrap',
                }}
              >
                {c}
              </button>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 12,
            }}
          >
            {list.slice(0, 6).map((p) => (
              <ProjMini key={p.title} p={p} />
            ))}
          </div>
        </>
      ) : (
        <Writing embedded />
      )}
    </div>
  );
}
