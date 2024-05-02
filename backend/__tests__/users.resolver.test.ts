import { execute } from "../jest.setup";
import User, { UserRole } from "../src/entities/user";
import createUser from "./operations/createUser";
import getAdminContext from "./operations/getAdminContext";
import getUsers from "./operations/getUsers";

describe("users resolver", () => {
	it("can get a list of users", async () => {
		const users: any = new User();

		const user1 = await Object.assign(users, {
			email: "sans@sans.sans",
			password: "Test123456!",
			pseudo: "test",
		}).save();

		const user2 = await Object.assign(users, {
			email: "test@test.test",
			password: "Test123456!",
			pseudo: "cazzo",
		}).save();

		await getAdminContext();
		const res: any = await execute(getUsers);

		expect(res).toMatchInlineSnapshot(`
{
  "data": {
    "users": [
      {
        "email": "test@test.test",
        "pseudo": "cazzo",
        "role": "visitor",
      },
      {
        "email": "ad@min.fr",
        "pseudo": "i'm admin",
        "role": "admin",
      },
    ],
  },
}
`);
	});

	it("can create a user", async () => {
		const res: any = await execute(createUser, {
			data: {
				email: "pas@gmail.fr",
				password: "Test123456!",
				pseudo: "pasDid",
				role: UserRole.ADMIN,
			},
		});

		delete res.data.createUser.id;

		expect(res).toMatchInlineSnapshot(`
{
  "data": {
    "createUser": {
      "email": "pas@gmail.fr",
      "pseudo": "pasDid",
    },
  },
}
`);
	});
});
