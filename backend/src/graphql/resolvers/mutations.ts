import { GraphQLError } from "graphql";
import type { MutationResolvers } from "../../generated/graphql.js";
import {
  AddProductSchema,
  UpdateProductSchema,
  AddCategorySchema,
  RegisterSchema,
  LoginSchema,
} from "../../utils/validation.js";
import { hashPassword, comparePasswords, generateToken, requireAuth } from "../../utils/auth.js";
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
      const newUser = new models.User({ email, password: await hashPassword(password) });
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
        const cat = await models.Category.findById(fields.categoryId);
        if (!cat) throw new GraphQLError("Category not found", { extensions: { code: "NOT_FOUND" } });
      }
      const updated = await models.Product.findByIdAndUpdate(id, { $set: fields }, { new: true });
      if (!updated) throw new GraphQLError("Product not found", { extensions: { code: "NOT_FOUND" } });
      return updated;
    } catch (error) {
      return handleResolverError(error);
    }
  }),

  deleteProduct: requireAuth(async (_parent, { id }, { models }) => {
    try {
      const deleted = await models.Product.findByIdAndDelete(id);
      if (!deleted) throw new GraphQLError("Product not found", { extensions: { code: "NOT_FOUND" } });
      return true;
    } catch (error) {
      return handleResolverError(error);
    }
  }),
};
