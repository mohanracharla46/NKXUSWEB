import React, { useEffect } from 'react';

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      {/* Grid */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '32px'
      }}>
        {MOCK_POSTS.map(post => (
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
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500' }}>
                <span>{post.category.toUpperCase()}</span>
                <span>{post.date}</span>
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
            <span style={{
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--text-primary)',
              letterSpacing: '0.05em'
            }}>{post.readTime}</span>
          </article>
        ))}
      </section>
    </div>
  );
}
