import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import PortalsPage from './pages/PortalsPage';
import ContactPage from './pages/ContactPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import AboutPage from './pages/AboutPage';
import BlogsPage from './pages/BlogsPage';

export default function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/portals" element={<PortalsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
        </Routes>
      </main>
      <footer style={{
        padding: '40px 24px',
        textAlign: 'center',
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        fontSize: '11px',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-body)',
        letterSpacing: '0.05em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px'
      }}>
        <p>&copy; {new Date().getFullYear()} NKXUS PVT LTD. ALL RIGHTS RESERVED. DIGITAL ARCHITECTURE.</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} onMouseOver={e => e.target.style.color = 'var(--text-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>PRIVACY POLICY</Link>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <Link to="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'var(--transition-smooth)' }} onMouseOver={e => e.target.style.color = 'var(--text-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>TERMS & CONDITIONS</Link>
        </div>
      </footer>
    </Router>
  );
}
