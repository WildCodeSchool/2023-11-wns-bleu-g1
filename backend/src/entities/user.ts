import { hash } from "argon2";
import { IsEmail, IsStrongPassword, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

export enum UserRole {
	ADMIN = "admin",
	VISITOR = "visitor",
}

@Entity()
@ObjectType()
export default class User extends BaseEntity {
	password: string;

	@BeforeInsert()
	async hashPassword() {
		this.hashedPassword = await hash(this.password);
	}

	@PrimaryGeneratedColumn("uuid")
	@Field()
	id: string;

	@Column({ enum: UserRole, default: UserRole.VISITOR })
	@Field()
	role: UserRole;

	@Column()
	@Field()
	email: string;

	@Column({ nullable: true })
	@Field()
	pseudo: string;

	@Column()
	hashedPassword: string;
}

@InputType()
export class NewUserInput {
	@IsEmail()
	@Field()
	email: string;

	@Length(2, 20)
	@Field({ nullable: true })
	pseudo: string;

	@IsStrongPassword()
	@Field()
	password: string;
}

@InputType()
export class SigninInput {
	@Field()
	email: string;

	@Field()
	password: string;
}
