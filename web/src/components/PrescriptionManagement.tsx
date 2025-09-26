import React from 'react';

import { useState } from 'react';

const API = 'http://localhost:4000/prescriptions'; // Update if your backend runs elsewhere

const PrescriptionManagement = () => {
	const [refillId, setRefillId] = useState('');
	const [statusId, setStatusId] = useState('');
	const [pickupId, setPickupId] = useState('');
	const [pickupTime, setPickupTime] = useState('');
	const [result, setResult] = useState<string | null>(null);

	const handleRefill = async () => {
		const res = await fetch(`${API}/refill`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ prescriptionId: refillId })
		});
		setResult(await res.text());
	};

	const handleStatus = async () => {
		const res = await fetch(`${API}/status`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ prescriptionId: statusId })
		});
		setResult(await res.text());
	};

	const handlePickup = async () => {
		const res = await fetch(`${API}/pickup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ prescriptionId: pickupId, time: pickupTime })
		});
		setResult(await res.text());
	};

	return (
		<div className="container">
			<h2>Prescription Management</h2>
			<div style={{ marginBottom: 24 }}>
				<h4>Request Refill</h4>
				<input value={refillId} onChange={e => setRefillId(e.target.value)} placeholder="Prescription ID" />
				<button onClick={handleRefill}>Request Refill</button>
			</div>
			<div style={{ marginBottom: 24 }}>
				<h4>Check Status</h4>
				<input value={statusId} onChange={e => setStatusId(e.target.value)} placeholder="Prescription ID" />
				<button onClick={handleStatus}>Check Status</button>
			</div>
			<div style={{ marginBottom: 24 }}>
				<h4>Schedule Pickup</h4>
				<input value={pickupId} onChange={e => setPickupId(e.target.value)} placeholder="Prescription ID" />
				<input value={pickupTime} onChange={e => setPickupTime(e.target.value)} placeholder="Pickup Time" />
				<button onClick={handlePickup}>Schedule Pickup</button>
			</div>
			{result && <div style={{ marginTop: 16, color: 'green' }}>{result}</div>}
		</div>
	);
};

export default PrescriptionManagement;
