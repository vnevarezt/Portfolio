import { useState } from 'react';
import { PostMark } from '@/components/marks/PostMark';
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href="#"
      className="card"
      style={{
        padding: 14,
        textDecoration: 'none',
        color: 'var(--fg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        borderColor: hover ? 'var(--ac)' : 'var(--br)',
        transform: hover ? 'translateY(-2px)' : 'none',
        transition: 'all .2s',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          height: 120,
          borderRadius: 10,
          border: '1px solid var(--br)',
          overflow: 'hidden',
          background: 'var(--bg-e)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PostMark kind={post.mark} />
      </div>
      <div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
          <span
            className="m"
            style={{
              fontSize: 9,
              color: 'var(--ac)',
              letterSpacing: '0.14em',
              padding: '2px 6px',
              background: 'var(--ac-s)',
              borderRadius: 4,
              textTransform: 'uppercase',
            }}
          >
            {post.cat}
          </span>
          <span className="m" style={{ fontSize: 10, color: 'var(--fg-d)' }}>
            {post.date} · {post.read} min
          </span>
        </div>
        <div
          className="d"
          style={{
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: '-0.01em',
            lineHeight: 1.35,
            color: hover ? 'var(--ac)' : 'var(--fg)',
            transition: 'color .2s',
          }}
        >
          {post.title}
        </div>
      </div>
    </a>
  );
}
