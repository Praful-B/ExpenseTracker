import mongoose, { Schema, Document } from "mongoose";

interface IExpense extends Document {
  taskId: string;
  amount: number;
  category?: string;
  date?: Date;
  notes?: string;
  userId: string;
}

const ExpenseSchema: Schema = new Schema<IExpense>({
  taskId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  category: {
    type: String,
    enum: ["food", "social", "stationary", "travel", "util"],
  },
  date: { type: Date, default: Date.now },
  notes: { type: String },
  userId: { type: String, required: true, ref: "User" },
});

export default mongoose.model<IExpense>("Expense", ExpenseSchema);
