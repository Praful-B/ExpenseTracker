import { Request, Response } from "express";
import bcrypt from "bcrypt";
const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
import User from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username) {
      console.log("Username is required!");
      res.status(400).json({ error: "Missing Data: Username is required" });
      return;
    } else if (!email) {
      console.log("Email is required!");
      res.status(400).json({ error: "Missing Data: Email is required" });
      return;
    } else if (!password) {
      console.log("Password is required!");
      res.status(400).json({ error: "Missing Data: Password is required" });
      return;
    }

    if (await User.findOne({ email })) {
      res.status(400).json({ error: "Duplication: Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User created", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid Credentials" });
      return;
    }

    res.status(200).json({ message: "Login Successfull" });
  } catch (err) {
    res.status(500).json({ error: "Server Error", err });
  }
};
