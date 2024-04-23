import { ObjectType } from "type-graphql"
import { BaseEntity, Entity } from "typeorm"

@Entity()
@ObjectType()
class EmptyUser extends BaseEntity {}
