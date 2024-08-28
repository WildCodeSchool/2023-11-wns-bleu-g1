import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import { GraphQLError } from "graphql";

import Project, { NewProjectInput } from "../entities/project";
import { Context } from "../interfaces/auth";
import ProjectService from "../services/projet.service";
import { UserRole } from "../entities/user";
import ProjectPaginationResponse from "../types/project-pagination-response";

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
		@Arg("offset", { defaultValue: 0 }) offset: number
	) {
		return await new ProjectService().getAllPaginate(
			{
				where: { user: currentUser },
				relations: { codes: true, user: true },
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
		// @Ctx() ctx: Context,
		@Arg("limit", { defaultValue: 12 }) limit: number,
		@Arg("offset", { defaultValue: 0 }) offset: number
	): Promise<ProjectPaginationResponse> {
		return await new ProjectService().getAllPaginate(
			{
				where: { isPublic: true },
				relations: { codes: true, user: true },
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
