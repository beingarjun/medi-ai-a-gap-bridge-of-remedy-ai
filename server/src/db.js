const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file will be created in the server/ directory
const dbPath = path.join(__dirname, '../medi-ai.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite DB:', err.message);
  } else {
    console.log('Connected to SQLite database at', dbPath);
  }
});

// Example: Create a users table if it doesn't exist
const init = () => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'patient'
  )`);
};

module.exports = { db, init };
