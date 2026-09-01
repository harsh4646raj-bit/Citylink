import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 1. Synchronize City Context with request headers
  const activeCitySlug =
    request.cookies.get("citylink_active_city_slug")?.value || "muzaffarpur";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-citylink-city", activeCitySlug);
  requestHeaders.set("x-city-slug", activeCitySlug);

  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Ensure the cookie exists on response if missing
  if (!request.cookies.has("citylink_active_city_slug")) {
    response.cookies.set("citylink_active_city_slug", activeCitySlug, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("your-project") || supabaseUrl.includes("placeholder")) {
    return response;
  }

  // 2. Production-safe Supabase Cookie Handling
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
        response.cookies.set("citylink_active_city_slug", activeCitySlug, {
          path: "/",
          maxAge: 31536000,
          sameSite: "lax",
        });
      },
    },
  });

  try {
    await supabase.auth.getUser();
  } catch {
    // Auth check fallback
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
