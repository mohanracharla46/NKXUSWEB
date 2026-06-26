import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import './PrivacyPolicyPage.css';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page-container">
      {/* Breadcrumb nav */}
      <div className="breadcrumb-nav">
        <Link to="/" className="back-link">
          <ArrowLeft size={13} />
          <span>Back to Home</span>
        </Link>
        <span className="crumb-separator">/</span>
        <span className="crumb-current">Privacy Policy</span>
      </div>

      <div className="legal-content-card glass-panel">
        <header className="legal-header">
          <div className="legal-badge-wrap">
            <Shield size={16} className="legal-icon" />
            <span className="legal-badge">// LEGAL COMPLIANCE REGISTER</span>
          </div>
          <h1 className="legal-title text-gradient">Privacy Policy</h1>
          <p className="legal-date">LAST UPDATED: JUNE 26, 2026</p>
        </header>

        <div className="legal-sections">
          <section className="legal-section-block">
            <h3>1. Information Collection Parameters</h3>
            <p>
              NKXUS Pvt Ltd collects specific client telemetry details strictly necessary to establish developer alignment and project feasibility. This includes names, corporate email addresses, and client-submitted scopes, parameters, or specifications.
            </p>
          </section>

          <section className="legal-section-block">
            <h3>2. Data Utilization Rules</h3>
            <p>
              All compiled metrics and initialization parameters are utilized exclusively to audit codebase performance, draft architectural proposals, and formulate cost estimations. We do not engage in tracking analytics beyond native site navigation patterns.
            </p>
          </section>

          <section className="legal-section-block">
            <h3>3. Security Architecture & Encryption</h3>
            <p>
              Communications with our database and portals network are protected using TLS 1.3 protocol handshakes. Client details are stored inside isolated, password-restricted database partitions configured to prevent external ingress.
            </p>
          </section>

          <section className="legal-section-block">
            <h3>4. Disclosures & Distribution</h3>
            <p>
              NKXUS Pvt Ltd does not sell, rent, trade, or distribute corporate search telemetry, email addresses, or proprietary client data files to external third-party advertising brokers or syndicates.
            </p>
          </section>

          <section className="legal-section-block">
            <h3>5. Contact Protocol</h3>
            <p>
              For legal compliance questions or details removal requests, initialize an official inquiry via our alignment channels or reach us directly at <strong>compliance@nkxus.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
