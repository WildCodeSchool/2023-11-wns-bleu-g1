import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_PRIVATE_KEY = new TextEncoder().encode(
	process.env.JWT_PRIVATE_KEY || ""
);

export async function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;

	if (token) {
		try {
			const { payload } = await jwtVerify(token, JWT_PRIVATE_KEY);
			if (payload.userId) return NextResponse.next();
		} catch (e) {}
	}

	return NextResponse.redirect(new URL("/auth/connexion", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/tableau-de-bord"],
};
