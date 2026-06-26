import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
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
      <div className="section-header">
        <h2 className="section-title">Start Your Growth</h2>
        <p className="section-subtitle">
          Submit your details to establish your authority in the prestige digital landscape.
        </p>
      </div>

      <div className="contact-container">
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
    </section>
  );
}
