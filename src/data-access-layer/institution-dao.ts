import { Institution, institutionFactory } from "../models/institution";

import { Dao } from "./dao";
import { RdsDatabaseService } from "./rds-database-service";
import { SQL_INSTITUTION_CREATE, SQL_INSTITUTION_READ } from "./sql-statements";

class InstitutionDao implements Dao {
  rdsDatabaseService: RdsDatabaseService;

  constructor() {
    this.rdsDatabaseService = new RdsDatabaseService();
  }

  async create(institution: Institution): Promise<Institution> {
    try {
      const values = [
        [institution?.institutionId, institution?.userId, institution?.itemId],
      ];

      await this.rdsDatabaseService.beginTransaction();
      const { insertId } = await this.rdsDatabaseService.executeSqlStatement(
        SQL_INSTITUTION_CREATE,
        values
      );
      await this.rdsDatabaseService.commitTransaction();

      return { ...institution, institutionId: insertId };
    } catch (error) {
      await this.rdsDatabaseService.rollbackTransaction();
      console.error("ERROR::InstitutionDao::create");
      throw error;
    }
  }

  async read(institutionId: number): Promise<Institution> {
    try {
      const values = [institutionId];

      const [result] = await this.rdsDatabaseService.executeSqlStatement(
        SQL_INSTITUTION_READ,
        values
      );

      return institutionFactory(result);
    } catch (error) {
      console.error("ERROR::InstitutionDao::read");
      throw error;
    }
  }

  async readAll() {}

  async update() {}

  async delete() {}
}

export { InstitutionDao };
