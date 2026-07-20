import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowIcon, DownloadIcon } from '@/components/icons/Icons';
import { LanguageToggle } from '@/i18n/LanguageToggle';
import { useLang } from '@/i18n/useLang';
import { localePath } from '@/i18n/routing';
import { useT } from '@/i18n/useT';
import { useSeo } from '@/seo/useSeo';
import { CVSheet } from './CVSheet';
import { cvPdfFilename, cvPdfPath } from './cv.data';
import styles from './CVPage.module.css';

/** US Letter at CSS 96dpi. Must match the .sheet dimensions in CVSheet. */
const SHEET_WIDTH_PX = 816;

/** Best-effort available width before the sheet has mounted, so the very
 *  first paint already uses the right scale. Rendering the full 816px
 *  sheet for even one frame makes mobile browsers shrink-to-fit (zoom out)
 *  and never recover. */
function estimateScale() {
  if (typeof window === 'undefined') return 1;
  const avail = Math.min(window.innerWidth, document.documentElement.clientWidth) - 24;
  return Math.min(1, avail / SHEET_WIDTH_PX);
}

/**
 * Fit the fixed-size Letter sheet to the viewport width using CSS `zoom`.
 * Unlike `transform: scale()`, zoom reflows layout so the element genuinely
 * occupies its scaled box — no wrapper sizing, and the preview keeps the
 * exact proportions of the downloadable PDF.
 */
function useFitScale() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(estimateScale);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const measure = () => {
      const style = getComputedStyle(stage);
      const padX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const avail = stage.clientWidth - padX;
      setScale(Math.min(1, avail / SHEET_WIDTH_PX));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return { stageRef, scale };
}

export function CVPage() {
  const isBare =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('print');
  const { stageRef, scale } = useFitScale();
  const { lang } = useLang();
  const t = useT();

  useSeo('/cv', lang, !isBare);

  // Bare mode: only the sheet at natural size (used by the PDF generator).
  if (isBare) {
    return (
      <div className={styles.bare}>
        <CVSheet />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.toolbar}>
        <a href={localePath(lang, '/')} className={styles.back}>
          <span style={{ display: 'inline-flex', transform: 'rotate(225deg)' }}>
            <ArrowIcon size={12} />
          </span>
          {t.cv.backToSite}
        </a>
        <span className={`m ${styles.toolbarTitle}`}>
          V<span style={{ color: 'var(--ac)' }}>NEVAREZ</span>T · {t.cv.label}
        </span>
        <div className={styles.toolbarActions}>
          <LanguageToggle />
          <a
            href={cvPdfPath(lang)}
            download={cvPdfFilename(lang)}
            className="btn p"
            style={{ fontSize: 'var(--fs-13)' }}
          >
            {t.cv.downloadPDF} <DownloadIcon size={13} />
          </a>
        </div>
      </header>

      <div ref={stageRef} className={styles.stage}>
        <div className={styles.sheetShadow} style={{ zoom: scale }}>
          <CVSheet />
        </div>
      </div>
    </div>
  );
}
