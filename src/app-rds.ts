const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

import express, { Application, Request, Response } from "express";
import { RdsDatabaseService } from "./data-access-layer/rds-database-service";

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
    console.error("Try again from GET /hello");
  }
});

app.post("/access-token", async (request: Request, response: Response) => {
  try {
    const { accessToken, itemId, userId } = request.body;

    await new RdsDatabaseService().create(userId, itemId, accessToken);

    return response.sendStatus(201);
  } catch (error) {
    // console.log(error);
    console.error("Try again from POST /access-token");
    return response.status(500).send(error);
    // return response.er;
  }
});

app.get(
  "/access-token/:userId",
  async (request: Request, response: Response) => {
    try {
      const { userId } = request.params;
      const result = await new RdsDatabaseService().get(userId);

      return response.send(result);
    } catch (error) {
      console.log(error);
      console.error("Try again from POST /access-token");
    }
  }
);

app.get("/access-token", async (_request: Request, response: Response) => {
  try {
    const result = await new RdsDatabaseService().getAll();
    return response.send(result);
  } catch (error) {
    console.log(error);
    console.error("Try again from POST /access-token");
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`);
});
