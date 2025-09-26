const express = require('express');
const router = express.Router();

// Store hours
router.get('/hours', (req, res) => res.json({ hours: 'Mon-Fri 9am-7pm, Sat 10am-4pm, Sun closed' }));

// Locations
router.get('/locations', (req, res) => res.json({ locations: ['123 Main St', '456 Oak Ave'] }));

// Holidays
router.get('/holidays', (req, res) => res.json({ holidays: ['New Year\'s Day', 'Thanksgiving', 'Christmas'] }));

// FAQs
router.get('/faqs', (req, res) => res.json({ faqs: [
  { q: 'How do I refill my prescription?', a: 'Use our app or call us.' },
  { q: 'Do you offer delivery?', a: 'Yes, for eligible prescriptions.' }
] }));

module.exports = router;