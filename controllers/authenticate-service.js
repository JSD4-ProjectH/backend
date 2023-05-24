import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../db.config.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    if (token) {
      const decode = jwt.verify(token, JWT_SECRET_KEY);
      req.user = decode;
    } else {
      return res.json({
        status: 400,
        message: "access denied",
      });
    }
  } catch (err) {
    return res.json({
      status: 400,
      message: "access denied",
    });
  }
  next();
};
