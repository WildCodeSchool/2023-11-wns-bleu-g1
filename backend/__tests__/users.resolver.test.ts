import { execute } from "../jest.setup";
import User, { UserRole } from "../src/entities/user";
import createUser from "./operations/createUser";
import getAdminContext from "./helpers/getAdminContext";
import getUsers from "./operations/getUsers";

describe("users resolver", () => {
	it("can get a list of users", async () => {
		const user1: any = new User();
		const user2 = new User();

		await Object.assign(user1, {
			email: "sans@sans.sans",
			password: "Test123456!",
			pseudo: "test",
		}).save();

		await Object.assign(user2, {
			email: "test@test.test",
			password: "Test123456!",
			pseudo: "cazzo",
		}).save();

		const jwt = await getAdminContext();
		const res: any = await execute(getUsers, { contextValue: jwt });

		expect(res).toMatchInlineSnapshot(`
{
  "data": {
    "users": [
      {
        "email": "sans@sans.sans",
        "pseudo": "test",
        "role": "visitor",
      },
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
			variableValues: {
				data: {
					email: "pas@gmail.fr",
					password: "Test123456!",
					pseudo: "pasDid",
					role: UserRole.ADMIN,
				},
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
