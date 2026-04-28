import mongoose from "mongoose";
import { config } from "./config.js";
import { logger } from "./utils/logger.js";

const MONGODB_URI = config.MONGODB_URI;

export const connectDB = async () => {
  try {
    mongoose.set("debug", (collectionName, method, query) => {
      if (config.NODE_ENV === "development") {
        logger.info(
          {
            collection: collectionName,
            method,
            query,
          },
          "Database Query",
        );
      }
    });

    await mongoose.connect(MONGODB_URI);
    logger.info("Connected to MongoDB successfully");
  } catch (error) {
    logger.error(error, "Error connecting to MongoDB");
    process.exit(1);
  }
};
