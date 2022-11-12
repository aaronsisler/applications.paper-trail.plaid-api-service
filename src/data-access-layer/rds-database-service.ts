const { promisify } = require("util");

import mysql from "mysql2";

import { DATABASE_NAME } from "../config";

const config = {
  host: "localhost", // ip address of server running mysql
  user: "root", // user name to your mysql database
  password: "root_password", // corresponding password
  database: DATABASE_NAME, // use the specified database
};

class RdsDatabaseService {
  pool: mysql.Pool;
  connection: any;

  constructor() {
    this.pool = mysql.createPool(config);
    this.pool.getConnection((err: any, connection: any) => {
      if (err) throw err;
      console.log("Database connected successfully");
      connection.release();
    });
  }

  async beginTransaction() {
    try {
      const query = promisify(this.pool.query).bind(this.pool);
      await query("START TRANSACTION");
    } catch (error) {
      console.log(error);
      console.error("ERROR::RdsDatabaseService::beginTransaction");
      throw error;
    }
  }

  async commitTransaction() {
    try {
      const query = promisify(this.pool.query).bind(this.pool);
      await query("COMMIT");
    } catch (error) {
      console.log(error);
      console.error("ERROR::RdsDatabaseService::commitTransaction");
      throw error;
    }
  }

  async rollbackTransaction() {
    try {
      const query = promisify(this.pool.query).bind(this.pool);
      await query("ROLLBACK");
    } catch (error) {
      console.log(error);
      console.error("ERROR::RdsDatabaseService::rollbackTransaction");
      throw error;
    }
  }

  async executeSqlStatement(sqlStatement: string, values: any) {
    try {
      const query = promisify(this.pool.query).bind(this.pool);
      const result = await query(sqlStatement, [values]);

      return result;
    } catch (error) {
      console.log(error);
      console.error("ERROR::RdsDatabaseService::executeSqlStatement");
      throw error;
    }
  }
}

export { RdsDatabaseService };
