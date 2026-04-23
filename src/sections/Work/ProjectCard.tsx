import { useState, type CSSProperties } from 'react';
import { ProjectMark } from '@/components/marks/ProjectMark';
import { ArrowIcon } from '@/components/icons/Icons';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  big?: boolean;
  style?: CSSProperties;
}

export function ProjectCard({ project, big, style }: ProjectCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <article
      className="card"
      style={{
        ...style,
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        overflow: 'hidden',
        position: 'relative',
        borderColor: hover ? 'var(--ac)' : 'var(--br)',
        transition: 'all .2s',
        transform: hover ? 'translateY(-3px)' : 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          flex: 1,
          borderRadius: 10,
          overflow: 'hidden',
          border: '1px solid var(--br)',
          minHeight: big ? 220 : 90,
          position: 'relative',
          background: 'var(--bg-e)',
        }}
      >
        <ProjectMark kind={project.mark} big={big} />
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            opacity: hover ? 1 : 0,
            transition: 'opacity .2s',
            background: 'var(--ac)',
            color: 'var(--ac-f)',
            width: 30,
            height: 30,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowIcon size={14} />
        </div>
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 8,
          }}
        >
          <div
            className="d"
            style={{
              fontSize: big ? 17 : 14,
              fontWeight: 500,
              letterSpacing: '-0.01em',
              color: hover ? 'var(--ac)' : 'var(--fg)',
              transition: 'color .2s',
            }}
          >
            {project.title}
          </div>
          <span className="m" style={{ fontSize: 10, color: 'var(--fg-d)', whiteSpace: 'nowrap' }}>
            {project.cat} · {project.year}
          </span>
        </div>
        {big && (
          <div style={{ fontSize: 12, color: 'var(--fg-m)', marginTop: 4, lineHeight: 1.5 }}>
            {project.desc}
          </div>
        )}
      </div>
    </article>
  );
}
