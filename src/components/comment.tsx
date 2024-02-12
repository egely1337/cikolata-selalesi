import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import React from "react";

import { Comment as CommentType,User } from "@prisma/client";

const MONTH_NAMES = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık" 
]

type CommentExtended = CommentType & {
    author: User
}

export default function Comment(props: {
    comment: CommentExtended,
    onClick: (id: string) => void
}) {
    return(
        <div
            onClick={() => props.onClick(props.comment.id)}
            className="p-4 flex flex-col text-white rounded-xl duration-300"
        >
            <div className="flex flex-col p-4">
                <div className="flex flex-row p-2 items-center">
                    <img draggable={false} src={props.comment.author.avatar_url} className="rounded-full" width={48} />
                    <span className={`${inter.className} ml-4 font-bold`}>{props.comment.authorId}</span>
                    <span className={`${inter.className} ml-3 opacity-70`}>@{props.comment.authorId} · {`${new Date(props.comment.created_at).getDate()} ${MONTH_NAMES.at(new Date(props.comment.created_at).getMonth())}`}</span>
                </div>
                <div className="flex flex-col p-2">
                    <p>{props.comment.content}</p>
                </div>
            </div>
        </div>
    )
}