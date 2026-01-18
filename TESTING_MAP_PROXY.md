# Testing Instructions for Map Tile Proxy (Issue #62)

## Overview
This document provides comprehensive testing instructions to verify the implementation of the backend tile proxy for Stadia Maps and WAQI overlay tiles.

## Prerequisites

### 1. Environment Setup

#### Backend (.env in `server` directory)
Create `server/.env` file with:
```env
WAQI_API_KEY=your_waqi_api_key_here
STADIAMAPS_API_KEY=your_stadiamaps_api_key_here
PORT=3000
```

#### Frontend (.env in `client` directory)
Create `client/.env` file with:
```env
VITE_API_BASE_URL=http://localhost:3000
```

### 2. Install Dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd client
npm install
```

## Testing Steps

### Phase 1: Backend Endpoint Testing

#### Test 1.1: Start Backend Server
```bash
cd server
npm start
```

**Expected Output:**
```
Server running on port 3000
```

#### Test 1.2: Test Stadia Maps Tile Endpoint
Open a new terminal and test the tile proxy endpoint:

```bash
# Test a specific tile
curl -I http://localhost:3000/api/map/tiles/alidade_smooth/10/518/384
```

**Expected Response Headers:**
```
HTTP/1.1 200 OK
Content-Type: image/png
Cache-Control: public, max-age=86400
X-Cache: MISS (first request) or HIT (subsequent requests)
```

**What to verify:**
- ✅ Status code is 200
- ✅ Content-Type is image/png
- ✅ Cache-Control header is present
- ✅ X-Cache header shows MISS on first request, HIT on second

#### Test 1.3: Test WAQI Overlay Endpoint
```bash
# Test WAQI overlay tile
curl -I http://localhost:3000/api/map/aqi-overlay/10/518/384
```

**Expected Response Headers:**
```
HTTP/1.1 200 OK
Content-Type: image/png
Cache-Control: public, max-age=3600
X-Cache: MISS (first request) or HIT (subsequent requests)
```

#### Test 1.4: Test Rate Limiting
Run this PowerShell script to test rate limiting:

```powershell
# Test rate limiting by making rapid requests
for ($i = 0; $i -lt 1005; $i++) {
    Invoke-WebRequest -Uri "http://localhost:3000/api/map/tiles/alidade_smooth/10/518/384" -Method GET -ErrorAction SilentlyContinue
    if ($i % 100 -eq 0) {
        Write-Host "Sent $i requests..."
    }
}
```

**Expected Behavior:**
- First 1000 requests: 200 OK or 304 Not Modified
- Requests 1001+: 429 Too Many Requests

#### Test 1.5: Test Cache Statistics
```bash
curl http://localhost:3000/api/map/cache-stats
```

**Expected Response:**
```json
{
  "keys": 10,
  "hits": 25,
  "misses": 10,
  "ksize": 10,
  "vsize": 1048576
}
```

#### Test 1.6: Test Error Handling

**Invalid tile parameters:**
```bash
curl -I http://localhost:3000/api/map/tiles/alidade_smooth/999999/999999/999999
```
**Expected:** 404 Not Found

**Missing style:**
```bash
curl -I http://localhost:3000/api/map/tiles//10/518/384
```
**Expected:** 404 Not Found

### Phase 2: Frontend Integration Testing

#### Test 2.1: Start Frontend
```bash
cd client
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

#### Test 2.2: Verify Map Loads
1. Open http://localhost:5173 in your browser
2. Navigate to the Dashboard or page with the map
3. Open Browser DevTools (F12)

**What to verify:**
- ✅ Map tiles load correctly
- ✅ Map is interactive (can pan and zoom)
- ✅ AQI overlay displays correctly

#### Test 2.3: Verify Network Requests
In DevTools → Network tab:

1. Refresh the page
2. Filter by "map" or "api"

**Expected Network Requests:**
- `http://localhost:3000/api/map/tiles/alidade_smooth/10/518/384` (multiple tiles)
- `http://localhost:3000/api/map/aqi-overlay/10/518/384` (multiple overlay tiles)

**What to verify:**
- ✅ All tile requests go to `/api/map/` endpoints
- ✅ No direct requests to tiles.stadiamaps.com
- ✅ No direct requests to tiles.aqicn.org
- ✅ Tile load time < 500ms (target: < 300ms for cached)

#### Test 2.4: Verify No API Keys in Frontend
1. Open DevTools → Sources tab
2. Search for "STADIAMAPS_API_KEY" or "WAQI_API_KEY"
3. Check all JavaScript files

**Expected Result:**
- ✅ No API keys found in client-side code
- ✅ No API keys in Network requests visible in DevTools

#### Test 2.5: Test Caching Performance
1. Load the map page
2. Note the tile load times in Network tab (should show "MISS" in backend logs)
3. Pan around the map to request new tiles
4. Return to the original position
5. Note the tile load times (should show "HIT" in backend logs)

**Expected Behavior:**
- First load: 200-500ms per tile (backend fetches from Stadia Maps)
- Subsequent loads: < 100ms per tile (served from cache)

### Phase 3: Security Verification

#### Test 3.1: Verify API Keys Not Exposed
```bash
# Search client build for API keys
cd client
npm run build
cd dist
grep -r "STADIAMAPS_API_KEY" .
grep -r "WAQI_API_KEY" .
```

**Expected Result:**
- No matches found (exit code 1 for grep)

