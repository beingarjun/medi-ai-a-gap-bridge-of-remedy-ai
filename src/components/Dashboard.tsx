import React from 'react';


import { Link } from 'react-router-dom';

const cardGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '2rem',
  marginTop: '2rem',
};

const card: React.CSSProperties = {
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
  padding: '2rem 1.5rem',
  textAlign: 'center',
  transition: 'box-shadow 0.2s',
  textDecoration: 'none',
  color: '#222',
  fontWeight: 500,
  fontSize: '1.1rem',
  minHeight: '120px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const cardHover: React.CSSProperties = {
  boxShadow: '0 4px 24px rgba(25, 118, 210, 0.15)',
};

const features = [
  { path: '/prescriptions', label: 'Prescriptions' },
  { path: '/insurance', label: 'Insurance' },
  { path: '/adherence', label: 'Adherence' },
  { path: '/clinical', label: 'Clinical' },
  { path: '/operations', label: 'Operations' },
  { path: '/outreach', label: 'Outreach' },
  { path: '/ai-agent', label: 'AI Agent' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/compliance', label: 'Compliance' },
  { path: '/telemedicine', label: 'Telemedicine' },
];

const Dashboard = () => (
  <div>
    <h1 style={{ fontWeight: 800, fontSize: '2.2rem', marginBottom: '0.5rem', color: '#1976d2' }}>Welcome to Medi.AI</h1>
    <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '2rem' }}>
      Your all-in-one pharmacy AI platform. Select a feature to get started:
    </p>
    <div style={cardGrid}>
      {features.map((f) => (
        <Link
          to={f.path}
          key={f.path}
          style={card}
          onMouseOver={e => (e.currentTarget.style.boxShadow = cardHover.boxShadow!)}
          onMouseOut={e => (e.currentTarget.style.boxShadow = card.boxShadow!)}
        >
          {f.label}
        </Link>
      ))}
    </div>
  </div>
);

export default Dashboard;
