# BreatheEasy 🌱

**BreatheEasy** is an open-source project to help you monitor air quality in your area, understand pollutant levels, and get actionable health advice and improvement measures. It uses the [World Air Quality Index (WAQI)](https://waqi.info/) API to fetch real-time AQI data and presents it in a clean, user-friendly dashboard.

---

**Appreciate the project by giving this repository a Star ⭐**

## 📋 Rules for Pull Requests

Before contributing, please follow these guidelines:

### ⭐ Getting Started
1. **Fork this repository** to your GitHub account
2. **Clone your forked repository** to your local machine
3. **Create a new branch** for your feature/fix

### 📝 Pull Request Guidelines
1. **Describe the issue properly** - Provide a clear and detailed description of what the PR addresses
2. **Reference the issue number** - Link your PR to the relevant issue using `Fixes #issue_number`
3. **Follow the existing code style** - Maintain consistency with the current codebase
4. **Test your changes** - Ensure your code works as expected before submitting
5. **Add meaningful commit messages** - Use descriptive commit messages that explain what changes were made
6. **Update documentation** - If you add new features, update the README accordingly
7. **One feature per PR** - Keep your pull requests focused on a single feature or bug fix
8. **Be respectful** - Follow our Code of Conduct and be respectful to other contributors

### 🚫 What NOT to do
- Don't submit PRs without linking them to an issue
- Don't make changes unrelated to the issue you're solving
- Don't submit duplicate PRs
- Don't spam or create low-quality PRs just for the sake of contributing


## 🚀 Features

- **Live AQI Dashboard:** See the current Air Quality Index for your location.
- **Pollutant Breakdown:** View detailed levels of PM2.5, PM10, O₃, NO₂, SO₂, and CO.
- **Health Suggestions:** Get tailored health advice and precautions based on AQI.
- **Improvement Measures:** Learn how you and your community can help improve air quality.
- **7-Day Forecast:** Visualize upcoming air quality trends with interactive charts.
- **Responsive UI:** Built with React, Tailwind CSS, and Chart.js for a modern, mobile-friendly experience.

  ## 🚧 Help Wanted: Full Stack Contributors!

We are looking for contributors to help set up the backend and work on both the frontend and backend to implement new features for BreatheEasy.

**Frontend goals:**

- Landing Page for the app
- Integrate new backend endpoints for enhanced features
- Improve data visualization and user experience
- Add new UI components as backend features are developed

**Backend goals:**

- Proxy AQI requests to the WAQI API (to keep API keys secure)
- Serve mock AQI data for testing/demo
- Optionally, store user feedback or favorite locations

---

## 🧑‍💻 Contributing

We welcome all contributions! Here are some ways you can help:

- **Suggest new features** by [opening an issue](https://github.com/prasoonk1204/BreatheEasy/issues).
- **Report bugs** with details and steps to reproduce.
- **Improve documentation** for beginners.
- **Enhance UI/UX** for better accessibility and experience.
- **Help build the backend** as described above!

---

---

## 🗂️ Project Structure

BreatheEasy is now organized into two main parts:

- **Frontend**: React app (in `/client`)
- **Backend**: Node.js + Express API server (in `/server`)

```
.
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...etc
├── server/
│   ├── src/
│   ├── package.json
│   └── ...etc
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

- Copy `.example.env` to `.env` and add your [WAQI API key](https://aqicn.org/data-platform/token/#/).

```sh
cp .example.env .env
```

- Edit `.env`:

```
VITE_WAQI_API_KEY=your_api_key_here
```

- Start the frontend:

```sh
npm run dev
# or
yarn dev
```

- Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Set Up the Backend

```sh
cd ../server
npm install
# or
yarn install
```

- Start the backend server:

```sh
npm start
# or
yarn start
```

- The backend will run on [http://localhost:3000](http://localhost:3000) by default.

---


## 💡 Tech Stack

- [React](https://react.dev/) (Frontend)
- [Vite](https://vitejs.dev/) (Frontend)
- [Tailwind CSS](https://tailwindcss.com/) (Frontend)
- [Chart.js](https://www.chartjs.org/) (Frontend)
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) (Backend)
- [WAQI API](https://aqicn.org/api/)

---

## 💬 Community & Support

- **Questions?** Open an issue with the `question` label
- **Bug Reports:** Use the `bug` label when creating issues
- **Feature Requests:** Use the `enhancement` label
- **Discussion:** Join our community discussions in the Issues section

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

### 🌟 Show your support

Give a ⭐ if you found this project helpful!

**Happy Contributing! 🎉**
