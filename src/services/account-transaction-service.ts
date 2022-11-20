import { Configuration, PlaidApi } from "plaid";

import { ConfigService } from "./config-service";
import { UserAccessTokenDao } from "../data-access-layer/user-access-token-dao";
import { AccountTransactionDao } from "../data-access-layer/account-transaction-dao";

class AccountTransactionService {
  client: PlaidApi;
  accountTransactionDao: AccountTransactionDao;
  userAccessTokenDao: UserAccessTokenDao;

  constructor() {
    const clientConfig: Configuration = ConfigService.getClientConfig();

    this.accountTransactionDao = new AccountTransactionDao();
    this.userAccessTokenDao = new UserAccessTokenDao();
    this.client = new PlaidApi(clientConfig);
  }

  async getAll(userId: number) {
    try {
      let transactions: any[] = [];

      return transactions;
    } catch (error) {
      console.log(error);
      console.error("ERROR::AccountTransactionService::getAll");
    }
  }
}

export { AccountTransactionService };
