const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 300 });

const BASE_URL = "https://api.waqi.info/feed/{endpoint}/?token=API_KEY";
const API_KEY = process.env.WAQI_API_KEY;

exports.fetchFromWAQI = async (endpoint) => {
  const key = `waqi_${endpoint}`;
  if (cache.has(key)) return cache.get(key);

  const { data } = await axios.get(`${BASE_URL}${endpoint}/?token=${API_KEY}`);

  if (data.status === 'ok') {
    cache.set(key, data);
  }

  return data;
};

exports.fetchTile = async ({ z, x, y }) => {
  const key = `tile_${z}_${x}_${y}`;
  if (cache.has(key)) return cache.get(key);

  const url = `https://tiles.waqi.info/tiles/usepa-aqi/${z}/${x}/${y}.png?token=${API_KEY}`;
  const response = await axios.get(url, { responseType: 'arraybuffer' });

  cache.set(key, response.data, 3600);
  return response.data;
};
