import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";

import Project, { NewProjectInput } from "../entities/project";
import { Context } from "../interfaces/auth";
import { GraphQLError } from "graphql";
import DataSource from "../db";
import { UserRole } from "../entities/user";
import ProjectPaginationResponse from "../types/project-pagination-response";

export default class ProjectResolver {
	private projectRepository = DataSource.getRepository(Project);
	@Query(() => [Project])
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	async getProjects() {
		const projects = await Project.find({
			relations: { codes: { language: true }, user: true },
		});

		return projects;
	}

	@Authorized([UserRole.VISITOR])
	@Query(() => ProjectPaginationResponse)
	async getMyProjects(
		@Ctx() ctx: Context,
		@Arg("limit", { defaultValue: 12 }) limit: number,
		@Arg("offset", { defaultValue: 0 }) offset: number
	) {
		if (!ctx.currentUser) throw new GraphQLError("you need to be logged in!");
		const projects = await Project.find({
			where: { user: ctx.currentUser },
			relations: { codes: true, user: true },
			order: { createdAt: "DESC" },
			take: limit + 1,
			skip: offset,
		});

		const hasMore = projects.length > limit;
		const resultProjects = projects.slice(0, limit);

		return {
			projects: resultProjects,
			hasMore,
		};
	}

	@Authorized([UserRole.VISITOR])
	@Query(() => ProjectPaginationResponse)
	async getPublicsProjects(
		@Ctx() ctx: Context,
		@Arg("limit", { defaultValue: 12 }) limit: number,
		@Arg("offset", { defaultValue: 0 }) offset: number
	): Promise<ProjectPaginationResponse> {
		if (!ctx.currentUser) throw new GraphQLError("you need to be logged in!");

		const projects = await Project.find({
			where: { isPublic: true },
			relations: { codes: true, user: true },
			order: { createdAt: "DESC" },
			take: limit + 1,
			skip: offset,
		});

		const hasMore = projects.length > limit;
		const resultProjects = projects.slice(0, limit);

		return {
			projects: resultProjects,
			hasMore,
		};
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => [Project])
	async getProject(@Arg("id") id: string) {
		return this.projectRepository.findOneOrFail({ where: { id } });
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Project)
	async createProject(
		@Arg("data", { validate: true }) data: NewProjectInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.currentUser) throw new GraphQLError("you need to be logged in!");

		const project = Project.create({
			...data,
			isPublic: data.isPublic || false,
			user: ctx.currentUser,
		});

		return await project.save();
	}
}
