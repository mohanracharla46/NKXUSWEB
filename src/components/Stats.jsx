import React, { useEffect, useState, useRef } from 'react';
import './Stats.css';

function CountUp({ end, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const isFloat = end % 1 !== 0;
    const increment = isFloat ? end / (duration / 16) : Math.ceil(end / (duration / 16));
    let timer;

    const run = () => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start));
      }
    };

    timer = setInterval(run, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function StatCard({ value, suffix, label }) {
  const [active, setActive] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
        }
      },
      { threshold: 0.1 }
    );

    const cardElement = cardRef.current;
    if (cardElement) {
      observer.observe(cardElement);
    }

    return () => {
      if (cardElement) {
        observer.unobserve(cardElement);
      }
    };
  }, []);

  return (
    <div ref={cardRef} className={`stat-card ${active ? 'active' : ''}`}>
      <div className="stat-value">
        {active ? (
          <CountUp end={value} suffix={suffix} />
        ) : (
          <span>0{suffix}</span>
        )}
      </div>
      <div className="stat-progress-bar-wrap">
        <div className="stat-progress-bar"></div>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Stats() {
  const statsData = [
    { value: 98, suffix: '%', label: 'RETENTION RATE' },
    { value: 2.4, suffix: 'M', label: 'REACH GENERATED' },
    { value: 500, suffix: '+', label: 'PORTFOLIOS BUILT' },
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        {statsData.map((stat, idx) => (
          <StatCard 
            key={idx} 
            value={stat.value} 
            suffix={stat.suffix} 
            label={stat.label} 
          />
        ))}
      </div>
    </section>
  );
}
