const express = require('express');
const router = express.Router();
const { db } = require('./db');

// Create customers table if not exists
const initCustomers = () => {
  db.run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
};
initCustomers();

// Get all customers
router.get('/', (req, res) => {
  db.all('SELECT * FROM customers', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(rows);
  });
});

// Add a customer
router.post('/', (req, res) => {
  const { name, email, phone, address } = req.body;
  db.run(
    'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)',
    [name, email, phone, address],
    function (err) {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json({ id: this.lastID, name, email, phone, address });
    }
  );
});

// Update a customer
router.put('/:id', (req, res) => {
  const { name, email, phone, address } = req.body;
  db.run(
    'UPDATE customers SET name=?, email=?, phone=?, address=? WHERE id=?',
    [name, email, phone, address, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json({ updated: this.changes });
    }
  );
});

// Delete a customer
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM customers WHERE id=?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
