import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, Phone, Clock, MapPin } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-page-wrapper">
        
        {/* Left Column: Direct Contact Info */}
        <div className="contact-info-column">
          <div className="contact-badge-wrap">
            <span className="contact-badge">// CONNECTION PATHWAY</span>
          </div>
          <h2 className="contact-title text-gradient">Start Your Growth.</h2>
          <p className="contact-subtitle">
            Connect with our engineering partners to discuss capabilities, architecture blueprints, or request developer alignment details.
          </p>

          <div className="contact-info-cards">
            <div className="info-card glass-panel">
              <Clock size={16} className="info-card-icon" />
              <div>
                <h4>Response SLA</h4>
                <p>Partners response guaranteed within 24 hours.</p>
              </div>
            </div>

            <div className="info-card glass-panel">
              <Mail size={16} className="info-card-icon" />
              <div>
                <h4>Partner Inquiries</h4>
                <p>partners@nkxus.com</p>
                <p style={{ marginTop: '2px', fontSize: '12px', color: 'var(--text-muted)' }}>General: info@nkxus.com</p>
              </div>
            </div>

            <div className="info-card glass-panel">
              <MapPin size={16} className="info-card-icon" />
              <div>
                <h4>Node HQ</h4>
                <p>Gachibowli, Hyderabad, TS, India</p>
                <p style={{ marginTop: '2px', fontSize: '12px', color: 'var(--text-muted)' }}>ORR Hub, Bangalore, KA, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="contact-form-column">
          {submitted ? (
            <div className="contact-success glass-panel">
              <CheckCircle2 size={48} className="success-icon animate-float" />
              <h3>Request Received</h3>
              <p>Our partners director will contact you via email within 24 hours.</p>
              <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form glass-panel" onSubmit={handleSubmit}>
              <h3 className="form-heading">Initialize Alignment</h3>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="form-input"
                />
                <label htmlFor="name" className="form-label">
                  Name / Enterprise name
                </label>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="form-input"
                />
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder=" "
                  className="form-input form-textarea"
                  rows={4}
                ></textarea>
                <label htmlFor="message" className="form-label">
                  Project goals & constraints
                </label>
              </div>

              <button type="submit" className="btn btn-primary submit-btn" disabled={submitting}>
                {submitting ? 'Initiating...' : 'Submit Request'}
                {!submitting && <Send size={16} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
