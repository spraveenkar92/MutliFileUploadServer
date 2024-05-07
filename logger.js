const winston = require("winston");
const { combine, timestamp, printf } = winston.format;

const logMsgFormat = printf(({ timestamp, level, message }) => {
  return `[${timestamp} ${level}]: ${message}`;
});

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logMsgFormat
  ),
  transports: [
    new winston.transports.File({
      filename: `logs/MFU-${new Date().toISOString().substr(0, 10)}.log`,
      tailable: true,
    }),
  ],
});

module.exports = logger;
