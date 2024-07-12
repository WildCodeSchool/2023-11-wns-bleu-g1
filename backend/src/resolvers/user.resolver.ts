import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import User, { ChangePasswordInput, NewUserInput, SigninInput } from "../entities/user";
import { GraphQLError } from "graphql";
import { verify } from "argon2";
import jwt from "jsonwebtoken";

import env from "../env";
import { Context } from "../interfaces/auth";
import { UserRole } from "../entities/user";
import mailer from "../mailer";
import cryto from "cryto";

export default class UserResolver {
	@Authorized([UserRole.ADMIN])
	@Query(() => [User])
	async users() {
		// SELECT * FROM User;
		const users = await User.find();

		return users;
	}

	@Authorized([UserRole.VISITOR])
	@Query(() => User)
	async getUserProfile(@Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("you need to be logged in!");
		return User.findOneOrFail({
			where: { id: ctx.currentUser.id },
			select: ["id", "pseudo", "email", "role"],
		});
	}

	@Mutation(() => User)
	async createUser(@Arg("data", { validate: true }) data: NewUserInput) {
		if (!data.email) {
			throw new GraphQLError("email is missing but require");
		}

		if (!data.pseudo) {
			throw new GraphQLError("pseudo is missing but require");
		}

		if (!data.password) {
			throw new GraphQLError("password is missing but require");
		}

		// SELECT * FROM User WHERE email=data.email
		const userAlreadyExist = await User.findOneBy({ email: data.email });
		// SELECT * FROM User WHERE pseudo=data.pseudo
		const pseudoAlreadyExist = await User.findOneBy({
			pseudo: data.pseudo.toLocaleLowerCase(),
		});

		if (userAlreadyExist) {
			throw new GraphQLError(`user: ${data.email} already exist`);
		}

		if (pseudoAlreadyExist) {
			throw new GraphQLError(`pseudo: ${data.pseudo} is already taken`);
		}

		const newUser = new User();

		Object.assign(newUser, data);

		return await newUser.save();
	}

	@Mutation(() => String)
	async signin(@Arg("data") data: SigninInput, @Ctx() ctx: Context) {
		// SELECT * FROM User WHERE email=data.email
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
	}

	@Mutation(() => String)
	async forgotPassword(
		@Arg("email") email: string,
		@Ctx() ctx: Context
	) {
		// SELECT * FROM User WHERE email=email
		const user = await User.findOneBy({ email: email});

		if (!user) {
			throw new GraphQLError(`email: ${email} not register`);
		}

		const token = crypto.randomBytes(20).toString("hex");

		user.resetPasswordToken = token;

		await mailer.sendMail({
			subject: "Réinitialisation du mot de passe",
			to: user.email,
			from: env.EMAIL_FROM,
			text: `Veuillez suivre ce lien pour réinitialiser votre mot de passe. ${env.APP_URL}changePassword/${token}`
		})

		user.save();

		return "email sent";
	}

	@Mutation(() => String)
	async changePassword(@Arg("password") data: ChangePasswordInput, @Ctx() ctx: Context) {

		const user = await User.findOneBy({
			where: { resetPasswordToken: data.resetPasswordToken },
		});

		if (!user) throw new GraphQLError(`email: ${data.resetPasswordToken} not register`);

		console.log('Change Password Mutation')
	}

	@Mutation(() => String)
	async logout(@Ctx() ctx: Context) {
		ctx.res.clearCookie("token");

		return "ok";
	}
}
