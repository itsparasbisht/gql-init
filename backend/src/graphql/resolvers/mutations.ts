import { GraphQLError } from "graphql";
import type { MutationResolvers } from "../../generated/graphql.js";
import {
  AddProductSchema,
  UpdateProductSchema,
  AddCategorySchema,
  RegisterSchema,
  LoginSchema,
  AddReviewSchema,
  CreateOrderSchema,
} from "../../utils/validation.js";
import {
  hashPassword,
  comparePasswords,
  generateToken,
  requireAuth,
} from "../../utils/auth.js";
import { handleResolverError } from "../../utils/errors.js";

export const mutations: MutationResolvers = {
  register: async (_parent, { input }, { models }) => {
    try {
      const { email, password } = RegisterSchema.parse(input);
      const existingUser = await models.User.findOne({ email });
      if (existingUser) {
        throw new GraphQLError("User already exists with this email", {
          extensions: { code: "BAD_USER_INPUT", http: { status: 400 } },
        });
      }
      const newUser = new models.User({
        email,
        password: await hashPassword(password),
      });
      await newUser.save();
      return { token: generateToken(newUser), user: newUser };
    } catch (error) {
      return handleResolverError(error);
    }
  },

  login: async (_parent, { input }, { models }) => {
    try {
      const { email, password } = LoginSchema.parse(input);
      const user = await models.User.findOne({ email });
      if (!user || !(await comparePasswords(password, user.password))) {
        throw new GraphQLError("Invalid email or password", {
          extensions: { code: "UNAUTHENTICATED", http: { status: 401 } },
        });
      }
      return { token: generateToken(user), user };
    } catch (error) {
      return handleResolverError(error);
    }
  },

  addProduct: requireAuth(async (_parent, { product }, { models }) => {
    try {
      const data = AddProductSchema.parse(product);
      const category = await models.Category.findById(data.categoryId);
      if (!category) {
        throw new GraphQLError(`Category ${data.categoryId} not found`, {
          extensions: { code: "NOT_FOUND", http: { status: 404 } },
        });
      }
      return await new models.Product(data).save();
    } catch (error) {
      return handleResolverError(error);
    }
  }),

  addCategory: requireAuth(async (_parent, { name }, { models }) => {
    try {
      const data = AddCategorySchema.parse({ name });
      return await new models.Category(data).save();
    } catch (error) {
      return handleResolverError(error);
    }
  }),

  updateProduct: requireAuth(async (_parent, { product }, { models }) => {
    try {
      const { id, ...fields } = UpdateProductSchema.parse(product);
      if (fields.categoryId) {
        const category = await models.Category.findById(fields.categoryId);
        if (!category) {
          throw new GraphQLError("Category not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
      }
      const updatedProduct = await models.Product.findByIdAndUpdate(
        id,
        { $set: fields },
        { new: true },
      );
      if (!updatedProduct) {
        throw new GraphQLError("Product not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return updatedProduct;
    } catch (error) {
      return handleResolverError(error);
    }
  }),

  deleteProduct: requireAuth(async (_parent, { id }, { models }) => {
    try {
      const deletedProduct = await models.Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        throw new GraphQLError("Product not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return true;
    } catch (error) {
      return handleResolverError(error);
    }
  }),

  addReview: requireAuth(async (_parent, { input }, { models, user }) => {
    try {
      const { productId, rating, comment } = AddReviewSchema.parse(input);

      const product = await models.Product.findById(productId);
      if (!product) {
        throw new GraphQLError("Product not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }
      // Check if user already reviewed this product
      const existingReview = await models.Review.findOne({
        userId: user!._id,
        productId,
      });
      if (existingReview) {
        throw new GraphQLError("You have already reviewed this product", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      return await new models.Review({
        userId: user!._id,
        productId,
        rating,
        comment,
      }).save();
    } catch (error) {
      return handleResolverError(error);
    }
  }),

  deleteReview: requireAuth(async (_parent, { id }, { models, user }) => {
    try {
      const review = await models.Review.findById(id);
      if (!review) {
        throw new GraphQLError("Review not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      if (review.userId.toString() !== user!._id.toString()) {
        throw new GraphQLError("Unauthorized to delete this review", {
          extensions: { code: "FORBIDDEN" },
        });
      }

      await models.Review.findByIdAndDelete(id);
      return true;
    } catch (error) {
      return handleResolverError(error);
    }
  }),

  createOrder: requireAuth(async (_parent, { input }, { models, user }) => {
    try {
      const { items } = CreateOrderSchema.parse(input);
      let totalAmount = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await models.Product.findById(item.productId);
        if (!product) {
          throw new GraphQLError(`Product ${item.productId} not found`);
        }

        if (product.stock < item.quantity) {
          throw new GraphQLError(`Insufficient stock for ${product.name}`, {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }

        totalAmount += product.price * item.quantity;
        orderItems.push({
          productId: product._id,
          quantity: item.quantity,
          priceAtOrder: product.price,
        });

        product.stock -= item.quantity;
        await product.save();
      }

      return await new models.Order({
        userId: user!._id,
        items: orderItems,
        totalAmount,
        status: "PENDING",
      }).save();
    } catch (error) {
      return handleResolverError(error);
    }
  }),

  updateOrderStatus: requireAuth(
    async (_parent, { id, status }, { models }) => {
      try {
        const updatedOrder = await models.Order.findByIdAndUpdate(
          id,
          { $set: { status } },
          { new: true },
        );
        if (!updatedOrder) {
          throw new GraphQLError("Order not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return updatedOrder;
      } catch (error) {
        return handleResolverError(error);
      }
    },
  ),
};
