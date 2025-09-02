import { betterAuth, Session, User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http"; // or "pg"
import { DBTables } from "../../";

const { user, account, session, verification } = DBTables;

type Env = {
  DATABASE_URL: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  GITHUB_REDIRECT_URI: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URI: string;
  AUTH_TRUSTED_ORIGINS: string;
};

export const authInit = (env: Env) => {
  const db: NeonHttpDatabase = drizzle(env.DATABASE_URL);
  const isLocalhost =
    env.AUTH_TRUSTED_ORIGINS === "http://localhost:3000" ? true : false;

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: {
        user,
        account,
        session,
        verification,
      },
    }),
    trustedOrigins: [env.AUTH_TRUSTED_ORIGINS],
    emailAndPassword: { enabled: true },
    socialProviders: {
      github: {
        clientId: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
        redirectURI: env.GITHUB_REDIRECT_URI,
      },
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        redirectURI: env.GOOGLE_REDIRECT_URI,
      },
    },
    baseURL: "http://localhost:8787",
    advanced: {
      defaultCookieAttributes: {
        httpOnly: false,
        sameSite: "none",
        secure: true,
        partitioned: true, // New browser standards will mandate this for foreign cookies
      },
    },
    // cookiePrefix: "hodle",
    advanced: {
      defaultCookieAttributes: {
        domain: isLocalhost ? "" : ".hodle.xyz",
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        // partitioned: false,
      },
    },
  });
};
