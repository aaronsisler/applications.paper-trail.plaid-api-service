import { DATABASE_TABLE } from "../models/database-tables";

export const SQL_ACCOUNT_TRANSACTION_CREATE = `INSERT INTO ${DATABASE_TABLE.ACCOUNT_TRANSACTION} 
() 
VALUES ?`;

export const SQL_ACCOUNT_TRANSACTION_READ = `SELECT * FROM ${DATABASE_TABLE.ACCOUNT_TRANSACTION} WHERE user_id = ?`;

export const SQL_STG_ACCOUNT_TRANSACTION_CREATE = `INSERT INTO ${DATABASE_TABLE.STG_ACCOUNT_TRANSACTION} 
(user_id, transaction_id, account_id, amount, account_transaction_date, account_transaction_datetime, pending, merchant_name, merchant_name_detailed, category_id, is_added, is_modified) 
VALUES ?`;

export const SQL_STG_ACCOUNT_TRANSACTION_CATEGORY_CREATE = `INSERT INTO ${DATABASE_TABLE.STG_ACCOUNT_TRANSACTION_CATEGORY} 
(stg_account_transaction_id, category) 
VALUES ?`;

export const SQL_STG_ACCOUNT_TRANSACTION_DELETED_CREATE = `INSERT INTO ${DATABASE_TABLE.STG_ACCOUNT_TRANSACTION_DELETED} 
(user_id, transaction_id) 
VALUES ?`;

export const SQL_USER_CREATE = `INSERT INTO ${DATABASE_TABLE.USER} 
(principal_id, first_name, last_name) 
VALUES ?`;

export const SQL_USER_READ = `SELECT * FROM ${DATABASE_TABLE.USER} WHERE user_id = ?`;

export const SQL_USER_ACCESS_TOKEN_CREATE = `INSERT INTO ${DATABASE_TABLE.USER_ACCESS_TOKEN} 
(user_id, item_id, access_token) 
VALUES ?`;

export const SQL_USER_ACCESS_TOKEN_UPDATE = `UPDATE ${DATABASE_TABLE.USER_ACCESS_TOKEN} 
SET UPDATE_KEY = ? 
WHERE user_access_token_id = ?`;

export const SQL_USER_ACCESS_TOKEN_READ_ALL = `SELECT * FROM ${DATABASE_TABLE.USER_ACCESS_TOKEN} WHERE user_id = ?`;
