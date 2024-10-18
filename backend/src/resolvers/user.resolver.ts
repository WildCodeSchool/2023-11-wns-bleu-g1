import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import { GraphQLError } from "graphql";

import User, {
	ExecutionCounterInput,
	NewUserInput,
	SigninInput,
	UpdatePasswordInput,
	UpdateUsernameInput,
	UserRole,
} from "../entities/user";
import { Context } from "../interfaces/auth";
import UserService from "../services/user.service";
import {
	addDescription,
	TypeRequestsEnum,
	TypeUserEnum,
} from "../script/documentationUses";

export default class UserResolver {
	@Authorized([UserRole.ADMIN])
	@Query(() => [User], {
		description: addDescription(
			TypeRequestsEnum.query,
			"returns a list with all users",
			[TypeUserEnum.admin]
		),
	})
	async users() {
		return await new UserService().getAll();
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => User, {
		description: addDescription(
			TypeRequestsEnum.query,
			"returns a user by id",
			[TypeUserEnum.admin, TypeUserEnum.visitor],
			["currentUser: (Context)"]
		),
	})
	async getUserProfile(@Ctx() { currentUser }: Context) {
		if (!currentUser) throw new GraphQLError("you need to be logged in!");

		const profile = await new UserService().getBy({
			where: { id: currentUser.id },
			select: [
				"id",
				"pseudo",
				"email",
				"role",
				"executionCounter",
				"isPremium",
			],
		});

		return profile;
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => User, {
		description: addDescription(
			TypeRequestsEnum.query,
			"returns the execution counter of the user",
			[TypeUserEnum.admin, TypeUserEnum.visitor],
			["currentUser: (Context)"]
		),
	})
	async getExecutionCounter(@Ctx() { currentUser }: Context) {
		if (!currentUser) {
			throw new GraphQLError("you need to be logged in!");
		}

		return await new UserService().getBy({
			where: { id: currentUser?.id },
			select: ["isPremium", "executionCounter"],
		});
	}

	@Mutation(() => User, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"creates a new user",
			[TypeUserEnum.visitor],
			["pseudo: (string), email: (string), password: (string)"]
		),
	})
	async createUser(@Arg("data", { validate: true }) data: NewUserInput) {
		return await new UserService().create(data);
	}

	@Mutation(() => String, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"signs in a user",
			[TypeUserEnum.visitor, TypeUserEnum.admin],
			["email: (string), password: (string)"]
		),
	})
	async signin(@Arg("data") data: SigninInput, @Ctx() ctx: Context) {
		return await new UserService().signin(data, ctx);
	}

	@Mutation(() => String, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"logs out a user",
			[TypeUserEnum.visitor, TypeUserEnum.admin],
			["currentUser: (Context)"]
		),
	})
	async logout(@Ctx() ctx: Context) {
		return new UserService().logout(ctx);
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Number, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"increments the execution counter of the user",
			[TypeUserEnum.admin, TypeUserEnum.visitor],
			["counter: (ExecutionCounterInput)", "currentUser: (Context)"]
		),
	})
	async incrementExecutionCounter(
		@Arg("counter") counter: ExecutionCounterInput,
		@Ctx() { currentUser }: Context
	) {
		if (!currentUser) {
			throw new GraphQLError("you need to be logged in!");
		}

		return await new UserService().getExecutionCounter(
			currentUser.id,
			counter.executionCounter
		);
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Boolean, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"update an user to premium",
			[TypeUserEnum.admin, TypeUserEnum.visitor],
			["isPremium: (Boolean)", "currentUser: (Context)"]
		),
	})
	async updateUserIsPremium(
		@Arg("isPremium") isPremium: boolean,
		@Ctx() { currentUser }: Context
	) {
		if (!currentUser) {
			throw new GraphQLError("you need to be logged in!");
		}

		return await new UserService().togglePremium(currentUser.id, isPremium);
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Boolean, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"deletes a user",
			[TypeUserEnum.admin, TypeUserEnum.visitor],
			["id: (string)", "inAdminPanel: (boolean)", "currentUser: (Context)"]
		),
	})
	async deleteUser(
		@Arg("id") id: string,
		@Arg("inAdminPanel", { defaultValue: false }) inAdminPanel: boolean,
		@Ctx() ctx: Context
	) {
		return await new UserService().delete(id, inAdminPanel, ctx);
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Boolean, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"updates the username of the user",
			[TypeUserEnum.admin, TypeUserEnum.visitor],
			["currentUser: (Context)", "newUsername: (string)"]
		),
	})
	async updateUsername(@Arg("datas") datas: UpdateUsernameInput) {
		return await new UserService().updateUsername(datas);
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Boolean, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"updates the password of the user",
			[TypeUserEnum.admin, TypeUserEnum.visitor],
			["currentUser: (Context)", "newPassword: (string)"]
		),
	})
	async updateUserPassword(@Arg("datas") datas: UpdatePasswordInput) {
		return await new UserService().updatePassword(datas);
	}
}
