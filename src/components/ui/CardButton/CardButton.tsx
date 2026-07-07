import type { CSSProperties, ReactNode } from 'react';

interface CardButtonProps {
  onActivate: () => void;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Clickable card with button semantics. Rendered as an <article> (cards
 * contain headings, which <button> does not allow) with full keyboard
 * support and the shared .card-hover affordance.
 */
export function CardButton({ onActivate, ariaLabel, children, className = '', style }: CardButtonProps) {
  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      className={`card card-hover ${className}`.trim()}
      style={style}
      onClick={onActivate}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onActivate();
        }
      }}
    >
      {children}
    </article>
  );
}
