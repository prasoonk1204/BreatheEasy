const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const NodeCache = require('node-cache');

const router = express.Router();

// Cache for 24 hours (86400 seconds)
const tileCache = new NodeCache({ stdTTL: 86400 });

// Rate limiting: 1000 requests per 15 minutes per IP
const tileLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: 'Too many tile requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Get API keys from environment
const STADIAMAPS_API_KEY = process.env.STADIAMAPS_API_KEY;
const WAQI_API_KEY = process.env.WAQI_API_KEY;

// Stadia Maps tile proxy endpoint
router.get('/tiles/:style/:z/:x/:y', tileLimiter, async (req, res) => {
  const { style, z, x, y } = req.params;
  
  // Validate parameters
  if (!style || !z || !x || !y) {
    return res.status(400).send('Invalid tile parameters');
  }

  // Create cache key
  const cacheKey = `stadia_${style}_${z}_${x}_${y}`;
  
  // Check cache first
  const cachedTile = tileCache.get(cacheKey);
  if (cachedTile) {
    console.log(`Cache HIT for Stadia tile: ${cacheKey}`);
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'public, max-age=86400');
    res.set('X-Cache', 'HIT');
    return res.send(cachedTile);
  }

  console.log(`Cache MISS for Stadia tile: ${cacheKey}`);

  // Check if API key is configured
  if (!STADIAMAPS_API_KEY) {
    console.error('STADIAMAPS_API_KEY is not configured');
    return res.status(500).send('Map service not configured');
  }

  try {
    // Fetch tile from Stadia Maps
    const tileUrl = `https://tiles.stadiamaps.com/tiles/${style}/${z}/${x}/${y}.png?api_key=${STADIAMAPS_API_KEY}`;
    
    const response = await axios.get(tileUrl, {
      responseType: 'arraybuffer',
      timeout: 5000,
      headers: {
        'User-Agent': 'BreatheEasy/1.0'
      }
    });

    // Cache the tile
    tileCache.set(cacheKey, response.data);
    console.log(`Cached Stadia tile: ${cacheKey}`);

    // Set response headers
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'public, max-age=86400');
    res.set('X-Cache', 'MISS');
    
    // Send tile data
    res.send(response.data);

  } catch (error) {
    console.error(`Error fetching Stadia tile ${cacheKey}:`, error.message);
    
    if (error.response?.status === 404) {
      return res.status(404).send('Tile not found');
    }
    
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return res.status(504).send('Tile request timeout');
    }
    
    res.status(500).send('Failed to fetch tile');
  }
});

// WAQI AQI overlay tile proxy endpoint
router.get('/aqi-overlay/:z/:x/:y', tileLimiter, async (req, res) => {
  const { z, x, y } = req.params;
  
  // Validate parameters
  if (!z || !x || !y) {
    return res.status(400).send('Invalid tile parameters');
  }

  // Create cache key
  const cacheKey = `waqi_overlay_${z}_${x}_${y}`;
  
  // Check cache first
  const cachedTile = tileCache.get(cacheKey);
  if (cachedTile) {
    console.log(`Cache HIT for WAQI overlay tile: ${cacheKey}`);
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'public, max-age=3600'); // 1 hour cache for AQI overlay (more dynamic)
    res.set('X-Cache', 'HIT');
    return res.send(cachedTile);
  }

  console.log(`Cache MISS for WAQI overlay tile: ${cacheKey}`);

  // Check if API key is configured
  if (!WAQI_API_KEY) {
    console.error('WAQI_API_KEY is not configured');
    return res.status(500).send('AQI overlay service not configured');
  }

  try {
    // Fetch tile from WAQI
    const tileUrl = `https://tiles.aqicn.org/tiles/usepa-aqi/${z}/${x}/${y}.png?token=${WAQI_API_KEY}`;
    
    const response = await axios.get(tileUrl, {
      responseType: 'arraybuffer',
      timeout: 5000,
      headers: {
        'User-Agent': 'BreatheEasy/1.0'
      }
    });

    // Cache the tile (shorter TTL for AQI data as it's more dynamic)
    tileCache.set(cacheKey, response.data, 3600); // 1 hour
    console.log(`Cached WAQI overlay tile: ${cacheKey}`);

    // Set response headers
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'public, max-age=3600');
    res.set('X-Cache', 'MISS');
    
    // Send tile data
    res.send(response.data);

  } catch (error) {
    console.error(`Error fetching WAQI overlay tile ${cacheKey}:`, error.message);
    
    if (error.response?.status === 404) {
      // Return transparent tile for missing AQI data
      return res.status(404).send('Tile not found');
    }
    
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return res.status(504).send('Tile request timeout');
    }
    
    res.status(500).send('Failed to fetch tile');
  }
});

// Cache statistics endpoint (for monitoring)
router.get('/cache-stats', (req, res) => {
  const stats = tileCache.getStats();
  res.json({
    keys: stats.keys,
    hits: stats.hits,
    misses: stats.misses,
    ksize: stats.ksize,
    vsize: stats.vsize
  });
});

module.exports = router;
