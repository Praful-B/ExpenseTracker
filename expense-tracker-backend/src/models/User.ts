import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  userId: string;
  username?: string;
  email: string;
  password: string;
  taskId: string;
}

const UserSchema: Schema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  taskId: { type: String, ref: "Expense" },
});

export default mongoose.model<IUser>("User", UserSchema);
