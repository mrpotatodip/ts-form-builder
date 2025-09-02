import { authInit } from "../../lib/auth-init";

export const createAuthMiddleware = () => {
  return async (c: any, next: any) => {
    try {
      const auth = authInit(c.env);
      const session = await auth.api.getSession({ headers: c.req.raw.headers });

      if (!session) {
        c.set("user", null);
        c.set("session", null);
      } else {
        c.set("user", session.user);
        c.set("session", session.session);
      }

      return next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      c.set("user", null);
      c.set("session", null);
      return next();
    }
  };
};
