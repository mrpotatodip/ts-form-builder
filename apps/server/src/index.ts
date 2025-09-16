import { Hono } from "hono";

import auth from "./auth";
import ba_users from "./ ba-users";
import users from "./users";
import organizations from "./organizations";
import forms from "./forms";
import forms_response from "./forms-response";
import forms_public from "./forms-public";

const app = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    user: unknown | null;
    session: unknown | null;
    party_uuid: unknown | null;
  };
}>();

app.route("/", auth);
app.route("/", ba_users);
app.route("/", users);
app.route("/", organizations);
app.route("/", forms);
app.route("/", forms_response);
app.route("/", forms_public);

export default app;
