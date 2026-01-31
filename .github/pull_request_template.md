---
name: Pull Request Template
about: Standardize your contribution to BreatheEasy
---

## 📝 Description
Provide a summary of the changes. Does this PR affect the `client`, the `server`, or both?

## 🔗 Related Issue
Fixes # (issue number)

## 🛠️ Type of Change
- [ ] ✨ New Feature (AQI tracking, Charts, etc.)
- [ ] 🐞 Bug Fix (UI or API Logic)
- [ ] 📝 Documentation Update
- [ ] 🔐 Security / API Key Handling
- [ ] 🎨 UI/UX Styling (Tailwind/CSS)

## 🧪 Testing & Validation
### Frontend (Client)
- [ ] I have verified the UI in both **Light and Dark mode**.
- [ ] The app is responsive on mobile screens.
- [ ] `npm run dev` starts without errors in the `/client` directory.

### Backend (Server)
- [ ] I have tested the Proxy endpoints with the WAQI API.
- [ ] The server handles 404/500 errors gracefully.
- [ ] `npm start` runs without errors in the `/server` directory.

## 🚩 Checklist:
- [ ] I have updated the `.env.example` in both directories if I added new environment variables.
- [ ] My code follows the project's directory structure.
- [ ] I have performed a self-review of my code.
- [ ] (If UI change) I have attached a screenshot/GIF below.

## 📸 Screenshots / Demos
(Add screenshots or screen recordings here)
