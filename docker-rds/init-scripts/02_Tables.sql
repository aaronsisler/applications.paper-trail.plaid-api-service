USE PAPER_TRAIL_RECORD_DATA_LOCAL;

DROP TABLE IF EXISTS USER;

DROP TABLE IF EXISTS USER_ACCESS_TOKEN;

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
    PRIMARY KEY (user_access_token_id),
    INDEX index_tbl_user_access_token_col_user_id (user_id),
    CONSTRAINT fk_tbl_user_access_token_to_user_col_user_id FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE
);