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
        await this.fetchAccountTransactions(userAccessToken);
      });

      // Save Transactions
    } catch (error) {
      console.log(error);
      console.error("ERROR::TransactionBatchService::batch");
    }
  }

  private async fetchAccountTransactions(userAccessToken: UserAccessToken) {
    try {
      // If cursor is empty, we will receive all historical updates
      // let cursor = userAccessToken.lastCursor;
      let cursor = "new-cursor";

      // New transaction updates since "cursor"
      let added: Transaction[] = [];
      let modified: Transaction[] = [];
      // Removed transaction ids
      let removed: RemovedTransaction[] = [];
      let hasMore = true;
      let counter = 1;
      // Iterate through each page of new transaction updates for item
      // while (hasMore) {
      //   const request: TransactionsSyncRequest = {
      //     access_token: userAccessToken.accessToken,
      //     cursor: cursor,
      //     count: 10,
      //   };
      //   const plaidResponse: any = await this.client.transactionsSync(request);
      //   const transactionsSyncResponse: TransactionsSyncResponse =
      //     plaidResponse?.data;

      //   // Add this page of results
      //   added = added.concat(transactionsSyncResponse.added);
      //   modified = modified.concat(transactionsSyncResponse.modified);
      //   removed = removed.concat(transactionsSyncResponse.removed);
      //   hasMore = transactionsSyncResponse.has_more;
      //   // Update cursor to the next cursor
      //   cursor = transactionsSyncResponse.next_cursor;
      //   counter++;
      // }

      console.log(userAccessToken);

      await this.userAccessTokenDao.update(
        "last_cursor",
        cursor,
        userAccessToken.userAuthTokenId
      );

      console.log("added");
      console.log(added.length);
      console.log("modified");
      console.log(modified.length);
      console.log("removed");
      console.log(removed.length);
      console.log("counter");
      console.log(counter);
      console.log("cursor");
      console.log(cursor);
    } catch (error) {
      console.log(error);
      console.error("ERROR::AccountTransactionService::getAll");
    }
  }
}

export { TransactionBatchService };
