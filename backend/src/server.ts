import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers/index.js";
import { connectDB } from "./database/connection.js";
import * as models from "./database/models.js";
import { createLoaders } from "./utils/loaders.js";
import { logger } from "./utils/logger.js";
import { config } from "./config.js";

async function startServer() {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: config.PORT },
    context: async () => ({
      models,
      loaders: createLoaders(),
    }),
  });

  logger.info(`Server ready at ${url}`);
}

startServer().catch((error) => {
  logger.error(error, "Server failed to start");
});
