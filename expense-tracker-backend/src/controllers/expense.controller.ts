import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { AuthRequest } from "../middleware/auth.middleware";
import Expense from "../models/Expense";

export const createExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { amount, category, notes } = req.body;
    const taskId = uuidv4();

    if (!amount) {
      res.status(400).json({ error: "Amount is required!" });
    }

    const expense = await Expense.create({
      taskId,
      amount,
      category,
      notes,
      userId: req.user?.userId,
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: "Server Error", err });
  }
};

