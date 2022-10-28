const util = require("util");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

import express, { Application, Request, Response } from "express";
import {
  Configuration,
  CountryCode,
  PlaidApi,
  PlaidEnvironments,
  Products,
  RemovedTransaction,
  Transaction,
  TransactionsSyncResponse,
} from "plaid";

console.log(`Your PROFILE is ${process.env.PROFILE}`); // undefined

if (process.env.PROFILE == "local") {
  dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
}

const app: Application = express();
app.use(cors());
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

const port: number = 3001;
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || "sandbox";
console.log(`Your PLAID_ENV is ${process.env.PLAID_ENV}`); // undefined

const PLAID_PRODUCTS = [Products.Auth, Products.Transactions];
const PLAID_COUNTRY_CODES: CountryCode[] = [CountryCode.Us];

// This will be stored somehow and somewhere per user/session
let ACCESS_TOKEN: any = null;
let ITEM_ID = null;

const prettyPrintResponse = (response: any) => {
  console.log(util.inspect(response.data, { colors: true, depth: 4 }));
};

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
      "PLAID-SECRET": PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

const configs = {
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

const client = new PlaidApi(configuration);

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello!");
});

app.post("/link-token", async (_request, response) => {
  try {
    const createTokenResponse = await client.linkTokenCreate(configs);

    prettyPrintResponse(createTokenResponse);
    return response.json(createTokenResponse.data);
  } catch (err) {
    console.log(err);
    console.error("Try again from /link-token");
  }
});

app.post("/access-token", async (request, response) => {
  try {
    const PUBLIC_TOKEN = request.body["x-public-token"];

    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: PUBLIC_TOKEN,
    });

    prettyPrintResponse(tokenResponse);
    ACCESS_TOKEN = tokenResponse.data.access_token;
    ITEM_ID = tokenResponse.data.item_id;

    response.json({
      message: "Tokens swapped!",
    });
  } catch (err) {
    console.log(err);
    console.error("Try again from /access-token");
  }
});

app.get("/transactions", async (_request: Request, response: Response) => {
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
        access_token: ACCESS_TOKEN,
        cursor: cursor,
      };
      const plaidResponse: any = await client.transactionsSync(request);
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
    response.json({ transactions: recentlyAdded });
  } catch (err) {
    console.log(err);
    console.error("Try again from /transactions");
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`);
});
