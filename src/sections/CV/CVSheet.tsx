import { useLang } from '@/i18n/useLang';
import { CV_DATA } from './cv.data';
import styles from './CVSheet.module.css';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        {title}
        <span className={styles.sectionRule} />
      </h2>
      {children}
    </section>
  );
}

/**
 * The CV document itself, sized as a US-Letter sheet. Rendered both as
 * the on-screen preview (/cv) and as the source for the generated PDFs
 * (npm run cv:pdf), so both are always identical.
 */
export function CVSheet() {
  const { lang } = useLang();
  const cv = CV_DATA[lang];
  const c = cv.contact;

  return (
    <article className={styles.sheet} lang={lang}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.name}>
            {cv.name}
            <span className={styles.nameAccent}>.</span>
          </h1>
          <p className={styles.role}>{cv.title}</p>
        </div>
        <div className={styles.contact}>
          <div className={styles.contactStrong}>{c.email}</div>
          <div>{c.phone}</div>
          <div>{c.location}</div>
          <div>
            {c.web} · {c.github}
          </div>
          <div>{c.linkedin}</div>
        </div>
      </header>

      <Section title={cv.labels.profile}>
        <p className={styles.summary}>{cv.summary}</p>
      </Section>

      <Section title={cv.labels.experience}>
        {cv.experience.map((e) => (
          <div key={e.org} className={styles.entry}>
            <h3 className={styles.entryRole}>
              {e.role} <span className={styles.entryOrg}>· {e.org}</span>
            </h3>
            <p className={styles.entrySub}>
              {e.place} <span className={styles.entrySubDot}>·</span> {e.period}
            </p>
            <ul className={styles.bullets}>
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title={cv.labels.education}>
        <div className={styles.entryHead}>
          <h3 className={styles.entryRole}>
            {cv.education.degree}{' '}
            <span className={styles.entryOrg}>· {cv.education.school}</span>
          </h3>
        </div>
        <p className={styles.projectDesc}>{cv.education.detail}</p>
      </Section>

      <Section title={cv.labels.projects}>
        <div className={styles.projectGrid}>
          {cv.projects.map((p) => (
            <div key={p.name} className={styles.entry}>
              <div className={styles.entryHead}>
                <h3 className={styles.entryRole}>{p.name}</h3>
                <span className={styles.entryMeta}>{p.year}</span>
              </div>
              <p className={styles.projectDesc}>{p.desc}</p>
              <p className={styles.projectStack}>{p.stack}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={cv.labels.skills}>
        <div className={styles.skillGrid}>
          {cv.skills.map((s) => (
            <p key={s.label} className={styles.skillRow}>
              <span className={styles.skillLabel}>{s.label}:</span> {s.items}
            </p>
          ))}
        </div>
      </Section>

      <div className={styles.footerRow}>
        <span>
          <span className={styles.footerMono}>{cv.labels.languages}</span> — {cv.languages}
        </span>
        <span className={styles.footerMono}>{c.web}</span>
      </div>
    </article>
  );
}
