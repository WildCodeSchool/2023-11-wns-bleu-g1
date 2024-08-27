import Project, { NewProjectInput } from "../entities/project";
import User from "../entities/user";
import DataSource from "../db";

export default class ProjectService {
	private projectRepository = DataSource.getRepository(Project);

	getAll = async (user?: User) => {
		// SELECT * FROM Project WHERE user=user;
		const projects = await this.projectRepository.find({
			where: { user },
			relations: { codes: true, user: true },
		});

		return projects;
	};

	get = async (id: string) => {
		const project = await this.projectRepository.findOneByOrFail({ id });

		return project;
	};

	create = async (data: NewProjectInput, user: User) => {
		const project = this.projectRepository.create({
			...data,
			isPublic: data.isPublic || false,
			user: user,
		});

		return project.save();
	};
}
