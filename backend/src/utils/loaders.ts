import DataLoader from "dataloader";
import * as models from "../database/models.js";
import type { ICategory, IReview } from "../database/models.js";

export const createLoaders = () => {
  return {
    category: new DataLoader<string, ICategory>(async (categoryIds) => {
      const categories = await models.Category.find({
        _id: { $in: categoryIds },
      });

      const categoryMap = categories.reduce(
        (acc, category) => {
          acc[category._id.toString()] = category;
          return acc;
        },
        {} as Record<string, ICategory>,
      );

      return categoryIds.map(
        (id) => categoryMap[id] || new Error(`Category ${id} not found`),
      );
    }),

    productReviews: new DataLoader<string, IReview[]>(async (productIds) => {
      const reviews = await models.Review.find({
        productId: { $in: productIds },
      });

      // Group reviews by productId
      // Result: { "prod_1": [rev1, rev2], "prod_2": [rev3] }
      const reviewMap = reviews.reduce(
        (acc, review) => {
          const pId = review.productId.toString();
          if (!acc[pId]) acc[pId] = [];
          acc[pId].push(review);
          return acc;
        },
        {} as Record<string, IReview[]>,
      );

      // Map back to the requested productIds
      return productIds.map((id) => reviewMap[id] || []);
    }),
  };
};

export type DataLoaders = ReturnType<typeof createLoaders>;
