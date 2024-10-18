import { Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import Code from "./code";
import User from "./user";
import Like from "./like";
import Comment from "./comment";

@Entity()
@ObjectType()
export default class Project {
	@PrimaryGeneratedColumn("uuid")
	@Field({ description: "The id of the project" })
	id: string;

	@Column({ length: 50 })
	@Field({ description: "The title of the project" })
	title: string;

	@Column({ default: false })
	@Field({ description: "Indicator of is this project public" })
	isPublic: boolean;

	@CreateDateColumn()
	@Field({ description: "The date of creation of the project" })
	createdAt: Date;

	@UpdateDateColumn()
	@Field({ description: "The date of the last update of the project" })
	updatedAt: Date;

	@OneToMany(() => Code, (code) => code.project, { cascade: true })
	@Field(() => [Code], { description: "The codes of the project" })
	codes: Code[];

	@ManyToOne(() => User, (user) => user.projects, { onDelete: "CASCADE" })
	@Field(() => User, { description: "The user who created the project" })
	user: User;

	@OneToMany(() => Like, (like) => like.project, { cascade: true })
	@Field(() => [Like], { description: "The likes of the project" })
	likes: Like[];

	@OneToMany(() => Comment, (comment) => comment.project, { cascade: true })
	@Field(() => [Comment], { description: "The comments of the project" })
	comments: Comment[];
}

@InputType({ description: "Fields for a new project" })
export class NewProjectInput {
	@Field({ description: "The title of the project" })
	@Length(2, 50, {
		message: "le titre du projet doit êtres compris entre 2 et 50 caractères",
	})
	title: string;

	@Field({ nullable: true, description: "Indicator of is this project public" })
	isPublic: boolean;
}

@InputType({ description: "Fields for updating a project" })
export class UpdateProjectInput {
	@Field({ nullable: true, description: "The title of the project" })
	@Length(2, 50, {
		message: "le titre du projet doit êtres compris entre 2 et 50 caractères",
	})
	title: string;

	@Field({ nullable: true, description: "Indicator of is this project public" })
	isPublic: boolean;
}
