import { Comment, Like, Post, User } from "@prisma/client";


export type CommentType = Comment & {
    author: User,
    _count: {
        liked_by: number,
        comments: number
    },
    post: Post
}