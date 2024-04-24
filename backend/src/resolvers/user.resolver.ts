import { Arg, Mutation, Query } from "type-graphql";
import User, { UserInput } from "../entities/user";
import { GraphQLError } from "graphql";

export default class UserResolver {
  @Query(() => [User])
  async users() {
    // SELECT * FROM User;
    const users = await User.find();

    return users;
  }

  @Mutation(() => User)
  async createUser(@Arg("data", { validate: true }) data: UserInput) {
    if (!data.email) {
      throw new GraphQLError("email is missing but required");
    }

    // SELECT * FROM User WHERE email=data.email
    const userAlreadyExist = await User.findOneBy({ email: data.email });

    if (userAlreadyExist) {
      throw new GraphQLError(`user: ${data.email} already exist`);
    }

    const newUser = new User();

    Object.assign(newUser, data);

    return await newUser.save();
  }
}
