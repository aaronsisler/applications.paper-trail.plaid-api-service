USE PAPER_TRAIL_RECORD_DATA_LOCAL;

DROP TABLE IF EXISTS USER;

DROP TABLE IF EXISTS USER_ACCESS_TOKEN;

DROP TABLE IF EXISTS ACCOUNT_TRANSACTION;

DROP TABLE IF EXISTS ACCOUNT_TRANSACTION_CATEGORY;

CREATE TABLE USER (
    user_id int NOT NULL AUTO_INCREMENT,
    principal_id varchar(255) NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE USER_ACCESS_TOKEN (
    user_access_token_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    item_id varchar(255) NOT NULL,
    access_token varchar(255) NOT NULL,
    last_cursor varchar(255),
    PRIMARY KEY (user_access_token_id),
    INDEX index_tbl_user_access_token_col_user_id (user_id),
    CONSTRAINT fk_tbl_user_access_token_to_user_col_user_id FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE
);

CREATE TABLE ACCOUNT_TRANSACTION (
    account_transaction_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    transaction_id varchar(255) NOT NULL,
    account_id varchar(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    account_transaction_date varchar(255) NOT NULL,
    account_transaction_datetime varchar(255),
    pending BOOLEAN NOT NULL DEFAULT false,
    merchant_name varchar(255) NOT NULL,
    merchant_name_detailed varchar(255),
    category_id varchar(255),
    PRIMARY KEY (account_transaction_id),
    CONSTRAINT fk_tbl_user_to_acct_trans_col_user_id FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE
);

CREATE TABLE ACCOUNT_TRANSACTION_CATEGORY (
    account_transaction_category_id int NOT NULL AUTO_INCREMENT,
    account_transaction_id int NOT NULL,
    category varchar(255) NOT NULL,
    PRIMARY KEY (account_transaction_category_id),
    CONSTRAINT fk_tbl_acct_trans_to_acct_trans_cat_col_acct_trans_cat_id FOREIGN KEY (account_transaction_id) REFERENCES ACCOUNT_TRANSACTION(account_transaction_id) ON DELETE CASCADE
);

CREATE TABLE STG_ACCOUNT_TRANSACTION (
    stg_account_transaction_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    transaction_id varchar(255) NOT NULL,
    account_id varchar(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    account_transaction_date varchar(255) NOT NULL,
    account_transaction_datetime varchar(255),
    pending BOOLEAN NOT NULL DEFAULT FALSE,
    merchant_name varchar(255) NOT NULL,
    merchant_name_detailed varchar(255),
    category_id varchar(255),
    is_added BOOLEAN NOT NULL DEFAULT TRUE,
    is_modified BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (stg_account_transaction_id)
);

CREATE TABLE STG_ACCOUNT_TRANSACTION_DELETED (
    stg_account_transaction_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    transaction_id varchar(255) NOT NULL,
    PRIMARY KEY (stg_account_transaction_id)
);

CREATE TABLE STG_ACCOUNT_TRANSACTION_CATEGORY (
    stg_account_transaction_category_id int NOT NULL AUTO_INCREMENT,
    stg_account_transaction_id int NOT NULL,
    category varchar(255) NOT NULL,
    PRIMARY KEY (stg_account_transaction_category_id)
);