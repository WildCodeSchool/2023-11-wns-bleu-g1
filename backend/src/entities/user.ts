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
import Reporting from "./Reporting";

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
	@Field({ description: "The id of the user" })
	id: string;

	@Column({ enum: UserRole, default: UserRole.VISITOR })
	@Field({ description: "The role of the user" })
	role: UserRole;

	@Column()
	@Field({ description: "The email of the user" })
	email: string;

	@Column()
	@Field({ description: "The pseudo of the user" })
	pseudo: string;

	@Column()
	hashedPassword: string;

	@Column({ default: 1 })
	@Field({ description: "The number of executions of the user" })
	executionCounter: number;

	@Column({ default: false })
	@Field({ description: "Indicator of is this user premium" })
	isPremium: boolean;

	@OneToMany(() => Project, (project) => project.user, { cascade: true })
	projects: Project[];

	@OneToMany(() => Like, (like) => like.user, { cascade: true })
	likes: Like[];

	@OneToMany(() => Reporting, (reporting) => reporting.flagger)
	@Field(() => [Reporting], { description: "The reports of the user" })
	reportings: Reporting[];
}

@InputType({ description: "Fields for a new user" })
export class NewUserInput {
	@IsEmail()
	@Field({ description: "The email of the new user" })
	email: string;

	@Length(2, 20)
	@Field({ description: "The pseudo of the new user" })
	pseudo: string;

	@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
		message: "Password too weak",
	})
	@Field({ description: "The password of the new user" })
	password: string;

	@Field({ nullable: true, description: "The role of the new user" })
	role: UserRole;

	@Field({
		nullable: true,
		description: "The number of executions of the new user",
	})
	isPremium: boolean;
}

@InputType({ description: "Fields for a sign in action" })
export class SigninInput {
	@IsEmail()
	@Field({ description: "The email of the user" })
	email: string;

	@Field({ description: "The password of the user" })
	password: string;
}

@InputType({ description: "Fields for the executionCounter" })
export class ExecutionCounterInput {
	@Min(1)
	@Max(50)
	@Field({ description: "The number of executions of the user" })
	executionCounter: number;
}

@InputType({ description: "Fields for updating a user username" })
export class UpdateUsernameInput {
	@Field({ description: "The id of the user to update" })
	id: string;

	@Field({ description: "The new username of the user" })
	newUsername: string;
}

@InputType({ description: "Fields for updating a user password" })
export class UpdatePasswordInput {
	@Field({ description: "The id of the user to update" })
	id: string;

	@Field({ description: "The old password of the user" })
	oldPassword: string;

	@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
		message: "Password too weak",
	})
	@Field({ description: "The new password of the user" })
	newPassword: string;
}
