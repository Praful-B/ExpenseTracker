import { Router, Request, Response } from "express";
const router = Router();
import { createUser, loginUser } from "../controllers/user.controller";

router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
