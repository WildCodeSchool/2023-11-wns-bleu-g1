import { Arg, Mutation, Query } from "type-graphql";
import User, { UserInput } from "../entities/user";
import { GraphQLError } from "graphql";

export default class UserResolver {
  @Query(() => [User])
  async users() {
    try {
      // SELECT * FROM user;
      const users = await User.find();

      return users;
    } catch (e) {
      console.log(e);
    }
  }

  @Mutation(() => User)
  async createUser(@Arg("data", { validate: true }) data: UserInput) {
    try {
      if (!data.email) {
        throw new GraphQLError("email is missing but required");
      }

      const userAlreadyExist = await User.findOneBy({ email: data.email });

      if (userAlreadyExist) {
        throw new GraphQLError(`user: ${data.email} already exist`);
      }

      const newUser = new User();

      Object.assign(newUser, data);

      console.log(newUser);

      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
