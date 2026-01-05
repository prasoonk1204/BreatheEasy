const express = require('express');
const cors = require('cors');
require('dotenv').config();
const aqiRoutes = require('./routes/aqi');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/aqi', aqiRoutes);

app.get('/', (req, res) => {
  res.send('BreatheEasy API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});