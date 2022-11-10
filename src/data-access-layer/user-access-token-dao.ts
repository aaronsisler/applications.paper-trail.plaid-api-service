import { PlaidApi, LinkTokenCreateResponse, Configuration } from "plaid";
import { DatabaseType } from "../models/database-types";
import { databaseTypeBuilder } from "../utils/database-type-builder";
import { prettyPrintResponse } from "../utils/pretty-print-response";
import { ConfigService } from "../services/config-service";
import { RdsDatabaseService } from "./rds-database-service";

class UserAccessTokenDao {
  // rdsDatabaseService: RdsDatabaseService;
  // constructor() {
  //   const clientConfig: Configuration = ConfigService.getClientConfig();
  //   this.rdsDatabaseService = new RdsDatabaseService();
  // }
  // async getAccessTokens(userId: string) {
  //   const accessTokens = await this.rdsDatabaseService.getItems(
  //     databaseTypeBuilder(DatabaseType.USER, userId),
  //     DatabaseType.ITEM
  //   );
  //   console.log(accessTokens);
  // }
  // async saveAccessToken(userId: string, itemId: string, accessToken: string) {
  //   const userItem = {
  //     partitionKey: databaseTypeBuilder(DatabaseType.USER, userId),
  //     sortKey: databaseTypeBuilder(DatabaseType.ITEM, itemId),
  //     accessToken,
  //   };
  //   this.dynamoDatabaseService.create(userItem);
  // }
  // async createLinkTokenResponse(): Promise<LinkTokenCreateResponse> {
  //   const createTokenResponse = await this.client.linkTokenCreate(
  //     ConfigService.getLinkTokenConfig()
  //   );
  //   prettyPrintResponse(createTokenResponse);
  //   return createTokenResponse.data;
  // }
  // async createAccessToken(publicToken: string) {
  //   const tokenResponse = await this.client.itemPublicTokenExchange({
  //     public_token: publicToken,
  //   });
  //   prettyPrintResponse(tokenResponse);
  //   const accessToken = tokenResponse?.data?.access_token;
  //   const itemId = tokenResponse?.data?.item_id;
  //   return { accessToken, itemId };
  // }
}

export { UserAccessTokenDao };
