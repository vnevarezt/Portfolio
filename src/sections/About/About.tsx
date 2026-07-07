import { SectionIntro } from '@/components/ui/SectionIntro/SectionIntro';
import { Experience } from '@/sections/Experience/Experience';

const HIGHLIGHTS = [
  { title: 'Product Mindset', desc: 'Technology decisions based on impact and usability.' },
  {
    title: 'Mobile, Web & UI Design',
    desc: 'Flutter, React, and polished interface systems with strong UX quality.',
  },
  { title: 'Backend Engineering', desc: 'Node.js, TypeScript, API design, and integrations.' },
  { title: 'Data & Cloud', desc: 'Firebase, SQL, and AWS-connected service workflows.' },
];

export function About() {
  return (
    <div style={{ padding: 'var(--pad-y) var(--pad-x) var(--pad-b)' }}>
      <SectionIntro kicker="01 · ABOUT" title="About Me" />

      <p
        style={{
          fontSize: 'var(--fs-17)',
          lineHeight: 1.6,
          color: 'var(--fg)',
          margin: 0,
          maxWidth: 680,
        }}
      >
        I&apos;m <span style={{ color: 'var(--ac)' }}>Vicente</span>, a Computer Engineer focused on
        building useful digital products with clean interfaces, solid architecture, and a clear
        user-first mindset.
      </p>
      <p
        style={{
          fontSize: 'var(--fs-14)',
          lineHeight: 1.65,
          marginTop: 14,
          color: 'var(--fg-m)',
          maxWidth: 680,
        }}
      >
        I enjoy moving between mobile apps, web platforms, backend APIs, and data-driven features.
        I care about solving real problems, writing maintainable code, and collaborating with teams
        that value ownership, clarity, and continuous learning. I&apos;m especially drawn to crafting
        high-quality interface design that feels clear, consistent, and purposeful.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--about-grid-cols)',
          gap: 12,
          marginTop: 28,
        }}
      >
        {HIGHLIGHTS.map((h) => (
          <div key={h.title} className="card" style={{ padding: 'var(--space-4)' }}>
            <div className="d" style={{ fontSize: 'var(--fs-14)', fontWeight: 500, marginBottom: 4 }}>
              {h.title}
            </div>
            <div style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-m)' }}>{h.desc}</div>
          </div>
        ))}
      </div>

      <div aria-hidden style={{ margin: '56px 0 40px', borderTop: '1px solid var(--br)' }} />

      <Experience embedded />
    </div>
  );
}
