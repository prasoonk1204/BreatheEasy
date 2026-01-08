# Contributing to BreatheEasy 🌱

Thank you for your interest in contributing to **BreatheEasy**!
We welcome all kinds of contributions — code, documentation, bug reports, and feature requests.

Please read this guide carefully before contributing.

---

## 📋 Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher recommended)
- npm or yarn
- Git
- A GitHub account

---

## 🔁 Contribution Workflow

1. Fork the repository
2. Clone your fork locally
3. Create a new branch
4. Make changes
5. Commit and push
6. Open a Pull Request

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/BreatheEasy.git
cd BreatheEasy
```

---

## 2️⃣ Create a New Branch

Always create a new branch for your work:

```bash
git checkout -b feature/short-description
```

### Branch Naming Convention
- `feature/add-dark-mode`
- `fix/api-error`
- `docs/update-contributing`

---

## 🗂 Project Structure

```text
BreatheEasy/
├── client/   # React + Vite frontend
├── server/   # Node.js + Express backend
├── README.md
└── CONTRIBUTING.md
```

---

## ⚙️ Project Setup

### Frontend Setup

```bash
cd client
npm install
# or
yarn install
```

Create `.env` file:
```bash
cp .example.env .env
```

Add:
```env
VITE_STADIAMAPS_API_KEY=your_api_key_here
VITE_API_BASE_URL=http://localhost:3000
```

Run frontend:
```bash
npm run dev
# or
yarn dev
```

---

### Backend Setup

```bash
cd server
npm install
# or
yarn install
```

Create `.env` file:
```env
WAQI_API_KEY=your_api_key_here
PORT=3000
```

Run backend:
```bash
npm start
# or
yarn start
```

---

## 🧪 Code Guidelines

- Follow the existing code style
- Keep code clean and readable
- Comment complex logic
- Test before submitting

---

## 📝 Commit Message Guidelines

Use meaningful commit messages:

- `feat: add AQI filter`
- `fix: resolve API error`
- `docs: update contributing guide`

---

## 🔀 Pull Request Guidelines

Before opening a PR:
- One feature or fix per PR
- Reference the related issue number
- Add screenshots for UI changes
- Ensure the project runs without errors

Example:
```
Fixes #75
```

---

## 💬 Community & Support

- Use the `question` label for doubts
- Use the `bug` label for bugs
- Use the `feature` label for feature requests

Be respectful and collaborative.

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the **MIT License**.

---

Happy contributing 🚀
