const { fetchFromWAQI, fetchTile } = require('../services/waqi.service');
const { isValidLatLon } = require('../utils/validators');

exports.getCurrentLocationAQI = async (req, res, next) => {
  try {
    const { lat, lon } = req.query;

    if ((lat || lon) && !isValidLatLon(lat, lon)) {
      return res.status(400).json({ status: "error", message: "Invalid coordinates" });
    }

    const endpoint = lat && lon ? `geo:${lat};${lon}` : 'here';
    const data = await fetchFromWAQI(endpoint);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getCityAQI = async (req, res, next) => {
  try {
    const data = await fetchFromWAQI(encodeURIComponent(req.params.cityName));
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getTopCities = async (req, res, next) => {
  try {
    const indian = ["New Delhi", "Mumbai", "Kolkata", "Bengaluru", "Chennai"];
    const global = ["Beijing", "New York", "London", "Singapore", "Paris"];

    const fetchList = async (cities) => {
      const results = await Promise.all(
        cities.map(city =>
          fetchFromWAQI(city)
            .then(d => d.status === 'ok'
              ? { city: d.data.city.name, aqi: d.data.aqi }
              : null)
            .catch(() => null)
        )
      );
      return results.filter(Boolean).sort((a, b) => a.aqi - b.aqi);
    };

    const [india, world] = await Promise.all([
      fetchList(indian),
      fetchList(global)
    ]);

    res.json({ top5IndianCities: india, top5GlobalCities: world });
  } catch (err) {
    next(err);
  }
};

exports.getTile = async (req, res, next) => {
  try {
    const tile = await fetchTile(req.params);
    res.set('Content-Type', 'image/png');
    res.send(tile);
  } catch (err) {
    next(err);
  }
};
