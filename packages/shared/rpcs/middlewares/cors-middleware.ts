import { cors } from "hono/cors";

export const createCorsMiddleware = () => {
  return cors({
    origin: ["http://localhost:3000", "https://app.betterform.xyz"], // ✅ Allow your frontend
    allowMethods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"], // ✅ Allow necessary methods
    allowHeaders: ["Content-Type", "Authorization", "Cookie", "hodle-api-key"], // ✅ Allow necessary headers
    credentials: true, // ✅ Allow cookies & credentials (if needed)
  });
};
