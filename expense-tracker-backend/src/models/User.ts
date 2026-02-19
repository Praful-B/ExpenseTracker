import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  username?: string;
  email: string;
  password: string;
  taskId: string;
}

const UserSchema: Schema = new Schema<IUser>({
  username: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  taskId: { type: String, ref: "Expense" },
});

export default mongoose.model<IUser>("User", UserSchema);
