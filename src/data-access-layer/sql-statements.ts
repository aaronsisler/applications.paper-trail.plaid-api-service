import { DATABASE_TABLE } from "../models/database-tables";

export const SQL_USERS_INSERT = `INSERT INTO ${DATABASE_TABLE.USERS} 
(PrincipalId, FirstName, LastName) 
VALUES ?`;

export const SQL_USER_ACCESS_TOKENS_INSERT = `INSERT INTO ${DATABASE_TABLE.USER_ACCESS_TOKENS} 
(UserId, ItemId, AccessToken) 
VALUES ?`;
