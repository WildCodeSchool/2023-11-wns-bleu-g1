import { Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

import Code from "./code";

@Entity()
@ObjectType()
export default class Language extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	@Field()
	id: string;

	@Column({ default: "JavaScript", length: 15 })
	@Field()
	name: string;

	@OneToMany(() => Code, (code) => code.language)
	code: Code[];
}

@InputType()
export class LanguageInput {
	@Field()
	@Length(2, 15, {
		message: "le nom du langage doit êtres compris entre 2 et 15 caractères",
	})
	name: string;
}
