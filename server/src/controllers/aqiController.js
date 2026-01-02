// controllers/aqiController.js
const {
  fetchAqiForCurrentLocation,
  fetchAqiByCity,
  fetchTopCitiesAQI,
} = require("../services/aqiService");
const logger = require("../helpers/logger");
const { AppError } = require("../lib/errors");

const getCurrentLocationAQI = async (req, res, next) => {
  logger.info("Fetching AQI for current location");

  try {
    const aqiData = await fetchAqiForCurrentLocation();
    logger.info("Current location AQI fetched successfully", {
      city: aqiData.city,
      aqi: aqiData.aqi,
    });

    res.status(200).json({
      success: true,
      message: "Current location AQI fetched successfully",
      data: aqiData,
    });
  } catch (error) {
    logger.error("Error in getCurrentLocationAQI", { error: error.message });
    next(new AppError(error.message, 400));
  }
};

const getCityAQI = async (req, res, next) => {
  const { cityName } = req.params;
  logger.info("Fetching AQI for city", { cityName });

  try {
    if (!cityName || cityName.trim().length < 2) {
      return next(new AppError("City name must be at least 2 characters", 400));
    }

    const aqiData = await fetchAqiByCity(cityName.trim());
    logger.info("City AQI fetched successfully", {
      city: aqiData.city,
      aqi: aqiData.aqi,
    });

    res.status(200).json({
      success: true,
      message: `AQI for ${aqiData.city} fetched successfully`,
      data: aqiData,
    });
  } catch (error) {
    logger.error(`Error in getCityAQI for ${cityName}`, {
      error: error.message,
    });
    if (
      error.message.includes("not found") ||
      error.message.includes("no station")
    ) {
      next(
        new AppError(
          `No AQI station found for "${cityName}". Try a nearby major city.`,
          404
        )
      );
    } else {
      next(new AppError(error.message, 500));
    }
  }
};

const getTopCitiesAQI = async (req, res, next) => {
  logger.info("Fetching top cities AQI comparison");

  try {
    const topCitiesData = await fetchTopCitiesAQI();
    logger.info("Top cities AQI fetched successfully", {
      indianCount: topCitiesData.topIndianCities.length,
      globalCount: topCitiesData.topGlobalCities.length,
    });

    res.status(200).json({
      success: true,
      message: "Top cities AQI comparison fetched successfully",
      data: topCitiesData,
    });
  } catch (error) {
    logger.error("Error in getTopCitiesAQI", { error: error.message });
    next(new AppError("Failed to fetch top cities data", 500));
  }
};

module.exports = {
  getCurrentLocationAQI,
  getCityAQI,
  getTopCitiesAQI,
};
