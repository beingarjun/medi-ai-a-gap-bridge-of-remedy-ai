const express = require('express');
const router = express.Router();
// TODO: Add mock drug interaction checker
router.post('/check', (req, res) => res.json({ interactions: [] }));
module.exports = router;
