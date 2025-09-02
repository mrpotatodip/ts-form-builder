import { betterAuth, Session, User } from "better-auth";
import { openAPI } from "better-auth/plugins";

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http"; // or "pg"
import { DBTables, Envs } from "../../";

const { user, account, session, verification } = DBTables;

export const authInit = (env: Envs) => {
  const db: NeonHttpDatabase = drizzle(env.DATABASE_URL);

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
    trustedOrigins: [env.CLIENT_URL],
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
    // plugins: [openAPI()],
  });
};
