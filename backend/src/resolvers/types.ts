export const typeResolvers = {
  Product: {
    category: async (parent: any, _: unknown, { models }: any) =>
      await models.Category.findById(parent.category),

    reviews: async (parent: any, _: unknown, { models }: any) =>
      await models.Review.find({ product: parent.id }),

    createdAt: (parent: any) => parent.createdAt.toISOString(),
    updatedAt: (parent: any) => parent.updatedAt.toISOString(),
  },

  Category: {
    products: async (parent: any, _: unknown, { models }: any) =>
      await models.Product.find({ category: parent.id }),

    createdAt: (parent: any) => parent.createdAt.toISOString(),
    updatedAt: (parent: any) => parent.updatedAt.toISOString(),
  },

  User: {
    orders: async (parent: any, _: unknown, { models }: any) =>
      await models.Order.find({ user: parent.id }),

    reviews: async (parent: any, _: unknown, { models }: any) =>
      await models.Review.find({ user: parent.id }),

    createdAt: (parent: any) => parent.createdAt.toISOString(),
    updatedAt: (parent: any) => parent.updatedAt.toISOString(),
  },

  Review: {
    user: async (parent: any, _: unknown, { models }: any) =>
      await models.User.findById(parent.user),

    product: async (parent: any, _: unknown, { models }: any) =>
      await models.Product.findById(parent.product),

    createdAt: (parent: any) => parent.createdAt.toISOString(),
    updatedAt: (parent: any) => parent.updatedAt.toISOString(),
  },

  Order: {
    user: async (parent: any, _: unknown, { models }: any) =>
      await models.User.findById(parent.user),

    totalAmount: (parent: any) => parent.totalAmount,

    status: (parent: any) => parent.status || "PENDING",

    createdAt: (parent: any) => parent.createdAt.toISOString(),
    updatedAt: (parent: any) => parent.updatedAt.toISOString(),
  },

  OrderItem: {
    product: async (parent: any, _: unknown, { models }: any) =>
      await models.Product.findById(parent.product),
  },
};
