import { Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import Code from "./code";

@Entity()
@ObjectType()
export default class Language {
	@PrimaryGeneratedColumn("uuid")
	@Field()
	id: string;

	@Column({ default: "JavaScript", length: 15 })
	@Field()
	name: string;

	@Column()
	@Field()
	version: string;

	@OneToMany(() => Code, (code) => code.language, { cascade: true })
	@Field(() => [Code])
	codes: Code[];
}

@InputType()
export class LanguageInput {
	@Field()
	@Length(1, 15, {
		message: "le nom du langage doit êtres compris entre 1 et 15 caractères",
	})
	name: string;

	@Field()
	version: string;
}

@InputType()
export class UpdateLanguageInput {
	@Field({ nullable: true })
	@Length(1, 15, {
		message: "le nom du langage doit êtres compris entre 1 et 15 caractères",
	})
	name: string;

	@Field()
	id: string;

	@Field()
	version: string;
}
