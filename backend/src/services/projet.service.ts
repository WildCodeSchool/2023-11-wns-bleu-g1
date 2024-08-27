import Project, { NewProjectInput } from "../entities/project";
import User from "../entities/user";

export default class ProjectService {
	static getAllProjects = async (user?: User) => {
		// SELECT * FROM Project WHERE user=user;
		const projects = await Project.find({
			where: { user },
			relations: { codes: true, user: true },
		});

		return projects;
	};

	static create = async (data: NewProjectInput, user: User) => {
		const project = Project.create({
			...data,
			isPublic: data.isPublic || false,
			user: user,
		});

		return project.save();
	};
}
