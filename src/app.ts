import express, { Application, Request, Response } from "express";

const app: Application = express();

const port: number = 3001;

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello!");
});

app.get("/transactions", async (req: Request, res: Response) => {
  res.send("Hi there from transactions");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`);
});
