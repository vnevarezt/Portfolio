import { SectionIntro } from '@/components/ui/SectionIntro/SectionIntro';
import { useT } from '@/i18n/useT';
import { Experience } from '@/sections/Experience/Experience';

export function About() {
  const t = useT();
  return (
    <div style={{ padding: 'var(--pad-y) var(--pad-x) var(--pad-b)' }}>
      <SectionIntro kicker={t.about.kicker} title={t.about.title} />

      <p
        style={{
          fontSize: 'var(--fs-17)',
          lineHeight: 1.6,
          color: 'var(--fg)',
          margin: 0,
          maxWidth: 680,
        }}
      >
        {t.about.introPre}
        <span style={{ color: 'var(--ac)' }}>Vicente</span>
        {t.about.introPost}
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
        {t.about.body}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--about-grid-cols)',
          gap: 12,
          marginTop: 28,
        }}
      >
        {t.about.cards.map((c) => (
          <div key={c.title} className="card" style={{ padding: 'var(--space-4)' }}>
            <div className="d" style={{ fontSize: 'var(--fs-14)', fontWeight: 500, marginBottom: 4 }}>
              {c.title}
            </div>
            <div style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-m)' }}>{c.desc}</div>
          </div>
        ))}
      </div>

      <div aria-hidden style={{ margin: '56px 0 40px', borderTop: '1px solid var(--br)' }} />

      <Experience embedded />
    </div>
  );
}
