import { Repository } from "typeorm";

import Project, { NewProjectInput } from "../entities/project";
import User from "../entities/user";
import DataSource from "../db";

export default class ProjectService {
	projectRepository: Repository<Project>;

	constructor() {
		this.projectRepository = DataSource.getRepository(Project);
	}
	getAll = async (request: object = {}) => {
		return await this.projectRepository.find(request);
	};

	getAllPaginate = async (
		request: object,
		limit: number,
		searchUser: string,
		searchProject: string
	) => {
		const projects = await this.projectRepository.find(request);

		const isUserSearch = !!searchUser || !!searchProject;
		// console.log(isUserSearch);

		const hasMore = projects.length > limit;
		const resultProjects = projects.slice(0, limit);

		return { projects: resultProjects, hasMore, isUserSearch };
	};

	get = async (request: object) => {
		const project = await this.projectRepository.findOne(request);

		return project;
	};

	create = async (data: NewProjectInput, user: User) => {
		const project = this.projectRepository.create({
			...data,
			isPublic: data.isPublic || false,
			user: user,
		});

		return this.projectRepository.save(project);
	};
}
