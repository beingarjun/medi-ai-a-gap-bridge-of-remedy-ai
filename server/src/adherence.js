const express = require('express');
const router = express.Router();
// Set reminder
router.post('/reminder', (req, res) => res.json({ message: 'Reminder set (mock)' }));

// Pill tracking
router.post('/track', (req, res) => res.json({ message: 'Pill taken (mock)' }));

// Missed-dose alert
router.post('/missed', (req, res) => res.json({ alert: 'Missed dose (mock)' }));

module.exports = router;
