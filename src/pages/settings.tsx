import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import Sidenav from "@/components/sidenav";
import React from "react";
import useUser from "@/hooks/user";
import Button from "@/components/button";


export default function Page(props: {

}) {
    const user = useUser();

    return(
        <div className="flex flex-row">
            <Sidenav/>
            <div className="w-full flex flex-col p-12">
                <span className={`${inter.className} opacity-70 font-bold text-black text-3xl`}>ayarlarcık</span>

                <div className="flex flex-col mt-8">
                    <span>görünen adın</span>
                    <input type="text" placeholder={`${user?.username}`} className="p-2 w-96 mt-2 focus:outline-none border focus:border-pink-600 rounded-xl"/>
                </div>

                <div className="flex flex-col mt-8">
                    <span>kullanıcı adı</span>
                    <input type="text" placeholder={`${user?.username}`} disabled className="p-2 w-96 mt-2 focus:outline-none border focus:border-pink-600 rounded-xl"/>
                </div>

                <Button onClick={() => {}} className="p-2 mt-8" text="güncelle"/>
            </div>
        </div>
    )
}