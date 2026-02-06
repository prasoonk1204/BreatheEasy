const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const router = express.Router();

// Cache for 1 hour (3600 seconds) - Tiles don't change often
const tileCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

const STADIAMAPS_API_KEY = process.env.STADIAMAPS_API_KEY;
const WAQI_API_KEY = process.env.WAQI_API_KEY;

// Proxy for Stadia Maps tiles
router.get('/tiles/:style/:z/:x/:y', async (req, res) => {
    const { style, z, x, y } = req.params;
    
    // Validate style to prevent arbitrary URL injection
    const allowedStyles = ['alidade_smooth', 'alidade_smooth_dark', 'outdoors', 'osm_bright'];
    if (!allowedStyles.includes(style)) {
        return res.status(400).send("Invalid map style");
    }
       // Check internal cache
    const cacheKey = `stadia_${style}_${z}_${x}_${y}`;
    const cachedTile = tileCache.get(cacheKey);
    if (cachedTile) {
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=86400'); // Browser cache 1 day
        return res.send(cachedTile);
    }

    const tileUrl = `https://tiles.stadiamaps.com/tiles/${style}/${z}/${x}/${y}.png?api_key=${STADIAMAPS_API_KEY}`;

    try {
        const response = await axios.get(tileUrl, {
            responseType: 'arraybuffer'
        });

        const tileData = response.data;
        
        // Save to cache
        tileCache.set(cacheKey, tileData);

        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=86400'); // Browser cache 1 day
        res.send(tileData);
    } catch (error) {
        console.error(`Stadia tile fetch error (${style}):`, error.message);
        if (error.response && error.response.status === 403) {
             return res.status(403).send("Unable to fetch map tile");
        }
        res.status(500).send("Error fetching map tile");
    }
});

// Proxy for WAQI AQI Overlay tiles
router.get('/aqi-overlay/:z/:x/:y', async (req, res) => {
    const { z, x, y } = req.params;
    
    // Check internal cache
    const cacheKey = `waqi_${z}_${x}_${y}`;
    const cachedTile = tileCache.get(cacheKey);
    if (cachedTile) {
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=3600'); // Browser cache 1 hour
        return res.send(cachedTile);
    }

    const tileUrl = `https://tiles.waqi.info/tiles/usepa-aqi/${z}/${x}/${y}.png?token=${WAQI_API_KEY}`;

    try {
        const response = await axios.get(tileUrl, {
            responseType: 'arraybuffer'
        });

        const tileData = response.data;
        
        // Save to cache
        tileCache.set(cacheKey, tileData);

        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=3600'); // Browser cache 1 hour
        res.send(tileData);
    } catch (error) {
        console.error("WAQI tile fetch error:", error.message);
        res.status(500).send("Error fetching AQI tile");
    }
});

module.exports = router;
