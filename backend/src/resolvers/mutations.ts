import { GraphQLError } from "graphql";
import type { MutationResolvers } from "../generated/graphql.js";

export const mutations: MutationResolvers = {
  addProduct: async (_parent, { product }, { models }) => {
    if (!product) {
      throw new GraphQLError("Product input is required", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    const { categoryId, name, description, price, imageUrl, stock } = product;

    // Validation
    if (!name || name.trim().length === 0) {
      throw new GraphQLError("Product name is required", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    if (price < 0) {
      throw new GraphQLError("Price cannot be negative", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    if (stock < 0) {
      throw new GraphQLError("Stock cannot be negative", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    const categoryExists = await models.Category.findById(categoryId);

    if (!categoryExists) {
      throw new GraphQLError(`Category with ID ${categoryId} does not exist.`, {
        extensions: { code: "NOT_FOUND" },
      });
    }

    const newProduct = new models.Product({
      name: name.trim(),
      description: description ?? undefined,
      price,
      imageUrl: imageUrl ?? undefined,
      categoryId: categoryId,
      stock,
    });

    return await newProduct.save();
  },

  addCategory: async (_parent, { name }, { models }) => {
    if (!name || name.trim().length === 0) {
      throw new GraphQLError("Category name is required", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    const nameExists = await models.Category.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
    });

    if (nameExists) {
      throw new GraphQLError(`Category with name "${name}" already exists.`, {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    const newCategory = new models.Category({
      name: name.trim(),
    });

    return await newCategory.save();
  },

  updateProduct: async (_parent, { product }, { models }) => {
    if (!product) {
      throw new GraphQLError("Product input is required", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    const { id, name, description, price, imageUrl, categoryId, stock } =
      product;

    // 1. Pre-update validation (for logic that depends on other collections)
    if (categoryId) {
      const categoryExists = await models.Category.findById(categoryId);
      if (!categoryExists) {
        throw new GraphQLError(
          `Category with ID ${categoryId} does not exist.`,
          {
            extensions: { code: "NOT_FOUND" },
          },
        );
      }
    }

    // 2. Prepare update object (filter out undefined values)
    const updateFields: any = {};
    if (name !== undefined && name !== null) updateFields.name = name.trim();
    if (description !== undefined) updateFields.description = description;
    if (price !== undefined && price !== null) updateFields.price = price;
    if (imageUrl !== undefined) updateFields.imageUrl = imageUrl;
    if (stock !== undefined && stock !== null) updateFields.stock = stock;
    if (categoryId !== undefined && categoryId !== null)
      updateFields.categoryId = categoryId;

    // 3. Perform atomic update
    try {
      const updatedProduct = await models.Product.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true, runValidators: true },
      );

      if (!updatedProduct) {
        throw new GraphQLError(`Product with ID ${id} does not exist.`, {
          extensions: { code: "NOT_FOUND" },
        });
      }

      return updatedProduct;
    } catch (error: any) {
      // Handle Mongoose validation errors
      if (error.name === "ValidationError") {
        throw new GraphQLError(error.message, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      throw error;
    }
  },

  deleteProduct: async (_parent, { id }, { models }) => {
    const result = await models.Product.findByIdAndDelete(id);

    if (!result) {
      throw new GraphQLError(`Product with ID ${id} does not exist.`, {
        extensions: { code: "NOT_FOUND" },
      });
    }

    return true;
  },
};
