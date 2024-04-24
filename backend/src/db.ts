import { DataSource } from "typeorm";
import env from "./env";
import User from "./entities/user";

export default new DataSource({
  type: "postgres",
  password: env.DB_PASS,
  username: env.DB_NAME,
  host: env.DB_HOST,
  port: env.DB_PORT,
  entities: [User],
});
