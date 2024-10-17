import { Field, ObjectType } from "type-graphql";
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

import User from "./user";
import Project from "./project";

@Entity()
@ObjectType()
@Unique(["user", "project"])
export default class Like {
	@PrimaryGeneratedColumn("uuid")
	@Field({ description: "The id of the like" })
	id: string;

	@ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
	@Field(() => User, { description: "The user who liked the project" })
	user: User;

	@ManyToOne(() => Project, (project) => project.likes, { onDelete: "CASCADE" })
	@Field(() => Project, { description: "The project that is liked" })
	project: Project;
}
