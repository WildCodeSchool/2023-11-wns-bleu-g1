import User, { UserRole } from "../../src/entities/user";
import jwt from "jsonwebtoken";
import env from "../../src/env";

export default async function getAdminJwt() {
	const admin = new User();

	Object.assign(admin, {
		role: UserRole.ADMIN,
		email: "ad@min.fr",
		pseudo: "i'm admin",
		password: "Test123456!",
	});

	await admin.save();

	const JWT = jwt.sign({ userId: admin.id }, env.JWT_PRIVATE_KEY);

	console.log(JWT);

	return { admin, JWT };
}
