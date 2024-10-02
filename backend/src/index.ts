import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import cron from "node-cron";

import env from "./env";
import schema from "./schema";
import db from "./db";
import { resetExecCode } from "./script/reset-execution-code";

const app = express();
const httpServer = http.createServer(app);

const { SERVER_PORT: port, CORS_ALLOWED_ORIGINS: corsAllowed } = env;

const main = async () => {
	const server = new ApolloServer({
		schema,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	await db.initialize();

	await server.start();

	app.use(
		"/",
		cors<cors.CorsRequest>({
			credentials: true,
			origin: corsAllowed.split(","),
		}),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req, res }) => ({ req, res }),
		})
	);

	await new Promise<void>((resolve) => httpServer.listen(port, resolve));
	console.log(`🚀 Server ready at http://localhost:${port}`);

	cron.schedule("0 0 * * *", async () => {
		await resetExecCode();
	});
};

main();
