import {
  PlaidApi,
  RemovedTransaction,
  Transaction,
  TransactionsSyncResponse,
} from "plaid";

import { ConfigService } from "./config-service";
import { TransactionDao } from "../data-access-layer/transaction-dao";
import { UserAccessTokenDao } from "../data-access-layer/user-access-token-dao";
import { UserAccessToken } from "../models/user-access-token";

class TransactionBatchService {
  client: PlaidApi;
  transactionDao: TransactionDao;
  userAccessTokenDao: UserAccessTokenDao;

  constructor() {
    this.client = new PlaidApi(ConfigService.getClientConfig());
    this.transactionDao = new TransactionDao();
    this.userAccessTokenDao = new UserAccessTokenDao();
  }

  async fetchTransactions(userId: number) {
    try {
      // Fetch all accessTokens per userId
      const userAccessTokens: UserAccessToken[] =
        await this.userAccessTokenDao.readAll(userId);
      // Iterate over accessTokens and get transactions
      console.log(userAccessTokens);
      userAccessTokens.map(async (userAccessToken) => {
        // await this.fecthAccountTransactions(userAccessToken.accessToken);
      });

      // Save Transactions
    } catch (error) {
      console.log(error);
      console.error("ERROR::AccountTransactionService::batch");
    }
  }

  private async fecthAccountTransactions(accessToken: string) {
    try {
      // Set cursor to empty to receive all historical updates
      let cursor = null;

      // New transaction updates since "cursor"
      let added: Transaction[] = [];
      let modified: Transaction[] = [];
      // Removed transaction ids
      let removed: RemovedTransaction[] = [];
      let hasMore = true;
      // Iterate through each page of new transaction updates for item
      while (hasMore) {
        const request: any = {
          access_token: accessToken,
          cursor: cursor,
        };
        const plaidResponse: any = await this.client.transactionsSync(request);
        const transactionsSyncResponse: TransactionsSyncResponse =
          plaidResponse?.data;

        // Add this page of results
        added = added.concat(transactionsSyncResponse.added);
        modified = modified.concat(transactionsSyncResponse.modified);
        removed = removed.concat(transactionsSyncResponse.removed);
        hasMore = transactionsSyncResponse.has_more;
        // Update cursor to the next cursor
        cursor = transactionsSyncResponse.next_cursor;
      }

      // Return 8 transactions
      const recentlyAdded = [...added].slice(-8);
      console.log(recentlyAdded);
      return { transactions: recentlyAdded };
    } catch (error) {
      console.log(error);
      console.error("ERROR::AccountTransactionService::getAll");
    }
  }
}

export { TransactionBatchService };
