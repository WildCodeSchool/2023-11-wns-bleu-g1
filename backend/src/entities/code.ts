import { Field, InputType, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export default class Code extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	@Field()
	id: string;

	@Column()
	@Field()
	content: string;

	@Column({ nullable: true, default: false })
	@Field()
	isReported: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@UpdateDateColumn()
	reportedAt: Date;
}

@InputType()
export class CodeInput {
	@Field()
	content: string;
}
