// const util = require("util");
const { promisify } = require("util");
import { DATABASE_NAME } from "../config";
import { DATABASE_TABLE } from "../models/database-tables";
import mysql from "mysql2";

const config = {
  host: "localhost", // ip address of server running mysql
  user: "root", // user name to your mysql database
  password: "root_password", // corresponding password
  database: DATABASE_NAME, // use the specified database
};

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

      const query = promisify(this.pool.query).bind(this.pool);
      await query(
        `INSERT INTO ${DATABASE_TABLE.USERS} (UserId, ItemId, AccessToken) VALUES ?`,
        [records]
      );
    } catch (error) {
      console.log(error);
      console.error("Try again from RdsDatabaseService::create");
      throw error;
    }
  }

  async read(userId: string): Promise<any> {
    try {
      return { userId };
    } catch (error) {
      console.log(error);
      console.error("Try again from RdsDatabaseService::get");
    }
  }

  async readAll(): Promise<any> {
    try {
      return [{ userId: "aaron-sisler" }, { userId: "bridget-sisler" }];
    } catch (error) {
      console.log(error);
      console.error("Try again from RdsDatabaseService::getItems");
    }
  }
}

export { RdsDatabaseService };
