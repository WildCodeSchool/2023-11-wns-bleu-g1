import { Repository } from "typeorm";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { verify } from "argon2";

import env from "../env";
import DataSource from "../db";
import User, { NewUserInput, SigninInput } from "../entities/user";
import { Context } from "../interfaces/auth";

export default class UserService {
	userRepository: Repository<User>;

	constructor() {
		this.userRepository = DataSource.getRepository(User);
	}

	getAll = async () => {
		// SELECT * FROM User;
		return await this.userRepository.find();
	};

	getBy = async (request: object) => {
		return await this.userRepository.findOneOrFail(request);
	};

	create = async (data: NewUserInput) => {
		// SELECT * FROM User WHERE email=data.email
		const userAlreadyExist = await this.userRepository.findOneBy({
			email: data.email,
		});

		const users = await this.getAll();
		const pseudoAlreadyExist = users.find(
			(user) =>
				user.pseudo.toLocaleLowerCase() === data.pseudo.toLocaleLowerCase()
		);

		if (userAlreadyExist) {
			throw new GraphQLError(`user: ${data.email} already exist`);
		}

		if (pseudoAlreadyExist) {
			throw new GraphQLError(`pseudo: ${data.pseudo} is already taken`);
		}

		const newUser = new User();

		Object.assign(newUser, data);

		return await this.userRepository.save(newUser);
	};

	signin = async (data: SigninInput, ctx: Context) => {
		// SELECT * FROM User WHERE email=data.email
		const user = await this.userRepository.findOneBy({ email: data.email });

		if (!user) {
			throw new GraphQLError(`email: ${data.email} not register`);
		}

		const isUserPassword = await verify(user.hashedPassword, data.password);

		if (!isUserPassword) {
			throw new GraphQLError("invalid password");
		}

		const token = jwt.sign(
			{
				userId: user.id,
				pseudo: user.pseudo,
				email: user.email,
			},
			env.JWT_PRIVATE_KEY,
			{ expiresIn: "30d" }
		);

		ctx.res.cookie("token", token, {
			httpOnly: true,
			maxAge: 30 * 24 * 60 * 60 * 1000,
			secure: env.NODE_ENV === "production",
		});

		return token;
	};

	logout = (ctx: Context) => {
		ctx.res.clearCookie("token");

		return true;
	};

	getExecutionCounter = async (id: string, counter: number) => {
		const user = await this.getBy({ where: { id } });

		user.executionCounter = counter === 50 ? counter : counter + 1;

		await this.userRepository.save(user);

		return user.executionCounter;
	};

	delete = async (id: string, ctx: Context) => {
		const user = await this.userRepository.findOneBy({ id });

		if (!user) {
			throw new GraphQLError("user not found");
		}

		await this.userRepository.remove(user);
		ctx.res.clearCookie("token");
		return true;
	};
}
