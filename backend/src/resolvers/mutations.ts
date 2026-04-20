import { GraphQLError } from "graphql";
import crypto from "node:crypto";

export const mutations = {
  addProduct: (_: unknown, { product }: any, { db }: any) => {
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

    const categoryExists = db.categories.some(
      (cat: any) => cat.id === categoryId,
    );

    if (!categoryExists) {
      throw new GraphQLError(`Category with ID ${categoryId} does not exist.`, {
        extensions: { code: "NOT_FOUND" },
      });
    }

    const newProduct = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description,
      price,
      imageUrl,
      categoryId,
      stock,
    };

    db.products.push(newProduct);

    return newProduct;
  },

  addCategory: (_: unknown, { name }: { name: string }, { db }: any) => {
    if (!name || name.trim().length === 0) {
      throw new GraphQLError("Category name is required", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    const nameExists = db.categories.some(
      (cat: any) => cat.name.toLowerCase() === name.trim().toLowerCase(),
    );

    if (nameExists) {
      throw new GraphQLError(`Category with name "${name}" already exists.`, {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    const newCategory = {
      id: crypto.randomUUID(),
      name: name.trim(),
    };

    db.categories.push(newCategory);

    return newCategory;
  },

  updateProduct: (_: unknown, { product }: any, { db }: any) => {
    const { id, name, description, price, imageUrl, categoryId, stock } =
      product;

    const existingProductIndex = db.products.findIndex((p: any) => p.id === id);

    if (existingProductIndex === -1) {
      throw new GraphQLError(`Product with ID ${id} does not exist.`, {
        extensions: { code: "NOT_FOUND" },
      });
    }

    // Validation
    if (name !== undefined && name.trim().length === 0) {
      throw new GraphQLError("Product name cannot be empty", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    if (price !== undefined && price < 0) {
      throw new GraphQLError("Price cannot be negative", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    if (stock !== undefined && stock < 0) {
      throw new GraphQLError("Stock cannot be negative", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    if (categoryId) {
      const categoryExists = db.categories.some(
        (cat: any) => cat.id === categoryId,
      );
      if (!categoryExists) {
        throw new GraphQLError(
          `Category with ID ${categoryId} does not exist.`,
          {
            extensions: { code: "NOT_FOUND" },
          },
        );
      }
    }

    const updatedProduct = {
      ...db.products[existingProductIndex],
      name:
        name !== undefined
          ? name.trim()
          : db.products[existingProductIndex].name,
      description: description ?? db.products[existingProductIndex].description,
      price: price ?? db.products[existingProductIndex].price,
      imageUrl: imageUrl ?? db.products[existingProductIndex].imageUrl,
      categoryId: categoryId ?? db.products[existingProductIndex].categoryId,
      stock: stock ?? db.products[existingProductIndex].stock,
    };

    db.products[existingProductIndex] = updatedProduct;
    return updatedProduct;
  },

  deleteProduct: (_: unknown, { id }: { id: string }, { db }: any) => {
    const existingProductIndex = db.products.findIndex((p: any) => p.id === id);

    if (existingProductIndex === -1) {
      throw new GraphQLError(`Product with ID ${id} does not exist.`, {
        extensions: { code: "NOT_FOUND" },
      });
    }

    db.products.splice(existingProductIndex, 1);
    return true;
  },
};
