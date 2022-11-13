import {
  UserAccessToken,
  userAccessTokenFactory,
} from "../models/user-access-token";
import { Dao } from "./dao";
import { RdsDatabaseService } from "./rds-database-service";
import {
  SQL_USER_ACCESS_TOKENS_CREATE,
  SQL_USER_ACCESS_TOKENS_READ_ALL,
} from "./sql-statements";

class UserAccessTokenDao implements Dao {
  rdsDatabaseService: RdsDatabaseService;

  constructor() {
    this.rdsDatabaseService = new RdsDatabaseService();
  }

  async create(userAccessToken: UserAccessToken): Promise<UserAccessToken> {
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
        SQL_USER_ACCESS_TOKENS_CREATE,
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
        SQL_USER_ACCESS_TOKENS_READ_ALL,
        values
      );

      let userAccessTokens: UserAccessToken[] = [];

      results.forEach((result: any) => {
        userAccessTokens.push(userAccessTokenFactory(result));
      });
      console.log(userAccessTokens);

      return userAccessTokens;
    } catch (error) {
      console.error("ERROR::UserAccessTokenDao::readAll");
      throw error;
    }
  }

  async update() {}

  async delete() {}
}

export { UserAccessTokenDao };
