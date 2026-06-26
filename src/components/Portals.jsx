import React, { useState, useEffect } from 'react';
import { ArrowRight, Globe, Cpu, ShieldCheck, Activity, Terminal } from 'lucide-react';
import './Portals.css';

const networkItems = [
  {
    code: 'NODE-01',
    tag: 'CORE DEVELOPMENT',
    domain: 'nkxus.com',
    title: 'Core Software Division',
    description: 'The flagship platform for enterprise software, IT services, cloud architecture, and digital transformation consulting.',
    link: 'https://nkxus.com',
    icon: <Globe size={18} />,
    metric: '0.15s TTI',
    uptime: '99.98%'
  },
  {
    code: 'NODE-02',
    tag: 'GROWTH MARKETING',
    domain: 'nkxgentechnologies.com',
    title: 'GenTech Marketing Wing',
    description: 'Performance marketing systems, brand growth, digital advertising analytics, and conversion engineering.',
    link: 'https://nkxgentechnologies.com',
    icon: <Cpu size={18} />,
    metric: '0.18s TTI',
    uptime: '99.96%'
  },
  {
    code: 'NODE-03',
    tag: 'REPUTATION INTEL',
    domain: 'growmyreviews.in',
    title: 'Review Intelligence Platform',
    description: 'Advanced reputation management systems and review generation engines configured to command consumer brand trust.',
    link: 'https://growmyreviews.in',
    icon: <ShieldCheck size={18} />,
    metric: '0.12s TTI',
    uptime: '99.99%'
  },
  {
    code: 'NODE-04',
    tag: 'TRUST ENGINE',
    domain: 'growmyratings.in',
    title: 'Ratings Growth Engine',
    description: 'Yield-optimized trust systems and rating accelerators that drive organic authority and visible local CTR improvements.',
    link: 'https://growmyratings.in',
    icon: <Activity size={18} />,
    metric: '0.20s TTI',
    uptime: '99.97%'
  },
];

export default function Portals() {

  // Dynamic system status log ticker
  const [logs, setLogs] = useState([
    'PORTAL ROUTING SYSTEMS: ONLINE [OK]',
    'SSL Handshakes validated across all domains',
    'NODE-01 sync: 100% active, Latency 14ms',
    'NODE-02 sync: 100% active, Latency 18ms',
    'NODE-03 sync: 100% active, Latency 11ms',
    'NODE-04 sync: 100% active, Latency 22ms'
  ]);

  useEffect(() => {
    const templates = [
      'Pinging node-[ID].nkxus.net... Response [MS]ms [OK]',
      'Database handshake synced for node-[ID]',
      'SSL cert check on [DOMAIN]: Valid (Expires in [DAYS] days)',
      'Security firewall check: 0 active threats detected',
      'Port routing check: traffic distributed evenly across Edge cells',
      'Memory cache cleanup for node-[ID] completed successfully'
    ];

    const interval = setInterval(() => {
      const randomItem = networkItems[Math.floor(Math.random() * networkItems.length)];
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      const time = new Date().toLocaleTimeString().split(' ')[0];

      let entry = randomTemplate
        .replace('[ID]', randomItem.code.split('-')[1])
        .replace('[DOMAIN]', randomItem.domain)
        .replace('[MS]', Math.floor(Math.random() * 18 + 10))
        .replace('[DAYS]', Math.floor(Math.random() * 100 + 150));

      setLogs(prev => {
        const next = [...prev.slice(1)];
        next.push(`[${time}] ${entry}`);
        return next;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="portals" className="portals-section">
      <div className="network-header">
        <span className="network-meta-tag">// SYSTEM INTEGRATION DIRECTORY</span>
        <h1 className="section-title text-gradient">Enterprise Network Portals</h1>
        <p className="network-subtitle">
          NKXUS operates specialized digital properties configured as isolated nodes. Access core divisions and authorized cloud gateways below.
        </p>
      </div>

      <div className="network-grid">
        {networkItems.map((item, idx) => (
          <a 
            key={idx} 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="network-card glass-panel"
          >
            {/* Card Header metadata */}
            <div className="portal-card-header">
              <span className="portal-code">{item.code}</span>
              <div className="portal-status-wrap">
                <span className="portal-status-pulse"></span>
                <span className="portal-status-lbl">ACTIVE</span>
              </div>
            </div>

            {/* Core Domain */}
            <div className="network-domain">
              <span className="domain-label-group">
                {item.icon}
                <span>{item.domain}</span>
              </span>
              <ArrowRight size={14} className="network-arrow" />
            </div>

            {/* Title & Description */}
            <div className="portal-main-details">
              <span className="portal-card-tag">{item.tag}</span>
              <h3 className="network-title">{item.title}</h3>
              <p className="network-desc">{item.description}</p>
            </div>

            {/* Specific Technical Metrics */}
            <div className="portal-card-metrics">
              <div className="metric-box">
                <span className="metric-lbl">RESPONSE TIME</span>
                <span className="metric-val">{item.metric}</span>
              </div>
              <div className="metric-box">
                <span className="metric-lbl">SYNC STATUS</span>
                <span className="metric-val">{item.uptime}</span>
              </div>
            </div>
            
            {/* Interactive Link action */}
            <div className="portal-card-action">
              <span>ACCESS GATEWAY</span>
              <ArrowRight size={12} className="action-arrow" />
            </div>
          </a>
        ))}
      </div>

      {/* Simulated Live System Logs Console */}
      <div className="portals-diagnostics-wrapper glass-panel">
        <div className="diagnostics-header">
          <Terminal size={14} className="diagnostics-icon" />
          <span className="diagnostics-title">GATEWAY HANDSHAKE REGISTERS</span>
          <div className="diagnostics-status-dot"></div>
        </div>
        <div className="diagnostics-console">
          {logs.map((log, idx) => (
            <div key={idx} className="console-line">
              <span className="console-prompt">&gt;</span>
              <span className="console-text">{log}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
