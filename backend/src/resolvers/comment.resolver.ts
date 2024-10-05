import { GraphQLError } from "graphql";
import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import Comment from "../entities/comment";
import { UserRole } from "../entities/user";
import { Context } from "../interfaces/auth";
import CommentService from "../services/comment.service";

export default class CommentResolver {
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Comment)
	async comment(
		@Ctx() { currentUser }: Context,
		@Arg("projectId") projectId: string,
		@Arg("content") content: string
	) {
		if (!currentUser) throw new GraphQLError("you need to be logged in!");

		return await new CommentService().comment({
			currentUser,
			projectId,
			content,
		});
	}

	// @Authorized([UserRole.ADMIN])
	@Query(() => [Comment])
	async getComments() {
		return await new CommentService().getAll();
	}

	@Authorized([UserRole.ADMIN, UserRole.VISITOR])
	@Mutation(() => Boolean)
	async deleteComment(
		@Ctx() { currentUser }: Context,
		@Arg("commentId") commentId: string
	) {
		if (!currentUser) throw new GraphQLError("you need to be logged in!");

		await new CommentService().delete({
			user: currentUser,
			id: commentId,
		});

		return true;
	}

	@Authorized([UserRole.ADMIN, UserRole.VISITOR])
	@Mutation(() => Boolean)
	async updateComment(
		@Ctx() { currentUser }: Context,
		@Arg("commentId") commentId: string,
		@Arg("newContent") newContent: string
	) {
		if (!currentUser) throw new GraphQLError("you need to be logged in!");

		await new CommentService().update({
			user: currentUser,
			id: commentId,
			newContent,
		});

		return true;
	}
}
