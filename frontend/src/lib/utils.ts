import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtVerify } from "jose";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function decodeToken(token: string) {
	if (!token) {
		return;
	}

	const JWT_PRIVATE_KEY = new TextEncoder().encode(
		process.env.JWT_PRIVATE_KEY || ""
	);

	const { payload } = await jwtVerify(token, JWT_PRIVATE_KEY);

	return payload;
}
