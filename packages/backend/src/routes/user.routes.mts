import express from "express";
import usersModel from "../models/users.model.mts";
import { login } from "../services/user.service.mts";
import type { LoginResult } from "../../../shared/types/apiResults.mts";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await usersModel.getAllusers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch users. error: ${error}` });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
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

router.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required." });
  }
  if (await usersModel.getUserByEmail(email)) {
    return res
      .status(409)
      .json({ error: "A user with this email already exists." });
  }
  try {
    await usersModel.addUser({ name, email, password });
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ error: `Failed to create user. error: ${error}` });
  }
});

export default router;
