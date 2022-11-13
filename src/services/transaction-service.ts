import { Configuration, PlaidApi } from "plaid";

import { ConfigService } from "./config-service";
import { UserAccessTokenDao } from "../data-access-layer/user-access-token-dao";
import { UserAccessToken } from "../models/user-access-token";
import { TransactionDao } from "../data-access-layer/account-transaction-dao";

class TransactionService {
  client: PlaidApi;
  transactionDao: TransactionDao;
  userAccessTokenDao: UserAccessTokenDao;

  constructor() {
    const clientConfig: Configuration = ConfigService.getClientConfig();

    this.transactionDao = new TransactionDao();
    this.userAccessTokenDao = new UserAccessTokenDao();
    this.client = new PlaidApi(clientConfig);
  }

  async getAll(userId: number) {
    try {
      let transactions: any[] = [];

      return transactions;
    } catch (error) {
      console.log(error);
      console.error("ERROR::TransactionService::getAll");
    }
  }
}

export { TransactionService };
