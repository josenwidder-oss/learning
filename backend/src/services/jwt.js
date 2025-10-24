import jwt from "jsonwebtoken";
import config from "../config/env.js";

const JWT_SECRET = config.JWT_SECRET;

export function signToken(payload, options = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d", ...options });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
