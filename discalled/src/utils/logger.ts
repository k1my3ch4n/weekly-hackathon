const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

function timestamp(): string {
  return new Date().toISOString();
}

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    console.log(`${colors.green}[INFO]${colors.reset} ${colors.gray}${timestamp()}${colors.reset} ${message}`, ...args);
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(`${colors.yellow}[WARN]${colors.reset} ${colors.gray}${timestamp()}${colors.reset} ${message}`, ...args);
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(`${colors.red}[ERROR]${colors.reset} ${colors.gray}${timestamp()}${colors.reset} ${message}`, ...args);
  },
  debug: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`${colors.cyan}[DEBUG]${colors.reset} ${colors.gray}${timestamp()}${colors.reset} ${message}`, ...args);
    }
  },
};
