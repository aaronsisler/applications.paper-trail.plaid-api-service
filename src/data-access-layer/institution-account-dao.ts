import {
  InstitutionAccount,
  InstitutionAccountCreation,
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
    institutionAccounts: InstitutionAccountCreation[]
  ): Promise<void> {
    try {
      const values: any = [];

      institutionAccounts.forEach(
        (institutionAccount: InstitutionAccountCreation) => {
          values.push([
            institutionAccount?.institutionId,
            institutionAccount?.accountId,
            institutionAccount?.accountMaskLastFour,
            institutionAccount?.accountName,
            institutionAccount?.accountOfficialName,
            institutionAccount?.accountType,
            institutionAccount?.accountSubtype,
          ]);
        }
      );

      await this.rdsDatabaseService.beginTransaction();

      await this.rdsDatabaseService.executeSqlStatement(
        SQL_INSTITUTION_ACCOUNT_CREATE,
        values
      );

      await this.rdsDatabaseService.commitTransaction();
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
