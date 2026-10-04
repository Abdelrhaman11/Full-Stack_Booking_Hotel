import rateLimit from "express-rate-limit";

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 5,

  message: {
    success: false,
    message: "Too many registration attempts. Please try again later.",
  },
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,

  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

export const confirmEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});