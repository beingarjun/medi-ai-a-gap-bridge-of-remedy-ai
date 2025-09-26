const express = require('express');
const router = express.Router();
// Copay lookup
router.post('/copay', (req, res) => {
	// Mock copay calculation
	res.json({ copay: 15.0, currency: 'USD' });
});

// Eligibility check
router.post('/eligibility', (req, res) => {
	// Mock eligibility
	res.json({ eligible: true, plan: 'Gold', memberId: '123456' });
});

// Formulary alternatives
router.post('/alternatives', (req, res) => {
	// Mock alternatives
	res.json({ alternatives: ['Generic Drug A', 'Generic Drug B'] });
});

module.exports = router;
