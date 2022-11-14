import {
  CreateUserAccessToken,
  UserAccessToken,
  userAccessTokenFactory,
} from "../models/user-access-token";
import { databaseUpdateSql } from "../utils/database-update-sql-util";
import { Dao } from "./dao";
import { RdsDatabaseService } from "./rds-database-service";
import {
  SQL_USER_ACCESS_TOKEN_CREATE,
  SQL_USER_ACCESS_TOKEN_READ_ALL,
  SQL_USER_ACCESS_TOKEN_UPDATE,
} from "./sql-statements";

class UserAccessTokenDao implements Dao {
  rdsDatabaseService: RdsDatabaseService;

  constructor() {
    this.rdsDatabaseService = new RdsDatabaseService();
  }

  async create(
    userAccessToken: CreateUserAccessToken
  ): Promise<UserAccessToken> {
    try {
      const values = [
        [
          userAccessToken?.userId,
          userAccessToken?.itemId,
          userAccessToken?.accessToken,
        ],
      ];

      await this.rdsDatabaseService.beginTransaction();
      const { insertId } = await this.rdsDatabaseService.executeSqlStatement(
        SQL_USER_ACCESS_TOKEN_CREATE,
        values
      );
      await this.rdsDatabaseService.commitTransaction();

      return { ...userAccessToken, userAuthTokenId: insertId };
    } catch (error) {
      await this.rdsDatabaseService.rollbackTransaction();
      console.error("ERROR::UserAccessTokenDao::create");
      throw error;
    }
  }

  async read(userId: string) {}

  async readAll(userId: number): Promise<UserAccessToken[]> {
    try {
      const values = [[userId]];

      const results = await this.rdsDatabaseService.executeSqlStatement(
        SQL_USER_ACCESS_TOKEN_READ_ALL,
        values
      );

      let userAccessTokens: UserAccessToken[] = [];

      results.forEach((result: any) => {
        userAccessTokens.push(userAccessTokenFactory(result));
      });

      return userAccessTokens;
    } catch (error) {
      console.error("ERROR::UserAccessTokenDao::readAll");
      throw error;
    }
  }

  async update(updateKey: string, updateValue: any, userAccessTokenId: number) {
    try {
      const updatedKeySql = databaseUpdateSql(
        SQL_USER_ACCESS_TOKEN_UPDATE,
        updateKey
      );
      const values = [updateValue, userAccessTokenId];

      await this.rdsDatabaseService.beginTransaction();

      await this.rdsDatabaseService.executeUpdateSqlStatement(
        updatedKeySql,
        values
      );

      await this.rdsDatabaseService.commitTransaction();
    } catch (error) {
      await this.rdsDatabaseService.rollbackTransaction();
      console.error("ERROR::UserAccessTokenDao::update");
      throw error;
    }
  }

  async delete() {}
}

export { UserAccessTokenDao };
