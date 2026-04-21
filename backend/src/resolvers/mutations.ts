import { GraphQLError } from "graphql";

export const mutations = {
  addProduct: async (_: unknown, { product }: any, { models }: any) => {
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
      description,
      price,
      imageUrl,
      category: categoryId,
      stock,
    });

    return await newProduct.save();
  },

  addCategory: async (_: unknown, { name }: { name: string }, { models }: any) => {
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

  updateProduct: async (_: unknown, { product }: any, { models }: any) => {
    const { id, name, description, price, imageUrl, categoryId, stock } =
      product;

    // 1. Pre-update validation (for logic that depends on other collections)
    if (categoryId) {
      const categoryExists = await models.Category.findById(categoryId);
      if (!categoryExists) {
        throw new GraphQLError(`Category with ID ${categoryId} does not exist.`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
    }

    // 2. Prepare update object (filter out undefined values)
    const updateFields: any = {};
    if (name !== undefined) updateFields.name = name.trim();
    if (description !== undefined) updateFields.description = description;
    if (price !== undefined) updateFields.price = price;
    if (imageUrl !== undefined) updateFields.imageUrl = imageUrl;
    if (stock !== undefined) updateFields.stock = stock;
    if (categoryId !== undefined) updateFields.category = categoryId;

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

  deleteProduct: async (_: unknown, { id }: { id: string }, { models }: any) => {
    const result = await models.Product.findByIdAndDelete(id);

    if (!result) {
      throw new GraphQLError(`Product with ID ${id} does not exist.`, {
        extensions: { code: "NOT_FOUND" },
      });
    }

    return true;
  },
};
