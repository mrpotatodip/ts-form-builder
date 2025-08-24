// BETTER AUTH DB SCHEMA
import {
  user,
  account,
  session,
  verification,
} from "../better-auth/db-schema/tbl-ba";

import { tbl_party } from "./tbl-party";
import { tbl_user } from "./tbl-user";
import { tbl_organization } from "./tbl-organization";
import { tbl_form } from "./tbl-form";

export const DBTables = {
  user,
  account,
  session,
  verification,
  tbl_user,
  tbl_party,
  tbl_organization,
  tbl_form,
};
