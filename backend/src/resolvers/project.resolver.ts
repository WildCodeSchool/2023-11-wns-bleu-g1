import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";

import Project, { NewProjectInput } from "../entities/project";
import { Context } from "../interfaces/auth";
import { GraphQLError } from "graphql";
import ProjectService from "../services/projet.service";
import { UserRole } from "../entities/user";

export default class ProjectResolver {
	@Authorized([UserRole.ADMIN])
	@Query(() => [Project])
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	async getProjects() {
		const projects = await ProjectService.getAllProjects();

		return projects;
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => [Project])
	async getMyProjects(@Ctx() { currentUser }: Context) {
		if (!currentUser) throw new GraphQLError("you need to be logged in!");

		const projects = await ProjectService.getAllProjects(currentUser);

		return projects;
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
		@Ctx() { currentUser }: Context
	) {
		if (!currentUser) throw new GraphQLError("you need to be logged in!");

		const project = await ProjectService.create(data, currentUser);

		return project;
	}
}
