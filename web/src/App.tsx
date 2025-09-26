import './App.css';
import CustomerManagement from './components/CustomerManagement';
import PharmacyManagement from './components/PharmacyManagement';
import CustomerProfile from './components/CustomerProfile';
import PharmacyProfile from './components/PharmacyProfile';
import Telemedicine from './components/Telemedicine';
// ...existing code...

import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
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


const layoutStyle: React.CSSProperties = {
	display: 'flex',
	minHeight: '100vh',
	background: '#f8fafc',
};

const mainStyle: React.CSSProperties = {
	flex: 1,
	marginLeft: '220px',
	padding: '2.5rem 2rem',
	background: '#f8fafc',
	minHeight: '100vh',
};

const App = () => (
	<Router>
		<div style={layoutStyle}>
			<Sidebar />
			<main style={mainStyle}>
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
					<Route path="/customers" element={<CustomerManagement />} />
					<Route path="/customers/:id" element={<CustomerProfile />} />
					<Route path="/pharmacies" element={<PharmacyManagement />} />
					<Route path="/pharmacies/:id" element={<PharmacyProfile />} />
				</Routes>
			</main>
		</div>
	</Router>

);

export default App;
