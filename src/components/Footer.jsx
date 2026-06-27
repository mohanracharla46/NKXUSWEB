import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Info Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <img src="/assets/logo.png" alt="NKXUS Logo" className="footer-logo-img" />
            </Link>
            <p className="footer-description">
              NKXUS engineers high-impact digital presence for global leaders and ambitious brands. We merge technical precision with premium aesthetics.
            </p>
          </div>

          {/* Links Column 1: Services */}
          <div className="footer-links-col">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links-list">
              <li><Link to="/services">Web Engineering</Link></li>
              <li><Link to="/services">Mobile Architecture</Link></li>
              <li><Link to="/services">Growth Marketing</Link></li>
              <li><Link to="/services">Video Production</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Company */}
          <div className="footer-links-col">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links-list">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/blogs">Journal</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Links Column 3: Legal */}
          <div className="footer-links-col">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links-list">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} NKXUS PVT LTD. ALL RIGHTS RESERVED. DIGITAL ARCHITECTURE.
          </p>
        </div>
      </div>
    </footer>
  );
}
