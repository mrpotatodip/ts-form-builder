import { Hono } from "hono";
import { betterAuth, Session, User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http"; // or "pg"
import { DBTables } from "shared";

const { user, account, session, verification } = DBTables;

export { Session, User };

export type Env = {
  DATABASE_URL: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  GITHUB_REDIRECT_URI: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URI: string;
  AUTH_TRUSTED_ORIGINS: string;
};

export const initAuth = (env: Env) => {
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
    cookiePrefix: "hodle",
    advanced: {
      defaultCookieAttributes: {
        domain: isLocalhost ? "" : ".hodle.xyz",
        path: "/",
        httpOnly: true,
        secure: isLocalhost ? true : true,
        sameSite: "Lax",
        partitioned: true,
      },
    },
  });
};

const app = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    user: unknown | null;
    session: unknown | null;
  };
}>();

app.use("/*", async (c, next) => {
  const auth = initAuth(c.env);
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.get("/session", async (c) => {
  try {
    const session = c.get("session") as Session;
    const user = c.get("user") as User | null;

    if (!user) {
      throw new Error("error: session is null");
    }

    return c.json({ data: { session, user }, error: null });
  } catch (error) {
    return c.json({ data: null, error: JSON.stringify(error) });
  }
});

app.on(["POST", "GET"], "/api/*", async (c) => {
  return await initAuth(c.env).handler(c.req.raw);
});

export default app;
