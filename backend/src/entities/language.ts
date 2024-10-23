import { Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import Code from "./code";

@Entity()
@ObjectType()
export default class Language {
	@PrimaryGeneratedColumn("uuid")
	@Field({ description: "The id of the language" })
	id: string;

	@Column({ default: "JavaScript", length: 15 })
	@Field({ description: "The name of the language" })
	name: string;

	@Column()
	@Field({ description: "The version of the language" })
	version: string;

	@Column()
	@Field()
	color: string;

	@OneToMany(() => Code, (code) => code.language, { cascade: true })
	@Field(() => [Code], { description: "The codes written in this language" })
	codes: Code[];
}

@InputType({ description: "Fields for a new language" })
export class LanguageInput {
	@Field({ description: "The name of the language" })
	@Length(1, 15, {
		message: "le nom du langage doit êtres compris entre 1 et 15 caractères",
	})
	name: string;

	@Field({ description: "The version of the language" })
	version: string;

	@Field()
	color: string;
}

@InputType({ description: "Fields for updating a language" })
export class UpdateLanguageInput {
	@Field({ nullable: true, description: "The name of the language" })
	@Length(1, 15, {
		message: "le nom du langage doit êtres compris entre 1 et 15 caractères",
	})
	name: string;

	@Field({ description: "The version of the language you want to update" })
	id: string;

	@Field({ description: "The version of the language" })
	version: string;
}
