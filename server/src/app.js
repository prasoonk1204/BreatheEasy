const express = require('express');
const cors = require('cors');
const aqiRoutes = require('./routes/aqi.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/aqi', aqiRoutes);

app.get('/', (req, res) => {
  res.send('BreatheEasy API is running');
});

app.use(errorHandler);

module.exports = app;
