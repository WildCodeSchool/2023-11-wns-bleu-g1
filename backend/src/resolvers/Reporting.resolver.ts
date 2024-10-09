import { GraphQLError } from "graphql";
import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";

import { Context } from "../interfaces/auth";
import Reporting, { NewReportInput } from "../entities/Reporting";
import ReportingService from "../services/reporting.service";
import { UserRole } from "../entities/user";
import Comment from "../entities/comment";

export default class ReportingResolver {
	@Authorized([UserRole.ADMIN])
	@Query(() => [Comment])
	async getAllReports() {
		return await new ReportingService().getAllComments();
	}

	@Authorized([UserRole.VISITOR])
	@Mutation(() => Reporting)
	async createReporting(
		@Ctx() { currentUser }: Context,
		@Arg("data", { validate: true }) data: NewReportInput
	) {
		if (!currentUser) {
			throw new GraphQLError("You need to be logged");
		}

		return await new ReportingService().create(data, currentUser?.id);
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Boolean)
	async deleteReportings(@Arg("reports", () => [String]) reports: string[]) {
		return await new ReportingService().deleteReport(reports);
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Boolean)
	async deleteCommentAndLinkedReport(@Arg("id") id: string) {
		return await new ReportingService().deleteCommentAndLinkedReport(id);
	}
}
