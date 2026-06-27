import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ExternalLink, Code, Layers, Globe, Smartphone, Shield } from 'lucide-react';

const PORTFOLIO_CATEGORIES = ['All', 'Web Engineering', 'Mobile Architecture', 'Cloud Architecture'];

const PORTFOLIO_PROJECTS = [
  {
    title: 'Aether Capital Terminal',
    category: 'Web Engineering',
    tag: 'FINANCIAL WEB INTERFACE',
    desc: 'A complete custom redesign of a high-frequency trading terminal UI. Built with clean-room React patterns, resulting in sub-12ms render cycles and immediate client onboarding spikes.',
    metrics: { primary: 'Render Speed', val: '<12ms' },
    icon: <Code size={20} />
  },
  {
    title: 'Lumina Labs Cluster Array',
    category: 'Cloud Architecture',
    tag: 'ENTERPRISE DATABASE SYSTEM',
    desc: 'Configured a multi-region distributed CDN, edge caching layers, and database clusters. Resulted in 100/100 Lighthouse metrics and absolute system uptime scaling.',
    metrics: { primary: 'Uptime SLA', val: '99.99%' },
    icon: <Shield size={20} />
  },
  {
    title: 'Quantum Innovation Hub',
    category: 'Web Engineering',
    tag: 'ESTABLISHED LUXURY BRANDING',
    desc: 'Pioneered custom glassmorphism components and interactive micro-telemetry panels. Merges absolute engineering standards with visual aesthetics.',
    metrics: { primary: 'Lighthouse Score', val: '100/100' },
    icon: <Globe size={20} />
  },
  {
    title: 'Prestige Mobile Gateway',
    category: 'Mobile Architecture',
    tag: 'CROSS-PLATFORM REACT APP',
    desc: 'High-performance React Native app managing client portfolios. Integrates localized secure keychain access and real-time push telemetry.',
    metrics: { primary: 'API Latency', val: '<15ms' },
    icon: <Smartphone size={20} />
  },
  {
    title: 'Sovereign Network Registry',
    category: 'Cloud Architecture',
    tag: 'DEPENDENCY-FREE SECURE PORTAL',
    desc: 'Designed a zero-dependency local dashboard interface for secure identity logging and server status monitoring.',
    metrics: { primary: 'Sovereign Nodes', val: '14 active' },
    icon: <Layers size={20} />
  }
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div style={{
      padding: '160px 24px 100px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'var(--font-body)',
      color: 'var(--text-primary)',
      background: 'var(--bg-primary)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '80px'
    }}>
      {/* Page Header */}
      <header style={{ textAlign: 'center' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
          display: 'block',
          marginBottom: '16px',
          fontFamily: 'var(--font-heading)'
        }}>SELECTED WORK</span>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: '700',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          marginBottom: '24px'
        }}>
          NKXUS <br />
          <span className="text-gradient">Portfolio Registry.</span>
        </h1>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.6',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Explore our featured systems engineering, mobile architecture, and digital interfaces designed for market leaders.
        </p>
      </header>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {PORTFOLIO_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '12px 24px',
              borderRadius: '30px',
              border: selectedCategory === category ? '1px solid var(--text-primary)' : '1px solid var(--border-color)',
              background: selectedCategory === category ? 'var(--text-primary)' : 'var(--glass-bg)',
              color: selectedCategory === category ? 'var(--bg-primary)' : 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: 'var(--font-heading)',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Stack / Grid */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '32px'
      }}>
        {filteredProjects.map((project, idx) => (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '36px',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = 'var(--border-hover)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)'
              }}>
                {project.icon}
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em'
              }}>
                {project.category.toUpperCase()}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.1em' }}>
                {project.tag}
              </span>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '22px',
                fontWeight: '600'
              }}>
                {project.title}
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--text-secondary)'
              }}>
                {project.desc}
              </p>
            </div>

            <div style={{
              marginTop: 'auto',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                  {project.metrics.primary}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: '600' }}>
                  {project.metrics.val}
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: 'var(--text-muted)',
                fontWeight: '600'
              }}>
                <span>CASE STUDY</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
