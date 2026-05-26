type LogLevel = 'info' | 'warn' | 'error' | 'debug';

function format(level: LogLevel, message: string): string {
  return `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
}

export const logger = {
  info: (message: string) => console.log(format('info', message)),
  warn: (message: string) => console.warn(format('warn', message)),
  error: (message: string, error?: unknown) => {
    console.error(format('error', message));
    if (error) {
      console.error(error);
    }
  },
  debug: (message: string) => {
    if (process.env.DEBUG === 'true') {
      console.log(format('debug', message));
    }
  },
};
