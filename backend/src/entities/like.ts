import { Field, ObjectType } from "type-graphql";
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

import User from "./user";
import Project from "./project";

@Entity()
@ObjectType()
@Unique(["user", "project"])
export default class Like {
	@PrimaryGeneratedColumn("uuid")
	@Field()
	id: string;

	@ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
	@Field(() => User)
	user: User;

	@ManyToOne(() => Project, (project) => project.likes, { onDelete: "CASCADE" })
	@Field(() => Project)
	project: Project;
}
