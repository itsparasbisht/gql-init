import { products, categories, users } from "./data.js";

export const resolvers = {
  Query: {
    products: () => products,
    product: (_: unknown, { id }: { id: string }) => products.find((p) => p.id === id),
    categories: () => categories,
    category: (_: unknown, { id }: { id: string }) => categories.find((c) => c.id === id),
    users: () => users,
    user: (_: unknown, { id }: { id: string }) => users.find((u) => u.id === id),
  },
};
