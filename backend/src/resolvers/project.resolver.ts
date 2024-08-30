import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import { GraphQLError } from "graphql";

import Project, { NewProjectInput } from "../entities/project";
import { Context } from "../interfaces/auth";
import ProjectService from "../services/projet.service";
import { UserRole } from "../entities/user";
import ProjectPaginationResponse from "../types/project-pagination-response";
import { ILike } from "typeorm";

export default class ProjectResolver {
	@Authorized([UserRole.ADMIN])
	@Query(() => [Project])
	async getProjects() {
		return await new ProjectService().getAll({
			relations: { codes: { language: true }, user: true },
		});
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => ProjectPaginationResponse)
	async getPaginateProjects(
		@Ctx() { currentUser }: Context,
		@Arg("limit", { defaultValue: 12 }) limit: number,
		@Arg("offset", { defaultValue: 0 }) offset: number,
		@Arg("searchProject", { defaultValue: "" }) searchProject: string,
		@Arg("searchUser", { defaultValue: "" }) searchUser: string,
		@Arg("isUser", { defaultValue: false }) isUser: boolean
	): Promise<ProjectPaginationResponse> {
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
	@Query(() => Project)
	async getProject(@Arg("id") id: string) {
		return await new ProjectService().get({
			where: { id },
			relations: { codes: { language: true }, likes: { user: true } },
		});
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Project)
	async createProject(
		@Arg("data", { validate: true }) data: NewProjectInput,
		@Ctx() { currentUser }: Context
	) {
		if (!currentUser) throw new GraphQLError("you need to be logged in!");

		return await new ProjectService().create(data, currentUser);
	}
}
