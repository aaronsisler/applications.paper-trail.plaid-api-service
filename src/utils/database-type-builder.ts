import { DatabaseType } from "../models/database-types";

const databaseTypeBuilder = (databaseType: DatabaseType, key: string) =>
  databaseType + ":" + key;

export { databaseTypeBuilder };
