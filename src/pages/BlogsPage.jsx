import React, { useEffect, useState } from 'react';
import { apiGet, mapBlog } from '../lib/api';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 5;

const MOCK_POSTS = [
  {
    id: 1,
    title: 'The Blueprint of Digital Authority',
    category: 'Design Philosophy',
    date: 'June 24, 2026',
    desc: 'How prestige brands design interfaces that establish instant credibility and command user trust.',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Optimizing React Apps to a Perfect 100',
    category: 'Engineering',
    date: 'June 18, 2026',
    desc: 'A technical analysis on bundle size reduction, code splitting, and using tools like Oxlint for clean codebases.',
    readTime: '8 min read'
  },
  {
    id: 3,
    title: 'The Silent Power of Monochrome UI',
    category: 'Aesthetics',
    date: 'May 30, 2026',
    desc: 'Why luxury digital brands are shifting away from vibrant primary colors towards high-contrast grayscale styling.',
    readTime: '6 min read'
  }
];

export default function BlogsPage() {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);

    let cancelled = false;

    async function loadBlogs() {
      try {
        const data = await apiGet('/blogs');
        if (!cancelled) {
          setPosts(data.length ? data.map(mapBlog) : MOCK_POSTS);
          setError('');
        }
      } catch {
        if (!cancelled) {
          setPosts(MOCK_POSTS);
          setError('Showing sample journal entries while the backend is unavailable.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadBlogs();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
    setCurrentPage(page => Math.min(page, totalPages));
  }, [posts.length]);

  const pagedPosts = posts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div style={{
      padding: '160px 24px 100px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'var(--font-body)',
      color: 'var(--text-primary)',
      background: 'var(--bg-primary)',
      minHeight: '80vh'
    }}>
      {/* Header */}
      <header style={{ marginBottom: '80px', textAlign: 'center' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
          display: 'block',
          marginBottom: '16px',
          fontFamily: 'var(--font-heading)'
        }}>NKXUS JOURNAL</span>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: '700',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          marginBottom: '24px'
        }}>
          Engineering & <br />
          <span className="text-gradient">Design Intellect.</span>
        </h1>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.6',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Discover our technical investigations, UX theories, and insights on the future of premium web engineering.
        </p>
      </header>

      {error && (
        <p style={{
          maxWidth: '700px',
          margin: '-40px auto 40px auto',
          color: '#f59e0b',
          textAlign: 'center',
          fontSize: '14px'
        }}>{error}</p>
      )}

      {/* Grid */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '32px'
      }}>
        {loading ? (
          <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1', textAlign: 'center' }}>Loading journal entries...</p>
        ) : pagedPosts.map(post => (
          <article key={post.id} style={{
            padding: '32px',
            borderRadius: '16px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--border-color)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'border-color 0.3s ease, transform 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseOver={e => {
            e.currentTarget.style.borderColor = 'var(--border-hover)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.transform = 'none';
          }}>
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  marginBottom: '24px'
                }}
              />
            )}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500' }}>
                <span>{(post.category || 'Insight').toUpperCase()}</span>
                <span>{post.date || 'June 30, 2026'}</span>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '22px',
                fontWeight: '600',
                lineHeight: '1.3',
                marginBottom: '16px',
                color: 'var(--text-primary)'
              }}>{post.title}</h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
                marginBottom: '24px'
              }}>{post.desc}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
              <span style={{
                fontWeight: '600',
                color: 'var(--text-primary)',
                letterSpacing: '0.05em'
              }}>{post.readTime || '3 min read'}</span>
              {post.writer && (
                <span style={{
                  color: 'var(--text-muted)',
                  fontSize: '11px',
                  fontWeight: '500'
                }}>By {post.writer}</span>
              )}
            </div>
          </article>
        ))}
      </section>
      {!loading && (
        <Pagination
          totalItems={posts.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pageSize={PAGE_SIZE}
        />
      )}
    </div>
  );
}
