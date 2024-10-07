import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import Like from "../entities/like";
import { UserRole } from "../entities/user";
import { Context } from "../interfaces/auth";
import LikeService from "../services/like.service";
import { GraphQLError } from "graphql";

export default class LikeResolver {
	@Authorized([UserRole.VISITOR])
	@Mutation(() => Like)
	async like(
		@Ctx() { currentUser }: Context,
		@Arg("projectId") projectId: string
	) {
		if (!currentUser) throw new GraphQLError("you need to be logged in!");

		return await new LikeService().like({
			currentUser,
			projectId,
		});
	}

	@Authorized([UserRole.ADMIN])
	@Query(() => [Like])
	async getLikes() {
		return await new LikeService().getAll();
	}

	@Authorized([UserRole.VISITOR])
	@Mutation(() => Boolean)
	async unlike(@Ctx() { currentUser }: Context, @Arg("likeId") likeId: string) {
		if (!currentUser) throw new GraphQLError("you need to be logged in!");

		return await new LikeService().unlike({
			currentUser,
			likeId,
		});
	}

	
}
