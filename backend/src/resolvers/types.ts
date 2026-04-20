export const typeResolvers = {
  Product: {
    category: (parent: any, _: unknown, { db }: any) =>
      db.categories.find((c: any) => c.id === parent.categoryId),

    reviews: (parent: any, _: unknown, { db }: any) =>
      db.reviews.filter((r: any) => r.productId === parent.id),
  },

  Category: {
    products: (parent: any, _: unknown, { db }: any) =>
      db.products.filter((p: any) => p.categoryId === parent.id),
  },

  User: {
    orders: (parent: any, _: unknown, { db }: any) =>
      db.orders.filter((o: any) => o.userId === parent.id),

    reviews: (parent: any, _: unknown, { db }: any) =>
      db.reviews.filter((r: any) => r.userId === parent.id),
  },

  Review: {
    user: (parent: any, _: unknown, { db }: any) =>
      db.users.find((u: any) => u.id === parent.userId),

    product: (parent: any, _: unknown, { db }: any) =>
      db.products.find((p: any) => p.id === parent.productId),
  },

  Order: {
    user: (parent: any, _: unknown, { db }: any) =>
      db.users.find((u: any) => u.id === parent.userId),

    totalAmount: (parent: any) =>
      parent.items.reduce(
        (sum: number, item: any) => sum + item.priceAtOrder * item.quantity,
        0,
      ),

    status: () => "PENDING",

    createdAt: () => new Date().toISOString(),
  },

  OrderItem: {
    product: (parent: any, _: unknown, { db }: any) =>
      db.products.find((p: any) => p.id === parent.productId),
  },
};
