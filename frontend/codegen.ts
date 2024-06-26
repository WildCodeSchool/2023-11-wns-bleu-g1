import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "https://localhost:4000/",
	documents: ["src/**/*.tsx"],
	generates: {
		"./src/gql/": {
			preset: "client",
		},
	},
};
export default config;
