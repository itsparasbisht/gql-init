import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/schema.ts",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../types.js#Context",
        useIndexSignature: true,
        useTypeImports: true,
        mappers: {
          Product: "../models.js#IProduct",
          Category: "../models.js#ICategory",
          User: "../models.js#IUser",
          Review: "../models.js#IReview",
          Order: "../models.js#IOrder",
        },
      },
    },
  },
};

export default config;
