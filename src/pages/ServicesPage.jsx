import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { servicesCategoriesData } from '../data/servicesData';
import './ServicesPage.css';

export default function ServicesPage() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      // Auto-focus select category if item hash matches
      const matchedCat = servicesCategoriesData.find(cat => 
        cat.items.some(item => item.id === id)
      );
      if (matchedCat) {
        setSelectedCategory(matchedCat.id);
      }
      
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('highlight-card-flash');
          setTimeout(() => element.classList.remove('highlight-card-flash'), 1800);
        }, 200);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Filter categories to render
  const visibleCategories = selectedCategory === 'all' 
    ? servicesCategoriesData 
    : servicesCategoriesData.filter(cat => cat.id === selectedCategory);

  return (
    <div className="services-page-container">
      {/* Simple Page Header */}
      <header className="services-page-header">
        <h1 className="services-page-title text-gradient">Our Services</h1>
        <p className="services-page-subtitle">
          We engineer high-performance systems and build bespoke digital architectures configured for growth and authority.
        </p>
      </header>

      {/* Simplified Category Selector Tabs */}
      <nav className="category-tabs-nav glass-panel">
        <button 
          className={`tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          <Sparkles size={13} />
          <span>All Services</span>
        </button>
        {servicesCategoriesData.map(cat => (
          <button
            key={cat.id}
            className={`tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
            style={{ '--accent-active-color': cat.color }}
          >
            <span>{cat.title}</span>
          </button>
        ))}
      </nav>

      {/* Services Cards List Canvas */}
      <div className="services-sections-list">
        {visibleCategories.map((category) => (
          <section key={category.id} className="category-section">
            <div className="category-header">
              <span className="category-number" style={{ color: category.color }}>
                // CHAPTER {category.prefix}
              </span>
              <h2 className="category-title">{category.title}</h2>
              <p className="category-desc">{category.description}</p>
            </div>

            <div className="services-grid">
              {category.items.map((item) => (
                <Link 
                  key={item.id} 
                  id={item.id} 
                  to={`/services/${item.id}`}
                  className="service-card glass-panel"
                  style={{ '--accent-hover-color': category.color, textDecoration: 'none' }}
                >
                  <div className="card-top">
                    <span className="service-code">{item.code}</span>
                    <span className="service-metric" style={{ color: category.color }}>{item.metric}</span>
                  </div>
                  
                  <div className="card-main">
                    <h3 className="service-title">{item.title}</h3>
                    <p className="service-desc">{item.description}</p>
                  </div>

                  <div className="card-tech">
                    {item.tech.map((t, idx) => (
                      <span key={idx} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
