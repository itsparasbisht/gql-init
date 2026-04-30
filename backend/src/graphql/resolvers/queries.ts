import type { QueryResolvers } from "../../generated/graphql.js";

export const queries: QueryResolvers = {
  products: async (_parent, _args, { models }) => await models.Product.find(),
  product: async (_parent, { id }, { models }) =>
    await models.Product.findById(id),
  categories: async (_parent, _args, { models }) =>
    await models.Category.find(),
  category: async (_parent, { id }, { models }) =>
    await models.Category.findById(id),
  users: async (_parent, _args, { models }) => await models.User.find(),
  user: async (_parent, { id }, { models }) => await models.User.findById(id),
};
