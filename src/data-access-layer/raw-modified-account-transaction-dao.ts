import { RawModifiedAccountTransaction } from "../models/raw-modified-account-transaction";
import { Dao } from "./dao";
import { RdsDatabaseService } from "./rds-database-service";
import { SQL_RAW_MODIFIED_ACCOUNT_TRANSACTION_CREATE } from "./sql-statements";

class RawModifiedAccountTransactionDao implements Dao {
  rdsDatabaseService: RdsDatabaseService;

  constructor() {
    this.rdsDatabaseService = new RdsDatabaseService();
  }

  async create(accountTransactions: RawModifiedAccountTransaction[]) {
    try {
      const values: any = [];

      accountTransactions.forEach(
        (accountTransaction: RawModifiedAccountTransaction) => {
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
      await this.rdsDatabaseService.executeSqlStatement(
        SQL_RAW_MODIFIED_ACCOUNT_TRANSACTION_CREATE,
        values
      );
      await this.rdsDatabaseService.commitTransaction();

      return {};
    } catch (error) {
      await this.rdsDatabaseService.rollbackTransaction();
      console.error("ERROR::RawModifiedAccountTransactionDao::create");
      throw error;
    }
  }

  async read(userId: number) {
    try {
    } catch (error) {
      console.error("ERROR::RawModifiedAccountTransactionDao::read");
      throw error;
    }
  }

  async readAll(itemId: string) {
    try {
    } catch (error) {
      console.error("ERROR::RawModifiedAccountTransactionDao::readAll");
      throw error;
    }
  }

  async update() {
    try {
    } catch (error) {
      console.error("ERROR::RawModifiedAccountTransactionDao::update");
      throw error;
    }
  }

  async delete() {
    try {
    } catch (error) {
      console.error("ERROR::RawModifiedAccountTransactionDao::delete");
      throw error;
    }
  }
}

export { RawModifiedAccountTransactionDao };
