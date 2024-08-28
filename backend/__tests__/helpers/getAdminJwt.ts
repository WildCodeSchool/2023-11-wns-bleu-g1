import { Repository } from "typeorm";

import DataSource from "../../src/db";
import User, { UserRole } from "../../src/entities/user";
import jwt from "jsonwebtoken";
import env from "../../src/env";

export default async function getAdminJwt() {
	const userRepository: Repository<User> = DataSource.getRepository(User);
	const admin = new User();

	Object.assign(admin, {
		role: UserRole.ADMIN,
		email: "ad@min.fr",
		pseudo: "i'm admin",
		password: "Test123456!",
	});

	await userRepository.save(admin);

	const JWT = jwt.sign({ userId: admin.id }, env.JWT_PRIVATE_KEY);

	return { admin, JWT };
}
