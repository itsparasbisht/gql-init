import type * as models from "../database/models.js";
import type { DataLoaders } from "../utils/loaders.js";

export interface IContext {
  models: typeof models;
  loaders: DataLoaders;
  user: models.IUser | null;
}
