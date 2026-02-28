import express from "express";
import usersModel from "../models/users.model.mts";
import { login } from "../services/user.service.mts";
import type { LoginResult } from "../../../shared/types/apiResults.mts";
import authorize from "../middleware/authorize.mts";
import type { Request, Response } from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await usersModel.getAllusers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: `Failed to fetch users. error: ${error}` });
  }
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }
  if (await usersModel.getUserByEmail(email)) {
    return res
      .status(409)
      .json({ message: "A user with this email already exists." });
  }
  try {
    await usersModel.addUser({ name, email, password });
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: `Failed to create user. error: ${error}` });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.info(`User loggin in: ${email}`);
  const user = await usersModel.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password." });
  }
  const { token } = await login(email, password);
  if (!token) {
    return res.status(403).json({ error: "Invalid email or password." });
  }
  const { _id, email: userEmail, name } = user;
  const loginData: LoginResult = {
    token,
    user: {
      _id,
      email: userEmail,
      name,
    },
  };
  return res.json(loginData);
});

// Protect a route with JWT authentication. Note the authorize middleware! Make sure to import it as well.
router.get("/protected", authorize, (req: Request, res: Response) => {
  console.info(res.locals.user);
  res.json({ message: `Hello, ${res.locals.user.email}!` });
});

export default router;
