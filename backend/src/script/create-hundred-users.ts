import { Repository } from "typeorm";

import db from "../db";
import DataSource from "../db";
import User from "../entities/user";

const createHundredUsers = async () => {
	console.log("[SCRIPT] begin to create hundred users");

	await db.initialize();

	const userRepository: Repository<User> = DataSource.getRepository(User);

	for (let i = 0; i < 100; i++) {
		try {
			const user = new User();

			Object.assign(user, {
				email: `dummy.user${i}@pasgmail.com`,
				password: "Test123456!",
				pseudo: `dummyUser${i}`,
				executionCounter: Math.floor(Math.random() * 50),
			});

			await userRepository.save(user);
		} catch (e) {
			console.log(e);
		}
		console.log(`[SCRIPT] user nº${i + 1} was created`);
	}

	await db.destroy();

	console.log("[SCRIPT] end to create hundred users");
};

export default createHundredUsers();
