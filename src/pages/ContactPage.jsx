import React, { useEffect } from 'react';
import Contact from '../components/Contact';

export default function ContactPage() {
  // Ensure we start at the top of the page on route load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page-view" style={{ paddingTop: '100px' }}>
      <Contact />
    </div>
  );
}
