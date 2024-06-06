import { Field, ObjectType } from "type-graphql";
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

	@CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
	createdAt: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "NOW()",
		onUpdate: "NOW()",
	})
	updatedAt: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "NOW()",
		onUpdate: "NOW()",
	})
	reportedAt: Date;
}
