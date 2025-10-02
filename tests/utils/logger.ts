import { createLogger, format, transports } from 'winston';
import moment from 'moment';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: () => moment().format('YYYY-MM-DD hh:mm:ss A') }),
    format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
  ),
  transports: [
    new transports.Console()
  ]
});
