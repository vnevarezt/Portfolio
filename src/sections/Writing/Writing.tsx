import { useState } from 'react';
import { ArrowIcon } from '@/components/icons/Icons';
import { POSTS } from '@/data/posts';

export function Writing() {
  const [filter, setFilter] = useState('All');
  const cats = ['All', ...new Set(POSTS.map((p) => p.cat))];
  const list = POSTS.filter((p) => filter === 'All' || p.cat === filter);
  const [feat, ...rest] = list;

  return (
    <div style={{ padding: 'var(--pad-y) var(--pad-x) var(--pad-b)', maxWidth: 'min(960px, 100%)' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 6,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div
          className="m"
          style={{ fontSize: 'var(--fs-9)', color: 'var(--fg-d)', letterSpacing: '0.18em' }}
        >
          05 · WRITING
        </div>
        <div
          className="m"
          style={{ fontSize: 'var(--fs-9)', color: 'var(--fg-d)', letterSpacing: '0.1em' }}
        >
          {POSTS.length} essays · updated weekly
        </div>
      </div>
      <h2
        className="d"
        style={{ fontSize: 'var(--fs-36)', fontWeight: 500, letterSpacing: '-0.035em', margin: '0 0 8px' }}
      >
        Notes from <em style={{ color: 'var(--ac)', fontStyle: 'italic' }}>the edit</em>.
      </h2>
      <p
        style={{
          fontSize: 'var(--fs-14)',
          color: 'var(--fg-m)',
          margin: '0 0 24px',
          lineHeight: 1.55,
          maxWidth: 560,
        }}
      >
        Short essays on design, code, and the in-between. Opinions are mine; typos are too.
      </p>

      {/* Filter */}
      <div
        style={{
          display: 'flex',
          gap: 4,
          padding: 3,
          background: 'var(--bg-c)',
          border: '1px solid var(--br)',
          borderRadius: 999,
          width: 'fit-content',
          marginBottom: 20,
          flexWrap: 'wrap',
        }}
      >
        {cats.map((c) => (
          <button
            key={c}
            className={filter === c ? 'accent-surface' : undefined}
            onClick={() => setFilter(c)}
            style={{
              padding: '6px 14px',
              border: 'none',
              borderRadius: 999,
              background: filter === c ? undefined : 'transparent',
              color: filter === c ? undefined : 'var(--fg-m)',
              fontFamily: 'var(--font-b)',
              fontSize: 'var(--fs-12)',
              cursor: 'pointer',
              transition: 'all .15s',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Featured */}
      {feat && (
        <a
          href="#"
          className="card featured-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'var(--featured-cols)',
            gap: 0,
            overflow: 'hidden',
            textDecoration: 'none',
            color: 'var(--fg)',
            marginBottom: 14,
            transition: 'border-color .2s, transform .2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--ac)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--br)';
            e.currentTarget.style.transform = '';
          }}
        >
          <div
            className="gbg featured-deco"
            style={{
              position: 'relative',
              minHeight: 220,
              background: `oklch(${feat.hue === 130 ? '25%' : '20%'} 0.08 ${feat.hue} / 0.35)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 22,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at 30% 30%, oklch(60% 0.2 ${feat.hue} / 0.18), transparent 60%)`,
              }}
            />
            <div style={{ position: 'relative' }}>
              <span
                className="m"
                style={{
                  fontSize: 'var(--fs-9)',
                  padding: '3px 9px',
                  borderRadius: 999,
                  background: `oklch(70% 0.18 ${feat.hue} / 0.2)`,
                  color: `oklch(85% 0.15 ${feat.hue})`,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                {feat.cat}
              </span>
              <span
                className="m"
                style={{
                  fontSize: 'var(--fs-9)',
                  color: 'var(--fg-d)',
                  letterSpacing: '0.14em',
                  marginLeft: 10,
                  textTransform: 'uppercase',
                }}
              >
                Featured
              </span>
            </div>
            <div
              className="featured-quote"
              style={{
                position: 'relative',
                fontSize: 88,
                lineHeight: 0.9,
                letterSpacing: '-0.05em',
                fontFamily: 'var(--font-d)',
                fontWeight: 500,
                color: `oklch(82% 0.17 ${feat.hue} / 0.9)`,
                fontStyle: 'italic',
              }}
            >
              "
            </div>
          </div>
          <div
            style={{
              padding: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <h3
              className="d"
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
                fontSize: 11,
                flexWrap: 'wrap',
              }}
            >
              <span className="m" style={{ color: 'var(--fg-d)' }}>
                {feat.date}
              </span>
              <span className="m" style={{ color: 'var(--fg-d)' }}>·</span>
              <span className="m" style={{ color: 'var(--fg-d)' }}>
                {feat.read} read
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  color: 'var(--ac)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 12,
                }}
              >
                Read <ArrowIcon size={12} />
              </span>
            </div>
          </div>
        </a>
      )}

      {/* Rest grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 10,
        }}
      >
        {rest.map((p, i) => (
          <a
            key={i}
            href="#"
            className="card"
            style={{
              padding: 'var(--space-5)',
              textDecoration: 'none',
              color: 'var(--fg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              transition: 'border-color .2s, transform .2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--ac)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--br)';
              e.currentTarget.style.transform = '';
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                className="m"
                style={{
                  fontSize: 'var(--fs-9)',
                  padding: '3px 8px',
                  borderRadius: 999,
                  background: `oklch(70% 0.18 ${p.hue} / 0.14)`,
                  color: `oklch(78% 0.15 ${p.hue})`,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {p.cat}
              </span>
              <span className="m" style={{ fontSize: 'var(--fs-11)', color: 'var(--fg-d)' }}>
                {p.read}
              </span>
            </div>
            <h3
              className="d"
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
              <span
                style={{
                  color: 'var(--ac)',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 11,
                }}
              >
                <ArrowIcon size={11} />
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Subscribe */}
      <div
        style={{
          marginTop: 36,
          padding: 'var(--space-5) var(--space-6)',
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
          <div className="d" style={{ fontSize: 'var(--fs-15)', fontWeight: 500 }}>
            New essay every other week.
          </div>
          <div style={{ fontSize: 'var(--fs-12)', color: 'var(--fg-m)', marginTop: 2 }}>
            No spam. Unsubscribe with one click.
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: 'flex', gap: 6, flexWrap: 'wrap', width: '100%', maxWidth: 380 }}
        >
          <input
            type="email"
            placeholder="contact@vicentcodes.com"
            className="field"
            style={{ flex: '1 1 160px', padding: '9px 12px' }}
          />
          <button type="submit" className="btn p" style={{ fontSize: 'var(--fs-12)', flexShrink: 0 }}>
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
