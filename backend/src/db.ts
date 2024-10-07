import { DataSource } from "typeorm";
import env from "./env";
import User from "./entities/user";
import Project from "./entities/project";
import Language from "./entities/language";
import Code from "./entities/code";
import Like from "./entities/like";
import Comment from "./entities/comment";
import Reporting from "./entities/Reporting";

const db = new DataSource({
	type: "postgres",
	password: env.DB_PASS,
	username: env.DB_USER,
	database: env.DB_NAME,
	host: env.DB_HOST,
	port: env.DB_PORT,
	entities: [User, Project, Language, Code, Like, Comment, Reporting],
	synchronize: true,
	logging: env.NODE_ENV !== "test",
});

export async function clearDb() {
	const entities = db.entityMetadatas;
	const tableNames = entities
		.map((entity) => `"${entity.tableName}"`)
		.join(", ");
	await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
}

export default db;
