import { Experience } from '@/sections/Experience/Experience';

export function About() {
  return (
    <div style={{ padding: 'var(--pad-y) var(--pad-x) var(--pad-b)' }}>
      <div
        className="m"
        style={{ fontSize: 'var(--fs-9)', color: 'var(--fg-d)', letterSpacing: '0.18em', marginBottom: 16 }}
      >
        01 · ABOUT
      </div>
      <h2
        className="d"
        style={{ fontSize: 'var(--fs-36)', fontWeight: 500, letterSpacing: '-0.03em', margin: '0 0 24px' }}
      >
        About Me
      </h2>

      <p style={{ fontSize: 'var(--fs-17)', lineHeight: 1.6, color: 'var(--fg)', margin: 0, maxWidth: 680 }}>
        I&apos;m <span style={{ color: 'var(--ac)' }}>Vicente</span>, a Computer Engineer focused on
        building useful digital products with clean interfaces, solid architecture, and a clear
        user-first mindset.
      </p>
      <p style={{ fontSize: 'var(--fs-14)', lineHeight: 1.65, marginTop: 14, color: 'var(--fg-m)', maxWidth: 680 }}>
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
        {[
          { t: 'Product Mindset', d: 'Technology decisions based on impact and usability.' },
          { t: 'Mobile, Web & UI Design', d: 'Flutter, React, and polished interface systems with strong UX quality.' },
          { t: 'Backend Engineering', d: 'Node.js, TypeScript, API design, and integrations.' },
          { t: 'Data & Cloud', d: 'Firebase, SQL, and AWS-connected service workflows.' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: 'var(--space-4)' }}>
            <div className="d" style={{ fontSize: 'var(--fs-14)', fontWeight: 500, marginBottom: 4 }}>
              {s.t}
            </div>
            <div style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-m)' }}>{s.d}</div>
          </div>
        ))}
      </div>

      <div
        aria-hidden
        style={{
          margin: '56px 0 40px',
          borderTop: '1px solid var(--br)',
        }}
      />

      <Experience embedded />
    </div>
  );
}
