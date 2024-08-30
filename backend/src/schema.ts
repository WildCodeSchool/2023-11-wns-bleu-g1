import { buildSchemaSync } from "type-graphql";
import UserResolver from "./resolvers/user.resolver";
import { authChecker } from "./auth";
import CodeResolver from "./resolvers/code.resolver";
import ProjectResolver from "./resolvers/project.resolver";
import LanguageResolver from "./resolvers/language.resolver";
import PremiumResolver from "./resolvers/premium.resolver";


export default buildSchemaSync({
	resolvers: [UserResolver, CodeResolver, ProjectResolver, LanguageResolver, PremiumResolver],
	authChecker,
});
