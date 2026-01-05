# BreatheEasy 🌱

BreatheEasy is an open-source project that helps you monitor air quality in your area, understand pollutant levels, and take informed actions for better health. It lets you search and explore real-time air quality data from any city around the world. Featuring a live AQI dashboard, interactive maps, and detailed pollutant breakdowns, it offers tailored health guidance and community-level improvement suggestions. With dark/light mode support and a mobile-friendly UI, BreatheEasy makes understanding air quality simple, informative, and accessible.

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

## ✨ Contributors

| Avatar | Username | Commits | Additions | Deletions | GitHub |
|--------|-----------|----------|------------|------------|--------|
| <img src="https://avatars.githubusercontent.com/u/118150046?s=60&v=4" width="50" /> | NirvikD | 10 | 772 | 183 | [@NirvikD](https://github.com/NirvikD) |
| <img src="https://avatars.githubusercontent.com/u/204588730?s=60&v=4" width="50" /> | gaurav123-4 | 3 | 723 | 43 | [@gaurav123-4](https://github.com/gaurav123-4) |
| <img src="https://avatars.githubusercontent.com/u/207236269?s=60&v=4" width="50" /> | Mohamed-Fiyaz | 3 | 472 | 179 | [@Mohamed-Fiyaz](https://github.com/Mohamed-Fiyaz) |
| <img src="https://avatars.githubusercontent.com/u/98377377?s=60&v=4" width="50" /> | deepanshu-prajapati01 | 5 | 312 | 151 | [@deepanshu-prajapati01](https://github.com/deepanshu-prajapati01) |
| <img src="https://avatars.githubusercontent.com/u/139871425?s=60&v=4" width="50" /> | Kashish23092004 | 4 | 295 | 256 | [@Kashish23092004](https://github.com/Kashish23092004) |
| <img src="https://avatars.githubusercontent.com/u/155642144?s=60&v=4" width="50" /> | PROJITAKAR | 1 | 236 | 19 | [@PROJITAKAR](https://github.com/PROJITAKAR) |
| <img src="https://avatars.githubusercontent.com/u/182481744?s=60&v=4" width="50" /> | RAGHU1242 | 2 | 181 | 108 | [@RAGHU1242](https://github.com/RAGHU1242) |
| <img src="https://avatars.githubusercontent.com/u/180231504?s=60&v=4" width="50" /> | shubhranshu-sahu | 1 | 130 | 0 | [@shubhranshu-sahu](https://github.com/shubhranshu-sahu) |
| <img src="https://avatars.githubusercontent.com/u/137296776?s=60&v=4" width="50" /> | ShubhamDidharia | 1 | 47 | 1 | [@ShubhamDidharia](https://github.com/ShubhamDidharia) |
| <img src="https://avatars.githubusercontent.com/u/143961669?s=60&v=4" width="50" /> | harsimrankaur15 | 3 | 42 | 1 | [@harsimrankaur15](https://github.com/harsimrankaur15) |
| <img src="https://avatars.githubusercontent.com/u/208266043?s=60&v=4" width="50" /> | Tanyasharma71 | 1 | 21 | 0 | [@Tanyasharma71](https://github.com/Tanyasharma71) |
| <img src="https://avatars.githubusercontent.com/u/122119293?s=60&v=4" width="50" /> | riya751885 | 1 | 3 | 0 | [@riya751885](https://github.com/riya751885) |
| <img src="https://avatars.githubusercontent.com/u/150011931?s=60&v=4" width="50" /> | vinitjain2005 | 1 | 1 | 1 | [@vinitjain2005](https://github.com/vinitjain2005) |
| <img src="https://avatars.githubusercontent.com/u/182147037?s=60&v=4" width="50" /> | modi-meet | 1 | 2 | 0 | [@modi-meet](https://github.com/modi-meet) |

---

### 🛠️ Maintainer

| Avatar | Username | Commits | Lines Added | Lines Deleted | GitHub |
|--------|-----------|----------|---------------|----------------|--------|
| <img src="https://avatars.githubusercontent.com/u/171074534?s=60&v=4" width="50" /> | prasoonk1204 | 9 | 2,202 | 1,121 | [@prasoonk1204](https://github.com/prasoonk1204) |


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
VITE_STADIAMAPS_API_KEY=your_stadiamaps_api_key_here
VITE_API_BASE_URL=http://localhost:3000/api/aqi
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

## 💡 Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/) (Frontend)
- [Tailwind CSS](https://tailwindcss.com/) (Frontend)
- [Chart.js](https://www.chartjs.org/) (Frontend)
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) (Backend)
- [WAQI API](https://aqicn.org/api/) (AQI Data)
- [Stadia Maps](https://stadiamaps.com/) (Map tiles)

---

## 💬 Community & Support

- **Questions?** Open an issue with the `question` label
- **Bug Reports:** Use the `bug` label when creating issues
- **Feature Requests:** Use the `feature` label

## 📜 License

This project is open-source and available under the [MIT License](License.md).

---

**Happy Contributing! 🎉**
