const express = require('express');
const router = express.Router();

// Mock DB for demo
const prescriptions = {};

// Request refill
router.post('/refill', (req, res) => {
  const { prescriptionId } = req.body;
  prescriptions[prescriptionId] = prescriptions[prescriptionId] || {};
  prescriptions[prescriptionId].refillRequested = true;
  res.send(`Refill requested for prescription ${prescriptionId}`);
});

// Check status
router.post('/status', (req, res) => {
  const { prescriptionId } = req.body;
  const status = prescriptions[prescriptionId]?.refillRequested ? 'Refill requested' : 'No refill requested';
  res.send(`Status for prescription ${prescriptionId}: ${status}`);
});

// Schedule pickup
router.post('/pickup', (req, res) => {
  const { prescriptionId, time } = req.body;
  prescriptions[prescriptionId] = prescriptions[prescriptionId] || {};
  prescriptions[prescriptionId].pickupTime = time;
  res.send(`Pickup scheduled for prescription ${prescriptionId} at ${time}`);
});

module.exports = router;
