import React, { useEffect } from 'react';

export default function AboutPage() {
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
      {/* Header Section */}
      <header style={{ marginBottom: '80px', textAlign: 'center' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
          display: 'block',
          marginBottom: '16px',
          fontFamily: 'var(--font-heading)'
        }}>WHO WE ARE</span>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: '700',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          marginBottom: '24px'
        }}>
          Architecting Elite <br />
          <span className="text-gradient">Digital Legacies.</span>
        </h1>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.6',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          NKXUS is a premium digital engineering studio. We unify luxury UX/UI design with high-performance software systems to establish absolute market authority.
        </p>
      </header>

      {/* Grid Content */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '40px',
        marginBottom: '100px'
      }}>
        <div style={{
          padding: '40px',
          borderRadius: '16px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--border-color)',
          backdropFilter: 'blur(12px)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '16px', fontWeight: '600' }}>Our Vision</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '15px' }}>
            To build digital ecosystems that don't just participate in the market, but actively redefine the standard of prestige design and technical execution.
          </p>
        </div>

        <div style={{
          padding: '40px',
          borderRadius: '16px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--border-color)',
          backdropFilter: 'blur(12px)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '16px', fontWeight: '600' }}>Technical Precision</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '15px' }}>
            We implement clean-room React architectures, zero-dependency animations, and optimized server runtimes for extreme page loads and unmatched security.
          </p>
        </div>

        <div style={{
          padding: '40px',
          borderRadius: '16px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--border-color)',
          backdropFilter: 'blur(12px)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '16px', fontWeight: '600' }}>Prestige Aesthetics</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '15px' }}>
            We leverage tailored typography, curated monochromatic palettes, and slow cosmic micro-interactions to deliver a signature, elite digital experience.
          </p>
        </div>
      </section>
    </div>
  );
}
