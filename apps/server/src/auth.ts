import { Hono } from "hono";

import { createAuthRPC } from "shared";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.route("/", createAuthRPC());

export default app;
