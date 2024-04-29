import { Arg, Ctx, Mutation, Query } from "type-graphql";
import User, { NewUserInput, SigninInput } from "../entities/user";
import { GraphQLError } from "graphql";
import { verify } from "argon2";
import jwt from "jsonwebtoken";
import env from "../env";
import { Context } from "../interfaces/auth";

export default class UserResolver {
	@Query(() => [User])
	async users() {
		// SELECT * FROM User;
		const users = await User.find();

		return users;
	}

	@Mutation(() => User)
	async createUser(@Arg("data", { validate: true }) data: NewUserInput) {
		if (!data.email) {
			throw new GraphQLError("email is missing but required");
		}

		// SELECT * FROM User WHERE email=data.email
		const userAlreadyExist = await User.findOneBy({ email: data.email });

		if (userAlreadyExist) {
			throw new GraphQLError(`user: ${data.email} already exist`);
		}

		const newUser = new User();

		Object.assign(newUser, data);

		return await newUser.save();
	}

	@Mutation(() => String)
	async signin(@Arg("data") data: SigninInput, @Ctx() ctx: Context) {
		const user = await User.findOneBy({ email: data.email });

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
	}
}
