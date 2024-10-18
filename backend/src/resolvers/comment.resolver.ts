import { GraphQLError } from "graphql";
import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import Comment from "../entities/comment";
import { UserRole } from "../entities/user";
import { Context } from "../interfaces/auth";
import CommentService from "../services/comment.service";
import {
	addDescription,
	TypeRequestsEnum,
	TypeUserEnum,
} from "../script/documentationUses";

export default class CommentResolver {
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Comment, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"creates a new comment",
			[TypeUserEnum.visitor, TypeUserEnum.admin],
			["projectId: (string)", "content: (string)"]
		),
	})
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

	@Authorized([UserRole.ADMIN])
	@Query(() => [Comment], {
		description: addDescription(
			TypeRequestsEnum.query,
			"returns a list with all comments",
			[TypeUserEnum.admin]
		),
	})
	async getComments() {
		return await new CommentService().getAll();
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => Number)
	async getUserCommentsCount(@Ctx() { currentUser }: Context) {
		return await new CommentService().getUserCommentsCount({
			user: currentUser,
		});
	}

	@Authorized([UserRole.ADMIN, UserRole.VISITOR])
	@Mutation(() => Boolean, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"deletes a comment",
			[TypeUserEnum.admin, TypeUserEnum.visitor],
			["commentId: (string)"]
		),
	})
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
	@Mutation(() => Boolean, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"updates a comment",
			[TypeUserEnum.admin, TypeUserEnum.visitor],
			["commentId: (string)", "newContent: (string)"]
		),
	})
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
