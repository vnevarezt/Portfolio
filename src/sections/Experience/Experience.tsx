import { DownloadIcon } from '@/components/icons/Icons';
import { CtaBanner } from '@/components/ui/CtaBanner/CtaBanner';
import { Pill } from '@/components/ui/Pill/Pill';
import { SectionIntro, Accent } from '@/components/ui/SectionIntro/SectionIntro';
import { TagChip } from '@/components/ui/TagChip/TagChip';
import { useLang } from '@/i18n/useLang';
import { localePath } from '@/i18n/routing';
import { useT } from '@/i18n/useT';
import { cvPdfFilename, cvPdfPath } from '@/sections/CV/cv.data';
import { useExperience } from '@/data/experience';

interface ExperienceProps {
  embedded?: boolean;
}

export function Experience({ embedded = false }: ExperienceProps) {
  const t = useT();
  const { lang } = useLang();
  const { experience, meta: metaList } = useExperience();

  const content = (
    <>
      <SectionIntro
        kicker={`${embedded ? '02' : '04'} · ${t.experience.kicker}`}
        meta={t.experience.meta}
        title={
          <>
            {t.experience.titlePre}
            <Accent>{t.experience.titleAccent}</Accent>
            {t.experience.titlePost}
          </>
        }
        lede={t.experience.lede}
      />

      {/* Timeline */}
      <div style={{ position: 'relative', marginTop: 16 }}>
        {/* Spine */}
        <div
          className="timeline-spine"
          style={{
            position: 'absolute',
            left: 108,
            top: 8,
            bottom: 8,
            width: 1,
            background: 'linear-gradient(to bottom, var(--ac) 0, var(--br) 80px, var(--br) 100%)',
          }}
        />
        <ol
          className="timeline-list"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {experience.map((e, i) => {
            const meta = metaList[i];
            const isNow = i === 0;
            return (
              <li
                key={`${e.org}-${e.time}`}
                className="timeline-item"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'var(--timeline-cols)',
                  gap: 0,
                  alignItems: 'start',
                  position: 'relative',
                }}
              >
                {/* Year column */}
                <div
                  className="timeline-year-block"
                  style={{ paddingTop: 6, paddingRight: 16, overflow: 'hidden' }}
                >
                  <div
                    className="d"
                    style={{
                      fontSize: 'var(--fs-24)',
                      fontWeight: 500,
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      color: isNow ? 'var(--ac)' : 'var(--fg)',
                    }}
                  >
                    {e.time.split(' — ')[0]}
                  </div>
                  <div
                    className="m"
                    style={{
                      fontSize: 'var(--fs-9)',
                      color: 'var(--fg-d)',
                      letterSpacing: '0.12em',
                      marginTop: 4,
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {meta.highlight}
                  </div>
                </div>

                {/* Dot */}
                <span
                  className="timeline-dot"
                  style={{
                    position: 'absolute',
                    left: 104,
                    top: 14,
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    background: isNow ? 'var(--ac)' : 'var(--bg-c)',
                    border: `1px solid ${isNow ? 'var(--ac)' : 'var(--br-s)'}`,
                    zIndex: 2,
                  }}
                >
                  {isNow && (
                    <span
                      style={{
                        position: 'absolute',
                        inset: -5,
                        borderRadius: '50%',
                        background: 'var(--ac)',
                        opacity: 0.25,
                        animation: 'pulse 1.8s ease-in-out infinite',
                      }}
                    />
                  )}
                </span>

                {/* Content card */}
                <div className="card" style={{ padding: 'var(--space-4) var(--space-5)', marginLeft: 14 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: 12,
                      flexWrap: 'wrap',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <div
                          className="d"
                          style={{ fontSize: 'var(--fs-17)', fontWeight: 500, letterSpacing: '-0.02em' }}
                        >
                          {e.role}
                        </div>
                        {isNow && <Pill variant="accent">{t.experience.now}</Pill>}
                      </div>
                      <div style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-m)', marginTop: 3 }}>
                        {e.org}
                      </div>
                    </div>
                    <span
                      className="m"
                      style={{
                        fontSize: 'var(--fs-11)',
                        color: 'var(--fg-d)',
                        letterSpacing: '0.1em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {e.time}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 'var(--fs-13)',
                      lineHeight: 1.6,
                      margin: '10px 0 12px',
                      color: 'var(--fg-m)',
                    }}
                  >
                    {e.desc}
                  </p>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {meta.tags.map((tag) => (
                      <TagChip key={tag}>{tag}</TagChip>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <CtaBanner title={t.experience.ctaTitle} sub={t.experience.ctaSub}>
        <a href={localePath(lang, '/cv')} className="btn" style={{ fontSize: 'var(--fs-13)' }}>
          {t.common.viewCV}
        </a>
        <a
          href={cvPdfPath(lang)}
          download={cvPdfFilename(lang)}
          className="btn p"
          style={{ fontSize: 'var(--fs-13)' }}
        >
          {t.common.downloadCV} <DownloadIcon size={13} />
        </a>
      </CtaBanner>
    </>
  );

  if (embedded) return content;

  return <div style={{ padding: 'var(--pad-y) var(--pad-x) var(--pad-b)' }}>{content}</div>;
}
