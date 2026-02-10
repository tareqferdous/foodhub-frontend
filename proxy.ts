import { NextRequest, NextResponse } from "next/server";

import { Roles } from "@/constants/roles";
import { userService } from "./src/service/user.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log("request.cookies", request.cookies);

  // if (pathname.startsWith("/verify-email")) return NextResponse.next();

  // const sessionToken = request.cookies.get(
  //   "__Secure-better-auth.session_token",
  // );

  // if (!sessionToken) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  const publicRoutes = ["/", "/login", "/register", "/meals", "/providers"];

  const isPublic =
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/meals/") ||
    pathname.startsWith("/providers/");

  const { data } = await userService.getSession();
  const role = data?.user?.role ?? null;

  // Not logged in
  if (!role && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (role === Roles.admin) {
    if (
      pathname.startsWith("/provider") ||
      pathname.startsWith("/cart") ||
      pathname.startsWith("/checkout") ||
      pathname === "/profile" ||
      pathname.startsWith("/orders")
    ) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (role === Roles.provider) {
    const customerOnlyRoutes = ["/cart", "/checkout"];

    if (
      pathname.startsWith("/admin") ||
      customerOnlyRoutes.includes(pathname) ||
      pathname.startsWith("/orders")
    ) {
      return NextResponse.redirect(new URL("/provider/dashboard", request.url));
    }
  }

  if (role === Roles.customer) {
    if (pathname.startsWith("/admin") || pathname.startsWith("/provider")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/checkout",
    "/orders/:path*",
    "/profile",
    "/provider/:path*",
    "/admin/:path*",
  ],
};
