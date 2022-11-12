import { PlaidApi, LinkTokenCreateResponse, Configuration } from "plaid";
import { prettyPrintResponse } from "../utils/pretty-print-response";
import { ConfigService } from "./config-service";
import { UserAccessTokenDao } from "../data-access-layer/user-access-token-dao";
import { UserAccessToken } from "../models/user-access-token";

class UserAccessTokenService {
  client: PlaidApi;
  userAccessTokenDao: UserAccessTokenDao;

  constructor() {
    const clientConfig: Configuration = ConfigService.getClientConfig();

    this.client = new PlaidApi(clientConfig);
    this.userAccessTokenDao = new UserAccessTokenDao();
  }

  async getAccessTokens(userId: string) {}

  async create(userAccessToken: UserAccessToken) {
    try {
      return await this.userAccessTokenDao.create(userAccessToken);
    } catch (error) {
      console.error("Try again from UserService::create");
      throw error;
    }
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

export { UserAccessTokenService };
