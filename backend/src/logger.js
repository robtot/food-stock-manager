const winston = require('winston');

const loggingFormat = winston.format.printf(({ level, message, timestamp, group }) => {
  return `${timestamp} ${level.toUpperCase()}: ${group ? '['+group+'] ' : ''}${message}`;
});

// expects level and message in log (group is optional)
const logger = winston.createLogger({
  level: 'verbose',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        loggingFormat
      )
    })
  ],
});

module.exports = logger;
