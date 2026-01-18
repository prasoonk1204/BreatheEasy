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

BreatheEasy/
│
├── client/                              # Frontend application (React + Vite)
│
│   ├── public/                          # Public static assets used directly by the      browser
│   │   ├── favicon.png                  # Website favicon icon
│   │   ├── detailed_analytics.png       # Landing page illustration
│   │   ├── global_coverage.png          # Landing page illustration
│   │   ├── interactive_visualization.png# Landing page illustration
│   │   ├── personalised_health_advice.png # Landing page illustration
│   │   ├── predictive_forecasting.png   # Landing page illustration
│   │   └── real_time_monitoring.png     # Landing page illustration
│
│   ├── src/                             # Main frontend source code
│   │
│   │   ├── components/                  # All reusable React components
│   │   │
│   │   │   ├── landing/                 # Components for landing page sections
│   │   │   │   ├── About.jsx            # About section UI
│   │   │   │   ├── ContributorTestimonials.tsx # Contributors showcase section
│   │   │   │   ├── Features.jsx         # Features section UI
│   │   │   │   └── landing.css          # Styles for landing page sections
│   │   │
│   │   │   ├── skeletons/               # Loading placeholder components
│   │   │   │   └── DashboardSkeleton.jsx # Skeleton loader for dashboard page
│   │   │
│   │   │   ├── ui/                      # Generic UI building blocks (design system)
│   │   │   │   ├── aurora-background-demo.tsx  # Demo for animated background
│   │   │   │   ├── aurora-background.tsx       # Animated background component
│   │   │   │   ├── button.tsx                  # Reusable button component
│   │   │   │   ├── cta-4.tsx                   # Call-to-action UI section
│   │   │   │   ├── input.tsx                   # Input field component
│   │   │   │   ├── label.tsx                   # Label UI component
│   │   │   │   ├── menu-toggle.tsx             # Mobile menu toggle button
│   │   │   │   ├── sheet.tsx                   # Sliding drawer / modal component
│   │   │   │   ├── simple-header.tsx           # Header layout component
│   │   │   │   ├── modern-animated-footer.tsx  # Animated footer component
│   │   │   │   └── testimonials-columns-1.tsx  # Testimonials layout UI
│   │   │
│   │   │   ├── AQICard.jsx              # Displays main AQI value
│   │   │   ├── AQIScaleTable.jsx        # AQI scale reference table
│   │   │   ├── ErrorAirChart.jsx        # Error UI for chart failures
│   │   │   ├── LanguageToggle.jsx       # Language switch dropdown
│   │   │   ├── Layout.jsx               # Common layout wrapper for pages
│   │   │   ├── MapComponent.jsx         # Map visualization for AQI
│   │   │   ├── Navbar.jsx               # Top navigation bar
│   │   │   ├── PollutantDetails.jsx     # Pollutant breakdown display
│   │   │   ├── ScrollToTop.jsx          # Auto scroll on route change
│   │   │   ├── Sidebar.jsx              # Sidebar navigation menu
│   │   │   ├── Suggestions.jsx          # Health advice based on AQI
│   │   │   └── Testimonials.tsx         # User testimonials section
│   │
│   │   ├── constants/                   # Static configuration & data files
│   │   │   ├── contributors.js          # Contributors list
│   │   │   ├── features.js              # Features data for landing page
│   │   │   └── maintainers.js           # Maintainers list
│   │
│   │   ├── hooks/                       # Custom React hooks
│   │   │   ├── useAqiData.js            # Fetch & manage AQI data
│   │   │   └── useTheme.js              # Handle dark/light theme
│   │
│   │   ├── lib/                         # Shared utility logic & helper functions
│   │   │   └── utils.ts                 # Common utility functions used across app
│   │
│   │   ├── pages/                       # Route-level page components
│   │   │   ├── AirQualityChart.jsx      # AQI graph visualization page
│   │   │   ├── Dashboard.jsx            # Main dashboard page
│   │   │   ├── ExploreAQI.jsx           # City AQI search page
│   │   │   ├── ImprovementMeasures.jsx  # Air quality improvement tips page
│   │   │   ├── LandingPage.jsx          # Website landing page
│   │   │   └── Precautions.jsx          # Health precautions page
│   │
│   │   ├── services/                    # API communication layer
│   │   │   └── apiService.js            # Backend API request handler
│   │
│   │   ├── utils/                       # Standalone helper utilities
│   │   │   └── fetchAQIData.js         ️           # External AQI data fetcher
│   │
│   │   ├── App.jsx                      # Root React component
│   │   ├── main.jsx                     # Application entry point
│   │   └── index.css                    # Global CSS styles
│
│   ├── .example.env                     # Sample environment variables
│   ├── .gitignore                       # Git ignore rules
│   ├── components.json                 # UI components configuration
│   ├── eslint.config.js                 # ESLint configuration
│   ├── index.html                       # Main HTML template
│   ├── package.json                    # Frontend dependencies & scripts
│   ├── tsconfig.json                   # TypeScript configuration
│   ├── tsconfig.node.json              # Node-specific TS config
│   ├── vercel.json                     # Vercel deployment settings
│   └── vite.config.js                  # Vite build configuration
│
├── server/                              # Backend application (Node + Express)
│   ├── routes/
│   │   └── aqi.js                       # AQI API routes
│   ├── app.js                           # Express server entry file
│   ├── package.json                    # Backend dependencies
│   ├── package-lock.json               # Locked dependency versions
│   └── .gitignore                      # Backend git ignore rules
│
├── CONTRIBUTING.md                      # Contribution guidelines
├── LICENSE.md                           # MIT license
└── README.md                            # Main project documentation


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

Edit `.env` and add your API base URL:

```
VITE_API_BASE_URL=http://localhost:3000
```

> **Note:** API keys for WAQI and Stadia Maps are now securely managed on the backend server. You no longer need to configure them in the client environment.

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

Copy `.example.env` to `.env`:

```sh
cp .example.env .env
```

Create a `.env` file in the `server` directory and add your API keys:

```
WAQI_API_KEY=your_waqi_api_key_here
STADIAMAPS_API_KEY=your_stadiamaps_api_key_here
PORT=3000
```

- **WAQI API Key:** [Get your key here](https://aqicn.org/data-platform/token/#/).
- **Stadia Maps API Key:**
  - Go to [Stadia Maps](https://stadiamaps.com/).
  - Sign up for a free account (no credit card required for the free tier).
  - In your dashboard, go to "Manage Properties" → "Authentication Configuration" to generate/view your API key.
  - Copy and paste it as `STADIAMAPS_API_KEY` in your server `.env` file.

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
