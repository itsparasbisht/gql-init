export const queries = {
  products: (_: unknown, __: unknown, { db }: any) => db.products,

  product: (_: unknown, { id }: { id: string }, { db }: any) =>
    db.products.find((p: any) => p.id === id) || null,

  categories: (_: unknown, __: unknown, { db }: any) => db.categories,

  category: (_: unknown, { id }: { id: string }, { db }: any) =>
    db.categories.find((c: any) => c.id === id) || null,

  users: (_: unknown, __: unknown, { db }: any) => db.users,

  user: (_: unknown, { id }: { id: string }, { db }: any) =>
    db.users.find((u: any) => u.id === id) || null,
};
