import { Dao } from "./dao";
import { RdsDatabaseService } from "./rds-database-service";
import { SQL_RAW_ADDED_ACCOUNT_TRANSACTION_CREATE } from "./sql-statements";
import { RawAddedAccountTransaction } from "../models/raw-added-account-transaction";

class RawAddedAccountTransactionDao implements Dao {
  rdsDatabaseService: RdsDatabaseService;

  constructor() {
    this.rdsDatabaseService = new RdsDatabaseService();
  }

  async create(rawAddedAccountTransactions: RawAddedAccountTransaction[]) {
    try {
      const values: any = [];

      rawAddedAccountTransactions.forEach(
        (rawAddedAccountTransaction: RawAddedAccountTransaction) => {
          values.push([
            rawAddedAccountTransaction.userId,
            rawAddedAccountTransaction.transactionId,
            rawAddedAccountTransaction.accountId,
            rawAddedAccountTransaction.amount,
            rawAddedAccountTransaction.accountTransactionDate,
            rawAddedAccountTransaction.accountTransactionYear,
            rawAddedAccountTransaction.accountTransactionMonth,
            rawAddedAccountTransaction.accountTransactionDay,
            rawAddedAccountTransaction.pending,
            rawAddedAccountTransaction.merchantName,
            rawAddedAccountTransaction.merchantNameDetailed,
            rawAddedAccountTransaction.categoryId,
            rawAddedAccountTransaction.category.join(","),
          ]);
        }
      );

      await this.rdsDatabaseService.beginTransaction();

      await this.rdsDatabaseService.executeSqlStatement(
        SQL_RAW_ADDED_ACCOUNT_TRANSACTION_CREATE,
        values
      );

      await this.rdsDatabaseService.commitTransaction();
    } catch (error) {
      await this.rdsDatabaseService.rollbackTransaction();
      console.error("ERROR::RawAddedAccountTransactionDao::create");
      throw error;
    }
  }

  async read(userId: number) {
    try {
    } catch (error) {
      console.error("ERROR::RawAddedAccountTransactionDao::read");
      throw error;
    }
  }

  async readAll(itemId: string) {
    try {
    } catch (error) {
      console.error("ERROR::RawAddedAccountTransactionDao::readAll");
      throw error;
    }
  }

  async update() {
    try {
    } catch (error) {
      console.error("ERROR::RawAddedAccountTransactionDao::update");
      throw error;
    }
  }

  async delete() {
    try {
    } catch (error) {
      console.error("ERROR::RawAddedAccountTransactionDao::delete");
      throw error;
    }
  }
}

export { RawAddedAccountTransactionDao };
