import { GraphQLError } from "graphql";
import { ZodError } from "zod";
import { logger } from "./logger.js";

export const handleResolverError = (error: unknown): never => {
  logger.error(error, "Resolver error");

  if (error instanceof ZodError) {
    throw new GraphQLError(error.issues[0]?.message || "Validation failed", {
      extensions: {
        code: "BAD_USER_INPUT",
        http: { status: 400 },
        errors: error.format(),
      },
    });
  }

  if (error instanceof Error) {
    // MongoDB Duplicate Key Error (Unique constraints)
    if ((error as any).code === 11000) {
      throw new GraphQLError(
        "Conflict: A record with this value already exists",
        {
          extensions: {
            code: "CONFLICT",
            http: { status: 409 },
          },
        },
      );
    }

    // Mongoose Validation Error (as a fallback to Zod)
    if (error.name === "ValidationError") {
      throw new GraphQLError(error.message, {
        extensions: {
          code: "BAD_USER_INPUT",
          http: { status: 400 },
        },
      });
    }

    // Mongoose CastError (Invalid ObjectId format)
    if (error.name === "CastError") {
      throw new GraphQLError(`Invalid ID format for ${(error as any).path}`, {
        extensions: {
          code: "BAD_USER_INPUT",
          http: { status: 400 },
        },
      });
    }

    if (error instanceof GraphQLError) {
      throw error;
    }
  }

  throw new GraphQLError("An internal server error occurred", {
    extensions: {
      code: "INTERNAL_SERVER_ERROR",
      http: { status: 500 },
    },
  });
};
