const express = require("express");
const { getCurrentLocationAQI, getCityAQI, getTopCitiesAQI } = require("../controllers/aqiController");
const router = express.Router();

router.get("/current-location", getCurrentLocationAQI);
router.get("/city/:cityName", getCityAQI);
router.get("/top-cities", getTopCitiesAQI);

module.exports = router;
