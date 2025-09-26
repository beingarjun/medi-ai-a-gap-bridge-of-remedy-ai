const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('./db');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// Signup route
router.post('/signup', (req, res) => {
	const { email, password, role } = req.body;
	if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
	const hash = bcrypt.hashSync(password, 10);
	db.run(
		'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
		[email, hash, role || 'patient'],
		function (err) {
			if (err) {
				if (err.message.includes('UNIQUE')) return res.status(409).json({ error: 'Email already exists' });
				return res.status(500).json({ error: 'DB error' });
			}
			res.json({ id: this.lastID, email, role: role || 'patient' });
		}
	);
});

// Login route
router.post('/login', (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
	db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
		if (err) return res.status(500).json({ error: 'DB error' });
		if (!user) return res.status(401).json({ error: 'Invalid credentials' });
		if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: 'Invalid credentials' });
		const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
		res.json({ token });
	});
});

module.exports = router;
