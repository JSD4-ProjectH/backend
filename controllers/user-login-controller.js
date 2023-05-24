import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../db.config.js";

export const login = async (req, res) => {
  const email = req.body.email.toLowerCase().trim();
  const password = req.body.password.trim();
  const userDetails = await User.findOne({ email });
  if (!userDetails) {
    return res.json({
      status: 400,
      message: "email or password is incorrect",
    });
  } else if (!bcrypt.compareSync(password, userDetails.password)) {
    return res.json({
      status: 400,
      message: "email or password is incorrect",
    });
  }
  const token = jwt.sign({ user_id: userDetails._id, email }, JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
  return res.status(200).json({
    status: 200,
    message: token,
  });
};
