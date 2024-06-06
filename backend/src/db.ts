import { Code, DataSource } from "typeorm";
import env from "./env";
import User from "./entities/user";
import Project from "./entities/project";
import Langage from "./entities/langage";

const db = new DataSource({
	type: "postgres",
	password: env.DB_PASS,
	username: env.DB_USER,
	database: env.DB_NAME,
	host: env.DB_HOST,
	port: env.DB_PORT,
	entities: [User, Project, Langage, Code],
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
