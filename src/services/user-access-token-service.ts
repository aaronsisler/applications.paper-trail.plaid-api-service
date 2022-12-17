import {
  PlaidApi,
  LinkTokenCreateResponse,
  AccountsGetResponse,
  AccountBase,
} from "plaid";

import { ConfigService } from "./config-service";
import { InstitutionDao } from "../data-access-layer/institution-dao";
import { UserAccessTokenDao } from "../data-access-layer/user-access-token-dao";
import { Institution } from "../models/institution";
import { InstitutionAccountCreation } from "../models/institution-account";
import { UserAccessTokenCreation } from "../models/user-access-token";
import { InstitutionAccountDao } from "../data-access-layer/institution-account-dao";
import {
  getMethodStartTime,
  methodProcessTime,
} from "../utils/method-process-time";

class UserAccessTokenService {
  client: PlaidApi;
  userAccessTokenDao: UserAccessTokenDao;
  institutionDao: InstitutionDao;
  institutionAccountDao: InstitutionAccountDao;

  constructor() {
    this.client = new PlaidApi(ConfigService.getClientConfig());
    this.userAccessTokenDao = new UserAccessTokenDao();
    this.institutionDao = new InstitutionDao();
    this.institutionAccountDao = new InstitutionAccountDao();
  }

  async save(userId: number, publicToken: string): Promise<void> {
    const time: Date = getMethodStartTime();
    try {
      // Use public token and swap for access token
      const { accessToken, itemId } = await this.fetchAccessToken(publicToken);

      // Use access token to fetch account information
      const accountsMetadata = await this.fetchAccountsMetadata(accessToken);

      // Save the itemId as institutionIdentifier in INSTITUTION
      // Get back the institution_id
      const institution: Institution = await this.institutionDao.create({
        userId,
        institutionIdentifier: itemId,
      });

      // Build the institution account(s)
      const institutionAccounts: InstitutionAccountCreation[] =
        this.parseAccountsMetadata(
          accountsMetadata.accounts,
          institution.institutionId
        );

      // Save the institution account(s)
      await this.institutionAccountDao.create(institutionAccounts);

      // Build the user access token (institution id, user id)
      const userAccessToken: UserAccessTokenCreation = {
        userId,
        institutionId: institution.institutionId,
        accessToken,
      };

      // Save the user access token
      await this.userAccessTokenDao.create(userAccessToken);

      console.info("SUCCESS::UserAccessTokenService::save");
    } catch (error) {
      console.error("ERROR::UserAccessTokenService::save");
      throw error;
    } finally {
      methodProcessTime("UserAccessTokenService::save", time);
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

  private async fetchAccountsMetadata(
    accessToken: string
  ): Promise<AccountsGetResponse> {
    const { data } = await this.client.accountsGet({
      access_token: accessToken,
    });

    return data;
  }

  private parseAccountsMetadata(
    accounts: AccountBase[],
    institutionId: number
  ): InstitutionAccountCreation[] {
    const institutionAccounts: InstitutionAccountCreation[] = [];

    accounts.forEach((account) => {
      institutionAccounts.push({
        institutionId,
        accountId: account.account_id,
        accountMaskLastFour: account.mask || "",
        accountName: account.name,
        accountOfficialName: account.official_name || "",
        accountType: account.type,
        accountSubtype: account.subtype || "",
      });
    });

    return institutionAccounts;
  }
}

export { UserAccessTokenService };
