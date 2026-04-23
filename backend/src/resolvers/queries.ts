import type { Context } from "../types.js";

export const queries = {
  products: async (_: unknown, __: unknown, { models }: Context) =>
    await models.Product.find(),
  product: async (_: unknown, { id }: { id: string }, { models }: Context) =>
    await models.Product.findById(id),
  categories: async (_: unknown, __: unknown, { models }: Context) =>
    await models.Category.find(),
  category: async (_: unknown, { id }: { id: string }, { models }: Context) =>
    await models.Category.findById(id),
  users: async (_: unknown, __: unknown, { models }: Context) =>
    await models.User.find(),
  user: async (_: unknown, { id }: { id: string }, { models }: Context) =>
    await models.User.findById(id),
};
