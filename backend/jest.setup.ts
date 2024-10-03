import { ASTNode, graphql, GraphQLSchema, print } from "graphql";

import db, { clearDb } from "./src/db";
import getSchema from "./src/schema";
import { Maybe } from "type-graphql";

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

process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '5432';
process.env.DB_USER = 'testuser';
process.env.DB_PASS = 'testpass';
process.env.DB_NAME = 'testdb';
process.env.CORS_ALLOWED_ORIGINS = 'http://localhost:3000';
process.env.SERVER_PORT = '4000';
process.env.JWT_PRIVATE_KEY = 'testkey';

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
