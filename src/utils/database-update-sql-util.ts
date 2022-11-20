const databaseUpdateSql = (sqlStatement: string, updateKey: string) =>
  sqlStatement.replace("UPDATE_KEY_PLACEHOLDER", updateKey);

export { databaseUpdateSql };
