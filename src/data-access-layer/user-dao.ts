import { User, userFactory } from "../models/user";
import { Dao } from "./dao";
import { RdsDatabaseService } from "./rds-database-service";
import { SQL_USERS_CREATE, SQL_USERS_READ } from "./sql-statements";

class UserDao implements Dao {
  rdsDatabaseService: RdsDatabaseService;

  constructor() {
    this.rdsDatabaseService = new RdsDatabaseService();
  }

  async create(user: User): Promise<User> {
    try {
      const values = [[user?.principalId, user?.firstName, user?.lastName]];

      await this.rdsDatabaseService.beginTransaction();
      const { insertId } = await this.rdsDatabaseService.executeSqlStatement(
        SQL_USERS_CREATE,
        values
      );
      await this.rdsDatabaseService.commitTransaction();

      return { ...user, userId: insertId };
    } catch (error) {
      await this.rdsDatabaseService.rollbackTransaction();
      console.error("ERROR::UserDao::create");
      throw error;
    }
  }

  async read(userId: number): Promise<User> {
    try {
      const values = [userId];

      const [result] = await this.rdsDatabaseService.executeSqlStatement(
        SQL_USERS_READ,
        values
      );

      return userFactory(result);
    } catch (error) {
      console.error("ERROR::UserDao::read");
      throw error;
    }
  }

  async readAll() {}

  async update() {}

  async delete() {}
}

export { UserDao };
