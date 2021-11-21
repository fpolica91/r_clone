import { User } from "../entities/User";
import argon2 from "argon2";

import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  InputType,
  Field,
} from "type-graphql";

@InputType()
class UserArgs {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
  @Field(() => String)
  username: string;
}

@Resolver()
export default class UserResolver {
  @Mutation(() => User, { nullable: true })
  async register(@Arg("options") options: UserArgs) {
    const { email, username, password } = options;
    const hashedPassword = await argon2.hash(password);
    const user = User.create({
      email,
      username,
      password: hashedPassword,
    });

    await user.save();
    return user;
  }
}
