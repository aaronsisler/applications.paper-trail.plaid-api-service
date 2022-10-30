import { PlaidApi, LinkTokenCreateResponse, Configuration } from "plaid";
import { DatabaseType } from "../models/database-types";
import { databaseTypeBuilder } from "../utils/database-type-builder";
import { prettyPrintResponse } from "../utils/pretty-print-response";
import { ConfigService } from "./config-service";
import { DatabaseService } from "./database-service";

class TokenService {
  client: PlaidApi;
  databaseService: DatabaseService;

  constructor() {
    const clientConfig: Configuration = ConfigService.getClientConfig();

    this.client = new PlaidApi(clientConfig);
    this.databaseService = new DatabaseService();
  }

  async getAccessTokens(userId: string) {
    const accessTokens = await this.databaseService.getItems(
      databaseTypeBuilder(DatabaseType.USER, userId),
      DatabaseType.ITEM
    );

    console.log(accessTokens);
  }

  async saveAccessToken(userId: string, itemId: string, accessToken: string) {
    const userItem = {
      partitionKey: databaseTypeBuilder(DatabaseType.USER, userId),
      sortKey: databaseTypeBuilder(DatabaseType.ITEM, itemId),
      accessToken,
    };

    this.databaseService.create(userItem);
  }

  async createLinkTokenResponse(): Promise<LinkTokenCreateResponse> {
    const createTokenResponse = await this.client.linkTokenCreate(
      ConfigService.getLinkTokenConfig()
    );

    prettyPrintResponse(createTokenResponse);
    return createTokenResponse.data;
  }

  async createAccessToken(publicToken: string) {
    const tokenResponse = await this.client.itemPublicTokenExchange({
      public_token: publicToken,
    });

    prettyPrintResponse(tokenResponse);
    const accessToken = tokenResponse?.data?.access_token;
    const itemId = tokenResponse?.data?.item_id;

    return { accessToken, itemId };
  }
}

export { TokenService };
