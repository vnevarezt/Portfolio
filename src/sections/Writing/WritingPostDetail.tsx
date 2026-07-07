import { useEffect, useRef, useState } from 'react';
import {
  BookmarkIcon,
  CheckIcon,
  ClockIcon,
  CloseIcon,
  LinkIcon,
} from '@/components/icons/Icons';
import { Pill } from '@/components/ui/Pill/Pill';
import { DEFAULT_POST_BODY, POST_BODIES, type PostBodyBlock } from '@/data/postDetails.mock';
import type { Post } from '@/types';
import styles from './WritingPostDetail.module.css';

interface WritingPostDetailProps {
  post: Post;
  all: Post[];
  onClose: () => void;
  onOpen: (post: Post) => void;
}

export function WritingPostDetail({ post, all, onClose, onOpen }: WritingPostDetailProps) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 100);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      window.clearTimeout(focusTimer);
    };
  }, [onClose]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
  };

  const body: PostBodyBlock[] =
    POST_BODIES[post.title] ?? [{ type: 'lede', text: post.excerpt }, ...DEFAULT_POST_BODY.slice(1)];
  const related = all.filter((p) => p.title !== post.title).slice(0, 3);
  const hue = post.hue;

  const copyLink = () => {
    const slug = post.title.toLowerCase().replace(/\s+/g, '-');
    void navigator.clipboard?.writeText(`https://vnevarezt.com/blog/${slug}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="art-title" className={styles.overlay}>
      <button
        type="button"
        aria-label="Close article"
        onClick={onClose}
        className={styles.backdrop}
      />

      <div
        className={styles.dialog}
        style={{ boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px oklch(70% 0.18 ${hue}/0.18)` }}
      >
        <header className={styles.header}>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close article"
            className={styles.iconBtn}
          >
            <CloseIcon size={15} />
          </button>

          <div className={styles.headerTitle}>
            <Pill hue={hue} style={{ flexShrink: 0 }}>
              {post.cat}
            </Pill>
            <span className={`d ${styles.headerTitleText}`}>{post.title}</span>
          </div>

          <div className={styles.headerActions}>
            <button
              type="button"
              onClick={() => setBookmarked((v) => !v)}
              aria-label="Bookmark"
              title="Bookmark"
              className={`${styles.iconBtn} ${
                bookmarked ? styles.iconBtnActive : styles.iconBtnGhost
              }`}
            >
              <BookmarkIcon size={14} />
            </button>
            <button
              type="button"
              onClick={copyLink}
              aria-label="Copy link"
              title="Copy link"
              className={`${styles.iconBtn} ${
                copied ? styles.iconBtnSuccess : styles.iconBtnGhost
              }`}
            >
              {copied ? <CheckIcon size={14} /> : <LinkIcon size={14} />}
            </button>
          </div>

          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, oklch(75% 0.16 ${hue}), var(--ac))`,
              }}
            />
          </div>
        </header>

        <div ref={scrollRef} onScroll={onScroll} className={styles.scroll}>
          <div
            className={`gbg ${styles.hero}`}
            style={{ background: `oklch(20% 0.06 ${hue}/0.4)` }}
          >
            <div
              className={styles.heroGlow}
              style={{
                background: `radial-gradient(circle at 80% 0%, oklch(60% 0.22 ${hue}/0.22), transparent 55%)`,
              }}
            />
            <div
              className={styles.heroQuote}
              style={{ color: `oklch(82% 0.17 ${hue}/0.85)` }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <div className={styles.heroInner}>
              <div className={`m ${styles.kicker}`}>Essay · {post.date}</div>
              <h1 id="art-title" className={`d ${styles.heroTitle}`}>
                {post.title}
              </h1>
              <p className={styles.heroExcerpt}>{post.excerpt}</p>

              <div className={styles.byline}>
                <div className={styles.bylineAvatar}>
                  <span>V</span>
                  <span className={styles.bylineAvatarAccent}>N</span>
                </div>
                <div className={styles.bylineMeta}>
                  <div className={`d ${styles.bylineName}`}>Vicente Nevárez</div>
                  <div className={`m ${styles.bylineHandle}`}>Developer · @vnevarezt</div>
                </div>
                <div className={styles.bylineRead}>
                  <ClockIcon size={13} />
                  <span className="m">{post.read}</span>
                </div>
              </div>
            </div>
          </div>

          <article className={styles.body}>
            {body.map((block, i) => (
              <BodyBlock key={i} block={block} />
            ))}

            <div className={styles.endMark}>
              <span className={styles.endLine} />
              <span className={`m ${styles.endLabel}`}>END</span>
              <span className={styles.endLine} />
            </div>
          </article>

          {related.length > 0 && (
            <section className={styles.related}>
              <div className={`m ${styles.relatedLabel}`}>Continue reading</div>
              <div className={styles.relatedGrid}>
                {related.map((r) => (
                  <button
                    key={r.title}
                    type="button"
                    onClick={() => {
                      onClose();
                      window.setTimeout(() => onOpen(r), 180);
                    }}
                    className={styles.relatedCard}
                  >
                    <Pill hue={r.hue} style={{ alignSelf: 'flex-start' }}>
                      {r.cat}
                    </Pill>
                    <div className={`d ${styles.relatedTitle}`}>{r.title}</div>
                    <div className={`m ${styles.relatedMeta}`}>
                      {r.date} · {r.read}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className={styles.footer}>
          <div className={`m ${styles.footerHint}`}>
            <kbd className={styles.kbd}>ESC</kbd>
            <span className={styles.kbdLabel}>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyBlock({ block }: { block: PostBodyBlock }) {
  if (block.type === 'lede') return <p className={styles.lede}>{block.text}</p>;
  if (block.type === 'h2') return <h2 className={`d ${styles.h2}`}>{block.text}</h2>;
  if (block.type === 'p') return <p className={styles.p}>{block.text}</p>;
  if (block.type === 'pull')
    return (
      <blockquote className={styles.pullquote}>
        <p className={`d ${styles.pullquoteText}`}>&ldquo;{block.text}&rdquo;</p>
      </blockquote>
    );
  if (block.type === 'list')
    return (
      <ul className={styles.list}>
        {block.items.map((item, j) => (
          <li key={j} className={styles.listItem}>
            <span className={`m ${styles.listIndex}`}>{String(j + 1).padStart(2, '0')}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  return null;
}
