import type * as models from "./models.js";
import type { DataLoaders } from "./utils/loaders.js";

export interface Context {
  models: typeof models;
  loaders: DataLoaders;
}
