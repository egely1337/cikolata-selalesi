import useUser from "@/hooks/user";
import { useUserStore } from "@/lib/store";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

import React from "react";
import { IoMdHome, IoMdNotifications, IoMdSearch } from "react-icons/io";
import { IoExit, IoSettings } from "react-icons/io5";


import { GiChocolateBar } from "react-icons/gi";


export default function Sidenav() {
    const userStore = useUserStore();
    const router = useRouter();


    return(
        <div className="h-screen text-white flex flex-col p-4 pt-32 pl-32 w-1/5">
            <GiChocolateBar size={48} className="mb-12 opacity-70 hover:opacity-100 ease-in-out duration-1000"/>

            <div className="flex flex-row gap-2 select-none">
                <img draggable={false} src={userStore.user?.avatar_url} className="rounded-full" width={48} />
                <div className="flex flex-col justify-center">
                    <span className={`${inter.className} text-sm`}>{userStore.user?.username}</span>
                    <span className={`${inter.className} opacity-70 text-xs`}>{`@${userStore.user?.username}`}</span>
                </div>
            </div>

            <div onClick={() => router.push("/")} className="flex rounded-2xl hover:bg-[#672f0a] cursor-pointer duration-300 p-2 py-3 flex-row mt-12 items-center gap-2 w-64">
                <IoMdHome size={32}/>
                <span className={`${inter.className} text-xl font-bold ml-2`}>Anasayfa</span>
            </div>      

            <div onClick={() => router.push("/settings")} className="flex rounded-2xl hover:bg-[#672f0a] duration-300 cursor-pointer p-2 py-3 flex-row mt-3 items-center gap-2 w-64">
                <IoSettings size={32}/>
                <span className={`${inter.className} text-xl font-bold ml-2`}>Ayarlar</span>
            </div>

            <div onClick={() => router.push("/logout")} className="flex rounded-2xl hover:bg-[#672f0a] duration-300 cursor-pointer p-2 py-3 flex-row mt-3 items-center gap-2 w-64 self-justify--end">
                <IoExit size={32}/>
                <span className={`${inter.className} text-xl font-bold ml-2`}>Çıkış Yap</span>
            </div>
        </div>

    )
}