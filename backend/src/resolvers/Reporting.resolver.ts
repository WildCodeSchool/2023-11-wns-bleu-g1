import { GraphQLError } from "graphql";
import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";

import { Context } from "../interfaces/auth";
import Reporting, { NewReportInput } from "../entities/Reporting";
import ReportingService from "../services/reporting.service";
import { UserRole } from "../entities/user";

export default class ReportingResolver {
	@Authorized([UserRole.ADMIN])
	@Query(() => [Reporting])
	async getAllReport() {
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
	async deleteReporting(@Arg("id") id: string) {
		return await new ReportingService().deleteReporting(id);
	}
}
