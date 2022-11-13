import {
  PlaidApi,
  RemovedTransaction,
  Transaction,
  TransactionsSyncRequest,
  TransactionsSyncResponse,
} from "plaid";

import { ConfigService } from "./config-service";
import { AccountTransactionDao } from "../data-access-layer/account-transaction-dao";
import { UserAccessTokenDao } from "../data-access-layer/user-access-token-dao";
import { UserAccessToken } from "../models/user-access-token";

class TransactionBatchService {
  client: PlaidApi;
  accountTransactionDao: AccountTransactionDao;
  userAccessTokenDao: UserAccessTokenDao;

  constructor() {
    this.client = new PlaidApi(ConfigService.getClientConfig());
    this.accountTransactionDao = new AccountTransactionDao();
    this.userAccessTokenDao = new UserAccessTokenDao();
  }

  async orchestrateTransactionBatch(userId: number) {
    // Get added transactions
    // Get modified transactions
    // Get deleted transactions
    // Trigger DQ Checks
    // Migrate pristine transactions to main transactions table
  }

  async fetchTransactions(userId: number) {
    try {
      // Fetch all accessTokens per userId
      const userAccessTokens: UserAccessToken[] =
        await this.userAccessTokenDao.readAll(userId);
      // Iterate over accessTokens and get transactions
      userAccessTokens.map(async (userAccessToken) => {
        await this.fetchAccountTransactions(userAccessToken.accessToken);
      });

      // Save Transactions
    } catch (error) {
      console.log(error);
      console.error("ERROR::TransactionBatchService::batch");
    }
  }

  private async fetchAccountTransactions(accessToken: string) {
    try {
      // Set cursor to empty to receive all historical updates
      let cursor = undefined;

      // New transaction updates since "cursor"
      let added: Transaction[] = [];
      let modified: Transaction[] = [];
      // Removed transaction ids
      let removed: RemovedTransaction[] = [];
      let hasMore = true;
      // Iterate through each page of new transaction updates for item
      while (hasMore) {
        const request: TransactionsSyncRequest = {
          access_token: accessToken,
          cursor: cursor,
          count: 10,
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
