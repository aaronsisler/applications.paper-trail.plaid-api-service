import { RawRemovedAccountTransaction } from "../models/raw-removed-account-transaction";
import { Dao } from "./dao";
import { RdsDatabaseService } from "./rds-database-service";
import { SQL_RAW_REMOVED_ACCOUNT_TRANSACTION_CREATE } from "./sql-statements";

class RawRemovedAccountTransactionDao implements Dao {
  rdsDatabaseService: RdsDatabaseService;

  constructor() {
    this.rdsDatabaseService = new RdsDatabaseService();
  }

  async create(accountTransactions: RawRemovedAccountTransaction[]) {
    try {
      const values: any = [];

      accountTransactions.forEach(
        (accountTransaction: RawRemovedAccountTransaction) => {
          values.push([
            accountTransaction.userId,
            accountTransaction.transactionId,
          ]);
        }
      );

      await this.rdsDatabaseService.beginTransaction();
      const { insertId } = await this.rdsDatabaseService.executeSqlStatement(
        SQL_RAW_REMOVED_ACCOUNT_TRANSACTION_CREATE,
        values
      );
      await this.rdsDatabaseService.commitTransaction();

      return {};
    } catch (error) {
      await this.rdsDatabaseService.rollbackTransaction();
      console.error("ERROR::RawRemovedAccountTransactionDao::create");
      throw error;
    }
  }

  async read(userId: number) {
    try {
    } catch (error) {
      console.error("ERROR::RawRemovedAccountTransactionDao::read");
      throw error;
    }
  }

  async readAll(itemId: string) {
    try {
    } catch (error) {
      console.error("ERROR::RawRemovedAccountTransactionDao::readAll");
      throw error;
    }
  }

  async update() {
    try {
    } catch (error) {
      console.error("ERROR::RawRemovedAccountTransactionDao::update");
      throw error;
    }
  }

  async delete() {
    try {
    } catch (error) {
      console.error("ERROR::RawRemovedAccountTransactionDao::delete");
      throw error;
    }
  }
}

export { RawRemovedAccountTransactionDao };
