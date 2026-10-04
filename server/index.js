import express from "express";
import dotenv from "dotenv";
import { appRouter } from "./src/app.router.js";
import { connectDB } from "./DB/connection.js";
import { connectRedis } from "./DB/redis.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;
connectDB();

connectRedis().catch((error) => {
  console.error("Redis connection failed:", error.message);
});

appRouter(app, express);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});