import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";
import { updateSession } from "./lib/supabase/middleware";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Run the session update middleware first
  const sessionResponse = await updateSession(request);

  // if (sessionResponse) {
  //   return sessionResponse;
  // }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

// atas itu cadangan
// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";
// import { updateSession } from "./lib/supabase/middleware";

// export default createMiddleware(routing);

// export const config = {
//   // Match only internationalized pathnames
//   matcher: [
//     "/",
//     "/(ar|en)/:path*",
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };
