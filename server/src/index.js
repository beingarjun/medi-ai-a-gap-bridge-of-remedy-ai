app.use('/customers', require('./customers'));
app.use('/pharmacies', require('./pharmacies'));

const express = require('express');
const { db, init } = require('./db');
const app = express();
const PORT = process.env.PORT || 4000;

// Initialize SQLite tables

init();


// Mount routes
app.use(express.json());
app.use('/prescriptions', require('./prescriptions'));
app.use('/auth', require('./auth'));
app.use('/otp', require('./otp'));
app.use('/insurance', require('./insurance'));
app.use('/adherence', require('./adherence'));
app.use('/interactions', require('./interactions'));
app.use('/clinical', require('./clinical'));
app.use('/operations', require('./operations'));

// Protected test route (requires valid JWT, any role)
const { authenticate, authorize } = require('./middleware');
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: `Hello, ${req.user.email}!`, role: req.user.role });
});

// Admin-only route example
app.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: `Welcome admin ${req.user.email}` });
});

app.get('/', (req, res) => res.send('Medi-AI API running'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
