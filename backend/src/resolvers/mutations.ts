import { products, categories } from "../data.js";

export const mutations = {
  addProduct: (_, { product }) => {
    const { categoryId, name, description, price, imageUrl, stock } = product;
    console.log(product);
    const categoryExists = categories.some((cat) => cat.id === categoryId);

    if (!categoryExists) {
      throw new Error(`Category with ID ${categoryId} does not exist.`);
    }

    const newProduct = {
      id: String(products.length + 1),
      name,
      description,
      price,
      imageUrl,
      categoryId,
      stock,
    };

    products.push(newProduct);

    return newProduct;
  },

  addCategory: (_, { name }) => {
    const newCategory = {
      id: String(categories.length + 1),
      name,
    };

    categories.push(newCategory);

    return newCategory;
  },

  updateProduct: (_, { product }) => {
    const { id, name, description, price, imageUrl, categoryId, stock } =
      product;
    const existingProductIndex = products.findIndex((p) => p.id === id);

    if (existingProductIndex === -1) {
      throw new Error(`Product with ID ${id} does not exist.`);
    }

    if (categoryId) {
      const categoryExists = categories.some((cat) => cat.id === categoryId);
      if (!categoryExists) {
        throw new Error(`Category with ID ${categoryId} does not exist.`);
      }
    }

    const updatedProduct = {
      ...products[existingProductIndex],
      name: name ?? products[existingProductIndex]?.name,
      description: description ?? products[existingProductIndex]?.description,
      price: price ?? products[existingProductIndex]?.price,
      imageUrl: imageUrl ?? products[existingProductIndex]?.imageUrl,
      categoryId: categoryId ?? products[existingProductIndex]?.categoryId,
      stock: stock ?? products[existingProductIndex]?.stock,
    };
    products[existingProductIndex] = updatedProduct;
    return updatedProduct;
  },

  deleteProduct: (_, { id }) => {
    const existingProductIndex = products.findIndex((p) => p.id === id);

    if (existingProductIndex === -1) {
      throw new Error(`Product with ID ${id} does not exist.`);
    }

    products.splice(existingProductIndex, 1);
    return true;
  },
};
