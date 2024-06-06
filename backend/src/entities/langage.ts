import { Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class Langage extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	@Field()
	id: string;

	@Column({ default: "JavaScript", length: 15 })
	@Field()
	name: string;
}

@InputType()
export class NewLangageInput {
	@Field()
	@Length(2, 15, {
		message: "le nom du langage doit êtres compris entre 2 et 15 caractères",
	})
	name: string;
}
