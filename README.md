# BreatheEasy 🌱

**BreatheEasy** is an open-source project to help you monitor air quality in your area, understand pollutant levels, and get actionable health advice and improvement measures. It uses the [World Air Quality Index (WAQI)](https://waqi.info/) API to fetch real-time AQI data and presents it in a clean, user-friendly dashboard.

---

## **_Appreciate the project by giving this repository a Star ⭐_**

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) [![GSSoC](https://img.shields.io/badge/GSSoC-2025-blue)](https://gssoc.girlscript.tech/)

## 📋 Contributing

Before contributing, please follow these guidelines:

- **Fork this repository** and clone it to your machine.
- **Create a new branch** for your feature/fix.
- **Describe the issue properly** in your PR and reference the issue number.
- **Follow the existing code style** and test your changes.
- **Update documentation** if you add new features.
- **One feature per PR** and be respectful to other contributors.

---

## 🚀 Features

- **Live AQI Dashboard:** See the current Air Quality Index for your location.
- **Explore AQI Page:** Search for any city and view its AQI, primary pollutant, last updated time, and detailed pollutant concentrations (PM2.5, PM10, O₃, NO₂, SO₂, CO).
- **Interactive Map:** Visualize AQI data on a map centered on the searched location (requires Stadia Maps API key).
- **Dark/Light Mode Toggle:** Easily switch between dark and light themes from the navbar.
- **Health Suggestions:** Get tailored health advice and precautions based on AQI.
- **Improvement Measures:** Learn how you and your community can help improve air quality.
- **7-Day Forecast:** Visualize upcoming air quality trends with interactive charts.
- **Responsive UI:** Built with React, Tailwind CSS, and Chart.js for a modern, mobile-friendly experience.

---

## 🗂️ Project Structure

```
.
├── client/   # React frontend
├── server/   # Node.js + Express backend
├── README.md
└── ...
```

---

## 🛠️ Getting Started

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
VITE_WAQI_API_KEY=your_waqi_api_key_here
VITE_STADIAMAPS_API_KEY=your_stadiamaps_api_key_here
```

- **WAQI API Key:** [Get your key here](https://aqicn.org/data-platform/token/#/).
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

Start the backend server:

```sh
npm start
# or
yarn start
```

The backend will run on [http://localhost:3000](http://localhost:3000) by default.

---

## 💡 Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/) (Frontend)
- [Tailwind CSS](https://tailwindcss.com/) (Frontend)
- [Chart.js](https://www.chartjs.org/) (Frontend)
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) (Backend)
- [WAQI API](https://aqicn.org/api/)
- [Stadia Maps](https://stadiamaps.com/) (Map tiles)

---

## 💬 Community & Support

- **Questions?** Open an issue with the `question` label
- **Bug Reports:** Use the `bug` label when creating issues
- **Feature Requests:** Use the `enhancement` label

## 📜 License

This project is open-source and available under the [MIT License](License).

---

### 🌟 Show your support

Give a ⭐ if you found this project helpful!

**Happy Contributing! 🎉**
