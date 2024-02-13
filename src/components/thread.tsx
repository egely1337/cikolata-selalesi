import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import React from "react";

import { Post, User } from "@prisma/client";
import { IoMdHeart } from "react-icons/io";
import Link from "next/link";
import { useAvatarStore } from "@/lib/store";
import { BiComment } from "react-icons/bi";
import { FaComment, FaComments } from "react-icons/fa";
import { useRouter } from "next/router";

const MONTH_NAMES = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık" 
]

export default function Thread(props: {
    post: Post & {
        author: User,
    }
}) {
    const [isLiked, setLiked] = React.useState<boolean>(false);
    const [likeCount, setLikeCount] = React.useState<number>(0);
    const router = useRouter();

    async function like_post() {
        const result: {like: boolean | object, status: boolean} = await fetch("/api/like", {
            method: "POST",
            body: JSON.stringify({
                post_id: props.post.id
            }),
            headers: {"content-type": "application/json"}
        }).then(async res => await res.json());

        setLiked((typeof result.like == 'boolean') ? false: true);
        
        check_post();
    }

    async function check_post() {
        const result: {like: boolean, count: number, status: boolean} = await fetch("/api/likes", {
            method: "POST",
            body: JSON.stringify({
                post_id: props.post.id
            }),
            headers: {"content-type": "application/json"}
        }).then(async res => await res.json());

        if(result.status) {
            setLikeCount(result.count);
            setLiked(result.like);
        }
    }

    React.useEffect(() => {
        check_post();
    }, [])
    
    return(
        <div className="p-4 text-white flex flex-col border-white hover:bg-[#c3883d] rounded-xl duration-300 cursor-pointer">
            <div className="flex flex-row p-2 items-center">
                <img draggable={false} src={props.post.author.avatar_url} className="rounded-full" width={48} />
                <span className={`${inter.className} ml-4 font-bold`}>{props.post.authorId}</span>
                <span className={`${inter.className} ml-3 opacity-70`}>@{props.post.authorId} · 
                {`${new Date(props.post.created_at).getDate()} 
                ${MONTH_NAMES.at(new Date(props.post.created_at).getMonth())}
                ${(new Date(props.post.created_at).getHours() < 10) ? `0${new Date(props.post.created_at).getHours()}`:`${new Date(props.post.created_at).getHours()}`}:${(new Date(props.post.created_at).getMinutes() < 10) ? `0${new Date(props.post.created_at).getMinutes()}`:`${new Date(props.post.created_at).getMinutes()}`}`}</span>
            </div>
            <div className="flex flex-col p-2">
                <p>{props.post.content}</p>
                <div className="mt-4 flex items-center flex-row">
                    <span className={`${inter.className} font-bold opacity-70`}>{likeCount}</span>
                    <IoMdHeart onClick={async () => like_post()} className={`${isLiked ? "text-red-600" : "text-gray-300"} z-20 ml-1 cursor-pointer`} size={24}/>
                    
                    <span className={`${inter.className} font-bold opacity-70 ml-4`}>{
                        //@ts-ignore
                        props.post?._count?.comments ?? '0'
                    }</span>
                    <FaComments onClick={() => router.push(`/thread/${props.post.id}`)} className="text-gray-300 hover:text-gray-400 ml-2" size={24}/>
                </div>
            </div>
        </div>
    )
}