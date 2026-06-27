import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Background Video */}
      <div className="hero-video-bg">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay"></div>
      </div>

      <div className="hero-glow-blob blob-1"></div>
      <div className="hero-glow-blob blob-2"></div>
      
      {/* Drifting telemetry digital parameters */}
      <div className="hero-telemetry telemetry-1">[SYS_STATUS: ACTIVE]</div>
      <div className="hero-telemetry telemetry-2">LOC_REF: 0x4F92B</div>
      <div className="hero-telemetry telemetry-3">PING: 14ms</div>
      <div className="hero-telemetry telemetry-4">SEC_HANDSHAKE: OK</div>

      {/* Radial telemetry engineering waves */}
      <div className="hero-ripple ripple-1"></div>
      <div className="hero-ripple ripple-2"></div>
      <div className="hero-ripple ripple-3"></div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge-wrap">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">THE FUTURE OF PRESTIGE DIGITAL</span>
            </div>
          </div>

          <div className="hero-title-wrap">
            <h1 className="hero-title">
              <span className="hero-title-line line-1">
                <span>Building Reputation.</span>
              </span>
              <span className="hero-title-line line-2">
                <span className="text-gradient">Creating Growth.</span>
              </span>
            </h1>
          </div>

          <div className="hero-subtitle-wrap">
            <p className="hero-subtitle">
              NKXUS engineers high-impact digital presence for global leaders and ambitious brands.
              We merge technical precision with premium aesthetics to define your authority in the digital space.
            </p>
          </div>

          <div className="hero-actions-wrap">
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                Start Your Growth <ArrowRight size={16} className="btn-arrow" />
              </Link>
              <Link to="/services" className="btn btn-secondary">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
