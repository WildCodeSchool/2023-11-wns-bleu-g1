import { Field, ObjectType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	ManyToOne,
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

	@ManyToMany(() => Reporting, (reporting) => reporting.comments, {
		cascade: true,
	})
	@Field(() => [Reporting])
	reportings: Reporting[];
}
