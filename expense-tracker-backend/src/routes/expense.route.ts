import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import { createExpense } from "../controllers/expense.controller";
import { verifyToken } from "../middleware/auth.middleware";

router.post("/createExpense", verifyToken, createExpense);

export default router;
