import { Repository } from "typeorm";

import DataSource from "../../src/db";
import jwt from "jsonwebtoken";
import User, { UserRole } from "../../src/entities/user";
import env from "../../src/env";

export default async function getVisitorJwt() {
	const userRepository: Repository<User> = DataSource.getRepository(User);
	const visitor = new User();

	Object.assign(visitor, {
		role: UserRole.VISITOR,
		email: "visi@tor.fr",
		pseudo: "JeSuisVisiteur",
		password: "Test123456!",
		executionCounter: 1,
		isPremium: true,
	});

	const { id: userId } = await userRepository.save(visitor);

	const JWT = jwt.sign({ userId }, env.JWT_PRIVATE_KEY);

	return { visitor, JWT };
}
