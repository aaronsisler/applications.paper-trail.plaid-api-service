import { StagedModifiedAccountTransaction } from "../models/staged-modified-account-transaction";
import { Dao } from "./dao";
import { RdsDatabaseService } from "./rds-database-service";
import { SQL_STG_MODIFIED_ACCOUNT_TRANSACTION_CREATE } from "./sql-statements";

class StagedModifiedAccountTransactionDao implements Dao {
  rdsDatabaseService: RdsDatabaseService;

  constructor() {
    this.rdsDatabaseService = new RdsDatabaseService();
  }

  async create(accountTransactions: StagedModifiedAccountTransaction[]) {
    try {
      const values: any = [];

      accountTransactions.forEach(
        (accountTransaction: StagedModifiedAccountTransaction) => {
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
        SQL_STG_MODIFIED_ACCOUNT_TRANSACTION_CREATE,
        values
      );
      await this.rdsDatabaseService.commitTransaction();

      return {};
    } catch (error) {
      await this.rdsDatabaseService.rollbackTransaction();
      console.error("ERROR::StagedModifiedAccountTransactionDao::create");
      throw error;
    }
  }

  async read(userId: number) {
    try {
    } catch (error) {
      console.error("ERROR::StagedModifiedAccountTransactionDao::read");
      throw error;
    }
  }

  async readAll(itemId: string) {
    try {
    } catch (error) {
      console.error("ERROR::StagedModifiedAccountTransactionDao::readAll");
      throw error;
    }
  }

  async update() {
    try {
    } catch (error) {
      console.error("ERROR::StagedModifiedAccountTransactionDao::update");
      throw error;
    }
  }

  async delete() {
    try {
    } catch (error) {
      console.error("ERROR::StagedModifiedAccountTransactionDao::delete");
      throw error;
    }
  }
}

export { StagedModifiedAccountTransactionDao };
