import Telemedicine from './components/Telemedicine';
// ...existing code...

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PrescriptionManagement from './components/PrescriptionManagement';
import InsuranceBilling from './components/InsuranceBilling';
import MedicationAdherence from './components/MedicationAdherence';
import ClinicalServices from './components/ClinicalServices';
import Operations from './components/Operations';
import ProactiveOutreach from './components/ProactiveOutreach';
import AIAgent from './components/AIAgent';
import Analytics from './components/Analytics';
import Compliance from './components/Compliance';

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  padding: '1rem',
  background: '#f0f2f5',
  borderBottom: '1px solid #e0e0e0',
  marginBottom: '2rem',
};

const App = () => (
  <Router>
    <nav style={navStyle}>
      <Link to="/">Dashboard</Link>
      <Link to="/prescriptions">Prescriptions</Link>
      <Link to="/insurance">Insurance</Link>
      <Link to="/adherence">Adherence</Link>
      <Link to="/clinical">Clinical</Link>
      <Link to="/operations">Operations</Link>
      <Link to="/outreach">Outreach</Link>
      <Link to="/ai-agent">AI Agent</Link>
      <Link to="/analytics">Analytics</Link>
      <Link to="/compliance">Compliance</Link>
      <Link to="/telemedicine">Telemedicine</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/prescriptions" element={<PrescriptionManagement />} />
      <Route path="/insurance" element={<InsuranceBilling />} />
      <Route path="/adherence" element={<MedicationAdherence />} />
      <Route path="/clinical" element={<ClinicalServices />} />
      <Route path="/operations" element={<Operations />} />
      <Route path="/outreach" element={<ProactiveOutreach />} />
      <Route path="/ai-agent" element={<AIAgent />} />
      <Route path="/analytics" element={<Analytics />} />
  <Route path="/compliance" element={<Compliance />} />
  <Route path="/telemedicine" element={<Telemedicine />} />
    </Routes>
  </Router>
);

export default App;
