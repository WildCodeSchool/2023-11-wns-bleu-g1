import {ASTNode, graphql, GraphQLSchema, print} from "graphql";

import db, {clearDb} from "./src/db";
import getSchema from "./src/schema";
import {Maybe} from "type-graphql";

const mockedEnv = {
	DB_HOST: "localhost",
	DB_PORT: "5432",
	DB_USER: "testuser",
	DB_PASS: "testpass",
	DB_NAME: "testdb",
	CORS_ALLOWED_ORIGINS: "http://localhost:3000",
	SERVER_PORT: "4000",
	JWT_PRIVATE_KEY: "testkey",
};

process.env = {...process.env, ...mockedEnv};

export let schema: GraphQLSchema;

export async function execute(
	operation: ASTNode,
	{
		variableValues,
		contextValue = {},
	}: {
		variableValues?: Maybe<{
			readonly [variable: string]: unknown;
		}>;
		contextValue?: object;
	}
) {
	return await graphql({
		schema,
		source: print(operation),
		variableValues,
		contextValue,
	});
}
beforeAll(async () => {
	await db.initialize();
	schema = await getSchema;
});

beforeEach(async () => {
	await clearDb();
});

afterAll(async () => {
	await db.destroy();
});
