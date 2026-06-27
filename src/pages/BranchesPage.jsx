import React, { useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const ALL_BRANCHES = [
  {
    city: 'Hyderabad',
    role: 'Corporate Headquarters',
    coords: '17.3850° N, 78.4867° E',
    address: 'Premium Tech Tower, Gachibowli, Hyderabad, TS, India',
    phone: '+91 99999 99991',
    email: 'hyd@nkxus.com'
  },
  {
    city: 'Bangalore',
    role: 'Operations & Engineering Center',
    coords: '12.9716° N, 77.5946° E',
    address: 'Elite Hub, Outer Ring Road, Bangalore, KA, India',
    phone: '+91 99999 99992',
    email: 'blr@nkxus.com'
  },
  {
    city: 'Mumbai',
    role: 'Strategic Relations Office',
    coords: '19.0760° N, 72.8777° E',
    address: 'Prestige Financial District, Bandra Kurla Complex, Mumbai, MH, India',
    phone: '+91 99999 99993',
    email: 'bom@nkxus.com'
  },
  {
    city: 'Chennai',
    role: 'Digital Innovation Lab',
    coords: '13.0827° N, 80.2707° E',
    address: 'Quantum Labs, OMR Road, Chennai, TN, India',
    phone: '+91 99999 99994',
    email: 'maa@nkxus.com'
  }
];

export default function BranchesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{
      padding: '160px 24px 100px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'var(--font-body)',
      color: 'var(--text-primary)',
      background: 'var(--bg-primary)',
      minHeight: '80vh'
    }}>
      <header style={{ marginBottom: '80px', textAlign: 'center' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
          display: 'block',
          marginBottom: '16px',
          fontFamily: 'var(--font-heading)'
        }}>GLOBAL NETWORK</span>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: '700',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          marginBottom: '24px'
        }}>
          NKXUS <br />
          <span className="text-gradient">Locations Grid.</span>
        </h1>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.6',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Our operations cover India's premier technology nodes, ensuring responsive, high-fidelity developer alignment across domains.
        </p>
      </header>

      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '32px'
      }}>
        {ALL_BRANCHES.map((b, idx) => (
          <div key={idx} style={{
            padding: '32px',
            borderRadius: '16px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--border-color)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                {b.coords}
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: '600', marginBottom: '6px' }}>{b.city}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{b.role}</p>
            </div>
            
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>{b.address}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)', marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} style={{ color: 'var(--text-muted)' }} />
                <span>{b.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} style={{ color: 'var(--text-muted)' }} />
                <span>{b.email}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
