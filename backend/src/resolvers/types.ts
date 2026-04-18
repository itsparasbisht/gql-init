export const typeResolvers = {
  Product: {
    category: (parent: { categoryId: string }, _: unknown, { db }: any) =>
      db.categories.find((c: any) => c.id === parent.categoryId),

    reviews: (parent: { id: string }, _: unknown, { db }: any) =>
      db.reviews.filter((r: any) => r.productId === parent.id),
  },

  Category: {
    products: (parent: { id: string }, _: unknown, { db }: any) =>
      db.products.filter((p: any) => p.categoryId === parent.id),
  },

  User: {
    orders: (parent: { id: string }, _: unknown, { db }: any) =>
      db.orders.filter((o: any) => o.userId === parent.id),

    reviews: (parent: { id: string }, _: unknown, { db }: any) =>
      db.reviews.filter((r: any) => r.userId === parent.id),
  },

  Review: {
    user: (parent: { userId: string }, _: unknown, { db }: any) =>
      db.users.find((u: any) => u.id === parent.userId),

    product: (parent: { productId: string }, _: unknown, { db }: any) =>
      db.products.find((p: any) => p.id === parent.productId),
  },

  Order: {
    user: (parent: { userId: string }, _: unknown, { db }: any) =>
      db.users.find((u: any) => u.id === parent.userId),

    totalAmount: (parent: { items: any[] }) =>
      parent.items.reduce(
        (sum, item) => sum + item.priceAtOrder * item.quantity,
        0,
      ),

    status: () => "PENDING",

    createdAt: () => new Date().toISOString(),
  },

  OrderItem: {
    product: (parent: { productId: string }, _: unknown, { db }: any) =>
      db.products.find((p: any) => p.id === parent.productId),
  },
};
