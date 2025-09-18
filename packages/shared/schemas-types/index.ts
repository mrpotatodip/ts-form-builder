// BETTER AUTH

export { UserSchema } from "./user";
export { SessionSchema } from "./session";

export type { User } from "./user";
export type { Session } from "./session";

// PARTY USER
export * from "./tbl-user";
export type * from "./tbl-user";

// ORGANIZATION
export * from "./tbl-organization";
export type * from "./tbl-organization";

// CORE
export * from "./builder-core";
export type * from "./builder-core";

// FORM
export * from "./tbl-form";
export type * from "./tbl-form";
export type * from "../db-tables/tbl-form";
export * from "./tbl-form-response";
export type * from "./tbl-form-response";
export type * from "../db-tables/tbl-form";
export * from "./tbl-form-public";
export type * from "./tbl-form-public";
export * from "./tbl-form-response-public";
export type * from "./tbl-form-response-public";

// MISC
export * from "./misc";

export type Envs = {
  DATABASE_URL: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  GITHUB_REDIRECT_URI: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URI: string;
  AUTH_TRUSTED_ORIGINS: string;
  BETTER_AUTH_SECRET: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  STRIPE_PRICE_PRO: string;
  STRIPE_PRICE_STARTER: string;
  STRIPE_SUCCESS_URL: string;
  STRIPE_FAIL_URL: string;
  CLIENT_URL: string;
};

export type AuthVariables = {
  user: unknown | null;
  session: unknown | null;
  party_uuid: string;
};
