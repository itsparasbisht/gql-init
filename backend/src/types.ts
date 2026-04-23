import * as models from "./models.js";

export interface Context {
  models: typeof models;
}

export interface AddProductInput {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId: string;
  stock: number;
}

export interface UpdateProductInput {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  categoryId?: string;
  stock?: number;
}
