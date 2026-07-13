import { useState } from 'react';
import { ArrowIcon } from '@/components/icons/Icons';
import { CardButton } from '@/components/ui/CardButton/CardButton';
import { CtaBanner } from '@/components/ui/CtaBanner/CtaBanner';
import { FeaturedCard } from '@/components/ui/FeaturedCard/FeaturedCard';
import { Pill } from '@/components/ui/Pill/Pill';
import { SectionIntro, Accent } from '@/components/ui/SectionIntro/SectionIntro';
import { SegmentedControl } from '@/components/ui/SegmentedControl/SegmentedControl';
import { usePosts } from '@/data/posts';
import { useT } from '@/i18n/useT';
import type { Post } from '@/types';
import { WritingPostDetail } from './WritingPostDetail';

interface WritingProps {
  embedded?: boolean;
}

export function Writing({ embedded = false }: WritingProps) {
  const t = useT();
  const posts = usePosts();
  const [filter, setFilter] = useState('All');
  const [activePost, setActivePost] = useState<Post | null>(null);
  const cats = ['All', ...new Set(posts.map((p) => p.cat))];
  const list = posts.filter((p) => filter === 'All' || p.cat === filter);
  const [feat, ...rest] = list;

  const openPost = (post: Post) => setActivePost(post);
  const closePost = () => setActivePost(null);

  const content = (
    <>
      <SectionIntro
        kicker={embedded ? undefined : t.writing.kicker}
        meta={embedded ? undefined : t.writing.meta(posts.length)}
        title={
          <>
            {t.writing.titlePre}
            <Accent>{t.writing.titleAccent}</Accent>
            {t.writing.titlePost}
          </>
        }
        lede={t.writing.lede}
      />

      <div style={{ marginBottom: 20 }}>
        <SegmentedControl
          options={cats}
          value={filter}
          onChange={setFilter}
          label="Post category"
          labelFor={(c) => (c === 'All' ? t.work.all : c)}
        />
      </div>

      <div key={filter} className="view-fade">
        {feat && (
          <FeaturedCard
            hue={feat.hue}
            glyph={'“'}
            onActivate={() => openPost(feat)}
            ariaLabel={`Open article ${feat.title}`}
            pills={
              <>
                <Pill hue={feat.hue}>{feat.cat}</Pill>
                <Pill variant="ghost">{t.writing.featured}</Pill>
              </>
            }
          >
            <h3
              className="d hover-title"
              style={{
                fontSize: 'var(--fs-22)',
                fontWeight: 500,
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              {feat.title}
            </h3>
            <p style={{ fontSize: 'var(--fs-13)', color: 'var(--fg-m)', lineHeight: 1.6, margin: 0 }}>
              {feat.excerpt}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginTop: 4,
                fontSize: 'var(--fs-11)',
                flexWrap: 'wrap',
              }}
            >
              <span className="m" style={{ color: 'var(--fg-d)' }}>
                {feat.date}
              </span>
              <span className="m" style={{ color: 'var(--fg-d)' }}>
                ·
              </span>
              <span className="m" style={{ color: 'var(--fg-d)' }}>
                {feat.read}
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  color: 'var(--ac)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 'var(--fs-12)',
                }}
              >
                {t.writing.read} <ArrowIcon size={12} />
              </span>
            </div>
          </FeaturedCard>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 10,
          }}
        >
          {rest.map((p) => (
            <CardButton
              key={p.title}
              onActivate={() => openPost(p)}
              ariaLabel={`Open article ${p.title}`}
              style={{
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Pill hue={p.hue}>{p.cat}</Pill>
                <span className="m" style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-d)' }}>
                  {p.read}
                </span>
              </div>
              <h3
                className="d hover-title"
                style={{
                  fontSize: 'var(--fs-15)',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: 'var(--fs-12)',
                  color: 'var(--fg-m)',
                  lineHeight: 1.55,
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {p.excerpt}
              </p>
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span className="m" style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-d)' }}>
                  {p.date}
                </span>
                <span style={{ color: 'var(--ac)', display: 'flex', alignItems: 'center' }}>
                  <ArrowIcon size={11} />
                </span>
              </div>
            </CardButton>
          ))}
        </div>
      </div>

      <CtaBanner title={t.writing.subscribeTitle} sub={t.writing.subscribeSub}>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: 'flex', gap: 6, flexWrap: 'wrap', width: '100%', maxWidth: 380 }}
        >
          <input
            type="email"
            placeholder={t.writing.emailPlaceholder}
            aria-label={t.form.email}
            className="field"
            style={{ flex: '1 1 160px', padding: '9px 12px' }}
          />
          <button type="submit" className="btn p" style={{ fontSize: 'var(--fs-12)', flexShrink: 0 }}>
            {t.writing.subscribe}
          </button>
        </form>
      </CtaBanner>
    </>
  );

  const dialog = activePost ? (
    <WritingPostDetail post={activePost} all={posts} onClose={closePost} onOpen={openPost} />
  ) : null;

  if (embedded)
    return (
      <>
        {content}
        {dialog}
      </>
    );

  return (
    <div style={{ padding: 'var(--pad-y) var(--pad-x) var(--pad-b)' }}>
      {content}
      {dialog}
    </div>
  );
}
