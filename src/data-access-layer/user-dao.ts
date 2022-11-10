import { User } from "../models/user";
import { Dao } from "./dao";
import { RdsDatabaseService } from "./rds-database-service";
import { SQL_USERS_INSERT } from "./sql-statements";

class UserDao implements Dao {
  rdsDatabaseService: RdsDatabaseService;

  constructor() {
    this.rdsDatabaseService = new RdsDatabaseService();
  }

  async get(userId: string) {}

  async getAll() {}

  async create(user: User) {
    try {
      const values = [[user?.principalId, user?.firstName, user?.lastName]];

      await this.rdsDatabaseService.beginTransaction();
      await this.rdsDatabaseService.executeSqlStatement(
        SQL_USERS_INSERT,
        values
      );
      await this.rdsDatabaseService.commitTransaction();
    } catch (error) {
      await this.rdsDatabaseService.rollbackTransaction();
      console.error("ERROR::UserDao::create");
      throw error;
    }
  }

  async update() {}

  async delete() {}
}

export { UserDao };
