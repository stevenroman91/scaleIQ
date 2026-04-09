import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  // Protect /academy/* routes
  if (pathname.startsWith("/academy")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect /admin/* routes — require ADMIN or TRAINER
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (role !== "ADMIN" && role !== "TRAINER") {
      return NextResponse.redirect(new URL("/academy/modules", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/academy/:path*", "/admin/:path*"],
};
