import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const authValidar = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: ["token requerido"] });
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(401).json({ message: ["token  invalido"] });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: [error.message] });
  }
};
