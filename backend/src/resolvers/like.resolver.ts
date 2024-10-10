import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import Like from "../entities/like";
import { UserRole } from "../entities/user";
import { Context } from "../interfaces/auth";
import LikeService from "../services/like.service";
import { GraphQLError } from "graphql";
import {
	addDescription,
	TypeRequestsEnum,
	TypeUserEnum,
} from "../script/documentationUses";

export default class LikeResolver {
	@Authorized([UserRole.VISITOR])
	@Mutation(() => Like, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"creates a new like",
			[TypeUserEnum.visitor],
			["projectId: (string)"]
		),
	})
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
	@Query(() => [Like], {
		description: addDescription(
			TypeRequestsEnum.query,
			"returns a list with all likes",
			[TypeUserEnum.admin]
		),
	})
	async getLikes() {
		return await new LikeService().getAll();
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => [Like])
	async getUserLikes(@Ctx() { currentUser }: Context) {
		return await new LikeService().getUserLikes({
			user: currentUser,
		});
	}

	@Authorized([UserRole.VISITOR])
	@Mutation(() => Boolean, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"unlikes a like",
			[TypeUserEnum.visitor],
			["likeId: (string)"]
		),
	})
	async unlike(@Ctx() { currentUser }: Context, @Arg("likeId") likeId: string) {
		if (!currentUser) throw new GraphQLError("you need to be logged in!");

		return await new LikeService().unlike({
			currentUser,
			likeId,
		});
	}
}
