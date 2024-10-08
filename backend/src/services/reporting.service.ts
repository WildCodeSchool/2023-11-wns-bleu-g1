import { Repository } from "typeorm";

import DataSource from "../db";
import Reporting, { NewReportInput } from "../entities/Reporting";
import Comment from "../entities/comment";
import { GraphQLError } from "graphql";
import User from "../entities/user";

export default class ReportingService {
	reportingRepository: Repository<Reporting>;
	commentRepository: Repository<Comment>;
	userRepository: Repository<User>;

	constructor() {
		this.reportingRepository = DataSource.getRepository(Reporting);
		this.commentRepository = DataSource.getRepository(Comment);
		this.userRepository = DataSource.getRepository(User);
	}

	create = async ({ commentId, reason }: NewReportInput, id: string) => {
		const comment = await this.commentRepository.findOneByOrFail({
			id: commentId,
		});
		const user = await this.userRepository.findOneByOrFail({ id });

		const newReport = new Reporting();

		newReport.flagger = user;
		newReport.reason = reason;
		newReport.comment = comment;

		return await this.reportingRepository.save(newReport);
	};

	getAllComments = async () => {
		const reports = await this.reportingRepository.find({
			relations: {
				flagger: true,
				comment: true,
			},
		});

		return reports;
	};

	deleteReport = async (id: string) => {
		const reportToDelete = await this.reportingRepository.findOneBy({ id });

		if (!reportToDelete) {
			throw new GraphQLError("Report not found");
		}

		await this.reportingRepository.remove(reportToDelete);

		return true;
	};

	deleteCommentAndLinkedReport = async (id: string) => {
		const commentAlreadyExist = await this.commentRepository.findOneBy({
			id,
		});

		if (!commentAlreadyExist) {
			throw new GraphQLError("Comment not found");
		}

		await this.commentRepository.remove(commentAlreadyExist);

		return true;
	};
}
