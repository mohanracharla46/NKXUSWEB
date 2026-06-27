import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import './Home.css';

function AnimatedSection({ children, className, style }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.05 }
    );
    const current = domRef.current;
    if (current) {
      observer.observe(current);
    }
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${className} ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      style={style}
    >
      {children}
    </div>
  );
}

function TelemetryScreen() {
  const [logs, setLogs] = useState([
    'SYSTEM INIT [OK]',
    'BOOTING CORE TELEMETRY...',
    'SECURE SHIELD LINK [ACTIVE]',
    'LIGHTHOUSE OPTIMIZING...',
  ]);

  useEffect(() => {
    const lines = [
      'SSL HANDSHAKE v1.3 [OK]',
      'Pinging nodes.blr.nkxus.net [OK]',
      'Lighthouse score: 100/100',
      'BUNDLE SIZE: 42KB [OPTIMIZED]',
      'SSR cache warming completed',
      'COMPILER: Oxlint checks [0 errors]',
      'DB Latency: 1.2ms [excellent]',
      'ACTIVE CDN: edge.india.nkxus [OK]',
      'deploying production hash: af9d2e...',
      'SYSTEM NODES: 14/14 healthy',
    ];

    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextLogs = [...prev.slice(1)];
        const nextLine = lines[Math.floor(Math.random() * lines.length)];
        const time = new Date().toLocaleTimeString().split(' ')[0];
        nextLogs.push(`[${time}] ${nextLine}`);
        return nextLogs;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="telemetry-widget">
      {logs.map((log, idx) => (
        <div key={idx} className="telemetry-line">
          <span className="telemetry-glow-dot"></span>{' '}
          {log.includes('[OK]') ? (
            <>
              {log.split('[OK]')[0]}
              <span className="telemetry-success">[OK]</span>
              {log.split('[OK]')[1]}
            </>
          ) : (
            log
          )}
        </div>
      ))}
    </div>
  );
}

function RadialGauge({ name, value, max = 100, suffix = '', label }) {
  const [animate, setAnimate] = useState(false);
  const [count, setCount] = useState(0);
  const gaugeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.1 }
    );
    const current = gaugeRef.current;
    if (current) {
      observer.observe(current);
    }
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  useEffect(() => {
    if (!animate) return;
    
    let start = 0;
    const end = value;
    const duration = 1500;
    const isFloat = end % 1 !== 0;
    const increment = isFloat ? end / (duration / 16) : Math.ceil(end / (duration / 16));
    let timer;

    const run = () => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start));
      }
    };

    timer = setInterval(run, 16);
    return () => clearInterval(timer);
  }, [animate, value]);

  const dashoffset = animate 
    ? 283 - (283 * value) / max 
    : 283;

  const gradId = `gauge-grad-${name.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="radial-item" ref={gaugeRef}>
      <div className="radial-circle-box">
        <svg className="radial-circle-svg">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--glow-1-solid)" />
              <stop offset="100%" stopColor="var(--glow-2-solid)" />
            </linearGradient>
          </defs>
          <circle className="radial-bg-circle" cx="50" cy="50" r="45" />
          <circle 
            className="radial-fill-circle" 
            cx="50" 
            cy="50" 
            r="45" 
            stroke={`url(#${gradId})`}
            style={{ strokeDashoffset: dashoffset }}
          />
        </svg>
        <span className="radial-value-display">
          {label ? `${count} / ${max}` : `${count}${suffix}`}
        </span>
      </div>
      <span className="radial-label-display">{name}</span>
    </div>
  );
}

