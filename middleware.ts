// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // daftar route publik yang tidak butuh token
  const publicRoutes = ["/login", "/register"];

  // kalau route publik → langsung lanjut
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // cek cookie token
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // kalau tidak ada token → redirect login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // kalau ada token → lanjut
  return NextResponse.next();
}

// match semua route kecuali api & file statis
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
