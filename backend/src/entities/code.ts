import { Field, InputType, ObjectType } from "type-graphql";
import {
	BaseEntity,
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
export default class Code extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	@Field()
	id: string;

	@Column()
	@Field()
	content: string;

	@Column({ nullable: true, default: false })
	@Field()
	isReported: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@UpdateDateColumn()
	reportedAt: Date;

	@ManyToOne(() => Language, (language) => language.codes)
	@Field(() => Language)
	language: Language;

	@ManyToOne(() => Project, (project) => project.codes, { onDelete: "CASCADE" })
	@Field(() => Project)
	project: Project;
}

@InputType()
export class CodeInput {
	@Field()
	content: string;
}
