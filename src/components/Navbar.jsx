import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { servicesCategoriesData } from '../data/servicesData';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services', hasDropdown: true },
    { label: 'Portals', href: '/portals' },
    { label: 'About', href: '/about' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container glass-panel">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src="/assets/logo.png" alt="NKXUS Logo" className="navbar-logo-img" />
          </Link>
        </div>

        <nav className="navbar-links-desktop">
          {navLinks.map((link, idx) => (
            <div key={idx} className="nav-item-wrapper">
              <NavLink 
                to={link.href} 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={link.href === '/'}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown size={14} className="dropdown-icon" />}
              </NavLink>
              {link.hasDropdown && (
                <div className="nav-megamenu-menu glass-panel">
                  <div className="megamenu-grid">
                    {servicesCategoriesData.map((category, catIdx) => (
                      <div key={catIdx} className="megamenu-column">
                        <h4 className="megamenu-title">{category.title}</h4>
                        <ul className="megamenu-list">
                          {category.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link to={`/services/${item.id}`} className="megamenu-link">
                                <span className="bullet">🧭</span> {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="navbar-right-actions">
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <Link to="/contact" className="navbar-cta-bubble">
            Get Started
          </Link>
 
          <button 
            className="mobile-toggle" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            id="nav-mobile-toggle"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer glass-panel ${isOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          {navLinks.map((link, idx) => (
            <React.Fragment key={idx}>
              <NavLink 
                to={link.href} 
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
                end={link.href === '/'}
              >
                {link.label}
              </NavLink>
              {link.hasDropdown && (
                <div className="mobile-sub-links-grouped">
                  {servicesCategoriesData.map((category, catIdx) => (
                    <div key={catIdx} className="mobile-sub-group">
                      <div className="mobile-group-title">{category.title}</div>
                      <div className="mobile-group-items">
                        {category.items.map((item, itemIdx) => (
                          <NavLink
                            key={itemIdx}
                            to={`/services/${item.id}`}
                            className="mobile-sub-link"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.title}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
          <div className="mobile-drawer-bottom">
            <button 
              className="theme-toggle-btn mobile-theme-toggle" 
              onClick={() => {
                toggleTheme();
                setIsOpen(false);
              }}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={18} /> Light Mode
                </>
              ) : (
                <>
                  <Moon size={18} /> Dark Mode
                </>
              )}
            </button>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="mobile-cta-btn">
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
