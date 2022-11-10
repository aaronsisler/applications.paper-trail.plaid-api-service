USE PAPER_TRAIL_RECORD_DATA_LOCAL;

DROP TABLE IF EXISTS USERS;

DROP TABLE IF EXISTS USER_AUTH_TOKENS;

CREATE TABLE USERS (
    UserId int NOT NULL AUTO_INCREMENT,
    PrincipalId varchar(255) NOT NULL,
    FirstName varchar(255) NOT NULL,
    LastName varchar(255) NOT NULL,
    PRIMARY KEY (UserId)
);

CREATE TABLE USER_AUTH_TOKENS (
    UserAuthTokenId int NOT NULL AUTO_INCREMENT,
    UserId int NOT NULL,
    ItemId varchar(255) NOT NULL,
    AccessToken varchar(255) NOT NULL,
    PRIMARY KEY (UserAuthTokenId),
    INDEX index_tbl_user_auth_tokens_col_userId (UserId),
    CONSTRAINT fk_tbl_user_auth_tokens_to_users_col_userId FOREIGN KEY (UserId) REFERENCES USERS(UserId) ON DELETE CASCADE
);