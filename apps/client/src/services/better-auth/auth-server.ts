/// <reference types="vite/client" />
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

const VITE_BETTER_AUTH_BASE_URL = import.meta.env.VITE_BETTER_AUTH_BASE_URL;

export type User = {
  isAuthenticated: boolean;
  sessionId: string;
  name: string;
  userId: string;
  email: string;
  image: string;
} | null;

export const authServerSession = createServerFn().handler<User>(async () => {
  const request = getWebRequest()!;
  const res = await fetch(`${VITE_BETTER_AUTH_BASE_URL}/session`, {
    headers: {
      cookie: request.headers.get("cookie") || "",
      authorization: request.headers.get("authorization") || "",
    },
  });
  if (!res.ok) return null;

  const { data } = await res.json();
  if (!data) return null;

  const { session, user } = data;

  return {
    isAuthenticated: true,
    sessionId: session.id,
    name: user.name,
    userId: user.id,
    email: user.email,
    image: user.image,
  };
});

export const authServerSignOut = createServerFn().handler<User>(async () => {
  const request = getWebRequest()!;
  const res = await fetch(`${VITE_BETTER_AUTH_BASE_URL}/signout`, {
    headers: {
      cookie: request.headers.get("cookie") || "",
      authorization: request.headers.get("authorization") || "",
    },
  });
  if (!res.ok) return null;

  const data = await res.json();
  console.log(data, " data signout");

  return {
    isAuthenticated: false,
    sessionId: "",
    name: "",
    userId: "user.id",
    email: "",
    image: "",
  };
});
