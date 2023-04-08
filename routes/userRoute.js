import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (user) {
    return res.json({ message: "Username already exist" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({ username, password: hashedPassword });
  await newUser.save();

  res.json({ message: "Registration Successful!" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });

  if (!user) {
    return res.json({ message: "Wrong Username or Password " });
  }

  const userPassword = await bcrypt.compare(password, user.password);
  if (!userPassword) {
    return res.json({ message: "Wrong Username or Password" });
  }

  const token = jwt.sign({ id: user._id }, "Secret");

  res.json({ token, userId: user._id });
});

export { router as userRoute };
