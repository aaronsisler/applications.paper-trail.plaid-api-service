import {
  PlaidApi,
  RemovedTransaction,
  Transaction,
  TransactionsSyncRequest,
  TransactionsSyncResponse,
} from "plaid";

import { ConfigService } from "./config-service";
import { UserAccessTokenDao } from "../data-access-layer/user-access-token-dao";
import { UserAccessToken } from "../models/user-access-token";
import { stagedAddedAccountTransactionFactory } from "../models/staged-added-account-transaction";
import { modifiedAccountTransactionFactory } from "../models/staged-modified-account-transaction";
import { stagedRemovedAccountTransactionFactory } from "../models/staged-removed-account-transaction";
import { StagedAddedAccountTransactionDao } from "../data-access-layer/staged-added-account-transaction-dao";
import { StagedModifiedAccountTransactionDao } from "../data-access-layer/staged-modified-account-transaction-dao";
import { StagedRemovedAccountTransactionDao } from "../data-access-layer/staged-removed-account-transaction-dao";

class AccountTransactionBatchService {
  client: PlaidApi;
  stagedAddedAccountTransactionDao: StagedAddedAccountTransactionDao;
  stagedModifiedAccountTransactionDao: StagedModifiedAccountTransactionDao;
  stagedRemovedAccountTransactionDao: StagedRemovedAccountTransactionDao;
  userAccessTokenDao: UserAccessTokenDao;

  constructor() {
    this.client = new PlaidApi(ConfigService.getClientConfig());
    this.stagedAddedAccountTransactionDao =
      new StagedAddedAccountTransactionDao();
    this.stagedModifiedAccountTransactionDao =
      new StagedModifiedAccountTransactionDao();
    this.stagedRemovedAccountTransactionDao =
      new StagedRemovedAccountTransactionDao();
    this.userAccessTokenDao = new UserAccessTokenDao();
  }

  async orchestrateTransactionBatch(userId: number) {
    // Get transactions loaded into staging table since last cursor
    // Migrate added transactions from staging table
    // Merge modified transactions to main table
    // Delete transactions from main table that are in deleted staging table
    // Clear staging tables
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
      console.error("ERROR::AccountTransactionBatchService::fetchTransactions");
    }
  }

  private async fetchAccountTransactions(userAccessToken: UserAccessToken) {
    try {
      // If cursor is empty, we will receive all historical updates
      // let cursor = userAccessToken.lastCursor;
      let cursor = userAccessToken.lastCursor || undefined;

      let hasMore = true;
      let whileLoopCounter = 1;
      let addedCounter = 0;
      let modifiedCounter = 0;
      let removedCounter = 0;
      // Iterate through each page of new transaction updates for item
      console.log(userAccessToken.itemId);
      console.log(cursor);
      while (hasMore) {
        const request: TransactionsSyncRequest = {
          access_token: userAccessToken.accessToken,
          cursor,
          count: 20,
        };
        const plaidResponse: any = await this.client.transactionsSync(request);
        const transactionsSyncResponse: TransactionsSyncResponse =
          plaidResponse?.data;

        // New transaction updates since "cursor"
        const added: Transaction[] = transactionsSyncResponse.added || [];
        const modified: Transaction[] = transactionsSyncResponse.modified || [];
        // Removed transaction ids
        const removed: RemovedTransaction[] =
          transactionsSyncResponse.removed || [];

        if (added.length > 0) {
          const transformedAdded = added.map((plaidTransaction) =>
            stagedAddedAccountTransactionFactory(
              plaidTransaction,
              userAccessToken.userId
            )
          );

          await this.stagedAddedAccountTransactionDao.create(transformedAdded);
          addedCounter = addedCounter + added.length;
        }

        if (modified.length > 0) {
          const transformedModified = added.map((plaidTransaction) =>
            modifiedAccountTransactionFactory(
              plaidTransaction,
              userAccessToken.userId
            )
          );

          await this.stagedModifiedAccountTransactionDao.create(
            transformedModified
          );

          modifiedCounter = modifiedCounter + modified.length;
        }

        if (removed.length > 0) {
          const transformedRemoved = added.map((plaidTransaction) =>
            stagedRemovedAccountTransactionFactory(
              plaidTransaction,
              userAccessToken.userId
            )
          );

          await this.stagedRemovedAccountTransactionDao.create(
            transformedRemoved
          );

          removedCounter = removedCounter + removed.length;
        }

        hasMore = transactionsSyncResponse.has_more;
        // Update cursor to the next cursor
        cursor = transactionsSyncResponse.next_cursor;
        whileLoopCounter++;
      }

      console.log(userAccessToken);

      await this.userAccessTokenDao.update(
        "last_cursor",
        cursor,
        userAccessToken.userAuthTokenId
      );

      console.log("addedCounter");
      console.log(addedCounter);
      console.log("modifiedCounter");
      console.log(modifiedCounter);
      console.log("removedCounter");
      console.log(removedCounter);
      console.log("whileLoopCounter");
      console.log(whileLoopCounter);
      console.log("cursor");
      console.log(cursor);
    } catch (error) {
      console.log(error);
      console.error(
        "ERROR::AccountTransactionBatchService::fetchAccountTransactions"
      );
    }
  }
}

export { AccountTransactionBatchService };
