require("dotenv").config();
const express = require("express");
const { rateLimit } = require("express-rate-limit");
const { validateEnv, env } = require("./helpers/env.js");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("./helpers/logger.js");
const errorHandler = require("./middleware/errorHandler.js");
const aqiRoutes = require("./routes/aqiRoutes.js");

// env validation
validateEnv();

const app = express();
const port = env.PORT;

//middlewares
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// middleware to log requests
app.use((req, res, next) => {
  logger.info(`Recieved ${req.method} request to ${req.url}`);
  logger.info(`Request body: ${JSON.stringify(req.body)}`);
  next();
});

// Rate limiting middleware
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Endpoint rate limit far exceeded for IP: ${req.ip}`);
    res.status(429).json({ success: false, message: "Too many request" });
  }
});
app.use(rateLimiter);

//routes
app.use("/api/aqi", aqiRoutes);


// Health check endpoint
app.get("/health-check", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is healthy" });
});

app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Server is running on port http://localhost:${port}`);
})