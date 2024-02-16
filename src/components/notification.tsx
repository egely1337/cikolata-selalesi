import { NotificationType } from "@/types/notification";
import Link from "next/link";
import React from "react";

import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import createClockString from "@/lib/createClockString";
const inter = Inter({ subsets: ["latin"] });

export default function Notification(props: {
    notification: NotificationType
}) {
    return(
        <Link
            href={props.notification.href}
            className="w-full p-4 flex flex-row items-center hover:bg-mor border-b duration-300"
        >
            <img src={props.notification.fromUser.avatar_url} className="w-[64px] rounded-full h-[64px]" alt="" />
            <div className={`flex text-white flex-col ml-4 ${inter.className}`}>
                <div className="flex flex-row items-center">
                    <span className="font-bold">{props.notification.fromUser.username}</span>
                    <span className="text-xs ml-1 opacity-70">@{props.notification.fromUser.username} · {createClockString(props.notification.created_at.toString())}</span>
                </div>
                <span>{props.notification.desc}</span>
            </div>
        </Link>
    )
}