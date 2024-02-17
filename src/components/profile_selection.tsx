import { UserType } from "@/types/user";
import { Inter } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });


import { useRouter } from "next/router";
import React from "react";


export default function UserProfileSelection(
    props: {
        user: UserType
    }
) {
    const router = useRouter();

    return(
        <div className={`${inter.className} grid grid-cols-2 flex`}>
            <Link href={`/user/${props.user.username}/posts`} className="group cursor-pointer p-8 flex items-center justify-center relative">
                <span className="text-white font-bold group-hover:opacity-70">Gönderiler</span>
                <div className={`${router.pathname.includes("/posts") ? "w-1/2  bg-blue-600 bottom-0 absolute p-0.5" : ""}`}/>
            </Link>
            <Link href={`/user/${props.user.username}/comments`} className="group cursor-pointer p-8 flex items-center justify-center relative">
                <span className="text-white font-bold group-hover:opacity-70">Yorumlar</span>
                <div className={`${router.pathname.includes("/comments") ? "w-1/2 p-0.5 bg-blue-600 bottom-0 absolute" : ""}`}/>
            </Link>
        </div>
    )
}