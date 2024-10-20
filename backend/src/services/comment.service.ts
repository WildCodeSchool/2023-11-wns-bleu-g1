import { Repository } from "typeorm";
import DataSource from "../db";
import Comment from "../entities/comment";
import User, { UserRole } from "../entities/user";
import { GraphQLError } from "graphql";

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
		return await this.commentRepository.find({
			relations: ["project", "user"],
		});
	};

	delete = async ({ user, id }: { user: User; id: string }) => {
		const comment = await this.commentRepository.findOne({
			where: { id },
			relations: { user: true },
		});

		if (!comment) {
			throw new GraphQLError("Comment not found");
		}

		if (user.role === UserRole.VISITOR && comment.user.id !== user.id) {
			throw new GraphQLError("Not Authorized");
		}

		return await this.commentRepository.remove(comment);
	};

	update = async ({
		user,
		id,
		newContent,
	}: {
		user: User;
		id: string;
		newContent: string;
	}) => {
		const comment = await this.commentRepository.findOne({
			where: { id },
			relations: { user: true },
		});

		if (!comment) {
			throw new GraphQLError("Comment not found");
		}

		if (user.role === UserRole.VISITOR && comment.user.id !== user.id) {
			throw new GraphQLError("Not Authorized");
		}

		return await this.commentRepository.update(id, { content: newContent });
	};
}
