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
            <div className="footer-socials">
              <a href="https://wa.me/919160442065" target="_blank" rel="noopener noreferrer" className="social-link whatsapp-link" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.982L2 22l5.233-1.371a9.936 9.936 0 004.779 1.229h.004c5.505 0 9.986-4.477 9.988-9.985a9.965 9.965 0 00-2.926-7.06A9.929 9.929 0 0012.012 2zm5.727 14.047c-.245.69-1.42 1.253-1.956 1.302-.489.043-.996.064-3.155-.783-2.759-1.084-4.507-3.89-4.646-4.076-.137-.187-1.12-1.492-1.12-2.846 0-1.354.707-2.018.958-2.28.25-.264.551-.33.734-.33.184 0 .368.002.528.009.167.008.393-.064.615.47.227.549.778 1.897.845 2.035.068.137.113.298.022.481-.09.184-.136.299-.271.458-.137.159-.288.354-.412.476-.137.137-.282.287-.12.564.161.277.717 1.182 1.536 1.912.1.09.183.138.277.185.29.137.458.114.629-.083.171-.197.747-.869.947-1.168.2-.3.4-.251.674-.15.275.1.1.25 1.748.868s1.077.525 1.144.639c.068.115.068.665-.177 1.354z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/nkxus" target="_blank" rel="noopener noreferrer" className="social-link linkedin-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="mailto:info@nkxus.com" className="social-link mail-link" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
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
              <li><Link to="/portals">Our Network</Link></li>
            </ul>
          </div>

          {/* Links Column 3: Legal */}
          <div className="footer-links-col">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links-list">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/admin">Admin Console</Link></li>
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
