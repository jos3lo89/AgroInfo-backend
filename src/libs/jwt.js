import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const crearToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};
