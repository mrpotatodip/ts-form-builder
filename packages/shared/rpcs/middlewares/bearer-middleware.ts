// export const betterAuthMiddleware = async (c: any, next: any) => {
//   try {
//     // Get session from request headers
//     const authHeader = c.req.header("Authorization");
//     const sessionToken = authHeader?.replace("Bearer ", "");

//     if (!sessionToken) {
//       return c.json({ error: "No session token provided" }, 401);
//     }

//     // Verify session with Better Auth
//     const auth = authInit(c.env);
//     const headers = new Headers();
//     headers.set("authorization", `Bearer ${sessionToken}`);
//     const session = await auth.api.getSession({ headers });

//     if (!session) {
//       return c.json({ error: "Invalid session" }, 401);
//     }

//     // Add session to context
//     c.set("session", session);
//     c.set("user", session.user);

//     await next();
//   } catch (error) {
//     console.error("Auth middleware error:", error);
//     return c.json({ error: "Authentication failed" }, 401);
//   }
// };
