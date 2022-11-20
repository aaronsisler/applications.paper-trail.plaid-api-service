import { StagedRemovedAccountTransaction } from "../models/staged-removed-account-transaction";
import { Dao } from "./dao";
import { RdsDatabaseService } from "./rds-database-service";
import { SQL_STG_REMOVED_ACCOUNT_TRANSACTION_CREATE } from "./sql-statements";

class StagedRemovedAccountTransactionDao implements Dao {
  rdsDatabaseService: RdsDatabaseService;

  constructor() {
    this.rdsDatabaseService = new RdsDatabaseService();
  }

  async create(accountTransactions: StagedRemovedAccountTransaction[]) {
    try {
      const values: any = [];

      accountTransactions.forEach(
        (accountTransaction: StagedRemovedAccountTransaction) => {
          values.push([
            accountTransaction.userId,
            accountTransaction.transactionId,
          ]);
        }
      );

      await this.rdsDatabaseService.beginTransaction();
      const { insertId } = await this.rdsDatabaseService.executeSqlStatement(
        SQL_STG_REMOVED_ACCOUNT_TRANSACTION_CREATE,
        values
      );
      await this.rdsDatabaseService.commitTransaction();

      return {};
    } catch (error) {
      await this.rdsDatabaseService.rollbackTransaction();
      console.error("ERROR::StagedRemovedAccountTransactionDao::create");
      throw error;
    }
  }

  async read(userId: number) {
    try {
    } catch (error) {
      console.error("ERROR::StagedRemovedAccountTransactionDao::read");
      throw error;
    }
  }

  async readAll(itemId: string) {
    try {
    } catch (error) {
      console.error("ERROR::StagedRemovedAccountTransactionDao::readAll");
      throw error;
    }
  }

  async update() {
    try {
    } catch (error) {
      console.error("ERROR::StagedRemovedAccountTransactionDao::update");
      throw error;
    }
  }

  async delete() {
    try {
    } catch (error) {
      console.error("ERROR::StagedRemovedAccountTransactionDao::delete");
      throw error;
    }
  }
}

export { StagedRemovedAccountTransactionDao };
