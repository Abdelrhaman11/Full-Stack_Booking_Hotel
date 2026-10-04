import joi from "joi";
import { calcAge, regex } from "./user.service.js";

export const registerSchema = joi.object({
    name:joi.string().min(3).max(20).required(),
    email:joi.string().pattern(regex.emailRegex).required(),
    password:joi.string().pattern(regex.passwordRegex).required(),
    confirmPassword:joi.string().valid(joi.ref("password")).required(),
    dateOfBirth:joi.date().custom((value, helpers) => {
        if (calcAge(value) < 18) {
          return helpers.message("You must be at least 18 years old");
        }
        return value;
      }).required(),
    gender:joi.string().valid("male","female").required(),
    phone:joi.string().pattern(regex.phoneRegex).required()

}).required()

export const loginSchema = joi.object({
    email:joi.string().pattern(regex.emailRegex).required(),
    password:joi.string().pattern(regex.passwordRegex).required(),

}).required()