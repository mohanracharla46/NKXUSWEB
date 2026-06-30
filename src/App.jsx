import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import PortalsPage from './pages/PortalsPage';
import ContactPage from './pages/ContactPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import AboutPage from './pages/AboutPage';
import BlogsPage from './pages/BlogsPage';
import CareersPage from './pages/CareersPage';
import BranchesPage from './pages/BranchesPage';
import PortfolioPage from './pages/PortfolioPage';
import AdminPage from './pages/AdminPage';

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
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/branches" element={<BranchesPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
      <a 
        href="https://wa.me/919160442065" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.982L2 22l5.233-1.371a9.936 9.936 0 004.779 1.229h.004c5.505 0 9.986-4.477 9.988-9.985a9.965 9.965 0 00-2.926-7.06A9.929 9.929 0 0012.012 2zm5.727 14.047c-.245.69-1.42 1.253-1.956 1.302-.489.043-.996.064-3.155-.783-2.759-1.084-4.507-3.89-4.646-4.076-.137-.187-1.12-1.492-1.12-2.846 0-1.354.707-2.018.958-2.28.25-.264.551-.33.734-.33.184 0 .368.002.528.009.167.008.393-.064.615.47.227.549.778 1.897.845 2.035.068.137.113.298.022.481-.09.184-.136.299-.271.458-.137.159-.288.354-.412.476-.137.137-.282.287-.12.564.161.277.717 1.182 1.536 1.912.1.09.183.138.277.185.29.137.458.114.629-.083.171-.197.747-.869.947-1.168.2-.3.4-.251.674-.15.275.1.1.25 1.748.868s1.077.525 1.144.639c.068.115.068.665-.177 1.354z"/>
        </svg>
      </a>
    </Router>
  );
}
