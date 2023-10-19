import winston from 'winston';
import path from 'path';

const winstonFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.json(),
);
const logPath = path.join(__dirname, '../..', 'logs', 'application.log');
const exceptionsLogPath = path.join(
  __dirname,
  '../..',
  'logs',
  'exceptions.log',
);
const rejectionsLogPath = path.join(
  __dirname,
  '../..',
  'logs',
  'rejections.log',
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: logPath }),
];

const logger = winston.createLogger({
  format: winstonFormat,
  transports,
  exceptionHandlers: [
    new winston.transports.File({ filename: exceptionsLogPath }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: rejectionsLogPath }),
  ],
  handleExceptions: true,
  handleRejections: true,
});
export default logger;
