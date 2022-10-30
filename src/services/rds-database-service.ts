// import { LOCAL_DDB_ENDPOINT, TABLE_NAME } from "../config";

class RdsDatabaseService {
  constructor() {}

  async create() {
    try {
    } catch (error) {
      console.log(error);
      console.error("Try again from RdsDatabaseService::create");
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
