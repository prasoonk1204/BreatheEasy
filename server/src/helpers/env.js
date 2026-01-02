import logger from './logger';

require('dotenv').config();

const requiredEnvVars = [
  "WAQI_API_KEY",
  "STADIAMAPS_API_KEY",
  "PORT",
  "NODE_ENV",
  "CORS_ORIGIN",
];

export const env = {
  WAQI_API_KEY: process.env.WAQI_API_KEY,
  STADIAMAPS_API_KEY: process.env.STADIAMAPS_API_KEY,
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
};

export const validateEnv = () => {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    logger.error("Missing required environment variables", {
      missing: missing.join(", "),
    });
    logger.error("Add them to your .env file and restart the server.");
    process.exit(1);
  }

  if (env.WAQI_API_KEY === "your_waqi_api_key_here") {
    logger.error("WAQI_API_KEY is still the placeholder value", {
      expected: "Real API key from waqi.info",
    });
    process.exit(1);
  }

  if (env.STADIAMAPS_API_KEY === "your_stadiamaps_api_key_here") {
    logger.error("STADIAMAPS_API_KEY is still the placeholder value", {
      expected: "Real API key from stadiamaps.com",
    });
    process.exit(1);
  }

  if (parseInt(env.PORT) < 1 || parseInt(env.PORT) > 65535) {
    logger.error("Invalid PORT value", {
      value: env.PORT,
      validRange: "1-65535",
    });
    process.exit(1);
  }

  logger.info("All environment variables validated successfully", {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
  });
};