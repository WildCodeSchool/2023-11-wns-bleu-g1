import { execute } from "../jest.setup";
import User, { UserRole } from "../src/entities/user";
import createUser from "./operations/createUser";
import getAdminContext from "./helpers/getAdminContext";
import getUsers from "./operations/getUsers";
import getVisitorContext from "./helpers/getVisitorContext";
import getExecutionCounter from "./operations/getExecutionCounter";

describe("users resolver", () => {
	it("can get a list of users", async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

	describe("if user can execute some code with permissions", () => {
		it("can get executionOunter and isPremium field with visitor authorize", async () => {
			const jwt = await getVisitorContext();

			console.log(jwt);

			const res = await execute(getExecutionCounter, {
				contextValue: jwt,
			});

			expect(res).toMatchInlineSnapshot(`
{
  "data": {
    "getExecutionCounter": {
      "executionCounter": 1,
      "isPremium": true,
    },
  },
}
`);
			expect(res.data?.getExecutionCounter).toHaveProperty("executionCounter");
			expect(res.data?.getExecutionCounter).toHaveProperty("isPremium");
		});

		it("can get executionOunter and isPremium field with admin authorize", async () => {
			const jwt = await getAdminContext();

			const res = await execute(getExecutionCounter, { contextValue: jwt });

			expect(res).toMatchInlineSnapshot(`
{
  "data": {
    "getExecutionCounter": {
      "executionCounter": 0,
      "isPremium": false,
    },
  },
}
`);
			expect(res.data?.getExecutionCounter).toHaveProperty("executionCounter");
			expect(res.data?.getExecutionCounter).toHaveProperty("isPremium");
		});
	});
});
