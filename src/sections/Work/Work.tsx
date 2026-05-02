import { useState } from 'react';
import { ProjectMark } from '@/components/marks/ProjectMark';
import { DEFAULT_PROJECT_DETAIL_MOCK, PROJECT_DETAILS_MOCK } from '@/data/projectDetails.mock';
import { PROJECTS, PROJECT_CATEGORIES } from '@/data/projects';
import { Writing } from '@/sections/Writing/Writing';
import { WorkProjectDetail } from '@/sections/Work/WorkProjectDetail';
import type { Project } from '@/types';

interface ProjMiniProps {
  p: Project;
  onOpen: (project: Project) => void;
}

function ProjMini({ p, onOpen }: ProjMiniProps) {
  const [hover, setHover] = useState(false);
  const visibleStack = p.stack.slice(0, 3);
  const hiddenStackCount = Math.max(p.stack.length - visibleStack.length, 0);

  return (
    <article
      className="card"
      style={{
        padding: 'var(--space-2)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        cursor: 'pointer',
        borderColor: hover ? 'var(--ac)' : 'var(--br)',
        transform: hover ? 'translateY(-2px)' : 'none',
        transition: 'transform .2s ease, border-color .2s',
        boxShadow: hover ? '0 5px 18px oklch(50% 0.1 130 / 0.1)' : 'none',
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open project detail for ${p.title}`}
      onClick={() => onOpen(p)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen(p);
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          aspectRatio: '2 / 1',
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
            fontSize: 'var(--fs-14)',
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
      <p
        style={{
          fontSize: 'var(--fs-12)',
          lineHeight: 1.45,
          margin: 0,
          color: 'var(--fg-m)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {p.desc}
      </p>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {visibleStack.map((s) => (
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
        {hiddenStackCount > 0 && (
          <span
            className="m"
            style={{
              fontSize: 'var(--fs-9)',
              padding: '2px 7px',
              borderRadius: 4,
              border: '1px solid var(--br)',
              color: 'var(--fg-d)',
            }}
          >
            +{hiddenStackCount}
          </span>
        )}
      </div>
    </article>
  );
}

export function Work() {
  const [view, setView] = useState<'projects' | 'writing'>('projects');
  const [filter, setFilter] = useState('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 10,
            }}
          >
            {list.slice(0, 6).map((p) => (
              <ProjMini key={p.title} p={p} onOpen={setActiveProject} />
            ))}
          </div>
        </>
      ) : (
        <Writing embedded />
      )}

      {activeProject && (
        <WorkProjectDetail
          project={activeProject}
          detail={PROJECT_DETAILS_MOCK[activeProject.title] ?? DEFAULT_PROJECT_DETAIL_MOCK}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
}
