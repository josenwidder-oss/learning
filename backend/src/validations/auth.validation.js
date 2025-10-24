import { body } from "express-validator";

export const registerValidation = [
  body("email").isEmail().withMessage("Email inválido"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("La contraseña debe tener al menos 4 caracteres"),
  body("name").notEmpty().withMessage("El nombre es requerido"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Email inválido"),
  body("password").notEmpty().withMessage("La contraseña es requerida"),
];
