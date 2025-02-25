import { injectable } from 'inversify';
import winston from 'winston';
import type { ILogger } from '~/.server/interfaces/i_logger';
import { CustomBaseError } from './custom_base_error';

@injectable()
export class Logger implements ILogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' }),
      ],
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string | Error): void {
    if (message instanceof CustomBaseError) {
      this.logger.error(
        JSON.stringify({
          name: message.name,
          message: message.message,
          statusCode: message.statusCode,
          errorCode: message.errorCode,
          details: message.details,
          stack: message.stack,
        })
      );
    } else if (message instanceof Error) {
      this.logger.error(
        JSON.stringify({
          name: message.name,
          message: message.message,
          stack: message.stack,
        })
      );
    } else {
      this.logger.error(message);
    }
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}
