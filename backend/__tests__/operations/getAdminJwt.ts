import User, { UserRole } from "../../src/entities/user";
import jwt from "jsonwebtoken";
import env from "../../src/env";

export default async function () {
	const admin = new User();
	Object.assign(admin, {
		role: UserRole.ADMIN,
		email: "ad@min.fr",
		pseudo: "i'm admin",
		password: "Test123456!",
	});

	await admin.save();

	const JWT = await jwt.sign({ userId: admin.id }, env.JWT_PRIVATE_KEY);

	return { admin, JWT };
}
