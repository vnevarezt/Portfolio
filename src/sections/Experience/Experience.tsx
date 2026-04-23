import { DownloadIcon } from '@/components/icons/Icons';
import { EXPERIENCE, EXPERIENCE_META } from '@/data/experience';

export function Experience() {
  return (
    <div style={{ padding: '28px 32px 60px', maxWidth: 820 }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 6,
        }}
      >
        <div
          className="m"
          style={{ fontSize: 9, color: 'var(--fg-d)', letterSpacing: '0.18em' }}
        >
          04 · BACKGROUND
        </div>
        <div
          className="m"
          style={{ fontSize: 9, color: 'var(--fg-d)', letterSpacing: '0.1em' }}
        >
          4 chapters · 6+ years
        </div>
      </div>
      <h2
        className="d"
        style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.035em', margin: '0 0 8px' }}
      >
        A timeline of <em style={{ color: 'var(--ac)', fontStyle: 'italic' }}>becoming</em>.
      </h2>
      <p
        style={{
          fontSize: 14,
          color: 'var(--fg-m)',
          margin: '0 0 40px',
          lineHeight: 1.55,
          maxWidth: 560,
        }}
      >
        From writing my first tag at fifteen to shipping apps that people actually use — each step
        taught me something worth keeping.
      </p>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        {/* Spine */}
        <div
          style={{
            position: 'absolute',
            left: 108,
            top: 8,
            bottom: 8,
            width: 1,
            background:
              'linear-gradient(to bottom, var(--ac) 0, var(--br) 80px, var(--br) 100%)',
          }}
        />
        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {EXPERIENCE.map((e, i) => {
            const meta = EXPERIENCE_META[i];
            const isNow = i === 0;
            return (
              <li
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '116px 1fr',
                  gap: 0,
                  alignItems: 'start',
                  position: 'relative',
                }}
              >
                {/* Year column */}
                <div style={{ paddingTop: 6, paddingRight: 16, overflow: 'hidden' }}>
                  <div
                    className="d"
                    style={{
                      fontSize: 24,
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
                      fontSize: 9,
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
                <div className="card" style={{ padding: '18px 20px', marginLeft: 14 }}>
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
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          flexWrap: 'wrap',
                        }}
                      >
                        <div
                          className="d"
                          style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.02em' }}
                        >
                          {e.role}
                        </div>
                        {isNow && (
                          <span
                            className="m accent-surface"
                            style={{
                              fontSize: 9,
                              padding: '2px 7px',
                              borderRadius: 999,
                              letterSpacing: '0.1em',
                            }}
                          >
                            NOW
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--fg-m)', marginTop: 3 }}>
                        {e.org}
                      </div>
                    </div>
                    <span
                      className="m"
                      style={{
                        fontSize: 10,
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
                      fontSize: 13,
                      lineHeight: 1.6,
                      margin: '10px 0 12px',
                      color: 'var(--fg-m)',
                    }}
                  >
                    {e.desc}
                  </p>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {meta.tags.map((t) => (
                      <span
                        key={t}
                        className="m"
                        style={{
                          fontSize: 9,
                          padding: '3px 8px',
                          borderRadius: 4,
                          border: '1px solid var(--br)',
                          color: 'var(--fg-m)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* CV download */}
      <div
        style={{
          marginTop: 36,
          padding: '18px 22px',
          border: '1px dashed var(--br-s)',
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div className="d" style={{ fontSize: 15, fontWeight: 500 }}>
            Need the full story?
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-m)', marginTop: 2 }}>
            Download a one-page CV with every project and stack.
          </div>
        </div>
        <a href="#" className="btn p" style={{ padding: '10px 18px', fontSize: 13 }}>
          Download CV <DownloadIcon size={13} />
        </a>
      </div>
    </div>
  );
}
