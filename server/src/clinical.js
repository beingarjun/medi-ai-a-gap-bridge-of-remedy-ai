const express = require('express');
const router = express.Router();

// Vaccine scheduling
router.post('/vaccine', (req, res) => res.json({ message: 'Vaccine scheduled (mock)' }));

// Health screenings
router.post('/screening', (req, res) => res.json({ message: 'Screening scheduled (mock)' }));

// Telepharmacy support
router.post('/telepharmacy', (req, res) => res.json({ message: 'Telepharmacy session started (mock)' }));

module.exports = router;