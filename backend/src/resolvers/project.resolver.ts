import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import { GraphQLError } from "graphql";

import Project, { NewProjectInput } from "../entities/project";
import { Context } from "../interfaces/auth";
import ProjectService from "../services/projet.service";
import { UserRole } from "../entities/user";
import ProjectPaginationResponse from "../types/project-pagination-response";
import { Equal, ILike, Not } from "typeorm";
import {
	addDescription,
	TypeRequestsEnum,
	TypeUserEnum,
} from "../script/documentationUses";

export default class ProjectResolver {
	@Authorized([UserRole.ADMIN])
	@Query(() => [Project], {
		description: addDescription(
			TypeRequestsEnum.query,
			"returns a list with all projects",
			[TypeUserEnum.admin]
		),
	})
	async getProjects() {
		return await new ProjectService().getAll({
			relations: { codes: { language: true }, user: true },
		});
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => ProjectPaginationResponse, {
		description: addDescription(
			TypeRequestsEnum.query,
			"returns a list with all projects",
			[TypeUserEnum.admin, TypeUserEnum.visitor]
		),
	})
	async getPaginateProjects(
		@Ctx() { currentUser }: Context,
		@Arg("limit", { defaultValue: 12 }) limit: number,
		@Arg("offset", { defaultValue: 0 }) offset: number,
		@Arg("searchProject", { defaultValue: "" }) searchProject: string,
		@Arg("searchUser", { defaultValue: "" }) searchUser: string,
		@Arg("isUser", { defaultValue: false }) isUser: boolean,
		@Arg("withUserProject", { defaultValue: false }) withUserProject: boolean
	): Promise<ProjectPaginationResponse> {
		const id = withUserProject ? undefined : Not(Equal(currentUser?.id));

		return await new ProjectService().getAllPaginate(
			{
				relations: { codes: true, user: true },
				where: {
					isPublic: isUser ? undefined : true,
					title: ILike(`%${searchProject}%`),
					user: isUser
						? currentUser
						: {
								pseudo: ILike(`%${searchUser}%`),
								id,
							},
				},
				order: { createdAt: "DESC" },
				take: limit + 1,
				skip: offset,
			},
			limit,
			searchUser,
			searchProject
		);
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => Project, {
		description: addDescription(
			TypeRequestsEnum.query,
			"returns a project by id",
			[TypeUserEnum.admin, TypeUserEnum.visitor],
			["id: (string)"]
		),
	})
	async getProject(@Arg("id") id: string) {
		return await new ProjectService().get({
			where: { id },
			relations: {
				codes: { language: true },
				likes: { user: true },
				user: true,
				comments: { user: true },
			},
		});
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => Number, {
		description: addDescription(
			TypeRequestsEnum.query,
			"retrieve the number of user's projects",
			[TypeUserEnum.admin, TypeUserEnum.visitor],
			["currentUser: (Context)"]
		),
	})
	async getUserProjectsCount(@Ctx() { currentUser }: Context) {
		return await new ProjectService().getUserProjectsCount({
			where: {
				user: currentUser,
			},
			relations: { user: true },
		});
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Project, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"creates a new project",
			[TypeUserEnum.visitor],
			["title: (string)", "isPublic: (boolean)"]
		),
	})
	async createProject(
		@Arg("data", { validate: true }) data: NewProjectInput,
		@Ctx() { currentUser }: Context
	) {
		if (!currentUser) throw new GraphQLError("you need to be logged in!");

		return await new ProjectService().create(data, currentUser);
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Project, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"updates a project",
			[TypeUserEnum.visitor, TypeUserEnum.admin],
			["id: (string)", "title: (string)", "isPublic: (boolean)"]
		),
	})
	async toggleProjectPublicState(@Arg("id") id: string) {
		return await new ProjectService().togglePublicState(id);
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Boolean, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"deletes a project",
			[TypeUserEnum.visitor, TypeUserEnum.admin],
			["id: (string)"]
		),
	})
	async deleteProject(@Arg("id") id: string) {
		return await new ProjectService().delete(id);
	}

	@Authorized([UserRole.VISITOR], [UserRole.ADMIN])
	@Query(() => Number, {
		description: addDescription(
			TypeRequestsEnum.query,
			"returns count of likes of the current user's projects",
			[TypeUserEnum.admin, TypeUserEnum.visitor]
		),
	})
	async getCountOfMyProjectsLikes(@Ctx() { currentUser }: Context) {
		return await new ProjectService().getCountOfMyProjectsLikes(currentUser);
	}

	@Authorized([UserRole.VISITOR], [UserRole.ADMIN])
	@Query(() => Number, {
		description: addDescription(
			TypeRequestsEnum.query,
			"returns count of comments of the current user's projects",
			[TypeUserEnum.admin, TypeUserEnum.visitor]
		),
	})
	async getCountOfMyProjectsComments(@Ctx() { currentUser }: Context) {
		return await new ProjectService().getCountOfMyProjectsComments(currentUser);
	}
}
