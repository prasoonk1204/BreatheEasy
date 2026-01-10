# BreatheEasy 🌱
[Explore the Website](https://breathe-easy-1.vercel.app)

BreatheEasy is an open-source project that helps you monitor air quality in your area, understand pollutant levels, and take informed actions for better health. It lets you search and explore real-time air quality data from any city around the world. Featuring a live AQI dashboard, interactive maps, and detailed pollutant breakdowns, it offers tailored health guidance and community-level improvement suggestions. With dark/light mode support and a mobile-friendly UI, BreatheEasy makes understanding air quality simple, informative, and accessible.

---

## **_Appreciate the project by giving this repository a Star ⭐_**

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) [![GSSoC](https://img.shields.io/badge/GSSoC-2025-orange)](https://gssoc.girlscript.tech/) [![SWoC](https://img.shields.io/badge/SWoC-2026-blue)](https://beta.swoc.in/)

### Please read the [CONTRIBUTING.md](./CONTRIBUTING.md) before contributing.

---

## Features

- **Live AQI Dashboard:** See the current Air Quality Index for your location.
- **Explore AQI Page:** Search for any city and view its AQI, primary pollutant, last updated time, and detailed pollutant concentrations (PM2.5, PM10, O₃, NO₂, SO₂, CO).
- **Interactive Map:** Visualize AQI data on a map centered on the searched location (requires Stadia Maps API key).
- **Health Suggestions:** Get tailored health advice and precautions based on AQI.
- **Improvement Measures:** Learn how you and your community can help improve air quality.
- **7-Day Forecast:** Visualize upcoming air quality trends with interactive charts.

---

## Project Structure

```
.
├── client/   # React + Vite frontend
├── server/   # Node.js + Express backend
├── README.md
└── ...
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the Repository

```sh
git clone https://github.com/prasoonk1204/BreatheEasy.git
cd BreatheEasy
```

### 2. Set Up the Frontend

```sh
cd client
npm install
# or
yarn install
```

#### .env Setup

Copy `.example.env` to `.env`:

```sh
cp .example.env .env
```

Edit `.env` and add your API keys:

```
VITE_STADIAMAPS_API_KEY=your_stadiamaps_api_key_here
VITE_API_BASE_URL=http://localhost:3000
```

- **Stadia Maps API Key:**
  - Go to [Stadia Maps](https://stadiamaps.com/).
  - Sign up for a free account (no credit card required for the free tier).
  - In your dashboard, go to "Manage Properties" → "Authentication Configuration" to generate/view your API key.
  - Copy and paste it as `VITE_STADIAMAPS_API_KEY` in your `.env` file.

#### Start the frontend:

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Set Up the Backend

```sh
cd ../server
npm install
# or
yarn install
```

#### .env Setup

Create a `.env` file in the `server` directory and add your WAQI API key:

```
WAQI_API_KEY=your_waqi_api_key_here
PORT=3000
```

- **WAQI API Key:** [Get your key here](https://aqicn.org/data-platform/token/#/).

Start the backend server:

```sh
npm start
# or
yarn start
```

The backend will run on [http://localhost:3000](http://localhost:3000) by default.

---

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/) (Frontend)
- [Tailwind CSS](https://tailwindcss.com/) (Frontend)
- [Chart.js](https://www.chartjs.org/) (Frontend)
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) (Backend)
- [WAQI API](https://aqicn.org/api/) (AQI Data)
- [Stadia Maps](https://stadiamaps.com/) (Map tiles)

---

### Maintainer
- Prasoon Kumar - [@prasoonk1204](https://github.com/prasoonk1204)

---

**Happy Contributing!**
