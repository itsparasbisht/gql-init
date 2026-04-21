export const typeResolvers = {
  Product: {
    category: (parent: any, _: unknown, { models }: any) =>
      models.Category.findById(parent.category),

    reviews: (parent: any, _: unknown, { models }: any) =>
      models.Review.find({ product: parent.id }),
  },

  Category: {
    products: (parent: any, _: unknown, { models }: any) =>
      models.Product.find({ category: parent.id }),
  },

  User: {
    orders: (parent: any, _: unknown, { models }: any) =>
      models.Order.find({ user: parent.id }),

    reviews: (parent: any, _: unknown, { models }: any) =>
      models.Review.find({ user: parent.id }),
  },

  Review: {
    user: (parent: any, _: unknown, { models }: any) =>
      models.User.findById(parent.user),

    product: (parent: any, _: unknown, { models }: any) =>
      models.Product.findById(parent.product),
  },

  Order: {
    user: (parent: any, _: unknown, { models }: any) =>
      models.User.findById(parent.user),

    totalAmount: (parent: any) => parent.totalAmount,

    status: (parent: any) => parent.status || "PENDING",

    createdAt: (parent: any) =>
      parent.createdAt ? parent.createdAt.toISOString() : new Date().toISOString(),
  },

  OrderItem: {
    product: (parent: any, _: unknown, { models }: any) =>
      models.Product.findById(parent.product),
  },
};
