import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const JWT_PRIVATE_KEY = new TextEncoder().encode(
	process.env.JWT_PRIVATE_KEY || ""
);

export async function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;
	console.log("token:", token);
	if (request.nextUrl.pathname.startsWith("/auth")) {
		if (token) {
			try {
				const { payload } = await jwtVerify(token, JWT_PRIVATE_KEY);
				if (payload.userId)
					return NextResponse.redirect(new URL("/profile", request.url));
			} catch (e) {}
		}
		return NextResponse.next();
	}

	if (request.nextUrl.pathname.startsWith("/admin")) {
		console.log('in admin')
		if (token) {
			console.log("in if token");
			try {
				const { payload } = await jwtVerify(token, JWT_PRIVATE_KEY);
				// console.log("payload in admin route:", payload);
				console.log("in try");
				console.log("payload.role:", payload.role);
				if (payload.userId && payload.role === "admin") {
					console.log("in if payload userId");
					return NextResponse.next();
				}
			} catch (e) {}
		}
		console.log("out of if token");
		return NextResponse.redirect(new URL("/profile", request.url));
	}

	if (request.nextUrl.pathname === "/") {
		if (!token) return NextResponse.next();
		try {
			const { payload } = await jwtVerify(token, JWT_PRIVATE_KEY);
			if (payload.userId)
				return NextResponse.redirect(new URL("/profile", request.url));
		} catch (e) {}
	}

	if (token) {
		try {
			const { payload } = await jwtVerify(token, JWT_PRIVATE_KEY);
			console.log("payload:", payload);
			if (payload.userId)
				if (request.nextUrl.pathname === "/") {
					return NextResponse.redirect(new URL("/profile", request.url));
				}

			return NextResponse.next();
		} catch (e) {}
	}

	return NextResponse.redirect(new URL("/auth/connexion", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		"/",
		"/auth/:path*",
		"/coding/codingPage",
		"/profile",
		"/communaute",
		"/admin"
	],
};
