import { z } from "zod";

export const AddProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name too long"),
  description: z.string().trim().max(1000).optional(),
  price: z.number().positive("Price must be greater than zero"),
  imageUrl: z.string().trim().optional().or(z.literal("")),
  categoryId: z.string().min(1, "Category ID is required"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
});

export const UpdateProductSchema = z.object({
  id: z.string().min(1, "Product ID is required"),
  name: z.string().trim().min(2).max(100).optional(),
  description: z.string().trim().max(1000).optional(),
  price: z.number().positive().optional(),
  imageUrl: z.string().trim().optional().or(z.literal("")),
  categoryId: z.string().optional(),
  stock: z.number().int().min(0).optional(),
});

export const AddCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .toLowerCase(),
});

export const RegisterSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password too long"),
});

export const LoginSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export const IdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

export const AddReviewSchema = z.object({
  productId: IdSchema,
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(500).optional(),
});

export const CreateOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: IdSchema,
        quantity: z.number().int().positive(),
      }),
    )
    .min(1, "Order must have at least one item"),
});
