require('dotenv').config();
const app = require('./src/app');

if (!process.env.WAQI_API_KEY) {
  console.error("WAQI_API_KEY missing in .env");
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
