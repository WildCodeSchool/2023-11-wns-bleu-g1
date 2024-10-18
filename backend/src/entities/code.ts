import { Field, InputType, ObjectType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

import Language from "./language";
import Project from "./project";

@Entity()
@ObjectType()
export default class Code {
	@PrimaryGeneratedColumn("uuid")
	@Field({ description: "The id of the code" })
	id: string;

	@Column({ nullable: true, default: "" })
	@Field({ description: "The content of the code" })
	content: string;

	@Column({ nullable: true, default: false })
	@Field({ description: "Indicator of is this code reported" })
	isReported: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn({ nullable: true })
	updatedAt: Date;

	@UpdateDateColumn({ nullable: true })
	reportedAt: Date;

	@ManyToOne(() => Language, (language) => language.codes)
	@Field(() => Language, { description: "The language used in the code" })
	language: Language;

	@ManyToOne(() => Project, (project) => project.codes, { onDelete: "CASCADE" })
	@Field(() => Project, { description: "The project that contains this code" })
	project: Project;
}

@InputType({ description: "Fields for a new code" })
export class CodeInput {
	@Field({ description: "The content of the code" })
	content: string;

	@Field({ nullable: true, description: "The language used in the code" })
	language: string;

	@Field({ description: "The id of the project that contains this code" })
	project: string;
}
