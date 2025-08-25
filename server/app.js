const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// --- Config ---
const PORT = process.env.PORT || 3001;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

// --- DB Connection ---
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test DB connection on boot
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client from pool', err.stack);
    return;
  }
  client.query('SELECT NOW()', (err2, result) => {
    release();
    if (err2) {
      console.error('Error executing test query', err2.stack);
      return;
    }
    console.log('✅ PostgreSQL connected:', result.rows[0].now);
  });
});

// --- Middleware ---
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

// --- Helpers ---
function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// --- File Upload Setup ---
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});
const upload = multer({ storage: storage });

// --- Health ---
app.get('/', (_req, res) => res.send('API is running...'));
app.get('/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// --- Auth: Signup ---
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username?.trim() || !password?.trim()) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const password_hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users(username, password_hash) VALUES($1, $2) RETURNING id, username',
      [username.trim(), password_hash]
    );
    const newUser = result.rows[0];
    const token = signToken({ userId: newUser.id, username: newUser.username });
    return res.status(201).json({ message: 'User registered successfully!', token });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Server error during signup.' });
  }
});

// --- Auth: Login ---
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username?.trim() || !password?.trim()) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username.trim()]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const user = result.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const token = signToken({ userId: user.id, username: user.username });
    return res.status(200).json({ message: 'Login successful!', token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error during login.' });
  }
});

// --- Current User (Profile): includes credits ---
app.get('/api/user', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, credits, created_at FROM users WHERE id = $1',
      [req.user.userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('Error in /api/user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Reports: list for current user ---
app.get('/api/reports', authMiddleware, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, text, image_path, created_at FROM reports WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.userId]
    );
    res.json({ reports: rows });
  } catch (err) {
    console.error('GET /api/reports error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Reports: create + add credits (with image upload) ---
app.post('/api/reports', authMiddleware, upload.single('reportImage'), async (req, res) => {
  const { text } = req.body;
  const image_path = req.file ? req.file.path.replace(/\\/g, '/') : null;

  if (!text?.trim() && !image_path) {
    if (req.file) {
      fs.unlinkSync(path.join(__dirname, req.file.path));
    }
    return res.status(400).json({ message: 'Report text or an image is required.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const insert = await client.query(
      'INSERT INTO reports(user_id, text, image_path) VALUES($1, $2, $3) RETURNING id, text, image_path, created_at',
      [req.user.userId, text.trim(), image_path]
    );

    await client.query('UPDATE users SET credits = credits + 10 WHERE id = $1', [req.user.userId]);

    const user = await client.query(
      'SELECT id, username, credits, created_at FROM users WHERE id = $1',
      [req.user.userId]
    );

    await client.query('COMMIT');

    res.status(201).json({
      report: insert.rows[0],
      user: user.rows[0],
      message: 'Report submitted. +10 credits!',
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('POST /api/reports error:', err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    client.release();
  }
});

// --- Reports: delete + optionally deduct credits (e.g., -10) ---
app.delete('/api/reports/:id', authMiddleware, async (req, res) => {
  const reportId = Number(req.params.id);
  if (!Number.isInteger(reportId)) return res.status(400).json({ message: 'Invalid id' });

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const check = await client.query('SELECT id, image_path FROM reports WHERE id = $1 AND user_id = $2', [
      reportId,
      req.user.userId,
    ]);
    if (check.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Report not found' });
    }

    const { image_path } = check.rows[0];

    // Delete the file from the filesystem if it exists
    if (image_path && fs.existsSync(image_path)) {
      fs.unlinkSync(image_path);
    }

    await client.query('DELETE FROM reports WHERE id = $1', [reportId]);

    await client.query('UPDATE users SET credits = GREATEST(0, credits - 10) WHERE id = $1', [
      req.user.userId,
    ]);

    const user = await client.query(
      'SELECT id, username, credits, created_at FROM users WHERE id = $1',
      [req.user.userId]
    );

    await client.query('COMMIT');

    res.json({ message: 'Report deleted. -10 credits.', user: user.rows[0] });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('DELETE /api/reports error:', err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    client.release();
  }
});

// --- Serve static image files from the uploads directory ---
app.use('/uploads', express.static(uploadDir));

// --- Start server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});