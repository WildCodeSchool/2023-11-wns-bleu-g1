import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_PRIVATE_KEY = new TextEncoder().encode(
	process.env.JWT_PRIVATE_KEY || ""
);

export async function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;

	if (request.nextUrl.pathname.startsWith("/auth")) {
		if (token) {
			return NextResponse.redirect(new URL("/tableau-de-bord", request.url));
		}
		return NextResponse.next();
	}

	if (request.nextUrl.pathname === "/") {
		if (!token) return NextResponse.next();
		return NextResponse.redirect(new URL("/tableau-de-bord", request.url));
	}

	if (token) {
		if (request.nextUrl.pathname === "/") {
			return NextResponse.redirect(new URL("/tableau-de-bord", request.url));
		}

		return NextResponse.next();
	}

	return NextResponse.redirect(new URL("/auth/connexion", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/", "/tableau-de-bord", "/auth/:path*"],
};
