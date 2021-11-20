import { Post } from "../entities/Post";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
@Resolver()
export default class PostResolver {
  @Query(() => [Post])
  async findAll() {
    const posts = await Post.find();
    return posts;
  }

  @Mutation(() => Post)
  async createPost(
    @Ctx() _: any,
    @Arg("title") title: string,
    @Arg("text") text: string
  ) {
    const post = Post.create({
      title,
      text,
    });
    await post.save();
    return post;
  }
}
