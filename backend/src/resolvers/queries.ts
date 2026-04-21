export const queries = {
  products: (_: unknown, __: unknown, { models }: any) => models.Product.find(),

  product: (_: unknown, { id }: { id: string }, { models }: any) =>
    models.Product.findById(id),

  categories: (_: unknown, __: unknown, { models }: any) =>
    models.Category.find(),

  category: (_: unknown, { id }: { id: string }, { models }: any) =>
    models.Category.findById(id),

  users: (_: unknown, __: unknown, { models }: any) => models.User.find(),

  user: (_: unknown, { id }: { id: string }, { models }: any) =>
    models.User.findById(id),
};
