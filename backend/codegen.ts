import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/graphql/typeDefs.ts",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../graphql/context.js#Context",
        useIndexSignature: true,
        useTypeImports: true,
        mappers: {
          Product: "../database/models.js#IProduct",
          Category: "../database/models.js#ICategory",
          User: "../database/models.js#IUser",
          Review: "../database/models.js#IReview",
          Order: "../database/models.js#IOrder",
        },
      },
    },
  },
};

export default config;
