import React, { useEffect } from 'react';

const JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Architect',
    department: 'Engineering',
    location: 'Hyderabad / Hybrid',
    type: 'Full-time'
  },
  {
    id: 2,
    title: 'Prestige UX/UI Designer',
    department: 'Design',
    location: 'Bangalore / Hybrid',
    type: 'Full-time'
  },
  {
    id: 3,
    title: 'Growth Marketing Strategist',
    department: 'Growth',
    location: 'Remote (India)',
    type: 'Full-time'
  }
];

export default function CareersPage() {
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
        }}>WE ARE HIRING</span>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: '700',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          marginBottom: '24px'
        }}>
          Shape the Future of <br />
          <span className="text-gradient">Digital Architecture.</span>
        </h1>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.6',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Join a team of elite engineers and designers crafting the digital frameworks of tomorrow. We value precision, luxury aesthetics, and clean execution.
        </p>
      </header>

      {/* JobList */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {JOBS.map(job => (
          <div key={job.id} style={{
            padding: '32px',
            borderRadius: '16px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--border-color)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            transition: 'border-color 0.3s ease, transform 0.3s ease'
          }}
          onMouseOver={e => {
            e.currentTarget.style.borderColor = 'var(--border-hover)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.transform = 'none';
          }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                {job.department.toUpperCase()} / {job.type.toUpperCase()}
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)' }}>{job.title}</h3>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>{job.location}</span>
            </div>
            <a href="/contact" style={{
              padding: '12px 24px',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              background: 'var(--text-primary)',
              color: 'var(--bg-primary)',
              fontSize: '14px',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease'
            }}
            onMouseOver={e => e.target.style.opacity = '0.9'}
            onMouseOut={e => e.target.style.opacity = '1'}>
              Apply Now
            </a>
          </div>
        ))}
      </section>
    </div>
  );
}
