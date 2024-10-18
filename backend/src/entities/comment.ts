import { Field, ObjectType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

import User from "./user";
import Project from "./project";
import Reporting from "./Reporting";

@Entity()
@ObjectType()
export default class Comment {
	@PrimaryGeneratedColumn("uuid")
	@Field({ description: "The id of the comment" })
	id: string;

	@Column()
	@Field({ description: "The content of the comment" })
	content: string;

	@ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
	@Field(() => User, { description: "The user who wrote the comment" })
	user: User;

	@ManyToOne(() => Project, (project) => project.likes, { onDelete: "CASCADE" })
	@Field(() => Project, {
		description: "The project that contains this comment",
	})
	project: Project;

	@CreateDateColumn()
	@Field({ description: "The date of creation of the comment" })
	createdAt: Date;

	@UpdateDateColumn()
	@Field({ description: "The date of the last update of the comment" })
	updatedAt: Date;

	@OneToMany(() => Reporting, (reporting) => reporting.comment)
	@Field(() => [Reporting], { description: "The reports of the comment" })
	reportings: Reporting[];
}
