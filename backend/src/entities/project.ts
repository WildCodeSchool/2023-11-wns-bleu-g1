import { Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
	BaseEntity,
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

@Entity()
@ObjectType()
export default class Project extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	@Field()
	id: string;

	@Column({ length: 50 })
	@Field()
	title: string;

	@Column({ default: false })
	@Field()
	isPublic: boolean;

	@CreateDateColumn()
	@Field()
	createdAt: Date;

	@UpdateDateColumn()
	@Field()
	updatedAt: Date;

	@OneToMany(() => Code, (code) => code.project, { cascade: true })
	@Field(() => [Code])
	codes: Code[];

	@ManyToOne(() => User, (user) => user.projects, { onDelete: "CASCADE" })
	@Field(() => User)
	user: User;
}

@InputType()
export class NewProjectInput {
	@Field()
	@Length(2, 50, {
		message: "le titre du projet doit êtres compris entre 2 et 50 caractères",
	})
	title: string;

	@Field({ nullable: true })
	isPublic: boolean;
}

@InputType()
export class UpdateProjectInput {
	@Field({ nullable: true })
	@Length(2, 50, {
		message: "le titre du projet doit êtres compris entre 2 et 50 caractères",
	})
	title: string;

	@Field({ nullable: true })
	isPublic: boolean;
}
