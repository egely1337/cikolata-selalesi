import { Like, Post, User } from "@prisma/client";


export type PostType = Post & {
    author: User,
    _count: {
        liked_by: number,
        comments: number
    },
    liked_by: Like[]
}