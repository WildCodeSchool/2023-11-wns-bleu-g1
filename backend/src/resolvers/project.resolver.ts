import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";

import Project, { NewProjectInput } from "../entities/project";
import { Context } from "../interfaces/auth";
import { GraphQLError } from "graphql";

export default class ProjectResolver {
	@Query(() => [Project])
	async getProjects() {
		// SELECT * FROM Project;
		const projects = await Project.find({
			relations: { codes: true, user: true },
		});

		return projects;
	}

	@Authorized()
	@Query(() => [Project])
	async getMyProjects(@Ctx() ctx: Context) {
		if (!ctx.currentUser) throw new GraphQLError("you need to be logged in!");
		// SELECT * FROM Project WHERE user=ctx.currentUser;
		const projects = await Project.find({
			where: { user: ctx.currentUser },
			relations: { codes: true, user: true },
		});

		return projects;
	}

	@Authorized()
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
