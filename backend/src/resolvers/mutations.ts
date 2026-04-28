import { GraphQLError } from "graphql";
import type { MutationResolvers } from "../generated/graphql.js";
import {
  AddProductSchema,
  UpdateProductSchema,
  AddCategorySchema,
} from "../utils/validation.js";
import { ZodError } from "zod";
import { logger } from "../utils/logger.js";

const handleResolverError = (error: unknown): never => {
  // 1. Handle Zod Validation Errors
  if (error instanceof ZodError) {
    throw new GraphQLError(error.issues[0]?.message || "Validation failed", {
      extensions: {
        code: "BAD_USER_INPUT",
        http: { status: 400 },
        errors: error.message,
      },
    });
  }

  // 2. Handle Mongoose/MongoDB specific errors
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

    // Explicit GraphQLErrors thrown in the resolver (like 404s)
    if (error instanceof GraphQLError) {
      throw error;
    }
  }

  // 3. Fallback: Generic Server Error (Internal Server Error)
  logger.error(error, "Unhandled Resolver Error");
  throw new GraphQLError("An internal server error occurred", {
    extensions: {
      code: "INTERNAL_SERVER_ERROR",
      http: { status: 500 },
    },
  });
};

export const mutations: MutationResolvers = {
  addProduct: async (_parent, { product }, { models }) => {
    try {
      if (!product) {
        throw new GraphQLError("Product input is required", {
          extensions: { code: "BAD_USER_INPUT", http: { status: 400 } },
        });
      }

      const validatedData = AddProductSchema.parse(product);

      const categoryExists = await models.Category.findById(
        validatedData.categoryId,
      );
      if (!categoryExists) {
        throw new GraphQLError(
          `Category with ID ${validatedData.categoryId} does not exist.`,
          {
            extensions: { code: "NOT_FOUND", http: { status: 404 } },
          },
        );
      }

      const newProduct = new models.Product(validatedData);
      return await newProduct.save();
    } catch (error) {
      return handleResolverError(error);
    }
  },

  addCategory: async (_parent, { name }, { models }) => {
    try {
      const validatedData = AddCategorySchema.parse({ name });

      const newCategory = new models.Category(validatedData);
      return await newCategory.save();
    } catch (error) {
      return handleResolverError(error);
    }
  },

  updateProduct: async (_parent, { product }, { models }) => {
    try {
      if (!product) {
        throw new GraphQLError("Product input is required", {
          extensions: { code: "BAD_USER_INPUT", http: { status: 400 } },
        });
      }

      const validatedData = UpdateProductSchema.parse(product);
      const { id, ...updateFields } = validatedData;

      if (updateFields.categoryId) {
        const categoryExists = await models.Category.findById(
          updateFields.categoryId,
        );
        if (!categoryExists) {
          throw new GraphQLError(
            `Category with ID ${updateFields.categoryId} does not exist.`,
            {
              extensions: { code: "NOT_FOUND", http: { status: 404 } },
            },
          );
        }
      }

      const updatedProduct = await models.Product.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true, runValidators: true },
      );

      if (!updatedProduct) {
        throw new GraphQLError(`Product with ID ${id} does not exist.`, {
          extensions: { code: "NOT_FOUND", http: { status: 404 } },
        });
      }

      return updatedProduct;
    } catch (error) {
      return handleResolverError(error);
    }
  },

  deleteProduct: async (_parent, { id }, { models }) => {
    try {
      const result = await models.Product.findByIdAndDelete(id);

      if (!result) {
        throw new GraphQLError(`Product with ID ${id} does not exist.`, {
          extensions: { code: "NOT_FOUND", http: { status: 404 } },
        });
      }

      return true;
    } catch (error) {
      return handleResolverError(error);
    }
  },
};
