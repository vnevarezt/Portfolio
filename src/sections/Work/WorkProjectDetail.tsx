import { type Dispatch, type SetStateAction, useEffect, useMemo, useState } from 'react';
import { ArrowIcon, ChevronRightIcon } from '@/components/icons/Icons';
import { ProjectMark } from '@/components/marks/ProjectMark';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import type { Project } from '@/types';
import type { ProjectDetailMock } from '@/data/projectDetails.mock';
import styles from './WorkProjectDetailV6.module.css';

interface WorkProjectDetailProps {
  project: Project;
  detail: ProjectDetailMock;
  onClose: () => void;
}

export function WorkProjectDetail({ project, detail, onClose }: WorkProjectDetailProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const screenshots = useMemo(() => detail.screenshots.filter(Boolean), [detail.screenshots]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileTab, setMobileTab] = useState<'case' | 'snapshot' | 'metrics'>('case');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setMobileTab('case');
    setLightboxOpen(false);
  }, [project.title]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
      }
      if (!screenshots.length) return;
      if (event.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
      }
      if (event.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % screenshots.length);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, screenshots.length, lightboxOpen]);

  const canNavigate = screenshots.length > 1;
  const activeScreenshot = screenshots[currentIndex] ?? screenshots[0] ?? '';

  const goPrevious = () => {
    if (!canNavigate) return;
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const goNext = () => {
    if (!canNavigate) return;
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const openLightbox = () => {
    if (activeScreenshot) setLightboxOpen(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project detail`}
      className={styles.overlay}
    >
      <button type="button" aria-label="Close project detail" onClick={onClose} className={styles.backdrop} />

      <article className={`card ${styles.dialog}`}>
        {isMobile ? (
          <MobileLayout
            project={project}
            detail={detail}
            screenshots={screenshots}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onClose={onClose}
            tab={mobileTab}
            onTabChange={setMobileTab}
            onOpenLightbox={openLightbox}
          />
        ) : (
          <DesktopLayout
            project={project}
            detail={detail}
            screenshots={screenshots}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onClose={onClose}
            canNavigate={canNavigate}
            goNext={goNext}
            goPrevious={goPrevious}
            activeScreenshot={activeScreenshot}
            onOpenLightbox={openLightbox}
          />
        )}
      </article>

      {lightboxOpen && activeScreenshot && (
        <Lightbox
          src={activeScreenshot}
          index={currentIndex}
          total={screenshots.length}
          canNavigate={canNavigate}
          onClose={() => setLightboxOpen(false)}
          onPrev={goPrevious}
          onNext={goNext}
        />
      )}
    </div>
  );
}

function Lightbox({
  src,
  index,
  total,
  canNavigate,
  onClose,
  onPrev,
  onNext,
}: {
  src: string;
  index: number;
  total: number;
  canNavigate: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div role="dialog" aria-modal="true" aria-label="Image preview" className={styles.lightbox}>
      <button type="button" aria-label="Close image preview" onClick={onClose} className={styles.lightboxBackdrop} />

      <button type="button" onClick={onPrev} disabled={!canNavigate} aria-label="Previous screenshot" className={`${styles.lightboxNav} ${styles.lightboxPrev}`}>
        <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}>
          <ChevronRightIcon size={18} />
        </span>
      </button>

      <div className={styles.lightboxStage}>
        <img src={src} alt={`Screenshot ${index + 1}`} className={styles.lightboxImage} />
      </div>

      <button type="button" onClick={onNext} disabled={!canNavigate} aria-label="Next screenshot" className={`${styles.lightboxNav} ${styles.lightboxNext}`}>
        <ChevronRightIcon size={18} />
      </button>

      <button type="button" onClick={onClose} className={styles.lightboxClose} aria-label="Close image preview">
        ×
      </button>

      {total > 0 && <div className={styles.lightboxCounter}>{`${index + 1} / ${total}`}</div>}
    </div>
  );
}

interface DetailLayoutProps {
  project: Project;
  detail: ProjectDetailMock;
  screenshots: string[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

function DesktopLayout({
  project,
  detail,
  screenshots,
  currentIndex,
  setCurrentIndex,
  onClose,
  canNavigate,
  goNext,
  goPrevious,
  activeScreenshot,
  onOpenLightbox,
}: DetailLayoutProps & {
  onClose: () => void;
  canNavigate: boolean;
  goNext: () => void;
  goPrevious: () => void;
  activeScreenshot: string;
  onOpenLightbox: () => void;
}) {
  return (
    <>
      <aside className={styles.leftRail}>
        <div className={`m ${styles.breadcrumb}`}>
          <span>WORK</span>
          <span>/</span>
          <span className={styles.breadcrumbAccent}>02</span>
        </div>

        <div>
          <h3 className={`d ${styles.title}`}>
            {project.title}
            <span className={styles.titleAccent}>.</span>
          </h3>
          <div className={`m ${styles.meta}`}>
            {project.cat} · {project.year}
          </div>
        </div>

        <p className={`d ${styles.headline}`}>{detail.headline}</p>

        <div className={styles.railSection}>
          {[
            ['Role', detail.role],
            ['Timeline', detail.timeline],
            ['Team', detail.team],
            ['Status', detail.status],
          ].map(([label, value]) => (
            <div key={label}>
              <div className={styles.label}>{label}</div>
              <div className={styles.railValue}>{value}</div>
            </div>
          ))}
        </div>

        <div className={styles.railSection}>
          <div className={styles.label}>Metrics</div>
          <div className={styles.metricsCompact}>
            {detail.metrics.map((metric) => (
              <div key={metric.k} className={styles.metricRow}>
                <span className={`m ${styles.metricLabel}`}>{metric.v}</span>
                <span className={`m ${styles.metricKey}`}>{metric.k}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.railSection}>
          <div className={styles.label}>Stack</div>
          <div className={styles.chips}>
            {project.stack.map((stackItem) => (
              <span key={stackItem} className={styles.chip}>
                {stackItem}
              </span>
            ))}
          </div>
        </div>
      </aside>

      <div className={styles.rightBody}>
        <button type="button" onClick={onClose} className={styles.closeFloating} aria-label="Close project detail">
          ×
        </button>

        <div className={styles.heroWrap}>
          <div className={styles.heroShotFrame}>
            {activeScreenshot ? (
              <>
                <img src={activeScreenshot} alt="" aria-hidden="true" className={styles.heroShotBackdrop} />
                <img src={activeScreenshot} alt={`Project screenshot ${currentIndex + 1}`} className={styles.shotImage} />
                <button
                  type="button"
                  onClick={onOpenLightbox}
                  className={styles.heroShotButton}
                  aria-label="Open image preview"
                />
              </>
            ) : (
              <div className={styles.shotFallback}>NO IMAGE</div>
            )}

            <button type="button" onClick={goPrevious} disabled={!canNavigate} aria-label="Previous screenshot" className={`${styles.carouselNavBtn} ${styles.carouselNavPrev}`}>
              <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}>
                <ChevronRightIcon size={16} />
              </span>
            </button>

            <button type="button" onClick={goNext} disabled={!canNavigate} aria-label="Next screenshot" className={`${styles.carouselNavBtn} ${styles.carouselNavNext}`}>
              <ChevronRightIcon size={16} />
            </button>

            <div className={`m ${styles.counterPill}`}>{screenshots.length ? `${currentIndex + 1} / ${screenshots.length}` : '0 / 0'}</div>
            {activeScreenshot && <div className={styles.zoomHint}>Click to expand</div>}
          </div>

          {screenshots.length > 1 && (
            <div className={styles.thumbStrip}>
              {screenshots.map((src, index) => (
                <button key={`${src}-${index}`} type="button" onClick={() => setCurrentIndex(index)} className={`${styles.thumbBtn} ${index === currentIndex ? styles.thumbBtnActive : ''}`} aria-label={`Go to screenshot ${index + 1}`}>
                  <img src={src} alt={`Screenshot thumbnail ${index + 1}`} loading="lazy" className={styles.thumbImage} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.contentScroll}>
          <div className={styles.narrative}>
            <CaseText title="Challenge" body={detail.challenge} />
            <CaseText title="Approach" body={detail.approach} />
            <div>
              <div className={styles.label} style={{ marginBottom: 10 }}>Outcomes</div>
              <ul className={styles.outcomeListAlt}>
                {detail.outcomes.map((item) => (
                  <li key={item} className={styles.outcomeAlt}>
                    <span className={styles.outcomeArrow}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <footer className={styles.footerDesktop}>
          <div className={`m ${styles.footerHint}`}>ESC TO CLOSE · ← → NAV</div>
          <div className={styles.links}>
            {detail.links.map((linkItem, i) => {
              const isExternal = linkItem.href !== '#' && /^https?:\/\//.test(linkItem.href);
              return (
                <a
                  key={linkItem.label}
                  href={linkItem.href}
                  className={`btn ${i === detail.links.length - 1 ? 'p' : ''}`}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  onClick={(event) => {
                    if (linkItem.href === '#') {
                      event.preventDefault();
                    }
                  }}
                >
                  {linkItem.label} <ArrowIcon size={12} />
                </a>
              );
            })}
          </div>
        </footer>
      </div>
    </>
  );
}

function MobileLayout({
  project,
  detail,
  screenshots,
  currentIndex,
  setCurrentIndex,
  onClose,
  tab,
  onTabChange,
  onOpenLightbox,
}: DetailLayoutProps & {
  onClose: () => void;
  tab: 'case' | 'snapshot' | 'metrics';
  onTabChange: (tab: 'case' | 'snapshot' | 'metrics') => void;
  onOpenLightbox: () => void;
}) {
  const canNavigate = screenshots.length > 1;
  const activeScreenshot = screenshots[currentIndex] ?? screenshots[0] ?? '';

  return (
    <div className={styles.mobileShell}>
      <header className={styles.mobileHeader}>
        <div className={`m ${styles.breadcrumb}`}>
          <span>WORK</span>
          <span>/</span>
          <span className={styles.breadcrumbAccent}>02</span>
        </div>
        <button type="button" onClick={onClose} className={styles.mobileCloseBtn} aria-label="Close project detail">
          ×
        </button>
      </header>

      <div className={styles.mobileScroll}>
        <div className={styles.mobileTitleBlock}>
          <h3 className={`d ${styles.mobileTitle}`}>
            {project.title}
            <span className={styles.titleAccent}>.</span>
          </h3>
          <div className={`m ${styles.meta}`}>
            {project.cat} · {project.year}
          </div>
          <p className={`d ${styles.mobileHeadline}`}>{detail.headline}</p>
        </div>

        <div className={styles.mobileShotFrame}>
          {activeScreenshot ? (
            <>
              <img src={activeScreenshot} alt="" aria-hidden="true" className={styles.heroShotBackdrop} />
              <img src={activeScreenshot} alt={`Project screenshot ${currentIndex + 1}`} className={styles.shotImage} />
              <button
                type="button"
                onClick={onOpenLightbox}
                className={styles.heroShotButton}
                aria-label="Open image preview"
              />
            </>
          ) : (
            <div className={styles.shotFallback}>NO IMAGE</div>
          )}
          <button type="button" onClick={() => setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)} disabled={!canNavigate} aria-label="Previous screenshot" className={`${styles.carouselNavBtn} ${styles.carouselNavPrev} ${styles.mobileNavBtn}`}>
            <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}>
              <ChevronRightIcon size={16} />
            </span>
          </button>
          <button type="button" onClick={() => setCurrentIndex((prev) => (prev + 1) % screenshots.length)} disabled={!canNavigate} aria-label="Next screenshot" className={`${styles.carouselNavBtn} ${styles.carouselNavNext} ${styles.mobileNavBtn}`}>
            <ChevronRightIcon size={16} />
          </button>
          <div className={`m ${styles.mobileCounter}`}>{screenshots.length ? `${currentIndex + 1} / ${screenshots.length}` : '0 / 0'}</div>
          <div className={styles.mobileDots}>
            {screenshots.map((src, index) => (
              <button key={`${src}-${index}-dot`} type="button" onClick={() => setCurrentIndex(index)} aria-label={`Go to screenshot ${index + 1}`} className={`${styles.mobileDot} ${index === currentIndex ? styles.mobileDotActive : ''}`} />
            ))}
          </div>
        </div>

        <div className={styles.mobileTabsWrap}>
          <div className={styles.mobileTabs} role="tablist" aria-label="Detail section tabs">
            {[
              { id: 'case', label: 'Case' },
              { id: 'snapshot', label: 'Snapshot' },
              { id: 'metrics', label: 'Metrics' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                className={`${styles.mobileTab} ${tab === item.id ? styles.mobileTabActive : ''}`}
                onClick={() => onTabChange(item.id as 'case' | 'snapshot' | 'metrics')}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.mobileContent}>
          {tab === 'case' && (
            <div className={styles.mobileColumn}>
              <CaseText title="Challenge" body={detail.challenge} />
              <CaseText title="Approach" body={detail.approach} />
              <div>
                <div className={styles.label} style={{ marginBottom: 8 }}>Outcomes</div>
                <ul className={styles.outcomeListAlt}>
                  {detail.outcomes.map((item) => (
                    <li key={item} className={styles.outcomeAlt}>
                      <span className={styles.outcomeArrow}>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className={styles.label} style={{ marginBottom: 8 }}>Stack</div>
                <div className={styles.chips}>
                  {project.stack.map((stackItem) => (
                    <span key={stackItem} className={styles.chip}>{stackItem}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'snapshot' && (
            <div className={styles.mobileColumn}>
              {[
                ['Role', detail.role],
                ['Timeline', detail.timeline],
                ['Team', detail.team],
                ['Status', detail.status],
              ].map(([label, value]) => (
                <div key={label} className={styles.mobileSnapshotRow}>
                  <div className={styles.label} style={{ marginBottom: 4 }}>{label}</div>
                  <div className={styles.railValue}>{value}</div>
                </div>
              ))}
            </div>
          )}

          {tab === 'metrics' && (
            <div className={styles.mobileColumn}>
              {detail.metrics.map((metric, index) => (
                <div key={metric.k} className={`${styles.mobileMetricRow} ${index < detail.metrics.length - 1 ? styles.mobileMetricRowBorder : ''}`}>
                  <span className={`m ${styles.metricLabel}`}>{metric.v}</span>
                  <span className={`d ${styles.mobileMetricKey}`}>{metric.k}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className={styles.mobileFooter}>
        {detail.links.map((linkItem, i) => {
          const isExternal = linkItem.href !== '#' && /^https?:\/\//.test(linkItem.href);
          return (
            <a
              key={linkItem.label}
              href={linkItem.href}
              className={`btn ${i === detail.links.length - 1 ? 'p' : ''}`}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              onClick={(event) => {
                if (linkItem.href === '#') {
                  event.preventDefault();
                }
              }}
            >
              {linkItem.label} <ArrowIcon size={11} />
            </a>
          );
        })}
      </footer>
    </div>
  );
}

function CaseText({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <div className={styles.label} style={{ marginBottom: 6 }}>{title}</div>
      <p className={styles.caseText}>{body}</p>
    </div>
  );
}