import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const sidebarStyle: React.CSSProperties = {
  width: '220px',
  height: '100vh',
  background: 'linear-gradient(180deg, #1976d2 0%, #42a5f5 100%)',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem 1rem',
  position: 'fixed',
  top: 0,
  left: 0,
  boxShadow: '2px 0 8px rgba(0,0,0,0.07)',
  zIndex: 100,
};

const linkStyle: React.CSSProperties = {
  color: '#fff',
  textDecoration: 'none',
  margin: '0.5rem 0',
  fontWeight: 500,
  fontSize: '1.1rem',
  borderRadius: '4px',
  padding: '0.5rem 1rem',
  transition: 'background 0.2s',
};

const activeLinkStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.15)',
  fontWeight: 700,
};

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside style={sidebarStyle}>
      <h2 style={{marginBottom: '2rem', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '1px'}}>Medi.AI</h2>
      <Link to="/" style={{...linkStyle, ...(location.pathname === '/' ? activeLinkStyle : {})}}>Dashboard</Link>
      <Link to="/prescriptions" style={{...linkStyle, ...(location.pathname === '/prescriptions' ? activeLinkStyle : {})}}>Prescriptions</Link>
      <Link to="/insurance" style={{...linkStyle, ...(location.pathname === '/insurance' ? activeLinkStyle : {})}}>Insurance</Link>
      <Link to="/adherence" style={{...linkStyle, ...(location.pathname === '/adherence' ? activeLinkStyle : {})}}>Adherence</Link>
      <Link to="/clinical" style={{...linkStyle, ...(location.pathname === '/clinical' ? activeLinkStyle : {})}}>Clinical</Link>
      <Link to="/operations" style={{...linkStyle, ...(location.pathname === '/operations' ? activeLinkStyle : {})}}>Operations</Link>
      <Link to="/outreach" style={{...linkStyle, ...(location.pathname === '/outreach' ? activeLinkStyle : {})}}>Outreach</Link>
      <Link to="/ai-agent" style={{...linkStyle, ...(location.pathname === '/ai-agent' ? activeLinkStyle : {})}}>AI Agent</Link>
      <Link to="/analytics" style={{...linkStyle, ...(location.pathname === '/analytics' ? activeLinkStyle : {})}}>Analytics</Link>
      <Link to="/compliance" style={{...linkStyle, ...(location.pathname === '/compliance' ? activeLinkStyle : {})}}>Compliance</Link>
      <Link to="/telemedicine" style={{...linkStyle, ...(location.pathname === '/telemedicine' ? activeLinkStyle : {})}}>Telemedicine</Link>
    </aside>
  );
};

export default Sidebar;
