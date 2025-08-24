import { Hono } from "hono";

import { createUserssRPC } from "shared";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.route("/", createUserssRPC());

export default app;
