import { Router } from "express";
import { registerUser , confirmEmail , login, getProfileData } from "./user.controller.js";
import { isValid } from "../../Middleware/validation.middleware.js";
import { registerSchema , loginSchema } from "./user.validation.js";
import { isAuthenticated } from "../../Middleware/authentication.middleware.js";
import { confirmEmailLimiter, loginLimiter, registerLimiter } from "../../Middleware/rateLimit.middleware.js";


const router = Router();

router.post("/signup", registerLimiter , isValid(registerSchema , ["body"]), registerUser);

router.get("/confirmEmail/:activationCode", confirmEmailLimiter , confirmEmail);

router.post("/login" , loginLimiter , isValid(loginSchema , ["body"]) , login)

router.get("/profile" , isAuthenticated , getProfileData)





export default router