import type { CSSProperties, ReactNode } from 'react';
import { CardButton } from '@/components/ui/CardButton/CardButton';
import styles from './FeaturedCard.module.css';

interface FeaturedCardProps {
  /** Hue for the decorative panel tint and glyph. */
  hue: number;
  /** Oversized display character in the deco panel, e.g. "@" or a quote mark. */
  glyph: string;
  /** Pills shown at the top of the deco panel. */
  pills: ReactNode;
  /** Right-hand content column. */
  children: ReactNode;
  ariaLabel: string;
  /** Renders as a link when set… */
  href?: string;
  /** …or as a button-card when set. */
  onActivate?: () => void;
}

export function FeaturedCard({
  hue,
  glyph,
  pills,
  children,
  ariaLabel,
  href,
  onActivate,
}: FeaturedCardProps) {
  const hueStyle = { '--card-hue': hue } as CSSProperties;

  const inner = (
    <>
      <div className={`gbg ${styles.deco}`}>
        <div className={styles.pills}>{pills}</div>
        <div className={styles.glyph} aria-hidden>
          {glyph}
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={`card card-hover ${styles.root}`}
        style={hueStyle}
      >
        {inner}
      </a>
    );
  }

  return (
    <CardButton
      onActivate={onActivate ?? (() => {})}
      ariaLabel={ariaLabel}
      className={styles.root}
      style={hueStyle}
    >
      {inner}
    </CardButton>
  );
}
