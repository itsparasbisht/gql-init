import pino from "pino";
import type { LoggerOptions } from "pino";
import dotenv from "dotenv";

dotenv.config();

const isDevelopment = process.env["NODE_ENV"] === "development";

const pinoOptions: LoggerOptions = {
  level: process.env["LOG_LEVEL"] || "info",
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
