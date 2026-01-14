const express = require('express');
const controller = require('../controllers/aqi.controller');

const router = express.Router();

router.get('/current-location', controller.getCurrentLocationAQI);
router.get('/city/:cityName', controller.getCityAQI);
router.get('/top-cities', controller.getTopCities);
router.get('/tiles/:z/:x/:y', controller.getTile);

module.exports = router;
