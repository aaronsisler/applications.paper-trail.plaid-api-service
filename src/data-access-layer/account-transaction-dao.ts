import { AccountTransaction } from "../models/account-transaction";
import { Dao } from "./dao";
import { RdsDatabaseService } from "./rds-database-service";
import { SQL_ACCOUNT_TRANSACTION_CREATE } from "./sql-statements";

class AccountTransactionDao implements Dao {
  rdsDatabaseService: RdsDatabaseService;

  constructor() {
    this.rdsDatabaseService = new RdsDatabaseService();
  }

  async create(accountTransactions: AccountTransaction[]) {
    try {
    } catch (error) {
      console.error("ERROR::AccountTransactionDao::create");
      throw error;
    }
  }

  async read(userId: number) {
    try {
    } catch (error) {
      console.error("ERROR::AccountTransactionDao::read");
      throw error;
    }
  }

  async readAll(itemId: string) {
    try {
    } catch (error) {
      console.error("ERROR::AccountTransactionDao::readAll");
      throw error;
    }
  }

  async update() {
    try {
    } catch (error) {
      console.error("ERROR::AccountTransactionDao::update");
      throw error;
    }
  }

  async delete() {
    try {
    } catch (error) {
      console.error("ERROR::AccountTransactionDao::delete");
      throw error;
    }
  }
}

export { AccountTransactionDao };
