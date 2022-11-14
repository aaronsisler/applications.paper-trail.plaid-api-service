const databaseUpdateSql = (sqlStatement: string, updateKey: string) =>
  sqlStatement.replace("UPDATE_KEY", updateKey);

export { databaseUpdateSql };
