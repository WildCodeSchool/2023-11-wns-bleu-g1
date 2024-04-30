import { execute } from "../jest.setup";
import User from "../src/entities/user";
import createUser from "./operations/createUser";
import getUsers from "./operations/getUsers";

describe("users resolver", () => {
	it("can get a list of users", async () => {
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

		const res = await execute(getUsers);

		expect(res).toMatchInlineSnapshot(`
{
  "data": {
    "users": [],
  },
}
`);
	});

	it("can create a user", async () => {
		const res = await execute(createUser, {
			data: {
				email: "pas@gmail.fr",
				password: "Test123456!",
				pseudo: "zizi",
			},
		});

		expect(res).toMatchInlineSnapshot(`
{
  "data": {
    "createUser": {
      "email": "pas@gmail.fr",
      "id": "2ac08f46-d458-444f-81de-ce35118734c2",
      "pseudo": "zizi",
    },
  },
}
`);
	});
});
