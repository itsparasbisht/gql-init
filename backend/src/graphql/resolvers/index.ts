import { queries } from "./queries.js";
import { typeResolvers } from "./types.js";
import { mutations } from "./mutations.js";

export const resolvers = {
  Query: queries,
  ...typeResolvers,
  Mutation: mutations,
};
