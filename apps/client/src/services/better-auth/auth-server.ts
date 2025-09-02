/// <reference types="vite/client" />
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

import { Session, User } from "better-auth";
import { authClient } from "./auth-client";

export type UserAndSession = {
  session: Session;
  user: User;
} | null;

export const authServerSession = createServerFn().handler<UserAndSession>(
  async () => {
    const request = getWebRequest()!;
    const { data } = await authClient.getSession({
      fetchOptions: {
        headers: request.headers,
        // headers: {
        //   cookie: request.headers.get("cookie") || "",
        //   authorization: request.headers.get("authorization") || "",
        // },
      },
    });

    // const res = await fetch(`${VITE_BETTER_AUTH_BASE_URL}/session`, {
    //   headers: {
    //     cookie: request.headers.get("cookie") || "",
    //     authorization: request.headers.get("authorization") || "",
    //   },
    // });
    // if (!res.ok) return null;

    // const { data } = await res.json();
    // if (!data) return null;

    // const { session, user } = data;

    return data;
  }
);

// export const authServerSignOut = createServerFn().handler<User>(async () => {
//   const request = getWebRequest()!;
//   const res = await fetch(`${VITE_BETTER_AUTH_BASE_URL}/signout`, {
//     headers: {
//       cookie: request.headers.get("cookie") || "",
//       authorization: request.headers.get("authorization") || "",
//     },
//   });
//   if (!res.ok) return null;

//   const data = await res.json();
//   console.log(data, " data signout");

//   return {
//     isAuthenticated: false,
//     sessionId: "",
//     name: "",
//     userId: "user.id",
//     email: "",
//     image: "",
//   };
// });