export default function Home() {
  const [animateProgress, setAnimateProgress] = useState(false);
  const progressRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateProgress(true);
        }
      },
      { threshold: 0.1 }
    );
    const current = progressRef.current;
    if (current) {
      observer.observe(current);
    }
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  const benchmarks = [
    { name: 'Client Retention Rate', value: 94, suffix: '%' },
    { name: 'On-Time Delivery', value: 91, suffix: '%' },
    { name: 'System Uptime SLA', value: 99.9, suffix: '%' },
    { name: 'NPS Score', value: 88, max: 100, label: '88 / 100' }
  ];

  return (
    <div className="home-page-view">
      <Hero />
      <Stats />

      {/* Our Clients Section */}
      <AnimatedSection className="clients-section">
        <div className="clients-container">
          <span className="clients-badge">
            <span className="clients-badge-line"></span> PRESTIGE PARTNERS
          </span>
          <h2 className="clients-title">Trusted by Industry Leaders</h2>
          <div className="clients-ticker-wrap">
            <div className="clients-ticker">
              <div className="client-logo">AETHER CAPITAL</div>
              <div className="client-logo">LUMINA LABS</div>
              <div className="client-logo">ZENITH DIGITAL</div>
              <div className="client-logo">AURELIA</div>
              <div className="client-logo">VANGUARD GROUP</div>
              {/* Duplicate for infinite loop */}
              <div className="client-logo">AETHER CAPITAL</div>
              <div className="client-logo">LUMINA LABS</div>
              <div className="client-logo">ZENITH DIGITAL</div>
              <div className="client-logo">AURELIA</div>
              <div className="client-logo">VANGUARD GROUP</div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Why NKXUS Bento Grid Section */}
      <AnimatedSection className="why-nkxus-section">
        <div className="why-nkxus-container">
          <div className="why-header">
            <span className="why-badge">
              <span className="why-badge-line"></span> WHY NKXUS
            </span>
            <h2 className="why-title">The Standard Others Are Measured Against.</h2>
          </div>

          <div className="bento-grid">
            {/* 1. Proven at Scale */}
            <div className="bento-card card-scale">
              <div className="bento-info">
                <span className="bento-label">SCALE TELEMETRY</span>
                <h3 className="bento-title">Proven at Scale</h3>
                <p className="bento-desc">
                  500+ successful deployments across fintech, healthcare, and retail. Built to ship on deadline.
                </p>
              </div>
              <TelemetryScreen />
            </div>

            {/* 2. Security-First Engineering */}
            <div className="bento-card card-security">
              <div className="bento-info">
                <span className="bento-label">HARDENED SYSTEMS</span>
                <h3 className="bento-title">Security-First</h3>
                <p className="bento-desc">
                  ISO 27001 certified. Every deployment undergoes automated scanner checks and rigorous code review.
                </p>
              </div>
              <div className="security-widget">
                <div className="security-scanner-line"></div>
                <div className="security-stats">
                  <div className="security-status-item">
                    <span>FIREWALL:</span>
                    <span className="security-status-val">ACTIVE</span>
                  </div>
                  <div className="security-status-item">
                    <span>SSL/TLS:</span>
                    <span className="security-status-val">v1.3 [OK]</span>
                  </div>
                  <div className="security-status-item">
                    <span>DECRYPT:</span>
                    <span className="security-status-val">RESTRICTED</span>
                  </div>
                </div>
                <svg className="security-shield-svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-primary)', opacity: 0.8 }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
            </div>

            {/* 3. Performance Benchmarks Showcase (Full Width) */}
            <div className="bento-card card-benchmarks">
              <div className="bento-info" style={{ marginBottom: '16px' }}>
                <span className="bento-label">PERFORMANCE BENCHMARKS</span>
                <h3 className="bento-title">Real-Time Execution Telemetry</h3>
                <p className="bento-desc">
                  We don't match industry benchmarks — we establish the ceiling others reach for.
                </p>
              </div>
              <div className="radial-benchmarks-container">
                {benchmarks.map((bench, idx) => (
                  <RadialGauge 
                    key={idx}
                    name={bench.name}
                    value={bench.value}
                    max={bench.max}
                    suffix={bench.suffix}
                    label={bench.label}
                  />
                ))}
              </div>
            </div>

            {/* 4. One Partner, Full Stack */}
            <div className="bento-card card-fullstack">
              <div className="bento-info">
                <span className="bento-label">PARTNERSHIP LAYER</span>
                <h3 className="bento-title">One Partner, Full Stack</h3>
                <p className="bento-desc">
                  Design, development, cloud, and growth marketing unified under single-team accountability.
                </p>
              </div>
              <div className="synergy-stack-widget">
                <div className="synergy-layers-container">
                  <div className="synergy-layer layer-1">GROWTH FUNNEL</div>
                  <div className="synergy-layer layer-2">ENGINEERING standards</div>
                  <div className="synergy-layer layer-3">CLOUD ARCHITECTURE</div>
                  <div className="synergy-layer layer-4">LUXURY UX/UI DESIGN</div>
                </div>
              </div>
            </div>

            {/* 5. Radared Geographical Authority */}
            <div className="bento-card card-radar">
              <div className="bento-info">
                <span className="bento-label">GEOGRAPHICAL Pack</span>
                <h3 className="bento-title">Hyderabad & Bangalore</h3>
                <p className="bento-desc">
                  Headquartered in Hyderabad with operations in Bangalore, delivering digital superiority across India.
                </p>
              </div>
              <div className="radar-map-widget">
                <div className="radar-grid"></div>
                <div className="radar-crosshair-h"></div>
                <div className="radar-crosshair-v"></div>
                <div className="radar-sweep-hand"></div>
                <div className="radar-blip blip-hyd">
                  <div className="radar-blip-ripple"></div>
                </div>
                <div className="radar-blip blip-blr">
                  <div className="radar-blip-ripple" style={{ animationDelay: '1s' }}></div>
                </div>
                <div className="radar-coordinates">
                  HYD: 17.3850° N, 78.4867° E<br />
                  BLR: 12.9716° N, 77.5946° E
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>


      {/* Testimonials Section */}
      <AnimatedSection className="testimonials-section">
        <div className="testimonials-container">
          <span className="testimonials-badge">
            <span className="testimonials-badge-line"></span> CLIENT VERIFICATIONS
          </span>
          <h2 className="testimonials-title">System Authority Endorsements</h2>
          <div className="testimonials-track-wrap">
            <div className="testimonials-track">
              <div className="testimonial-card">
                <p className="testimonial-quote">
                  "NKXUS delivered a complete redesign of our trading terminal UI. The system uptime and client onboarding metrics immediately spiked."
                </p>
                <div className="testimonial-author">
                  <span className="author-name">Vikram Malhotra</span>
                  <span className="author-role">VP of Product, Aether Capital</span>
                </div>
              </div>
              <div className="testimonial-card">
                <p className="testimonial-quote">
                  "Their technical precision is absolute. The application lighthouse score sits at 100/100, and our brand authority has never been stronger."
                </p>
                <div className="testimonial-author">
                  <span className="author-name">Ananya Sen</span>
                  <span className="author-role">Director, Lumina Labs</span>
                </div>
              </div>
              {/* Duplicate for infinite loop */}
              <div className="testimonial-card">
                <p className="testimonial-quote">
                  "NKXUS delivered a complete redesign of our trading terminal UI. The system uptime and client onboarding metrics immediately spiked."
                </p>
                <div className="testimonial-author">
                  <span className="author-name">Vikram Malhotra</span>
                  <span className="author-role">VP of Product, Aether Capital</span>
                </div>
              </div>
              <div className="testimonial-card">
                <p className="testimonial-quote">
                  "Their technical precision is absolute. The application lighthouse score sits at 100/100, and our brand authority has never been stronger."
                </p>
                <div className="testimonial-author">
                  <span className="author-name">Ananya Sen</span>
                  <span className="author-role">Director, Lumina Labs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* Branches Section */}
      <AnimatedSection className="branches-section">
        <div className="branches-container">
          <span className="branches-badge">
            <span className="branches-badge-line"></span> NETWORK NODES
          </span>
          <h2 className="branches-title">Our Branch Locations</h2>
          <div className="branches-grid">
            <div className="branch-card">
              <span className="branch-coords">17.3850° N, 78.4867° E</span>
              <h3 className="branch-city">Hyderabad</h3>
              <p className="branch-role">Corporate HQ</p>
            </div>
            <div className="branch-card">
              <span className="branch-coords">12.9716° N, 77.5946° E</span>
              <h3 className="branch-city">Bangalore</h3>
              <p className="branch-role">Operations & Eng Center</p>
            </div>
            <div className="branch-card">
              <span className="branch-coords">19.0760° N, 72.8777° E</span>
              <h3 className="branch-city">Mumbai</h3>
              <p className="branch-role">Strategic Relations</p>
            </div>
            <div className="branch-card">
              <span className="branch-coords">13.0827° N, 80.2707° E</span>
              <h3 className="branch-city">Chennai</h3>
              <p className="branch-role">Digital Innovation Lab</p>
            </div>
          </div>
          <div className="branches-action-wrap">
            <Link to="/branches" className="btn btn-secondary branches-btn">
              More Branches
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
