import { stat, writeFile, appendFile, mkdir } from 'fs/promises';
import { join } from 'path';

export enum LogLevel {
  INFO = 'Info',
  WARNING = 'Warning',
  ERROR = 'Error',
  CRITICAL = 'Critical',
}

export interface ClientLogConfig {
  folderDir: string;
  format: string;
}

const fileName = 'dd-mm-yyyy-discord.logs';

function getFileName() {
  const date = new Date();

  return fileName.replace(
    'dd-mm-yyyy',
    date.toLocaleDateString().replace(/\//g, '-'),
  );
}

export class ClientLog {
  constructor(private config: ClientLogConfig) {}

  public async setup() {
    try {
      await stat(this.config.folderDir);
    } catch {
      mkdir(this.config.folderDir);
      await this.createLogFile();
    }
  }

  public async log(message: string, level: LogLevel) {
    try {
      const fileName = join(this.config.folderDir, getFileName());
      await appendFile(fileName, `${this.getLogText(message, level)}\n`);
    } catch (error) {
      console.error(error);
    }
  }

  private async createLogFile() {
    try {
      const fileName = join(this.config.folderDir, getFileName());
      await writeFile(
        fileName,
        `${this.getLogText(
          'Create the first line of the day',
          LogLevel.INFO,
        )}\n`,
      );
    } catch (error) {
      console.error(error);
    }
  }

  private getLogText(message: string, level: LogLevel) {
    const date = new Date();

    return this.config.format
      .replace('DAY', sliceString(date.getUTCDate()))
      .replace('MONTH', sliceString(date.getUTCMonth()))
      .replace('YEAR', date.getUTCFullYear().toString())
      .replace('HOUR', sliceString(date.getUTCHours()))
      .replace('MINUTES', sliceString(date.getUTCMinutes()))
      .replace('LEVEL', level)
      .replace('MESSAGE', message);
  }
}

function sliceString(date: number) {
  return `0${date}`.slice(-2);
}
