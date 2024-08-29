import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import { GraphQLError } from "graphql";

import Project, { NewProjectInput } from "../entities/project";
import { Context } from "../interfaces/auth";
import ProjectService from "../services/projet.service";
import { UserRole } from "../entities/user";
import ProjectPaginationResponse from "../types/project-pagination-response";
import { ILike } from "typeorm";

export default class ProjectResolver {
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => [Project])
	async getProjects() {
		return await new ProjectService().getAll({
			relations: { codes: { language: true }, user: true },
		});
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => ProjectPaginationResponse)
	async getMyProjects(
		@Ctx() { currentUser }: Context,
		@Arg("limit", { defaultValue: 12 }) limit: number,
		@Arg("offset", { defaultValue: 0 }) offset: number,
		@Arg("searchProject", { defaultValue: "" }) searchProject: string
	) {
		return await new ProjectService().getAllPaginate(
			{
				relations: { codes: true, user: true },
				where: { user: currentUser, title: ILike(`%${searchProject}%`) },
				order: { createdAt: "DESC" },
				take: limit + 1,
				skip: offset,
			},
			limit
		);
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => ProjectPaginationResponse)
	async getPublicsProjects(
		@Arg("limit", { defaultValue: 12 }) limit: number,
		@Arg("offset", { defaultValue: 0 }) offset: number,
		@Arg("searchProject", { defaultValue: "" }) searchProject: string,
		@Arg("searchUser", { defaultValue: "" }) searchUser: string
	): Promise<ProjectPaginationResponse> {
		return await new ProjectService().getAllPaginate(
			{
				relations: { codes: true, user: true },
				where: {
					isPublic: true,
					title: ILike(`%${searchProject}%`),
					user: {
						pseudo: ILike(`%${searchUser}%`),
					},
				},
				order: { createdAt: "DESC" },
				take: limit + 1,
				skip: offset,
			},
			limit
		);
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => Project)
	async getProject(@Arg("id") id: string) {
		return await new ProjectService().get(id);
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
