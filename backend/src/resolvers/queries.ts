export const queries = {
  products: async (_: unknown, __: unknown, { models }: any) =>
    await models.Product.find(),

  product: async (_: unknown, { id }: { id: string }, { models }: any) =>
    await models.Product.findById(id),

  categories: async (_: unknown, __: unknown, { models }: any) =>
    await models.Category.find(),

  category: async (_: unknown, { id }: { id: string }, { models }: any) =>
    await models.Category.findById(id),

  users: async (_: unknown, __: unknown, { models }: any) =>
    await models.User.find(),

  user: async (_: unknown, { id }: { id: string }, { models }: any) =>
    await models.User.findById(id),
};
