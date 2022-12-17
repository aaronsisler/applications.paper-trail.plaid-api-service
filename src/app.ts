const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

import express, { Application, Request, Response } from "express";

import { User } from "./models/user";
import { UserAccessToken } from "./models/user-access-token";
import { AccountTransactionBatchService } from "./services/account-transaction-batch-service";
import { AccountTransactionService } from "./services/account-transaction-service";
import { UserAccessTokenService } from "./services/user-access-token-service";
import { UserService } from "./services/user-service";

console.log(`Your PROFILE is ${process.env.PROFILE}`); // undefined

dotenv.config({
  path: path.resolve(__dirname, `../.env.${process.env.PROFILE}`),
});

const app: Application = express();
app.use(cors());
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

const port: number = 3001;

app.get("/hello", async (_request: Request, response: Response) => {
  try {
    return response.send("Hello from RDS App!");
  } catch (error) {
    console.log(error);
    console.error("ERROR::GET /hello");
  }
});

app.post(
  "/user",
  async (request: Request, response: Response): Promise<Response<User>> => {
    try {
      const result = await new UserService().save(request.body);

      return response.send(result);
    } catch (error) {
      console.log(error);
      console.error("ERROR::POST /user");
      return response.status(500).send(error);
    }
  }
);

app.get(
  "/user/:userId",
  async (request: Request, response: Response): Promise<Response<User>> => {
    try {
      const { userId } = request.params;
      const result = await new UserService().get(parseInt(userId));

      return response.send(result);
    } catch (error) {
      console.log(error);
      console.error("ERROR::GET /user/:userId");
      return response.status(500).send(error);
    }
  }
);

app.get(
  "/user/:userId/link-token",
  async (
    _request: Request,
    response: Response
  ): Promise<Response<UserAccessToken>> => {
    try {
      // TODO Verify that user exists using userId
      const result = await new UserAccessTokenService().fetchLinkToken();

      return response.send(result);
    } catch (error) {
      console.log(error);
      console.error("ERROR::POST /user/:userId/link-token");
      return response.status(500).send(error);
    }
  }
);

app.post(
  "/user/:userId/access-token",
  async (
    request: Request,
    response: Response
  ): Promise<Response<UserAccessToken>> => {
    try {
      // TODO Verify that user exists using userId
      const { userId } = request.params;
      const { publicToken } = request.body;
      const result = await new UserAccessTokenService().save(
        parseInt(userId),
        publicToken
      );

      return response.send(result);
    } catch (error) {
      console.log(error);
      console.error("ERROR::POST /user/:userId/access-token");
      return response.status(500).send(error);
    }
  }
);

app.post(
  "/user/:userId/transaction-batch",
  async (
    request: Request,
    response: Response
  ): Promise<Response<UserAccessToken>> => {
    try {
      // TODO Verify that user exists using userId
      const { userId } = request.params;
      await new AccountTransactionBatchService().fetchTransactions(
        parseInt(userId)
      );

      return response.send("Success");
    } catch (error) {
      console.log(error);
      console.error("ERROR::POST /user/:userId/transaction-batch");
      return response.status(500).send(error);
    }
  }
);

// Not implemented yet given batch work
// app.get(
//   "/user/:userId/transactions",
//   async (
//     request: Request,
//     response: Response
//   ): Promise<Response<UserAccessToken>> => {
//     try {
//       // TODO Verify that user exists using userId
//       const { userId } = request.params;
//       const result = await new AccountTransactionService().getAll(
//         parseInt(userId)
//       );

//       return response.send(result);
//     } catch (error) {
//       console.log(error);
//       console.error("ERROR::POST /user/:userId/transactions");
//       return response.status(500).send(error);
//     }
//   }
// );

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`);
});
