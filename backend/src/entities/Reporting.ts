import { ObjectType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export default class Reporting {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@CreateDateColumn()
	reportedAt: Date;

	@Column()
	flaggerId: string;

	@Column({ length: 100 })
	reason: string;
}
