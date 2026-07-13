import { useState } from 'react';
import { ProjectMark } from '@/components/marks/ProjectMark';
import { CardButton } from '@/components/ui/CardButton/CardButton';
import { SectionIntro } from '@/components/ui/SectionIntro/SectionIntro';
import { SegmentedControl } from '@/components/ui/SegmentedControl/SegmentedControl';
import { TagChip } from '@/components/ui/TagChip/TagChip';
import { DEFAULT_PROJECT_DETAIL_MOCK, PROJECT_DETAILS_MOCK } from '@/data/projectDetails.mock';
import { useProjects, PROJECT_CATEGORIES } from '@/data/projects';
import { useT } from '@/i18n/useT';
import { Writing } from '@/sections/Writing/Writing';
import { WorkProjectDetail } from '@/sections/Work/WorkProjectDetail';
import type { Project } from '@/types';

const MAX_VISIBLE_STACK = 3;

interface ProjMiniProps {
  p: Project;
  onOpen: (project: Project) => void;
}

function ProjMini({ p, onOpen }: ProjMiniProps) {
  const visibleStack = p.stack.slice(0, MAX_VISIBLE_STACK);
  const hiddenStackCount = p.stack.length - visibleStack.length;

  return (
    <CardButton
      onActivate={() => onOpen(p)}
      ariaLabel={`Open project detail for ${p.title}`}
      style={{
        padding: 'var(--space-2)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
        <h3
          className="d hover-title"
          style={{ fontSize: 'var(--fs-14)', fontWeight: 500, letterSpacing: '-0.02em', margin: 0 }}
        >
          {p.title}
        </h3>
        <span className="m" style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-d)', whiteSpace: 'nowrap' }}>
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
          <TagChip key={s}>{s}</TagChip>
        ))}
        {hiddenStackCount > 0 && <TagChip>+{hiddenStackCount}</TagChip>}
      </div>
    </CardButton>
  );
}

export function Work() {
  const t = useT();
  const projects = useProjects();
  const [view, setView] = useState<'projects' | 'writing'>('projects');
  const [filter, setFilter] = useState('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const list = projects.filter((p) => filter === 'All' || p.cat.includes(filter));

  return (
    <div style={{ padding: 'var(--pad-y) var(--pad-x) var(--pad-b)' }}>
      <SectionIntro
        kicker={t.work.kicker}
        title={view === 'projects' ? t.work.portfolio : t.work.writing}
        action={
          <SegmentedControl
            options={['projects', 'writing'] as const}
            value={view}
            onChange={setView}
            label="Work view"
            labelFor={(v) => (v === 'projects' ? t.work.viewProjects : t.work.viewWriting)}
          />
        }
      />

      {view === 'projects' ? (
        <div key="projects" className="view-fade">
          <div style={{ marginBottom: 20 }}>
            <SegmentedControl
              options={PROJECT_CATEGORIES}
              value={filter}
              onChange={setFilter}
              label="Project category"
              size="sm"
              labelFor={(c) => (c === 'All' ? t.work.all : c)}
            />
          </div>

          <div
            key={filter}
            className="view-fade"
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
        </div>
      ) : (
        <div key="writing" className="view-fade">
          <Writing embedded />
        </div>
      )}

      {activeProject && (
        <WorkProjectDetail
          key={activeProject.title}
          project={activeProject}
          detail={PROJECT_DETAILS_MOCK[activeProject.title] ?? DEFAULT_PROJECT_DETAIL_MOCK}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
}
