import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import { GraphQLError } from "graphql";

import User, {
	ExecutionCounterInput,
	NewUserInput,
	SigninInput,
	UpdatePasswordInput,
	UpdateUsernameInput,
} from "../entities/user";
import { Context } from "../interfaces/auth";
import { UserRole } from "../entities/user";
import UserService from "../services/user.service";

export default class UserResolver {

	@Authorized([UserRole.ADMIN])
	@Query(() => [User])
	async users() {
		return await new UserService().getAll();
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => User)
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
	@Query(() => User)
	async getExecutionCounter(@Ctx() { currentUser }: Context) {
		if (!currentUser) {
			throw new GraphQLError("you need to be logged in!");
		}

		return await new UserService().getBy({
			where: { id: currentUser?.id },
			select: ["isPremium", "executionCounter"],
		});
	}

	@Mutation(() => User)
	async createUser(@Arg("data", { validate: true }) data: NewUserInput) {
		return await new UserService().create(data);
	}

	@Mutation(() => String)
	async signin(@Arg("data") data: SigninInput, @Ctx() ctx: Context) {
		return await new UserService().signin(data, ctx);
	}

	@Mutation(() => String)
	async logout(@Ctx() ctx: Context) {
		return new UserService().logout(ctx);
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Number)
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
	@Mutation(() => Boolean)
	async deleteUser(@Arg("id") id: string, @Ctx() ctx: Context) {
		return await new UserService().delete(id, ctx);
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Boolean)
	async updateUsername(@Arg("datas") datas: UpdateUsernameInput) {
		return await new UserService().updateUsername(datas);
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Boolean)
	async updateUserPassword(@Arg("datas") datas: UpdatePasswordInput) {
		return await new UserService().updatePassword(datas);
	}
}
