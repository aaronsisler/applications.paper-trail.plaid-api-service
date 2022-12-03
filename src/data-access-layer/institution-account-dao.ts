import {
  InstitutionAccount,
  institutionAccountFactory,
} from "../models/institution-account";

import { Dao } from "./dao";
import { RdsDatabaseService } from "./rds-database-service";
import {
  SQL_INSTITUTION_ACCOUNT_CREATE,
  SQL_INSTITUTION_ACCOUNT_READ,
} from "./sql-statements";

class InstitutionAccountDao implements Dao {
  rdsDatabaseService: RdsDatabaseService;

  constructor() {
    this.rdsDatabaseService = new RdsDatabaseService();
  }

  async create(
    institutionAccount: InstitutionAccount
  ): Promise<InstitutionAccount> {
    try {
      const values = [
        [
          institutionAccount?.institutionId,
          institutionAccount?.accountId,
          institutionAccount?.itemId,
          institutionAccount?.accountMaskLastFour,
          institutionAccount?.accountName,
          institutionAccount?.accountOfficialName,
          institutionAccount?.accountType,
          institutionAccount?.accountSubtype,
        ],
      ];

      await this.rdsDatabaseService.beginTransaction();
      const { insertId } = await this.rdsDatabaseService.executeSqlStatement(
        SQL_INSTITUTION_ACCOUNT_CREATE,
        values
      );
      await this.rdsDatabaseService.commitTransaction();

      return { ...institutionAccount, institutionId: insertId };
    } catch (error) {
      await this.rdsDatabaseService.rollbackTransaction();
      console.error("ERROR::InstitutionAccountDao::create");
      throw error;
    }
  }

  async read(institutionId: number): Promise<InstitutionAccount> {
    try {
      const values = [institutionId];

      const [result] = await this.rdsDatabaseService.executeSqlStatement(
        SQL_INSTITUTION_ACCOUNT_READ,
        values
      );

      return institutionAccountFactory(result);
    } catch (error) {
      console.error("ERROR::InstitutionAccountDao::read");
      throw error;
    }
  }

  async readAll() {}

  async update() {}

  async delete() {}
}

export { InstitutionAccountDao };
