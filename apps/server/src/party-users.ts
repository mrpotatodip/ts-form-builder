import { Hono } from "hono";

import { createPartyUserssRPC } from "shared";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.route("/", createPartyUserssRPC());

export default app;
