import { hash } from "argon2";
import { IsEmail, Length, Matches, Max, Min } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
	BeforeInsert,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import Project from "./project";
import Like from "./like";

export enum UserRole {
	ADMIN = "admin",
	VISITOR = "visitor",
}

@Entity()
@ObjectType()
export default class User {
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

	@Column()
	@Field()
	pseudo: string;

	@Column()
	hashedPassword: string;

	@Column({ default: 1 })
	@Field()
	executionCounter: number;

	@Column({ default: false })
	@Field()
	isPremium: boolean;

	@OneToMany(() => Project, (project) => project.user, { cascade: true })
	projects: Project[];

	@OneToMany(() => Like, (like) => like.user, { cascade: true })
	likes: Like[];
}

@InputType()
export class NewUserInput {
	@IsEmail()
	@Field()
	email: string;

	@Length(2, 20)
	@Field()
	pseudo: string;

	@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
		message: "Password too weak",
	})
	@Field()
	password: string;

	@Field({ nullable: true })
	role: UserRole;

	@Field({ nullable: true })
	isPremium: boolean;
}

@InputType()
export class SigninInput {
	@IsEmail()
	@Field()
	email: string;

	@Field()
	password: string;
}

@InputType()
export class ExecutionCounterInput {
	@Min(0)
	@Max(50)
	@Field()
	executionCounter: number;
}
