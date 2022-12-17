import {
  Configuration,
  CountryCode,
  LinkTokenCreateRequest,
  PlaidEnvironments,
  Products,
} from "plaid";

class ConfigService {
  static getClientId() {
    return process.env.PLAID_CLIENT_ID;
  }
  static getClientSecret() {
    return process.env.PLAID_SECRET;
  }
  static getEnvironment() {
    return process.env.PLAID_ENV || "sandbox";
  }

  static getClientConfig(): Configuration {
    return new Configuration({
      basePath: PlaidEnvironments[this.getEnvironment()],
      baseOptions: {
        headers: {
          "PLAID-CLIENT-ID": this.getClientId(),
          "PLAID-SECRET": this.getClientSecret(),
          "Plaid-Version": "2020-09-14",
        },
      },
    });
  }

  static getLinkTokenConfig(): LinkTokenCreateRequest {
    const PLAID_PRODUCTS = [Products.Auth, Products.Transactions];
    const PLAID_COUNTRY_CODES: CountryCode[] = [CountryCode.Us];

    return {
      user: {
        // This should correspond to a unique id for the current user.
        client_user_id: "aaron-id",
      },
      client_name: "Paper Trail",
      products: PLAID_PRODUCTS,
      country_codes: PLAID_COUNTRY_CODES,
      language: "en",
      // redirect_uri: PLAID_REDIRECT_URI,
    };
  }
}

export { ConfigService };
