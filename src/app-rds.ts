const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

import express, { Application, Request, Response } from "express";
import { RdsDatabaseService } from "./data-access-layer/rds-database-service";
import { User } from "./models/user";
import { UserAccessToken } from "./models/user-access-token";
import { UserAccessTokenService } from "./services/user-access-token-service";
import { UserService } from "./services/user-service";

console.log(`Your PROFILE is ${process.env.PROFILE}`); // undefined

if (process.env.PROFILE == "local") {
  dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
}

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

app.post(
  "/user/:userId/access-token",
  async (
    request: Request,
    response: Response
  ): Promise<Response<UserAccessToken>> => {
    try {
      const { userId } = request.params;
      const result = await new UserAccessTokenService().save({
        ...request.body,
        userId,
      });

      return response.send(result);
    } catch (error) {
      console.log(error);
      console.error("ERROR::POST /user/:userId/access-token");
      return response.status(500).send(error);
    }
  }
);

app.post("/access-token", async (request: Request, response: Response) => {
  try {
    const { accessToken, itemId, userId } = request.body;

    // await new RdsDatabaseService().oldCreate(userId, itemId, accessToken);

    return response.sendStatus(201);
  } catch (error) {
    // console.log(error);
    console.error("ERROR::POST /access-token");
    return response.status(500).send(error);
  }
});

app.get(
  "/access-token/:userId",
  async (request: Request, response: Response) => {
    try {
      const { userId } = request.params;
      // const result = await new RdsDatabaseService().get(userId);
      const result = {};

      return response.send(result);
    } catch (error) {
      console.log(error);
      console.error("ERROR::GET /access-token/:userId");
    }
  }
);

app.get("/access-token", async (_request: Request, response: Response) => {
  try {
    // const result = await new RdsDatabaseService().getAll();
    const result = {};
    return response.send(result);
  } catch (error) {
    console.log(error);
    console.error("ERROR::GET /access-token");
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`);
});
