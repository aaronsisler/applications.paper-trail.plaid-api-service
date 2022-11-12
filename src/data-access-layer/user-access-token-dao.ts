import { UserAccessToken } from "../models/user-access-token";
import { Dao } from "./dao";
import { RdsDatabaseService } from "./rds-database-service";
import { SQL_USER_ACCESS_TOKENS_CREATE } from "./sql-statements";

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
      console.error("ERROR::UserDao::create");
      throw error;
    }
  }

  async read(userId: string) {}

  async readAll() {}

  async update() {}

  async delete() {}
}

export { UserAccessTokenDao };
