import { Dao } from "./dao";
import { RdsDatabaseService } from "./rds-database-service";
import { SQL_RAW_ADDED_ACCOUNT_TRANSACTION_CREATE } from "./sql-statements";
import { RawAddedAccountTransaction } from "../models/raw-added-account-transaction";

class RawAddedAccountTransactionDao implements Dao {
  rdsDatabaseService: RdsDatabaseService;

  constructor() {
    this.rdsDatabaseService = new RdsDatabaseService();
  }

  async create(accountTransactions: RawAddedAccountTransaction[]) {
    try {
      const values: any = [];

      accountTransactions.forEach(
        (accountTransaction: RawAddedAccountTransaction) => {
          values.push([
            accountTransaction.userId,
            accountTransaction.transactionId,
            accountTransaction.accountId,
            accountTransaction.amount,
            accountTransaction.accountTransactionDate,
            accountTransaction.accountTransactionYear,
            accountTransaction.accountTransactionMonth,
            accountTransaction.accountTransactionDay,
            accountTransaction.pending,
            accountTransaction.merchantName,
            accountTransaction.merchantNameDetailed,
            accountTransaction.categoryId,
            accountTransaction.category.join(","),
          ]);
        }
      );

      await this.rdsDatabaseService.beginTransaction();
      // const { insertId } =
      const response = await this.rdsDatabaseService.executeSqlStatement(
        SQL_RAW_ADDED_ACCOUNT_TRANSACTION_CREATE,
        values
      );

      console.log(response);

      await this.rdsDatabaseService.commitTransaction();

      return {};
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
