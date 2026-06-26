import React from 'react';
import { Code, Smartphone, Megaphone, Video, Target, Star, Search } from 'lucide-react';
import './Services.css';

export default function Services() {
  const servicesList = [
    {
      icon: <Code size={24} />,
      title: 'Web Development',
      description: 'Bespoke, high-performance web applications built on modern frameworks, featuring lightning-fast page loading and seamless interactive experiences.',
    },
    {
      icon: <Smartphone size={24} />,
      title: 'App Development',
      description: 'Native and cross-platform mobile solutions engineered for exceptional fluid user experience, reliable security, and smooth micro-animations.',
    },
    {
      icon: <Megaphone size={24} />,
      title: 'Digital Marketing',
      description: 'Targeted growth campaigns designed to establish brand authority, increase digital engagement, and scale client acquisition channels globally.',
    },
    {
      icon: <Video size={24} />,
      title: 'Video Editing',
      description: 'Cinematic visual storytelling, high-definition promotional assets, and premium editing styles tailored to capture user attention in seconds.',
    },
    {
      icon: <Target size={24} />,
      title: 'Google & Meta Ads',
      description: 'Precision ad campaigns optimized for maximum return on ad spend (ROAS), targeting high-intent demographics to generate premium leads.',
    },
    {
      icon: <Star size={24} />,
      title: 'Google Map Reviews',
      description: 'Local SEO enhancement and strategic reputation management to build consumer trust, boost map pack rankings, and establish authority.',
    },
    {
      icon: <Search size={24} />,
      title: 'SEO / SMO',
      description: 'Complete search engine optimization and social media organic architecture to ensure dominant search discoverability and consistent brand exposure.',
    },
  ];

  return (
    <section id="services" className="services-section">
      <div className="section-header">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          We combine visual excellence with robust software systems to launch high-performance digital frameworks.
        </p>
      </div>

      <div className="services-grid">
        {servicesList.map((service, idx) => (
          <div key={idx} className="service-card glass-panel">
            <div className="service-icon-wrapper">
              {service.icon}
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
