const express = require('express');
const router = express.Router();
// TODO: Add mock OTP logic
router.post('/send', (req, res) => res.json({ message: 'OTP sent (mock)' }));
router.post('/verify', (req, res) => res.json({ message: 'OTP verified (mock)' }));
module.exports = router;
