import React, { useEffect } from 'react';
import './AboutPage.css';

const VALUES = [
  {
    num: '01',
    title: 'Architectural Integrity',
    desc: 'We enforce clean-room React design patterns, optimized render cycles, and modular directory structures.'
  },
  {
    num: '02',
    title: 'Luxury Aesthetics',
    desc: 'Curated grids, Outfit & Inter font setups, and monochrome aesthetics define our signature visual brand.'
  },
  {
    num: '03',
    title: 'Absolute Security',
    desc: 'Hardened endpoints, SSL/TLS v1.3 compliance, and strict dependency review protect client database registers.'
  },
  {
    num: '04',
    title: 'Performance Execution',
    desc: 'We target 100/100 Lighthouse metrics, sub-second TTFB, and zero-dependency animations for extreme speed.'
  },
  {
    num: '05',
    title: 'Strict SLA Delivery',
    desc: 'Pre-aligned developer resources and milestone-driven timelines guarantee on-time code deliveries.'
  },
  {
    num: '06',
    title: 'Scale & Latency Focus',
    desc: 'Built to ingest enterprise requests with distributed CDNs and resilient database cluster parameters.'
  }
];

const TIMELINE = [
  {
    year: '2024',
    title: 'Foundations & Architecture',
    desc: 'NKXUS was established in Hyderabad to deliver zero-compromise React engineering and high-fidelity layouts.'
  },
  {
    year: '2025',
    title: 'Scale & Operations Expansion',
    desc: 'Opened our Bangalore operations center, secured ISO 27001 parameters, and expanded into fintech grids.'
  },
  {
    year: '2026',
    title: 'Prestige Sovereign Networks',
    desc: 'Pioneered custom glassmorphism design systems and micro-telemetry scanners for global leaders.'
  }
];

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page-container">
      {/* Header Section */}
      <header className="about-hero">
        <span className="about-badge">WHO WE ARE</span>
        <h1 className="about-title">
          Architecting Elite <br />
          <span className="text-gradient">Digital Legacies.</span>
        </h1>
        <p className="about-subtitle">
          NKXUS is a luxury digital engineering and aesthetic studio. We merge technical precision with elite designs to establish absolute market authority.
        </p>
      </header>

      {/* Our Values Section - Split Bento Layout */}
      <section className="pillars-split-layout">
        
        {/* Left Column: Sticky Summary & Telemetry */}
        <div className="pillars-sticky-left">
          <div className="pillars-left-heading">
            <span>ENGINEERING PRINCIPLES</span>
            <h2>Our Core Pillars</h2>
          </div>
          
          <div className="pillars-summary-card glass-panel">
            <div className="pillars-summary-glow"></div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '600' }}>Standard Authority</h3>
            <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              Our systems are measured against target parameters established to assure performance, compliance, and flawless brand execution.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              <div className="summary-stat-row">
                <span className="stat-label">Lighthouse target</span>
                <span className="stat-val">100 / 100</span>
              </div>
              <div className="summary-stat-row">
                <span className="stat-label">System Uptime SLA</span>
                <span className="stat-val">99.99%</span>
              </div>
              <div className="summary-stat-row">
                <span className="stat-label">Average API latency</span>
                <span className="stat-val">&lt; 14ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Staggered Cards */}
        <div className="pillars-stack">
          {VALUES.map((val, idx) => (
            <div key={idx} className="pillar-premium-card glass-panel">
              <span className="pillar-number">{val.num}</span>
              <div className="pillar-info">
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        <div className="timeline-section-header">
          <span>MILESTONES REGISTER</span>
          <h2>Our Progression Track</h2>
        </div>

        <div className="timeline-track-wrapper">
          {TIMELINE.map((time, idx) => (
            <div key={idx} className="timeline-node">
              <div className="timeline-dot"></div>
              <span className="timeline-year">{time.year}</span>
              <h3 className="timeline-node-title">{time.title}</h3>
              <p className="timeline-node-desc">{time.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
