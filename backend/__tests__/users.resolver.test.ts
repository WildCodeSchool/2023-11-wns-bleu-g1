import { execute } from "../jest.setup";
import User from "../src/entities/user";
import createUser from "./operations/createUser";

describe("users resolver", () => {
	it("canget a list of users", async () => {
		await User.create({
			email: "sans@sans.sans",
			password: "Test123456!",
			pseudo: "prout",
		});
		await User.create({
			email: "test@test.test",
			password: "Test123456!",
			pseudo: "cazzo",
		});
	});

	it("can create a user", async () => {
		const res = await execute(createUser, {
			data: {
				email: "pas@gmail.fr",
				password: "Test123456!",
				pseudo: "zizi",
			},
		});
	});
});
