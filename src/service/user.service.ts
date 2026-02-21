import { cookies } from "next/headers";

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const cookieHeader = cookieStore.toString();
      // console.log("Sending cookies to auth server:", cookieHeader);

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
      });

      // console.log("Auth server response status:", res.status);

      if (!res.ok) {
        // const errorText = await res.text();
        // console.error("Auth server error:", errorText);
        return { data: null, error: { message: "Failed to fetch session" } };
      }

      const session = await res.json();
      // console.log("Session data received:", session);

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
