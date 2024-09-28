import { Repository } from "typeorm";
import DataSource from "../db";
import Like from "../entities/like";
import User from "../entities/user";
import { GraphQLError } from "graphql";

export default class LikeService {
	likeRepository: Repository<Like>;

	constructor() {
		this.likeRepository = DataSource.getRepository(Like);
	}

	like = async ({
		currentUser,
		projectId,
	}: {
		currentUser: User;
		projectId: string;
	}) => {
		const like = this.likeRepository.create({
			user: currentUser,
			project: { id: projectId },
		});

		return await this.likeRepository.save(like);
	};

	getAll = async () => {
		return await this.likeRepository.find();
	};

	unlike = async ({
		currentUser,
		likeId,
	}: {
		currentUser: User;
		likeId: string;
	}) => {
		const like = await this.likeRepository.findOne({
			where: {
				user: currentUser,
				id: likeId,
			},
		});

		if (!like) throw new GraphQLError("Like not found");

		await this.likeRepository.delete({
			user: currentUser,
			id: likeId,
		});

		return true;
	};
}
