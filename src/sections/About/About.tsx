export function About() {
  return (
    <div style={{ padding: '28px 32px', maxWidth: 720 }}>
      <div
        className="m"
        style={{ fontSize: 9, color: 'var(--fg-d)', letterSpacing: '0.18em', marginBottom: 16 }}
      >
        01 · WHO I AM
      </div>
      <h2
        className="d"
        style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.03em', margin: '0 0 24px' }}
      >
        About Me
      </h2>

      <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg)', margin: 0 }}>
        I'm <span style={{ color: 'var(--ac)' }}>Vicente</span> — a.k.a. VicentCodes. Building for
        the web since 2018, with a soft spot for Android, interface design, and the tiny details
        users never notice but always feel.
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.65, marginTop: 14, color: 'var(--fg-m)' }}>
        Computer engineering student, freelance developer, and permanent student of good design. My
        goal: turn complex ideas into simple, beautiful, intuitive software.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 28 }}>
        {[
          { t: 'Web Development', d: 'React, Node, Astro.' },
          { t: 'Android Apps', d: 'Kotlin & Compose.' },
          { t: 'Interface Design', d: 'Figma to production.' },
          { t: 'Desktop Tools', d: 'Electron, Tauri.' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: '14px 16px' }}>
            <div className="d" style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
              {s.t}
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-m)' }}>{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