#### Test 3.2: Verify Backend API Key Security
```bash
# Check that API keys are loaded from environment
cd server
grep -n "STADIAMAPS_API_KEY" routes/mapProxy.js
```

**Expected:**
- Line shows: `const STADIAMAPS_API_KEY = process.env.STADIAMAPS_API_KEY;`
- API key loaded from environment, not hardcoded

### Phase 4: Performance Testing

#### Test 4.1: Measure Tile Load Time

**Without Cache (First Load):**
1. Restart backend server (clears cache)
2. Load map page
3. Measure average tile load time in DevTools Network tab

**Target:** < 500ms per tile

**With Cache (Subsequent Loads):**
1. Reload the same map view
2. Measure average tile load time

**Target:** < 100ms per tile (from cache)

#### Test 4.2: Check Backend Logs
Backend console should show:
```
Cache MISS for Stadia tile: stadia_alidade_smooth_10_518_384
Cached Stadia tile: stadia_alidade_smooth_10_518_384
Cache HIT for Stadia tile: stadia_alidade_smooth_10_518_384
Cache MISS for WAQI overlay tile: waqi_overlay_10_518_384
Cached WAQI overlay tile: waqi_overlay_10_518_384
Cache HIT for WAQI overlay tile: waqi_overlay_10_518_384
```

### Phase 5: Functional Testing

#### Test 5.1: Map Functionality
- ✅ Zoom in/out works correctly
- ✅ Pan in all directions works
- ✅ Tiles load at all zoom levels (0-20)
- ✅ No broken tile images
- ✅ Map attribution displays correctly

#### Test 5.2: AQI Overlay Functionality
- ✅ AQI overlay displays colored tiles based on air quality
- ✅ Overlay opacity is correct (0.7)
- ✅ Overlay attribution displays correctly
- ✅ Overlay updates when moving to new locations

#### Test 5.3: Error Recovery
**Simulate backend failure:**
1. Stop the backend server
2. Try to load the map in frontend

**Expected Behavior:**
- Map fails gracefully (no crash)
- Console shows network errors but app continues to function

**Restart backend:**
3. Restart backend server
4. Refresh the page

**Expected Behavior:**
- Map loads correctly again

## Success Criteria

### ✅ All Tests Passed Checklist

- [ ] Backend endpoints return tiles correctly (200 OK, image/png)
- [ ] Frontend map loads tiles from backend URLs
- [ ] No API keys visible in browser DevTools or frontend code
- [ ] Caching works (X-Cache headers show HIT/MISS)
- [ ] Cache statistics endpoint returns valid data
- [ ] Rate limiting prevents abuse (429 after 1000 requests)
- [ ] Map performance is acceptable (< 500ms tile load)
- [ ] Cached tiles load quickly (< 100ms)
- [ ] WAQI overlay displays correctly
- [ ] Map is fully functional (zoom, pan, interactive)
- [ ] No console errors in browser
- [ ] Backend logs show cache hits/misses

## Troubleshooting

### Issue: Tiles not loading (404 errors)
**Solution:** 
- Verify API keys are correctly set in `server/.env`
- Check backend logs for error messages
- Verify backend server is running on port 3000

### Issue: CORS errors
**Solution:**
- Verify CORS is enabled in `server/app.js`
- Check `VITE_API_BASE_URL` in `client/.env` matches backend URL

### Issue: Tiles loading slowly
**Solution:**
- Check backend logs for cache misses
- Restart backend to clear cache and test fresh
- Monitor network tab for actual tile load times
- Consider increasing cache TTL for less dynamic content

### Issue: Rate limiting blocking legitimate requests
**Solution:**
- Increase rate limit in `server/routes/mapProxy.js`
- Adjust `windowMs` or `max` values in `tileLimiter` configuration

### Issue: Map not visible
**Solution:**
- Check browser console for errors
- Verify `VITE_API_BASE_URL` is correctly set
- Ensure backend server is running
- Check Leaflet CSS is loaded

## Performance Benchmarks

### Expected Performance Metrics

| Metric | Target | Acceptable |
|--------|--------|------------|
| Uncached tile load | < 300ms | < 500ms |
| Cached tile load | < 50ms | < 100ms |
| Cache hit rate (after warmup) | > 80% | > 60% |
| Backend memory usage | < 100MB | < 200MB |
| Rate limit threshold | 1000 req/15min | Configurable |

## Monitoring

### Backend Logs to Monitor
- Cache hit/miss rates
- Tile fetch errors
- Rate limit triggers
- API key validation errors

### Frontend Metrics to Monitor
- Tile load times (Network tab)
- Console errors
- Map rendering performance

## Next Steps After Testing

1. **If all tests pass:**
   - Push changes to GitHub
   - Create Pull Request
   - Link to issue #62
   - Request code review

2. **If tests fail:**
   - Review error messages
   - Check troubleshooting section
   - Fix issues
   - Rerun tests

## Additional Notes

- **Cache Duration:** Map tiles are cached for 24 hours, AQI overlay for 1 hour
- **Rate Limiting:** Currently set to 1000 requests per 15 minutes per IP
- **Memory Usage:** Cache stores tiles in memory; monitor for large deployments
- **Production Deployment:** Consider using Redis or CDN for production caching

---

**Last Updated:** January 18, 2026
**Issue:** #62 - Proxy map tile requests through backend
**Branch:** issue-62-map-tile-proxy
