import { DATABASE_TABLE } from "../models/database-tables";

// Reads
export const SQL_ACCOUNT_TRANSACTION_READ = `SELECT * FROM ${DATABASE_TABLE.ACCOUNT_TRANSACTION} WHERE user_id = ?`;
export const SQL_INSTITUTION_READ = `SELECT * FROM ${DATABASE_TABLE.INSTITUTION} WHERE institution_id = ?`;
export const SQL_INSTITUTION_ACCOUNT_READ = `SELECT * FROM ${DATABASE_TABLE.INSTITUTION_ACCOUNT} WHERE institution_account_id = ?`;
export const SQL_RAW_MODIFIED_ACCOUNT_TRANSACTION_CREATE_SPROC = `CALL sp_Create_StagedAddedAccountTransactions (?)`;
export const SQL_USER_READ = `SELECT * FROM ${DATABASE_TABLE.USER} WHERE user_id = ?`;
export const SQL_USER_ACCESS_TOKEN_READ_ALL = `SELECT * FROM ${DATABASE_TABLE.USER_ACCESS_TOKEN} WHERE user_id = ?`;

// Creates

export const SQL_ACCOUNT_TRANSACTION_CREATE = `
INSERT INTO ${DATABASE_TABLE.ACCOUNT_TRANSACTION} 
() 
VALUES ?
`;

export const SQL_INSTITUTION_CREATE = `
  INSERT INTO ${DATABASE_TABLE.INSTITUTION} 
  (
    user_id,
    institution_identifier
  ) 
  VALUES ?
`;

export const SQL_INSTITUTION_ACCOUNT_CREATE = `
  INSERT INTO ${DATABASE_TABLE.INSTITUTION_ACCOUNT} 
  (
    institution_id,
    account_id,
    account_mask_last_four,
    account_name,
    account_official_name,
    account_type,
    account_subtype
  ) 
  VALUES ?
`;

export const SQL_RAW_ADDED_ACCOUNT_TRANSACTION_CREATE = `
  INSERT INTO ${DATABASE_TABLE.RAW_ADDED_ACCOUNT_TRANSACTION} 
  (
    user_id,
    transaction_id,
    account_id,
    amount,
    account_transaction_date,
    account_transaction_year,
    account_transaction_month,
    account_transaction_day,
    pending,
    merchant_name,
    merchant_name_detailed,
    category_id,
    category
  ) 
  VALUES ?
`;

export const SQL_RAW_MODIFIED_ACCOUNT_TRANSACTION_CREATE = `
  INSERT INTO ${DATABASE_TABLE.RAW_MODIFIED_ACCOUNT_TRANSACTION} 
  (
    user_id,
    transaction_id,
    account_id,
    amount,
    account_transaction_date,
    account_transaction_year,
    account_transaction_month,
    account_transaction_day,
    pending,
    merchant_name,
    merchant_name_detailed,
    category_id,
    category
  ) 
  VALUES ?
`;

export const SQL_RAW_REMOVED_ACCOUNT_TRANSACTION_CREATE = `
  INSERT INTO ${DATABASE_TABLE.RAW_REMOVED_ACCOUNT_TRANSACTION} 
  (
    user_id,
    transaction_id
  ) 
  VALUES ?
`;

export const SQL_RAW_ACCOUNT_TRANSACTION_CATEGORY_CREATE = `
  INSERT INTO ${DATABASE_TABLE.RAW_ACCOUNT_TRANSACTION_CATEGORY} 
  (
    raw_account_transaction_id,
    category
  ) 
  VALUES ?
`;

export const SQL_USER_CREATE = `
  INSERT INTO ${DATABASE_TABLE.USER} 
  (
    principal_id,
    last_name,
    first_name
  ) 
  VALUES ?
`;

export const SQL_USER_ACCESS_TOKEN_CREATE = `
  INSERT INTO ${DATABASE_TABLE.USER_ACCESS_TOKEN} 
  (
    user_id,
    institution_id,
    access_token
  ) 
  VALUES ?
`;

// Updates
export const SQL_USER_ACCESS_TOKEN_UPDATE = `
  UPDATE ${DATABASE_TABLE.USER_ACCESS_TOKEN} 
  SET UPDATE_KEY_PLACEHOLDER = ? 
  WHERE user_access_token_id = ?
`;
