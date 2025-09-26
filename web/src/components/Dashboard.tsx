
import React from 'react';
import { Link } from 'react-router-dom';

const features = [
	{
		icon: '',
		title: 'Prescription Management',
		desc: 'Refills, status updates, and pickup scheduling — fully automated.',
		sample: '"Can I get a refill on my atorvastatin?"\nAI Response Ready',
		path: '/prescriptions',
	},
	{
		icon: '',
		title: 'Insurance & Billing',
		desc: 'Answers common questions about coverage, copays, and plan details.',
		sample: '"Is this medication covered by my plan?"\nAI Response Ready',
		path: '/insurance',
	},
	{
		icon: '',
		title: 'Hours & Operations',
		desc: 'Instantly provides store hours, holiday schedules, and service availability.',
		sample: '"What are your hours on Saturdays?"\nAI Response Ready',
		path: '/operations',
	},
	{
		icon: '',
		title: 'General Inquiries',
		desc: 'Handles FAQs about wait times, vaccines, and call routing.',
		sample: '"Do you offer flu shots?"\nAI Response Ready',
		path: '/outreach',
	},
];

const Dashboard = () => (
	<div className="dashboard-landing">
		{/* Hero Section */}
		<section className="hero-section">
			<h1 className="hero-title">Conversational AI Agent for Pharmacies</h1>
			<div className="hero-subtitle">Every Patient Call, Handled Intelligently</div>
			<div className="hero-desc">
				Streamline prescription refills, reduce workload, and enhance patient care with intelligent automation.
			</div>
			<div className="hero-actions">
				<Link to="/pharmacies" className="hero-btn">Pharmacy Portal</Link>
				<Link to="/customers" className="hero-btn secondary">Patient Portal</Link>
			</div>
		</section>

		{/* Feature Cards */}
		<section className="feature-section">
			<h2 className="feature-title">Powerful Features for Modern Pharmacies</h2>
			<div className="feature-grid">
				{features.map(f => (
					<Link to={f.path} className="feature-card" key={f.title}>
						<div className="feature-icon">{f.icon}</div>
						<div className="feature-card-title">{f.title}</div>
						<div className="feature-card-desc">{f.desc}</div>
						<div className="feature-sample">{f.sample}</div>
					</Link>
				))}
			</div>
		</section>

		{/* Compliance & Integration */}
		<section className="compliance-section">
			<div className="compliance-badges">
				<span className="badge hipaa">HIPAA Compliant</span>
			</div>
			<div className="compliance-desc">
				Seamless integration with your pharmacy system. End-to-end encrypted. No hardware required.
			</div>
		</section>

		{/* Footer */}
		<footer className="dashboard-footer">
			<div>
				<Link to="/privacy" className="footer-link">Privacy</Link> |
				<Link to="/terms" className="footer-link">Terms of Service</Link> |
				<Link to="/contact" className="footer-link">Contact</Link>
			</div>
			<div className="footer-copy">© 2025 Medi.AI. All rights reserved.</div>
		</footer>
	</div>
);

export default Dashboard;
