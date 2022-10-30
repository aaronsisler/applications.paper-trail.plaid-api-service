import {
  Configuration,
  PlaidApi,
  RemovedTransaction,
  Transaction,
  TransactionsSyncResponse,
} from "plaid";
import { ConfigService } from "./config-service";

class TransactionService {
  client: PlaidApi;

  constructor() {
    const clientConfig: Configuration = ConfigService.getClientConfig();

    this.client = new PlaidApi(clientConfig);
  }
  // TODO untested
  async getAll(accessToken: string) {
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
        // console.log("transactionsSyncResponse");
        // console.log(transactionsSyncResponse);
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
      return { transactions: recentlyAdded };
    } catch (error) {
      console.log(error);
      console.error("Try again from TransactionService::getAll");
    }
  }
}

export { TransactionService };
