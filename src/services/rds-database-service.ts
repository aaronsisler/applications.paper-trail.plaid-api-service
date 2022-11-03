const util = require("util");

import { DATABASE_NAME } from "../config";
import { DATABASE_TABLE } from "../models/database-tables";
import mysql from "mysql2";

// node native promisify

const config = {
  host: "localhost", // ip address of server running mysql
  user: "root", // user name to your mysql database
  password: "root_password", // corresponding password
  database: DATABASE_NAME, // use the specified database
};
// const con = mysql.createConnection(config);

class RdsDatabaseService {
  pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool(config);
    this.pool.getConnection((err: any, connection: any) => {
      if (err) throw err;
      console.log("Database connected successfully");
      connection.release();
    });
  }

  async create(userId: string, itemId: string, accessToken: string) {
    try {
      const records = [[userId, itemId, accessToken]];

      const query = util.promisify(this.pool.query).bind(this.pool);
      await query(
        `INSE1RT INTO ${DATABASE_TABLE.USERS} (UserId, ItemId, AccessToken) VALUES ?`,
        [records]
      );
    } catch (error) {
      console.log(error);
      console.error("Try again from RdsDatabaseService::create");
      throw error;
    }
  }

  async createOld(userId: string, itemId: string, accessToken: string) {
    try {
      this.pool.getConnection((err, connection) => {
        const records = [[userId, itemId, accessToken]];

        connection.query(
          `INSERT INTO ${DATABASE_TABLE.USERS} (UserId, ItemId, AccessToken) VALUES ?`,
          [records],
          (err: any, result: any, _fields: any) => {
            // if any error while executing above query, throw error
            if (err) {
              console.log("Error from query");
              throw err;
            }
            // if there is no error, you have the result
            console.log(result);
            connection.release();
          }
        );
      });
    } catch (error) {
      // console.log(error);
      console.error("Try again from RdsDatabaseService::create");
      throw error;
    }
  }

  async get(userId: string): Promise<any> {
    try {
      return { userId };
    } catch (error) {
      console.log(error);
      console.error("Try again from RdsDatabaseService::get");
    }
  }

  async getAll(): Promise<any> {
    try {
      return [{ userId: "aaron-sisler" }, { userId: "bridget-sisler" }];
    } catch (error) {
      console.log(error);
      console.error("Try again from RdsDatabaseService::getItems");
    }
  }
}

export { RdsDatabaseService };