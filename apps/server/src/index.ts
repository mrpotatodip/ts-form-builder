import { Hono } from "hono";

import auth from "./auth";
import ba_users from "./ ba-users";
import users from "./users";
import organizations from "./organizations";
import forms from "./forms";

const app = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    user: unknown | null;
    session: unknown | null;
  };
}>();

app.route("/", auth);
app.route("/", ba_users);
app.route("/", users);
app.route("/", organizations);
app.route("/", forms);

export default app;
