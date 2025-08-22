import { Hono } from "hono";

import { createUsersRPC } from "shared";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.route("/", createUsersRPC());

export default app;
