import { Field, InputType, ObjectType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
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

	@Column({ length: 100 })
	@Field()
	reason: string;

	@ManyToMany(() => Comment, (comment) => comment.reportings)
	@JoinTable()
	@Field(() => [Comment])
	comments: Comment[];

	@ManyToOne(() => User, (user) => user.reportings)
	@Field(() => User)
	flagger: User;
}

@InputType()
export class NewReportInput {
	@Length(2, 100)
	@Field()
	reason: string;

	@Field()
	commentId: string;
}
