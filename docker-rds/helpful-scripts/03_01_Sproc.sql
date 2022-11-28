DROP PROCEDURE IF EXISTS sp_Create_RawAddedAccountTransactions;

DELIMITER //

CREATE PROCEDURE sp_Create_RawAddedAccountTransactions(
  IN user_id INT,
  IN transaction_id VARCHAR(255),
  IN account_id VARCHAR(255),
  IN amount DECIMAL(10, 2),
  IN account_transaction_date VARCHAR(255),
  IN account_transaction_year INT,
  IN account_transaction_month INT,
  IN account_transaction_day INT,
  IN pending BOOLEAN,
  IN merchant_name VARCHAR(255),
  IN merchant_name_detailed VARCHAR(255),
  IN category_id VARCHAR(255),
  IN category VARCHAR(1000)
) BEGIN
INSERT INTO
  RAW_ADDED_ACCOUNT_TRANSACTION (
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
VALUES
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
  );

END //

DELIMITER ;