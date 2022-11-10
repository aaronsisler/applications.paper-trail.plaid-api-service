import { PlaidApi, LinkTokenCreateResponse, Configuration } from "plaid";
import { prettyPrintResponse } from "../utils/pretty-print-response";
import { ConfigService } from "./config-service";
import { UserAccessTokenDao } from "../data-access-layer/user-access-token-dao";

class UserAccessTokenService {
  client: PlaidApi;
  userAccessTokenDao: UserAccessTokenDao = new UserAccessTokenDao();

  constructor() {
    const clientConfig: Configuration = ConfigService.getClientConfig();

    this.client = new PlaidApi(clientConfig);
  }

  async getAccessTokens(userId: string) {}

  async saveAccessToken(userId: string, itemId: string, accessToken: string) {}

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

export { UserAccessTokenService };
