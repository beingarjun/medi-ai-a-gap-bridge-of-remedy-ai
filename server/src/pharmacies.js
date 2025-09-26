const express = require('express');
const router = express.Router();
const { db } = require('./db');

// Create pharmacies table if not exists
const initPharmacies = () => {
  db.run(`CREATE TABLE IF NOT EXISTS pharmacies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT,
    contact TEXT,
    npi TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
};
initPharmacies();

// Get all pharmacies
router.get('/', (req, res) => {
  db.all('SELECT * FROM pharmacies', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(rows);
  });
});

// Add a pharmacy
router.post('/', (req, res) => {
  const { name, address, contact, npi } = req.body;
  db.run(
    'INSERT INTO pharmacies (name, address, contact, npi) VALUES (?, ?, ?, ?)',
    [name, address, contact, npi],
    function (err) {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json({ id: this.lastID, name, address, contact, npi });
    }
  );
});

// Update a pharmacy
router.put('/:id', (req, res) => {
  const { name, address, contact, npi } = req.body;
  db.run(
    'UPDATE pharmacies SET name=?, address=?, contact=?, npi=? WHERE id=?',
    [name, address, contact, npi, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json({ updated: this.changes });
    }
  );
});

// Delete a pharmacy
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM pharmacies WHERE id=?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
