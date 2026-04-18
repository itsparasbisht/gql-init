import { queries } from "./queries.js";
import { typeResolvers } from "./types.js";

export const resolvers = {
  Query: queries,
  ...typeResolvers,
};
