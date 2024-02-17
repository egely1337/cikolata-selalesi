import { Post, User } from "@prisma/client";
import { PostType } from "./post";
import { CommentType } from "./comment";


export type UserType = User & {
    posts: PostType[],
    comments: CommentType[]
}