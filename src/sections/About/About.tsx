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
        I'm <span style={{ color: 'var(--ac)' }}>Vicente</span> — a.k.a. VicentCodes. Building for
        the web since 2018, with a soft spot for Android, interface design, and the tiny details
        users never notice but always feel.
      </p>
      <p style={{ fontSize: 'var(--fs-14)', lineHeight: 1.65, marginTop: 14, color: 'var(--fg-m)', maxWidth: 680 }}>
        Computer engineering student, freelance developer, and permanent student of good design. My
        goal: turn complex ideas into simple, beautiful, intuitive software.
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
          { t: 'Web Development', d: 'React, Node, Astro.' },
          { t: 'Android Apps', d: 'Kotlin & Compose.' },
          { t: 'Interface Design', d: 'Figma to production.' },
          { t: 'Desktop Tools', d: 'Electron, Tauri.' },
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
