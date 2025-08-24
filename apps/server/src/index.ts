import { Hono } from "hono";
import { cors } from "hono/cors";

import auth from "./auth";
import ba_users from "./ ba-users";
import users from "./users";
import organizations from "./organizations";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "https://app.hodle.xyz"], // ✅ Allow your frontend
    allowMethods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"], // ✅ Allow necessary methods
    allowHeaders: ["Content-Type", "Authorization", "hodle-api-key"], // ✅ Allow necessary headers
    credentials: true, // ✅ Allow cookies & credentials (if needed)
  })
);

app.route("/auth/v1", auth);

// RPCs
app.route("/", ba_users);
app.route("/", users);
app.route("/", organizations);

export default app;
