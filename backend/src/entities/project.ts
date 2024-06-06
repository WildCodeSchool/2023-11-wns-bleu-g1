import { Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

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
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
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
