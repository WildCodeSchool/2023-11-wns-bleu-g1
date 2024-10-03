import { Field, ObjectType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from "typeorm";

import User from "./user";
import Project from "./project";

@Entity()
@ObjectType()
@Unique(["user", "project"])
export default class Comment {
	@PrimaryGeneratedColumn("uuid")
	@Field()
	id: string;

	@Column()
	@Field()
	content: string;

	@ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
	@Field(() => User)
	user: User;

	@ManyToOne(() => Project, (project) => project.likes, { onDelete: "CASCADE" })
	@Field(() => Project)
	project: Project;

	@CreateDateColumn()
	@Field()
	createdAt: Date;

	@UpdateDateColumn()
	@Field()
	updatedAt: Date;
}
