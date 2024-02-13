import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import React from "react";

import { Post, User } from "@prisma/client";
import { IoMdHeart } from "react-icons/io";
import { FaComments } from "react-icons/fa";
import { useRouter } from "next/router";
import { PostType } from "@/types/post";
import createClockString from "@/lib/createClockString";

export default function Thread(props: {
    post: PostType
}) {
    const router = useRouter();

    const [like, setLiked] = React.useState<{count: number, liked: boolean}>({
        liked: typeof props.post.liked_by.at(0) === 'object',
        count: props.post._count.liked_by
    }) 

    async function like_post() {
        const result: {like: PostType, status: boolean} = await fetch("/api/like", {
            method: "POST",
            body: JSON.stringify({
                post_id: props.post.id
            }),
            headers: {"content-type": "application/json"}
        }).then(async res => await res.json());

        setLiked({
            liked: typeof result.like.liked_by.at(0) === 'object',
            count: result.like._count.liked_by
        })
    }

    return(
        <div className="p-4 text-white flex flex-col border-white hover:bg-[#c3883d] rounded-xl duration-300 cursor-pointer">
            <div className="flex flex-row p-2 items-center">
                <img draggable={false} src={props.post.author.avatar_url} className="rounded-full" width={48} />
                <span className={`${inter.className} ml-4 font-bold`}>{props.post.authorId}</span>
                <span className={`${inter.className} ml-3 opacity-70`}>@{props.post.authorId} · {createClockString(`${props.post.created_at}`)}</span>
            </div>
            <div className="flex flex-col p-2">
                <p>{props.post.content}</p>
                <div className="mt-4 flex items-center flex-row">
                    <span className={`${inter.className} font-bold opacity-70`}>{like.count}
                    </span>
                    <IoMdHeart onClick={async () => like_post()} className={`${
                        (like.liked) ? "text-red-600" : "text-gray-300"} z-20 ml-1 cursor-pointer`} size={24}/>
                    <span className={`${inter.className} font-bold opacity-70 ml-4`}>{props.post?._count?.comments ?? '0'}</span>
                    <FaComments onClick={() => router.push(`/thread/${props.post.id}`)} className="text-gray-300 hover:text-gray-400 ml-2" size={24}/>
                </div>
            </div>
        </div>
    )
}