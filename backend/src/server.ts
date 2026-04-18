import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers/index.js";
import * as db from "./data.js";

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 },
    context: async () => ({
      db,
    }),
  });
  console.log(`Server ready at ${url}`);
}

startServer().catch((error) => {
  console.error(error);
});
