import { buildSchemaSync } from "type-graphql";
import UserResolver from "./resolvers/user.resolver";
import { authChecker } from "./auth";
import CodeResolver from "./resolvers/code.resolver";
import ProjectResolver from "./resolvers/project.resolver";

export default buildSchemaSync({
	resolvers: [UserResolver, CodeResolver, ProjectResolver],
	authChecker,
});
