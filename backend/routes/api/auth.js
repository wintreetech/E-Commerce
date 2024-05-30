import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Models & utils

import User from "../../models/user.js";
import keys from "../../config/keys.js";

const { secret, tokenLife } = keys.jwt;

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    if (!name) {
      return res.status(400).json({ error: "You must enter your name." });
    }

    if (!email) {
      return res
        .status(400)
        .json({ error: "You must enter an email address." });
    }

    if (!password) {
      return res.status(400).json({ error: "You must enter a password." });
    }

    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json({ error: "That email address is already in use." });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedpassword,
      mobile,
    });

    const { password: generatedpassword, ...rest } = user._doc;

    if (user) {
      return res.status(200).json({
        success: true,
        error: false,
        data: rest,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "your request could not be processed please try again",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All field required for login" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "No user found for this email" });
    }

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      return res
        .status(400)
        .json({ error: "password incorrect", success: false });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

    if (user && ismatch) {
      res.status(200).json({
        success: true,
        error: false,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

export default router;
