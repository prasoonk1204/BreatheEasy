const winston = require("winston");

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug", // if its in production mode then it will show the info like warnings/errors and if its in development it will show all the errors including debugs of it....

  format: winston.format.combine(
    // it will format the logs means combine it which which log has to be shown
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.prettyPrint(),
    winston.format.json()
  ),

  defaultMeta: { service: "user-service" }, // shows the exta info about the logs that this log is from user-service
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }), //shows and add all logs in a file named error.log
    new winston.transports.File({ filename: "combined.log" }), // shows and add all logs in a file named combined.log
  ],
});

module.exports = logger;
