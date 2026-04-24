import type { Resolvers } from "../generated/graphql.js";

export const typeResolvers: Resolvers = {
  Product: {
    category: async (parent, _args, { models }) => {
      const category = await models.Category.findById(parent.categoryId);
      if (!category) throw new Error("Category not found");
      return category;
    },

    reviews: async (parent, _args, { models }) =>
      await models.Review.find({ productId: parent._id }),

    createdAt: (parent) => parent.createdAt.toISOString(),
    updatedAt: (parent) => parent.updatedAt.toISOString(),
  },

  Category: {
    products: async (parent, _args, { models }) =>
      await models.Product.find({ categoryId: parent._id }),

    createdAt: (parent) => parent.createdAt.toISOString(),
    updatedAt: (parent) => parent.updatedAt.toISOString(),
  },

  User: {
    orders: async (parent, _args, { models }) =>
      await models.Order.find({ userId: parent._id }),

    reviews: async (parent, _args, { models }) =>
      await models.Review.find({ userId: parent._id }),

    createdAt: (parent) => parent.createdAt.toISOString(),
    updatedAt: (parent) => parent.updatedAt.toISOString(),
  },

  Review: {
    user: async (parent, _args, { models }) => {
      const user = await models.User.findById(parent.userId);
      if (!user) throw new Error("User not found");
      return user;
    },

    product: async (parent, _args, { models }) => {
      const product = await models.Product.findById(parent.productId);
      if (!product) throw new Error("Product not found");
      return product;
    },

    createdAt: (parent) => parent.createdAt.toISOString(),
    updatedAt: (parent) => parent.updatedAt.toISOString(),
  },

  Order: {
    user: async (parent, _args, { models }) => {
      const user = await models.User.findById(parent.userId);
      if (!user) throw new Error("User not found");
      return user;
    },

    totalAmount: (parent) => parent.totalAmount,

    // Cast status to any to match enum vs string
    status: (parent) => (parent.status || "PENDING") as any,

    createdAt: (parent) => parent.createdAt.toISOString(),
    updatedAt: (parent) => parent.updatedAt.toISOString(),
  },

  OrderItem: {
    product: async (parent, _args, { models }) => {
      // In the generated type, parent is mapped such that we can access productId from our Mongoose model
      const product = await models.Product.findById((parent as any).productId);
      if (!product) throw new Error("Product not found");
      return product;
    },
  },
};
