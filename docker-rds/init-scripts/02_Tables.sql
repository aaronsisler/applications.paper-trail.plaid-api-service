USE PAPER_TRAIL_RECORD_DATA_LOCAL;

------------------------------
-- Foreign Key Constraints
------------------------------

DROP TABLE IF EXISTS USER_ACCESS_TOKEN;

DROP TABLE IF EXISTS ACCOUNT_TRANSACTION_CATEGORY;

DROP TABLE IF EXISTS INSTITUTION_ACCOUNT;

---------------------------------------------
-- Only USER(user_id) Foreign Key Constraint
---------------------------------------------
DROP TABLE IF EXISTS ACCOUNT_TRANSACTION;

DROP TABLE IF EXISTS INSTITUTION;

DROP TABLE IF EXISTS RAW_ADDED_ACCOUNT_TRANSACTION;

DROP TABLE IF EXISTS RAW_MODIFIED_ACCOUNT_TRANSACTION;

DROP TABLE IF EXISTS RAW_REMOVED_ACCOUNT_TRANSACTION;

DROP TABLE IF EXISTS RAW_ACCOUNT_TRANSACTION_CATEGORY;

------------------
-- Main tables
------------------

DROP TABLE IF EXISTS USER;

---------------
--  Tables
---------------

CREATE TABLE USER (
    user_id INT NOT NULL AUTO_INCREMENT,
    principal_id VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE INSTITUTION (
    institution_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    institution_identifier VARCHAR(100) NOT NULL,
    PRIMARY KEY (institution_id),
    -- Constraints
    CONSTRAINT fk_tbl_institution_to_user_col_user_id 
    FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE
);

CREATE TABLE INSTITUTION_ACCOUNT (
    institution_account_id INT NOT NULL AUTO_INCREMENT,
    institution_id INT NOT NULL,
    account_id VARCHAR(100) NOT NULL,
    account_mask_last_four VARCHAR(10),
    account_name VARCHAR(100) NOT NULL,
    account_official_name VARCHAR(100) NOT NULL,
    account_type VARCHAR(100) NOT NULL,
    account_subtype VARCHAR(100) NOT NULL,
    PRIMARY KEY (institution_account_id),
    -- Constraints
    CONSTRAINT fk_tbl_institution_to_instn_acct_col_institution_id 
    FOREIGN KEY (institution_id) REFERENCES INSTITUTION(institution_id) ON DELETE CASCADE
);

CREATE TABLE USER_ACCESS_TOKEN (
    user_access_token_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    institution_id INT NOT NULL,
    access_token VARCHAR(255) NOT NULL,
    last_cursor VARCHAR(255),
    PRIMARY KEY (user_access_token_id),
    INDEX index_tbl_user_access_token_col_user_id (user_id),
    -- Constraints
    CONSTRAINT fk_tbl_user_access_token_to_user_col_user_id 
    FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE,
    
    CONSTRAINT fk_tbl_user_access_token_to_instn_col_institution_id
    FOREIGN KEY (institution_id) REFERENCES INSTITUTION(institution_id) ON DELETE CASCADE
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
    -- Constraints
    CONSTRAINT fk_tbl_user_to_acct_trans_col_user_id 
    FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE
);

CREATE TABLE ACCOUNT_TRANSACTION_CATEGORY (
    account_transaction_category_id INT NOT NULL AUTO_INCREMENT,
    account_transaction_id INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    PRIMARY KEY (account_transaction_category_id),
    -- Constraints
    CONSTRAINT fk_tbl_acct_trans_to_acct_trans_cat_col_acct_trans_cat_id 
    FOREIGN KEY (account_transaction_id) REFERENCES ACCOUNT_TRANSACTION(account_transaction_id) ON DELETE CASCADE
);

CREATE TABLE RAW_ADDED_ACCOUNT_TRANSACTION (
    raw_added_account_transaction_id INT NOT NULL AUTO_INCREMENT,
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
    PRIMARY KEY (raw_added_account_transaction_id)
);

CREATE TABLE RAW_MODIFIED_ACCOUNT_TRANSACTION (
    raw_modified_account_transaction_id INT NOT NULL AUTO_INCREMENT,
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
    PRIMARY KEY (raw_modified_account_transaction_id)
);

CREATE TABLE RAW_REMOVED_ACCOUNT_TRANSACTION (
    raw_removed_account_transaction_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (raw_removed_account_transaction_id)
);

CREATE TABLE RAW_ACCOUNT_TRANSACTION_CATEGORY (
    raw_account_transaction_category_id INT NOT NULL AUTO_INCREMENT,
    raw_account_transaction_id INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    PRIMARY KEY (raw_account_transaction_category_id)
);