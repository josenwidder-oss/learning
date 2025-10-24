import bcryptjs from "bcryptjs";
import prisma from "../config/db.js";
import { validationResult } from "express-validator";
import { signToken } from "../services/jwt.js";
import config from "../config/env.js";

const NODE_ENV = config.NODE_ENV;

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;
  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists)
      return res.status(400).json({ message: "El usuario ya existe" });

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = signToken({ userId: user.id });
    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Credenciales inválidas" });

    const valid = await bcryptjs.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ message: "Credenciales inválidas" });

    const token = signToken({ userId: user.id });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Sesión cerrada" });
};
