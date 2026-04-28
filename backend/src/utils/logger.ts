import pino from "pino";
import type { LoggerOptions } from "pino";
import { config } from "../config.js";

const isDevelopment = config.NODE_ENV === "development";

const pinoOptions: LoggerOptions = {
  level: config.LOG_LEVEL,
};

if (isDevelopment) {
  pinoOptions.transport = {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  };
}

export const logger = pino(pinoOptions);
