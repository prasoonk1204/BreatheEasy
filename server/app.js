const express = require('express');
const cors = require('cors');
require('dotenv').config();
const aqiRoutes = require('./routes/aqi');
const mapRoutes = require('./routes/map');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiter for map tiles to prevent abuse
const mapLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000, // Limit each IP to 1000 requests per window (approx 1 tile/sec avg, bursts allowed)
    message: "Too many tile requests, please try again later."
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/aqi', aqiRoutes);
app.use('/api/map', mapLimiter, mapRoutes);

app.get('/', (req, res) => {
  res.send('BreatheEasy API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});