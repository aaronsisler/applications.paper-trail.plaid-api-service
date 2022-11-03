const util = require("util");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

import express, { Application, Request, Response } from "express";
import { TokenServiceDdb } from "./services/token-service-ddb";
import { TransactionService } from "./services/transaction-service";

console.log(`Your PROFILE is ${process.env.PROFILE}`); // undefined

if (process.env.PROFILE == "local") {
  dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
}

const app: Application = express();
app.use(cors());
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

const port: number = 3001;
const userId = "aaron-sisler";

// This will be stored somehow and somewhere per user/session
let ACCESS_TOKEN: any = null;
let ITEM_ID = null;

app.get("/hello", (_request: Request, response: Response) => {
  try {
    return response.send("Hello from DDB App!");
  } catch (error) {
    console.log(error);
    console.error("Try again from GET /hello");
  }
});

app.post("/link-token", async (_request, response) => {
  try {
    const createTokenResponse =
      await new TokenServiceDdb().createLinkTokenResponse();

    return response.json(createTokenResponse);
  } catch (error) {
    console.log(error);
    console.error("Try again from POST /link-token");
  }
});

app.post("/access-token", async (request, response) => {
  try {
    const tokenService = new TokenServiceDdb();
    const publicToken = request.body["x-public-token"];

    const { accessToken, itemId } = await tokenService.createAccessToken(
      publicToken
    );

    // Call the DDB service here instead
    tokenService.saveAccessToken(userId, itemId, accessToken);

    ACCESS_TOKEN = accessToken;

    response.json({
      message: "Tokens swapped and saved on server!",
    });
  } catch (error) {
    console.log(error);
    console.error("Try again from POST /access-token");
  }
});

app.get("/transactions", async (_request: Request, response: Response) => {
  try {
    // TODO untested
    const transactions = await new TransactionService().getAll(ACCESS_TOKEN);

    response.json(transactions);
  } catch (error) {
    console.log(error);
    console.error("Try again from GET /transactions");
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`);
});
