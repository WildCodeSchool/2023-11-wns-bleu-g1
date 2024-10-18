import { GraphQLError } from "graphql";
import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";

import { Context } from "../interfaces/auth";
import Reporting, { NewReportInput } from "../entities/Reporting";
import ReportingService from "../services/reporting.service";
import { UserRole } from "../entities/user";
import Comment from "../entities/comment";
import {
	addDescription,
	TypeRequestsEnum,
	TypeUserEnum,
} from "../script/documentationUses";

export default class ReportingResolver {
	@Authorized([UserRole.ADMIN])
	@Query(() => [Comment], {
		description: addDescription(
			TypeRequestsEnum.query,
			"returns a list with all reports",
			[TypeUserEnum.admin]
		),
	})
	async getAllReports() {
		return await new ReportingService().getAllComments();
	}

	@Authorized([UserRole.VISITOR])
	@Mutation(() => Reporting, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"creates a new reporting",
			[TypeUserEnum.visitor],
			["commentId: (string)", "reason: (string)"]
		),
	})
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
	@Mutation(() => Boolean, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"deletes a list of reports",
			[TypeUserEnum.admin],
			["reportIds: (string[])"]
		),
	})
	async deleteReportings(@Arg("reports", () => [String]) reports: string[]) {
		return await new ReportingService().deleteReport(reports);
	}

	@Authorized([UserRole.ADMIN])
	@Mutation(() => Boolean, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"deletes a comment and its linked report",
			[TypeUserEnum.admin],
			["id: (string)"]
		),
	})
	async deleteCommentAndLinkedReport(@Arg("id") id: string) {
		return await new ReportingService().deleteCommentAndLinkedReport(id);
	}
}
