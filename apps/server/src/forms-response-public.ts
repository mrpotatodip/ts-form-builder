import { Hono } from "hono";

import { createFormsResponsePublicRPC } from "shared";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.route("/", createFormsResponsePublicRPC());

export default app;
