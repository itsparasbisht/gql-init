import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers/index.js";
import { connectDB } from "./db.js";
import * as models from "./models.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env.PORT || "5000");

async function startServer() {
  // Connect to Database
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async () => ({
      models,
    }),
  });

  console.log(`Server ready at ${url}`);
}

startServer().catch((error) => {
  console.error("Server error:", error);
});
