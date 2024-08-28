import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import { GraphQLError } from "graphql";

import Project, { NewProjectInput } from "../entities/project";
import { Context } from "../interfaces/auth";
import ProjectService from "../services/projet.service";
import { UserRole } from "../entities/user";

export default class ProjectResolver {
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => [Project])
	async getProjects() {
		return await new ProjectService().getAll();
	}

	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => [Project])
	async getMyProjects(@Ctx() { currentUser }: Context) {
		return await new ProjectService().getAll(currentUser);
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
