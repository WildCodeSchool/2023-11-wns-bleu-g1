import { Field, InputType, ObjectType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import Comment from "./comment";
import { Length } from "class-validator";
import User from "./user";

@Entity()
@ObjectType()
export default class Reporting {
	@PrimaryGeneratedColumn("uuid")
	@Field({ description: "The id of the reporting" })
	id: string;

	@CreateDateColumn()
	@Field({ description: "The date of the reporting" })
	reportedAt: Date;

	@Column({ length: 50 })
	@Field({ description: "The reason of the reporting" })
	reason: string;

	@ManyToOne(() => Comment, (comment) => comment.reportings, {
		onDelete: "CASCADE",
	})
	@Field(() => Comment, { description: "The comment that is reported" })
	comment: Comment;

	@ManyToOne(() => User, (user) => user.reportings)
	@Field(() => User, { description: "The user who reported the comment" })
	flagger: User;
}

@InputType({ description: "Fields for a new reporting" })
export class NewReportInput {
	@Length(10, 50)
	@Field({ description: "The reason of the reporting" })
	reason: string;

	@Field({ description: "The id of the comment that is reported" })
	commentId: string;
}
