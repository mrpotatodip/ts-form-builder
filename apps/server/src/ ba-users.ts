import { Hono } from "hono";

import { createBAUsersRPC } from "shared";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.route("/", createBAUsersRPC());

export default app;
