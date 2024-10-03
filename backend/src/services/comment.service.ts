import { Repository } from "typeorm";
import DataSource from "../db";
import Comment from "../entities/comment";
import User from "../entities/user";

export default class CommentService {
	commentRepository: Repository<Comment>;

	constructor() {
		this.commentRepository = DataSource.getRepository(Comment);
	}

	comment = async ({
		currentUser,
		projectId,
		content,
	}: {
		currentUser: User;
		projectId: string;
		content: string;
	}) => {
		const comment = this.commentRepository.create({
			content,
			user: currentUser,
			project: { id: projectId },
		});

		return await this.commentRepository.save(comment);
	};

	getAll = async () => {
		return await this.commentRepository.find();
	};
}
