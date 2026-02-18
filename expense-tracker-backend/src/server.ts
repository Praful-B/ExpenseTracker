import { Application, Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.BACKEND_PORT) || 3000;

app.get("/", (req: Request, res: Response): void => {
  res.status(200);
  res.send("Hello, World from Backend");
});

app.listen(PORT, (error?: Error): void => {
  if (!error) {
    console.log(`Running Backend server on: ${PORT}`);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
