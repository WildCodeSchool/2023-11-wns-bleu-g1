import db from "../db";
import User from "../entities/user";

const createHundredUsers = async () => {
	console.log("[SCRIPT] begin to create hundred users");

	await db.initialize();

	for (let i = 0; i < 100; i++) {
		try {
			const user = new User();

			Object.assign(user, {
				email: `dummy.user${i}@pasgmail.com`,
				password: "Test123456!",
				pseudo: `dummyUser${i}`,
				executionCounter: Math.floor(Math.random() * 10),
			});

			await user.save();
		} catch (e) {
			console.log(e);
		}
		console.log(`[SCRIPT] user nº${i + 1} was created`);
	}

	await db.destroy();

	console.log("[SCRIPT] end to create hundred users");
};

export default createHundredUsers();
