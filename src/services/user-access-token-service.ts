import { PlaidApi, LinkTokenCreateResponse } from "plaid";

import { ConfigService } from "./config-service";
import { UserAccessTokenDao } from "../data-access-layer/user-access-token-dao";
import { UserAccessToken } from "../models/user-access-token";

class UserAccessTokenService {
  client: PlaidApi;
  userAccessTokenDao: UserAccessTokenDao;

  constructor() {
    this.client = new PlaidApi(ConfigService.getClientConfig());
    this.userAccessTokenDao = new UserAccessTokenDao();
  }

  async save(userId: number, publicToken: string): Promise<UserAccessToken> {
    try {
      const { accessToken, itemId } = await this.fetchAccessToken(publicToken);

      const userAccessToken: UserAccessToken =
        await this.userAccessTokenDao.create({
          userId,
          itemId,
          accessToken,
        });

      console.info("SUCCESS::UserService::save");

      return userAccessToken;
    } catch (error) {
      console.error("ERROR::UserService::save");
      throw error;
    }
  }

  async fetchLinkToken(): Promise<LinkTokenCreateResponse> {
    const createTokenResponse = await this.client.linkTokenCreate(
      ConfigService.getLinkTokenConfig()
    );

    return createTokenResponse.data;
  }

  private async fetchAccessToken(publicToken: string) {
    const tokenResponse = await this.client.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = tokenResponse?.data?.access_token;
    const itemId = tokenResponse?.data?.item_id;

    return { accessToken, itemId };
  }
}

export { UserAccessTokenService };
