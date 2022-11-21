USE PAPER_TRAIL_RECORD_DATA_LOCAL;

DROP TABLE IF EXISTS USER_ACCESS_TOKEN;

DROP TABLE IF EXISTS ACCOUNT_TRANSACTION_CATEGORY;

DROP TABLE IF EXISTS ACCOUNT_TRANSACTION;

DROP TABLE IF EXISTS USER;

DROP TABLE IF EXISTS STG_ADDED_ACCOUNT_TRANSACTION;

DROP TABLE IF EXISTS STG_MODIFIED_ACCOUNT_TRANSACTION;

DROP TABLE IF EXISTS STG_REMOVED_ACCOUNT_TRANSACTION;

DROP TABLE IF EXISTS STG_ACCOUNT_TRANSACTION_CATEGORY;

CREATE TABLE USER (
    user_id INT NOT NULL AUTO_INCREMENT,
    principal_id VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE USER_ACCESS_TOKEN (
    user_access_token_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    item_id VARCHAR(255) NOT NULL,
    access_token VARCHAR(255) NOT NULL,
    last_cursor VARCHAR(255),
    PRIMARY KEY (user_access_token_id),
    INDEX index_tbl_user_access_token_col_user_id (user_id),
    CONSTRAINT fk_tbl_user_access_token_to_user_col_user_id FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE
);

CREATE TABLE ACCOUNT_TRANSACTION (
    account_transaction_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,
    account_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    account_transaction_date VARCHAR(255) NOT NULL,
    account_transaction_datetime VARCHAR(255),
    pending BOOLEAN NOT NULL DEFAULT false,
    merchant_name VARCHAR(255) NOT NULL,
    merchant_name_detailed VARCHAR(255),
    category_id VARCHAR(255),
    category VARCHAR(1000) NOT NULL,
    PRIMARY KEY (account_transaction_id),
    CONSTRAINT fk_tbl_user_to_acct_trans_col_user_id FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE
);

CREATE TABLE ACCOUNT_TRANSACTION_CATEGORY (
    account_transaction_category_id INT NOT NULL AUTO_INCREMENT,
    account_transaction_id INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    PRIMARY KEY (account_transaction_category_id),
    CONSTRAINT fk_tbl_acct_trans_to_acct_trans_cat_col_acct_trans_cat_id FOREIGN KEY (account_transaction_id) REFERENCES ACCOUNT_TRANSACTION(account_transaction_id) ON DELETE CASCADE
);

CREATE TABLE STG_ADDED_ACCOUNT_TRANSACTION (
    stg_added_account_transaction_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,
    account_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    account_transaction_date VARCHAR(255) NOT NULL,
    account_transaction_year INT NOT NULL,
    account_transaction_month INT NOT NULL,
    account_transaction_day INT NOT NULL,
    pending BOOLEAN NOT NULL DEFAULT FALSE,
    merchant_name VARCHAR(255) NOT NULL,
    merchant_name_detailed VARCHAR(255),
    category_id VARCHAR(255),
    category VARCHAR(1000),
    PRIMARY KEY (stg_added_account_transaction_id)
);

CREATE TABLE STG_MODIFIED_ACCOUNT_TRANSACTION (
    stg_modified_account_transaction_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,
    account_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    account_transaction_date VARCHAR(255) NOT NULL,
    account_transaction_year INT NOT NULL,
    account_transaction_month INT NOT NULL,
    account_transaction_day INT NOT NULL,
    pending BOOLEAN NOT NULL DEFAULT FALSE,
    merchant_name VARCHAR(255) NOT NULL,
    merchant_name_detailed VARCHAR(255),
    category_id VARCHAR(255),
    category VARCHAR(1000),
    PRIMARY KEY (stg_modified_account_transaction_id)
);

CREATE TABLE STG_REMOVED_ACCOUNT_TRANSACTION (
    stg_removed_account_transaction_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (stg_removed_account_transaction_id)
);

CREATE TABLE STG_ACCOUNT_TRANSACTION_CATEGORY (
    stg_account_transaction_category_id INT NOT NULL AUTO_INCREMENT,
    stg_account_transaction_id INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    PRIMARY KEY (stg_account_transaction_category_id)
);