import { DATABASE_TABLE } from "../models/database-tables";

export const SQL_TRANSACTIONS_CREATE = `INSERT INTO ${DATABASE_TABLE.TRANSACTIONS} 
() 
VALUES ?`;

export const SQL_TRANSACTIONS_READ = `SELECT * FROM ${DATABASE_TABLE.TRANSACTIONS} WHERE user_id = ?`;

export const SQL_USERS_CREATE = `INSERT INTO ${DATABASE_TABLE.USERS} 
(principal_id, first_name, last_name) 
VALUES ?`;

export const SQL_USERS_READ = `SELECT * FROM ${DATABASE_TABLE.USERS} WHERE user_id = ?`;

export const SQL_USER_ACCESS_TOKENS_CREATE = `INSERT INTO ${DATABASE_TABLE.USER_ACCESS_TOKENS} 
(user_id, item_id, access_token) 
VALUES ?`;

export const SQL_USER_ACCESS_TOKENS_READ_ALL = `SELECT * FROM ${DATABASE_TABLE.USER_ACCESS_TOKENS} WHERE user_id = ?`;
