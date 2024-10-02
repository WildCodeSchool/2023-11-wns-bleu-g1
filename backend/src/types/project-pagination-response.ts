import { ObjectType, Field } from "type-graphql";
import Project from "../entities/project";

@ObjectType()
export default class ProjectPaginationResponse {
	@Field(() => [Project])
	projects: Project[];

	@Field(() => Boolean)
	hasMore: boolean;

	@Field(() => Boolean)
	isUserSearch: boolean;
}
