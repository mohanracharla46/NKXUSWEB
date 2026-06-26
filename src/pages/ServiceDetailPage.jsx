import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Send, ShieldCheck, Cpu } from 'lucide-react';
import { allServices } from '../data/servicesData';
import './ServiceDetailPage.css';

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    notes: ''
  });

  // Find active service
  const service = allServices.find(s => s.id === serviceId);

  // Auto-scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
    setFormSubmitted(false);
    if (service) {
      setFormData(prev => ({
        ...prev,
        notes: `I would like to initialize a project targeting the "${service.title}" capability. Please provide timelines and cost estimates.`
      }));
    }
  }, [serviceId, service]);

  if (!service) {
    return (
      <div className="services-page-container service-not-found">
        <h2 className="text-gradient">CAPABILITY NOT FOUND</h2>
        <p>The service code "{serviceId}" does not exist in our active registers.</p>
        <Link to="/services" className="back-btn-link">
          <ArrowLeft size={14} /> Back to Services
        </Link>
      </div>
    );
  }

  // Handle Form Actions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    // Simulate API Submission
    setFormSubmitted(true);
  };

  // Find next service in sequence for easy traversal
  const currentIndex = allServices.findIndex(s => s.id === service.id);
  const nextService = allServices[(currentIndex + 1) % allServices.length];

  return (
    <div className="service-detail-container">
      {/* Back button and breadcrumb */}
      <div className="breadcrumb-nav">
        <Link to="/services" className="back-link">
          <ArrowLeft size={13} />
          <span>Back to Services</span>
        </Link>
        <span className="crumb-separator">/</span>
        <span className="crumb-parent">{service.categoryTitle}</span>
        <span className="crumb-separator">/</span>
        <span className="crumb-current">{service.title}</span>
      </div>

      {/* Main Service Layout Split */}
      <div className="service-detail-grid">
        {/* Left Column: Core information */}
        <div className="service-info-column">
          <div className="service-header-card glass-panel" style={{ '--accent-glow-color': service.categoryColor }}>
            <div className="header-meta">
              <span className="meta-code" style={{ color: service.categoryColor }}>{service.code}</span>
              <span className="meta-badge" style={{ borderColor: 'var(--border-hover)', color: service.categoryColor }}>
                {service.metric}
              </span>
            </div>
            <h1 className="service-detail-title">{service.title}</h1>
            <p className="service-detail-desc">{service.description}</p>
          </div>

          {/* Key Capabilities Bullet checkmarks */}
          {service.features && (
            <div className="service-section-box">
              <h3 className="section-box-title">Key Capabilities</h3>
              <div className="features-check-list">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="feature-check-item">
                    <CheckCircle2 size={16} className="check-icon" style={{ color: service.categoryColor }} />
                    <span className="feature-text">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Associated Platform Technologies */}
          <div className="service-section-box">
            <h3 className="section-box-title">Associated Stack & Tools</h3>
            <div className="detail-tech-badges">
              {service.tech.map((t, idx) => (
                <span key={idx} className="detail-tech-badge" style={{ borderColor: 'var(--border-color)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pre-populated Quote Form */}
        <div className="service-cta-column">
          <div className="cta-form-card glass-panel" style={{ '--accent-border-color': service.categoryColor }}>
            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="cta-interactive-form">
                <div className="form-title-wrap">
                  <Cpu size={18} style={{ color: service.categoryColor }} />
                  <h3>Initialize Capabilities</h3>
                </div>
                <p className="form-subtitle">Fill in details to request pricing, schedules, and developer alignment details.</p>

                <div className="form-fields-group">
                  <div className="field-wrapper">
                    <label htmlFor="name" className="field-lbl">FULL NAME</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input-box"
                    />
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="email" className="field-lbl">CORPORATE EMAIL</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      placeholder="e.g. john@yourcompany.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input-box"
                    />
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="notes" className="field-lbl">INITIALIZATION PARAMETERS / SCOPE</label>
                    <textarea 
                      id="notes"
                      name="notes"
                      rows="4"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="form-input-box text-area-box"
                    />
                  </div>
                </div>

                <button type="submit" className="form-submit-button" style={{ background: service.categoryColor }}>
                  <span>REQUEST ALIGNMENT</span>
                  <Send size={13} />
                </button>
              </form>
            ) : (
              <div className="form-success-state">
                <ShieldCheck size={48} className="success-icon-svg" style={{ color: service.categoryColor }} />
                <h3>CAPABILITY SUBMITTED</h3>
                <p>We have queued initialization for code <strong>{service.code}</strong>. Our digital engineering team will contact you at <strong>{formData.email}</strong> within 12 hours.</p>
                <button onClick={() => setFormSubmitted(false)} className="reset-form-btn">
                  Edit Request Details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Traversal Footer Navigation */}
      <footer className="detail-traversal-footer">
        <Link to={`/services/${nextService.id}`} className="next-capability-card glass-panel" style={{ '--accent-glow-color': nextService.categoryColor }}>
          <div className="next-meta">
            <span className="next-lbl">BROWSE NEXT CAPABILITY</span>
            <span className="next-code" style={{ color: nextService.categoryColor }}>{nextService.code}</span>
          </div>
          <div className="next-title-row">
            <h4>{nextService.title}</h4>
            <ArrowRight size={16} />
          </div>
        </Link>
      </footer>
    </div>
  );
}
