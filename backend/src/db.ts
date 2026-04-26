import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "./utils/logger.js";

dotenv.config();

const MONGODB_URI = process.env["MONGODB_URI"] || "";

export const connectDB = async () => {
  try {
    if (process.env["NODE_ENV"] === "development") {
      mongoose.set("debug", (collectionName, method, query) => {
        logger.info(
          {
            collection: collectionName,
            method,
            query,
          },
          "Database Query",
        );
      });
    }
    await mongoose.connect(MONGODB_URI);
    logger.info("Connected to MongoDB successfully");
  } catch (error) {
    logger.error(error, "Error connecting to MongoDB");
    process.exit(1);
  }
};
