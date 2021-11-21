import { Post } from "../entities/Post";
import { getConnection } from "typeorm";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
@Resolver()
export default class PostResolver {
  @Query(() => [Post])
  async findAll() {
    const posts = await Post.find();
    return posts;
  }

  @Query(() => Post, { nullable: true })
  async findOne(@Arg("id") id: number) {
    const post = await Post.findOne(id);
    return post;
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

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id")
    id: number,
    @Arg("title") title: string,
    @Arg("text") text: string
  ) {
    const post = await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({
        title,
        text,
      })
      .where("id = :id", { id })
      .returning("*")
      .execute();
    const [updatedPost] = post.raw;
    return updatedPost;
  }
}
