import { DataSource, EntityMetadata } from "typeorm";
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
	const runner = db.createQueryRunner();

	await runner.query("SET session_replication_role = 'replica'");

	await Promise.all(
		db.entityMetadatas.map((entity: EntityMetadata) => {
			runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`);
		})
	);

	await Promise.all(
		db.entityMetadatas.map((entity: EntityMetadata) => {
			runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`);
		})
	);

	await runner.query("SET session_replication_role = 'origin'");

	await db.synchronize();
}

export default db;
