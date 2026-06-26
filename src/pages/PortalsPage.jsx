import React, { useEffect } from 'react';
import Portals from '../components/Portals';

export default function PortalsPage() {
  // Ensure we start at the top of the page on route load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="portals-page-view" style={{ paddingTop: '100px' }}>
      <Portals />
    </div>
  );
}
