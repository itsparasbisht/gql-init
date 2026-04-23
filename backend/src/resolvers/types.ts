import type {
  ICategory,
  IProduct,
  IUser,
  IReview,
  IOrder,
  IOrderItem,
} from "../models.js";
import type { Context } from "../types.js";

export const typeResolvers = {
  Product: {
    category: async (parent: IProduct, _: unknown, { models }: Context) =>
      await models.Category.findById(parent.categoryId),

    reviews: async (parent: IProduct, _: unknown, { models }: Context) =>
      await models.Review.find({ productId: parent._id }),

    createdAt: (parent: IProduct) => parent.createdAt.toISOString(),
    updatedAt: (parent: IProduct) => parent.updatedAt.toISOString(),
  },

  Category: {
    products: async (parent: ICategory, _: unknown, { models }: Context) =>
      await models.Product.find({ categoryId: parent._id }),

    createdAt: (parent: ICategory) => parent.createdAt.toISOString(),
    updatedAt: (parent: ICategory) => parent.updatedAt.toISOString(),
  },

  User: {
    orders: async (parent: IUser, _: unknown, { models }: Context) =>
      await models.Order.find({ userId: parent._id }),

    reviews: async (parent: IUser, _: unknown, { models }: Context) =>
      await models.Review.find({ userId: parent._id }),

    createdAt: (parent: IUser) => parent.createdAt.toISOString(),
    updatedAt: (parent: IUser) => parent.updatedAt.toISOString(),
  },

  Review: {
    user: async (parent: IReview, _: unknown, { models }: Context) =>
      await models.User.findById(parent.userId),

    product: async (parent: IReview, _: unknown, { models }: Context) =>
      await models.Product.findById(parent.productId),

    createdAt: (parent: IReview) => parent.createdAt.toISOString(),
    updatedAt: (parent: IReview) => parent.updatedAt.toISOString(),
  },

  Order: {
    user: async (parent: IOrder, _: unknown, { models }: Context) =>
      await models.User.findById(parent.userId),

    totalAmount: (parent: IOrder) => parent.totalAmount,

    status: (parent: IOrder) => parent.status || "PENDING",

    createdAt: (parent: IOrder) => parent.createdAt.toISOString(),
    updatedAt: (parent: IOrder) => parent.updatedAt.toISOString(),
  },

  OrderItem: {
    product: async (parent: IOrderItem, _: unknown, { models }: Context) =>
      await models.Product.findById(parent.productId),
  },
};
