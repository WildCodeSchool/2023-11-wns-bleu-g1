import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import { GraphQLError } from "graphql";

import Project, { NewProjectInput } from "../entities/project";
import { Context } from "../interfaces/auth";
import ProjectService from "../services/projet.service";
import { UserRole } from "../entities/user";

export default class ProjectResolver {
	constructor(private projectService: ProjectService) {}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => [Project])
	async getProjects() {
		const projectService = new ProjectService();
		const projects = await projectService.getAll();

		return projects;
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => [Project])
	async getMyProjects(@Ctx() { currentUser }: Context) {
		const projectService = new ProjectService();
		const projects = await projectService.getAll(currentUser);

		return projects;
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => Project)
	async getProject(@Arg("id") id: string) {
		const projectService = new ProjectService();
		const project = await projectService.get(id);

		return project;
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Project)
	async createProject(
		@Arg("data", { validate: true }) data: NewProjectInput,
		@Ctx() { currentUser }: Context
	) {
		if (!currentUser) throw new GraphQLError("you need to be logged in!");

		const projectService = new ProjectService();
		const project = await projectService.create(data, currentUser);

		return project;
	}
}
