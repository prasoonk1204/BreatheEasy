const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const router = express.Router();

const aqiCache = new NodeCache({ stdTTL: 300 });

const WAQI_API_BASE_URL = "https://api.waqi.info/feed/";
const WAQI_API_KEY = process.env.WAQI_API_KEY;

const fetchFromWAQI = async (endpoint) => {
    const cacheKey = `waqi_${endpoint}`;
    const cachedData = aqiCache.get(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await axios.get(`${WAQI_API_BASE_URL}${endpoint}/?token=${WAQI_API_KEY}`);
        
        if (response.data.status === 'ok') {
            aqiCache.set(cacheKey, response.data);
        } else {
         
             return response.data; 
        }
        return response.data;
    } catch (error) {
        throw error;
    }
}

router.get('/current-location', async (req, res) => {
    const { lat, lon } = req.query;
    try {
        let endpoint = 'here';
        if (lat && lon) {
            endpoint = `geo:${lat};${lon}`;
        }
        const data = await fetchFromWAQI(endpoint);
        if (data.status !== 'ok') {
            return res.status(400).json(data);
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ status: 'error', data: error.message });
    }
});


router.get('/city/:cityName', async (req, res) => {
    const { cityName } = req.params;
    try {
        const data = await fetchFromWAQI(encodeURIComponent(cityName));
        if (data.status !== 'ok') {
             return res.status(400).json(data);
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ status: 'error', data: error.message });
    }
});

// GET /top-cities
router.get('/top-cities', async (req, res) => {
   const indianCities = ["New Delhi", "Mumbai", "Kolkata", "Bengaluru", "Chennai"];
   const globalCities = ["Beijing", "New York", "London", "Singapore", "Paris"];

   const fetchList = async (cities) => {
       const results = [];
       for (const city of cities) {
           try {
                const data = await fetchFromWAQI(city);
                if (data.status === 'ok' && data.data) {
                     results.push({ city: data.data.city.name, aqi: data.data.aqi });
                }
           } catch (e) {
               console.error(`Failed to fetch for ${city}`, e.message);
           }
       }
       return results.sort((a, b) => a.aqi - b.aqi);
   };

   try {
       const [indian, global] = await Promise.all([
           fetchList(indianCities),
           fetchList(globalCities)
       ]);
       res.json({ top5IndianCities: indian, top5GlobalCities: global });
   } catch (error) {
       res.status(500).json({ status: 'error', data: "Failed to fetch top cities data" });
   }
});

// GET /tiles/:z/:x/:y
router.get('/tiles/:z/:x/:y', async (req, res) => {
    const { z, x, y } = req.params;
    const tileUrl = `https://tiles.waqi.info/tiles/usepa-aqi/${z}/${x}/${y}.png?token=${WAQI_API_KEY}`;

    try {
        const response = await axios.get(tileUrl, {
            responseType: 'arraybuffer'
        });
        res.set('Content-Type', 'image/png');
        res.send(response.data);
    } catch (error) {
        console.error("Tile fetch error:", error.message);
        res.status(500).send("Error fetching tile");
    }
});

module.exports = router;
