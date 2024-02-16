import { Post, User } from "@prisma/client";
import { PostType } from "./post";


export type UserType = User & {
    posts: PostType[],
}