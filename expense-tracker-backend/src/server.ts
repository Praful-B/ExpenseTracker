import dotenv from "dotenv";
dotenv.config();

import { Application, Request, Response } from "express";

import express from "express";

import connectDB from "../src/config/database";

import authRoutes from "../src/routes/authentication.route";
import expenseRoutes from "../src/routes/expense.route";

const app: Application = express();

app.use(express.json());

const PORT: number = Number(process.env.BACKEND_PORT) || 3000;

connectDB();

app.use("/auth", authRoutes);
app.use("/expense", expenseRoutes);

app.listen(PORT, (error?: Error): void => {
  if (!error) {
    console.log(`Running Backend server on: ${PORT}`);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
