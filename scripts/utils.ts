import fs from 'fs';
import { join } from 'path';
import winston from 'winston';

export { join };

const __dirname = import.meta.dirname;
export const PROJECT_DIR = join(__dirname, '..');
export const SOURCE_DIR = join(PROJECT_DIR, 'src');

export const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  ],
});

export function ErrorExit(message: string) {
  logger.error(message);
  process.exit(1);
}

export class FileManager {
  static writeFile(path: string, content: string | Buffer) {
    return fs.writeFileSync(path, content);
  }

  static writeJson(path: string, json: object) {
    return this.writeFile(path, JSON.stringify(json, null, 2));
  }
}
