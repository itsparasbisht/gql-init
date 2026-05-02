import { GraphQLError } from "graphql";
import type { QueryResolvers } from "../../generated/graphql.js";
import { requireAuth } from "../../utils/auth.js";
import { IdSchema } from "../../utils/validation.js";
import { handleResolverError } from "../../utils/errors.js";

export const queries: QueryResolvers = {
  products: async (_parent, _args, { models }) => {
    try {
      return await models.Product.find();
    } catch (error) {
      return handleResolverError(error);
    }
  },

  product: async (_parent, { id }, { models }) => {
    try {
      const validatedId = IdSchema.parse(id);
      const product = await models.Product.findById(validatedId);
      if (!product) {
        throw new GraphQLError(`Product with ID ${id} not found`, {
          extensions: { code: "NOT_FOUND", http: { status: 404 } },
        });
      }
      return product;
    } catch (error) {
      return handleResolverError(error);
    }
  },

  categories: async (_parent, _args, { models }) => {
    try {
      return await models.Category.find();
    } catch (error) {
      return handleResolverError(error);
    }
  },

  category: async (_parent, { id }, { models }) => {
    try {
      const validatedId = IdSchema.parse(id);
      const category = await models.Category.findById(validatedId);
      if (!category) {
        throw new GraphQLError(`Category with ID ${id} not found`, {
          extensions: { code: "NOT_FOUND", http: { status: 404 } },
        });
      }
      return category;
    } catch (error) {
      return handleResolverError(error);
    }
  },

  profile: requireAuth(async (_parent, _args, { user }) => {
    try {
      return user;
    } catch (error) {
      return handleResolverError(error);
    }
  }),
};
