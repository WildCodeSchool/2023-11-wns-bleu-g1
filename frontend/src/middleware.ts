import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const JWT_PRIVATE_KEY = new TextEncoder().encode(
	process.env.JWT_PRIVATE_KEY || ""
);

export async function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;

	if (request.nextUrl.pathname.startsWith("/auth")) {
		if (token) {
			try {
				const { payload } = await jwtVerify(token, JWT_PRIVATE_KEY);
				if (payload.userId)
					return NextResponse.redirect(
						new URL("/tableau-de-bord", request.url)
					);
			} catch (e) {}
		}
		return NextResponse.next();
	}

	if (request.nextUrl.pathname === "/") {
		if (!token) return NextResponse.next();
		try {
			const { payload } = await jwtVerify(token, JWT_PRIVATE_KEY);
			if (payload.userId)
				return NextResponse.redirect(new URL("/tableau-de-bord", request.url));
		} catch (e) {}
	}

	if (token) {
		try {
			const { payload } = await jwtVerify(token, JWT_PRIVATE_KEY);
			if (payload.userId)
				if (request.nextUrl.pathname === "/") {
					return NextResponse.redirect(
						new URL("/tableau-de-bord", request.url)
					);
				}

			return NextResponse.next();
		} catch (e) {}
	}

	return NextResponse.redirect(new URL("/auth/connexion", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/", "/tableau-de-bord", "/auth/:path*", "/coding/codingPage", "/profile"],
};
