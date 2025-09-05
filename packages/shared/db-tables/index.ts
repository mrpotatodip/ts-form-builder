// BETTER AUTH DB SCHEMA

import { user, account, session, verification } from "./auth-schema";
import { tbl_party } from "./tbl-party";
import { tbl_user } from "./tbl-user";
import { tbl_organization } from "./tbl-organization";
import {
  tbl_form,
  FormStatus,
  FormAccess,
  FormStatusEnum,
  FormAccessEnum,
} from "./tbl-form";
import { tbl_form_response } from "./tbl-form-response";

export const DBTables = {
  user,
  account,
  session,
  verification,
  tbl_user,
  tbl_party,
  tbl_organization,
  tbl_form,
  tbl_form_response,
};

export const DBTableVars = {
  FormStatus,
  FormStatusEnum,
  FormAccess,
  FormAccessEnum,
};
