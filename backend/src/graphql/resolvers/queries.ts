import { GraphQLError } from "graphql";
import type { QueryResolvers } from "../../generated/graphql.js";

export const queries: QueryResolvers = {
  products: async (_parent, _args, { models }) => await models.Product.find(),
  product: async (_parent, { id }, { models }) => {
    const product = await models.Product.findById(id);
    if (!product) {
      throw new GraphQLError(`Product with ID ${id} not found`, {
        extensions: { code: "NOT_FOUND", http: { status: 404 } },
      });
    }
    return product;
  },
  categories: async (_parent, _args, { models }) =>
    await models.Category.find(),
  category: async (_parent, { id }, { models }) => {
    const category = await models.Category.findById(id);
    if (!category) {
      throw new GraphQLError(`Category with ID ${id} not found`, {
        extensions: { code: "NOT_FOUND", http: { status: 404 } },
      });
    }
    return category;
  },
  me: (_parent, _args, { user }) => {
    if (!user) return null;
    return user;
  },
};
