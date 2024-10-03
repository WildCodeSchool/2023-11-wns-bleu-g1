import {buildSchemaSync} from "type-graphql";
import UserResolver from "../../src/resolvers/user.resolver";
import {ApolloServer} from "@apollo/server";
import User, {UserRole} from "../../src/entities/user";
import UserService from "../../src/services/user.service";

const baseSchema = buildSchemaSync({
	resolvers: [UserResolver],
	authChecker: () => true,
});

beforeAll(() => {
	new ApolloServer({
		schema: baseSchema,
	});
});

afterAll(() => {
	jest.restoreAllMocks();
});

class MockUser extends User {
	constructor(
		id: string,
		pseudo: string,
		email: string,
		password: string,
		role: UserRole,
		isPremium: boolean
	) {
		super();
		this.id = id;
		this.pseudo = pseudo;
		this.email = email;
		this.password = password;
		this.role = role;
		this.isPremium = isPremium;
	}

	public async hashPassword() {}
	public async hashNewPassword() {}
}

const mockUsers = [
	new MockUser(
		"1",
		"User1",
		"user1@mail.com",
		"password",
		UserRole.ADMIN,
		false
	),
	new MockUser(
		"2",
		"User2",
		"user2@mail.com",
		"password",
		UserRole.VISITOR,
		true
	),
	new MockUser(
		"3",
		"User3",
		"user3@mail.com",
		"password",
		UserRole.VISITOR,
		false
	),
];

const mockUserService = new UserService();

describe("Tests on users", () => {
	it("should return all users", async () => {
		jest.spyOn(mockUserService, "getAll").mockResolvedValue(mockUsers);

		const result = await mockUserService.getAll();

		expect(result).toEqual(mockUsers);
	});

	it("should create a new user", async () => {
		const newUser = new MockUser(
			"4",
			"User4",
			"user4@mail.com",
			"password",
			UserRole.VISITOR,
			false
		);
		jest.spyOn(mockUserService, "create").mockResolvedValue(newUser);

		const result = await mockUserService.create({
			email: "user4@mail.com",
			password: "password",
			pseudo: "User4",
			role: UserRole.VISITOR,
			isPremium: false,
		});

		expect(result).toMatchObject({
			email: newUser.email,
			pseudo: newUser.pseudo,
			role: newUser.role,
			isPremium: newUser.isPremium,
		});
	});

	it("should update user username and return true", async () => {
		const updatedUser = new MockUser(
			"1",
			"User1Updated",
			"user1@mail.com",
			"password",
			UserRole.ADMIN,
			false
		);
		jest.spyOn(mockUserService, "getBy").mockResolvedValueOnce(mockUsers[0]);
		const mockSave = jest.fn().mockResolvedValue(true);
		mockUserService.userRepository.save = mockSave;

		const result = await mockUserService.updateUsername({
			newUsername: updatedUser.pseudo,
			id: updatedUser.id,
		});

		expect(result).toBe(true);

		expect(mockSave).toHaveBeenCalledTimes(1);
		expect(mockSave).toHaveBeenCalledWith(
			expect.objectContaining({ pseudo: updatedUser.pseudo })
		);

		jest.clearAllMocks();
	});
});
