import { Hono } from "hono";

import { createOrganizationsRPC } from "shared";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.route("/", createOrganizationsRPC());

export default app;
