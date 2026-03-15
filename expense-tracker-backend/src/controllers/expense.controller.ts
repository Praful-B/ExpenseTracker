import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { AuthRequest } from "../middleware/auth.middleware";
import Expense from "../models/Expense";

export const createExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { amount, category, notes } = req.body;
    // const taskId = uuidv4();

    if (!amount) {
      res.status(400).json({ error: "Amount is required!" });
    }

    const expense = await Expense.create({
      // taskId,
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

export const queryAllExpense = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const expenses = await Expense.find({ userId: userId }).sort({ date: -1 });

    res.status(200).json({ expenses });
  } catch (err) {
    res.status(500).json({ error: "Server Error", err });
  }
};
export const deleteExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);

    if (!expense) {
      res.status(404).json({ error: "Expense not found" });
      return;
    }

    if (expense.userId.toString() !== req.user?.userId) {
      res.status(403).json({ error: "Unauthorized: This is not your expense" });
      return;
    }

    await Expense.findByIdAndDelete(id);

    res.status(200).json({ message: "Expense deleted", expense });
  } catch (err) {
    res.status(500).json({ error: "Server Error", err });
  }
};

export const updateExpense = async (req: AuthRequest, res: Response) => {};
