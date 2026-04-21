import mongoose from "mongoose";
import * as models from "./models.js";
import * as data from "./data.js";
import { connectDB } from "./db.js";

const seed = async () => {
  try {
    await connectDB();

    // 1. Clear existing data
    console.log("🧹 Clearing existing data...");
    await Promise.all([
      models.Category.deleteMany({}),
      models.Product.deleteMany({}),
      models.User.deleteMany({}),
      models.Review.deleteMany({}),
      models.Order.deleteMany({}),
    ]);

    // 2. Seed Categories
    console.log("📁 Seeding categories...");
    const categoryIdMap: Record<string, mongoose.Types.ObjectId> = {};
    for (const cat of data.categories) {
      const newCat = await models.Category.create({ name: cat.name });
      categoryIdMap[cat.id] = newCat._id as mongoose.Types.ObjectId;
    }

    // 3. Seed Products
    console.log("📦 Seeding products...");
    const productIdMap: Record<string, mongoose.Types.ObjectId> = {};
    for (const prod of data.products) {
      const newProd = await models.Product.create({
        name: prod.name,
        description: prod.description,
        price: prod.price,
        imageUrl: prod.imageUrl,
        stock: prod.stock,
        category: categoryIdMap[prod.categoryId],
      });
      productIdMap[prod.id] = newProd._id as mongoose.Types.ObjectId;
    }

    // 4. Seed Users
    console.log("👥 Seeding users...");
    const userIdMap: Record<string, mongoose.Types.ObjectId> = {};
    for (const user of data.users) {
      const newUser = await models.User.create({
        username: user.username,
        email: user.email,
      });
      userIdMap[user.id] = newUser._id as mongoose.Types.ObjectId;
    }

    // 5. Seed Reviews
    console.log("⭐ Seeding reviews...");
    for (const rev of data.reviews) {
      await models.Review.create({
        rating: rev.rating,
        comment: rev.comment,
        product: productIdMap[rev.productId],
        user: userIdMap[rev.userId],
      });
    }

    // 6. Seed Orders
    console.log("🛒 Seeding orders...");
    for (const order of data.orders) {
      const items = order.items.map((item: any) => ({
        product: productIdMap[item.productId],
        quantity: item.quantity,
        priceAtOrder: item.priceAtOrder,
      }));

      const totalAmount = items.reduce(
        (sum: number, item: any) => sum + item.priceAtOrder * item.quantity,
        0
      );

      await models.Order.create({
        user: userIdMap[order.userId],
        items,
        totalAmount,
        status: "PENDING",
      });
    }

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seed();
