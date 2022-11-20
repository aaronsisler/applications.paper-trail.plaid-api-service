import { Dao } from "./dao";
import { RdsDatabaseService } from "./rds-database-service";
import { SQL_STG_ADDED_ACCOUNT_TRANSACTION_CREATE } from "./sql-statements";
import { StagedAddedAccountTransaction } from "../models/staged-added-account-transaction";

class StagedAddedAccountTransactionDao implements Dao {
  rdsDatabaseService: RdsDatabaseService;

  constructor() {
    this.rdsDatabaseService = new RdsDatabaseService();
  }

  async create(accountTransactions: StagedAddedAccountTransaction[]) {
    try {
      const values: any = [];

      accountTransactions.forEach(
        (accountTransaction: StagedAddedAccountTransaction) => {
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
          ]);
        }
      );

      await this.rdsDatabaseService.beginTransaction();
      const { insertId } = await this.rdsDatabaseService.executeSqlStatement(
        SQL_STG_ADDED_ACCOUNT_TRANSACTION_CREATE,
        values
      );
      await this.rdsDatabaseService.commitTransaction();

      return {};
    } catch (error) {
      await this.rdsDatabaseService.rollbackTransaction();
      console.error("ERROR::StagedAddedAccountTransactionDao::create");
      throw error;
    }
  }

  async read(userId: number) {
    try {
    } catch (error) {
      console.error("ERROR::StagedAddedAccountTransactionDao::read");
      throw error;
    }
  }

  async readAll(itemId: string) {
    try {
    } catch (error) {
      console.error("ERROR::StagedAddedAccountTransactionDao::readAll");
      throw error;
    }
  }

  async update() {
    try {
    } catch (error) {
      console.error("ERROR::StagedAddedAccountTransactionDao::update");
      throw error;
    }
  }

  async delete() {
    try {
    } catch (error) {
      console.error("ERROR::StagedAddedAccountTransactionDao::delete");
      throw error;
    }
  }
}

export { StagedAddedAccountTransactionDao };
