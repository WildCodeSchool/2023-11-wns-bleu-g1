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
	@Field()
	id: string;

	@CreateDateColumn()
	@Field()
	reportedAt: Date;

	@Column({ length: 50 })
	@Field()
	reason: string;

	@ManyToOne(() => Comment, (comment) => comment.reportings, {
		onDelete: "CASCADE",
	})
	@Field(() => Comment)
	comment: Comment;

	@ManyToOne(() => User, (user) => user.reportings)
	@Field(() => User)
	flagger: User;
}

@InputType()
export class NewReportInput {
	@Length(10, 50)
	@Field()
	reason: string;

	@Field()
	commentId: string;
}
