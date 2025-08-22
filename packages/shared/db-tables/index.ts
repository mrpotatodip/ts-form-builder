// BETTER AUTH DB SCHEMA
import {
  user,
  account,
  session,
  verification,
} from "../better-auth/db-schema/tbl-ba";

import { tbl_user } from "./tbl-user";
import { tbl_party } from "./tbl-party";
import { tbl_party_user } from "./tbl-party-user";
import { tbl_organization } from "./tbl-organization";

export const DBTables = {
  user,
  account,
  session,
  verification,
  tbl_user,
  tbl_party,
  tbl_party_user,
  tbl_organization,
};
