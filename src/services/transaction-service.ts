import { Configuration, PlaidApi } from "plaid";
import { ConfigService } from "./config-service";

class TransactionService {
  client: PlaidApi;

  constructor() {
    const clientConfig: Configuration = ConfigService.getClientConfig();

    this.client = new PlaidApi(clientConfig);
  }
  // TODO untested
  async getAll(userId: number) {
    try {
      // Fetch all accessTokens per userId
      // Iterate over accessTokens and get transactions
      // Return Transactions
    } catch (error) {
      console.log(error);
      console.error("ERROR::TransactionService::getAll");
    }
  }
}

export { TransactionService };
