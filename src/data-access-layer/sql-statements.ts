import { DATABASE_TABLE } from "../models/database-tables";

export const SQL_USERS_CREATE = `INSERT INTO ${DATABASE_TABLE.USERS} 
(PrincipalId, FirstName, LastName) 
VALUES ?`;

export const SQL_USERS_READ = `SELECT * FROM ${DATABASE_TABLE.USERS} 
WHERE UserId = ?`;

export const SQL_USER_ACCESS_TOKENS_CREATE = `INSERT INTO ${DATABASE_TABLE.USER_ACCESS_TOKENS} 
(UserId, ItemId, AccessToken) 
VALUES ?`;
